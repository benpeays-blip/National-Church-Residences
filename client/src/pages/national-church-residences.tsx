import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  ArrowRight, 
  Users, 
  Target,
  TrendingUp,
  Brain,
  BarChart3,
  Heart,
  Home as HomeIcon,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  Award,
  Calendar,
  PieChart,
  ClipboardList
} from "lucide-react";
import { Link } from "wouter";
import ncrLogo from "@assets/image_1762185084577.png";

export default function NationalChurchResidences() {
  // NCR Brand Colors - Warm Orange/Coral
  const ncrOrange = "#E86C3C";
  
  return (
    <div className="min-h-screen">
      {/* Custom Top Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/national-church-residences">
              <div className="flex items-center gap-3 cursor-pointer hover-elevate">
                <img 
                  src={ncrLogo} 
                  alt="National Church Residences" 
                  className="h-8 w-auto"
                  data-testid="img-nav-logo"
                />
              </div>
            </Link>

            {/* Navigation Dropdowns */}
            <div className="flex items-center gap-2">
              {/* Proposals Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="gap-1.5"
                    style={{ color: ncrOrange }}
                    data-testid="dropdown-proposals"
                  >
                    <ClipboardList className="w-4 h-4" />
                    Proposals
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background">
                  <DropdownMenuItem asChild>
                    <Link href="/proposals">
                      <span className="cursor-pointer w-full" data-testid="link-all-proposals">All Proposals</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/content/grant-proposals">
                      <span className="cursor-pointer w-full" data-testid="link-grant-proposals">Grant Proposals</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/content/impact-reports">
                      <span className="cursor-pointer w-full" data-testid="link-impact-reports">Impact Reports</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Solutions Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="gap-1.5"
                    style={{ color: ncrOrange }}
                    data-testid="dropdown-solutions"
                  >
                    <Sparkles className="w-4 h-4" />
                    Solutions
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background">
                  <DropdownMenuItem asChild>
                    <Link href="/solutions">
                      <span className="cursor-pointer w-full" data-testid="link-solutions-overview">Solutions Overview</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/ai">
                      <span className="cursor-pointer w-full" data-testid="link-ai-tools">AI Tools</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/integrations">
                      <span className="cursor-pointer w-full" data-testid="link-integrations">Integrations</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Grants Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="gap-1.5"
                    style={{ color: ncrOrange }}
                    data-testid="dropdown-grants"
                  >
                    <Award className="w-4 h-4" />
                    Grants
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background">
                  <DropdownMenuItem asChild>
                    <Link href="/grants">
                      <span className="cursor-pointer w-full" data-testid="link-all-grants">All Grants</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/grants/active">
                      <span className="cursor-pointer w-full" data-testid="link-active-grants">Active Grants</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/grants/pending">
                      <span className="cursor-pointer w-full" data-testid="link-pending-grants">Pending Applications</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Events Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="gap-1.5"
                    style={{ color: ncrOrange }}
                    data-testid="dropdown-events"
                  >
                    <Calendar className="w-4 h-4" />
                    Events
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background">
                  <DropdownMenuItem asChild>
                    <Link href="/events">
                      <span className="cursor-pointer w-full" data-testid="link-upcoming-events">Upcoming Events</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/events/calendar">
                      <span className="cursor-pointer w-full" data-testid="link-event-calendar">Event Calendar</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/events/past">
                      <span className="cursor-pointer w-full" data-testid="link-past-events">Past Events</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Donors Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="gap-1.5"
                    style={{ color: ncrOrange }}
                    data-testid="dropdown-donors"
                  >
                    <Users className="w-4 h-4" />
                    Donors
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background">
                  <DropdownMenuItem asChild>
                    <Link href="/donors">
                      <span className="cursor-pointer w-full" data-testid="link-all-donors">All Donors</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/donors/major-gifts">
                      <span className="cursor-pointer w-full" data-testid="link-major-gifts">Major Gifts</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/donors/lybunt">
                      <span className="cursor-pointer w-full" data-testid="link-lybunt">LYBUNT Donors</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/donors/sybunt">
                      <span className="cursor-pointer w-full" data-testid="link-sybunt">SYBUNT Donors</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Pipelines Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="gap-1.5"
                    style={{ color: ncrOrange }}
                    data-testid="dropdown-pipelines"
                  >
                    <PieChart className="w-4 h-4" />
                    Pipelines
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background">
                  <DropdownMenuItem asChild>
                    <Link href="/pipeline">
                      <span className="cursor-pointer w-full" data-testid="link-opportunities">Opportunities</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/pipeline/value">
                      <span className="cursor-pointer w-full" data-testid="link-pipeline-value">Pipeline Value</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/pipeline/forecast">
                      <span className="cursor-pointer w-full" data-testid="link-90-day-forecast">90-Day Forecast</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with NCR Branding */}
      <section 
        className="relative overflow-hidden border-b"
        style={{
          background: `linear-gradient(135deg, ${ncrOrange}15 0%, white 50%, ${ncrOrange}10 100%)`
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center space-y-6">
            {/* NCR Logo */}
            <div className="flex justify-center mb-8">
              <img 
                src={ncrLogo} 
                alt="National Church Residences" 
                className="h-16 w-auto"
                data-testid="img-ncr-logo"
              />
            </div>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We build thriving communities and provide compassionate care services for seniors. 
              FundRazor empowers National Church Residences with AI-powered donor intelligence 
              to expand our mission of serving seniors with dignity and excellence.
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Link href="/donors">
                <Button 
                  size="lg" 
                  className="gap-2 text-white hover:opacity-90" 
                  style={{ backgroundColor: ncrOrange }}
                  data-testid="button-explore-donors"
                >
                  Explore Donor Intelligence
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/pipeline">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2"
                  style={{ borderColor: ncrOrange, color: ncrOrange }}
                  data-testid="button-view-pipeline"
                >
                  View Pipeline
                </Button>
              </Link>
            </div>

            {/* Stats Specific to NCR Context */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
              <div>
                <div className="text-3xl font-bold" style={{ color: ncrOrange }} data-testid="text-stat-donors">10K+</div>
                <div className="text-sm text-muted-foreground">Active Donors</div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: ncrOrange }} data-testid="text-stat-communities">300+</div>
                <div className="text-sm text-muted-foreground">Senior Living Communities</div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: ncrOrange }} data-testid="text-stat-mission">60+ Years</div>
                <div className="text-sm text-muted-foreground">Mission-Driven Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Capabilities for NCR */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">
              Nurturing Your <span style={{ color: ncrOrange }}>Fundraising Success</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Advanced capabilities designed to help National Church Residences build thriving donor communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Capability 1 */}
            <Card 
              className="border-2 transition-all hover-elevate" 
              style={{ borderColor: `${ncrOrange}30` }}
              data-testid="card-donor-intelligence"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${ncrOrange}10` }}>
                  <Users className="w-6 h-6" style={{ color: ncrOrange }} />
                </div>
                <h3 className="font-semibold text-lg mb-2">360° Donor Profiles</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive donor intelligence with engagement, capacity, and affinity scoring 
                  to identify major gift prospects supporting senior care initiatives
                </p>
                <Link href="/donors">
                  <Button variant="ghost" size="sm" style={{ color: ncrOrange }} data-testid="link-donor-profiles">
                    View donors <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Capability 2 */}
            <Card 
              className="border-2 transition-all hover-elevate" 
              style={{ borderColor: `${ncrOrange}30` }}
              data-testid="card-predictive-ai"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${ncrOrange}10` }}>
                  <Brain className="w-6 h-6" style={{ color: ncrOrange }} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Predictive AI Insights</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  AI-powered major gift timing predictions, wealth event monitoring, and automated 
                  next best actions to maximize fundraising effectiveness
                </p>
                <Link href="/ai/predictive-timing">
                  <Button variant="ghost" size="sm" style={{ color: ncrOrange }} data-testid="link-ai-insights">
                    Explore AI tools <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Capability 3 */}
            <Card 
              className="border-2 transition-all hover-elevate" 
              style={{ borderColor: `${ncrOrange}30` }}
              data-testid="card-pipeline-management"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${ncrOrange}10` }}>
                  <Target className="w-6 h-6" style={{ color: ncrOrange }} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Pipeline Management</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Visual Kanban-style opportunity tracking with predictive analytics, 
                  helping prioritize major gifts and capital campaign prospects
                </p>
                <Link href="/pipeline">
                  <Button variant="ghost" size="sm" style={{ color: ncrOrange }} data-testid="link-pipeline">
                    View pipeline <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Capability 4 */}
            <Card 
              className="border-2 transition-all hover-elevate" 
              style={{ borderColor: `${ncrOrange}30` }}
              data-testid="card-wealth-monitoring"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${ncrOrange}10` }}>
                  <TrendingUp className="w-6 h-6" style={{ color: ncrOrange }} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Wealth Event Monitoring</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Real-time alerts on donor wealth events, business transactions, and financial 
                  changes that signal major gift opportunities
                </p>
                <Link href="/ai/wealth-events">
                  <Button variant="ghost" size="sm" style={{ color: ncrOrange }} data-testid="link-wealth-events">
                    Track wealth events <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Capability 5 */}
            <Card 
              className="border-2 transition-all hover-elevate" 
              style={{ borderColor: `${ncrOrange}30` }}
              data-testid="card-analytics"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${ncrOrange}10` }}>
                  <BarChart3 className="w-6 h-6" style={{ color: ncrOrange }} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Advanced Analytics</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Portfolio optimization, donor sentiment analysis, and peer benchmarking 
                  to drive data-driven fundraising decisions
                </p>
                <Link href="/analytics">
                  <Button variant="ghost" size="sm" style={{ color: ncrOrange }} data-testid="link-analytics">
                    View analytics <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Capability 6 */}
            <Card 
              className="border-2 transition-all hover-elevate" 
              style={{ borderColor: `${ncrOrange}30` }}
              data-testid="card-campaign-tracking"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${ncrOrange}10` }}>
                  <Sparkles className="w-6 h-6" style={{ color: ncrOrange }} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Campaign Tracking</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Unified campaign management for capital projects, annual funds, and endowment 
                  initiatives with real-time progress monitoring
                </p>
                <Link href="/campaigns">
                  <Button variant="ghost" size="sm" style={{ color: ncrOrange }} data-testid="link-campaigns">
                    Manage campaigns <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission-Aligned Impact Section */}
      <section className="py-20 px-6" style={{ backgroundColor: `${ncrOrange}05` }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">
              Thriving Communities, <span style={{ color: ncrOrange }}>Thriving Futures</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Supporting NCR's commitment to serving seniors with dignity and compassion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border hover-elevate">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: `${ncrOrange}15` }}>
                    <Heart className="w-8 h-8" style={{ color: ncrOrange }} />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">Build Deeper Connections</h3>
                <p className="text-sm text-muted-foreground">
                  Nurture meaningful relationships with supporters who share NCR's vision 
                  for compassionate senior care and community building
                </p>
              </CardContent>
            </Card>

            <Card className="border hover-elevate">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: `${ncrOrange}15` }}>
                    <HomeIcon className="w-8 h-8" style={{ color: ncrOrange }} />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">Expand Community Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Increase resources to serve more seniors with excellence across NCR's 
                  300+ communities nationwide, ensuring quality care for all
                </p>
              </CardContent>
            </Card>

            <Card className="border hover-elevate">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: `${ncrOrange}15` }}>
                    <CheckCircle2 className="w-8 h-8" style={{ color: ncrOrange }} />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">Drive Strategic Growth</h3>
                <p className="text-sm text-muted-foreground">
                  Leverage data-driven insights to prioritize major gifts and capital campaigns 
                  for maximum mission impact and sustainable growth
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card 
            className="border-2" 
            style={{ 
              borderColor: `${ncrOrange}40`,
              background: `linear-gradient(135deg, ${ncrOrange}08 0%, white 100%)`
            }}
          >
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                We're Better <span style={{ color: ncrOrange }}>Together</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Explore FundRazor's comprehensive platform designed to help National Church Residences 
                build thriving donor communities and expand our mission of compassionate senior care.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link href="/donors">
                  <Button 
                    size="lg" 
                    className="gap-2 text-white hover:opacity-90" 
                    style={{ backgroundColor: ncrOrange }}
                    data-testid="button-cta-start"
                  >
                    Start Exploring
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/solutions">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2"
                    style={{ borderColor: ncrOrange, color: ncrOrange }}
                    data-testid="button-cta-solutions"
                  >
                    View All Solutions
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
