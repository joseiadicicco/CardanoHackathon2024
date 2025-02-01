import { Home, FileText, Users, Globe } from 'lucide-react'
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Overview", icon: Home, section: "overview" },
  { name: "Proposals", icon: FileText, section: "proposals" },
  { name: "DReps", icon: Users, section: "dreps" },
  { name: "Public Forum", icon: Globe, section: "public-forum" },
]

export function Sidebar({ selectedSection, onSelectSection }) {
  return (
    <aside className="w-64 bg-white shadow-md">
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.section}>
              <Button
                variant={selectedSection === item.section ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => onSelectSection(item.section)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

