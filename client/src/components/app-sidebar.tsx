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
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import ncrLogo from "@assets/ncr-logo-horizontal.png";
import { Link } from "wouter";
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
        title: "Integrations 2",
        url: "/integrations-2",
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
  {
    groupLabel: "Design Ideas",
    items: [
      {
        title: "Icon Style Guide",
        url: "/icon-style-guide",
        icon: Sparkles,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
      },
      {
        title: "Navigation Mockups",
        url: "/navigation-mockups",
        icon: LayoutGrid,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
      },
      {
        title: "Navigation Preview",
        url: "/navigation-preview",
        icon: Network,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
      },
    ],
  },
  {
    groupLabel: "Other",
    items: [
      {
        title: "Pipeline",
        url: "/pipeline",
        icon: Target,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO"],
      },
      {
        title: "Welcome",
        url: "/welcome",
        icon: Home,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
      },
      {
        title: "Tech Stack Mapper",
        url: "/tech-stack-mapper",
        icon: Layers,
        roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
      },
      {
        title: "National Church Residences",
        url: "/national-church-residences",
        icon: Building2,
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
    ],
  },
];

export function AppSidebar() {
  const { user } = useAuth();
  const { state } = useSidebar();
  
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
        className="h-16 flex items-center px-4 border-b bg-white relative overflow-hidden"
      >
        {state === "expanded" ? (
          <div className="flex flex-col gap-2 w-full pointer-events-none">
            <Link href="/" className="pointer-events-auto w-fit">
              <img 
                src={ncrLogo}
                alt="National Church Residences" 
                className="h-12 w-auto object-contain cursor-pointer hover-elevate active-elevate-2"
                data-testid="img-ncr-logo"
              />
            </Link>
            {user?.role && (
              <Badge variant="secondary" className="text-xs w-fit pointer-events-auto" style={{ color: "#084594" }}>
                {user.role.replace("_", " ")}
              </Badge>
            )}
          </div>
        ) : (
          <Link href="/" className="pointer-events-auto flex items-center justify-center w-full">
            <Building2 
              className="h-6 w-6 cursor-pointer hover-elevate active-elevate-2"
              style={{ color: "#084594" }}
              data-testid="img-ncr-logo-icon"
            />
          </Link>
        )}
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
      <SidebarRail />
    </Sidebar>
  );
}
