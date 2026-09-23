import { User } from "@/types/user.types";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  setAddress: (address: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,

  login: (userData) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null }),
  setAddress: (address) =>
    set((state) => ({
      user: state.user ? { ...state.user, address } : null,
    })),
}));
