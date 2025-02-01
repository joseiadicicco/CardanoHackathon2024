"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Users, TrendingUp, Vote, X, ChevronLeft, Calendar, Clock, Star } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { DelegateButton } from "./delegate-button"

// Sample data for charts
const votingPowerHistory = [
  { month: 'Jan', power: 500000 },
  { month: 'Feb', power: 550000 },
  { month: 'Mar', power: 600000 },
  { month: 'Apr', power: 750000 },
  { month: 'May', power: 1000000 },
]

const delegatesGrowth = [
  { month: 'Jan', delegates: 800 },
  { month: 'Feb', delegates: 900 },
  { month: 'Mar', delegates: 950 },
  { month: 'Apr', delegates: 1200 },
  { month: 'May', delegates: 1500 },
]

const votingChoices = [
  { name: 'For', value: 60, description: 'Proposals supported' },
  { name: 'Against', value: 30, description: 'Proposals opposed' },
  { name: 'Abstain', value: 10, description: 'No position taken' },
]

const recentProposalsData = [
  { date: '2023-01-15', proposal: 'Increase Stake Pool Rewards', vote: 'for' },
  { date: '2023-02-01', proposal: 'Update Governance Rules', vote: 'against' },
  { date: '2023-03-10', proposal: 'Fund Developer Tools', vote: 'abstain' },
  { date: '2023-04-05', proposal: 'Modify Voting Thresholds', vote: 'for' },
  { date: '2023-05-20', proposal: 'Enhance Network Security', vote: 'for' },
].map((item, index) => ({
  ...item,
  x: index,
  y: item.vote === 'for' ? 3 : item.vote === 'against' ? 2 : 1,
}))

const COLORS = ['#4CAF50', '#F44336', '#FFC107']

const proposalsData = [
  {
    id: 1,
    title: "Increase Stake Pool Operator rewards",
    description: "This proposal aims to increase the rewards for Stake Pool Operators to incentivize more decentralization and improve network security through better distribution of stake across pools.",
    status: "approved",
    category: "Economics",
    startDate: "2023-06-01",
    endDate: "2023-06-15",
    implementationDate: "2023-07-01",
    vote: "for",
    votedAt: "2023-06-05",
    hasDiscussion: true,
    discussionCount: 15,
  },
  {
    id: 2,
    title: "Implement new governance model",
    description: "A new governance model to improve decision-making processes in the Cardano ecosystem.",
    status: "open",
    category: "Governance",
    startDate: "2023-07-01",
    endDate: "2023-07-15",
    vote: null,
    votedAt: null,
    hasDiscussion: true,
    discussionCount: 8,
  },
  {
    id: 3,
    title: "Reduce transaction fees",
    description: "A proposal to reduce transaction fees to make Cardano more accessible for everyday transactions.",
    status: "rejected",
    category: "Economics",
    startDate: "2023-05-01",
    endDate: "2023-05-14",
    vote: "against",
    votedAt: "2023-05-10",
    hasDiscussion: true,
    discussionCount: 22,
  },
  {
    id: 4,
    title: "Expand smart contract capabilities",
    description: "Proposal to enhance Cardano's smart contract functionality to support more complex DApps.",
    status: "approved",
    category: "Technology",
    startDate: "2023-06-10",
    endDate: "2023-06-24",
    implementationDate: "2023-07-15",
    vote: "for",
    votedAt: "2023-06-18",
    hasDiscussion: false,
    discussionCount: 0,
  },
  {
    id: 5,
    title: "Launch Cardano education program",
    description: "Initiative to create a comprehensive education program to increase Cardano adoption and understanding.",
    status: "open",
    category: "Community",
    startDate: "2023-07-05",
    endDate: "2023-07-19",
    vote: null,
    votedAt: null,
    hasDiscussion: true,
    discussionCount: 5,
  },
]

interface DRepProfileProps {
  drep: any;
  onClose: () => void;
  fullScreen?: boolean;
}

export function DRepProfile({ drep, onClose, fullScreen = false }: DRepProfileProps) {
  const [filter, setFilter] = useState({ search: "", status: "all", category: "all" })
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [showRatingDialog, setShowRatingDialog] = useState(false)
  const [newRating, setNewRating] = useState({ stars: 0, comment: "" })
  const [isDelegated, setIsDelegated] = useState(false)

  const handleRatingSubmit = () => {
    console.log("Rating submitted:", newRating)
    setShowRatingDialog(false)
    setNewRating({ stars: 0, comment: "" })
  }

  return (
    <div className={`${fullScreen ? 'fixed inset-0 z-50 bg-background' : ''} overflow-y-auto`}>
      <div className="container mx-auto py-4 px-2 sm:px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ChevronLeft className="h-4 w-4" />
              Back to DReps
            </Button>
            <Avatar className="h-10 w-10">
              <AvatarImage src={drep.avatar} alt={drep.name} />
              <AvatarFallback>{drep.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-bold">{drep.name}</h1>
              <p className="text-sm text-muted-foreground">{drep.bio}</p>
            </div>
          </div>
          {!fullScreen && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* DRep Profile Summary */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Reputation</h3>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="text-2xl font-bold">{drep.reputation.toFixed(1)}</span>
                </div>
                <Progress value={drep.reputation * 20} className="mt-1" />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Voting Power</h3>
                <p className="text-2xl font-bold">{drep.votingPower.toLocaleString()} ADA</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Delegates</h3>
                <p className="text-2xl font-bold">{drep.delegatesCount.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Participation Rate</h3>
                <p className="text-2xl font-bold">{drep.participationRate}%</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Active since: {drep.activeSince}
              </p>
              <div className="flex gap-2">
                <DelegateButton 
                  drepId={drep.id}
                  isSelected={isDelegated}
                  onDelegate={() => setIsDelegated(!isDelegated)}
                />
                <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Rate this DRep</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Rate this DRep</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button
                            key={star}
                            variant="ghost"
                            size="sm"
                            className="p-0"
                            onClick={() => setNewRating({ ...newRating, stars: star })}
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= newRating.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          </Button>
                        ))}
                      </div>
                      <Textarea
                        placeholder="Leave a comment about your experience with this DRep..."
                        value={newRating.comment}
                        onChange={(e) => setNewRating({ ...newRating, comment: e.target.value })}
                        className="h-24"
                      />
                      <Button onClick={handleRatingSubmit} className="w-full">
                        Submit Rating
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="activity" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
          </TabsList>

          <TabsContent value="activity">
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Search proposals..."
                  value={filter.search}
                  onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                  className="flex-grow"
                />
                <Select onValueChange={(value) => setFilter({ ...filter, status: value })}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => setFilter({ ...filter, category: value })}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Economics">Economics</SelectItem>
                    <SelectItem value="Governance">Governance</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Community">Community</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                {proposalsData.filter((proposal) =>
                  proposal.title.toLowerCase().includes(filter.search.toLowerCase()) &&
                  (filter.status === "all" || proposal.status === filter.status) &&
                  (filter.category === "all" || proposal.category === filter.category)
                ).map((proposal) => (
                  <Card key={proposal.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-grow">
                            <h3 className="font-semibold mb-1">{proposal.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {proposal.description}
                            </p>
                            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>Proposal: {proposal.startDate} - {proposal.endDate}</span>
                              </div>
                              {proposal.implementationDate && (
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>Implementation: {proposal.implementationDate}</span>
                                </div>
                              )}
                              <div>Category: {proposal.category}</div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Badge
                              variant={
                                proposal.status === "open"
                                  ? "outline"
                                  : proposal.status === "approved"
                                  ? "success"
                                  : "destructive"
                              }
                              className="whitespace-nowrap"
                            >
                              {proposal.status}
                            </Badge>
                            {proposal.vote ? (
                              <Badge
                                variant={proposal.vote === "for" ? "success" : "destructive"}
                                className="whitespace-nowrap"
                              >
                                Voted: {proposal.vote}
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="whitespace-nowrap">
                                Not voted
                              </Badge>
                            )}
                            {proposal.hasDiscussion && (
                              <Badge variant="secondary" className="whitespace-nowrap">
                                <MessageCircle className="h-3 w-3 mr-1" />
                                {proposal.discussionCount} comments
                              </Badge>
                            )}
                          </div>
                        </div>
                        {proposal.votedAt && (
                          <p className="text-xs text-muted-foreground">
                            Voted on: {proposal.votedAt}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="statistics">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Voting Choices Breakdown</CardTitle>
                  <CardDescription>
                    Distribution of DRep's voting decisions across all participated proposals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={votingChoices}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {votingChoices.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          content={({ payload }) => {
                            if (payload && payload[0]) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-2 rounded shadow border">
                                  <p className="font-medium">{data.name}: {data.value}%</p>
                                  <p className="text-sm text-muted-foreground">{data.description}</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Voting Power Evolution</CardTitle>
                  <CardDescription>
                    Total amount of ADA delegated to this DRep over time, showing community trust growth
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={votingPowerHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${(value as number).toLocaleString()} ADA`} />
                        <Line type="monotone" dataKey="power" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delegates Growth</CardTitle>
                  <CardDescription>
                    Number of unique delegators supporting this DRep, indicating growing representation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={delegatesGrowth}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${value} delegators`} />
                        <Bar dataKey="delegates" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Proposals Timeline</CardTitle>
                  <CardDescription>
                    Visualization of DRep's voting patterns over time (Green: For, Red: Against, Yellow: Abstain)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="x" type="number" name="Time"
                          ticks={[0, 1, 2, 3, 4]}
                          tickFormatter={(value) => recentProposalsData[value]?.date.split('-')[1] || ''} />
                        <YAxis dataKey="y" type="number" name="Vote"
                          ticks={[1, 2, 3]}
                          tickFormatter={(value) => value === 3 ? 'For' : value === 2 ? 'Against' : 'Abstain'} />
                        <Tooltip
                          content={({ payload }) => {
                            if (payload && payload[0]) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-2 rounded shadow border">
                                  <p className="font-medium">{data.proposal}</p>
                                  <p className="text-sm">Date: {data.date}</p>
                                  <p className="text-sm">Vote: {data.vote}</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Scatter
                          data={recentProposalsData}
                          fill={(entry) =>
                            entry.vote === 'for' ? '#4CAF50' :
                              entry.vote === 'against' ? '#F44336' : '#FFC107'
                          }
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="discussions">
            <div className="space-y-2">
              {drep.discussions.map((discussion) => (
                <Card key={discussion.id}>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-semibold">{discussion.title}</h3>
                        <p className="text-xs text-muted-foreground">Started by {discussion.author}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        {discussion.replies} replies
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 text-xs">
                      View Discussion
                    </Button>
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

