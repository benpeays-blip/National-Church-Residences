import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, Search, Send, Award } from "lucide-react";
import Grants from "@/pages/grants";
import { useMemo } from "react";

type GrantsTab = "all" | "research" | "submitted" | "awarded";

interface GrantsWithFilterProps {
  filterStage?: string;
}

function GrantsWithFilter({ filterStage }: GrantsWithFilterProps) {
  // For now, pass the filter as a prop - the Grants component will need to be updated to accept this
  return <Grants />;
}

export default function GrantsWithTabs() {
  const [location, setLocation] = useLocation();

  // Derive active tab from URL
  const activeTab = useMemo<GrantsTab>(() => {
    const params = new URLSearchParams(window.location.search);
    return (params.get('tab') as GrantsTab) || "all";
  }, [location]);

  // Handle tab changes by updating URL
  const handleTabChange = (newTab: GrantsTab) => {
    setLocation(`/grants?tab=${newTab}`);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Grants</h1>
        <p className="text-sm text-muted-foreground">
          Track and manage grant applications and awards
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => handleTabChange(v as GrantsTab)}>
        <TabsList className="grid w-full grid-cols-4 gap-1">
          <TabsTrigger value="all" data-testid="tab-all-grants">
            <LayoutGrid className="w-4 h-4 mr-2" />
            All Grants
          </TabsTrigger>
          <TabsTrigger value="research" data-testid="tab-research-grants">
            <Search className="w-4 h-4 mr-2" />
            Research
          </TabsTrigger>
          <TabsTrigger value="submitted" data-testid="tab-submitted-grants">
            <Send className="w-4 h-4 mr-2" />
            Submitted
          </TabsTrigger>
          <TabsTrigger value="awarded" data-testid="tab-awarded-grants">
            <Award className="w-4 h-4 mr-2" />
            Awarded
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <GrantsWithFilter />
        </TabsContent>

        <TabsContent value="research" className="space-y-6">
          <GrantsWithFilter filterStage="Research" />
        </TabsContent>

        <TabsContent value="submitted" className="space-y-6">
          <GrantsWithFilter filterStage="Submitted" />
        </TabsContent>

        <TabsContent value="awarded" className="space-y-6">
          <GrantsWithFilter filterStage="Awarded" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
