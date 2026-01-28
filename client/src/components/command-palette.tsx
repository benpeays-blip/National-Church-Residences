import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";
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
  Search,
  Keyboard,
} from "lucide-react";

const accentColors = {
  teal: '#2A9D8F',
  olive: '#6B8E23',
  orange: '#E76F51',
  coral: '#E9967A',
  sky: '#4A90A4',
  lime: '#84a98c',
  navy: '#395174',
  gold: '#e1c47d',
};

interface NavItem {
  id: string;
  label: string;
  description?: string;
  icon: typeof LayoutDashboard;
  path: string;
  group: string;
  keywords?: string[];
}

interface GroupConfig {
  label: string;
  icon: typeof LayoutDashboard;
  color: string;
}

const groupConfigs: Record<string, GroupConfig> = {
  "Dashboards": { label: "Dashboards", icon: LayoutDashboard, color: accentColors.teal },
  "Core": { label: "Core Pages", icon: Target, color: accentColors.navy },
  "AI Intelligence": { label: "AI Intelligence", icon: Sparkles, color: accentColors.orange },
  "Analytics": { label: "Analytics", icon: BarChart3, color: accentColors.olive },
  "Workflows": { label: "Workflows", icon: Workflow, color: accentColors.sky },
  "System": { label: "System", icon: Settings, color: accentColors.coral },
};

const navItems: NavItem[] = [
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

  // AI Intelligence
  {
    id: "board-network",
    label: "Board Network Mapping",
    description: "Visualize board connections",
    icon: Network,
    path: "/relationship/board-network-mapper",
    group: "AI Intelligence",
    keywords: ["relationships", "connections", "graph"],
  },
  {
    id: "wealth-events",
    label: "Wealth Event Monitoring",
    description: "Track major wealth events",
    icon: Activity,
    path: "/ai/wealth-events",
    group: "AI Intelligence",
    keywords: ["ipo", "stock", "windfall"],
  },
  {
    id: "meeting-prep",
    label: "AI Meeting Prep",
    description: "AI-powered meeting briefs",
    icon: Brain,
    path: "/ai/meeting-briefs",
    group: "AI Intelligence",
    keywords: ["preparation", "briefing"],
  },
  {
    id: "voice-crm",
    label: "Voice-to-CRM",
    description: "Voice note capture",
    icon: MessageSquare,
    path: "/ai/voice-notes",
    group: "AI Intelligence",
    keywords: ["recording", "notes", "transcription"],
  },
  {
    id: "gift-timing",
    label: "Predictive Gift Timing",
    description: "When to ask for gifts",
    icon: Zap,
    path: "/ai/predictive-timing",
    group: "AI Intelligence",
    keywords: ["predictions", "forecasting"],
  },
  {
    id: "peer-discovery",
    label: "Peer Discovery",
    description: "Find similar donors",
    icon: UserCheck,
    path: "/relationship/peer-donors",
    group: "AI Intelligence",
    keywords: ["lookalike", "similar"],
  },
  {
    id: "corporate-intel",
    label: "Corporate Partnership Intelligence",
    description: "Corporate giving insights",
    icon: Globe,
    path: "/relationship/corporate-partnerships",
    group: "AI Intelligence",
    keywords: ["business", "companies"],
  },
  {
    id: "outreach-generator",
    label: "Personalized Outreach Generator",
    description: "AI-generated messages",
    icon: Sparkles,
    path: "/content/outreach",
    group: "AI Intelligence",
    keywords: ["email", "letters", "communication"],
  },
  {
    id: "grant-writing",
    label: "Automated Grant Writing",
    description: "AI grant proposal assistance",
    icon: FileText,
    path: "/content/grant-proposals",
    group: "AI Intelligence",
    keywords: ["proposals", "applications"],
  },
  {
    id: "impact-reports",
    label: "Impact Report Personalization",
    description: "Custom impact reports",
    icon: BarChart3,
    path: "/content/impact-reports",
    group: "AI Intelligence",
    keywords: ["reporting", "outcomes"],
  },
  {
    id: "sentiment",
    label: "Donor Sentiment Analysis",
    description: "Analyze donor engagement",
    icon: Brain,
    path: "/analytics/sentiment",
    group: "AI Intelligence",
    keywords: ["emotions", "feelings", "satisfaction"],
  },
  {
    id: "portfolio-optimization",
    label: "Portfolio Optimization",
    description: "Optimize MGO assignments",
    icon: Target,
    path: "/analytics/portfolio-optimization",
    group: "AI Intelligence",
    keywords: ["allocation", "assignments"],
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
  {
    id: "smart-calendar",
    label: "AI Smart Calendar",
    description: "Intelligent scheduling",
    icon: Calendar,
    path: "/workflow/calendar",
    group: "Workflows",
    keywords: ["scheduling", "appointments"],
  },
  {
    id: "stewardship",
    label: "Automated Stewardship",
    description: "Stewardship workflows",
    icon: Shield,
    path: "/workflow/stewardship",
    group: "Workflows",
    keywords: ["thank you", "acknowledgment"],
  },
  {
    id: "task-prioritization",
    label: "AI Task Prioritization",
    description: "Smart task management",
    icon: Zap,
    path: "/workflow/task-priorities",
    group: "Workflows",
    keywords: ["todos", "priorities"],
  },
  {
    id: "gift-registry",
    label: "Charitable Gift Registries",
    description: "Lifecycle event giving",
    icon: Gift,
    path: "/workflow/gift-registries",
    group: "Workflows",
    keywords: ["weddings", "events", "celebrations"],
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
    id: "organization-mapper",
    label: "Organization Mapper",
    description: "Workflow and role visualization",
    icon: Users,
    path: "/organization-mapper",
    group: "System",
    keywords: ["teams", "workflow", "roles", "process"],
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

// Global function to open command palette
export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent('open-command-palette'));
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [, setLocation] = useLocation();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    const handleOpen = () => setOpen(true);

    document.addEventListener("keydown", down);
    window.addEventListener("open-command-palette", handleOpen);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", handleOpen);
    };
  }, []);

  const handleSelect = (path: string) => {
    setOpen(false);
    setSearch("");
    setLocation(path);
  };

  // Group items by category
  const groupedItems = navItems.reduce((acc, item) => {
    if (!acc[item.group]) {
      acc[item.group] = [];
    }
    acc[item.group].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

  const groupOrder = ["Dashboards", "Core", "AI Intelligence", "Analytics", "Workflows", "System"];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 shadow-2xl max-w-2xl">
        <VisuallyHidden>
          <DialogTitle>Search FundRazor</DialogTitle>
        </VisuallyHidden>
        <CommandPrimitive
          className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-popover text-popover-foreground"
        >
          {/* Enhanced Search Header */}
          <div 
            className="flex items-center gap-4 px-5 py-4 border-b"
            style={{ backgroundColor: accentColors.navy }}
          >
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <Search className="w-5 h-5 text-white" />
            </div>
            <CommandPrimitive.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Search pages, features, and actions..."
              className="flex-1 bg-transparent text-white text-base placeholder:text-white/50 outline-none border-none"
              data-testid="input-command-search"
            />
            <div className="flex items-center gap-1.5 text-white/50 text-xs shrink-0">
              <Keyboard className="w-3.5 h-3.5" />
              <span className="font-mono">⌘K</span>
            </div>
          </div>

          {/* Results List */}
          <CommandPrimitive.List className="max-h-[480px] overflow-y-auto p-3">
            <CommandPrimitive.Empty className="py-12 text-center">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: `${accentColors.navy}10` }}
              >
                <Search className="w-6 h-6" style={{ color: accentColors.navy }} />
              </div>
              <p className="text-sm text-muted-foreground">No results found</p>
              <p className="text-xs text-muted-foreground mt-1">Try a different search term</p>
            </CommandPrimitive.Empty>

            {groupOrder.map((group, _groupIndex) => {
              const items = groupedItems[group];
              if (!items || items.length === 0) return null;
              
              const config = groupConfigs[group];
              const GroupIcon = config.icon;

              return (
                <CommandPrimitive.Group key={group} className="mb-4">
                  {/* Category Header */}
                  <div 
                    className="flex items-center gap-2 px-3 py-2 rounded-lg mb-2"
                    style={{ backgroundColor: `${config.color}10` }}
                  >
                    <div 
                      className="w-6 h-6 rounded flex items-center justify-center"
                      style={{ backgroundColor: `${config.color}20` }}
                    >
                      <GroupIcon className="w-3.5 h-3.5" style={{ color: config.color }} />
                    </div>
                    <span 
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: config.color }}
                    >
                      {config.label}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {items.length} items
                    </span>
                  </div>

                  {/* Items Grid */}
                  <div className="grid grid-cols-2 gap-1">
                    {items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <CommandPrimitive.Item
                          key={item.id}
                          value={`${item.label} ${item.description} ${item.keywords?.join(" ") || ""}`}
                          onSelect={() => handleSelect(item.path)}
                          className={cn(
                            "relative flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all",
                            "data-[selected=true]:bg-muted hover:bg-muted/50",
                            "outline-none"
                          )}
                          data-testid={`command-item-${item.id}`}
                        >
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                            style={{ backgroundColor: `${config.color}15` }}
                          >
                            <Icon className="w-4 h-4" style={{ color: config.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium block truncate">{item.label}</span>
                            {item.description && (
                              <span className="text-xs text-muted-foreground block truncate mt-0.5">
                                {item.description}
                              </span>
                            )}
                          </div>
                        </CommandPrimitive.Item>
                      );
                    })}
                  </div>
                </CommandPrimitive.Group>
              );
            })}
          </CommandPrimitive.List>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/30 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">↵</kbd>
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">esc</kbd>
                Close
              </span>
            </div>
            <span style={{ color: accentColors.navy }}>FundRazor</span>
          </div>
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  );
}
