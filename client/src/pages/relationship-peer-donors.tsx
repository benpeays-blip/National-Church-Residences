import { Card, CardContent } from "@/components/ui/card";
import { UsersRound } from "lucide-react";

export default function PeerDonors() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold ">Automated Peer Discovery</h1>
        <p className="text-sm text-muted-foreground">
          AI finds similar donors to identify cross-sell opportunities and giving patterns
        </p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <UsersRound className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold ">Peer Discovery Engine</h3>
          <p className="text-sm text-muted-foreground">
            AI analyzes giving patterns, wealth levels, and interests to find similar donors
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            View peer matches from individual donor profiles
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
