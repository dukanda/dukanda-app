"use client";
import { toursAgenciesRoutes } from "@/api/routes/TourAgency/index.routes";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const AgencyMutation = () => {
  const { toast } = useToast();
  const createAgency = useMutation({
    mutationKey: ['agency'],
    mutationFn: async (formData: TourAgencyToCreate) => {
      return await toursAgenciesRoutes.createTourAgency(formData);
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: 'Sucedido',
        description: 'A agencia foi criada com sucesso.',
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        title: 'Erro',
        description: ' Ocorreu um erro ao criar a agencia.',
        duration: 2000,
      });
    },
  });

  return createAgency;
};
