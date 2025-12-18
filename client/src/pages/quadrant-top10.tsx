import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Target, ChevronDown, Phone, Mail, Calendar, MessageSquare, FileText, CheckCircle2, Clock, User, Lightbulb } from "lucide-react";

type OpportunityFilter = "all" | "friend-to-partner" | "colleague-to-partner" | "acquaintance-to-colleague";

interface ActionableOpportunity {
  id: string;
  donorName: string;
  currentQuadrant: "Friend" | "Colleague" | "Acquaintance" | "Partner";
  whyNow: string;
  recommendedMove: string;
  estimatedImpact: "High" | "Med-High" | "Medium" | "Low";
  owner: string;
  transitionType: "friend-to-partner" | "colleague-to-partner" | "acquaintance-to-colleague";
}

const getResponseGuidance = (opp: ActionableOpportunity) => {
  const templates: Record<string, { 
    approach: string; 
    talkingPoints: string[]; 
    emailTemplate: string;
    callScript: string;
    timeline: string;
    successMetrics: string[];
  }> = {
    "friend-to-partner": {
      approach: "Deepen the relationship by connecting their passion to a specific, impactful opportunity. Friends already trust us—now show them how they can make a transformational difference.",
      talkingPoints: [
        "Reference specific events or interactions they've had with your organization",
        "Share a compelling story that aligns with their known interests",
        "Present a concrete project or initiative they could fund or champion",
        "Discuss recognition opportunities and legacy impact",
        "Ask about their philanthropic goals and timeline"
      ],
      emailTemplate: `Dear ${opp.donorName.split(' ')[0]},

I hope this message finds you well. I've been reflecting on our recent conversations and your wonderful engagement with [organization].

Your passion for [their interest area] has truly inspired our team, and I believe there's an exciting opportunity that aligns perfectly with your values.

I'd love to share more over coffee—are you available [suggest 2-3 dates]?

Warm regards,
${opp.owner}`,
      callScript: `Opening: "Hi ${opp.donorName.split(' ')[0]}, this is ${opp.owner}. I've been thinking about you and wanted to personally reach out..."

Key Points:
• Thank them for their ongoing support and engagement
• Reference a specific moment that stood out to you
• Transition: "I have something exciting I'd love to share with you..."
• Propose an in-person meeting to discuss a major gift opportunity

Close: "Would you have time for coffee next week? I'd love to explore how we might partner together on something meaningful."`,
      timeline: "2-3 weeks from initial outreach to proposal meeting",
      successMetrics: [
        "Secure in-person meeting within 2 weeks",
        "Present tailored giving proposal",
        "Obtain verbal commitment or clear next steps",
        "Transition to Partner quadrant"
      ]
    },
    "colleague-to-partner": {
      approach: "Build on their consistent giving pattern by presenting an elevated opportunity. Show appreciation for their loyalty while inviting them into deeper partnership.",
      talkingPoints: [
        "Acknowledge their giving history and express genuine gratitude",
        "Share the cumulative impact of their contributions",
        "Present a multi-year pledge opportunity with benefits",
        "Discuss naming opportunities if appropriate",
        "Explore matching gift or challenge grant participation"
      ],
      emailTemplate: `Dear ${opp.donorName.split(' ')[0]},

Your steadfast support of [organization] over the years has made a remarkable difference. As we look ahead to [upcoming initiative], I'm reaching out to a select group of committed donors like yourself.

I believe you'd be interested in learning about a special opportunity to deepen your impact.

Could we schedule a brief call this week? I'd love to share what we're planning.

With gratitude,
${opp.owner}`,
      callScript: `Opening: "Hi ${opp.donorName.split(' ')[0]}, thank you for taking my call. I wanted to personally thank you for your incredible support..."

Key Points:
• Quantify their cumulative giving impact
• Share a beneficiary story connected to their giving area
• Introduce the elevated opportunity: "We're inviting our most committed supporters to..."
• Present specific giving levels and associated recognition

Close: "I'd love to schedule a time to discuss this further. What works best for your calendar?"`,
      timeline: "3-4 weeks for cultivation and proposal presentation",
      successMetrics: [
        "Schedule discovery call within 1 week",
        "Conduct in-depth conversation about capacity",
        "Present multi-year or major gift proposal",
        "Secure commitment or establish follow-up timeline"
      ]
    },
    "acquaintance-to-colleague": {
      approach: "Convert interest into engagement through personalized touchpoints. Focus on building trust and demonstrating value before discussing increased involvement.",
      talkingPoints: [
        "Reference their recent interaction with your organization",
        "Ask questions to understand their interests and motivations",
        "Invite them to an upcoming event or program",
        "Offer to send personalized impact information",
        "Suggest a low-pressure next step"
      ],
      emailTemplate: `Dear ${opp.donorName.split(' ')[0]},

It was wonderful to connect with you at [event/touchpoint]. Your interest in [topic] resonated with me, and I wanted to follow up personally.

I thought you might enjoy this [impact report/story/article] that relates to what we discussed.

I'd love to hear your thoughts and learn more about what inspires your philanthropy.

Best regards,
${opp.owner}`,
      callScript: `Opening: "Hi ${opp.donorName.split(' ')[0]}, this is ${opp.owner} from [organization]. I wanted to personally thank you for [recent interaction]..."

Key Points:
• Express genuine appreciation for their engagement
• Ask open-ended questions about their interests
• Listen actively and take notes
• Offer something of value (event invite, tour, report)

Close: "I'd love to stay in touch and keep you updated on [area of interest]. Would that be alright?"`,
      timeline: "4-6 weeks of cultivation before asking for commitment",
      successMetrics: [
        "Complete thank you call within 48 hours",
        "Send personalized follow-up materials",
        "Secure commitment to next engagement opportunity",
        "Establish regular communication cadence"
      ]
    }
  };
  
  return templates[opp.transitionType] || templates["acquaintance-to-colleague"];
};

const mockOpportunities: ActionableOpportunity[] = [
  {
    id: "1",
    donorName: "Alice Hart",
    currentQuadrant: "Friend",
    whyNow: "Attended two events, no 1:1 follow-up",
    recommendedMove: "60-min coffee; explore project fit",
    estimatedImpact: "High",
    owner: "Sarah",
    transitionType: "friend-to-partner"
  },
  {
    id: "2",
    donorName: "Daniel King",
    currentQuadrant: "Colleague",
    whyNow: "Increased recurring gift last month",
    recommendedMove: "Call to discuss multi-year pledge",
    estimatedImpact: "Med-High",
    owner: "Ben",
    transitionType: "colleague-to-partner"
  },
  {
    id: "3",
    donorName: "Patricia Chen",
    currentQuadrant: "Friend",
    whyNow: "Mentioned legacy planning in recent email",
    recommendedMove: "Schedule planned giving conversation",
    estimatedImpact: "High",
    owner: "Maria",
    transitionType: "friend-to-partner"
  },
  {
    id: "4",
    donorName: "Robert Morrison",
    currentQuadrant: "Colleague",
    whyNow: "Asked about capital campaign at gala",
    recommendedMove: "Present campaign case for support",
    estimatedImpact: "Med-High",
    owner: "Sarah",
    transitionType: "colleague-to-partner"
  },
  {
    id: "5",
    donorName: "Lisa Rodriguez",
    currentQuadrant: "Acquaintance",
    whyNow: "Opened last 3 emails, clicked donation link",
    recommendedMove: "Phone call to gauge interest",
    estimatedImpact: "Medium",
    owner: "James",
    transitionType: "acquaintance-to-colleague"
  },
  {
    id: "6",
    donorName: "Michael Thompson",
    currentQuadrant: "Friend",
    whyNow: "Spouse serves on hospital board",
    recommendedMove: "Invite to VIP donor recognition event",
    estimatedImpact: "High",
    owner: "Ben",
    transitionType: "friend-to-partner"
  },
  {
    id: "7",
    donorName: "Jennifer Wu",
    currentQuadrant: "Colleague",
    whyNow: "Matched corporate gift at maximum level",
    recommendedMove: "Explore beyond-match major gift",
    estimatedImpact: "Med-High",
    owner: "Maria",
    transitionType: "colleague-to-partner"
  },
  {
    id: "8",
    donorName: "David Patel",
    currentQuadrant: "Acquaintance",
    whyNow: "Attended first event last week",
    recommendedMove: "Follow-up thank you call",
    estimatedImpact: "Medium",
    owner: "Sarah",
    transitionType: "acquaintance-to-colleague"
  },
  {
    id: "9",
    donorName: "Amanda Foster",
    currentQuadrant: "Friend",
    whyNow: "Referred two new major donors this year",
    recommendedMove: "Invite to join development committee",
    estimatedImpact: "High",
    owner: "James",
    transitionType: "friend-to-partner"
  },
  {
    id: "10",
    donorName: "Christopher Lee",
    currentQuadrant: "Colleague",
    whyNow: "Wealth screening shows $5M+ capacity",
    recommendedMove: "Research proposal for naming opportunity",
    estimatedImpact: "Med-High",
    owner: "Ben",
    transitionType: "colleague-to-partner"
  },
  {
    id: "11",
    donorName: "Sarah Mitchell",
    currentQuadrant: "Friend",
    whyNow: "Recently retired, expressed interest in giving back",
    recommendedMove: "Schedule lunch meeting to discuss legacy",
    estimatedImpact: "High",
    owner: "Sarah",
    transitionType: "friend-to-partner"
  },
  {
    id: "12",
    donorName: "William Garcia",
    currentQuadrant: "Acquaintance",
    whyNow: "Attended virtual tour, asked follow-up questions",
    recommendedMove: "Send personalized impact report",
    estimatedImpact: "Medium",
    owner: "James",
    transitionType: "acquaintance-to-colleague"
  },
  {
    id: "13",
    donorName: "Elizabeth Brown",
    currentQuadrant: "Colleague",
    whyNow: "Anniversary of first major gift approaching",
    recommendedMove: "Plan stewardship call and thank you",
    estimatedImpact: "Med-High",
    owner: "Maria",
    transitionType: "colleague-to-partner"
  },
  {
    id: "14",
    donorName: "James Wilson",
    currentQuadrant: "Friend",
    whyNow: "Children now out of college, more disposable income",
    recommendedMove: "Present endowment giving options",
    estimatedImpact: "High",
    owner: "Ben",
    transitionType: "friend-to-partner"
  },
  {
    id: "15",
    donorName: "Margaret Taylor",
    currentQuadrant: "Acquaintance",
    whyNow: "Opened and shared newsletter on social media",
    recommendedMove: "Invite to upcoming donor appreciation event",
    estimatedImpact: "Medium",
    owner: "Sarah",
    transitionType: "acquaintance-to-colleague"
  },
  {
    id: "16",
    donorName: "Richard Anderson",
    currentQuadrant: "Colleague",
    whyNow: "Recently sold business for significant profit",
    recommendedMove: "Discuss stock gift or DAF contribution",
    estimatedImpact: "High",
    owner: "Maria",
    transitionType: "colleague-to-partner"
  },
  {
    id: "17",
    donorName: "Nancy Martinez",
    currentQuadrant: "Friend",
    whyNow: "Volunteered at three events this quarter",
    recommendedMove: "Offer board observer role",
    estimatedImpact: "Med-High",
    owner: "James",
    transitionType: "friend-to-partner"
  },
  {
    id: "18",
    donorName: "Thomas Jackson",
    currentQuadrant: "Acquaintance",
    whyNow: "Registered for upcoming gala",
    recommendedMove: "Personal welcome call before event",
    estimatedImpact: "Medium",
    owner: "Ben",
    transitionType: "acquaintance-to-colleague"
  },
  {
    id: "19",
    donorName: "Karen White",
    currentQuadrant: "Friend",
    whyNow: "Asked about impact of previous gifts",
    recommendedMove: "Schedule site visit to see programs",
    estimatedImpact: "High",
    owner: "Sarah",
    transitionType: "friend-to-partner"
  },
  {
    id: "20",
    donorName: "Charles Harris",
    currentQuadrant: "Colleague",
    whyNow: "Mentioned in conversation with board member",
    recommendedMove: "Arrange introduction to CEO",
    estimatedImpact: "Med-High",
    owner: "Maria",
    transitionType: "colleague-to-partner"
  },
  {
    id: "21",
    donorName: "Dorothy Clark",
    currentQuadrant: "Acquaintance",
    whyNow: "First-time donor last month",
    recommendedMove: "Send handwritten thank you note",
    estimatedImpact: "Medium",
    owner: "James",
    transitionType: "acquaintance-to-colleague"
  },
  {
    id: "22",
    donorName: "Joseph Lewis",
    currentQuadrant: "Friend",
    whyNow: "Company has new CSR initiative",
    recommendedMove: "Propose corporate partnership opportunity",
    estimatedImpact: "High",
    owner: "Ben",
    transitionType: "friend-to-partner"
  },
  {
    id: "23",
    donorName: "Betty Robinson",
    currentQuadrant: "Colleague",
    whyNow: "Upgraded giving level twice this year",
    recommendedMove: "Invite to major donor circle",
    estimatedImpact: "Med-High",
    owner: "Sarah",
    transitionType: "colleague-to-partner"
  },
  {
    id: "24",
    donorName: "Steven Walker",
    currentQuadrant: "Friend",
    whyNow: "Celebrating 10-year donor anniversary",
    recommendedMove: "Plan special recognition and ask",
    estimatedImpact: "High",
    owner: "Maria",
    transitionType: "friend-to-partner"
  },
  {
    id: "25",
    donorName: "Susan Hall",
    currentQuadrant: "Acquaintance",
    whyNow: "Responded positively to survey",
    recommendedMove: "Follow up with program information",
    estimatedImpact: "Medium",
    owner: "James",
    transitionType: "acquaintance-to-colleague"
  },
  {
    id: "26",
    donorName: "Edward Young",
    currentQuadrant: "Colleague",
    whyNow: "Professional connection to new board member",
    recommendedMove: "Request introduction through board",
    estimatedImpact: "Med-High",
    owner: "Ben",
    transitionType: "colleague-to-partner"
  },
  {
    id: "27",
    donorName: "Helen King",
    currentQuadrant: "Friend",
    whyNow: "Expressed interest in scholarship fund",
    recommendedMove: "Present named scholarship opportunity",
    estimatedImpact: "High",
    owner: "Sarah",
    transitionType: "friend-to-partner"
  },
  {
    id: "28",
    donorName: "George Wright",
    currentQuadrant: "Acquaintance",
    whyNow: "Referred by existing major donor",
    recommendedMove: "Schedule introduction meeting",
    estimatedImpact: "Medium",
    owner: "Maria",
    transitionType: "acquaintance-to-colleague"
  },
  {
    id: "29",
    donorName: "Barbara Lopez",
    currentQuadrant: "Friend",
    whyNow: "Recently mentioned estate planning",
    recommendedMove: "Connect with planned giving officer",
    estimatedImpact: "High",
    owner: "James",
    transitionType: "friend-to-partner"
  },
  {
    id: "30",
    donorName: "Kenneth Scott",
    currentQuadrant: "Colleague",
    whyNow: "Family foundation reviewing grant priorities",
    recommendedMove: "Submit grant proposal package",
    estimatedImpact: "Med-High",
    owner: "Ben",
    transitionType: "colleague-to-partner"
  }
];

export default function QuadrantTop10() {
  const [opportunityFilter, setOpportunityFilter] = useState<OpportunityFilter>("all");
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedOpportunity, setSelectedOpportunity] = useState<ActionableOpportunity | null>(null);

  const filteredOpportunities = mockOpportunities.filter(opp => {
    if (opportunityFilter === "all") return true;
    return opp.transitionType === opportunityFilter;
  });

  const visibleOpportunities = filteredOpportunities.slice(0, visibleCount);
  
  const guidance = selectedOpportunity ? getResponseGuidance(selectedOpportunity) : null;

  const getImpactStyle = (impact: string): { backgroundColor: string; color: string; borderColor: string } => {
    switch (impact) {
      case "High":
        return { backgroundColor: "#22c55e15", color: "#16a34a", borderColor: "#22c55e40" };
      case "Med-High":
        return { backgroundColor: "#84cc1615", color: "#65a30d", borderColor: "#84cc1640" };
      case "Medium":
        return { backgroundColor: "#eab30815", color: "#ca8a04", borderColor: "#eab30840" };
      case "Low":
        return { backgroundColor: "#ef444415", color: "#dc2626", borderColor: "#ef444440" };
      default:
        return { backgroundColor: "#71717a15", color: "#71717a", borderColor: "#71717a40" };
    }
  };

  const getQuadrantVariant = (_quadrant: string): "secondary" | "outline" | "default" => {
    return "secondary";
  };

  return (
    <Card className="border-0 shadow-none h-full flex flex-col">
      <CardHeader 
        className="p-6 pb-4 rounded-t-lg shrink-0"
        style={{ backgroundColor: "#395174" }}
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-white" />
            <div>
              <CardTitle className="text-white">TOP 10 ACTIONABLE OPPORTUNITIES</CardTitle>
              <CardDescription className="mt-1 text-white/80">
                Priority donor engagement opportunities based on scoring logic
              </CardDescription>
            </div>
          </div>
          <Select value={opportunityFilter} onValueChange={(value) => setOpportunityFilter(value as OpportunityFilter)}>
            <SelectTrigger className="w-56 bg-white/10 border-white/20 text-white" data-testid="select-opportunity-filter">
              <SelectValue placeholder="Filter opportunities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All quadrants</SelectItem>
              <SelectItem value="friend-to-partner">Friend → Partner</SelectItem>
              <SelectItem value="colleague-to-partner">Colleague → Partner</SelectItem>
              <SelectItem value="acquaintance-to-colleague">Acquaintance → Colleague</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden p-4">
        <div className="rounded-md border flex-1 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead>Current Quadrant</TableHead>
                <TableHead className="min-w-[250px]">Why Now</TableHead>
                <TableHead className="min-w-[250px]">Recommended Move</TableHead>
                <TableHead>Est. Impact</TableHead>
                <TableHead>Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOpportunities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No opportunities found for the selected filter
                  </TableCell>
                </TableRow>
              ) : (
                visibleOpportunities.map((opp) => (
                  <TableRow 
                    key={opp.id} 
                    data-testid={`row-opportunity-${opp.id}`}
                    className="cursor-pointer hover-elevate"
                    onClick={() => setSelectedOpportunity(opp)}
                  >
                    <TableCell className="font-medium">{opp.donorName}</TableCell>
                    <TableCell>
                      <Badge variant={getQuadrantVariant(opp.currentQuadrant)}>
                        {opp.currentQuadrant}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{opp.whyNow}</TableCell>
                    <TableCell className="text-sm">
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                        <span>{opp.recommendedMove}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        style={getImpactStyle(opp.estimatedImpact)}
                      >
                        {opp.estimatedImpact}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{opp.owner}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {visibleCount < filteredOpportunities.length && (
          <div className="flex justify-center mt-4 shrink-0">
            <Button 
              variant="outline" 
              onClick={() => setVisibleCount(prev => prev + 10)}
              className="gap-2"
              data-testid="button-show-more"
            >
              Show More
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        )}
        {visibleCount >= filteredOpportunities.length && filteredOpportunities.length > 10 && (
          <p className="text-center text-sm text-muted-foreground mt-4 shrink-0">
            Showing all {filteredOpportunities.length} opportunities
          </p>
        )}
      </CardContent>

      {/* Response Guidance Sheet */}
      <Sheet open={!!selectedOpportunity} onOpenChange={() => setSelectedOpportunity(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedOpportunity && guidance && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {selectedOpportunity.donorName}
                </SheetTitle>
                <SheetDescription>
                  Response guidance for {selectedOpportunity.currentQuadrant} → Partner transition
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                {/* Quick Context */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{selectedOpportunity.currentQuadrant}</Badge>
                  <Badge variant="outline" style={getImpactStyle(selectedOpportunity.estimatedImpact)}>
                    {selectedOpportunity.estimatedImpact} Impact
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <User className="h-3 w-3" />
                    {selectedOpportunity.owner}
                  </Badge>
                </div>

                {/* Why Now */}
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm">Why Now</span>
                  </div>
                  <p className="text-sm">{selectedOpportunity.whyNow}</p>
                </div>

                {/* Recommended Move */}
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm">Recommended Move</span>
                  </div>
                  <p className="text-sm font-medium">{selectedOpportunity.recommendedMove}</p>
                </div>

                <Separator />

                {/* Approach */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    <h4 className="font-semibold">Recommended Approach</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{guidance.approach}</p>
                </div>

                {/* Talking Points */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold">Key Talking Points</h4>
                  </div>
                  <ul className="space-y-2">
                    {guidance.talkingPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Email Template */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold">Email Template</h4>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border font-mono text-xs whitespace-pre-wrap">
                    {guidance.emailTemplate}
                  </div>
                  <Button variant="outline" size="sm" className="mt-2 gap-2" data-testid="button-copy-email">
                    <FileText className="h-3 w-3" />
                    Copy to Clipboard
                  </Button>
                </div>

                {/* Call Script */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold">Call Script</h4>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border font-mono text-xs whitespace-pre-wrap">
                    {guidance.callScript}
                  </div>
                </div>

                <Separator />

                {/* Timeline */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold">Timeline</h4>
                  </div>
                  <p className="text-sm">{guidance.timeline}</p>
                </div>

                {/* Success Metrics */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold">Success Metrics</h4>
                  </div>
                  <ul className="space-y-2">
                    {guidance.successMetrics.map((metric, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 gap-2" data-testid="button-schedule-call">
                    <Phone className="h-4 w-4" />
                    Schedule Call
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2" data-testid="button-draft-email">
                    <Mail className="h-4 w-4" />
                    Draft Email
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </Card>
  );
}
