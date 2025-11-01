import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NotFound from "@/pages/not-found";
import logoUrl from "@assets/ChatGPT Image Nov 1, 2025, 09_08_53 AM_1762006163839.png";
import { Button } from "@/components/ui/button";
import DashboardMGO from "@/pages/dashboard-mgo";
import DashboardDevDirector from "@/pages/dashboard-dev-director";
import DashboardCEO from "@/pages/dashboard-ceo";
import Solutions from "@/pages/solutions";
import Donors from "@/pages/donors";
import Donor360 from "@/pages/donor-360";
import Pipeline from "@/pages/pipeline";
import Grants from "@/pages/grants";
import Gifts from "@/pages/gifts";
import Campaigns from "@/pages/campaigns";
import DataHealth from "@/pages/data-health";
import Settings from "@/pages/settings";
import Integrations from "@/pages/integrations";

// AI Intelligence
import AIPredictiveTiming from "@/pages/ai-predictive-timing";
import AIWealthEvents from "@/pages/ai-wealth-events";
import AIMeetingBriefs from "@/pages/ai-meeting-briefs";
import AIVoiceNotes from "@/pages/ai-voice-notes";

// Relationship Intelligence
import BoardConnections from "@/pages/relationship-board-connections";
import CorporatePartnerships from "@/pages/relationship-corporate-partnerships";
import PeerDonors from "@/pages/relationship-peer-donors";
import BoardNetworkMapper from "@/pages/board-network-mapper";

// AI Content
import OutreachGenerator from "@/pages/content-outreach";
import GrantProposals from "@/pages/content-grant-proposals";
import ImpactReports from "@/pages/content-impact-reports";

// Analytics
import PeerBenchmarks from "@/pages/analytics-peer-benchmarks";
import SentimentAnalysis from "@/pages/analytics-sentiment";
import PortfolioOptimization from "@/pages/analytics-portfolio-optimization";

// Workflow Automation
import SmartCalendar from "@/pages/workflow-calendar";
import Stewardship from "@/pages/workflow-stewardship";
import TaskPriorities from "@/pages/workflow-task-priorities";
import GiftRegistries from "@/pages/workflow-gift-registries";

// Workflow Builder
import Workflows from "@/pages/workflows";
import WorkflowTemplates from "@/pages/workflows-templates";
import WorkflowCanvas from "@/pages/workflow-canvas";

function Dashboard() {
  // Default to Dev Director dashboard (can be changed via navigation)
  return <DashboardDevDirector />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/dashboard/mgo" component={DashboardMGO} />
      <Route path="/dashboard/dev-director" component={DashboardDevDirector} />
      <Route path="/dashboard/ceo" component={DashboardCEO} />
      <Route path="/solutions" component={Solutions} />
      <Route path="/donors/:id" component={Donor360} />
      <Route path="/donors" component={Donors} />
      <Route path="/pipeline" component={Pipeline} />
      <Route path="/grants" component={Grants} />
      <Route path="/gifts" component={Gifts} />
      <Route path="/campaigns" component={Campaigns} />
      <Route path="/data-health" component={DataHealth} />
      <Route path="/integrations" component={Integrations} />
      <Route path="/settings" component={Settings} />
      
      {/* AI Intelligence */}
      <Route path="/ai/predictive-timing" component={AIPredictiveTiming} />
      <Route path="/ai/wealth-events" component={AIWealthEvents} />
      <Route path="/ai/meeting-briefs" component={AIMeetingBriefs} />
      <Route path="/ai/voice-notes" component={AIVoiceNotes} />
      
      {/* Relationship Intelligence */}
      <Route path="/relationship/board-connections" component={BoardConnections} />
      <Route path="/relationship/board-network-mapper" component={BoardNetworkMapper} />
      <Route path="/relationship/corporate-partnerships" component={CorporatePartnerships} />
      <Route path="/relationship/peer-donors" component={PeerDonors} />
      
      {/* AI Content */}
      <Route path="/content/outreach" component={OutreachGenerator} />
      <Route path="/content/grant-proposals" component={GrantProposals} />
      <Route path="/content/impact-reports" component={ImpactReports} />
      
      {/* Analytics */}
      <Route path="/analytics/peer-benchmarks" component={PeerBenchmarks} />
      <Route path="/analytics/sentiment" component={SentimentAnalysis} />
      <Route path="/analytics/portfolio-optimization" component={PortfolioOptimization} />
      
      {/* Workflow Automation */}
      <Route path="/workflow/calendar" component={SmartCalendar} />
      <Route path="/workflow/stewardship" component={Stewardship} />
      <Route path="/workflow/task-priorities" component={TaskPriorities} />
      <Route path="/workflow/gift-registries" component={GiftRegistries} />
      
      {/* Workflow Builder */}
      <Route path="/workflows" component={Workflows} />
      <Route path="/workflows/templates" component={WorkflowTemplates} />
      <Route path="/workflows/:id/canvas" component={WorkflowCanvas} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

const navTabs = [
  { label: "Core", path: "/" },
  { label: "AI Intelligence", path: "/ai/predictive-timing" },
  { label: "Relationship Intel", path: "/relationship/board-network-mapper" },
  { label: "AI Content", path: "/content/outreach" },
  { label: "Analytics", path: "/analytics/peer-benchmarks" },
  { label: "Workflows", path: "/workflow/calendar" },
  { label: "Workflow Builder", path: "/workflows" },
];

function TopNavigation() {
  const [location, setLocation] = useLocation();

  const getActiveSection = () => {
    if (location === "/" || location.startsWith("/dashboard") || location.startsWith("/donors") || 
        location.startsWith("/pipeline") || location.startsWith("/grants") || location.startsWith("/gifts") || 
        location.startsWith("/campaigns") || location.startsWith("/data-health") || 
        location.startsWith("/integrations") || location.startsWith("/settings") || location.startsWith("/solutions")) {
      return "Core";
    }
    if (location.startsWith("/ai/")) return "AI Intelligence";
    if (location.startsWith("/relationship/")) return "Relationship Intel";
    if (location.startsWith("/content/")) return "AI Content";
    if (location.startsWith("/analytics/")) return "Analytics";
    if (location.startsWith("/workflow/")) return "Workflows";
    if (location.startsWith("/workflows")) return "Workflow Builder";
    return "Core";
  };

  const activeSection = getActiveSection();

  return (
    <div className="flex items-center gap-1">
      {navTabs.map((tab) => {
        const isActive = activeSection === tab.label;
        return (
          <Button
            key={tab.label}
            variant="ghost"
            size="sm"
            onClick={() => setLocation(tab.path)}
            className={`h-9 text-xs font-medium rounded-md transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            data-testid={`nav-tab-${tab.label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
}

function App() {
  const style = {
    "--sidebar-width": "15rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="flex items-center gap-6 h-16 px-6 border-b shrink-0">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <TopNavigation />
                <div className="flex items-center gap-2 ml-auto">
                  <img src={logoUrl} alt="FundRazor" className="h-8" />
                </div>
              </header>
              <main className="flex-1 overflow-auto px-6 py-6">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
