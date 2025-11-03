import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { LayoutDashboard, Briefcase, TrendingUp, Users } from "lucide-react";
import DashboardDevDirector from "@/pages/dashboard-dev-director";
import DashboardMGO from "@/pages/dashboard-mgo";
import DashboardCEO from "@/pages/dashboard-ceo";

const dashboardTabs: SectionTab[] = [
  {
    label: "Dev Director",
    value: "dev-director",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    label: "Major Gifts Officer",
    value: "mgo",
    icon: Briefcase,
    path: "/dashboard/mgo",
  },
  {
    label: "CEO",
    value: "ceo",
    icon: TrendingUp,
    path: "/dashboard/ceo",
  },
];

export default function Dashboard() {
  const [location] = useLocation();

  let DashboardComponent = DashboardDevDirector;
  if (location === "/dashboard/mgo") {
    DashboardComponent = DashboardMGO;
  } else if (location === "/dashboard/ceo") {
    DashboardComponent = DashboardCEO;
  }

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={dashboardTabs} currentPath={location} />
      <div className="flex-1 overflow-auto">
        <DashboardComponent />
      </div>
    </div>
  );
}
