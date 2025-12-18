import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
  Zap,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';

interface StrategyStep {
  number: number;
  title: string;
  description: string;
  details?: string[];
  icon: any;
  tip?: string;
  expandedContent?: {
    howTo: string[];
    examples?: string[];
    metrics?: string[];
    timeline?: string;
  };
}

const acquaintanceSteps: StrategyStep[] = [
  {
    number: 1,
    title: "Acknowledge their gift personally",
    description: "Humanize the relationship. Acquaintances become friends when they feel seen.",
    icon: Heart,
    tip: "Send within 48 hours of gift receipt",
    details: [
      "Handwritten thank-you note from a team member",
      "Video message from a beneficiary",
      "Personal phone call from leadership"
    ],
    expandedContent: {
      howTo: [
        "Set up automated alerts for new donors in your CRM",
        "Create a template library with personalization fields",
        "Train volunteers to write thank-you notes weekly",
        "Use video tools like Loom or Vidyard for quick personal messages"
      ],
      examples: [
        "\"Dear [Name], I wanted to personally thank you for your gift of $X. Your generosity directly supported...\"",
        "\"We noticed this was your first gift – welcome to our community!\"",
        "\"Your support arrived at the perfect time. Here's what it made possible...\""
      ],
      metrics: [
        "Thank-you sent within 48 hours",
        "Open rate on acknowledgment emails",
        "Response rate to personal outreach"
      ],
      timeline: "Complete within 48 hours of gift receipt"
    }
  },
  {
    number: 2,
    title: "Invite them into light-touch structure",
    description: "Create opportunities for gentle engagement without overwhelming.",
    details: [
      "Short update email with a personal note",
      "Quick \"behind the scenes\" story",
      "Low-commitment survey (\"Which part of our mission matters most to you?\")",
      "Social media follow invitation",
      "Newsletter subscription confirmation"
    ],
    icon: Mail,
    expandedContent: {
      howTo: [
        "Create a 3-email welcome series for new donors",
        "Design a simple preference center for communication choices",
        "Build a library of shareable impact stories",
        "Develop a monthly \"insider update\" exclusive to donors"
      ],
      examples: [
        "\"Choose how you'd like to hear from us: email, text, or mail\"",
        "\"Here's a story we only share with our donor family...\"",
        "\"We'd love to know: what inspired your gift?\""
      ],
      metrics: [
        "Email engagement rate",
        "Survey completion rate",
        "Preference center submissions"
      ],
      timeline: "Week 1-4 after initial gift"
    }
  },
  {
    number: 3,
    title: "Place them in a predictable cadence",
    description: "Consistent touchpoints build trust and familiarity.",
    details: [
      "Quarterly impact summaries",
      "Personalized content based on interest",
      "Birthday or anniversary acknowledgments",
      "Holiday greetings with mission tie-in",
      "Annual giving summary"
    ],
    icon: Calendar,
    expandedContent: {
      howTo: [
        "Build an annual communication calendar with donor touchpoints",
        "Segment donors by interest area for targeted content",
        "Set up automated milestone acknowledgments",
        "Create content variations for different donor segments"
      ],
      examples: [
        "Q1: Impact report, Q2: Summer update, Q3: Fall preview, Q4: Year-end appeal",
        "\"It's been one year since your first gift – here's what you've accomplished\"",
        "\"Based on your interest in [X], we thought you'd like to see this...\""
      ],
      metrics: [
        "Touchpoints per donor per year",
        "Email open and click rates by segment",
        "Donor retention at 12 months"
      ],
      timeline: "Ongoing quarterly touchpoints"
    }
  },
  {
    number: 4,
    title: "Offer a micro-commitment",
    description: "Small asks lead to deeper engagement over time.",
    details: [
      "RSVP for a 15-minute virtual update",
      "Join a small group tour",
      "Attend an info session",
      "Share their \"why\" in a donor spotlight",
      "Participate in a quick poll"
    ],
    icon: UserPlus,
    expandedContent: {
      howTo: [
        "Create low-barrier virtual event opportunities",
        "Develop a \"Donor Spotlight\" program for testimonials",
        "Build a peer ambassador recruitment pipeline",
        "Offer behind-the-scenes access as a thank-you"
      ],
      examples: [
        "\"Join us for a 15-minute virtual coffee with our CEO\"",
        "\"We'd love to feature your story – would you share 2 sentences about why you give?\"",
        "\"You're invited to an exclusive tour of our new facility\""
      ],
      metrics: [
        "Event registration and attendance rates",
        "Spotlight participation rate",
        "Conversion from micro-commitment to larger engagement"
      ],
      timeline: "Months 2-6 after first gift"
    }
  },
  {
    number: 5,
    title: "Identify affinity signals",
    description: "Watch for interest indicators that suggest readiness to advance.",
    icon: Eye,
    tip: "Once they show interest, move them to \"Friend\"",
    details: [
      "Track email engagement patterns",
      "Monitor event attendance",
      "Note survey responses and interests",
      "Watch for social media engagement",
      "Review giving pattern changes"
    ],
    expandedContent: {
      howTo: [
        "Set up engagement scoring in your CRM",
        "Create alerts for high-engagement behaviors",
        "Train staff to document casual conversations",
        "Build a donor interest tracking system"
      ],
      examples: [
        "Donor opens every email within 24 hours",
        "Attended 3+ events in past year",
        "Left detailed comments on surveys",
        "Increased giving amount or frequency"
      ],
      metrics: [
        "Engagement score threshold for \"ready to advance\"",
        "Number of affinity signals per donor",
        "Conversion rate from signal identification to Friend status"
      ],
      timeline: "Ongoing monitoring with quarterly review"
    }
  },
  {
    number: 6,
    title: "Bridge to higher-touch conversation",
    description: "Create a natural transition to deeper engagement.",
    icon: MessageSquare,
    tip: "\"I noticed your interest in ___. Could we share a short update with you?\"",
    details: [
      "Personal phone call from development officer",
      "Invitation to meet program leadership",
      "One-on-one coffee or lunch",
      "Exclusive preview of upcoming initiatives",
      "Handoff to major gifts officer"
    ],
    expandedContent: {
      howTo: [
        "Develop scripts for transition conversations",
        "Create a warm handoff protocol between teams",
        "Build a calendar for relationship-building meetings",
        "Train staff on active listening techniques"
      ],
      examples: [
        "\"I noticed you've attended our last three events – I'd love to learn more about what draws you to our work\"",
        "\"Your consistent support has made a real difference. Could I share some exciting news with you over coffee?\"",
        "\"Based on your interest in [X], I think you'd love to meet our program director\""
      ],
      metrics: [
        "Transition conversation completion rate",
        "Time from signal to personal outreach",
        "Conversion to Friend status within 90 days"
      ],
      timeline: "Within 2 weeks of identifying strong affinity signals"
    }
  }
];

const friendSteps: StrategyStep[] = [
  {
    number: 1,
    title: "Convert relational warmth into a plan",
    description: "Channel the emotional connection toward structured partnership.",
    icon: Target,
    tip: "\"You've been close to our story — I'd love to explore what meaningful partnership might look like.\"",
    details: [
      "Schedule a formal meeting to discuss partnership",
      "Document their interests and passions",
      "Create a personalized engagement roadmap",
      "Identify specific programs aligned with their values"
    ],
    expandedContent: {
      howTo: [
        "Prepare a partnership conversation guide with key questions",
        "Review their giving history and engagement patterns before meeting",
        "Create a visual timeline showing potential partnership journey",
        "Develop personalized impact scenarios based on various gift levels"
      ],
      examples: [
        "\"I've loved getting to know you. Could we schedule time to talk about what deeper involvement might look like?\"",
        "\"Your passion for [X] really resonates with our new initiative. I'd love to share more.\"",
        "\"You've been such a champion for us. Let's explore how we can make your impact even greater.\""
      ],
      metrics: [
        "Partnership conversations scheduled per quarter",
        "Conversion rate from Friend to structured engagement",
        "Average time from Friend status to partnership commitment"
      ],
      timeline: "Schedule within 30 days of identifying partnership readiness"
    }
  },
  {
    number: 2,
    title: "Introduce cadence",
    description: "Transform spontaneous connection into predictable engagement.",
    details: [
      "Calendar the next touchpoint before ending the current one",
      "Move from spontaneous connection → predictable engagement",
      "Set recurring quarterly check-ins",
      "Create a shared communication rhythm",
      "Establish preferred contact methods"
    ],
    icon: Calendar,
    expandedContent: {
      howTo: [
        "Always end meetings by scheduling the next one",
        "Use calendar tools to set recurring touchpoint reminders",
        "Create a donor-specific communication plan",
        "Track all interactions in CRM with next steps noted"
      ],
      examples: [
        "\"Before we wrap up, when would be a good time for our next coffee?\"",
        "\"I'd love to check in with you quarterly. Does that work for your schedule?\"",
        "\"Let's put our next lunch on the calendar now – I'll send an invite tomorrow.\""
      ],
      metrics: [
        "Touchpoints per quarter (target: 4+)",
        "Calendar completion rate for scheduled meetings",
        "Response time to outreach"
      ],
      timeline: "Establish within first 60 days of transition"
    }
  },
  {
    number: 3,
    title: "Give them a role or responsibility",
    description: "Friends become partners when they feel needed, not just liked.",
    details: [
      "Host a small gathering at their home",
      "Join a vision preview committee",
      "Help shape a project direction",
      "Serve on an advisory group",
      "Mentor a young professional",
      "Lead a peer solicitation"
    ],
    icon: Users,
    expandedContent: {
      howTo: [
        "Identify their skills and how they align with organizational needs",
        "Create volunteer leadership opportunities at various commitment levels",
        "Develop ambassador or host programs for engaged friends",
        "Build a structured pathway from volunteer to board member"
      ],
      examples: [
        "\"Your network would be perfect for hosting an intimate gathering. Would you consider it?\"",
        "\"We're forming an advisory group for [initiative]. Your expertise would be invaluable.\"",
        "\"Could you help us by making a few introductions to people in your circle?\""
      ],
      metrics: [
        "Volunteer role acceptance rate",
        "Events hosted by donors",
        "Introductions made per volunteer leader"
      ],
      timeline: "Offer first role within 90 days of establishing cadence"
    }
  },
  {
    number: 4,
    title: "Present specific investment opportunities",
    description: "Friends respond to emotion; partners respond to clarity.",
    icon: Gift,
    tip: "Give them something concrete to own",
    details: [
      "Create named giving opportunities",
      "Develop program-specific funding proposals",
      "Offer multi-year commitment options",
      "Present matching gift challenges",
      "Share specific impact metrics for various gift levels"
    ],
    expandedContent: {
      howTo: [
        "Prepare customized giving proposals based on known interests",
        "Calculate specific impact at various gift levels",
        "Create visual presentations showing project timelines and milestones",
        "Develop recognition options for different commitment levels"
      ],
      examples: [
        "\"For $25,000, you could fully fund our summer program for 50 children.\"",
        "\"This $100,000 naming opportunity would honor your family while transforming lives.\"",
        "\"A three-year commitment of $10,000 annually would allow us to plan strategically.\""
      ],
      metrics: [
        "Proposals presented per quarter",
        "Acceptance rate on customized proposals",
        "Average gift size from proposal conversations"
      ],
      timeline: "Present within 30 days of role acceptance"
    }
  },
  {
    number: 5,
    title: "Create a vision conversation",
    description: "Connect their passion to your strategic direction.",
    details: [
      "Invite them into the \"why now\" and the long-term plan",
      "Connect their passion to a strategic initiative",
      "Share organizational goals and challenges",
      "Ask for their input on strategic direction",
      "Discuss legacy and lasting impact"
    ],
    icon: Sparkles,
    expandedContent: {
      howTo: [
        "Prepare a strategic vision presentation with clear milestones",
        "Create space for donor input and feedback",
        "Connect their personal story to organizational mission",
        "Develop talking points around transformational giving"
      ],
      examples: [
        "\"I'd love to share where we're headed and get your thoughts on our five-year vision.\"",
        "\"Your expertise in [X] could really shape how we approach this initiative.\"",
        "\"What kind of lasting impact do you hope to have through your philanthropy?\""
      ],
      metrics: [
        "Vision conversations completed per quarter",
        "Donor input incorporated into planning",
        "Conversion to Partner status within 6 months"
      ],
      timeline: "Schedule within 60 days of presenting investment opportunities"
    }
  }
];

const colleagueSteps: StrategyStep[] = [
  {
    number: 1,
    title: "Move from impersonal to personal",
    description: "Add warmth to the existing structured relationship.",
    details: [
      "Send a personalized update tied to their giving history",
      "Invite them to a short thank-you call",
      "Send a handwritten note from leadership",
      "Share a photo from a program they've funded",
      "Celebrate their giving anniversary"
    ],
    icon: Heart,
    expandedContent: {
      howTo: [
        "Review giving history to identify patterns and preferences",
        "Schedule personal outreach during non-campaign periods",
        "Create personalized impact reports based on their giving",
        "Train development staff on relationship-building conversations"
      ],
      examples: [
        "\"Your monthly gift of $100 has provided 24 meals this year. Here's Maria, one person you've helped.\"",
        "\"It's been 5 years since your first gift. Thank you for walking this journey with us.\"",
        "\"I noticed you've consistently supported our education programs. I'd love to share what's new.\""
      ],
      metrics: [
        "Personal touchpoints per recurring donor per year",
        "Response rate to personalization efforts",
        "Upgrade requests following personal outreach"
      ],
      timeline: "Begin within 30 days of identifying Colleague status"
    }
  },
  {
    number: 2,
    title: "Show them the meaning behind the structure",
    description: "Give emotional significance to their pattern.",
    icon: Lightbulb,
    tip: "\"Your automated monthly gift has helped…\"",
    details: [
      "Connect recurring gifts to specific outcomes",
      "Share the \"compound impact\" of consistent giving",
      "Highlight their role in organizational stability",
      "Demonstrate how predictable giving enables planning",
      "Celebrate cumulative lifetime giving"
    ],
    expandedContent: {
      howTo: [
        "Calculate and communicate cumulative impact over time",
        "Create \"Giving Timeline\" visuals showing their journey",
        "Develop messaging around donor loyalty and consistency",
        "Build recognition programs for sustained giving"
      ],
      examples: [
        "\"Over 5 years, your $50/month has totaled $3,000 – enough to send 6 students to college.\"",
        "\"Because of donors like you with predictable giving, we can plan programs years in advance.\"",
        "\"Your consistency makes you one of our most reliable champions.\""
      ],
      metrics: [
        "Lifetime value recognition communications sent",
        "Retention rate among recognized consistent donors",
        "Upgrade rate following impact communications"
      ],
      timeline: "Communicate within 60 days, then quarterly thereafter"
    }
  },
  {
    number: 3,
    title: "Offer deeper insight and stories",
    description: "Connect data to human impact through storytelling.",
    details: [
      "Video updates from beneficiaries",
      "Program leader testimonials",
      "Real-life transformation stories",
      "Behind-the-scenes program visits",
      "Impact dashboards with their contribution highlighted"
    ],
    icon: Video,
    expandedContent: {
      howTo: [
        "Build a library of video testimonials by program area",
        "Create personalized impact reports with donor-specific data",
        "Develop virtual tour experiences for remote donors",
        "Train program staff to share stories with development team"
      ],
      examples: [
        "\"Here's a 2-minute video from someone your giving has directly impacted.\"",
        "\"Our program director wanted to personally thank you. Here's her message.\"",
        "\"This dashboard shows exactly how your gifts have been put to work.\""
      ],
      metrics: [
        "Video engagement rate",
        "Story response rate",
        "Giving increases following story delivery"
      ],
      timeline: "Deliver compelling stories quarterly"
    }
  },
  {
    number: 4,
    title: "Personal invitation to a higher-value opportunity",
    description: "Colleagues respond to system integrity, so show how a major gift fits.",
    details: [
      "Multi-year vision presentations",
      "Strategic initiative partnerships",
      "Campaign involvement opportunities",
      "Endowment or legacy giving options",
      "Capital project participation"
    ],
    icon: TrendingUp,
    expandedContent: {
      howTo: [
        "Frame major gifts as an extension of their systematic approach",
        "Present multi-year commitments that maintain predictability",
        "Show how larger gifts fit into organizational strategy",
        "Develop proposals that respect their preference for structure"
      ],
      examples: [
        "\"Given your systematic approach, a 3-year pledge might be a natural fit.\"",
        "\"Our campaign has clear milestones and reporting – I think you'd appreciate the transparency.\"",
        "\"This strategic initiative has measurable outcomes we'll track and share with you.\""
      ],
      metrics: [
        "Major gift proposals to Colleagues per quarter",
        "Conversion rate from structured giving to major gift",
        "Average major gift size from Colleague pathway"
      ],
      timeline: "Present within 90 days of establishing personal connection"
    }
  },
  {
    number: 5,
    title: "Bridge them to relational connection",
    description: "Create opportunities for personal relationship building.",
    details: [
      "Introduce them to a key leader",
      "Invite them to smaller gatherings where partnership feels natural",
      "Offer one-on-one meetings with program staff",
      "Include them in strategic planning discussions",
      "Create peer connection opportunities"
    ],
    icon: Handshake,
    expandedContent: {
      howTo: [
        "Identify leaders who match donor interests for introductions",
        "Create intimate event formats for relationship building",
        "Develop discussion groups around shared interests",
        "Build peer communities for major donors"
      ],
      examples: [
        "\"I'd love for you to meet our Executive Director over coffee.\"",
        "\"We're hosting a small dinner with just 8 donors. Would you join us?\"",
        "\"Based on your interest in [X], I think you'd enjoy connecting with other donors who share that passion.\""
      ],
      metrics: [
        "Personal introductions made per quarter",
        "Event attendance at intimate gatherings",
        "Conversion to Partner status following relational engagement"
      ],
      timeline: "Arrange introductions within 60 days of major gift discussion"
    }
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
      "Schedule regular check-ins and vision conversations",
      "Send birthday and anniversary acknowledgments",
      "Deliver timely updates on programs they support"
    ],
    icon: MessageSquare,
    expandedContent: {
      howTo: [
        "Create a personalized communication calendar for each partner",
        "Develop executive-level updates exclusive to top donors",
        "Build a relationship management cadence with clear touchpoints",
        "Train leadership to maintain personal connections"
      ],
      examples: [
        "\"Here's your personalized quarterly report showing the impact of your partnership.\"",
        "\"I wanted you to know about this strategic decision before we announce publicly.\"",
        "\"Let's schedule our quarterly conversation – I have exciting news to share.\""
      ],
      metrics: [
        "Touchpoints per partner per quarter (target: 6+)",
        "Response rate to personal communications",
        "Partner satisfaction survey scores"
      ],
      timeline: "Maintain minimum 6 touchpoints per quarter"
    }
  },
  {
    number: 2,
    title: "Deepen their involvement",
    description: "Create opportunities for greater ownership and influence.",
    details: [
      "Invite to strategic planning sessions",
      "Offer board or advisory committee opportunities",
      "Create co-ownership of specific initiatives",
      "Engage in campaign leadership roles",
      "Involve in organizational decision-making",
      "Recruit them as peer solicitors"
    ],
    icon: Users,
    expandedContent: {
      howTo: [
        "Identify governance and leadership opportunities",
        "Create tiered involvement structures",
        "Develop campaign cabinet or leadership giving committees",
        "Build peer-to-peer solicitation programs"
      ],
      examples: [
        "\"We're launching a capital campaign and would love your leadership.\"",
        "\"Would you consider serving on our advisory board for [initiative]?\"",
        "\"Your network and expertise could help us expand our reach. Could you make a few introductions?\""
      ],
      metrics: [
        "Leadership role acceptance rate",
        "Peer solicitations completed by partners",
        "New donors introduced by partners"
      ],
      timeline: "Offer leadership opportunity within 6 months of Partner status"
    }
  },
  {
    number: 3,
    title: "Honor their partnership publicly and privately",
    description: "Recognition reinforces commitment and belonging.",
    details: [
      "Host recognition events and celebrations",
      "Deliver personal thank-you from CEO and board",
      "Share stories of impact enabled by their partnership",
      "Create naming opportunities and lasting recognition",
      "Feature in annual reports and publications",
      "Present recognition plaques and gifts"
    ],
    icon: Award,
    expandedContent: {
      howTo: [
        "Develop a tiered recognition program by giving level",
        "Create meaningful (not transactional) recognition moments",
        "Build a culture of gratitude throughout the organization",
        "Train all staff to recognize and thank major donors"
      ],
      examples: [
        "\"The Board would like to honor you at our annual dinner.\"",
        "\"This naming opportunity will recognize your family's generosity for generations.\"",
        "\"Our CEO wanted to personally thank you – she's written this note.\""
      ],
      metrics: [
        "Recognition events held per year",
        "Partner attendance at recognition events",
        "Retention rate following recognition"
      ],
      timeline: "Ongoing recognition with major moments annually"
    }
  },
  {
    number: 4,
    title: "Provide exclusive access and insight",
    description: "VIP treatment demonstrates their special status.",
    details: [
      "VIP tours and behind-the-scenes program visits",
      "Direct access to executive leadership",
      "Early preview of new initiatives and opportunities",
      "Exclusive briefings on organizational strategy",
      "Private meetings with beneficiaries",
      "Invitation to special leadership retreats"
    ],
    icon: Crown,
    expandedContent: {
      howTo: [
        "Create exclusive experiences unavailable to general donors",
        "Develop executive access programs for top partners",
        "Build a calendar of VIP-only events and opportunities",
        "Train program staff to host partner visits"
      ],
      examples: [
        "\"I'd love to arrange a private visit to see your impact firsthand.\"",
        "\"Our CEO would like to brief you on our five-year strategy before we share it publicly.\"",
        "\"You're invited to an exclusive retreat with our top 10 partners.\""
      ],
      metrics: [
        "VIP experiences provided per partner per year",
        "Leadership access meetings completed",
        "Partner feedback on exclusive access"
      ],
      timeline: "Provide at least 2 exclusive experiences annually"
    }
  },
  {
    number: 5,
    title: "Continuously align with their evolving interests",
    description: "Adapt as their priorities and passions change.",
    details: [
      "Regular conversations about their philanthropic goals",
      "Adapt engagement to life changes and new priorities",
      "Present opportunities that match their current passions",
      "Discuss legacy and estate planning",
      "Explore multi-generational family philanthropy",
      "Connect them with like-minded peer donors"
    ],
    icon: Zap,
    expandedContent: {
      howTo: [
        "Conduct annual philanthropic goal conversations",
        "Track life events and adjust engagement accordingly",
        "Develop legacy and planned giving conversations",
        "Create family philanthropy programs"
      ],
      examples: [
        "\"How are your philanthropic priorities evolving? I'd love to learn what's on your heart.\"",
        "\"We'd love to help you create a lasting legacy. Can we discuss planned giving options?\"",
        "\"Would your children or grandchildren like to be involved in your philanthropic journey?\""
      ],
      metrics: [
        "Annual goal conversations completed",
        "Planned gift commitments secured",
        "Multi-generational engagement success rate"
      ],
      timeline: "Annual deep conversation with quarterly check-ins"
    }
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
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = step.icon;
  const hasExpandedContent = step.expandedContent !== undefined;
  
  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <Card className="h-full overflow-visible">
        <CollapsibleTrigger asChild>
          <CardContent className={`p-5 cursor-pointer hover-elevate ${hasExpandedContent ? '' : ''}`} data-testid={`card-strategy-step-${step.number}`}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#395174] text-white flex items-center justify-center font-semibold text-sm">
                {step.number}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-[#4FA6A6] flex-shrink-0" />
                    <h4 className="font-semibold text-sm leading-tight">{step.title}</h4>
                  </div>
                  {hasExpandedContent && (
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                
                {step.details && step.details.length > 0 && (
                  <ul className="space-y-1.5 mb-3">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#92A05A]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {step.tip && (
                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-[#E8A54B]/10 text-sm">
                    <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#E8A54B]" />
                    <span className="italic text-muted-foreground">{step.tip}</span>
                  </div>
                )}

                {hasExpandedContent && !isExpanded && (
                  <p className="text-xs text-primary mt-2 font-medium">Click to see detailed guidance →</p>
                )}
              </div>
            </div>
          </CardContent>
        </CollapsibleTrigger>
        
        {hasExpandedContent && (
          <CollapsibleContent>
            <div className="border-t bg-muted/20">
              {/* How To Section */}
              <div className="p-4 border-b">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-4 w-4 text-[#4FA6A6]" />
                  <h5 className="font-semibold text-sm">How to Execute</h5>
                </div>
                <ul className="space-y-2">
                  {step.expandedContent!.howTo.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-[#4FA6A6] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Examples Section */}
              {step.expandedContent!.examples && step.expandedContent!.examples.length > 0 && (
                <div className="p-4 border-b">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="h-4 w-4 text-[#92A05A]" />
                    <h5 className="font-semibold text-sm">Sample Scripts & Language</h5>
                  </div>
                  <div className="space-y-2">
                    {step.expandedContent!.examples.map((example, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-muted/50 text-sm italic">
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Metrics Section */}
              {step.expandedContent!.metrics && step.expandedContent!.metrics.length > 0 && (
                <div className="p-4 border-b">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-4 w-4 text-[#E8A54B]" />
                    <h5 className="font-semibold text-sm">Success Metrics</h5>
                  </div>
                  <ul className="space-y-2">
                    {step.expandedContent!.metrics.map((metric, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8A54B]/10 text-[#E8A54B] text-xs font-semibold shrink-0">
                          {idx + 1}
                        </span>
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Timeline Section */}
              {step.expandedContent!.timeline && (
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-[#7BC4DC]" />
                    <h5 className="font-semibold text-sm">Timeline</h5>
                  </div>
                  <p className="text-sm font-medium text-[#4FA6A6]">{step.expandedContent!.timeline}</p>
                </div>
              )}
            </div>
          </CollapsibleContent>
        )}
      </Card>
    </Collapsible>
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
