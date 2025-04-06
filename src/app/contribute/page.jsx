"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ethers } from "ethers"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import contractAddress from "../../contract_data/PointHub-address.json"
import contractABI from "../../contract_data/PointHub.json"

export default function ContributePage() {
  const [ownerId, setOwnerId] = useState("")
  const [repoId, setRepoId] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [account, setAccount] = useState(null)
  const [contract, setContract] = useState(null)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)

  const router = useRouter()

  const initializeEthers = async () => {
    if (!window.ethereum) {
      console.error("MetaMask not detected.")
      return
    }

    try {
      const _provider = new ethers.BrowserProvider(window.ethereum)
      const _signer = await _provider.getSigner()
      const _contract = new ethers.Contract(contractAddress.address, contractABI.abi, _signer)

      const accounts = await _provider.send("eth_requestAccounts", [])

      setProvider(_provider)
      setSigner(_signer)
      setContract(_contract)
      setAccount(accounts[0])
    } catch (error) {
      console.error("Error connecting MetaMask:", error)
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      initializeEthers()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!window.ethereum) {
      alert("MetaMask not detected. Please install MetaMask to continue.")
      return
    }

    if (!account || !contract) {
      alert("Please connect your MetaMask wallet.")
      return
    }

    setIsSubmitting(true)

    try {
      const tx = await contract.submitContribution(ownerId, repoId, description)
      await tx.wait()

      console.log("Contribution submitted successfully.")
      router.push("/dashboard")
    } catch (error) {
      console.error("Error submitting contribution:", error)
      alert("Transaction failed. See console for details.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <Card className="w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Contribute to a Repository</CardTitle>
            <CardDescription>Submit a contribution to an existing repository</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="ownerId">Owner ID</Label>
              <Input
                id="ownerId"
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                placeholder="e.g. 3"
                required
              />
              <p className="text-sm text-muted-foreground">The ID of the repository owner</p>
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
              <p className="text-sm text-muted-foreground">The ID of the repository you want to contribute to</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Contribution Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your contribution..."
                required
              />
              <p className="text-sm text-muted-foreground">
                Provide details about what you've contributed to the repository
              </p>
            </div>

            <div className="rounded-lg border p-4 bg-muted/50">
              <h3 className="font-medium mb-2">How it works</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Submit your contribution with the repository details</li>
                <li>The repository owner will review your contribution</li>
                <li>If accepted, you'll receive points as a reward</li>
                <li>Points will be added to your profile on the blockchain</li>
              </ol>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !ownerId || !repoId || !description}
            >
              {isSubmitting ? "Submitting Contribution..." : "Submit Contribution"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
