import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down";
  className?: string;
}

export function MetricCard({
  label,
  value,
  change,
  trend,
  className,
}: MetricCardProps) {
  return (
    <Card className={cn("p-6", className)} data-testid={`metric-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold tabular-nums">{value}</p>
        {change !== undefined && trend && (
          <div className="flex items-center gap-1 text-xs">
            {trend === "up" ? (
              <ArrowUp className="w-3 h-3 text-chart-2" />
            ) : (
              <ArrowDown className="w-3 h-3 text-destructive" />
            )}
            <span
              className={cn(
                "font-medium",
                trend === "up" ? "text-chart-2" : "text-destructive"
              )}
            >
              {change}%
            </span>
            <span className="text-muted-foreground">vs last period</span>
          </div>
        )}
      </div>
    </Card>
  );
}
