"use client"

import { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { Input } from "@/components/ui/input"

export function DeclarationForm({ data, updateData }) {
  const [agreed, setAgreed] = useState(data.agreed || false)

  const handleAgreementChange = (checked) => {
    setAgreed(checked)
    updateData({ agreed: checked })
  }

  const handleSignatureChange = (e) => {
    const { files } = e.target
    if (files && files[0]) {
      // In a real app, you would handle file upload to a server
      // For now, we'll just store the file name
      updateData({ signature: files[0].name })
    }
  }

  // Initialize with default values if empty
  useEffect(() => {
    if (Object.keys(data).length === 0) {
      updateData({
        agreed: false,
        signature: null,
      })
    }
  }, [data, updateData])

  return (
    <div className="space-y-8">
      <div className="p-4 border rounded-md bg-muted/50">
        <h3 className="font-semibold text-lg mb-4">Declaration</h3>
        <p className="text-sm mb-6">
          I hereby declare that all the information provided by me in this application form is true and correct to the
          best of my knowledge and belief. I understand that providing any false information or suppression of any
          factual information would render me liable to rejection of my application or termination of my employment.
        </p>
        <p className="text-sm mb-6">
          I authorize the company to verify my credentials and contact any references provided by me. I also understand
          that my employment is subject to satisfactory reference checks from previous employers and verification of my
          educational qualifications.
        </p>
        <p className="text-sm">
          I agree to abide by all the rules and regulations of the company that are in force now and also those which
          may be made applicable in future.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="signature">Signature (Optional)</Label>
          <div className="flex items-center gap-4">
            <Input
              id="signature"
              name="signature"
              type="file"
              accept=".jpg,.jpeg,.png"
              className="hidden"
              onChange={handleSignatureChange}
            />
            <Button type="button" variant="outline" onClick={() => document.getElementById("signature").click()}>
              <Upload className="h-4 w-4 mr-2" />
              {data.signature ? "Change Signature" : "Upload Signature"}
            </Button>
            {data.signature && <span className="text-sm text-muted-foreground">{data.signature}</span>}
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox id="agreement" checked={agreed} onCheckedChange={handleAgreementChange} />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="agreement"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I declare that all information provided is true and accurate
            </Label>
            <p className="text-sm text-muted-foreground">
              By checking this box, you agree to the terms and conditions of the declaration
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
