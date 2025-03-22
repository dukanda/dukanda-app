import QueryProvider from '@/module/tanstack-query-config/queryClientProvider';
import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/toaster';

export const metadata = {
  title: 'Dukanda App - Agents of Tourism',
  description: 'Dukanda App is a platform that connects tourists with local guides, providing a unique experience for both.',
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
