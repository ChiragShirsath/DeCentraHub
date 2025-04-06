"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowUpDown, Star, GitFork } from "lucide-react"

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
    tags: ["defi", "finance", "ethereum"],
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
    tags: ["nft", "marketplace", "ethereum"],
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
    tags: ["smart-contracts", "library", "solidity"],
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
    tags: ["explorer", "data", "blockchain"],
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
    tags: ["web3", "authentication", "security"],
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
    tags: ["storage", "ipfs", "decentralized"],
  },
  {
    id: 7,
    ownerId: 7,
    ownerName: "frank.eth",
    name: "DAO Governance",
    description: "A framework for decentralized autonomous organization governance",
    createdAt: new Date().getTime() - 8 * 24 * 60 * 60 * 1000,
    totalContributions: 4,
    totalPointsAwarded: 50,
    tags: ["dao", "governance", "voting"],
  },
  {
    id: 8,
    ownerId: 8,
    ownerName: "grace.eth",
    name: "Cross-Chain Bridge",
    description: "A bridge for transferring assets between different blockchains",
    createdAt: new Date().getTime() - 12 * 24 * 60 * 60 * 1000,
    totalContributions: 6,
    totalPointsAwarded: 75,
    tags: ["bridge", "cross-chain", "interoperability"],
  },
]

// All unique tags from the repos
const allTags = [...new Set(mockRepos.flatMap((repo) => repo.tags))]

export default function RepositoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [repos, setRepos] = useState(mockRepos)
  const [sortBy, setSortBy] = useState("newest")
  const [selectedTags, setSelectedTags] = useState([])

  // Format date
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString()
  }

  // Toggle tag selection
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  // Filter repos based on search term and selected tags
  const filteredRepos = repos.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.ownerName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => repo.tags.includes(tag))

    return matchesSearch && matchesTags
  })

  // Sort repos
  const sortedRepos = [...filteredRepos].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.createdAt - a.createdAt
      case "oldest":
        return a.createdAt - b.createdAt
      case "most-contributions":
        return b.totalContributions - a.totalContributions
      case "most-points":
        return b.totalPointsAwarded - a.totalPointsAwarded
      default:
        return 0
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold">Repositories</h1>
        <Link href="/create-repo">
          <Button>Create Repository</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Search</h3>
              <Input
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Filter by Tags</h3>
                {selectedTags.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => setSelectedTags([])}>
                    Clear
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs ${
                      selectedTags.includes(tag) ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Sort by</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === "newest"}
                    onChange={() => setSortBy("newest")}
                    className="h-4 w-4"
                  />
                  <span>Newest first</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === "oldest"}
                    onChange={() => setSortBy("oldest")}
                    className="h-4 w-4"
                  />
                  <span>Oldest first</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === "most-contributions"}
                    onChange={() => setSortBy("most-contributions")}
                    className="h-4 w-4"
                  />
                  <span>Most contributions</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === "most-points"}
                    onChange={() => setSortBy("most-points")}
                    className="h-4 w-4"
                  />
                  <span>Most points awarded</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Showing {sortedRepos.length} repositories</p>
            <div className="flex items-center gap-2">
              <ArrowUpDown size={16} />
              <span className="text-sm font-medium">
                {sortBy === "newest" && "Newest first"}
                {sortBy === "oldest" && "Oldest first"}
                {sortBy === "most-contributions" && "Most contributions"}
                {sortBy === "most-points" && "Most points awarded"}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {sortedRepos.map((repo) => (
              <Card key={repo.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="hover:text-primary">
                        <Link href={`/repo/${repo.id}`}>{repo.name}</Link>
                      </CardTitle>
                      <CardDescription>by {repo.ownerName}</CardDescription>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <GitFork size={16} />
                        <span>{repo.totalContributions}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={16} />
                        <span>{repo.totalPointsAwarded}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{repo.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted rounded-full text-xs"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Created on {formatDate(repo.createdAt)}</span>
                    <span>{repo.totalContributions} contributions</span>
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

          {sortedRepos.length === 0 && (
            <div className="text-center py-12 border rounded-lg">
              <h3 className="text-lg font-medium mb-2">No repositories found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedTags([])
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

