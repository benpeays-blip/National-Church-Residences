import { useLocation, Link } from "wouter";
import CorporatePartnershipsPage from "@/pages/corporate-partnerships";
import CorporateSponsorships from "@/pages/corporate-sponsorships";
import CorporateGiving from "@/pages/corporate-giving";
import CorporateVolunteering from "@/pages/corporate-volunteering";
import CorporateInKind from "@/pages/corporate-in-kind";
import CorporateFoundations from "@/pages/corporate-foundations";
import CorporateProspects from "@/pages/corporate-prospects";

interface CorporateTab {
  label: string;
  value: string;
  path: string;
  title: string;
  subtitle: string;
}

const corporationsTabs: CorporateTab[] = [
  {
    label: "Overview",
    value: "overview",
    path: "/corporate-partnerships",
    title: "Corporate Partnerships",
    subtitle: "Manage and track partnerships with corporate sponsors, volunteers, and donors"
  },
  {
    label: "Sponsorships",
    value: "sponsorships",
    path: "/corporate-partnerships/sponsorships",
    title: "Sponsorships",
    subtitle: "Event, program, and naming sponsorship opportunities with corporate partners"
  },
  {
    label: "Corporate Giving",
    value: "giving",
    path: "/corporate-partnerships/giving",
    title: "Corporate Giving",
    subtitle: "Direct corporate donations and matching gift programs"
  },
  {
    label: "Volunteering",
    value: "volunteering",
    path: "/corporate-partnerships/volunteering",
    title: "Volunteering",
    subtitle: "Employee volunteer programs and service days"
  },
  {
    label: "In-Kind",
    value: "inkind",
    path: "/corporate-partnerships/inkind",
    title: "In-Kind Donations",
    subtitle: "Goods and services contributed by corporate partners"
  },
  {
    label: "Foundations",
    value: "foundations",
    path: "/corporate-partnerships/foundations",
    title: "Corporate Foundations",
    subtitle: "Grants from corporate foundation giving programs"
  },
  {
    label: "Prospects",
    value: "prospects",
    path: "/corporate-partnerships/prospects",
    title: "Prospects",
    subtitle: "Pipeline of potential corporate partnership opportunities"
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
  const currentTabInfo = corporationsTabs.find(t => t.value === activeTab) || corporationsTabs[0];

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
      {/* Dark Blue Tab Bar with White Selected Tab */}
      <div 
        className="px-6 flex items-end"
        style={{ backgroundColor: '#1B3A5A' }}
      >
        <div className="flex items-end gap-0">
          {corporationsTabs.map((tab) => {
            const isSelected = activeTab === tab.value;
            return (
              <Link key={tab.value} href={tab.path}>
                <button
                  className={`px-5 py-2.5 text-sm font-medium transition-colors rounded-t-md ${
                    isSelected
                      ? 'bg-white text-[#1B3A5A]'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                  data-testid={`corporate-tab-${tab.value}`}
                >
                  {tab.label}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* White Header Section that blends with selected tab */}
      <div className="px-6 py-6 bg-white border-b">
        <h1 className="text-3xl font-bold" data-testid="page-title">
          {currentTabInfo.title}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          {currentTabInfo.subtitle}
        </p>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        <TabComponent />
      </div>
    </div>
  );
}
