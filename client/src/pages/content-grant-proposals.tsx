import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileEdit, CheckCircle2, Clock, AlertCircle } from "lucide-react";
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

export default function GrantProposals() {
  const { data: proposals, isLoading, error, isError } = useQuery<GrantProposal[], Error>({
    queryKey: ["/api/content/grant-proposals"],
  });

  const getStatusIcon = (status: string) => {
    if (status === "submitted") return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    if (status === "in_review") return <Clock className="w-4 h-4 text-yellow-600" />;
    if (status === "needs_revision") return <AlertCircle className="w-4 h-4 text-orange-600" />;
    return <FileEdit className="w-4 h-4 text-blue-600" />;
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "outline" | "destructive" => {
    if (status === "submitted") return "default";
    if (status === "in_review") return "secondary";
    if (status === "needs_revision") return "destructive";
    return "outline";
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Automated Grant Writing Assistant</h1>
          <p className="text-muted-foreground">
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
              <p className="font-semibold mb-2">Failed to load grant proposals</p>
              <p className="text-sm">{error?.message || "An error occurred"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Automated Grant Writing Assistant</h1>
        <p className="text-muted-foreground">
          AI analyzes foundation guidelines and generates customized grant proposals
        </p>
      </div>

      {proposals && proposals.length > 0 ? (
        <div className="grid gap-4">
          {proposals.map((proposal) => (
            <Card key={proposal.id} data-testid={`card-proposal-${proposal.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getStatusIcon(proposal.status)}
                      Grant Proposal {proposal.grantId.slice(0, 8)}
                    </CardTitle>
                    <div className="text-sm text-muted-foreground mt-1">
                      Created {format(new Date(proposal.createdAt), "MMM d, yyyy")}
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(proposal.status)}>
                    {proposal.status.replace("_", " ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {proposal.funderGuidelines && (
                  <div>
                    <div className="text-sm font-semibold mb-1">Funder Guidelines</div>
                    <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                      {proposal.funderGuidelines.substring(0, 200)}...
                    </div>
                  </div>
                )}

                {proposal.generatedNarrative && (
                  <div>
                    <div className="text-sm font-semibold mb-1">AI-Generated Narrative</div>
                    <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                      {proposal.generatedNarrative.substring(0, 300)}...
                    </div>
                  </div>
                )}

                {proposal.generatedOutcomes && proposal.generatedOutcomes.length > 0 && (
                  <div>
                    <div className="text-sm font-semibold mb-2">Expected Outcomes</div>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {proposal.generatedOutcomes.slice(0, 3).map((outcome, idx) => (
                        <li key={idx}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {proposal.submittedAt && (
                  <div className="text-sm text-green-600 font-semibold">
                    ✓ Submitted {format(new Date(proposal.submittedAt), "MMM d, yyyy 'at' h:mm a")}
                  </div>
                )}

                {proposal.edits && (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold">Human Edits:</span> {proposal.edits.substring(0, 100)}...
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <FileEdit className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Grant Proposals Yet</h3>
            <p className="text-muted-foreground">
              AI-generated grant proposals will appear here once foundation guidelines are analyzed
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
