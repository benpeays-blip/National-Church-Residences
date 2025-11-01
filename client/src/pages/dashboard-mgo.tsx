import { useQuery, useMutation } from "@tanstack/react-query";
import { MetricCard } from "@/components/metric-card";
import { TaskItem } from "@/components/task-item";
import { OpportunityCard } from "@/components/opportunity-card";
import { EmptyState } from "@/components/empty-state";
import { ListTodo, TrendingUp, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Task, Opportunity } from "@shared/schema";

interface DashboardData {
  metrics: {
    portfolioSize: number;
    pipelineValue: number;
    completedTasks: number;
    upcomingMeetings: number;
  };
  tasks: (Task & {
    person?: { firstName: string; lastName: string };
  })[];
  opportunities: (Opportunity & {
    person?: { firstName: string; lastName: string };
    owner?: { firstName: string | null; lastName: string | null };
  })[];
}

export default function DashboardMGO() {
  const { toast } = useToast();
  const { data, isLoading } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard/mgo"],
  });

  const generateNBA = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/tasks/generate-nba", {});
      return await response.json();
    },
    onSuccess: (newTasks: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/mgo"] });
      toast({
        title: "Tasks Generated",
        description: `Generated ${newTasks?.length || 0} next best action tasks based on donor data.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate next best actions",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your portfolio and track progress
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  const groupedOpportunities = data?.opportunities.reduce(
    (acc, opp) => {
      if (!acc[opp.stage]) acc[opp.stage] = [];
      acc[opp.stage].push(opp);
      return acc;
    },
    {} as Record<string, typeof data.opportunities>
  );

  const stages = ["Prospect", "Cultivation", "Ask", "Steward", "Renewal"];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Manage your portfolio and track progress
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Portfolio Size"
          value={data?.metrics.portfolioSize ?? 0}
        />
        <MetricCard
          label="Pipeline Value"
          value={`$${((data?.metrics.pipelineValue ?? 0) / 1000).toFixed(0)}K`}
        />
        <MetricCard
          label="Tasks This Week"
          value={data?.metrics.completedTasks ?? 0}
        />
        <MetricCard
          label="Upcoming Meetings"
          value={data?.metrics.upcomingMeetings ?? 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 p-6" data-testid="card-today-priorities">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Top 10 Priorities Today</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                AI-generated next best actions
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => generateNBA.mutate()}
              disabled={generateNBA.isPending}
              data-testid="button-generate-nba"
              className="gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {generateNBA.isPending ? "Generating..." : "Generate"}
            </Button>
          </div>
          <ScrollArea className="h-96">
            {data?.tasks && data.tasks.length > 0 ? (
              <div className="space-y-2">
                {data.tasks.slice(0, 10).map((task, index) => (
                  <div key={task.id} data-testid={`task-item-${index}`}>
                    <TaskItem task={task} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={ListTodo}
                title="No tasks yet"
                description="Click 'Generate' to create AI-powered next best action tasks based on donor data."
              />
            )}
          </ScrollArea>
        </Card>

        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Pipeline Kanban</h2>
            <TrendingUp className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="overflow-x-auto">
            <div className="flex gap-4 min-w-max pb-2">
              {stages.map((stage) => (
                <div key={stage} className="w-64 shrink-0">
                  <div className="mb-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold">{stage}</h3>
                      <span className="text-xs text-muted-foreground">
                        {groupedOpportunities?.[stage]?.length ?? 0}
                      </span>
                    </div>
                  </div>
                  <ScrollArea className="h-96">
                    <div className="space-y-2 pr-2">
                      {groupedOpportunities?.[stage]?.map((opp) => (
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
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
