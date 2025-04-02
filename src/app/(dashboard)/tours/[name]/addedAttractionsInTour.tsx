"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToursMutation } from "../queryTours";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { touristicAttractionRoutes } from "@/api/routes/TouristicAttraction/index.routes";

interface CreateAttractionsProps {
  children?: React.ReactNode;
  tourId?: string;
}

export const CreateAttractions = ({ children, tourId }: CreateAttractionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState<string | null>(null);

  const toursMutation = ToursMutation();

  const { data: attractions, isLoading } = useQuery({
    queryKey: ["touristAttractions"],
    queryFn: async () => await touristicAttractionRoutes.getAllTouristicAttractions(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAttraction) return;

    await toursMutation.addAttractionsInTour.mutateAsync({
      tourId: tourId || "",
      data: {
        tourId: tourId || "",
        touristAttractionId: selectedAttraction,
      },
    });

    setSelectedAttraction(null);
    setIsOpen(false);
  };

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-lg h-max overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Adicionar Atração Turística</DialogTitle>
          <DialogDescription>
            Selecione uma atração para adicionar a este tour.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Seleção de Atração Turística */}
          <div>
            <Label htmlFor="attraction">Atração Turística</Label>
            <Select
              onValueChange={setSelectedAttraction}
              disabled={isLoading || toursMutation.addAttractionsInTour.isPending}
            >
              <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-orange-500">
                <SelectValue placeholder={isLoading ? "Carregando atrações..." : "Selecione uma atração"} />
              </SelectTrigger>
              <SelectContent>
                {attractions?.items?.map((attraction) => (
                  <SelectItem key={attraction.id} value={attraction.id}>
                    {attraction.name} - {attraction.cityName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Botão de Envio */}
          <Button
            type="submit"
            disabled={!selectedAttraction || toursMutation.addAttractionsInTour.isPending}
            className="w-full bg-orange-600 hover:bg-orange-500 transition-all"
          >
            {toursMutation.addAttractionsInTour.isPending ? "Adicionando..." : "Adicionar Atração"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
