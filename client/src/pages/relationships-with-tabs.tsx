import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Network, Users, UserPlus, Link2, BarChart3 } from "lucide-react";
import BoardNetworkMapper from "@/pages/board-network-mapper";
import BoardConnections from "@/pages/relationship-board-connections";
import PeerDonors from "@/pages/relationship-peer-donors";
import RelSciMapping from "@/pages/relsci-mapping";
import DnBIntelligence from "@/pages/dnb-intelligence";

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
    path: "/relationships/connections",
  },
  {
    label: "Peer Discovery",
    value: "peer",
    icon: UserPlus,
    path: "/relationships/peer",
  },
  {
    label: "RelSci Mapping",
    value: "relsci",
    icon: Link2,
    path: "/relationships/relsci",
  },
  {
    label: "D&B Intelligence",
    value: "dnb",
    icon: BarChart3,
    path: "/relationships/dnb",
  },
];

export default function RelationshipsWithTabs() {
  const [location] = useLocation();
  
  // Determine active tab from URL path
  const getActiveTab = (): string => {
    if (location.includes('/relationships/connections')) return 'connections';
    if (location.includes('/relationships/peer')) return 'peer';
    if (location.includes('/relationships/relsci')) return 'relsci';
    if (location.includes('/relationships/dnb')) return 'dnb';
    return 'network';
  };
  
  const activeTab = getActiveTab();

  // Determine which component to render
  let RelationshipComponent: React.ComponentType = BoardNetworkMapper;
  
  if (activeTab === 'connections') {
    RelationshipComponent = BoardConnections;
  } else if (activeTab === 'peer') {
    RelationshipComponent = PeerDonors;
  } else if (activeTab === 'relsci') {
    RelationshipComponent = RelSciMapping;
  } else if (activeTab === 'dnb') {
    RelationshipComponent = DnBIntelligence;
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
