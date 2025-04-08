"use client";
import { toursAgenciesRoutes } from "@/api/routes/TourAgency/index.routes";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/module/tanstack-query-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const AgencyMutation = () => {

  const { toast } = useToast();
  const queryClients = useQueryClient();
  const createAgency = useMutation({
    mutationKey: ['agency'],
    mutationFn: async (formData: TourAgencyToCreate) => {
      return await toursAgenciesRoutes.createTourAgency(formData);
    },
    onSuccess: () => {
      queryClients.invalidateQueries();
      toast({
        title: 'Sucedido',
        description: 'A agencia foi criada com sucesso.',
        duration: 2000,
      });

      queryClient.refetchQueries()
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: 'Erro',
        description: ' Ocorreu um erro ao criar a agencia.',
        duration: 2000,
      });
    },
  });


  return createAgency;
};
