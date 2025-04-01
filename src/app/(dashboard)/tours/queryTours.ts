"use client";
import { toursRoutes } from "@/api/routes/Tours/index.routes";
import { useToast } from "@/hooks/use-toast";
import { useMutation, } from "@tanstack/react-query";

export const ToursMutation = () => {
  const { toast } = useToast();
  const createTours = useMutation({
    mutationKey: ['tours'],
    mutationFn: async (formData: TourToCreate) => {
      return await toursRoutes.createTours(formData);
    },
    onSuccess: () => {
      toast({
        title: 'Sucedido',
        description: 'A Passeio foi criada com sucesso.',
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        title: 'Erro',
        description: ' Ocorreu um erro ao criar a tour.',
        duration: 2000,
      });
    },
  });

  const editTours = useMutation({
    mutationKey: ['tours'],
    mutationFn: async ({ tourId, formData }: { tourId: string; formData: TourEdit }) => {
      return await toursRoutes.editTours(tourId, formData);
    },
  });



  return { createTours, editTours };
};
