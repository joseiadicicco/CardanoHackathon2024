"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Wallet, TrendingUp, CheckSquare, Vote } from 'lucide-react'
import { ProposalCard } from "./proposal-card"
import { Skeleton } from "@/components/ui/skeleton"
import { UserSummary } from "./user-summary"
import { DRepProfile } from "./drep-profile"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const statsData = {
  totalDReps: 350,
  activeDReps: 250,
  totalPowerDelegated: 125000000,
  uniqueWallets: 45000,
  participationRate: 85,
  resolvedProposals: 78,
  totalVotesCast: 1250000,
}

const recentProposalsData = [
  { id: 1, title: "Increase Stake Pool Operator Rewards", status: "approved", startDate: "2023-06-01", endDate: "2023-06-15", category: "Economics", description: "This proposal aims to increase the rewards for Stake Pool Operators to incentivize more decentralization." },
  { id: 2, title: "Implement New Smart Contract Features", status: "approved", startDate: "2023-05-20", endDate: "2023-06-03", category: "Technology", description: "Enhance Cardano's smart contract functionality to support more complex DApps." },
  { id: 3, title: "Adjust Voting Power Calculation", status: "rejected", startDate: "2023-05-05", endDate: "2023-05-20", category: "Governance", description: "A proposal to adjust how voting power is calculated to ensure fair representation in governance." },
]

export function Overview({ setSelectedSection }) {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentProposals, setRecentProposals] = useState([]);
  const [delegatedDRep, setDelegatedDRep] = useState(null);
  const [votingStatus, setVotingStatus] = useState("undelegated");
  const [userDRepProfile, setUserDRepProfile] = useState(null);
  const [showDRepProfile, setShowDRepProfile] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStats(statsData);
      setRecentProposals(recentProposalsData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleOwnDRepCreate = async () => {
    // Create a new DRep profile for the user
    const newDRepProfile = {
      id: 'user123',
      name: 'User123',
      avatar: '/placeholder.svg?height=100&width=100&text=U1',
      bio: 'Active community member and DRep.',
      votingPower: 10000,
      recentProposals: 0,
      reputation: 5.0,
      participationRate: 100,
      delegatesCount: 1,
      activeSince: new Date().toISOString().split('T')[0],
      discussions: []
    };
    
    setUserDRepProfile(newDRepProfile);
    setDelegatedDRep(newDRepProfile);
    setVotingStatus("self-delegated");
  };

  const handleViewDRepProfile = () => {
    setShowDRepProfile(true);
  };

  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        Welcome to the governance hub for Cardano. Explore, participate, and shape the future of the ecosystem.
      </p>

      <div className="w-full">
        <UserSummary 
          delegatedDRep={delegatedDRep} 
          votingStatus={votingStatus} 
          setSelectedSection={setSelectedSection}
          onDRepSelect={handleViewDRepProfile}
          onOwnDRepCreate={handleOwnDRepCreate}
          userDRepProfile={userDRepProfile}
        />
      </div>

      {/* DRep Profile Dialog */}
      {userDRepProfile && (
        <Dialog open={showDRepProfile} onOpenChange={setShowDRepProfile}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DRepProfile
              drep={userDRepProfile}
              onClose={() => setShowDRepProfile(false)}
            />
          </DialogContent>
        </Dialog>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array(6).fill(0).map((_, index) => (
            <Skeleton key={index} className="h-[100px]" />
          ))
        ) : (
          <>
            <StatCard title="Total DReps" value={stats.totalDReps} icon={Users} />
            <StatCard title="Active DReps" value={stats.activeDReps} icon={Users} />
            <StatCard title="Total Power Delegated" value={`${(stats.totalPowerDelegated / 1000000).toFixed(1)}M ADA`} icon={TrendingUp} />
            <StatCard title="Unique Wallets" value={stats.uniqueWallets.toLocaleString()} icon={Wallet} />
            <StatCard title="Resolved Proposals" value={stats.resolvedProposals} icon={CheckSquare} />
            <StatCard title="Total Votes Cast" value={`${(stats.totalVotesCast / 1000).toFixed(1)}K`} icon={Vote} />
          </>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Governance Resolutions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoading ? (
              Array(3).fill(0).map((_, index) => (
                <Skeleton key={index} className="h-[100px]" />
              ))
            ) : (
              recentProposals.map((proposal) => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              ))
            )}
          </div>
          <div className="mt-4 text-center">
            <Button onClick={() => setSelectedSection("proposals")}>View All Proposals</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ title, value, icon: Icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}

