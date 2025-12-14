import { useLocation, Link } from "wouter";
import NcrAffordableHousing from "@/pages/ncr-affordable-housing";
import NcrIndependentLiving from "@/pages/ncr-independent-living";
import NcrAssistedLiving from "@/pages/ncr-assisted-living";
import NcrMemoryCare from "@/pages/ncr-memory-care";
import NcrCcrc from "@/pages/ncr-ccrc";

interface HousingTab {
  label: string;
  value: string;
  path: string;
  title: string;
  subtitle: string;
}

const seniorHousingTabs: HousingTab[] = [
  {
    label: "Senior Affordable Housing",
    value: "affordable",
    path: "/ncr/senior-housing",
    title: "Senior Affordable Housing",
    subtitle: "For more than 60 years, National Church Residences has been dedicated to one simple mission: helping older adults find a welcoming and affordable place to call home."
  },
  {
    label: "Independent Senior Living",
    value: "independent",
    path: "/ncr/senior-housing/independent",
    title: "Independent Senior Living",
    subtitle: "Active adult communities designed for seniors who want to maintain their independence while enjoying amenities and social activities."
  },
  {
    label: "Assisted Living",
    value: "assisted",
    path: "/ncr/senior-housing/assisted",
    title: "Assisted Living",
    subtitle: "Supportive care communities where residents receive help with daily activities while maintaining dignity and independence."
  },
  {
    label: "Memory Care",
    value: "memory",
    path: "/ncr/senior-housing/memory",
    title: "Memory Care",
    subtitle: "Specialized communities providing compassionate care for seniors living with Alzheimer's disease and other forms of dementia."
  },
  {
    label: "CCRC",
    value: "ccrc",
    path: "/ncr/senior-housing/ccrc",
    title: "Continuing Care Retirement Communities",
    subtitle: "Campus-style communities offering a full continuum of care from independent living through skilled nursing."
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
  const currentTabInfo = seniorHousingTabs.find(t => t.value === activeTab) || seniorHousingTabs[0];

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
      {/* White Tab Bar with Dark Blue Selected Tab */}
      <div className="bg-white px-6 flex items-end border-b-0">
        <div className="flex items-end gap-0">
          {seniorHousingTabs.map((tab) => {
            const isSelected = activeTab === tab.value;
            return (
              <Link key={tab.value} href={tab.path}>
                <button
                  className={`px-5 py-2.5 text-sm font-medium transition-colors rounded-t-md ${
                    isSelected
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  style={isSelected ? { backgroundColor: '#1B3A5A' } : {}}
                  data-testid={`housing-tab-${tab.value}`}
                >
                  {tab.label}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Dark Blue Header Section that blends with selected tab */}
      <div 
        className="px-6 py-6"
        style={{ backgroundColor: '#1B3A5A' }}
      >
        <h1 className="text-3xl font-bold text-white" data-testid="page-title">
          {currentTabInfo.title}
        </h1>
        <p className="text-white/80 mt-2 max-w-3xl">
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
