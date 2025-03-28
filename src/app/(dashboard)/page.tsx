import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingsTable } from "./booking-ficticios";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FaFileExcel, FaFilePdf, FaFileWord } from "react-icons/fa";

export default async function BookingsPage() {
  return (
    <Tabs defaultValue="all" >
      <div className="flex flex-col  md:flex-row md:w-full md:justify-between gap-3 w-max">
        {/* Tabs para filtrar os agendamentos */}
        <TabsList className="border shadow-sm">
          <TabsTrigger value="all" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Todos</TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Ativos</TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Pendentes</TabsTrigger>
          <TabsTrigger value="canceled" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Cancelados
          </TabsTrigger>
        </TabsList>

        {/* Ações de Exportar e Adicionar
        ml-auto flex items-center gap-2
        */}
        <div className="flex gap-3">
          <ChangeExportMethod>
            <Button size="sm" variant="outline" className="h-10 bg-orange-500 hover:bg-orange-600 gap-1">
              <File className="h-4 w-4 text-white" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap text-white">
                Exportar
              </span>
            </Button>
          </ChangeExportMethod>
          <Button size="sm" className="h-10 bg-green-700 hover:bg-green-600 gap-1">
            <PlusCircle className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Adicionar Agendamento
            </span>
          </Button>
        </div>
      </div>

      {/* Conteúdo das Tabs com a tabela de agendamentos */}
      <TabsContent value="all" className="">
        <BookingsTable status="all" />
      </TabsContent>
      <TabsContent value="active">
        <BookingsTable status="active" />
      </TabsContent>
      <TabsContent value="pending">
        <BookingsTable status="pending" />
      </TabsContent>
      <TabsContent value="canceled">
        <BookingsTable status="canceled" />
      </TabsContent>
    </Tabs>
  );
}


const ChangeExportMethod = ({ children }: { children?: React.ReactNode }) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-green-800"> Método de exportação </DialogTitle>
          <DialogDescription>
            Escolha o método de exportação dos dados.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex justify-center items-center gap-4">
          <Button variant={"outline"} className=" w-[80px] h-[80px] hover:border-green-800 ">
            <FaFileExcel className="size-8 text-green-800" />
          </Button>

          <Button variant={"outline"} className=" w-[80px] h-[80px] hover:border-blue-800 ">
            <FaFileWord className="size-8 text-blue-800" />
          </Button>

          <Button variant={"outline"} className=" w-[80px] h-[80px] hover:border-red-600 ">
            <FaFilePdf className="size-8 text-red-800" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}