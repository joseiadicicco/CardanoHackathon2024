import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DRepDetailsProps {
  drep: {
    name: string;
    avatar: string;
    bio: string;
    votingPower: number;
    recentProposals: number;
  };
}

export function DRepDetails({ drep }: DRepDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Delegated Representative</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={drep.avatar} alt={drep.name} />
            <AvatarFallback>{drep.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{drep.name}</h3>
            <p className="text-sm text-muted-foreground">{drep.bio}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Voting Power</p>
            <p className="text-lg">{drep.votingPower.toLocaleString()} ADA</p>
          </div>
          <div>
            <p className="text-sm font-medium">Recent Proposals</p>
            <p className="text-lg">{drep.recentProposals}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

