"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Upload, X } from "lucide-react"

export function DocumentsForm({ data, updateData }) {
  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files && files[0]) {
      // In a real app, you would handle file upload to a server
      // For now, we'll just store the file name
      updateData({ [name]: files[0].name })
    }
  }

  const handleAddCertificate = () => {
    const certificates = [...(data.certificates || []), null]
    updateData({ certificates })
  }

  const handleCertificateChange = (index, fileName) => {
    const certificates = [...(data.certificates || [])]
    certificates[index] = fileName
    updateData({ certificates })
  }

  const handleRemoveCertificate = (index) => {
    const certificates = [...(data.certificates || [])]
    certificates.splice(index, 1)
    updateData({ certificates })
  }

  // Initialize with default values if empty
  useEffect(() => {
    if (Object.keys(data).length === 0) {
      updateData({
        photo: null,
        resume: null,
        certificates: [],
      })
    }
  }, [data, updateData])

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label htmlFor="photo">Passport Photo</Label>
        <div className="flex items-center gap-4">
          <Input
            id="photo"
            name="photo"
            type="file"
            accept=".jpg,.jpeg,.png"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button type="button" variant="outline" onClick={() => document.getElementById("photo").click()}>
            <Upload className="h-4 w-4 mr-2" />
            {data.photo ? "Change Photo" : "Upload Photo"}
          </Button>
          {data.photo && <span className="text-sm text-muted-foreground">{data.photo}</span>}
        </div>
      </div>

      <div className="space-y-4">
        <Label htmlFor="resume">Resume (Optional)</Label>
        <div className="flex items-center gap-4">
          <Input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button type="button" variant="outline" onClick={() => document.getElementById("resume").click()}>
            <Upload className="h-4 w-4 mr-2" />
            {data.resume ? "Change Resume" : "Upload Resume"}
          </Button>
          {data.resume && <span className="text-sm text-muted-foreground">{data.resume}</span>}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Qualification/Experience Certificates</Label>
          <Button type="button" variant="outline" size="sm" onClick={handleAddCertificate}>
            Add Certificate
          </Button>
        </div>

        {(data.certificates || []).length === 0 ? (
          <p className="text-sm text-muted-foreground">No certificates added yet. Click "Add Certificate" to upload.</p>
        ) : (
          <div className="space-y-3">
            {(data.certificates || []).map((cert, index) => (
              <div key={index} className="flex items-center gap-3">
                <Input
                  id={`certificate-${index}`}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleCertificateChange(index, e.target.files[0].name)
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => document.getElementById(`certificate-${index}`).click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {cert ? cert : "Select Certificate"}
                </Button>
                <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveCertificate(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
