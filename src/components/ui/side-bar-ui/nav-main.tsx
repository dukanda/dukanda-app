"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  icon?: LucideIcon
  path: string
  access: string[]
  subItems?: {
    label: string
    path: string
    access: string[]
  }[]
}

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-2 mb-2">
        Navegação
      </SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => {
          const isActive =
            item.path === "/"
              ? pathname === "/"
              : pathname?.startsWith(item.path)

          return (
            <Collapsible key={item.label} asChild defaultOpen={isActive}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <Link href={item.path}>
                    <SidebarMenuButton
                      tooltip={item.label}
                      className={cn(
                        "group flex w-full items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                        isActive
                          ? "bg-muted text-foreground font-semibold"
                          : "hover:bg-muted/50 text-muted-foreground"
                      )}
                    >
                      {item.icon && <item.icon className="size-4 shrink-0" />}
                      <span>{item.label}</span>
                      {item.subItems && (
                        <ChevronRight className="ml-auto size-4 group-data-[state=open]:rotate-90 transition-transform" />
                      )}
                    </SidebarMenuButton>
                  </Link>
                </CollapsibleTrigger>

                {item.subItems && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.subItems.map((sub) => {
                        const isSubActive = pathname === sub.path

                        return (
                          <SidebarMenuSubItem key={sub.label}>
                            <SidebarMenuSubButton
                              className={cn(
                                "pl-8 pr-2 py-1 rounded-md text-sm",
                                isSubActive
                                  ? "bg-muted text-foreground font-medium"
                                  : "hover:bg-muted/40 text-muted-foreground"
                              )}
                            >
                              <Link href={sub.path}>{sub.label}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
