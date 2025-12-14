import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Building2, Award, Gift, Users, Package, Landmark, Target } from "lucide-react";
import CorporatePartnershipsPage from "@/pages/corporate-partnerships";
import CorporateSponsorships from "@/pages/corporate-sponsorships";
import CorporateGiving from "@/pages/corporate-giving";
import CorporateVolunteering from "@/pages/corporate-volunteering";
import CorporateInKind from "@/pages/corporate-in-kind";
import CorporateFoundations from "@/pages/corporate-foundations";
import CorporateProspects from "@/pages/corporate-prospects";

const corporationsTabs: SectionTab[] = [
  {
    label: "Overview",
    value: "overview",
    icon: Building2,
    path: "/corporate-partnerships",
  },
  {
    label: "Sponsorships",
    value: "sponsorships",
    icon: Award,
    path: "/corporate-partnerships/sponsorships",
  },
  {
    label: "Corporate Giving",
    value: "giving",
    icon: Gift,
    path: "/corporate-partnerships/giving",
  },
  {
    label: "Volunteering",
    value: "volunteering",
    icon: Users,
    path: "/corporate-partnerships/volunteering",
  },
  {
    label: "In-Kind",
    value: "inkind",
    icon: Package,
    path: "/corporate-partnerships/inkind",
  },
  {
    label: "Foundations",
    value: "foundations",
    icon: Landmark,
    path: "/corporate-partnerships/foundations",
  },
  {
    label: "Prospects",
    value: "prospects",
    icon: Target,
    path: "/corporate-partnerships/prospects",
  },
];

export default function CorporationsWithTabs() {
  const [location] = useLocation();

  // Determine which component to render based on route
  let CorporateComponent = CorporatePartnershipsPage;
  
  if (location === "/corporate-partnerships/sponsorships") {
    CorporateComponent = CorporateSponsorships;
  } else if (location === "/corporate-partnerships/giving") {
    CorporateComponent = CorporateGiving;
  } else if (location === "/corporate-partnerships/volunteering") {
    CorporateComponent = CorporateVolunteering;
  } else if (location === "/corporate-partnerships/inkind") {
    CorporateComponent = CorporateInKind;
  } else if (location === "/corporate-partnerships/foundations") {
    CorporateComponent = CorporateFoundations;
  } else if (location === "/corporate-partnerships/prospects") {
    CorporateComponent = CorporateProspects;
  }

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={corporationsTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        <CorporateComponent />
      </div>
    </div>
  );
}
