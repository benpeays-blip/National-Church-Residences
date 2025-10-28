import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { MetricCard } from "@/components/metric-card";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  Plug,
  CheckCircle,
  AlertCircle,
  Activity,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

interface Integration {
  id: string;
  name: string;
  type: string;
  status: "connected" | "syncing" | "error" | "disconnected";
  lastSyncAt: string | null;
  lastSuccessfulSyncAt: string | null;
  recordCount: number;
  errorMessage: string | null;
}

interface SyncRun {
  id: string;
  integrationId: string;
  status: string;
  recordsProcessed: number;
  recordsCreated: number;
  recordsUpdated: number;
  recordsSkipped: number;
  errorCount: number;
  startedAt: string;
  completedAt: string | null;
}

interface DataQualityIssue {
  id: string;
  entityType: string;
  sourceSystem: string | null;
  issueType: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  resolved: number;
  createdAt: string;
}

interface CoverageMetrics {
  totalDonors: number;
  donorsWithWealthData: number;
  donorsWithRecentInteraction: number;
  donorsWithEmail: number;
  opportunitiesWithRecentActivity: number;
  giftsFromOnlinePlatforms: number;
}

interface IntegrationsData {
  integrations: Integration[];
  recentSyncRuns: SyncRun[];
  unresolvedIssues: DataQualityIssue[];
  coverageMetrics: CoverageMetrics;
}

export default function Integrations() {
  const { data, isLoading, isError } = useQuery<IntegrationsData>({
    queryKey: ["/api/integrations"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Integrations & Data Health</h1>
          <p className="text-muted-foreground">
            Monitor connected systems and data quality
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

  if (isError || !data) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Integrations & Data Health</h1>
          <p className="text-muted-foreground">
            Monitor connected systems and data quality
          </p>
        </div>
        <Card className="p-12">
          <div className="text-center space-y-3">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
            <h3 className="text-lg font-semibold">Failed to load integration data</h3>
            <p className="text-sm text-muted-foreground">
              There was an error loading integration information. Please try again later.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge variant="default" className="bg-chart-2 hover:bg-chart-2" data-testid={`status-connected`}>
            <CheckCircle className="w-3 h-3 mr-1" />
            Connected
          </Badge>
        );
      case "syncing":
        return (
          <Badge variant="default" className="bg-primary hover:bg-primary" data-testid={`status-syncing`}>
            <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
            Syncing
          </Badge>
        );
      case "error":
        return (
          <Badge variant="destructive" data-testid={`status-error`}>
            <AlertCircle className="w-3 h-3 mr-1" />
            Error
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" data-testid={`status-disconnected`}>Disconnected</Badge>
        );
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive" data-testid={`severity-critical`}>Critical</Badge>;
      case "high":
        return <Badge variant="destructive" className="bg-destructive/80" data-testid={`severity-high`}>High</Badge>;
      case "medium":
        return <Badge variant="default" className="bg-chart-4 hover:bg-chart-4" data-testid={`severity-medium`}>Medium</Badge>;
      default:
        return <Badge variant="secondary" data-testid={`severity-low`}>Low</Badge>;
    }
  };

  const { coverageMetrics } = data;
  const wealthCoverage = coverageMetrics.totalDonors > 0
    ? Math.round((coverageMetrics.donorsWithWealthData / coverageMetrics.totalDonors) * 100)
    : 0;
  const interactionCoverage = coverageMetrics.totalDonors > 0
    ? Math.round((coverageMetrics.donorsWithRecentInteraction / coverageMetrics.totalDonors) * 100)
    : 0;
  const emailCoverage = coverageMetrics.totalDonors > 0
    ? Math.round((coverageMetrics.donorsWithEmail / coverageMetrics.totalDonors) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Integrations & Data Health</h1>
          <p className="text-muted-foreground">
            Monitor connected systems, sync status, and data quality
          </p>
        </div>
        <Plug className="w-8 h-8 text-muted-foreground" />
      </div>

      {/* Coverage Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Wealth Screening Coverage"
          value={`${wealthCoverage}%`}
          data-testid="metric-wealth-coverage"
        />
        <MetricCard
          label="Recent Engagement Coverage"
          value={`${interactionCoverage}%`}
          data-testid="metric-engagement-coverage"
        />
        <MetricCard
          label="Email Data Coverage"
          value={`${emailCoverage}%`}
          data-testid="metric-email-coverage"
        />
        <MetricCard
          label="Data Quality Alerts"
          value={data.unresolvedIssues.length}
          data-testid="metric-quality-alerts"
        />
      </div>

      {/* Connected Systems */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Plug className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Connected Systems</h2>
        </div>
        <div className="space-y-4">
          {data.integrations.map((integration) => (
            <div
              key={integration.id}
              className="flex items-center justify-between p-4 rounded-lg border"
              data-testid={`integration-${integration.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold" data-testid={`integration-name-${integration.id}`}>{integration.name}</h3>
                  {getStatusBadge(integration.status)}
                  <Badge variant="outline" data-testid={`integration-type-${integration.id}`}>{integration.type}</Badge>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span data-testid={`integration-record-count-${integration.id}`}>
                    <span className="font-medium text-foreground">{integration.recordCount.toLocaleString()}</span> records
                  </span>
                  {integration.lastSyncAt && (
                    <span data-testid={`integration-last-sync-${integration.id}`}>
                      Last sync: {formatDistanceToNow(new Date(integration.lastSyncAt), { addSuffix: true })}
                    </span>
                  )}
                </div>
                {integration.errorMessage && (
                  <p className="text-sm text-destructive mt-2" data-testid={`integration-error-${integration.id}`}>
                    {integration.errorMessage}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sync Activity */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCw className="w-5 h-5 text-chart-1" />
            <h2 className="text-lg font-semibold">Recent Sync Activity</h2>
          </div>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {data.recentSyncRuns.map((run) => {
              const integration = data.integrations.find((i) => i.id === run.integrationId);
              return (
                <div
                  key={run.id}
                  className="pb-3 border-b last:border-0"
                  data-testid={`sync-run-${run.id}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium" data-testid={`sync-run-integration-${run.id}`}>
                      {integration?.name || "Unknown"}
                    </p>
                    <Badge
                      variant={run.status === "success" ? "default" : run.status === "partial" ? "secondary" : "destructive"}
                      className={run.status === "success" ? "bg-chart-2 hover:bg-chart-2" : ""}
                      data-testid={`sync-run-status-${run.id}`}
                    >
                      {run.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span data-testid={`sync-run-processed-${run.id}`}>{run.recordsProcessed} processed</span>
                    <span data-testid={`sync-run-created-${run.id}`}>{run.recordsCreated} created</span>
                    <span data-testid={`sync-run-updated-${run.id}`}>{run.recordsUpdated} updated</span>
                    {run.errorCount > 0 && (
                      <span className="text-destructive" data-testid={`sync-run-errors-${run.id}`}>
                        {run.errorCount} errors
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1" data-testid={`sync-run-time-${run.id}`}>
                    {formatDistanceToNow(new Date(run.startedAt), { addSuffix: true })}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Data Quality Issues */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-chart-4" />
            <h2 className="text-lg font-semibold">Data Quality Alerts</h2>
          </div>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {data.unresolvedIssues.length > 0 ? (
              data.unresolvedIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="pb-3 border-b last:border-0"
                  data-testid={`quality-issue-${issue.id}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {getSeverityBadge(issue.severity)}
                      <span className="text-sm font-medium capitalize" data-testid={`issue-type-${issue.id}`}>
                        {issue.issueType.replace(/_/g, " ")}
                      </span>
                    </div>
                    {issue.sourceSystem && (
                      <Badge variant="outline" data-testid={`issue-source-${issue.id}`}>
                        {issue.sourceSystem}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground" data-testid={`issue-description-${issue.id}`}>
                    {issue.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1" data-testid={`issue-time-${issue.id}`}>
                    {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-chart-2 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  No data quality issues detected. All systems healthy!
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
