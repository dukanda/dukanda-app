"use client";
import { authRoutes } from "@/api/routes/Auth/index.routes";
import { useMutation } from "@tanstack/react-query";


export const loginMutation = () => {
  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async (formData: ILogin) => {
      return await authRoutes.loginUser(formData);
    },
    onSuccess: (data) => {
      console.log('Login bem-sucedido:', data);
    },
    onError: (error) => {
      console.error('Erro no login:', error);
    },
  });

  return login;
};
