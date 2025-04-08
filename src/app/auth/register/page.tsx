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
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { RegisterMutation } from './queryRegister'
import Link from 'next/link'

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
  })
  const register = RegisterMutation(setFormData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await register.mutate(formData)
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

        {/* Card */}
        <Card className="w-full md:w-[400px] shadow-md border border-border">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-orange-600">Criar Conta</CardTitle>
            <CardDescription className="text-muted-foreground">
              Preencha os campos para continuar
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit} className="px-6 space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome completo"
                disabled={register.isPending}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                disabled={register.isPending}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="phoneNumber">Telefone</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Número de telefone"
                disabled={register.isPending}
                required
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
                placeholder="Digite uma senha forte"
                disabled={register.isPending}
                required
              />
            </div>

            <CardFooter className="px-0 pt-4">
              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-medium"
              >
                {register.isPending ? 'Registrando...' : 'Registrar'}
              </Button>
            </CardFooter>
          </form>

          <div className="px-6 py-4 text-sm text-muted-foreground text-center">
            Já tem uma conta?{' '}
            <Link
              href="/auth/login"
              className="text-orange-600 hover:underline font-medium"
            >
              Entre aqui
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
