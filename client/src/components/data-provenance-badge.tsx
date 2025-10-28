import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Database, Info } from "lucide-react";
import { formatDateRelative } from "@/lib/utils";

interface DataProvenanceBadgeProps {
  sourceSystem: string | null;
  syncedAt?: Date | null;
  variant?: "default" | "inline" | "icon";
  className?: string;
}

const SOURCE_SYSTEM_COLORS: Record<string, string> = {
  Salesforce: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  "Salesforce NPSP": "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  WealthEngine: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  iWave: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Mailchimp: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
  Classy: "bg-purple-500/10 text-purple-700 dark:text-purple-300",
  DAFGiving360: "bg-teal-500/10 text-teal-700 dark:text-teal-300",
};

export function DataProvenanceBadge({
  sourceSystem,
  syncedAt,
  variant = "default",
  className = "",
}: DataProvenanceBadgeProps) {
  if (!sourceSystem) {
    return null;
  }

  const colorClass = SOURCE_SYSTEM_COLORS[sourceSystem] || "bg-muted";
  const tooltipContent = (
    <div className="text-xs space-y-1">
      <div className="font-medium">Data Source: {sourceSystem}</div>
      {syncedAt && (
        <div className="text-muted-foreground">
          Synced {formatDateRelative(syncedAt)}
        </div>
      )}
    </div>
  );

  if (variant === "icon") {
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
              data-testid="data-provenance-icon"
              onClick={(e) => e.stopPropagation()}
            >
              <Info className="w-3 h-3" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            {tooltipContent}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (variant === "inline") {
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className={`inline-flex items-center gap-1 text-xs text-muted-foreground cursor-help ${className}`}
              data-testid="data-provenance-inline"
              onClick={(e) => e.stopPropagation()}
            >
              <Database className="w-3 h-3" />
              <span>{sourceSystem}</span>
            </span>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            {tooltipContent}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="secondary"
            className={`text-xs cursor-help ${colorClass} ${className}`}
            data-testid="data-provenance-badge"
            onClick={(e) => e.stopPropagation()}
          >
            <Database className="w-3 h-3 mr-1" />
            {sourceSystem}
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
