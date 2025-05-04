"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { useToast } from "@/components/ui/use-toast"

// Sample employee data for demonstration
const employeeData = {
  id: "EMP2025001",
  status: "Pending",
  submittedOn: "2025-04-15",
  personalInfo: {
    fullName: "Ravi Kumar",
    fatherName: "Mohan Kumar",
    dob: "1990-05-15",
    gender: "Male",
    contactNumber: "9876543210",
    email: "ravi@example.com",
    presentAddress: "123 Main St, Bangalore",
    permanentAddress: "123 Main St, Bangalore",
  },
  identityProof: {
    aadharNo: "1234 5678 9012",
    panNo: "ABCDE1234F",
    voterId: "VTR12345",
  },
  workDetails: {
    jobRole: "Mason",
    siteName: "Site A",
    joiningDate: "2025-04-20",
    shiftTiming: "Morning",
  },
  bankDetails: {
    accountNo: "1234567890",
    ifscCode: "ABCD0001234",
    upiId: "ravi@upi",
    paymentMode: "Bank",
  },
  documents: {
    photo: "/placeholder.svg?height=150&width=150",
    resume: null,
    certificates: ["Certificate 1", "Certificate 2"],
  },
}

export default function EmployeeDetailPage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // In a real app, you would fetch the employee data based on the ID
  const employee = employeeData

  const handleApprove = async () => {
    setIsSubmitting(true)

    try {
      // In a real application, you would call your API
      // const response = await fetch(`/api/employees/${params.id}/approve`, {
      //   method: 'PUT'
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Application Approved",
        description: `${employee.personalInfo.fullName} has been successfully onboarded.`,
        variant: "success",
      })

      setIsApproveDialogOpen(false)
      router.push("/admin/dashboard")
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
      // const response = await fetch(`/api/employees/${params.id}/reject`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ reason: rejectionReason })
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Application Rejected",
        description: `${employee.personalInfo.fullName}'s application has been rejected.`,
        variant: "success",
      })

      setIsRejectDialogOpen(false)
      router.push("/admin/dashboard")
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
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Employee Application</h1>
            <p className="text-muted-foreground">Review application details for {employee.personalInfo.fullName}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">ID:</span>
              <span>{employee.id}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Status:</span>
              <Badge
                variant={
                  employee.status === "Onboarded"
                    ? "default"
                    : employee.status === "Rejected"
                      ? "destructive"
                      : "outline"
                }
              >
                {employee.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Submitted:</span>
              <span>{new Date(employee.submittedOn).toLocaleDateString()}</span>
            </div>
          </div>

          {employee.status === "Pending" && (
            <div className="flex gap-2">
              <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-1">
                    <CheckCircle className="h-4 w-4" />
                    Approve
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Approve Application</DialogTitle>
                    <DialogDescription>
                      This will approve {employee.personalInfo.fullName}'s application and send them login credentials.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleApprove} disabled={isSubmitting}>
                      {isSubmitting ? "Processing..." : "Confirm Approval"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="gap-1">
                    <XCircle className="h-4 w-4" />
                    Reject
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reject Application</DialogTitle>
                    <DialogDescription>
                      Please provide a reason for rejecting this application. This will be included in the notification
                      email.
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
            </div>
          )}
        </div>

        <Tabs defaultValue="personal">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="identity">Identity</TabsTrigger>
            <TabsTrigger value="work">Work</TabsTrigger>
            <TabsTrigger value="bank">Bank</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="declaration">Declaration</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium">Full Name</h3>
                  <p>{employee.personalInfo.fullName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Father's Name</h3>
                  <p>{employee.personalInfo.fatherName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Date of Birth</h3>
                  <p>{new Date(employee.personalInfo.dob).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Gender</h3>
                  <p>{employee.personalInfo.gender}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Contact Number</h3>
                  <p>{employee.personalInfo.contactNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Email</h3>
                  <p>{employee.personalInfo.email}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium">Present Address</h3>
                  <p>{employee.personalInfo.presentAddress}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium">Permanent Address</h3>
                  <p>{employee.personalInfo.permanentAddress}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="identity">
            <Card>
              <CardHeader>
                <CardTitle>Identity Proof</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium">Aadhar Number</h3>
                  <p>{employee.identityProof.aadharNo}</p>
                  <Button variant="link" className="p-0 h-auto mt-1">
                    <Download className="h-4 w-4 mr-1" /> Download Aadhar
                  </Button>
                </div>
                <div>
                  <h3 className="text-sm font-medium">PAN Number</h3>
                  <p>{employee.identityProof.panNo}</p>
                  <Button variant="link" className="p-0 h-auto mt-1">
                    <Download className="h-4 w-4 mr-1" /> Download PAN
                  </Button>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Voter ID / Driving License</h3>
                  <p>{employee.identityProof.voterId || "Not provided"}</p>
                  {employee.identityProof.voterId && (
                    <Button variant="link" className="p-0 h-auto mt-1">
                      <Download className="h-4 w-4 mr-1" /> Download ID
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="work">
            <Card>
              <CardHeader>
                <CardTitle>Work Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium">Job Role</h3>
                  <p>{employee.workDetails.jobRole}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Site Name</h3>
                  <p>{employee.workDetails.siteName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Joining Date</h3>
                  <p>{new Date(employee.workDetails.joiningDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Shift Timing</h3>
                  <p>{employee.workDetails.shiftTiming}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bank">
            <Card>
              <CardHeader>
                <CardTitle>Bank & Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium">Bank Account Number</h3>
                  <p>{employee.bankDetails.accountNo}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">IFSC Code</h3>
                  <p>{employee.bankDetails.ifscCode}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">UPI ID</h3>
                  <p>{employee.bankDetails.upiId || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Mode of Payment</h3>
                  <p>{employee.bankDetails.paymentMode}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium">Passport Photo</h3>
                  <div className="mt-2 border rounded-md p-2 inline-block">
                    <img
                      src={employee.documents.photo || "/placeholder.svg"}
                      alt="Passport Photo"
                      className="h-32 w-32 object-cover"
                    />
                  </div>
                  <div className="mt-2">
                    <Button variant="link" className="p-0 h-auto">
                      <Download className="h-4 w-4 mr-1" /> Download Photo
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Resume</h3>
                  {employee.documents.resume ? (
                    <Button variant="link" className="p-0 h-auto mt-2">
                      <Download className="h-4 w-4 mr-1" /> Download Resume
                    </Button>
                  ) : (
                    <p className="text-muted-foreground mt-2">Not provided</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium">Certificates</h3>
                  {employee.documents.certificates.length > 0 ? (
                    <div className="mt-2 space-y-2">
                      {employee.documents.certificates.map((cert, index) => (
                        <Button key={index} variant="link" className="p-0 h-auto block">
                          <Download className="h-4 w-4 mr-1" /> {cert}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground mt-2">No certificates provided</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="declaration">
            <Card>
              <CardHeader>
                <CardTitle>Declaration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  The applicant has declared that all information provided is true and accurate.
                </p>
                <div className="mt-4">
                  <h3 className="text-sm font-medium">Signature</h3>
                  <div className="mt-2 border rounded-md p-2 inline-block">
                    <img src="/placeholder.svg?height=100&width=200" alt="Signature" className="h-16 object-contain" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
