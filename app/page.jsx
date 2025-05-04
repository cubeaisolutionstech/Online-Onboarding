import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Employee Onboarding System</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-12 w-full">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold tracking-tight">Welcome to the Employee Onboarding Portal</h2>
          <p className="text-xl text-muted-foreground">
            Streamline your onboarding process with our secure and efficient system
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg bg-primary hover:bg-primary/90">
              <Link href="/onboarding">Start Onboarding</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link href="/login">Employee Login</Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="bg-card p-6 rounded-lg shadow card-hover">
              <h3 className="text-xl font-semibold mb-3">Easy Submission</h3>
              <p>Complete your onboarding form and upload required documents in one place</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow card-hover">
              <h3 className="text-xl font-semibold mb-3">Secure Storage</h3>
              <p>Your personal information and documents are stored securely</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow card-hover">
              <h3 className="text-xl font-semibold mb-3">Quick Approval</h3>
              <p>HR team reviews and approves your submission promptly</p>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} Employee Onboarding System. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
