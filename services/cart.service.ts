import { api } from "@/libs/axios";

export const getCartAPI = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const addToCartAPI = async (productId: number, quantity: number) => {
  const response = await api.post("/cart", { productId, quantity });
  return response.data;
};

export const updateCartItemAPI = async (cartItemId: string, quantity: number) => {
  const response = await api.put(`/cart/${cartItemId}`, { quantity });
  return response.data;
};

export const removeCartItemAPI = async (cartItemId: string) => {
  const response = await api.delete(`/cart/${cartItemId}`);
  return response.data;
};