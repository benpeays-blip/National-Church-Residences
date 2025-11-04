import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { CommandPalette } from "@/components/command-palette";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Search, Settings as SettingsIcon, Bell, User } from "lucide-react";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import DashboardMGO from "@/pages/dashboard-mgo";
import DashboardDevDirector from "@/pages/dashboard-dev-director";
import DashboardCEO from "@/pages/dashboard-ceo";
import Welcome from "@/pages/welcome";
import NationalChurchResidences from "@/pages/national-church-residences";
import Solutions from "@/pages/solutions";
import Proposals from "@/pages/proposals";
import TechStackMapper from "@/pages/tech-stack-mapper";
import OrganizationMapper from "@/pages/organization-mapper";
import OrganizationWorkflowCanvas from "@/pages/organization-workflow-canvas";
import NavigationPreview from "@/pages/navigation-preview";
import NavigationMockups from "@/pages/navigation-mockups";
import NavigationHybridMockup from "@/pages/navigation-hybrid-mockup";
import CardDesignPreview from "@/pages/card-design-preview";
import CardDesignModern from "@/pages/card-design-modern";
import Donors from "@/pages/donors";
import DonorsWithTabs from "@/pages/donors-with-tabs";
import Donor360 from "@/pages/donor-360";
import DonorDetail from "@/pages/donor-detail";
import DonorCardShowcase from "@/pages/donor-card-showcase";
import Pipeline from "@/pages/pipeline";
import PipelineWithTabs from "@/pages/pipeline-with-tabs";
import Grants from "@/pages/grants";
import Gifts from "@/pages/gifts";
import Campaigns from "@/pages/campaigns";
import CampaignsWithTabs from "@/pages/campaigns-with-tabs";
import CampaignDetail from "@/pages/campaign-detail";
import DataHealth from "@/pages/data-health";
import Settings from "@/pages/settings";
import Integrations from "@/pages/integrations";

// AI Intelligence
import AIPredictiveTiming from "@/pages/ai-predictive-timing";
import AIWealthEvents from "@/pages/ai-wealth-events";
import AIMeetingBriefs from "@/pages/ai-meeting-briefs";
import AIVoiceNotes from "@/pages/ai-voice-notes";
import AIWithTabs from "@/pages/ai-with-tabs";

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
import PipelineValueDetail from "@/pages/analytics-pipeline-value";
import Forecast90Days from "@/pages/analytics-forecast-90-days";
import YTDvsGoal from "@/pages/analytics-ytd-vs-goal";
import LYBUNTDonors from "@/pages/analytics-lybunt-donors";
import SYBUNTDonors from "@/pages/analytics-sybunt-donors";
import AnalyticsWithTabs from "@/pages/analytics-with-tabs";

// Workflow Automation
import SmartCalendar from "@/pages/workflow-calendar";
import Stewardship from "@/pages/workflow-stewardship";
import TaskPriorities from "@/pages/workflow-task-priorities";
import GiftRegistries from "@/pages/workflow-gift-registries";

// Workflow Builder
import Workflows from "@/pages/workflows";
import WorkflowTemplates from "@/pages/workflows-templates";
import WorkflowCanvas from "@/pages/workflow-canvas";

// Logo Preview
import LogoPreview from "@/pages/logo-preview";

// Hero Preview
import HeroPreview from "@/pages/hero-preview";

// Icon Style Guide
import IconStyleGuide from "@/pages/icon-style-guide";

// MGO Detail Pages
import MGOPortfolioDetail from "@/pages/mgo-portfolio-detail";
import MGOPipelineDetail from "@/pages/mgo-pipeline-detail";
import MGOTasksDetail from "@/pages/mgo-tasks-detail";
import MGOMeetingsDetail from "@/pages/mgo-meetings-detail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/national-church-residences" component={NationalChurchResidences} />
      <Route path="/dashboard/mgo" component={Dashboard} />
      <Route path="/dashboard/dev-director" component={Dashboard} />
      <Route path="/dashboard/ceo" component={Dashboard} />
      <Route path="/mgo/portfolio" component={MGOPortfolioDetail} />
      <Route path="/mgo/pipeline" component={MGOPipelineDetail} />
      <Route path="/mgo/tasks" component={MGOTasksDetail} />
      <Route path="/mgo/meetings" component={MGOMeetingsDetail} />
      <Route path="/solutions" component={Solutions} />
      <Route path="/proposals" component={Proposals} />
      <Route path="/tech-stack-mapper" component={TechStackMapper} />
      <Route path="/card-design-preview" component={CardDesignPreview} />
      <Route path="/card-design-modern" component={CardDesignModern} />
      <Route path="/organization-mapper" component={OrganizationMapper} />
      <Route path="/organization-workflow-canvas" component={OrganizationWorkflowCanvas} />
      <Route path="/navigation-preview" component={NavigationPreview} />
      <Route path="/navigation-mockups" component={NavigationMockups} />
      <Route path="/navigation-hybrid-mockup" component={NavigationHybridMockup} />
      <Route path="/icon-style-guide" component={IconStyleGuide} />
      <Route path="/donors/card-showcase" component={DonorCardShowcase} />
      <Route path="/donors/major-gifts" component={DonorsWithTabs} />
      <Route path="/donors/lybunt" component={DonorsWithTabs} />
      <Route path="/donors/sybunt" component={DonorsWithTabs} />
      <Route path="/donors/prospects" component={DonorsWithTabs} />
      <Route path="/donors/:id" component={DonorDetail} />
      <Route path="/donors" component={DonorsWithTabs} />
      <Route path="/pipeline/value" component={PipelineWithTabs} />
      <Route path="/pipeline/forecast" component={PipelineWithTabs} />
      <Route path="/pipeline/analytics" component={PipelineWithTabs} />
      <Route path="/pipeline" component={PipelineWithTabs} />
      <Route path="/grants" component={Grants} />
      <Route path="/gifts" component={Gifts} />
      <Route path="/campaigns/:id" component={CampaignDetail} />
      <Route path="/campaigns/performance" component={CampaignsWithTabs} />
      <Route path="/campaigns/goals" component={CampaignsWithTabs} />
      <Route path="/campaigns/trends" component={CampaignsWithTabs} />
      <Route path="/campaigns" component={CampaignsWithTabs} />
      <Route path="/data-health" component={DataHealth} />
      <Route path="/integrations" component={Integrations} />
      <Route path="/settings" component={Settings} />
      
      {/* AI Intelligence */}
      <Route path="/ai/predictive-timing" component={AIWithTabs} />
      <Route path="/ai/wealth-events" component={AIWithTabs} />
      <Route path="/ai/meeting-briefs" component={AIWithTabs} />
      <Route path="/ai/voice-notes" component={AIWithTabs} />
      
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
      <Route path="/analytics/peer-benchmarks" component={AnalyticsWithTabs} />
      <Route path="/analytics/sentiment" component={AnalyticsWithTabs} />
      <Route path="/analytics/portfolio-optimization" component={AnalyticsWithTabs} />
      <Route path="/analytics/ytd-vs-goal" component={AnalyticsWithTabs} />
      
      {/* Workflow Automation */}
      <Route path="/workflow/calendar" component={SmartCalendar} />
      <Route path="/workflow/stewardship" component={Stewardship} />
      <Route path="/workflow/task-priorities" component={TaskPriorities} />
      <Route path="/workflow/gift-registries" component={GiftRegistries} />
      
      {/* Workflow Builder */}
      <Route path="/workflows" component={Workflows} />
      <Route path="/workflows/templates" component={WorkflowTemplates} />
      <Route path="/workflows/:id/canvas" component={WorkflowCanvas} />
      
      {/* Logo Preview */}
      <Route path="/logo-preview" component={LogoPreview} />
      
      {/* Hero Preview */}
      <Route path="/hero-preview" component={HeroPreview} />
      
      <Route component={NotFound} />
    </Switch>
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
          <CommandPalette />
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <header 
                className="flex items-center gap-4 h-16 px-6 border-b shrink-0"
                style={{
                  background: "#0A1628",
                  borderColor: "#1A3A5C40"
                }}
              >
                <SidebarTrigger data-testid="button-sidebar-toggle" className="text-white hover:bg-white/10" />
                <Breadcrumbs className="text-white/90" />
                
                <div className="flex items-center gap-3 ml-auto">
                  <Button
                    variant="ghost"
                    size="icon"
                    data-testid="button-global-search"
                    aria-label="Global search (Cmd+K)"
                    className="text-white hover:bg-white/10 hover:text-white"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    data-testid="button-notifications"
                    aria-label="Notifications"
                    className="text-white hover:bg-white/10 hover:text-white"
                  >
                    <Bell className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    data-testid="button-settings"
                    aria-label="Settings"
                    className="text-white hover:bg-white/10 hover:text-white"
                  >
                    <a href="/settings">
                      <SettingsIcon className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    data-testid="button-account"
                    aria-label="Account menu"
                    className="text-white hover:bg-white/10 hover:text-white"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </div>
              </header>
              <main className="flex-1 overflow-auto p-6">
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
