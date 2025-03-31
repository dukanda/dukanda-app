"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Pen, Plus } from "lucide-react";
import { CreateAgency } from "./createAgency";
import { useQuery } from "@tanstack/react-query";
import { toursAgenciesRoutes } from "@/api/routes/TourAgency/index.routes";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { EditAgency } from "./editarAgency";

export default function Agency() {
  const user = Cookies.get("dukanda-user") || "";
  const userData = user ? JSON.parse(user) : "";

  const getTourAgencies = useQuery({
    queryKey: ['agencies'],
    queryFn: async () => {
      return await toursAgenciesRoutes.getTourAgencyById(userData?.id);
    },
  })
 
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 w-max md:flex-row">
        <CreateAgency>
          <Button
            className="bg-green-700 hover:bg-green-600 flex gap-4"
          >
            <Plus size={20} />
            Criar Agência
          </Button>
        </CreateAgency>
        <EditAgency>
          <Button
            className="bg-green-700 hover:bg-green-600 flex gap-4"
          >
            <Pen size={20} />
            Editar Informação
          </Button>
        </EditAgency>
      </div>

      <Card className="h-full flex flex-col lg:flex-row justify-between pb-5">
        <CardHeader>
          <Avatar className="w-20 h-20 object-fit-cover">
            <AvatarImage src={getTourAgencies.data?.logoUrl || "https://github.com/dukanda.png"} className="rounded-full w-full h-full object-fit-cover" />
            <AvatarFallback>{getTourAgencies.data?.name?.charAt(0) || ""}</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="w-full lg:w-[70%] h-full py-5">
          <CardTitle className="text-xl text-gray-500 mb-5">Informação da Agência</CardTitle>
          <div className="flex flex-col md:flex-row gap-2 w-full">
            <div className="w-full flex flex-col gap-3">
              <div>
                <Label className="text-md font-semibold text-gray-600">Nome</Label>
                <Input
                  name="nome"
                  placeholder={getTourAgencies.data?.name || "Nome da Agência"}
                  value={getTourAgencies.data?.name || ""}
                  disabled
                />
              </div>
              <div>
                <Label className="text-md font-semibold text-gray-600">Email</Label>
                <Input
                  name="email"
                  placeholder={getTourAgencies.data?.contactEmail || "Email da Agência"}
                  value={getTourAgencies.data?.contactEmail || ""}
                  disabled
                />
              </div>
              <div>
                <Label className="text-md font-semibold text-gray-600">Contacto</Label>
                <Input
                  name="contacto"
                  placeholder={getTourAgencies.data?.contactPhone || "Contacto da Agência"}
                  value={getTourAgencies.data?.contactPhone || ""}
                  disabled
                />
              </div>
              <div>
                <Label className="text-md font-semibold text-gray-600">Endereço</Label>
                <Input
                  name="endereco"
                  placeholder={getTourAgencies.data?.address || "Endereço da Agência"}
                  value={getTourAgencies.data?.address || ""}
                  disabled
                />
              </div>
              <div>
                <Label className="text-md font-semibold text-gray-600">Tipo de Agência</Label>
                <Input
                  name="tipo"
                  placeholder={getTourAgencies.data?.agencyType || "Tipo da Agência"}
                  value={getTourAgencies.data?.agencyType || ""}
                  disabled
                />
              </div>
            </div>
            <div className="w-full">
              <Label className="text-md font-semibold text-gray-600">Descrição</Label>
              <Textarea
                name="descricao"
                placeholder={getTourAgencies.data?.description || "Descrição da Agência"}
                value={getTourAgencies.data?.description || ""}
                className="min-h-[345px]"
                disabled
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}