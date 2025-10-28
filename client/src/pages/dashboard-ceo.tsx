import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { ScoreIndicator } from "@/components/score-indicator";
import type { Person } from "@shared/schema";

interface CEODashboardData {
  metrics: {
    ytdRaised: number;
    forecast90Days: number;
    activeMonthlyDonors: number;
    avgGiftSize: number;
  };
  topProspects: (Person & {
    owner?: { firstName: string | null; lastName: string | null };
    currentAsk?: number;
    stage?: string;
  })[];
}

export default function DashboardCEO() {
  const { data, isLoading } = useQuery<CEODashboardData>({
    queryKey: ["/api/dashboard/ceo"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Executive Dashboard</h1>
          <p className="text-muted-foreground">
            High-level metrics and top prospects
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Executive Dashboard</h1>
        <p className="text-muted-foreground">
          High-level metrics and top prospects
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              YTD Raised
            </p>
            <p className="text-5xl font-bold tabular-nums">
              {formatCurrency(data?.metrics.ytdRaised)}
            </p>
            <p className="text-xs text-muted-foreground">Fiscal year to date</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              90-Day Forecast
            </p>
            <p className="text-5xl font-bold tabular-nums">
              {formatCurrency(data?.metrics.forecast90Days)}
            </p>
            <p className="text-xs text-muted-foreground">Expected revenue</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Monthly Donors
            </p>
            <p className="text-5xl font-bold tabular-nums">
              {data?.metrics.activeMonthlyDonors ?? 0}
            </p>
            <p className="text-xs text-muted-foreground">Active recurring</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Avg Gift Size
            </p>
            <p className="text-5xl font-bold tabular-nums">
              {formatCurrency(data?.metrics.avgGiftSize)}
            </p>
            <p className="text-xs text-muted-foreground">Per transaction</p>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Top 25 Prospects</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Donor</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead className="text-right">Ask Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.topProspects.map((prospect) => (
              <TableRow key={prospect.id}>
                <TableCell className="font-medium">
                  {prospect.firstName} {prospect.lastName}
                  {prospect.organizationName && (
                    <span className="block text-xs text-muted-foreground">
                      {prospect.organizationName}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <ScoreIndicator
                      score={prospect.capacityScore}
                      size="sm"
                    />
                    <span className="text-xs text-muted-foreground">
                      {prospect.wealthBand}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{prospect.stage ?? "N/A"}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {prospect.owner?.firstName} {prospect.owner?.lastName}
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(prospect.currentAsk)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
