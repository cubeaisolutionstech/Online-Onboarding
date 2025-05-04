"use client"

import { useState } from "react"
import { Download, Upload, Eye, FileText, File, ImageIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { EmployeeLayout } from "@/components/layouts/employee-layout"
import { useToast } from "@/components/ui/use-toast"

// Sample data for demonstration
const documentsData = [
  {
    id: "doc1",
    name: "Aadhar Card",
    type: "Identity",
    format: "PDF",
    size: "1.2 MB",
    uploadedOn: "2025-04-10",
    status: "Verified",
  },
  {
    id: "doc2",
    name: "PAN Card",
    type: "Identity",
    format: "PDF",
    size: "0.8 MB",
    uploadedOn: "2025-04-10",
    status: "Verified",
  },
  {
    id: "doc3",
    name: "Passport Photo",
    type: "Photo",
    format: "JPG",
    size: "0.5 MB",
    uploadedOn: "2025-04-10",
    status: "Verified",
  },
  {
    id: "doc4",
    name: "Electrician Certificate",
    type: "Qualification",
    format: "PDF",
    size: "2.1 MB",
    uploadedOn: "2025-04-10",
    status: "Verified",
  },
  {
    id: "doc5",
    name: "Experience Letter",
    type: "Experience",
    format: "PDF",
    size: "1.5 MB",
    uploadedOn: "2025-04-10",
    status: "Verified",
  },
]

const companyDocumentsData = [
  {
    id: "cdoc1",
    name: "Employee Handbook",
    type: "Policy",
    format: "PDF",
    size: "3.5 MB",
    uploadedOn: "2025-01-15",
  },
  {
    id: "cdoc2",
    name: "Safety Guidelines",
    type: "Policy",
    format: "PDF",
    size: "2.2 MB",
    uploadedOn: "2025-01-15",
  },
  {
    id: "cdoc3",
    name: "Code of Conduct",
    type: "Policy",
    format: "PDF",
    size: "1.8 MB",
    uploadedOn: "2025-01-15",
  },
  {
    id: "cdoc4",
    name: "Leave Policy",
    type: "Policy",
    format: "PDF",
    size: "1.2 MB",
    uploadedOn: "2025-01-15",
  },
]

export default function DocumentsPage() {
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const [documents, setDocuments] = useState(documentsData)
  const [newDocument, setNewDocument] = useState({
    name: "",
    type: "Other",
    file: null,
  })

  const handleDocumentChange = (e) => {
    const { name, value } = e.target
    setNewDocument((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewDocument((prev) => ({ ...prev, file: e.target.files[0] }))
    }
  }

  const handleUploadDocument = async (e) => {
    e.preventDefault()

    if (!newDocument.name || !newDocument.file) {
      toast({
        title: "Missing Information",
        description: "Please provide a document name and select a file to upload.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Add new document to the list
      const newDoc = {
        id: `doc${documents.length + 1}`,
        name: newDocument.name,
        type: newDocument.type,
        format: newDocument.file.name.split(".").pop().toUpperCase(),
        size: `${(newDocument.file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedOn: new Date().toISOString().split("T")[0],
        status: "Pending",
      }

      setDocuments((prev) => [newDoc, ...prev])

      // Reset form
      setNewDocument({
        name: "",
        type: "Other",
        file: null,
      })

      toast({
        title: "Document Uploaded",
        description: "Your document has been uploaded successfully and is pending verification.",
        variant: "success",
      })
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const getDocumentIcon = (format) => {
    switch (format.toLowerCase()) {
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />
      case "jpg":
      case "jpeg":
      case "png":
        return <ImageIcon className="h-6 w-6 text-blue-500" />
      default:
        return <File className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <EmployeeLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">View and manage your documents</p>
        </div>

        <Tabs defaultValue="my-documents" className="space-y-4">
          <TabsList>
            <TabsTrigger value="my-documents">My Documents</TabsTrigger>
            <TabsTrigger value="company-documents">Company Documents</TabsTrigger>
            <TabsTrigger value="upload">Upload Document</TabsTrigger>
          </TabsList>

          <TabsContent value="my-documents" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {documents.map((doc) => (
                <Card key={doc.id} className="card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {getDocumentIcon(doc.format)}
                        <div>
                          <CardTitle className="text-base">{doc.name}</CardTitle>
                          <CardDescription>{doc.type}</CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant={doc.status === "Verified" ? "default" : "outline"}
                        className={doc.status === "Verified" ? "bg-green-500" : ""}
                      >
                        {doc.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-4">
                      <div className="flex justify-between">
                        <span>Format:</span>
                        <span>{doc.format}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Size:</span>
                        <span>{doc.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Uploaded:</span>
                        <span>{new Date(doc.uploadedOn).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="company-documents" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {companyDocumentsData.map((doc) => (
                <Card key={doc.id} className="card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      {getDocumentIcon(doc.format)}
                      <div>
                        <CardTitle className="text-base">{doc.name}</CardTitle>
                        <CardDescription>{doc.type}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-4">
                      <div className="flex justify-between">
                        <span>Format:</span>
                        <span>{doc.format}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Size:</span>
                        <span>{doc.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Updated:</span>
                        <span>{new Date(doc.uploadedOn).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Document</CardTitle>
                <CardDescription>Add a new document to your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUploadDocument} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="documentName">Document Name</Label>
                      <Input
                        id="documentName"
                        name="name"
                        value={newDocument.name}
                        onChange={handleDocumentChange}
                        placeholder="Enter document name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="documentType">Document Type</Label>
                      <select
                        id="documentType"
                        name="type"
                        value={newDocument.type}
                        onChange={handleDocumentChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="Identity">Identity</option>
                        <option value="Address">Address Proof</option>
                        <option value="Qualification">Qualification</option>
                        <option value="Experience">Experience</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="documentFile">Upload File</Label>
                    <div className="flex items-center gap-4">
                      <Input id="documentFile" name="file" type="file" onChange={handleFileChange} className="hidden" />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("documentFile").click()}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {newDocument.file ? newDocument.file.name : "Select File"}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Accepted formats: PDF, JPG, PNG, JPEG. Maximum file size: 5MB
                    </p>
                  </div>
                  <Button
                    type="submit"
                    disabled={isUploading || !newDocument.name || !newDocument.file}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isUploading ? "Uploading..." : "Upload Document"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </EmployeeLayout>
  )
}
