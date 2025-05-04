"use client"

import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Sample data for dropdowns
const jobRoles = ["Labor", "Mason", "Electrician", "Plumber", "Carpenter", "Painter", "Site Engineer", "Supervisor"]

const siteNames = ["Site A", "Site B", "Site C", "Site D"]

export function WorkDetailsForm({ data, updateData }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    updateData({ [name]: value })
  }

  const handleSelectChange = (name, value) => {
    updateData({ [name]: value })
  }

  const handleShiftChange = (value) => {
    updateData({ shiftTiming: value })
  }

  // Initialize with default values if empty
  useEffect(() => {
    if (Object.keys(data).length === 0) {
      updateData({
        jobRole: "",
        siteName: "",
        joiningDate: "",
        shiftTiming: "morning",
      })
    }
  }, [data, updateData])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="jobRole">Job Role</Label>
        <Select value={data.jobRole || ""} onValueChange={(value) => handleSelectChange("jobRole", value)}>
          <SelectTrigger id="jobRole">
            <SelectValue placeholder="Select job role" />
          </SelectTrigger>
          <SelectContent>
            {jobRoles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="siteName">Site Name</Label>
        <Select value={data.siteName || ""} onValueChange={(value) => handleSelectChange("siteName", value)}>
          <SelectTrigger id="siteName">
            <SelectValue placeholder="Select site" />
          </SelectTrigger>
          <SelectContent>
            {siteNames.map((site) => (
              <SelectItem key={site} value={site}>
                {site}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="joiningDate">Joining Date</Label>
        <Input
          id="joiningDate"
          name="joiningDate"
          type="date"
          value={data.joiningDate || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Shift Timing</Label>
        <RadioGroup
          defaultValue={data.shiftTiming || "morning"}
          onValueChange={handleShiftChange}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="morning" id="morning" />
            <Label htmlFor="morning">Morning</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="evening" id="evening" />
            <Label htmlFor="evening">Evening</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="night" id="night" />
            <Label htmlFor="night">Night</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
