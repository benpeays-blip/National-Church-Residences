import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  Users,
  Target,
  TrendingUp,
  Gift,
  Calendar,
  Brain,
  Network,
  Sparkles,
  BarChart3,
  Workflow,
  Database,
  Plug,
  Settings,
  FileText,
} from "lucide-react";

const commandItems = [
  {
    group: "Overview",
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard, keywords: ["home", "overview"] },
      { title: "Solutions", url: "/solutions", icon: Sparkles, keywords: ["features", "capabilities"] },
    ],
  },
  {
    group: "Intelligence",
    items: [
      { title: "Donors", url: "/donors", icon: Users, keywords: ["constituents", "contacts"] },
      { title: "Predictive Timing", url: "/ai/predictive-timing", icon: Brain, keywords: ["ai", "prediction"] },
      { title: "Wealth Events", url: "/ai/wealth-events", icon: TrendingUp, keywords: ["ai", "wealth", "monitoring"] },
      { title: "Meeting Briefs", url: "/ai/meeting-briefs", icon: FileText, keywords: ["ai", "prep"] },
    ],
  },
  {
    group: "Operations",
    items: [
      { title: "Pipeline", url: "/pipeline", icon: Target, keywords: ["opportunities", "prospects"] },
      { title: "Grants", url: "/grants", icon: FileText, keywords: ["proposals", "funding"] },
      { title: "Gifts", url: "/gifts", icon: Gift, keywords: ["donations", "transactions"] },
      { title: "Campaigns", url: "/campaigns", icon: Calendar, keywords: ["appeals", "events"] },
    ],
  },
  {
    group: "Network",
    items: [
      { title: "Board Network Mapper", url: "/relationship/board-network-mapper", icon: Network, keywords: ["relationships", "graph"] },
      { title: "Board Connections", url: "/relationship/board-connections", icon: Users, keywords: ["board", "relationships"] },
      { title: "Corporate Partnerships", url: "/relationship/corporate-partnerships", icon: Target, keywords: ["corporate", "business"] },
      { title: "Peer Discovery", url: "/relationship/peer-donors", icon: Users, keywords: ["similar", "prospects"] },
    ],
  },
  {
    group: "AI Tools",
    items: [
      { title: "Voice-to-CRM", url: "/ai/voice-notes", icon: Brain, keywords: ["ai", "voice", "transcription"] },
      { title: "Outreach Generator", url: "/content/outreach", icon: Sparkles, keywords: ["ai", "email", "content"] },
      { title: "Grant Proposals", url: "/content/grant-proposals", icon: FileText, keywords: ["ai", "writing"] },
      { title: "Impact Reports", url: "/content/impact-reports", icon: FileText, keywords: ["ai", "reporting"] },
      { title: "Workflow Builder", url: "/workflows", icon: Workflow, keywords: ["automation", "builder"] },
    ],
  },
  {
    group: "Analytics",
    items: [
      { title: "Peer Benchmarks", url: "/analytics/peer-benchmarks", icon: BarChart3, keywords: ["comparison", "metrics"] },
      { title: "Donor Sentiment", url: "/analytics/sentiment", icon: Brain, keywords: ["ai", "analysis"] },
      { title: "Portfolio Optimization", url: "/analytics/portfolio-optimization", icon: Target, keywords: ["optimization", "analysis"] },
    ],
  },
  {
    group: "System",
    items: [
      { title: "Data Health", url: "/data-health", icon: Database, keywords: ["quality", "monitoring"] },
      { title: "Integrations", url: "/integrations", icon: Plug, keywords: ["connections", "apis"] },
      { title: "Settings", url: "/settings", icon: Settings, keywords: ["preferences", "configuration"] },
    ],
  },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (url: string) => {
    setOpen(false);
    setLocation(url);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search FundRazor..." data-testid="command-palette-input" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {commandItems.map((group) => (
          <CommandGroup key={group.group} heading={group.group}>
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <CommandItem
                  key={item.url}
                  onSelect={() => handleSelect(item.url)}
                  keywords={item.keywords}
                  data-testid={`command-item-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
