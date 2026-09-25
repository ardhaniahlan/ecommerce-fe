import { api } from "@/libs/axios";
import { UserProfileUpdate } from "@/types/user.types";

export const getUserProfile = async () => { 
    try {
        const response = await api.get("/users/profile");
        return response.data; 
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Gagal mengambil data profil.");
    }
}

export const updateUserProfile = async (profileData: UserProfileUpdate) => {
    try {
        const response = await api.put("/users/profile", profileData);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Gagal memperbarui data profil.");
    }
}