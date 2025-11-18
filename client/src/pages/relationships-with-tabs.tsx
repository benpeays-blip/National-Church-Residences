import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Network, Users, Building2, UserPlus } from "lucide-react";
import BoardNetworkMapper from "@/pages/board-network-mapper";
import BoardConnections from "@/pages/relationship-board-connections";
import CorporatePartnerships from "@/pages/relationship-corporate-partnerships";

// Placeholder for Peer Discovery
function PeerDiscovery() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Peer Discovery</h2>
      <p className="text-muted-foreground">Discover peer donors and relationship connections.</p>
    </div>
  );
}

const relationshipsTabs: SectionTab[] = [
  {
    label: "Board Network Mapper",
    value: "network",
    icon: Network,
    path: "/relationships",
  },
  {
    label: "Board Connections",
    value: "connections",
    icon: Users,
    path: "/relationships?tab=connections",
  },
  {
    label: "Corporate Partnerships",
    value: "corporate",
    icon: Building2,
    path: "/relationships?tab=corporate",
  },
  {
    label: "Peer Discovery",
    value: "peer",
    icon: UserPlus,
    path: "/relationships?tab=peer",
  },
];

export default function RelationshipsWithTabs() {
  const [location] = useLocation();
  
  // Determine active tab from URL
  const params = new URLSearchParams(window.location.search);
  const activeTab = params.get('tab') || 'network';

  // Determine which component to render
  let RelationshipComponent = BoardNetworkMapper;
  
  if (activeTab === 'connections') {
    RelationshipComponent = BoardConnections;
  } else if (activeTab === 'corporate') {
    RelationshipComponent = CorporatePartnerships;
  } else if (activeTab === 'peer') {
    RelationshipComponent = PeerDiscovery;
  }

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={relationshipsTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        <RelationshipComponent />
      </div>
    </div>
  );
}
