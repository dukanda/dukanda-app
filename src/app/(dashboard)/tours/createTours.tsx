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

interface CreateToursProps {
  children?: React.ReactNode;
}

export const CreateTours = ({ children }: CreateToursProps) => {
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCoverFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <Dialog  modal={true}>
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
            <Input id="title" name="title" placeholder="Digite o título do tour" />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" name="description" placeholder="Descreva o passeio..." />
          </div>

          {/* Base Price */}
          <div>
            <Label htmlFor="basePrice">Preço Base</Label>
            <Input id="basePrice" name="basePrice" type="number" step="0.01" placeholder="0.00" />
          </div>

          {/* Date Range (StartDate and EndDate) */}
          <div>
            <Label>Datas do Passeio</Label>
            <DatePickerWithRange />
            {/* <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      `${format(dateRange.from, "dd/MM/yyyy")} - ${format(dateRange.to, "dd/MM/yyyy")}`
                    ) : (
                      format(dateRange.from, "dd/MM/yyyy")
                    )
                  ) : (
                    "Selecione um período"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  initialFocus
                />
              </PopoverContent>
            </Popover> */}
          </div>

          {/* CityId */}
          <div>
            <Label htmlFor="cityId">Cidade</Label>
            <Input id="cityId" name="cityId" type="number" placeholder="ID da cidade" />
          </div>

          {/* TourTypeIds */}
          <div>
            <Label htmlFor="tourTypeIds">IDs de Tipos de Tour</Label>
            <Input id="tourTypeIds" name="tourTypeIds" placeholder="Insira os IDs separados por vírgula" />
          </div>

          {/* Cover Image */}
          <div>
            <Label htmlFor="cover">Imagem de Capa</Label>
            <Input id="cover" name="cover" type="file" onChange={handleFileChange} />
            {coverFile && <p className="text-sm text-gray-500">Arquivo selecionado: {coverFile.name}</p>}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-500">
            Criar Tour
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
