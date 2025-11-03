import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  CheckCircle2
} from "lucide-react";
import { Link } from "wouter";
import ncrLogo from "@assets/image_1762185084577.png";

export default function NationalChurchResidences() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with NCR Branding */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5 border-b">
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
            
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20" data-testid="badge-partnership">
              Strategic Partnership
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Transforming Fundraising
              <br />
              <span className="text-primary">For Senior Living Excellence</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering National Church Residences with AI-powered donor intelligence, 
              predictive insights, and unified fundraising tools to expand their mission 
              of serving seniors with compassion and care.
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Link href="/donors">
                <Button size="lg" className="gap-2" data-testid="button-explore-donors">
                  Explore Donor Intelligence
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/pipeline">
                <Button size="lg" variant="outline" data-testid="button-view-pipeline">
                  View Pipeline
                </Button>
              </Link>
            </div>

            {/* Stats Specific to NCR Context */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-primary" data-testid="text-stat-donors">10K+</div>
                <div className="text-sm text-muted-foreground">Active Donors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary" data-testid="text-stat-communities">300+</div>
                <div className="text-sm text-muted-foreground">Communities Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary" data-testid="text-stat-mission">60+ Years</div>
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
            <h2 className="text-3xl font-bold mb-3">Tailored Fundraising Solutions</h2>
            <p className="text-muted-foreground text-lg">
              Advanced capabilities designed for senior living and faith-based organizations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Capability 1 */}
            <Card className="border-2 hover:border-primary/50 transition-all" data-testid="card-donor-intelligence">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-chart-1/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-chart-1" />
                </div>
                <h3 className="font-semibold text-lg mb-2">360° Donor Profiles</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive donor intelligence with engagement, capacity, and affinity scoring 
                  to identify major gift prospects supporting senior care initiatives
                </p>
                <Link href="/donors">
                  <Button variant="ghost" size="sm" data-testid="link-donor-profiles">
                    View donors <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Capability 2 */}
            <Card className="border-2 hover:border-primary/50 transition-all" data-testid="card-predictive-ai">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-chart-2" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Predictive AI Insights</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  AI-powered major gift timing predictions, wealth event monitoring, and automated 
                  next best actions to maximize fundraising effectiveness
                </p>
                <Link href="/ai/predictive-timing">
                  <Button variant="ghost" size="sm" data-testid="link-ai-insights">
                    Explore AI tools <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Capability 3 */}
            <Card className="border-2 hover:border-primary/50 transition-all" data-testid="card-pipeline-management">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-chart-3/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-chart-3" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Pipeline Management</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Visual Kanban-style opportunity tracking with predictive analytics, 
                  helping prioritize major gifts and capital campaign prospects
                </p>
                <Link href="/pipeline">
                  <Button variant="ghost" size="sm" data-testid="link-pipeline">
                    View pipeline <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Capability 4 */}
            <Card className="border-2 hover:border-primary/50 transition-all" data-testid="card-wealth-monitoring">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-chart-4/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-chart-4" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Wealth Event Monitoring</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Real-time alerts on donor wealth events, business transactions, and financial 
                  changes that signal major gift opportunities
                </p>
                <Link href="/ai/wealth-events">
                  <Button variant="ghost" size="sm" data-testid="link-wealth-events">
                    Track wealth events <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Capability 5 */}
            <Card className="border-2 hover:border-primary/50 transition-all" data-testid="card-analytics">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-chart-5/10 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-chart-5" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Advanced Analytics</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Portfolio optimization, donor sentiment analysis, and peer benchmarking 
                  to drive data-driven fundraising decisions
                </p>
                <Link href="/analytics">
                  <Button variant="ghost" size="sm" data-testid="link-analytics">
                    View analytics <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Capability 6 */}
            <Card className="border-2 hover:border-primary/50 transition-all" data-testid="card-campaign-tracking">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Campaign Tracking</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Unified campaign management for capital projects, annual funds, and endowment 
                  initiatives with real-time progress monitoring
                </p>
                <Link href="/campaigns">
                  <Button variant="ghost" size="sm" data-testid="link-campaigns">
                    Manage campaigns <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission-Aligned Impact Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Mission-Driven Impact</h2>
            <p className="text-muted-foreground text-lg">
              Supporting NCR's commitment to serving seniors with dignity and compassion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">Donor Relationships</h3>
                <p className="text-sm text-muted-foreground">
                  Build deeper connections with supporters who share NCR's vision 
                  for compassionate senior care
                </p>
              </CardContent>
            </Card>

            <Card className="border">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <HomeIcon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">Community Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Expand resources to serve more seniors across NCR's 
                  300+ communities nationwide
                </p>
              </CardContent>
            </Card>

            <Card className="border">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">Strategic Growth</h3>
                <p className="text-sm text-muted-foreground">
                  Data-driven insights to prioritize major gifts and capital campaigns 
                  for maximum mission impact
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Fundraising?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Explore FundRazor's comprehensive platform designed to support National Church Residences 
                in achieving its mission of serving seniors with excellence.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link href="/donors">
                  <Button size="lg" className="gap-2" data-testid="button-cta-start">
                    Start Exploring
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/solutions">
                  <Button size="lg" variant="outline" data-testid="button-cta-solutions">
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
