export interface Product {
  id: number;
  name: string;
  description?: string;
  image_url: ProductImage[];
  primary_image: string;
  price: number;
  stock: number;
  isActive: boolean;
  createdAt: string;
  discount_percentage: number;
  discount_start: string | null;
  discount_end: string | null;
}

export interface ProductImage {
  id: number;
  productId: number;
  image_url: string;
  is_primary: boolean;
}

export interface Banner {
  id: number;
  title: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}