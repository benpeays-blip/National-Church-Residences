import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Home, Building, Heart, Brain, MapPin } from "lucide-react";
import NcrAffordableHousing from "@/pages/ncr-affordable-housing";
import NcrIndependentLiving from "@/pages/ncr-independent-living";
import NcrAssistedLiving from "@/pages/ncr-assisted-living";
import NcrMemoryCare from "@/pages/ncr-memory-care";
import NcrCcrc from "@/pages/ncr-ccrc";

const seniorHousingTabs: SectionTab[] = [
  {
    label: "Senior Affordable Housing",
    value: "affordable",
    icon: Home,
    path: "/ncr/senior-housing",
  },
  {
    label: "Independent Senior Living",
    value: "independent",
    icon: Building,
    path: "/ncr/senior-housing/independent",
  },
  {
    label: "Assisted Living",
    value: "assisted",
    icon: Heart,
    path: "/ncr/senior-housing/assisted",
  },
  {
    label: "Memory Care",
    value: "memory",
    icon: Brain,
    path: "/ncr/senior-housing/memory",
  },
  {
    label: "Continuing Care Retirement Communities",
    value: "ccrc",
    icon: MapPin,
    path: "/ncr/senior-housing/ccrc",
  },
];

export default function NcrSeniorHousingWithTabs() {
  const [location] = useLocation();
  
  const getActiveTab = (): string => {
    if (location.includes('/ncr/senior-housing/independent')) return 'independent';
    if (location.includes('/ncr/senior-housing/assisted')) return 'assisted';
    if (location.includes('/ncr/senior-housing/memory')) return 'memory';
    if (location.includes('/ncr/senior-housing/ccrc')) return 'ccrc';
    return 'affordable';
  };
  
  const activeTab = getActiveTab();

  let TabComponent: React.ComponentType = NcrAffordableHousing;
  
  if (activeTab === 'independent') {
    TabComponent = NcrIndependentLiving;
  } else if (activeTab === 'assisted') {
    TabComponent = NcrAssistedLiving;
  } else if (activeTab === 'memory') {
    TabComponent = NcrMemoryCare;
  } else if (activeTab === 'ccrc') {
    TabComponent = NcrCcrc;
  }

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={seniorHousingTabs} currentPath={location} />
      <div className="flex-1 overflow-auto">
        <TabComponent />
      </div>
    </div>
  );
}
