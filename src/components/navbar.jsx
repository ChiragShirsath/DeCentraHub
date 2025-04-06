"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { ethers } from "ethers"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [account, setAccount] = useState(null)
  const pathname = usePathname()

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected!")
      return
    }

    try {
      // Request account access if needed
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      setAccount(accounts[0])
    } catch (error) {
      console.error("Error connecting to MetaMask:", error)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            DeCentraHub
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/explore"
              className={`hover:text-primary transition-colors ${pathname === "/explore" ? "text-primary font-medium" : ""}`}
            >
              Explore
            </Link>
            <Link
              href="/repositories"
              className={`hover:text-primary transition-colors ${pathname === "/repositories" ? "text-primary font-medium" : ""}`}
            >
              Repositories
            </Link>
            <Link
              href="/contribute"
              className={`hover:text-primary transition-colors ${pathname === "/contribute" ? "text-primary font-medium" : ""}`}
            >
              Contribute
            </Link>
            {account && (
              <Link
                href="/profile"
                className={`hover:text-primary transition-colors ${pathname === "/profile" ? "text-primary font-medium" : ""}`}
              >
                Profile
              </Link>
            )}
          </div>

          <div className="hidden md:block">
            {account ? (
              <div className="flex items-center gap-4">
                <div className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {account.substring(0, 6)}...{account.substring(account.length - 4)}
                </div>
                <Link href="/dashboard">
                  <Button variant="outline">Dashboard</Button>
                </Link>
              </div>
            ) : (
              <Button onClick={connectWallet}>Connect Wallet</Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/explore" className="block py-2 hover:text-primary" onClick={closeMenu}>
              Explore
            </Link>
            <Link href="/repositories" className="block py-2 hover:text-primary" onClick={closeMenu}>
              Repositories
            </Link>
            <Link href="/contribute" className="block py-2 hover:text-primary" onClick={closeMenu}>
              Contribute
            </Link>
            {account && (
              <Link href="/profile" className="block py-2 hover:text-primary" onClick={closeMenu}>
                Profile
              </Link>
            )}
            <div className="pt-2">
              {account ? (
                <div className="space-y-3">
                  <div className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full inline-block">
                    {account.substring(0, 6)}...{account.substring(account.length - 4)}
                  </div>
                  <Link href="/dashboard" onClick={closeMenu}>
                    <Button variant="outline" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button onClick={connectWallet} className="w-full">
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
