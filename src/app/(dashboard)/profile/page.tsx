"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { authRoutes } from "@/api/routes/Auth/index.routes";
import { useQuery } from "@tanstack/react-query";

export default function Profile() {
  const userLogged = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      return await authRoutes.getCurrentUser();
    },
  });

  console.log(userLogged.data, "userLogged");

  const userData = userLogged.data;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col md:flex-row gap-3 h-full">
        <Card className="w-full h-full flex flex-col md:flex-row gap-10">
          <CardHeader className="flex items-center gap-4">
            <Image
              src={userData?.avatarUrl || "https://github.com/dukanda.png"}
              alt="Avatar do usuário"
              width={200}
              height={200}
              className="rounded-full"
            />
            <Button className="bg-green-700 hover:bg-green-600">Editar perfil</Button>
          </CardHeader>
          <CardContent className="py-5 w-full md:w-[400px]">
            <CardTitle className="text-xl text-gray-500 mb-5">Informação</CardTitle>
            <div className="flex flex-col md:flex-row gap-2 w-full">
              <div className="w-full flex flex-col gap-3">
                <div>
                  <Label className="text-md font-semibold text-gray-600">Nome</Label>
                  <Input
                    name="nome"
                    placeholder="Nome da Agência"
                    value={userData?.name || ""}
                    disabled={!!userData}
                  />
                </div>
                <div>
                  <Label className="text-md font-semibold text-gray-600">Email</Label>
                  <Input
                    name="email"
                    placeholder="Email da Agência"
                    value={userData?.email || ""}
                    disabled={!!userData}
                  />
                </div>
                <div>
                  <Label className="text-md font-semibold text-gray-600">Contacto</Label>
                  <Input
                    name="contacto"
                    placeholder="Contacto da Agência"
                    value={userData?.phoneNumber || ""}
                    disabled={!!userData}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full min-h-full flex flex-col lg:flex-row justify-between pb-5 py-3">
          <CardHeader className="hidden"></CardHeader>
          <CardContent>
            <CardTitle className="text-xl text-gray-500 mb-5">Fotos</CardTitle>
            <div className="flex flex-wrap gap-3">
              <div className="size-[100px] rounded-md bg-gray-400"></div>
              <div className="size-[100px] rounded-md bg-gray-400"></div>
              <div className="size-[100px] rounded-md bg-gray-400"></div>
              <div className="size-[100px] rounded-md bg-gray-400"></div>
              <div className="size-[100px] rounded-md bg-gray-400"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}