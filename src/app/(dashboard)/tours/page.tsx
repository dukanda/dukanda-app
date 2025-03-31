"use client";
import { Button } from "@/components/ui/button";
import { CircleFadingPlus, MapPin, CalendarDays } from "lucide-react";
import { CreateTours } from "./createTours";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { toursRoutes } from "@/api/routes/Tours";
import { format } from "date-fns";

export default function ToursScreen() {

  const myAgencyTours = useQuery({
    queryKey: ['myAgencyTours'],
    queryFn: async () => {
      return await toursRoutes.getToursMyAgency();
    },
  })

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* Botão para criar passeios */}
      <div>
        <CreateTours>
          <Button className="bg-green-700 hover:bg-green-600 flex gap-4">
            <CircleFadingPlus size={20} /> Criar Passeios
          </Button>
        </CreateTours>
      </div>

      {/* Verificação de Passeios */}
      {myAgencyTours.data?.items.length === 0 ? (
        <div className="flex justify-center items-center h-96 text-gray-500">
          Sem passeios cadastrados.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myAgencyTours.data?.items.map((tour) => (
            <div key={tour.id} className="border rounded-lg overflow-hidden shadow-md bg-white">
              <Image
                src={tour.coverImageUrl}
                alt={tour.title}
                width={400}
                height={250}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{tour.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {tour.description}
                </p>

                <div className="flex items-center gap-2 mt-4 text-sm text-gray-700">
                  <MapPin size={16} />
                  <span>{tour.cityName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-2 text-gray-700">
                  <CalendarDays size={16} />
                  <span>
                    {format(new Date(tour.startDate), "dd/MM/yyyy")} - {format(new Date(tour.endDate), "dd/MM/yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-2 text-green-600 font-semibold">
                  <span>{tour.basePrice.toFixed(2)} kz</span>
                </div>

                <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-500">Ver em Detalhes</Button>
                <Button variant={"outline"} className="w-full mt-4 border border-green-500 text-green-500">Editar</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
