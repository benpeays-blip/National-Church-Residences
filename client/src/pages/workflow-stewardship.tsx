import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function Stewardship() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Automated Stewardship Workflows</h1>
        <p className="text-muted-foreground">
          Trigger sequences of thank-yous, impact reports, invitations based on gift thresholds
        </p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <Sparkles className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Stewardship Automation</h3>
          <p className="text-muted-foreground">
            Automated multi-step stewardship sequences triggered by gift amounts and donor milestones
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Full implementation coming soon
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
