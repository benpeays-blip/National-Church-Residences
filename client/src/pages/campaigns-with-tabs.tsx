import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, Calendar, Clock, CheckCircle2 } from "lucide-react";
import Campaigns from "@/pages/campaigns";
import { useMemo } from "react";

type CampaignTab = "all" | "active" | "planned" | "completed";

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
        <TabsList className="grid w-full grid-cols-4">
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
      </Tabs>
    </div>
  );
}
