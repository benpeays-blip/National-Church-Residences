import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { LayoutGrid, Search, Send, Award, Sparkles } from "lucide-react";
import Grants from "@/pages/grants";
import GrantResearchPage from "@/pages/grant-research";

const grantsTabs: SectionTab[] = [
  {
    label: "Pipeline",
    value: "all",
    icon: LayoutGrid,
    path: "/grants",
  },
  {
    label: "Research & Discovery",
    value: "research",
    icon: Sparkles,
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

  const renderContent = () => {
    if (location === '/grants/research') {
      return <GrantResearchPage key="research" />;
    }
    if (location === '/grants/submitted') {
      return <Grants key="submitted" initialStageFilter="Submitted" />;
    }
    if (location === '/grants/awarded') {
      return <Grants key="awarded" initialStageFilter="Awarded" />;
    }
    return <Grants key="all" />;
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
