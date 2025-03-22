import { api } from "@/api/axios.config";


class AuthRoutes {
  public static AUTH = "/Auth";

  async registerUser(user:IRegister) {
    const response = await api.post(`${AuthRoutes.AUTH}/register`, user);
    return response.data;
  }

  async loginUser({ email, password }: ILogin) {
    const response = await api.post(`${AuthRoutes.AUTH}/login`, { email, password });
    return response.data;
  }
}

export const authRoutes = new AuthRoutes();