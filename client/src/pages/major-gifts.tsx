import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  Heart,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Phone,
  Mail,
  Clock,
  Star,
  Award,
  Sparkles,
  ChevronRight,
  Building2,
  Gift,
  BarChart3,
  PieChart
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Link } from "wouter";

export default function MajorGifts() {
  const metrics = {
    ytdTotal: 2847500,
    ytdGoal: 3500000,
    pipelineValue: 1250000,
    avgGiftSize: 47458,
    majorDonors: 60,
    newMajorDonors: 8,
    renewalRate: 87.5,
    upgradeRate: 23.4,
  };

  const topDonors = [
    { 
      id: "1",
      name: "Margaret & William Chen", 
      lifetimeGiving: 1250000, 
      ytdGiving: 125000,
      lastGift: "2025-11-15",
      status: "active",
      level: "Visionary",
      propensity: 95,
      nextAction: "Schedule stewardship dinner",
      mgo: "Sarah Mitchell"
    },
    { 
      id: "2",
      name: "The Henderson Family Foundation", 
      lifetimeGiving: 875000, 
      ytdGiving: 100000,
      lastGift: "2025-10-28",
      status: "active",
      level: "Visionary",
      propensity: 88,
      nextAction: "Present capital campaign proposal",
      mgo: "James Rodriguez"
    },
    { 
      id: "3",
      name: "Dr. Robert & Patricia Shaw", 
      lifetimeGiving: 650000, 
      ytdGiving: 75000,
      lastGift: "2025-09-12",
      status: "active",
      level: "Leadership",
      propensity: 92,
      nextAction: "Invite to board cultivation event",
      mgo: "Sarah Mitchell"
    },
    { 
      id: "4",
      name: "Elizabeth Thornton", 
      lifetimeGiving: 425000, 
      ytdGiving: 50000,
      lastGift: "2025-12-01",
      status: "active",
      level: "Leadership",
      propensity: 85,
      nextAction: "Send impact report",
      mgo: "Michael Park"
    },
    { 
      id: "5",
      name: "The Riverside Foundation", 
      lifetimeGiving: 350000, 
      ytdGiving: 50000,
      lastGift: "2025-08-20",
      status: "active",
      level: "Leadership",
      propensity: 78,
      nextAction: "Schedule grant renewal meeting",
      mgo: "James Rodriguez"
    },
  ];

  const pipeline = [
    { stage: "Discovery", count: 12, value: 180000, color: "#6baed6" },
    { stage: "Qualification", count: 8, value: 320000, color: "#4292c6" },
    { stage: "Cultivation", count: 15, value: 425000, color: "#2171b5" },
    { stage: "Solicitation", count: 6, value: 275000, color: "#084594" },
    { stage: "Stewardship", count: 4, value: 50000, color: "#08306b" },
  ];

  const recentGifts = [
    { donor: "Margaret & William Chen", amount: 50000, date: "Dec 10, 2025", designation: "Capital Campaign", method: "Wire Transfer" },
    { donor: "Elizabeth Thornton", amount: 50000, date: "Dec 1, 2025", designation: "Annual Fund Leadership", method: "DAF" },
    { donor: "Anonymous Donor", amount: 35000, date: "Nov 28, 2025", designation: "Scholarship Fund", method: "Check" },
    { donor: "Dr. James Mitchell", amount: 25000, date: "Nov 22, 2025", designation: "Endowment", method: "Stock" },
    { donor: "The Parker Family Trust", amount: 25000, date: "Nov 18, 2025", designation: "Capital Campaign", method: "DAF" },
  ];

  const givingLevels = [
    { name: "Visionary Circle", range: "$100,000+", count: 6, revenue: 1150000, icon: Star },
    { name: "Leadership Circle", range: "$50,000 - $99,999", count: 14, revenue: 847500, icon: Award },
    { name: "Benefactor Circle", range: "$25,000 - $49,999", count: 18, revenue: 562500, icon: Heart },
    { name: "Patron Circle", range: "$10,000 - $24,999", count: 22, revenue: 287500, icon: Gift },
  ];

  const mgoPerformance = [
    { name: "Sarah Mitchell", portfolio: 18, ytdRaised: 875000, goal: 1000000, visits: 42, proposals: 8 },
    { name: "James Rodriguez", portfolio: 15, ytdRaised: 725000, goal: 850000, visits: 38, proposals: 6 },
    { name: "Michael Park", portfolio: 12, ytdRaised: 650000, goal: 750000, visits: 35, proposals: 7 },
    { name: "Emily Watson", portfolio: 15, ytdRaised: 597500, goal: 900000, visits: 28, proposals: 5 },
  ];

  const upcomingActivities = [
    { type: "Meeting", donor: "Margaret Chen", date: "Dec 16", description: "Stewardship lunch at The Capital Grille" },
    { type: "Call", donor: "Dr. Robert Shaw", date: "Dec 17", description: "Follow-up on campaign proposal" },
    { type: "Event", donor: "Multiple Donors", date: "Dec 19", description: "Holiday appreciation reception" },
    { type: "Visit", donor: "Henderson Foundation", date: "Dec 20", description: "On-site tour and meeting" },
  ];

  const ytdProgress = (metrics.ytdTotal / metrics.ytdGoal) * 100;

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold" data-testid="page-title">Major Gifts Program</h1>
          <p className="text-muted-foreground mt-1">
            Transformational giving partnerships of $10,000 or more
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" data-testid="button-export">
            <BarChart3 className="w-4 h-4 mr-2" />
            Reports
          </Button>
          <Button size="sm" data-testid="button-new-prospect">
            <Users className="w-4 h-4 mr-2" />
            Add Prospect
          </Button>
        </div>
      </div>

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border overflow-hidden">
          <div className="h-1 bg-primary" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">YTD Major Gifts</span>
              <DollarSign className="w-4 h-4 text-primary" />
            </div>
            <div className="text-3xl font-bold tabular-nums">{formatCurrency(metrics.ytdTotal)}</div>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Goal: {formatCurrency(metrics.ytdGoal)}</span>
                <span className="font-medium">{ytdProgress.toFixed(0)}%</span>
              </div>
              <Progress value={ytdProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border overflow-hidden">
          <div className="h-1" style={{ backgroundColor: "#2171b5" }} />
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Pipeline Value</span>
              <Target className="w-4 h-4" style={{ color: "#2171b5" }} />
            </div>
            <div className="text-3xl font-bold tabular-nums">{formatCurrency(metrics.pipelineValue)}</div>
            <p className="text-xs text-muted-foreground mt-2">
              45 prospects in active cultivation
            </p>
          </CardContent>
        </Card>

        <Card className="border overflow-hidden">
          <div className="h-1" style={{ backgroundColor: "#4292c6" }} />
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Major Donors</span>
              <Users className="w-4 h-4" style={{ color: "#4292c6" }} />
            </div>
            <div className="text-3xl font-bold tabular-nums">{metrics.majorDonors}</div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUpRight className="w-3 h-3 text-emerald-600" />
              <span className="text-xs text-emerald-600 font-medium">+{metrics.newMajorDonors} new this year</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border overflow-hidden">
          <div className="h-1" style={{ backgroundColor: "#6baed6" }} />
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Avg Gift Size</span>
              <TrendingUp className="w-4 h-4" style={{ color: "#6baed6" }} />
            </div>
            <div className="text-3xl font-bold tabular-nums">{formatCurrency(metrics.avgGiftSize)}</div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUpRight className="w-3 h-3 text-emerald-600" />
              <span className="text-xs text-emerald-600 font-medium">+12% vs last year</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{metrics.renewalRate}%</div>
            <div className="text-xs text-muted-foreground mt-1">Renewal Rate</div>
          </CardContent>
        </Card>
        <Card className="border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{metrics.upgradeRate}%</div>
            <div className="text-xs text-muted-foreground mt-1">Upgrade Rate</div>
          </CardContent>
        </Card>
        <Card className="border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">4.2</div>
            <div className="text-xs text-muted-foreground mt-1">Avg Visits/Donor</div>
          </CardContent>
        </Card>
        <Card className="border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">68%</div>
            <div className="text-xs text-muted-foreground mt-1">Solicitation Success</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Major Donors - Takes 2 columns */}
        <Card className="lg:col-span-2 border">
          <CardHeader style={{ backgroundColor: '#395174' }}>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                  <Star className="w-4 h-4" style={{ color: "#e1c47d" }} />
                  Top Major Donors
                </CardTitle>
                <CardDescription className="text-white/80 text-xs">
                  Highest lifetime value relationships
                </CardDescription>
              </div>
              <Link href="/donors">
                <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10">
                  View All
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="font-medium">Donor</TableHead>
                  <TableHead className="font-medium text-right">Lifetime</TableHead>
                  <TableHead className="font-medium text-right">YTD</TableHead>
                  <TableHead className="font-medium">Level</TableHead>
                  <TableHead className="font-medium">Next Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topDonors.map((donor) => (
                  <TableRow key={donor.id} className="hover-elevate cursor-pointer" data-testid={`row-donor-${donor.id}`}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                            {donor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{donor.name}</p>
                          <p className="text-xs text-muted-foreground">MGO: {donor.mgo}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold text-sm">{formatCurrency(donor.lifetimeGiving)}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-sm">{formatCurrency(donor.ytdGiving)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${donor.level === 'Visionary' ? 'border-amber-500 text-amber-700 bg-amber-50' : 'border-primary/30'}`}
                      >
                        {donor.level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-muted-foreground">{donor.nextAction}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pipeline Summary */}
        <Card className="border">
          <CardHeader style={{ backgroundColor: '#395174' }}>
            <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              Pipeline by Stage
            </CardTitle>
            <CardDescription className="text-white/80 text-xs">
              Active major gift opportunities
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {pipeline.map((stage) => (
              <div key={stage.stage} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
                    <span className="text-sm font-medium">{stage.stage}</span>
                  </div>
                  <span className="text-sm font-semibold">{formatCurrency(stage.value)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={(stage.value / metrics.pipelineValue) * 100} 
                    className="h-1.5 flex-1"
                  />
                  <span className="text-xs text-muted-foreground w-16 text-right">{stage.count} prospects</span>
                </div>
              </div>
            ))}
            <div className="pt-3 border-t mt-4">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>Total Pipeline</span>
                <span className="text-primary">{formatCurrency(metrics.pipelineValue)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Giving Levels & Recent Gifts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Giving Levels */}
        <Card className="border">
          <CardHeader style={{ backgroundColor: '#395174' }}>
            <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
              <Award className="w-4 h-4" style={{ color: "#e1c47d" }} />
              Recognition Circles
            </CardTitle>
            <CardDescription className="text-white/80 text-xs">
              Major donor giving levels
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {givingLevels.map((level) => (
              <div 
                key={level.name} 
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover-elevate"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <level.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{level.name}</p>
                    <p className="text-xs text-muted-foreground">{level.range}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{formatCurrency(level.revenue)}</p>
                  <p className="text-xs text-muted-foreground">{level.count} donors</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Major Gifts */}
        <Card className="border">
          <CardHeader style={{ backgroundColor: '#395174' }}>
            <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Recent Major Gifts
            </CardTitle>
            <CardDescription className="text-white/80 text-xs">
              Latest transformational contributions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {recentGifts.map((gift, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover-elevate"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{gift.donor}</p>
                    <p className="text-xs text-muted-foreground">{gift.designation} • {gift.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{formatCurrency(gift.amount)}</p>
                  <p className="text-xs text-muted-foreground">{gift.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* MGO Performance & Upcoming Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MGO Performance - Takes 2 columns */}
        <Card className="lg:col-span-2 border">
          <CardHeader style={{ backgroundColor: '#395174' }}>
            <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
              <Users className="w-4 h-4" />
              Major Gift Officer Performance
            </CardTitle>
            <CardDescription className="text-white/80 text-xs">
              Year-to-date fundraising results by MGO
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="font-medium">Officer</TableHead>
                  <TableHead className="font-medium text-center">Portfolio</TableHead>
                  <TableHead className="font-medium text-right">YTD Raised</TableHead>
                  <TableHead className="font-medium">Progress</TableHead>
                  <TableHead className="font-medium text-center">Visits</TableHead>
                  <TableHead className="font-medium text-center">Proposals</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mgoPerformance.map((mgo, idx) => {
                  const progress = (mgo.ytdRaised / mgo.goal) * 100;
                  return (
                    <TableRow key={idx} className="hover-elevate">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {mgo.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">{mgo.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className="text-xs">{mgo.portfolio}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-sm">
                        {formatCurrency(mgo.ytdRaised)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={progress} className="h-2 w-20" />
                          <span className="text-xs text-muted-foreground">{progress.toFixed(0)}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center text-sm">{mgo.visits}</TableCell>
                      <TableCell className="text-center text-sm">{mgo.proposals}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Upcoming Activities */}
        <Card className="border">
          <CardHeader style={{ backgroundColor: '#395174' }}>
            <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Upcoming Activities
            </CardTitle>
            <CardDescription className="text-white/80 text-xs">
              This week's major gift touchpoints
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {upcomingActivities.map((activity, idx) => (
              <div 
                key={idx} 
                className="p-3 rounded-lg border bg-muted/20 hover-elevate"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{activity.date}</span>
                </div>
                <p className="font-medium text-sm">{activity.donor}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="border bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                AI-Powered Insights
                <Badge variant="secondary" className="text-xs">Beta</Badge>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-background/80 border">
                  <p className="font-medium text-sm text-primary mb-1">Upgrade Opportunity</p>
                  <p className="text-xs text-muted-foreground">
                    3 Leadership Circle donors showing signals for potential upgrade to Visionary level based on recent engagement patterns.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-background/80 border">
                  <p className="font-medium text-sm text-primary mb-1">At-Risk Renewal</p>
                  <p className="text-xs text-muted-foreground">
                    2 major donors have reduced engagement. Consider prioritizing stewardship touchpoints this month.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-background/80 border">
                  <p className="font-medium text-sm text-primary mb-1">Optimal Ask Timing</p>
                  <p className="text-xs text-muted-foreground">
                    5 prospects in Cultivation stage have ideal timing indicators for solicitation in Q1 2026.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
