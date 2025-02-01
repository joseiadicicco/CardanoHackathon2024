import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Loader2 } from 'lucide-react'

interface VotingStatusProps {
  status: 'undelegated' | 'delegated' | 'abstained' | 'drep';
  onNavigate: (section: string) => void;
}

export function VotingStatus({ status, onNavigate }: VotingStatusProps) {
const [showAbstainDialog, setShowAbstainDialog] = useState(false);
const [showDRepDialog, setShowDRepDialog] = useState(false);
const [isProcessing, setIsProcessing] = useState(false);

const handleAbstain = async () => {
  setIsProcessing(true);
  try {
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Here you would typically update the global state or call a parent function
  } finally {
    setIsProcessing(false);
    setShowAbstainDialog(false);
  }
};

const handleRegisterAsDRep = async () => {
  setIsProcessing(true);
  try {
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Here you would typically update the global state or call a parent function
  } finally {
    setIsProcessing(false);
    setShowDRepDialog(false);
  }
};

return (
  <Card className="mb-6">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>Your Voting Status</CardTitle>
      <Badge
        variant={
          status === 'delegated'
            ? 'default'
            : status === 'abstained'
            ? 'secondary'
            : status === 'drep'
            ? 'outline'
            : 'destructive'
        }
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    </CardHeader>
    <CardContent>
      <p className="mb-4">
        {status === 'undelegated' && "You are currently not delegating your voting power."}
        {status === 'abstained' && "You have chosen to abstain from voting. Your voting power is not being utilized."}
        {status === 'delegated' && "You have delegated your voting power to a DRep."}
        {status === 'drep' && "You are registered as a Delegated Representative (DRep)."}
      </p>
      <div className="flex gap-2">
        {status === 'undelegated' && (
          <>
            <Button onClick={() => onNavigate("dreps")}>Delegate to a DRep</Button>
            <Button
              variant="outline"
              onClick={() => setShowAbstainDialog(true)}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Abstain"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowDRepDialog(true)}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Register as DRep"
              )}
            </Button>
          </>
        )}
        {status === 'abstained' && (
          <Button onClick={() => onNavigate("dreps")}>Delegate to a DRep</Button>
        )}
        {status === 'delegated' && (
          <Button onClick={() => onNavigate("dreps")}>Manage Delegation</Button>
        )}
        {status === 'drep' && (
          <Button onClick={() => onNavigate("dreps")}>View Your DRep Profile</Button>
        )}
      </div>
    </CardContent>

    <AlertDialog open={showAbstainDialog} onOpenChange={setShowAbstainDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Abstention</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to set your voting status to abstain. This means your voting power will not be utilized in governance decisions. This action requires signing a transaction. Do you want to proceed?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAbstain}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <AlertDialog open={showDRepDialog} onOpenChange={setShowDRepDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Register as DRep</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to register as a Delegated Representative (DRep). This will allow other users to delegate their voting power to you. This action requires signing a transaction and a minimum stake. Do you want to proceed?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRegisterAsDRep}>Register</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </Card>
);
}

