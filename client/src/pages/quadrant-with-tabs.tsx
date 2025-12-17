import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Grid3x3, BookOpen, ArrowRight, Target, Wand2, ListOrdered } from "lucide-react";
import DonorQuadrant from "@/pages/donor-quadrant";
import QuadrantThesis from "@/pages/quadrant-thesis";
import QuadrantExplained from "@/pages/quadrant-explained";
import QuadrantStrategies from "@/pages/quadrant-strategies";
import QuadrantWizard from "@/pages/quadrant-wizard";
import QuadrantTop10 from "@/pages/quadrant-top10";

const quadrantTabs: SectionTab[] = [
  {
    label: "Donor Quadrant",
    value: "quadrant",
    icon: Grid3x3,
    path: "/quadrant",
  },
  {
    label: "Top 10",
    value: "top10",
    icon: ListOrdered,
    path: "/quadrant/top10",
  },
  {
    label: "Partner Pathway Wizard",
    value: "wizard",
    icon: Wand2,
    path: "/quadrant/wizard",
  },
  {
    label: "Thesis",
    value: "thesis",
    icon: BookOpen,
    path: "/quadrant/thesis",
  },
  {
    label: "Quadrant Explained",
    value: "explained",
    icon: Target,
    path: "/quadrant/explained",
  },
  {
    label: "Movement Strategies",
    value: "strategies",
    icon: ArrowRight,
    path: "/quadrant/strategies",
  },
];

export default function QuadrantWithTabs() {
  const [location] = useLocation();

  // Determine which component to render based on route
  let QuadrantComponent = DonorQuadrant;
  
  if (location === "/quadrant/thesis") {
    QuadrantComponent = QuadrantThesis;
  } else if (location === "/quadrant/explained") {
    QuadrantComponent = QuadrantExplained;
  } else if (location === "/quadrant/strategies") {
    QuadrantComponent = QuadrantStrategies;
  } else if (location === "/quadrant/top10") {
    QuadrantComponent = QuadrantTop10;
  } else if (location === "/quadrant/wizard") {
    QuadrantComponent = QuadrantWizard;
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
