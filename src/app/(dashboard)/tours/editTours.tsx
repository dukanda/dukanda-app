"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "@/components/ui/datePickerRanger";
import { Combobox } from "@/components/ui/combobox";
import { ToursMutation } from "./queryTours";
import { addDays, parseISO } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { citiesRoutes } from "@/api/routes/Cities/index.routes";
import { toursTypeRoutes } from "@/api/routes/ToursType";

interface Tour {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  startDate: string;
  endDate: string;
  cityName: string;
  tourTypes: { id: number; name: string }[];
}

interface EditToursProps {
  children?: React.ReactNode;
  tour?: Tour;
}

export const EditTours = ({ children, tour }: EditToursProps) => {
  const toursMutation = ToursMutation();
  const [isOpen, setIsOpen] = useState(false);

  // Estados dos campos
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [cityName, setCityName] = useState(0);
  const [tourTypeId, setTourTypeId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { data: citiesData } = useQuery({
    queryKey: ["cities"],
    queryFn: citiesRoutes.getAllCities,
  });

  const { data: tourTypesData } = useQuery({
    queryKey: ["toursTypes"],
    queryFn: toursTypeRoutes.getToursTypes,
  });

  const cityItems = citiesData?.data.items.map((city) => ({
    value: city.id.toString(),
    label: city.name,
  })) || [];

  const tourTypeItems = tourTypesData?.items.map((tourType) => ({
    value: tourType.id.toString(),
    label: tourType.name,
  })) || [];

  useEffect(() => {
    if (tour) {
      console.log("Dados do Tour carregados:", tour); // DEBUG

      setTitle(tour.title);
      setDescription(tour.description);
      setBasePrice(tour.basePrice.toString());
      setCityName(
        citiesData?.data.items.find((city) => city.name === tour.cityName)?.id || 0
      ); // Ajuste para exibir o nome correto no modal
      setTourTypeId(tour.tourTypes.length > 0 ? tour.tourTypes[0].id : null);

      // Convertendo as datas corretamente
      setStartDate(parseISO(tour.startDate));
      setEndDate(parseISO(tour.endDate));
    }
  }, [tour, citiesData]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !endDate) return;

    await toursMutation.editTours.mutate({
      tourId: tour?.id || "",
      formData: {
        title,
        description,
        basePrice: Number(basePrice),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        cityId: cityName,
        tourTypeIds: tourTypeId ? [tourTypeId] : [],
      },
    });

    setIsOpen(false);
  };

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div onClick={handleOpen}>{children}</div>
      </DialogTrigger>
      <DialogContent className="w-full max-w-lg h-full sm:h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Editar Tour</DialogTitle>
          <DialogDescription>Atualize os detalhes abaixo para editar o tour.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Título */}
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Digite o título do tour"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Descrição */}
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva o passeio..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Preço Base */}
          <div>
            <Label htmlFor="basePrice">Preço Base (AOA)</Label>
            <Input
              id="basePrice"
              type="number"
              placeholder="0.00"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              required
            />
          </div>

          {/* Datas */}
          <div>
            <Label>Datas do Passeio</Label>
            {startDate && endDate && (
              <DatePickerWithRange
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                startDate={startDate}
                endDate={endDate}
                onDateChange={({ startDate, endDate }) => {
                  setStartDate(startDate || new Date());
                  setEndDate(endDate || addDays(new Date(), 10));
                }}
              />
            )}
          </div>

          {/* Cidade */}
          <div>
            <Label htmlFor="cityName">Cidade</Label>
            <Combobox
              items={cityItems}
              selectedValue={cityName.toString()}
              onValueChange={(value) => setCityName(Number(value))}
              placeholder="Selecione a cidade"
            />
          </div>

          {/* Tipo de Passeio */}
          <div>
            <Label htmlFor="tourTypeId">Tipo de Passeio</Label>
            <Combobox
              items={tourTypeItems}
              selectedValue={tourTypeId?.toString() || ""}
              onValueChange={(value) => setTourTypeId(Number(value))}
              placeholder="Selecione o tipo de passeio"
            />
          </div>

          {/* Botão de Envio */}
          <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 transition-all">
            {toursMutation.createTours.isPending ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
