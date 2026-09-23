import { api } from "@/libs/axios";
import { Banner, Product } from "@/types/product.types";

export const getBanner = async (): Promise<Banner[]> => {
    try {
        const response = await api.get("/banners");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching banner:", error);
        return [];
    }
}

export const getProduct = async (): Promise<Product[]> => {
    try {
        const response = await api.get("/products");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        return [];
    }
}

export const getProductById = async (id: string): Promise<Product | null> => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

export const searchProduct = async (query: string): Promise<Product[]> => {
    try {
        const response = await api.get(`/products?search=${query}`);
        return response.data.data || [];
    } catch (error) {
        console.error("Error searching product:", error);
        return [];
    }
}

