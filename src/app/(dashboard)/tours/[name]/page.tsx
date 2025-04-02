"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toursRoutes } from "@/api/routes/Tours/index.routes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronLeft, MapPin, Pencil, PlusCircle } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreateItineraries } from "./addedItinerariesInTour";
import { CreateAttractions } from "./addedAttractionsInTour";
import { CreatePackageInTour } from "./addedPackageInTour";

// Dados fictícios para Itinerários, Pacotes e Atrações Turísticas
const fakeItineraries = [
  { id: 1, title: "Passeio de barco", description: "Navegação pela costa com paradas em ilhas.", duration: "4h" },
  { id: 2, title: "Trilha na montanha", description: "Caminhada ecológica com guia.", duration: "6h" },
];

const fakePackages = [
  { id: 1, name: "Pacote Premium", price: 250000, description: "Inclui transporte, alimentação e passeios exclusivos." },
  { id: 2, name: "Pacote Básico", price: 120000, description: "Inclui transporte e passeios básicos." },
];

const fakeAttractions = [
  { id: 1, name: "Cachoeira Azul", description: "Uma das cachoeiras mais bonitas da região." },
  { id: 2, name: "Mirante do Céu", description: "Vista panorâmica da cidade e do mar." },
];

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

      <Link href="/tours" className=" absolute top-20 left-20 bg-white text-gray-700 p-2 rounded-md shadow flex items-center gap-5">
        <ChevronLeft size={20} className="text-gray-700" />
        Voltar
      </Link>
      {/* Header */}
      <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={tour.coverImageUrl || "/placeholder.jpg"}
          alt={tour.title}
          layout="fill"
          objectFit="cover"
          className="opacity-90"
        />
        <div className="absolute top-4 left-4 bg-white/50 p-2 rounded-md shadow">
          <Avatar className="w-12 h-12">
            <AvatarImage src={tour.agencyLogoUrl} alt={tour.agencyName} className="w-12 h-12 object-cover" />
            <AvatarFallback className="bg-gray-200 text-gray-500">
              {tour.agencyName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Tour Info */}
      <div className="mt-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{tour.title}</h1>
        <Badge variant={"outline"} className="w-max  text-orange-600 ">{tour.tourTypes[0]?.name || "Sem categoria"}</Badge>

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

        <h2 className="text-lg font-semibold text-green-700">
          {new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(tour.basePrice)}
        </h2>
        <p>Descrição:</p>
        <p className="text-gray-600">{tour.description}</p>


        {/* Botões de Ação */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button variant="outline" className="flex items-center gap-2 border-gray-500">
            <Pencil size={18} /> Editar Tour
          </Button>

          <CreateItineraries tourId={tour.id}>
            <Button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500">
              <PlusCircle size={18} /> Adicionar Itinerário
            </Button>
          </CreateItineraries>

          <CreateAttractions tourId={tour.id}>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500">
              <PlusCircle size={18} /> Adicionar Atração Turística
            </Button>
          </CreateAttractions>

          <CreatePackageInTour tourId={tour.id}>
            <Button className="flex items-center gap-2 bg-green-700 hover:bg-green-600">
              <PlusCircle size={18} /> Adicionar Pacote
            </Button>
          </CreatePackageInTour>

        </div>

        {/* Seção de Itinerários */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Itinerários</h2>
          <div className="space-y-4">
            {fakeItineraries.map((itinerary) => (
              <div key={itinerary.id} className="border p-4 rounded-md shadow-sm bg-gray-100">
                <h3 className="text-lg font-medium">{itinerary.title}</h3>
                <p className="text-sm text-gray-600">{itinerary.description}</p>
                <p className="text-sm font-semibold mt-2">Duração: {itinerary.duration}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Pacotes */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Pacotes</h2>
          <div className="space-y-4">
            {fakePackages.map((pkg) => (
              <div key={pkg.id} className="border p-4 rounded-md shadow-sm bg-gray-100">
                <h3 className="text-lg font-medium">{pkg.name}</h3>
                <p className="text-sm text-gray-600">{pkg.description}</p>
                <p className="text-sm font-semibold mt-2 text-green-700">
                  {new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(pkg.price)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Atrações Turísticas */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Atrações Turísticas</h2>
          <div className="space-y-4">
            {fakeAttractions.map((attraction) => (
              <div key={attraction.id} className="border p-4 rounded-md shadow-sm bg-gray-100">
                <h3 className="text-lg font-medium">{attraction.name}</h3>
                <p className="text-sm text-gray-600">{attraction.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
