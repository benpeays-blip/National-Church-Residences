import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { MetricCard } from "@/components/metric-card";
import { Database, CheckCircle, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface DataHealthData {
  metrics: {
    overallHealth: number;
    profileCompleteness: number;
    missingEmails: number;
    dataFreshness: string;
  };
  qualityChecks: {
    emailValidation: string;
    phoneFormatting: string;
    addressCompleteness: string;
    duplicateDetection: string;
  };
  actionItems: {
    id: string;
    title: string;
    description: string;
  }[];
}

export default function DataHealth() {
  const { data, isLoading, isError } = useQuery<DataHealthData>({
    queryKey: ["/api/data-health"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Data Health</h1>
          <p className="text-sm text-muted-foreground">
            Monitor data quality and system health
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
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Data Health</h1>
          <p className="text-sm text-muted-foreground">
            Monitor data quality and system health
          </p>
        </div>
        <Card className="p-12">
          <div className="text-center space-y-3">
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
            <h3 className="text-lg font-semibold">Failed to load data health metrics</h3>
            <p className="text-sm text-muted-foreground">
              There was an error loading data health information. Please try again later.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Passing":
        return "text-chart-2";
      case "Warning":
        return "text-chart-4";
      case "Failing":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Data Health</h1>
          <p className="text-sm text-muted-foreground">
            Monitor data quality and system health
          </p>
        </div>
        <Database className="w-8 h-8 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Overall Health"
          value={`${data?.metrics.overallHealth ?? 0}%`}
        />
        <MetricCard
          label="Complete Profiles"
          value={`${data?.metrics.profileCompleteness ?? 0}%`}
        />
        <MetricCard
          label="Missing Emails"
          value={data?.metrics.missingEmails ?? 0}
        />
        <MetricCard
          label="Data Freshness"
          value={data?.metrics.dataFreshness ?? "Unknown"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-chart-2" />
            <h2 className="text-xl font-semibold">Data Quality Checks</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Email validation</span>
              <span
                className={`text-sm font-medium ${getStatusColor(
                  data?.qualityChecks.emailValidation ?? "Unknown"
                )}`}
              >
                {data?.qualityChecks.emailValidation ?? "Unknown"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Phone formatting</span>
              <span
                className={`text-sm font-medium ${getStatusColor(
                  data?.qualityChecks.phoneFormatting ?? "Unknown"
                )}`}
              >
                {data?.qualityChecks.phoneFormatting ?? "Unknown"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Address completeness</span>
              <span
                className={`text-sm font-medium ${getStatusColor(
                  data?.qualityChecks.addressCompleteness ?? "Unknown"
                )}`}
              >
                {data?.qualityChecks.addressCompleteness ?? "Unknown"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Duplicate detection</span>
              <span
                className={`text-sm font-medium ${getStatusColor(
                  data?.qualityChecks.duplicateDetection ?? "Unknown"
                )}`}
              >
                {data?.qualityChecks.duplicateDetection ?? "Unknown"}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-chart-4" />
            <h2 className="text-lg font-semibold">Action Items</h2>
          </div>
          <div className="space-y-3">
            {data?.actionItems && data.actionItems.length > 0 ? (
              data.actionItems.map((item) => (
                <div key={item.id} className="pb-3 border-b last:border-0">
                  <p className="text-sm font-medium mb-1">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">
                  No action items at this time. Data quality looks good!
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
