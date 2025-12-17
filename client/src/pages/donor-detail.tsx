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
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
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
          <Card>
            <CardHeader className="bg-[#395174] text-white rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-white">
                <User className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
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
          <Card>
            <CardHeader className="bg-[#395174] text-white rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-white">
                <DollarSign className="w-5 h-5" />
                Giving Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
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
                <Card>
                  <CardHeader className="bg-[#395174] text-white rounded-t-xl">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Target className="w-5 h-5" />
                      Next Best Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
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
                <Card>
                  <CardHeader className="bg-[#395174] text-white rounded-t-xl">
                    <CardTitle className="text-white">Active Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
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
                                Major Gifts Officer: {opp.owner.firstName} {opp.owner.lastName}
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
              <Card>
                <CardHeader className="bg-[#395174] text-white rounded-t-xl">
                  <CardTitle className="text-white">Gift History</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
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
              <Card>
                <CardHeader className="bg-[#395174] text-white rounded-t-xl">
                  <CardTitle className="text-white">All Opportunities</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
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
              <Card>
                <CardHeader className="bg-[#395174] text-white rounded-t-xl">
                  <CardTitle className="text-white">Recent Activities</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
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
        </div>
      </div>
    </div>
  );
}
