import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  Heart,
  Repeat,
  FileText,
  Filter,
  Download
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
import { useLocation } from "wouter";
import { useMemo, useState, useEffect } from "react";

type GiftType = "all" | "major" | "recurring" | "planned";

export default function Gifts() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const typeParam = searchParams.get('type') as GiftType | null;
  const [activeTab, setActiveTab] = useState<GiftType>(typeParam || "all");
  const [showDateFilter, setShowDateFilter] = useState(false);
  
  const { data: gifts, isLoading } = useQuery<Gift[]>({
    queryKey: ["/api/gifts"],
  });

  // Sync URL with active tab
  useEffect(() => {
    if (activeTab === "all") {
      setLocation("/gifts");
    } else {
      setLocation(`/gifts?type=${activeTab}`);
    }
  }, [activeTab, setLocation]);

  // Update tab when URL changes
  useEffect(() => {
    const newType = new URLSearchParams(location.split('?')[1]).get('type') as GiftType | null;
    if (newType && newType !== activeTab) {
      setActiveTab(newType);
    }
  }, [location]);

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
    const retainedDonors = [...thisYearDonors].filter(id => lastYearDonors.has(id)).length;
    const retention = lastYearDonors.size > 0 ? (retainedDonors / lastYearDonors.size) * 100 : 0;
    
    // Churn rate - MUST use ALL gifts
    const churnedDonors = [...lastYearDonors].filter(id => !thisYearDonors.has(id)).length;
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Gift Tracking</h1>
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

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as GiftType)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" data-testid="tab-all-gifts">
            <DollarSign className="w-4 h-4 mr-2" />
            All Gifts
          </TabsTrigger>
          <TabsTrigger value="major" data-testid="tab-major-gifts">
            <Heart className="w-4 h-4 mr-2" />
            Major Gifts
          </TabsTrigger>
          <TabsTrigger value="recurring" data-testid="tab-recurring-gifts">
            <Repeat className="w-4 h-4 mr-2" />
            Recurring
          </TabsTrigger>
          <TabsTrigger value="planned" data-testid="tab-planned-gifts">
            <FileText className="w-4 h-4 mr-2" />
            Planned
          </TabsTrigger>
        </TabsList>

        {/* All Gifts Tab */}
        <TabsContent value="all" className="space-y-6">
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
        </TabsContent>

        {/* Major Gifts Tab */}
        <TabsContent value="major" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Major Gifts Total</CardTitle>
                <Heart className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{formatCurrency(metrics.totalRaised)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  ${formatCurrency(10000)}+ gifts
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Major Donors</CardTitle>
                <Users className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{metrics.uniqueDonors}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Active major donors
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Average Major Gift</CardTitle>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{formatCurrency(metrics.avgGift)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Per major gift
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
                <DollarSign className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{formatCurrency(metrics.pipelineValue || 0)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metrics.pipelineValue > 0 ? 'In active solicitation' : 'No pending major gifts'}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Major Gifts ($10,000+)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Donor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Wealth Band</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGifts.map((gift) => (
                    <TableRow key={gift.id} className="hover-elevate">
                      <TableCell className="text-sm">{formatDate(gift.receivedAt)}</TableCell>
                      <TableCell className="text-sm font-medium">Donor #{gift.personId.slice(0, 8)}</TableCell>
                      <TableCell className="text-sm font-bold">{formatCurrency(gift.amount)}</TableCell>
                      <TableCell className="text-sm">{gift.designation || "Capital Campaign"}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">P2-P5</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="text-xs bg-green-500">Pledged</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recurring Gifts Tab */}
        <TabsContent value="recurring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <Repeat className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{formatCurrency(metrics.monthlyRevenue)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Total recurring revenue
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Sustainers</CardTitle>
                <Users className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{metrics.uniqueDonors}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Active monthly donors
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{(100 - metrics.churnRate).toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Active retention rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
                <Calendar className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{metrics.churnRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Annual churn rate
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recurring Donors</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Donor</TableHead>
                    <TableHead>Monthly Amount</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGifts.map((gift) => (
                    <TableRow key={gift.id} className="hover-elevate">
                      <TableCell className="text-sm">{formatDate(gift.receivedAt)}</TableCell>
                      <TableCell className="text-sm font-medium">Donor #{gift.personId.slice(0, 8)}</TableCell>
                      <TableCell className="text-sm font-semibold">{formatCurrency(gift.amount)}</TableCell>
                      <TableCell className="text-sm">{gift.designation || "Monthly Sustainer"}</TableCell>
                      <TableCell className="text-sm">{gift.paymentMethod || "Credit Card"}</TableCell>
                      <TableCell>
                        <Badge className="text-xs bg-blue-500">Active</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Planned Gifts Tab */}
        <TabsContent value="planned" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Planned Gifts</CardTitle>
                <FileText className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{formatCurrency(metrics.totalRaised)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Documented value
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Legacy Society</CardTitle>
                <Users className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{metrics.uniqueDonors}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Members
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Average Bequest</CardTitle>
                <DollarSign className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{formatCurrency(metrics.avgGift)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Per planned gift
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">In Discussion</CardTitle>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">{metrics.inDiscussion}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metrics.inDiscussion > 0 ? 'Active conversations' : 'No active discussions'}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Planned Giving Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Donor</TableHead>
                    <TableHead>Estimated Value</TableHead>
                    <TableHead>Gift Type</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGifts.map((gift) => (
                    <TableRow key={gift.id} className="hover-elevate">
                      <TableCell className="text-sm">{formatDate(gift.receivedAt)}</TableCell>
                      <TableCell className="text-sm font-medium">Donor #{gift.personId.slice(0, 8)}</TableCell>
                      <TableCell className="text-sm font-semibold">{formatCurrency(gift.amount)}</TableCell>
                      <TableCell className="text-sm">{gift.designation || "Charitable Bequest"}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">Will Drafted</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="text-xs bg-purple-500">Documented</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
