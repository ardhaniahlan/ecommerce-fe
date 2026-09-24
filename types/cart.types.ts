export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  originalPrice: number;
  activePrice: number;
  discountPercentage: number;
  imageUrl: string;
  quantity: number;
  subtotal: number;
  stock: number;
}