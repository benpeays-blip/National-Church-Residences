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

export function AppSidebar() {
  const { user } = useAuth();

  const filterItems = (items: typeof coreMenuItems) =>
    items.filter((item) => !user?.role || item.roles.includes(user.role));

  const visibleCore = filterItems(coreMenuItems);

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
        {renderMenuGroup("Platform", visibleCore)}
      </SidebarContent>
    </Sidebar>
  );
}
