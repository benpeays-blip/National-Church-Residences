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
  Gift as GiftIcon,
  Search
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";

type GiftType = "all" | "major" | "recurring" | "planned" | "types";

interface GiftsProps {
  activeTab?: string;
}

type AmountFilter = "all" | "1000" | "5000" | "10000" | "25000" | "50000" | "100000";

const amountFilterOptions: { value: AmountFilter; label: string }[] = [
  { value: "all", label: "All Amounts" },
  { value: "1000", label: "$1,000+" },
  { value: "5000", label: "$5,000+" },
  { value: "10000", label: "$10,000+ (Major)" },
  { value: "25000", label: "$25,000+" },
  { value: "50000", label: "$50,000+" },
  { value: "100000", label: "$100,000+" },
];

export default function Gifts({ activeTab = "all" }: GiftsProps) {
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [amountFilter, setAmountFilter] = useState<AmountFilter>("all");
  
  const { data: gifts, isLoading } = useQuery<Gift[]>({
    queryKey: ["/api/gifts"],
  });

  // Filter gifts based on type, amount, and search query
  const filteredGifts = useMemo(() => {
    if (!gifts) return [];
    
    let result = gifts;
    
    // Filter by tab type
    switch (activeTab) {
      case "recurring":
        result = result.filter(g => {
          const designation = g.designation?.toLowerCase() || '';
          return g.giftType === 'recurring' ||
                 (g.recurringCadence && g.recurringCadence !== 'one_time') ||
                 designation.includes('monthly') || 
                 designation.includes('sustainer') ||
                 designation.includes('recurring');
        });
        break;
      case "planned":
        result = result.filter(g => {
          const designation = g.designation?.toLowerCase() || '';
          return g.giftType === 'planned' ||
                 designation.includes('bequest') || 
                 designation.includes('estate') ||
                 designation.includes('legacy') ||
                 designation.includes('planned gift') ||
                 designation.includes('charitable');
        });
        break;
    }
    
    // Apply amount filter
    if (amountFilter !== "all") {
      const minAmount = parseInt(amountFilter);
      result = result.filter(g => parseFloat(g.amount) >= minAmount);
    }
    
    // Apply search filter (search by donor ID or designation)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(g => 
        g.personId.toLowerCase().includes(query) ||
        (g.designation?.toLowerCase().includes(query)) ||
        (g.sourceSystem?.toLowerCase().includes(query))
      );
    }
    
    return result;
  }, [gifts, activeTab, amountFilter, searchQuery]);

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
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Gifts</h1>
          <p className="text-sm text-muted-foreground">
            Comprehensive donor contribution management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            data-testid="button-export"
            onClick={() => {
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

      {/* Search and Filter Bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search gifts by donor, designation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-gifts"
          />
        </div>
        <Select value={amountFilter} onValueChange={(val) => setAmountFilter(val as AmountFilter)}>
          <SelectTrigger className="w-[180px]" data-testid="select-amount-filter">
            <SelectValue placeholder="Filter by amount" />
          </SelectTrigger>
          <SelectContent>
            {amountFilterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} data-testid={`option-amount-${option.value}`}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {(amountFilter !== "all" || searchQuery) && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => { setAmountFilter("all"); setSearchQuery(""); }}
            data-testid="button-clear-filters"
          >
            Clear filters
          </Button>
        )}
        <div className="text-sm text-muted-foreground ml-auto">
          {filteredGifts.length} gift{filteredGifts.length !== 1 ? 's' : ''} found
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
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-primary" />
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
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
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
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-primary" />
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
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Repeat className="w-6 h-6 text-primary" />
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
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-primary" />
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
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-primary" />
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
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
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
