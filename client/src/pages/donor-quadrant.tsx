import DonorQuadrantMapper from "@/components/donor-quadrant-mapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowRight, Zap, Grid3x3, Lightbulb } from 'lucide-react';

const thesisPoints = [
  {
    number: 1,
    title: "Donor movement is predictable",
    content: "Every donor relationship moves from:",
    highlight: "anonymous → known → seen → valued → essential",
    footer: "This quadrant system maps that progression."
  },
  {
    number: 2,
    title: "All movement requires BOTH energy and structure",
    bullets: ["Energy builds closeness.", "Structure builds commitment."],
    footer: "Partner-level donors emerge only where both converge."
  },
  {
    number: 3,
    title: "Each quadrant has a \"default destiny\"",
    content: "If not intentionally moved:",
    bullets: [
      "Acquaintances disappear.",
      "Friends drift.",
      "Colleagues plateau.",
      "Partners deepen and become legacy givers."
    ]
  },
  {
    number: 4,
    title: "Internal discipline determines upward movement",
    content: "Most donors do not move on their own. They move because YOU intentionally:",
    bullets: [
      "invest energy,",
      "introduce structure,",
      "create clarity,",
      "present meaningful opportunities."
    ]
  },
  {
    number: 5,
    title: "The ultimate goal is a community of Partners",
    content: "This is where:",
    bullets: [
      "transformational gifts occur,",
      "multi-year commitments are made,",
      "advocacy spreads,",
      "the mission accelerates exponentially."
    ],
    footer: "This quadrant is not a \"category of donors\" — it is the future leadership of the organization."
  }
];

export default function DonorQuadrant() {
  return (
    <div className="overflow-auto p-2 space-y-3">
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
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "rgba(57, 81, 116, 0.1)" }}
                  >
                    <Zap className="w-4 h-4" style={{ color: "#395174" }} />
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
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "rgba(57, 81, 116, 0.1)" }}
                  >
                    <Grid3x3 className="w-4 h-4" style={{ color: "#395174" }} />
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
      {/* Central Thesis Section */}
      <Card>
        <CardHeader className="bg-[#395174] text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-white">Core Principles
</CardTitle>
              <CardDescription className="text-white/80">
                The Core Principles Driving Donor Movement Toward Partnership
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      {/* Thesis Points Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {thesisPoints.map((point) => {
          return (
            <Card key={point.number} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#395174] text-white flex items-center justify-center font-bold text-sm">
                    {point.number}
                  </div>
                  <CardTitle className="text-sm leading-tight">{point.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pt-0">
                {point.content && (
                  <p className="text-sm text-muted-foreground mb-2">{point.content}</p>
                )}
                {point.highlight && (
                  <p className="text-sm font-medium italic text-[#395174] dark:text-[#7BC4DC] mb-2">
                    {point.highlight}
                  </p>
                )}
                {point.bullets && (
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {point.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#7BC4DC] mt-1.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {point.footer && (
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                    {point.footer}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
