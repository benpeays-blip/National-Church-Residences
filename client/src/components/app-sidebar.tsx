import {
  LayoutDashboard,
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  Database,
  Plug,
  Settings,
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

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
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

export function AppSidebar() {
  const { user } = useAuth();

  const visibleItems = menuItems.filter(
    (item) => !user?.role || item.roles.includes(user.role)
  );

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
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild data-testid={`nav-${item.title.toLowerCase()}`}>
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
