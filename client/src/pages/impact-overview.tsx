import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2,
  Heart,
  Users,
  Home,
  TrendingUp,
  ArrowRight,
  Clock,
  Star,
  Sparkles,
  BarChart3
} from "lucide-react";

interface ImpactMetric {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  description: string;
  icon: any;
  trend: string;
  href: string;
  color: string;
}

const impactMetrics: ImpactMetric[] = [
  {
    id: "building-facilities",
    title: "Building Facilities",
    value: "340",
    subtitle: "Properties Nationwide",
    description: "Senior living communities and affordable housing properties serving residents across 28 states",
    icon: Building2,
    trend: "+12 new properties YTD",
    href: "/impact/building-facilities",
    color: "#7FA3A1"
  },
  {
    id: "home-health-visits",
    title: "Home Health Visits",
    value: "156,420",
    subtitle: "Annual Visits",
    description: "In-home care visits providing wellness checks, medication management, and therapeutic services",
    icon: Heart,
    trend: "+18% from last year",
    href: "/impact/home-health",
    color: "#D5636C"
  },
  {
    id: "volunteer-hours",
    title: "Volunteer Hours",
    value: "48,250",
    subtitle: "Hours Contributed",
    description: "Dedicated volunteers supporting companionship, nutrition, recreation, and wellness programs",
    icon: Users,
    trend: "1,245 active volunteers",
    href: "/impact/volunteer-hours",
    color: "#E8923A"
  },
  {
    id: "affordable-units",
    title: "Affordable Housing Units",
    value: "24,850",
    subtitle: "Units Available",
    description: "Income-restricted housing serving seniors at 30-80% of Area Median Income levels",
    icon: Home,
    trend: "97.2% occupancy rate",
    href: "/impact/affordable-units",
    color: "#B5C942"
  },
];

const quickStats = [
  { label: "Total Residents Served", value: "32,450", icon: Users, color: "#084594" },
  { label: "States with Presence", value: "28", icon: Building2, color: "#7FA3A1" },
  { label: "Average Satisfaction", value: "96.8%", icon: Star, color: "#2ca02c" },
  { label: "Years of Service", value: "60+", icon: Clock, color: "#E8923A" },
];

export default function ImpactOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#395174" }} data-testid="page-title">
            Impact Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive view of NCR's mission impact across housing, healthcare, and community services
          </p>
        </div>
      </div>

      <Card className="p-4" style={{ backgroundColor: "rgba(57, 81, 116, 0.05)" }}>
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 mt-0.5" style={{ color: "#395174" }} />
          <div>
            <h4 className="font-medium text-sm" style={{ color: "#395174" }}>Mission Impact Dashboard</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Click any metric card below to explore detailed breakdowns, historical trends, and comprehensive data. 
              All metrics are updated monthly from NCR's operational systems.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <Card key={stat.label} className="border-l-4 overflow-hidden" style={{ borderLeftColor: stat.color }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div 
                  className="h-12 w-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                </div>
                <div>
                  <div className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader 
          className="rounded-t-lg"
          style={{ backgroundColor: "#395174" }}
        >
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Mission Impact Metrics
          </CardTitle>
          <CardDescription className="text-white/80">
            Click any card to view comprehensive drill-down data
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {impactMetrics.map((metric) => (
              <Link key={metric.id} href={metric.href}>
                <Card 
                  className="cursor-pointer transition-all duration-200 hover:shadow-lg hover-elevate group h-full border-l-4 overflow-hidden"
                  style={{ borderLeftColor: metric.color }}
                  data-testid={`card-metric-${metric.id}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div 
                        className="h-12 w-12 rounded-lg transition-all duration-200 group-hover:scale-105 flex items-center justify-center"
                        style={{ backgroundColor: `${metric.color}15` }}
                      >
                        <metric.icon className="h-6 w-6" style={{ color: metric.color }} />
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-xl">{metric.title}</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold" style={{ color: metric.color }}>
                          {metric.value}
                        </span>
                        <span className="text-sm text-muted-foreground">{metric.subtitle}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{metric.description}</p>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <Badge variant="secondary">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {metric.trend}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: "#2ca02c" }}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" style={{ color: "#395174" }} />
              Year-Over-Year Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Residents Served</span>
                  <Badge variant="outline" style={{ borderColor: "#2ca02c", color: "#2ca02c" }}>+12%</Badge>
                </div>
                <div className="text-sm text-muted-foreground">32,450 vs 28,970 last year</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Home Health Visits</span>
                  <Badge variant="outline" style={{ borderColor: "#2ca02c", color: "#2ca02c" }}>+18%</Badge>
                </div>
                <div className="text-sm text-muted-foreground">156,420 vs 132,560 last year</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Volunteer Engagement</span>
                  <Badge variant="outline" style={{ borderColor: "#2ca02c", color: "#2ca02c" }}>+22%</Badge>
                </div>
                <div className="text-sm text-muted-foreground">48,250 hrs vs 39,550 hrs last year</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Affordable Units Added</span>
                  <Badge variant="outline" style={{ borderColor: "#2ca02c", color: "#2ca02c" }}>+580</Badge>
                </div>
                <div className="text-sm text-muted-foreground">24,850 total vs 24,270 last year</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: "#D4A84B" }}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5" style={{ color: "#395174" }} />
              Impact Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold">Housing Stability</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  95% of emergency assistance recipients maintained stable housing
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold">Health Outcomes</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  30% reduction in hospital readmissions through home health programs
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold">Community Connection</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  85% of program participants report improved mental wellbeing
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold">Financial Impact</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  $181M in annual rent savings for residents vs. market rates
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
