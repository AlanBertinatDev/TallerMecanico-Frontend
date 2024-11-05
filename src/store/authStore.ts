import { create } from "zustand";
import { User } from "../types";
import api from "../lib/axios";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  login: async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      set({ user: response.data.user });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },
  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const response = await api.get("/auth/me");
      set({ user: response.data, isLoading: false });
    } catch (error) {
      set({ user: null, isLoading: false });
    }
  },
}));
