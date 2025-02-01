"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Shield, Award } from 'lucide-react'

interface UserProfileProps {
  isDRep: boolean;
  user: {
    id: string;
    name: string;
    bio: string;
    avatar: string;
    votingPower: number;
    reputation?: number;
    delegatesCount?: number;
    participationRate?: number;
  };
}

export function UserProfile({ isDRep, user }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user.name,
    bio: user.bio
  })

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle>{user.name}</CardTitle>
              <Badge variant={isDRep ? "default" : "secondary"} className="ml-2">
                {isDRep ? "DRep" : "Delegator"}
              </Badge>
            </div>
            {!isEditing && (
              <p className="text-sm text-muted-foreground mt-1">{user.bio}</p>
            )}
          </div>
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Bio</label>
                <Textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className="mt-1"
                />
              </div>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Voting Power</span>
                        <span className="text-2xl font-bold">
                          {user.votingPower.toLocaleString()} ADA
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {isDRep && (
                  <>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">Reputation</span>
                            <span className="text-2xl font-bold">{user.reputation?.toFixed(1)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">Delegates</span>
                            <span className="text-2xl font-bold">{user.delegatesCount}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

