"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Pen, Plus } from "lucide-react";
import { CreateAgency } from "./createAgency";
import { useQuery } from "@tanstack/react-query";
import { toursAgenciesRoutes } from "@/api/routes/TourAgency/index.routes";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { EditAgency } from "./editarAgency";
import { Label } from "@/components/ui/label";

function InfoDisplay({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-gray-600 font-medium">{label}</Label>
      <p className="border bg-gray-100 text-gray-700 rounded-md px-3 py-2 text-sm">
        {value || "Não informado"}
      </p>
    </div>
  );
}

export default function Agency() {
  const user = Cookies.get("dukanda-user") || "";
  const userData = user ? JSON.parse(user) : "";

  const getTourAgencies = useQuery({
    queryKey: ["agencies"],
    queryFn: async () => {
      return await toursAgenciesRoutes.getTourAgencyById(userData?.id);
    },
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Botões de ação */}
      <div className="flex flex-wrap gap-3">
        <CreateAgency>
          <Button className="bg-green-700 hover:bg-green-600 flex items-center gap-2">
            <Plus size={18} />
            Criar Agência
          </Button>
        </CreateAgency>
        <EditAgency>
          <Button className="bg-green-700 hover:bg-green-600 flex items-center gap-2">
            <Pen size={18} />
            Editar Informação
          </Button>
        </EditAgency>
      </div>

      {/* Card com informações da Agência */}
      <Card className="flex flex-col lg:flex-row items-start gap-6 p-6">
        {/* Avatar da Agência */}
        <CardHeader className="flex items-center justify-center">
          <Avatar className="w-32 h-32 border-4 border-gray-300 rounded-full">
            <AvatarImage
              src={getTourAgencies.data?.logoUrl || "https://github.com/dukanda.png"}
              className="w-full h-full object-cover rounded-full"
            />
            <AvatarFallback className="bg-gray-200 text-gray-600 text-xl font-semibold">
              {getTourAgencies.data?.name?.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>
        </CardHeader>

        {/* Informações da Agência */}
        <CardContent className="w-full flex flex-col gap-6">
          <CardTitle className="text-2xl font-semibold text-gray-700">Informação da Agência</CardTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <InfoDisplay label="Nome" value={getTourAgencies.data?.name} />
              <InfoDisplay label="Email" value={getTourAgencies.data?.contactEmail} />
              <InfoDisplay label="Contato" value={getTourAgencies.data?.contactPhone} />
              <InfoDisplay label="Endereço" value={getTourAgencies.data?.address} />
              <InfoDisplay label="Tipo de Agência" value={getTourAgencies.data?.agencyType} />
            </div>

            {/* Descrição da Agência */}
            <div className="flex flex-col">
              <Label className="text-gray-600 font-medium">Descrição</Label>
              <Textarea
                name="descricao"
                value={getTourAgencies.data?.description || ""}
                placeholder="Descrição da Agência"
                className="min-h-[200px]"
                disabled
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
