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
import { DatePicker } from "@/components/ui/datePicker";
import { ToursMutation } from "../queryTours";

interface CreateItinerariesProps {
  children?: React.ReactNode;
  tourId?: string;
}

export const CreateItineraries = ({ children, tourId }: CreateItinerariesProps) => {
  const toursMutation = ToursMutation();
  const [isOpen, setIsOpen] = useState(false); 

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [order, setOrder] = useState<number>(1); 

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStartDate(new Date());
    setOrder(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await toursMutation.addItinerariesInTour.mutateAsync({
      tourId: tourId || "",
      data: {
        tourId: tourId || "",
        date: startDate,
        title,
        description,
        displayOrder: order,
      },
    });

    resetForm();
    setIsOpen(false);
  };

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-lg h-max overflow-y-auto [&::-webkit-scrollbar]:hidden rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Criar itinerário</DialogTitle>
          <DialogDescription>Preencha os detalhes abaixo para adicionar um itinerário.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Título */}
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Digite o título do itinerário"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={toursMutation.addItinerariesInTour.isPending}
              required
            />
          </div>

          {/* Datas */}
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-4 w-full">
              <Label>Ordem do itinerário</Label>
              <Input
                id="order"
                type="number"
                min={1}
                placeholder="Digite a ordem"
                value={order} 
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={toursMutation.addItinerariesInTour.isPending}
                required
              />
            </div>

            <div className="flex flex-col gap-4">
              <Label>Data do itinerário</Label>
              <DatePicker
                selectedDate={startDate} 
                onDateChange={(date) => setStartDate(date || new Date())}
              />
            </div>
          </div>

          {/* Descrição */}
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva o itinerário..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[100px] max-h-[200px] rounded-md border  border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={toursMutation.addItinerariesInTour.isPending}
              required
            />
          </div>

          {/* Botão de Envio */}
          <Button
            type="submit"
            disabled={toursMutation.addItinerariesInTour.isPending}
            className="w-full bg-orange-600 hover:bg-orange-500 transition-all"
          >
            {toursMutation.addItinerariesInTour.isPending ? "Adicionando..." : "Adicionar itinerário"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
