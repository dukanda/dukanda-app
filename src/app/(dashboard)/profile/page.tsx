
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";

export default function Profile() {

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className=" flex flex-col md:flex-row gap-3 h-full ">
        <Card className="w-full h-full flex flex-col md:flex-row gap-10">
          <CardHeader className=" flex items-center">
            <Image src="/bus.png" alt="Agência" width={200} height={200} className="rounded-full" />
            <Button  className="bg-green-700 hover:bg-green-600">Editar perfil</Button>
          </CardHeader>
          <CardContent className="py-5 w-full md:w-[400px]" >
            <CardTitle className="text-xl text-gray-500 mb-5">Informação</CardTitle>
            <div className="flex flex-col md:flex-row gap-2 w-full">
              <div className="w-full flex flex-col gap-3">
                <div>
                  <Label className="text-md font-semibold text-gray-600">Nome</Label>
                  <Input
                    name="nome"
                    placeholder="Nome da Agência"
                  />
                </div>
                <div>
                  <Label className="text-md font-semibold text-gray-600">Email</Label>
                  <Input
                    name="email"
                    placeholder="Email da Agência"
                  />
                </div>
                <div>
                  <Label className="text-md font-semibold text-gray-600">Contacto</Label>
                  <Input
                    name="contacto"
                    placeholder="Contacto da Agência"
                  />
                </div>
                <div>
                  <Label className="text-md font-semibold text-gray-600">Endereço</Label>
                  <Input
                    name="endereco"
                    placeholder="Endereço da Agência"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full min-h-full flex flex-col lg:flex-row justify-between pb-5 py-3">
          <CardHeader className="hidden">
          </CardHeader>
          <CardContent className="">
            <CardTitle className="text-xl text-gray-500 mb-5">Fotos</CardTitle>
            <div className=" flex flex-wrap gap-3">
              <div className="size-[100px] rounded-md bg-gray-400"></div>
              <div className="size-[100px] rounded-md bg-gray-400"></div>
              <div className="size-[100px] rounded-md bg-gray-400"></div>
              <div className="size-[100px] rounded-md bg-gray-400"></div>
              <div className="size-[100px] rounded-md bg-gray-400"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* <Card className="w-full h-full flex flex-col lg:flex-row justify-between pb-5">
        <CardHeader className="hidden">
        </CardHeader>
        <CardContent className="w-full h-full py-5 ">
          <CardTitle className="text-xl text-gray-500 mb-5">Informação</CardTitle>
          <div className="flex flex-col md:flex-row gap-2 w-full">
            <div className="w-full flex flex-col gap-3">
              <div>
                <Label className="text-md font-semibold text-gray-600">Nome</Label>
                <Input
                  name="nome"
                  placeholder="Nome da Agência"
                />
              </div>
              <div>
                <Label className="text-md font-semibold text-gray-600">Email</Label>
                <Input
                  name="email"
                  placeholder="Email da Agência"
                />
              </div>
              <div>
                <Label className="text-md font-semibold text-gray-600">Contacto</Label>
                <Input
                  name="contacto"
                  placeholder="Contacto da Agência"
                />
              </div>
              <div>
                <Label className="text-md font-semibold text-gray-600">Endereço</Label>
                <Input
                  name="endereco"
                  placeholder="Endereço da Agência"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}