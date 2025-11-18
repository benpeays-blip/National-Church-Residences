import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { LayoutGrid, Calendar, Clock, CheckCircle2, TrendingUp, Target, BarChart3 } from "lucide-react";
import Campaigns from "@/pages/campaigns";

// Placeholder components for new tabs
function CampaignPerformance() {
  return (
    <div className="p-6 text-center text-muted-foreground">
      <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
      <h3 className="text-lg font-semibold mb-2">Campaign Performance Analytics</h3>
      <p>Performance metrics and analytics will be displayed here</p>
    </div>
  );
}

function CampaignGoals() {
  return (
    <div className="p-6 text-center text-muted-foreground">
      <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
      <h3 className="text-lg font-semibold mb-2">Campaign Goals</h3>
      <p>Goal tracking and progress will be displayed here</p>
    </div>
  );
}

function CampaignTrends() {
  return (
    <div className="p-6 text-center text-muted-foreground">
      <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
      <h3 className="text-lg font-semibold mb-2">Campaign Trends</h3>
      <p>Historical trends and forecasting will be displayed here</p>
    </div>
  );
}

const campaignTabs: SectionTab[] = [
  {
    label: "All Campaigns",
    value: "all",
    icon: LayoutGrid,
    path: "/campaigns",
  },
  {
    label: "Active",
    value: "active",
    icon: Calendar,
    path: "/campaigns?tab=active",
  },
  {
    label: "Planned",
    value: "planned",
    icon: Clock,
    path: "/campaigns?tab=planned",
  },
  {
    label: "Completed",
    value: "completed",
    icon: CheckCircle2,
    path: "/campaigns?tab=completed",
  },
  {
    label: "Performance",
    value: "performance",
    icon: TrendingUp,
    path: "/campaigns?tab=performance",
  },
  {
    label: "Goals",
    value: "goals",
    icon: Target,
    path: "/campaigns?tab=goals",
  },
  {
    label: "Trends",
    value: "trends",
    icon: BarChart3,
    path: "/campaigns?tab=trends",
  },
];

export default function CampaignsWithTabs() {
  const [location] = useLocation();
  
  // Determine active tab from URL
  const params = new URLSearchParams(window.location.search);
  const activeTab = params.get('tab') || 'all';

  // Determine which component to render
  let CampaignComponent = () => <Campaigns />;
  
  if (activeTab === 'active') {
    CampaignComponent = () => <Campaigns filterStatus="active" />;
  } else if (activeTab === 'planned') {
    CampaignComponent = () => <Campaigns filterStatus="planned" />;
  } else if (activeTab === 'completed') {
    CampaignComponent = () => <Campaigns filterStatus="completed" />;
  } else if (activeTab === 'performance') {
    CampaignComponent = CampaignPerformance;
  } else if (activeTab === 'goals') {
    CampaignComponent = CampaignGoals;
  } else if (activeTab === 'trends') {
    CampaignComponent = CampaignTrends;
  }

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={campaignTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        <CampaignComponent />
      </div>
    </div>
  );
}
