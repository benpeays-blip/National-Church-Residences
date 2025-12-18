import { useParams, Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  Heart, 
  Users, 
  DollarSign, 
  TrendingUp,
  Calendar,
  Target,
  Gift,
  Building2,
  Award,
  CheckCircle2,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { AccentCard, NCR_BRAND_COLORS, type AccentColor } from "@/components/ui/accent-card";

interface MetricData {
  label: string;
  value: string;
  icon: any;
  description: string;
  color: string;
  accentColor: AccentColor;
  detailTitle: string;
  highlights: { label: string; value: string; trend?: string }[];
  breakdowns: { name: string; value: string; percentage: number }[];
  recentActivity: { title: string; date: string; amount?: string }[];
  goals: { name: string; current: number; target: number }[];
}

const metricsData: Record<string, MetricData> = {
  "annual-giving": {
    label: "Annual Giving",
    value: "$12.4M",
    icon: DollarSign,
    description: "Total philanthropic support",
    color: "#084594",
    accentColor: "teal",
    detailTitle: "Annual Giving Overview",
    highlights: [
      { label: "Year-to-Date", value: "$12.4M", trend: "+8.3%" },
      { label: "Average Gift", value: "$1,458", trend: "+12%" },
      { label: "Monthly Donors", value: "2,340", trend: "+15%" },
      { label: "Major Gifts ($10K+)", value: "89", trend: "+5%" }
    ],
    breakdowns: [
      { name: "Individual Donations", value: "$7.2M", percentage: 58 },
      { name: "Corporate Partners", value: "$3.1M", percentage: 25 },
      { name: "Foundation Grants", value: "$1.5M", percentage: 12 },
      { name: "Planned Giving", value: "$0.6M", percentage: 5 }
    ],
    recentActivity: [
      { title: "Major gift from the Anderson Family Trust", date: "Dec 15, 2024", amount: "$250,000" },
      { title: "Corporate matching program completed", date: "Dec 12, 2024", amount: "$125,000" },
      { title: "Year-end giving campaign launched", date: "Dec 1, 2024" },
      { title: "Thanksgiving donor appreciation event", date: "Nov 28, 2024" }
    ],
    goals: [
      { name: "Annual Campaign Goal", current: 12400000, target: 15000000 },
      { name: "New Donor Acquisition", current: 1250, target: 1500 },
      { name: "Donor Retention Rate", current: 78, target: 85 }
    ]
  },
  "active-donors": {
    label: "Active Donors",
    value: "8,500+",
    icon: Users,
    description: "Individual supporters",
    color: "#2171b5",
    accentColor: "sky",
    detailTitle: "Donor Community Overview",
    highlights: [
      { label: "Total Active Donors", value: "8,547", trend: "+12%" },
      { label: "New This Year", value: "1,234", trend: "+18%" },
      { label: "Retention Rate", value: "78%", trend: "+3%" },
      { label: "Lifetime Value", value: "$4,250" }
    ],
    breakdowns: [
      { name: "First-Time Donors", value: "1,234", percentage: 14 },
      { name: "Repeat Donors (2-5 yrs)", value: "3,890", percentage: 46 },
      { name: "Loyal Donors (5-10 yrs)", value: "2,156", percentage: 25 },
      { name: "Legacy Donors (10+ yrs)", value: "1,267", percentage: 15 }
    ],
    recentActivity: [
      { title: "250 new donors from Giving Tuesday", date: "Dec 3, 2024" },
      { title: "Monthly giving program expanded", date: "Nov 15, 2024" },
      { title: "Donor recognition ceremony held", date: "Nov 10, 2024" },
      { title: "Alumni outreach initiative launched", date: "Oct 28, 2024" }
    ],
    goals: [
      { name: "Total Active Donors", current: 8547, target: 10000 },
      { name: "Monthly Giving Members", current: 2340, target: 3000 },
      { name: "Corporate Partners", current: 156, target: 200 }
    ]
  },
  "programs-funded": {
    label: "Programs Funded",
    value: "45",
    icon: Heart,
    description: "Direct impact initiatives",
    color: "#4292c6",
    accentColor: "coral",
    detailTitle: "Funded Programs Overview",
    highlights: [
      { label: "Active Programs", value: "45", trend: "+7" },
      { label: "Communities Served", value: "340", trend: "+15" },
      { label: "Lives Impacted", value: "28,500", trend: "+22%" },
      { label: "Program Satisfaction", value: "94%" }
    ],
    breakdowns: [
      { name: "Resident Assistance", value: "12 programs", percentage: 27 },
      { name: "Health & Wellness", value: "15 programs", percentage: 33 },
      { name: "Community Building", value: "10 programs", percentage: 22 },
      { name: "Education & Training", value: "8 programs", percentage: 18 }
    ],
    recentActivity: [
      { title: "New telehealth program launched in 5 communities", date: "Dec 10, 2024" },
      { title: "Emergency heating assistance expanded", date: "Nov 25, 2024" },
      { title: "Fitness program partnership with local YMCA", date: "Nov 1, 2024" },
      { title: "Digital literacy classes began", date: "Oct 15, 2024" }
    ],
    goals: [
      { name: "Programs Active", current: 45, target: 50 },
      { name: "Communities Reached", current: 340, target: 400 },
      { name: "Resident Participation", current: 65, target: 80 }
    ]
  },
  "endowment": {
    label: "Endowment",
    value: "$42M",
    icon: TrendingUp,
    description: "Long-term sustainability",
    color: "#6baed6",
    accentColor: "lime",
    detailTitle: "Endowment Fund Overview",
    highlights: [
      { label: "Total Endowment", value: "$42M", trend: "+6.2%" },
      { label: "Annual Payout", value: "$1.9M" },
      { label: "Investment Return", value: "8.4%" },
      { label: "New Gifts This Year", value: "$2.1M" }
    ],
    breakdowns: [
      { name: "General Endowment", value: "$18.5M", percentage: 44 },
      { name: "Resident Assistance", value: "$12.2M", percentage: 29 },
      { name: "Capital Projects", value: "$7.8M", percentage: 19 },
      { name: "Scholarship Funds", value: "$3.5M", percentage: 8 }
    ],
    recentActivity: [
      { title: "New planned gift commitment received", date: "Dec 8, 2024", amount: "$500,000" },
      { title: "Q3 investment review completed", date: "Oct 31, 2024" },
      { title: "Named fund established by Williams family", date: "Oct 15, 2024", amount: "$100,000" },
      { title: "Endowment policy updated by board", date: "Sep 20, 2024" }
    ],
    goals: [
      { name: "Total Endowment Value", current: 42000000, target: 50000000 },
      { name: "Annual Endowment Gifts", current: 2100000, target: 3000000 },
      { name: "Planned Giving Pipeline", current: 35, target: 50 }
    ]
  }
};

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return num.toLocaleString();
  }
  return `${num}%`;
}

export default function FoundationMetricDetail() {
  const params = useParams();
  const metricId = params.metricId as string;
  
  const metric = metricsData[metricId];
  
  if (!metric) {
    return (
      <div className="space-y-6">
        <Link href="/ncr-foundation">
          <Button variant="ghost" className="gap-2" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Back to Foundation
          </Button>
        </Link>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Metric not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const IconComponent = metric.icon;
  const accentColors: AccentColor[] = ["teal", "sky", "lime", "coral", "orange", "olive"];

  return (
    <div className="space-y-6">
      <Link href="/ncr-foundation">
        <Button variant="ghost" className="gap-2" data-testid="button-back">
          <ArrowLeft className="h-4 w-4" />
          Back to Foundation
        </Button>
      </Link>

      <div 
        className="rounded-xl p-8 text-white"
        style={{ backgroundColor: metric.color }}
      >
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-full bg-white/20">
            <IconComponent className="h-10 w-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold" data-testid="metric-title">{metric.detailTitle}</h1>
            <p className="text-white/80 mt-1">{metric.description}</p>
          </div>
        </div>
        <div className="mt-6">
          <div className="text-5xl font-bold">{metric.value}</div>
          <p className="text-white/70 mt-1">Current Value</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metric.highlights.map((highlight, index) => (
          <AccentCard 
            key={highlight.label} 
            accent={accentColors[index % accentColors.length]}
            data-testid={`highlight-${highlight.label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <CardContent className="pt-4 pb-4">
              <div className="text-2xl font-bold">{highlight.value}</div>
              <div className="text-sm text-muted-foreground">{highlight.label}</div>
              {highlight.trend && (
                <Badge 
                  variant="secondary" 
                  className="mt-2 text-xs"
                  style={{ backgroundColor: "#2ca02c20", color: "#2ca02c" }}
                >
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {highlight.trend}
                </Badge>
              )}
            </CardContent>
          </AccentCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" style={{ color: metric.color }} />
              Breakdown
            </CardTitle>
            <CardDescription>Distribution by category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {metric.breakdowns.map((item, index) => (
              <div key={item.name} className="space-y-2" data-testid={`breakdown-${index}`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm font-semibold" style={{ color: metric.color }}>{item.value}</span>
                </div>
                <Progress 
                  value={item.percentage} 
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">{item.percentage}% of total</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="bg-[#395174] text-white">
            <CardTitle className="flex items-center gap-2 text-white">
              <Sparkles className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-white/80">Latest updates and milestones</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {metric.recentActivity.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-3 rounded-lg border"
                  data-testid={`activity-${index}`}
                >
                  <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" style={{ color: metric.color }} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{activity.date}</span>
                      {activity.amount && (
                        <Badge variant="secondary" className="text-xs">{activity.amount}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-[#395174] text-white">
          <CardTitle className="flex items-center gap-2 text-white">
            <Award className="h-5 w-5" />
            Goals & Progress
          </CardTitle>
          <CardDescription className="text-white/80">Tracking our targets for this fiscal year</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-6">
            {metric.goals.map((goal, index) => {
              const percentage = Math.min(100, Math.round((goal.current / goal.target) * 100));
              return (
                <div 
                  key={goal.name} 
                  className="p-4 rounded-lg border"
                  data-testid={`goal-${index}`}
                >
                  <h4 className="font-medium mb-3">{goal.name}</h4>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-2xl font-bold" style={{ color: metric.color }}>
                      {formatNumber(goal.current)}
                    </span>
                    <span className="text-sm text-muted-foreground mb-1">
                      / {formatNumber(goal.target)}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-3 mb-2" />
                  <p className="text-sm text-muted-foreground">{percentage}% complete</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-2" style={{ borderColor: `${metric.color}30`, backgroundColor: `${metric.color}05` }}>
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div 
                className="p-3 rounded-full"
                style={{ backgroundColor: `${metric.color}20` }}
              >
                <Gift className="h-6 w-6" style={{ color: metric.color }} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Want to make an impact?</h3>
                <p className="text-muted-foreground">Your support directly contributes to this area.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button style={{ backgroundColor: metric.color }} data-testid="button-donate">
                <Heart className="h-4 w-4 mr-2" />
                Donate Now
              </Button>
              <Button variant="outline" data-testid="button-learn-more">
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
