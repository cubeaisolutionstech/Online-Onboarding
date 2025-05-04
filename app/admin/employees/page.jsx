"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, Download, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  {
    id: "EMP2025007",
    name: "Lakshmi N",
    role: "Electrician",
    site: "Site A",
    status: "Onboarded",
    submittedOn: "2025-04-03",
  },
  {
    id: "EMP2025008",
    name: "Karthik V",
    role: "Mason",
    site: "Site B",
    status: "Rejected",
    submittedOn: "2025-04-12",
  },
]

export default function EmployeesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [siteFilter, setSiteFilter] = useState("all")

  const filteredEmployees = employeesData.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || employee.status.toLowerCase() === statusFilter.toLowerCase()

    const matchesRole = roleFilter === "all" || employee.role === roleFilter

    const matchesSite = siteFilter === "all" || employee.site === siteFilter

    return matchesSearch && matchesStatus && matchesRole && matchesSite
  })

  const roles = [...new Set(employeesData.map((emp) => emp.role))]
  const sites = [...new Set(employeesData.map((emp) => emp.site))]

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
            <p className="text-muted-foreground">Manage all employee records</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <Button
              className="w-full sm:w-auto bg-primary hover:bg-primary/90"
              onClick={() => router.push("/onboarding")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="onboarded">Onboarded</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={siteFilter} onValueChange={setSiteFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                {sites.map((site) => (
                  <SelectItem key={site} value={site}>
                    {site}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border shadow-sm overflow-hidden">
          <EmployeeTable employees={filteredEmployees} />
        </div>
      </div>
    </AdminLayout>
  )
}
