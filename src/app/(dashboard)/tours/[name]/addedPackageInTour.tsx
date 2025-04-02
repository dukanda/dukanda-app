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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { ToursMutation } from "../queryTours";

interface CreatePackageInTourProps {
  children?: React.ReactNode;
  tourId?: string;
}

export const CreatePackageInTour = ({ children, tourId }: CreatePackageInTourProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [benefits, setBenefits] = useState<{ name: string; description: string }[]>([]);
  const toursMutation = ToursMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    await toursMutation.addPackagesInTour.mutateAsync({
      tourId: tourId || "",
      name,
      price: parseFloat(price),
      benefits,
    });

    resetForm();
    setIsOpen(false);
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setBenefits([]);
  };

  const addBenefit = () => {
    setBenefits([...benefits, { name: "", description: "" }]);
  };

  const updateBenefit = (index: number, key: "name" | "description", value: string) => {
    const newBenefits = [...benefits];
    newBenefits[index][key] = value;
    setBenefits(newBenefits);
  };

  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-h-[90vh] max-w-lg h-max overflow-y-auto rounded-lg shadow-xl bg-white p-6">
        <div className="flex justify-between items-center mb-2">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">
              Adicionar Pacote
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Preencha os detalhes para adicionar um novo pacote ao tour.
            </DialogDescription>
          </DialogHeader>
          {/* <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={20} />
          </Button> */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome do Pacote */}
          <div>
            <Label htmlFor="package-name">Nome do Pacote</Label>
            <Input
              id="package-name"
              placeholder="Ex: Pacote VIP"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Preço */}
          <div>
            <Label htmlFor="package-price">Preço</Label>
            <Input
              id="package-price"
              type="number"
              placeholder="0000 kz"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Benefícios */}
          <div>
            <Label>Benefícios</Label>
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center gap-3 mb-3 border p-3 rounded-lg bg-gray-50"
              >
                <div className="flex-1">
                  <Input
                    placeholder="Nome do benefício"
                    value={benefit.name}
                    onChange={(e) => updateBenefit(index, "name", e.target.value)}
                    required
                  />
                </div>
                <div className="flex-1">
                  <Textarea
                    placeholder="Descrição do benefício"
                    value={benefit.description}
                    onChange={(e) => updateBenefit(index, "description", e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white p-2 "
                  onClick={() => removeBenefit(index)}
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              className="mt-2 bg-green-600 hover:bg-green-700 text-white w-full"
              onClick={addBenefit}
            >
              + Adicionar Benefício
            </Button>
          </div>

          {/* Botão de Envio */}
          <Button
            type="submit"
            disabled={toursMutation.addPackagesInTour.isPending}
            className="w-full bg-orange-600 hover:bg-orange-700 transition-all text-white py-2 rounded-lg text-lg font-medium"
          >
            {toursMutation.addPackagesInTour.isPending ? "Adicionando..." : "Adicionar Pacote"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
