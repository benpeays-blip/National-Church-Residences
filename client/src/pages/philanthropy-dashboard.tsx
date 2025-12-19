import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { AccentCard, getAccentColor } from "@/components/ui/accent-card";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  TrendingUp, 
  Users, 
  Heart, 
  Target,
  ArrowRight,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Building2,
  UserCheck,
  Globe,
  Network,
  Handshake,
  Star
} from "lucide-react";

const accentColors = {
  teal: getAccentColor("teal"),
  sky: getAccentColor("sky"),
  lime: getAccentColor("lime"),
  olive: getAccentColor("olive"),
  coral: getAccentColor("coral"),
  orange: getAccentColor("orange"),
};

interface Donor {
  id: string;
  firstName: string;
  lastName: string;
  energy: number;
  structure: number;
  quadrant: 'partner' | 'friend' | 'colleague' | 'acquaintance';
}

interface QuadrantData {
  donors: Donor[];
  counts: {
    partner: number;
    friend: number;
    colleague: number;
    acquaintance: number;
  };
  totalDonors: number;
}

const quadrantColors = {
  partner: accentColors.teal,
  friend: accentColors.sky,
  colleague: accentColors.lime,
  acquaintance: accentColors.olive,
};

const quadrantLabels = {
  partner: 'Partner',
  friend: 'Friend',
  colleague: 'Colleague',
  acquaintance: 'Acquaintance',
};

function MiniDonorQuadrant() {
  const { data, isLoading } = useQuery<QuadrantData>({
    queryKey: ['/api/donors/quadrant'],
  });

  if (isLoading) {
    return (
      <div className="space-y-3 pl-6 pb-6">
        <Skeleton className="h-[280px] w-full rounded-lg" />
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-14 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return <div className="text-sm text-muted-foreground text-center py-8">No data available</div>;
  }

  return (
    <Link href="/quadrant" data-testid="link-mini-quadrant">
      <div className="cursor-pointer hover:opacity-95 transition-opacity">
        {/* Axis Labels */}
        <div className="relative pl-6 pb-6">
          {/* Y-Axis Label */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-10">
            <span className="text-[10px] font-semibold text-muted-foreground writing-mode-vertical" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              ENERGY
            </span>
          </div>
          {/* X-Axis Label */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-muted-foreground z-10">
            STRUCTURE →
          </div>

          {/* Mini Quadrant Grid */}
          <div 
            className="relative h-[280px] rounded-lg overflow-hidden bg-background"
            style={{ border: '2px solid hsl(var(--border))' }}
          >
            {/* Grid Lines */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
            <div className="absolute left-0 right-0 top-1/2 h-px bg-border" />

            {/* Quadrant Backgrounds with Labels */}
            {/* Partner - Top Right */}
            <div 
              className="absolute top-0 right-0 w-1/2 h-1/2 flex items-center justify-center"
              style={{ backgroundColor: `${quadrantColors.partner}08` }}
            >
              <span className="text-[10px] font-semibold opacity-60" style={{ color: quadrantColors.partner }}>
                Partner
              </span>
            </div>
            {/* Friend - Top Left */}
            <div 
              className="absolute top-0 left-0 w-1/2 h-1/2 flex items-center justify-center"
              style={{ backgroundColor: `${quadrantColors.friend}08` }}
            >
              <span className="text-[10px] font-semibold opacity-60" style={{ color: quadrantColors.friend }}>
                Friend
              </span>
            </div>
            {/* Colleague - Bottom Right */}
            <div 
              className="absolute bottom-0 right-0 w-1/2 h-1/2 flex items-center justify-center"
              style={{ backgroundColor: `${quadrantColors.colleague}08` }}
            >
              <span className="text-[10px] font-semibold opacity-60" style={{ color: quadrantColors.colleague }}>
                Colleague
              </span>
            </div>
            {/* Acquaintance - Bottom Left */}
            <div 
              className="absolute bottom-0 left-0 w-1/2 h-1/2 flex items-center justify-center"
              style={{ backgroundColor: `${quadrantColors.acquaintance}08` }}
            >
              <span className="text-[10px] font-semibold opacity-60" style={{ color: quadrantColors.acquaintance }}>
                Acquaintance
              </span>
            </div>

            {/* Donor Dots */}
            {data.donors.map((donor) => {
              const color = quadrantColors[donor.quadrant];
              const topPercent = 100 - donor.energy;
              const leftPercent = donor.structure;
              
              return (
                <Tooltip key={donor.id}>
                  <TooltipTrigger asChild>
                    <div
                      className="absolute w-2 h-2 rounded-full transition-transform hover:scale-150 z-20"
                      style={{
                        left: `calc(${leftPercent}% - 4px)`,
                        top: `calc(${topPercent}% - 4px)`,
                        backgroundColor: color,
                        opacity: 0.8,
                      }}
                      data-testid={`mini-dot-${donor.id}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    <p className="font-medium">{donor.firstName} {donor.lastName}</p>
                    <p className="text-muted-foreground">{quadrantLabels[donor.quadrant]}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>

        {/* Quadrant Summary */}
        <div className="grid grid-cols-4 gap-3 mt-4">
          {(['partner', 'friend', 'colleague', 'acquaintance'] as const).map((q) => (
            <div 
              key={q}
              className="text-center p-3 rounded-lg"
              style={{ backgroundColor: `${quadrantColors[q]}10` }}
              data-testid={`mini-summary-${q}`}
            >
              <div 
                className="text-xl font-bold"
                style={{ color: quadrantColors[q] }}
              >
                {data.counts[q]}
              </div>
              <div className="text-xs text-muted-foreground capitalize">
                {q}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function PhilanthropyDashboard() {
  const greeting = getGreeting();

  const kpiMetrics = [
    {
      label: "Major Donors",
      value: "247",
      subtitle: "Active relationships",
      trend: "+12",
      trendUp: true,
      icon: Users,
      accent: "teal" as const,
      href: "/donors",
    },
    {
      label: "Donor Health Score",
      value: "78",
      subtitle: "Portfolio average",
      trend: "+5pts",
      trendUp: true,
      icon: Heart,
      accent: "coral" as const,
      href: "/quadrant",
    },
    {
      label: "Retention Rate",
      value: "82%",
      subtitle: "Year-over-year",
      trend: "+4%",
      trendUp: true,
      icon: UserCheck,
      accent: "lime" as const,
      href: "/retention-risk",
    },
    {
      label: "Engagement Index",
      value: "73",
      subtitle: "Across all touchpoints",
      trend: "+8",
      trendUp: true,
      icon: Target,
      accent: "sky" as const,
      href: "/quadrant",
    },
  ];

  const relationshipInsights = [
    { type: "High Priority", count: 12, label: "Donors needing attention", color: accentColors.coral, href: "/quadrant" },
    { type: "Cultivation", count: 34, label: "In active cultivation", color: accentColors.teal, href: "/pipeline" },
    { type: "Stewardship", count: 28, label: "In stewardship cycle", color: accentColors.olive, href: "/donors" },
    { type: "At Risk", count: 8, label: "Flagged for retention", color: accentColors.orange, href: "/retention-risk" },
  ];

  const recentRelationshipActivity = [
    { donor: "Margaret Chen", action: "Site visit completed", time: "2 hours ago", type: "visit" },
    { donor: "Anderson Foundation", action: "Proposal submitted", time: "Yesterday", type: "proposal" },
    { donor: "James Wilson", action: "Thank you call made", time: "Yesterday", type: "call" },
    { donor: "Community Trust", action: "Impact report shared", time: "2 days ago", type: "report" },
  ];

  const quadrantSnapshot = [
    { quadrant: "Champions", count: 45, description: "High engagement, high capacity", color: accentColors.teal },
    { quadrant: "Cultivate", count: 67, description: "High capacity, needs engagement", color: accentColors.sky },
    { quadrant: "Steward", count: 89, description: "High engagement, lower capacity", color: accentColors.lime },
    { quadrant: "Nurture", count: 46, description: "Opportunity for growth", color: accentColors.olive },
  ];

  const corporatePartners = [
    { name: "Google", type: "Corporate Sponsor", value: "$150K", status: "Active" },
    { name: "Regional Bank", type: "Matching Gift Partner", value: "$75K", status: "Active" },
    { name: "Healthcare Systems", type: "In-Kind Partner", value: "$50K", status: "Pending" },
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
                <Sparkles className="w-6 h-6" style={{ color: accentColors.teal }} />
                <h1 className="text-3xl font-bold text-foreground" data-testid="text-philanthropy-greeting">
                  Philanthropy Dashboard
                </h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Philanthropy & Relationship Intelligence Dashboard
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/quadrant" data-testid="link-hero-quadrant">
                <Button variant="outline" className="gap-2" data-testid="button-view-quadrant">
                  <Target className="w-4 h-4" />
                  Donor Quadrant
                </Button>
              </Link>
              <Link href="/relationships" data-testid="link-hero-relationships">
                <Button className="gap-2" style={{ backgroundColor: accentColors.teal }} data-testid="button-view-relationships">
                  <Network className="w-4 h-4" />
                  Relationships
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
                    <div className="text-xs text-muted-foreground">{metric.subtitle}</div>
                  </CardContent>
                </AccentCard>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Relationship Pipeline & Visual Quadrant */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Relationship Pipeline - Enhanced with progress bars */}
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
                    <Handshake className="w-6 h-6" style={{ color: accentColors.teal }} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Relationship Pipeline</CardTitle>
                    <CardDescription>82 donors across stages</CardDescription>
                  </div>
                </div>
                <Link href="/pipeline" data-testid="link-header-pipeline">
                  <Button variant="outline" size="sm" className="gap-1" data-testid="button-view-pipeline">
                    View All <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {relationshipInsights.map((item, index) => {
                const total = relationshipInsights.reduce((sum, i) => sum + i.count, 0);
                const percentage = Math.round((item.count / total) * 100);
                return (
                  <Link key={index} href={item.href} data-testid={`link-pipeline-${item.type.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div 
                      className="group p-4 rounded-xl border hover-elevate cursor-pointer transition-all"
                      style={{ borderColor: `${item.color}30` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${item.color}15` }}
                          >
                            {item.type === "High Priority" && <AlertTriangle className="w-4 h-4" style={{ color: item.color }} />}
                            {item.type === "Cultivation" && <Sparkles className="w-4 h-4" style={{ color: item.color }} />}
                            {item.type === "Stewardship" && <Heart className="w-4 h-4" style={{ color: item.color }} />}
                            {item.type === "At Risk" && <AlertTriangle className="w-4 h-4" style={{ color: item.color }} />}
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{item.type}</div>
                            <div className="text-xs text-muted-foreground">{item.label}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-2xl font-bold" style={{ color: item.color }}>{item.count}</span>
                            <span className="text-xs text-muted-foreground ml-1">({percentage}%)</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                      <div className="relative h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </CardContent>
          </Card>

          {/* Visual Donor Quadrant - True 2x2 Grid */}
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
                    <Target className="w-6 h-6" style={{ color: accentColors.sky }} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Donor Quadrant</CardTitle>
                    <CardDescription>247 donors segmented</CardDescription>
                  </div>
                </div>
                <Link href="/quadrant" data-testid="link-header-quadrant">
                  <Button variant="outline" size="sm" className="gap-1" data-testid="button-open-quadrant">
                    Explore <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <MiniDonorQuadrant />
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Corporate Partners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Relationship Activity - Enhanced Timeline */}
          <Card className="overflow-hidden">
            <CardHeader 
              className="pb-4"
              style={{ background: `linear-gradient(135deg, ${accentColors.olive}12 0%, ${accentColors.olive}04 100%)` }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${accentColors.olive}15` }}
                >
                  <Clock className="w-6 h-6" style={{ color: accentColors.olive }} />
                </div>
                <div>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <CardDescription>Latest relationship touchpoints</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="relative">
                {/* Timeline line */}
                <div 
                  className="absolute left-4 top-0 bottom-0 w-0.5 rounded-full"
                  style={{ backgroundColor: `${accentColors.olive}20` }}
                />
                
                <div className="space-y-4">
                  {recentRelationshipActivity.map((activity, index) => {
                    const iconColors = {
                      visit: accentColors.teal,
                      proposal: accentColors.sky,
                      call: accentColors.lime,
                      report: accentColors.olive,
                    };
                    const color = iconColors[activity.type as keyof typeof iconColors] || accentColors.teal;
                    return (
                      <div 
                        key={index} 
                        className="relative flex items-start gap-4 pl-8 group"
                        data-testid={`row-activity-${index}`}
                      >
                        {/* Timeline dot */}
                        <div 
                          className="absolute left-2 w-5 h-5 rounded-full border-2 bg-background flex items-center justify-center"
                          style={{ borderColor: color }}
                        >
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        </div>
                        
                        <div className="flex-1 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-sm">{activity.donor}</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3" style={{ color: accentColors.lime }} />
                                {activity.action}
                              </div>
                            </div>
                            <Badge variant="outline" className="text-xs shrink-0">{activity.time}</Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Corporate Partners - Enhanced Cards */}
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
                    <Building2 className="w-6 h-6" style={{ color: accentColors.coral }} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Corporate Partners</CardTitle>
                    <CardDescription>$275K in partnerships</CardDescription>
                  </div>
                </div>
                <Link href="/corporate-partnerships" data-testid="link-header-corporate">
                  <Button variant="outline" size="sm" className="gap-1" data-testid="button-view-corporate">
                    View All <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {corporatePartners.map((partner, index) => (
                <Link key={index} href="/corporate-partnerships" data-testid={`link-corporate-${index}`}>
                  <div 
                    className="group flex items-center justify-between p-4 rounded-xl border hover-elevate cursor-pointer transition-all"
                    data-testid={`row-partner-${index}`}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                        style={{ backgroundColor: `${accentColors.coral}10`, color: accentColors.coral }}
                      >
                        {partner.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-sm group-hover:text-primary transition-colors">{partner.name}</div>
                        <div className="text-xs text-muted-foreground">{partner.type}</div>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <div className="text-lg font-bold" style={{ color: accentColors.teal }}>{partner.value}</div>
                        <Badge 
                          variant="secondary"
                          className="text-xs"
                          style={{ 
                            backgroundColor: partner.status === 'Active' ? `${accentColors.lime}20` : `${accentColors.orange}20`,
                            color: partner.status === 'Active' ? accentColors.lime : accentColors.orange
                          }}
                        >
                          {partner.status}
                        </Badge>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions - Enhanced with hover effects */}
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
                <Star className="w-6 h-6" style={{ color: accentColors.orange }} />
              </div>
              <div>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Jump to key philanthropy tools</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/quadrant" data-testid="link-quick-donor-quadrant">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 hover:scale-[1.02] transition-all" data-testid="button-quick-donor-quadrant">
                  <div className="w-12 h-12 rounded-lg mx-auto flex items-center justify-center" style={{ backgroundColor: `${accentColors.teal}15` }}>
                    <Target className="w-6 h-6" style={{ color: accentColors.teal }} />
                  </div>
                  <span className="text-sm font-semibold">Donor Quadrant</span>
                  <span className="text-xs text-muted-foreground">Segment donors</span>
                </Button>
              </Link>
              <Link href="/relationships" data-testid="link-quick-relationships">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 hover:scale-[1.02] transition-all" data-testid="button-quick-relationships">
                  <div className="w-12 h-12 rounded-lg mx-auto flex items-center justify-center" style={{ backgroundColor: `${accentColors.sky}15` }}>
                    <Network className="w-6 h-6" style={{ color: accentColors.sky }} />
                  </div>
                  <span className="text-sm font-semibold">Relationships</span>
                  <span className="text-xs text-muted-foreground">Map connections</span>
                </Button>
              </Link>
              <Link href="/corporate-partnerships" data-testid="link-quick-corporations">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 hover:scale-[1.02] transition-all" data-testid="button-quick-corporations">
                  <div className="w-12 h-12 rounded-lg mx-auto flex items-center justify-center" style={{ backgroundColor: `${accentColors.coral}15` }}>
                    <Building2 className="w-6 h-6" style={{ color: accentColors.coral }} />
                  </div>
                  <span className="text-sm font-semibold">Corporations</span>
                  <span className="text-xs text-muted-foreground">Partner management</span>
                </Button>
              </Link>
              <Link href="/ncr/foundation" data-testid="link-quick-foundations">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 hover:scale-[1.02] transition-all" data-testid="button-quick-foundations">
                  <div className="w-12 h-12 rounded-lg mx-auto flex items-center justify-center" style={{ backgroundColor: `${accentColors.olive}15` }}>
                    <Globe className="w-6 h-6" style={{ color: accentColors.olive }} />
                  </div>
                  <span className="text-sm font-semibold">Foundations</span>
                  <span className="text-xs text-muted-foreground">Grant sources</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
