"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { DRepProfile } from "./drep-profile"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Loader2 } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

interface DRepListProps {
  onSelectDRep: (drep: any) => void;
}

const generateRandomDReps = (count: number) => {
  const names = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Henry", "Ivy", "Jack"];
  const surnames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];

  return Array.from({ length: count }, (_, i) => {
    const nameIndex = Math.floor(Math.random() * names.length);
    const surnameIndex = Math.floor(Math.random() * surnames.length);
    const reputation = (Math.random() * (5 - 3) + 3).toFixed(1);
    const participationRate = Math.floor(Math.random() * (100 - 70) + 70);
    const votingPower = Math.floor(Math.random() * (2000000 - 100000) + 100000);
    const delegatesCount = Math.floor(Math.random() * (2000 - 100) + 100);
    
    return {
      id: i + 1,
      name: `${names[nameIndex]} ${surnames[surnameIndex]}`,
      reputation: parseFloat(reputation),
      participationRate,
      votingPower,
      delegatesCount,
      avatar: `/placeholder.svg?height=100&width=100&text=${names[nameIndex][0]}${surnames[surnameIndex][0]}`,
      bio: `Experienced blockchain enthusiast with a focus on ${["governance", "technology", "economics", "community"][i % 4]}.`,
      proposalsParticipated: Math.floor(Math.random() * 50),
      activeSince: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      discussions: Array(Math.floor(Math.random() * 5 + 1)).fill(null).map((_, index) => ({
        id: index,
        title: `Discussion Topic ${index + 1}`,
        author: `${names[Math.floor(Math.random() * names.length)]}`,
        replies: Math.floor(Math.random() * 50),
      })),
    };
  });
};

export function DRepList({onSelectDRep}: DRepListProps) {
  const [dReps] = useState(generateRandomDReps(20));
  const [selectedDRep, setSelectedDRep] = useState<any>(null);
  const [showDelegateDialog, setShowDelegateDialog] = useState(false);
  const [showUndelegateDialog, setShowUndelegateDialog] = useState(false);
  const [isSigningTx, setIsSigningTx] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [delegationState, setDelegationState] = useState<'none' | 'delegated' | 'abstained'>('none');
  const [delegatedDRep, setDelegatedDRep] = useState<number | null>(null);

  const handleDelegate = async (drepId: number) => {
    setShowDelegateDialog(false);
    setIsSigningTx(true);
    
    try {
      // Simulate wallet transaction signing
      await new Promise(resolve => setTimeout(resolve, 2000));
      const selectedDRep = dReps.find(drep => drep.id === drepId);
      onSelectDRep(selectedDRep);
      setDelegatedDRep(drepId);
      setDelegationState('delegated');
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setIsSigningTx(false);
    }
  };

  const handleUndelegate = async () => {
    setShowUndelegateDialog(false);
    setIsSigningTx(true);
    
    try {
      // Simulate wallet transaction signing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDelegatedDRep(null);
      setDelegationState('abstained');
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setIsSigningTx(false);
    }
  };

  return (
    <div className="space-y-6">
      {delegationState === 'abstained' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-yellow-800">
            You are currently abstaining from voting. Your voting power is not being utilized.
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dReps.map((drep) => (
          <Card 
            key={drep.id} 
            className="hover:shadow-lg transition-shadow flex flex-col"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={drep.avatar} alt={drep.name} />
                <AvatarFallback>{drep.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-sm truncate">{drep.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Reputation: {drep.reputation.toFixed(1)}
                </p>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-sm mb-4 line-clamp-2">{drep.bio}</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-4">
                <div>
                  <span className="block">Participation</span>
                  <span className="font-medium">{drep.participationRate}%</span>
                </div>
                <div>
                  <span className="block">Delegates</span>
                  <span className="font-medium">{drep.delegatesCount}</span>
                </div>
                <div className="col-span-2">
                  <span className="block">Voting Power</span>
                  <span className="font-medium">{drep.votingPower.toLocaleString()} ADA</span>
                </div>
              </div>
              <div className="mt-auto flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setSelectedDRep(drep);
                    setShowProfile(true);
                  }}
                >
                  View Profile
                </Button>
                {delegatedDRep === drep.id ? (
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => {
                      setSelectedDRep(drep);
                      setShowUndelegateDialog(true);
                    }}
                    disabled={isSigningTx}
                  >
                    {isSigningTx ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing...
                      </>
                    ) : (
                      "Undelegate"
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={() => {
                      setSelectedDRep(drep);
                      setShowDelegateDialog(true);
                    }}
                    disabled={isSigningTx || delegationState === 'abstained'}
                  >
                    Delegate
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Profile Dialog */}
      {selectedDRep && (
        <Dialog open={showProfile} onOpenChange={setShowProfile}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DRepProfile
              drep={selectedDRep}
              onClose={() => setShowProfile(false)}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Delegate Dialog */}
      <AlertDialog open={showDelegateDialog} onOpenChange={setShowDelegateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delegation</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to delegate your voting power to {selectedDRep?.name}. This action requires signing a transaction with your wallet. Do you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelegate(selectedDRep?.id)}>
              Confirm Delegation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Undelegate Dialog */}
      <AlertDialog open={showUndelegateDialog} onOpenChange={setShowUndelegateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Undelegation</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to undelegate your voting power from {selectedDRep?.name}. Your voting power will be set to abstain. This action requires signing a transaction with your wallet. Do you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUndelegate}>
              Confirm Undelegation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

