"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Overview } from "@/components/overview"
import { Proposals } from "@/components/proposals"
import { DRepList } from "@/components/drep-list"
import { PublicForum } from "@/components/public-forum"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Wallet } from 'lucide-react'

export default function Dashboard() {
  const [selectedSection, setSelectedSection] = useState("overview")
  const [delegatedDRep, setDelegatedDRep] = useState(null)
  const [selectedDRep, setSelectedDRep] = useState(null);
  const [votingStatus, setVotingStatus] = useState("undelegated") // "undelegated" | "delegated" | "abstained" | "drep"

  const handleDelegation = (drep) => {
    setDelegatedDRep(drep)
    setVotingStatus("delegated")
  }

  const handleUndelegation = () => {
    setDelegatedDRep(null)
    setVotingStatus("undelegated")
  }

  const handleAbstain = () => {
    setDelegatedDRep(null)
    setVotingStatus("abstained")
  }

  const handleDRepRegistration = () => {
    setVotingStatus("drep")
  }

  const handleDRepSelection = (drep) => {
    setSelectedDRep(drep);
    setVotingStatus("delegated");
    setSelectedSection("overview");
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar selectedSection={selectedSection} onSelectSection={setSelectedSection} />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b">
          <h1 className="text-2xl font-bold">Cardano Governance Dashboard</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" className="flex items-center gap-2">
              <Wallet className="h-[1.2rem] w-[1.2rem]" />
              <span>Log in</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {selectedSection === "overview" && (
            <Overview 
              setSelectedSection={setSelectedSection}
              delegatedDRep={selectedDRep}
              votingStatus={votingStatus}
              onAbstain={handleAbstain}
              onDRepRegistration={handleDRepRegistration}
              onDRepSelect={handleDRepSelection}
            />
          )}
          {selectedSection === "proposals" && <Proposals />}
          {selectedSection === "dreps" && (
            <DRepList 
              delegatedDRep={selectedDRep}
              onDelegate={handleDRepSelection}
              onUndelegate={handleUndelegation}
            />
          )}
          {selectedSection === "public-forum" && <PublicForum />}
        </main>
      </div>
    </div>
  )
}

