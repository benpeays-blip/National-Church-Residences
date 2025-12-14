import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Stethoscope, Home, HandHelping, Heart, Cross } from "lucide-react";
import NcrPrimaryCare from "@/pages/ncr-primary-care";
import NcrHomeHealth from "@/pages/ncr-home-health";
import NcrHomeHealthAide from "@/pages/ncr-home-health-aide";
import NcrHospice from "@/pages/ncr-hospice";
import NcrChaplaincy from "@/pages/ncr-chaplaincy";

const careServicesTabs: SectionTab[] = [
  {
    label: "Primary Care",
    value: "primary",
    icon: Stethoscope,
    path: "/ncr/care-services",
  },
  {
    label: "Home Health Care",
    value: "home-health",
    icon: Home,
    path: "/ncr/care-services/home-health",
  },
  {
    label: "Home Health Aide Services",
    value: "aide",
    icon: HandHelping,
    path: "/ncr/care-services/aide",
  },
  {
    label: "Hospice",
    value: "hospice",
    icon: Heart,
    path: "/ncr/care-services/hospice",
  },
  {
    label: "Chaplaincy Services",
    value: "chaplaincy",
    icon: Cross,
    path: "/ncr/care-services/chaplaincy",
  },
];

export default function NcrCareServicesWithTabs() {
  const [location] = useLocation();
  
  const getActiveTab = (): string => {
    if (location.includes('/ncr/care-services/home-health')) return 'home-health';
    if (location.includes('/ncr/care-services/aide')) return 'aide';
    if (location.includes('/ncr/care-services/hospice')) return 'hospice';
    if (location.includes('/ncr/care-services/chaplaincy')) return 'chaplaincy';
    return 'primary';
  };
  
  const activeTab = getActiveTab();

  let TabComponent: React.ComponentType = NcrPrimaryCare;
  
  if (activeTab === 'home-health') {
    TabComponent = NcrHomeHealth;
  } else if (activeTab === 'aide') {
    TabComponent = NcrHomeHealthAide;
  } else if (activeTab === 'hospice') {
    TabComponent = NcrHospice;
  } else if (activeTab === 'chaplaincy') {
    TabComponent = NcrChaplaincy;
  }

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={careServicesTabs} currentPath={location} />
      <div className="flex-1 overflow-auto">
        <TabComponent />
      </div>
    </div>
  );
}
