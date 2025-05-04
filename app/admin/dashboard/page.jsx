"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { EmployeeTable } from "@/components/admin/employee-table"

// Sample data for demonstration
const employeesData = [
  {
    id: "EMP2025001",
    name: "Ravi Kumar",
    role: "Mason",
    site: "Site A",
    status: "Pending",
    submittedOn: "2025-04-15",
  },
  {
    id: "EMP2025002",
    name: "Priya M",
    role: "Electrician",
    site: "Site B",
    status: "Onboarded",
    submittedOn: "2025-04-10",
  },
  {
    id: "EMP2025003",
    name: "Siva R",
    role: "Labor",
    site: "Site A",
    status: "Pending",
    submittedOn: "2025-04-16",
  },
  {
    id: "EMP2025004",
    name: "Anjali D",
    role: "Site Engineer",
    site: "Site C",
    status: "Rejected",
    submittedOn: "2025-04-08",
  },
  {
    id: "EMP2025005",
    name: "Rahul S",
    role: "Plumber",
    site: "Site B",
    status: "Onboarded",
    submittedOn: "2025-04-05",
  },
  {
    id: "EMP2025006",
    name: "Deepak M",
    role: "Carpenter",
    site: "Site C",
    status: "Pending",
    submittedOn: "2025-04-17",
  },
]

export default function AdminDashboardPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredEmployees = employeesData.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || employee.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const counts = {
    all: employeesData.length,
    pending: employeesData.filter((e) => e.status === "Pending").length,
    onboarded: employeesData.filter((e) => e.status === "Onboarded").length,
    rejected: employeesData.filter((e) => e.status === "Rejected").length,
  }

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage employee onboarding applications</p>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search by name or ID..."
              className="max-w-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/admin/reports">Reports</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="card-hover bg-gradient-to-br from-primary/20 to-primary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Badge className="bg-primary">{counts.all}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{counts.all}</div>
              <p className="text-xs text-muted-foreground">All employee applications</p>
            </CardContent>
          </Card>
          <Card className="card-hover bg-gradient-to-br from-secondary/20 to-secondary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Badge variant="outline" className="border-secondary text-secondary">
                {counts.pending}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{counts.pending}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>
          <Card className="card-hover bg-gradient-to-br from-accent/20 to-accent/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Onboarded</CardTitle>
              <Badge className="bg-accent">{counts.onboarded}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{counts.onboarded}</div>
              <p className="text-xs text-muted-foreground">Approved applications</p>
            </CardContent>
          </Card>
          <Card className="card-hover bg-gradient-to-br from-highlight/20 to-highlight/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <Badge variant="destructive">{counts.rejected}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{counts.rejected}</div>
              <p className="text-xs text-muted-foreground">Declined applications</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" onValueChange={setStatusFilter} className="animate-fade-in">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="all">All Applications ({counts.all})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({counts.pending})</TabsTrigger>
            <TabsTrigger value="onboarded">Onboarded ({counts.onboarded})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({counts.rejected})</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <EmployeeTable employees={filteredEmployees} />
          </TabsContent>
          <TabsContent value="pending" className="mt-6">
            <EmployeeTable employees={filteredEmployees} />
          </TabsContent>
          <TabsContent value="onboarded" className="mt-6">
            <EmployeeTable employees={filteredEmployees} />
          </TabsContent>
          <TabsContent value="rejected" className="mt-6">
            <EmployeeTable employees={filteredEmployees} />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
