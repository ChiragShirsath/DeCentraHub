"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Mock data
const mockUserProfile = {
  registeredAt: new Date().getTime() , // 30 days ago
  currentPoints: 100,
  totalPointsEarned: 0,
  createdRepoIds: [1, 2],
  contributedRepoIds: [3, 4, 5],
}

const mockCreatedRepos = [
  {
    id: 1,
    name: "DeFi Protocol",
    description: "A decentralized finance protocol for lending and borrowing",
    createdAt: new Date().getTime() - 25 * 24 * 60 * 60 * 1000,
    totalContributions: 5,
    totalPointsAwarded: 30,
  },
  {
    id: 2,
    name: "NFT Marketplace",
    description: "A marketplace for trading non-fungible tokens",
    createdAt: new Date().getTime() - 15 * 24 * 60 * 60 * 1000,
    totalContributions: 2,
    totalPointsAwarded: 20,
  },
]

const mockContributedRepos = [
  {
    id: 3,
    name: "Smart Contract Library",
    description: "A collection of reusable smart contracts",
    firstContributionAt: new Date().getTime() - 20 * 24 * 60 * 60 * 1000,
    totalContributions: 3,
    totalPointsAwarded: 45,
  },
  {
    id: 4,
    name: "Blockchain Explorer",
    description: "A tool for exploring blockchain data",
    firstContributionAt: new Date().getTime() - 10 * 24 * 60 * 60 * 1000,
    totalContributions: 1,
    totalPointsAwarded: 15,
  },
  {
    id: 5,
    name: "Web3 Authentication",
    description: "Authentication library for Web3 applications",
    firstContributionAt: new Date().getTime() - 5 * 24 * 60 * 60 * 1000,
    totalContributions: 2,
    totalPointsAwarded: 35,
  },
]

export default function DashboardPage() {
  const [userProfile, setUserProfile] = useState(mockUserProfile)
  const [createdRepos, setCreatedRepos] = useState(mockCreatedRepos)
  const [contributedRepos, setContributedRepos] = useState(mockContributedRepos)

  // Format date
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userProfile.currentPoints}</div>
            <p className="text-xs text-muted-foreground mt-1">Available for creating repositories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Points Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userProfile.totalPointsEarned}</div>
            <p className="text-xs text-muted-foreground mt-1">Lifetime points from contributions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Member Since</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatDate(userProfile.registeredAt)}</div>
            <p className="text-xs text-muted-foreground mt-1">Registration date</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Activity</h2>
          <Link href="/create-repo">
            <Button>Create Repository</Button>
          </Link>
        </div>

        <Tabs defaultValue="created">
          <TabsList className="mb-4">
            <TabsTrigger value="created">Created Repositories ({createdRepos.length})</TabsTrigger>
            <TabsTrigger value="contributed">Contributed Repositories ({contributedRepos.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="created">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {createdRepos.map((repo) => (
                <Card key={repo.id}>
                  <CardHeader>
                    <CardTitle>{repo.name}</CardTitle>
                    <CardDescription>{repo.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Created</p>
                        <p className="font-medium">{formatDate(repo.createdAt)}</p>
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
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contributed">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contributedRepos.map((repo) => (
                <Card key={repo.id}>
                  <CardHeader>
                    <CardTitle>{repo.name}</CardTitle>
                    <CardDescription>{repo.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">First Contribution</p>
                        <p className="font-medium">{formatDate(repo.firstContributionAt)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Contributions</p>
                        <p className="font-medium">{repo.totalContributions}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Points Earned</p>
                        <p className="font-medium">{repo.totalPointsAwarded}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

