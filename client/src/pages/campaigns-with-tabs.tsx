import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, Calendar, Clock, CheckCircle2, TrendingUp, Target, BarChart3 } from "lucide-react";
import Campaigns from "@/pages/campaigns";
import { useMemo } from "react";

type CampaignTab = "all" | "active" | "planned" | "completed" | "performance" | "goals" | "trends";

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

export default function CampaignsWithTabs() {
  const [location, setLocation] = useLocation();

  // Derive active tab from URL
  const activeTab = useMemo<CampaignTab>(() => {
    const params = new URLSearchParams(window.location.search);
    return (params.get('tab') as CampaignTab) || "all";
  }, [location]);

  // Handle tab changes by updating URL
  const handleTabChange = (newTab: CampaignTab) => {
    setLocation(`/campaigns?tab=${newTab}`);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <p className="text-sm text-muted-foreground">
          Manage and track all fundraising campaigns
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => handleTabChange(v as CampaignTab)}>
        <TabsList className="grid w-full grid-cols-7 gap-1">
          <TabsTrigger value="all" data-testid="tab-all-campaigns">
            <LayoutGrid className="w-4 h-4 mr-2" />
            All Campaigns
          </TabsTrigger>
          <TabsTrigger value="active" data-testid="tab-active-campaigns">
            <Calendar className="w-4 h-4 mr-2" />
            Active
          </TabsTrigger>
          <TabsTrigger value="planned" data-testid="tab-planned-campaigns">
            <Clock className="w-4 h-4 mr-2" />
            Planned
          </TabsTrigger>
          <TabsTrigger value="completed" data-testid="tab-completed-campaigns">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Completed
          </TabsTrigger>
          <TabsTrigger value="performance" data-testid="tab-performance">
            <TrendingUp className="w-4 h-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="goals" data-testid="tab-goals">
            <Target className="w-4 h-4 mr-2" />
            Goals
          </TabsTrigger>
          <TabsTrigger value="trends" data-testid="tab-trends">
            <BarChart3 className="w-4 h-4 mr-2" />
            Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Campaigns />
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          <Campaigns filterStatus="active" />
        </TabsContent>

        <TabsContent value="planned" className="space-y-6">
          <Campaigns filterStatus="planned" />
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <Campaigns filterStatus="completed" />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <CampaignPerformance />
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <CampaignGoals />
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <CampaignTrends />
        </TabsContent>
      </Tabs>
    </div>
  );
}
