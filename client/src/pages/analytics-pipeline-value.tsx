import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "wouter";
import { ArrowLeft, DollarSign, TrendingUp, Users, Target, Filter } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";

type Opportunity = {
  id: string;
  personId: string;
  stage: string;
  askAmount: string | null;
  probability: number | null;
  closeDate: string | null;
  ownerId: string | null;
  notes: string | null;
  daysInStage: number | null;
  person: {
    firstName: string;
    lastName: string;
  };
  owner: {
    firstName: string;
    lastName: string;
  };
};

const STAGES = ["Cultivation", "Solicitation", "Negotiation", "Stewardship"];
const STAGE_COLORS = {
  Cultivation: "bg-chart-1",
  Solicitation: "bg-chart-2",
  Negotiation: "bg-chart-3",
  Stewardship: "bg-chart-4",
};

export default function PipelineValueDetail() {
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [ownerFilter, setOwnerFilter] = useState<string>("all");

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

  const filteredOpps = opportunities?.filter((opp) => {
    if (stageFilter !== "all" && opp.stage !== stageFilter) return false;
    if (ownerFilter !== "all" && opp.ownerId !== ownerFilter) return false;
    return true;
  }) || [];

  const totalValue = filteredOpps.reduce(
    (sum, opp) => sum + parseFloat(opp.askAmount || "0"),
    0
  );

  const weightedValue = filteredOpps.reduce(
    (sum, opp) => sum + parseFloat(opp.askAmount || "0") * ((opp.probability || 0) / 100),
    0
  );

  const stageBreakdown = STAGES.map((stage) => {
    const stageOpps = filteredOpps.filter((o) => o.stage === stage);
    const value = stageOpps.reduce((sum, o) => sum + parseFloat(o.askAmount || "0"), 0);
    const count = stageOpps.length;
    return { stage, value, count, percentage: totalValue > 0 ? (value / totalValue) * 100 : 0 };
  });

  const uniqueOwners = Array.from(
    new Set(opportunities?.map((o) => o.ownerId).filter(Boolean))
  ).map((id) => {
    const opp = opportunities?.find((o) => o.ownerId === id);
    return { id, name: `${opp?.owner?.firstName || ''} ${opp?.owner?.lastName || ''}`.trim() || 'Unknown' };
  });

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
        <h1 className="text-3xl font-bold">Pipeline Value Analysis</h1>
        <p className="text-sm text-muted-foreground">
          Comprehensive breakdown of active fundraising pipeline
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pipeline Value</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" data-testid="metric-total-value">
              {formatCurrency(totalValue)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredOpps.length} opportunities
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weighted Value</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" data-testid="metric-weighted-value">
              {formatCurrency(weightedValue)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Probability-adjusted forecast
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Ask</CardTitle>
            <Target className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" data-testid="metric-avg-ask">
              {formatCurrency(filteredOpps.length > 0 ? totalValue / filteredOpps.length : 0)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">per opportunity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active MGOs</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold" data-testid="metric-active-mgos">
              {uniqueOwners.length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">managing pipeline</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="w-48" data-testid="select-stage-filter">
              <SelectValue placeholder="All Stages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              {STAGES.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={ownerFilter} onValueChange={setOwnerFilter}>
            <SelectTrigger className="w-48" data-testid="select-owner-filter">
              <SelectValue placeholder="All MGOs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All MGOs</SelectItem>
              {uniqueOwners.map((owner) => (
                <SelectItem key={owner.id} value={owner.id!}>
                  {owner.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {(stageFilter !== "all" || ownerFilter !== "all") && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setStageFilter("all");
                setOwnerFilter("all");
              }}
              data-testid="button-clear-filters"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </Card>

      {/* Stage Breakdown */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle>Pipeline by Stage</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="space-y-4">
            {stageBreakdown.map((item) => (
              <div key={item.stage} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded ${STAGE_COLORS[item.stage as keyof typeof STAGE_COLORS]}`} />
                    <span className="font-medium">{item.stage}</span>
                    <Badge variant="secondary" className="text-xs">
                      {item.count} opps
                    </Badge>
                  </div>
                  <span className="font-semibold" data-testid={`text-stage-value-${item.stage.toLowerCase()}`}>
                    {formatCurrency(item.value)}
                  </span>
                </div>
                <Progress value={item.percentage} data-testid={`progress-stage-${item.stage.toLowerCase()}`} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Opportunities Table */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle>All Opportunities</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table data-testid="table-opportunities">
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Major Gifts Officer</TableHead>
                <TableHead className="text-right">Ask Amount</TableHead>
                <TableHead className="text-right">Probability</TableHead>
                <TableHead className="text-right">Weighted Value</TableHead>
                <TableHead>Close Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOpps.map((opp) => (
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
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(parseFloat(opp.askAmount || "0"))}
                  </TableCell>
                  <TableCell className="text-right">{opp.probability}%</TableCell>
                  <TableCell className="text-right font-semibold text-chart-1">
                    {formatCurrency(parseFloat(opp.askAmount || "0") * ((opp.probability || 0) / 100))}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {opp.closeDate ? new Date(opp.closeDate).toLocaleDateString() : "Not set"}
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
