import { getCartAPI, removeCartItemAPI, updateCartItemAPI } from "@/services/cart.service";
import { CartItem } from "@/types/cart.types";
import { create } from "zustand";

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  
  totalItems: number; 

  cartBumpToggle: number;

  fetchCart: () => Promise<void>;
  clearCart: () => void;

  updateCartItemUI: (itemId: number, quantity: number) => void;
  updateCartItem: (itemId: number, quantity: number) => Promise<void>;
  removeCartItem: (itemId: number) => Promise<void>;

  addOptimisticItem: (productId: number) => void;
  rollbackOptimisticItem: (productId: number) => void;

  
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isLoading: false,
  totalItems: 0,
  cartBumpToggle: 0,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const res = await getCartAPI();
      const cartItems = res.data || [];
      
      const total = cartItems.length;
      
      set({ items: cartItems, totalItems: total, isLoading: false });
    } catch (error) {
      console.error("Gagal mengambil cart:", error);
      set({ isLoading: false });
    }
  },

  clearCart: () => set({ items: [], totalItems: 0 }),

  updateCartItemUI: (id: number, quantity: number) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { 
              ...item, 
              quantity: quantity, 
              subtotal: item.activePrice * quantity
            }
          : item
      ),
    }));
  },

  updateCartItem :  async (id: number, quantity: number) => {
    try {
      await updateCartItemAPI(id.toString(), quantity);
    } catch (error) {
      console.error("Gagal update qty", error);
    }
  },

  removeCartItem: async (id: number) => {
    try {
      await removeCartItemAPI(id.toString());
      await get().fetchCart();
    } catch (error) {
      console.error("Gagal menghapus item", error);
    }
  },

  addOptimisticItem: (productId: number) => {
    set((state) => {
      const isAlreadyInCart = state.items.some((item) => item.productId === productId);
      
      return {
        totalItems: isAlreadyInCart ? state.totalItems : state.totalItems + 1,
        cartBumpToggle: Date.now(),
      };
    });
  },

  rollbackOptimisticItem: (productId: number) => {
    set((state) => {
      const isAlreadyInCart = state.items.some((item) => item.productId === productId);
      
      return {
        totalItems: isAlreadyInCart ? state.totalItems : Math.max(0, state.totalItems - 1),
      };
    });
  },
}));

