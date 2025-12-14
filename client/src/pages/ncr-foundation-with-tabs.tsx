import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Heart, Gift, Users, TrendingUp, FileText } from "lucide-react";
import NcrFoundation from "@/pages/ncr-foundation";
import NcrFoundationDonors from "@/pages/ncr-foundation-donors";
import NcrFoundationGrants from "@/pages/ncr-foundation-grants";
import NcrFoundationEndowment from "@/pages/ncr-foundation-endowment";
import NcrFoundationImpact from "@/pages/ncr-foundation-impact";

const foundationTabs: SectionTab[] = [
  {
    label: "Overview",
    value: "overview",
    icon: Heart,
    path: "/ncr/foundation",
  },
  {
    label: "Donors & Giving",
    value: "donors",
    icon: Gift,
    path: "/ncr/foundation/donors",
  },
  {
    label: "Grants",
    value: "grants",
    icon: FileText,
    path: "/ncr/foundation/grants",
  },
  {
    label: "Endowment",
    value: "endowment",
    icon: TrendingUp,
    path: "/ncr/foundation/endowment",
  },
  {
    label: "Impact Reports",
    value: "impact",
    icon: Users,
    path: "/ncr/foundation/impact",
  },
];

export default function NcrFoundationWithTabs() {
  const [location] = useLocation();

  let TabComponent: React.ComponentType = NcrFoundation;
  
  if (location === "/ncr/foundation/donors") {
    TabComponent = NcrFoundationDonors;
  } else if (location === "/ncr/foundation/grants") {
    TabComponent = NcrFoundationGrants;
  } else if (location === "/ncr/foundation/endowment") {
    TabComponent = NcrFoundationEndowment;
  } else if (location === "/ncr/foundation/impact") {
    TabComponent = NcrFoundationImpact;
  }

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={foundationTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        <TabComponent />
      </div>
    </div>
  );
}
