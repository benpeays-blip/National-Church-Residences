import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, TrendingUp, DollarSign, Calendar } from "lucide-react";
import Donors from "@/pages/donors";
import AIPredictiveTiming from "@/pages/ai-predictive-timing";
import AIWealthEvents from "@/pages/ai-wealth-events";
import AIMeetingBriefs from "@/pages/ai-meeting-briefs";
import { useMemo } from "react";

type IntelligenceTab = "donors" | "timing" | "wealth" | "briefs";

export default function IntelligenceWithTabs() {
  const [location, setLocation] = useLocation();

  // Derive active tab from URL
  const activeTab = useMemo<IntelligenceTab>(() => {
    const params = new URLSearchParams(window.location.search);
    return (params.get('tab') as IntelligenceTab) || "donors";
  }, [location]);

  // Handle tab changes by updating URL
  const handleTabChange = (newTab: IntelligenceTab) => {
    setLocation(`/intelligence?tab=${newTab}`);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Intelligence</h1>
        <p className="text-sm text-muted-foreground">
          AI-powered donor insights and relationship intelligence
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => handleTabChange(v as IntelligenceTab)}>
        <TabsList className="grid w-full grid-cols-4 gap-1">
          <TabsTrigger value="donors" data-testid="tab-donors">
            <Users className="w-4 h-4 mr-2" />
            Donors
          </TabsTrigger>
          <TabsTrigger value="timing" data-testid="tab-predictive-timing">
            <TrendingUp className="w-4 h-4 mr-2" />
            Predictive Timing
          </TabsTrigger>
          <TabsTrigger value="wealth" data-testid="tab-wealth-events">
            <DollarSign className="w-4 h-4 mr-2" />
            Wealth Events
          </TabsTrigger>
          <TabsTrigger value="briefs" data-testid="tab-meeting-briefs">
            <Calendar className="w-4 h-4 mr-2" />
            Meeting Briefs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="donors" className="space-y-6">
          <Donors />
        </TabsContent>

        <TabsContent value="timing" className="space-y-6">
          <AIPredictiveTiming />
        </TabsContent>

        <TabsContent value="wealth" className="space-y-6">
          <AIWealthEvents />
        </TabsContent>

        <TabsContent value="briefs" className="space-y-6">
          <AIMeetingBriefs />
        </TabsContent>
      </Tabs>
    </div>
  );
}
