import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-5xl font-bold tracking-tight mb-6">Welcome to DeCentraHub</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          A decentralized open-source contribution platform where your work is valued with points on the blockchain.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/register">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/explore">
            <Button size="lg" variant="outline">
              Explore Projects
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16 grid md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center p-6 rounded-lg border">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
          <p className="text-muted-foreground">Register and receive 100 starter points to begin your journey.</p>
        </div>

        <div className="flex flex-col items-center text-center p-6 rounded-lg border">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Contribute to Projects</h3>
          <p className="text-muted-foreground">Help others by contributing to their repositories and earn points.</p>
        </div>

        <div className="flex flex-col items-center text-center p-6 rounded-lg border">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Create Repositories</h3>
          <p className="text-muted-foreground">Spend points to create repositories and invite contributors.</p>
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex items-center justify-center text-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Blockchain-Powered Contributions</h3>
            <p className="text-lg text-muted-foreground mb-6">
              DeCentraHub uses blockchain technology to track contributions and reward developers with points. These
              points are stored on the blockchain, providing a transparent and immutable record of your work.
            </p>
            <ul className="space-y-2 ">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-5 w-5 text-green-500"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="flex items-center justify-center text-center">Create repositories by spending points</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-5 w-5 text-green-500"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="flex items-center justify-center text-center">Contribute to projects and earn points</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-5 w-5 text-green-500"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="flex items-center justify-center text-center">Track your contribution history on the blockchain</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

