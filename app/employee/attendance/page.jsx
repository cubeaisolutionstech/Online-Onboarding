"use client"

import { useState } from "react"
import { CalendarIcon, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmployeeLayout } from "@/components/layouts/employee-layout"
import { format } from "date-fns"

// Sample data for demonstration
const attendanceData = {
  summary: {
    present: 18,
    absent: 2,
    leave: 1,
    total: 21,
    percentage: "85.7%",
  },
  daily: [
    { date: "2025-04-01", status: "present", checkIn: "09:05", checkOut: "18:10", hours: "9:05" },
    { date: "2025-04-02", status: "present", checkIn: "08:55", checkOut: "18:05", hours: "9:10" },
    { date: "2025-04-03", status: "present", checkIn: "09:00", checkOut: "18:00", hours: "9:00" },
    { date: "2025-04-04", status: "present", checkIn: "09:10", checkOut: "18:15", hours: "9:05" },
    { date: "2025-04-05", status: "weekend", checkIn: "", checkOut: "", hours: "" },
    { date: "2025-04-06", status: "weekend", checkIn: "", checkOut: "", hours: "" },
    { date: "2025-04-07", status: "present", checkIn: "08:50", checkOut: "18:00", hours: "9:10" },
    { date: "2025-04-08", status: "present", checkIn: "09:05", checkOut: "18:10", hours: "9:05" },
    { date: "2025-04-09", status: "present", checkIn: "09:00", checkOut: "18:00", hours: "9:00" },
    { date: "2025-04-10", status: "present", checkIn: "09:15", checkOut: "18:20", hours: "9:05" },
    { date: "2025-04-11", status: "absent", checkIn: "", checkOut: "", hours: "0:00" },
    { date: "2025-04-12", status: "weekend", checkIn: "", checkOut: "", hours: "" },
    { date: "2025-04-13", status: "weekend", checkIn: "", checkOut: "", hours: "" },
    { date: "2025-04-14", status: "present", checkIn: "09:00", checkOut: "18:05", hours: "9:05" },
    { date: "2025-04-15", status: "present", checkIn: "08:55", checkOut: "18:00", hours: "9:05" },
    { date: "2025-04-16", status: "present", checkIn: "09:10", checkOut: "18:15", hours: "9:05" },
    { date: "2025-04-17", status: "present", checkIn: "09:00", checkOut: "18:00", hours: "9:00" },
    { date: "2025-04-18", status: "present", checkIn: "09:05", checkOut: "18:10", hours: "9:05" },
    { date: "2025-04-19", status: "weekend", checkIn: "", checkOut: "", hours: "" },
    { date: "2025-04-20", status: "weekend", checkIn: "", checkOut: "", hours: "" },
    { date: "2025-04-21", status: "leave", checkIn: "", checkOut: "", hours: "0:00" },
    { date: "2025-04-22", status: "present", checkIn: "09:00", checkOut: "18:00", hours: "9:00" },
    { date: "2025-04-23", status: "present", checkIn: "09:05", checkOut: "18:10", hours: "9:05" },
    { date: "2025-04-24", status: "present", checkIn: "08:55", checkOut: "18:00", hours: "9:05" },
    { date: "2025-04-25", status: "absent", checkIn: "", checkOut: "", hours: "0:00" },
    { date: "2025-04-26", status: "weekend", checkIn: "", checkOut: "", hours: "" },
    { date: "2025-04-27", status: "weekend", checkIn: "", checkOut: "", hours: "" },
    { date: "2025-04-28", status: "present", checkIn: "09:00", checkOut: "18:05", hours: "9:05" },
    { date: "2025-04-29", status: "present", checkIn: "09:05", checkOut: "18:10", hours: "9:05" },
    { date: "2025-04-30", status: "present", checkIn: "09:00", checkOut: "18:00", hours: "9:00" },
  ],
  calendarData: {
    "2025-04-01": { status: "present" },
    "2025-04-02": { status: "present" },
    "2025-04-03": { status: "present" },
    "2025-04-04": { status: "present" },
    "2025-04-07": { status: "present" },
    "2025-04-08": { status: "present" },
    "2025-04-09": { status: "present" },
    "2025-04-10": { status: "present" },
    "2025-04-11": { status: "absent" },
    "2025-04-14": { status: "present" },
    "2025-04-15": { status: "present" },
    "2025-04-16": { status: "present" },
    "2025-04-17": { status: "present" },
    "2025-04-18": { status: "present" },
    "2025-04-21": { status: "leave" },
    "2025-04-22": { status: "present" },
    "2025-04-23": { status: "present" },
    "2025-04-24": { status: "present" },
    "2025-04-25": { status: "absent" },
    "2025-04-28": { status: "present" },
    "2025-04-29": { status: "present" },
    "2025-04-30": { status: "present" },
  },
}

export default function AttendancePage() {
  const [date, setDate] = useState(new Date())
  const [month, setMonth] = useState(new Date())

  const getStatusBadge = (status) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-500">Present</Badge>
      case "absent":
        return <Badge variant="destructive">Absent</Badge>
      case "leave":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
            Leave
          </Badge>
        )
      case "weekend":
        return <Badge variant="secondary">Weekend</Badge>
      default:
        return null
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "absent":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "leave":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      default:
        return null
    }
  }

  const filteredAttendance = attendanceData.daily.filter((item) => {
    const itemDate = new Date(item.date)
    return itemDate.getMonth() === month.getMonth() && itemDate.getFullYear() === month.getFullYear()
  })

  return (
    <EmployeeLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground">Track your attendance and time records</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="card-hover bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceData.summary.percentage}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card className="card-hover bg-gradient-to-br from-green-100 to-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Present Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{attendanceData.summary.present}</div>
              <p className="text-xs text-muted-foreground">Out of {attendanceData.summary.total} working days</p>
            </CardContent>
          </Card>
          <Card className="card-hover bg-gradient-to-br from-red-100 to-red-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Absent Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{attendanceData.summary.absent}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card className="card-hover bg-gradient-to-br from-amber-100 to-amber-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Leave Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{attendanceData.summary.leave}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="calendar" className="space-y-4">
          <TabsList>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>Calendar View</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Daily Records</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Calendar</CardTitle>
                <CardDescription>Monthly attendance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    onMonthChange={setMonth}
                    className="rounded-md border"
                    modifiers={{
                      present: Object.keys(attendanceData.calendarData)
                        .filter((date) => attendanceData.calendarData[date].status === "present")
                        .map((date) => new Date(date)),
                      absent: Object.keys(attendanceData.calendarData)
                        .filter((date) => attendanceData.calendarData[date].status === "absent")
                        .map((date) => new Date(date)),
                      leave: Object.keys(attendanceData.calendarData)
                        .filter((date) => attendanceData.calendarData[date].status === "leave")
                        .map((date) => new Date(date)),
                    }}
                    modifiersStyles={{
                      present: {
                        backgroundColor: "#dcfce7",
                        color: "#166534",
                        fontWeight: "bold",
                      },
                      absent: {
                        backgroundColor: "#fee2e2",
                        color: "#b91c1c",
                        fontWeight: "bold",
                      },
                      leave: {
                        backgroundColor: "#fef3c7",
                        color: "#92400e",
                        fontWeight: "bold",
                      },
                    }}
                  />
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Present</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">Absent</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm">Leave</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {date && attendanceData.daily.find((item) => item.date === format(date, "yyyy-MM-dd")) && (
              <Card>
                <CardHeader>
                  <CardTitle>Details for {format(date, "MMMM d, yyyy")}</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const dayData = attendanceData.daily.find((item) => item.date === format(date, "yyyy-MM-dd"))
                    return (
                      <div className="grid gap-4 md:grid-cols-4">
                        <div>
                          <h3 className="text-sm font-medium mb-1">Status</h3>
                          {getStatusBadge(dayData.status)}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-1">Check In</h3>
                          <p>{dayData.checkIn || "N/A"}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-1">Check Out</h3>
                          <p>{dayData.checkOut || "N/A"}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-1">Hours Worked</h3>
                          <p>{dayData.hours || "N/A"}</p>
                        </div>
                      </div>
                    )
                  })()}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Daily Attendance Records</CardTitle>
                  <CardDescription>Your attendance for {format(month, "MMMM yyyy")}</CardDescription>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {format(month, "MMMM yyyy")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={month} onSelect={setMonth} initialFocus />
                  </PopoverContent>
                </Popover>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="h-12 px-4 text-left font-medium">Date</th>
                          <th className="h-12 px-4 text-left font-medium">Status</th>
                          <th className="h-12 px-4 text-left font-medium">Check In</th>
                          <th className="h-12 px-4 text-left font-medium">Check Out</th>
                          <th className="h-12 px-4 text-left font-medium">Hours</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAttendance.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-4 text-center text-muted-foreground">
                              No attendance records found for this month
                            </td>
                          </tr>
                        ) : (
                          filteredAttendance.map((item, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-4">{format(new Date(item.date), "MMM d, EEE")}</td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(item.status)}
                                  {getStatusBadge(item.status)}
                                </div>
                              </td>
                              <td className="p-4">{item.checkIn || "-"}</td>
                              <td className="p-4">{item.checkOut || "-"}</td>
                              <td className="p-4">{item.hours || "-"}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </EmployeeLayout>
  )
}
