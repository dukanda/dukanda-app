"use client";
import { toursRoutes } from "@/api/routes/Tours/index.routes";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient, } from "@tanstack/react-query";

export const ToursMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const createTours = useMutation({
    mutationKey: ['tours'],
    mutationFn: async (formData: TourToCreate) => {
      return await toursRoutes.createTours(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
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


  const addItinerariesInTour = useMutation({
    mutationKey: ['itineraries'],
    mutationFn: async ({ tourId, data }: { tourId: string; data: ItineraryToCreate }) => {
      return await toursRoutes.addItinerariesInTour(tourId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast({
        title: 'Sucedido',
        description: 'O itinerário foi adicionado com sucesso.',
        duration: 2000,
      });
    }
    ,
    onError: () => {
      toast({
        title: 'Erro',
        description: ' Ocorreu um erro ao adicionar o itinerário.',
        duration: 2000,
      });
    },
  });

  const addAttractionsInTour = useMutation({
    mutationKey: ['attractions'],
    mutationFn: async ({ tourId, data }: { tourId: string; data: AttractionToCreate }) => {
      return await toursRoutes.addAttractionsInTour(tourId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast({
        title: 'Sucedido',
        description: 'Atração adicionada com sucesso.',
        duration: 2000,
      });
    }
    ,
    onError: () => {
      toast({
        title: 'Erro',
        description: ' Ocorreu um erro ao adicionar a atração.',
        duration: 2000,
      });
    },
  });

  const addPackagesInTour = useMutation({
    mutationKey: ['packages'],
    mutationFn: async (data: PackageToCreate) => {
      return await toursRoutes.addPackagesInTour(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast({
        title: 'Sucedido',
        description: 'Pacote adicionado com sucesso.',
        duration: 2000,
      });
    }
    ,
    onError: () => {
      toast({
        title: 'Erro',
        description: ' Ocorreu um erro ao adicionar o pacote.',
        duration: 2000,
      });
    },
  });


  return { createTours, editTours, addItinerariesInTour, addAttractionsInTour, addPackagesInTour };
};
