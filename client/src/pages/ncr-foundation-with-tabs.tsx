import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Heart, Gift, Users, TrendingUp, FileText, Building2 } from "lucide-react";
import { getAccentColor } from "@/components/ui/accent-card";
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
        {/* Gradient Wash Header */}
        <div 
          className="relative overflow-hidden rounded-xl -mx-6 -mt-6 mb-6"
          style={{
            background: `linear-gradient(135deg, ${getAccentColor("coral")}15 0%, ${getAccentColor("orange")}10 50%, ${getAccentColor("lime")}05 100%)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
          <div className="relative px-6 py-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("coral")}20` }}>
                <Building2 className="h-6 w-6" style={{ color: getAccentColor("coral") }} />
              </div>
              <h1 className="text-2xl font-bold">Our Foundation</h1>
            </div>
            <p className="text-base text-muted-foreground">
              The National Church Residences Foundation supports our mission to provide affordable housing and services for seniors through philanthropic giving, grants, and community partnerships.
            </p>
          </div>
        </div>
        <TabComponent />
      </div>
    </div>
  );
}
