import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ListChecks, Zap } from "lucide-react";

type Task = {
  id: string;
  title: string;
  description: string;
  personId: string;
  assignedTo: string;
  status: string;
  dueDate: string;
  createdAt: string;
};

type TaskPriorityScore = {
  id: string;
  taskId: string;
  estimatedRevenue: string;
  urgencyScore: number;
  impactScore: number;
  effortScore: number;
  finalPriority: number;
  reasoning: string;
  calculatedAt: string;
};

type TaskPriorityItem = {
  priorityScore: TaskPriorityScore;
  task: Task;
};

export default function TaskPriorities() {
  const { data: scoredTasks, isLoading, error, isError } = useQuery<TaskPriorityItem[], Error>({
    queryKey: ["workflow-utilities", "task-priorities"],
    queryFn: () => api.workflowUtilities.getTaskPriorities(),
  });

  const getPriorityVariant = (score: number) => {
    if (score >= 80) return "destructive";
    if (score >= 60) return "secondary";
    return "outline";
  };

  const getPriorityLabel = (score: number) => {
    if (score >= 80) return "Critical";
    if (score >= 60) return "High";
    if (score >= 40) return "Medium";
    return "Low";
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold ">AI Task Prioritization</h1>
          <p className="text-sm text-muted-foreground">
            Every task gets an AI priority score based on urgency, impact, and capacity
          </p>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                  <div className="h-16 bg-muted rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">
              <p className="font-semibold ">Failed to load task priorities</p>
              <p className="text-sm">{error?.message || "An error occurred"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Sort by priority descending
  const sortedTasks = scoredTasks?.sort((a, b) => b.priorityScore.finalPriority - a.priorityScore.finalPriority) || [];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold ">AI Task Prioritization</h1>
        <p className="text-sm text-muted-foreground">
          AI ranks every fundraising task by urgency, revenue impact, and donor capacity
        </p>
      </div>

      {sortedTasks.length > 0 ? (
        <div className="grid gap-4">
          {sortedTasks.map((item, index) => (
            <Card key={item.priorityScore.id} data-testid={`card-task-${item.task.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl font-bold text-muted-foreground">
                      #{index + 1}
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-lg">
                        {item.task.title}
                      </CardTitle>
                      {item.task.description && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {item.task.description}
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge variant={getPriorityVariant(item.priorityScore.finalPriority)}>
                    {getPriorityLabel(item.priorityScore.finalPriority)} - {item.priorityScore.finalPriority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Est. Revenue</div>
                    <div className="text-xl font-bold text-green-600">
                      ${parseFloat(item.priorityScore.estimatedRevenue).toLocaleString()}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Urgency</div>
                    <div className="text-xl font-semibold">
                      {item.priorityScore.urgencyScore}/100
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Impact</div>
                    <div className="text-xl font-semibold">
                      {item.priorityScore.impactScore}/100
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Effort</div>
                    <div className="text-xl font-semibold">
                      {100 - item.priorityScore.effortScore}/100
                    </div>
                  </div>
                </div>

                {item.priorityScore.reasoning && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-primary mt-0.5" />
                      <div className="space-y-1">
                        <div className="text-sm font-semibold mb-1">AI Reasoning</div>
                        <div className="text-sm text-muted-foreground">{item.priorityScore.reasoning}</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <ListChecks className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold ">No Prioritized Tasks Yet</h3>
            <p className="text-sm text-muted-foreground">
              Task priority scores will appear here once tasks are analyzed
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
