"use client";
import { authRoutes } from "@/api/routes/Auth/index.routes";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const RegisterMutation = (setFormData: React.Dispatch<React.SetStateAction<{ email: string; password: string; name: string; phoneNumber: string }>>) => {
  const { toast } = useToast();
  const router = useRouter();

  const register = useMutation({
    mutationKey: ['register'],
    mutationFn: async (formData: IRegister) => {
      return await authRoutes.registerUser(formData);
    },
    onSuccess: () => {
      toast({
        title: 'Registro bem-sucedido',
        description: 'Você foi registrado com sucesso.',
        duration: 2000,
      });
      setFormData({ email: '', password: '', name: '', phoneNumber: '' });
      router.push('/auth/login');
    },
    onError: () => {
      toast({
        title: 'Erro no registro',
        description: 'Ocorreu um erro ao tentar registrar sua conta.',
        duration: 2000,
      });
    },
  });

  return register;
};
