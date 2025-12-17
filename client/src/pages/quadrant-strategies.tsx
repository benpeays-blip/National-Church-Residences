import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Award, CheckCircle2, Lightbulb } from 'lucide-react';

export default function QuadrantStrategies() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card className="border-0 shadow-none">
        <CardHeader 
          className="p-6 pb-4 flex items-start justify-between"
          style={{ backgroundColor: "rgba(222, 235, 247, 0.5)" }}
        >
          <div className="flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-primary" />
            <div>
              <CardTitle>MOVEMENT STRATEGIES</CardTitle>
              <CardDescription className="mt-1">
                How Each Quadrant Advances to Partner
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="acquaintance" className="w-full">
            <TabsList className="grid w-full grid-cols-4 gap-1 bg-transparent p-0 mb-8">
              <TabsTrigger 
                value="acquaintance" 
                data-testid="tab-strategy-acquaintance"
                className="group relative bg-[#A5A033] text-white data-[state=active]:bg-[#A5A033] data-[state=active]:text-white data-[state=active]:shadow-none"
              >
                Acquaintance → Partner
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#A5A033] opacity-0 group-data-[state=active]:opacity-100" />
              </TabsTrigger>
              <TabsTrigger 
                value="friend" 
                data-testid="tab-strategy-friend"
                className="group relative bg-[#D5636C] text-white data-[state=active]:bg-[#D5636C] data-[state=active]:text-white data-[state=active]:shadow-none"
              >
                Friend → Partner
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#D5636C] opacity-0 group-data-[state=active]:opacity-100" />
              </TabsTrigger>
              <TabsTrigger 
                value="colleague" 
                data-testid="tab-strategy-colleague"
                className="group relative bg-[#7BC4DC] text-white data-[state=active]:bg-[#7BC4DC] data-[state=active]:text-white data-[state=active]:shadow-none"
              >
                Colleague → Partner
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#7BC4DC] opacity-0 group-data-[state=active]:opacity-100" />
              </TabsTrigger>
              <TabsTrigger 
                value="partner" 
                data-testid="tab-strategy-partner"
                className="group relative bg-[#7FA3A1] text-white data-[state=active]:bg-[#7FA3A1] data-[state=active]:text-white data-[state=active]:shadow-none"
              >
                Maintaining Partner
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#7FA3A1] opacity-0 group-data-[state=active]:opacity-100" />
              </TabsTrigger>
            </TabsList>

            {/* Acquaintance → Partner */}
            <TabsContent value="acquaintance" className="space-y-6">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                  <ArrowRight className="w-5 h-5 text-primary" />
                  ACQUAINTANCE → PARTNER
                </h3>
                <p className="text-sm font-semibold text-primary mb-4">
                  Primary Goal: Move from transactional giving to relational awareness and structured next steps.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">Strategy</h4>
                
                {/* 2-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-sm mb-2">1. Acknowledge their gift personally</p>
                      <p className="text-sm text-muted-foreground ml-4">
                        Humanize the relationship. Acquaintances become friends when they feel seen.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">2. Invite them into light-touch structure</p>
                      <p className="text-sm text-muted-foreground ml-4 mb-2">Examples:</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Short update email with a personal note</li>
                        <li className="list-disc">Quick "behind the scenes" story</li>
                        <li className="list-disc">Low-commitment survey ("Which part of our mission matters most to you?")</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">3. Place them in a predictable cadence</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Quarterly impact summaries</li>
                        <li className="list-disc">Personalized content based on interest</li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-sm mb-2">4. Offer a micro-commitment</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">RSVP for a 15-minute virtual update</li>
                        <li className="list-disc">Join a small group tour</li>
                        <li className="list-disc">Attend an info session</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">5. Identify affinity signals</p>
                      <p className="text-sm text-muted-foreground ml-4">
                        Once they show interest, move them to "Friend."
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">6. Bridge to higher-touch conversation</p>
                      <p className="text-sm text-muted-foreground ml-4 italic">
                        "I noticed your interest in ___. Could we share a short update with you?"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Outcome
                </h4>
                <p className="text-sm">They become Friends, then Colleagues, then Partners.</p>
              </div>
            </TabsContent>

            {/* Friend → Partner */}
            <TabsContent value="friend" className="space-y-6">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                  <ArrowRight className="w-5 h-5 text-primary" />
                  FRIEND → PARTNER
                </h3>
                <p className="text-sm font-semibold text-primary mb-4">
                  Primary Goal: Add structure to high-energy relational warmth.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">Strategy</h4>
                
                {/* 2-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-sm mb-2">1. Convert relational warmth into a plan</p>
                      <p className="text-sm text-muted-foreground ml-4 italic">
                        "You've been close to our story — I'd love to explore what meaningful partnership might look like."
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">2. Introduce cadence</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Calendar the next touchpoint before ending the current one</li>
                        <li className="list-disc">Move from spontaneous connection → predictable engagement</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">3. Give them a role or responsibility</p>
                      <p className="text-sm text-muted-foreground ml-4 mb-2">
                        Friends become partners when they feel needed, not just liked:
                      </p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Host a small gathering</li>
                        <li className="list-disc">Join a vision preview</li>
                        <li className="list-disc">Help shape a project</li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-sm mb-2">4. Present specific investment opportunities</p>
                      <p className="text-sm text-muted-foreground ml-4 mb-2">
                        Friends respond to emotion; partners respond to clarity.
                      </p>
                      <p className="text-sm text-muted-foreground ml-4">
                        Give them something concrete to own.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">5. Create a vision conversation</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Invite them into the "why now" and the long-term plan</li>
                        <li className="list-disc">Connect their passion to a strategic initiative</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Outcome
                </h4>
                <p className="text-sm">Friendship + structure becomes Partnership.</p>
              </div>
            </TabsContent>

            {/* Colleague → Partner */}
            <TabsContent value="colleague" className="space-y-6">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                  <ArrowRight className="w-5 h-5 text-primary" />
                  COLLEAGUE → PARTNER
                </h3>
                <p className="text-sm font-semibold text-primary mb-4">
                  Primary Goal: Warm the relationship and deepen energy without removing structure.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">Strategy</h4>
                
                {/* 2-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-sm mb-2">1. Move from impersonal to personal</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Send a personalized update tied to their giving history</li>
                        <li className="list-disc">Invite them to a short thank-you call</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">2. Show them the meaning behind the structure</p>
                      <p className="text-sm text-muted-foreground ml-4 mb-2 italic">
                        "Your automated monthly gift has helped…"
                      </p>
                      <p className="text-sm text-muted-foreground ml-4">
                        Give emotional significance to their pattern.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">3. Offer deeper insight and stories</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Video updates</li>
                        <li className="list-disc">Program leader testimonials</li>
                        <li className="list-disc">Real-life transformation stories</li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-sm mb-2">4. Personal invitation to a higher-value opportunity</p>
                      <p className="text-sm text-muted-foreground ml-4 mb-2">
                        Colleagues respond to system integrity, so show how a major gift fits the broader structure:
                      </p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Multi-year vision</li>
                        <li className="list-disc">Strategic initiative</li>
                        <li className="list-disc">Campaign involvement</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">5. Bridge them to relational connection</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Introduce them to a key leader</li>
                        <li className="list-disc">Invite them to smaller gatherings where partnership feels natural</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Outcome
                </h4>
                <p className="text-sm">Colleague → relational warmth → structured major gift pathway → Partner.</p>
              </div>
            </TabsContent>

            {/* Maintaining Partner */}
            <TabsContent value="partner" className="space-y-6">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-primary" />
                  MAINTAINING PARTNER STATUS
                </h3>
                <p className="text-sm font-semibold text-primary mb-4">
                  Primary Goal: Sustain high energy and high structure through continuous engagement and transparency.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">Strategy</h4>
                
                {/* 2-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-sm mb-2">1. Maintain regular, meaningful communication</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Provide quarterly impact reports with personalized insights</li>
                        <li className="list-disc">Share behind-the-scenes updates and strategic decisions</li>
                        <li className="list-disc">Schedule regular check-ins and vision conversations</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">2. Deepen their involvement</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Invite to strategic planning sessions</li>
                        <li className="list-disc">Offer board or advisory committee opportunities</li>
                        <li className="list-disc">Create co-ownership of specific initiatives</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">3. Honor their partnership publicly and privately</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Recognition events and acknowledgments</li>
                        <li className="list-disc">Personal thank-you from leadership</li>
                        <li className="list-disc">Share stories of impact enabled by their partnership</li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-sm mb-2">4. Provide exclusive access and insight</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">VIP tours and program visits</li>
                        <li className="list-disc">Direct access to executive leadership</li>
                        <li className="list-disc">Early preview of new initiatives and opportunities</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">5. Continuously align with their evolving interests</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Regular conversations about their philanthropic goals</li>
                        <li className="list-disc">Adapt engagement to life changes and new priorities</li>
                        <li className="list-disc">Present opportunities that match their current passions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Key Principle
                </h4>
                <p className="text-sm">
                  Partners are not a destination but a relationship to be nurtured. Like a garden, partnership requires constant attention, 
                  care, and cultivation. The goal is not to maintain status quo, but to deepen engagement and co-create transformational impact together.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
