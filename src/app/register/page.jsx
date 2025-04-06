"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation"

import contractAddress from "../../contract_data/PointHub-address.json"
import contractABI from "../../contract_data/PointHub.json"

export default function RegisterPage() {
  const [isRegistering, setIsRegistering] = useState(false)
  const [account, setAccount] = useState(null)
  const [isRegistered, setIsRegistered] = useState(false)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)

  const router = useRouter()

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

  // const connectWallet = async () => {
  //   const ok = await initializeEthers()
  //   if (!ok) return
  // }

  const checkRegistration = async () => {
    if (!contract || !account) return
    try {
      const userId = await contract.addressToUserId(account)
      setIsRegistered(userId !== 0n)
    } catch (error) {
      console.error("Error checking registration:", error)
    }
  }

  const registerUser = async () => {
    if (!contract || !signer || !account) {
      alert("Connect your wallet first.")
      return
    }

    // Double-check registration status
    await checkRegistration()
    if (isRegistered) {
      alert("You are already registered.")
      router.push("/dashboard")
      return
    }

    // setIsRegistering(true)

    try {
      const tx = await contract.createUser()
      // await tx.wait()
      // router.push("/dashboard")
    } catch (error) {
      console.error("Registration error:", error)
      // Extract revert reason if available
      const reason = error.reason || error.data?.message || error.message
      alert(`Registration failed: ${reason}`)
    } finally {
      setIsRegistering(false)
    }
   }

  // useEffect(() => {
  //   if (account) checkRegistration()
  // }, [account, contract])

  useEffect(() => {
    initializeEthers()
  }, [])

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register on DeCentraHub</CardTitle>
          <CardDescription>
            Connect your wallet and create your profile to start contributing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!account ? (
            <Button onClick={connectWallet} className="w-full">
              Connect Wallet
            </Button>
          ) : (
            <div className="bg-muted p-3 rounded-lg text-center">
              <p className="text-sm">Wallet Connected</p>
              <p className="font-mono text-xs truncate">{account}</p>
              {isRegistered && (
                <p className="text-red-500 text-sm mt-2">
                  This wallet is already registered
                </p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={registerUser}
            className="w-full"
            disabled={!account || isRegistering || isRegistered}
          >
            {isRegistering ? "Creating Profile..." : "Register"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}