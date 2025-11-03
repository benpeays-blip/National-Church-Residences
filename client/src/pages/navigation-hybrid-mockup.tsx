import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  Target,
  BarChart3,
  Sparkles,
  Settings,
  FileText,
  Calendar,
  Gift,
  Database,
  Search,
  Bell,
  User,
  Menu,
  ChevronRight
} from "lucide-react";

interface MockSection {
  id: string;
  name: string;
  icon: any;
  tabs: string[];
  description: string;
}

const mockSections: MockSection[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
    tabs: ["Overview", "Dev Director", "Major Gifts Officer", "CEO"],
    description: "Role-specific dashboards with key metrics"
  },
  {
    id: "donors",
    name: "Donors",
    icon: Users,
    tabs: ["All Donors", "Major Gifts", "LYBUNT", "SYBUNT", "Prospects"],
    description: "Comprehensive donor database and segmentation"
  },
  {
    id: "opportunities",
    name: "Opportunities",
    icon: Target,
    tabs: ["Pipeline", "Cultivation", "Solicitation", "Closed Won", "Lost"],
    description: "Fundraising pipeline and opportunity tracking"
  },
  {
    id: "grants",
    name: "Grants",
    icon: FileText,
    tabs: ["Active Grants", "Proposals", "Reporting", "Calendar", "Archive"],
    description: "Grant management and proposal tracking"
  },
  {
    id: "campaigns",
    name: "Campaigns",
    icon: TrendingUp,
    tabs: ["All Campaigns", "Annual Fund", "Capital", "Planned Giving", "Events"],
    description: "Campaign management and performance tracking"
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: BarChart3,
    tabs: ["Overview", "Pipeline", "Forecast", "Benchmarks", "Trends"],
    description: "Advanced analytics and reporting"
  },
];

export default function NavigationHybridMockup() {
  return (
    <div className="min-h-screen p-8 space-y-8 bg-muted/30">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>Navigation Design</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Hybrid Pattern</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Hybrid Navigation Pattern</h1>
        <p className="text-muted-foreground text-lg mb-6">
          Sidebar with icon + text labels (primary navigation) + Top tabs (contextual navigation)
        </p>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold">Immediate Recognition</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                No guessing icon meanings - text labels provide instant clarity
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold">Visual Hierarchy</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Clear separation between primary (sidebar) and secondary (tabs) navigation
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold">Enterprise Standard</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Used by Linear, Notion, Microsoft Teams, and Salesforce
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Interactive Mockups */}
      <div className="max-w-7xl mx-auto space-y-6">
        {mockSections.map((section) => (
          <Card key={section.id} className="overflow-hidden">
            <CardHeader className="bg-muted/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{section.name}</CardTitle>
                    <CardDescription className="text-sm mt-0.5">
                      {section.description}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary">
                  {section.tabs.length} views
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Mockup Container */}
              <div className="border-t">
                {/* Mini Browser Chrome */}
                <div className="bg-muted/30 border-b px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 bg-background rounded px-3 py-1 text-xs text-muted-foreground">
                    fundrazor.app/{section.id.toLowerCase()}
                  </div>
                </div>

                {/* Mockup UI */}
                <div className="flex" style={{ height: "400px" }}>
                  {/* Sidebar Mockup */}
                  <div className="w-56 bg-sidebar border-r flex flex-col">
                    {/* Logo Area */}
                    <div className="h-16 border-b px-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <Database className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="font-bold text-sm">FundRazor</span>
                    </div>

                    {/* Navigation Items */}
                    <div className="flex-1 p-3 space-y-1 overflow-auto">
                      {mockSections.map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                            item.id === section.id
                              ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                              : 'text-sidebar-foreground hover-elevate'
                          }`}
                        >
                          <item.icon className="w-4 h-4 shrink-0" />
                          <span>{item.name}</span>
                        </div>
                      ))}
                      
                      <div className="pt-4 mt-4 border-t space-y-1">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground hover-elevate">
                          <Sparkles className="w-4 h-4 shrink-0" />
                          <span>AI Features</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground hover-elevate">
                          <Settings className="w-4 h-4 shrink-0" />
                          <span>Settings</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="flex-1 flex flex-col bg-background">
                    {/* Top Header with Tabs */}
                    <div className="border-b bg-background">
                      <div className="h-16 px-6 flex items-center justify-between border-b">
                        <div className="flex items-center gap-3">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Menu className="w-4 h-4" />
                          </Button>
                          <div>
                            <h2 className="font-semibold text-lg">{section.name}</h2>
                            <p className="text-xs text-muted-foreground">Manage and track {section.name.toLowerCase()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Search className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Bell className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <User className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Tabs Row */}
                      <div className="px-6 py-2 bg-muted/30">
                        <Tabs defaultValue={section.tabs[0]} className="w-full">
                          <TabsList className="bg-transparent gap-1 h-auto p-0">
                            {section.tabs.map((tab) => (
                              <TabsTrigger
                                key={tab}
                                value={tab}
                                className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md px-4 py-1.5 text-sm"
                                data-testid={`tab-${tab.toLowerCase().replace(/\s+/g, '-')}`}
                              >
                                {tab}
                              </TabsTrigger>
                            ))}
                          </TabsList>
                        </Tabs>
                      </div>
                    </div>

                    {/* Content Preview */}
                    <div className="flex-1 p-6 overflow-auto">
                      <div className="space-y-4">
                        {/* Mock Content Cards */}
                        <div className="grid grid-cols-3 gap-4">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="p-4 rounded-lg border bg-card/50 space-y-2"
                            >
                              <div className="h-3 bg-muted rounded w-3/4" />
                              <div className="h-2 bg-muted rounded w-1/2" />
                              <div className="h-2 bg-muted rounded w-2/3" />
                            </div>
                          ))}
                        </div>

                        {/* Mock Table */}
                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-muted/50 px-4 py-2 border-b">
                            <div className="h-3 bg-muted-foreground/20 rounded w-32" />
                          </div>
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="px-4 py-3 border-b last:border-b-0 flex items-center gap-4"
                            >
                              <div className="w-8 h-8 rounded-full bg-primary/10" />
                              <div className="flex-1 space-y-1.5">
                                <div className="h-2.5 bg-muted rounded w-1/3" />
                                <div className="h-2 bg-muted rounded w-1/4" />
                              </div>
                              <div className="h-2 bg-muted rounded w-16" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Implementation Notes */}
      <div className="max-w-7xl mx-auto">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Why This Pattern Works for FundRazor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Primary Navigation (Sidebar)</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Icon + text labels for instant recognition</li>
                  <li>• Persistent across all views</li>
                  <li>• Switches between major sections (Donors, Pipeline, etc.)</li>
                  <li>• Can collapse to icons only for more space</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Secondary Navigation (Tabs)</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Context-specific views within a section</li>
                  <li>• Easy switching between related data</li>
                  <li>• Changes based on sidebar selection</li>
                  <li>• Familiar pattern from enterprise apps</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-semibold text-sm mb-3">Real-World Example: Donors Section</h4>
              <div className="flex items-start gap-3 text-sm">
                <div className="flex-1">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Sidebar:</strong> Click "Donors" → Opens donor section
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Top Tabs:</strong> Switch between "All Donors", "Major Gifts", "LYBUNT", "SYBUNT", "Prospects"
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
