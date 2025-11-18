import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Network, Users, Building2, UserPlus } from "lucide-react";
import BoardNetworkMapper from "@/pages/board-network-mapper";
import BoardConnections from "@/pages/relationship-board-connections";
import CorporatePartnerships from "@/pages/relationship-corporate-partnerships";
import { useMemo } from "react";

type RelationshipsTab = "network" | "connections" | "corporate" | "peer";

// Placeholder for Peer Discovery
function PeerDiscovery() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Peer Discovery</h2>
      <p className="text-muted-foreground">Discover peer donors and relationship connections.</p>
    </div>
  );
}

export default function RelationshipsWithTabs() {
  const [location, setLocation] = useLocation();

  // Derive active tab from URL
  const activeTab = useMemo<RelationshipsTab>(() => {
    const params = new URLSearchParams(window.location.search);
    return (params.get('tab') as RelationshipsTab) || "network";
  }, [location]);

  // Handle tab changes by updating URL
  const handleTabChange = (newTab: RelationshipsTab) => {
    setLocation(`/relationships?tab=${newTab}`);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Relationships</h1>
        <p className="text-sm text-muted-foreground">
          Map and leverage donor relationships and connections
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => handleTabChange(v as RelationshipsTab)}>
        <TabsList className="grid w-full grid-cols-4 gap-1">
          <TabsTrigger value="network" data-testid="tab-board-network-mapper">
            <Network className="w-4 h-4 mr-2" />
            Board Network Mapper
          </TabsTrigger>
          <TabsTrigger value="connections" data-testid="tab-board-connections">
            <Users className="w-4 h-4 mr-2" />
            Board Connections
          </TabsTrigger>
          <TabsTrigger value="corporate" data-testid="tab-corporate-partnerships">
            <Building2 className="w-4 h-4 mr-2" />
            Corporate Partnerships
          </TabsTrigger>
          <TabsTrigger value="peer" data-testid="tab-peer-discovery">
            <UserPlus className="w-4 h-4 mr-2" />
            Peer Discovery
          </TabsTrigger>
        </TabsList>

        <TabsContent value="network" className="space-y-6">
          <BoardNetworkMapper />
        </TabsContent>

        <TabsContent value="connections" className="space-y-6">
          <BoardConnections />
        </TabsContent>

        <TabsContent value="corporate" className="space-y-6">
          <CorporatePartnerships />
        </TabsContent>

        <TabsContent value="peer" className="space-y-6">
          <PeerDiscovery />
        </TabsContent>
      </Tabs>
    </div>
  );
}
