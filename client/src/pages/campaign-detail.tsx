import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  Target,
  Activity,
  Mail,
  CheckCircle2,
  Clock,
  Pause,
  XCircle
} from "lucide-react";
import { format } from "date-fns";

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
  ownerId: string | null;
  startDate: string | null;
  endDate: string | null;
  ownerName?: string;
};

const STATUS_CONFIG = {
  planning: { label: "Planning", icon: Clock, variant: "secondary" as const },
  active: { label: "Active", icon: Activity, variant: "default" as const },
  completed: { label: "Completed", icon: CheckCircle2, variant: "outline" as const },
  paused: { label: "Paused", icon: Pause, variant: "secondary" as const },
};

export default function CampaignDetail() {
  const [, params] = useRoute("/campaigns/:id");
  const campaignId = params?.id;

  const { data: campaign, isLoading } = useQuery<Campaign>({
    queryKey: ["/api/campaigns", campaignId],
    enabled: !!campaignId,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Loading...</h1>
          <p className="text-sm text-muted-foreground">Please wait</p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Campaign Not Found</h1>
          <p className="text-sm text-muted-foreground">The campaign you're looking for doesn't exist</p>
        </div>
        <Card className="p-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <XCircle className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground">This campaign could not be found.</p>
            <Link href="/campaigns">
              <Button variant="outline" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const goal = parseFloat(campaign.goal || "0");
  const raised = parseFloat(campaign.raised || "0");
  const percentComplete = goal > 0 ? (raised / goal) * 100 : 0;
  const remainingAmount = goal - raised;
  const statusConfig = STATUS_CONFIG[campaign.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.planning;
  const StatusIcon = statusConfig.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/campaigns">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold" data-testid="text-campaign-name">{campaign.name}</h1>
              <Badge variant={statusConfig.variant} data-testid="badge-campaign-status">
                <StatusIcon className="w-3 h-3" />
                {statusConfig.label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{campaign.type} Campaign</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" data-testid="button-edit-campaign">Edit Campaign</Button>
            <Button data-testid="button-new-gift">Record Gift</Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
            <Target className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" data-testid="metric-percent-complete">
              {percentComplete.toFixed(0)}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">of ${(goal / 1000).toFixed(0)}k goal</p>
            <Progress value={percentComplete} className="mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Amount Raised</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" data-testid="metric-raised">
              ${(raised / 1000).toFixed(0)}k
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {remainingAmount > 0 ? `$${(remainingAmount / 1000).toFixed(0)}k to go` : "Goal exceeded!"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" data-testid="metric-donors">
              {campaign.donorCount?.toLocaleString() || 0}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {campaign.totalGifts?.toLocaleString() || 0} total gifts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Gift Size</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" data-testid="metric-avg-gift">
              ${parseFloat(campaign.avgGiftSize || "0").toFixed(0)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">per donation</p>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Details & Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList data-testid="tabs-campaign-detail">
          <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
          <TabsTrigger value="donors" data-testid="tab-donors">Donors</TabsTrigger>
          <TabsTrigger value="timeline" data-testid="tab-timeline">Timeline</TabsTrigger>
          <TabsTrigger value="communications" data-testid="tab-communications">Communications</TabsTrigger>
          <TabsTrigger value="team" data-testid="tab-team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Campaign Info */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Description</p>
                  <p className="text-sm text-muted-foreground" data-testid="text-campaign-description">
                    {campaign.description || "No description provided"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Start Date</p>
                    <p className="text-sm text-muted-foreground" data-testid="text-start-date">
                      {campaign.startDate ? format(new Date(campaign.startDate), "MMM d, yyyy") : "Not set"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">End Date</p>
                    <p className="text-sm text-muted-foreground" data-testid="text-end-date">
                      {campaign.endDate ? format(new Date(campaign.endDate), "MMM d, yyyy") : "Not set"}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Campaign Owner</p>
                  <p className="text-sm text-muted-foreground" data-testid="text-owner">
                    {campaign.ownerName || "Unassigned"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Performance Snapshot */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Snapshot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Goal Completion</span>
                  <span className="text-sm font-medium" data-testid="text-goal-completion">
                    {percentComplete.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Raised</span>
                  <span className="text-sm font-medium" data-testid="text-total-raised">
                    ${raised.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Remaining to Goal</span>
                  <span className="text-sm font-medium" data-testid="text-remaining">
                    ${remainingAmount > 0 ? remainingAmount.toLocaleString() : 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Unique Donors</span>
                  <span className="text-sm font-medium" data-testid="text-unique-donors">
                    {campaign.donorCount?.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Gift</span>
                  <span className="text-sm font-medium" data-testid="text-average-gift">
                    ${parseFloat(campaign.avgGiftSize || "0").toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center py-8" data-testid="text-no-activity">
                  No recent activity to display
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Donors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center py-8" data-testid="text-no-donors">
                Donor segmentation and analysis coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center py-8" data-testid="text-no-timeline">
                Timeline visualization coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Communications Hub</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center py-8" data-testid="text-no-communications">
                Communication tracking coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center py-8" data-testid="text-no-team">
                Team management coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
