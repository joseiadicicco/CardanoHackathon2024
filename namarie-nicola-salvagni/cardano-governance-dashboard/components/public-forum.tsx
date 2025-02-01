"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from 'lucide-react'

const forumTopics = [
{
  id: 1,
  title: "The future of Cardano's scalability",
  author: "Alice Johnson",
  replies: 25,
  lastActivity: "2023-06-15",
  content: "What are your thoughts on Cardano's plans for improving scalability? How do you think it compares to other blockchain solutions?",
},
{
  id: 2,
  title: "Proposal: Increase funding for developer education",
  author: "Bob Smith",
  replies: 18,
  lastActivity: "2023-06-14",
  content: "I believe we should allocate more resources to educating new developers on building with Cardano. What do you think?",
},
{
  id: 3,
  title: "Discussion on the latest governance model changes",
  author: "Carol Davis",
  replies: 32,
  lastActivity: "2023-06-13",
  content: "Let's discuss the pros and cons of the recent changes to Cardano's governance model. How will this affect decision-making in the ecosystem?",
},
]

export function PublicForum() {
  const [newTopic, setNewTopic] = useState({ title: "", content: "" })
  const [showNewTopicDialog, setShowNewTopicDialog] = useState(false)

  const handleNewTopic = () => {
    console.log("New topic:", newTopic)
    setNewTopic({ title: "", content: "" })
    setShowNewTopicDialog(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Public Forum</h2>
        <Dialog open={showNewTopicDialog} onOpenChange={setShowNewTopicDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Topic
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Start a New Discussion</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Topic title"
                value={newTopic.title}
                onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
              />
              <Textarea
                placeholder="Topic content"
                value={newTopic.content}
                onChange={(e) => setNewTopic({ ...newTopic, content: e.target.value })}
                className="min-h-[200px]"
              />
              <Button onClick={handleNewTopic} className="w-full">
                Post Topic
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Discussions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {forumTopics.map((topic) => (
              <li key={topic.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={topic.author} />
                    <AvatarFallback>{topic.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Started by {topic.author} | Last activity: {topic.lastActivity}
                    </p>
                    <p className="text-sm mb-2">{topic.content}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{topic.replies} replies</span>
                      <Button variant="outline" size="sm">View Discussion</Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

