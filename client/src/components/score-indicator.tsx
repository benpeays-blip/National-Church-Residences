import { cn, getScoreColor, getScoreLabel } from "@/lib/utils";

interface ScoreIndicatorProps {
  score: number | null | undefined;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function ScoreIndicator({
  score,
  size = "md",
  showLabel = false,
  className,
}: ScoreIndicatorProps) {
  const sizeClasses = {
    sm: "w-10 h-10 text-xs",
    md: "w-16 h-16 text-sm",
    lg: "w-20 h-20 text-base",
  };

  const displayScore = score ?? 0;
  const percentage = displayScore;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            className="fill-none stroke-muted/20"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            className={cn("fill-none transition-all duration-300", getScoreColor(score))}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("font-semibold tabular-nums", getScoreColor(score))}>
            {displayScore}
          </span>
        </div>
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-muted-foreground">
          {getScoreLabel(score)}
        </span>
      )}
    </div>
  );
}
