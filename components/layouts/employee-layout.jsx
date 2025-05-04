"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, FileText, Settings, LogOut, User, Calendar } from "lucide-react"
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

// Sample employee notifications
const employeeNotifications = [
  {
    id: 1,
    title: "Payslip Available",
    message: "Your April 2025 payslip is now available for download",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Document Verification",
    message: "Your Aadhar card has been verified successfully",
    time: "Yesterday",
    read: false,
  },
  {
    id: 3,
    title: "Attendance Update",
    message: "Your attendance for last week has been updated",
    time: "3 days ago",
    read: true,
  },
  {
    id: 4,
    title: "Holiday Notice",
    message: "Reminder: Office will be closed on May 1st for Labor Day",
    time: "1 week ago",
    read: true,
  },
]

export function EmployeeLayout({ children }) {
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
      href: "/employee/dashboard",
      isActive: pathname === "/employee/dashboard",
    },
    {
      title: "Profile",
      icon: User,
      href: "/employee/profile",
      isActive: pathname === "/employee/profile",
    },
    {
      title: "Documents",
      icon: FileText,
      href: "/employee/documents",
      isActive: pathname === "/employee/documents",
    },
    {
      title: "Attendance",
      icon: Calendar,
      href: "/employee/attendance",
      isActive: pathname === "/employee/attendance",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/employee/settings",
      isActive: pathname === "/employee/settings",
    },
  ]

  return (
    <SidebarProvider defaultOpen={open} onOpenChange={setOpen}>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <Sidebar>
          <SidebarHeader className="flex items-center px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-gradient-to-r from-accent to-highlight p-1">
                <div className="h-6 w-6 text-white grid place-items-center font-semibold">EO</div>
              </div>
              <span className="font-bold">Employee Portal</span>
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
                <NotificationDropdown notifications={employeeNotifications} role="employee" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Employee" />
                        <AvatarFallback className="bg-accent text-white">EM</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/employee/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/employee/settings">Settings</Link>
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
