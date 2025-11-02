import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Home,
  DollarSign,
  TrendingUp,
  Calendar,
  Target,
  CheckCircle,
  Award,
  AlertCircle,
  Clock,
  User,
  Search,
  Database,
  Brain,
  FileText,
  Users,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { DataProvenanceBadge } from "@/components/data-provenance-badge";

type DonorDetail = {
  person: {
    id: string;
    firstName: string;
    lastName: string;
    preferredName: string | null;
    primaryEmail: string | null;
    primaryPhone: string | null;
    organizationName: string | null;
    wealthBand: string | null;
    capacityScore: number | null;
    engagementScore: number | null;
    affinityScore: number | null;
    lastGiftDate: Date | null;
    lastGiftAmount: string | null;
    totalLifetimeGiving: string | null;
    sourceSystem: string | null;
    syncedAt: Date | null;
    dataQualityScore: number | null;
  };
  household: {
    id: string;
    name: string;
    totalMembers: number;
  } | null;
  gifts: {
    id: string;
    amount: string;
    receivedAt: string;
    campaignId: string | null;
    sourceSystem: string | null;
    campaign: {
      name: string;
    } | null;
  }[];
  opportunities: {
    id: string;
    stage: string;
    askAmount: string | null;
    probability: number | null;
    closeDate: string | null;
    ownerId: string | null;
    notes: string | null;
    owner: {
      firstName: string;
      lastName: string;
    } | null;
  }[];
  interactions: {
    id: string;
    type: string;
    notes: string | null;
    occurredAt: string;
    userId: string | null;
    user: {
      firstName: string;
      lastName: string;
    } | null;
  }[];
  nextBestActions: {
    id: string;
    priority: string;
    reason: string;
    suggestedAction: string;
    createdAt: string;
  }[];
  stats: {
    totalGifts: number;
    avgGiftSize: number;
    firstGiftDate: Date | null;
    daysSinceLastGift: number | null;
    giftFrequency: string;
  };
};

export default function DonorDetail() {
  const [, params] = useRoute("/donors/:id");
  const donorId = params?.id;

  const { data: donor, isLoading } = useQuery<DonorDetail>({
    queryKey: ["/api/donors", donorId],
    enabled: !!donorId,
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

  if (!donor) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Donor Not Found</h1>
          <p className="text-sm text-muted-foreground">
            The requested donor could not be found
          </p>
        </div>
      </div>
    );
  }

  const displayName = donor.person.preferredName || donor.person.firstName;
  const fullName = `${donor.person.firstName} ${donor.person.lastName}`;

  const getScoreColor = (score: number | null) => {
    if (!score) return "text-muted-foreground";
    if (score >= 75) return "text-green-600 dark:text-green-400";
    if (score >= 50) return "text-yellow-600 dark:text-yellow-400";
    return "text-orange-600 dark:text-orange-400";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/donors">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
              Back to Donors
            </Button>
          </Link>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
              {donor.person.firstName[0]}{donor.person.lastName[0]}
            </div>
            <div>
              <h1 className="text-3xl font-bold" data-testid="text-donor-name">
                {fullName}
              </h1>
              {donor.person.preferredName && (
                <p className="text-sm text-muted-foreground">
                  Prefers "{donor.person.preferredName}"
                </p>
              )}
              {donor.person.organizationName && (
                <div className="flex items-center gap-2 mt-1">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {donor.person.organizationName}
                  </span>
                </div>
              )}
              {donor.person.sourceSystem && (
                <div className="mt-2">
                  <DataProvenanceBadge
                    sourceSystem={donor.person.sourceSystem}
                    syncedAt={donor.person.syncedAt}
                    variant="inline"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button data-testid="button-email-donor">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
            <Button variant="outline" data-testid="button-create-task">
              <Target className="w-4 h-4 mr-2" />
              Create Task
            </Button>
            <Button variant="outline" data-testid="button-log-interaction">
              <Calendar className="w-4 h-4 mr-2" />
              Log Interaction
            </Button>
          </div>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Score</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-5xl font-bold ${getScoreColor(donor.person.engagementScore)}`} data-testid="metric-engagement-score">
              {donor.person.engagementScore || 0}
            </div>
            <Progress value={donor.person.engagementScore || 0} className="mt-4" />
            <p className="text-xs text-muted-foreground mt-2">
              Recent interactions & responsiveness
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacity Score</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-5xl font-bold ${getScoreColor(donor.person.capacityScore)}`} data-testid="metric-capacity-score">
              {donor.person.capacityScore || 0}
            </div>
            <Progress value={donor.person.capacityScore || 0} className="mt-4" />
            <p className="text-xs text-muted-foreground mt-2">
              {donor.person.wealthBand || "No wealth band"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Affinity Score</CardTitle>
            <Award className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-5xl font-bold ${getScoreColor(donor.person.affinityScore)}`} data-testid="metric-affinity-score">
              {donor.person.affinityScore || 0}
            </div>
            <Progress value={donor.person.affinityScore || 0} className="mt-4" />
            <p className="text-xs text-muted-foreground mt-2">
              Mission alignment & loyalty
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Quality</CardTitle>
            <CheckCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-5xl font-bold ${getScoreColor(donor.person.dataQualityScore)}`} data-testid="metric-data-quality">
              {donor.person.dataQualityScore || 0}%
            </div>
            <Progress value={donor.person.dataQualityScore || 0} className="mt-4" />
            <p className="text-xs text-muted-foreground mt-2">
              Profile completeness
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Contact & Giving Summary */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card className="p-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="space-y-4">
                {donor.person.primaryEmail ? (
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <a
                        href={`mailto:${donor.person.primaryEmail}`}
                        className="text-sm text-primary hover:underline"
                        data-testid="link-email"
                      >
                        {donor.person.primaryEmail}
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">Not available</p>
                    </div>
                  </div>
                )}

                {donor.person.primaryPhone ? (
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <a
                        href={`tel:${donor.person.primaryPhone}`}
                        className="text-sm text-primary hover:underline"
                        data-testid="link-phone"
                      >
                        {donor.person.primaryPhone}
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">Not available</p>
                    </div>
                  </div>
                )}

                {donor.household && (
                  <div className="flex items-start gap-3">
                    <Home className="w-4 h-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Household</p>
                      <p className="text-sm text-primary hover:underline cursor-pointer">
                        {donor.household.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {donor.household.totalMembers} member(s)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Giving Summary */}
          <Card className="p-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Giving Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Lifetime Giving</p>
                  <p className="text-2xl font-bold" data-testid="text-lifetime-giving">
                    {formatCurrency(parseFloat(donor.person.totalLifetimeGiving || "0"))}
                  </p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Gifts</p>
                    <p className="text-lg font-semibold" data-testid="text-total-gifts">
                      {donor.stats.totalGifts}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Gift</p>
                    <p className="text-lg font-semibold" data-testid="text-avg-gift">
                      {formatCurrency(donor.stats.avgGiftSize)}
                    </p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Last Gift</p>
                  <p className="text-lg font-semibold" data-testid="text-last-gift-amount">
                    {formatCurrency(parseFloat(donor.person.lastGiftAmount || "0"))}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {donor.person.lastGiftDate
                      ? format(new Date(donor.person.lastGiftDate), "MMM d, yyyy")
                      : "Never"}
                    {donor.stats.daysSinceLastGift && (
                      <span> ({donor.stats.daysSinceLastGift} days ago)</span>
                    )}
                  </p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">First Gift</p>
                  <p className="text-sm">
                    {donor.stats.firstGiftDate
                      ? format(new Date(donor.stats.firstGiftDate), "MMM d, yyyy")
                      : "No gifts recorded"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Giving Pattern</p>
                  <p className="text-sm font-medium">{donor.stats.giftFrequency}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="gifts">Gifts</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Next Best Actions */}
              {donor.nextBestActions.length > 0 && (
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-chart-1" />
                      Next Best Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <div className="space-y-3">
                      {donor.nextBestActions.slice(0, 3).map((action) => (
                        <div key={action.id} className="p-4 border rounded-lg space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <Badge
                              variant={
                                action.priority === "High"
                                  ? "default"
                                  : action.priority === "Medium"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {action.priority} Priority
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(action.createdAt), "MMM d")}
                            </span>
                          </div>
                          <p className="font-medium text-sm">{action.suggestedAction}</p>
                          <p className="text-sm text-muted-foreground">{action.reason}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Active Opportunities */}
              {donor.opportunities.length > 0 && (
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Active Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <div className="space-y-3">
                      {donor.opportunities.map((opp) => (
                        <div key={opp.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <Badge variant="secondary">{opp.stage}</Badge>
                            <span className="text-sm font-semibold">
                              {formatCurrency(parseFloat(opp.askAmount || "0"))}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Probability: {opp.probability}%</span>
                            {opp.closeDate && (
                              <span>Close: {format(new Date(opp.closeDate), "MMM d, yyyy")}</span>
                            )}
                            {opp.owner && (
                              <span>
                                MGO: {opp.owner.firstName} {opp.owner.lastName}
                              </span>
                            )}
                          </div>
                          {opp.notes && (
                            <p className="text-sm text-muted-foreground mt-2">{opp.notes}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Gifts Tab */}
            <TabsContent value="gifts">
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>Gift History</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <Table data-testid="table-gifts">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Campaign</TableHead>
                        <TableHead>Source</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {donor.gifts
                        .sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime())
                        .map((gift) => (
                          <TableRow key={gift.id}>
                            <TableCell>{format(new Date(gift.receivedAt), "MMM d, yyyy")}</TableCell>
                            <TableCell className="font-semibold">
                              {formatCurrency(parseFloat(gift.amount))}
                            </TableCell>
                            <TableCell>
                              {gift.campaign ? (
                                <Link href={`/campaigns/${gift.campaignId}`} className="hover:underline">
                                  {gift.campaign.name}
                                </Link>
                              ) : (
                                <span className="text-muted-foreground">No campaign</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {gift.sourceSystem ? (
                                <DataProvenanceBadge
                                  sourceSystem={gift.sourceSystem}
                                  variant="compact"
                                />
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Opportunities Tab */}
            <TabsContent value="opportunities">
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>All Opportunities</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  {donor.opportunities.length > 0 ? (
                    <Table data-testid="table-opportunities">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Stage</TableHead>
                          <TableHead>Ask Amount</TableHead>
                          <TableHead>Probability</TableHead>
                          <TableHead>Close Date</TableHead>
                          <TableHead>Owner</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {donor.opportunities.map((opp) => (
                          <TableRow key={opp.id}>
                            <TableCell>
                              <Badge variant="secondary">{opp.stage}</Badge>
                            </TableCell>
                            <TableCell className="font-semibold">
                              {formatCurrency(parseFloat(opp.askAmount || "0"))}
                            </TableCell>
                            <TableCell>{opp.probability}%</TableCell>
                            <TableCell>
                              {opp.closeDate
                                ? format(new Date(opp.closeDate), "MMM d, yyyy")
                                : "Not set"}
                            </TableCell>
                            <TableCell>
                              {opp.owner
                                ? `${opp.owner.firstName} ${opp.owner.lastName}`
                                : "Unassigned"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-12">
                      <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No active opportunities</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activities Tab */}
            <TabsContent value="activities">
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  {donor.interactions.length > 0 ? (
                    <div className="space-y-4">
                      {donor.interactions
                        .sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime())
                        .map((interaction) => (
                          <div key={interaction.id} className="flex gap-4 pb-4 border-b last:border-0">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                              <Clock className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <p className="font-medium text-sm">{interaction.type}</p>
                                <span className="text-xs text-muted-foreground">
                                  {format(new Date(interaction.occurredAt), "MMM d, yyyy")}
                                </span>
                              </div>
                              {interaction.notes && (
                                <p className="text-sm text-muted-foreground">{interaction.notes}</p>
                              )}
                              {interaction.user && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  by {interaction.user.firstName} {interaction.user.lastName}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No recent activities</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Proposal Section */}
          <Card>
            <CardHeader>
              <div className="space-y-1">
                <CardTitle>Engagement Timeline Proposal</CardTitle>
                <p className="text-sm text-muted-foreground">
                  AI Integration & Fundraising Intelligence Roadmap
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                {/* Phase 1 */}
                <AccordionItem value="phase-1" className="border rounded-lg px-6 py-2" data-testid="accordion-phase-1">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center shrink-0">
                        <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-base" data-testid="text-phase-1-title">Phase 1 – Discovery & Data Foundation</h3>
                          <Badge variant="outline" className="text-xs">Months 1-2</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Establish clear understanding of current systems and workflows
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2">
                    <div className="space-y-4 ml-16">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Key Activities</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Conduct interviews with Development, Grants, Accounting, and Events teams</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Audit donor data sources (CRM, Excel, wealth-screening tools, event systems, accounting)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Map current processes and identify integration gaps</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Assess data quality, duplication, and governance policies</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Benchmark current fundraising KPIs</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Deliverables</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Data Integration Assessment Report</Badge>
                          <Badge variant="secondary">"As-Is" Process Maps</Badge>
                          <Badge variant="secondary">Unified Data Architecture</Badge>
                          <Badge variant="secondary">Quick Wins Dashboard</Badge>
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Short-Term Wins
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Clarity on data silos and inefficiencies</li>
                          <li>• Leadership visibility into current donor landscape</li>
                          <li>• Early momentum with actionable data roadmap</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Phase 2 */}
                <AccordionItem value="phase-2" className="border rounded-lg px-6 py-2" data-testid="accordion-phase-2">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center shrink-0">
                        <Database className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-base" data-testid="text-phase-2-title">Phase 2 – System Integration & Data Unification</h3>
                          <Badge variant="outline" className="text-xs">Months 3-4</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Connect existing systems and create a single source of truth
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2">
                    <div className="space-y-4 ml-16">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Key Activities</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Integrate CRM, wealth-screening, and event systems into a unified warehouse</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Clean, deduplicate, and enrich donor records</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Implement standardized donor IDs across systems</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Establish automated data-refresh cycles</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Deliverables</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Unified Data Layer</Badge>
                          <Badge variant="secondary">Donor Intelligence Dashboard v1</Badge>
                          <Badge variant="secondary">Data Governance Plan</Badge>
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Short-Term Wins
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Real-time access to clean donor data</li>
                          <li>• Elimination of static Excel lists</li>
                          <li>• Leadership gains holistic view of donors and giving</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Phase 3 */}
                <AccordionItem value="phase-3" className="border rounded-lg px-6 py-2" data-testid="accordion-phase-3">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center shrink-0">
                        <Brain className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-base" data-testid="text-phase-3-title">Phase 3 – AI Prospect & Relationship Intelligence</h3>
                          <Badge variant="outline" className="text-xs">Months 5-6</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Identify top prospects and hidden networks through AI-driven insight
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2">
                    <div className="space-y-4 ml-16">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Key Activities</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Train ML models to score donors by likelihood and timing to give</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Build graph-based relationship maps (Neo4j / Foundry Ontology)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Highlight warm introductions via board or partner networks</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Prioritize donors by alignment with Foundation program areas</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Deliverables</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">AI Prospect Scoring Dashboard</Badge>
                          <Badge variant="secondary">Relationship Network Visualization</Badge>
                          <Badge variant="secondary">Top 25 Prospect Action Plan</Badge>
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Short-Term Wins
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Fundraisers focus on high-probability donors</li>
                          <li>• New "warm path" introductions surface</li>
                          <li>• Efficiency gains for development officers and board engagement</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Phase 4 */}
                <AccordionItem value="phase-4" className="border rounded-lg px-6 py-2" data-testid="accordion-phase-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-950 flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-base" data-testid="text-phase-4-title">Phase 4 – Workflow Automation & AI-Assisted Grant Writing</h3>
                          <Badge variant="outline" className="text-xs">Months 7-9</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Streamline repetitive work and automate grant proposal creation
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2">
                    <div className="space-y-4 ml-16">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Key Activities</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Deploy AI-powered proposal and reporting generator trained on prior submissions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Integrate task tracking and automated deadline reminders</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Centralize grant data in unified dashboard</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Analyze winning proposal language for continuous improvement</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Deliverables</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">AI Grant Proposal Generator (Pilot)</Badge>
                          <Badge variant="secondary">Automated Reporting Workflow</Badge>
                          <Badge variant="secondary">Grant Performance Dashboard</Badge>
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Short-Term Wins
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• 70-80% reduction in proposal drafting time</li>
                          <li>• Higher proposal quality and alignment</li>
                          <li>• Transparent pipeline of proposals → submissions → results</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Phase 5 */}
                <AccordionItem value="phase-5" className="border rounded-lg px-6 py-2" data-testid="accordion-phase-5">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-950 flex items-center justify-center shrink-0">
                        <Users className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-base" data-testid="text-phase-5-title">Phase 5 – Smart Events & Dynamic Pipeline Management</h3>
                          <Badge variant="outline" className="text-xs">Months 9-11</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Use predictive analytics to enhance events and donor segmentation
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2">
                    <div className="space-y-4 ml-16">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Key Activities</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Implement AI event-planning model for invitee and sponsor alignment</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Automate post-event follow-up and engagement tracking</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Integrate predictive scoring for donor readiness and lapse risk</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Consolidate all giving pipelines into a dynamic dashboard</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Deliverables</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Smart Event Planner Dashboard</Badge>
                          <Badge variant="secondary">Dynamic Donor Pipeline System</Badge>
                          <Badge variant="secondary">Engagement Alert Automation</Badge>
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Short-Term Wins
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Higher-ROI, better-targeted events</li>
                          <li>• Early-warning system for donor attrition</li>
                          <li>• Greater visibility into future giving potential</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Phase 6 */}
                <AccordionItem value="phase-6" className="border rounded-lg px-6 py-2" data-testid="accordion-phase-6">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center shrink-0">
                        <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-base" data-testid="text-phase-6-title">Phase 6 – Optimization & Training</h3>
                          <Badge variant="outline" className="text-xs">Month 12+</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Institutionalize AI systems and ensure continuous improvement
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2">
                    <div className="space-y-4 ml-16">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Key Activities</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Conduct staff training and AI-literacy workshops</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Deliver final dashboards and leadership reports</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Complete ROI and impact analysis</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>Establish data-governance and privacy framework</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Deliverables</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Leadership Dashboard with Live KPIs</Badge>
                          <Badge variant="secondary">Final Impact and ROI Report</Badge>
                          <Badge variant="secondary">Ongoing Support & Optimization Plan</Badge>
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <Award className="w-4 h-4 text-amber-600" />
                          Long-Term Wins
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Self-sustaining, data-driven fundraising culture</li>
                          <li>• Continuous learning models that adapt to donor behavior</li>
                          <li>• Measurable improvement in donor retention, grant success, and event ROI</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
