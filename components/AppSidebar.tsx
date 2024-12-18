"use client"

import { FileText, Home, Settings, Upload } from 'lucide-react'
import { usePathname } from "next/navigation"
import Link from "next/link"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarFooter,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
    { title: "Home", icon: Home, url: "/" },
    { title: "Upload PDF", icon: Upload, url: "/upload" },
    { title: "Chat with PDF", icon: FileText, url: "/chat" },
    { title: "Settings", icon: Settings, url: "/settings" },

]

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar>
          
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                                        <Link href={item.url}>
                                            <item.icon className="mr-2 h-4 w-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="px-4 py-2">
                    <ThemeToggle />
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

