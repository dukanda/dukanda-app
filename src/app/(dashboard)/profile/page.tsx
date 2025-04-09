'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { authRoutes } from '@/api/routes/Auth/index.routes'
import { useQuery } from '@tanstack/react-query'

function InfoDisplay({ label, value }: { label: string; value?: string }) {
  return (
    <div className="space-y-1">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <p className="bg-muted px-3 py-2 rounded-md text-sm text-foreground border">
        {value || 'Não informado'}
      </p>
    </div>
  )
}

export default function Profile() {
  const { data: userData } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => authRoutes.getCurrentUser(),
  })

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card className="shadow-sm border border-border">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Avatar className="h-28 w-28 border-4 border-muted shadow-sm">
            <AvatarImage
              src={userData?.avatarUrl || 'https://github.com/dukanda.png'}
              alt={userData?.name || 'Avatar'}
            />
            <AvatarFallback className="text-xl font-bold bg-muted-foreground text-background">
              {userData?.name?.charAt(0) ?? '?'}
            </AvatarFallback>
          </Avatar>

          <Button className="bg-orange-600 hover:bg-orange-500 text-white font-medium px-6">
            Editar Perfil
          </Button>
        </CardHeader>

        <CardContent className="mt-4 space-y-6">
          <CardTitle className="text-xl font-semibold text-foreground">
            Informações do Usuário
          </CardTitle>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoDisplay label="Nome" value={userData?.name} />
            <InfoDisplay label="Email" value={userData?.email} />
            <InfoDisplay label="Contato" value={userData?.phoneNumber} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
