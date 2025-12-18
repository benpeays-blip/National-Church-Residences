import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { LayoutDashboard, Target } from "lucide-react";
import DashboardMGO from "@/pages/dashboard-mgo";
import PipelineWithTabs from "@/pages/pipeline-with-tabs";

const dashboardTabs: SectionTab[] = [
  {
    label: "Overview",
    value: "overview",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    label: "Pipeline",
    value: "pipeline",
    icon: Target,
    path: "/pipeline",
  },
];

export default function DashboardHomeWithTabs() {
  const [location] = useLocation();

  // Determine which component to render based on location
  let DashboardComponent = DashboardMGO;
  if (location.startsWith("/pipeline")) {
    DashboardComponent = PipelineWithTabs;
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
