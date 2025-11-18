import { useLocation } from "wouter";
import { useMemo } from "react";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Users, TrendingUp, DollarSign, Calendar } from "lucide-react";
import Donors from "@/pages/donors";
import AIPredictiveTiming from "@/pages/ai-predictive-timing";
import AIWealthEvents from "@/pages/ai-wealth-events";
import AIMeetingBriefs from "@/pages/ai-meeting-briefs";

const intelligenceTabs: SectionTab[] = [
  {
    label: "Donors",
    value: "donors",
    icon: Users,
    path: "/intelligence",
  },
  {
    label: "Predictive Timing",
    value: "timing",
    icon: TrendingUp,
    path: "/intelligence?tab=timing",
  },
  {
    label: "Wealth Events",
    value: "wealth",
    icon: DollarSign,
    path: "/intelligence?tab=wealth",
  },
  {
    label: "Meeting Briefs",
    value: "briefs",
    icon: Calendar,
    path: "/intelligence?tab=briefs",
  },
];

export default function IntelligenceWithTabs() {
  const [location] = useLocation();
  
  // Determine active tab from URL (using location to trigger re-render)
  const activeTab = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') || 'donors';
  }, [location]);

  // Determine which component to render
  const IntelligenceComponent = useMemo(() => {
    if (activeTab === 'timing') {
      return AIPredictiveTiming;
    } else if (activeTab === 'wealth') {
      return AIWealthEvents;
    } else if (activeTab === 'briefs') {
      return AIMeetingBriefs;
    }
    return Donors;
  }, [activeTab]);

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={intelligenceTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        <IntelligenceComponent />
      </div>
    </div>
  );
}
