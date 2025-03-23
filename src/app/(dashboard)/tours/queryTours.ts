"use client";
import { toursRoutes } from "@/api/routes/Tours";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const ToursMutation = () => {
  const { toast } = useToast();
  const createTours = useMutation({
    mutationKey: ['tours'],
    mutationFn: async (formData: TourToCreate) => {
      return await toursRoutes.createTourAgency(formData);
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: 'Sucedido',
        description: 'A Passeio foi criada com sucesso.',
        duration: 2000,
      });
    },
    onError: (data) => {
      console.log(data);
      toast({
        title: 'Erro',
        description: ' Ocorreu um erro ao criar a tour.',
        duration: 2000,
      });
    },
  });

  return createTours;
};
