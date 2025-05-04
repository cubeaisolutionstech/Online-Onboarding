"use client"

import { useState } from "react"
import { Save, Mail, Bell, Shield, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [emailSettings, setEmailSettings] = useState({
    senderName: "HR Team",
    senderEmail: "deepikagowtham24@gmail.com",
    replyToEmail: "hr@example.com",
    emailSignature: "Best regards,\nHR Team\nYour Company",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailOnSubmission: true,
    emailOnApproval: true,
    emailOnRejection: true,
    emailToAdmin: true,
    emailToSupervisor: false,
  })

  const [securitySettings, setSecuritySettings] = useState({
    passwordExpiry: "90",
    passwordMinLength: "8",
    passwordComplexity: "medium",
    sessionTimeout: "30",
    loginAttempts: "5",
  })

  const [generalSettings, setGeneralSettings] = useState({
    companyName: "Your Company",
    companyLogo: "",
    defaultLanguage: "english",
    timezone: "Asia/Kolkata",
  })

  const handleEmailChange = (e) => {
    const { name, value } = e.target
    setEmailSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name, checked) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSecurityChange = (e) => {
    const { name, value } = e.target
    setSecuritySettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleGeneralChange = (e) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveSettings = async (type) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings Saved",
        description: `Your ${type} settings have been updated successfully.`,
        variant: "success",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving your settings.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your application settings</p>
        </div>

        <Tabs defaultValue="email" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure email sender details and templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="senderName">Sender Name</Label>
                    <Input
                      id="senderName"
                      name="senderName"
                      value={emailSettings.senderName}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderEmail">Sender Email</Label>
                    <Input
                      id="senderEmail"
                      name="senderEmail"
                      type="email"
                      value={emailSettings.senderEmail}
                      onChange={handleEmailChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="replyToEmail">Reply-To Email</Label>
                  <Input
                    id="replyToEmail"
                    name="replyToEmail"
                    type="email"
                    value={emailSettings.replyToEmail}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailSignature">Email Signature</Label>
                  <Textarea
                    id="emailSignature"
                    name="emailSignature"
                    rows={4}
                    value={emailSettings.emailSignature}
                    onChange={handleEmailChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleSaveSettings("email")}
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure when and to whom notifications are sent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="emailOnSubmission" className="flex-1">
                        Send email when application is submitted
                      </Label>
                      <Switch
                        id="emailOnSubmission"
                        checked={notificationSettings.emailOnSubmission}
                        onCheckedChange={(checked) => handleNotificationChange("emailOnSubmission", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="emailOnApproval" className="flex-1">
                        Send email when application is approved
                      </Label>
                      <Switch
                        id="emailOnApproval"
                        checked={notificationSettings.emailOnApproval}
                        onCheckedChange={(checked) => handleNotificationChange("emailOnApproval", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="emailOnRejection" className="flex-1">
                        Send email when application is rejected
                      </Label>
                      <Switch
                        id="emailOnRejection"
                        checked={notificationSettings.emailOnRejection}
                        onCheckedChange={(checked) => handleNotificationChange("emailOnRejection", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Recipients</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="emailToAdmin" className="flex-1">
                        Send notifications to admin
                      </Label>
                      <Switch
                        id="emailToAdmin"
                        checked={notificationSettings.emailToAdmin}
                        onCheckedChange={(checked) => handleNotificationChange("emailToAdmin", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="emailToSupervisor" className="flex-1">
                        Send notifications to supervisor
                      </Label>
                      <Switch
                        id="emailToSupervisor"
                        checked={notificationSettings.emailToSupervisor}
                        onCheckedChange={(checked) => handleNotificationChange("emailToSupervisor", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleSaveSettings("notification")}
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure password policies and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Password Policy</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                      <Input
                        id="passwordExpiry"
                        name="passwordExpiry"
                        type="number"
                        value={securitySettings.passwordExpiry}
                        onChange={handleSecurityChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                      <Input
                        id="passwordMinLength"
                        name="passwordMinLength"
                        type="number"
                        value={securitySettings.passwordMinLength}
                        onChange={handleSecurityChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passwordComplexity">Password Complexity</Label>
                      <select
                        id="passwordComplexity"
                        name="passwordComplexity"
                        value={securitySettings.passwordComplexity}
                        onChange={handleSecurityChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="low">Low (letters only)</option>
                        <option value="medium">Medium (letters + numbers)</option>
                        <option value="high">High (letters, numbers, special characters)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Session Settings</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Input
                        id="sessionTimeout"
                        name="sessionTimeout"
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={handleSecurityChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                      <Input
                        id="loginAttempts"
                        name="loginAttempts"
                        type="number"
                        value={securitySettings.loginAttempts}
                        onChange={handleSecurityChange}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleSaveSettings("security")}
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure general application settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={generalSettings.companyName}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyLogo">Company Logo</Label>
                    <Input id="companyLogo" name="companyLogo" type="file" onChange={handleGeneralChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultLanguage">Default Language</Label>
                    <select
                      id="defaultLanguage"
                      name="defaultLanguage"
                      value={generalSettings.defaultLanguage}
                      onChange={handleGeneralChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                      <option value="tamil">Tamil</option>
                      <option value="telugu">Telugu</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      name="timezone"
                      value={generalSettings.timezone}
                      onChange={handleGeneralChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Asia/Kolkata">India (GMT+5:30)</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time (US & Canada)</option>
                      <option value="Europe/London">London</option>
                    </select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleSaveSettings("general")}
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
