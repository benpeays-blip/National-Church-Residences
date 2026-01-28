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
import { ArrowLeft, AlertCircle, DollarSign, Users, TrendingDown, Mail } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";

type LYBUNTDonor = {
  id: string;
  firstName: string;
  lastName: string;
  primaryEmail: string | null;
  lastGiftAmount: string | null;
  lastGiftDate: Date | null;
  totalLifetimeGiving: string | null;
};

export default function LYBUNTDonors() {
  const { data: dashboardData, isLoading } = useQuery<{ lybuntDonors: LYBUNTDonor[] }>({
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

  const lybuntDonors = dashboardData?.lybuntDonors || [];
  
  const totalAtRisk = lybuntDonors.reduce(
    (sum, d) => sum + parseFloat(d.lastGiftAmount || "0"),
    0
  );

  const avgLastGift = lybuntDonors.length > 0 ? totalAtRisk / lybuntDonors.length : 0;

  const withEmail = lybuntDonors.filter((d) => d.primaryEmail).length;

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
          <AlertCircle className="w-8 h-8 text-chart-4" />
          <div>
            <h1 className="text-3xl font-bold">LYBUNT Donor Recovery</h1>
            <p className="text-sm text-muted-foreground">
              "Last Year But Unfortunately Not This" - Priority reactivation list
            </p>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <Card className="p-6 bg-chart-4/5 border-chart-4">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-chart-4-foreground shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-chart-4-foreground mb-1">High-Priority Reactivation Campaign</h3>
            <p className="text-sm text-chart-4-foreground/90">
              These {lybuntDonors.length} donors gave last year but haven't given yet this year. They represent your most winnable reactivation targets with recent giving history and established connection to your mission.
            </p>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At-Risk Donors</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-chart-4" data-testid="metric-donor-count">
              {lybuntDonors.length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              need reactivation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue at Risk</CardTitle>
            <TrendingDown className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" data-testid="metric-revenue-risk">
              {formatCurrency(totalAtRisk)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              last year's giving
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Last Gift</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" data-testid="metric-avg-gift">
              {formatCurrency(avgLastGift)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              typical gift size
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
              {lybuntDonors.length > 0 ? Math.round((withEmail / lybuntDonors.length) * 100) : 0}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {withEmail} have email addresses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reactivation Strategy */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle>Recommended Reactivation Strategy</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-chart-1 text-chart-1-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="font-semibold">Personalized Outreach</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Send personalized emails thanking them for last year's support and sharing impact stories. Reference their specific gift.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-chart-2 text-chart-2-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="font-semibold">Phone Follow-up</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                For donors over $500, make personal phone calls to reconnect and understand any changes in their giving capacity.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-chart-3 text-chart-3-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="font-semibold">Matching Challenge</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Create urgency with a matching gift opportunity specifically for lapsed donors to maximize reactivation success.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* LYBUNT Donors Table */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <div className="flex items-center justify-between">
            <CardTitle>All LYBUNT Donors</CardTitle>
            <Button size="sm" data-testid="button-export">
              Export List
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table data-testid="table-lybunt-donors">
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Last Gift Date</TableHead>
                <TableHead className="text-right">Last Gift Amount</TableHead>
                <TableHead className="text-right">Lifetime Giving</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lybuntDonors
                .sort((a, b) => parseFloat(b.lastGiftAmount || "0") - parseFloat(a.lastGiftAmount || "0"))
                .map((donor) => {
                  const lastAmount = parseFloat(donor.lastGiftAmount || "0");
                  const priority = lastAmount >= 1000 ? "High" : lastAmount >= 250 ? "Medium" : "Low";
                  const priorityVariant = priority === "High" ? "default" : priority === "Medium" ? "secondary" : "outline";
                  
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
                        {formatCurrency(lastAmount)}
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {formatCurrency(parseFloat(donor.totalLifetimeGiving || "0"))}
                      </TableCell>
                      <TableCell>
                        <Badge variant={priorityVariant as any}>{priority}</Badge>
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
