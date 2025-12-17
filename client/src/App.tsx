import { useState, useEffect } from "react";
import { Switch, Route, Link, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CommandPalette, openCommandPalette } from "@/components/command-palette";
import { FundRazorLogo } from "@/components/FundRazorLogo";
import ncrLogo from "@assets/Screenshot_2025-12-14_at_1.40.02_PM_1765741231815.png";
// Sidebar imports preserved for future use
// import { AppSidebar } from "@/components/app-sidebar";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Search, Settings as SettingsIcon, Bell, User, ChevronDown, Menu } from "lucide-react";

// Navigation dropdown categories
const navigationDomains = {
  "Reporting": {
    items: [
      { name: "Visuals", href: "/reporting/visuals" },
      { name: "Senior Housing", href: "/ncr/senior-housing" },
      { name: "Care Services", href: "/ncr/care-services" },
      { name: "Impact Intelligence", href: "/reporting/impact-intelligence" },
    ]
  },
  "Fundraising": {
    items: [
      { name: "Donors", href: "/donors" },
      { name: "Pipeline", href: "/pipeline" },
      { name: "Gifts", href: "/gifts" },
      { name: "Grants", href: "/grants" },
      { name: "Campaigns", href: "/campaigns" },
      { name: "Events", href: "/events" },
    ]
  },
  "AI Tools": {
    items: [
      { name: "AI Assistant", href: "/reporting/impact-intelligence" },
      { name: "AI Dashboard", href: "/ai-tools" },
    ]
  },
};

type DomainKey = keyof typeof navigationDomains;
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import DashboardHome from "@/pages/dashboard-home";
import DashboardHomeWithTabs from "@/pages/dashboard-home-with-tabs";
import PreviewHomepage from "@/pages/preview-homepage";
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
import Campaigns from "@/pages/campaigns";
import CampaignsWithTabs from "@/pages/campaigns-with-tabs";
import CampaignDetail from "@/pages/campaign-detail";
import DataHealth from "@/pages/data-health";
import Settings from "@/pages/settings";
import Notifications from "@/pages/notifications";
import Profile from "@/pages/profile";
import Integrations from "@/pages/integrations";
import Integrations2 from "@/pages/integrations-2";

// Tab-based landing pages
import IntelligenceWithTabs from "@/pages/intelligence-with-tabs";
import QuadrantWithTabs from "@/pages/quadrant-with-tabs";
import EventsWithTabs from "@/pages/events-with-tabs";
import GrantsWithTabs from "@/pages/grants-with-tabs";
import AIToolsWithTabs from "@/pages/ai-tools-with-tabs";
import RelationshipsWithTabs from "@/pages/relationships-with-tabs";
import AgentValueMap from "@/pages/agent-value-map";
import OtherWithTabs from "@/pages/other-with-tabs";
import Temporary from "@/pages/temporary";
import ImpactIntelligence from "@/pages/impact-intelligence";
import ReportingVisuals from "@/pages/reporting-visuals";

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
import CorporationsWithTabs from "@/pages/corporations-with-tabs";

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

// Navigation Previews
import NavigationMegaMenuPreview from "@/pages/navigation-mega-menu-preview";

// Icon Style Guide
import IconStyleGuide from "@/pages/icon-style-guide";

// MGO Detail Pages
import MGOPortfolioDetail from "@/pages/mgo-portfolio-detail";
import MGOPipelineDetail from "@/pages/mgo-pipeline-detail";
import MGOTasksDetail from "@/pages/mgo-tasks-detail";
import MGOMeetingsDetail from "@/pages/mgo-meetings-detail";

// NCR Pages
import NcrSeniorHousingWithTabs from "@/pages/ncr-senior-housing-with-tabs";
import NcrCareServicesWithTabs from "@/pages/ncr-care-services-with-tabs";
import NcrFoundationWithTabs from "@/pages/ncr-foundation-with-tabs";
import FoundationMetricDetail from "@/pages/foundation-metric-detail";
import ScorecardDetail from "@/pages/scorecard-detail";
import HubDetail from "@/pages/hub-detail";
import WorkflowStepDetail from "@/pages/workflow-step-detail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={PreviewHomepage} />
      <Route path="/dashboard-old" component={DashboardHome} />
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
      <Route path="/intelligence/wealth" component={IntelligenceWithTabs} />
      <Route path="/intelligence/briefs" component={IntelligenceWithTabs} />
      <Route path="/intelligence" component={IntelligenceWithTabs} />
      <Route path="/quadrant/summary" component={QuadrantWithTabs} />
      <Route path="/quadrant/thesis" component={QuadrantWithTabs} />
      <Route path="/quadrant/explained" component={QuadrantWithTabs} />
      <Route path="/quadrant/strategies" component={QuadrantWithTabs} />
      <Route path="/quadrant/top10" component={QuadrantWithTabs} />
      <Route path="/quadrant/wizard" component={QuadrantWithTabs} />
      <Route path="/quadrant" component={QuadrantWithTabs} />
      <Route path="/events/upcoming" component={EventsWithTabs} />
      <Route path="/events/past" component={EventsWithTabs} />
      <Route path="/events" component={EventsWithTabs} />
      <Route path="/grants/research" component={GrantsWithTabs} />
      <Route path="/grants/submitted" component={GrantsWithTabs} />
      <Route path="/grants/awarded" component={GrantsWithTabs} />
      <Route path="/grants" component={GrantsWithTabs} />
      <Route path="/gifts/major" component={GiftsWithTabs} />
      <Route path="/gifts/recurring" component={GiftsWithTabs} />
      <Route path="/gifts/planned" component={GiftsWithTabs} />
      <Route path="/gifts/types" component={GiftsWithTabs} />
      <Route path="/gifts" component={GiftsWithTabs} />
      <Route path="/ai-tools/voice" component={AIToolsWithTabs} />
      <Route path="/ai-tools/outreach" component={AIToolsWithTabs} />
      <Route path="/ai-tools/grants" component={AIToolsWithTabs} />
      <Route path="/ai-tools/reports" component={AIToolsWithTabs} />
      <Route path="/ai-tools/workflows" component={AIToolsWithTabs} />
      <Route path="/ai-tools" component={AIToolsWithTabs} />
      <Route path="/relationships/dnb" component={RelationshipsWithTabs} />
      <Route path="/relationships/network" component={RelationshipsWithTabs} />
      <Route path="/relationships/connections" component={RelationshipsWithTabs} />
      <Route path="/relationships/peer" component={RelationshipsWithTabs} />
      <Route path="/relationships" component={RelationshipsWithTabs} />
      <Route path="/agent-value-map/scorecard/:domainId" component={ScorecardDetail} />
      <Route path="/agent-value-map/hub/:hubId" component={HubDetail} />
      <Route path="/agent-value-map/workflow/:stepId" component={WorkflowStepDetail} />
      <Route path="/agent-value-map" component={AgentValueMap} />
      <Route path="/corporate-partnerships/employee-giving" component={CorporationsWithTabs} />
      <Route path="/corporate-partnerships/sponsorships" component={CorporationsWithTabs} />
      <Route path="/corporate-partnerships/giving" component={CorporationsWithTabs} />
      <Route path="/corporate-partnerships/volunteering" component={CorporationsWithTabs} />
      <Route path="/corporate-partnerships/inkind" component={CorporationsWithTabs} />
      <Route path="/corporate-partnerships/foundations" component={CorporationsWithTabs} />
      <Route path="/corporate-partnerships/prospects" component={CorporationsWithTabs} />
      <Route path="/corporate-partnerships/:id" component={CorporatePartnershipDetail} />
      <Route path="/corporate-partnerships" component={CorporationsWithTabs} />
      {/* NCR Pages */}
      <Route path="/ncr/senior-housing/independent" component={NcrSeniorHousingWithTabs} />
      <Route path="/ncr/senior-housing/assisted" component={NcrSeniorHousingWithTabs} />
      <Route path="/ncr/senior-housing/memory" component={NcrSeniorHousingWithTabs} />
      <Route path="/ncr/senior-housing/ccrc" component={NcrSeniorHousingWithTabs} />
      <Route path="/ncr/senior-housing" component={NcrSeniorHousingWithTabs} />
      <Route path="/ncr/care-services/home-health" component={NcrCareServicesWithTabs} />
      <Route path="/ncr/care-services/aide" component={NcrCareServicesWithTabs} />
      <Route path="/ncr/care-services/hospice" component={NcrCareServicesWithTabs} />
      <Route path="/ncr/care-services/chaplaincy" component={NcrCareServicesWithTabs} />
      <Route path="/ncr/care-services" component={NcrCareServicesWithTabs} />
      <Route path="/ncr/foundation/metric/:metricId" component={FoundationMetricDetail} />
      <Route path="/ncr/foundation/donors" component={NcrFoundationWithTabs} />
      <Route path="/ncr/foundation/grants" component={NcrFoundationWithTabs} />
      <Route path="/ncr/foundation/endowment" component={NcrFoundationWithTabs} />
      <Route path="/ncr/foundation/impact" component={NcrFoundationWithTabs} />
      <Route path="/ncr/foundation" component={NcrFoundationWithTabs} />
      <Route path="/other" component={OtherWithTabs} />
      <Route path="/temporary" component={Temporary} />
      <Route path="/temporary/interviews/:personId" component={Temporary} />
      <Route path="/temporary/tech-stack" component={Temporary} />
      <Route path="/temporary/tech-stack/:productId" component={Temporary} />
      <Route path="/temporary/technology-categories" component={Temporary} />
      <Route path="/temporary/optimization-ideas" component={Temporary} />
      <Route path="/temporary/risk-compliance" component={Temporary} />
      <Route path="/temporary/infrastructure" component={Temporary} />
      
      <Route path="/campaigns/active" component={CampaignsWithTabs} />
      <Route path="/campaigns/planned" component={CampaignsWithTabs} />
      <Route path="/campaigns/completed" component={CampaignsWithTabs} />
      <Route path="/campaigns/performance" component={CampaignsWithTabs} />
      <Route path="/campaigns/goals" component={CampaignsWithTabs} />
      <Route path="/campaigns/trends" component={CampaignsWithTabs} />
      <Route path="/campaigns/:id" component={CampaignDetail} />
      <Route path="/campaigns" component={CampaignsWithTabs} />
      <Route path="/data-health" component={DataHealth} />
      <Route path="/integrations" component={Integrations} />
      <Route path="/integrations-2" component={Integrations2} />
      <Route path="/settings" component={Settings} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/profile" component={Profile} />
      
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
      
      {/* Reporting - Impact Intelligence */}
      <Route path="/reporting/visuals" component={ReportingVisuals} />
      <Route path="/reporting/impact-intelligence/feed" component={ImpactIntelligence} />
      <Route path="/reporting/impact-intelligence" component={ImpactIntelligence} />
      
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
      <Route path="/workflows/templates" component={WorkflowTemplates} />
      <Route path="/workflows/:id/canvas" component={WorkflowCanvas} />
      <Route path="/workflows" component={OtherWithTabs} />
      
      {/* Logo Preview */}
      <Route path="/logo-preview" component={LogoPreview} />
      
      {/* Hero Preview */}
      <Route path="/hero-preview" component={HeroPreview} />
      
      {/* Navigation Previews */}
      <Route path="/navigation-mega-menu-preview" component={NavigationMegaMenuPreview} />
      
      <Route component={NotFound} />
    </Switch>
  );
}


type TopTab = 'Philanthropy' | 'Fundraising' | 'Agentic Plan';

function App() {
  const [location, navigate] = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<DomainKey | null>(null);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [selectedTopTab, setSelectedTopTab] = useState<TopTab>('Philanthropy');
  
  // Get the current tab from URL query params for Agentic Plan navigation
  const getTabFromUrl = () => {
    if (typeof window === 'undefined') return 'overview';
    return new URLSearchParams(window.location.search).get('tab') || 'overview';
  };
  
  const [currentTabParam, setCurrentTabParam] = useState(getTabFromUrl);
  
  // Sync tab state when location or URL changes
  useEffect(() => {
    const updateTab = () => setCurrentTabParam(getTabFromUrl());
    updateTab();
    
    // Poll for query string changes since wouter doesn't track them
    const interval = setInterval(updateTab, 100);
    window.addEventListener('popstate', updateTab);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('popstate', updateTab);
    };
  }, [location]);

  // Helper to check if a nav item is active based on current path
  const isNavActive = (navItem: string): boolean => {
    switch (navItem) {
      case 'ncr-overview':
        return location.startsWith('/ncr') && !location.startsWith('/ncr/foundation');
      case 'foundation':
        return location.startsWith('/ncr/foundation');
      case 'corporations':
        return location.startsWith('/corporate-partnerships');
      case 'quadrant':
        return location.startsWith('/quadrant') || location === '/donor-quadrant';
      case 'relationships':
        return location.startsWith('/relationships');
      case 'fundraising':
        return location.startsWith('/donors') || 
               location.startsWith('/pipeline') || 
               location.startsWith('/gifts') || 
               location.startsWith('/grants') || 
               location.startsWith('/campaigns') || 
               location.startsWith('/events');
      case 'ai-tools':
        return location.startsWith('/ai-tools');
      case 'special-projects':
        return location.startsWith('/temporary');
      case 'agent-value-map':
        return location.startsWith('/agent-value-map');
      default:
        return false;
    }
  };

  const handleDropdownClick = (domain: DomainKey) => {
    if (activeDropdown === domain) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(domain);
    }
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const topTabs: TopTab[] = ['Philanthropy', 'Fundraising', 'Agentic Plan'];

  const agenticPlanNavItems = [
    { name: 'Overview', tab: 'overview' },
    { name: 'Framework', tab: 'framework' },
    { name: 'Agents', tab: 'agents' },
    { name: 'Roadmap', tab: 'roadmap' },
    { name: 'App Shell', tab: 'appshell' },
    { name: 'Governance', tab: 'governance' },
    { name: 'Scorecard', tab: 'scorecard' },
    { name: 'Tech Stack', tab: 'techstack' },
  ];

  const assessmentNavItems = [
    { name: 'On Site Interviews', path: '/temporary' },
    { name: 'Tech Stack', path: '/temporary/tech-stack' },
    { name: 'Technology Categories', path: '/temporary/technology-categories' },
    { name: 'Optimization Ideas', path: '/temporary/optimization-ideas' },
    { name: 'Risk & Compliance', path: '/temporary/risk-compliance' },
    { name: 'Infrastructure', path: '/temporary/infrastructure' },
  ];

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
            {/* Top Blue Tab Bar */}
            <div 
              className="flex items-end h-10 px-6 shrink-0"
              style={{ backgroundColor: '#1B3A5A' }}
            >
              <div className="flex items-end gap-0">
                {topTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setSelectedTopTab(tab);
                      if (tab === 'Agentic Plan') {
                        navigate('/agent-value-map?tab=overview');
                      } else if (tab === 'Fundraising') {
                        navigate('/temporary');
                      } else if (tab === 'Philanthropy') {
                        navigate('/quadrant');
                      }
                    }}
                    className={`px-5 py-2 text-sm font-medium transition-colors ${
                      selectedTopTab === tab
                        ? 'text-[#1B3A5A] rounded-t-md'
                        : 'text-white/80 hover:text-white hover:bg-white/10 rounded-t-md'
                    }`}
                    style={selectedTopTab === tab ? { backgroundColor: '#EEF9FB' } : {}}
                    data-testid={`top-tab-${tab.toLowerCase()}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Top Header Navigation */}
            <header 
              className="flex items-center gap-6 h-16 px-6 border-b shrink-0"
              style={{ backgroundColor: '#EEF9FB' }}
            >
              {/* Logo / Home Link */}
              <Link href="/">
                <div className="cursor-pointer hover:opacity-80 transition-opacity" data-testid="link-home">
                  <img src={ncrLogo} alt="NCR Logo" className="h-5 w-auto" />
                </div>
              </Link>
              
              <div className="flex items-center gap-3 ml-auto">
                  {/* Dropdown Navigation - Conditional based on top tab */}
                  <nav className="flex items-center gap-0.5">
                    {selectedTopTab === 'Agentic Plan' ? (
                      <>
                        {agenticPlanNavItems.map((item) => {
                          const isActive = location.startsWith('/agent-value-map') && currentTabParam === item.tab;
                          return (
                            <Link key={item.tab} href={`/agent-value-map?tab=${item.tab}`}>
                              <div className={`relative ${isActive ? 'after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-primary after:rounded-full' : ''}`}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="font-semibold text-sm text-gray-700 hover:bg-black/10"
                                  data-testid={`button-nav-agentic-${item.tab}`}
                                >
                                  {item.name}
                                </Button>
                              </div>
                            </Link>
                          );
                        })}
                      </>
                    ) : selectedTopTab === 'Fundraising' ? (
                      <>
                        {assessmentNavItems.map((item) => (
                          <Link key={item.path} href={item.path}>
                            <div className={`relative ${location === item.path || (location.startsWith(item.path) && item.path !== '/temporary') || (location === '/temporary' && item.path === '/temporary' && !location.includes('/temporary/')) ? 'after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-primary after:rounded-full' : ''}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="font-semibold text-sm text-gray-700 hover:bg-black/10"
                                data-testid={`button-nav-assessment-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                              >
                                {item.name}
                              </Button>
                            </div>
                          </Link>
                        ))}
                      </>
                    ) : (
                      <>
                        {/* Quadrant - Direct Link (First Item) */}
                        <Link href="/quadrant">
                          <div className={`relative ${isNavActive('quadrant') ? 'after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-primary after:rounded-full' : ''}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="font-semibold text-sm text-gray-700 hover:bg-black/10"
                              data-testid="button-nav-quadrant"
                            >
                              Quadrant
                            </Button>
                          </div>
                        </Link>

                        {/* Relationships - Direct Link */}
                        <Link href="/relationships">
                          <div className={`relative ${isNavActive('relationships') ? 'after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-primary after:rounded-full' : ''}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="font-semibold text-sm text-gray-700 hover:bg-black/10"
                              data-testid="button-nav-relationships"
                            >
                              Relationships
                            </Button>
                          </div>
                        </Link>

                        {/* Reporting Dropdown */}
                    <div
                      className="relative"
                      onMouseEnter={() => setActiveDropdown("Reporting")}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className={`relative ${isNavActive('ncr-overview') ? 'after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-primary after:rounded-full' : ''}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDropdownClick("Reporting")}
                          className={`font-semibold gap-1 text-sm text-gray-700 hover:bg-black/10 ${
                            activeDropdown === "Reporting" ? "bg-black/10" : ""
                          }`}
                          data-testid="button-nav-ncr-overview"
                        >
                          Reporting
                          <ChevronDown className={`h-3 w-3 transition-transform ${activeDropdown === "Reporting" ? "rotate-180" : ""}`} />
                        </Button>
                      </div>
                      {activeDropdown === "Reporting" && (
                        <div className="absolute left-0 top-full pt-1 z-50">
                          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl min-w-[180px] overflow-hidden">
                            <div className="py-2 px-1">
                              {navigationDomains["Reporting"].items.map((item) => (
                                <Link 
                                  key={item.name} 
                                  href={item.href}
                                  className="block mx-1 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 rounded-md transition-all duration-150"
                                  onClick={closeDropdown}
                                  data-testid={`link-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Our Foundation - Direct Link */}
                    <Link href="/ncr/foundation">
                      <div className={`relative ${isNavActive('foundation') ? 'after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-primary after:rounded-full' : ''}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="font-semibold text-sm text-gray-700 hover:bg-black/10"
                          data-testid="button-nav-foundation"
                        >
                          Our Foundation
                        </Button>
                      </div>
                    </Link>

                    {/* Corporations - Direct Link */}
                    <Link href="/corporate-partnerships">
                      <div className={`relative ${isNavActive('corporations') ? 'after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-primary after:rounded-full' : ''}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="font-semibold text-sm text-gray-700 hover:bg-black/10"
                          data-testid="button-nav-corporations"
                        >
                          Corporations
                        </Button>
                      </div>
                    </Link>

                    {/* Fundraising Dropdown */}
                    <div
                      className="relative"
                      onMouseEnter={() => setActiveDropdown("Fundraising")}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className={`relative ${isNavActive('assessment') ? 'after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-primary after:rounded-full' : ''}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDropdownClick("Fundraising")}
                          className={`font-semibold gap-1 text-sm text-gray-700 hover:bg-black/10 ${
                            activeDropdown === "Fundraising" ? "bg-black/10" : ""
                          }`}
                          data-testid="button-nav-assessment"
                        >
                          Fundraising
                          <ChevronDown className={`h-3 w-3 transition-transform ${activeDropdown === "Fundraising" ? "rotate-180" : ""}`} />
                        </Button>
                      </div>
                      {activeDropdown === "Fundraising" && (
                        <div className="absolute right-0 top-full pt-1 z-50">
                          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl min-w-[180px] overflow-hidden">
                            <div className="py-2 px-1">
                              {navigationDomains["Fundraising"].items.map((item) => (
                                <Link 
                                  key={item.name} 
                                  href={item.href}
                                  className="block mx-1 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 rounded-md transition-all duration-150"
                                  onClick={closeDropdown}
                                  data-testid={`link-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* AI Tools Dropdown */}
                    <div 
                      className="relative"
                      onMouseEnter={() => handleDropdownClick("AI Tools")}
                      onMouseLeave={closeDropdown}
                    >
                      <div className={`relative ${isNavActive('ai-tools') ? 'after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-primary after:rounded-full' : ''}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDropdownClick("AI Tools")}
                          className={`font-semibold gap-1 text-sm text-gray-700 hover:bg-black/10 ${
                            activeDropdown === "AI Tools" ? "bg-black/10" : ""
                          }`}
                          data-testid="button-nav-ai-tools"
                        >
                          AI Tools
                          <ChevronDown className={`h-3 w-3 transition-transform ${activeDropdown === "AI Tools" ? "rotate-180" : ""}`} />
                        </Button>
                      </div>
                      {activeDropdown === "AI Tools" && (
                        <div className="absolute right-0 top-full pt-1 z-50">
                          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl min-w-[180px] overflow-hidden">
                            <div className="py-2 px-1">
                              {navigationDomains["AI Tools"].items.map((item) => (
                                <Link 
                                  key={item.name} 
                                  href={item.href}
                                  className="block mx-1 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 rounded-md transition-all duration-150"
                                  onClick={closeDropdown}
                                  data-testid={`link-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                      </>
                    )}
                  </nav>
                  
                  {/* Separator */}
                  <div className="h-6 w-px bg-gray-400" />
                  
                  {/* Hamburger Menu */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setHamburgerOpen(true)}
                    onMouseLeave={() => setHamburgerOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setHamburgerOpen(!hamburgerOpen)}
                      data-testid="button-hamburger-menu"
                      aria-label="Menu"
                      className="text-gray-700 hover:bg-black/10 relative"
                    >
                      <Menu className="h-5 w-5" />
                      {/* Notification Badge */}
                      <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-[#EEF9FB]" />
                    </Button>

                    {/* Hamburger Dropdown */}
                    {hamburgerOpen && (
                      <div className="absolute right-0 top-full pt-1 z-50">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl min-w-[200px] overflow-hidden">
                          <div className="py-2 px-1">
                            <button
                              className="flex items-center gap-3 w-full mx-1 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 rounded-md transition-all duration-150"
                              onClick={() => {
                                setHamburgerOpen(false);
                                openCommandPalette();
                              }}
                              data-testid="button-global-search"
                            >
                              <Search className="h-4 w-4" />
                              Search
                              <span className="ml-auto text-xs text-gray-400">⌘K</span>
                            </button>
                            <Link href="/notifications">
                              <a
                                className="flex items-center gap-3 w-full mx-1 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 rounded-md transition-all duration-150"
                                onClick={() => setHamburgerOpen(false)}
                                data-testid="button-notifications"
                              >
                                <Bell className="h-4 w-4" />
                                Notifications
                                <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
                              </a>
                            </Link>
                            <div className="my-1.5 mx-2 h-px bg-gray-200 dark:bg-gray-700" />
                            <Link href="/settings">
                              <a
                                className="flex items-center gap-3 w-full mx-1 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 rounded-md transition-all duration-150"
                                onClick={() => setHamburgerOpen(false)}
                                data-testid="button-settings"
                              >
                                <SettingsIcon className="h-4 w-4" />
                                Settings
                              </a>
                            </Link>
                            <Link href="/profile">
                              <a
                                className="flex items-center gap-3 w-full mx-1 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 rounded-md transition-all duration-150"
                                onClick={() => setHamburgerOpen(false)}
                                data-testid="button-account"
                              >
                                <User className="h-4 w-4" />
                                Profile
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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
