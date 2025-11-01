import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "wouter";
import { ArrowLeft, DollarSign, TrendingUp, Calendar, Target } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

type Gift = {
  id: string;
  personId: string;
  amount: string;
  giftDate: string;
  campaignId: string | null;
  sourceSystem: string | null;
};

type Campaign = {
  id: string;
  name: string;
  type: string;
  goal: string | null;
  raised: string | null;
};

export default function YTDvsGoal() {
  const { data: gifts, isLoading: giftsLoading } = useQuery<Gift[]>({
    queryKey: ["/api/gifts"],
  });

  const { data: campaigns, isLoading: campaignsLoading } = useQuery<Campaign[]>({
    queryKey: ["/api/campaigns"],
  });

  if (giftsLoading || campaignsLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Loading...</h1>
          <p className="text-sm text-muted-foreground">Please wait</p>
        </div>
      </div>
    );
  }

  const currentYear = new Date().getFullYear();
  const ytdGifts = gifts?.filter((g) => new Date(g.giftDate).getFullYear() === currentYear) || [];
  
  const ytdRaised = ytdGifts.reduce((sum, g) => sum + parseFloat(g.amount), 0);
  const ytdGoal = campaigns?.reduce((sum, c) => {
    const start = new Date("2025-01-01");
    const end = new Date("2025-12-31");
    const isCurrentYear = start.getFullYear() === currentYear || end.getFullYear() === currentYear;
    return isCurrentYear ? sum + parseFloat(c.goal || "0") : sum;
  }, 0) || 1000000;

  const ytdProgress = (ytdRaised / ytdGoal) * 100;
  const remaining = ytdGoal - ytdRaised;
  const daysIntoYear = Math.floor((new Date().getTime() - new Date(currentYear, 0, 1).getTime()) / (1000 * 60 * 60 * 24));
  const daysInYear = 365;
  const expectedProgress = (daysIntoYear / daysInYear) * 100;
  const paceIndicator = ytdProgress >= expectedProgress ? "ahead" : "behind";

  // Monthly breakdown
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const monthGifts = ytdGifts.filter(
      (g) => new Date(g.giftDate).getMonth() === i
    );
    const raised = monthGifts.reduce((sum, g) => sum + parseFloat(g.amount), 0);
    const count = monthGifts.length;
    return {
      month: new Date(currentYear, i, 1).toLocaleDateString("en-US", { month: "short" }),
      monthIndex: i,
      raised,
      count,
    };
  });

  // Campaign breakdown
  const campaignBreakdown = campaigns?.map((campaign) => {
    const campaignGifts = ytdGifts.filter((g) => g.campaignId === campaign.id);
    const raised = campaignGifts.reduce((sum, g) => sum + parseFloat(g.amount), 0);
    const goal = parseFloat(campaign.goal || "0");
    const progress = goal > 0 ? (raised / goal) * 100 : 0;
    return {
      ...campaign,
      ytdRaised: raised,
      ytdProgress: progress,
      giftCount: campaignGifts.length,
    };
  }).sort((a, b) => b.ytdRaised - a.ytdRaised) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/dashboard/dev-director">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold">YTD vs Goal Analysis</h1>
        <p className="text-sm text-muted-foreground">
          Year-to-date fundraising progress and projections
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Progress</CardTitle>
            <Target className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" data-testid="metric-ytd-progress">
              {ytdProgress.toFixed(0)}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              of annual goal
            </p>
            <Progress value={ytdProgress} className="mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Raised</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" data-testid="metric-ytd-raised">
              {formatCurrency(ytdRaised)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {ytdGifts.length} gifts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining to Goal</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" data-testid="metric-remaining">
              {formatCurrency(remaining)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {remaining > 0 ? "still needed" : "goal exceeded!"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pace vs Timeline</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" data-testid="metric-pace">
              <Badge variant={paceIndicator === "ahead" ? "default" : "secondary"} className="text-2xl px-3 py-1">
                {paceIndicator === "ahead" ? "Ahead" : "Behind"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {expectedProgress.toFixed(0)}% expected at {daysIntoYear} days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle>Monthly Fundraising Trend</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table data-testid="table-monthly-trend">
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead className="text-right">Gifts</TableHead>
                <TableHead className="text-right">Amount Raised</TableHead>
                <TableHead className="text-right">Avg Gift</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyData.filter((m) => m.count > 0).map((month) => (
                <TableRow key={month.monthIndex} data-testid={`row-month-${month.monthIndex}`}>
                  <TableCell className="font-medium">{month.month}</TableCell>
                  <TableCell className="text-right">{month.count}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(month.raised)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatCurrency(month.count > 0 ? month.raised / month.count : 0)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Campaign Progress */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle>Campaign Progress (YTD)</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table data-testid="table-campaign-progress">
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">YTD Raised</TableHead>
                <TableHead className="text-right">Goal</TableHead>
                <TableHead className="text-right">Progress</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaignBreakdown.map((campaign) => (
                <TableRow key={campaign.id} data-testid={`row-campaign-${campaign.id}`}>
                  <TableCell className="font-medium">
                    <Link href={`/campaigns/${campaign.id}`} className="hover:underline">
                      {campaign.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{campaign.type}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(campaign.ytdRaised)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatCurrency(parseFloat(campaign.goal || "0"))}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary">{campaign.ytdProgress.toFixed(0)}%</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-chart-1 h-2 rounded-full"
                        style={{ width: `${Math.min(campaign.ytdProgress, 100)}%` }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
