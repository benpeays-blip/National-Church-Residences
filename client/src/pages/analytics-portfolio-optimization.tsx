import { Card, CardContent } from "@/components/ui/card";
import { UserCog } from "lucide-react";

export default function PortfolioOptimization() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Portfolio Optimization Engine</h1>
        <p className="text-sm text-muted-foreground">
          AI suggests which MGO should own which donor based on capacity, relationships, territory
        </p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <UserCog className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Portfolio Optimization</h3>
          <p className="text-muted-foreground">
            AI analyzes donor capacity, MGO relationships, territory, and workload to recommend optimal portfolio assignments
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Portfolio recommendations will appear here once calculated
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
