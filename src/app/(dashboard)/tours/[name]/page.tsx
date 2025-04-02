"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toursRoutes } from "@/api/routes/Tours/index.routes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Pencil, PlusCircle } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

export default function TourPage() {
  const { name } = useParams<{ name: string }>();

  const { data: tour, isLoading } = useQuery({
    queryKey: ["tourDetails", name],
    queryFn: async () => await toursRoutes.getTourById(name),
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-96">Carregando...</div>;
  }

  if (!tour) {
    return <div className="flex justify-center items-center h-96 text-red-500">Tour não encontrada.</div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={tour.coverImageUrl || "/placeholder.jpg"}
          alt={tour.title}
          layout="fill"
          objectFit="cover"
          className="opacity-90"
        />
        <div className="absolute top-4 left-4 bg-white p-2 rounded-md shadow">
          <Image src={tour.agencyLogoUrl} alt={tour.agencyName} width={50} height={50} className="rounded-full" />
        </div>
      </div>

      {/* Tour Info */}
      <div className="mt-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{tour.title}</h1>
        <Badge className="w-max">{tour.tourTypes[0]?.name || "Sem categoria"}</Badge>

        <div className="flex items-center gap-4 text-gray-700">
          <MapPin size={18} />
          <span>{tour.cityName}</span>
        </div>

        <div className="flex items-center gap-4 text-gray-700">
          <CalendarDays size={18} />
          <span>
            {format(new Date(tour.startDate), "dd/MM/yyyy", { locale: pt })} -{" "}
            {format(new Date(tour.endDate), "dd/MM/yyyy", { locale: pt })}
          </span>
        </div>

        <p className="text-gray-600">{tour.description}</p>

        <h2 className="text-lg font-semibold text-green-700">
          {new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(tour.basePrice)}
        </h2>

        {/* Botões de Ação */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button variant="outline" className="flex items-center gap-2 border-gray-500">
            <Pencil size={18} /> Editar Tour
          </Button>

          <Button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500">
            <PlusCircle size={18} /> Adicionar Itinerário
          </Button>

          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500">
            <PlusCircle size={18} /> Adicionar Atração Turística
          </Button>

          <Button className="flex items-center gap-2 bg-green-700 hover:bg-green-600">
            <PlusCircle size={18} /> Adicionar Pacote
          </Button>
        </div>

        <Link href="/tours" className="text-gray-500 mt-6 block text-center underline">
          Voltar para a lista de tours
        </Link>
      </div>
    </div>
  );
}
