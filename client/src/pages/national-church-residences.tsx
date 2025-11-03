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
  // NCR Brand Colors - Warm Orange/Coral
  const ncrOrange = "#E86C3C";
  const ncrOrangeLight = "#F5A574";
  
  return (
    <div className="min-h-screen">
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
            
            <Badge 
              className="mb-4 text-white border-0" 
              style={{ backgroundColor: ncrOrange }}
              data-testid="badge-partnership"
            >
              Powered by FundRazor
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Let's Thrive
              <br />
              <span style={{ color: ncrOrange }}>Together</span>
            </h1>
            
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
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${ncrOrange}15` }}>
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
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${ncrOrange}15` }}>
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
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${ncrOrange}15` }}>
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
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${ncrOrange}15` }}>
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
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${ncrOrange}15` }}>
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
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${ncrOrange}15` }}>
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
