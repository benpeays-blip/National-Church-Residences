import { useQuery } from "@tanstack/react-query";
import { OpportunityCard } from "@/components/opportunity-card";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp } from "lucide-react";
import type { Opportunity } from "@shared/schema";

export default function Pipeline() {
  const { data: opportunities, isLoading } = useQuery<(Opportunity & {
    person?: { firstName: string; lastName: string };
    owner?: { firstName: string | null; lastName: string | null };
  })[]>({
    queryKey: ["/api/opportunities"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">Pipeline</h1>
        <Skeleton className="h-96" />
      </div>
    );
  }

  const stages = ["Prospect", "Cultivation", "Ask", "Steward", "Renewal"];
  const grouped = opportunities?.reduce((acc, opp) => {
    if (!acc[opp.stage]) acc[opp.stage] = [];
    acc[opp.stage].push(opp);
    return acc;
  }, {} as Record<string, typeof opportunities>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Pipeline</h1>
          <p className="text-muted-foreground">
            Manage opportunities through the fundraising lifecycle
          </p>
        </div>
        <TrendingUp className="w-8 h-8 text-muted-foreground" />
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max pb-2">
          {stages.map((stage) => (
            <Card key={stage} className="w-80 shrink-0 p-4">
              <div className="mb-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{stage}</h3>
                  <span className="text-xs text-muted-foreground">
                    {grouped?.[stage]?.length ?? 0}
                  </span>
                </div>
              </div>
              <ScrollArea className="h-[600px]">
                <div className="space-y-2 pr-2">
                  {grouped?.[stage]?.map((opp) => (
                    <OpportunityCard key={opp.id} opportunity={opp} />
                  )) ?? (
                    <div className="text-center py-8">
                      <p className="text-xs text-muted-foreground">
                        No opportunities
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
