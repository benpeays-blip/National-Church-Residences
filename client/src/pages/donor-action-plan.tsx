import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Clock, ArrowRight, Sparkles, Target,
  Award, ChevronLeft
} from "lucide-react";
import type { Person } from "@shared/schema";

interface DonorData {
  person: Person;
  totalGiving: number;
  giftCount: number;
  lastGiftDate: string | null;
  avgGiftSize: number;
  firstGiftDate: string | null;
  daysSinceLastGift: number;
  giftFrequency: number;
}

interface QuadrantDonor {
  id: string;
  firstName: string;
  lastName: string;
  primaryEmail: string | null;
  primaryPhone: string | null;
  organizationName: string | null;
  totalLifetimeGiving: string | null;
  giftCount: number;
  yearsAsDonor: number;
  status: 'ACTIVE' | 'INACTIVE';
  badges: string[];
  bio: string;
  energy: number;
  structure: number;
  quadrant: 'partner' | 'friend' | 'colleague' | 'acquaintance';
  capacityScore: number | null;
  engagementScore: number | null;
  affinityScore: number | null;
}

interface QuadrantData {
  donors: QuadrantDonor[];
}

const getQuadrantVariant = (quadrant: string): "default" | "secondary" | "outline" | "destructive" => {
  switch (quadrant) {
    case 'partner': return 'default';
    case 'friend': return 'secondary';
    case 'colleague': return 'outline';
    case 'acquaintance': return 'outline';
    default: return 'outline';
  }
};

const getQuadrantLabel = (quadrant: string) => {
  return quadrant.charAt(0).toUpperCase() + quadrant.slice(1);
};

export default function DonorActionPlan() {
  const [, params] = useRoute("/donors/:id/action-plan");
  const donorId = params?.id;

  const { data: donorData, isLoading: loadingDonor } = useQuery<DonorData>({
    queryKey: ["/api/donors", donorId],
    enabled: !!donorId,
  });

  const { data: quadrantData } = useQuery<QuadrantData>({
    queryKey: ["/api/donors/quadrant"],
  });

  const quadrantDonor = quadrantData?.donors.find(d => d.id === donorId);
  const currentQuadrant = quadrantDonor?.quadrant || 'acquaintance';

  if (loadingDonor) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!donorData?.person) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Donor not found</p>
            <Link href="/quadrant">
              <Button variant="outline" className="mt-4">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { person } = donorData;
  const fullName = `${person.firstName} ${person.lastName}`;

  const generatePhoneScript = () => {
    const greeting = currentQuadrant === 'acquaintance' 
      ? `introduce yourself and thank them for their past support`
      : `reconnect and share recent mission updates`;
    
    return `Hi ${person.firstName}, this is [Your Name] from National Church Residences. I wanted to take a moment to ${greeting}. 

I've been reflecting on the incredible impact our supporters like you have made this year. Your generosity has helped us serve over 42,000 seniors across 25 states.

${currentQuadrant === 'partner' ? `As one of our valued partners, I'd love to discuss some exciting initiatives we have planned for 2025 and explore how you might want to be involved at a deeper level.` : `I'd love to learn more about what inspires you about our mission and share some stories of the lives you've helped transform.`}

Would you have 15-20 minutes this week or next for a brief call? I'd also be happy to meet in person if that works better for your schedule.`;
  };

  const generateEmailDraft = () => {
    return `Subject: A Personal Thank You & Invitation, ${person.firstName}

Dear ${person.firstName},

I hope this message finds you well. I'm reaching out personally because your support of National Church Residences has made a real difference in the lives of seniors we serve.

${currentQuadrant === 'acquaintance' || currentQuadrant === 'colleague' 
  ? `Over the past year, supporters like you have helped us provide affordable housing, healthcare services, and community programs to thousands of seniors who might otherwise be living in isolation or without adequate care.`
  : `Your ongoing partnership has been instrumental in our mission. This year alone, we've been able to expand our services to three new communities, directly impacting over 1,200 additional seniors.`}

I would be honored to share more about our upcoming initiatives and learn about what aspects of our work resonate most with you. Understanding your vision for creating meaningful change helps us become better stewards of your generosity.

${currentQuadrant === 'partner' 
  ? `As a valued partner, I'd also like to invite you to an exclusive behind-the-scenes tour of our newest facility, followed by dinner with our leadership team.`
  : `I'd love to invite you to visit one of our communities to see firsthand the impact of your support.`}

Would you be available for a brief call this week? I'm flexible and happy to work around your schedule.

With gratitude,
[Your Name]
Major Gifts Officer
National Church Residences
[Phone] | [Email]`;
  };

  const generateMailPiece = () => {
    return `Dear ${person.firstName},

As the seasons change, I find myself reflecting on the people who make our mission possible. You are among that special group.

Your support of National Church Residences isn't just a gift—it's a statement that every senior deserves to age with dignity, purpose, and connection.

${currentQuadrant === 'partner' 
  ? `I'm enclosing our annual Impact Report, which highlights many of the initiatives your leadership-level giving has made possible. On page 12, you'll find a feature on the Thompson Family Wellness Center—a project that wouldn't exist without visionary supporters like you.`
  : `I'm enclosing a small photo book featuring some of the seniors whose lives have been touched by donors like you. These are real stories of hope, resilience, and community.`}

I would be honored to meet with you in the coming weeks to share more about our vision for 2025 and beyond. No ask, no pressure—just a genuine desire to connect and express our gratitude in person.

Please feel free to reach me directly at [Phone] or simply reply to this letter with a time that works for you.

With deepest appreciation,

[Your Name]
Major Gifts Officer

P.S. Enclosed you'll also find a personalized donor recognition certificate celebrating your ${donorData.giftCount > 1 ? `${donorData.giftCount} gifts` : 'generous support'} to our mission.`;
  };

  const generateMeetingAgenda = () => {
    return `MEETING PREP: ${fullName}

Location: [Suggested: Coffee at The Capital Grille or donor's preferred location]
Duration: 45-60 minutes

CONVERSATION STARTERS:
• Ask about their connection to senior care/housing (family experience?)
• Discuss their philanthropic priorities for the coming year
• Share the story of Margaret, age 89, whose life was transformed by our programs

KEY TALKING POINTS:
1. Express genuine gratitude for their ${currentQuadrant === 'partner' ? 'leadership-level' : ''} support
2. Share 2-3 specific impact stories that align with their interests
3. Provide updates on new programs and expansion plans
4. Listen for signals about increased involvement

${currentQuadrant !== 'partner' ? `CULTIVATION OPPORTUNITY:
Consider inviting them to:
• Upcoming board member meet-and-greet (April 15)
• Annual Gala sponsor preview event (May 3)
• Private community tour with CEO` : `STEWARDSHIP OPPORTUNITY:
• Present legacy giving brochure if appropriate
• Discuss naming opportunities for upcoming capital campaign
• Explore board involvement or advisory council participation`}

FOLLOW-UP COMMITMENTS:
[ ] Send handwritten thank you note within 24 hours
[ ] Email promised materials within 48 hours
[ ] Schedule next touch within 30 days
[ ] Update CRM with meeting notes and next steps`;
  };

  const actionSteps = [
    {
      week: "Week 1",
      phase: "Initial Outreach",
      icon: Phone,
      actions: [
        {
          type: "call",
          title: "Personal Phone Call",
          description: "Warm reconnection call to establish rapport and schedule a meeting",
          priority: "High",
          estimatedTime: "15-20 min",
          script: generatePhoneScript(),
        }
      ]
    },
    {
      week: "Week 2",
      phase: "Deepen Connection",
      icon: Coffee,
      actions: [
        {
          type: "meeting",
          title: "In-Person Coffee Meeting",
          description: "Face-to-face conversation to understand their philanthropic vision",
          priority: "High",
          estimatedTime: "45-60 min",
          script: generateMeetingAgenda(),
        },
        {
          type: "email",
          title: "Post-Meeting Follow-Up Email",
          description: "Thank them for the meeting and summarize key discussion points",
          priority: "Medium",
          estimatedTime: "10 min",
          script: generateEmailDraft(),
        }
      ]
    },
    {
      week: "Week 3-4",
      phase: "Meaningful Touch",
      icon: Gift,
      actions: [
        {
          type: "mail",
          title: "Personalized Mail Package",
          description: "Handwritten note with impact report and personalized recognition",
          priority: "Medium",
          estimatedTime: "20 min",
          script: generateMailPiece(),
        }
      ]
    },
    {
      week: "Week 5-6",
      phase: "Strategic Invitation",
      icon: Users,
      actions: [
        {
          type: "email",
          title: "Exclusive Event Invitation",
          description: currentQuadrant === 'partner' 
            ? "Invite to board member reception or leadership circle dinner"
            : "Invite to community tour or donor appreciation event",
          priority: "Medium",
          estimatedTime: "10 min",
          script: `Subject: You're Invited: ${currentQuadrant === 'partner' ? 'Leadership Circle Dinner' : 'Exclusive Community Tour'}

Dear ${person.firstName},

Following our recent conversation, I wanted to extend a personal invitation to ${currentQuadrant === 'partner' 
  ? `our Leadership Circle Dinner on [Date]. This intimate gathering brings together our most dedicated supporters for an evening of meaningful connection and conversation about the future of senior care.`
  : `a private tour of our newest community on [Date]. You'll have the opportunity to meet residents, see our programs in action, and connect with other supporters who share your passion for our mission.`}

${currentQuadrant === 'partner' 
  ? `You'll have the opportunity to dine with our CEO and Board Chair, and preview our strategic vision for the next decade.`
  : `Light refreshments will be served, and our Executive Director will share exciting updates about our expansion plans.`}

Would you be able to join us? Please let me know by [RSVP Date].

Warmly,
[Your Name]`,
        }
      ]
    },
    {
      week: "Week 8",
      phase: "Cultivation Ask",
      icon: Target,
      actions: [
        {
          type: "meeting",
          title: currentQuadrant === 'partner' 
            ? "Leadership Gift Conversation"
            : "Upgrade Conversation",
          description: currentQuadrant === 'partner'
            ? "Discuss major gift or legacy giving opportunity"
            : "Present opportunity for increased involvement and giving",
          priority: "High",
          estimatedTime: "45-60 min",
          script: `CULTIVATION ASK TALKING POINTS:

Opening: "Thank you for taking the time to meet again, ${person.firstName}. Our recent conversations have meant so much to me, and I believe you've seen firsthand the impact we're making together."

${currentQuadrant === 'partner' ? `
Bridge to Ask: "As one of our most valued partners, I wanted to share an exciting opportunity. We're launching a capital campaign to expand our services to three new communities. Based on our conversations about your passion for [their specific interest], I believe this could be deeply meaningful to you."

The Ask: "Would you consider a leadership gift of $[Amount] over three years? This would place you among our founding supporters of this initiative and include [specific recognition opportunity]."
` : `
Bridge to Ask: "I've loved learning about your connection to our mission. Based on what you've shared about [their specific interest], I believe there's an opportunity to deepen your impact."

The Ask: "Would you consider increasing your annual support to $[Amount]? At this level, you would join our [Giving Circle Name], which includes [specific benefits]."
`}

Handling Response:
• If yes: Express gratitude, confirm next steps, timeline for gift
• If maybe: Acknowledge, offer more information, schedule follow-up
• If no: Thank them sincerely, ask what might make sense in the future

Close: "Regardless of what you decide, I want you to know how grateful we are for your partnership. You're making a real difference."`,
        }
      ]
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Back Button */}
      <Link href="/quadrant">
        <Button variant="ghost" size="sm" data-testid="button-back">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
      </Link>

      {/* Header */}
      <Card className="overflow-hidden" data-testid="card-action-plan-header">
        <div 
          className="p-6"
          style={{ backgroundColor: "rgba(222, 235, 247, 0.5)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <Badge variant="default" className="text-xs">AI-Generated Action Plan</Badge>
          </div>
          <h1 className="text-3xl font-bold" data-testid="text-action-plan-title">
            Partner Pathway for {fullName}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            A personalized 8-week cultivation strategy to move from {getQuadrantLabel(currentQuadrant)} to Partner
          </p>
        </div>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            {/* Donor Summary */}
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-primary/10">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                  {person.firstName[0]}{person.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-lg">{fullName}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={getQuadrantVariant(currentQuadrant)}>
                    Current: {getQuadrantLabel(currentQuadrant)}
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <Badge variant="default">
                    Goal: Partner
                  </Badge>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex-1 grid grid-cols-4 gap-4 ml-6">
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <p className="text-2xl font-bold text-primary">
                  ${(donorData.totalGiving || 0).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Lifetime Giving</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <p className="text-2xl font-bold text-primary">{donorData.giftCount || 12}</p>
                <p className="text-xs text-muted-foreground">Total Gifts</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <p className="text-2xl font-bold text-primary">
                  {quadrantDonor?.engagementScore || 72}
                </p>
                <p className="text-xs text-muted-foreground">Engagement Score</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <p className="text-2xl font-bold text-primary">
                  {quadrantDonor?.capacityScore || 85}
                </p>
                <p className="text-xs text-muted-foreground">Capacity Score</p>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Journey to Partner</span>
              <span className="text-sm text-muted-foreground">
                {currentQuadrant === 'partner' ? '100%' : 
                 currentQuadrant === 'colleague' ? '60%' :
                 currentQuadrant === 'friend' ? '40%' : '20%'} complete
              </span>
            </div>
            <Progress 
              value={
                currentQuadrant === 'partner' ? 100 : 
                currentQuadrant === 'colleague' ? 60 :
                currentQuadrant === 'friend' ? 40 : 20
              } 
              className="h-2"
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Acquaintance</span>
              <span>Friend</span>
              <span>Colleague</span>
              <span>Partner</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Plan Timeline */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          8-Week Action Plan
        </h2>

        {actionSteps.map((phase, phaseIdx) => {
          const PhaseIcon = phase.icon;
          return (
            <Card key={phaseIdx} data-testid={`card-phase-${phaseIdx}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <PhaseIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1">{phase.week}</Badge>
                    <CardTitle className="text-lg">{phase.phase}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {phase.actions.map((action, actionIdx) => (
                  <div 
                    key={actionIdx}
                    className="border rounded-lg overflow-hidden"
                    data-testid={`action-${phaseIdx}-${actionIdx}`}
                  >
                    <div className="p-4 bg-muted/20">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {action.type === 'call' && <Phone className="w-4 h-4 text-primary" />}
                            {action.type === 'email' && <Mail className="w-4 h-4 text-primary" />}
                            {action.type === 'meeting' && <Coffee className="w-4 h-4 text-primary" />}
                            {action.type === 'mail' && <FileText className="w-4 h-4 text-primary" />}
                          </div>
                          <div>
                            <h4 className="font-semibold">{action.title}</h4>
                            <p className="text-sm text-muted-foreground">{action.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={action.priority === 'High' ? 'default' : 'secondary'}>
                            {action.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {action.estimatedTime}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {/* Generated Content */}
                    <div className="p-4 bg-background">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">AI-Generated {action.type === 'call' ? 'Script' : action.type === 'meeting' ? 'Agenda' : 'Draft'}</span>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-4 text-sm whitespace-pre-wrap font-mono text-muted-foreground max-h-64 overflow-y-auto">
                        {action.script}
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Button size="sm" variant="outline" data-testid={`button-copy-${phaseIdx}-${actionIdx}`}>
                          <FileText className="w-4 h-4 mr-1" />
                          Copy to Clipboard
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Customize
                        </Button>
                        {action.type === 'email' && (
                          <Button size="sm">
                            <Send className="w-4 h-4 mr-1" />
                            Send Email
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Success Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Success Metrics & Milestones
          </CardTitle>
          <CardDescription>
            Track progress toward Partner status with these key indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <p className="font-semibold">Personal Call</p>
              <p className="text-xs text-muted-foreground">Complete by Week 1</p>
              <Badge variant="outline" className="mt-2">
                <Clock className="w-3 h-3 mr-1" />
                Pending
              </Badge>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2">
                <Coffee className="w-6 h-6 text-amber-600" />
              </div>
              <p className="font-semibold">In-Person Meeting</p>
              <p className="text-xs text-muted-foreground">Complete by Week 2</p>
              <Badge variant="outline" className="mt-2">
                <Clock className="w-3 h-3 mr-1" />
                Pending
              </Badge>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                <Gift className="w-6 h-6 text-purple-600" />
              </div>
              <p className="font-semibold">Meaningful Touch</p>
              <p className="text-xs text-muted-foreground">Complete by Week 4</p>
              <Badge variant="outline" className="mt-2">
                <Clock className="w-3 h-3 mr-1" />
                Pending
              </Badge>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <p className="font-semibold">Partner Status</p>
              <p className="text-xs text-muted-foreground">Target: Week 8</p>
              <Badge variant="outline" className="mt-2">
                <Target className="w-3 h-3 mr-1" />
                Goal
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
