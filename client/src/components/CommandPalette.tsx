import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
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
  ClipboardList,
  Layers,
  LayoutGrid,
  Award,
  Activity,
  UserCheck,
  Zap,
  MessageSquare,
  Globe,
  Shield,
} from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: typeof LayoutDashboard;
  path: string;
  group: string;
  keywords?: string[];
}

const commandItems: CommandItem[] = [
  // Dashboards
  {
    id: "dashboard-dev",
    label: "Development Director Dashboard",
    description: "Main fundraising metrics and pipeline",
    icon: LayoutDashboard,
    path: "/",
    group: "Dashboards",
    keywords: ["home", "overview", "metrics"],
  },
  {
    id: "dashboard-ceo",
    label: "CEO Dashboard",
    description: "Executive overview and board reports",
    icon: TrendingUp,
    path: "/dashboard/ceo",
    group: "Dashboards",
    keywords: ["executive", "leadership"],
  },
  {
    id: "dashboard-mgo",
    label: "Major Gifts Officer Dashboard",
    description: "Major gift officer portfolio",
    icon: Target,
    path: "/dashboard/mgo",
    group: "Dashboards",
    keywords: ["portfolio", "major gifts"],
  },

  // Core Pages
  {
    id: "donors",
    label: "Donors",
    description: "View all donors and prospects",
    icon: Users,
    path: "/donors",
    group: "Core",
    keywords: ["people", "contacts", "constituents"],
  },
  {
    id: "pipeline",
    label: "Pipeline",
    description: "Fundraising opportunities and stages",
    icon: Target,
    path: "/pipeline",
    group: "Core",
    keywords: ["opportunities", "deals", "prospects"],
  },
  {
    id: "grants",
    label: "Grants",
    description: "Foundation and corporate grants",
    icon: Award,
    path: "/grants",
    group: "Core",
    keywords: ["foundations", "proposals"],
  },
  {
    id: "gifts",
    label: "Gifts",
    description: "Gift history and transactions",
    icon: Gift,
    path: "/gifts",
    group: "Core",
    keywords: ["donations", "contributions", "transactions"],
  },
  {
    id: "campaigns",
    label: "Campaigns",
    description: "Fundraising campaigns and appeals",
    icon: TrendingUp,
    path: "/campaigns",
    group: "Core",
    keywords: ["appeals", "initiatives"],
  },
  {
    id: "events",
    label: "Events",
    description: "Event planning and attendance",
    icon: Calendar,
    path: "/events",
    group: "Core",
    keywords: ["gatherings", "galas", "meetings"],
  },

  // AI Intelligence
  {
    id: "board-network",
    label: "Board Network Mapping",
    description: "Visualize board connections",
    icon: Network,
    path: "/board-network",
    group: "AI Intelligence",
    keywords: ["relationships", "connections", "graph"],
  },
  {
    id: "wealth-events",
    label: "Wealth Event Monitoring",
    description: "Track major wealth events",
    icon: Activity,
    path: "/wealth-events",
    group: "AI Intelligence",
    keywords: ["ipo", "stock", "windfall"],
  },
  {
    id: "meeting-prep",
    label: "AI Meeting Prep",
    description: "AI-powered meeting briefs",
    icon: Brain,
    path: "/meeting-prep",
    group: "AI Intelligence",
    keywords: ["preparation", "briefing"],
  },
  {
    id: "voice-crm",
    label: "Voice-to-CRM",
    description: "Voice note capture",
    icon: MessageSquare,
    path: "/voice-crm",
    group: "AI Intelligence",
    keywords: ["recording", "notes", "transcription"],
  },
  {
    id: "gift-timing",
    label: "Predictive Gift Timing",
    description: "When to ask for gifts",
    icon: Zap,
    path: "/gift-timing",
    group: "AI Intelligence",
    keywords: ["predictions", "forecasting"],
  },
  {
    id: "peer-discovery",
    label: "Peer Discovery",
    description: "Find similar donors",
    icon: UserCheck,
    path: "/peer-discovery",
    group: "AI Intelligence",
    keywords: ["lookalike", "similar"],
  },
  {
    id: "corporate-intel",
    label: "Corporate Partnership Intelligence",
    description: "Corporate giving insights",
    icon: Globe,
    path: "/corporate-intel",
    group: "AI Intelligence",
    keywords: ["business", "companies"],
  },
  {
    id: "outreach-generator",
    label: "Personalized Outreach Generator",
    description: "AI-generated messages",
    icon: Sparkles,
    path: "/outreach-generator",
    group: "AI Intelligence",
    keywords: ["email", "letters", "communication"],
  },
  {
    id: "grant-writing",
    label: "Automated Grant Writing",
    description: "AI grant proposal assistance",
    icon: FileText,
    path: "/grant-writing",
    group: "AI Intelligence",
    keywords: ["proposals", "applications"],
  },
  {
    id: "impact-reports",
    label: "Impact Report Personalization",
    description: "Custom impact reports",
    icon: BarChart3,
    path: "/impact-reports",
    group: "AI Intelligence",
    keywords: ["reporting", "outcomes"],
  },
  {
    id: "benchmarking",
    label: "Peer Benchmarking",
    description: "Compare with similar orgs",
    icon: TrendingUp,
    path: "/benchmarking",
    group: "AI Intelligence",
    keywords: ["comparison", "metrics"],
  },
  {
    id: "sentiment",
    label: "Donor Sentiment Analysis",
    description: "Analyze donor engagement",
    icon: Brain,
    path: "/sentiment",
    group: "AI Intelligence",
    keywords: ["emotions", "feelings", "satisfaction"],
  },
  {
    id: "portfolio-optimization",
    label: "Portfolio Optimization",
    description: "Optimize MGO assignments",
    icon: Target,
    path: "/portfolio-optimization",
    group: "AI Intelligence",
    keywords: ["allocation", "assignments"],
  },

  // Automation
  {
    id: "smart-calendar",
    label: "AI Smart Calendar",
    description: "Intelligent scheduling",
    icon: Calendar,
    path: "/smart-calendar",
    group: "Automation",
    keywords: ["scheduling", "appointments"],
  },
  {
    id: "stewardship",
    label: "Automated Stewardship",
    description: "Stewardship workflows",
    icon: Shield,
    path: "/stewardship",
    group: "Automation",
    keywords: ["thank you", "acknowledgment"],
  },
  {
    id: "task-prioritization",
    label: "AI Task Prioritization",
    description: "Smart task management",
    icon: Zap,
    path: "/task-prioritization",
    group: "Automation",
    keywords: ["todos", "priorities"],
  },
  {
    id: "gift-registry",
    label: "Charitable Gift Registries",
    description: "Lifecycle event giving",
    icon: Gift,
    path: "/gift-registry",
    group: "Automation",
    keywords: ["weddings", "events", "celebrations"],
  },

  // Analytics
  {
    id: "analytics-pipeline",
    label: "Pipeline Value Analysis",
    description: "Analyze pipeline by stage",
    icon: BarChart3,
    path: "/analytics/pipeline-value",
    group: "Analytics",
    keywords: ["forecast", "value"],
  },
  {
    id: "analytics-forecast",
    label: "90-Day Forecast",
    description: "Revenue projections",
    icon: TrendingUp,
    path: "/analytics/forecast-90-days",
    group: "Analytics",
    keywords: ["predictions", "revenue"],
  },
  {
    id: "analytics-ytd",
    label: "YTD vs Goal",
    description: "Year-to-date progress",
    icon: Target,
    path: "/analytics/ytd-vs-goal",
    group: "Analytics",
    keywords: ["progress", "goals"],
  },
  {
    id: "analytics-lybunt",
    label: "LYBUNT Donor Recovery",
    description: "Last year but not this year",
    icon: Users,
    path: "/analytics/lybunt-donors",
    group: "Analytics",
    keywords: ["reactivation", "lapsed"],
  },
  {
    id: "analytics-sybunt",
    label: "SYBUNT Donor Recovery",
    description: "Some years but not this year",
    icon: Users,
    path: "/analytics/sybunt-donors",
    group: "Analytics",
    keywords: ["reactivation", "lapsed"],
  },

  // Workflows
  {
    id: "workflows",
    label: "Workflow Builder",
    description: "Visual automation workflows",
    icon: Workflow,
    path: "/workflows",
    group: "Workflows",
    keywords: ["automation", "builder"],
  },
  {
    id: "workflow-templates",
    label: "Workflow Templates",
    description: "Pre-built workflow templates",
    icon: Workflow,
    path: "/workflows/templates",
    group: "Workflows",
    keywords: ["templates", "prebuilt"],
  },

  // System
  {
    id: "solutions",
    label: "Solutions",
    description: "AI features and capabilities",
    icon: Sparkles,
    path: "/solutions",
    group: "System",
    keywords: ["features", "ai", "capabilities"],
  },
  {
    id: "proposals",
    label: "Proposals",
    description: "Implementation roadmap and focus areas",
    icon: ClipboardList,
    path: "/proposals",
    group: "System",
    keywords: ["roadmap", "implementation"],
  },
  {
    id: "tech-stack",
    label: "Tech Stack Mapper",
    description: "Integration requirements",
    icon: Layers,
    path: "/tech-stack-mapper",
    group: "System",
    keywords: ["integrations", "platforms"],
  },
  {
    id: "navigation-preview",
    label: "Navigation Preview",
    description: "Navigation design patterns",
    icon: LayoutGrid,
    path: "/navigation-preview",
    group: "System",
    keywords: ["design", "patterns"],
  },
  {
    id: "data-health",
    label: "Data Health",
    description: "System monitoring",
    icon: Database,
    path: "/data-health",
    group: "System",
    keywords: ["monitoring", "status"],
  },
  {
    id: "integrations",
    label: "Integrations",
    description: "Connected systems",
    icon: Plug,
    path: "/integrations",
    group: "System",
    keywords: ["connections", "apis"],
  },
  {
    id: "settings",
    label: "Settings",
    description: "Account and preferences",
    icon: Settings,
    path: "/settings",
    group: "System",
    keywords: ["preferences", "configuration"],
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

  const handleSelect = (path: string) => {
    setOpen(false);
    setLocation(path);
  };

  // Group items by category
  const groupedItems = commandItems.reduce((acc, item) => {
    if (!acc[item.group]) {
      acc[item.group] = [];
    }
    acc[item.group].push(item);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search FundRazor..." data-testid="input-command-search" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {Object.entries(groupedItems).map(([group, items], index) => (
          <div key={group}>
            {index > 0 && <CommandSeparator />}
            <CommandGroup heading={group}>
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <CommandItem
                    key={item.id}
                    value={`${item.label} ${item.description} ${item.keywords?.join(" ") || ""}`}
                    onSelect={() => handleSelect(item.path)}
                    data-testid={`command-item-${item.id}`}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <div className="flex flex-col">
                      <span>{item.label}</span>
                      {item.description && (
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      )}
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
