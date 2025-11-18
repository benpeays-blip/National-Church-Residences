import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Grid3x3, List } from "lucide-react";
import DonorQuadrant from "@/pages/donor-quadrant";
import Pipeline from "@/pages/pipeline";

const quadrantTabs: SectionTab[] = [
  {
    label: "Donor Quadrant",
    value: "quadrant",
    icon: Grid3x3,
    path: "/quadrant",
  },
  {
    label: "Pipeline View",
    value: "pipeline",
    icon: List,
    path: "/quadrant?tab=pipeline",
  },
];

export default function QuadrantWithTabs() {
  const [location] = useLocation();
  
  // Determine active tab from URL
  const params = new URLSearchParams(window.location.search);
  const activeTab = params.get('tab') || 'quadrant';

  // Determine which component to render
  let QuadrantComponent = DonorQuadrant;
  
  if (activeTab === 'pipeline') {
    QuadrantComponent = Pipeline;
  }

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={quadrantTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        <QuadrantComponent />
      </div>
    </div>
  );
}
