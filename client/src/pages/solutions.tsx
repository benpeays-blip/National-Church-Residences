import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import {
  Target,
  Network,
  TrendingUp,
  FileText,
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Zap,
  BarChart3,
  Sparkles,
  Clock,
  Palette,
} from "lucide-react";

export default function Solutions() {
  const [, setLocation] = useLocation();
  
  const solutions = [
    {
      id: 1,
      title: "AI-Powered Prospect Discovery & Prioritization",
      icon: Target,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
      painPoints: [
        "Manual research consumes hours per prospect",
        "Wealth screening data quickly becomes outdated",
        "Hidden wealthy donors remain undiscovered in database",
        "Capacity ratings too broad or inaccurate",
        "Hard to predict who will give vs who can give",
        "External data sources siloed and expensive",
      ],
      availableNow: [
        {
          name: "3-Dimensional Donor Scoring",
          detail:
            "Real-time Engagement (0-100), Capacity (0-100), and Affinity (0-100) scores that auto-update with every gift and interaction based on gifts and interactions",
        },
        {
          name: "Top Prospects Dashboard",
          detail:
            "CEO dashboard ranks donors by combined capacity + affinity scores, showing highest-value opportunities at a glance",
        },
        {
          name: "Data Provenance Schema",
          detail:
            "Database schema tracks source system, source record ID, sync timestamp, and data quality score for full audit trail",
        },
      ],
      comingSoon: [
        {
          name: "Wealth Screening Integrations",
          detail: "WealthEngine, iWave, and DonorSearch connectors for automatic capacity data enrichment",
        },
        {
          name: "Automated External Data Refresh",
          detail: "Background sync from wealth screening and other external sources",
        },
        {
          name: "Predictive Giving Propensity",
          detail: "ML model to predict likelihood to give, not just capacity",
        },
      ],
      results: [
        "60% reduction in prospect research time through unified donor intelligence",
        "Real-time scoring eliminates manual updates and stale ratings",
        "Centralized wealth data with transparent provenance for compliance",
      ],
    },
    {
      id: 2,
      title: "Advanced Relationship Mapping & Network Intelligence",
      icon: Network,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
      painPoints: [
        "Relationship Science costly ($25K-50K/year) and underutilized",
        "Board members rarely share full networks",
        "LinkedIn data lacks context and integration",
        "Warm paths to major prospects remain hidden",
        "Event/volunteer/corporate relationships not linked in CRM",
        "Corporate partnership opportunities missed",
      ],
      availableNow: [
        {
          name: "Household Relationship Tracking",
          detail:
            "Link family members and joint donors to track household giving patterns and shared connections",
        },
        {
          name: "Complete Interaction Timeline",
          detail:
            "Unified history of events, meetings, calls, and email engagement shows relationship depth and frequency",
        },
        {
          name: "Event Attendance Intelligence",
          detail:
            "Track who attended which events together to identify shared affiliations and warm introduction paths",
        },
        {
          name: "Corporate & Board Connections",
          detail:
            "Store organization affiliations and board memberships directly in donor profiles for relationship context",
        },
      ],
      comingSoon: [
        {
          name: "Visual Relationship Maps",
          detail: "Graph-based visualization of donor networks and influence chains",
        },
        {
          name: "LinkedIn Integration",
          detail: "Automatic enrichment of professional connections and shared networks",
        },
        {
          name: "Warm Introduction Recommendations",
          detail: "AI-suggested introducers based on event co-attendance and shared affiliations",
        },
      ],
      results: [
        "Centralized relationship data eliminates manual spreadsheet tracking",
        "Event-driven intelligence reveals hidden connection opportunities",
        "Board member networks captured and actionable in CRM",
      ],
    },
    {
      id: 3,
      title: "Data-Driven Pipeline Management & Segmentation",
      icon: TrendingUp,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
      painPoints: [
        "Static donor segments don't reflect current engagement",
        "Move management handled inconsistently across gift officers",
        "No way to predict when donors are 'ready' to give",
        "Corporate/foundation giving tracked separately from individuals",
        "Officers spend time on low-probability donors",
        "No system for early detection of lapsed donors",
      ],
      availableNow: [
        {
          name: "5-Stage Pipeline Management",
          detail:
            "Visual Kanban tracking through Prospect → Cultivation → Ask → Steward → Renewal with real-time stage analytics",
        },
        {
          name: "Next Best Action Engine",
          detail:
            "AI-generated task recommendations based on 5 rules: LYBUNT detection, high engagement cultivation, event follow-up, stuck opportunities, email engagement",
        },
        {
          name: "LYBUNT & SYBUNT Donor Tracking",
          detail:
            "Automatic identification of 'Last Year But Unfortunately Not This' and 'Some Years But Unfortunately Not This' donors for retention campaigns",
        },
        {
          name: "Portfolio Management by MGO",
          detail:
            "Each gift officer has dedicated dashboard showing their assigned donors, pipeline, tasks, and top 10 priorities",
        },
        {
          name: "Pipeline Forecasting",
          detail:
            "90-day revenue forecast based on opportunity amounts weighted by probability and close dates",
        },
      ],
      comingSoon: [
        {
          name: "Predictive Close Date Estimation",
          detail: "ML-driven predictions for when opportunities will close based on historical patterns",
        },
        {
          name: "Automated Segmentation Rules",
          detail: "Dynamic donor segments that auto-update based on engagement signals",
        },
      ],
      results: [
        "30-40% increase in gift officer efficiency through AI task prioritization",
        "Consistent move management across entire development team",
        "Real-time lapsed donor detection prevents revenue leakage",
      ],
    },
    {
      id: 4,
      title: "AI-Enhanced Grant Proposal Crafting",
      icon: FileText,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
      painPoints: [
        "Each proposal written manually from scratch",
        "Hard to tailor for each funder without starting over",
        "Program staff aren't natural writers - quality varies",
        "Internal reviews delay submission timelines",
        "No centralized tracking of which proposals succeed or fail",
        "Reporting consumes substantial administrative time",
      ],
      availableNow: [
        {
          name: "6-Stage Grant Pipeline",
          detail:
            "Complete workflow tracking: Research → LOI → Submitted → Awarded → Declined → Report Due with stage-specific views",
        },
        {
          name: "Multi-Deadline Management",
          detail:
            "Track LOI due date, application due date, decision date, and report due date in unified dashboard",
        },
        {
          name: "Funder Relationship Integration",
          detail:
            "Link grants to funder contacts in CRM - see giving history, engagement scores, and relationship context",
        },
        {
          name: "Centralized Grant Success Tracking",
          detail:
            "View awarded vs. declined grants, ask amounts vs. awarded amounts, and win rates by stage",
        },
      ],
      comingSoon: [
        {
          name: "AI Proposal Drafting Assistant",
          detail: "Auto-generate first drafts using previous winning proposals and funder priorities",
        },
        {
          name: "Funder Match Recommendations",
          detail: "AI suggestions for which funders to approach based on mission alignment",
        },
        {
          name: "Automated Compliance Reminders",
          detail: "Smart alerts for reporting deadlines and submission requirements",
        },
      ],
      results: [
        "Centralized grant pipeline eliminates lost deadlines and missed opportunities",
        "Funder relationship data informs cultivation strategy",
        "Success metrics track win rates and identify improvement areas",
      ],
    },
    {
      id: 5,
      title: "Smart Event Planning & Donor Engagement",
      icon: Users,
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
      painPoints: [
        "Same donors invited repeatedly - missing new opportunities",
        "Attendance can't be reliably predicted",
        "Post-event follow-up inconsistent or forgotten",
        "ROI measured only by attendance numbers",
        "Seating/grouping don't strategically connect donors",
        "Corporate sponsors paired with mismatched events",
      ],
      availableNow: [
        {
          name: "Event Interaction Tracking",
          detail:
            "Log event attendance as interactions that automatically boost donor Engagement Scores",
        },
        {
          name: "Engagement-Based Targeting",
          detail:
            "Filter donors by Engagement and Affinity scores to identify high-potential invitees for each event type",
        },
        {
          name: "Post-Event Follow-Up Tasks",
          detail:
            "Next Best Action engine generates follow-up tasks for high-capacity event attendees within 48 hours",
        },
      ],
      comingSoon: [
        {
          name: "Event ROI Analytics",
          detail: "Compare pre/post-event engagement scores and track giving lift from attendees vs. non-attendees",
        },
        {
          name: "Predictive Attendance Modeling",
          detail: "ML prediction of attendance likelihood based on past event patterns",
        },
        {
          name: "Smart Seating Recommendations",
          detail: "AI-optimized table assignments to maximize networking and connection opportunities",
        },
        {
          name: "Corporate Sponsor Matching",
          detail: "Automated pairing of sponsors with mission-aligned events",
        },
      ],
      results: [
        "Engagement score integration identifies high-potential invitees",
        "Automated post-event tasks ensure consistent follow-up within 48 hours",
        "Event attendance data enriches donor profiles and engagement scoring",
      ],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Hero Design Preview Banner */}
      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">New Hero Section Design Options</p>
              <p className="text-sm text-muted-foreground">
                View 5 elegant design variations for this section
              </p>
            </div>
          </div>
          <Button 
            onClick={() => setLocation("/hero-preview")}
            data-testid="button-view-hero-designs"
          >
            View Design Options
          </Button>
        </div>
      </Card>

      {/* Executive Summary - Option 3: Clean & Modern Left-Aligned Cards */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">
            FundRazor: Cutting Edge AI-Powered Fundraising Intelligence Platform
          </h1>
          <p className="text-sm text-muted-foreground max-w-3xl">
            Addressing The Foundation's 5 AI Integration Priorities with intelligent automation, 
            relationship mapping, and data-driven insights
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border">
            <div className="space-y-2">
              <p className="text-5xl font-bold text-primary">5</p>
              <p className="text-sm font-medium">Priority Solutions</p>
              <p className="text-xs text-muted-foreground">Comprehensive AI-powered modules</p>
            </div>
          </Card>
          <Card className="p-6 border">
            <div className="space-y-2">
              <p className="text-5xl font-bold text-primary">20+</p>
              <p className="text-sm font-medium">AI Features Available</p>
              <p className="text-xs text-muted-foreground">From predictive timing to content generation</p>
            </div>
          </Card>
          <Card className="p-6 border">
            <div className="space-y-2">
              <p className="text-5xl font-bold text-primary">60%</p>
              <p className="text-sm font-medium">Time Savings</p>
              <p className="text-xs text-muted-foreground">Automated research and intelligent workflows</p>
            </div>
          </Card>
        </div>
        
        <div className="text-sm leading-relaxed text-muted-foreground max-w-4xl">
          This page maps each of your AI integration priorities to FundRazor's current capabilities and roadmap.
          Features marked <Badge variant="secondary" className="mx-1 text-xs"><CheckCircle2 className="w-3 h-3 inline mr-1" />Available Now</Badge> 
          are live and ready to demo. Features marked <Badge variant="outline" className="mx-1 text-xs"><Clock className="w-3 h-3 inline mr-1" />Coming Soon</Badge> 
          are on our development roadmap.
        </div>
      </div>

      {/* Quick Navigation */}
      <Card className="p-6">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
          Quick Navigation
        </h3>
        <div className="flex flex-wrap gap-2">
          {solutions.map((solution) => {
            const IconComponent = solution.icon;
            return (
              <Button
                key={solution.id}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  document.getElementById(`priority-${solution.id}`)?.scrollIntoView({ behavior: "smooth" });
                }}
                data-testid={`nav-priority-${solution.id}`}
              >
                <IconComponent className="w-3 h-3 mr-2" />
                Priority {solution.id}
              </Button>
            );
          })}
        </div>
      </Card>

      {/* Solutions Grid */}
      <div className="space-y-8">
        {solutions.map((solution) => {
          const IconComponent = solution.icon;
          return (
            <Card
              key={solution.id}
              id={`priority-${solution.id}`}
              className="p-6 scroll-mt-6"
              data-testid={`card-solution-${solution.id}`}
            >
              {/* Solution Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-3 rounded-lg ${solution.bgColor}`}>
                  <IconComponent className={`w-6 h-6 ${solution.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold">{solution.title}</h2>
                    <Badge variant="outline" className="text-xs">
                      Priority {solution.id}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pain Points */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Current Challenges
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {solution.painPoints.map((pain, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-destructive mt-0.5">•</span>
                        <span>{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Available Now */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">
                      Available Now
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {solution.availableNow.map((feature, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">{feature.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {feature.detail}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coming Soon & Results */}
                <div className="space-y-4">
                  {/* Coming Soon */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Coming Soon
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {solution.comingSoon.map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-muted-foreground flex items-start gap-2"
                        >
                          <Clock className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">{feature.name}</span>
                            <span className="block text-muted-foreground/80">{feature.detail}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expected Results */}
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-chart-1" />
                      <h3 className="text-sm font-semibold text-chart-1 uppercase tracking-wide">
                        Expected Impact
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {solution.results.map((result, idx) => (
                        <li
                          key={idx}
                          className="text-xs flex items-start gap-2"
                        >
                          <ArrowRight className="w-3 h-3 text-chart-1 mt-0.5 flex-shrink-0" />
                          <span className="font-medium">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* CTA Footer */}
      <Card className="p-8 bg-primary/5 border-primary/20">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Ready to Experience FundRazor?
            </h3>
            <p className="text-muted-foreground">
              Explore live dashboards, donor profiles, pipeline management, grant tracking, and integrations
              to see how we address each priority with real, working features.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="default" asChild data-testid="button-explore-dashboard">
              <a href="/">View Development Director Dashboard</a>
            </Button>
            <Button variant="outline" asChild data-testid="button-explore-donors">
              <a href="/donors">Browse Donor Intelligence</a>
            </Button>
            <Button variant="outline" asChild data-testid="button-explore-pipeline">
              <a href="/pipeline">See Pipeline Management</a>
            </Button>
            <Button variant="outline" asChild data-testid="button-explore-grants">
              <a href="/grants">Explore Grant Tracking</a>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
