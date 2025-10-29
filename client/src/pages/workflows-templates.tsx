import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Eye } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Workflow } from "@shared/schema";

// Template descriptions from the requirements document
const templateDescriptions: Record<string, string> = {
  "Major Gift Pipeline": "Manages prospects from identification → cultivation → ask → stewardship",
  "New Donor Welcome Journey": "Automates first-time donor experience with email sequences and touchpoints",
  "Lapsed Donor Reactivation": "Re-engages LYBUNT/SYBUNT donors with targeted outreach",
  "Grant Application Pipeline": "Tracks LOIs, proposals, awards, and reporting through grant lifecycle",
  "Event Fundraising Flow": "Runs gala or campaign events end-to-end from invitation to follow-up",
  "Digital Campaign": "Drives recurring and one-time gifts online via email and social channels",
  "Monthly Donor Program": "Subscription-style giving management with automated renewals",
  "Corporate Matching Gifts": "Captures and records employer matches through integration",
  "Data Hygiene Cycle": "Cleans donor data routinely with validation and deduplication",
  "Prospect Research Cycle": "Identifies new high-capacity donors through wealth screening",
  "Board Reporting": "Produces executive and board dashboards with KPIs and forecasts",
  "Campaign Planning": "Combines goal setting with predictive analytics and action planning",
  "Volunteer Recruitment": "Manages event volunteers and peer-to-peer fundraisers",
  "Donor Survey Loop": "Collects and acts on donor sentiment through feedback systems",
  "Stewardship Communications": "Keeps major donors informed post-gift with impact updates",
};

export default function WorkflowTemplatesPage() {
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const { data: templates = [], isLoading } = useQuery<Workflow[]>({
    queryKey: ["/api/workflows?isTemplate=true"],
  });

  const cloneTemplate = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("POST", `/api/workflows/${id}/clone`, {});
      return res.json();
    },
    onSuccess: (clonedWorkflow: Workflow) => {
      queryClient.invalidateQueries({ queryKey: ["/api/workflows"] });
      queryClient.invalidateQueries({ queryKey: ["/api/workflows?isTemplate=true"] });
      toast({
        title: "Template cloned successfully",
        description: "Opening workflow canvas...",
      });
      // Navigate to canvas for the cloned workflow
      navigate(`/workflows/${clonedWorkflow.id}/canvas`);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to clone template",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Workflow Templates</h1>
        <p className="text-muted-foreground mt-2">
          Pre-built fundraising workflow templates - clone to customize for your organization
        </p>
      </div>

      {/* Success Notice */}
      {templates.length > 0 && (
        <Card className="border-green-500/50 bg-green-500/5">
          <CardHeader>
            <CardTitle className="text-lg">✅ Templates Ready</CardTitle>
            <CardDescription>
              {templates.length} industry-standard fundraising workflow templates are available. 
              Each includes pre-configured blocks and connections for common fundraising processes.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Templates List */}
      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading templates...</div>
      ) : templates.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No templates available yet. Check back soon for pre-built workflow templates.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id} data-testid={`card-template-${template.id}`}>
              <CardHeader>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {template.description || "Workflow template"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {template.templateCategory && (
                    <Badge variant="outline">{template.templateCategory}</Badge>
                  )}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => navigate(`/workflows/${template.id}/canvas`)}
                      data-testid={`button-preview-template-${template.id}`}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => cloneTemplate.mutate(template.id)}
                      disabled={cloneTemplate.isPending}
                      data-testid={`button-clone-template-${template.id}`}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Use
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
