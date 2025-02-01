import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Users, MessageSquare } from 'lucide-react'

export function QuickActionPanel({ setSelectedSection }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center h-24"
            onClick={() => setSelectedSection("proposals")}
          >
            <FileText className="h-6 w-6 mb-2" />
            <span>View Proposals</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center h-24"
            onClick={() => setSelectedSection("dreps")}
          >
            <Users className="h-6 w-6 mb-2" />
            <span>Browse DReps</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center h-24 col-span-2"
            onClick={() => setSelectedSection("public-forum")}
          >
            <MessageSquare className="h-6 w-6 mb-2" />
            <span>Join Public Forum</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

