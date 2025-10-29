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
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
  },
  {
    title: "Solutions",
    url: "/solutions",
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
  },
  {
    title: "Donors",
    url: "/donors",
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
  },
  {
    title: "Pipeline",
    url: "/pipeline",
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO"],
  },
  {
    title: "Grants",
    url: "/grants",
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "DATA_OPS"],
  },
  {
    title: "Gifts",
    url: "/gifts",
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
  },
  {
    title: "Campaigns",
    url: "/campaigns",
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO"],
  },
  {
    title: "Data Health",
    url: "/data-health",
    roles: ["ADMIN", "DEV_DIRECTOR", "DATA_OPS"],
  },
  {
    title: "Integrations",
    url: "/integrations",
    roles: ["ADMIN", "DEV_DIRECTOR", "DATA_OPS"],
  },
  {
    title: "Settings",
    url: "/settings",
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO", "DATA_OPS"],
  },
];

const aiIntelligenceItems = [
  {
    title: "Predictive Timing",
    url: "/ai/predictive-timing",
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO"],
  },
  {
    title: "Wealth Events",
    url: "/ai/wealth-events",
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO"],
  },
  {
    title: "Meeting Briefs",
    url: "/ai/meeting-briefs",
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO"],
  },
  {
    title: "Voice-to-CRM",
    url: "/ai/voice-notes",
    roles: ["ADMIN", "DEV_DIRECTOR", "MGO"],
  },
];

const relationshipItems = [
  {
    title: "Board Connections",
    url: "/relationship/board-connections",
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR"],
  },
  {
    title: "Corporate Partnerships",
    url: "/relationship/corporate-partnerships",
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR"],
  },
  {
    title: "Peer Discovery",
    url: "/relationship/peer-donors",
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR", "MGO"],
  },
];

const aiContentItems = [
  {
    title: "Outreach Generator",
    url: "/content/outreach",
    roles: ["ADMIN", "DEV_DIRECTOR", "MGO"],
  },
  {
    title: "Grant Proposals",
    url: "/content/grant-proposals",
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR"],
  },
  {
    title: "Impact Reports",
    url: "/content/impact-reports",
    roles: ["ADMIN", "DEV_DIRECTOR"],
  },
];

const analyticsItems = [
  {
    title: "Peer Benchmarks",
    url: "/analytics/peer-benchmarks",
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR"],
  },
  {
    title: "Donor Sentiment",
    url: "/analytics/sentiment",
    roles: ["ADMIN", "DEV_DIRECTOR", "MGO"],
  },
  {
    title: "Portfolio Optimization",
    url: "/analytics/portfolio-optimization",
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR"],
  },
];

const workflowItems = [
  {
    title: "Smart Calendar",
    url: "/workflow/calendar",
    roles: ["ADMIN", "DEV_DIRECTOR", "MGO"],
  },
  {
    title: "Stewardship",
    url: "/workflow/stewardship",
    roles: ["ADMIN", "DEV_DIRECTOR"],
  },
  {
    title: "Task Priorities",
    url: "/workflow/task-priorities",
    roles: ["ADMIN", "DEV_DIRECTOR", "MGO"],
  },
  {
    title: "Gift Registries",
    url: "/workflow/gift-registries",
    roles: ["ADMIN", "DEV_DIRECTOR"],
  },
];

const workflowBuilderItems = [
  {
    title: "Workflow Library",
    url: "/workflows",
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR"],
  },
  {
    title: "Templates",
    url: "/workflows/templates",
    roles: ["ADMIN", "CEO", "DEV_DIRECTOR"],
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
  const visibleWorkflowBuilder = filterItems(workflowBuilderItems);

  const renderMenuGroup = (title: string, items: typeof coreMenuItems) => {
    if (items.length === 0) return null;
    return (
      <SidebarGroup className="border-b border-border pb-4">
        <SidebarGroupLabel className="text-sm text-primary font-medium">{title}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <a href={item.url}>
                    <span>{item.title}</span>
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
        {renderMenuGroup("AI Intelligence", visibleAI)}
        {renderMenuGroup("Relationship Intel", visibleRelationship)}
        {renderMenuGroup("AI Content", visibleContent)}
        {renderMenuGroup("Analytics", visibleAnalytics)}
        {renderMenuGroup("Workflows", visibleWorkflow)}
        {renderMenuGroup("Workflow Builder", visibleWorkflowBuilder)}
      </SidebarContent>
    </Sidebar>
  );
}
