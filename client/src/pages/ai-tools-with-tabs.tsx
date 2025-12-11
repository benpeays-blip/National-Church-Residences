import { useLocation } from "wouter";
import { useMemo, useState, useEffect } from "react";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Mic, MessageSquare, FileText, BarChart3, Workflow, TrendingUp } from "lucide-react";
import AIVoiceNotes from "@/pages/ai-voice-notes";
import OutreachGenerator from "@/pages/content-outreach";
import GrantProposals from "@/pages/content-grant-proposals";
import ImpactReports from "@/pages/content-impact-reports";
import Workflows from "@/pages/workflows";
import AIPredictiveTiming from "@/pages/ai-predictive-timing";

const aiToolsTabs: SectionTab[] = [
  {
    label: "Predictive Timing",
    value: "timing",
    icon: TrendingUp,
    path: "/ai-tools",
  },
  {
    label: "Voice-to-CRM",
    value: "voice",
    icon: Mic,
    path: "/ai-tools?tab=voice",
  },
  {
    label: "Outreach Generator",
    value: "outreach",
    icon: MessageSquare,
    path: "/ai-tools?tab=outreach",
  },
  {
    label: "Grant Proposals",
    value: "grants",
    icon: FileText,
    path: "/ai-tools?tab=grants",
  },
  {
    label: "Impact Reports",
    value: "reports",
    icon: BarChart3,
    path: "/ai-tools?tab=reports",
  },
  {
    label: "Workflow Builder",
    value: "workflows",
    icon: Workflow,
    path: "/ai-tools?tab=workflows",
  },
];

export default function AIToolsWithTabs() {
  const [location] = useLocation();
  
  // Read active tab directly from URL on every render
  const params = new URLSearchParams(window.location.search);
  const activeTab = params.get('tab') || 'timing';

  // Render the appropriate component based on activeTab
  let content;
  if (activeTab === 'voice') {
    content = <AIVoiceNotes />;
  } else if (activeTab === 'outreach') {
    content = <OutreachGenerator />;
  } else if (activeTab === 'grants') {
    content = <GrantProposals />;
  } else if (activeTab === 'reports') {
    content = <ImpactReports />;
  } else if (activeTab === 'workflows') {
    content = <Workflows />;
  } else {
    content = <AIPredictiveTiming />;
  }

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={aiToolsTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        {content}
      </div>
    </div>
  );
}
