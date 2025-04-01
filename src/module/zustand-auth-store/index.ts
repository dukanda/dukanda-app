import { create } from "zustand";
import Cookies from "js-cookie";
import axios from "axios";

interface User {
  id: string;
  email: string;
  avatarUrl: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  created: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (token: string, refreshToken: string, user: User) => void;
  refreshAccessToken: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: Cookies.get("dukanda-user") ? JSON.parse(Cookies.get("dukanda-user")!) : null,
  token: Cookies.get("dukanda-token") || null,
  refreshToken: Cookies.get("dukanda-refreshToken") || null,
  isAuthenticated: !!Cookies.get("dukanda-token"),
  
  login: (token, refreshToken, user) => {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 5);

    Cookies.set("dukanda-token", token, { expires: expirationDate });
    Cookies.set("dukanda-refreshToken", refreshToken, { expires: expirationDate });
    Cookies.set("dukanda-user", JSON.stringify(user), { expires: expirationDate });
    
    set({
      user,
      token,
      refreshToken,
      isAuthenticated: true,
    });
  },
  
  logout: () => {
    Cookies.remove("dukanda-token");
    Cookies.remove("dukanda-refreshToken");
    Cookies.remove("dukanda-user");
    
    set({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  refreshAccessToken: async () => {
    const refreshToken = Cookies.get("authKwenda-refreshToken");
    if (!refreshToken) return;

    try {
      const response = await axios.post("/api/Auth/refresh-token", {
        refreshToken,
      });

      const { token, refreshToken: newRefreshToken } = response.data;

      Cookies.set("authKwenda-token", token, { expires: 1 });
      Cookies.set("authKwenda-refreshToken", newRefreshToken, { expires: 1 });

      set((state) => ({
        token,
        refreshToken: newRefreshToken,
        isAuthenticated: true,
        user: state.user,
      }));
    } catch (error) {
      console.error("Erro ao renovar o token", error);
      set({ token: null, refreshToken: null, isAuthenticated: false, user: null });
    }
  },
}));
