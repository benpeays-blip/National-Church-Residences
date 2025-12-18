import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import DonorQuadrantMapper from "@/components/donor-quadrant-mapper";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  ArrowRight,
  Target,
  Gift,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Opportunity, Gift as GiftType, Task, Campaign } from "@shared/schema";

interface DashboardData {
  metrics: {
    ytdRaised: number;
    annualGoal: number;
    pipelineValue: number;
    pipelineWeightedValue: number;
    activeMonthlyDonors: number;
    avgGiftSize: number;
    forecast90Days: number;
  };
  topOpportunities: (Opportunity & {
    person?: { firstName: string; lastName: string };
    actionDescription?: string;
  })[];
  recentGifts: (GiftType & {
    person?: { firstName: string; lastName: string };
    campaign?: { name: string };
  })[];
  nextBestActions: (Task & {
    description?: string;
  })[];
}

export default function DashboardHome() {
  const { data, isLoading } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard/home"],
  });

  const { data: allCampaigns, isLoading: campaignsLoading } = useQuery<Campaign[]>({
    queryKey: ["/api/campaigns"],
  });

  // Filter for active campaigns, prioritize $10 Million campaign, and take top 3
  const activeCampaigns = allCampaigns?.filter(c => c.status === 'active')
    .sort((a, b) => {
      // Put $10 Million campaign first
      if (a.name.includes('$10 Million')) return -1;
      if (b.name.includes('$10 Million')) return 1;
      return 0;
    })
    .slice(0, 3) || [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-96 bg-muted/20 rounded-lg animate-pulse" />
      </div>
    );
  }

  const ytdProgress = data?.metrics.annualGoal 
    ? (data.metrics.ytdRaised / data.metrics.annualGoal) * 100 
    : 0;

  return (
    <div className="space-y-8 p-6">
      {/* Donor Quadrant Section */}
      <div className="space-y-4">
        <DonorQuadrantMapper />
      </div>

      {/* Key Performance Metrics */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Performance Overview</h2>
        
        {/* Top Row: Primary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border" style={{ backgroundColor: 'rgba(222, 235, 247, 0.3)' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">YTD Progress</CardTitle>
              <Target className="h-4 w-4" style={{ color: "#084594" }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tabular-nums" style={{ color: "#084594" }}>
                {ytdProgress.toFixed(0)}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {formatCurrency(data?.metrics.ytdRaised || 0)} of {formatCurrency(data?.metrics.annualGoal || 0)}
              </p>
              <Progress value={ytdProgress} className="mt-3" />
            </CardContent>
          </Card>

          <Link href="/pipeline">
            <Card className="border hover-elevate cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
                <TrendingUp className="h-4 w-4" style={{ color: "#084594" }} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold tabular-nums" style={{ color: "#084594" }}>
                  {formatCurrency(data?.metrics.pipelineWeightedValue || 0)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatCurrency(data?.metrics.pipelineValue || 0)} total value
                </p>
              </CardContent>
            </Card>
          </Link>

          <Card className="border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Donors</CardTitle>
              <Users className="h-4 w-4" style={{ color: "#084594" }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tabular-nums" style={{ color: "#084594" }}>
                {data?.metrics.activeMonthlyDonors || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Active recurring gifts
              </p>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">90-Day Forecast</CardTitle>
              <DollarSign className="h-4 w-4" style={{ color: "#084594" }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tabular-nums" style={{ color: "#084594" }}>
                {formatCurrency(data?.metrics.forecast90Days || 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Expected revenue
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Activity & Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Opportunities */}
        <Card className="border">
          <CardHeader style={{ backgroundColor: '#395174' }}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-white">Top Opportunities</CardTitle>
              <Link href="/pipeline">
                <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10">
                  View All
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {data?.topOpportunities.slice(0, 5).map((opp) => (
                <div
                  key={opp.id}
                  className="rounded-lg hover-elevate overflow-hidden border"
                >
                  <div 
                    className="flex items-start justify-between gap-3 p-3"
                    style={{ backgroundColor: 'rgba(222, 235, 247, 0.5)' }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate mb-1.5">
                        {opp.person?.firstName} {opp.person?.lastName}
                      </p>
                      <Badge 
                        variant="outline" 
                        className="bg-primary/5 border-primary/20 text-primary text-xs"
                      >
                        {opp.stage}
                      </Badge>
                    </div>
                    <div className="text-right shrink-0 space-y-1">
                      <div className="whitespace-nowrap">
                        <span className="text-xs text-muted-foreground">Amount to Request: </span>
                        <span className="text-sm font-semibold tabular-nums">
                          {formatCurrency(opp.askAmount)}
                        </span>
                      </div>
                      {opp.probability && (
                        <div className="whitespace-nowrap">
                          <span className="text-xs text-muted-foreground">Success Rate: </span>
                          <span className="text-sm font-semibold tabular-nums">
                            {opp.probability}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {opp.actionDescription && (
                    <div className="p-3 bg-white dark:bg-background">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {opp.actionDescription}
                      </p>
                    </div>
                  )}
                </div>
              ))}
              {(!data?.topOpportunities || data.topOpportunities.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No active opportunities
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Next Best Actions */}
        <Card className="border">
          <CardHeader style={{ backgroundColor: '#395174' }}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4" style={{ color: "#e1c47d" }} />
                Next Best Actions
              </CardTitle>
              <Link href="/workflow/task-priorities">
                <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10">
                  View All
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {data?.nextBestActions.slice(0, 5).map((task) => {
                const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
                return (
                  <div
                    key={task.id}
                    className="p-3 rounded-lg hover-elevate"
                    style={{ backgroundColor: 'rgba(247, 251, 255, 1)' }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{task.title}</p>
                      </div>
                      <Badge 
                        variant={task.priority === 'urgent' ? 'destructive' : 'secondary'}
                        className="text-xs shrink-0"
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    {task.description && (
                      <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                        {task.description}
                      </p>
                    )}
                    {task.dueDate && (
                      <div className="flex items-center gap-1">
                        {isOverdue && <AlertCircle className="h-3 w-3 text-destructive" />}
                        <span className={`text-xs ${isOverdue ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
                          {formatDate(task.dueDate)}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
              {(!data?.nextBestActions || data.nextBestActions.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No pending actions
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Gifts */}
        <Card className="border">
          <CardHeader style={{ backgroundColor: '#395174' }}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-white">Recent Gifts</CardTitle>
              <Link href="/gifts">
                <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10">
                  View All
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {data?.recentGifts.slice(0, 5).map((gift) => (
                <div
                  key={gift.id}
                  className="flex items-center justify-between p-3 rounded-lg hover-elevate"
                  style={{ backgroundColor: 'rgba(247, 251, 255, 1)' }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Gift className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {gift.person?.firstName} {gift.person?.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {gift.campaign?.name || 'General'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold tabular-nums">
                      {formatCurrency(parseFloat(gift.amount))}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(gift.receivedAt)}
                    </p>
                  </div>
                </div>
              ))}
              {(!data?.recentGifts || data.recentGifts.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No recent gifts
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Campaigns */}
        <Card className="border">
          <CardHeader style={{ backgroundColor: '#395174' }}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-white">Active Campaigns</CardTitle>
              <Link href="/campaigns">
                <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10">
                  View All
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {campaignsLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-lg p-3 bg-muted/20 animate-pulse">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                      <div className="h-2 bg-muted rounded w-full mb-2" />
                      <div className="flex justify-between">
                        <div className="h-3 bg-muted rounded w-20" />
                        <div className="h-3 bg-muted rounded w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : activeCampaigns.length > 0 ? (
                activeCampaigns.map((campaign) => {
                  const goal = parseFloat(campaign.goal || "0");
                  const raised = parseFloat(campaign.raised || "0");
                  const progress = goal > 0 ? (raised / goal) * 100 : 0;
                  
                  return (
                    <Link key={campaign.id} href={`/campaigns/${campaign.id}`}>
                      <div className="hover-elevate active-elevate-2 rounded-lg p-3 cursor-pointer" data-testid={`campaign-${campaign.id}`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate text-sm" data-testid={`campaign-name-${campaign.id}`}>
                              {campaign.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{campaign.type}</p>
                          </div>
                          <Badge variant="default" className="ml-2 text-xs">
                            {progress.toFixed(0)}%
                          </Badge>
                        </div>
                        <Progress value={progress} className="h-2 mb-2" />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{formatCurrency(raised)} raised</span>
                          <span>of {formatCurrency(goal)}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <Target className="h-10 w-10 mx-auto text-muted-foreground/40 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No active campaigns
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
