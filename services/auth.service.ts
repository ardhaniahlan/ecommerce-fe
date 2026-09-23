import { api } from "@/libs/axios";

export const loginUser = async (payload: { email: string; password: string }) => {
    try {
        const response = await api.post("/auth/login", payload);
        return response.data; 
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Gagal melakukan login");
    }
}

export const registerUser = async (payload: { fullName: string; email: string; password: string }) => {
    try {
        const response = await api.post("/auth/register", payload);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching user:", error);
        return error.response?.data || error.message;
    }
}