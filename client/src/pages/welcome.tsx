import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Brain, 
  TrendingUp, 
  Users, 
  Target,
  Sparkles,
  BarChart3,
  Zap,
  Shield,
  Workflow,
  CheckCircle2
} from "lucide-react";
import { Link } from "wouter";

export default function Welcome() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5 border-b">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center space-y-6">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              AI-Powered Fundraising Intelligence
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Unify Your Fundraising
              <br />
              <span className="text-primary">Multiply Your Impact</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stop juggling 15+ disconnected tools. FundRazor centralizes donor intelligence, 
              predicts giving behavior, and automates your fundraising workflow—all in one platform.
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Link href="/donors">
                <Button size="lg" className="gap-2" data-testid="button-get-started">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/solutions">
                <Button size="lg" variant="outline" data-testid="button-view-solutions">
                  View Solutions
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Systems Unified</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">3x</div>
                <div className="text-sm text-muted-foreground">Faster Insights</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">AI Intelligence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Everything You Need in One Platform</h2>
            <p className="text-muted-foreground text-lg">
              Replace your scattered tech stack with unified fundraising intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">AI-Powered Insights</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Predictive major gift timing, real-time wealth event monitoring, and automated next best actions
                </p>
                <Link href="/ai/predictive-timing">
                  <Button variant="ghost" className="p-0 h-auto hover:bg-transparent" data-testid="link-ai-insights">
                    Learn more <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">360° Donor Profiles</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete donor intelligence with engagement, capacity, and affinity scoring in one unified view
                </p>
                <Link href="/donors">
                  <Button variant="ghost" className="p-0 h-auto hover:bg-transparent" data-testid="link-donor-profiles">
                    Explore donors <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Pipeline Management</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Kanban-style opportunity tracking with AI-generated recommendations and automated workflows
                </p>
                <Link href="/pipeline">
                  <Button variant="ghost" className="p-0 h-auto hover:bg-transparent" data-testid="link-pipeline">
                    View pipeline <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Advanced Analytics</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Real-time dashboards, predictive forecasting, and peer benchmarking for data-driven decisions
                </p>
                <Link href="/analytics/peer-benchmarks">
                  <Button variant="ghost" className="p-0 h-auto hover:bg-transparent" data-testid="link-analytics">
                    See analytics <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Workflow className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Workflow Automation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Visual workflow builder, automated stewardship, and AI task prioritization to save hours daily
                </p>
                <Link href="/workflows">
                  <Button variant="ghost" className="p-0 h-auto hover:bg-transparent" data-testid="link-workflows">
                    Build workflows <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Data Integration</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connects with Salesforce, Mailchimp, WealthEngine, and 30+ platforms for complete data sync
                </p>
                <Link href="/integrations">
                  <Button variant="ghost" className="p-0 h-auto hover:bg-transparent" data-testid="link-integrations">
                    View integrations <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Why FundRazor</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Stop Wrestling With 15 Disconnected Tools
              </h2>
              <p className="text-muted-foreground mb-6">
                Development teams waste 40% of their time switching between CRMs, wealth screening, 
                email platforms, grant trackers, and spreadsheets. FundRazor unifies everything.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Single Source of Truth</h4>
                    <p className="text-sm text-muted-foreground">
                      All donor data, wealth intel, and giving history in one platform with full provenance tracking
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">AI That Actually Helps</h4>
                    <p className="text-sm text-muted-foreground">
                      Not just chatbots—real predictive models that forecast giving, detect wealth events, and prioritize outreach
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Built for Development Teams</h4>
                    <p className="text-sm text-muted-foreground">
                      Designed by fundraisers for fundraisers—not adapted from sales software
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6">
                  <Zap className="w-8 h-8 text-primary mb-3" />
                  <div className="text-3xl font-bold mb-1">10x</div>
                  <p className="text-sm text-muted-foreground">Faster prospect research</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <TrendingUp className="w-8 h-8 text-primary mb-3" />
                  <div className="text-3xl font-bold mb-1">35%</div>
                  <p className="text-sm text-muted-foreground">Higher conversion rates</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Shield className="w-8 h-8 text-primary mb-3" />
                  <div className="text-3xl font-bold mb-1">100%</div>
                  <p className="text-sm text-muted-foreground">Data provenance tracking</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Users className="w-8 h-8 text-primary mb-3" />
                  <div className="text-3xl font-bold mb-1">15+</div>
                  <p className="text-sm text-muted-foreground">Hours saved weekly</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Fundraising?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join leading nonprofits using FundRazor to raise more with less effort
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Link href="/donors">
              <Button size="lg" className="gap-2" data-testid="button-start-exploring">
                Start Exploring
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/tech-stack-mapper">
              <Button size="lg" variant="outline" data-testid="button-see-tech-stack">
                See Tech Stack
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
