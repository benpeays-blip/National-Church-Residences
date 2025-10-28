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
import { formatCurrency } from "@/lib/utils";

interface DevDirectorData {
  metrics: {
    ytdRaised: number;
    ytdGoal: number;
    pipelineValue: number;
    forecast90Days: number;
    dataHealthScore: number;
  };
  pipelineByOwner: {
    ownerId: string;
    ownerName: string;
    totalValue: number;
    opportunityCount: number;
    stageDistribution: Record<string, number>;
  }[];
  recentActivity: {
    id: string;
    type: string;
    description: string;
    timestamp: string;
    userName: string;
  }[];
}

export default function DashboardDevDirector() {
  const { data, isLoading } = useQuery<DevDirectorData>({
    queryKey: ["/api/dashboard/dev-director"],
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-semibold mb-4">Pipeline by MGO</h2>
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
    </div>
  );
}
