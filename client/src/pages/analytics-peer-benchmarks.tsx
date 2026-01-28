import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Minus, TrendingUp } from "lucide-react";

type PeerBenchmark = {
  id: string;
  metricName: string;
  ourValue: string;
  peerAverage: string;
  peerMedian: string;
  peerTop25: string;
  percentileRank: number;
  trend: string;
  aiRecommendation: string;
  calculatedAt: string;
};

export default function PeerBenchmarks() {
  const { data: benchmarks, isLoading, error, isError } = useQuery<PeerBenchmark[], Error>({
    queryKey: ["analytics", "peer-benchmarks"],
    queryFn: () => api.analytics.getPeerBenchmarks(),
  });

  const getTrendIcon = (trend: string) => {
    if (trend === "improving") return <ArrowUp className="w-4 h-4 text-green-600" />;
    if (trend === "declining") return <ArrowDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  const getPercentileColor = (rank: number) => {
    if (rank >= 75) return "text-green-600";
    if (rank >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Peer Benchmarking</h1>
          <p className="text-sm text-muted-foreground">
            Compare your performance to similar nonprofits
          </p>
        </div>
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                  <div className="h-8 bg-muted rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Peer Benchmarking</h1>
          <p className="text-sm text-muted-foreground">
            Compare your performance to similar nonprofits
          </p>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">
              <p className="font-semibold mb-2">Failed to load peer benchmarks</p>
              <p className="text-sm">{error?.message || "An error occurred"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Peer Benchmarking</h1>
        <p className="text-sm text-muted-foreground">
          Compare your performance to similar nonprofits in your sector and budget size
        </p>
      </div>

      {benchmarks && benchmarks.length > 0 ? (
        <div className="grid gap-6">
          {benchmarks.map((benchmark) => (
            <Card key={benchmark.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{benchmark.metricName}</CardTitle>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(benchmark.trend)}
                    <span className={`text-sm font-semibold ${getPercentileColor(benchmark.percentileRank)}`}>
                      {benchmark.percentileRank}th percentile
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Your Value</div>
                    <div className="text-2xl font-bold" data-testid={`text-our-value-${benchmark.id}`}>
                      ${parseFloat(benchmark.ourValue).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Peer Average</div>
                    <div className="text-2xl font-semibold text-muted-foreground">
                      ${parseFloat(benchmark.peerAverage).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Peer Median</div>
                    <div className="text-2xl font-semibold text-muted-foreground">
                      ${parseFloat(benchmark.peerMedian).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Top 25%</div>
                    <div className="text-2xl font-semibold text-muted-foreground">
                      ${parseFloat(benchmark.peerTop25).toLocaleString()}
                    </div>
                  </div>
                </div>
                {benchmark.aiRecommendation && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold mb-1">AI Recommendation</div>
                        <div className="text-sm text-muted-foreground">{benchmark.aiRecommendation}</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Benchmark Data Yet</h3>
            <p className="text-muted-foreground">
              Peer comparisons will appear here once data is synced
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
