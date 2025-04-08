"use client"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Home, MapIcon, PanelTopDashed } from "lucide-react"
import { cn } from "@/lib/utils"

const data = {
  teams: [
    {
      name: "Dukanda",
      plan: "Dukanda System",
      image: "https://github.com/dukanda.png",
    },
  ],
}

const navItems = [
  { label: "Dashboard", icon: Home, path: "/", access: [] },
  { label: "Agência", icon: PanelTopDashed, path: "/agency", access: [] },
  { label: "Passeios", icon: MapIcon, path: "/tours", access: [] },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className={cn("max-w-[220px] bg-background border-r")}
    >
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
