'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Pen, Plus } from 'lucide-react'
import { CreateAgency } from './createAgency'
import { EditAgency } from './editarAgency'
import { useQuery } from '@tanstack/react-query'
import { toursAgenciesRoutes } from '@/api/routes/TourAgency/index.routes'
import Cookies from 'js-cookie'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'

function InfoDisplay({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
      <p className="rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground">
        {value || 'Não informado'}
      </p>
    </div>
  )
}

export default function Agency() {
  const user = Cookies.get('dukanda-user') || ''
  const userData = user ? JSON.parse(user) : ''

  const getTourAgencies = useQuery({
    queryKey: ['agencies'],
    queryFn: async () => await toursAgenciesRoutes.getTourAgencyById(userData?.id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const agency = getTourAgencies.data
  const isLoading = getTourAgencies.isLoading

  return (
    <div className="space-y-6">
      {/* Botões de ação */}
      <div className="flex flex-wrap items-center gap-3">
        {!agency && !isLoading && (
          <CreateAgency>
            <Button className="bg-green-700 hover:bg-green-500 flex items-center gap-2">
              <Plus size={18} />
              Criar Agência
            </Button>
          </CreateAgency>
        )}

        {agency && !isLoading && (
          <EditAgency>
            <Button
              variant="outline"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center gap-2"
            >
              <Pen size={18} />
              Editar Informação
            </Button>
          </EditAgency>
        )}
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <Card className="overflow-hidden border bg-background shadow-sm">
          <div className="flex flex-col lg:flex-row gap-6 p-6">
            {/* Avatar Skeleton */}
            <div className="flex-shrink-0 flex justify-center items-start">
              <Skeleton className="h-32 w-32 rounded-full" />
            </div>

            {/* Conteúdo Skeleton */}
            <div className="flex-1 space-y-6">
              <CardHeader className="p-0">
                <Skeleton className="h-6 w-1/3" />
              </CardHeader>

              <CardContent className="p-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  ))}
                </div>

                {/* Descrição Skeleton */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-[120px] w-full rounded-md" />
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      ) : !agency ? (
        <Card className="p-6 text-center border border-dashed">
          <p className="text-muted-foreground text-sm">
            Nenhuma agência encontrada. Clique em{' '}
            <span className="font-medium">&quot;Criar Agência&quot;</span> para começar.
          </p>
        </Card>
      ) : (
        <Card className="overflow-hidden border bg-background shadow-sm">
          <div className="flex flex-col lg:flex-row gap-6 p-6">
            {/* Avatar */}
            <div className="flex-shrink-0 flex justify-center items-start">
              <Avatar className="h-32 w-32 rounded-full border">
                <AvatarImage
                  src={agency?.logoUrl || 'https://github.com/dukanda.png'}
                  className="object-cover rounded-full"
                />
                <AvatarFallback className="bg-muted text-muted-foreground font-bold text-xl">
                  {agency?.name?.charAt(0) || '?'}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 space-y-6">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl font-semibold">Informações da Agência</CardTitle>
              </CardHeader>

              <CardContent className="p-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoDisplay label="Nome" value={agency?.name} />
                  <InfoDisplay label="Email" value={agency?.contactEmail} />
                  <InfoDisplay label="Contato" value={agency?.contactPhone} />
                  <InfoDisplay label="Endereço" value={agency?.address} />
                  <InfoDisplay label="Tipo de Agência" value={agency?.agencyType} />
                </div>

                {/* Descrição */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Descrição</Label>
                  <Textarea
                    value={agency?.description || ''}
                    readOnly
                    className="resize-none cursor-default"
                  />
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
