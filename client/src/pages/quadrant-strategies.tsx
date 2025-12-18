import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Award, 
  Lightbulb,
  Heart,
  Users,
  Calendar,
  MessageSquare,
  Target,
  Sparkles,
  Gift,
  UserPlus,
  Eye,
  Mail,
  Video,
  Handshake,
  Star,
  Crown,
  TrendingUp,
  Zap
} from 'lucide-react';

interface StrategyStep {
  number: number;
  title: string;
  description: string;
  details?: string[];
  icon: any;
  tip?: string;
}

const acquaintanceSteps: StrategyStep[] = [
  {
    number: 1,
    title: "Acknowledge their gift personally",
    description: "Humanize the relationship. Acquaintances become friends when they feel seen.",
    icon: Heart,
    tip: "Send within 48 hours of gift receipt"
  },
  {
    number: 2,
    title: "Invite them into light-touch structure",
    description: "Create opportunities for gentle engagement without overwhelming.",
    details: [
      "Short update email with a personal note",
      "Quick \"behind the scenes\" story",
      "Low-commitment survey (\"Which part of our mission matters most to you?\")"
    ],
    icon: Mail
  },
  {
    number: 3,
    title: "Place them in a predictable cadence",
    description: "Consistent touchpoints build trust and familiarity.",
    details: [
      "Quarterly impact summaries",
      "Personalized content based on interest"
    ],
    icon: Calendar
  },
  {
    number: 4,
    title: "Offer a micro-commitment",
    description: "Small asks lead to deeper engagement over time.",
    details: [
      "RSVP for a 15-minute virtual update",
      "Join a small group tour",
      "Attend an info session"
    ],
    icon: UserPlus
  },
  {
    number: 5,
    title: "Identify affinity signals",
    description: "Watch for interest indicators that suggest readiness to advance.",
    icon: Eye,
    tip: "Once they show interest, move them to \"Friend\""
  },
  {
    number: 6,
    title: "Bridge to higher-touch conversation",
    description: "Create a natural transition to deeper engagement.",
    icon: MessageSquare,
    tip: "\"I noticed your interest in ___. Could we share a short update with you?\""
  }
];

const friendSteps: StrategyStep[] = [
  {
    number: 1,
    title: "Convert relational warmth into a plan",
    description: "Channel the emotional connection toward structured partnership.",
    icon: Target,
    tip: "\"You've been close to our story — I'd love to explore what meaningful partnership might look like.\""
  },
  {
    number: 2,
    title: "Introduce cadence",
    description: "Transform spontaneous connection into predictable engagement.",
    details: [
      "Calendar the next touchpoint before ending the current one",
      "Move from spontaneous connection → predictable engagement"
    ],
    icon: Calendar
  },
  {
    number: 3,
    title: "Give them a role or responsibility",
    description: "Friends become partners when they feel needed, not just liked.",
    details: [
      "Host a small gathering",
      "Join a vision preview",
      "Help shape a project"
    ],
    icon: Users
  },
  {
    number: 4,
    title: "Present specific investment opportunities",
    description: "Friends respond to emotion; partners respond to clarity.",
    icon: Gift,
    tip: "Give them something concrete to own"
  },
  {
    number: 5,
    title: "Create a vision conversation",
    description: "Connect their passion to your strategic direction.",
    details: [
      "Invite them into the \"why now\" and the long-term plan",
      "Connect their passion to a strategic initiative"
    ],
    icon: Sparkles
  }
];

const colleagueSteps: StrategyStep[] = [
  {
    number: 1,
    title: "Move from impersonal to personal",
    description: "Add warmth to the existing structured relationship.",
    details: [
      "Send a personalized update tied to their giving history",
      "Invite them to a short thank-you call"
    ],
    icon: Heart
  },
  {
    number: 2,
    title: "Show them the meaning behind the structure",
    description: "Give emotional significance to their pattern.",
    icon: Lightbulb,
    tip: "\"Your automated monthly gift has helped…\""
  },
  {
    number: 3,
    title: "Offer deeper insight and stories",
    description: "Connect data to human impact through storytelling.",
    details: [
      "Video updates",
      "Program leader testimonials",
      "Real-life transformation stories"
    ],
    icon: Video
  },
  {
    number: 4,
    title: "Personal invitation to a higher-value opportunity",
    description: "Colleagues respond to system integrity, so show how a major gift fits.",
    details: [
      "Multi-year vision",
      "Strategic initiative",
      "Campaign involvement"
    ],
    icon: TrendingUp
  },
  {
    number: 5,
    title: "Bridge them to relational connection",
    description: "Create opportunities for personal relationship building.",
    details: [
      "Introduce them to a key leader",
      "Invite them to smaller gatherings where partnership feels natural"
    ],
    icon: Handshake
  }
];

const partnerSteps: StrategyStep[] = [
  {
    number: 1,
    title: "Maintain regular, meaningful communication",
    description: "Consistent engagement sustains the partnership.",
    details: [
      "Provide quarterly impact reports with personalized insights",
      "Share behind-the-scenes updates and strategic decisions",
      "Schedule regular check-ins and vision conversations"
    ],
    icon: MessageSquare
  },
  {
    number: 2,
    title: "Deepen their involvement",
    description: "Create opportunities for greater ownership and influence.",
    details: [
      "Invite to strategic planning sessions",
      "Offer board or advisory committee opportunities",
      "Create co-ownership of specific initiatives"
    ],
    icon: Users
  },
  {
    number: 3,
    title: "Honor their partnership publicly and privately",
    description: "Recognition reinforces commitment and belonging.",
    details: [
      "Recognition events and acknowledgments",
      "Personal thank-you from leadership",
      "Share stories of impact enabled by their partnership"
    ],
    icon: Award
  },
  {
    number: 4,
    title: "Provide exclusive access and insight",
    description: "VIP treatment demonstrates their special status.",
    details: [
      "VIP tours and program visits",
      "Direct access to executive leadership",
      "Early preview of new initiatives and opportunities"
    ],
    icon: Crown
  },
  {
    number: 5,
    title: "Continuously align with their evolving interests",
    description: "Adapt as their priorities and passions change.",
    details: [
      "Regular conversations about their philanthropic goals",
      "Adapt engagement to life changes and new priorities",
      "Present opportunities that match their current passions"
    ],
    icon: Zap
  }
];

interface JourneyConfig {
  from: string;
  to: string;
  fromColor: string;
  toColor: string;
  goal: string;
  steps: StrategyStep[];
  outcome: string;
}

const journeyConfigs: Record<string, JourneyConfig> = {
  acquaintance: {
    from: "Acquaintance",
    to: "Partner",
    fromColor: "#A5A033",
    toColor: "#7FA3A1",
    goal: "Move from transactional giving to relational awareness and structured next steps.",
    steps: acquaintanceSteps,
    outcome: "They become Friends, then Colleagues, then Partners."
  },
  friend: {
    from: "Friend",
    to: "Partner",
    fromColor: "#D5636C",
    toColor: "#7FA3A1",
    goal: "Add structure to high-energy relational warmth.",
    steps: friendSteps,
    outcome: "Friendship + structure becomes Partnership."
  },
  colleague: {
    from: "Colleague",
    to: "Partner",
    fromColor: "#7BC4DC",
    toColor: "#7FA3A1",
    goal: "Warm the relationship and deepen energy without removing structure.",
    steps: colleagueSteps,
    outcome: "Colleague → relational warmth → structured major gift pathway → Partner."
  },
  partner: {
    from: "Partner",
    to: "Partner",
    fromColor: "#7FA3A1",
    toColor: "#7FA3A1",
    goal: "Sustain high energy and high structure through continuous engagement and transparency.",
    steps: partnerSteps,
    outcome: "Partners are not a destination but a relationship to be nurtured."
  }
};

function StrategyStepCard({ step }: { step: StrategyStep }) {
  const IconComponent = step.icon;
  
  return (
    <Card className="h-full hover-elevate">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center font-semibold text-sm">
            {step.number}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <IconComponent className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <h4 className="font-semibold text-sm leading-tight">{step.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
            
            {step.details && step.details.length > 0 && (
              <ul className="space-y-1.5 mb-3">
                {step.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            )}
            
            {step.tip && (
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/50 text-sm">
                <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
                <span className="italic text-muted-foreground">{step.tip}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StrategyContent({ configKey }: { configKey: string }) {
  const config = journeyConfigs[configKey];
  
  return (
    <div className="space-y-4">
      {/* Compact inline header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Goal:</span>
          <span className="text-sm">{config.goal}</span>
        </div>
        <Badge variant="secondary">{config.steps.length} steps</Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        {config.steps.map((step) => (
          <StrategyStepCard key={step.number} step={step} />
        ))}
      </div>
    </div>
  );
}

export default function QuadrantStrategies() {
  return (
    <div className="space-y-4">
      {/* Compact header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#7BC4DC]/10 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-[#7BC4DC]" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Movement Strategies</h1>
          <p className="text-sm text-muted-foreground">How Each Quadrant Advances to Partner</p>
        </div>
      </div>

      <Tabs defaultValue="acquaintance" className="w-full">
        <TabsList className="h-12 bg-transparent border-0 rounded-none gap-1 w-auto inline-flex border-b">
          <TabsTrigger 
            value="acquaintance" 
            data-testid="tab-strategy-acquaintance"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 gap-2"
          >
            Acquaintance → Partner
          </TabsTrigger>
          <TabsTrigger 
            value="friend" 
            data-testid="tab-strategy-friend"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 gap-2"
          >
            Friend → Partner
          </TabsTrigger>
          <TabsTrigger 
            value="colleague" 
            data-testid="tab-strategy-colleague"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 gap-2"
          >
            Colleague → Partner
          </TabsTrigger>
          <TabsTrigger 
            value="partner" 
            data-testid="tab-strategy-partner"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 gap-2"
          >
            Maintain Partner
          </TabsTrigger>
        </TabsList>

        <TabsContent value="acquaintance" className="mt-0">
          <StrategyContent configKey="acquaintance" />
        </TabsContent>

        <TabsContent value="friend" className="mt-0">
          <StrategyContent configKey="friend" />
        </TabsContent>

        <TabsContent value="colleague" className="mt-0">
          <StrategyContent configKey="colleague" />
        </TabsContent>

        <TabsContent value="partner" className="mt-0">
          <StrategyContent configKey="partner" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
