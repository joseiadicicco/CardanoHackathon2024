import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const drepData = [
  { id: 1, name: "Alice", reputation: 4.9, participationRate: 98, votingPower: 1000000 },
  { id: 2, name: "Bob", reputation: 4.7, participationRate: 95, votingPower: 800000 },
  { id: 3, name: "Charlie", reputation: 4.5, participationRate: 92, votingPower: 750000 },
  { id: 4, name: "David", reputation: 4.3, participationRate: 90, votingPower: 600000 },
  { id: 5, name: "Eve", reputation: 4.1, participationRate: 88, votingPower: 500000 },
]

export function Leaderboard() {
  const [sortBy, setSortBy] = useState("reputation")
  const [sortOrder, setSortOrder] = useState("desc")

  const sortedDreps = [...drepData].sort((a, b) => {
    if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1
    if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1
    return 0
  })

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("desc")
    }
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>DRep Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("reputation")}>
                  Reputation
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("participationRate")}>
                  Participation Rate
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("votingPower")}>
                  Voting Power (ADA)
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedDreps.map((drep) => (
              <TableRow key={drep.id}>
                <TableCell>{drep.name}</TableCell>
                <TableCell>{drep.reputation.toFixed(1)}</TableCell>
                <TableCell>{drep.participationRate}%</TableCell>
                <TableCell>{drep.votingPower.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

