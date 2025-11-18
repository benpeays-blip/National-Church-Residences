import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Mic, MessageSquare, FileText, BarChart3, Workflow } from "lucide-react";
import AIVoiceNotes from "@/pages/ai-voice-notes";

// Placeholder components for pages that don't exist yet
function OutreachGenerator() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Outreach Generator</h2>
      <p className="text-muted-foreground">AI-powered donor outreach templates and personalized communications.</p>
    </div>
  );
}

function GrantProposals() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Grant Proposals</h2>
      <p className="text-muted-foreground">AI-assisted grant writing and proposal generation.</p>
    </div>
  );
}

function ImpactReports() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Impact Reports</h2>
      <p className="text-muted-foreground">Automated impact report generation and donor communications.</p>
    </div>
  );
}

function WorkflowBuilder() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Workflow Builder</h2>
      <p className="text-muted-foreground">Visual workflow automation builder for fundraising processes.</p>
    </div>
  );
}

const aiToolsTabs: SectionTab[] = [
  {
    label: "Voice-to-CRM",
    value: "voice",
    icon: Mic,
    path: "/ai-tools",
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
  
  // Determine active tab from URL
  const params = new URLSearchParams(window.location.search);
  const activeTab = params.get('tab') || 'voice';

  // Determine which component to render
  let AIComponent = AIVoiceNotes;
  
  if (activeTab === 'outreach') {
    AIComponent = OutreachGenerator;
  } else if (activeTab === 'grants') {
    AIComponent = GrantProposals;
  } else if (activeTab === 'reports') {
    AIComponent = ImpactReports;
  } else if (activeTab === 'workflows') {
    AIComponent = WorkflowBuilder;
  }

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={aiToolsTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        <AIComponent />
      </div>
    </div>
  );
}
