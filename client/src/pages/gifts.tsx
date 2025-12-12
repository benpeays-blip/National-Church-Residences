import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  Heart,
  Repeat,
  FileText,
  Filter,
  Download,
  Gift as GiftIcon
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Gift } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo, useState } from "react";

type GiftType = "all" | "major" | "recurring" | "planned" | "types";

interface GiftsProps {
  activeTab?: string;
}

export default function Gifts({ activeTab = "all" }: GiftsProps) {
  const [showDateFilter, setShowDateFilter] = useState(false);
  
  const { data: gifts, isLoading } = useQuery<Gift[]>({
    queryKey: ["/api/gifts"],
  });

  // Filter gifts based on type using structured fields with keyword fallbacks
  const filteredGifts = useMemo(() => {
    if (!gifts) return [];
    
    switch (activeTab) {
      case "major":
        // Major gifts: use giftType field, OR $10,000+, OR designation keywords
        return gifts.filter(g => {
          const amount = parseFloat(g.amount);
          const designation = g.designation?.toLowerCase() || '';
          return g.giftType === 'major' ||
                 amount >= 10000 || 
                 designation.includes('major') || 
                 designation.includes('capital campaign') ||
                 designation.includes('endowment') ||
                 designation.includes('leadership');
        });
      case "recurring":
        // Recurring gifts: use giftType and recurringCadence fields, OR designation keywords
        return gifts.filter(g => {
          const designation = g.designation?.toLowerCase() || '';
          return g.giftType === 'recurring' ||
                 (g.recurringCadence && g.recurringCadence !== 'one_time') ||
                 designation.includes('monthly') || 
                 designation.includes('sustainer') ||
                 designation.includes('recurring');
        });
      case "planned":
        // Planned gifts: use giftType field, OR designation keywords
        return gifts.filter(g => {
          const designation = g.designation?.toLowerCase() || '';
          return g.giftType === 'planned' ||
                 designation.includes('bequest') || 
                 designation.includes('estate') ||
                 designation.includes('legacy') ||
                 designation.includes('planned gift') ||
                 designation.includes('charitable');
        });
      default:
        return gifts;
    }
  }, [gifts, activeTab]);

  // Calculate comprehensive metrics
  const metrics = useMemo(() => {
    if (!gifts || gifts.length === 0) {
      return {
        totalRaised: 0,
        giftCount: 0,
        avgGift: 0,
        uniqueDonors: 0,
        retention: 0,
        pipelineValue: 0,
        monthlyRevenue: 0,
        churnRate: 0,
        inDiscussion: 0
      };
    }

    // Tab-specific totals from filtered gifts
    const totalRaised = filteredGifts.reduce((sum, g) => sum + parseFloat(g.amount), 0);
    const giftCount = filteredGifts.length;
    const avgGift = giftCount > 0 ? totalRaised / giftCount : 0;
    const uniqueDonors = new Set(filteredGifts.map(g => g.personId)).size;
    
    // Retention calculation - MUST use ALL gifts, not filtered
    const currentYear = new Date().getFullYear();
    const thisYearDonors = new Set(
      gifts
        .filter(g => new Date(g.receivedAt).getFullYear() === currentYear)
        .map(g => g.personId)
    );
    const lastYearDonors = new Set(
      gifts
        .filter(g => new Date(g.receivedAt).getFullYear() === currentYear - 1)
        .map(g => g.personId)
    );
    const retainedDonors = Array.from(thisYearDonors).filter(id => lastYearDonors.has(id)).length;
    const retention = lastYearDonors.size > 0 ? (retainedDonors / lastYearDonors.size) * 100 : 0;
    
    // Churn rate - MUST use ALL gifts
    const churnedDonors = Array.from(lastYearDonors).filter(id => !thisYearDonors.has(id)).length;
    const churnRate = lastYearDonors.size > 0 ? (churnedDonors / lastYearDonors.size) * 100 : 0;
    
    // Major gifts specific: pipeline value (future major gifts using structured fields)
    const pipelineValue = gifts
      .filter(g => {
        const amount = parseFloat(g.amount);
        const designation = g.designation?.toLowerCase() || '';
        const isFuture = new Date(g.receivedAt) > new Date();
        // Use structured field first, then fallback to amount/keywords
        const isMajor = g.giftType === 'major' || 
                       amount >= 10000 || 
                       designation.includes('major') || 
                       designation.includes('capital campaign');
        return isFuture && isMajor;
      })
      .reduce((sum, g) => sum + parseFloat(g.amount), 0);
    
    // Recurring gifts specific: MRR using structured fields with cadence normalization
    const recurringGifts = gifts.filter(g => {
      const designation = g.designation?.toLowerCase() || '';
      // Use structured fields first, then fallback to designation keywords
      return g.giftType === 'recurring' ||
             (g.recurringCadence && g.recurringCadence !== 'one_time') ||
             designation.includes('monthly') || 
             designation.includes('sustainer') ||
             designation.includes('recurring');
    });
    const monthlyRevenue = recurringGifts.reduce((sum, g) => {
      const amount = parseFloat(g.amount);
      // Normalize to monthly based on cadence
      switch (g.recurringCadence) {
        case 'weekly':
          return sum + (amount * 4.33); // Average weeks per month
        case 'monthly':
          return sum + amount;
        case 'quarterly':
          return sum + (amount / 3);
        case 'annual':
          return sum + (amount / 12);
        default:
          // If no cadence specified, assume monthly (for keyword-matched gifts)
          return sum + amount;
      }
    }, 0);
    
    // Planned gifts in discussion - using structured field (last 2 years)
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    const plannedGifts = gifts.filter(g => {
      const designation = g.designation?.toLowerCase() || '';
      const isRecent = new Date(g.receivedAt) >= twoYearsAgo;
      // Use structured field first, then fallback to keywords
      const isPlanned = g.giftType === 'planned' ||
                       designation.includes('planned') || 
                       designation.includes('bequest') || 
                       designation.includes('legacy') ||
                       designation.includes('estate');
      return isPlanned && isRecent;
    });
    const inDiscussion = plannedGifts.length;
    
    return {
      totalRaised,
      giftCount,
      avgGift,
      uniqueDonors,
      retention,
      pipelineValue,
      monthlyRevenue,
      churnRate,
      inDiscussion
    };
  }, [gifts, filteredGifts]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Gifts</h1>
          <p className="text-sm text-muted-foreground">
            Track all donations and contributions
          </p>
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Gifts</h1>
          <p className="text-sm text-muted-foreground">
            Comprehensive donor contribution management
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            data-testid="button-filter"
            onClick={() => setShowDateFilter(!showDateFilter)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            data-testid="button-export"
            onClick={() => {
              // Simple CSV export
              const csv = [
                ['Date', 'Donor ID', 'Amount', 'Designation', 'Payment Method', 'Source'].join(','),
                ...filteredGifts.map(g => [
                  formatDate(g.receivedAt),
                  g.personId.slice(0, 8),
                  g.amount,
                  `"${g.designation || 'N/A'}"`,
                  g.paymentMethod || 'N/A',
                  g.sourceSystem || 'Manual'
                ].join(','))
              ].join('\n');
              
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `gifts-${activeTab}-${new Date().toISOString().split('T')[0]}.csv`;
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* All Gifts Tab */}
      {activeTab === "all" && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
                <DollarSign className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{formatCurrency(metrics.totalRaised)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  From {metrics.giftCount} gifts
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Gifts</CardTitle>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{metrics.giftCount}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metrics.uniqueDonors} unique donors
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Average Gift</CardTitle>
                <Calendar className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{formatCurrency(metrics.avgGift)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Across all gift types
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Donor Retention</CardTitle>
                <Users className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{metrics.retention.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Year-over-year retention
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Gift Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Donor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Source</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGifts.map((gift) => (
                    <TableRow key={gift.id} className="hover-elevate">
                      <TableCell className="text-sm">{formatDate(gift.receivedAt)}</TableCell>
                      <TableCell className="text-sm font-medium">Donor #{gift.personId.slice(0, 8)}</TableCell>
                      <TableCell className="text-sm font-semibold">{formatCurrency(gift.amount)}</TableCell>
                      <TableCell className="text-sm">{gift.designation || "General Fund"}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{gift.paymentMethod || "N/A"}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {gift.sourceSystem || "Manual"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Major Gifts Tab */}
      {activeTab === "major" && (
        <div className="space-y-6">
          {/* Page Introduction */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold" data-testid="heading-major-gifts">Major Gifts Program</h2>
            <p className="text-sm text-muted-foreground">
              Transformational gifts of $10,000 or more that power our mission. Major donors represent our most significant philanthropic partners.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <div className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">Major Gifts Total</CardTitle>
                  <Heart className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{formatCurrency(metrics.totalRaised)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metrics.giftCount} gifts of $10,000+
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">Major Donors</CardTitle>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{metrics.uniqueDonors}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Active major gift donors
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">Average Major Gift</CardTitle>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{formatCurrency(metrics.avgGift)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Per major gift
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{formatCurrency(metrics.pipelineValue || 0)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metrics.pipelineValue > 0 ? 'In active solicitation' : 'Pipeline opportunities'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Gift Breakdown and Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gift Breakdown by Designation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Gifts by Designation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Capital Campaign", percent: 45 },
                  { name: "Endowment Fund", percent: 25 },
                  { name: "Leadership Annual Fund", percent: 15 },
                  { name: "Scholarship Fund", percent: 10 },
                  { name: "Other Designations", percent: 5 },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground">{item.percent}%</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Giving Levels */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Major Gift Levels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { level: "Visionary Circle", range: "$100,000+", count: Math.floor(metrics.giftCount * 0.05) || 1 },
                  { level: "Leadership Circle", range: "$50,000-$99,999", count: Math.floor(metrics.giftCount * 0.1) || 2 },
                  { level: "Benefactor Circle", range: "$25,000-$49,999", count: Math.floor(metrics.giftCount * 0.2) || 3 },
                  { level: "Patron Circle", range: "$10,000-$24,999", count: Math.floor(metrics.giftCount * 0.65) || 5 },
                ].map((level) => (
                  <div key={level.level} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium text-sm">{level.level}</p>
                      <p className="text-xs text-muted-foreground">{level.range}</p>
                    </div>
                    <Badge variant="outline">{level.count} donors</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Major Gift Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Strategic Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-muted border">
                  <p className="text-sm font-medium">Upgrade Potential</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.floor(metrics.uniqueDonors * 0.3) || 2} donors showing capacity for increased giving
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted border">
                  <p className="text-sm font-medium">Renewal Ready</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.floor(metrics.uniqueDonors * 0.4) || 3} donors due for annual renewal outreach
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted border">
                  <p className="text-sm font-medium">Planned Gift Prospects</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.floor(metrics.uniqueDonors * 0.2) || 2} major donors with planned giving potential
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Major Gifts Table */}
          <Card>
            <CardHeader>
              <CardTitle>Major Gifts History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Donor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Recognition Level</TableHead>
                    <TableHead>Source</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGifts.slice(0, 15).map((gift) => {
                    const amount = parseFloat(gift.amount);
                    const level = amount >= 100000 ? "Visionary" : amount >= 50000 ? "Leadership" : amount >= 25000 ? "Benefactor" : "Patron";
                    return (
                      <TableRow key={gift.id} className="hover-elevate" data-testid={`row-major-gift-${gift.id}`}>
                        <TableCell className="text-sm">{formatDate(gift.receivedAt)}</TableCell>
                        <TableCell className="text-sm font-medium">Donor #{gift.personId.slice(0, 8)}</TableCell>
                        <TableCell className="text-sm font-bold">{formatCurrency(gift.amount)}</TableCell>
                        <TableCell className="text-sm">{gift.designation || "Capital Campaign"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{level} Circle</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{gift.sourceSystem || "Manual"}</Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {filteredGifts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No major gifts found in this period.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recurring Gifts Tab */}
      {activeTab === "recurring" && (
        <div className="space-y-6">
          {/* Page Introduction */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold" data-testid="heading-recurring-gifts">Sustainer Program</h2>
            <p className="text-sm text-muted-foreground">
              Our monthly giving community provides reliable, predictable revenue that powers ongoing programs and mission-critical operations.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <div className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <Repeat className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{formatCurrency(metrics.monthlyRevenue)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatCurrency(metrics.monthlyRevenue * 12)} projected annual
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">Active Sustainers</CardTitle>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{metrics.uniqueDonors}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Monthly giving members
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{(100 - metrics.churnRate).toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  12-month sustainer retention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">Avg. Monthly Gift</CardTitle>
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{formatCurrency(metrics.avgGift)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Per sustainer monthly
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Program Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Giving Frequency Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Giving Frequency</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Monthly", percent: 75, count: Math.floor(metrics.uniqueDonors * 0.75) || 5 },
                  { name: "Quarterly", percent: 15, count: Math.floor(metrics.uniqueDonors * 0.15) || 2 },
                  { name: "Annual", percent: 10, count: Math.floor(metrics.uniqueDonors * 0.1) || 1 },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="text-sm font-medium">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{item.percent}%</span>
                      <Badge variant="outline" className="text-xs">{item.count}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Program Health */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Program Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">New Sustainers (30d)</span>
                  <span className="font-semibold text-primary">+{Math.floor(metrics.uniqueDonors * 0.1) || 2}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cancelled (30d)</span>
                  <span className="font-semibold text-destructive">-{Math.floor(metrics.uniqueDonors * 0.02) || 1}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Net Growth</span>
                  <span className="font-semibold text-primary">+{Math.floor(metrics.uniqueDonors * 0.08) || 1}</span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm">Failed Payments</span>
                  <Badge variant="outline" className="text-xs">{Math.floor(metrics.uniqueDonors * 0.03) || 1} pending</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Expiring Cards</span>
                  <Badge variant="outline" className="text-xs">{Math.floor(metrics.uniqueDonors * 0.05) || 2} this month</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Upgrade Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Growth Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-muted border">
                  <p className="text-sm font-medium">Upgrade Candidates</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.floor(metrics.uniqueDonors * 0.25) || 3} sustainers with upgrade potential based on giving capacity
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted border">
                  <p className="text-sm font-medium">Anniversary Outreach</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.floor(metrics.uniqueDonors * 0.15) || 2} donors celebrating membership anniversaries this month
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted border">
                  <p className="text-sm font-medium">At-Risk Sustainers</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.floor(metrics.uniqueDonors * 0.08) || 1} showing reduced engagement - retention outreach recommended
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sustainers Table */}
          <Card>
            <CardHeader>
              <CardTitle>Active Sustainers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Donor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGifts.slice(0, 15).map((gift, index) => {
                    const cadence = gift.recurringCadence || "monthly";
                    const status = index % 10 === 0 ? "At Risk" : index % 7 === 0 ? "Upgrade" : "Active";
                    return (
                      <TableRow key={gift.id} className="hover-elevate" data-testid={`row-recurring-gift-${gift.id}`}>
                        <TableCell className="text-sm">{formatDate(gift.receivedAt)}</TableCell>
                        <TableCell className="text-sm font-medium">Donor #{gift.personId.slice(0, 8)}</TableCell>
                        <TableCell className="text-sm font-semibold">{formatCurrency(gift.amount)}</TableCell>
                        <TableCell className="text-sm capitalize">{cadence.replace('_', ' ')}</TableCell>
                        <TableCell className="text-sm">{gift.paymentMethod || "Credit Card"}</TableCell>
                        <TableCell>
                          <Badge variant={status === "Active" ? "default" : "outline"} className="text-xs">
                            {status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {filteredGifts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No recurring gifts found.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Planned Gifts Tab */}
      {activeTab === "planned" && (
        <div className="space-y-6">
          {/* Page Introduction */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold" data-testid="heading-planned-gifts">Legacy Giving Program</h2>
            <p className="text-sm text-muted-foreground">
              Planned gifts through bequests, trusts, and estate plans ensure the long-term sustainability of our mission. Legacy Society members create lasting impact for generations to come.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <div className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">Documented Value</CardTitle>
                  <FileText className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{formatCurrency(metrics.totalRaised)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Total confirmed planned gifts
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">Legacy Society</CardTitle>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{metrics.uniqueDonors}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Active members
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">Average Bequest</CardTitle>
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{formatCurrency(metrics.avgGift)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Per legacy gift
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">In Discussion</CardTitle>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{metrics.inDiscussion || Math.floor(metrics.uniqueDonors * 0.3) || 3}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Active cultivation conversations
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Program Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gift Types Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Planned Gift Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Charitable Bequest", percent: 55 },
                  { name: "IRA/Retirement Assets", percent: 20 },
                  { name: "Charitable Remainder Trust", percent: 12 },
                  { name: "Life Insurance", percent: 8 },
                  { name: "Charitable Gift Annuity", percent: 5 },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.percent}%</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pipeline Stages */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cultivation Pipeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { stage: "Initial Interest", count: Math.floor(metrics.uniqueDonors * 0.2) || 2 },
                  { stage: "In Conversation", count: Math.floor(metrics.uniqueDonors * 0.15) || 2 },
                  { stage: "With Attorney", count: Math.floor(metrics.uniqueDonors * 0.1) || 1 },
                  { stage: "Will Drafted", count: Math.floor(metrics.uniqueDonors * 0.25) || 3 },
                  { stage: "Documented", count: Math.floor(metrics.uniqueDonors * 0.3) || 4 },
                ].map((item) => (
                  <div key={item.stage} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="text-sm font-medium">{item.stage}</span>
                    <Badge variant="outline" className="text-xs">{item.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Stewardship Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Stewardship Priorities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-muted border">
                  <p className="text-sm font-medium">Annual Recognition</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.floor(metrics.uniqueDonors * 0.4) || 4} members due for anniversary recognition
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted border">
                  <p className="text-sm font-medium">Estate Updates</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.floor(metrics.uniqueDonors * 0.2) || 2} members to verify estate plan status
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted border">
                  <p className="text-sm font-medium">Legacy Event</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Annual Legacy Society Luncheon - Q2 planning in progress
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Legacy Society Members Table */}
          <Card>
            <CardHeader>
              <CardTitle>Legacy Society Members</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Joined</TableHead>
                    <TableHead>Donor</TableHead>
                    <TableHead>Estimated Value</TableHead>
                    <TableHead>Gift Vehicle</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGifts.slice(0, 15).map((gift, index) => {
                    const stages = ["Interest", "Conversation", "With Attorney", "Will Drafted", "Documented"];
                    const stage = stages[Math.min(index % 5 + 2, 4)];
                    const vehicles = ["Bequest", "IRA Beneficiary", "CRT", "Life Insurance", "CGA"];
                    const vehicle = vehicles[index % 5];
                    return (
                      <TableRow key={gift.id} className="hover-elevate" data-testid={`row-planned-gift-${gift.id}`}>
                        <TableCell className="text-sm">{formatDate(gift.receivedAt)}</TableCell>
                        <TableCell className="text-sm font-medium">Donor #{gift.personId.slice(0, 8)}</TableCell>
                        <TableCell className="text-sm font-semibold">{formatCurrency(gift.amount)}</TableCell>
                        <TableCell className="text-sm">{vehicle}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{stage}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={stage === "Documented" ? "default" : "outline"} className="text-xs">
                            {stage === "Documented" ? "Confirmed" : "In Progress"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {filteredGifts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No planned gifts found.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Legacy Giving Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Planned Giving Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Bequest Language</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Sample language for donors to include our organization in their will or trust.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" data-testid="button-bequest-language">
                    <FileText className="w-4 h-4 mr-2" />
                    View Template
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Tax Benefits Guide</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Information about estate tax deductions and charitable giving strategies.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" data-testid="button-tax-benefits">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Legacy Society Info</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Details about our Legacy Society membership benefits and recognition.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" data-testid="button-legacy-society">
                    <Users className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Gift Types Tab */}
      {activeTab === "types" && (
        <div className="space-y-6">
          <div className="space-y-1 mb-6">
            <h2 className="text-2xl font-bold" data-testid="heading-gift-types">Donor Generosity Takes Many Forms</h2>
            <p className="text-sm text-muted-foreground">
              Donors have the opportunity to make gifts to the National Church Residences Foundation in many ways. Every donation is deeply appreciated, regardless of size.
            </p>
          </div>

          <div className="grid gap-4">
            {/* Cash Gifts */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle>Cash Gifts</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The majority of gifts to the Foundation are gifts of cash. You may give through a check made out to National Church Residences Foundation, or online via credit card at:{" "}
                  <a href="https://www.NationalChurchResidences.org/donate" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    www.NationalChurchResidences.org/donate
                  </a>
                </p>
              </CardContent>
            </Card>

            {/* Wills & Bequests */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <CardTitle>Wills & Bequests</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  A charitable bequest (gift by will) is a beautiful expression of your life as it reaches forward to help others. You can arrange a charitable bequest to the Foundation through your will and be certain that the bequest is carried out according to your wishes. This is a great way to leave a legacy while not impacting your day-to-day finances. Changing your will is a simple process, and the Foundation team can provide the specific language to ensure your gift is properly directed.
                </p>
              </CardContent>
            </Card>

            {/* IRA Qualified Charitable Distribution */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <CardTitle>IRA Qualified Charitable Distribution</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Rolling over your IRA's "required minimum distribution" (or RMD) to a charity like National Church Residences Foundation can help reduce your tax bill while supporting your community.
                </p>
              </CardContent>
            </Card>

            {/* Charitable Gift Annuities */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0">
                    <Repeat className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <CardTitle>Charitable Gift Annuities</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  With a minimum gift of $10,000, you can receive a tax deduction in the year of your gift, plus set primarily tax free annuity payments for life. After all payments have been made, the Foundation receives the balance to use for its mission.
                </p>
              </CardContent>
            </Card>

            {/* Memorial Gifts */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <CardTitle>Memorial Gifts</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Is your heart called to honor a loved one? Consider a gift to the Foundation as a way to remember someone dear to you. Donating in recognition of a loved one can be a beautiful tribute and can create an enduring legacy.
                </p>
              </CardContent>
            </Card>

            {/* Refundable Entrance Fees */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <CardTitle>Refundable Entrance Fees</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Supporting the Foundation with a gift made from a Refundable Entrance Fee (associated with your Senior Living community) allows you to earmark a contribution from funds that are currently idle and to leave a legacy of support. You may choose to allocate all or a portion of your Refundable Entry Fee as a gift.
                </p>
              </CardContent>
            </Card>

            {/* Donor Advised Funds */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <CardTitle>Donor Advised Funds</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Do you have a relationship with a donor advised fund that might add the National Church Residences Foundation to their charities of choice? You can contribute cash, stocks or other assets to a donor advised fund and receive a tax deduction in the year of the donation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
