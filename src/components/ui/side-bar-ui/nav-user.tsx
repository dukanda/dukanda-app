"use client"

import {
  ChevronsUpDown,
  LogOut,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useQuery } from "@tanstack/react-query"
import { authRoutes } from "@/api/routes/Auth/index.routes"
import { useAuthStore } from "@/module/zustand-auth-store"
import Link from "next/link"

export function NavUser() {
  const { logout } = useAuthStore()
  const { isMobile } = useSidebar()
  const { data: userData } = useQuery({
    queryKey: ["profile"],
    queryFn: () => authRoutes.getCurrentUser(),
  })

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="group flex items-center gap-2 rounded-md hover:bg-muted transition-colors px-2 py-1"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={userData?.avatarUrl || "https://github.com/dukanda.png"}
                  alt="Avatar"
                />
                <AvatarFallback>{userData?.name?.charAt(0) ?? "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex flex-col text-left text-sm leading-tight overflow-hidden">
                <span className="truncate font-medium">{userData?.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {userData?.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-56"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <Link href="/profile" passHref>
              <DropdownMenuLabel className="p-0">
                <div className="flex items-center gap-2 px-3 py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={userData?.avatarUrl || "https://github.com/dukanda.png"}
                    />
                    <AvatarFallback>{userData?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <div className="font-semibold">{userData?.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {userData?.email}
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
            </Link>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={async () => {
                await logout()
                window.location.reload()
              }}
              className="cursor-pointer text-red-600 hover:bg-red-500 hover:text-white"
            >
              <LogOut className="mr-2 size-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
