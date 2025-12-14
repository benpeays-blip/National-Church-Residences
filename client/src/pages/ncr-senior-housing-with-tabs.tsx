import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Home, User, HandHelping, Brain, Building2 } from "lucide-react";
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
    icon: User,
    path: "/ncr/senior-housing/independent",
  },
  {
    label: "Assisted Living",
    value: "assisted",
    icon: HandHelping,
    path: "/ncr/senior-housing/assisted",
  },
  {
    label: "Memory Care",
    value: "memory",
    icon: Brain,
    path: "/ncr/senior-housing/memory",
  },
  {
    label: "CCRC",
    value: "ccrc",
    icon: Building2,
    path: "/ncr/senior-housing/ccrc",
  },
];

export default function NcrSeniorHousingWithTabs() {
  const [location] = useLocation();

  let TabComponent: React.ComponentType = NcrAffordableHousing;
  
  if (location === "/ncr/senior-housing/independent") {
    TabComponent = NcrIndependentLiving;
  } else if (location === "/ncr/senior-housing/assisted") {
    TabComponent = NcrAssistedLiving;
  } else if (location === "/ncr/senior-housing/memory") {
    TabComponent = NcrMemoryCare;
  } else if (location === "/ncr/senior-housing/ccrc") {
    TabComponent = NcrCcrc;
  }

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={seniorHousingTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        <TabComponent />
      </div>
    </div>
  );
}
