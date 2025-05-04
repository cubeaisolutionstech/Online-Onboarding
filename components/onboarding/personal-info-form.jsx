"use client"

import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export function PersonalInfoForm({ data, updateData }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    updateData({ [name]: value })
  }

  const handleGenderChange = (value) => {
    updateData({ gender: value })
  }

  // Initialize with default values if empty
  useEffect(() => {
    if (Object.keys(data).length === 0) {
      updateData({
        fullName: "",
        fatherName: "",
        dob: "",
        gender: "male",
        contactNumber: "",
        email: "",
        presentAddress: "",
        permanentAddress: "",
      })
    }
  }, [data, updateData])

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" value={data.fullName || ""} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fatherName">Father's Name</Label>
          <Input id="fatherName" name="fatherName" value={data.fatherName || ""} onChange={handleChange} required />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input id="dob" name="dob" type="date" value={data.dob || ""} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label>Gender</Label>
          <RadioGroup defaultValue={data.gender || "male"} onValueChange={handleGenderChange} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contactNumber">Contact Number</Label>
          <Input
            id="contactNumber"
            name="contactNumber"
            type="tel"
            value={data.contactNumber || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email ID</Label>
          <Input id="email" name="email" type="email" value={data.email || ""} onChange={handleChange} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="presentAddress">Present Address</Label>
        <Textarea
          id="presentAddress"
          name="presentAddress"
          value={data.presentAddress || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="permanentAddress">Permanent Address</Label>
        <Textarea
          id="permanentAddress"
          name="permanentAddress"
          value={data.permanentAddress || ""}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  )
}
