import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Calendar, BarChart3, Target, TrendingUp } from "lucide-react";
import Campaigns from "@/pages/campaigns";

const campaignTabs: SectionTab[] = [
  {
    label: "Active Campaigns",
    value: "active",
    icon: Calendar,
    path: "/campaigns",
  },
  {
    label: "Performance",
    value: "performance",
    icon: BarChart3,
    path: "/campaigns/performance",
  },
  {
    label: "Goals & Targets",
    value: "goals",
    icon: Target,
    path: "/campaigns/goals",
  },
  {
    label: "Trends",
    value: "trends",
    icon: TrendingUp,
    path: "/campaigns/trends",
  },
];

export default function CampaignsWithTabs() {
  const [location] = useLocation();

  // For now, all tabs show the main Campaigns component
  // In the future, each could have its own filtered/specialized view
  const CampaignComponent = Campaigns;

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={campaignTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        <CampaignComponent />
      </div>
    </div>
  );
}
