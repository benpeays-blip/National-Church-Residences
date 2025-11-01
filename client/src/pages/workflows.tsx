import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Copy, Trash2, Edit, Eye } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Workflow } from "@shared/schema";
import { format } from "date-fns";

export default function WorkflowsPage() {
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const { data: workflows = [], isLoading } = useQuery<Workflow[]>({
    queryKey: ["/api/workflows"],
  });

  const createWorkflow = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/workflows", {
        name: "New Workflow",
        description: "Visual workflow for mapping tech stack and processes",
        status: "draft",
        isTemplate: false,
      });
      return res.json();
    },
    onSuccess: (newWorkflow: Workflow) => {
      queryClient.invalidateQueries({ queryKey: ["/api/workflows"] });
      toast({ title: "Workflow created successfully", description: "Opening canvas..." });
      navigate(`/workflows/${newWorkflow.id}/canvas`);
    },
    onError: (error: Error) => {
      toast({ title: "Failed to create workflow", description: error.message, variant: "destructive" });
    },
  });

  const deleteWorkflow = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/workflows/${id}`, undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workflows"] });
      queryClient.invalidateQueries({ queryKey: ["/api/workflows?isTemplate=true"] });
      toast({ title: "Workflow deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to delete workflow", description: error.message, variant: "destructive" });
    },
  });

  const cloneWorkflow = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("POST", `/api/workflows/${id}/clone`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workflows"] });
      queryClient.invalidateQueries({ queryKey: ["/api/workflows?isTemplate=true"] });
      toast({ title: "Workflow cloned successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to clone workflow", description: error.message, variant: "destructive" });
    },
  });

  const userWorkflows = workflows.filter(w => !w.isTemplate);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Workflow Library</h1>
        <p className="text-sm text-muted-foreground">
          Visual workflow builder for mapping tech stacks and fundraising processes
        </p>
      </div>

      {/* Builder Ready Banner */}
      <Card className="border-green-500/50 bg-green-500/5">
        <CardHeader>
          <CardTitle className="text-lg">✅ Visual Workflow Builder is Ready!</CardTitle>
          <CardDescription>
            Build and visualize your fundraising workflows with our drag-and-drop canvas. Choose from 15 pre-built templates or create your own from scratch.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/workflows/templates")} data-testid="button-browse-templates">
              <Eye className="w-4 h-4 mr-2" />
              Browse Templates
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create New Workflow */}
      <div>
        <Button
          onClick={() => createWorkflow.mutate()}
          disabled={createWorkflow.isPending}
          data-testid="button-create-workflow"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Workflow
        </Button>
      </div>

      {/* Workflows List */}
      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading workflows...</div>
      ) : userWorkflows.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No workflows yet. Create your first workflow to get started.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {userWorkflows.map((workflow) => (
            <Card key={workflow.id} data-testid={`card-workflow-${workflow.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    <CardDescription>{workflow.description || "No description"}</CardDescription>
                  </div>
                  <Badge variant={workflow.status === "published" ? "default" : "secondary"}>
                    {workflow.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Created {format(new Date(workflow.createdAt), "MMM d, yyyy")}
                    {workflow.updatedAt && (
                      <> • Updated {format(new Date(workflow.updatedAt), "MMM d, yyyy")}</>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => navigate(`/workflows/${workflow.id}/canvas`)}
                      data-testid={`button-edit-${workflow.id}`}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => cloneWorkflow.mutate(workflow.id)}
                      disabled={cloneWorkflow.isPending}
                      data-testid={`button-clone-${workflow.id}`}
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Clone
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this workflow?")) {
                          deleteWorkflow.mutate(workflow.id);
                        }
                      }}
                      disabled={deleteWorkflow.isPending}
                      data-testid={`button-delete-${workflow.id}`}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
