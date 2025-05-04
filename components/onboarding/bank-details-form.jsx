"use client"

import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function BankDetailsForm({ data, updateData }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    updateData({ [name]: value })
  }

  const handlePaymentModeChange = (value) => {
    updateData({ paymentMode: value })
  }

  // Initialize with default values if empty
  useEffect(() => {
    if (Object.keys(data).length === 0) {
      updateData({
        accountNo: "",
        ifscCode: "",
        upiId: "",
        paymentMode: "bank",
      })
    }
  }, [data, updateData])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="accountNo">Bank Account Number</Label>
        <Input id="accountNo" name="accountNo" value={data.accountNo || ""} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ifscCode">IFSC Code</Label>
        <Input id="ifscCode" name="ifscCode" value={data.ifscCode || ""} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="upiId">UPI ID (Optional)</Label>
        <Input id="upiId" name="upiId" value={data.upiId || ""} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label>Mode of Payment</Label>
        <RadioGroup
          defaultValue={data.paymentMode || "bank"}
          onValueChange={handlePaymentModeChange}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bank" id="bank" />
            <Label htmlFor="bank">Bank Transfer</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cash" id="cash" />
            <Label htmlFor="cash">Cash</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
