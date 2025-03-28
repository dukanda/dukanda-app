import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingsTable } from "./booking-ficticios";

export default async function BookingsPage() {
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        {/* Tabs para filtrar os agendamentos */}
        <TabsList className="border">
          <TabsTrigger value="all" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Todos</TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Ativos</TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Pendentes</TabsTrigger>
          <TabsTrigger value="canceled" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Cancelados
          </TabsTrigger>
        </TabsList>

        {/* Ações de Exportar e Adicionar */}
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-10 bg-orange-500 hover:bg-orange-600 gap-1">
            <File className="h-4 w-4 text-white" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap text-white">
              Exportar
            </span>
          </Button>
          <Button size="sm" className="h-10 bg-green-700 hover:bg-green-600 gap-1">
            <PlusCircle className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Adicionar Agendamento
            </span>
          </Button>
        </div>
      </div>

      {/* Conteúdo das Tabs com a tabela de agendamentos */}
      <TabsContent value="all">
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
