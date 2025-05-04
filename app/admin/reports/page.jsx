"use client"

import { useState } from "react"
import { Calendar, Download, BarChart3, PieChart, Users, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminLayout } from "@/components/layouts/admin-layout"

// Sample data for demonstration
const monthlyData = [
  { month: "Jan", applications: 12, approved: 8, rejected: 4 },
  { month: "Feb", applications: 15, approved: 10, rejected: 5 },
  { month: "Mar", applications: 18, approved: 14, rejected: 4 },
  { month: "Apr", applications: 22, approved: 16, rejected: 6 },
  { month: "May", applications: 20, approved: 15, rejected: 5 },
  { month: "Jun", applications: 25, approved: 20, rejected: 5 },
]

const siteData = [
  { site: "Site A", employees: 45, percentage: "36%" },
  { site: "Site B", employees: 38, percentage: "30%" },
  { site: "Site C", employees: 42, percentage: "34%" },
]

const roleData = [
  { role: "Mason", count: 28, percentage: "22%" },
  { role: "Electrician", count: 22, percentage: "18%" },
  { role: "Plumber", count: 18, percentage: "14%" },
  { role: "Carpenter", count: 20, percentage: "16%" },
  { role: "Labor", count: 25, percentage: "20%" },
  { role: "Site Engineer", count: 12, percentage: "10%" },
]

const processingTimeData = [
  { range: "< 1 day", count: 35, percentage: "28%" },
  { range: "1-2 days", count: 48, percentage: "38%" },
  { range: "3-5 days", count: 30, percentage: "24%" },
  { range: "5+ days", count: 12, percentage: "10%" },
]

export default function ReportsPage() {
  const [period, setPeriod] = useState("6months")

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">Analytics and reporting dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="3months">Last 3 months</SelectItem>
                <SelectItem value="6months">Last 6 months</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125</div>
              <p className="text-xs text-muted-foreground">+15% from last period</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">+5% from last period</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Processing Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3 days</div>
              <p className="text-xs text-muted-foreground">-0.5 days from last period</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125</div>
              <p className="text-xs text-muted-foreground">Across 3 sites</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="applications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="distribution">Employee Distribution</TabsTrigger>
            <TabsTrigger value="processing">Processing Time</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Application Trends</CardTitle>
                <CardDescription>Monthly application submissions and outcomes</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="w-full">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span className="text-sm">Applications</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-secondary"></div>
                        <span className="text-sm">Approved</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-destructive"></div>
                        <span className="text-sm">Rejected</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-[250px] w-full">
                    <div className="absolute inset-0 flex items-end justify-between">
                      {monthlyData.map((item, index) => (
                        <div key={index} className="flex flex-col items-center w-1/6">
                          <div className="relative w-full h-[200px] flex items-end justify-center gap-1">
                            <div
                              className="w-4 bg-primary rounded-t-sm"
                              style={{ height: `${(item.applications / 25) * 100}%` }}
                            ></div>
                            <div
                              className="w-4 bg-secondary rounded-t-sm"
                              style={{ height: `${(item.approved / 25) * 100}%` }}
                            ></div>
                            <div
                              className="w-4 bg-destructive rounded-t-sm"
                              style={{ height: `${(item.rejected / 25) * 100}%` }}
                            ></div>
                          </div>
                          <div className="mt-2 text-xs">{item.month}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Distribution by Site</CardTitle>
                  <CardDescription>Employee count per site</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {siteData.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-16 text-sm">{item.site}</div>
                        <div className="w-full max-w-md mx-2">
                          <div className="h-4 w-full bg-muted overflow-hidden rounded-full">
                            <div
                              className="h-4 bg-gradient-to-r from-primary to-secondary rounded-full"
                              style={{ width: item.percentage }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-16 text-sm font-medium">{item.employees}</div>
                        <div className="w-16 text-sm text-muted-foreground">{item.percentage}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribution by Role</CardTitle>
                  <CardDescription>Employee count per role</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {roleData.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-24 text-sm">{item.role}</div>
                        <div className="w-full max-w-md mx-2">
                          <div className="h-4 w-full bg-muted overflow-hidden rounded-full">
                            <div
                              className="h-4 bg-gradient-to-r from-accent to-highlight rounded-full"
                              style={{ width: item.percentage }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-12 text-sm font-medium">{item.count}</div>
                        <div className="w-12 text-sm text-muted-foreground">{item.percentage}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="processing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Application Processing Time</CardTitle>
                <CardDescription>Time taken to process applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {processingTimeData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-20 text-sm">{item.range}</div>
                      <div className="w-full max-w-md mx-2">
                        <div className="h-4 w-full bg-muted overflow-hidden rounded-full">
                          <div
                            className="h-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                            style={{ width: item.percentage }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-12 text-sm font-medium">{item.count}</div>
                      <div className="w-12 text-sm text-muted-foreground">{item.percentage}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
