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
import fundRazorLogo from "@assets/fundrazor-logo.png";
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
} from "lucide-react";

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

  const filterItems = (items: typeof workflowMenuItems[0]["items"]) =>
    items.filter((item) => !user?.role || item.roles.includes(user.role));

  return (
    <Sidebar data-testid="sidebar-main">
      <SidebarHeader className="h-16 flex items-center px-4 border-b">
        <div className="flex flex-col gap-2 w-full">
          <img src={fundRazorLogo} alt="FundRazor" className="h-7 w-auto" />
          {user?.role && (
            <Badge variant="secondary" className="text-xs w-fit">
              {user.role.replace("_", " ")}
            </Badge>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {workflowMenuItems.map((group, index) => {
          const visibleItems = filterItems(group.items);
          if (visibleItems.length === 0) return null;
          
          return (
            <SidebarGroup 
              key={group.groupLabel}
              className={index < workflowMenuItems.length - 1 ? "border-b pb-4" : ""}
            >
              <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {group.groupLabel}
              </SidebarGroupLabel>
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
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
