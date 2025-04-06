"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ethers } from "ethers"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"

import contractAddress from "../../contract_data/PointHub-address.json"
import contractABI from "../../contract_data/PointHub.json"

export default function CreateRepoPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [pointCost, setPointCost] = useState(50)
  const [isCreating, setIsCreating] = useState(false)

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

    if (!account || !contract) {
      alert("Please connect your MetaMask wallet.")
      return
    }

    setIsCreating(true)

    try {
      // Convert strings to bytes and then hash to get uint256 IDs
      const nameBytes = ethers.encodeBytes32String(name)
      const descBytes = ethers.encodeBytes32String(description)
      const nameId = ethers.keccak256(nameBytes)
      const descriptionId = ethers.keccak256(descBytes)

      // Save original strings locally for reference
      localStorage.setItem(`repoString-${nameId}`, name)
      localStorage.setItem(`repoString-${descriptionId}`, description)

      // Send transaction
       const bx = await contract.createUser()
       await bx.wait()
       
      const tx = await contract.createRepo(nameId, descriptionId, pointCost)
      await tx.wait()

      console.log("Repository created successfully.")
      router.push("/dashboard")
    } catch (error) {
      console.error("Error creating repository:", error)
      alert("Transaction failed. See console for details.")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <Card className="w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Create New Repository</CardTitle>
            <CardDescription>Create a new repository to start accepting contributions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Repository Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. My Awesome Project"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your repository..."
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="cost">Point Cost</Label>
                <span className="font-medium">{pointCost} points</span>
              </div>
              <Slider
                id="cost"
                min={10}
                max={100}
                step={5}
                value={[pointCost]}
                onValueChange={(value) => setPointCost(value[0])}
              />
              <p className="text-sm text-muted-foreground">
                Creating a repository costs points. The more points you spend, the more visibility your repository will get.
              </p>
            </div>

            <div className="rounded-lg border p-4 bg-muted/50">
              <h3 className="font-medium mb-2">Summary</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Current Points:</div>
                <div className="font-medium">75</div>
                <div className="text-muted-foreground">Cost:</div>
                <div className="font-medium">-{pointCost}</div>
                <div className="text-muted-foreground">Remaining:</div>
                <div className="font-medium">{75 - pointCost}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
            id="CreateRepo"
              type="submit"
              className="w-full"
              disabled={isCreating || !name || !description || pointCost > 75}
            >
              {isCreating ? "Creating Repository..." : "Create Repository"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
