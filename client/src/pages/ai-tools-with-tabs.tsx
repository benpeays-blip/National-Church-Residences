import { useLocation } from "wouter";
import { useMemo, useState, useEffect } from "react";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Mic, MessageSquare, FileText, BarChart3, Workflow, TrendingUp, Bot, Sparkles } from "lucide-react";
import AIVoiceNotes from "@/pages/ai-voice-notes";
import OutreachGenerator from "@/pages/content-outreach";
import GrantProposals from "@/pages/content-grant-proposals";
import ImpactReports from "@/pages/content-impact-reports";
import Workflows from "@/pages/workflows";
import AIPredictiveTiming from "@/pages/ai-predictive-timing";
import { AIChatTab, ImpactFeedTab } from "@/pages/impact-intelligence";

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
    path: "/ai-tools/voice",
  },
  {
    label: "Outreach Generator",
    value: "outreach",
    icon: MessageSquare,
    path: "/ai-tools/outreach",
  },
  {
    label: "Grant Proposals",
    value: "grants",
    icon: FileText,
    path: "/ai-tools/grants",
  },
  {
    label: "Impact Reports",
    value: "reports",
    icon: BarChart3,
    path: "/ai-tools/reports",
  },
  {
    label: "Workflow Builder",
    value: "workflows",
    icon: Workflow,
    path: "/ai-tools/workflows",
  },
  {
    label: "AI Assistant",
    value: "assistant",
    icon: Bot,
    path: "/ai-tools/assistant",
  },
  {
    label: "Impact Feed",
    value: "feed",
    icon: Sparkles,
    path: "/ai-tools/feed",
  },
];

export default function AIToolsWithTabs() {
  const [location] = useLocation();
  
  // Determine active tab from URL path
  const getActiveTab = (): string => {
    if (location.includes('/ai-tools/voice')) return 'voice';
    if (location.includes('/ai-tools/outreach')) return 'outreach';
    if (location.includes('/ai-tools/grants')) return 'grants';
    if (location.includes('/ai-tools/reports')) return 'reports';
    if (location.includes('/ai-tools/workflows')) return 'workflows';
    if (location.includes('/ai-tools/assistant')) return 'assistant';
    if (location.includes('/ai-tools/feed')) return 'feed';
    return 'timing';
  };
  
  const activeTab = getActiveTab();

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
  } else if (activeTab === 'assistant') {
    content = <AIChatTab />;
  } else if (activeTab === 'feed') {
    content = <ImpactFeedTab />;
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
