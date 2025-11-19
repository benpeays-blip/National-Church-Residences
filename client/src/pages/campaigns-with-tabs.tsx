import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { LayoutGrid, Calendar, Clock, CheckCircle2, TrendingUp, Target, BarChart3, Award, AlertCircle, DollarSign, Users, Percent, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Campaigns from "@/pages/campaigns";
import type { Campaign } from "@shared/schema";
import { formatCurrency } from "@/lib/utils";

function CampaignPerformance() {
  const { data: campaigns, isLoading } = useQuery<Campaign[]>({
    queryKey: ["/api/campaigns"],
  });

  if (isLoading) {
    return <div className="p-6">Loading performance data...</div>;
  }

  if (!campaigns) {
    return <div className="p-6">No campaign data available</div>;
  }

  // Calculate performance metrics
  const totalCampaigns = campaigns.length;
  const completedCampaigns = campaigns.filter(c => c.status === 'completed');
  const activeCampaigns = campaigns.filter(c => c.status === 'active');
  const completionRate = totalCampaigns > 0 ? (completedCampaigns.length / totalCampaigns) * 100 : 0;
  
  // Success metrics (campaigns that exceeded goal)
  const successfulCampaigns = completedCampaigns.filter(c => {
    const goal = parseFloat(c.goal || "0");
    const raised = parseFloat(c.raised || "0");
    return raised >= goal;
  });
  const successRate = completedCampaigns.length > 0 ? (successfulCampaigns.length / completedCampaigns.length) * 100 : 0;

  // Calculate average performance by type
  const performanceByType = campaigns.reduce((acc, campaign) => {
    const type = campaign.type || 'Other';
    const goal = parseFloat(campaign.goal || "0");
    const raised = parseFloat(campaign.raised || "0");
    const performance = goal > 0 ? (raised / goal) * 100 : 0;

    if (!acc[type]) {
      acc[type] = { total: 0, count: 0, raised: 0, goal: 0 };
    }
    acc[type].total += performance;
    acc[type].count += 1;
    acc[type].raised += raised;
    acc[type].goal += goal;
    return acc;
  }, {} as Record<string, { total: number; count: number; raised: number; goal: number }>);

  const typePerformance = Object.entries(performanceByType)
    .map(([type, data]) => ({
      type,
      avgPerformance: data.count > 0 ? data.total / data.count : 0,
      totalRaised: data.raised,
      totalGoal: data.goal,
      count: data.count,
    }))
    .sort((a, b) => b.avgPerformance - a.avgPerformance);

  // Top performing campaigns
  const topPerformers = [...campaigns]
    .map(c => ({
      ...c,
      performance: parseFloat(c.goal || "0") > 0 
        ? (parseFloat(c.raised || "0") / parseFloat(c.goal || "0")) * 100 
        : 0
    }))
    .sort((a, b) => b.performance - a.performance)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              {completedCampaigns.length} of {totalCampaigns} campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              {successfulCampaigns.length} exceeded goal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCampaigns.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently running
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Donor Count</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalCampaigns > 0 
                ? Math.round(campaigns.reduce((sum, c) => sum + (c.donorCount || 0), 0) / totalCampaigns)
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Per campaign
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance by Campaign Type */}
      <Card>
        <CardHeader>
          <CardTitle>Performance by Campaign Type</CardTitle>
          <CardDescription>Average performance across different campaign types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {typePerformance.map((type) => (
              <div key={type.type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{type.type}</span>
                      <Badge variant="outline" className="text-xs">
                        {type.count} campaign{type.count !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatCurrency(type.totalRaised)} of {formatCurrency(type.totalGoal)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">
                      {type.avgPerformance.toFixed(0)}%
                    </div>
                  </div>
                </div>
                <Progress value={Math.min(type.avgPerformance, 100)} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Campaigns</CardTitle>
          <CardDescription>Ranked by percentage of goal achieved</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topPerformers.map((campaign, index) => (
              <div key={campaign.id} className="flex items-center gap-4">
                <Badge variant={index === 0 ? "default" : "outline"} className="w-8 h-8 flex items-center justify-center shrink-0">
                  {index + 1}
                </Badge>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{campaign.name}</p>
                  <p className="text-xs text-muted-foreground">{campaign.type}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-semibold">{campaign.performance.toFixed(0)}%</div>
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(parseFloat(campaign.raised || "0"))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CampaignGoals() {
  const { data: campaigns, isLoading } = useQuery<Campaign[]>({
    queryKey: ["/api/campaigns"],
  });

  if (isLoading) {
    return <div className="p-6">Loading goals data...</div>;
  }

  if (!campaigns) {
    return <div className="p-6">No campaign data available</div>;
  }

  // Calculate goal metrics
  const totalGoal = campaigns.reduce((sum, c) => sum + parseFloat(c.goal || "0"), 0);
  const totalRaised = campaigns.reduce((sum, c) => sum + parseFloat(c.raised || "0"), 0);
  const overallProgress = totalGoal > 0 ? (totalRaised / totalGoal) * 100 : 0;

  // Active campaigns analysis
  const activeCampaigns = campaigns.filter(c => c.status === 'active');
  const activeGoal = activeCampaigns.reduce((sum, c) => sum + parseFloat(c.goal || "0"), 0);
  const activeRaised = activeCampaigns.reduce((sum, c) => sum + parseFloat(c.raised || "0"), 0);
  const activeProgress = activeGoal > 0 ? (activeRaised / activeGoal) * 100 : 0;

  // Goal achievement breakdown
  const onTrack = campaigns.filter(c => {
    const goal = parseFloat(c.goal || "0");
    const raised = parseFloat(c.raised || "0");
    const progress = goal > 0 ? (raised / goal) * 100 : 0;
    return progress >= 80 && progress < 100;
  });

  const exceeded = campaigns.filter(c => {
    const goal = parseFloat(c.goal || "0");
    const raised = parseFloat(c.raised || "0");
    return raised >= goal;
  });

  const underPerforming = campaigns.filter(c => {
    const goal = parseFloat(c.goal || "0");
    const raised = parseFloat(c.raised || "0");
    const progress = goal > 0 ? (raised / goal) * 100 : 0;
    return progress < 80 && c.status !== 'planning';
  });

  // Campaigns sorted by goal size
  const campaignsByGoal = [...campaigns]
    .sort((a, b) => parseFloat(b.goal || "0") - parseFloat(a.goal || "0"));

  return (
    <div className="space-y-6">
      {/* Overall Goal Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Goal</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalGoal)}</div>
            <p className="text-xs text-muted-foreground">
              Across all campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(totalRaised)} raised
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goal</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(activeGoal)}</div>
            <p className="text-xs text-muted-foreground">
              {activeCampaigns.length} active campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Progress</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProgress.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(activeRaised)} raised
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Goal Achievement Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Goal Achievement Breakdown</CardTitle>
          <CardDescription>Campaign performance against goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ArrowUp className="h-4 w-4 text-green-600" />
                <span className="font-medium">Exceeded Goal</span>
              </div>
              <div className="text-3xl font-bold">{exceeded.length}</div>
              <p className="text-xs text-muted-foreground">
                {campaigns.length > 0 ? ((exceeded.length / campaigns.length) * 100).toFixed(0) : 0}% of campaigns
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Minus className="h-4 w-4 text-blue-600" />
                <span className="font-medium">On Track (80%+)</span>
              </div>
              <div className="text-3xl font-bold">{onTrack.length}</div>
              <p className="text-xs text-muted-foreground">
                {campaigns.length > 0 ? ((onTrack.length / campaigns.length) * 100).toFixed(0) : 0}% of campaigns
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ArrowDown className="h-4 w-4 text-orange-600" />
                <span className="font-medium">Under Target</span>
              </div>
              <div className="text-3xl font-bold">{underPerforming.length}</div>
              <p className="text-xs text-muted-foreground">
                {campaigns.length > 0 ? ((underPerforming.length / campaigns.length) * 100).toFixed(0) : 0}% of campaigns
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Campaigns Goal Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Goal Tracking</CardTitle>
          <CardDescription>All campaigns ordered by goal size</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaignsByGoal.map((campaign) => {
              const goal = parseFloat(campaign.goal || "0");
              const raised = parseFloat(campaign.raised || "0");
              const progress = goal > 0 ? (raised / goal) * 100 : 0;
              
              let statusColor = "text-muted-foreground";
              if (progress >= 100) statusColor = "text-green-600";
              else if (progress >= 80) statusColor = "text-blue-600";
              else if (campaign.status !== 'planning') statusColor = "text-orange-600";

              return (
                <div key={campaign.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{campaign.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Goal: {formatCurrency(goal)}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className={`text-sm font-semibold ${statusColor}`}>
                        {progress.toFixed(0)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatCurrency(raised)}
                      </div>
                    </div>
                  </div>
                  <Progress value={Math.min(progress, 100)} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CampaignTrends() {
  const { data: campaigns, isLoading } = useQuery<Campaign[]>({
    queryKey: ["/api/campaigns"],
  });

  if (isLoading) {
    return <div className="p-6">Loading trends data...</div>;
  }

  if (!campaigns) {
    return <div className="p-6">No campaign data available</div>;
  }

  // Calculate year-over-year metrics (2024 vs 2025)
  const campaigns2024 = campaigns.filter(c => c.name.includes('2024'));
  const campaigns2025 = campaigns.filter(c => c.name.includes('2025'));

  const total2024 = campaigns2024.reduce((sum, c) => sum + parseFloat(c.raised || "0"), 0);
  const total2025 = campaigns2025.reduce((sum, c) => sum + parseFloat(c.raised || "0"), 0);
  const yoyGrowth = total2024 > 0 ? ((total2025 - total2024) / total2024) * 100 : 0;

  // Campaign type trends
  const typesTrend = campaigns.reduce((acc, campaign) => {
    const type = campaign.type || 'Other';
    const raised = parseFloat(campaign.raised || "0");
    
    if (!acc[type]) {
      acc[type] = { raised: 0, count: 0 };
    }
    acc[type].raised += raised;
    acc[type].count += 1;
    return acc;
  }, {} as Record<string, { raised: number; count: number }>);

  const trendsByType = Object.entries(typesTrend)
    .map(([type, data]) => ({
      type,
      totalRaised: data.raised,
      avgRaised: data.count > 0 ? data.raised / data.count : 0,
      count: data.count,
    }))
    .sort((a, b) => b.totalRaised - a.totalRaised);

  // Completion trends
  const completedCampaigns = campaigns.filter(c => c.status === 'completed');
  const avgCompletedRaised = completedCampaigns.length > 0
    ? completedCampaigns.reduce((sum, c) => sum + parseFloat(c.raised || "0"), 0) / completedCampaigns.length
    : 0;

  const avgCompletedDonors = completedCampaigns.length > 0
    ? completedCampaigns.reduce((sum, c) => sum + (c.donorCount || 0), 0) / completedCampaigns.length
    : 0;

  // Forecast for active campaigns - calculate incremental expected lift
  const activeCampaigns = campaigns.filter(c => c.status === 'active');
  const projectedIncremental = activeCampaigns.reduce((sum, c) => {
    const goal = parseFloat(c.goal || "0");
    const raised = parseFloat(c.raised || "0");
    const progress = goal > 0 ? raised / goal : 0;
    
    // Conservative forecast: assume 85% of goal if currently above 50%, otherwise current amount
    const forecast = progress > 0.5 ? goal * 0.85 : raised;
    // Only add the incremental lift above what's already raised to avoid double counting
    const incremental = Math.max(0, forecast - raised);
    return sum + incremental;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Year-over-Year Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">2024 Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(total2024)}</div>
            <p className="text-xs text-muted-foreground">
              {campaigns2024.length} campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">2025 Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(total2025)}</div>
            <p className="text-xs text-muted-foreground">
              {campaigns2025.length} campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YoY Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${yoyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {yoyGrowth >= 0 ? '+' : ''}{yoyGrowth.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Year-over-year change
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projected 2025</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(total2025 + projectedIncremental)}</div>
            <p className="text-xs text-muted-foreground">
              Including active forecasts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Type Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Fundraising by Campaign Type</CardTitle>
          <CardDescription>Historical performance across campaign categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trendsByType.map((type) => (
              <div key={type.type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{type.type}</span>
                      <Badge variant="outline" className="text-xs">
                        {type.count} campaign{type.count !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Avg per campaign: {formatCurrency(type.avgRaised)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">
                      {formatCurrency(type.totalRaised)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Total raised
                    </div>
                  </div>
                </div>
                <Progress 
                  value={(type.totalRaised / trendsByType[0].totalRaised) * 100} 
                  className="h-2" 
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Historical Averages */}
      <Card>
        <CardHeader>
          <CardTitle>Completed Campaign Benchmarks</CardTitle>
          <CardDescription>Average performance of completed campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm font-medium">Average Amount Raised</span>
              </div>
              <div className="text-3xl font-bold">{formatCurrency(avgCompletedRaised)}</div>
              <p className="text-xs text-muted-foreground">
                Based on {completedCampaigns.length} completed campaigns
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">Average Donor Count</span>
              </div>
              <div className="text-3xl font-bold">{Math.round(avgCompletedDonors)}</div>
              <p className="text-xs text-muted-foreground">
                Donors per completed campaign
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Campaign Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>Active Campaign Forecast</CardTitle>
          <CardDescription>Projected outcomes based on current performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeCampaigns.map((campaign) => {
              const goal = parseFloat(campaign.goal || "0");
              const raised = parseFloat(campaign.raised || "0");
              const progress = goal > 0 ? raised / goal : 0;
              const forecast = progress > 0.5 ? goal * 0.85 : raised;
              const forecastProgress = goal > 0 ? (forecast / goal) * 100 : 0;

              return (
                <div key={campaign.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <span className="font-medium truncate block">{campaign.name}</span>
                      <div className="text-xs text-muted-foreground mt-1">
                        Current: {formatCurrency(raised)} • Forecast: {formatCurrency(forecast)}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <Badge variant={forecastProgress >= 80 ? "default" : "outline"}>
                        {forecastProgress.toFixed(0)}% projected
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Progress value={Math.min((raised / goal) * 100, 100)} className="h-1.5" />
                    <Progress value={Math.min(forecastProgress, 100)} className="h-1 opacity-50" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const campaignTabs: SectionTab[] = [
  {
    label: "All Campaigns",
    value: "all",
    icon: LayoutGrid,
    path: "/campaigns",
  },
  {
    label: "Active",
    value: "active",
    icon: Calendar,
    path: "/campaigns?tab=active",
  },
  {
    label: "Planned",
    value: "planned",
    icon: Clock,
    path: "/campaigns?tab=planned",
  },
  {
    label: "Completed",
    value: "completed",
    icon: CheckCircle2,
    path: "/campaigns?tab=completed",
  },
  {
    label: "Performance",
    value: "performance",
    icon: TrendingUp,
    path: "/campaigns?tab=performance",
  },
  {
    label: "Goals",
    value: "goals",
    icon: Target,
    path: "/campaigns?tab=goals",
  },
  {
    label: "Trends",
    value: "trends",
    icon: BarChart3,
    path: "/campaigns?tab=trends",
  },
];

export default function CampaignsWithTabs() {
  const [location] = useLocation();
  
  // Determine active tab from URL - parse from location to ensure reactivity
  const params = new URLSearchParams(location.split('?')[1] || '');
  const activeTab = params.get('tab') || 'all';

  // Map activeTab to filterStatus for Campaigns component
  const getFilterStatus = (): "active" | "planned" | "completed" | undefined => {
    if (activeTab === 'active') return 'active';
    if (activeTab === 'planned') return 'planned';
    if (activeTab === 'completed') return 'completed';
    return undefined;
  };

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={campaignTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        {(activeTab === 'all' || activeTab === 'active' || activeTab === 'planned' || activeTab === 'completed') && (
          <Campaigns key={`campaigns-${activeTab}`} filterStatus={getFilterStatus()} />
        )}
        {activeTab === 'performance' && <CampaignPerformance key="performance" />}
        {activeTab === 'goals' && <CampaignGoals key="goals" />}
        {activeTab === 'trends' && <CampaignTrends key="trends" />}
      </div>
    </div>
  );
}
