import { Card, CardContent } from "@/components/ui/card";
import { FileEdit } from "lucide-react";

export default function GrantProposals() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Automated Grant Writing Assistant</h1>
        <p className="text-muted-foreground">
          AI drafts tailored proposals from foundation guidelines and your program data
        </p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <FileEdit className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Grant Writing Assistant</h3>
          <p className="text-muted-foreground">
            AI analyzes foundation guidelines and generates customized grant proposals
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Full implementation coming soon
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
