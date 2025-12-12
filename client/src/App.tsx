import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CommandPalette } from "@/components/command-palette";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FundRazorLogo } from "@/components/FundRazorLogo";
import { Button } from "@/components/ui/button";
import { Search, Settings as SettingsIcon, Bell, User } from "lucide-react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import DashboardHome from "@/pages/dashboard-home";
import DashboardHomeWithTabs from "@/pages/dashboard-home-with-tabs";
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
import DonorActionPlan from "@/pages/donor-action-plan";
import DonorCardShowcase from "@/pages/donor-card-showcase";
import DonorQuadrant from "@/pages/donor-quadrant";
import DonorQuadrantWithTabs from "@/pages/donor-quadrant-with-tabs";
import Pipeline from "@/pages/pipeline";
import PipelineWithTabs from "@/pages/pipeline-with-tabs";
import Grants from "@/pages/grants";
import GiftsWithTabs from "@/pages/gifts-with-tabs";
import Events from "@/pages/events";
import PastEvents from "@/pages/past-events";
import Campaigns from "@/pages/campaigns";
import CampaignsWithTabs from "@/pages/campaigns-with-tabs";
import CampaignDetail from "@/pages/campaign-detail";
import DataHealth from "@/pages/data-health";
import Settings from "@/pages/settings";
import Integrations from "@/pages/integrations";
import Integrations2 from "@/pages/integrations-2";

// Tab-based landing pages
import IntelligenceWithTabs from "@/pages/intelligence-with-tabs";
import QuadrantWithTabs from "@/pages/quadrant-with-tabs";
import EventsWithTabs from "@/pages/events-with-tabs";
import GrantsWithTabs from "@/pages/grants-with-tabs";
import AIToolsWithTabs from "@/pages/ai-tools-with-tabs";
import RelationshipsWithTabs from "@/pages/relationships-with-tabs";
import OtherWithTabs from "@/pages/other-with-tabs";
import Temporary from "@/pages/temporary";

// AI Intelligence
import AIPredictiveTiming from "@/pages/ai-predictive-timing";
import AIWealthEvents from "@/pages/ai-wealth-events";
import AIMeetingBriefs from "@/pages/ai-meeting-briefs";
import AIVoiceNotes from "@/pages/ai-voice-notes";
import AIWithTabs from "@/pages/ai-with-tabs";

// Relationship Intelligence
import BoardConnections from "@/pages/relationship-board-connections";
import RelationshipCorporatePartnerships from "@/pages/relationship-corporate-partnerships";
import PeerDonors from "@/pages/relationship-peer-donors";
import BoardNetworkMapper from "@/pages/board-network-mapper";

// Corporate Partnerships (top-level section)
import CorporatePartnershipsPage from "@/pages/corporate-partnerships";
import CorporatePartnershipDetail from "@/pages/corporate-partnership-detail";

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
      <Route path="/" component={DashboardHome} />
      <Route path="/home-old" component={Home} />
      <Route path="/welcome" component={OtherWithTabs} />
      <Route path="/national-church-residences" component={OtherWithTabs} />
      <Route path="/dashboard/mgo" component={Dashboard} />
      <Route path="/dashboard/dev-director" component={Dashboard} />
      <Route path="/dashboard/ceo" component={Dashboard} />
      <Route path="/mgo/portfolio" component={MGOPortfolioDetail} />
      <Route path="/mgo/pipeline" component={MGOPipelineDetail} />
      <Route path="/mgo/tasks" component={MGOTasksDetail} />
      <Route path="/mgo/meetings" component={MGOMeetingsDetail} />
      <Route path="/solutions" component={Solutions} />
      <Route path="/proposals" component={Proposals} />
      <Route path="/tech-stack-mapper" component={OtherWithTabs} />
      <Route path="/card-design-preview" component={CardDesignPreview} />
      <Route path="/card-design-modern" component={CardDesignModern} />
      <Route path="/organization-mapper" component={OtherWithTabs} />
      <Route path="/organization-workflow-canvas" component={OtherWithTabs} />
      <Route path="/navigation-preview" component={NavigationPreview} />
      <Route path="/navigation-mockups" component={NavigationMockups} />
      <Route path="/navigation-hybrid-mockup" component={NavigationHybridMockup} />
      <Route path="/icon-style-guide" component={IconStyleGuide} />
      <Route path="/donor-quadrant" component={DonorQuadrantWithTabs} />
      <Route path="/donors/card-showcase" component={DonorCardShowcase} />
      <Route path="/donors/major-gifts" component={DonorsWithTabs} />
      <Route path="/donors/lybunt" component={DonorsWithTabs} />
      <Route path="/donors/sybunt" component={DonorsWithTabs} />
      <Route path="/donors/prospects" component={DonorsWithTabs} />
      <Route path="/donors/:id/action-plan" component={DonorActionPlan} />
      <Route path="/donors/:id" component={DonorDetail} />
      <Route path="/donors" component={DonorsWithTabs} />
      <Route path="/pipeline/value" component={PipelineWithTabs} />
      <Route path="/pipeline/forecast" component={PipelineWithTabs} />
      <Route path="/pipeline/analytics" component={PipelineWithTabs} />
      <Route path="/pipeline" component={PipelineWithTabs} />
      
      {/* Tab-based landing pages */}
      <Route path="/intelligence" component={IntelligenceWithTabs} />
      <Route path="/quadrant/summary" component={QuadrantWithTabs} />
      <Route path="/quadrant/thesis" component={QuadrantWithTabs} />
      <Route path="/quadrant/explained" component={QuadrantWithTabs} />
      <Route path="/quadrant/strategies" component={QuadrantWithTabs} />
      <Route path="/quadrant" component={QuadrantWithTabs} />
      <Route path="/events" component={EventsWithTabs} />
      <Route path="/grants/research" component={GrantsWithTabs} />
      <Route path="/grants/submitted" component={GrantsWithTabs} />
      <Route path="/grants/awarded" component={GrantsWithTabs} />
      <Route path="/grants" component={GrantsWithTabs} />
      <Route path="/gifts" component={GiftsWithTabs} />
      <Route path="/ai-tools" component={AIToolsWithTabs} />
      <Route path="/relationships" component={RelationshipsWithTabs} />
      <Route path="/corporate-partnerships/:id" component={CorporatePartnershipDetail} />
      <Route path="/corporate-partnerships" component={CorporatePartnershipsPage} />
      <Route path="/other" component={OtherWithTabs} />
      <Route path="/temporary" component={Temporary} />
      <Route path="/temporary/interviews/:personId" component={Temporary} />
      <Route path="/temporary/tech-stack" component={Temporary} />
      <Route path="/temporary/tech-stack/:productId" component={Temporary} />
      <Route path="/temporary/optimization-ideas" component={Temporary} />
      <Route path="/temporary/risk-compliance" component={Temporary} />
      
      <Route path="/events/past" component={PastEvents} />
      <Route path="/campaigns/:id" component={CampaignDetail} />
      <Route path="/campaigns/performance" component={CampaignsWithTabs} />
      <Route path="/campaigns/goals" component={CampaignsWithTabs} />
      <Route path="/campaigns/trends" component={CampaignsWithTabs} />
      <Route path="/campaigns" component={CampaignsWithTabs} />
      <Route path="/data-health" component={DataHealth} />
      <Route path="/integrations" component={Integrations} />
      <Route path="/integrations-2" component={Integrations2} />
      <Route path="/settings" component={Settings} />
      
      {/* AI Intelligence - individual pages */}
      <Route path="/ai/predictive-timing" component={AIPredictiveTiming} />
      <Route path="/ai/wealth-events" component={AIWealthEvents} />
      <Route path="/ai/meeting-briefs" component={AIMeetingBriefs} />
      <Route path="/ai/voice-notes" component={AIVoiceNotes} />
      
      {/* Relationship Intelligence - individual pages */}
      <Route path="/relationship/board-connections" component={BoardConnections} />
      <Route path="/relationship/board-network-mapper" component={BoardNetworkMapper} />
      <Route path="/relationship/corporate-partnerships" component={RelationshipCorporatePartnerships} />
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
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CommandPalette />
        {/* Sidebar temporarily hidden - functionality preserved for future use */}
        {/* <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1"> */}
        
        <div className="flex h-screen w-full">
          <div className="flex flex-col flex-1">
            {/* Top Header Navigation */}
            <header 
              className="flex items-center gap-6 h-16 px-6 border-b shrink-0 bg-white"
            >
              {/* Sidebar Toggle - Hidden (sidebar functionality preserved) */}
              {/* <SidebarTrigger 
                data-testid="button-sidebar-toggle" 
                className="hover:bg-gray-100 relative z-50" 
                style={{ color: "#084594" }} 
              /> */}
              
              <div className="flex items-center gap-3 ml-auto">
                  {/* Navigation Buttons */}
                  <nav className="flex items-center gap-1">
                    <Link href="/intelligence">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-semibold hover:bg-gray-100"
                        style={{ color: "#084594" }}
                        data-testid="button-intelligence"
                      >
                        Intelligence
                      </Button>
                    </Link>

                    <Link href="/quadrant">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-semibold hover:bg-gray-100"
                        style={{ color: "#084594" }}
                        data-testid="button-quadrant"
                      >
                        Quadrant
                      </Button>
                    </Link>

                    <Link href="/events">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-semibold hover:bg-gray-100"
                        style={{ color: "#084594" }}
                        data-testid="button-events"
                      >
                        Events
                      </Button>
                    </Link>
                    
                    <Link href="/grants">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-semibold hover:bg-gray-100"
                        style={{ color: "#084594" }}
                        data-testid="button-grants"
                      >
                        Grants
                      </Button>
                    </Link>
                    
                    <Link href="/gifts">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-semibold hover:bg-gray-100"
                        style={{ color: "#084594" }}
                        data-testid="button-gifts"
                      >
                        Gifts
                      </Button>
                    </Link>
                    
                    <Link href="/campaigns">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-semibold hover:bg-gray-100"
                        style={{ color: "#084594" }}
                        data-testid="button-campaigns"
                      >
                        Campaigns
                      </Button>
                    </Link>
                    
                    <Link href="/ai-tools">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-semibold hover:bg-gray-100"
                        style={{ color: "#084594" }}
                        data-testid="button-ai-tools"
                      >
                        AI Tools
                      </Button>
                    </Link>
                    
                    <Link href="/relationships">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-semibold hover:bg-gray-100"
                        style={{ color: "#084594" }}
                        data-testid="button-relationships"
                      >
                        Relationships
                      </Button>
                    </Link>
                    
                    <Link href="/corporate-partnerships">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-semibold hover:bg-gray-100"
                        style={{ color: "#084594" }}
                        data-testid="button-corporate-partnerships"
                      >
                        Corporate
                      </Button>
                    </Link>
                    
                    <Link href="/donors">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-semibold hover:bg-gray-100"
                        style={{ color: "#084594" }}
                        data-testid="button-donors"
                      >
                        Donors
                      </Button>
                    </Link>
                    
                    <Link href="/pipeline">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-semibold hover:bg-gray-100"
                        style={{ color: "#084594" }}
                        data-testid="button-pipeline"
                      >
                        Pipeline
                      </Button>
                    </Link>
                    
                    <Link href="/other">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-semibold hover:bg-gray-100"
                        style={{ color: "#084594" }}
                        data-testid="button-other"
                      >
                        Other
                      </Button>
                    </Link>
                    
                    <Link href="/temporary">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-semibold hover:bg-gray-100"
                        style={{ color: "#084594" }}
                        data-testid="button-temporary"
                      >
                        Temporary
                      </Button>
                    </Link>
                  </nav>
                  
                  {/* Separator */}
                  <div className="h-6 w-px bg-gray-200" />
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    data-testid="button-global-search"
                    aria-label="Global search (Cmd+K)"
                    className="hover:bg-gray-100"
                    style={{ color: "#084594" }}
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    data-testid="button-notifications"
                    aria-label="Notifications"
                    className="hover:bg-gray-100"
                    style={{ color: "#084594" }}
                  >
                    <Bell className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    data-testid="button-settings"
                    aria-label="Settings"
                    className="hover:bg-gray-100"
                    style={{ color: "#084594" }}
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
                    className="hover:bg-gray-100"
                    style={{ color: "#084594" }}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </div>
              </header>
              <main className="flex-1 overflow-auto p-6 bg-background">
                <Router />
              </main>
            </div>
          </div>
        {/* </div>
          </div>
        </SidebarProvider> */}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
