import { Card } from "@/components/ui/card";
import { MetricCard } from "@/components/metric-card";
import { Database, CheckCircle, AlertTriangle } from "lucide-react";

export default function DataHealth() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Data Health</h1>
          <p className="text-muted-foreground">
            Monitor data quality and system health
          </p>
        </div>
        <Database className="w-8 h-8 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Overall Health" value="85%" trend="up" change={3} />
        <MetricCard label="Complete Profiles" value="92%" />
        <MetricCard label="Missing Emails" value="12" />
        <MetricCard label="Data Freshness" value="Good" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-chart-2" />
            <h2 className="text-lg font-semibold">Data Quality Checks</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Email validation</span>
              <span className="text-sm font-medium text-chart-2">Passing</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Phone formatting</span>
              <span className="text-sm font-medium text-chart-2">Passing</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Address completeness</span>
              <span className="text-sm font-medium text-chart-4">Warning</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Duplicate detection</span>
              <span className="text-sm font-medium text-chart-2">Passing</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-chart-4" />
            <h2 className="text-lg font-semibold">Action Items</h2>
          </div>
          <div className="space-y-3">
            <div className="pb-3 border-b last:border-0">
              <p className="text-sm font-medium mb-1">
                12 donors missing email addresses
              </p>
              <p className="text-xs text-muted-foreground">
                Update contact information to improve engagement
              </p>
            </div>
            <div className="pb-3 border-b last:border-0">
              <p className="text-sm font-medium mb-1">
                5 opportunities without owners
              </p>
              <p className="text-xs text-muted-foreground">
                Assign portfolio managers to track these prospects
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
