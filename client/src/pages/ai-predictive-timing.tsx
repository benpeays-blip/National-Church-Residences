import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Calendar, DollarSign, Target, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { Person, PredictiveScore } from "@shared/schema";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface PredictiveTimingData {
  person: Person;
  score: PredictiveScore;
}

export default function AIPredictiveTiming() {
  const { data: predictions, isLoading } = useQuery<PredictiveTimingData[]>({
    queryKey: ["/api/ai/predictive-timing"],
  });

  const getTimeframeLabel = (days: number | null) => {
    if (!days) return "Unknown";
    if (days <= 30) return "Within 30 days";
    if (days <= 60) return "30-60 days";
    if (days <= 90) return "60-90 days";
    return "90+ days";
  };

  const getTimeframeColor = (days: number | null) => {
    if (!days) return "text-muted-foreground";
    if (days <= 30) return "text-green-600 dark:text-green-400";
    if (days <= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-orange-600 dark:text-orange-400";
  };

  const getProbabilityLevel = (probability: number | null) => {
    if (!probability) return { label: "Unknown", color: "secondary" as const };
    if (probability >= 80) return { label: "Very High", color: "default" as const };
    if (probability >= 60) return { label: "High", color: "default" as const };
    if (probability >= 40) return { label: "Medium", color: "secondary" as const };
    return { label: "Low", color: "outline" as const };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Predictive Major Gift Timing</h1>
        <p className="text-sm text-muted-foreground">
          AI-powered predictions showing which donors are most likely to make major gifts and when
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card data-testid="card-high-probability">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Probability</CardTitle>
            <Target className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold" data-testid="text-high-probability-count">
                  {predictions?.filter((p) => (p.score.givingProbability || 0) >= 60).length || 0}
                </div>
                <p className="text-xs text-muted-foreground">60%+ probability</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card data-testid="card-near-term">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Near-Term Ready</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold" data-testid="text-near-term-count">
                  {predictions?.filter((p) => (p.score.predictedTimeframe || 999) <= 30).length || 0}
                </div>
                <p className="text-xs text-muted-foreground">Within 30 days</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card data-testid="card-total-predicted">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Predicted</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold" data-testid="text-total-predicted-amount">
                  $
                  {predictions
                    ?.reduce((sum, p) => sum + Number(p.score.predictedAmount || 0), 0)
                    .toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <p className="text-xs text-muted-foreground">Next 90 days</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card data-testid="card-high-confidence">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Confidence</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold" data-testid="text-high-confidence-count">
                  {predictions?.filter((p) => (p.score.confidence || 0) >= 70).length || 0}
                </div>
                <p className="text-xs text-muted-foreground">70%+ confidence</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Predictions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Gift Timing Predictions</CardTitle>
          <CardDescription>
            Donors ranked by probability and timing of their next major gift
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : predictions && predictions.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor</TableHead>
                    <TableHead>Giving Probability</TableHead>
                    <TableHead>Predicted Amount</TableHead>
                    <TableHead>Timeframe</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Key Factors</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {predictions
                    .sort((a, b) => (b.score.givingProbability || 0) - (a.score.givingProbability || 0))
                    .map((prediction) => {
                      const probLevel = getProbabilityLevel(prediction.score.givingProbability);
                      return (
                        <TableRow key={prediction.score.id} data-testid={`row-prediction-${prediction.person.id}`}>
                          <TableCell className="font-medium">
                            <div>
                              <div data-testid={`text-donor-name-${prediction.person.id}`}>
                                {prediction.person.firstName} {prediction.person.lastName}
                              </div>
                              {prediction.person.organizationName && (
                                <div className="text-sm text-muted-foreground">
                                  {prediction.person.organizationName}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2">
                                <Badge variant={probLevel.color} data-testid={`badge-probability-${prediction.person.id}`}>
                                  {probLevel.label}
                                </Badge>
                                <span className="text-sm font-medium">
                                  {prediction.score.givingProbability}%
                                </span>
                              </div>
                              <Progress 
                                value={prediction.score.givingProbability || 0} 
                                className="h-1"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium" data-testid={`text-predicted-amount-${prediction.person.id}`}>
                              ${Number(prediction.score.predictedAmount || 0).toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className={`font-medium ${getTimeframeColor(prediction.score.predictedTimeframe)}`}>
                              {getTimeframeLabel(prediction.score.predictedTimeframe)}
                            </div>
                            {prediction.score.predictedTimeframe && (
                              <div className="text-xs text-muted-foreground">
                                {prediction.score.predictedTimeframe} days
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{prediction.score.confidence}%</span>
                              {(prediction.score.confidence || 0) >= 70 ? (
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                              ) : (prediction.score.confidence || 0) < 50 ? (
                                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                              ) : null}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-md">
                              {prediction.score.keyFactors && prediction.score.keyFactors.length > 0 ? (
                                <ul className="text-sm space-y-1">
                                  {prediction.score.keyFactors.slice(0, 3).map((factor, idx) => (
                                    <li key={idx} className="flex items-start gap-1">
                                      <TrendingUp className="w-3 h-3 mt-0.5 flex-shrink-0 text-muted-foreground" />
                                      <span>{factor}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <span className="text-sm text-muted-foreground">No factors available</span>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Predictions Available</h3>
              <p className="text-muted-foreground">
                Predictive scores are being calculated. Check back soon!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
