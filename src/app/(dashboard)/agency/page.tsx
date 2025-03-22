import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Plus } from "lucide-react";
import Image from "next/image";


export default function Agency() {

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button className="bg-green-700 hover:bg-green-600 flex gap-4"> <Plus size={20} /> Criar Agência</Button>
      </div>

      <Card className="h-full flex justify-between pb-5">
        <CardHeader>
          <Image src="/bus.png" alt="Agência" width={200} height={200} className="rounded-full" />
        </CardHeader>
        <CardContent className="w-[70%] h-full py-5">
          <CardTitle className="text-xl text-gray-500 mb-5">Informação da Agência</CardTitle>
          <div className="flex gap-2">
            <div className="w-full flex flex-col gap-3">
              <div>
                <Label className="text-md font-semibold text-gray-600">Nome</Label>
                <Input placeholder="Nome da Agência" disabled />
              </div>
              <div>
                <Label className="text-md font-semibold text-gray-600">Email</Label>
                <Input placeholder="Email da Agência" disabled />
              </div>
              <div>
                <Label className="text-md font-semibold text-gray-600">Contacto</Label>
                <Input placeholder=" Contacto da Agência" disabled />
              </div>
              <div>
                <Label className="text-md font-semibold text-gray-600">Endereço</Label>
                <Input placeholder=" Endereço da Agência" disabled />
              </div>
              <div>
                <Label className="text-md font-semibold text-gray-600">Tipo de Agência</Label>
                <Input placeholder=" Tipo da Agência" disabled />
              </div>
            </div>
            <div className=" w-full">
              <Label className="text-md font-semibold text-gray-600">Descrição</Label>
              <Textarea placeholder="Descrição da Agência" disabled className=" min-h-[345px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
/*
"name": "string",
    "description": "string",
    "contactEmail": "string",
    "contactPhone": "string",
    "address": "string",
    "logoUrl": "string",
    "tourAgencyTypeId": 0,
    "agencyType": "string",
    "toursCount": 0

    */