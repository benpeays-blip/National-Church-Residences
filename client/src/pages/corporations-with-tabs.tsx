import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Building2, Trophy, DollarSign, Users, Package, Landmark, Target } from "lucide-react";
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
    icon: Trophy,
    path: "/corporate-partnerships/sponsorships",
  },
  {
    label: "Corporate Giving",
    value: "giving",
    icon: DollarSign,
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
  
  // Determine active tab from URL path
  const getActiveTab = (): string => {
    if (location.includes('/corporate-partnerships/sponsorships')) return 'sponsorships';
    if (location.includes('/corporate-partnerships/giving')) return 'giving';
    if (location.includes('/corporate-partnerships/volunteering')) return 'volunteering';
    if (location.includes('/corporate-partnerships/inkind')) return 'inkind';
    if (location.includes('/corporate-partnerships/foundations')) return 'foundations';
    if (location.includes('/corporate-partnerships/prospects')) return 'prospects';
    return 'overview';
  };
  
  const activeTab = getActiveTab();

  // Determine which component to render
  let TabComponent: React.ComponentType = CorporatePartnershipsPage;
  
  if (activeTab === 'sponsorships') {
    TabComponent = CorporateSponsorships;
  } else if (activeTab === 'giving') {
    TabComponent = CorporateGiving;
  } else if (activeTab === 'volunteering') {
    TabComponent = CorporateVolunteering;
  } else if (activeTab === 'inkind') {
    TabComponent = CorporateInKind;
  } else if (activeTab === 'foundations') {
    TabComponent = CorporateFoundations;
  } else if (activeTab === 'prospects') {
    TabComponent = CorporateProspects;
  }

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={corporationsTabs} currentPath={location} />
      <div className="flex-1 overflow-auto">
        <TabComponent />
      </div>
    </div>
  );
}
