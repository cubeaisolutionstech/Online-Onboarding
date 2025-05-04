"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { EmployeeLayout } from "@/components/layouts/employee-layout"

// Sample employee data for demonstration
const employeeData = {
  id: "EMP2025002",
  name: "Priya M",
  role: "Electrician",
  site: "Site B",
  joinedOn: "2025-04-15",
  email: "priya@example.com",
  contactNumber: "9876543210",
  supervisor: "Rajesh Kumar",
  shift: "Morning",
  documents: [
    { name: "Aadhar Card", type: "Identity", uploadedOn: "2025-04-10" },
    { name: "PAN Card", type: "Identity", uploadedOn: "2025-04-10" },
    { name: "Certificate", type: "Qualification", uploadedOn: "2025-04-10" },
  ],
  payslips: [
    { month: "April 2025", amount: "₹25,000", status: "Paid", date: "2025-04-30" },
    { month: "March 2025", amount: "₹25,000", status: "Paid", date: "2025-03-31" },
  ],
  attendance: {
    present: 18,
    absent: 2,
    leave: 1,
    total: 21,
  },
}

export default function EmployeeDashboardPage() {
  return (
    <EmployeeLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Employee Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {employeeData.name}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Employee ID</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employeeData.id}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Site</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employeeData.site}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Role</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employeeData.role}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shift</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employeeData.shift}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="payslips">Payslips</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your personal and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt={employeeData.name} />
                      <AvatarFallback>
                        {employeeData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                  </div>
                  <div className="flex-1 grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-medium">Full Name</h3>
                      <p>{employeeData.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Employee ID</h3>
                      <p>{employeeData.id}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Email</h3>
                      <p>{employeeData.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Contact Number</h3>
                      <p>{employeeData.contactNumber}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Joined On</h3>
                      <p>{new Date(employeeData.joinedOn).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Supervisor</h3>
                      <p>{employeeData.supervisor}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Documents</CardTitle>
                <CardDescription>Documents you've submitted during onboarding</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Document Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Uploaded On</th>
                        <th className="px-4 py-3 text-right text-sm font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {employeeData.documents.map((doc, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm">{doc.name}</td>
                          <td className="px-4 py-3 text-sm">{doc.type}</td>
                          <td className="px-4 py-3 text-sm">{new Date(doc.uploadedOn).toLocaleDateString()}</td>
                          <td className="px-4 py-3 text-sm text-right">
                            <Button variant="link" size="sm" className="h-auto p-0">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payslips" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payslips</CardTitle>
                <CardDescription>Your salary history and payment details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Month</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                        <th className="px-4 py-3 text-right text-sm font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {employeeData.payslips.map((payslip, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm">{payslip.month}</td>
                          <td className="px-4 py-3 text-sm">{payslip.amount}</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {payslip.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm">{new Date(payslip.date).toLocaleDateString()}</td>
                          <td className="px-4 py-3 text-sm text-right">
                            <Button variant="link" size="sm" className="h-auto p-0">
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Summary</CardTitle>
                <CardDescription>Your attendance for the current month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm font-medium">Total Working Days</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-2xl font-bold">{employeeData.attendance.total}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm font-medium">Present</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-2xl font-bold text-green-600">{employeeData.attendance.present}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm font-medium">Absent</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-2xl font-bold text-red-600">{employeeData.attendance.absent}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm font-medium">Leave</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-2xl font-bold text-amber-600">{employeeData.attendance.leave}</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </EmployeeLayout>
  )
}
