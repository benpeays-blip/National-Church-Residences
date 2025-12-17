import DonorQuadrantMapper from "@/components/donor-quadrant-mapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowRight, Zap, Grid3x3 } from 'lucide-react';

export default function DonorQuadrant() {
  return (
    <div className="overflow-auto p-3 space-y-4">
      <DonorQuadrantMapper />
      
      {/* Framework Summary Section */}
      <Card>
          <CardHeader className="bg-[#395174] text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-white">Framework Summary</CardTitle>
                <CardDescription className="text-white/80">
                  A Quick Reference Guide to the Donor Relationship Quadrant Model
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Movement Table */}
            <div>
              <p className="text-sm mb-4 font-semibold">To reach the Partner quadrant:</p>
              
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="p-3 text-left text-sm font-semibold border-b">Quadrant</th>
                      <th className="p-3 text-left text-sm font-semibold border-b">Needed Input</th>
                      <th className="p-3 text-left text-sm font-semibold border-b">Movement Path</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/30 transition-colors">
                      <td className="p-3 text-sm font-medium">Acquaintance</td>
                      <td className="p-3 text-sm text-muted-foreground">Energy + Initial Structure</td>
                      <td className="p-3 text-sm text-muted-foreground">Make them known → move to Friend</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/30 transition-colors">
                      <td className="p-3 text-sm font-medium">Friend</td>
                      <td className="p-3 text-sm text-muted-foreground">Structure</td>
                      <td className="p-3 text-sm text-muted-foreground">Build plan + cadence → move to Colleague/Partner</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/30 transition-colors">
                      <td className="p-3 text-sm font-medium">Colleague</td>
                      <td className="p-3 text-sm text-muted-foreground">Energy</td>
                      <td className="p-3 text-sm text-muted-foreground">Personalize → deepen meaning → move to Partner</td>
                    </tr>
                    <tr className="hover:bg-muted/30 transition-colors">
                      <td className="p-3 text-sm font-medium">Partner</td>
                      <td className="p-3 text-sm text-muted-foreground">Consistent Energy + Structure</td>
                      <td className="p-3 text-sm text-muted-foreground">Maintain → grow → legacy-level commitment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Framework Axes */}
            <div className="grid md:grid-cols-2 gap-4 pt-2 border-t">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-semibold">Y-Axis: ENERGY</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  The relational energy and emotional investment exchanged between the organization and the donor.
                </p>
                <div className="flex items-center gap-2 text-sm mb-2">
                  <span className="text-muted-foreground">Low</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">High</span>
                </div>
                <p className="text-xs text-muted-foreground pt-2 border-t">
                  Energy = attention, personal connection, affinity, and sense of shared mission.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Grid3x3 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-semibold">X-Axis: STRUCTURE</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  The systems, processes, touchpoints, and formalized pathways that define how donors engage.
                </p>
                <div className="flex items-center gap-2 text-sm mb-2">
                  <span className="text-muted-foreground">Low</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">High</span>
                </div>
                <p className="text-xs text-muted-foreground pt-2 border-t">
                  Structure = cadence, planning, communication channels, intentional movement, strategic invitations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}
