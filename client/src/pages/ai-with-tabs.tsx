import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Brain, TrendingUp, FileText, Mic } from "lucide-react";
import AIPredictiveTiming from "@/pages/ai-predictive-timing";
import AIWealthEvents from "@/pages/ai-wealth-events";
import AIMeetingBriefs from "@/pages/ai-meeting-briefs";
import AIVoiceNotes from "@/pages/ai-voice-notes";

const aiTabs: SectionTab[] = [
  {
    label: "Predictive Timing",
    value: "timing",
    icon: Brain,
    path: "/ai/predictive-timing",
  },
  {
    label: "Wealth Events",
    value: "wealth",
    icon: TrendingUp,
    path: "/ai/wealth-events",
  },
  {
    label: "Meeting Briefs",
    value: "briefs",
    icon: FileText,
    path: "/ai/meeting-briefs",
  },
  {
    label: "Voice Notes",
    value: "voice",
    icon: Mic,
    path: "/ai/voice-notes",
  },
];

export default function AIWithTabs() {
  const [location] = useLocation();

  let AIComponent = AIPredictiveTiming;
  if (location === "/ai/wealth-events") {
    AIComponent = AIWealthEvents;
  } else if (location === "/ai/meeting-briefs") {
    AIComponent = AIMeetingBriefs;
  } else if (location === "/ai/voice-notes") {
    AIComponent = AIVoiceNotes;
  }

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={aiTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        <AIComponent />
      </div>
    </div>
  );
}
