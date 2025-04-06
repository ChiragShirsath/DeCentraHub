"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

// Mock data
const mockRepos = [
  {
    id: 1,
    ownerId: 2,
    ownerName: "alice.eth",
    name: "DeFi Protocol",
    description: "A decentralized finance protocol for lending and borrowing",
    createdAt: new Date().getTime() - 25 * 24 * 60 * 60 * 1000,
    totalContributions: 5,
    totalPointsAwarded: 30,
  },
  {
    id: 2,
    ownerId: 2,
    ownerName: "alice.eth",
    name: "NFT Marketplace",
    description: "A marketplace for trading non-fungible tokens",
    createdAt: new Date().getTime() - 15 * 24 * 60 * 60 * 1000,
    totalContributions: 2,
    totalPointsAwarded: 20,
  },
  {
    id: 3,
    ownerId: 3,
    ownerName: "bob.eth",
    name: "Smart Contract Library",
    description: "A collection of reusable smart contracts",
    createdAt: new Date().getTime() - 20 * 24 * 60 * 60 * 1000,
    totalContributions: 3,
    totalPointsAwarded: 45,
  },
  {
    id: 4,
    ownerId: 4,
    ownerName: "carol.eth",
    name: "Blockchain Explorer",
    description: "A tool for exploring blockchain data",
    createdAt: new Date().getTime() - 10 * 24 * 60 * 60 * 1000,
    totalContributions: 1,
    totalPointsAwarded: 15,
  },
  {
    id: 5,
    ownerId: 5,
    ownerName: "dave.eth",
    name: "Web3 Authentication",
    description: "Authentication library for Web3 applications",
    createdAt: new Date().getTime() - 5 * 24 * 60 * 60 * 1000,
    totalContributions: 2,
    totalPointsAwarded: 35,
  },
  {
    id: 6,
    ownerId: 6,
    ownerName: "eve.eth",
    name: "Decentralized Storage",
    description: "A decentralized storage solution",
    createdAt: new Date().getTime() - 3 * 24 * 60 * 60 * 1000,
    totalContributions: 0,
    totalPointsAwarded: 0,
  },
]

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [repos, setRepos] = useState(mockRepos)

  // Format date
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString()
  }

  // Filter repos based on search term
  const filteredRepos = repos.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Repositories</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            placeholder="Search repositories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link href="/create-repo">
          <Button>Create Repository</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRepos.map((repo) => (
          <Card key={repo.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="truncate">{repo.name}</CardTitle>
              <CardDescription>by {repo.ownerName}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">{repo.description}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
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
            <CardFooter>
              <Link href={`/repo/${repo.id}`} className="w-full">
                <Button variant="outline" className="w-full">
                  View Repository
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredRepos.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No repositories found</h3>
          <p className="text-muted-foreground mb-4">Try a different search term or create your own repository</p>
          <Link href="/create-repo">
            <Button>Create Repository</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

