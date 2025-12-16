import { CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { AccentCard, getAccentColor } from "@/components/ui/accent-card";
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  DollarSign, 
  Target, 
  BarChart3,
  Lightbulb,
  ArrowRight,
  ArrowUpRight,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Calendar,
  Mail,
  Phone,
  Heart,
  Zap,
  ChevronRight,
  Gift,
  FileText,
  Handshake,
  Activity,
  Eye
} from "lucide-react";

const accentColors = {
  teal: getAccentColor("teal"),
  sky: getAccentColor("sky"),
  lime: getAccentColor("lime"),
  olive: getAccentColor("olive"),
  coral: getAccentColor("coral"),
  orange: getAccentColor("orange"),
};

export default function PreviewHomepage() {
  const kpiMetrics = [
    {
      label: "YTD Raised",
      value: "$4.2M",
      target: "$5.0M",
      progress: 84,
      trend: "+12%",
      trendUp: true,
      icon: DollarSign,
      accent: "teal" as const,
    },
    {
      label: "Pipeline Value",
      value: "$8.7M",
      target: "90-Day",
      progress: 72,
      trend: "+$1.2M",
      trendUp: true,
      icon: TrendingUp,
      accent: "sky" as const,
    },
    {
      label: "Active Donors",
      value: "1,847",
      target: "Retention: 78%",
      progress: 78,
      trend: "+156",
      trendUp: true,
      icon: Users,
      accent: "lime" as const,
    },
    {
      label: "Engagement Score",
      value: "73",
      target: "Health Index",
      progress: 73,
      trend: "+5pts",
      trendUp: true,
      icon: Heart,
      accent: "coral" as const,
    },
  ];

  const nextBestActions = [
    {
      priority: "High",
      action: "Schedule stewardship call",
      donor: "Margaret Chen",
      context: "Last major gift was 90+ days ago, engagement declining",
      type: "call",
      accent: "coral" as const,
    },
    {
      priority: "High",
      action: "Send proposal follow-up",
      donor: "Anderson Foundation",
      context: "$250K grant proposal pending review since 12/1",
      type: "email",
      accent: "olive" as const,
    },
    {
      priority: "Medium",
      action: "Prepare meeting brief",
      donor: "Dr. James Morrison",
      context: "Site visit scheduled for Dec 19th - prepare impact report",
      type: "prep",
      accent: "sky" as const,
    },
    {
      priority: "Medium",
      action: "Acknowledge planned gift intent",
      donor: "Robert & Linda Hayes",
      context: "Indicated estate planning interest at Nov gala",
      type: "letter",
      accent: "teal" as const,
    },
  ];

  const pipelineStages = [
    { stage: "Prospect", count: 23, value: "$2.1M", color: accentColors.teal },
    { stage: "Cultivation", count: 18, value: "$3.4M", color: accentColors.sky },
    { stage: "Solicitation", count: 8, value: "$1.8M", color: accentColors.lime },
    { stage: "Stewardship", count: 12, value: "$1.4M", color: accentColors.olive },
  ];

  const atRiskDonors = [
    { name: "David Patterson", lastGift: "8 months ago", amount: "$25,000", risk: "High" },
    { name: "The Wilson Trust", lastGift: "6 months ago", amount: "$50,000", risk: "Medium" },
    { name: "Elizabeth Moore", lastGift: "5 months ago", amount: "$15,000", risk: "Medium" },
  ];

  const upcomingActions = [
    { date: "Today", donor: "Margaret Chen", action: "Follow-up call", type: "call" },
    { date: "Tomorrow", donor: "Anderson Foundation", action: "Grant review meeting", type: "meeting" },
    { date: "Dec 18", donor: "Dr. James Morrison", action: "Site visit", type: "visit" },
    { date: "Dec 20", donor: "Year-End Appeal", action: "Campaign launch", type: "campaign" },
  ];

  const recentGifts = [
    { donor: "Sarah Thompson", amount: "$50,000", date: "Today", type: "Major Gift" },
    { donor: "Community Foundation", amount: "$75,000", date: "Yesterday", type: "Grant" },
    { donor: "Anonymous", amount: "$25,000", date: "Dec 14", type: "Planned Gift" },
  ];

  const campaigns = [
    { name: "Year-End Appeal", raised: "$284,000", goal: "$500,000", progress: 57 },
    { name: "Capital Campaign", raised: "$1.2M", goal: "$2.5M", progress: 48 },
    { name: "Monthly Giving", raised: "$42,000", goal: "$60,000", progress: 70 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <div 
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${accentColors.teal}15 0%, ${accentColors.sky}10 50%, ${accentColors.lime}05 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="relative px-6 py-8">
          {/* Executive Header */}
          <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <Badge 
                  variant="outline" 
                  className="text-xs uppercase tracking-wide gap-1"
                >
                  <Activity className="w-3 h-3" />
                  Live Dashboard
                </Badge>
              </div>
              <h1 className="text-3xl font-bold mb-1">Good morning, Sarah</h1>
              <p className="text-sm text-muted-foreground">
                Your fundraising command center • December 16, 2024
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2" data-testid="button-quick-add">
                <Phone className="w-4 h-4" />
                Log Interaction
              </Button>
              <Button size="sm" className="gap-2" data-testid="button-view-pipeline">
                <Eye className="w-4 h-4" />
                View Pipeline
              </Button>
            </div>
          </div>

          {/* Alert Strip */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <Badge variant="secondary" className="gap-1.5 py-1.5">
              <AlertTriangle className="w-3 h-3 text-orange-500" />
              <span className="text-xs uppercase tracking-wide">3 pledges expiring</span>
            </Badge>
            <Badge variant="secondary" className="gap-1.5 py-1.5">
              <Clock className="w-3 h-3 text-sky-500" />
              <span className="text-xs uppercase tracking-wide">5 opportunities need attention</span>
            </Badge>
            <Badge variant="secondary" className="gap-1.5 py-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span className="text-xs uppercase tracking-wide">12 tasks completed</span>
            </Badge>
          </div>

          {/* Executive KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiMetrics.map((metric) => {
              const Icon = metric.icon;
              const accentColor = getAccentColor(metric.accent);
              return (
                <AccentCard key={metric.label} accent={metric.accent}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="text-xs gap-1"
                    >
                      {metric.trendUp ? <TrendingUp className="w-3 h-3 text-emerald-500" /> : <TrendingDown className="w-3 h-3 text-red-500" />}
                      {metric.trend}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{metric.label}</p>
                    <p className="text-5xl font-bold" style={{ color: accentColor }}>{metric.value}</p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{metric.target}</span>
                        <span>{metric.progress}%</span>
                      </div>
                      <Progress value={metric.progress} className="h-1.5" />
                    </div>
                  </div>
                </AccentCard>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="p-6 space-y-6">
        {/* Action Intelligence Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Next Best Actions - AI Recommendations */}
          <div className="lg:col-span-2">
            <AccentCard accent="sky" className="h-full">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">AI Next Best Actions</h2>
                    <CardDescription>Personalized recommendations to maximize impact</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="gap-1 text-xs uppercase tracking-wide">
                  <Sparkles className="w-3 h-3" />
                  AI Powered
                </Badge>
              </div>
              <div className="space-y-3">
                {nextBestActions.map((action, idx) => {
                  const accentColor = getAccentColor(action.accent);
                  return (
                    <div 
                      key={idx}
                      className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover-elevate transition-all cursor-pointer"
                      data-testid={`action-item-${idx}`}
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        {action.type === "call" && <Phone className="w-6 h-6 text-primary" />}
                        {action.type === "email" && <Mail className="w-6 h-6 text-primary" />}
                        {action.type === "prep" && <FileText className="w-6 h-6 text-primary" />}
                        {action.type === "letter" && <Gift className="w-6 h-6 text-primary" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-base font-medium">{action.action}</span>
                          <Badge 
                            variant={action.priority === "High" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {action.priority}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium" style={{ color: accentColor }}>{action.donor}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{action.context}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="shrink-0">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </AccentCard>
          </div>

          {/* At-Risk Donors Watchlist */}
          <AccentCard accent="coral">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">At-Risk Watchlist</h2>
                <CardDescription>Donors needing attention</CardDescription>
              </div>
            </div>
            <div className="space-y-3">
              {atRiskDonors.map((donor, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-lg bg-muted/50 hover-elevate transition-all cursor-pointer"
                  data-testid={`at-risk-donor-${idx}`}
                >
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <span className="text-base font-medium">{donor.name}</span>
                    <Badge 
                      variant={donor.risk === "High" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {donor.risk}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{donor.lastGift}</span>
                    <span className="font-medium">{donor.amount}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4 gap-2">
              View All At-Risk
              <ArrowRight className="w-3 h-3" />
            </Button>
          </AccentCard>
        </div>

        {/* Operational Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Pipeline Overview */}
          <div className="lg:col-span-5">
            <AccentCard accent="teal" className="h-full">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Pipeline Overview</h2>
                    <CardDescription>$8.7M total pipeline value</CardDescription>
                  </div>
                </div>
                <Link href="/pipeline">
                  <Button variant="ghost" size="sm" className="gap-1" data-testid="link-pipeline">
                    Details
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {pipelineStages.map((stage, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: stage.color }}
                        />
                        <span className="text-base font-medium">{stage.stage}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-muted-foreground">{stage.count} opportunities</span>
                        <span className="font-semibold" style={{ color: stage.color }}>{stage.value}</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ 
                          backgroundColor: stage.color,
                          width: `${(parseFloat(stage.value.replace(/[$M,]/g, '')) / 8.7) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </AccentCard>
          </div>

          {/* Upcoming Actions Calendar */}
          <div className="lg:col-span-4">
            <AccentCard accent="olive" className="h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Upcoming Actions</h2>
                  <CardDescription>Your schedule this week</CardDescription>
                </div>
              </div>
              <div className="space-y-3">
                {upcomingActions.map((action, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover-elevate transition-all cursor-pointer"
                    data-testid={`upcoming-action-${idx}`}
                  >
                    <div className="text-center min-w-[50px]">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{action.date}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium truncate">{action.action}</p>
                      <p className="text-sm text-muted-foreground truncate">{action.donor}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {action.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </AccentCard>
          </div>

          {/* Recent Gifts */}
          <div className="lg:col-span-3">
            <AccentCard accent="lime" className="h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Gift className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Recent Gifts</h2>
                  <CardDescription>Latest contributions</CardDescription>
                </div>
              </div>
              <div className="space-y-3">
                {recentGifts.map((gift, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-lg bg-muted/50"
                    data-testid={`recent-gift-${idx}`}
                  >
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <span className="text-base font-medium truncate">{gift.donor}</span>
                      <span className="text-sm font-bold" style={{ color: accentColors.lime }}>{gift.amount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground gap-2">
                      <span>{gift.date}</span>
                      <Badge variant="outline" className="text-xs">{gift.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </AccentCard>
          </div>
        </div>

        {/* Campaign Performance Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Campaigns */}
          <AccentCard accent="orange">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Active Campaigns</h2>
                  <CardDescription>Goal progress and momentum</CardDescription>
                </div>
              </div>
              <Link href="/campaigns">
                <Button variant="ghost" size="sm" className="gap-1" data-testid="link-campaigns">
                  All Campaigns
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {campaigns.map((campaign, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-base font-medium">{campaign.name}</span>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold" style={{ color: accentColors.orange }}>{campaign.raised}</span>
                      <span className="text-muted-foreground">/ {campaign.goal}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={campaign.progress} className="flex-1 h-2" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wide w-12 text-right">{campaign.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </AccentCard>

          {/* Quick Navigation */}
          <AccentCard accent="sky">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Quick Access</h2>
                <CardDescription>Navigate to key sections</CardDescription>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Donors", icon: Users, href: "/donors" },
                { label: "Pipeline", icon: TrendingUp, href: "/pipeline" },
                { label: "Grants", icon: FileText, href: "/grants" },
                { label: "Relationships", icon: Handshake, href: "/relationships" },
                { label: "AI Tools", icon: Sparkles, href: "/ai-tools" },
                { label: "Reports", icon: BarChart3, href: "/reporting/impact-intelligence" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link key={idx} href={item.href}>
                    <div 
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover-elevate active-elevate-2 transition-all cursor-pointer"
                      data-testid={`quick-nav-${item.label.toLowerCase()}`}
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-base font-medium">{item.label}</span>
                      <ArrowUpRight className="w-3 h-3 text-muted-foreground ml-auto" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </AccentCard>
        </div>
      </div>
    </div>
  );
}
