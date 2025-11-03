import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { FundRazorLogo } from "@/components/FundRazorLogo";
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
  Settings as SettingsIcon,
  FileText,
  ClipboardList,
  Layers,
  LayoutGrid,
  Home,
  ChevronDown,
  Building2,
} from "lucide-react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";

const workflowMenuItems = [
  {
    groupLabel: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
      },
      {
        title: "Welcome",
        url: "/welcome",
        icon: Home,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
      },
      {
        title: "National Church Residences",
        url: "/national-church-residences",
        icon: Building2,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
      },
      {
        title: "Solutions",
        url: "/solutions",
        icon: Sparkles,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
      },
      {
        title: "Proposals",
        url: "/proposals",
        icon: ClipboardList,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
      },
      {
        title: "Tech Stack Mapper",
        url: "/tech-stack-mapper",
        icon: Layers,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
      },
      {
        title: "Organization Mapper",
        url: "/organization-mapper",
        icon: Users,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
      },
      {
        title: "Workflow Canvas",
        url: "/organization-workflow-canvas",
        icon: Network,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
      },
      {
        title: "Navigation Preview",
        url: "/navigation-preview",
        icon: LayoutGrid,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
      },
      {
        title: "Navigation Mockups",
        url: "/navigation-mockups",
        icon: Sparkles,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
      },
      {
        title: "Icon Style Guide",
        url: "/icon-style-guide",
        icon: Sparkles,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
      },
    ],
  },
  {
    groupLabel: "Intelligence",
    items: [
      {
        title: "Donors",
        url: "/donors",
        icon: Users,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
      },
      {
        title: "Predictive Timing",
        url: "/ai/predictive-timing",
        icon: Brain,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO"],
      },
      {
        title: "Wealth Events",
        url: "/ai/wealth-events",
        icon: TrendingUp,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO"],
      },
      {
        title: "Meeting Briefs",
        url: "/ai/meeting-briefs",
        icon: FileText,
        roles: ["ADMIN", "DEV_DIRECTOR", "MGO"],
      },
    ],
  },
  {
    groupLabel: "Operations",
    items: [
      {
        title: "Pipeline",
        url: "/pipeline",
        icon: Target,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO"],
      },
      {
        title: "Grants",
        url: "/grants",
        icon: FileText,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "DATA_OPS"],
      },
      {
        title: "Gifts",
        url: "/gifts",
        icon: Gift,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
      },
      {
        title: "Campaigns",
        url: "/campaigns",
        icon: Calendar,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO"],
      },
    ],
  },
  {
    groupLabel: "Network",
    items: [
      {
        title: "Board Network Mapper",
        url: "/relationship/board-network-mapper",
        icon: Network,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO"],
      },
      {
        title: "Board Connections",
        url: "/relationship/board-connections",
        icon: Users,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO"],
      },
      {
        title: "Corporate Partnerships",
        url: "/relationship/corporate-partnerships",
        icon: Target,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR"],
      },
      {
        title: "Peer Discovery",
        url: "/relationship/peer-donors",
        icon: Users,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO"],
      },
    ],
  },
  {
    groupLabel: "AI Tools",
    items: [
      {
        title: "Voice-to-CRM",
        url: "/ai/voice-notes",
        icon: Brain,
        roles: ["ADMIN", "DEV_DIRECTOR", "MGO"],
      },
      {
        title: "Outreach Generator",
        url: "/content/outreach",
        icon: Sparkles,
        roles: ["ADMIN", "DEV_DIRECTOR", "MGO"],
      },
      {
        title: "Grant Proposals",
        url: "/content/grant-proposals",
        icon: FileText,
        roles: ["ADMIN", "DEV_DIRECTOR"],
      },
      {
        title: "Impact Reports",
        url: "/content/impact-reports",
        icon: FileText,
        roles: ["ADMIN", "DEV_DIRECTOR", "MGO"],
      },
      {
        title: "Workflow Builder",
        url: "/workflows",
        icon: Workflow,
        roles: ["ADMIN", "DEV_DIRECTOR", "DATA_OPS"],
      },
    ],
  },
  {
    groupLabel: "Analytics",
    items: [
      {
        title: "Peer Benchmarks",
        url: "/analytics/peer-benchmarks",
        icon: BarChart3,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR"],
      },
      {
        title: "Donor Sentiment",
        url: "/analytics/sentiment",
        icon: Brain,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO"],
      },
      {
        title: "Portfolio Optimization",
        url: "/analytics/portfolio-optimization",
        icon: Target,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR"],
      },
    ],
  },
  {
    groupLabel: "System",
    items: [
      {
        title: "Data Health",
        url: "/data-health",
        icon: Database,
        roles: ["ADMIN", "DEV_DIRECTOR", "DATA_OPS"],
      },
      {
        title: "Integrations",
        url: "/integrations",
        icon: Plug,
        roles: ["ADMIN", "DEV_DIRECTOR", "DATA_OPS"],
      },
      {
        title: "Settings",
        url: "/settings",
        icon: SettingsIcon,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
      },
    ],
  },
];

export function AppSidebar() {
  const { user } = useAuth();
  
  // Track which sections are open (default all collapsed, persist in localStorage)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    // Try to load from localStorage
    const stored = localStorage.getItem('sidebar-sections-state');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // If parsing fails, use default
      }
    }
    
    // Default: all sections collapsed
    const initial: Record<string, boolean> = {};
    workflowMenuItems.forEach((group) => {
      initial[group.groupLabel] = false;
    });
    return initial;
  });

  const toggleSection = (label: string, isOpen: boolean) => {
    setOpenSections((prev) => {
      const newState = {
        ...prev,
        [label]: isOpen,
      };
      // Persist to localStorage
      localStorage.setItem('sidebar-sections-state', JSON.stringify(newState));
      return newState;
    });
  };

  const filterItems = (items: typeof workflowMenuItems[0]["items"]) =>
    items.filter((item) => !user?.role || item.roles.includes(user.role));

  return (
    <Sidebar collapsible="icon" data-testid="sidebar-main">
      <SidebarHeader 
        className="h-16 flex items-center px-4 border-b"
        style={{
          background: "linear-gradient(135deg, #0A1628 0%, #1A3A5C 100%)",
          borderColor: "#1A3A5C40"
        }}
      >
        <div className="flex flex-col gap-2 w-full">
          <FundRazorLogo width={160} height={46} variant="dark" />
          {user?.role && (
            <Badge variant="secondary" className="text-xs w-fit bg-white/10 text-white border-white/20">
              {user.role.replace("_", " ")}
            </Badge>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {workflowMenuItems.map((group, index) => {
          const visibleItems = filterItems(group.items);
          if (visibleItems.length === 0) return null;
          
          // Default to false if undefined (new sections collapsed by default)
          const isOpen = openSections[group.groupLabel] ?? false;
          
          return (
            <Collapsible.Root
              key={group.groupLabel}
              open={isOpen}
              onOpenChange={(open) => toggleSection(group.groupLabel, open)}
            >
              <SidebarGroup 
                className={index < workflowMenuItems.length - 1 ? "border-b pb-4" : ""}
              >
                <Collapsible.Trigger asChild>
                  <button 
                    className="flex w-full items-center justify-between px-4 py-2 hover:bg-sidebar-accent rounded-md transition-colors cursor-pointer"
                    data-testid={`sidebar-toggle-${group.groupLabel.toLowerCase()}`}
                  >
                    <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground cursor-pointer">
                      {group.groupLabel}
                    </SidebarGroupLabel>
                    <ChevronDown 
                      className={`w-4 h-4 text-muted-foreground transition-transform ${
                        isOpen ? "transform rotate-0" : "transform -rotate-90"
                      }`}
                    />
                  </button>
                </Collapsible.Trigger>
                <Collapsible.Content>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {visibleItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton 
                              asChild 
                              data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              <a href={item.url}>
                                <Icon className="w-4 h-4" />
                                <span>{item.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </Collapsible.Content>
              </SidebarGroup>
            </Collapsible.Root>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
