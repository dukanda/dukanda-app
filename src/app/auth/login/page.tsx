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
import { LoginMutation } from './queryLogin';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const login = LoginMutation(setFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login.mutate(formData);
  };
  return (
    <div className="min-h-screen flex flex-col gap-5 px-2 md:flex-row justify-center md:justify-between items-center md:items-center md:px-[20%]">
      <div className=''>
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
          <CardTitle className="text-2xl w-full text-center text-green-700">Entrar</CardTitle>
          <CardDescription>
            Entre com seu e-mail e senha para acessar sua conta.
          </CardDescription>
        </CardHeader>

        <form className="w-full p-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              required
              disabled={login.isPending}
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
              required
              disabled={login.isPending}
              className='focus:ring-0 focus-visible:ring-0'
            />
          </div>
          <CardFooter className="p-0">
            <Button className="w-full bg-orange-500 hover:bg-orange-600" type="submit">
              {
                login.isPending ? 'Entrando...' : 'Entrar'
              }
            </Button>
          </CardFooter>
        </form>

        <Link href="/auth/register">
          <p className=" px-5 pb-2 text-start text-gray-500 hover:text-orange-600">Não possui uma conta? Clique aqui</p>
        </Link>
      </Card>
    </div>
  );
}
