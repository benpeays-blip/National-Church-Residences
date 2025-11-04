import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down";
  className?: string;
  href?: string;
}

export function MetricCard({
  label,
  value,
  change,
  trend,
  className,
  href,
}: MetricCardProps) {
  const content = (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-2">
        <p className="text-5xl font-bold tabular-nums text-primary">{value}</p>
        {href && <ExternalLink className="w-4 h-4 text-muted-foreground mt-2" />}
      </div>
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
  );

  if (href) {
    return (
      <Link href={href}>
        <Card 
          className={cn("p-6 border hover-elevate active-elevate-2 cursor-pointer transition-all", className)} 
          data-testid={`metric-${label.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {content}
        </Card>
      </Link>
    );
  }

  return (
    <Card className={cn("p-6 border", className)} data-testid={`metric-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      {content}
    </Card>
  );
}
