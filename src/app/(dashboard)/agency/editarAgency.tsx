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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUploader } from "@/components/image-loader";
import { AgencyMutation } from "./queryAgency";

interface CreateAgencyProps {
  children?: React.ReactNode;
}

export const EditAgency = ({ children }: CreateAgencyProps) => {
  const createAgency = AgencyMutation();
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState<TourAgencyToCreate>({
    Name: "",
    Description: "",
    ContactEmail: "",
    ContactPhone: "",
    Address: "",
    Logo: "",
    TourAgencyTypeId: 0,
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
      Logo: image ? image : "",
    };
    console.log("Dados enviados:", payload);
    await createAgency.mutate(payload);
  };

  return (
    <Dialog modal={true}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-lg h-[90%] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <DialogHeader>
          <DialogTitle>Criar Nova Agência</DialogTitle>
          <DialogDescription>Preencha os detalhes abaixo para criar uma nova agência de turismo.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <Label htmlFor="name">Nome da Agência</Label>
            <Input
              id="Name"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
              placeholder="Digite o nome da agência"
              className="focus:ring-0 focus-visible:ring-0 outline-none"
              disabled={createAgency.isPending}
            />
          </div>

          {/* Descrição */}
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="Description"
              name="Description"
              value={formData.Description}
              onChange={handleInputChange}
              placeholder="Descreva a agência"
              className="focus:ring-0 focus-visible:ring-0 outline-none min-h-[100px] max-h-[200px]"
              disabled={createAgency.isPending}
            />
          </div>

          {/* E-mail de Contato */}
          <div>
            <Label htmlFor="contactEmail">E-mail</Label>
            <Input
              id="ContactEmail"
              name="ContactEmail"
              type="email"
              value={formData.ContactEmail}
              onChange={handleInputChange}
              placeholder="exemplo@empresa.com"
              className="focus:ring-0 focus-visible:ring-0 outline-none"
              disabled={createAgency.isPending}
            />
          </div>

          {/* Telefone de Contato */}
          <div>
            <Label htmlFor="contactPhone">Telefone de Contato</Label>
            <Input
              id="ContactPhone"
              name="ContactPhone"
              value={formData.ContactPhone}
              onChange={handleInputChange}
              placeholder="Ex. +244 999 999 999"
              className="focus:ring-0 focus-visible:ring-0 outline-none"
              disabled={createAgency.isPending}
            />
          </div>

          {/* Endereço */}
          <div>
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="Address"
              name="Address"
              value={formData.Address}
              onChange={handleInputChange}
              placeholder="Rua, cidade, província"
              className="focus:ring-0 focus-visible:ring-0 outline-none"
              disabled={createAgency.isPending}
            />
          </div>

          <div>
            <Label htmlFor="tourAgencyTypeId">Tipo de Agência</Label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  TourAgencyTypeId: Number(value),
                }))
              }
            >
              <SelectTrigger className="w-full ring-0 focus:ring-0 focus-visible:ring-0 outline-none">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Guia Turístico</SelectItem>
                <SelectItem value="2">Agência de Turismo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Logo da Agência */}
          <div>
            <Label htmlFor="logo">Logo da Agência</Label>
            <ImageUploader setImageUrl={setImage} />
          </div>

          {/* Botão de Submissão */}
          <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-500">
            { createAgency.isPending ? "Criando..." : "Criar Agência"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
