import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { DataProvenanceBadge } from "@/components/data-provenance-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileText, Plus, Search, Calendar, DollarSign } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Grant } from "@shared/schema";

interface GrantsProps {
  initialStageFilter?: string;
}

export default function Grants({ initialStageFilter }: GrantsProps = {}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<string>(initialStageFilter || "all");
  const { toast } = useToast();

  const handleAddGrant = () => {
    toast({
      title: "Add Grant",
      description: "Opening grant research to find new opportunities...",
    });
    window.location.href = "/grant-research";
  };

  const { data: allGrants, isLoading } = useQuery<Grant[]>({
    queryKey: ["/api/grants"],
  });

  const filteredGrants = allGrants?.filter((grant) => {
    const matchesSearch =
      !searchQuery ||
      grant.funderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grant.purpose?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === "all" || grant.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const stageBadgeVariant = (stage: string) => {
    switch (stage) {
      case "Awarded":
        return "default";
      case "Submitted":
        return "secondary";
      case "LOI":
        return "secondary";
      case "Research":
        return "outline";
      case "Declined":
        return "destructive";
      case "ReportDue":
        return "default";
      default:
        return "outline";
    }
  };

  const getNextDeadline = (grant: Grant) => {
    if (grant.stage === "ReportDue" && grant.reportDueDate) {
      return { label: "Report Due", date: grant.reportDueDate };
    }
    if (grant.stage === "Research" && grant.loiDueDate) {
      return { label: "LOI Due", date: grant.loiDueDate };
    }
    if ((grant.stage === "LOI" || grant.stage === "Submitted") && grant.applicationDueDate) {
      return { label: "Application Due", date: grant.applicationDueDate };
    }
    if ((grant.stage === "LOI" || grant.stage === "Submitted") && grant.decisionDate) {
      return { label: "Decision", date: grant.decisionDate };
    }
    return null;
  };

  const getStageSummary = () => {
    if (!allGrants) return null;
    const summary = {
      Research: 0,
      LOI: 0,
      Submitted: 0,
      Awarded: 0,
      Declined: 0,
      ReportDue: 0,
    };
    allGrants.forEach((grant) => {
      summary[grant.stage as keyof typeof summary] = (summary[grant.stage as keyof typeof summary] || 0) + 1;
    });
    return summary;
  };

  const stageSummary = getStageSummary();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Grant Pipeline</h1>
          <p className="text-sm text-muted-foreground">
            Manage foundation grants and track submissions
          </p>
        </div>
        <Button onClick={handleAddGrant} data-testid="button-add-grant">
          <Plus className="w-4 h-4 mr-2" />
          Add Grant
        </Button>
      </div>

      {stageSummary && (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card className="p-6 border">
            <div className="text-sm text-muted-foreground mb-1">Research</div>
            <div className="text-2xl font-semibold tabular-nums">{stageSummary.Research}</div>
          </Card>
          <Card className="p-6 border">
            <div className="text-sm text-muted-foreground mb-1">LOI</div>
            <div className="text-2xl font-semibold tabular-nums">{stageSummary.LOI}</div>
          </Card>
          <Card className="p-6 border">
            <div className="text-sm text-muted-foreground mb-1">Submitted</div>
            <div className="text-2xl font-semibold tabular-nums">{stageSummary.Submitted}</div>
          </Card>
          <Card className="p-6 border">
            <div className="text-sm text-muted-foreground mb-1">Awarded</div>
            <div className="text-2xl font-semibold tabular-nums text-chart-1">
              {stageSummary.Awarded}
            </div>
          </Card>
          <Card className="p-6 border">
            <div className="text-sm text-muted-foreground mb-1">Report Due</div>
            <div className="text-2xl font-semibold tabular-nums text-chart-3">
              {stageSummary.ReportDue}
            </div>
          </Card>
          <Card className="p-6 border">
            <div className="text-sm text-muted-foreground mb-1">Declined</div>
            <div className="text-2xl font-semibold tabular-nums">{stageSummary.Declined}</div>
          </Card>
        </div>
      )}

      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search grants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-grants"
          />
        </div>
        {/* Only show dropdown filter when not filtering via tabs */}
        {!initialStageFilter && (
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="w-[180px]" data-testid="select-stage-filter">
              <SelectValue placeholder="Filter by stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="Research">Research</SelectItem>
              <SelectItem value="LOI">LOI</SelectItem>
              <SelectItem value="Submitted">Submitted</SelectItem>
              <SelectItem value="Awarded">Awarded</SelectItem>
              <SelectItem value="ReportDue">Report Due</SelectItem>
              <SelectItem value="Declined">Declined</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      ) : filteredGrants && filteredGrants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGrants.map((grant) => {
            const nextDeadline = getNextDeadline(grant);
            return (
              <Card
                key={grant.id}
                className="hover-elevate cursor-pointer overflow-hidden"
                data-testid={`card-grant-${grant.id}`}
              >
                <div 
                  className="p-4 flex items-start justify-between gap-2" 
                  style={{ backgroundColor: 'rgba(222, 235, 247, 0.5)' }}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate" data-testid={`text-grant-funder-${grant.id}`}>
                      {grant.funderName}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {grant.purpose}
                    </p>
                  </div>
                  <Badge variant={stageBadgeVariant(grant.stage)} data-testid={`badge-grant-stage-${grant.id}`}>
                    {grant.stage}
                  </Badge>
                </div>
                <div className="p-6 pt-4 space-y-4">

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          Ask Amount
                        </span>
                        <span className="font-semibold tabular-nums">
                          {grant.askAmount ? formatCurrency(parseFloat(grant.askAmount)) : "TBD"}
                        </span>
                      </div>

                      {grant.awardedAmount && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            Awarded
                          </span>
                          <span className="font-semibold tabular-nums text-chart-1">
                            {formatCurrency(parseFloat(grant.awardedAmount))}
                          </span>
                        </div>
                      )}

                      {nextDeadline && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {nextDeadline.label}
                          </span>
                          <span className="tabular-nums">
                            {formatDate(nextDeadline.date)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t">
                      <DataProvenanceBadge 
                        sourceSystem={grant.sourceSystem}
                        syncedAt={grant.syncedAt ? new Date(grant.syncedAt) : null}
                        variant="default"
                      />
                    </div>
                  </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={FileText}
          title="No grants found"
          description={
            searchQuery || stageFilter !== "all"
              ? "Try adjusting your search or filters"
              : "Get started by adding your first grant prospect to the system."
          }
          actionLabel="Add Grant"
          onAction={handleAddGrant}
        />
      )}
    </div>
  );
}
