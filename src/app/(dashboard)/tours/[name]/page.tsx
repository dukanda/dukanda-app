"use client"

import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { toursRoutes } from "@/api/routes/Tours/index.routes"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import {
  CalendarDays,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  MapPin,
  Pencil,
  PlusCircle,
} from "lucide-react"
import { format } from "date-fns"
import { pt } from "date-fns/locale"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CreateItineraries } from "./addedItinerariesInTour"
import { CreateAttractions } from "./addedAttractionsInTour"
import { CreatePackageInTour } from "./addedPackageInTour"
import { useState } from "react"

export default function TourPage() {
  const { name } = useParams<{ name: string }>()
  const { data: tour, isLoading } = useQuery({
    queryKey: ["tourDetails", name],
    queryFn: async () => await toursRoutes.getTourById(name),
  })

  const [showItineraries, setShowItineraries] = useState(true)
  const [showPackages, setShowPackages] = useState(true)
  const [showAttractions, setShowAttractions] = useState(true)

  if (isLoading) {
    return <div className="flex justify-center items-center h-96">Carregando...</div>
  }

  if (!tour) {
    return <div className="flex justify-center items-center h-96 text-red-500">Tour não encontrada.</div>
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Voltar */}
      <Link
        href="/tours"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
      >
        <ChevronLeft size={16} />
        Voltar para lista
      </Link>

      {/* Banner */}
      <div className="relative w-full h-80 rounded-xl overflow-hidden border bg-muted shadow-sm">
        <Image
          src={tour.coverImageUrl || "/placeholder.jpg"}
          alt={tour.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-md shadow">
          <Avatar className="h-12 w-12">
            <AvatarImage src={tour.agencyLogoUrl} />
            <AvatarFallback className="text-muted-foreground font-bold">
              {tour.agencyName?.[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Infos principais */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold leading-snug">{tour.title}</h1>

        <Badge variant="outline" className="text-orange-600 border-orange-300 w-max text-xs">
          {tour.tourTypes[0]?.name || "Sem categoria"}
        </Badge>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            {tour.cityName}
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            {format(new Date(tour.startDate), "dd/MM/yyyy", { locale: pt })} -{" "}
            {format(new Date(tour.endDate), "dd/MM/yyyy", { locale: pt })}
          </div>
        </div>

        <div className="text-lg font-semibold text-green-600">
          {new Intl.NumberFormat("pt-AO", {
            style: "currency",
            currency: "AOA",
          }).format(tour.basePrice)}
        </div>

        <p className="text-sm text-muted-foreground">{tour.description}</p>
      </section>

      {/* Ações */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button variant="outline" className="gap-2 border-muted-foreground">
          <Pencil size={16} />
          Editar Tour
        </Button>

        <CreateItineraries tourId={tour.id}>
          <Button className="bg-orange-600 hover:bg-orange-500 text-white gap-2">
            <PlusCircle size={16} />
            Adicionar Itinerário
          </Button>
        </CreateItineraries>

        <CreateAttractions tourId={tour.id}>
          <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2">
            <PlusCircle size={16} />
            Adicionar Atração Turística
          </Button>
        </CreateAttractions>

        <CreatePackageInTour tourId={tour.id}>
          <Button className="bg-green-700 hover:bg-green-600 text-white gap-2">
            <PlusCircle size={16} />
            Adicionar Pacote
          </Button>
        </CreatePackageInTour>
      </section>

      {/* Seções expansíveis */}
      <SectionCollapse
        title="Itinerários"
        open={showItineraries}
        toggle={() => setShowItineraries(!showItineraries)}
      >
        {tour.itineraries.map((itinerary) => (
          <div
            key={itinerary.id}
            className="border rounded-md p-4 bg-muted shadow-sm space-y-2"
          >
            <h3 className="text-base font-semibold">{itinerary.title}</h3>
            <p className="text-sm text-muted-foreground">{itinerary.description}</p>
            <p className="text-sm font-medium">
              Data:{" "}
              {format(new Date(itinerary.date), "dd/MM/yyyy", { locale: pt })}
            </p>
          </div>
        ))}
      </SectionCollapse>

      <SectionCollapse
        title="Pacotes"
        open={showPackages}
        toggle={() => setShowPackages(!showPackages)}
      >
        {tour.packages.map((pkg) => (
          <div
            key={pkg.id}
            className="border rounded-md p-4 bg-muted shadow-sm space-y-2"
          >
            <h3 className="text-base font-semibold">{pkg.name}</h3>
            <p className="text-sm font-medium text-green-700">
              {new Intl.NumberFormat("pt-AO", {
                style: "currency",
                currency: "AOA",
              }).format(pkg.price)}
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              {pkg.benefits.map((b) => (
                <li key={b.id}>
                  <span className="font-medium text-foreground">{b.name}</span> – {b.description}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </SectionCollapse>

      <SectionCollapse
        title="Atrações Turísticas"
        open={showAttractions}
        toggle={() => setShowAttractions(!showAttractions)}
      >
        {tour.attractions.map((a) => (
          <div
            key={a.id}
            className="border rounded-md p-4 bg-muted shadow-sm space-y-2"
          >
            <h3 className="text-base font-semibold">{a.name}</h3>
            <p className="text-sm text-muted-foreground">{a.description}</p>
            <Image
              src={a.imageUrl || "/placeholder.jpg"}
              alt={a.name}
              width={500}
              height={300}
              className="rounded-md object-cover"
            />
          </div>
        ))}
      </SectionCollapse>
    </div>
  )
}

function SectionCollapse({
  title,
  open,
  toggle,
  children,
}: {
  title: string
  open: boolean
  toggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="space-y-3">
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={toggle}
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {open ? <div className="space-y-4">{children}</div> : <hr className="border-muted" />}
    </div>
  )
}
