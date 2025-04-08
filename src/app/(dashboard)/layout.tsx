"use client"

import { AppSidebar } from "@/components/ui/side-bar-ui/app-sidebar-config"
import Providers from "./providers"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <SidebarProvider>
        <div className="flex h-screen w-full bg-background text-foreground">
          <AppSidebar />
          <SidebarContentWrapper>{children}</SidebarContentWrapper>
        </div>
      </SidebarProvider>
    </Providers>
  )
}

function SidebarContentWrapper({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar()

  return (
    <SidebarInset
      className={cn(
        "flex flex-col w-full transition-all duration-300 px-4 py-3",
        state === "collapsed" && "px-2"
      )}
    >
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-border px-1 mb-4">
        <SidebarTrigger />
        {/* Aqui você pode adicionar botões de ação, busca, etc. */}
      </header>

      <main className="flex-1 overflow-y-auto rounded-lg bg-muted/30 p-4 shadow-inner">
        {children}
      </main>
    </SidebarInset>
  )
}


/*
import { Analytics } from '@vercel/analytics/react';
import Providers from './providers';
import { SearchInput } from './search';
import { DesktopNav, MobileNav } from '@/components/(dashboard)/sidebar';
import { DashboardBreadcrumb } from '@/components/(dashboard)/breadcrumb';
import { DropdownMenuUser } from '@/components/(dashboard)/dropdown-menu';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-white overflow-x-hidden">
        <DesktopNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border  bg-gray-200 px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-3">
            <MobileNav />
            <DashboardBreadcrumb />
            <SearchInput />
            <DropdownMenuUser />
          </header>
          <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-white">
            {children}
          </main>
        </div>
        <Analytics />
      </main>
    </Providers>
  );
}
*/