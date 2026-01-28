import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Command, 
  Layers, 
  Grid, 
  Palette,
  LayoutDashboard,
  Users,
  Target,
  TrendingUp,
  Gift,
  Brain,
  Network,
  Sparkles,
  ChevronRight,
  Search,
  Menu,
  Home,
  Check
} from "lucide-react";

export default function NavigationMockups() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Navigation Options Visual Mockups</h1>
        <p className="text-sm text-muted-foreground">
          See what each navigation pattern (A-E) would look like on your home screen
        </p>
      </div>

      {/* Current Selection Badge */}
      <Card className="border-primary/50 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-primary" />
            <div>
              <p className="font-semibold">Currently Implemented: Option B - Command Surface</p>
              <p className="text-sm text-muted-foreground">You're seeing this pattern throughout the app with the sidebar and ⌘K command palette</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Option A: Focus Hubs */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-950 flex items-center justify-center">
                <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  Option A: Focus Hubs
                  <Badge variant="outline" className="text-xs">Linear / Vercel</Badge>
                </CardTitle>
                <CardDescription>Lightning-fast hub switching with minimal chrome</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Visual Mockup */}
          <div className="border rounded-lg overflow-hidden bg-background">
            {/* Top Bar */}
            <div className="h-12 border-b bg-card flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm">FundRazor</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-muted" />
                <div className="w-8 h-8 rounded bg-muted" />
              </div>
            </div>
            
            <div className="flex h-96">
              {/* Icon-Only Sidebar */}
              <div className="w-16 border-r bg-card flex flex-col items-center gap-2 py-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-primary" />
                </div>
                <div className="w-10 h-10 rounded-lg hover-elevate flex items-center justify-center">
                  <Users className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="w-10 h-10 rounded-lg hover-elevate flex items-center justify-center">
                  <Target className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="w-10 h-10 rounded-lg hover-elevate flex items-center justify-center">
                  <Brain className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="w-10 h-10 rounded-lg hover-elevate flex items-center justify-center">
                  <Network className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              {/* Main Content with Tab Rail */}
              <div className="flex-1 flex flex-col">
                {/* Horizontal Tab Rail */}
                <div className="h-12 border-b bg-card/50 backdrop-blur-sm flex items-center gap-1 px-6">
                  <div className="px-4 py-2 rounded-md bg-primary/10 text-primary text-sm font-medium border-b-2 border-primary">
                    Overview
                  </div>
                  <div className="px-4 py-2 rounded-md hover-elevate text-sm text-muted-foreground">
                    Analytics
                  </div>
                  <div className="px-4 py-2 rounded-md hover-elevate text-sm text-muted-foreground">
                    Reports
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 rounded-lg border bg-card p-4">
                      <div className="text-xs text-muted-foreground">YTD Raised</div>
                      <div className="text-2xl font-bold mt-1">$2.1M</div>
                    </div>
                    <div className="h-24 rounded-lg border bg-card p-4">
                      <div className="text-xs text-muted-foreground">Pipeline</div>
                      <div className="text-2xl font-bold mt-1">$4.5M</div>
                    </div>
                    <div className="h-24 rounded-lg border bg-card p-4">
                      <div className="text-xs text-muted-foreground">Active Donors</div>
                      <div className="text-2xl font-bold mt-1">342</div>
                    </div>
                  </div>
                  <div className="h-32 rounded-lg border bg-card" />
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Icon-only sidebar maximizes screen space</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Top tab rail with inline metrics</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>⌘⇧←/→ to cycle between tabs</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Hover icons for tooltips</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Option B: Command Surface (CURRENT) */}
      <Card className="border-primary/50">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                <Command className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  Option B: Command Surface
                  <Badge variant="default" className="text-xs">CURRENT</Badge>
                  <Badge variant="outline" className="text-xs">Notion / Superhuman</Badge>
                </CardTitle>
                <CardDescription>Keyboard-first navigation with powerful search</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Visual Mockup */}
          <div className="border rounded-lg overflow-hidden bg-background">
            {/* Top Bar */}
            <div className="h-12 border-b bg-card flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <Menu className="w-5 h-5" />
                <span className="font-semibold text-sm">FundRazor</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-md bg-muted text-xs flex items-center gap-2">
                  <Search className="w-3 h-3" />
                  <span>⌘K</span>
                </div>
                <div className="w-8 h-8 rounded bg-muted" />
              </div>
            </div>
            
            <div className="flex h-96">
              {/* Text Sidebar */}
              <div className="w-56 border-r bg-card p-4 space-y-1">
                <div className="text-xs font-semibold text-muted-foreground px-2 mb-2">OVERVIEW</div>
                <div className="px-3 py-2 rounded-md bg-primary/10 text-primary text-sm font-medium flex items-center justify-between">
                  <span>Dashboard</span>
                  <LayoutDashboard className="w-4 h-4" />
                </div>
                <div className="px-3 py-2 rounded-md hover-elevate text-sm flex items-center justify-between">
                  <span>Solutions</span>
                  <Sparkles className="w-4 h-4" />
                </div>
                
                <div className="text-xs font-semibold text-muted-foreground px-2 mt-4 mb-2">INTELLIGENCE</div>
                <div className="px-3 py-2 rounded-md hover-elevate text-sm flex items-center justify-between">
                  <span>Donors</span>
                  <Users className="w-4 h-4" />
                </div>
                <div className="px-3 py-2 rounded-md hover-elevate text-sm flex items-center justify-between">
                  <span>Wealth Events</span>
                  <TrendingUp className="w-4 h-4" />
                </div>

                <div className="text-xs font-semibold text-muted-foreground px-2 mt-4 mb-2">OPERATIONS</div>
                <div className="px-3 py-2 rounded-md hover-elevate text-sm flex items-center justify-between">
                  <span>Pipeline</span>
                  <Target className="w-4 h-4" />
                </div>
                <div className="px-3 py-2 rounded-md hover-elevate text-sm flex items-center justify-between">
                  <span>Gifts</span>
                  <Gift className="w-4 h-4" />
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">Development Director Dashboard</h2>
                  <p className="text-sm text-muted-foreground">Your fundraising command center</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 rounded-lg border bg-card p-4">
                    <div className="text-xs text-muted-foreground">YTD Raised</div>
                    <div className="text-2xl font-bold mt-1">$2.1M</div>
                  </div>
                  <div className="h-24 rounded-lg border bg-card p-4">
                    <div className="text-xs text-muted-foreground">Pipeline</div>
                    <div className="text-2xl font-bold mt-1">$4.5M</div>
                  </div>
                  <div className="h-24 rounded-lg border bg-card p-4">
                    <div className="text-xs text-muted-foreground">Active Donors</div>
                    <div className="text-2xl font-bold mt-1">342</div>
                  </div>
                </div>
                <div className="h-32 rounded-lg border bg-card" />
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Text-based sidebar with grouped sections</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>⌘K command palette for instant navigation</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Fuzzy search across all pages</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Mobile-optimized with excellent accessibility</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Option C: Progressive Masthead */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  Option C: Progressive Masthead
                  <Badge variant="outline" className="text-xs">Stripe / Figma</Badge>
                </CardTitle>
                <CardDescription>Elegant hierarchy with breadcrumb context</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Visual Mockup */}
          <div className="border rounded-lg overflow-hidden bg-background">
            {/* Top Bar */}
            <div className="h-12 border-b bg-card flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm">FundRazor</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-muted" />
                <div className="w-8 h-8 rounded bg-muted" />
              </div>
            </div>

            {/* Masthead Bar with Tabs & Breadcrumb */}
            <div className="h-16 border-b bg-gradient-to-r from-primary/5 to-transparent px-6 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm">
                  <Home className="w-4 h-4 text-muted-foreground" />
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  <span className="font-medium">Dashboard</span>
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Overview</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-4 py-2 rounded-md bg-card border text-sm font-medium">
                  Overview
                </div>
                <div className="px-4 py-2 rounded-md hover-elevate text-sm text-muted-foreground">
                  Analytics
                </div>
                <div className="px-4 py-2 rounded-md hover-elevate text-sm text-muted-foreground">
                  Reports
                </div>
              </div>
            </div>
            
            <div className="flex h-80">
              {/* Icon Sidebar */}
              <div className="w-16 border-r bg-card flex flex-col items-center gap-2 py-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-primary" />
                </div>
                <div className="w-10 h-10 rounded-lg hover-elevate flex items-center justify-center">
                  <Users className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="w-10 h-10 rounded-lg hover-elevate flex items-center justify-center">
                  <Target className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="w-10 h-10 rounded-lg hover-elevate flex items-center justify-center">
                  <Brain className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-20 rounded-lg border bg-card p-4">
                    <div className="text-xs text-muted-foreground">YTD Raised</div>
                    <div className="text-2xl font-bold mt-1">$2.1M</div>
                  </div>
                  <div className="h-20 rounded-lg border bg-card p-4">
                    <div className="text-xs text-muted-foreground">Pipeline</div>
                    <div className="text-2xl font-bold mt-1">$4.5M</div>
                  </div>
                  <div className="h-20 rounded-lg border bg-card p-4">
                    <div className="text-xs text-muted-foreground">Active Donors</div>
                    <div className="text-2xl font-bold mt-1">342</div>
                  </div>
                </div>
                <div className="h-28 rounded-lg border bg-card" />
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Animated masthead with gradient backdrop</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Breadcrumb trail shows navigation context</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Icon-only sidebar with tooltips</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Great for analytics-heavy pages</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Option D: Adaptive Matrix */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-950 flex items-center justify-center">
                <Grid className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  Option D: Adaptive Matrix
                  <Badge variant="outline" className="text-xs">Monday.com / Airtable</Badge>
                </CardTitle>
                <CardDescription>Personalized workflows with context retention</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Visual Mockup */}
          <div className="border rounded-lg overflow-hidden bg-background">
            {/* Top Bar */}
            <div className="h-12 border-b bg-card flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm">FundRazor</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                  JD
                </div>
              </div>
            </div>
            
            <div className="flex h-96">
              {/* Icon Sidebar with Quick Create */}
              <div className="w-16 border-r bg-card flex flex-col items-center gap-2 py-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white text-xl font-bold">
                  +
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mt-2">
                  <LayoutDashboard className="w-5 h-5 text-primary" />
                </div>
                <div className="w-10 h-10 rounded-lg hover-elevate flex items-center justify-center">
                  <Users className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="w-10 h-10 rounded-lg hover-elevate flex items-center justify-center">
                  <Target className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              {/* Split Content Area */}
              <div className="flex-1 flex flex-col">
                {/* Tab Chips Zone */}
                <div className="h-14 border-b bg-card/50 flex items-center gap-2 px-6 overflow-x-auto">
                  <div className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium whitespace-nowrap flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white" />
                    Overview
                  </div>
                  <div className="px-4 py-2 rounded-full border hover-elevate text-sm whitespace-nowrap flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Analytics
                  </div>
                  <div className="px-4 py-2 rounded-full border hover-elevate text-sm whitespace-nowrap flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    My View
                  </div>
                </div>

                {/* Content Area (auto-loads last viewed) */}
                <div className="flex-1 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold">Dashboard Overview</h2>
                      <p className="text-xs text-muted-foreground">Last viewed: 2 minutes ago</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 rounded-lg border bg-card p-4">
                      <div className="text-xs text-muted-foreground">YTD Raised</div>
                      <div className="text-2xl font-bold mt-1">$2.1M</div>
                    </div>
                    <div className="h-24 rounded-lg border bg-card p-4">
                      <div className="text-xs text-muted-foreground">Pipeline</div>
                      <div className="text-2xl font-bold mt-1">$4.5M</div>
                    </div>
                    <div className="h-24 rounded-lg border bg-card p-4">
                      <div className="text-xs text-muted-foreground">Active Donors</div>
                      <div className="text-2xl font-bold mt-1">342</div>
                    </div>
                  </div>
                  <div className="h-28 rounded-lg border bg-card" />
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Chip-style tabs that wrap on mobile</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Auto-loads your last-viewed tab</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Quick-create button for new items</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Personalized experience per user</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Option E: Dual-Mode Ribbon */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-950 flex items-center justify-center">
                <Palette className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  Option E: Dual-Mode Ribbon
                  <Badge variant="outline" className="text-xs">Pitch / Canva</Badge>
                </CardTitle>
                <CardDescription>Rich visual feedback with feature discovery</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Visual Mockup */}
          <div className="border rounded-lg overflow-hidden bg-background">
            {/* Top Bar */}
            <div className="h-12 border-b bg-card flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm">FundRazor</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">3 new</Badge>
                <div className="w-8 h-8 rounded bg-muted" />
              </div>
            </div>

            {/* Ribbon Toolbar */}
            <div className="h-20 border-b bg-gradient-to-b from-card to-card/50 px-6 py-3">
              <div className="flex items-center gap-6">
                {/* Grouped Tabs */}
                <div className="flex items-center gap-1">
                  <div className="text-xs font-semibold text-muted-foreground mr-2">VIEW</div>
                  <div className="px-3 py-2 rounded-md bg-primary/10 text-primary text-sm font-medium border border-primary/20 relative">
                    Overview
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </div>
                  <div className="px-3 py-2 rounded-md hover-elevate text-sm">
                    Analytics
                  </div>
                  <div className="px-3 py-2 rounded-md hover-elevate text-sm">
                    Reports
                  </div>
                </div>

                <div className="w-px h-8 bg-border" />

                <div className="flex items-center gap-1">
                  <div className="text-xs font-semibold text-muted-foreground mr-2">TOOLS</div>
                  <div className="px-3 py-2 rounded-md hover-elevate text-sm">
                    Export
                  </div>
                  <div className="px-3 py-2 rounded-md hover-elevate text-sm">
                    Share
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex h-80">
              {/* Sidebar with Active Hub Text */}
              <div className="w-48 border-r bg-card p-4 space-y-2">
                <div className="px-3 py-2 rounded-md bg-primary/10 text-primary text-sm font-medium flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </div>
                <div className="px-3 py-2 rounded-md hover-elevate text-sm flex items-center gap-2">
                  <Users className="w-4 h-4" />
                </div>
                <div className="px-3 py-2 rounded-md hover-elevate text-sm flex items-center gap-2">
                  <Target className="w-4 h-4" />
                </div>
                <div className="px-3 py-2 rounded-md hover-elevate text-sm flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-20 rounded-lg border bg-card p-4">
                    <div className="text-xs text-muted-foreground">YTD Raised</div>
                    <div className="text-2xl font-bold mt-1">$2.1M</div>
                  </div>
                  <div className="h-20 rounded-lg border bg-card p-4">
                    <div className="text-xs text-muted-foreground">Pipeline</div>
                    <div className="text-2xl font-bold mt-1">$4.5M</div>
                  </div>
                  <div className="h-20 rounded-lg border bg-card p-4">
                    <div className="text-xs text-muted-foreground">Active Donors</div>
                    <div className="text-2xl font-bold mt-1">342</div>
                  </div>
                </div>
                <div className="h-28 rounded-lg border bg-card" />
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Ribbon toolbar with grouped tabs</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Hover tabs for rich preview cards</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Badge indicators for new/unread items</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Spacebar to collapse ribbon (focus mode)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Decision Guide</CardTitle>
          <CardDescription>Which option is right for you?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 rounded-lg border bg-card">
            <div className="font-semibold text-sm mb-2">Choose Option A (Focus Hubs) if:</div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• You want maximum screen space for content</li>
              <li>• Your users are power users who prefer keyboard shortcuts</li>
              <li>• You value speed and minimalism over discoverability</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg border bg-primary/5 border-primary/50">
            <div className="font-semibold text-sm mb-2">Choose Option B (Command Surface) if: ✓ RECOMMENDED</div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• You want the best balance of speed, accessibility, and discoverability</li>
              <li>• Your users need to jump between many different sections quickly</li>
              <li>• Mobile support is important</li>
              <li>• You want proven patterns from industry leaders (Notion, Superhuman)</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <div className="font-semibold text-sm mb-2">Choose Option C (Progressive Masthead) if:</div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Your app is analytics-heavy with deep hierarchies</li>
              <li>• Users need breadcrumb context to know where they are</li>
              <li>• You want an elegant, professional aesthetic</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <div className="font-semibold text-sm mb-2">Choose Option D (Adaptive Matrix) if:</div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Personalization is critical to your app</li>
              <li>• Multiple users share the same workspace</li>
              <li>• You want innovative interaction patterns</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <div className="font-semibold text-sm mb-2">Choose Option E (Dual-Mode Ribbon) if:</div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Feature discovery is more important than minimalism</li>
              <li>• You have many tools/actions per page</li>
              <li>• Your users prefer rich visual feedback</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
