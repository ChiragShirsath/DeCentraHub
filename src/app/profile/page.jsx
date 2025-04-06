"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// 👇 import your deployed address & ABI
import contractAddress from "../../contract_data/PointHub-address.json"
import contractABI from "../../contract_data/PointHub.json"

export default function ProfilePage() {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)
  const [account, setAccount] = useState(null)

  const [userProfile, setUserProfile] = useState({
    registeredAt: 0,
    currentPoints: 100,
    totalPointsEarned: 0,
    createdRepoIds: [],
    contributedRepoIds: [],
  })

  const [pointHistory, setPointHistory] = useState([])

  // 1) initialize ethers + contract
  const initializeEthers = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected!")
      return
    }
    try {
      const _provider = new ethers.BrowserProvider(window.ethereum)
      const _signer = await _provider.getSigner()
      const _contract = new ethers.Contract(
        contractAddress.address,
        contractABI.abi,
        _signer
      )

      setProvider(_provider)
      setSigner(_signer)
      setContract(_contract)

      const accounts = await _provider.send("eth_requestAccounts", [])
      setAccount(accounts[0])
    } catch (error) {
      console.error("Error initializing ethers:", error)
    }
  }

  // 2) fetch on‑chain profile
  const fetchUserProfile = async () => {
    if (!contract || !account) return

    try {
      // call your solidity function
      const userId = await contract.addressToUserId(account)
      const profile = await contract.getUserProfile(account)
      // assuming solidity returns a struct like:
      // (uint id, address user, uint registeredAt, uint currentPoints, uint totalPointsEarned, uint[] createdRepoIds, uint[] contributedRepoIds)
      
      setUserProfile({
       
        registeredAt: profile[0].toNumber() * 1000,       // if on chain is seconds
        currentPoints: profile[1].toNumber(),
        totalPointsEarned: profile[2].toNumber(),
        createdRepoIds: profile[3].map((bn) => bn.toNumber()),
        contributedRepoIds: profile[4].map((bn) => bn.toNumber()),
      })

      // OPTIONAL: if your contract also returns a point‑history array, you can set it here.
      // Otherwise, fetch history from events or another call.
    } catch (err) {
      console.error("Error fetching profile:", err)
    }
  }

  // format timestamp → date string
  const formatDate = (ts) => new Date(ts).toLocaleDateString()

  // sorted history (if you fill it later)
  const sortedPointHistory = [...pointHistory].sort((a, b) => b.timestamp - a.timestamp)

  // on mount: init ethers
  useEffect(() => {
    initializeEthers()
  }, [])

  // when contract & account ready: fetch profile
  useEffect(() => {
    fetchUserProfile()
  }, [contract, account])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">User ID</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{account}</div>
            <p className="text-xs text-muted-foreground mt-1 break-all">
              Registered at: 06/04/2025
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userProfile.currentPoints}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Available for creating repositories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Points Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {userProfile.totalPointsEarned}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Lifetime points from contributions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* …your Tabs & point-history UI, using sortedPointHistory… */}

      <div className="flex justify-center">
        <Link href="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}