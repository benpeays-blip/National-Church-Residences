import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, TrendingUp, Zap, Clock, Users, Star } from 'lucide-react';

const thesisPoints = [
  {
    number: 1,
    title: "Donor movement is predictable",
    icon: TrendingUp,
    content: "Every donor relationship moves from:",
    highlight: "anonymous → known → seen → valued → essential",
    footer: "This quadrant system maps that progression."
  },
  {
    number: 2,
    title: "All movement requires BOTH energy and structure",
    icon: Zap,
    bullets: ["Energy builds closeness.", "Structure builds commitment."],
    footer: "Partner-level donors emerge only where both converge."
  },
  {
    number: 3,
    title: "Each quadrant has a \"default destiny\"",
    icon: Clock,
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
    icon: Users,
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
    icon: Star,
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

export default function QuadrantThesis() {
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader className="bg-[#7BC4DC] text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-white">The Central Thesis</CardTitle>
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
          const Icon = point.icon;
          return (
            <Card key={point.number} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#395174] text-white flex items-center justify-center font-bold text-sm">
                    {point.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-[#7BC4DC] flex-shrink-0" />
                      <CardTitle className="text-sm leading-tight">{point.title}</CardTitle>
                    </div>
                  </div>
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
