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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploader } from "@/components/image-loader";
import { AgencyMutation } from "./queryAgency";
import { Loader2 } from "lucide-react";

interface EditAgencyProps {
  children?: React.ReactNode;
  agencyData?: TourAgencyToCreate; 
}

export const EditAgency = ({ children, agencyData }: EditAgencyProps) => {
  const updateAgency = AgencyMutation();
  const [image, setImage] = useState<File | null>(agencyData?.Logo || null);
  const [image, setImage] = useState<File | null>(agencyData?.Logo || null);
  const [formData, setFormData] = useState<TourAgencyToCreate>(agencyData || {
      Name: "",
      Description: "",
      ContactEmail: "",
      ContactPhone: "",
      Address: "",
      TourAgencyTypeId: 0,
      Logo: null, 
    });

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
      Logo: image,
      Logo: image,
    };
    console.log("Atualizando dados:", payload);
    await updateAgency.mutate(payload);
  };

  return (
    <Dialog modal>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-xl max-h-[95%] p-6 rounded-lg overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-semibold text-gray-800">Editar Agência</DialogTitle>
          <DialogDescription className="text-gray-500">
            Atualize as informações da agência conforme necessário.
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
              disabled={updateAgency.isPending}
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
              className="focus:ring-2 focus:ring-orange-500 min-h-[120px]"
              disabled={updateAgency.isPending}
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
                disabled={updateAgency.isPending}
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
                disabled={updateAgency.isPending}
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
              disabled={updateAgency.isPending}
            />
          </div>

          {/* Tipo de Agência */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="TourAgencyTypeId">Tipo de Agência</Label>
            <Select
              defaultValue={String(formData.TourAgencyTypeId)}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  TourAgencyTypeId: Number(value),
                }))
              }
            >
              <SelectTrigger className="w-full ring-0 focus:ring-2 focus:ring-orange-500">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Guia Turístico</SelectItem>
                <SelectItem value="2">Agência de Turismo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Logo */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="logo">Logo da Agência</Label>
            <ImageUploader setImageUrl={(url: string) => {
              console.log("Received image URL:", url);
              // Convert the URL to a File or handle it as needed
              const file = null; // Replace this with logic to convert URL to File if applicable
              setImage(file);
            }} />
            <ImageUploader setImageUrl={(url: string) => {
              console.log("Received image URL:", url);
              // Convert the URL to a File or handle it as needed
              const file = null; // Replace this with logic to convert URL to File if applicable
              setImage(file);
            }} />
          </div>

          {/* Botão de atualização */}
          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-500 transition-all flex items-center justify-center gap-2 py-2"
            disabled={updateAgency.isPending}
          >
            {updateAgency.isPending ? <Loader2 className="animate-spin" size={18} /> : "Salvar Alterações"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
