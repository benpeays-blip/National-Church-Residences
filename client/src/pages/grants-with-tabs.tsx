import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { LayoutGrid, Search, Send, Award } from "lucide-react";
import Grants from "@/pages/grants";

const grantsTabs: SectionTab[] = [
  {
    label: "All Grants",
    value: "all",
    icon: LayoutGrid,
    path: "/grants",
  },
  {
    label: "Research",
    value: "research",
    icon: Search,
    path: "/grants?tab=research",
  },
  {
    label: "Submitted",
    value: "submitted",
    icon: Send,
    path: "/grants?tab=submitted",
  },
  {
    label: "Awarded",
    value: "awarded",
    icon: Award,
    path: "/grants?tab=awarded",
  },
];

export default function GrantsWithTabs() {
  const [location] = useLocation();
  
  // Determine active tab from URL - parse from location to ensure reactivity
  const params = new URLSearchParams(location.split('?')[1] || '');
  const activeTab = params.get('tab') || 'all';

  // Map activeTab to stageFilter for Grants component
  const getStageFilter = (): string | undefined => {
    if (activeTab === 'research') return 'Research';
    if (activeTab === 'submitted') return 'Submitted';
    if (activeTab === 'awarded') return 'Awarded';
    return undefined; // Return undefined for 'all' to show the dropdown
  };

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={grantsTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        {(activeTab === 'all' || activeTab === 'research' || activeTab === 'submitted' || activeTab === 'awarded') && (
          <Grants key={`grants-${activeTab}`} initialStageFilter={getStageFilter()} />
        )}
      </div>
    </div>
  );
}
