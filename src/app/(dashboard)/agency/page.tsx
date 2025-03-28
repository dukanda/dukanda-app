"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Pen, Plus } from "lucide-react";
import Image from "next/image";
import { CreateAgency } from "./createAgency";
import { useState } from "react";

export default function Agency() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    contacto: "",
    endereco: "",
    tipo: "",
    descricao: "",
    toursCount: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Dados da Agência:", formData);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 w-max md:flex-row">
        <CreateAgency>
          <Button
            className="bg-green-700 hover:bg-green-600 flex gap-4"
            onClick={handleSubmit}
          >
            <Plus size={20} />
            Criar Agência
          </Button>
        </CreateAgency>
        <CreateAgency>
          <Button
            className="bg-green-700 hover:bg-green-600 flex gap-4"
            onClick={handleSubmit}
          >
            <Pen size={20} />
            Editar Informação
          </Button>
        </CreateAgency>
      </div>

      <Card className="h-full flex flex-col lg:flex-row justify-between pb-5">
        <CardHeader>
          <Image src="/bus.png" alt="Agência" width={200} height={200} className="rounded-full" />
        </CardHeader>
        <CardContent className="w-full lg:w-[70%] h-full py-5">
          <CardTitle className="text-xl text-gray-500 mb-5">Informação da Agência</CardTitle>
          <div className="flex flex-col md:flex-row gap-2 w-full">
            <div className="w-full flex flex-col gap-3">
              <div>
                <Label className="text-md font-semibold text-gray-600">Nome</Label>
                <Input
                  name="nome"
                  placeholder="Nome da Agência"
                  value={formData.nome}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label className="text-md font-semibold text-gray-600">Email</Label>
                <Input
                  name="email"
                  placeholder="Email da Agência"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label className="text-md font-semibold text-gray-600">Contacto</Label>
                <Input
                  name="contacto"
                  placeholder="Contacto da Agência"
                  value={formData.contacto}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label className="text-md font-semibold text-gray-600">Endereço</Label>
                <Input
                  name="endereco"
                  placeholder="Endereço da Agência"
                  value={formData.endereco}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label className="text-md font-semibold text-gray-600">Tipo de Agência</Label>
                <Input
                  name="tipo"
                  placeholder="Tipo da Agência"
                  value={formData.tipo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="w-full">
              <Label className="text-md font-semibold text-gray-600">Descrição</Label>
              <Textarea
                name="descricao"
                placeholder="Descrição da Agência"
                value={formData.descricao}
                onChange={handleInputChange}
                className="min-h-[345px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}