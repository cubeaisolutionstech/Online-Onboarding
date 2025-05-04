"use client"

import { useState } from "react"
import { Save, Upload, Edit } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmployeeLayout } from "@/components/layouts/employee-layout"
import { useToast } from "@/components/ui/use-toast"

// Sample employee data for demonstration
const employeeData = {
  id: "EMP2025002",
  name: "Priya M",
  role: "Electrician",
  site: "Site B",
  joinedOn: "2025-04-15",
  email: "priya@example.com",
  contactNumber: "9876543210",
  alternateNumber: "",
  dob: "1992-06-15",
  gender: "Female",
  fatherName: "Mohan Kumar",
  presentAddress: "123 Main St, Bangalore",
  permanentAddress: "123 Main St, Bangalore",
  emergencyContact: {
    name: "Rahul M",
    relationship: "Brother",
    phone: "9876543211",
  },
  bankDetails: {
    accountNo: "1234567890",
    ifscCode: "ABCD0001234",
    upiId: "priya@upi",
    paymentMode: "Bank",
  },
}

export default function ProfilePage() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileData, setProfileData] = useState(employeeData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEmergencyContactChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [name]: value,
      },
    }))
  }

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      bankDetails: {
        ...prev.bankDetails,
        [name]: value,
      },
    }))
  }

  const handleSaveProfile = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
        variant: "success",
      })

      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <EmployeeLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">View and update your profile information</p>
          </div>
          <Button
            variant={isEditing ? "outline" : "default"}
            className={isEditing ? "" : "bg-primary hover:bg-primary/90"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt={profileData.name} />
                <AvatarFallback>
                  {profileData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
            </CardContent>
          </Card>

          <div className="md:col-span-3 space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
                <TabsTrigger value="bank">Bank Details</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Your basic personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactNumber">Contact Number</Label>
                        <Input
                          id="contactNumber"
                          name="contactNumber"
                          value={profileData.contactNumber}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="alternateNumber">Alternate Number</Label>
                        <Input
                          id="alternateNumber"
                          name="alternateNumber"
                          value={profileData.alternateNumber}
                          onChange={handleChange}
                          disabled={!isEditing}
                          placeholder="Optional"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input
                          id="dob"
                          name="dob"
                          type="date"
                          value={profileData.dob}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Input
                          id="gender"
                          name="gender"
                          value={profileData.gender}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fatherName">Father's Name</Label>
                        <Input
                          id="fatherName"
                          name="fatherName"
                          value={profileData.fatherName}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="presentAddress">Present Address</Label>
                      <Textarea
                        id="presentAddress"
                        name="presentAddress"
                        value={profileData.presentAddress}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="permanentAddress">Permanent Address</Label>
                      <Textarea
                        id="permanentAddress"
                        name="permanentAddress"
                        value={profileData.permanentAddress}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </CardContent>
                  {isEditing && (
                    <CardFooter>
                      <Button
                        onClick={handleSaveProfile}
                        disabled={isSubmitting}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {isSubmitting ? "Saving..." : "Save Changes"}
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="emergency" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Contact</CardTitle>
                    <CardDescription>Who to contact in case of emergency</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyName">Contact Name</Label>
                        <Input
                          id="emergencyName"
                          name="name"
                          value={profileData.emergencyContact.name}
                          onChange={handleEmergencyContactChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="relationship">Relationship</Label>
                        <Input
                          id="relationship"
                          name="relationship"
                          value={profileData.emergencyContact.relationship}
                          onChange={handleEmergencyContactChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyPhone">Contact Number</Label>
                        <Input
                          id="emergencyPhone"
                          name="phone"
                          value={profileData.emergencyContact.phone}
                          onChange={handleEmergencyContactChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                  {isEditing && (
                    <CardFooter>
                      <Button
                        onClick={handleSaveProfile}
                        disabled={isSubmitting}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {isSubmitting ? "Saving..." : "Save Changes"}
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="bank" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Bank Details</CardTitle>
                    <CardDescription>Your payment information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="accountNo">Account Number</Label>
                        <Input
                          id="accountNo"
                          name="accountNo"
                          value={profileData.bankDetails.accountNo}
                          onChange={handleBankDetailsChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ifscCode">IFSC Code</Label>
                        <Input
                          id="ifscCode"
                          name="ifscCode"
                          value={profileData.bankDetails.ifscCode}
                          onChange={handleBankDetailsChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="upiId">UPI ID (Optional)</Label>
                        <Input
                          id="upiId"
                          name="upiId"
                          value={profileData.bankDetails.upiId}
                          onChange={handleBankDetailsChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paymentMode">Payment Mode</Label>
                        <Input
                          id="paymentMode"
                          name="paymentMode"
                          value={profileData.bankDetails.paymentMode}
                          onChange={handleBankDetailsChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                  {isEditing && (
                    <CardFooter>
                      <Button
                        onClick={handleSaveProfile}
                        disabled={isSubmitting}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {isSubmitting ? "Saving..." : "Save Changes"}
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  )
}
