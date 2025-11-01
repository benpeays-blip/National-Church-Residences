import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "wouter";
import { ArrowLeft, DollarSign, TrendingUp, Calendar, Target } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { format, addDays, isWithinInterval } from "date-fns";

type Opportunity = {
  id: string;
  personId: string;
  stage: string;
  askAmount: string | null;
  probability: number | null;
  closeDate: string | null;
  ownerId: string | null;
  person: {
    firstName: string;
    lastName: string;
  };
  owner: {
    firstName: string;
    lastName: string;
  };
};

export default function Forecast90Days() {
  const { data: opportunities, isLoading } = useQuery<Opportunity[]>({
    queryKey: ["/api/opportunities"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Loading...</h1>
          <p className="text-sm text-muted-foreground">Please wait</p>
        </div>
      </div>
    );
  }

  const today = new Date();
  const next90Days = addDays(today, 90);

  const forecastOpps = opportunities?.filter((opp) => {
    if (!opp.closeDate) return false;
    const closeDate = new Date(opp.closeDate);
    return isWithinInterval(closeDate, { start: today, end: next90Days });
  }) || [];

  const totalAskAmount = forecastOpps.reduce(
    (sum, opp) => sum + parseFloat(opp.askAmount || "0"),
    0
  );

  const weightedForecast = forecastOpps.reduce(
    (sum, opp) => sum + parseFloat(opp.askAmount || "0") * ((opp.probability || 0) / 100),
    0
  );

  const avgProbability = forecastOpps.length > 0
    ? forecastOpps.reduce((sum, opp) => sum + (opp.probability || 0), 0) / forecastOpps.length
    : 0;

  // Group by month
  const monthGroups: { [key: string]: Opportunity[] } = {};
  forecastOpps.forEach((opp) => {
    const monthKey = format(new Date(opp.closeDate!), "yyyy-MM");
    if (!monthGroups[monthKey]) monthGroups[monthKey] = [];
    monthGroups[monthKey].push(opp);
  });

  const monthlyBreakdown = Object.entries(monthGroups)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([monthKey, opps]) => ({
      month: format(new Date(monthKey + "-01"), "MMMM yyyy"),
      monthKey,
      opportunities: opps.length,
      totalAsk: opps.reduce((sum, o) => sum + parseFloat(o.askAmount || "0"), 0),
      weighted: opps.reduce((sum, o) => sum + parseFloat(o.askAmount || "0") * ((o.probability || 0) / 100), 0),
      avgProb: opps.reduce((sum, o) => sum + (o.probability || 0), 0) / opps.length,
    }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/dashboard/dev-director">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold">90-Day Forecast</h1>
        <p className="text-sm text-muted-foreground">
          Opportunities expected to close in the next 90 days
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weighted Forecast</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" data-testid="metric-weighted-forecast">
              {formatCurrency(weightedForecast)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Probability-adjusted
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pipeline</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" data-testid="metric-total-ask">
              {formatCurrency(totalAskAmount)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              If all close successfully
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Opportunities</CardTitle>
            <Target className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" data-testid="metric-opportunity-count">
              {forecastOpps.length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              closing in 90 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Probability</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" data-testid="metric-avg-probability">
              {avgProbability.toFixed(0)}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              confidence level
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Breakdown */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle>Monthly Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table data-testid="table-monthly-forecast">
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead className="text-right">Opportunities</TableHead>
                <TableHead className="text-right">Total Ask</TableHead>
                <TableHead className="text-right">Weighted Forecast</TableHead>
                <TableHead className="text-right">Avg Probability</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyBreakdown.map((month) => (
                <TableRow key={month.monthKey} data-testid={`row-month-${month.monthKey}`}>
                  <TableCell className="font-medium">{month.month}</TableCell>
                  <TableCell className="text-right">{month.opportunities}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(month.totalAsk)}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-chart-1">
                    {formatCurrency(month.weighted)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary">{month.avgProb.toFixed(0)}%</Badge>
                  </TableCell>
                </TableRow>
              ))}
              {monthlyBreakdown.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No opportunities closing in the next 90 days
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* All Opportunities */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle>All Forecasted Opportunities</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table data-testid="table-opportunities">
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>MGO</TableHead>
                <TableHead>Close Date</TableHead>
                <TableHead className="text-right">Ask Amount</TableHead>
                <TableHead className="text-right">Probability</TableHead>
                <TableHead className="text-right">Weighted Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forecastOpps
                .sort((a, b) => new Date(a.closeDate!).getTime() - new Date(b.closeDate!).getTime())
                .map((opp) => (
                  <TableRow key={opp.id} data-testid={`row-opportunity-${opp.id}`}>
                    <TableCell className="font-medium">
                      {opp.person ? (
                        <Link href={`/donors/${opp.personId}`} className="hover:underline">
                          {opp.person.firstName} {opp.person.lastName}
                        </Link>
                      ) : (
                        <span className="text-muted-foreground">Unknown Donor</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{opp.stage}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {opp.owner ? `${opp.owner.firstName} ${opp.owner.lastName}` : 'Unassigned'}
                    </TableCell>
                    <TableCell className="font-medium">
                      {format(new Date(opp.closeDate!), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(parseFloat(opp.askAmount || "0"))}
                    </TableCell>
                    <TableCell className="text-right">{opp.probability}%</TableCell>
                    <TableCell className="text-right font-semibold text-chart-1">
                      {formatCurrency(parseFloat(opp.askAmount || "0") * ((opp.probability || 0) / 100))}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
