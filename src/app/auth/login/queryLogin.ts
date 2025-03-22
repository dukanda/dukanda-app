"use client";
import { authRoutes } from "@/api/routes/Auth/index.routes";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const loginMutation = (setFormData: React.Dispatch<React.SetStateAction<{ email: string; password: string }>>) => {
  const { toast } = useToast();
  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async (formData: ILogin) => {
      return await authRoutes.loginUser(formData);
    },
    onSuccess: () => {
      toast({
        title: 'Login bem-sucedido',
        description: 'Você foi logado com sucesso.',
      });
      setFormData({ email: '', password: '' });
    },
    onError: () => {
      toast({
        title: 'Erro no login',
        description: 'Ocorreu um erro ao tentar logar.',
      });
    },
  });

  return login;
};
