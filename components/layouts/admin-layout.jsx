"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Users, FileText, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { NotificationDropdown } from "@/components/ui/notification"

// Sample admin notifications
const adminNotifications = [
  {
    id: 1,
    title: "New Application",
    message: "Rahul S has submitted a new onboarding application",
    time: "5 mins ago",
    read: false,
  },
  {
    id: 2,
    title: "Document Updated",
    message: "Priya M has updated her identity documents",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "Application Approved",
    message: "You approved Siva R's application",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 4,
    title: "System Update",
    message: "The system will undergo maintenance tonight at 11 PM",
    time: "Yesterday",
    read: true,
  },
]

export function AdminLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = useState(true)

  const handleLogout = () => {
    // In a real app, you would call your logout API
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/login")
  }

  const navItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
      isActive: pathname === "/admin/dashboard",
    },
    {
      title: "Employees",
      icon: Users,
      href: "/admin/employees",
      isActive: pathname.startsWith("/admin/employees"),
    },
    {
      title: "Reports",
      icon: FileText,
      href: "/admin/reports",
      isActive: pathname.startsWith("/admin/reports"),
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/admin/settings",
      isActive: pathname.startsWith("/admin/settings"),
    },
  ]

  return (
    <SidebarProvider defaultOpen={open} onOpenChange={setOpen}>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <Sidebar>
          <SidebarHeader className="flex items-center px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-gradient-to-r from-primary to-secondary p-1">
                <div className="h-6 w-6 text-white grid place-items-center font-semibold">EO</div>
              </div>
              <span className="font-bold">Employee Onboarding</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col w-full">
          <header className="border-b w-full">
            <div className="flex h-16 items-center px-4 gap-4">
              <SidebarTrigger />
              <div className="ml-auto flex items-center gap-4">
                <NotificationDropdown notifications={adminNotifications} role="admin" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                        <AvatarFallback className="bg-primary text-white">AD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/admin/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          <main className="p-6 w-full overflow-x-hidden">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
