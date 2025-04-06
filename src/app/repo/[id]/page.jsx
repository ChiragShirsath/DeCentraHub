"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from "next/navigation"

// Mock data
const mockRepoDetails = {
  id: 3,
  ownerId: 3,
  ownerName: "bob.eth",
  name: "Smart Contract Library",
  description:
    "A collection of reusable smart contracts for various DeFi applications. Includes lending, borrowing, and staking contracts that are audited and ready to use.",
  createdAt: new Date().getTime() - 20 * 24 * 60 * 60 * 1000,
  totalContributions: 3,
  totalPointsAwarded: 45,
}

const mockContributions = [
  {
    id: 1,
    contributorId: 1,
    contributorName: "user1.eth",
    description: "Added ERC20 token contract",
    timestamp: new Date().getTime() - 15 * 24 * 60 * 60 * 1000,
    pointsAwarded: 20,
    status: "accepted",
  },
  {
    id: 2,
    contributorId: 4,
    contributorName: "carol.eth",
    description: "Fixed security vulnerability in staking contract",
    timestamp: new Date().getTime() - 10 * 24 * 60 * 60 * 1000,
    pointsAwarded: 15,
    status: "accepted",
  },
  {
    id: 3,
    contributorId: 1,
    contributorName: "user1.eth",
    description: "Added documentation for lending contract",
    timestamp: new Date().getTime() - 5 * 24 * 60 * 60 * 1000,
    pointsAwarded: 10,
    status: "accepted",
  },
  {
    id: 4,
    contributorId: 5,
    contributorName: "dave.eth",
    description: "Optimized gas usage in borrowing contract",
    timestamp: new Date().getTime() - 2 * 24 * 60 * 60 * 1000,
    pointsAwarded: 0,
    status: "pending",
  },
]

export default function RepoDetailPage() {
  const params = useParams()
  const [repo, setRepo] = useState(mockRepoDetails)
  const [contributions, setContributions] = useState(mockContributions)
  const [isContributing, setIsContributing] = useState(false)
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    // In a real app, we would fetch the repo details based on the ID
    console.log("Repo ID:", params.id)

    // Mock check if current user is the owner
    setIsOwner(false) // Set to true to test owner view
  }, [params.id])

  // Format date
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString()
  }

  const handleContribute = async () => {
    setIsContributing(true)

    // Simulate contract interaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsContributing(false)
    // In a real app, we would redirect to a contribution form or show a success message
    alert("Contribution submitted!")
  }

  const handleAcceptContribution = async (contributionId) => {
    // Simulate contract interaction
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update the contribution status
    setContributions((prevContributions) =>
      prevContributions.map((contribution) =>
        contribution.id === contributionId ? { ...contribution, status: "accepted", pointsAwarded: 15 } : contribution,
      ),
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <CardTitle className="text-2xl">{repo.name}</CardTitle>
              <CardDescription>by {repo.ownerName}</CardDescription>
            </div>
            {!isOwner && (
              <Button onClick={handleContribute} disabled={isContributing}>
                {isContributing ? "Submitting..." : "Contribute"}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-6">{repo.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Created</p>
              <p className="font-medium">{formatDate(repo.createdAt)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Owner</p>
              <p className="font-medium">{repo.ownerName}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Contributions</p>
              <p className="font-medium">{repo.totalContributions}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Points Awarded</p>
              <p className="font-medium">{repo.totalPointsAwarded}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Contributions</h2>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {contributions.map((contribution) => (
              <Card key={contribution.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{contribution.description}</CardTitle>
                      <CardDescription>by {contribution.contributorName}</CardDescription>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        contribution.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {contribution.status === "accepted" ? "Accepted" : "Pending"}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <p className="text-muted-foreground">Submitted on {formatDate(contribution.timestamp)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {contribution.status === "accepted" && (
                        <div className="font-medium">+{contribution.pointsAwarded} points awarded</div>
                      )}
                      {isOwner && contribution.status === "pending" && (
                        <Button size="sm" onClick={() => handleAcceptContribution(contribution.id)}>
                          Accept & Award Points
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="accepted">
          <div className="space-y-4">
            {contributions
              .filter((contribution) => contribution.status === "accepted")
              .map((contribution) => (
                <Card key={contribution.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{contribution.description}</CardTitle>
                        <CardDescription>by {contribution.contributorName}</CardDescription>
                      </div>
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Accepted</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <p className="text-muted-foreground">Submitted on {formatDate(contribution.timestamp)}</p>
                      </div>
                      <div className="font-medium">+{contribution.pointsAwarded} points awarded</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="space-y-4">
            {contributions
              .filter((contribution) => contribution.status === "pending")
              .map((contribution) => (
                <Card key={contribution.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{contribution.description}</CardTitle>
                        <CardDescription>by {contribution.contributorName}</CardDescription>
                      </div>
                      <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <p className="text-muted-foreground">Submitted on {formatDate(contribution.timestamp)}</p>
                      </div>
                      {isOwner && (
                        <Button size="sm" onClick={() => handleAcceptContribution(contribution.id)}>
                          Accept & Award Points
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

