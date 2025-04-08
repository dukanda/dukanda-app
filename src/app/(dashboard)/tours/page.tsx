"use client"

import { Button } from "@/components/ui/button"
import {
  CircleFadingPlus,
  MapPin,
  CalendarDays,
  Loader2,
} from "lucide-react"
import { CreateTours } from "./createTours"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { toursRoutes } from "@/api/routes/Tours/index.routes"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function ToursScreen() {
  const myAgencyTours = useQuery({
    queryKey: ["myAgencyTours"],
    queryFn: async () => await toursRoutes.getToursMyAgency(),
  })

  const tours = myAgencyTours.data?.items ?? []

  return (
    <div className="w-full min-h-screen flex flex-col gap-6 px-4 md:px-8 py-6">
      {/* Ação de criação */}
      <div className="flex justify-end">
        <CreateTours>
          <Button className="bg-green-700 hover:bg-orange-500 text-white flex items-center gap-2 px-5 py-2.5 shadow-sm">
            <CircleFadingPlus size={18} />
            Criar Passeio
          </Button>
        </CreateTours>
      </div>

      {/* Estados de carregamento / vazio / grid */}
      {myAgencyTours.isLoading ? (
        <div className="flex justify-center items-center h-96">
          <Loader2 className="animate-spin text-muted-foreground" size={32} />
        </div>
      ) : tours.length === 0 ? (
        <div className="flex justify-center items-center h-96 text-muted-foreground text-base">
          Nenhum passeio cadastrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="rounded-lg border bg-background shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              <Image
                src={tour.coverImageUrl || "/placeholder.jpg"}
                alt={tour.title}
                width={400}
                height={250}
                className="w-full h-56 object-cover bg-muted"
              />

              <div className="p-4 space-y-2 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {tour.title}
                </h3>

                <Badge variant="outline" className="w-fit border-orange-300 text-orange-700 text-xs py-1 px-2">
                  Aprovação: <span className="ml-1 font-semibold">PENDENTE</span>
                </Badge>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={16} />
                  <span>{tour.cityName}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays size={16} />
                  <span>
                    {format(new Date(tour.startDate), "dd/MM/yyyy")} -{" "}
                    {format(new Date(tour.endDate), "dd/MM/yyyy")}
                  </span>
                </div>

                <div className="text-sm text-green-600 font-semibold">
                  {new Intl.NumberFormat("pt-AO", {
                    style: "currency",
                    currency: "AOA",
                  }).format(tour.basePrice)}
                </div>

                <div className="pt-4 mt-auto">
                  <Link href={`/tours/${tour.id}`} className="block">
                    <Button className="w-full bg-orange-600 hover:bg-orange-500 text-white">
                      Ver Detalhes e Editar
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
