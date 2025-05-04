"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { PersonalInfoForm } from "@/components/onboarding/personal-info-form"
import { IdentityProofForm } from "@/components/onboarding/identity-proof-form"
import { WorkDetailsForm } from "@/components/onboarding/work-details-form"
import { BankDetailsForm } from "@/components/onboarding/bank-details-form"
import { DocumentsForm } from "@/components/onboarding/documents-form"
import { DeclarationForm } from "@/components/onboarding/declaration-form"
import { sendEmail, emailTemplates } from "@/lib/nodemailer"

export default function OnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("personal")
  const [formData, setFormData] = useState({
    personalInfo: {},
    identityProof: {},
    workDetails: {},
    bankDetails: {},
    documents: {},
    declaration: { agreed: false },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }))
  }

  const handleTabChange = (nextTab) => {
    setActiveTab(nextTab)
  }

  const handleNext = () => {
    const tabOrder = ["personal", "identity", "work", "bank", "documents", "declaration"]
    const currentIndex = tabOrder.indexOf(activeTab)
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1])
    }
  }

  const handlePrevious = () => {
    const tabOrder = ["personal", "identity", "work", "bank", "documents", "declaration"]
    const currentIndex = tabOrder.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1])
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // In a real application, you would send the form data to your API
      // const response = await fetch('/api/employees', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      // Send confirmation email
      const emailTemplate = emailTemplates.applicationSubmitted(formData.personalInfo.fullName || "Applicant")

      await sendEmail({
        to: formData.personalInfo.email || "applicant@example.com",
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Form Submitted Successfully",
        description: "Your onboarding form has been submitted for review. You'll receive a confirmation email shortly.",
        variant: "success",
      })

      router.push("/onboarding/success")
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 w-full overflow-x-hidden">
      <Card className="max-w-4xl mx-auto w-full">
        <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white rounded-t-lg">
          <CardTitle className="text-2xl">Employee Onboarding Form</CardTitle>
          <CardDescription className="text-white/90">
            Please complete all sections of the form to submit your onboarding request
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 mb-8 w-full">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="identity">Identity</TabsTrigger>
              <TabsTrigger value="work">Work</TabsTrigger>
              <TabsTrigger value="bank">Bank</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="declaration">Declaration</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="animate-fade-in">
              <PersonalInfoForm
                data={formData.personalInfo}
                updateData={(data) => updateFormData("personalInfo", data)}
              />
            </TabsContent>

            <TabsContent value="identity" className="animate-fade-in">
              <IdentityProofForm
                data={formData.identityProof}
                updateData={(data) => updateFormData("identityProof", data)}
              />
            </TabsContent>

            <TabsContent value="work" className="animate-fade-in">
              <WorkDetailsForm data={formData.workDetails} updateData={(data) => updateFormData("workDetails", data)} />
            </TabsContent>

            <TabsContent value="bank" className="animate-fade-in">
              <BankDetailsForm data={formData.bankDetails} updateData={(data) => updateFormData("bankDetails", data)} />
            </TabsContent>

            <TabsContent value="documents" className="animate-fade-in">
              <DocumentsForm data={formData.documents} updateData={(data) => updateFormData("documents", data)} />
            </TabsContent>

            <TabsContent value="declaration" className="animate-fade-in">
              <DeclarationForm data={formData.declaration} updateData={(data) => updateFormData("declaration", data)} />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={activeTab === "personal"}>
            Previous
          </Button>

          {activeTab === "declaration" ? (
            <Button
              onClick={handleSubmit}
              disabled={!formData.declaration.agreed || isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          ) : (
            <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
              Next
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
