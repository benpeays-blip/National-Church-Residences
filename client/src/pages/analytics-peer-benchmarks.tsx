import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function PeerBenchmarks() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Peer Benchmarking</h1>
        <p className="text-muted-foreground">
          Compare your performance to similar nonprofits - staffing, revenue, donor retention
        </p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Peer Organization Benchmarks</h3>
          <p className="text-muted-foreground">
            Compare key metrics to similar organizations in your sector and budget size
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Full implementation coming soon
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
