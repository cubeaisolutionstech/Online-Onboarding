"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, MoreHorizontal, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { sendEmail, emailTemplates } from "@/lib/nodemailer"

export function EmployeeTable({ employees }) {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleViewDetails = (id) => {
    router.push(`/admin/employees/${id}`)
  }

  const openApproveDialog = (employee) => {
    setSelectedEmployee(employee)
    setIsApproveDialogOpen(true)
  }

  const openRejectDialog = (employee) => {
    setSelectedEmployee(employee)
    setIsRejectDialogOpen(true)
  }

  const handleApprove = async () => {
    setIsSubmitting(true)

    try {
      // Generate a temporary password
      const tempPassword = Math.random().toString(36).slice(-8)

      // In a real application, you would call your API
      // const response = await fetch(`/api/employees/${selectedEmployee.id}/approve`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ tempPassword })
      // })

      // Send approval email
      const emailTemplate = emailTemplates.approvalNotification(
        selectedEmployee.name,
        `${window.location.origin}/login`,
        tempPassword,
      )

      await sendEmail({
        to: "employee@example.com", // In a real app, this would be the employee's email
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Application Approved",
        description: `${selectedEmployee.name} has been successfully onboarded. An email has been sent with login credentials.`,
        variant: "success",
      })

      setIsApproveDialogOpen(false)
      router.refresh()
    } catch (error) {
      toast({
        title: "Action Failed",
        description: "There was an error approving this application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real application, you would call your API
      // const response = await fetch(`/api/employees/${selectedEmployee.id}/reject`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ reason: rejectionReason })
      // })

      // Send rejection email
      const emailTemplate = emailTemplates.rejectionNotification(selectedEmployee.name, rejectionReason)

      await sendEmail({
        to: "employee@example.com", // In a real app, this would be the employee's email
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Application Rejected",
        description: `${selectedEmployee.name}'s application has been rejected. A notification email has been sent.`,
        variant: "success",
      })

      setIsRejectDialogOpen(false)
      setRejectionReason("")
      router.refresh()
    } catch (error) {
      toast({
        title: "Action Failed",
        description: "There was an error rejecting this application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="rounded-md border responsive-table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Site</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted On</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No applications found
                </TableCell>
              </TableRow>
            ) : (
              employees.map((employee) => (
                <TableRow key={employee.id} className="animate-fade-in">
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{employee.site}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        employee.status === "Onboarded"
                          ? "default"
                          : employee.status === "Rejected"
                            ? "destructive"
                            : "outline"
                      }
                      className={
                        employee.status === "Onboarded"
                          ? "bg-accent"
                          : employee.status === "Pending"
                            ? "border-secondary text-secondary"
                            : ""
                      }
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(employee.submittedOn).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewDetails(employee.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>

                      {employee.status === "Pending" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openApproveDialog(employee)}>
                              <CheckCircle className="h-4 w-4 mr-2 text-accent" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openRejectDialog(employee)}>
                              <XCircle className="h-4 w-4 mr-2 text-destructive" />
                              Reject
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Approve Application</DialogTitle>
            <DialogDescription>
              {selectedEmployee &&
                `This will approve ${selectedEmployee.name}'s application and send them login credentials.`}
            </DialogDescription>
          </DialogHeader>
          <div className="bg-muted/50 p-3 rounded-md text-sm">
            <p>An email will be sent to the employee with:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Temporary login credentials</li>
              <li>Instructions to set up their account</li>
              <li>Link to the employee portal</li>
            </ul>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApprove} disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
              {isSubmitting ? "Processing..." : "Confirm Approval"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this application. This will be included in the notification email.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Reason for rejection"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Confirm Rejection"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
