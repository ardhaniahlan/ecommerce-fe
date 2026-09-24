"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import CartItemCard from "@/components/cart/CartItemCard";
import OrderSummary from "@/components/cart/OrderSummary";

export default function CartPage() {
  const {
    items,
    totalItems,
    fetchCart,
    updateCartItemUI,
    updateCartItem,
    removeCartItem,
  } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleRemove = (id: number) => {
    removeCartItem(id);
  };

  const handleCheckout = (voucherCode?: string) => {
    
  };

  const subtotal = items.reduce((sum, item) => sum + (item.subtotal || 0), 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Keranjang Belanja
            </h1>
            <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-sm">
              {totalItems} Items
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="hidden md:flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-5">
              <div className="flex-1">Detail Produk</div>
            </div>

            {items.length > 0 ? (
              items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateUI={updateCartItemUI}
                  onUpdateAPI={updateCartItem}
                  onRemove={handleRemove}
                />
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500">Keranjang belanja Anda kosong.</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <OrderSummary subtotal={subtotal} totalItems={totalItems} onCheckout={handleCheckout} />
          </div>
        </div>
      </div>
    </div>
  );
}
