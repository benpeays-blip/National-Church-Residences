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
      donor: "Linda Chen",
      donorId: "0cc9580d-c975-4222-890b-b6ceebe8bb3a",
      context: "Last major gift was 90+ days ago, engagement declining",
      type: "call",
      accent: "coral" as const,
    },
    {
      priority: "High",
      action: "Send proposal follow-up",
      donor: "Jennifer Johnson",
      donorId: "261d8446-ce7c-4cee-977e-31347f162b2c",
      context: "$250K grant proposal pending review since 12/1",
      type: "email",
      accent: "olive" as const,
    },
    {
      priority: "Medium",
      action: "Prepare meeting brief",
      donor: "James Wilson",
      donorId: "a275b91a-5634-4114-9cfb-e5a52f0d1c46",
      context: "Site visit scheduled for Dec 19th - prepare impact report",
      type: "prep",
      accent: "sky" as const,
    },
    {
      priority: "Medium",
      action: "Acknowledge planned gift intent",
      donor: "Robert Martinez",
      donorId: "5ab76a44-f492-4dd7-b3ea-bfcfaf5ff141",
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
    { name: "David Thompson", donorId: "8b11e5ac-0e35-4c95-b220-7cc58e9636bd", lastGift: "8 months ago", amount: "$25,000", risk: "High" },
    { name: "Patricia Brown", donorId: "ec82c940-c513-4656-bc66-e8c618c6dcdd", lastGift: "6 months ago", amount: "$50,000", risk: "Medium" },
    { name: "Susan Taylor", donorId: "fa9dbe3b-9972-49d6-9722-b26725db3e1c", lastGift: "5 months ago", amount: "$15,000", risk: "Medium" },
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
              <h1 className="text-3xl font-bold mb-1">Good Morning, Karla</h1>
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
            <Link href="/gifts/planned">
              <Badge variant="secondary" className="gap-1.5 py-1.5 cursor-pointer hover:bg-secondary/80 transition-colors" data-testid="alert-pledges">
                <AlertTriangle className="w-3 h-3 text-orange-500" />
                <span className="text-xs uppercase tracking-wide">3 pledges expiring</span>
                <ChevronRight className="w-3 h-3 ml-1 opacity-50" />
              </Badge>
            </Link>
            <Link href="/pipeline">
              <Badge variant="secondary" className="gap-1.5 py-1.5 cursor-pointer hover:bg-secondary/80 transition-colors" data-testid="alert-opportunities">
                <Clock className="w-3 h-3 text-sky-500" />
                <span className="text-xs uppercase tracking-wide">5 opportunities need attention</span>
                <ChevronRight className="w-3 h-3 ml-1 opacity-50" />
              </Badge>
            </Link>
            <Badge variant="secondary" className="gap-1.5 py-1.5" data-testid="alert-tasks">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span className="text-xs uppercase tracking-wide">12 tasks completed</span>
            </Badge>
          </div>

          {/* Executive KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiMetrics.map((metric) => {
              const Icon = metric.icon;
              const accentColor = getAccentColor(metric.accent);
              const circumference = 2 * Math.PI * 36;
              const strokeDashoffset = circumference - (metric.progress / 100) * circumference;
              
              return (
                <div 
                  key={metric.label}
                  className="relative overflow-hidden rounded-xl border bg-card p-6 hover-elevate transition-all"
                  style={{ borderColor: `${accentColor}30` }}
                >
                  {/* Watermark icon */}
                  <div 
                    className="absolute -right-4 -bottom-4 opacity-[0.04]"
                  >
                    <Icon className="w-32 h-32" style={{ color: accentColor }} />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Top row: Label */}
                    <div className="flex items-center gap-2 mb-4">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${accentColor}15` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: accentColor }} />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
                    </div>
                    
                    {/* Center: Value and Radial Progress */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-4xl font-bold tracking-tight mb-1">{metric.value}</p>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="secondary" 
                            className="text-xs gap-1 font-medium px-2 py-0.5"
                            style={{ 
                              backgroundColor: metric.trendUp ? '#10b98115' : '#ef444415',
                              color: metric.trendUp ? '#10b981' : '#ef4444'
                            }}
                          >
                            {metric.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {metric.trend}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Radial Progress */}
                      <div className="relative w-20 h-20">
                        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="6"
                            className="text-muted/30"
                          />
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            fill="none"
                            stroke={accentColor}
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-500"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold">{metric.progress}%</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom: Target */}
                    <div 
                      className="pt-3 border-t text-sm text-muted-foreground"
                      style={{ borderColor: `${accentColor}20` }}
                    >
                      Goal: <span className="font-medium text-foreground">{metric.target}</span>
                    </div>
                  </div>
                </div>
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
            <div className="rounded-xl border bg-card overflow-hidden h-full">
              {/* Gradient Header */}
              <div 
                className="px-6 py-5"
                style={{ background: `linear-gradient(135deg, ${accentColors.sky}15 0%, ${accentColors.sky}05 100%)` }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${accentColors.sky}20` }}
                    >
                      <Lightbulb className="w-6 h-6" style={{ color: accentColors.sky }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">AI Next Best Actions</h2>
                      <p className="text-sm text-muted-foreground">Personalized recommendations</p>
                    </div>
                  </div>
                  <Badge 
                    className="gap-1.5 text-xs uppercase tracking-wide border-0"
                    style={{ backgroundColor: `${accentColors.sky}20`, color: accentColors.sky }}
                  >
                    <Sparkles className="w-3 h-3" />
                    AI Powered
                  </Badge>
                </div>
              </div>
              
              {/* Action Items */}
              <div className="p-6 space-y-3">
                {nextBestActions.map((action, idx) => {
                  const accentColor = getAccentColor(action.accent);
                  const priorityColor = action.priority === "High" ? "#ef4444" : accentColors.olive;
                  return (
                    <Link key={idx} href={`/donors/${action.donorId}/action-plan`}>
                      <div 
                        className="group flex items-center gap-4 p-4 rounded-xl border hover-elevate transition-all cursor-pointer hover:shadow-lg"
                        style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}
                        data-testid={`action-item-${idx}`}
                      >
                        <div 
                          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${accentColor}15` }}
                        >
                          {action.type === "call" && <Phone className="w-5 h-5" style={{ color: accentColor }} />}
                          {action.type === "email" && <Mail className="w-5 h-5" style={{ color: accentColor }} />}
                          {action.type === "prep" && <FileText className="w-5 h-5" style={{ color: accentColor }} />}
                          {action.type === "letter" && <Gift className="w-5 h-5" style={{ color: accentColor }} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{action.action}</span>
                            <span 
                              className="text-xs font-medium px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: `${priorityColor}15`, color: priorityColor }}
                            >
                              {action.priority}
                            </span>
                          </div>
                          <p className="text-sm font-medium" style={{ color: accentColor }}>{action.donor}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{action.context}</p>
                        </div>
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ backgroundColor: `${accentColor}15` }}
                        >
                          <ArrowRight className="w-4 h-4" style={{ color: accentColor }} />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* At-Risk Donors Watchlist */}
          <div className="rounded-xl border bg-card overflow-hidden">
            {/* Coral Header */}
            <div 
              className="px-6 py-5"
              style={{ background: `linear-gradient(135deg, ${accentColors.coral}15 0%, ${accentColors.coral}05 100%)` }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${accentColors.coral}20` }}
                >
                  <AlertTriangle className="w-6 h-6" style={{ color: accentColors.coral }} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">At-Risk Watchlist</h2>
                  <p className="text-sm text-muted-foreground">Donors needing attention</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-3">
              {atRiskDonors.map((donor, idx) => {
                const riskColor = donor.risk === "High" ? "#ef4444" : accentColors.orange;
                return (
                  <Link key={idx} href={`/donors/${donor.donorId}`}>
                    <div 
                      className="group p-4 rounded-xl border hover-elevate transition-all cursor-pointer hover:shadow-lg"
                      style={{ borderColor: `${riskColor}25`, backgroundColor: `${riskColor}05` }}
                      data-testid={`at-risk-donor-${idx}`}
                    >
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <span className="font-semibold">{donor.name}</span>
                        <span 
                          className="text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: `${riskColor}15`, color: riskColor }}
                        >
                          {donor.risk} Risk
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{donor.lastGift}</span>
                        <span className="font-semibold" style={{ color: accentColors.coral }}>{donor.amount}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2 gap-2"
                style={{ borderColor: `${accentColors.coral}40`, color: accentColors.coral }}
              >
                View All At-Risk
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Operational Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Pipeline Overview */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border bg-card overflow-hidden h-full">
              {/* Teal Header */}
              <div 
                className="px-6 py-5"
                style={{ background: `linear-gradient(135deg, ${accentColors.teal}15 0%, ${accentColors.teal}05 100%)` }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${accentColors.teal}20` }}
                    >
                      <TrendingUp className="w-6 h-6" style={{ color: accentColors.teal }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Pipeline Overview</h2>
                      <p className="text-sm" style={{ color: accentColors.teal }}>$8.7M total value</p>
                    </div>
                  </div>
                  <Link href="/pipeline">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1" 
                      data-testid="link-pipeline"
                      style={{ color: accentColors.teal }}
                    >
                      Details
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="p-6 space-y-5 flex flex-col justify-between h-[calc(100%-88px)]">
                {pipelineStages.map((stage, idx) => (
                  <div key={idx} className="group flex-1 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: stage.color }}
                        />
                        <span className="font-medium">{stage.stage}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-muted-foreground">{stage.count}</span>
                        <span className="font-bold" style={{ color: stage.color }}>{stage.value}</span>
                      </div>
                    </div>
                    <div className="h-3 rounded-full bg-muted/50 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ 
                          background: `linear-gradient(90deg, ${stage.color} 0%, ${stage.color}cc 100%)`,
                          width: `${(parseFloat(stage.value.replace(/[$M,]/g, '')) / 8.7) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Actions Calendar */}
          <div className="lg:col-span-4">
            <div className="rounded-xl border bg-card overflow-hidden h-full">
              {/* Olive Header */}
              <div 
                className="px-6 py-5"
                style={{ background: `linear-gradient(135deg, ${accentColors.olive}15 0%, ${accentColors.olive}05 100%)` }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${accentColors.olive}20` }}
                    >
                      <Calendar className="w-6 h-6" style={{ color: accentColors.olive }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Upcoming Actions</h2>
                      <p className="text-sm text-muted-foreground">Your schedule this week</p>
                    </div>
                  </div>
                  <Link href="/upcoming-actions">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1" 
                      data-testid="link-upcoming-actions"
                      style={{ color: accentColors.olive }}
                    >
                      View All
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="p-6 space-y-3">
                {upcomingActions.map((action, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-4 p-3 rounded-xl border hover-elevate transition-all cursor-pointer"
                    style={{ borderColor: `${accentColors.olive}25`, backgroundColor: `${accentColors.olive}05` }}
                    data-testid={`upcoming-action-${idx}`}
                  >
                    <div 
                      className="text-center px-3 py-2 rounded-lg shrink-0"
                      style={{ backgroundColor: `${accentColors.olive}15` }}
                    >
                      <p className="text-xs font-bold uppercase" style={{ color: accentColors.olive }}>{action.date}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{action.action}</p>
                      <p className="text-sm text-muted-foreground truncate">{action.donor}</p>
                    </div>
                    <span 
                      className="text-xs font-medium px-2 py-1 rounded-full shrink-0"
                      style={{ backgroundColor: `${accentColors.olive}15`, color: accentColors.olive }}
                    >
                      {action.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Gifts */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border bg-card overflow-hidden h-full">
              {/* Lime Header */}
              <div 
                className="px-6 py-5"
                style={{ background: `linear-gradient(135deg, ${accentColors.lime}15 0%, ${accentColors.lime}05 100%)` }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${accentColors.lime}20` }}
                    >
                      <Gift className="w-6 h-6" style={{ color: accentColors.lime }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Recent Gifts</h2>
                      <p className="text-sm text-muted-foreground">Latest contributions</p>
                    </div>
                  </div>
                  <Link href="/gifts">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1" 
                      data-testid="link-recent-gifts"
                      style={{ color: accentColors.lime }}
                    >
                      View All
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="p-6 space-y-3">
                {recentGifts.map((gift, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl border"
                    style={{ borderColor: `${accentColors.lime}25`, backgroundColor: `${accentColors.lime}05` }}
                    data-testid={`recent-gift-${idx}`}
                  >
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <span className="font-semibold truncate">{gift.donor}</span>
                      <span className="text-lg font-bold" style={{ color: accentColors.lime }}>{gift.amount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm gap-2">
                      <span className="text-muted-foreground">{gift.date}</span>
                      <span 
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${accentColors.lime}15`, color: accentColors.lime }}
                      >
                        {gift.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Performance Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Campaigns */}
          <div className="rounded-xl border bg-card overflow-hidden">
            {/* Orange Header */}
            <div 
              className="px-6 py-5"
              style={{ background: `linear-gradient(135deg, ${accentColors.orange}15 0%, ${accentColors.orange}05 100%)` }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${accentColors.orange}20` }}
                  >
                    <Target className="w-6 h-6" style={{ color: accentColors.orange }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Active Campaigns</h2>
                    <p className="text-sm text-muted-foreground">Goal progress and momentum</p>
                  </div>
                </div>
                <Link href="/campaigns">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-1" 
                    data-testid="link-campaigns"
                    style={{ color: accentColors.orange }}
                  >
                    All Campaigns
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {campaigns.map((campaign, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl border"
                  style={{ borderColor: `${accentColors.orange}20`, backgroundColor: `${accentColors.orange}03` }}
                >
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <span className="font-semibold">{campaign.name}</span>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-bold" style={{ color: accentColors.orange }}>{campaign.raised}</span>
                      <span className="text-muted-foreground">/ {campaign.goal}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 rounded-full bg-muted/50 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ 
                          background: `linear-gradient(90deg, ${accentColors.orange} 0%, ${accentColors.coral} 100%)`,
                          width: `${campaign.progress}%`
                        }}
                      />
                    </div>
                    <span 
                      className="text-sm font-bold min-w-[3rem] text-right"
                      style={{ color: accentColors.orange }}
                    >
                      {campaign.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="rounded-xl border bg-card overflow-hidden">
            {/* Teal Header */}
            <div 
              className="px-6 py-5"
              style={{ background: `linear-gradient(135deg, ${accentColors.teal}15 0%, ${accentColors.teal}05 100%)` }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${accentColors.teal}20` }}
                >
                  <Zap className="w-6 h-6" style={{ color: accentColors.teal }} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Quick Access</h2>
                  <p className="text-sm text-muted-foreground">Navigate to key sections</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Donors", icon: Users, accent: accentColors.sky },
                  { label: "Pipeline", icon: TrendingUp, accent: accentColors.teal },
                  { label: "Grants", icon: FileText, accent: accentColors.olive },
                  { label: "Relationships", icon: Handshake, accent: accentColors.coral },
                  { label: "AI Tools", icon: Sparkles, accent: accentColors.orange },
                  { label: "Reports", icon: BarChart3, accent: accentColors.lime },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  const href = item.label === "Donors" ? "/donors" : 
                               item.label === "Pipeline" ? "/pipeline" :
                               item.label === "Grants" ? "/grants" :
                               item.label === "Relationships" ? "/relationships" :
                               item.label === "AI Tools" ? "/ai-tools" : "/reporting/impact-intelligence";
                  return (
                    <Link key={idx} href={href}>
                      <div 
                        className="group flex items-center gap-3 p-4 rounded-xl border hover-elevate transition-all cursor-pointer"
                        style={{ borderColor: `${item.accent}30`, backgroundColor: `${item.accent}05` }}
                        data-testid={`quick-nav-${item.label.toLowerCase()}`}
                      >
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${item.accent}15` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: item.accent }} />
                        </div>
                        <span className="font-medium flex-1">{item.label}</span>
                        <ArrowUpRight 
                          className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" 
                          style={{ color: item.accent }}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
