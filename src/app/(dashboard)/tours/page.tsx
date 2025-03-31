"use client";

import { Button } from "@/components/ui/button";
import { CircleFadingPlus, MapPin, CalendarDays, Loader2 } from "lucide-react";
import { CreateTours } from "./createTours";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { toursRoutes } from "@/api/routes/Tours";
import { format } from "date-fns";

export default function ToursScreen() {
  const myAgencyTours = useQuery({
    queryKey: ["myAgencyTours"],
    queryFn: async () => await toursRoutes.getToursMyAgency(),
  });

  return (
    <div className="w-full min-h-screen flex flex-col gap-6 px-4 md:px-8">
      {/* Botão para Criar Passeios */}
      <div className="flex justify-end">
        <CreateTours>
          <Button className="bg-green-700 hover:bg-green-600 flex items-center gap-3 px-6 py-3 transition-all">
            <CircleFadingPlus size={20} /> Criar Passeio
          </Button>
        </CreateTours>
      </div>

      {/* Feedback de carregamento */}
      {myAgencyTours.isLoading ? (
        <div className="flex justify-center items-center h-96">
          <Loader2 className="animate-spin text-gray-500" size={32} />
        </div>
      ) : myAgencyTours.data?.items.length === 0 ? (
        <div className="flex justify-center items-center h-96 text-gray-500 text-lg">
          Nenhum passeio cadastrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myAgencyTours.data?.items.map((tour) => (
            <div
              key={tour.id}
              className="border rounded-lg overflow-hidden shadow-lg bg-white transition-transform hover:scale-105"
            >
              {/* Imagem */}
              <Image
                src={tour.coverImageUrl || "/placeholder.jpg"}
                alt={tour.title}
                width={400}
                height={250}
                className="w-full h-56 object-cover bg-gray-100"
              />

              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-900">{tour.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{tour.description}</p>

                <div className="flex items-center gap-2 text-sm text-gray-700 mt-2">
                  <MapPin size={16} />
                  <span>{tour.cityName}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-700 mt-2">
                  <CalendarDays size={16} />
                  <span>
                    {format(new Date(tour.startDate), "dd/MM/yyyy")} -{" "}
                    {format(new Date(tour.endDate), "dd/MM/yyyy")}
                  </span>
                </div>

                <div className="flex items-center text-sm text-green-600 font-semibold mt-2">
                  <span>{new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(tour.basePrice)}</span>
                </div>

                <div className="flex flex-col gap-3 mt-4">
                  <Button className="w-full bg-orange-600 hover:bg-orange-500">Ver Detalhes</Button>
                  <Button variant="outline" className="w-full border border-green-500 text-green-500">
                    Editar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
