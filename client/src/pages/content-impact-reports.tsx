import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

export default function ImpactReports() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Impact Report Personalization</h1>
        <p className="text-muted-foreground">
          Customized donor reports showing specific programs they funded and outcomes achieved
        </p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Personalized Impact Reports</h3>
          <p className="text-muted-foreground">
            AI generates custom impact reports for each donor showing programs funded and outcomes
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Full implementation coming soon
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
