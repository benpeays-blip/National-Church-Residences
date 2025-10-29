import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smile, Meh, Frown, AlertCircle } from "lucide-react";

type SentimentAnalysis = {
  id: string;
  personId: string;
  analysisDate: string;
  emailResponseTime: string;
  engagementTrend: string;
  sentimentScore: number;
  riskLevel: string;
  keySignals: string[];
  recommendedAction: string;
  alertGenerated: number;
  createdAt: string;
};

export default function SentimentAnalysisPage() {
  const { data: analyses, isLoading, error, isError } = useQuery<SentimentAnalysis[], Error>({
    queryKey: ["/api/analytics/sentiment"],
  });

  const getSentimentIcon = (score: number) => {
    if (score >= 70) return <Smile className="w-5 h-5 text-green-600" />;
    if (score >= 40) return <Meh className="w-5 h-5 text-yellow-600" />;
    return <Frown className="w-5 h-5 text-red-600" />;
  };

  const getRiskBadgeVariant = (risk: string) => {
    if (risk === "high") return "destructive";
    if (risk === "medium") return "secondary";
    return "outline";
  };

  const getTrendColor = (trend: string) => {
    if (trend === "increasing") return "text-green-600";
    if (trend === "declining") return "text-red-600";
    return "text-muted-foreground";
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Donor Sentiment Analysis</h1>
          <p className="text-muted-foreground">
            AI reads email responses and engagement patterns to gauge donor satisfaction
          </p>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-6 bg-muted rounded"></div>
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
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">
              <p className="font-semibold mb-2">Failed to load sentiment analysis</p>
              <p className="text-sm">{error?.message || "An error occurred"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Donor Sentiment Analysis</h1>
        <p className="text-muted-foreground">
          AI analyzes donor communications to detect sentiment and engagement trends
        </p>
      </div>

      {analyses && analyses.length > 0 ? (
        <div className="grid gap-4">
          {analyses.map((analysis) => (
            <Card key={analysis.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getSentimentIcon(analysis.sentimentScore)}
                    <div>
                      <CardTitle className="text-lg">Donor ID: {analysis.personId.slice(0, 8)}</CardTitle>
                      <div className="text-sm text-muted-foreground">
                        Analyzed {new Date(analysis.analysisDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getRiskBadgeVariant(analysis.riskLevel)}>
                      {analysis.riskLevel} risk
                    </Badge>
                    {analysis.alertGenerated === 1 && (
                      <AlertCircle className="w-5 h-5 text-orange-600" data-testid={`icon-alert-${analysis.id}`} />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Sentiment Score</div>
                    <div className="text-2xl font-bold" data-testid={`text-sentiment-${analysis.id}`}>
                      {analysis.sentimentScore}/100
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Engagement Trend</div>
                    <div className={`text-lg font-semibold ${getTrendColor(analysis.engagementTrend)}`}>
                      {analysis.engagementTrend}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Avg Response Time</div>
                    <div className="text-lg font-semibold">
                      {parseFloat(analysis.emailResponseTime).toFixed(1)}h
                    </div>
                  </div>
                </div>

                {analysis.keySignals && analysis.keySignals.length > 0 && (
                  <div>
                    <div className="text-sm font-semibold mb-2">Key Signals</div>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keySignals.map((signal, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {signal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {analysis.recommendedAction && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm font-semibold mb-1">Recommended Action</div>
                    <div className="text-sm text-muted-foreground">{analysis.recommendedAction}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Smile className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Sentiment Data Yet</h3>
            <p className="text-muted-foreground">
              Sentiment analyses will appear here once communications are analyzed
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
