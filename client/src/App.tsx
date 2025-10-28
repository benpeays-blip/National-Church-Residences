import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import NotFound from "@/pages/not-found";
import DashboardMGO from "@/pages/dashboard-mgo";
import DashboardDevDirector from "@/pages/dashboard-dev-director";
import DashboardCEO from "@/pages/dashboard-ceo";
import Donors from "@/pages/donors";
import Pipeline from "@/pages/pipeline";
import Gifts from "@/pages/gifts";
import Campaigns from "@/pages/campaigns";
import DataHealth from "@/pages/data-health";
import Settings from "@/pages/settings";
import { Skeleton } from "@/components/ui/skeleton";

function Dashboard() {
  const { user } = useAuth();

  if (user?.role === "CEO") {
    return <DashboardCEO />;
  } else if (user?.role === "DEV_DIRECTOR") {
    return <DashboardDevDirector />;
  } else {
    return <DashboardMGO />;
  }
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/donors" component={Donors} />
      <Route path="/pipeline" component={Pipeline} />
      <Route path="/gifts" component={Gifts} />
      <Route path="/campaigns" component={Campaigns} />
      <Route path="/data-health" component={DataHealth} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AuthenticatedApp() {
  const style = {
    "--sidebar-width": "15rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
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
  );
}

function LoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <Skeleton className="h-12 w-12 rounded-full mx-auto" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </div>
    </div>
  );
}

function LoginScreen() {
  return (
    <div className="flex h-screen items-center justify-center bg-muted/20">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg mx-4">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-lg bg-primary mx-auto flex items-center justify-center mb-4">
            <span className="text-primary-foreground font-bold text-2xl">FR</span>
          </div>
          <h1 className="text-2xl font-bold">Welcome to FundRazor</h1>
          <p className="text-sm text-muted-foreground">
            AI-powered donor management and fundraising intelligence
          </p>
        </div>
        <a
          href="/api/login"
          className="flex items-center justify-center w-full h-10 px-4 bg-primary text-primary-foreground rounded-md font-medium hover-elevate active-elevate-2"
          data-testid="button-login"
        >
          Sign in with Replit
        </a>
      </div>
    </div>
  );
}

function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (user) {
    return <AuthenticatedApp />;
  }

  return <LoginScreen />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
