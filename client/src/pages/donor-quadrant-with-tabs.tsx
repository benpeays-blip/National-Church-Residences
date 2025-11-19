import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { LayoutGrid, BookOpen, Target, TrendingUp } from "lucide-react";
import DonorQuadrant from "@/pages/donor-quadrant";
import QuadrantThesis from "@/pages/quadrant-thesis";
import QuadrantExplained from "@/pages/quadrant-explained";
import QuadrantStrategies from "@/pages/quadrant-strategies";

const quadrantTabs: SectionTab[] = [
  {
    label: "Quadrant",
    value: "quadrant",
    icon: LayoutGrid,
    path: "/donor-quadrant",
  },
  {
    label: "Thesis",
    value: "thesis",
    icon: BookOpen,
    path: "/donor-quadrant?tab=thesis",
  },
  {
    label: "Quadrant Explained",
    value: "explained",
    icon: Target,
    path: "/donor-quadrant?tab=explained",
  },
  {
    label: "Movement Strategies",
    value: "strategies",
    icon: TrendingUp,
    path: "/donor-quadrant?tab=strategies",
  },
];

export default function DonorQuadrantWithTabs() {
  const [location] = useLocation();
  
  // Determine active tab from URL
  const params = new URLSearchParams(location.split('?')[1] || '');
  const activeTab = params.get('tab') || 'quadrant';

  // Render the appropriate component based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'thesis':
        return <QuadrantThesis key="thesis" />;
      case 'explained':
        return <QuadrantExplained key="explained" />;
      case 'strategies':
        return <QuadrantStrategies key="strategies" />;
      case 'quadrant':
      default:
        return <DonorQuadrant key="quadrant" />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={quadrantTabs} currentPath={location} />
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}
