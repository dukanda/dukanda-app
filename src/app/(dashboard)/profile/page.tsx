"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { authRoutes } from "@/api/routes/Auth/index.routes";
import { useQuery } from "@tanstack/react-query";

// Componente reutilizável para exibição de informações
function InfoDisplay({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-gray-600 font-medium">{label}</span>
      <p className="border bg-gray-100 text-gray-700 rounded-md px-3 py-2 text-sm">
        {value || "Não informado"}
      </p>
    </div>
  );
}

export default function Profile() {
  const userLogged = useQuery({
    queryKey: ["profile"],
    queryFn: async () => authRoutes.getCurrentUser(),
  });

  const userData = userLogged.data;

  return (
    <div className="flex flex-col gap-6 w-full p-6">
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Perfil do Usuário */}
        <Card className="w-full xl:w-1/2 shadow-lg rounded-lg">
          <CardHeader className="flex flex-col items-center gap-4 p-6">
            <Image
              src={userData?.avatarUrl || "https://github.com/dukanda.png"}
              alt="Avatar do usuário"
              width={120}
              height={120}
              className="rounded-full border-4 border-gray-200 shadow-md"
            />
            <Button className="bg-green-700 hover:bg-green-600 transition-all">
              Editar perfil
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            <CardTitle className="text-xl font-semibold text-gray-700 mb-5">
              Informações do Usuário
            </CardTitle>
            <div className="grid gap-4">
              <InfoDisplay label="Nome" value={userData?.name} />
              <InfoDisplay label="Email" value={userData?.email} />
              <InfoDisplay label="Contato" value={userData?.phoneNumber} />
            </div>
          </CardContent>
        </Card>

        {/* Seção de Fotos */}
        <Card className="w-full xl:w-1/2 shadow-lg rounded-lg">
          <CardHeader className="p-6">
            <CardTitle className="text-xl font-semibold text-gray-700">
              Galeria de Fotos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="w-[100px] h-[100px] bg-gray-300 rounded-md shadow-md"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
