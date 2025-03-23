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

interface CreateAgencyProps {
  children?: React.ReactNode;
}

interface AgencyData {
  userId: string;
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  logoUrl?: string;
  tourAgencyTypeId: number;
}

export const CreateAgency = ({ children }: CreateAgencyProps) => {
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState<AgencyData>({
    userId: "5ae3e69a-d719-46a3-8b03-e32424760f89",
    name: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    logoUrl: "",
    tourAgencyTypeId: 0,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "tourAgencyTypeId" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simular envio ao backend
    const payload = {
      ...formData,
      logoUrl: image ? image : "",
    };
    console.log("Dados enviados:", payload);
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
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Digite o nome da agência"
              className="focus:ring-0 focus-visible:ring-0 outline-none"
            />
          </div>

          {/* Descrição */}
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Descreva a agência"
              className="focus:ring-0 focus-visible:ring-0 outline-none min-h-[100px] max-h-[200px]"
            />
          </div>

          {/* E-mail de Contato */}
          <div>
            <Label htmlFor="contactEmail">E-mail</Label>
            <Input
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleInputChange}
              placeholder="exemplo@empresa.com"
              className="focus:ring-0 focus-visible:ring-0 outline-none"
            />
          </div>

          {/* Telefone de Contato */}
          <div>
            <Label htmlFor="contactPhone">Telefone de Contato</Label>
            <Input
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleInputChange}
              placeholder="Ex. +244 999 999 999"
              className="focus:ring-0 focus-visible:ring-0 outline-none"
            />
          </div>

          {/* Endereço */}
          <div>
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Rua, cidade, província"
              className="focus:ring-0 focus-visible:ring-0 outline-none"
            />
          </div>

          <div>
            <Label htmlFor="tourAgencyTypeId">Tipo de Agência</Label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  tourAgencyTypeId: Number(value),
                }))
              }
            >
              <SelectTrigger className="w-full ring-0 focus:ring-0 focus-visible:ring-0 outline-none">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Agência de Turismo</SelectItem>
                <SelectItem value="2">Agência de Viagens</SelectItem>
                <SelectItem value="3">Agência de Viagens e Turismo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Logo da Agência */}
          <div>
            <Label htmlFor="logo">Logo da Agência</Label>
            <ImageUploader setImageUrl={setImage}/>
          </div>

          {/* Botão de Submissão */}
          <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-500">
            Criar Agência
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
