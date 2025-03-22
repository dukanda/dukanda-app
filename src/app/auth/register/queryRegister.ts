"use client";
import { authRoutes } from "@/api/routes/Auth/index.routes";
import { useMutation } from "@tanstack/react-query";


export const registerMutation = () => {
  const register = useMutation({
    mutationKey: ['register'],
    mutationFn: async (formData: IRegister) => {
      return await authRoutes.registerUser(formData);
    },
    onSuccess: (data) => {
      console.log('Register bem-sucedido:', data);
    },
    onError: (error) => {
      console.error('Erro ao registar:', error);
    },
  });

  return register;
};
