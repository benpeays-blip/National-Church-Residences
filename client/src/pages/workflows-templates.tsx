import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Eye, Users, FileText, Mail, DollarSign, TrendingUp, Database, AlertCircle, Zap } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Workflow } from "@shared/schema";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Team-specific workflow variations
const teamWorkflows = [
  {
    id: "major-gifts",
    name: "Major Gifts Team",
    icon: Users,
    primarySystems: ["Salesforce", "WealthEngine", "Outlook"],
    challenges: [
      "Works mainly in Salesforce and WealthEngine",
      "Relies on Executive Assistant or Database Manager for record updates",
      "Uses Outlook for personal communications, rarely logs full correspondence",
      "Often double-enters contact notes → opportunity for automation"
    ]
  },
  {
    id: "grants",
    name: "Grants Team",
    icon: FileText,
    primarySystems: ["Word", "Excel", "Foundant", "SharePoint"],
    challenges: [
      "Works in Word/Excel, Foundant, and SharePoint",
      "Tracks deadlines manually; reporting is time-consuming",
      "Limited integration with donor CRM → no unified funder profile"
    ]
  },
  {
    id: "marketing",
    name: "Marketing / Communications",
    icon: Mail,
    primarySystems: ["Mailchimp", "Salesforce"],
    challenges: [
      "Runs Mailchimp campaigns with outdated segmentation lists exported from Salesforce",
      "Measures success only via open/click rates, not donor conversions",
      "Event invitation and post-event follow-up disconnected from CRM"
    ]
  },
  {
    id: "finance",
    name: "Finance / Accounting",
    icon: DollarSign,
    primarySystems: ["Salesforce", "Financial Edge"],
    challenges: [
      "Receives batch reports from Salesforce for reconciliation",
      "Enters data manually into Financial Edge",
      "Gift coding errors cause periodic reporting mismatches"
    ]
  },
  {
    id: "leadership",
    name: "Executive Leadership",
    icon: TrendingUp,
    primarySystems: ["Power BI", "Excel"],
    challenges: [
      "Gets quarterly reports from Power BI or manually assembled Excel summaries",
      "Lacks real-time visibility into pipeline, proposals, and campaign performance"
    ]
  }
];

export default function WorkflowTemplatesPage() {
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const { data: templates = [], isLoading } = useQuery<Workflow[]>({
    queryKey: ["workflows", { isTemplate: true }],
    queryFn: () => api.workflows.getAll(),
  });

  const cloneTemplate = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("POST", `/api/workflows/${id}/clone`, {});
      return res.json();
    },
    onSuccess: (clonedWorkflow: Workflow) => {
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
      queryClient.invalidateQueries({ queryKey: ["workflows", { isTemplate: true }] });
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
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Workflow Templates</h1>
        <p className="text-sm text-muted-foreground">
          Pre-built fundraising workflow templates - clone to customize for your organization
        </p>
      </div>

      {/* Team-Specific Workflow Variations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Workflow Variations by Team
          </CardTitle>
          <CardDescription>
            Understand how different teams navigate the fundraising ecosystem and their unique challenges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-3">
            {teamWorkflows.map((team) => {
              const TeamIcon = team.icon;
              return (
                <AccordionItem 
                  key={team.id} 
                  value={team.id}
                  className="border rounded-lg bg-muted/50"
                  data-testid={`accordion-team-${team.id}`}
                >
                  <AccordionTrigger className="hover:no-underline px-6 py-4">
                    <div className="flex items-center gap-4 text-left w-full">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <TeamIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base mb-1" data-testid={`text-team-${team.id}`}>
                          {team.name}
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {team.primarySystems.map((system) => (
                            <Badge key={system} variant="outline" className="text-xs">
                              <Database className="w-3 h-3 mr-1" />
                              {system}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="ml-16 space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <AlertCircle className="w-4 h-4 text-muted-foreground" />
                          <h4 className="font-medium text-sm">Current Workflow & Challenges</h4>
                        </div>
                        <ul className="space-y-2">
                          {team.challenges.map((challenge, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span className="text-muted-foreground mt-1">•</span>
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-3 border-t">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-primary" />
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            FundRazor Solution
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Unified platform eliminates manual data entry, provides real-time visibility, 
                          and automates workflows across all systems
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>

      {/* Success Notice */}
      {templates.length > 0 && (
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Templates Ready</CardTitle>
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
