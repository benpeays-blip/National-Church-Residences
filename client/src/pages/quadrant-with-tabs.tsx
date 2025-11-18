import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid3x3, List } from "lucide-react";
import DonorQuadrant from "@/pages/donor-quadrant";
import Pipeline from "@/pages/pipeline";
import { useMemo } from "react";

type QuadrantTab = "quadrant" | "pipeline";

export default function QuadrantWithTabs() {
  const [location, setLocation] = useLocation();

  // Derive active tab from URL
  const activeTab = useMemo<QuadrantTab>(() => {
    const params = new URLSearchParams(window.location.search);
    return (params.get('tab') as QuadrantTab) || "quadrant";
  }, [location]);

  // Handle tab changes by updating URL
  const handleTabChange = (newTab: QuadrantTab) => {
    setLocation(`/quadrant?tab=${newTab}`);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Quadrant</h1>
        <p className="text-sm text-muted-foreground">
          Donor relationship mapping and pipeline management
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => handleTabChange(v as QuadrantTab)}>
        <TabsList className="grid w-full grid-cols-2 gap-1">
          <TabsTrigger value="quadrant" data-testid="tab-donor-quadrant">
            <Grid3x3 className="w-4 h-4 mr-2" />
            Donor Quadrant
          </TabsTrigger>
          <TabsTrigger value="pipeline" data-testid="tab-pipeline-view">
            <List className="w-4 h-4 mr-2" />
            Pipeline View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quadrant" className="space-y-6">
          <DonorQuadrant />
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-6">
          <Pipeline />
        </TabsContent>
      </Tabs>
    </div>
  );
}
