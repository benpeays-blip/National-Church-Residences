import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { Calendar, Users, DollarSign, Target, TrendingUp, Activity, Clock, Pause, CheckCircle2 } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

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

  if (isLoading) {
    return <Skeleton className="h-96" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCampaigns?.map((campaign) => {
          const goal = parseFloat(campaign.goal || "0");
          const raised = parseFloat(campaign.raised || "0");
          const percentComplete = goal > 0 ? (raised / goal) * 100 : 0;
          const statusConfig = STATUS_CONFIG[campaign.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.planning;
          const StatusIcon = statusConfig.icon;

          return (
            <Link key={campaign.id} href={`/campaigns/${campaign.id}`}>
              <Card className="hover-elevate active-elevate-2 cursor-pointer" data-testid={`card-campaign-${campaign.id}`}>
                <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-3">
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
                </CardHeader>
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
  );
}
