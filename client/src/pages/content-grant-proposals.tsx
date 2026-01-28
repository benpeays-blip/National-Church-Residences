import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

type GrantProposal = {
  id: string;
  grantId: string;
  funderGuidelines: string | null;
  generatedNarrative: string | null;
  generatedBudget: any;
  generatedOutcomes: string[];
  generatedEvaluationPlan: string | null;
  status: string;
  reviewedBy: string | null;
  edits: string | null;
  submittedAt: string | null;
  createdAt: string;
};

type Grant = {
  id: string;
  funderName: string;
  stage: string;
  purpose: string;
  askAmount: string;
};

type GrantProposalItem = {
  proposal: GrantProposal;
  grant: Grant;
};

export default function GrantProposals() {
  const { data: proposals, isLoading, error, isError } = useQuery<GrantProposalItem[], Error>({
    queryKey: ["content", "grant-proposals"],
    queryFn: () => api.content.getGrantProposals(),
  });

  const getStatusColor = (status: string): string => {
    if (status === "submitted") return "#22C55E";
    if (status === "in_review") return "#E8A54B";
    if (status === "needs_revision") return "#EF4444";
    return "#395174";
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold ">Automated Grant Writing Assistant</h1>
          <p className="text-sm text-muted-foreground">
            AI drafts tailored proposals from foundation guidelines and your program data
          </p>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                  <div className="h-20 bg-muted rounded"></div>
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
              <p className="font-semibold ">Failed to load grant proposals</p>
              <p className="text-sm">{error?.message || "An error occurred"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold ">Automated Grant Writing Assistant</h1>
        <p className="text-sm text-muted-foreground">
          AI analyzes foundation guidelines and generates customized grant proposals
        </p>
      </div>

      {proposals && proposals.length > 0 ? (
        <div className="grid gap-4">
          {proposals.map((item) => {
            const statusColor = getStatusColor(item.proposal.status);
            return (
            <Card 
              key={item.proposal.id} 
              className="overflow-hidden" 
              style={{ borderLeft: `4px solid ${statusColor}` }}
              data-testid={`card-proposal-${item.proposal.id}`}
            >
              <CardHeader className="border-b">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${statusColor}15` }}
                    >
                      <FileEdit className="w-5 h-5" style={{ color: statusColor }} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {item.grant.funderName}
                      </CardTitle>
                      <div className="text-sm text-muted-foreground mt-1">
                        Requested: ${parseFloat(item.grant.askAmount).toLocaleString()} • Created {format(new Date(item.proposal.createdAt), "MMM d, yyyy")}
                      </div>
                    </div>
                  </div>
                  <Badge 
                    variant="outline"
                    style={{ color: statusColor, borderColor: statusColor }}
                  >
                    {item.proposal.status.replace("_", " ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {item.proposal.funderGuidelines && (
                  <div className="space-y-2">
                    <div className="text-sm font-semibold">Funder Guidelines</div>
                    <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                      {item.proposal.funderGuidelines.substring(0, 200)}...
                    </div>
                  </div>
                )}

                {item.proposal.generatedNarrative && (
                  <div className="space-y-2">
                    <div className="text-sm font-semibold">AI-Generated Narrative</div>
                    <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                      {item.proposal.generatedNarrative.substring(0, 300)}...
                    </div>
                  </div>
                )}

                {item.proposal.generatedOutcomes && item.proposal.generatedOutcomes.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-semibold">Expected Outcomes</div>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {item.proposal.generatedOutcomes.slice(0, 3).map((outcome, idx) => (
                        <li key={idx}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.proposal.submittedAt && (
                  <div className="text-sm text-green-600 font-semibold">
                    ✓ Submitted {format(new Date(item.proposal.submittedAt), "MMM d, yyyy 'at' h:mm a")}
                  </div>
                )}

                {item.proposal.edits && (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold">Human Edits:</span> {item.proposal.edits.substring(0, 100)}...
                  </div>
                )}
              </CardContent>
            </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <FileEdit className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold ">No Grant Proposals Yet</h3>
            <p className="text-sm text-muted-foreground">
              AI-generated grant proposals will appear here once foundation guidelines are analyzed
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
