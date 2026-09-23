import { api } from "@/libs/axios";

export const getUserProfile = async () => { 
    try {
        const response = await api.get("/users/profile");
        return response.data; 
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Gagal mengambil data profil.");
    }
}