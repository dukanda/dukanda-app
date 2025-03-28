import { api } from "@/api/axios.config";

export 

class AuthRoutes {
  public static AUTH = "/Auth";

  async registerUser(user: IRegister) {
    const response = await api.post(`${AuthRoutes.AUTH}/register`, user);
    return response.data;
  }

  async loginUser({ email, password }: ILogin) {
    console.log("Login data:", { email, password });
    const response = await api.post<ILoginResponse>(`${AuthRoutes.AUTH}/login`, { email, password });
    return response.data;
  }

  async getUserById(userId: string) {
    const response = await api.get<IUser>(`${AuthRoutes.AUTH}/users/${userId}`);
    return response.data;
  }

  async getCurrentUser() {
    const response = await api.get<IUser>(`${AuthRoutes.AUTH}/users/me`);
    return response.data;
  }
}

export const authRoutes = new AuthRoutes();
