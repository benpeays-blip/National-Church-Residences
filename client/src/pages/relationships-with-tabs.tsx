import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Network, Users, UserPlus, Link2, BarChart3, Share2, Zap } from "lucide-react";
import BoardNetworkMapper from "@/pages/board-network-mapper";
import BoardConnections from "@/pages/relationship-board-connections";
import PeerDonors from "@/pages/relationship-peer-donors";
import RelSciMapping from "@/pages/relsci-mapping";
import DnBIntelligence from "@/pages/dnb-intelligence";
import NetworkVisualizationExamples from "@/pages/network-visualization-examples";
import ForceNetworkGraph from "@/pages/force-network-graph";

const relationshipsTabs: SectionTab[] = [
  {
    label: "RelSci Mapping",
    value: "relsci",
    icon: Link2,
    path: "/relationships",
  },
  {
    label: "D&B Intelligence",
    value: "dnb",
    icon: BarChart3,
    path: "/relationships/dnb",
  },
  {
    label: "Board Network Mapper",
    value: "network",
    icon: Network,
    path: "/relationships/network",
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
    label: "Force Graph",
    value: "force",
    icon: Zap,
    path: "/relationships/force",
  },
  {
    label: "Sankey Flow",
    value: "visualization",
    icon: Share2,
    path: "/relationships/visualization",
  },
];

export default function RelationshipsWithTabs() {
  const [location] = useLocation();
  
  // Determine active tab from URL path
  const getActiveTab = (): string => {
    if (location.includes('/relationships/dnb')) return 'dnb';
    if (location.includes('/relationships/network')) return 'network';
    if (location.includes('/relationships/connections')) return 'connections';
    if (location.includes('/relationships/peer')) return 'peer';
    if (location.includes('/relationships/force')) return 'force';
    if (location.includes('/relationships/visualization')) return 'visualization';
    return 'relsci';
  };
  
  const activeTab = getActiveTab();

  // Determine which component to render
  let RelationshipComponent: React.ComponentType = RelSciMapping;
  
  if (activeTab === 'dnb') {
    RelationshipComponent = DnBIntelligence;
  } else if (activeTab === 'network') {
    RelationshipComponent = BoardNetworkMapper;
  } else if (activeTab === 'connections') {
    RelationshipComponent = BoardConnections;
  } else if (activeTab === 'peer') {
    RelationshipComponent = PeerDonors;
  } else if (activeTab === 'force') {
    RelationshipComponent = ForceNetworkGraph;
  } else if (activeTab === 'visualization') {
    RelationshipComponent = NetworkVisualizationExamples;
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
