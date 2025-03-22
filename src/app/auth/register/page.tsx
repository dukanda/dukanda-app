'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { RegisterMutation } from './queryRegister';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
  });
  const register = RegisterMutation(setFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register.mutate(formData);
  };

  return (
    <div className="min-h-screen flex flex-col gap-5 px-2 md:flex-row justify-center md:justify-between items-center md:items-center md:px-[20%]">
      <div>
        <Image
          src="/dukanda.png"
          alt="Logo"
          width={150}
          height={150}
          priority
        />
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl w-full text-center text-green-700">Registrar</CardTitle>
          <CardDescription>
            Crie uma conta preenchendo os dados abaixo.
          </CardDescription>
        </CardHeader>

        <form className="w-full p-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Digite seu nome"
              disabled={register.isPending}
              required
              className='focus:ring-0 focus-visible:ring-0'
            />
          </div>

          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              disabled={register.isPending}
              required
              className='focus:ring-0 focus-visible:ring-0'
            />
          </div>

          <div>
            <Label htmlFor="phoneNumber">Telefone</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Digite seu telefone"
              disabled={register.isPending}
              required
              className='focus:ring-0 focus-visible:ring-0'
            />
          </div>

          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
              disabled={register.isPending}
              required
              className='focus:ring-0 focus-visible:ring-0'
            />
          </div>

          <CardFooter className="p-0">
            <Button className="w-full bg-orange-500 hover:bg-orange-600" type="submit">
              {register.isPending ? 'Registrando...' : 'Registrar'}
            </Button>
          </CardFooter>

        </form>

        <Link href="/auth/login">
          <p className="px-5 pb-2 text-start text-gray-500 hover:text-orange-600">Já tem uma conta? Entre aqui.</p>
        </Link>
      </Card>
    </div>
  );
}
