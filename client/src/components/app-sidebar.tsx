import {
  LayoutDashboard,
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  FileText,
  Database,
  Plug,
  Settings,
  Lightbulb,
  Brain,
  Zap,
  Target,
  AlertCircle,
  MessageSquare,
  Mic,
  Network,
  Building2,
  UsersRound,
  Mail,
  FileEdit,
  Heart,
  BarChart3,
  TrendingDown,
  UserCog,
  Clock,
  Sparkles,
  ListChecks,
  Gift,
} from "lucide-react";
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

const coreMenuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
  },
  {
    title: "Solutions",
    url: "/solutions",
    icon: Lightbulb,
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
  },
  {
    title: "Donors",
    url: "/donors",
    icon: Users,
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
  },
  {
    title: "Pipeline",
    url: "/pipeline",
    icon: TrendingUp,
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
    icon: DollarSign,
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
  },
  {
    title: "Campaigns",
    url: "/campaigns",
    icon: Calendar,
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO"],
  },
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
    icon: Settings,
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
  },
];

const aiIntelligenceItems = [
  {
    title: "Predictive Timing",
    url: "/ai/predictive-timing",
    icon: Target,
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO"],
  },
  {
    title: "Wealth Events",
    url: "/ai/wealth-events",
    icon: AlertCircle,
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO"],
  },
  {
    title: "Meeting Briefs",
    url: "/ai/meeting-briefs",
    icon: MessageSquare,
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO"],
  },
  {
    title: "Voice-to-CRM",
    url: "/ai/voice-notes",
    icon: Mic,
    roles: ["ADMIN", "DEV_DIRECTOR", "MGO"],
  },
];

const relationshipItems = [
  {
    title: "Board Connections",
    url: "/relationship/board-connections",
    icon: Network,
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR"],
  },
  {
    title: "Corporate Partnerships",
    url: "/relationship/corporate-partnerships",
    icon: Building2,
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR"],
  },
  {
    title: "Peer Discovery",
    url: "/relationship/peer-donors",
    icon: UsersRound,
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO"],
  },
];

const aiContentItems = [
  {
    title: "Outreach Generator",
    url: "/content/outreach",
    icon: Mail,
    roles: ["ADMIN", "DEV_DIRECTOR", "MGO"],
  },
  {
    title: "Grant Proposals",
    url: "/content/grant-proposals",
    icon: FileEdit,
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR"],
  },
  {
    title: "Impact Reports",
    url: "/content/impact-reports",
    icon: Heart,
    roles: ["ADMIN", "DEV_DIRECTOR"],
  },
];

const analyticsItems = [
  {
    title: "Peer Benchmarks",
    url: "/analytics/peer-benchmarks",
    icon: BarChart3,
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR"],
  },
  {
    title: "Donor Sentiment",
    url: "/analytics/sentiment",
    icon: TrendingDown,
    roles: ["ADMIN", "DEV_DIRECTOR", "MGO"],
  },
  {
    title: "Portfolio Optimization",
    url: "/analytics/portfolio-optimization",
    icon: UserCog,
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR"],
  },
];

const workflowItems = [
  {
    title: "Smart Calendar",
    url: "/workflow/calendar",
    icon: Clock,
    roles: ["ADMIN", "DEV_DIRECTOR", "MGO"],
  },
  {
    title: "Stewardship",
    url: "/workflow/stewardship",
    icon: Sparkles,
    roles: ["ADMIN", "DEV_DIRECTOR"],
  },
  {
    title: "Task Priorities",
    url: "/workflow/task-priorities",
    icon: ListChecks,
    roles: ["ADMIN", "DEV_DIRECTOR", "MGO"],
  },
  {
    title: "Gift Registries",
    url: "/workflow/gift-registries",
    icon: Gift,
    roles: ["ADMIN", "DEV_DIRECTOR"],
  },
];

export function AppSidebar() {
  const { user } = useAuth();

  const filterItems = (items: typeof coreMenuItems) =>
    items.filter((item) => !user?.role || item.roles.includes(user.role));

  const visibleCore = filterItems(coreMenuItems);
  const visibleAI = filterItems(aiIntelligenceItems);
  const visibleRelationship = filterItems(relationshipItems);
  const visibleContent = filterItems(aiContentItems);
  const visibleAnalytics = filterItems(analyticsItems);
  const visibleWorkflow = filterItems(workflowItems);

  const renderMenuGroup = (title: string, items: typeof coreMenuItems) => {
    if (items.length === 0) return null;
    return (
      <SidebarGroup>
        <SidebarGroupLabel>{title}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <a href={item.url} className="flex items-center gap-3">
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm">{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  };

  return (
    <Sidebar data-testid="sidebar-main">
      <SidebarHeader className="h-16 flex items-center px-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">FR</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">FundRazor</span>
            {user?.role && (
              <Badge variant="secondary" className="text-xs w-fit">
                {user.role.replace("_", " ")}
              </Badge>
            )}
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {renderMenuGroup("Core", visibleCore)}
        {renderMenuGroup("🚀 AI Intelligence", visibleAI)}
        {renderMenuGroup("🎯 Relationship Intel", visibleRelationship)}
        {renderMenuGroup("✍️ AI Content", visibleContent)}
        {renderMenuGroup("📊 Analytics", visibleAnalytics)}
        {renderMenuGroup("🤖 Workflows", visibleWorkflow)}
      </SidebarContent>
    </Sidebar>
  );
}
