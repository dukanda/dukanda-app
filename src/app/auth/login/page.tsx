'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoginMutation } from './queryLogin'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const login = LoginMutation(setFormData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login.mutate(formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <Image
            src="/dukanda.png"
            alt="Dukanda Logo"
            width={200}
            height={200}
            priority
            className="object-contain"
          />
        </div>

        {/* Formulário */}
        <Card className="w-full md:w-[400px] shadow-md border border-border">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-orange-600">
              Entrar
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Acesse sua conta com e-mail e senha
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit} className="px-6 space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
                disabled={login.isPending}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Digite sua senha"
                required
                disabled={login.isPending}
              />
            </div>

            <CardFooter className="px-0 pt-4">
              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-medium"
              >
                {login.isPending ? 'Entrando...' : 'Entrar'}
              </Button>
            </CardFooter>
          </form>

          <div className="px-6 py-4 text-sm text-muted-foreground text-center">
            Ainda não tem uma conta?{' '}
            <Link
              href="/auth/register"
              className="text-orange-600 hover:underline font-medium"
            >
              Registre-se aqui
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
