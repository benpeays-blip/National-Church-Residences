import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Target,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react";
import { AccentCard, getAccentColor } from "@/components/ui/accent-card";

const benchmarkData = [
  { 
    metric: "Donor Retention Rate", 
    yourValue: 48, 
    peerAvg: 45, 
    topQuartile: 55,
    unit: "%",
    trend: "up",
    description: "Percentage of donors who gave again"
  },
  { 
    metric: "Average Gift Size", 
    yourValue: 285, 
    peerAvg: 245, 
    topQuartile: 320,
    unit: "$",
    trend: "up",
    description: "Mean donation amount"
  },
  { 
    metric: "LYBUNT Recovery Rate", 
    yourValue: 22, 
    peerAvg: 28, 
    topQuartile: 35,
    unit: "%",
    trend: "down",
    description: "Last year but not this year reactivation"
  },
  { 
    metric: "Major Gift Conversion", 
    yourValue: 8, 
    peerAvg: 6, 
    topQuartile: 12,
    unit: "%",
    trend: "up",
    description: "Prospects converting to $10K+ gifts"
  },
  { 
    metric: "Cost per Dollar Raised", 
    yourValue: 0.18, 
    peerAvg: 0.22, 
    topQuartile: 0.15,
    unit: "$",
    trend: "up",
    description: "Fundraising efficiency ratio"
  },
  { 
    metric: "Monthly Donor Growth", 
    yourValue: 12, 
    peerAvg: 8, 
    topQuartile: 18,
    unit: "%",
    trend: "neutral",
    description: "Year-over-year sustainer growth"
  },
];

const peerComparison = {
  organizationType: "Housing Nonprofit",
  budgetRange: "$5M - $10M",
  region: "Southeast US",
  peerCount: 142
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up": return <ArrowUp className="h-4 w-4" style={{ color: getAccentColor("lime") }} />;
    case "down": return <ArrowDown className="h-4 w-4" style={{ color: getAccentColor("coral") }} />;
    default: return <Minus className="h-4 w-4 text-muted-foreground" />;
  }
};

const getPerformanceColor = (yourValue: number, peerAvg: number, topQuartile: number, metric: string) => {
  const isLowerBetter = metric.includes("Cost");
  
  if (isLowerBetter) {
    if (yourValue <= topQuartile) return getAccentColor("lime");
    if (yourValue <= peerAvg) return getAccentColor("sky");
    return getAccentColor("coral");
  }
  
  if (yourValue >= topQuartile) return getAccentColor("lime");
  if (yourValue >= peerAvg) return getAccentColor("sky");
  return getAccentColor("coral");
};

export default function Benchmarks() {
  const aboveAvgCount = benchmarkData.filter(b => {
    const isLowerBetter = b.metric.includes("Cost");
    return isLowerBetter ? b.yourValue < b.peerAvg : b.yourValue > b.peerAvg;
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Benchmark Comparisons</h1>
          <p className="text-sm text-muted-foreground">
            Compare your fundraising KPIs against {peerComparison.peerCount} similar organizations
          </p>
        </div>
        <BarChart3 className="h-8 w-8 text-muted-foreground" />
      </div>

      <Card className="overflow-hidden">
        <div className="bg-[#395174] p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Your Peer Group</h2>
              <div className="flex items-center gap-4 mt-2 text-white/80 text-sm">
                <span>{peerComparison.organizationType}</span>
                <span>•</span>
                <span>{peerComparison.budgetRange}</span>
                <span>•</span>
                <span>{peerComparison.region}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold">{peerComparison.peerCount}</p>
              <p className="text-white/80">Peer Organizations</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AccentCard accent="lime">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("lime")}20` }}>
                <TrendingUp className="h-5 w-5" style={{ color: getAccentColor("lime") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-above-avg">{aboveAvgCount}</p>
                <p className="text-sm text-muted-foreground">Above Peer Average</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="sky">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("sky")}20` }}>
                <Target className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-at-avg">{benchmarkData.length - aboveAvgCount}</p>
                <p className="text-sm text-muted-foreground">Room for Growth</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="teal">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("teal")}20` }}>
                <BarChart3 className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-total-kpis">{benchmarkData.length}</p>
                <p className="text-sm text-muted-foreground">KPIs Tracked</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
            Performance vs. Peers
          </CardTitle>
          <CardDescription>
            How you compare to organizations of similar size and mission
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {benchmarkData.map((benchmark, idx) => {
              const performanceColor = getPerformanceColor(
                benchmark.yourValue, 
                benchmark.peerAvg, 
                benchmark.topQuartile,
                benchmark.metric
              );
              const isLowerBetter = benchmark.metric.includes("Cost");
              const progressValue = isLowerBetter 
                ? Math.min(100, (benchmark.topQuartile / benchmark.yourValue) * 100)
                : Math.min(100, (benchmark.yourValue / benchmark.topQuartile) * 100);
              
              return (
                <div 
                  key={idx}
                  className="p-4 rounded-lg bg-card border border-border shadow-sm"
                  style={{ borderLeftWidth: '4px', borderLeftColor: performanceColor }}
                  data-testid={`benchmark-${idx}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{benchmark.metric}</h4>
                        {getTrendIcon(benchmark.trend)}
                      </div>
                      <p className="text-sm text-muted-foreground">{benchmark.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold" style={{ color: performanceColor }}>
                        {benchmark.unit === "$" ? `$${benchmark.yourValue}` : `${benchmark.yourValue}${benchmark.unit}`}
                      </p>
                      <Badge 
                        variant="outline"
                        style={{ borderColor: performanceColor, color: performanceColor }}
                      >
                        {benchmark.yourValue > benchmark.peerAvg 
                          ? `+${Math.round(((benchmark.yourValue - benchmark.peerAvg) / benchmark.peerAvg) * 100)}% vs peers`
                          : `${Math.round(((benchmark.yourValue - benchmark.peerAvg) / benchmark.peerAvg) * 100)}% vs peers`
                        }
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Your Performance</span>
                      <span>Top Quartile: {benchmark.unit === "$" ? `$${benchmark.topQuartile}` : `${benchmark.topQuartile}${benchmark.unit}`}</span>
                    </div>
                    <div className="relative">
                      <Progress value={progressValue} className="h-3" />
                      <div 
                        className="absolute top-0 h-3 w-0.5 bg-muted-foreground"
                        style={{ 
                          left: `${(benchmark.peerAvg / benchmark.topQuartile) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>You: {benchmark.unit === "$" ? `$${benchmark.yourValue}` : `${benchmark.yourValue}${benchmark.unit}`}</span>
                      <span className="text-muted-foreground">
                        Peer Avg: {benchmark.unit === "$" ? `$${benchmark.peerAvg}` : `${benchmark.peerAvg}${benchmark.unit}`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
