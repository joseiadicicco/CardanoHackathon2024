import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProposalCard } from "./proposal-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const generateMockProposals = (count: number) => {
  const categories = ["Economics", "Technology", "Governance", "Community"];
  const statuses = ["open", "closed", "pending"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Proposal ${i + 1}`,
    description: `This is a mock proposal description for Proposal ${i + 1}.`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    startDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    votesFor: Math.floor(Math.random() * 1000),
    votesAgainst: Math.floor(Math.random() * 1000),
    comments: [],
  }));
};

export function Proposals() {
  const [isLoading, setIsLoading] = useState(true);
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [filter, setFilter] = useState({ search: "", status: "all", category: "all" })
  const [showOnlyOpen, setShowOnlyOpen] = useState(false)
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProposals(generateMockProposals(20));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const filteredProposals = useMemo(() => {
    return proposals.filter((proposal) =>
      proposal.title.toLowerCase().includes(filter.search.toLowerCase()) &&
      (filter.status === "all" || proposal.status === filter.status) &&
      (filter.category === "all" || proposal.category === filter.category) &&
      (!showOnlyOpen || proposal.status === "open")
    )
  }, [proposals, filter, showOnlyOpen])

  const handleAddComment = () => {
    if (newComment.trim() && selectedProposal) {
      const updatedProposals = proposals.map(p => 
        p.id === selectedProposal.id 
          ? { ...p, comments: [...p.comments, { id: Date.now(), text: newComment, author: "Current User" }] }
          : p
      );
      setProposals(updatedProposals);
      setNewComment("");
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <Input
          type="search"
          placeholder="Search proposals..."
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        />
        <Select value={filter.status} onValueChange={(value) => setFilter({ ...filter, status: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filter.category} onValueChange={(value) => setFilter({ ...filter, category: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Economics">Economics</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Governance">Governance</SelectItem>
            <SelectItem value="Community">Community</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setShowOnlyOpen(!showOnlyOpen)}>
          {showOnlyOpen ? "Show All" : "Show Only Open"}
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array(9).fill(0).map((_, index) => (
            <Skeleton key={index} className="h-[200px] w-full" />
          ))
        ) : (
          filteredProposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              onClick={() => setSelectedProposal(proposal)}
            />
          ))
        )}
      </div>
      {selectedProposal && (
        <Dialog open={!!selectedProposal} onOpenChange={() => setSelectedProposal(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedProposal.title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">{selectedProposal.description}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Status: {selectedProposal.status}</span>
                <span className="text-sm font-medium">Category: {selectedProposal.category}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                <span>Start: {selectedProposal.startDate}</span>
                <span>End: {selectedProposal.endDate}</span>
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Voting Progress</h4>
                <Progress value={(selectedProposal.votesFor / (selectedProposal.votesFor + selectedProposal.votesAgainst)) * 100} className="h-2" />
                <div className="flex justify-between text-sm mt-1">
                  <span>For: {selectedProposal.votesFor}</span>
                  <span>Against: {selectedProposal.votesAgainst}</span>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Comments</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedProposal.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>{comment.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{comment.author}</p>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-2"
                />
                <Button onClick={handleAddComment}>Add Comment</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

