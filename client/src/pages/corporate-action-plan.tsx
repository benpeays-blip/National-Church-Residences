import { useRoute, Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users, TrendingUp, MessageSquare, Coffee,
  ChevronLeft, Briefcase, DollarSign,
  Handshake, Award, PieChart, Presentation
} from "lucide-react";

type QuadrantType = 'partner' | 'volunteering' | 'donor' | 'acquaintance';

interface Corporation {
  id: string;
  name: string;
  domain: string;
  industry: string;
  description: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  totalContributions: number;
  employeeCount: number;
  volunteerHours: number;
  matchingGiftAmount: number;
  energy: number;
  structure: number;
  quadrant: QuadrantType;
  city: string;
  state: string;
}

const generateCorporations = (): Corporation[] => {
  const companies = [
    { name: "Acme Industries", domain: "acme.com", industry: "Manufacturing", city: "Columbus", state: "OH" },
    { name: "TechForward Solutions", domain: "techforward.com", industry: "Technology", city: "San Francisco", state: "CA" },
    { name: "Green Valley Bank", domain: "greenvalleybank.com", industry: "Financial Services", city: "Cleveland", state: "OH" },
    { name: "Midwest Healthcare Group", domain: "midwesthealthcare.org", industry: "Healthcare", city: "Cincinnati", state: "OH" },
    { name: "Cardinal Construction", domain: "cardinalconstruction.com", industry: "Construction", city: "Dayton", state: "OH" },
  ];

  return companies.map((company, index) => {
    const quadrants: QuadrantType[] = ['partner', 'volunteering', 'donor', 'acquaintance'];
    const quadrant = quadrants[index % 4];
    
    let energy: number, structure: number;
    switch (quadrant) {
      case 'partner':
        energy = 60 + Math.random() * 35;
        structure = 60 + Math.random() * 35;
        break;
      case 'volunteering':
        energy = 60 + Math.random() * 35;
        structure = 5 + Math.random() * 35;
        break;
      case 'donor':
        energy = 5 + Math.random() * 35;
        structure = 60 + Math.random() * 35;
        break;
      default:
        energy = 5 + Math.random() * 35;
        structure = 5 + Math.random() * 35;
    }

    return {
      id: `corp-${index + 1}`,
      name: company.name,
      domain: company.domain,
      industry: company.industry,
      description: `Leading ${company.industry.toLowerCase()} company based in ${company.city}, ${company.state}.`,
      contactName: ["Sarah Mitchell", "Michael Chen", "Jennifer Park", "David Williams", "Lisa Thompson"][index % 5],
      contactEmail: `contact@${company.domain}`,
      contactPhone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      totalContributions: Math.floor(Math.random() * 500000) + 10000,
      employeeCount: Math.floor(Math.random() * 5000) + 50,
      volunteerHours: Math.floor(Math.random() * 2000) + 100,
      matchingGiftAmount: Math.floor(Math.random() * 100000) + 5000,
      energy: Math.round(energy),
      structure: Math.round(structure),
      quadrant,
      city: company.city,
      state: company.state,
    };
  });
};

const corporations = generateCorporations();

const getQuadrantVariant = (quadrant: string): "default" | "secondary" | "outline" | "destructive" => {
  switch (quadrant) {
    case 'partner': return 'default';
    case 'volunteering': return 'secondary';
    case 'donor': return 'outline';
    case 'acquaintance': return 'outline';
    default: return 'outline';
  }
};

const getQuadrantLabel = (quadrant: string) => {
  return quadrant.charAt(0).toUpperCase() + quadrant.slice(1);
};

export default function CorporateActionPlan() {
  const [, params] = useRoute("/corporate-partnerships/:id/action-plan");
  const corpId = params?.id;

  const corporation = corporations.find(c => c.id === corpId) || corporations[0];
  const currentQuadrant = corporation?.quadrant || 'acquaintance';

  if (!corporation) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Corporation not found</p>
            <Link href="/quadrant?tab=corporate">
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

  const generatePhoneScript = () => {
    const greeting = currentQuadrant === 'acquaintance' 
      ? `introduce our organization and explore potential partnership opportunities`
      : `reconnect about our ongoing partnership and discuss expansion`;
    
    return `Hi ${corporation.contactName}, this is [Your Name] from National Church Residences. I wanted to reach out to ${greeting}.

National Church Residences is the nation's largest not-for-profit provider of affordable senior housing and services. We serve over 42,000 seniors across 25 states with housing, healthcare, and community programs.

${currentQuadrant === 'partner' ? `As one of our valued corporate partners, I'd love to discuss how we can deepen our collaboration in 2025. Your company's commitment to ${corporation.industry.toLowerCase()} excellence aligns perfectly with our mission.` : `I believe there's a natural alignment between ${corporation.name}'s values and our mission to serve seniors. I'd love to explore how we might partner together.`}

Would you have 20-30 minutes this week for a brief call to discuss? I'm also happy to meet at your offices if that's more convenient.`;
  };

  const generateEmailDraft = () => {
    return `Subject: Partnership Opportunity - National Church Residences & ${corporation.name}

Dear ${corporation.contactName},

I hope this message finds you well. I'm reaching out from National Church Residences because I believe there's a meaningful opportunity for partnership between our organizations.

${currentQuadrant === 'acquaintance' || currentQuadrant === 'volunteering' 
  ? `As a leader in the ${corporation.industry.toLowerCase()} sector, ${corporation.name} has demonstrated a commitment to community impact. Our mission of serving seniors through affordable housing and comprehensive services naturally aligns with companies that value social responsibility.`
  : `Your ongoing partnership has been instrumental in advancing our mission. ${corporation.name}'s contributions of $${corporation.totalContributions.toLocaleString()} and ${corporation.volunteerHours.toLocaleString()} volunteer hours have directly impacted thousands of seniors across Ohio.`}

I would welcome the opportunity to share more about our corporate partnership programs, which include:
• Employee volunteer opportunities at our senior communities
• Corporate giving and matching gift programs  
• Event sponsorship and naming opportunities
• Board and advisory council involvement

${currentQuadrant === 'partner' 
  ? `As a valued partner, I'd also like to discuss our upcoming capital campaign and exclusive leadership giving opportunities.`
  : `I'm confident we can design a partnership that aligns with ${corporation.name}'s CSR priorities and creates meaningful impact.`}

Would you be available for a brief call this week? I'm flexible and happy to work around your schedule.

Best regards,
[Your Name]
Corporate Partnerships Manager
National Church Residences
[Phone] | [Email]`;
  };

  const generateProposalOutline = () => {
    return `CORPORATE PARTNERSHIP PROPOSAL
${corporation.name} + National Church Residences

EXECUTIVE SUMMARY
A strategic partnership opportunity to advance ${corporation.name}'s social impact goals while supporting affordable senior housing and services for 42,000+ seniors across 25 states.

PARTNERSHIP TIERS

🥉 COMMUNITY PARTNER ($10,000 - $24,999)
• Logo recognition on community events
• Quarterly impact reports
• 2 employee volunteer days
• Social media acknowledgment

🥈 MISSION PARTNER ($25,000 - $49,999)
• All Community Partner benefits
• Named volunteer program
• Executive site visit and tour
• Event table at annual gala
• Newsletter feature story

🥇 STRATEGIC PARTNER ($50,000 - $99,999)
• All Mission Partner benefits
• Advisory council invitation
• Customized impact metrics dashboard
• Co-branded marketing opportunities
• Priority employee engagement programs

💎 LEADERSHIP PARTNER ($100,000+)
• All Strategic Partner benefits
• Board member introduction dinner
• Naming opportunity (program or space)
• CEO-level relationship management
• Exclusive leadership circle events

RECOMMENDED TIER FOR ${corporation.name.toUpperCase()}:
${currentQuadrant === 'partner' ? 'Leadership Partner' : currentQuadrant === 'donor' ? 'Strategic Partner' : 'Mission Partner'}

Based on ${corporation.name}'s ${corporation.industry.toLowerCase()} presence and employee base of ${corporation.employeeCount.toLocaleString()}, we recommend starting with [TIER] and building toward Leadership Partner status over 2-3 years.

NEXT STEPS
1. Schedule executive presentation
2. Customize partnership package
3. Identify employee champions
4. Launch pilot volunteer event`;
  };

  const generateMeetingAgenda = () => {
    return `MEETING PREP: ${corporation.name}
Contact: ${corporation.contactName}

Location: [Suggested: ${corporation.name} headquarters or neutral executive venue]
Duration: 45-60 minutes

PRE-MEETING RESEARCH:
• Review ${corporation.name}'s recent CSR initiatives
• Check for ${corporation.industry} sector giving trends
• Identify potential employee volunteer interests
• Research matching gift policies

CONVERSATION STARTERS:
• Ask about their current community partnerships
• Discuss ${corporation.industry} sector challenges and opportunities
• Share the story of a senior impacted by corporate partnerships

KEY TALKING POINTS:
1. Express appreciation for ${currentQuadrant === 'partner' ? 'their leadership partnership' : 'taking the meeting'}
2. Present 2-3 partnership models that align with their priorities
3. Share ROI data from similar corporate partnerships
4. Listen for signals about budget cycles and decision-making

${currentQuadrant !== 'partner' ? `CULTIVATION OPPORTUNITY:
• Invite to upcoming corporate partner breakfast (March 15)
• Offer complimentary employee volunteer day
• Propose pilot matching gift campaign` : `STEWARDSHIP OPPORTUNITY:
• Discuss multi-year partnership agreement
• Present naming opportunity for new community
• Explore employee giving campaign expansion`}

FOLLOW-UP COMMITMENTS:
[ ] Send customized proposal within 48 hours
[ ] Connect with their CSR/HR team for volunteer coordination
[ ] Schedule follow-up call within 2 weeks
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
          title: "Executive Introduction Call",
          description: "Connect with CSR/community relations decision-maker",
          priority: "High",
          estimatedTime: "20-30 min",
          script: generatePhoneScript(),
        }
      ]
    },
    {
      week: "Week 2",
      phase: "Present Value Proposition",
      icon: Presentation,
      actions: [
        {
          type: "meeting",
          title: "Executive Partnership Presentation",
          description: "In-person or virtual presentation of partnership opportunities",
          priority: "High",
          estimatedTime: "45-60 min",
          script: generateMeetingAgenda(),
        },
        {
          type: "email",
          title: "Post-Meeting Follow-Up",
          description: "Send partnership proposal and next steps",
          priority: "High",
          estimatedTime: "15 min",
          script: generateEmailDraft(),
        }
      ]
    },
    {
      week: "Week 3-4",
      phase: "Proposal Development",
      icon: FileText,
      actions: [
        {
          type: "proposal",
          title: "Customized Partnership Proposal",
          description: "Develop tailored partnership package based on meeting insights",
          priority: "High",
          estimatedTime: "2-3 hours",
          script: generateProposalOutline(),
        }
      ]
    },
    {
      week: "Week 5-6",
      phase: "Engagement Experience",
      icon: Users,
      actions: [
        {
          type: "event",
          title: "Employee Volunteer Day",
          description: "Host pilot volunteer event to demonstrate partnership value",
          priority: "Medium",
          estimatedTime: "Half day",
          script: `VOLUNTEER EVENT PLANNING

EVENT: ${corporation.name} Employee Volunteer Day
DATE: [Proposed Date]
LOCATION: [Nearest NCR Community]
PARTICIPANTS: 15-25 employees

SCHEDULE:
9:00 AM - Welcome & Mission Overview
9:30 AM - Community Tour
10:00 AM - Volunteer Activities Begin
  • Garden beautification
  • Technology assistance for seniors
  • Activity program support
  • Meal service assistance
12:00 PM - Lunch with residents
1:00 PM - Reflection & Impact Discussion
1:30 PM - Group photo & recognition
2:00 PM - Wrap-up & departure

MATERIALS NEEDED:
[ ] NCR t-shirts for volunteers
[ ] Photo release forms
[ ] Impact statistics handouts
[ ] Thank you certificates
[ ] Social media coordination

POST-EVENT:
• Send thank you email with photos within 24 hours
• Share impact metrics (seniors served, hours contributed)
• Gather employee feedback surveys
• Schedule follow-up call with corporate contact`,
        }
      ]
    },
    {
      week: "Week 7-8",
      phase: "Partnership Ask",
      icon: Handshake,
      actions: [
        {
          type: "meeting",
          title: currentQuadrant === 'partner' 
            ? "Leadership Partnership Renewal"
            : "Partnership Commitment Meeting",
          description: currentQuadrant === 'partner'
            ? "Discuss multi-year agreement and expanded partnership"
            : "Present formal partnership proposal and request commitment",
          priority: "High",
          estimatedTime: "45-60 min",
          script: `PARTNERSHIP ASK TALKING POINTS

Opening: "Thank you for the opportunity to explore this partnership, ${corporation.contactName}. After our conversations and the volunteer event, I'm confident we can create something truly impactful together."

${currentQuadrant === 'partner' ? `
Bridge to Ask: "As one of our most valued partners, ${corporation.name}'s contributions have made a real difference. I want to discuss how we can build on this success with a multi-year strategic partnership."

The Ask: "We're proposing a three-year Leadership Partnership at $${Math.round(corporation.totalContributions * 1.5).toLocaleString()} annually, which would include [naming opportunity], expanded employee engagement, and a seat on our Corporate Advisory Council."
` : `
Bridge to Ask: "Based on what I've learned about ${corporation.name}'s commitment to community impact, I believe a partnership at the ${corporation.totalContributions > 50000 ? 'Strategic' : 'Mission'} Partner level would be a great fit."

The Ask: "We're proposing an annual partnership of $${corporation.totalContributions > 50000 ? '50,000' : '25,000'}, which includes [specific benefits]. This investment would directly impact over ${Math.floor(corporation.employeeCount / 10)} seniors in the Columbus area."
`}

ROI POINTS:
• Employee engagement and satisfaction
• Community visibility and brand alignment
• Tax benefits and matching gift optimization
• Measurable social impact metrics

Handling Response:
• If yes: Confirm next steps, timeline, and point of contact
• If maybe: Offer phased approach or pilot program
• If no: Thank them sincerely, explore smaller engagement

Close: "Whatever you decide, I appreciate ${corporation.name}'s consideration. Our door is always open for future collaboration."`,
        }
      ]
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <Link href="/quadrant?tab=corporate">
        <Button variant="ghost" size="sm" data-testid="button-back">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Corporate Quadrant
        </Button>
      </Link>

      <Card className="overflow-hidden" data-testid="card-action-plan-header">
        <div 
          className="p-6"
          style={{ backgroundColor: "rgba(14, 165, 233, 0.1)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-sky-500" />
            <Badge className="text-xs bg-sky-500">AI-Generated Action Plan</Badge>
          </div>
          <h1 className="text-3xl font-bold" data-testid="text-action-plan-title">
            Partner Pathway for {corporation.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            An 8-week cultivation strategy to move from {getQuadrantLabel(currentQuadrant)} to Partner
          </p>
        </div>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-sky-500/20">
                <AvatarFallback className="bg-sky-100 text-sky-700 text-lg font-semibold">
                  {corporation.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-lg">{corporation.name}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Briefcase className="w-4 h-4" />
                  <span>{corporation.industry}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={getQuadrantVariant(currentQuadrant)} className="bg-sky-100 text-sky-700">
                    Current: {getQuadrantLabel(currentQuadrant)}
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <Badge className="bg-sky-500">
                    Goal: Partner
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-4 gap-4 ml-6">
              <div className="text-center p-3 rounded-lg bg-sky-50 dark:bg-sky-950/20">
                <p className="text-2xl font-bold text-sky-600">
                  ${corporation.totalContributions.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Total Contributions</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-sky-50 dark:bg-sky-950/20">
                <p className="text-2xl font-bold text-sky-600">{corporation.volunteerHours.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Volunteer Hours</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-sky-50 dark:bg-sky-950/20">
                <p className="text-2xl font-bold text-sky-600">
                  {corporation.employeeCount.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Employees</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-sky-50 dark:bg-sky-950/20">
                <p className="text-2xl font-bold text-sky-600">
                  ${corporation.matchingGiftAmount.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Match Potential</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Journey to Partner</span>
              <span className="text-sm text-muted-foreground">
                {currentQuadrant === 'partner' ? '100%' : 
                 currentQuadrant === 'donor' ? '60%' :
                 currentQuadrant === 'volunteering' ? '40%' : '20%'} complete
              </span>
            </div>
            <Progress 
              value={
                currentQuadrant === 'partner' ? 100 : 
                currentQuadrant === 'donor' ? 60 :
                currentQuadrant === 'volunteering' ? 40 : 20
              } 
              className="h-2"
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Acquaintance</span>
              <span>Volunteering</span>
              <span>Donor</span>
              <span>Partner</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-sky-500" />
          8-Week Corporate Partnership Plan
        </h2>

        {actionSteps.map((phase, phaseIdx) => {
          const PhaseIcon = phase.icon;
          return (
            <Card key={phaseIdx} data-testid={`card-phase-${phaseIdx}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-950/30 flex items-center justify-center">
                    <PhaseIcon className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1 border-sky-200 text-sky-700">{phase.week}</Badge>
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
                          <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-950/30 flex items-center justify-center">
                            {action.type === 'call' && <Phone className="w-4 h-4 text-sky-600" />}
                            {action.type === 'email' && <Mail className="w-4 h-4 text-sky-600" />}
                            {action.type === 'meeting' && <Coffee className="w-4 h-4 text-sky-600" />}
                            {action.type === 'proposal' && <FileText className="w-4 h-4 text-sky-600" />}
                            {action.type === 'event' && <Users className="w-4 h-4 text-sky-600" />}
                          </div>
                          <div>
                            <h4 className="font-semibold">{action.title}</h4>
                            <p className="text-sm text-muted-foreground">{action.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={action.priority === 'High' ? 'default' : 'secondary'} className={action.priority === 'High' ? 'bg-sky-500' : ''}>
                            {action.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {action.estimatedTime}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-background">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-sky-500" />
                        <span className="text-sm font-medium">
                          AI-Generated {action.type === 'call' ? 'Script' : action.type === 'meeting' ? 'Agenda' : action.type === 'proposal' ? 'Outline' : action.type === 'event' ? 'Plan' : 'Draft'}
                        </span>
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
                          <Button size="sm" className="bg-sky-500 hover:bg-sky-600">
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-sky-500" />
            Partnership Success Metrics
          </CardTitle>
          <CardDescription>
            Track progress toward Partner status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg border text-center">
              <DollarSign className="w-8 h-8 text-sky-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Annual Giving</p>
              <p className="text-xs text-muted-foreground mt-1">Target: $50,000+</p>
            </div>
            <div className="p-4 rounded-lg border text-center">
              <Users className="w-8 h-8 text-sky-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Volunteer Events</p>
              <p className="text-xs text-muted-foreground mt-1">Target: 4+ per year</p>
            </div>
            <div className="p-4 rounded-lg border text-center">
              <Award className="w-8 h-8 text-sky-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Executive Engagement</p>
              <p className="text-xs text-muted-foreground mt-1">Target: C-suite sponsor</p>
            </div>
            <div className="p-4 rounded-lg border text-center">
              <PieChart className="w-8 h-8 text-sky-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Multi-Year Commit</p>
              <p className="text-xs text-muted-foreground mt-1">Target: 3-year agreement</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
