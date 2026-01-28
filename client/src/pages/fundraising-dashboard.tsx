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
  Users,
  BarChart3,
  Sparkles,
  ChevronRight,
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

export default function FundraisingDashboard() {

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
                  Fundraising Dashboard
                </h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Fundraising Operations & Revenue Dashboard
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/pipeline" data-testid="link-hero-pipeline">
                <Button variant="outline" className="gap-2" data-testid="button-view-pipeline">
                  <BarChart3 className="w-4 h-4" />
                  Pipeline
                </Button>
              </Link>
              <Link href="/gifts" data-testid="link-hero-gifts">
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
              <Link key={index} href={metric.href} data-testid={`link-metric-${metric.label.toLowerCase().replace(/\s+/g, '-')}`}>
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
          {/* Pipeline Overview - Enhanced Funnel Visual */}
          <Card className="overflow-hidden">
            <CardHeader 
              className="pb-4"
              style={{ background: `linear-gradient(135deg, ${accentColors.sky}12 0%, ${accentColors.sky}04 100%)` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${accentColors.sky}15` }}
                  >
                    <BarChart3 className="w-6 h-6" style={{ color: accentColors.sky }} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Pipeline Overview</CardTitle>
                    <CardDescription>$8.7M across 61 opportunities</CardDescription>
                  </div>
                </div>
                <Link href="/pipeline" data-testid="link-header-pipeline">
                  <Button variant="outline" size="sm" className="gap-1" data-testid="button-open-pipeline">
                    View Pipeline <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {pipelineStages.map((stage, index) => {
                const totalValue = 8.7;
                const stageValue = parseFloat(stage.value.replace('$', '').replace('M', ''));
                const percentage = Math.round((stageValue / totalValue) * 100);
                return (
                  <Link key={index} href="/pipeline" data-testid={`link-pipeline-${stage.stage.toLowerCase()}`}>
                    <div 
                      className="group p-4 rounded-xl border hover-elevate cursor-pointer transition-all"
                      style={{ borderColor: `${stage.color}30` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                            style={{ backgroundColor: `${stage.color}15`, color: stage.color }}
                          >
                            {stage.count}
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{stage.stage}</div>
                            <div className="text-xs text-muted-foreground">{stage.count} opportunities</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-xl font-bold" style={{ color: stage.color }}>{stage.value}</span>
                            <span className="text-xs text-muted-foreground ml-1">({percentage}%)</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                      <div className="relative h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%`, backgroundColor: stage.color }}
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
              <div className="p-4 rounded-xl border-2 border-dashed" style={{ borderColor: `${accentColors.teal}40` }}>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total Pipeline Value</span>
                  <span className="text-2xl font-bold" style={{ color: accentColors.teal }}>$8.7M</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Gifts - Enhanced with larger amounts */}
          <Card className="overflow-hidden">
            <CardHeader 
              className="pb-4"
              style={{ background: `linear-gradient(135deg, ${accentColors.teal}12 0%, ${accentColors.teal}04 100%)` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${accentColors.teal}15` }}
                  >
                    <Gift className="w-6 h-6" style={{ color: accentColors.teal }} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Recent Gifts</CardTitle>
                    <CardDescription>$250K received this week</CardDescription>
                  </div>
                </div>
                <Link href="/gifts" data-testid="link-header-gifts">
                  <Button variant="outline" size="sm" className="gap-1" data-testid="button-all-gifts">
                    All Gifts <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {recentGifts.map((gift, index) => (
                <Link key={index} href="/gifts" data-testid={`link-gift-${index}`}>
                  <div 
                    className="group flex items-center justify-between p-4 rounded-xl border hover-elevate cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${gift.color}15` }}
                      >
                        <Gift className="w-5 h-5" style={{ color: gift.color }} />
                      </div>
                      <div>
                        <div className="font-semibold text-sm group-hover:text-primary transition-colors">{gift.donor}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          <Badge 
                            variant="secondary" 
                            className="text-xs"
                            style={{ backgroundColor: `${gift.color}15`, color: gift.color }}
                          >
                            {gift.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <div className="text-lg font-bold" style={{ color: accentColors.teal }}>{gift.amount}</div>
                        <div className="text-xs text-muted-foreground">{gift.date}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Campaigns & Grants */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Campaigns - Enhanced with visual progress */}
          <Card className="overflow-hidden">
            <CardHeader 
              className="pb-4"
              style={{ background: `linear-gradient(135deg, ${accentColors.lime}12 0%, ${accentColors.lime}04 100%)` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${accentColors.lime}15` }}
                  >
                    <Megaphone className="w-6 h-6" style={{ color: accentColors.lime }} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Active Campaigns</CardTitle>
                    <CardDescription>6 campaigns in progress</CardDescription>
                  </div>
                </div>
                <Link href="/campaigns" data-testid="link-header-campaigns">
                  <Button variant="outline" size="sm" className="gap-1" data-testid="button-all-campaigns">
                    All Campaigns <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {activeCampaigns.map((campaign, index) => {
                const progressColor = campaign.progress >= 70 ? accentColors.lime : campaign.progress >= 40 ? accentColors.orange : accentColors.coral;
                return (
                  <Link key={index} href="/campaigns" data-testid={`link-campaign-${index}`}>
                    <div 
                      className="group p-4 rounded-xl border hover-elevate cursor-pointer transition-all"
                      data-testid={`row-campaign-${index}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="relative w-14 h-14"
                          >
                            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                              <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted/30" />
                              <circle 
                                cx="28" cy="28" r="24" fill="none" 
                                stroke={progressColor}
                                strokeWidth="4" 
                                strokeLinecap="round"
                                strokeDasharray={`${campaign.progress * 1.5} 150`}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-bold">{campaign.progress}%</span>
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold text-sm group-hover:text-primary transition-colors">{campaign.name}</div>
                            <div className="text-xs text-muted-foreground">{campaign.raised} of {campaign.goal}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className="text-xs"
                            style={{ 
                              borderColor: campaign.daysLeft <= 14 ? accentColors.coral : accentColors.olive,
                              color: campaign.daysLeft <= 14 ? accentColors.coral : accentColors.olive
                            }}
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            {campaign.daysLeft}d
                          </Badge>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </CardContent>
          </Card>

          {/* Grant Opportunities - Enhanced */}
          <Card className="overflow-hidden">
            <CardHeader 
              className="pb-4"
              style={{ background: `linear-gradient(135deg, ${accentColors.olive}12 0%, ${accentColors.olive}04 100%)` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${accentColors.olive}15` }}
                  >
                    <Target className="w-6 h-6" style={{ color: accentColors.olive }} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Grant Pipeline</CardTitle>
                    <CardDescription>$900K in opportunities</CardDescription>
                  </div>
                </div>
                <Link href="/grants" data-testid="link-header-grants">
                  <Button variant="outline" size="sm" className="gap-1" data-testid="button-all-grants">
                    All Grants <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {grantOpportunities.map((grant, index) => {
                const statusColors = {
                  'Submitted': accentColors.lime,
                  'In Progress': accentColors.sky,
                  'Research': accentColors.orange,
                };
                const color = statusColors[grant.status as keyof typeof statusColors] || accentColors.teal;
                return (
                  <Link key={index} href="/grants" data-testid={`link-grant-${index}`}>
                    <div 
                      className="group flex items-center justify-between p-4 rounded-xl border hover-elevate cursor-pointer transition-all"
                      data-testid={`row-grant-${index}`}
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                          style={{ backgroundColor: `${color}10`, color: color }}
                        >
                          {grant.foundation.split(' ')[0][0]}
                        </div>
                        <div>
                          <div className="font-semibold text-sm group-hover:text-primary transition-colors">{grant.foundation}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            Due: {grant.deadline}
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <div>
                          <div className="text-lg font-bold" style={{ color: accentColors.teal }}>{grant.amount}</div>
                          <Badge 
                            variant="secondary"
                            className="text-xs"
                            style={{ backgroundColor: `${color}20`, color: color }}
                          >
                            {grant.status}
                          </Badge>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Events & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Events - Enhanced */}
          <Card className="overflow-hidden">
            <CardHeader 
              className="pb-4"
              style={{ background: `linear-gradient(135deg, ${accentColors.coral}12 0%, ${accentColors.coral}04 100%)` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${accentColors.coral}15` }}
                  >
                    <CalendarDays className="w-6 h-6" style={{ color: accentColors.coral }} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Upcoming Events</CardTitle>
                    <CardDescription>$170K projected revenue</CardDescription>
                  </div>
                </div>
                <Link href="/events" data-testid="link-header-events">
                  <Button variant="outline" size="sm" className="gap-1" data-testid="button-all-events">
                    All Events <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {upcomingEvents.map((event, index) => (
                <Link key={index} href="/events" data-testid={`link-event-${index}`}>
                  <div 
                    className="group flex items-center justify-between p-4 rounded-xl border hover-elevate cursor-pointer transition-all"
                    data-testid={`row-event-${index}`}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-14 h-14 rounded-xl flex flex-col items-center justify-center"
                        style={{ backgroundColor: `${accentColors.coral}10` }}
                      >
                        <span className="text-xs font-medium text-muted-foreground">
                          {event.date.split(' ')[0]}
                        </span>
                        <span className="text-lg font-bold" style={{ color: accentColors.coral }}>
                          {event.date.split(' ')[1]?.replace(',', '') || event.date}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-sm group-hover:text-primary transition-colors">{event.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          <Users className="w-3 h-3" />
                          {event.attendees} expected
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <div className="text-lg font-bold" style={{ color: accentColors.teal }}>{event.revenue}</div>
                        <Badge variant="outline" className="text-xs">Revenue</Badge>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions - Enhanced */}
          <Card className="overflow-hidden">
            <CardHeader 
              className="pb-4"
              style={{ background: `linear-gradient(135deg, ${accentColors.orange}12 0%, ${accentColors.orange}04 100%)` }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${accentColors.orange}15` }}
                >
                  <Sparkles className="w-6 h-6" style={{ color: accentColors.orange }} />
                </div>
                <div>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                  <CardDescription>Jump to fundraising tools</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <Link href="/matching-gifts" data-testid="link-quick-matching-gifts">
                  <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 hover:scale-[1.02] transition-all" data-testid="button-quick-matching-gifts">
                    <div className="w-12 h-12 rounded-lg mx-auto flex items-center justify-center" style={{ backgroundColor: `${accentColors.coral}15` }}>
                      <Heart className="w-6 h-6" style={{ color: accentColors.coral }} />
                    </div>
                    <span className="text-sm font-semibold">Matching Gifts</span>
                    <span className="text-xs text-muted-foreground">Corporate matches</span>
                  </Button>
                </Link>
                <Link href="/tribute-giving" data-testid="link-quick-tribute-giving">
                  <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 hover:scale-[1.02] transition-all" data-testid="button-quick-tribute-giving">
                    <div className="w-12 h-12 rounded-lg mx-auto flex items-center justify-center" style={{ backgroundColor: `${accentColors.teal}15` }}>
                      <Gift className="w-6 h-6" style={{ color: accentColors.teal }} />
                    </div>
                    <span className="text-sm font-semibold">Tribute Giving</span>
                    <span className="text-xs text-muted-foreground">Honor & memorial</span>
                  </Button>
                </Link>
                <Link href="/peer-to-peer" data-testid="link-quick-peer-to-peer">
                  <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 hover:scale-[1.02] transition-all" data-testid="button-quick-peer-to-peer">
                    <div className="w-12 h-12 rounded-lg mx-auto flex items-center justify-center" style={{ backgroundColor: `${accentColors.sky}15` }}>
                      <Users className="w-6 h-6" style={{ color: accentColors.sky }} />
                    </div>
                    <span className="text-sm font-semibold">Peer-to-Peer</span>
                    <span className="text-xs text-muted-foreground">Supporter campaigns</span>
                  </Button>
                </Link>
                <Link href="/sms-fundraising" data-testid="link-quick-sms-fundraising">
                  <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 hover:scale-[1.02] transition-all" data-testid="button-quick-sms-fundraising">
                    <div className="w-12 h-12 rounded-lg mx-auto flex items-center justify-center" style={{ backgroundColor: `${accentColors.lime}15` }}>
                      <MessageSquare className="w-6 h-6" style={{ color: accentColors.lime }} />
                    </div>
                    <span className="text-sm font-semibold">SMS Fundraising</span>
                    <span className="text-xs text-muted-foreground">Text-to-give</span>
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
