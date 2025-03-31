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
import { DatePickerWithRange } from "@/components/ui/datePickerRanger";
import { ImageUploader } from "@/components/image-loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToursMutation } from "./queryTours";
import { addDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { citiesRoutes } from "@/api/routes/Cities/index.routes";
import { toursTypeRoutes } from "@/api/routes/ToursType";

interface CreateToursProps {
  children?: React.ReactNode;
}

export const CreateTours = ({ children }: CreateToursProps) => {
  const toursMutation = ToursMutation();

  const [image, setImage] = useState<string>("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted!", {
      title,
      description,
      basePrice,
      cityId,
      tourTypeIds,
      image,
      startDate,
      endDate,
    });

    await toursMutation.createTours.mutate({
      Title: title,
      Description: description,
      basePrice: Number(basePrice),
      StartDate: startDate.toISOString(),
      EndDate: endDate.toISOString(),
      CityId: cityId ? cityId.toString() : "",
      Cover: image,
      TourTypeIds: tourTypeIds ? [tourTypeIds] : [],
    });
  };

  return (
    <Dialog modal>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-lg h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden rounded-lg">
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
          <div>
            <Label>Datas do Passeio</Label>
            <DatePickerWithRange
              onDateChange={({ startDate, endDate }) => {
                setStartDate(startDate || new Date());
                setEndDate(endDate || addDays(new Date(), 10));
              }}
            />
          </div>

          {/* Cidade */}
          <div>
            <Label htmlFor="cityId">Cidade</Label>
            <Select
              onValueChange={(value) => setCityId(Number(value))}
              disabled={toursMutation.createTours.isPending}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a cidade" />
              </SelectTrigger>
              <SelectContent>
                {citiesData?.data.items.map((city) => (
                  <SelectItem key={city.id} value={city.id.toString()}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipos de Passeio */}
          <div>
            <Label htmlFor="tourTypeIds">Tipo de Passeio</Label>
            <Select
              onValueChange={(value) => setTourTypeIds(Number(value))}
              disabled={toursMutation.createTours.isPending}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de passeio" />
              </SelectTrigger>
              <SelectContent>
                {tourTypesData?.items.map((tourType) => (
                  <SelectItem key={tourType.id} value={tourType.id.toString()}>
                    {tourType.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Upload de Imagem */}
          <div>
            <Label>Imagem de Capa</Label>
            <ImageUploader
              setImageUrl={setImage}
              isLoading={toursMutation.createTours.isPending}
            />
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
