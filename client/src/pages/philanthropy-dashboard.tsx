import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { AccentCard, getAccentColor } from "@/components/ui/accent-card";
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
    { name: "Tech Corp Industries", type: "Corporate Sponsor", value: "$150K", status: "Active" },
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
                  {greeting}, Relationship Builder
                </h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Philanthropy & Relationship Intelligence Dashboard
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/quadrant">
                <Button variant="outline" className="gap-2" data-testid="button-view-quadrant">
                  <Target className="w-4 h-4" />
                  Donor Quadrant
                </Button>
              </Link>
              <Link href="/relationships">
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
        {/* Relationship Insights & Quadrant Snapshot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Relationship Pipeline */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Handshake className="w-5 h-5" style={{ color: accentColors.teal }} />
                    Relationship Pipeline
                  </CardTitle>
                  <CardDescription>Current donor relationship stages</CardDescription>
                </div>
                <Link href="/pipeline">
                  <Button variant="ghost" size="sm" className="gap-1" data-testid="button-view-pipeline">
                    View All <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {relationshipInsights.map((item, index) => (
                <Link key={index} href={item.href}>
                  <div className="flex items-center justify-between p-3 rounded-lg hover-elevate cursor-pointer border" data-testid={`row-pipeline-${item.type.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <div className="font-medium text-sm">{item.type}</div>
                        <div className="text-xs text-muted-foreground">{item.label}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold" style={{ color: item.color }}>{item.count}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Donor Quadrant Snapshot */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5" style={{ color: accentColors.sky }} />
                    Donor Quadrant
                  </CardTitle>
                  <CardDescription>Portfolio segmentation overview</CardDescription>
                </div>
                <Link href="/quadrant">
                  <Button variant="ghost" size="sm" className="gap-1" data-testid="button-open-quadrant">
                    Open Quadrant <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {quadrantSnapshot.map((q, index) => (
                  <div 
                    key={index}
                    className="p-3 rounded-lg border"
                    style={{ borderLeftWidth: 3, borderLeftColor: q.color }}
                    data-testid={`card-quadrant-${q.quadrant.toLowerCase()}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{q.quadrant}</span>
                      <span className="text-lg font-bold" style={{ color: q.color }}>{q.count}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{q.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Corporate Partners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Relationship Activity */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5" style={{ color: accentColors.olive }} />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Latest relationship touchpoints</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentRelationshipActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors" data-testid={`row-activity-${index}`}>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4" style={{ color: accentColors.lime }} />
                    <div>
                      <div className="text-sm font-medium">{activity.donor}</div>
                      <div className="text-xs text-muted-foreground">{activity.action}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">{activity.time}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Corporate Partners */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="w-5 h-5" style={{ color: accentColors.coral }} />
                    Corporate Partners
                  </CardTitle>
                  <CardDescription>Key corporate relationships</CardDescription>
                </div>
                <Link href="/corporate-partnerships">
                  <Button variant="ghost" size="sm" className="gap-1" data-testid="button-view-corporate">
                    View All <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {corporatePartners.map((partner, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg border" data-testid={`row-partner-${index}`}>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${accentColors.coral}15` }}
                    >
                      <Building2 className="w-4 h-4" style={{ color: accentColors.coral }} />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{partner.name}</div>
                      <div className="text-xs text-muted-foreground">{partner.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold" style={{ color: accentColors.teal }}>{partner.value}</div>
                    <Badge 
                      variant="outline" 
                      className="text-xs"
                      style={{ 
                        borderColor: partner.status === 'Active' ? accentColors.lime : accentColors.orange,
                        color: partner.status === 'Active' ? accentColors.lime : accentColors.orange
                      }}
                    >
                      {partner.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="w-5 h-5" style={{ color: accentColors.orange }} />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link href="/quadrant">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" data-testid="button-quick-quadrant">
                  <Target className="w-5 h-5" style={{ color: accentColors.teal }} />
                  <span className="text-sm">Donor Quadrant</span>
                </Button>
              </Link>
              <Link href="/relationships">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" data-testid="button-quick-relationships">
                  <Network className="w-5 h-5" style={{ color: accentColors.sky }} />
                  <span className="text-sm">Relationships</span>
                </Button>
              </Link>
              <Link href="/corporate-partnerships">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" data-testid="button-quick-corporate">
                  <Building2 className="w-5 h-5" style={{ color: accentColors.coral }} />
                  <span className="text-sm">Corporations</span>
                </Button>
              </Link>
              <Link href="/ncr/foundation">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" data-testid="button-quick-foundations">
                  <Globe className="w-5 h-5" style={{ color: accentColors.olive }} />
                  <span className="text-sm">Foundations</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
