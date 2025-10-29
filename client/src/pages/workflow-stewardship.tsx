import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, CheckCircle2, Clock } from "lucide-react";
import { format } from "date-fns";

type StewardshipWorkflow = {
  id: string;
  giftId: string;
  personId: string;
  workflowName: string;
  steps: any;
  currentStep: number;
  completedSteps: number;
  nextActionDate: string;
  nextActionType: string;
  paused: number;
  pausedReason: string | null;
  completedAt: string | null;
  createdAt: string;
};

export default function Stewardship() {
  const { data: workflows, isLoading } = useQuery<StewardshipWorkflow[]>({
    queryKey: ["/api/workflow/stewardship"],
  });

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Automated Stewardship Workflows</h1>
          <p className="text-muted-foreground">
            Triggered sequences based on gift thresholds and donor milestones
          </p>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-20 bg-muted rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const activeWorkflows = workflows?.filter((w) => !w.completedAt && w.paused === 0) || [];
  const pausedWorkflows = workflows?.filter((w) => w.paused === 1) || [];
  const completedWorkflows = workflows?.filter((w) => w.completedAt) || [];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Automated Stewardship Workflows</h1>
        <p className="text-muted-foreground">
          Multi-step stewardship sequences triggered by gift amounts and donor milestones
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Active Workflows ({activeWorkflows.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeWorkflows.length > 0 ? (
              activeWorkflows.map((workflow) => {
                const totalSteps = workflow.steps ? JSON.parse(workflow.steps as any).length : 5;
                const progress = (workflow.completedSteps / totalSteps) * 100;
                
                return (
                  <div key={workflow.id} className="border rounded-lg p-4 space-y-3" data-testid={`card-workflow-${workflow.id}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold">{workflow.workflowName}</div>
                        <div className="text-sm text-muted-foreground">
                          Donor ID: {workflow.personId.slice(0, 8)}
                        </div>
                      </div>
                      <Badge variant="secondary">Step {workflow.currentStep}/{totalSteps}</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="text-muted-foreground">
                        Next: {workflow.nextActionType} on {format(new Date(workflow.nextActionDate), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No active stewardship workflows
              </div>
            )}
          </CardContent>
        </Card>

        {pausedWorkflows.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Paused Workflows ({pausedWorkflows.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pausedWorkflows.map((workflow) => (
                <div key={workflow.id} className="border rounded-lg p-4 opacity-60">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold">{workflow.workflowName}</div>
                      {workflow.pausedReason && (
                        <div className="text-sm text-muted-foreground mt-1">
                          Reason: {workflow.pausedReason}
                        </div>
                      )}
                    </div>
                    <Badge variant="outline">Paused</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {completedWorkflows.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Completed Workflows ({completedWorkflows.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {completedWorkflows.slice(0, 5).map((workflow) => (
                <div key={workflow.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold">{workflow.workflowName}</div>
                      <div className="text-sm text-muted-foreground">
                        Completed {format(new Date(workflow.completedAt!), "MMM d, yyyy")}
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50">Done</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
