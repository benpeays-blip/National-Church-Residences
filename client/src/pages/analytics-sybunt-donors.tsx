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
import { ArrowLeft, Clock, DollarSign, Users, Calendar, Mail } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";

type SYBUNTDonor = {
  id: string;
  firstName: string;
  lastName: string;
  primaryEmail: string | null;
  lastGiftAmount: string | null;
  lastGiftDate: Date | null;
  totalLifetimeGiving: string | null;
};

export default function SYBUNTDonors() {
  const { data: dashboardData, isLoading } = useQuery<{ sybuntDonors: SYBUNTDonor[] }>({
    queryKey: ["/api/dashboard/dev-director"],
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

  const sybuntDonors = dashboardData?.sybuntDonors || [];
  
  const totalLifetime = sybuntDonors.reduce(
    (sum, d) => sum + parseFloat(d.totalLifetimeGiving || "0"),
    0
  );

  const avgLifetime = sybuntDonors.length > 0 ? totalLifetime / sybuntDonors.length : 0;

  const withEmail = sybuntDonors.filter((d) => d.primaryEmail).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/dashboard/dev-director">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="w-8 h-8 text-chart-3" />
          <div>
            <h1 className="text-3xl font-bold">SYBUNT Donor Recovery</h1>
            <p className="text-sm text-muted-foreground">
              "Some Years But Unfortunately Not This" - Long-term recovery campaign
            </p>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <Card className="p-6 bg-chart-3/5 border-chart-3">
        <div className="flex items-start gap-4">
          <Clock className="w-6 h-6 text-chart-3-foreground shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-chart-3-foreground mb-1">Long-Term Reengagement Needed</h3>
            <p className="text-sm text-chart-3-foreground/90">
              These {sybuntDonors.length} donors gave in prior years (2022-2023) but not recently. While more challenging than LYBUNT recovery, they represent proven supporters worth strategic reengagement.
            </p>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lapsed Donors</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-chart-3" data-testid="metric-donor-count">
              {sybuntDonors.length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              long-term recovery targets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Historical Value</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" data-testid="metric-historical-value">
              {formatCurrency(totalLifetime)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              lifetime giving
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Lifetime Value</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" data-testid="metric-avg-lifetime">
              {formatCurrency(avgLifetime)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              per donor
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact Rate</CardTitle>
            <Mail className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" data-testid="metric-contact-rate">
              {sybuntDonors.length > 0 ? Math.round((withEmail / sybuntDonors.length) * 100) : 0}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {withEmail} have email addresses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recovery Strategy */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle>Long-Term Recovery Strategy</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-chart-1 text-chart-1-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="font-semibold">Reconnection Campaign</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Multi-touch campaign acknowledging the gap in giving. Share major updates, new programs, and impact since their last gift.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-chart-2 text-chart-2-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="font-semibold">Survey & Listen</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Send brief survey to understand why they stopped giving. Use insights to tailor messaging and address concerns.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-chart-3 text-chart-3-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="font-semibold">Lower Barrier Entry</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Invite them back with a modest ask amount. Focus on rekindling the relationship rather than maximizing the gift.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SYBUNT Donors Table */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <div className="flex items-center justify-between">
            <CardTitle>All SYBUNT Donors</CardTitle>
            <Button size="sm" data-testid="button-export">
              Export List
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table data-testid="table-sybunt-donors">
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Last Gift Date</TableHead>
                <TableHead className="text-right">Last Gift Amount</TableHead>
                <TableHead className="text-right">Lifetime Giving</TableHead>
                <TableHead>Recovery Stage</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sybuntDonors
                .sort((a, b) => parseFloat(b.totalLifetimeGiving || "0") - parseFloat(a.totalLifetimeGiving || "0"))
                .map((donor) => {
                  const lifetime = parseFloat(donor.totalLifetimeGiving || "0");
                  const stage = lifetime >= 5000 ? "Survey" : lifetime >= 1000 ? "Email Campaign" : "Newsletter";
                  
                  return (
                    <TableRow key={donor.id} data-testid={`row-donor-${donor.id}`}>
                      <TableCell className="font-medium">
                        <Link href={`/donors/${donor.id}`} className="hover:underline">
                          {donor.firstName} {donor.lastName}
                        </Link>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {donor.primaryEmail || (
                          <span className="text-destructive">No email</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {donor.lastGiftDate ? format(new Date(donor.lastGiftDate), "MMM d, yyyy") : "Unknown"}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(parseFloat(donor.lastGiftAmount || "0"))}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-chart-1">
                        {formatCurrency(lifetime)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{stage}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" data-testid={`button-email-${donor.id}`}>
                            Email
                          </Button>
                          <Button size="sm" variant="outline" data-testid={`button-task-${donor.id}`}>
                            Create Task
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
