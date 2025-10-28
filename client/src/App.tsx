import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NotFound from "@/pages/not-found";
import DashboardMGO from "@/pages/dashboard-mgo";
import DashboardDevDirector from "@/pages/dashboard-dev-director";
import DashboardCEO from "@/pages/dashboard-ceo";
import Donors from "@/pages/donors";
import Donor360 from "@/pages/donor-360";
import Pipeline from "@/pages/pipeline";
import Grants from "@/pages/grants";
import Gifts from "@/pages/gifts";
import Campaigns from "@/pages/campaigns";
import DataHealth from "@/pages/data-health";
import Settings from "@/pages/settings";
import Integrations from "@/pages/integrations";

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
      <Route path="/donors/:id" component={Donor360} />
      <Route path="/donors" component={Donors} />
      <Route path="/pipeline" component={Pipeline} />
      <Route path="/grants" component={Grants} />
      <Route path="/gifts" component={Gifts} />
      <Route path="/campaigns" component={Campaigns} />
      <Route path="/data-health" component={DataHealth} />
      <Route path="/integrations" component={Integrations} />
      <Route path="/settings" component={Settings} />
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
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="flex items-center justify-between h-16 px-6 border-b shrink-0">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">FundRazor</span>
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
