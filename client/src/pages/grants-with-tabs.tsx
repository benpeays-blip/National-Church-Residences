import { useLocation, Redirect } from "wouter";
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
    path: "/grants/research",
  },
  {
    label: "Submitted",
    value: "submitted",
    icon: Send,
    path: "/grants/submitted",
  },
  {
    label: "Awarded",
    value: "awarded",
    icon: Award,
    path: "/grants/awarded",
  },
];

export default function GrantsWithTabs() {
  const [location] = useLocation();

  // Map location to stageFilter for Grants component
  const getStageFilter = (): string | undefined => {
    if (location === '/grants/research') return 'Research';
    if (location === '/grants/submitted') return 'Submitted';
    if (location === '/grants/awarded') return 'Awarded';
    return undefined; // Return undefined for '/grants' to show all
  };

  // Determine which component to render based on route
  const renderContent = () => {
    const stageFilter = getStageFilter();
    const key = location.split('/').pop() || 'all';
    return <Grants key={`grants-${key}`} initialStageFilter={stageFilter} />;
  };

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={grantsTabs} currentPath={location} />
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}
