import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Loader2 } from 'lucide-react'
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

type DelegationType = "own" | "drep" | "abstain" | "no-confidence"

interface UserSummaryProps {
  delegatedDRep: any
  votingStatus: string
  setSelectedSection: (section: string) => void
  onDRepSelect: () => void
  onOwnDRepCreate: () => void
  userDRepProfile?: any
}

export function UserSummary({ 
  delegatedDRep, 
  votingStatus, 
  setSelectedSection, 
  onDRepSelect,
  onOwnDRepCreate,
  userDRepProfile
}: UserSummaryProps) {
  const [delegationType, setDelegationType] = useState<DelegationType>("abstain")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [pendingDelegationType, setPendingDelegationType] = useState<DelegationType | null>(null)
  const [currentStatus, setCurrentStatus] = useState("undelegated")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delegated":
        return "bg-green-500/10 text-green-700"
      case "self-delegated":
        return "bg-blue-500/10 text-blue-700"
      case "abstained":
        return "bg-yellow-500/10 text-yellow-700"
      case "no-confidence":
        return "bg-red-500/10 text-red-700"
      default:
        return "bg-gray-500/10 text-gray-700"
    }
  }

  const handleDelegationChange = (value: DelegationType) => {
    setPendingDelegationType(value)
    if (value === "drep") {
      setShowConfirmDialog(false)
      setDelegationType(value)
      setCurrentStatus("undelegated")
    } else if (value === "own") {
      setShowConfirmDialog(true)
    } else {
      setShowConfirmDialog(true)
    }
  }

  const handleConfirmDelegation = async () => {
    if (!pendingDelegationType) return

    setIsProcessing(true)
    try {
      // Simulate wallet transaction
      await new Promise(resolve => setTimeout(resolve, 2000))
      setDelegationType(pendingDelegationType)
      
      if (pendingDelegationType === "own") {
        setCurrentStatus("self-delegated")
        onOwnDRepCreate()
      } else {
        setCurrentStatus(pendingDelegationType === "abstain" ? "abstained" : "no-confidence")
      }
    } finally {
      setIsProcessing(false)
      setShowConfirmDialog(false)
      setPendingDelegationType(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Governance Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="font-medium">User123</h3>
              <p className="text-sm text-muted-foreground">Voting Power: 10,000 ADA</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Vote Delegation
              </label>
              <Select value={delegationType} onValueChange={handleDelegationChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select delegation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="own">Own Account</SelectItem>
                  <SelectItem value="drep">Specify DRep ID</SelectItem>
                  <SelectItem value="abstain">Abstain</SelectItem>
                  <SelectItem value="no-confidence">No Confidence</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {delegationType === "drep" && (
              <Button 
                onClick={() => setSelectedSection("dreps")} 
                variant="secondary"
                className="w-full mt-2"
              >
                Browse DRep List
              </Button>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Current Status:</span>
                <Badge variant="secondary" className={getStatusColor(currentStatus)}>
                  {currentStatus}
                </Badge>
              </div>
              <p className="text-sm">
                <span className="font-medium">Proposals Voted:</span> 5
              </p>
            </div>

            {currentStatus === "self-delegated" && userDRepProfile && (
              <Button 
                variant="default" 
                className="w-full"
                onClick={() => onDRepSelect()}
              >
                View Your DRep Profile
              </Button>
            )}
          </div>
        </div>

        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {pendingDelegationType === "own" 
                  ? "Become a DRep" 
                  : "Confirm Delegation Change"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {pendingDelegationType === "own" 
                  ? "You are about to register as a DRep and self-delegate your voting power. This action requires signing a transaction and a minimum stake. Do you want to proceed?"
                  : `You are about to change your voting delegation to "${pendingDelegationType}". This action requires signing a transaction with your wallet. Do you want to proceed?`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleConfirmDelegation}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing...
                  </>
                ) : (
                  "Sign & Confirm"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}

