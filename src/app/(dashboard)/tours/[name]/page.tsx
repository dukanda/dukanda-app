"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toursRoutes } from "@/api/routes/Tours/index.routes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronLeft, MapPin, Pencil, PlusCircle, ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreateItineraries } from "./addedItinerariesInTour";
import { CreateAttractions } from "./addedAttractionsInTour";
import { CreatePackageInTour } from "./addedPackageInTour";
import { useState } from "react";

export default function TourPage() {
  const { name } = useParams<{ name: string }>();

  const { data: tour, isLoading } = useQuery({
    queryKey: ["tourDetails", name],
    queryFn: async () => await toursRoutes.getTourById(name),
  });

  const [showItineraries, setShowItineraries] = useState(true);
  const [showPackages, setShowPackages] = useState(true);
  const [showAttractions, setShowAttractions] = useState(true);

  if (isLoading) {
    return <div className="flex justify-center items-center h-96">Carregando...</div>;
  }

  if (!tour) {
    return <div className="flex justify-center items-center h-96 text-red-500">Tour não encontrada.</div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <Link href="/tours" className="absolute top-20 left-20 bg-white text-gray-700 p-2 rounded-md shadow flex items-center gap-5">
        <ChevronLeft size={20} className="text-gray-700" />
        Voltar
      </Link>

      {/* Header */}
      <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
        <Image src={tour.coverImageUrl || "/placeholder.jpg"} alt={tour.title} layout="fill" objectFit="cover" className="opacity-90" />
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
        <Badge variant={"outline"} className="w-max text-orange-600">{tour.tourTypes[0]?.name || "Sem categoria"}</Badge>

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

        {/* Itinerários */}
        <div className="mt-10">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowItineraries(!showItineraries)}>
            <h2 className="text-xl font-semibold">Itinerários</h2>
            {showItineraries ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
          {!showItineraries && <hr className="my-4 border-gray-300" />}
          {showItineraries && (
            <div className="space-y-4 mt-2">
              {tour.itineraries.map(itinerary => (
                <div key={itinerary.id} className="border p-4 rounded-md shadow-sm bg-gray-100">
                  <h3 className="text-lg font-medium">{itinerary.title}</h3>
                  <p className="text-sm text-gray-600">{itinerary.description}</p>
                  <p className="text-sm font-semibold mt-2">
                    Data: {format(new Date(itinerary.date), "dd/MM/yyyy", { locale: pt })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pacotes */}
        <div className="mt-10">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowPackages(!showPackages)}>
            <h2 className="text-xl font-semibold">Pacotes</h2>
            {showPackages ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
          {!showPackages && <hr className="my-4 border-gray-300" />}
          {showPackages && (
            <div className="space-y-4 mt-2">
              {tour.packages.map(pkg => (
                <div key={pkg.id} className="border p-4 rounded-md shadow-sm bg-gray-100">
                  <h3 className="text-lg font-medium">{pkg.name}</h3>
                  <p className="text-sm font-semibold text-green-700">
                    {new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(pkg.price)}
                  </p>
                  <ul className="text-sm text-gray-600 mt-2 list-disc pl-5">
                    {pkg.benefits.map(benefit => (
                      <li key={benefit.id}>{benefit.name} - {benefit.description}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Atrações */}
        <div className="mt-10">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowAttractions(!showAttractions)}>
            <h2 className="text-xl font-semibold">Atrações Turísticas</h2>
            {showAttractions ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
          {!showAttractions && <hr className="my-4 border-gray-300" />}
          {showAttractions && (
            <div className="space-y-4 mt-2">
             {tour.attractions.map(attraction => (
              <div key={attraction.id} className="border p-4 rounded-md shadow-sm bg-gray-100">
                <h3 className="text-lg font-medium">{attraction.name}</h3>
                <p className="text-sm text-gray-600">{attraction.description}</p>
                <Image
                  src={attraction.imageUrl || "/placeholder.jpg"}
                  alt={attraction.name}
                  width={400}
                  height={250}
                  className="mt-2 rounded-md"
                />
              </div>
            ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
