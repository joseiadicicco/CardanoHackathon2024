import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface DelegateButtonProps {
  drepId: number
  isSelected: boolean
  onDelegate: () => void
}

export function DelegateButton({ drepId, isSelected, onDelegate }: DelegateButtonProps) {
  const [showUndelegateDialog, setShowUndelegateDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isSelected) {
      setShowUndelegateDialog(true)
    } else {
      onDelegate()
    }
  }

  const handleUndelegate = async () => {
    setIsLoading(true)
    // Simulate wallet interaction
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    onDelegate()
    setShowUndelegateDialog(false)
  }

  return (
    <>
      <Button
        variant={isSelected ? "secondary" : "default"}
        size="sm"
        onClick={handleClick}
      >
        {isSelected ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Delegated
          </>
        ) : (
          "Delegate"
        )}
      </Button>
      <AlertDialog open={showUndelegateDialog} onOpenChange={setShowUndelegateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Undelegation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to undelegate? This action requires a wallet transaction to be signed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={handleUndelegate} disabled={isLoading}>
                {isLoading ? "Processing..." : "Confirm"}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

