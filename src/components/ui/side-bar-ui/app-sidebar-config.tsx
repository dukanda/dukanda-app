"use client"

import type * as React from "react"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

const data = {
  teams: [
    {
      name: "Dukanda",
      plan: "Dukanda System",
      image: "https://github.com/dukanda.png",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="max-w-[201px] bg-orange-700 border-r-akin-turquoise">
      <SidebarHeader className="bg-akin-turquoise text-white">
        <TeamSwitcher teams={data.teams}   />
      </SidebarHeader>
      <SidebarContent className="bg-akin-turquoise text-white " >
        <NavMain items={[]} />
      </SidebarContent>
      <SidebarFooter className="bg-akin-turquoise text-white">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}