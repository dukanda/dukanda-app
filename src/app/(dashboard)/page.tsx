import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingsTable } from "./booking-ficticios";

export default async function BookingsPage() {
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        {/* Tabs para filtrar os agendamentos */}
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="active">Ativos</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="canceled" className="hidden sm:flex">
            Cancelados
          </TabsTrigger>
        </TabsList>

        {/* Ações de Exportar e Adicionar */}
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Exportar
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
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
