import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

interface ProposalCardProps {
  proposal: {
    id: number;
    title: string;
    description: string;
    status: string;
    category: string;
    startDate: string;
    endDate: string;
    votesFor: number;
    votesAgainst: number;
  };
  onClick: () => void;
}

export function ProposalCard({ proposal, onClick }: ProposalCardProps) {
  const totalVotes = proposal.votesFor + proposal.votesAgainst;
  const progressPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;

  const getProgressColor = (percentage: number) => {
    if (percentage > 66) return "bg-green-500";
    if (percentage > 33) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="overflow-hidden cursor-pointer" onClick={onClick}>
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
                <div>Category: {proposal.category}</div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Badge
                variant={
                  proposal.status === "open"
                    ? "default"
                    : proposal.status === "closed"
                    ? "secondary"
                    : "outline"
                }
                className="whitespace-nowrap"
              >
                {proposal.status}
              </Badge>
            </div>
          </div>
          <div>
            <div className="text-xs font-medium mb-1">Voting Progress</div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-xs mt-1">
              <span>For: {proposal.votesFor}</span>
              <span>Against: {proposal.votesAgainst}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

