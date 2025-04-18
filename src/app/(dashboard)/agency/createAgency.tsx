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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/ui/combobox";
import { AgencyMutation } from "./queryAgency";
import { Loader2 } from "lucide-react";
import UploadArea from "@/components/upload-area";

interface CreateAgencyProps {
  children?: React.ReactNode;
}

export const CreateAgency = ({ children }: CreateAgencyProps) => {
  const createAgency = AgencyMutation();
  const [image, setImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<TourAgencyToCreate>({
    Name: "",
    Description: "",
    ContactEmail: "",
    ContactPhone: "",
    Address: "",
    Logo: null,
    TourAgencyTypeId: 0,
  });

  const agencyTypes = [
    { value: "1", label: "Guia Turístico" },
    { value: "2", label: "Agência de Turismo" },
  ];

  const agencyTypeOptions = agencyTypes.map((type) => type.label);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      Logo: image || null,
    };
    await createAgency.mutate(payload);
  };

  return (
    <Dialog modal>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-xl max-h-[95%] p-6 rounded-lg overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-semibold text-gray-800">Criar Nova Agência</DialogTitle>
          <DialogDescription className="text-gray-500">
            Preencha os detalhes abaixo para registrar sua agência.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nome */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="Name">Nome da Agência</Label>
            <input
              id="Name"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
              placeholder="Digite o nome da agência"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={createAgency.isPending}
            />
          </div>

          {/* Descrição */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="Description">Descrição</Label>
            <Textarea
              id="Description"
              name="Description"
              value={formData.Description}
              onChange={handleInputChange}
              placeholder="Descreva a agência"
              className="focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[120px]"
              disabled={createAgency.isPending}
            />
          </div>

          {/* Contato */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="ContactEmail">E-mail</Label>
              <input
                id="ContactEmail"
                name="ContactEmail"
                type="email"
                value={formData.ContactEmail}
                onChange={handleInputChange}
                placeholder="exemplo@empresa.com"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={createAgency.isPending}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="ContactPhone">Telefone</Label>
              <input
                id="ContactPhone"
                name="ContactPhone"
                value={formData.ContactPhone}
                onChange={handleInputChange}
                placeholder="Ex. +244 999 999 999"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={createAgency.isPending}
              />
            </div>
          </div>

          {/* Endereço */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="Address">Endereço</Label>
            <input
              id="Address"
              name="Address"
              value={formData.Address}
              onChange={handleInputChange}
              placeholder="Rua, cidade, província"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={createAgency.isPending}
            />
          </div>

          {/* Tipo de Agência */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="TourAgencyTypeId">Tipo de Agência</Label>
            <Combobox
              options={agencyTypeOptions}
              value={formData.TourAgencyTypeId ? agencyTypes.find((type) => type.value === formData.TourAgencyTypeId.toString())?.label || "" : ""}
              onChange={(value) => {
                const selectedType = agencyTypes.find((type) => type.label === value);
                setFormData((prev) => ({
                  ...prev,
                  TourAgencyTypeId: selectedType ? Number(selectedType.value) : 0,
                }));
              }}
              placeholder="Selecione o tipo"
            />
          </div>

          {/* Logo */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="logo">Logo da Agência</Label>
            <UploadArea onChange={(file) => setImage(file)} />
          </div>

          {/* Botão de envio */}
          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-500 transition-all flex items-center justify-center gap-2 py-2"
            disabled={createAgency.isPending}
          >
            {createAgency.isPending ? <Loader2 className="animate-spin" size={18} /> : "Criar Agência"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
