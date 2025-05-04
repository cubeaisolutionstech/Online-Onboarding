import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SuccessPage() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-10 px-4 w-full">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Application Submitted!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p>Your onboarding application has been successfully submitted for review.</p>
          <p>You will receive an email notification once your application has been processed.</p>
          <div className="border rounded-md p-4 bg-muted mt-6">
            <p className="font-medium">What happens next?</p>
            <ol className="text-left list-decimal list-inside mt-2 space-y-1">
              <li>HR team reviews your application</li>
              <li>You receive approval or rejection notification</li>
              <li>If approved, you'll receive login credentials</li>
              <li>Complete your profile by setting up a permanent password</li>
            </ol>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
