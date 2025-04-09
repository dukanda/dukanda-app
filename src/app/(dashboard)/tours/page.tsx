'use client'

import { Button } from '@/components/ui/button'
import {
  CircleFadingPlus,
  MapPin,
  CalendarDays,
} from 'lucide-react'
import { CreateTours } from './createTours'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { toursRoutes } from '@/api/routes/Tours/index.routes'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { toursAgenciesRoutes } from '@/api/routes/TourAgency/index.routes'
import { getAllDataInCookies } from '@/utils/get-data-in-cookies'
import { Skeleton } from '@/components/ui/skeleton'

export default function ToursScreen() {
  const userData = getAllDataInCookies().userdata

  const getTourAgencies = useQuery({
    queryKey: ['agencies'],
    queryFn: async () =>
      await toursAgenciesRoutes.getTourAgencyById(userData?.id),
  })

  const agencyNotCreated = getTourAgencies.data

  const myAgencyTours = useQuery({
    queryKey: ['myAgencyTours'],
    queryFn: async () => await toursRoutes.getToursMyAgency(),
  })

  const isLoading = myAgencyTours.isLoading
  const data = myAgencyTours.data
  const tours = data?.items ?? []

  return (
    <div className="w-full min-h-screen flex flex-col gap-6 px-4 md:px-8 py-6">
      {/* Agência ainda não criada */}
      {agencyNotCreated === undefined ? (
        <div className="flex flex-col justify-center items-center h-96 text-center text-muted-foreground text-base overflow-hidden">
          Você ainda não cadastrou uma agência. <br />
          <span className="text-orange-600 font-semibold">
            Cadastre uma agência para começar a criar passeios.
          </span>
        </div>
      ) : (
        <>
          {/* Botão Criar Passeio */}
          <div className="flex justify-end">
            <CreateTours>
              <Button className="bg-green-700 hover:bg-orange-500 text-white flex items-center gap-2 px-5 py-2.5 shadow-sm">
                <CircleFadingPlus size={18} />
                Criar Passeio
              </Button>
            </CreateTours>
          </div>

          {/* Carregando dados */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg border bg-background shadow-sm overflow-hidden flex flex-col">
                  <Skeleton className="h-56 w-full rounded-none" />
                  <div className="p-4 space-y-3 flex flex-col flex-1">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/3" />

                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-1/2" />
                    </div>

                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-2/3" />
                    </div>

                    <Skeleton className="h-4 w-1/4" />

                    <div className="pt-4 mt-auto">
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>
                </div>
              ))}
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
                    src={tour.coverImageUrl || '/placeholder.jpg'}
                    alt={tour.title}
                    width={400}
                    height={250}
                    className="w-full h-56 object-cover bg-muted"
                  />

                  <div className="p-4 space-y-2 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {tour.title}
                    </h3>

                    <Badge
                      variant="outline"
                      className="w-fit border-orange-300 text-orange-700 text-xs py-1 px-2"
                    >
                      Aprovação:{' '}
                      <span className="ml-1 font-semibold">PENDENTE</span>
                    </Badge>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={16} />
                      <span>{tour.cityName}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays size={16} />
                      <span>
                        {format(new Date(tour.startDate), 'dd/MM/yyyy')} -{' '}
                        {format(new Date(tour.endDate), 'dd/MM/yyyy')}
                      </span>
                    </div>

                    <div className="text-sm text-green-600 font-semibold">
                      {new Intl.NumberFormat('pt-AO', {
                        style: 'currency',
                        currency: 'AOA',
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
        </>
      )}
    </div>
  )
}
