import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function QuadrantThesis() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card className="border-0 shadow-none">
        <CardHeader className="bg-primary/5 border-b">
          <CardTitle>THE CENTRAL THESIS OF THE MODEL</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {/* 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-5">
              <div>
                <h4 className="font-semibold text-sm mb-2">1. Donor movement is predictable.</h4>
                <p className="text-sm text-muted-foreground ml-4 mb-2">
                  Every donor relationship moves from:
                </p>
                <p className="text-sm text-muted-foreground ml-4 italic">
                  anonymous → known → seen → valued → essential.
                </p>
                <p className="text-sm text-muted-foreground ml-4 mt-2">
                  This quadrant system maps that progression.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">2. All movement requires BOTH energy and structure.</h4>
                <ul className="space-y-1 text-sm ml-8">
                  <li className="list-disc">Energy builds closeness.</li>
                  <li className="list-disc">Structure builds commitment.</li>
                </ul>
                <p className="text-sm text-muted-foreground ml-4 mt-2">
                  Partner-level donors emerge only where both converge.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">3. Each quadrant has a "default destiny."</h4>
                <p className="text-sm text-muted-foreground ml-4 mb-2">
                  If not intentionally moved:
                </p>
                <ul className="space-y-1 text-sm ml-8">
                  <li className="list-disc">Acquaintances disappear.</li>
                  <li className="list-disc">Friends drift.</li>
                  <li className="list-disc">Colleagues plateau.</li>
                  <li className="list-disc">Partners deepen movements and eventually become legacy givers.</li>
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              <div>
                <h4 className="font-semibold text-sm mb-2">4. The organization's internal discipline determines upward movement.</h4>
                <p className="text-sm text-muted-foreground ml-4 mb-2">
                  Most donors do not move on their own. They move because YOU intentionally:
                </p>
                <ul className="space-y-1 text-sm ml-8">
                  <li className="list-disc">invest energy,</li>
                  <li className="list-disc">introduce structure,</li>
                  <li className="list-disc">create clarity,</li>
                  <li className="list-disc">present meaningful opportunities.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">5. The ultimate goal is to form a community of Partners.</h4>
                <p className="text-sm text-muted-foreground ml-4 mb-2">
                  This is where:
                </p>
                <ul className="space-y-1 text-sm ml-8">
                  <li className="list-disc">transformational gifts occur,</li>
                  <li className="list-disc">multi-year commitments are made,</li>
                  <li className="list-disc">advocacy spreads,</li>
                  <li className="list-disc">the mission accelerates exponentially.</li>
                </ul>
                <p className="text-sm text-muted-foreground ml-4 mt-2">
                  This quadrant is not a "category of donors" — it is the future leadership of the organization.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
