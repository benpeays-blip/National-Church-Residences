import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, MessageSquare, FileText, BarChart3, Workflow } from "lucide-react";
import AIVoiceNotes from "@/pages/ai-voice-notes";
import { useMemo } from "react";

type AIToolsTab = "voice" | "outreach" | "grants" | "reports" | "workflows";

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

export default function AIToolsWithTabs() {
  const [location, setLocation] = useLocation();

  // Derive active tab from URL
  const activeTab = useMemo<AIToolsTab>(() => {
    const params = new URLSearchParams(window.location.search);
    return (params.get('tab') as AIToolsTab) || "voice";
  }, [location]);

  // Handle tab changes by updating URL
  const handleTabChange = (newTab: AIToolsTab) => {
    setLocation(`/ai-tools?tab=${newTab}`);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">AI Tools</h1>
        <p className="text-sm text-muted-foreground">
          AI-powered tools to enhance fundraising efficiency
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => handleTabChange(v as AIToolsTab)}>
        <TabsList className="grid w-full grid-cols-5 gap-1">
          <TabsTrigger value="voice" data-testid="tab-voice-to-crm">
            <Mic className="w-4 h-4 mr-2" />
            Voice-to-CRM
          </TabsTrigger>
          <TabsTrigger value="outreach" data-testid="tab-outreach-generator">
            <MessageSquare className="w-4 h-4 mr-2" />
            Outreach Generator
          </TabsTrigger>
          <TabsTrigger value="grants" data-testid="tab-grant-proposals">
            <FileText className="w-4 h-4 mr-2" />
            Grant Proposals
          </TabsTrigger>
          <TabsTrigger value="reports" data-testid="tab-impact-reports">
            <BarChart3 className="w-4 h-4 mr-2" />
            Impact Reports
          </TabsTrigger>
          <TabsTrigger value="workflows" data-testid="tab-workflow-builder">
            <Workflow className="w-4 h-4 mr-2" />
            Workflow Builder
          </TabsTrigger>
        </TabsList>

        <TabsContent value="voice" className="space-y-6">
          <AIVoiceNotes />
        </TabsContent>

        <TabsContent value="outreach" className="space-y-6">
          <OutreachGenerator />
        </TabsContent>

        <TabsContent value="grants" className="space-y-6">
          <GrantProposals />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <ImpactReports />
        </TabsContent>

        <TabsContent value="workflows" className="space-y-6">
          <WorkflowBuilder />
        </TabsContent>
      </Tabs>
    </div>
  );
}
