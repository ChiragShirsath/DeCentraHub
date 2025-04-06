"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useRouter } from "next/navigation"

export default function AcceptContributionPage() {
  const [contributorId, setContributorId] = useState("")
  const [repoId, setRepoId] = useState("")
  const [pointsAwarded, setPointsAwarded] = useState(20)
  const [isAccepting, setIsAccepting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsAccepting(true)

    // Simulate contract interaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsAccepting(false)
    router.push("/dashboard")
  }

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <Card className="w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Accept Contribution</CardTitle>
            <CardDescription>Accept a contribution and award points to the contributor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="contributorId">Contributor ID</Label>
              <Input
                id="contributorId"
                value={contributorId}
                onChange={(e) => setContributorId(e.target.value)}
                placeholder="e.g. 4"
                required
              />
              <p className="text-sm text-muted-foreground">The ID of the contributor</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="repoId">Repository ID</Label>
              <Input
                id="repoId"
                value={repoId}
                onChange={(e) => setRepoId(e.target.value)}
                placeholder="e.g. 2"
                required
              />
              <p className="text-sm text-muted-foreground">The ID of your repository</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="points">Points to Award</Label>
                <span className="font-medium">{pointsAwarded} points</span>
              </div>
              <Slider
                id="points"
                min={5}
                max={50}
                step={5}
                value={[pointsAwarded]}
                onValueChange={(value) => setPointsAwarded(value[0])}
              />
              <p className="text-sm text-muted-foreground">
                Award points based on the value of the contribution. More valuable contributions should receive more
                points.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isAccepting || !contributorId || !repoId}>
              {isAccepting ? "Accepting Contribution..." : "Accept & Award Points"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

