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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/ui/combobox";
import { ToursMutation } from "./queryTours";
import { addDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { citiesRoutes } from "@/api/routes/Cities/index.routes";
import { toursTypeRoutes } from "@/api/routes/ToursType";
import UploadArea from "@/components/upload-area";
import { DatePicker } from "@/components/ui/datePicker";

interface CreateToursProps {
  children?: React.ReactNode;
}

export const CreateTours = ({ children }: CreateToursProps) => {
  const toursMutation = ToursMutation();
  const [isOpen, setIsOpen] = useState(false);

  const [image, setImage] = useState<File | null>(null);
  const [cityId, setCityId] = useState<number | null>(null);
  const [tourTypeIds, setTourTypeIds] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [basePrice, setBasePrice] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 10));

  const { data: citiesData } = useQuery({
    queryKey: ["cities"],
    queryFn: citiesRoutes.getAllCities,
  });

  const { data: tourTypesData } = useQuery({
    queryKey: ["toursTypes"],
    queryFn: toursTypeRoutes.getToursTypes,
  });

  const cityOptions = citiesData?.data.items.map((city) => city.name) || [];
  const tourTypeOptions = tourTypesData?.items.map((tourType) => tourType.name) || [];

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setBasePrice("");
    setCityId(null);
    setTourTypeIds(null);
    setImage(null);
    setStartDate(new Date());
    setEndDate(addDays(new Date(), 10));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await toursMutation.createTours.mutateAsync({
      Title: title,
      Description: description,
      basePrice: Number(basePrice),
      StartDate: startDate.toISOString(),
      EndDate: endDate.toISOString(),
      CityId: cityId ? cityId.toString() : "",
      Cover: image,
      TourTypeIds: tourTypeIds ? [tourTypeIds] : [],
    });

    // Após sucesso, resetar os inputs e fechar o Dialog
    resetForm();
    setIsOpen(false);
  };

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-xl h-full sm:h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Criar Novo Tour</DialogTitle>
          <DialogDescription>Preencha os detalhes abaixo para criar um novo tour.</DialogDescription>
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
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={toursMutation.createTours.isPending}
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
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={toursMutation.createTours.isPending}
              required
            />
          </div>

          {/* Preço Base */}
          <div>
            <Label htmlFor="basePrice">Preço Base (AOA)</Label>
            <Input
              id="basePrice"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={basePrice}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setBasePrice(e.target.value)}
              disabled={toursMutation.createTours.isPending}
              required
            />
          </div>

          {/* Datas */}
          <div className="flex justify-between gap-4">
            <div>
              <Label>Data de início</Label>
              <DatePicker selectedDate={startDate} onDateChange={(date) => setStartDate(date || new Date())} />
            </div>

            <div>
              <Label>Data de término</Label>
              <DatePicker selectedDate={endDate} onDateChange={(date) => setEndDate(date || new Date())} />
            </div>
          </div>

          {/* Cidade */}
          <div>
            <Label htmlFor="cityId">Cidade</Label>
            <Combobox
              options={cityOptions}
              value={cityId ? citiesData?.data.items.find((city) => city.id === cityId)?.name || "" : ""}
              onChange={(value) => {
                const selectedCity = citiesData?.data.items.find((city) => city.name === value);
                setCityId(selectedCity ? selectedCity.id : null);
              }}
              placeholder="Selecione a cidade"
            />
          </div>

          {/* Tipos de Passeio */}
          <div>
            <Label htmlFor="tourTypeIds">Tipo de Passeio</Label>
            <Combobox
              options={tourTypeOptions}
              value={tourTypeIds ? tourTypesData?.items.find((tourType) => tourType.id === tourTypeIds)?.name || "" : ""}
              onChange={(value) => {
                const selectedTourType = tourTypesData?.items.find((tourType) => tourType.name === value);
                setTourTypeIds(selectedTourType ? selectedTourType.id : null);
              }}
              placeholder="Selecione o tipo de passeio"
            />
          </div>

          {/* Upload de Imagem */}
          <div>
            <Label>Imagem de Capa</Label>
            <UploadArea onChange={(file) => setImage(file)} />
          </div>

          {/* Botão de Envio */}
          <Button
            type="submit"
            disabled={toursMutation.createTours.isPending}
            className="w-full bg-orange-600 hover:bg-orange-500 transition-all"
          >
            {toursMutation.createTours.isPending ? "Criando..." : "Criar Tour"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
