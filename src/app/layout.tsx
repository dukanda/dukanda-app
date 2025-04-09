import QueryProvider from '@/module/tanstack-query-config/queryClientProvider';
import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/toaster';

export const metadata = {
  title: 'Dukanda App -Agentes de Turismo',
  description: 'Dukanda App é uma plataforma que conecta turistas com agentes de turismo, proporcionando uma experiência exclusiva para ambos.',
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryProvider>
        <body className="flex min-h-screen w-full flex-col">{children}</body>
        <Analytics />
        <Toaster />
      </QueryProvider>
    </html>
  );
}
