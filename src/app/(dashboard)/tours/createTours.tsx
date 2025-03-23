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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToursMutation } from "./queryTours";
import { addDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { citiesRoutes } from "@/api/routes/Cities/index.routes";

interface CreateToursProps {
  children?: React.ReactNode;
}

export const CreateTours = ({ children }: CreateToursProps) => {
  const toursMutation = ToursMutation();

  const [image, setImage] = useState("");
  const [cityId, setCityId] = useState<number | null>(null);
  const [tourTypeIds, setTourTypeIds] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 10));

  const getCities = useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      return await citiesRoutes.getAllCities();
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted!", { title, description, basePrice, cityId, tourTypeIds, image, startDate, endDate });

    await toursMutation.createTours.mutate({
      AgencyId: "1",
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
    <Dialog modal={true}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-lg h-[90%] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <DialogHeader>
          <DialogTitle>Criar Novo Tour</DialogTitle>
          <DialogDescription>Preencha os detalhes abaixo para criar um novo tour.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 ">
          {/* Title */}
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              name="title"
              placeholder="Digite o título do tour"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={toursMutation.createTours.isPending}
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Descreva o passeio..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={toursMutation.createTours.isPending}
            />
          </div>

          {/* Base Price */}
          <div>
            <Label htmlFor="basePrice">Preço Base</Label>
            <Input
              id="basePrice"
              name="basePrice"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              disabled={toursMutation.createTours.isPending}
            />
          </div>

          {/* Date Range (StartDate and EndDate) */}
          <div className="">
            <Label>Datas do Passeio</Label>
            <DatePickerWithRange
              onDateChange={({ startDate, endDate }) => {
                setStartDate(startDate || new Date());
                setEndDate(endDate || addDays(new Date(), 10));
              }}
            />
          </div>

          {/* CityId */}
          <div>
            <Label htmlFor="cityId">Cidade</Label>
            <Select onValueChange={(value) => setCityId(Number(value))} disabled={toursMutation.createTours.isPending}>
              <SelectTrigger className="w-full ring-0 focus:ring-0 focus-visible:ring-0 outline-none">
                <SelectValue placeholder="Selecione a cidade" />
              </SelectTrigger>
              <SelectContent>
                {getCities.data?.data.items.map((city) => (
                  <SelectItem key={city.id} value={city.id.toString()}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* TourTypeIds */}
          <div>
            <Label htmlFor="tourTypeIds">Tipos de passeio</Label>
            <Select onValueChange={(value) => setTourTypeIds(Number(value))} disabled={toursMutation.createTours.isPending}>
              <SelectTrigger className="w-full ring-0 focus:ring-0 focus-visible:ring-0 outline-none">
                <SelectValue placeholder="Selecione o tipo de passeio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Passeio de Turismo</SelectItem>
                <SelectItem value="2">Passeio de Viagem</SelectItem>
                <SelectItem value="3">Passeio de Viagem e Turismo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cover Image */}
          <div>
            <Label htmlFor="cover">Imagem de Capa</Label>
            <ImageUploader setImageUrl={setImage} isLoading={toursMutation.createTours.isPending} />
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={toursMutation.createTours.isPending} className="w-full bg-orange-600 hover:bg-orange-500">
            {toursMutation.createTours.isPending ? "Criando..." : "Criar Tour"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
