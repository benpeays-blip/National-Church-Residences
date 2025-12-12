import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { Calendar, Users, DollarSign, Target, TrendingUp, Activity, Clock, Pause, CheckCircle2, LayoutGrid, Building2, Star, ArrowRight } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Campaign = {
  id: string;
  name: string;
  type: string;
  description: string | null;
  status: string;
  goal: string | null;
  raised: string | null;
  donorCount: number | null;
  avgGiftSize: string | null;
  totalGifts: number | null;
  startDate: string | null;
  endDate: string | null;
};

const STATUS_CONFIG = {
  planning: { label: "Planning", icon: Clock, variant: "secondary" as const },
  active: { label: "Active", icon: Activity, variant: "default" as const },
  completed: { label: "Completed", icon: CheckCircle2, variant: "outline" as const },
  paused: { label: "Paused", icon: Pause, variant: "secondary" as const },
};

interface CampaignsProps {
  filterStatus?: "active" | "planned" | "completed";
}

export default function Campaigns({ filterStatus }: CampaignsProps = {}) {
  const { data: campaigns, isLoading } = useQuery<Campaign[]>({
    queryKey: ["/api/campaigns"],
  });

  // Filter campaigns based on filterStatus prop
  const filteredCampaigns = campaigns?.filter(campaign => {
    if (!filterStatus) return true; // Show all if no filter
    
    // Map "planned" to "planning" status
    if (filterStatus === "planned") {
      return campaign.status === "planning";
    }
    
    return campaign.status === filterStatus;
  });

  // Calculate aggregate metrics
  const totalCampaigns = campaigns?.length || 0;
  const activeCampaigns = campaigns?.filter(c => c.status === 'active').length || 0;
  const totalGoal = campaigns?.reduce((sum, c) => sum + parseFloat(c.goal || "0"), 0) || 0;
  const totalRaised = campaigns?.reduce((sum, c) => sum + parseFloat(c.raised || "0"), 0) || 0;
  const overallProgress = totalGoal > 0 ? (totalRaised / totalGoal) * 100 : 0;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  // Find the featured campaign ($10 Million 2026-2027 Campaign)
  const featuredCampaign = campaigns?.find(c => c.name.includes("$10 Million"));
  const featuredGoal = parseFloat(featuredCampaign?.goal || "0");
  const featuredRaised = parseFloat(featuredCampaign?.raised || "0");
  const featuredProgress = featuredGoal > 0 ? (featuredRaised / featuredGoal) * 100 : 0;

  // Exclude featured campaign from regular grid
  const regularCampaigns = filteredCampaigns?.filter(c => c.id !== featuredCampaign?.id);

  return (
    <div className="space-y-6">
      {/* Featured Campaign Hero */}
      {!filterStatus && featuredCampaign && (
        <Card className="overflow-hidden border-2 border-primary/20" data-testid="card-featured-campaign">
          <div 
            className="p-6"
            style={{ backgroundColor: "rgba(222, 235, 247, 0.5)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-primary fill-primary" />
              <Badge variant="default" className="text-xs">Featured Campaign</Badge>
            </div>
            <h2 className="text-2xl font-bold mb-2" data-testid="text-featured-campaign-name">
              {featuredCampaign.name}
            </h2>
            <p className="text-sm text-muted-foreground max-w-3xl">
              {featuredCampaign.description}
            </p>
          </div>
          <CardContent className="p-6 space-y-6">
            {/* Progress Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Campaign Progress</span>
                <span className="text-lg font-bold text-primary" data-testid="text-featured-progress">
                  {featuredProgress.toFixed(1)}%
                </span>
              </div>
              <Progress value={featuredProgress} className="h-3" data-testid="progress-featured" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  <span className="font-semibold text-foreground" data-testid="text-featured-raised">
                    {formatCurrency(featuredRaised)}
                  </span> raised
                </span>
                <span className="text-muted-foreground">
                  Goal: <span className="font-semibold text-foreground" data-testid="text-featured-goal">
                    {formatCurrency(featuredGoal)}
                  </span>
                </span>
              </div>
            </div>

            {/* Donor Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Individual Donors */}
              <div className="p-4 rounded-lg bg-muted/30 space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <h4 className="font-semibold">Individual Donors</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold">89</p>
                    <p className="text-xs text-muted-foreground">Major Gift Donors</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">$1.42M</p>
                    <p className="text-xs text-muted-foreground">Individual Gifts</p>
                  </div>
                </div>
                <div className="space-y-2 pt-2 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Lead Gift (Anonymous)</span>
                    <span className="font-medium">$500,000</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Board Commitments</span>
                    <span className="font-medium">$425,000</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Planned Gifts (Pledged)</span>
                    <span className="font-medium">$285,000</span>
                  </div>
                </div>
              </div>

              {/* Corporate Donors */}
              <div className="p-4 rounded-lg bg-muted/30 space-y-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  <h4 className="font-semibold">Corporate Partners</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold">67</p>
                    <p className="text-xs text-muted-foreground">Corporate Sponsors</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">$1.43M</p>
                    <p className="text-xs text-muted-foreground">Corporate Gifts</p>
                  </div>
                </div>
                <div className="space-y-2 pt-2 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Platinum Sponsors (3)</span>
                    <span className="font-medium">$750,000</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Gold Sponsors (8)</span>
                    <span className="font-medium">$400,000</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Community Partners (56)</span>
                    <span className="font-medium">$280,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign Priorities */}
            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-3">Campaign Priorities</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-primary/5">
                  <p className="text-lg font-bold text-primary">$4M</p>
                  <p className="text-xs text-muted-foreground">Facility Renovations</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-primary/5">
                  <p className="text-lg font-bold text-primary">$3M</p>
                  <p className="text-xs text-muted-foreground">Endowment Growth</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-primary/5">
                  <p className="text-lg font-bold text-primary">$2M</p>
                  <p className="text-xs text-muted-foreground">Program Expansion</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-primary/5">
                  <p className="text-lg font-bold text-primary">$1M</p>
                  <p className="text-xs text-muted-foreground">Technology Infrastructure</p>
                </div>
              </div>
            </div>

            {/* View Details Button */}
            <div className="flex justify-end pt-2">
              <Link href={`/campaigns/${featuredCampaign.id}`}>
                <Button data-testid="button-view-featured-campaign">
                  View Campaign Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* KPI Metrics */}
      {!filterStatus && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card data-testid="card-total-campaigns">
            <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Total Campaigns</p>
              <LayoutGrid className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-campaigns">{totalCampaigns}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {activeCampaigns} active
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-total-goal">
            <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Total Goal</p>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-goal">
                {formatCurrency(totalGoal)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all campaigns
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-total-raised">
            <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Total Raised</p>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-raised">
                {formatCurrency(totalRaised)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                YTD performance
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-overall-progress">
            <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-overall-progress">
                {overallProgress.toFixed(0)}%
              </div>
              <Progress value={overallProgress} className="mt-2" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {(filterStatus ? filteredCampaigns : regularCampaigns)?.map((campaign) => {
          const goal = parseFloat(campaign.goal || "0");
          const raised = parseFloat(campaign.raised || "0");
          const percentComplete = goal > 0 ? (raised / goal) * 100 : 0;
          const statusConfig = STATUS_CONFIG[campaign.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.planning;
          const StatusIcon = statusConfig.icon;

          return (
            <Link key={campaign.id} href={`/campaigns/${campaign.id}`}>
              <Card className="hover-elevate active-elevate-2 cursor-pointer overflow-hidden" data-testid={`card-campaign-${campaign.id}`}>
                <div 
                  className="p-4 flex items-start justify-between gap-2" 
                  style={{ backgroundColor: 'rgba(222, 235, 247, 0.5)' }}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold truncate" data-testid={`text-campaign-name-${campaign.id}`}>
                      {campaign.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{campaign.type}</p>
                  </div>
                  <Badge variant={statusConfig.variant} data-testid={`badge-status-${campaign.id}`}>
                    <StatusIcon className="w-3 h-3" />
                    {statusConfig.label}
                  </Badge>
                </div>
                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium" data-testid={`text-progress-${campaign.id}`}>
                        {percentComplete.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={percentComplete} data-testid={`progress-${campaign.id}`} />
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <DollarSign className="w-3 h-3" />
                        <span className="text-xs">Raised</span>
                      </div>
                      <p className="text-lg font-semibold" data-testid={`text-raised-${campaign.id}`}>
                        ${(raised / 1000).toFixed(0)}k
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Target className="w-3 h-3" />
                        <span className="text-xs">Goal</span>
                      </div>
                      <p className="text-lg font-semibold" data-testid={`text-goal-${campaign.id}`}>
                        ${(goal / 1000).toFixed(0)}k
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-3 h-3" />
                        <span className="text-xs">Donors</span>
                      </div>
                      <p className="text-lg font-semibold" data-testid={`text-donors-${campaign.id}`}>
                        {campaign.donorCount?.toLocaleString() || 0}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-xs">Avg Gift</span>
                      </div>
                      <p className="text-lg font-semibold" data-testid={`text-avg-gift-${campaign.id}`}>
                        ${parseFloat(campaign.avgGiftSize || "0").toFixed(0)}
                      </p>
                    </div>
                  </div>

                  {/* Dates */}
                  {campaign.startDate && campaign.endDate && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                      <Calendar className="w-3 h-3" />
                      <span data-testid={`text-dates-${campaign.id}`}>
                        {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
