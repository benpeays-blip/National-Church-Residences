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
    <Card className={cn("p-6 border", className)} data-testid={`metric-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="space-y-2">
        <p className="text-5xl font-bold tabular-nums text-primary">{value}</p>
        <p className="text-sm font-medium">{label}</p>
        {change !== undefined && trend && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {trend === "up" ? (
              <ArrowUp className="w-3 h-3" />
            ) : (
              <ArrowDown className="w-3 h-3" />
            )}
            <span className="font-medium">
              {change}% vs last period
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
