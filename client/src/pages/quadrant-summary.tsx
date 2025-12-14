import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function QuadrantSummary() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card className="border-0 shadow-none">
        <CardHeader 
          className="p-6 pb-4 flex items-start justify-between"
          style={{ backgroundColor: "rgba(222, 235, 247, 0.5)" }}
        >
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <div>
              <CardTitle>FRAMEWORK SUMMARY</CardTitle>
              <CardDescription className="mt-1">
                A Quick Reference Guide to the Donor Relationship Quadrant Model
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div>
            <p className="text-sm mb-4 font-semibold">To reach the Partner quadrant:</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border p-3 text-left text-sm font-semibold">Quadrant</th>
                    <th className="border border-border p-3 text-left text-sm font-semibold">Needed Input</th>
                    <th className="border border-border p-3 text-left text-sm font-semibold">Movement Path</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover-elevate">
                    <td className="border border-border p-3 text-sm font-medium">Acquaintance</td>
                    <td className="border border-border p-3 text-sm">Energy + Initial Structure</td>
                    <td className="border border-border p-3 text-sm">Make them known → move to Friend</td>
                  </tr>
                  <tr className="hover-elevate">
                    <td className="border border-border p-3 text-sm font-medium">Friend</td>
                    <td className="border border-border p-3 text-sm">Structure</td>
                    <td className="border border-border p-3 text-sm">Build plan + cadence → move to Colleague/Partner</td>
                  </tr>
                  <tr className="hover-elevate">
                    <td className="border border-border p-3 text-sm font-medium">Colleague</td>
                    <td className="border border-border p-3 text-sm">Energy</td>
                    <td className="border border-border p-3 text-sm">Personalize → deepen meaning → move to Partner</td>
                  </tr>
                  <tr className="hover-elevate">
                    <td className="border border-border p-3 text-sm font-medium">Partner</td>
                    <td className="border border-border p-3 text-sm">Consistent Energy + Structure</td>
                    <td className="border border-border p-3 text-sm">Maintain → grow → legacy-level commitment</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Framework Axes Explanation */}
          <div className="border-t pt-6">
            <p className="text-sm mb-4">
              This framework maps donors using two essential axes:
            </p>

            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-2">Y-Axis: ENERGY (Low → High)</h4>
                <p className="text-sm text-muted-foreground ml-4">
                  The relational energy and emotional investment exchanged between the organization and the donor.
                </p>
                <p className="text-sm text-muted-foreground ml-4 mt-1">
                  Energy = attention, personal connection, affinity, and sense of shared mission.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">X-Axis: STRUCTURE (Low → High)</h4>
                <p className="text-sm text-muted-foreground ml-4">
                  The systems, processes, touchpoints, and formalized pathways that define how donors engage.
                </p>
                <p className="text-sm text-muted-foreground ml-4 mt-1">
                  Structure = cadence, planning, communication channels, intentional movement, strategic invitations.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
