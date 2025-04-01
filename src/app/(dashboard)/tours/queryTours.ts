"use client";
import { citiesRoutes } from "@/api/routes/Cities/index.routes";
import { toursRoutes } from "@/api/routes/Tours";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";

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

  const getCities = useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      return await citiesRoutes.getAllCities();
    },
  })

  return { createTours, getCities };
};
