"use client";
import { authRoutes } from "@/api/routes/Auth/index.routes";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const LoginMutation = (setFormData: React.Dispatch<React.SetStateAction<{ email: string; password: string }>>) => {
  const { toast } = useToast();
  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async (formData: ILogin) => {
      return await authRoutes.loginUser(formData);
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: 'Login bem-sucedido',
        description: 'Você foi logado com sucesso.',
        duration: 2000,
      });
      setFormData({ email: '', password: '' });
    },
    onError: () => {
      toast({
        title: 'Erro no login',
        description: 'Ocorreu um erro ao tentar logar.',
        duration: 2000,
      });
    },
  });

  return login;
};
