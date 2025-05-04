"use client"

import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export function IdentityProofForm({ data, updateData }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    updateData({ [name]: value })
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files && files[0]) {
      // In a real app, you would handle file upload to a server
      // For now, we'll just store the file name
      updateData({ [`${name}File`]: files[0].name })
    }
  }

  // Initialize with default values if empty
  useEffect(() => {
    if (Object.keys(data).length === 0) {
      updateData({
        aadharNo: "",
        aadharFile: null,
        panNo: "",
        panFile: null,
        voterId: "",
        voterIdFile: null,
      })
    }
  }, [data, updateData])

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label htmlFor="aadharNo">Aadhar Number</Label>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            id="aadharNo"
            name="aadharNo"
            placeholder="XXXX XXXX XXXX"
            value={data.aadharNo || ""}
            onChange={handleChange}
            required
          />
          <div className="flex items-center gap-2">
            <Input
              id="aadharFile"
              name="aadharFile"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("aadharFile").click()}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              {data.aadharFile ? "Change File" : "Upload Aadhar"}
            </Button>
            {data.aadharFile && (
              <span className="text-sm text-muted-foreground truncate max-w-[150px]">{data.aadharFile}</span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label htmlFor="panNo">PAN Number</Label>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            id="panNo"
            name="panNo"
            placeholder="ABCDE1234F"
            value={data.panNo || ""}
            onChange={handleChange}
            required
          />
          <div className="flex items-center gap-2">
            <Input
              id="panFile"
              name="panFile"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("panFile").click()}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              {data.panFile ? "Change File" : "Upload PAN"}
            </Button>
            {data.panFile && (
              <span className="text-sm text-muted-foreground truncate max-w-[150px]">{data.panFile}</span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label htmlFor="voterId">Voter ID / Driving License (Optional)</Label>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            id="voterId"
            name="voterId"
            placeholder="Optional ID Number"
            value={data.voterId || ""}
            onChange={handleChange}
          />
          <div className="flex items-center gap-2">
            <Input
              id="voterIdFile"
              name="voterIdFile"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("voterIdFile").click()}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              {data.voterIdFile ? "Change File" : "Upload ID (Optional)"}
            </Button>
            {data.voterIdFile && (
              <span className="text-sm text-muted-foreground truncate max-w-[150px]">{data.voterIdFile}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
