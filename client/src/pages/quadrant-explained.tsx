import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Award, Heart, Users, Mail, AlertTriangle } from 'lucide-react';

export default function QuadrantExplained() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-[#7BC4DC]/10 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-[#7BC4DC]" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Quadrant Explained</h1>
          <p className="text-sm text-muted-foreground">
            A Strategic Model for Understanding and Moving Donors Toward Long-Term Partnership
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="partner" className="w-full">
        <TabsList className="grid w-full grid-cols-4 gap-1 bg-transparent p-0 mb-8">
          <TabsTrigger 
            value="partner" 
            data-testid="tab-framework-partner"
            className="group relative bg-[#7FA3A1] text-white data-[state=active]:bg-[#7FA3A1] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Partner
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#7FA3A1] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="friend" 
            data-testid="tab-framework-friend"
            className="group relative bg-[#D5636C] text-white data-[state=active]:bg-[#D5636C] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Friend
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#D5636C] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="colleague" 
            data-testid="tab-framework-colleague"
            className="group relative bg-[#7BC4DC] text-white data-[state=active]:bg-[#7BC4DC] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Colleague
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#7BC4DC] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="acquaintance" 
            data-testid="tab-framework-acquaintance"
            className="group relative bg-[#A5A033] text-white data-[state=active]:bg-[#A5A033] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Acquaintance
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#A5A033] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
        </TabsList>

        {/* Partner Tab */}
        <TabsContent value="partner" className="space-y-6">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-primary" />
              THE PARTNER (HIGH ENERGY, HIGH STRUCTURE)
            </h3>
            <p className="text-muted-foreground italic mb-4">
              "Aligned, invested, relationally connected, and strategically engaged."
            </p>
          </div>

          {/* 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">Definition</h4>
                <p className="text-sm mb-2">Partners are:</p>
                <ul className="space-y-1.5 text-sm ml-6">
                  <li className="list-disc">Multi-year givers</li>
                  <li className="list-disc">Multi-digit donors (major gift level)</li>
                  <li className="list-disc">People who see themselves as part of the mission</li>
                  <li className="list-disc">Investors, not simply donors</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Characteristics</h4>
                <ul className="space-y-1.5 text-sm ml-6">
                  <li className="list-disc">Deep personal connection</li>
                  <li className="list-disc">Clear strategic alignment</li>
                  <li className="list-disc">Participates in planning, not simply funding</li>
                  <li className="list-disc">Regular rhythm of communication</li>
                  <li className="list-disc">Eager for updates, impact conversations, shared vision moments</li>
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">Psychology</h4>
                <p className="text-sm mb-2">Partners are motivated by:</p>
                <ul className="space-y-1.5 text-sm ml-6">
                  <li className="list-disc">Belonging and shared ownership</li>
                  <li className="list-disc">Transformational impact</li>
                  <li className="list-disc">Purpose and stewardship</li>
                </ul>
                <p className="text-sm mt-3 mb-2">They want:</p>
                <ul className="space-y-1.5 text-sm ml-6">
                  <li className="list-disc">Visibility into what matters</li>
                  <li className="list-disc">Relational access</li>
                  <li className="list-disc">Clear next steps</li>
                  <li className="list-disc">Meaningful engagement</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 border rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-muted-foreground" />
              Risks
            </h4>
            <ul className="space-y-1.5 text-sm ml-6">
              <li className="list-disc">High expectation for transparency</li>
              <li className="list-disc">Relationship must be tended like a garden</li>
              <li className="list-disc">Requires both relational energy AND organizational excellence</li>
            </ul>
          </div>
        </TabsContent>

        {/* Friend Tab */}
        <TabsContent value="friend" className="space-y-6">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-primary" />
              THE FRIEND (HIGH ENERGY, LOW STRUCTURE)
            </h3>
            <p className="text-muted-foreground italic mb-4">
              "Deep affection, high relational warmth, but no organized path to partnership."
            </p>
          </div>

          {/* 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">Definition</h4>
                <p className="text-sm mb-2">Friends are donors who:</p>
                <ul className="space-y-1.5 text-sm ml-6">
                  <li className="list-disc">Know you personally (staff, volunteers, neighbors, church members)</li>
                  <li className="list-disc">Like what you do, and like YOU</li>
                  <li className="list-disc">Say things like, "Let me know how I can help," but no plan emerges</li>
                  <li className="list-disc">Willing to give time or emotional encouragement</li>
                  <li className="list-disc">Often inconsistent givers because no structure nudges them forward</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Characteristics</h4>
                <ul className="space-y-1.5 text-sm ml-6">
                  <li className="list-disc">High relational capital</li>
                  <li className="list-disc">Motivated by affinity, story, and people</li>
                  <li className="list-disc">Warm, but unpredictable</li>
                  <li className="list-disc">Relationship = personal, not institutional</li>
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">Psychology</h4>
                <p className="text-sm mb-2">Friends give because:</p>
                <ul className="space-y-1.5 text-sm ml-6">
                  <li className="list-disc">They trust the person more than the organization</li>
                  <li className="list-disc">They feel emotional resonance</li>
                  <li className="list-disc">They feel loyalty to a leader or founder</li>
                </ul>
                <p className="text-sm mt-3 mb-2">But without structure:</p>
                <ul className="space-y-1.5 text-sm ml-6">
                  <li className="list-disc">They never fully integrate</li>
                  <li className="list-disc">They rarely become large or sustained givers</li>
                  <li className="list-disc">They remain "friendly, but uncommitted"</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 border rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-muted-foreground" />
              Risks
            </h4>
            <ul className="space-y-1.5 text-sm ml-6">
              <li className="list-disc">Relational drift if contact is inconsistent</li>
              <li className="list-disc">Emotional energy spent without strategic progression</li>
              <li className="list-disc">Can stay "stuck" in friendliness without movement</li>
            </ul>
          </div>
        </TabsContent>

        {/* Colleague Tab */}
        <TabsContent value="colleague" className="space-y-6">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-primary" />
              THE COLLEAGUE (LOW ENERGY, HIGH STRUCTURE)
            </h3>
            <p className="text-muted-foreground italic mb-4">
              "Predictable, routine, system-driven, but not emotionally invested."
            </p>
          </div>

          {/* 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">Definition</h4>
                <p className="text-sm mb-2">Colleagues are:</p>
                <ul className="space-y-1.5 text-sm ml-6">
                  <li className="list-disc">Auto-pay donors</li>
                  <li className="list-disc">Monthly small givers</li>
                  <li className="list-disc">Workplace donors</li>
                  <li className="list-disc">Event attendees who give because "this is what we do every year"</li>
                  <li className="list-disc">People who respond well to structured programs but not personal connection</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Characteristics</h4>
                <ul className="space-y-1.5 text-sm ml-6">
                  <li className="list-disc">Stable but not passionate</li>
                  <li className="list-disc">Consistent but not relational</li>
                  <li className="list-disc">Follow process; don't require high-touch work</li>
                  <li className="list-disc">They give because the system prompts them, not because the mission grips them</li>
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">Psychology</h4>
                <p className="text-sm mb-2">Colleagues value:</p>
                <ul className="space-y-1.5 text-sm ml-6">
                  <li className="list-disc">Convenience and predictability</li>
                  <li className="list-disc">Minimal emotional demand</li>
                  <li className="list-disc">Professionalism and clarity</li>
                </ul>
                <p className="text-sm mt-3">They may not feel strongly connected, but they do trust your structure.</p>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 border rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-muted-foreground" />
              Risks
            </h4>
            <ul className="space-y-1.5 text-sm ml-6">
              <li className="list-disc">They don't grow their giving</li>
              <li className="list-disc">They rarely advocate or influence others</li>
              <li className="list-disc">They will leave quietly if structure breaks down</li>
            </ul>
          </div>
        </TabsContent>

        {/* Acquaintance Tab */}
        <TabsContent value="acquaintance" className="space-y-6">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
              <Mail className="w-5 h-5 text-primary" />
              THE ACQUAINTANCE (LOW ENERGY, LOW STRUCTURE)
            </h3>
            <p className="text-muted-foreground italic mb-4">
              "Loosely known, lightly engaged, no emotional bond, and no clear pathway."
            </p>
          </div>

          {/* 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">Definition</h4>
                <p className="text-sm mb-2">Acquaintances are donors who:</p>
                <ul className="space-y-1.5 text-sm ml-6">
                  <li className="list-disc">Respond to general appeals (direct mail, email blasts, digital ads)</li>
                  <li className="list-disc">Have minimal relationship history with the organization</li>
                  <li className="list-disc">Have given once or a few times but without ongoing personal engagement</li>
                  <li className="list-disc">Are not yet relationally "seen"</li>
                  <li className="list-disc">Often don't remember giving or can't articulate the mission clearly</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Characteristics</h4>
                <ul className="space-y-1.5 text-sm ml-6">
                  <li className="list-disc">Transactional giving</li>
                  <li className="list-disc">Motivated by broad causes, not relationships</li>
                  <li className="list-disc">No expectation of reciprocation</li>
                  <li className="list-disc">Low brand loyalty</li>
                  <li className="list-disc">Easily lost if communication lapses</li>
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">Psychology</h4>
                <p className="text-sm mb-2">Acquaintances give out of:</p>
                <ul className="space-y-1.5 text-sm ml-6">
                  <li className="list-disc">Impulse or low-level curiosity</li>
                  <li className="list-disc">"Someone asked me and it sounded good"</li>
                  <li className="list-disc">Social conformity (everyone gives to something)</li>
                </ul>
                <p className="text-sm mt-3">The relationship is shallow because no intentional structure OR personal energy exists.</p>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 border rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-muted-foreground" />
              Risks
            </h4>
            <ul className="space-y-1.5 text-sm ml-6">
              <li className="list-disc">High churn</li>
              <li className="list-disc">Forgotten donors</li>
              <li className="list-disc">Donor fatigue quickly</li>
              <li className="list-disc">No memory of your organization among their giving priorities</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
