import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NotFound from "@/pages/not-found";
import logoUrl from "@assets/ChatGPT Image Nov 1, 2025, 09_08_53 AM_1762006163839.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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

const navSections = [
  {
    label: "Core",
    items: [
      { title: "Dashboard", path: "/" },
      { title: "Solutions", path: "/solutions" },
      { title: "Donors", path: "/donors" },
      { title: "Pipeline", path: "/pipeline" },
      { title: "Grants", path: "/grants" },
      { title: "Gifts", path: "/gifts" },
      { title: "Campaigns", path: "/campaigns" },
      { title: "Data Health", path: "/data-health" },
      { title: "Integrations", path: "/integrations" },
      { title: "Settings", path: "/settings" },
    ],
  },
  {
    label: "AI Intelligence",
    items: [
      { title: "Predictive Timing", path: "/ai/predictive-timing" },
      { title: "Wealth Events", path: "/ai/wealth-events" },
      { title: "Meeting Briefs", path: "/ai/meeting-briefs" },
      { title: "Voice-to-CRM", path: "/ai/voice-notes" },
    ],
  },
  {
    label: "Relationship Intel",
    items: [
      { title: "Board Connections", path: "/relationship/board-connections" },
      { title: "Board Network Mapper", path: "/relationship/board-network-mapper" },
      { title: "Corporate Partnerships", path: "/relationship/corporate-partnerships" },
      { title: "Peer Discovery", path: "/relationship/peer-donors" },
    ],
  },
  {
    label: "AI Content",
    items: [
      { title: "Outreach Generator", path: "/content/outreach" },
      { title: "Grant Proposals", path: "/content/grant-proposals" },
      { title: "Impact Reports", path: "/content/impact-reports" },
    ],
  },
  {
    label: "Analytics",
    items: [
      { title: "Peer Benchmarks", path: "/analytics/peer-benchmarks" },
      { title: "Donor Sentiment", path: "/analytics/sentiment" },
      { title: "Portfolio Optimization", path: "/analytics/portfolio-optimization" },
    ],
  },
  {
    label: "Workflows",
    items: [
      { title: "Smart Calendar", path: "/workflow/calendar" },
      { title: "Stewardship", path: "/workflow/stewardship" },
      { title: "Task Priorities", path: "/workflow/task-priorities" },
      { title: "Gift Registries", path: "/workflow/gift-registries" },
    ],
  },
  {
    label: "Workflow Builder",
    items: [
      { title: "Workflow Library", path: "/workflows" },
      { title: "Templates", path: "/workflows/templates" },
    ],
  },
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
    <NavigationMenu>
      <NavigationMenuList className="gap-1">
        {navSections.map((section) => {
          const isActive = activeSection === section.label;
          return (
            <NavigationMenuItem key={section.label}>
              <NavigationMenuTrigger
                className={`h-9 text-xs font-medium ${
                  isActive
                    ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`nav-tab-${section.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {section.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-48 gap-1 p-2">
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <NavigationMenuLink asChild>
                        <a
                          href={item.path}
                          className="block select-none rounded-md p-2 text-sm leading-none hover-elevate active-elevate-2 transition-colors"
                          data-testid={`nav-item-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          <div className="font-medium">{item.title}</div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
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
