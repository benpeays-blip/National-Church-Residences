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
import { useLocation } from "wouter";
import { useMemo, useState, useEffect, useRef } from "react";

type GiftType = "all" | "major" | "recurring" | "planned" | "types";

export default function Gifts() {
  const [location, setLocation] = useLocation();
  const [showDateFilter, setShowDateFilter] = useState(false);
  
  // Derive active tab from URL (source of truth)
  // Note: wouter's location is pathname only, query params are in window.location.search
  const activeTab = useMemo<GiftType>(() => {
    const params = new URLSearchParams(window.location.search);
    return (params.get('tab') as GiftType) || "all";
  }, [location]); // location change triggers recomputation even though we read from window.location
  
  const { data: gifts, isLoading } = useQuery<Gift[]>({
    queryKey: ["/api/gifts"],
  });

  // Handle tab changes by updating URL only
  const handleTabChange = (newTab: GiftType) => {
    // Always use explicit tab parameter for consistency
    setLocation(`/gifts?tab=${newTab}`);
  };

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

      <Tabs value={activeTab} onValueChange={(v) => handleTabChange(v as GiftType)}>
        <TabsList className="grid w-full grid-cols-5">
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
          <TabsTrigger value="types" data-testid="tab-gift-types">
            <GiftIcon className="w-4 h-4 mr-2" />
            Gift Types
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

        {/* Gift Types Tab */}
        <TabsContent value="types" className="space-y-6">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
