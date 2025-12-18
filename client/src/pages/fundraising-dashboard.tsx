import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { AccentCard, getAccentColor } from "@/components/ui/accent-card";
import { 
  TrendingUp, 
  DollarSign, 
  Target,
  ArrowRight,
  Clock,
  Gift,
  Calendar,
  Mail,
  Users,
  BarChart3,
  Sparkles,
  ChevronRight,
  TrendingDown,
  Megaphone,
  CalendarDays,
  Heart,
  MessageSquare,
  Repeat
} from "lucide-react";

const accentColors = {
  teal: getAccentColor("teal"),
  sky: getAccentColor("sky"),
  lime: getAccentColor("lime"),
  olive: getAccentColor("olive"),
  coral: getAccentColor("coral"),
  orange: getAccentColor("orange"),
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function FundraisingDashboard() {
  const greeting = getGreeting();

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
      href: "/gifts",
    },
    {
      label: "Pipeline Value",
      value: "$8.7M",
      subtitle: "90-Day Forecast",
      trend: "+$1.2M",
      trendUp: true,
      icon: TrendingUp,
      accent: "sky" as const,
      href: "/pipeline",
    },
    {
      label: "Active Campaigns",
      value: "6",
      subtitle: "In progress",
      trend: "+2",
      trendUp: true,
      icon: Megaphone,
      accent: "lime" as const,
      href: "/campaigns",
    },
    {
      label: "Donor Retention",
      value: "78%",
      subtitle: "Year-over-year",
      trend: "+4%",
      trendUp: true,
      icon: Repeat,
      accent: "coral" as const,
      href: "/retention-risk",
    },
  ];

  const pipelineStages = [
    { stage: "Prospect", count: 23, value: "$2.1M", color: accentColors.teal },
    { stage: "Cultivation", count: 18, value: "$3.4M", color: accentColors.sky },
    { stage: "Solicitation", count: 8, value: "$1.8M", color: accentColors.lime },
    { stage: "Stewardship", count: 12, value: "$1.4M", color: accentColors.olive },
  ];

  const recentGifts = [
    { donor: "Sarah Thompson", amount: "$50,000", date: "Today", type: "Major Gift", color: accentColors.teal },
    { donor: "Community Foundation", amount: "$75,000", date: "Yesterday", type: "Grant", color: accentColors.sky },
    { donor: "Anonymous", amount: "$25,000", date: "Dec 14", type: "Planned Gift", color: accentColors.lime },
    { donor: "Tech Corp Industries", amount: "$100,000", date: "Dec 12", type: "Corporate", color: accentColors.coral },
  ];

  const activeCampaigns = [
    { name: "Year-End Appeal", raised: "$284K", goal: "$500K", progress: 57, daysLeft: 13 },
    { name: "Capital Campaign", raised: "$1.2M", goal: "$2.5M", progress: 48, daysLeft: 180 },
    { name: "Monthly Giving", raised: "$42K", goal: "$60K", progress: 70, daysLeft: 13 },
  ];

  const upcomingEvents = [
    { name: "Gala Dinner", date: "Dec 28", attendees: 250, revenue: "$125K" },
    { name: "Donor Appreciation", date: "Jan 15", attendees: 75, revenue: "$0" },
    { name: "Spring Luncheon", date: "Mar 22", attendees: 150, revenue: "$45K" },
  ];

  const grantOpportunities = [
    { foundation: "Gates Foundation", amount: "$500K", deadline: "Jan 31", status: "In Progress" },
    { foundation: "Ford Foundation", amount: "$250K", deadline: "Feb 15", status: "Submitted" },
    { foundation: "Kellogg Foundation", amount: "$150K", deadline: "Mar 1", status: "Research" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <div 
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${accentColors.sky}15 0%, ${accentColors.lime}10 50%, ${accentColors.teal}05 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="relative px-6 py-8">
          {/* Executive Header */}
          <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6" style={{ color: accentColors.sky }} />
                <h1 className="text-3xl font-bold text-foreground" data-testid="text-fundraising-greeting">
                  {greeting}, Fundraiser
                </h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Fundraising Operations & Revenue Dashboard
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/pipeline">
                <Button variant="outline" className="gap-2" data-testid="button-view-pipeline">
                  <BarChart3 className="w-4 h-4" />
                  Pipeline
                </Button>
              </Link>
              <Link href="/gifts">
                <Button className="gap-2" style={{ backgroundColor: accentColors.sky }} data-testid="button-view-gifts">
                  <Gift className="w-4 h-4" />
                  All Gifts
                </Button>
              </Link>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {kpiMetrics.map((metric, index) => (
              <Link key={index} href={metric.href}>
                <AccentCard 
                  accent={metric.accent} 
                  className="hover-elevate cursor-pointer h-full"
                  data-testid={`card-metric-${metric.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${getAccentColor(metric.accent)}15` }}
                      >
                        <metric.icon className="w-6 h-6" style={{ color: getAccentColor(metric.accent) }} />
                      </div>
                      <Badge 
                        variant="outline" 
                        className="text-xs"
                        style={{ 
                          borderColor: metric.trendUp ? accentColors.lime : accentColors.coral,
                          color: metric.trendUp ? accentColors.lime : accentColors.coral 
                        }}
                      >
                        {metric.trendUp ? <TrendingUp className="w-3 h-3 mr-1" /> : null}
                        {metric.trend}
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold mb-1" style={{ color: getAccentColor(metric.accent) }}>
                      {metric.value}
                    </div>
                    <div className="text-sm font-medium text-foreground">{metric.label}</div>
                    <div className="text-xs text-muted-foreground">{metric.subtitle || metric.target}</div>
                    {metric.progress && (
                      <div className="mt-2">
                        <Progress value={metric.progress} className="h-1.5" />
                      </div>
                    )}
                  </CardContent>
                </AccentCard>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Pipeline & Recent Gifts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pipeline Overview */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" style={{ color: accentColors.sky }} />
                    Pipeline Overview
                  </CardTitle>
                  <CardDescription>Opportunities by stage</CardDescription>
                </div>
                <Link href="/pipeline">
                  <Button variant="ghost" size="sm" className="gap-1" data-testid="button-open-pipeline">
                    View Pipeline <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {pipelineStages.map((stage, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border" data-testid={`row-pipeline-${stage.stage.toLowerCase()}`}>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: stage.color }}
                    />
                    <div>
                      <div className="font-medium text-sm">{stage.stage}</div>
                      <div className="text-xs text-muted-foreground">{stage.count} opportunities</div>
                    </div>
                  </div>
                  <div className="text-lg font-bold" style={{ color: stage.color }}>{stage.value}</div>
                </div>
              ))}
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Pipeline</span>
                  <span className="text-xl font-bold" style={{ color: accentColors.teal }}>$8.7M</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Gifts */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Gift className="w-5 h-5" style={{ color: accentColors.teal }} />
                    Recent Gifts
                  </CardTitle>
                  <CardDescription>Latest donations received</CardDescription>
                </div>
                <Link href="/gifts">
                  <Button variant="ghost" size="sm" className="gap-1" data-testid="button-all-gifts">
                    All Gifts <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentGifts.map((gift, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg border" data-testid={`row-gift-${index}`}>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${gift.color}15` }}
                    >
                      <Gift className="w-4 h-4" style={{ color: gift.color }} />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{gift.donor}</div>
                      <div className="text-xs text-muted-foreground">{gift.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold" style={{ color: accentColors.teal }}>{gift.amount}</div>
                    <div className="text-xs text-muted-foreground">{gift.date}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Campaigns & Grants */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Campaigns */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Megaphone className="w-5 h-5" style={{ color: accentColors.lime }} />
                    Active Campaigns
                  </CardTitle>
                  <CardDescription>Campaign progress</CardDescription>
                </div>
                <Link href="/campaigns">
                  <Button variant="ghost" size="sm" className="gap-1" data-testid="button-all-campaigns">
                    All Campaigns <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeCampaigns.map((campaign, index) => (
                <div key={index} className="space-y-2" data-testid={`row-campaign-${index}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{campaign.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {campaign.daysLeft} days left
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{campaign.raised} raised</span>
                    <span>Goal: {campaign.goal}</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Grant Opportunities */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5" style={{ color: accentColors.olive }} />
                    Grant Pipeline
                  </CardTitle>
                  <CardDescription>Upcoming grant opportunities</CardDescription>
                </div>
                <Link href="/grants">
                  <Button variant="ghost" size="sm" className="gap-1" data-testid="button-all-grants">
                    All Grants <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {grantOpportunities.map((grant, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg border" data-testid={`row-grant-${index}`}>
                  <div>
                    <div className="text-sm font-medium">{grant.foundation}</div>
                    <div className="text-xs text-muted-foreground">Deadline: {grant.deadline}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold" style={{ color: accentColors.teal }}>{grant.amount}</div>
                    <Badge 
                      variant="outline" 
                      className="text-xs"
                      style={{ 
                        borderColor: grant.status === 'Submitted' ? accentColors.lime : accentColors.orange,
                        color: grant.status === 'Submitted' ? accentColors.lime : accentColors.orange
                      }}
                    >
                      {grant.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Events & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CalendarDays className="w-5 h-5" style={{ color: accentColors.coral }} />
                    Upcoming Events
                  </CardTitle>
                  <CardDescription>Scheduled fundraising events</CardDescription>
                </div>
                <Link href="/events">
                  <Button variant="ghost" size="sm" className="gap-1" data-testid="button-all-events">
                    All Events <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg border" data-testid={`row-event-${index}`}>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${accentColors.coral}15` }}
                    >
                      <Calendar className="w-4 h-4" style={{ color: accentColors.coral }} />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{event.name}</div>
                      <div className="text-xs text-muted-foreground">{event.attendees} expected</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{event.date}</div>
                    <div className="text-xs" style={{ color: accentColors.teal }}>{event.revenue}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5" style={{ color: accentColors.orange }} />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/matching-gifts">
                  <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" data-testid="button-quick-matching">
                    <Heart className="w-5 h-5" style={{ color: accentColors.coral }} />
                    <span className="text-sm">Matching Gifts</span>
                  </Button>
                </Link>
                <Link href="/tribute-giving">
                  <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" data-testid="button-quick-tribute">
                    <Gift className="w-5 h-5" style={{ color: accentColors.teal }} />
                    <span className="text-sm">Tribute Giving</span>
                  </Button>
                </Link>
                <Link href="/peer-to-peer">
                  <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" data-testid="button-quick-p2p">
                    <Users className="w-5 h-5" style={{ color: accentColors.sky }} />
                    <span className="text-sm">Peer-to-Peer</span>
                  </Button>
                </Link>
                <Link href="/sms-fundraising">
                  <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" data-testid="button-quick-sms">
                    <MessageSquare className="w-5 h-5" style={{ color: accentColors.lime }} />
                    <span className="text-sm">SMS Fundraising</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
