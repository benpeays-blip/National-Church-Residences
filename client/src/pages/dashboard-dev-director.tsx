import { useQuery } from "@tanstack/react-query";
import { MetricCard } from "@/components/metric-card";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Database, Mail, TrendingUp, AlertCircle } from "lucide-react";

interface DevDirectorData {
  metrics: {
    ytdRaised: number;
    ytdGoal: number;
    pipelineValue: number;
    forecast90Days: number;
    dataHealthScore: number;
    lybuntCount: number;
    sybuntCount: number;
  };
  pipelineByOwner: {
    ownerId: string;
    ownerName: string;
    totalValue: number;
    opportunityCount: number;
    stageDistribution: Record<string, number>;
  }[];
  pipelineForecasting: {
    monthKey: string;
    month: string;
    totalAskAmount: number;
    weightedValue: number;
    opportunityCount: number;
  }[];
  recentActivity: {
    id: string;
    type: string;
    description: string;
    timestamp: string;
    userName: string;
  }[];
  lybuntDonors: {
    id: string;
    firstName: string;
    lastName: string;
    primaryEmail: string | null;
    lastGiftAmount: string | null;
    lastGiftDate: Date | null;
    totalLifetimeGiving: string | null;
  }[];
  sybuntDonors: {
    id: string;
    firstName: string;
    lastName: string;
    primaryEmail: string | null;
    lastGiftAmount: string | null;
    lastGiftDate: Date | null;
    totalLifetimeGiving: string | null;
  }[];
}

interface IntegrationCoverage {
  totalDonors: number;
  donorsWithWealthData: number;
  donorsWithRecentInteraction: number;
  donorsWithEmail: number;
  opportunitiesWithRecentActivity: number;
  giftsFromOnlinePlatforms: number;
}

export default function DashboardDevDirector() {
  const { data, isLoading } = useQuery<DevDirectorData>({
    queryKey: ["/api/dashboard/dev-director"],
  });
  
  const { data: integrationData } = useQuery<{ coverageMetrics: IntegrationCoverage }>({
    queryKey: ["/api/integrations"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2">
            Development Director Dashboard
          </h1>
          <p className="text-muted-foreground">
            Team performance and pipeline health
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  const ytdProgress =
    ((data?.metrics.ytdRaised ?? 0) / (data?.metrics.ytdGoal ?? 1)) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">
          Development Director Dashboard
        </h1>
        <p className="text-muted-foreground">
          Team performance and pipeline health
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="YTD vs Goal"
          value={`${ytdProgress.toFixed(0)}%`}
          change={12}
          trend="up"
        />
        <MetricCard
          label="Pipeline Value"
          value={formatCurrency(data?.metrics.pipelineValue)}
        />
        <MetricCard
          label="90-Day Forecast"
          value={formatCurrency(data?.metrics.forecast90Days)}
        />
        <MetricCard
          label="Data Health"
          value={`${data?.metrics.dataHealthScore ?? 0}%`}
          change={5}
          trend="up"
        />
      </div>

      {/* Data Coverage & Quality Metrics */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Database className="w-5 h-5 text-chart-1" />
          Data Coverage & Integration Health
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4" data-testid="card-wealth-coverage">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">
                Wealth Screening
              </p>
              <Database className="w-4 h-4 text-chart-2" />
            </div>
            <p className="text-3xl font-bold tabular-nums mb-1" data-testid="text-wealth-coverage">
              {integrationData?.coverageMetrics && integrationData.coverageMetrics.totalDonors > 0
                ? Math.round(
                    (integrationData.coverageMetrics.donorsWithWealthData /
                      integrationData.coverageMetrics.totalDonors) *
                      100
                  )
                : 0}
              %
            </p>
            <p className="text-xs text-muted-foreground">
              {integrationData?.coverageMetrics?.donorsWithWealthData || 0} of{" "}
              {integrationData?.coverageMetrics?.totalDonors || 0} donors
            </p>
          </Card>

          <Card className="p-4" data-testid="card-engagement-coverage">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">
                Recent Engagement
              </p>
              <TrendingUp className="w-4 h-4 text-chart-3" />
            </div>
            <p className="text-3xl font-bold tabular-nums mb-1" data-testid="text-engagement-coverage">
              {integrationData?.coverageMetrics && integrationData.coverageMetrics.totalDonors > 0
                ? Math.round(
                    (integrationData.coverageMetrics.donorsWithRecentInteraction /
                      integrationData.coverageMetrics.totalDonors) *
                      100
                  )
                : 0}
              %
            </p>
            <p className="text-xs text-muted-foreground">
              {integrationData?.coverageMetrics?.donorsWithRecentInteraction || 0}{" "}
              interactions (90d)
            </p>
          </Card>

          <Card className="p-4" data-testid="card-email-coverage">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">
                Email Data
              </p>
              <Mail className="w-4 h-4 text-chart-4" />
            </div>
            <p className="text-3xl font-bold tabular-nums mb-1" data-testid="text-email-coverage">
              {integrationData?.coverageMetrics && integrationData.coverageMetrics.totalDonors > 0
                ? Math.round(
                    (integrationData.coverageMetrics.donorsWithEmail /
                      integrationData.coverageMetrics.totalDonors) *
                      100
                  )
                : 0}
              %
            </p>
            <p className="text-xs text-muted-foreground">
              {integrationData?.coverageMetrics?.donorsWithEmail || 0} with valid
              emails
            </p>
          </Card>

          <Card className="p-4" data-testid="card-pipeline-activity">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">
                Pipeline Activity
              </p>
              <AlertCircle className="w-4 h-4 text-chart-1" />
            </div>
            <p className="text-3xl font-bold tabular-nums mb-1" data-testid="text-pipeline-activity">
              {integrationData?.coverageMetrics?.opportunitiesWithRecentActivity || 0}
            </p>
            <p className="text-xs text-muted-foreground">
              opportunities synced (90d)
            </p>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6" data-testid="card-lybunt-metric">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              "Last Year But Unfortunately Not This" (LYBUNT) Donors
            </p>
            <p 
              className="text-4xl font-bold tabular-nums text-chart-4"
              data-testid="text-lybunt-count"
            >
              {data?.metrics.lybuntCount ?? 0}
            </p>
            <p className="text-xs text-muted-foreground">
              Gave last year but not this year - priority for reactivation
            </p>
          </div>
        </Card>
        <Card className="p-6" data-testid="card-sybunt-metric">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              "Some Years But Unfortunately Not This" (SYBUNT) Donors
            </p>
            <p 
              className="text-4xl font-bold tabular-nums text-chart-3"
              data-testid="text-sybunt-count"
            >
              {data?.metrics.sybuntCount ?? 0}
            </p>
            <p className="text-xs text-muted-foreground">
              Gave in prior years but not recently - long-term recovery needed
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-semibold mb-4">Pipeline by Major Gift Officer</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>MGO</TableHead>
                <TableHead>Opportunities</TableHead>
                <TableHead>Pipeline Value</TableHead>
                <TableHead>Stage Distribution</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.pipelineByOwner.map((owner) => (
                <TableRow key={owner.ownerId}>
                  <TableCell className="font-medium">
                    {owner.ownerName}
                  </TableCell>
                  <TableCell>{owner.opportunityCount}</TableCell>
                  <TableCell>{formatCurrency(owner.totalValue)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {Object.entries(owner.stageDistribution).map(
                        ([stage, count]) =>
                          count > 0 && (
                            <Badge key={stage} variant="secondary" className="text-xs">
                              {stage.slice(0, 3)}: {count}
                            </Badge>
                          )
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Team Activity</h2>
          <div className="space-y-4">
            {data?.recentActivity.map((activity) => (
              <div key={activity.id} className="pb-3 border-b last:border-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-medium">{activity.userName}</p>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Pipeline Forecasting */}
      {(data?.pipelineForecasting && data.pipelineForecasting.length > 0) && (
        <Card className="p-6" data-testid="card-pipeline-forecasting">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-chart-1" />
            Pipeline Forecasting (Next 12 Months)
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Weighted pipeline forecast calculated as Σ(amount × probability) by expected close month. Shows total ask amounts and weighted expected revenue.
          </p>
          <Table data-testid="table-pipeline-forecasting">
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead className="text-right">Opportunities</TableHead>
                <TableHead className="text-right">Total Ask</TableHead>
                <TableHead className="text-right">Weighted Value</TableHead>
                <TableHead className="text-right">Close Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.pipelineForecasting.map((forecast) => {
                const closeRate = forecast.totalAskAmount > 0 
                  ? (forecast.weightedValue / forecast.totalAskAmount) * 100 
                  : 0;
                return (
                  <TableRow key={forecast.monthKey} data-testid={`row-forecast-${forecast.monthKey}`}>
                    <TableCell className="font-medium">{forecast.month}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {forecast.opportunityCount}
                    </TableCell>
                    <TableCell className="text-right tabular-nums text-muted-foreground">
                      {formatCurrency(forecast.totalAskAmount)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums font-semibold text-chart-1">
                      {formatCurrency(forecast.weightedValue)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {closeRate.toFixed(0)}%
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Total Forecast (12 months)
              </p>
              <p className="text-2xl font-bold tabular-nums text-chart-1" data-testid="text-total-forecast">
                {formatCurrency(
                  data.pipelineForecasting.reduce((sum, f) => sum + f.weightedValue, 0)
                )}
              </p>
            </div>
          </div>
        </Card>
      )}

      {(data?.lybuntDonors && data.lybuntDonors.length > 0) && (
        <Card className="p-6" data-testid="card-lybunt-recovery">
          <h2 className="text-lg font-semibold mb-4" data-testid="text-lybunt-recovery-title">
            LYBUNT Recovery - Priority Reactivation
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            These donors gave last year but haven't given this year. Reach out with personalized renewal campaigns.
          </p>
          <Table data-testid="table-lybunt-donors">
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Last Gift</TableHead>
                <TableHead>Last Amount</TableHead>
                <TableHead>Lifetime Giving</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.lybuntDonors.map((donor) => (
                <TableRow key={donor.id} data-testid={`row-lybunt-donor-${donor.id}`}>
                  <TableCell className="font-medium" data-testid={`text-lybunt-donor-name-${donor.id}`}>
                    {donor.firstName} {donor.lastName}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {donor.primaryEmail || "No email"}
                  </TableCell>
                  <TableCell className="text-sm">
                    {donor.lastGiftDate
                      ? new Date(donor.lastGiftDate).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {donor.lastGiftAmount
                      ? formatCurrency(donor.lastGiftAmount)
                      : "N/A"}
                  </TableCell>
                  <TableCell className="font-medium">
                    {donor.totalLifetimeGiving
                      ? formatCurrency(donor.totalLifetimeGiving)
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs hover:bg-primary hover:text-primary-foreground hover:border-primary" 
                      data-testid={`badge-lybunt-action-${donor.id}`}
                    >
                      Renewal Call
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {(data?.sybuntDonors && data.sybuntDonors.length > 0) && (
        <Card className="p-6" data-testid="card-sybunt-recovery">
          <h2 className="text-lg font-semibold mb-4" data-testid="text-sybunt-recovery-title">
            SYBUNT Recovery - Long-Term Reactivation
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            These donors gave in prior years but not recently. Consider impact reports and re-engagement campaigns.
          </p>
          <Table data-testid="table-sybunt-donors">
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Last Gift</TableHead>
                <TableHead>Last Amount</TableHead>
                <TableHead>Lifetime Giving</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.sybuntDonors.map((donor) => (
                <TableRow key={donor.id} data-testid={`row-sybunt-donor-${donor.id}`}>
                  <TableCell className="font-medium" data-testid={`text-sybunt-donor-name-${donor.id}`}>
                    {donor.firstName} {donor.lastName}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {donor.primaryEmail || "No email"}
                  </TableCell>
                  <TableCell className="text-sm">
                    {donor.lastGiftDate
                      ? new Date(donor.lastGiftDate).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {donor.lastGiftAmount
                      ? formatCurrency(donor.lastGiftAmount)
                      : "N/A"}
                  </TableCell>
                  <TableCell className="font-medium">
                    {donor.totalLifetimeGiving
                      ? formatCurrency(donor.totalLifetimeGiving)
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs hover:bg-primary hover:text-primary-foreground hover:border-primary" 
                      data-testid={`badge-sybunt-action-${donor.id}`}
                    >
                      Impact Report
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
