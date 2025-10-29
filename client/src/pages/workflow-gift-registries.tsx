import { Card, CardContent } from "@/components/ui/card";
import { Gift } from "lucide-react";

export default function GiftRegistries() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Charitable Gift Registries</h1>
        <p className="text-muted-foreground">
          Track Zola, The Knot, Facebook fundraisers - identify donors celebrating life events
        </p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <Gift className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Life Event Fundraising</h3>
          <p className="text-muted-foreground">
            Monitor wedding and celebration gift registries to identify charitable giving opportunities
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Full implementation coming soon
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
