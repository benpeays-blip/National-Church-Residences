import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Wand2, 
  ArrowRight, 
  ArrowLeft, 
  Calendar, 
  Phone, 
  Mail, 
  Users, 
  Target,
  TrendingUp,
  UserPlus,
  RefreshCw,
  CheckCircle2,
  Clock,
  User,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  FileText,
  Lightbulb,
  Copy
} from "lucide-react";

interface WeeklyConstraints {
  meetings: number;
  calls: number;
  emails: number;
}

interface ActionableMove {
  id: string;
  donorName: string;
  currentQuadrant: "Partner" | "Friend" | "Colleague" | "Acquaintance";
  targetQuadrant: "Partner" | "Friend" | "Colleague";
  suggestedAction: string;
  recommendedOwner: string;
  targetDate: string;
  actionType: "meeting" | "call" | "email";
  priority: number;
  objective: string;
  context: string;
  talkingPoints: string[];
  sampleScript?: string;
  expectedOutcome: string;
  nextSteps: string[];
}

type FocusArea = 
  | "grow-partners" 
  | "strengthen-partners" 
  | "activate-friends" 
  | "reengage-colleagues" 
  | "surface-acquaintances";

const focusOptions = [
  {
    value: "grow-partners",
    label: "Grow number of Partners",
    description: "Focus on moving Friends and Colleagues to Partner status",
    icon: UserPlus,
  },
  {
    value: "strengthen-partners",
    label: "Strengthen current Partners",
    description: "Deepen relationships with existing Partners",
    icon: TrendingUp,
  },
  {
    value: "activate-friends",
    label: "Activate high-capacity Friends",
    description: "Engage Friends with strong giving potential",
    icon: Target,
  },
  {
    value: "reengage-colleagues",
    label: "Re-engage drifting Colleagues",
    description: "Reconnect with Colleagues showing reduced engagement",
    icon: RefreshCw,
  },
  {
    value: "surface-acquaintances",
    label: "Surface hidden Acquaintances worth upgrading",
    description: "Identify promising Acquaintances for cultivation",
    icon: Users,
  },
];

// Mock data generator based on focus
const generateActionPlan = (
  constraints: WeeklyConstraints,
  focus: FocusArea
): ActionableMove[] => {
  const baseMoves: Record<FocusArea, ActionableMove[]> = {
    "grow-partners": [
      {
        id: "1",
        donorName: "Evelyn Moore",
        currentQuadrant: "Friend",
        targetQuadrant: "Partner",
        suggestedAction: "Schedule 90-minute vision lunch to discuss long-term partnership opportunities",
        recommendedOwner: "Sarah Chen",
        targetDate: "2025-11-20",
        actionType: "meeting",
        priority: 1,
        objective: "Convert Evelyn from Friend to Partner by establishing a formal multi-year giving commitment",
        context: "Evelyn has been a consistent $5,000/year donor for 3 years, attends 80% of events, and recently expressed interest in 'doing more' at the annual gala. Her family foundation focuses on education, which aligns with our literacy programs.",
        talkingPoints: [
          "Thank her for 3 years of consistent support and share specific impact from her gifts",
          "Ask about her family foundation's current priorities and timeline for major grants",
          "Share the vision for the new Community Learning Center and how it aligns with her interests",
          "Explore what a 3-year partnership commitment might look like ($25K-50K/year)",
          "Offer naming opportunity for the children's reading room"
        ],
        sampleScript: "Evelyn, I wanted to personally thank you for your incredible loyalty over the past three years. Your support has helped 150 children improve their reading levels. I'd love to hear more about what's driving your passion for education—and share some exciting plans we have that I think would resonate with you.",
        expectedOutcome: "Secure agreement to explore a 3-year, $75,000 partnership commitment with quarterly touchpoints",
        nextSteps: [
          "Send calendar invite with restaurant reservation confirmation",
          "Prepare one-page impact summary of her giving history",
          "Draft partnership proposal to share at follow-up meeting",
          "Schedule thank-you note within 24 hours of lunch"
        ]
      },
      {
        id: "2",
        donorName: "Brandon Cole",
        currentQuadrant: "Colleague",
        targetQuadrant: "Partner",
        suggestedAction: "Share draft 3-year commitment concept and follow up with strategic call",
        recommendedOwner: "Ben Davis",
        targetDate: "2025-11-21",
        actionType: "email",
        priority: 2,
        objective: "Re-engage Brandon by presenting a structured giving opportunity that matches his preference for planned, strategic philanthropy",
        context: "Brandon is a CFO who gives $10,000 annually but engagement has been transactional. He appreciates data, ROI metrics, and clear plans. His giving has been consistent but not growing. He mentioned at a board event that he prefers 'investments with measurable outcomes.'",
        talkingPoints: [
          "Lead with data: cost-per-outcome metrics for programs he's funded",
          "Present 3-year partnership as an 'investment portfolio' with quarterly reporting",
          "Offer seat on Finance Advisory Committee to leverage his expertise",
          "Propose structured giving: $15K Year 1, $20K Year 2, $25K Year 3"
        ],
        sampleScript: "Subject: Partnership Proposal - Investing in Measurable Impact\n\nDear Brandon,\n\nYour CFO mindset has always impressed me, and I wanted to share something I think you'll appreciate: a data-driven partnership proposal that treats your philanthropy like the strategic investment it is.\n\nOver the past 3 years, your support has achieved a 12:1 social return on investment. I'd like to discuss how a structured 3-year commitment could amplify that impact while giving you quarterly visibility into outcomes.\n\nWould you have 20 minutes this week for a call?\n\nBest,\nBen",
        expectedOutcome: "Secure 20-minute call to present full partnership proposal and address questions",
        nextSteps: [
          "Prepare 3-year partnership deck with ROI projections",
          "Compile financial transparency report from past 3 years",
          "Research Finance Advisory Committee structure",
          "Block time for follow-up call within 3 business days"
        ]
      },
      {
        id: "3",
        donorName: "Daniel King",
        currentQuadrant: "Colleague",
        targetQuadrant: "Partner",
        suggestedAction: "Invite to small strategy dinner with board members Thompson and Wu",
        recommendedOwner: "Maria Garcia",
        targetDate: "2025-11-22",
        actionType: "call",
        priority: 3,
        objective: "Elevate Daniel's connection to leadership and demonstrate his value to the organization beyond his giving",
        context: "Daniel is a successful entrepreneur ($8K/year donor) who craves intellectual engagement and peer connections. He's mentioned feeling like 'just a check writer.' Board member Thompson knows him from YPO and can facilitate warm connection.",
        talkingPoints: [
          "Acknowledge his entrepreneurial perspective and how it could benefit our strategy",
          "Invite him to intimate dinner (8 people max) with board leadership",
          "Position it as seeking his advice, not just his money",
          "Mention Thompson specifically as someone who suggested we connect him"
        ],
        sampleScript: "Hi Daniel, this is Maria from NCR. I'm calling because our board member Richard Thompson mentioned you two are in YPO together, and he thought you'd bring a valuable perspective to a conversation we're having. We're hosting an intimate strategy dinner next month with a few key advisors to discuss our growth plans, and I'd love for you to join us. It's not a fundraising event—we genuinely want to tap into expertise like yours. Would that be something you'd be interested in?",
        expectedOutcome: "Confirm attendance at strategy dinner and begin transition from transactional to relational engagement",
        nextSteps: [
          "Brief Thompson on the invitation and ask for warm intro text",
          "Send formal invitation with guest list after verbal confirmation",
          "Prepare 2-3 strategic questions specifically for Daniel's expertise",
          "Plan seating to ensure he's next to Thompson and CEO"
        ]
      },
      {
        id: "4",
        donorName: "Catherine Wells",
        currentQuadrant: "Friend",
        targetQuadrant: "Partner",
        suggestedAction: "Send personalized impact report and schedule site visit",
        recommendedOwner: "Sarah Chen",
        targetDate: "2025-11-23",
        actionType: "email",
        priority: 4,
        objective: "Deepen Catherine's emotional connection to the mission through direct program experience",
        context: "Catherine is a retired teacher ($3,500/year) with high energy and passion but modest capacity. She volunteers monthly and refers friends. A site visit could unlock a planned gift conversation, as she's mentioned 'wanting to leave a legacy.'",
        talkingPoints: [
          "Celebrate her volunteer impact alongside her giving",
          "Invite her to see the after-school program she's helped fund",
          "Plant seed for legacy society membership",
          "Ask her to consider being a 'giving ambassador' to her network"
        ],
        sampleScript: "Subject: You've Touched 47 Young Lives, Catherine—Want to Meet Them?\n\nDear Catherine,\n\nI was putting together your personalized impact report (attached) and had to stop and smile. Between your generous gifts and your 36 volunteer hours this year, you've directly impacted 47 students in our after-school program.\n\nI'd love to invite you for a special visit to see 'your kids' in action. Could we find a Thursday afternoon that works? I also have some exciting news about our Legacy Circle that I think would resonate with you.\n\nWith gratitude,\nSarah",
        expectedOutcome: "Confirm site visit and introduce legacy giving conversation",
        nextSteps: [
          "Generate personalized impact report with photos/stories",
          "Coordinate with program director for visit availability",
          "Prepare Legacy Circle materials to share during visit",
          "Identify 2-3 students who can meet Catherine during visit"
        ]
      },
      {
        id: "5",
        donorName: "Marcus Chen",
        currentQuadrant: "Colleague",
        targetQuadrant: "Partner",
        suggestedAction: "Thank-you call to recognize increased giving and explore family foundation involvement",
        recommendedOwner: "Ben Davis",
        targetDate: "2025-11-24",
        actionType: "call",
        priority: 5,
        objective: "Acknowledge Marcus's giving growth and transition conversation toward family foundation engagement",
        context: "Marcus increased his giving from $5K to $15K this year without being asked. He recently established a family foundation with his adult children. This is a major opportunity to connect his family's philanthropic journey with our mission.",
        talkingPoints: [
          "Express genuine gratitude for his unsolicited increase in giving",
          "Ask what prompted the decision to increase support",
          "Inquire about his new family foundation and its focus areas",
          "Explore whether his children might want to tour programs",
          "Mention our Family Philanthropy Engagement Program"
        ],
        sampleScript: "Marcus, this is Ben Davis. I'm calling to personally thank you—we noticed you tripled your gift this year, and honestly, that kind of unsolicited generosity is rare and meaningful. I'd love to understand what inspired that decision. I also heard through the grapevine that you and your family recently established a foundation, and I'm curious whether education and workforce development might align with your focus areas. Would you have 15 minutes to chat?",
        expectedOutcome: "Understand motivation for increased giving and open door to family foundation conversation",
        nextSteps: [
          "Research the Chen Family Foundation's stated mission",
          "Prepare family engagement program overview",
          "Draft follow-up email summarizing call and next steps",
          "Consider inviting Marcus and children to upcoming site visit"
        ]
      }
    ],
    "strengthen-partners": [
      {
        id: "4",
        donorName: "Patricia Chen",
        currentQuadrant: "Partner",
        targetQuadrant: "Partner",
        suggestedAction: "Quarterly impact review meeting - share program outcomes they funded",
        recommendedOwner: "Sarah Chen",
        targetDate: "2025-11-19",
        actionType: "meeting",
        priority: 1,
        objective: "Reinforce Patricia's Partner status by demonstrating exceptional stewardship and transparency",
        context: "Patricia is a $100K/year Partner for 5 years running. She funds our STEM education initiative exclusively. She's data-driven and expects quarterly updates. She has capacity to increase but needs to see continued excellence before committing more.",
        talkingPoints: [
          "Present Q3 outcomes: 340 students served, 89% improved grades, 12 earned scholarships",
          "Share 3 student success stories with photos and quotes",
          "Discuss challenges honestly—supply chain issues delayed equipment",
          "Preview exciting Q4 initiatives and how her funding enables them",
          "Ask for her input on the program's 2026 expansion plans"
        ],
        sampleScript: "Patricia, thank you for making time for our quarterly review. I know your time is valuable, so I've prepared a comprehensive report on the STEM initiative you've championed. Before I dive into the numbers—and they're strong—I want to tell you about Maria, one of our students who just earned a full scholarship to MIT. She credits this program, and by extension you, for changing her trajectory. Now, let me show you the data behind stories like hers...",
        expectedOutcome: "Reaffirm commitment for 2026 and plant seed for potential 20% increase",
        nextSteps: [
          "Send full impact report within 24 hours with executive summary",
          "Share Maria's thank-you video (with permission)",
          "Schedule Q4 review in calendar before leaving meeting",
          "Prepare 2026 expansion proposal for January discussion"
        ]
      },
      {
        id: "5",
        donorName: "Michael Thompson",
        currentQuadrant: "Partner",
        targetQuadrant: "Partner",
        suggestedAction: "Personal thank you call for recent major gift and discuss legacy planning",
        recommendedOwner: "Ben Davis",
        targetDate: "2025-11-20",
        actionType: "call",
        priority: 2,
        objective: "Deepen relationship with Michael by expressing gratitude and introducing planned giving conversation",
        context: "Michael just made a surprise $250K gift for the capital campaign. He's 72, a successful real estate developer, and has mentioned estate planning. This is the right moment to transition into legacy conversation without appearing opportunistic.",
        talkingPoints: [
          "Express heartfelt, personal gratitude—this gift was transformational",
          "Ask what inspired this decision at this moment",
          "Listen for any legacy/estate planning language",
          "Gently introduce Legacy Circle and what it means to members",
          "Offer to connect him with our planned giving advisor"
        ],
        sampleScript: "Michael, this is Ben Davis. I'm calling to personally thank you for your extraordinary gift to the capital campaign. $250,000 is transformational—you've essentially funded our entire community room. I'd love to understand what moved you to make such a generous commitment right now. [Listen] You know, many donors like yourself who reach this level of generosity start thinking about how their legacy extends beyond their lifetime. We have a Legacy Circle for donors who've included us in their estate plans. It's not about money—it's about being remembered as someone who built something lasting. Would you be open to learning more?",
        expectedOutcome: "Express gratitude and secure agreement to meet with planned giving advisor",
        nextSteps: [
          "Send handwritten thank-you note same day as call",
          "Prepare Legacy Circle information packet",
          "Coordinate with planned giving advisor for joint meeting",
          "Arrange naming ceremony for community room"
        ]
      },
      {
        id: "6",
        donorName: "Elizabeth Warren",
        currentQuadrant: "Partner",
        targetQuadrant: "Partner",
        suggestedAction: "Invite to exclusive donor appreciation event with CEO and board",
        recommendedOwner: "Maria Garcia",
        targetDate: "2025-11-21",
        actionType: "email",
        priority: 3,
        objective: "Provide VIP recognition experience that reinforces Elizabeth's special status as a Partner",
        context: "Elizabeth has been a $75K/year Partner for 4 years. She values exclusivity and peer connections with other major donors. She recently asked who else gives at her level and what special recognition they receive.",
        talkingPoints: [
          "Invite to intimate appreciation dinner with CEO and 3 board members",
          "Limit to 12 top Partners—emphasize exclusivity",
          "Mention specific peers who will attend (with permission)",
          "Offer special preview of strategic plan before public release"
        ],
        sampleScript: "Subject: An Intimate Evening with Our Visionaries—You're Invited\n\nDear Elizabeth,\n\nYou've asked what it means to be among our most treasured Partners. This December 12th, I'd like to show you.\n\nOur CEO and select board members are hosting an intimate dinner for just 12 of our Partner-level donors. It's an evening of gratitude, connection, and a first look at our strategic vision for 2026.\n\nI reserved a seat for you because you belong in this room. The Thompsons and the Chens have already confirmed—I know you'll enjoy reconnecting with them.\n\nWill you join us?\n\nWarmly,\nMaria",
        expectedOutcome: "Confirm attendance and reinforce feelings of exclusivity and belonging",
        nextSteps: [
          "Send formal invitation with RSVP deadline",
          "Prepare seating chart for optimal relationship building",
          "Brief CEO on Elizabeth's interests and recent giving",
          "Arrange personalized gift for each attendee"
        ]
      },
      {
        id: "7",
        donorName: "Richard and Susan Kim",
        currentQuadrant: "Partner",
        targetQuadrant: "Partner",
        suggestedAction: "Schedule annual 'Partnership Review' meeting to discuss impact and 2026 priorities",
        recommendedOwner: "Sarah Chen",
        targetDate: "2025-11-22",
        actionType: "meeting",
        priority: 4,
        objective: "Conduct formal annual review that treats the Kims as true partners in mission delivery",
        context: "The Kims give $50K/year and fund our housing stability program. They're hands-on and want to be involved in program decisions. Richard has expertise in affordable housing development that could be valuable.",
        talkingPoints: [
          "Review 2025 program outcomes with specific metrics",
          "Discuss 3 families who achieved housing stability thanks to their support",
          "Ask for their input on 2026 program priorities",
          "Explore whether Richard would advise on our housing expansion plans",
          "Discuss potential for increased support in 2026"
        ],
        sampleScript: "Richard and Susan, thank you for making time for our annual Partnership Review. I use that word intentionally—you're not donors to us, you're partners in this mission. Today I want to show you what we accomplished together in 2025, hear your thoughts on how we can improve, and discuss how we might deepen our work together in 2026. I also have a special request: Richard, your housing development expertise could be invaluable as we plan our expansion. Would you consider joining our Housing Advisory Council?",
        expectedOutcome: "Reaffirm 2026 giving and secure Richard's advisory involvement",
        nextSteps: [
          "Prepare comprehensive 2025 impact report",
          "Draft Housing Advisory Council charter and expectations",
          "Schedule site visit to housing program locations",
          "Prepare 2026 proposal with modest increase ask"
        ]
      },
      {
        id: "8",
        donorName: "James Morrison",
        currentQuadrant: "Partner",
        targetQuadrant: "Partner",
        suggestedAction: "Personal note and call to share exciting news about program expansion",
        recommendedOwner: "Ben Davis",
        targetDate: "2025-11-23",
        actionType: "call",
        priority: 5,
        objective: "Keep James engaged by sharing 'insider' news and making him feel like a true partner",
        context: "James gives $40K/year but lives out of state and can't attend events. He risks feeling disconnected. He specifically funds workforce development and tracks employment outcomes closely.",
        talkingPoints: [
          "Share breaking news: 85% job placement rate announced this week",
          "Tell him he's one of the first to know (exclusive access)",
          "Share story of a recent graduate who landed a $65K job",
          "Ask if he'd be willing to virtually mentor program participants",
          "Discuss upcoming virtual program tour for remote Partners"
        ],
        sampleScript: "James, Ben Davis here. I'm calling with news I wanted you to hear before we announce it publicly next week. Our workforce program just hit 85% job placement—the highest in our history. As someone who's been investing in this program for years, this is your success story too. I also wanted to ask you something: we have participants who would benefit enormously from connecting with successful professionals like you. Would you ever consider spending 30 minutes a month on virtual mentoring calls? The impact would be tremendous.",
        expectedOutcome: "Reinforce partnership value and explore volunteer engagement opportunity",
        nextSteps: [
          "Send detailed placement statistics via email post-call",
          "Prepare virtual mentoring program overview",
          "Schedule virtual program tour for December",
          "Connect him with 2-3 potential mentees"
        ]
      }
    ],
    "activate-friends": [
      {
        id: "6",
        donorName: "Alice Hart",
        currentQuadrant: "Friend",
        targetQuadrant: "Partner",
        suggestedAction: "60-minute coffee to explore specific project alignment with their interests",
        recommendedOwner: "Sarah Chen",
        targetDate: "2025-11-21",
        actionType: "meeting",
        priority: 1,
        objective: "Discover Alice's specific passions and identify project alignment for major gift cultivation",
        context: "Alice gives $2,000/year but has significant capacity (successful tech executive, recently sold company). She's highly engaged—opens every email, attends all events—but we've never had a substantive one-on-one conversation about her interests.",
        talkingPoints: [
          "Express appreciation for her consistent engagement and support",
          "Ask about her philanthropic priorities and what drives her giving",
          "Listen for specific program areas that resonate most",
          "Share 2-3 project opportunities at different giving levels",
          "Explore what meaningful partnership would look like to her"
        ],
        sampleScript: "Alice, I really appreciate you making time for coffee. I've noticed how engaged you've been with our work—you open every email, you're at every event—and I realized we've never had a chance to really talk about what draws you to our mission. I'd love to learn more about your philanthropic priorities and see if there's a specific area of our work that resonates most. What is it about our organization that keeps you coming back?",
        expectedOutcome: "Identify specific program alignment and secure agreement to receive a proposal",
        nextSteps: [
          "Research Alice's company sale and estimated capacity",
          "Prepare 2-3 naming/project opportunities ($25K-$100K)",
          "Send thank-you note with discussed opportunities attached",
          "Schedule follow-up meeting to present formal proposal"
        ]
      },
      {
        id: "7",
        donorName: "Amanda Foster",
        currentQuadrant: "Friend",
        targetQuadrant: "Partner",
        suggestedAction: "Invite to join development committee - capitalize on their advocacy",
        recommendedOwner: "Maria Garcia",
        targetDate: "2025-11-22",
        actionType: "email",
        priority: 2,
        objective: "Leverage Amanda's natural advocacy by giving her a formal volunteer leadership role",
        context: "Amanda gives $1,500/year but has referred 6 new donors this year. She's a natural connector and advocate. Joining the development committee would channel her energy productively and likely increase her own giving.",
        talkingPoints: [
          "Recognize her extraordinary referral track record",
          "Explain development committee role and time commitment",
          "Emphasize how her network and skills are needed",
          "Describe benefits: exclusive access, peer connections, impact involvement"
        ],
        sampleScript: "Subject: An Invitation to Amplify Your Impact\n\nDear Amanda,\n\nI was reviewing our donor data and discovered something remarkable: you've personally referred six new donors this year. That's more than anyone else in our community.\n\nYour natural ability to connect people to our mission is extraordinary, and I'd like to give you a bigger platform to use it. I'm inviting you to join our Development Committee—a small group of passionate advocates who help us build relationships and expand our donor community.\n\nThe commitment is modest (quarterly meetings, 4-5 hours/month), but the impact is significant. And honestly? You're already doing the work. This just makes it official.\n\nCan we schedule a call to discuss?\n\nWith appreciation,\nMaria",
        expectedOutcome: "Secure interest in development committee role and schedule orientation call",
        nextSteps: [
          "Prepare development committee charter and expectations",
          "Identify 2 current committee members for peer connection",
          "Plan committee member recognition at next event",
          "Discuss pathway to board service in 2-3 years"
        ]
      },
      {
        id: "9",
        donorName: "Thomas Wright",
        currentQuadrant: "Friend",
        targetQuadrant: "Partner",
        suggestedAction: "Thank-you call for event attendance and explore giving increase",
        recommendedOwner: "Ben Davis",
        targetDate: "2025-11-23",
        actionType: "call",
        priority: 3,
        objective: "Capitalize on recent positive experience to deepen relationship and discuss capacity",
        context: "Thomas attended his first gala this year and was visibly moved by the program presentation. He's given $3,000/year for 2 years but left early before we could connect. He's a senior partner at a law firm.",
        talkingPoints: [
          "Reference specific moment from gala that seemed to move him",
          "Ask what he thought of the student testimonials",
          "Explore whether he'd like to see programs firsthand",
          "Gently inquire about matching gift and firm giving programs",
          "Plant seed for increased giving conversation"
        ],
        sampleScript: "Thomas, this is Ben Davis calling. I noticed you at the gala and wanted to reach out—I saw your reaction during Maria's speech about her journey. It clearly moved you, and I'd love to hear what resonated. Have you ever considered seeing our programs in action? A site visit can be really powerful. Also, I'm curious—does your firm have a matching gift or corporate giving program? Many of our legal professional donors have been able to amplify their impact significantly through their firms.",
        expectedOutcome: "Schedule site visit and explore corporate matching opportunity",
        nextSteps: [
          "Research law firm's giving policies",
          "Schedule site visit within 3 weeks",
          "Connect with firm's CSR department",
          "Prepare ask for doubled gift with corporate match"
        ]
      },
      {
        id: "10",
        donorName: "Helen Marshall",
        currentQuadrant: "Friend",
        targetQuadrant: "Partner",
        suggestedAction: "Send personalized video message from program participant",
        recommendedOwner: "Sarah Chen",
        targetDate: "2025-11-24",
        actionType: "email",
        priority: 4,
        objective: "Create emotional connection through direct beneficiary contact to inspire upgrade",
        context: "Helen is a retired nurse ($2,500/year) who is passionate about healthcare access. She's responded emotionally to stories but has never met a program participant. A personalized video could be the catalyst for a major step-up.",
        talkingPoints: [
          "Personalized video from Maria, who received medical assistance",
          "Direct thanks naming Helen specifically",
          "Invitation to meet Maria in person",
          "Offer to discuss how Helen could fund similar stories"
        ],
        sampleScript: "Subject: Helen, Maria Has Something to Tell You\n\nDear Helen,\n\nI have a special message for you. Maria, one of our community health program participants, asked if she could personally thank the donors who made her care possible.\n\nShe recorded this video just for you. [VIDEO LINK]\n\nMaria doesn't know how much you've given or how long you've been supporting us. She just knows that people like you changed her life.\n\nWould you like to meet her? I'd be honored to arrange it.\n\nWith gratitude,\nSarah",
        expectedOutcome: "Deepen emotional connection and secure in-person meeting",
        nextSteps: [
          "Coordinate video recording with Maria (with consent)",
          "Schedule potential coffee meeting between Helen and Maria",
          "Prepare giving upgrade conversation for post-meeting",
          "Discuss legacy giving opportunity"
        ]
      },
      {
        id: "11",
        donorName: "Kevin O'Brien",
        currentQuadrant: "Friend",
        targetQuadrant: "Partner",
        suggestedAction: "Coffee meeting to discuss family foundation involvement",
        recommendedOwner: "Maria Garcia",
        targetDate: "2025-11-25",
        actionType: "meeting",
        priority: 5,
        objective: "Transition Kevin from personal giving to family foundation engagement",
        context: "Kevin gives $5,000/year personally but recently established the O'Brien Family Foundation with $2M in assets. He's on the foundation board with his wife and two adult children. This represents major gift potential.",
        talkingPoints: [
          "Congratulate him on establishing the family foundation",
          "Ask about the foundation's focus areas and grantmaking process",
          "Explore alignment with our education and workforce programs",
          "Offer to present to the full foundation board",
          "Discuss multi-year grant opportunity"
        ],
        sampleScript: "Kevin, congratulations on establishing the O'Brien Family Foundation—what an incredible way to engage your whole family in philanthropy. I'd love to learn more about your focus areas and how you're approaching grantmaking. Our education and workforce programs might align well with your interests. If they do, I'd be honored to present to your full board. What does your foundation's decision-making process look like?",
        expectedOutcome: "Secure invitation to present to family foundation board",
        nextSteps: [
          "Research O'Brien Family Foundation's stated mission",
          "Prepare foundation-appropriate proposal ($50K-$100K/year)",
          "Identify peer family foundations for reference",
          "Schedule board presentation for Q1"
        ]
      }
    ],
    "reengage-colleagues": [
      {
        id: "8",
        donorName: "Robert Morrison",
        currentQuadrant: "Colleague",
        targetQuadrant: "Partner",
        suggestedAction: "Follow up on capital campaign inquiry from gala with case for support",
        recommendedOwner: "Ben Davis",
        targetDate: "2025-11-20",
        actionType: "call",
        priority: 1,
        objective: "Convert Robert's casual interest into formal campaign consideration",
        context: "Robert asked about the capital campaign at the gala but was rushed. He gives $7,500/year steadily but engagement is low—he doesn't attend events or respond to cultivation. This was his first in-person interaction in 2 years.",
        talkingPoints: [
          "Reference the specific conversation from the gala",
          "Share concise capital campaign overview and naming opportunities",
          "Ask about his timeline for major philanthropic decisions",
          "Offer private tour of the construction site",
          "Explore what level of involvement would interest him"
        ],
        sampleScript: "Robert, this is Ben Davis. We spoke briefly at the gala about the capital campaign, and I wanted to follow up while it's fresh. You asked some great questions that I didn't have time to fully answer. The campaign is at $12M of our $18M goal, and we still have some significant naming opportunities available. I'd love to share our case for support and give you a private tour of the construction site. What questions were you hoping to get answered?",
        expectedOutcome: "Schedule private tour and present naming opportunity",
        nextSteps: [
          "Send case for support document within 24 hours",
          "Schedule construction site tour",
          "Prepare naming opportunity options at $50K-$250K",
          "Research Robert's company for corporate match potential"
        ]
      },
      {
        id: "9",
        donorName: "Jennifer Wu",
        currentQuadrant: "Colleague",
        targetQuadrant: "Partner",
        suggestedAction: "Explore beyond-match giving opportunity - they maxed corporate match",
        recommendedOwner: "Sarah Chen",
        targetDate: "2025-11-21",
        actionType: "email",
        priority: 2,
        objective: "Leverage Jennifer's clear interest (maxed match) to discuss personal increased giving",
        context: "Jennifer gives $5,000/year and maxed her $5,000 corporate match for a total of $10,000 impact. She works at a tech company and has significant capacity. The fact that she maxed her match signals high engagement with giving.",
        talkingPoints: [
          "Thank her for maximizing her corporate match",
          "Celebrate the $10,000 total impact",
          "Explore what programs resonate most with her",
          "Discuss opportunities beyond the corporate match limit",
          "Invite her to a program site visit"
        ],
        sampleScript: "Subject: You Doubled Your Impact—Let's Triple It\n\nDear Jennifer,\n\nI wanted to personally thank you for maximizing your TechCorp matching gift this year. Your $5,000 gift, doubled to $10,000, funded a full semester of STEM education for 15 students.\n\nI noticed you've maxed your match for three years running, which tells me you're genuinely committed to our mission. I'd love to explore how we might deepen your involvement—perhaps a project that inspires you to give beyond the match limit?\n\nWould you be open to a coffee conversation about what most excites you about our work?\n\nWith gratitude,\nSarah",
        expectedOutcome: "Secure coffee meeting to discuss increased personal giving",
        nextSteps: [
          "Research Jennifer's interests from giving history",
          "Prepare 2-3 project opportunities at $10K-$25K level",
          "Schedule informal coffee meeting",
          "Explore Leadership Circle membership"
        ]
      },
      {
        id: "12",
        donorName: "George Palmer",
        currentQuadrant: "Colleague",
        targetQuadrant: "Partner",
        suggestedAction: "Reconnection call after 18-month engagement gap",
        recommendedOwner: "Ben Davis",
        targetDate: "2025-11-22",
        actionType: "call",
        priority: 3,
        objective: "Understand why engagement dropped and rebuild relationship",
        context: "George was a $10,000/year donor who attended every event until 18 months ago. His giving continues but he's declined all invitations. Something changed—could be personal, could be organizational. We need to understand.",
        talkingPoints: [
          "Acknowledge we've missed seeing him",
          "Ask open-ended questions about what's changed",
          "Listen carefully for clues about disengagement",
          "Share organizational updates and new programs",
          "Invite him back in a low-pressure way"
        ],
        sampleScript: "George, this is Ben Davis. I've been meaning to reach out because we've genuinely missed you these past 18 months. You were such an engaged part of our community, and your absence hasn't gone unnoticed. I hope everything is okay with you and your family. I'm not calling to ask for anything—I just wanted to reconnect and see how you're doing. Has something changed that we should know about?",
        expectedOutcome: "Understand reason for disengagement and rebuild relationship",
        nextSteps: [
          "Listen carefully and take detailed notes",
          "Address any organizational concerns directly",
          "Propose low-pressure re-engagement opportunity",
          "Schedule follow-up within 2 weeks"
        ]
      },
      {
        id: "13",
        donorName: "Diana Foster",
        currentQuadrant: "Colleague",
        targetQuadrant: "Partner",
        suggestedAction: "Send exclusive impact preview before public announcement",
        recommendedOwner: "Maria Garcia",
        targetDate: "2025-11-23",
        actionType: "email",
        priority: 4,
        objective: "Make Diana feel valued through exclusive insider access",
        context: "Diana gives $6,000/year like clockwork but never responds to outreach. Her engagement score is low but her loyalty is high—she's given for 8 consecutive years. She may just need to feel special.",
        talkingPoints: [
          "Recognize her extraordinary 8-year loyalty",
          "Share impact preview exclusively before public release",
          "Make her feel like an insider, not just a donor",
          "Invite her to exclusive recognition event"
        ],
        sampleScript: "Subject: For Your Eyes Only—Before We Tell the World\n\nDear Diana,\n\nNext week, we're announcing a major milestone: we've served 10,000 families through our housing program. But I wanted you to know first.\n\nYou've supported us faithfully for 8 years—through leadership changes, strategic shifts, and a global pandemic. That kind of loyalty is rare, and you deserve to be among the first to celebrate this achievement.\n\nThank you for being the quiet foundation that makes our impact possible. Would you join us for a small reception where we'll toast to this milestone with our most loyal supporters?\n\nWith deep appreciation,\nMaria",
        expectedOutcome: "Elicit response and secure event attendance",
        nextSteps: [
          "Track email open and engagement",
          "Follow up with phone call if no response",
          "Prepare special recognition at event",
          "Explore what would deepen her engagement"
        ]
      },
      {
        id: "14",
        donorName: "William Torres",
        currentQuadrant: "Colleague",
        targetQuadrant: "Partner",
        suggestedAction: "Coffee meeting to discuss DAF giving and year-end timing",
        recommendedOwner: "Sarah Chen",
        targetDate: "2025-11-24",
        actionType: "meeting",
        priority: 5,
        objective: "Optimize William's giving through DAF and year-end tax planning conversation",
        context: "William gives $8,000/year from his DAF but has over $200,000 in his Fidelity Charitable account. He's a financial advisor and would appreciate sophisticated giving conversation. Year-end is the perfect time.",
        talkingPoints: [
          "Discuss tax-advantaged giving strategies",
          "Explore multi-year DAF commitment",
          "Present named fund opportunity",
          "Discuss year-end timing for maximum impact",
          "Offer to work with his financial planning"
        ],
        sampleScript: "William, as a financial advisor, I know you understand the strategic value of year-end giving. I'd love to discuss how we might work together to maximize your philanthropic impact—potentially through a multi-year DAF commitment or named fund opportunity. With your DAF balance and our upcoming programs, there might be a creative way to create lasting impact while meeting your tax planning goals. Would you be open to a brief conversation about options?",
        expectedOutcome: "Secure multi-year DAF commitment or significant year-end gift",
        nextSteps: [
          "Research DAF giving best practices",
          "Prepare named fund and multi-year options",
          "Coordinate with development officer on ask strategy",
          "Follow up on December 15 for final year-end decision"
        ]
      }
    ],
    "surface-acquaintances": [
      {
        id: "10",
        donorName: "Lisa Rodriguez",
        currentQuadrant: "Acquaintance",
        targetQuadrant: "Colleague",
        suggestedAction: "Phone call to gauge interest - high email engagement signals",
        recommendedOwner: "James Wilson",
        targetDate: "2025-11-22",
        actionType: "call",
        priority: 1,
        objective: "Convert digital engagement into personal relationship through first direct contact",
        context: "Lisa has only given $100 once but opens 95% of emails and has clicked on every impact story. She's clearly interested but hasn't been personally cultivated. This is a 'surface the hidden gem' opportunity.",
        talkingPoints: [
          "Acknowledge her email engagement (without being creepy)",
          "Ask what stories have resonated most with her",
          "Explore her connection to the mission",
          "Invite her to an upcoming event or tour",
          "Ask if she'd like more personalized communication"
        ],
        sampleScript: "Hi Lisa, this is James Wilson from NCR. I'm reaching out because I noticed you've been really engaged with our stories and updates—and I wanted to say thank you for paying attention. Not everyone does. I'm curious: what is it about our work that resonates with you? I'd love to understand what drew you to us and whether there's a way we can deepen that connection. Have you ever considered visiting one of our programs in person?",
        expectedOutcome: "Establish personal relationship and secure event or tour attendance",
        nextSteps: [
          "Note specific stories she's clicked on for conversation",
          "Invite to upcoming open house event",
          "Schedule tour if she expresses strong interest",
          "Add to upgraded cultivation track"
        ]
      },
      {
        id: "11",
        donorName: "David Patel",
        currentQuadrant: "Acquaintance",
        targetQuadrant: "Colleague",
        suggestedAction: "Follow-up thank you call after first event attendance last week",
        recommendedOwner: "Maria Garcia",
        targetDate: "2025-11-23",
        actionType: "call",
        priority: 2,
        objective: "Build on momentum from first event attendance to deepen new relationship",
        context: "David attended his first event last week after giving $250 six months ago. He stayed late and asked questions. This is a hot lead—first event attendance is a major engagement signal.",
        talkingPoints: [
          "Thank him for attending and staying late",
          "Ask what he thought of the event",
          "Explore what questions came up for him",
          "Invite to next engagement opportunity",
          "Ask how he prefers to stay connected"
        ],
        sampleScript: "David, this is Maria from NCR. I wanted to personally thank you for coming to our event last week—and for staying late to ask questions! That tells me you're genuinely interested in what we do. I'd love to hear your honest impressions. What struck you? Was there anything that surprised you or that you'd want to learn more about? And how would you like to stay connected with us going forward?",
        expectedOutcome: "Build personal relationship and identify next engagement opportunity",
        nextSteps: [
          "Send personalized follow-up email with event photos",
          "Add to higher-touch cultivation track",
          "Invite to program site visit",
          "Explore giving increase for year-end"
        ]
      },
      {
        id: "15",
        donorName: "Rachel Green",
        currentQuadrant: "Acquaintance",
        targetQuadrant: "Colleague",
        suggestedAction: "LinkedIn connection and message to explore shared network",
        recommendedOwner: "Ben Davis",
        targetDate: "2025-11-24",
        actionType: "email",
        priority: 3,
        objective: "Use shared connections to warm the relationship and understand her interests",
        context: "Rachel gave $150 once through a friend's fundraising page. She's connected to 4 board members on LinkedIn and runs a marketing agency. She's likely worth cultivating but we have no relationship.",
        talkingPoints: [
          "Reference shared connections (with permission)",
          "Express interest in learning about her agency's work",
          "Share brief overview of mission and current initiatives",
          "Invite to coffee to explore potential alignment"
        ],
        sampleScript: "Subject: We Have 4 Friends in Common—Let's Meet\n\nHi Rachel,\n\nI noticed we share connections with several of our board members, and when I learned about your agency's work in purpose-driven marketing, I thought we should connect.\n\nYou supported us through Sarah's campaign last year, and I'd love to tell you more about what that gift helped accomplish. Our mission might align with some of your clients' interests too.\n\nWould you be open to a brief coffee? I'd genuinely love to learn more about your work and share a bit about ours.\n\nBest,\nBen",
        expectedOutcome: "Secure coffee meeting and begin cultivation relationship",
        nextSteps: [
          "Get permission from board members to reference them",
          "Research Rachel's agency and client base",
          "Explore potential partnership opportunities",
          "Consider for event committee or marketing support"
        ]
      },
      {
        id: "16",
        donorName: "Christopher Lee",
        currentQuadrant: "Acquaintance",
        targetQuadrant: "Colleague",
        suggestedAction: "Thank-you call for recent first gift and welcome to community",
        recommendedOwner: "Maria Garcia",
        targetDate: "2025-11-25",
        actionType: "call",
        priority: 4,
        objective: "Make exceptional first impression to maximize retention and upgrade potential",
        context: "Christopher just made his first gift of $500 last week after attending a friend's event. He's a doctor at the local hospital. First-time donor retention is critical—a personal call within a week dramatically increases year 2 retention.",
        talkingPoints: [
          "Express genuine, warm thanks for first gift",
          "Ask how he heard about the organization",
          "Explore what motivated his decision to give",
          "Share brief impact his gift will have",
          "Ask how he'd like to stay engaged"
        ],
        sampleScript: "Dr. Lee, this is Maria Garcia from NCR. I'm calling to personally thank you for your generous first gift last week. $500 is a meaningful commitment, and I wanted you to know it didn't go unnoticed. Can you tell me what inspired you to support us? [Listen] That's wonderful to hear. Your gift will help provide healthcare access to 5 families this month. As a physician, I imagine that resonates with you. How would you like to stay connected with us? We have some healthcare-focused programs that might particularly interest you.",
        expectedOutcome: "Build personal connection and identify engagement preferences",
        nextSteps: [
          "Send handwritten thank-you note within 48 hours",
          "Add to healthcare professional cultivation track",
          "Invite to healthcare-focused program event",
          "Explore hospital matching gift program"
        ]
      },
      {
        id: "17",
        donorName: "Nancy Miller",
        currentQuadrant: "Acquaintance",
        targetQuadrant: "Colleague",
        suggestedAction: "Email with personalized content based on interests",
        recommendedOwner: "Sarah Chen",
        targetDate: "2025-11-26",
        actionType: "email",
        priority: 5,
        objective: "Move Nancy from generic communications to personalized relationship track",
        context: "Nancy has given $200/year for 3 years but never responded to any outreach. However, she's clicked on every education-related story. She's clearly interested in education specifically but we've never acknowledged that.",
        talkingPoints: [
          "Acknowledge her specific interest in education",
          "Share exclusive education program update",
          "Invite to education-focused event",
          "Ask what draws her to education work"
        ],
        sampleScript: "Subject: Nancy, I Noticed Something About You\n\nDear Nancy,\n\nThank you for your steady support over the past three years. I've noticed something: whenever we share stories about our education programs, you're the first to read them.\n\nThat tells me education is close to your heart. Am I right?\n\nI wanted to share something just for you: next month, we're opening our new STEM lab. As someone who cares deeply about education, I thought you'd want to know before we announce it publicly.\n\nWould you like to join me for the ribbon-cutting? I'd love to meet you and hear what draws you to this work.\n\nWarmly,\nSarah",
        expectedOutcome: "Elicit response and establish personal connection",
        nextSteps: [
          "Segment Nancy into education-focused communications",
          "Invite to STEM lab opening event",
          "Prepare to upgrade cultivation if she responds",
          "Explore education committee involvement"
        ]
      }
    ],
  };

  // Filter based on constraints
  const allMoves = baseMoves[focus];
  let selectedMoves: ActionableMove[] = [];
  let meetingsCount = 0;
  let callsCount = 0;
  let emailsCount = 0;

  for (const move of allMoves) {
    if (move.actionType === "meeting" && meetingsCount < constraints.meetings) {
      selectedMoves.push(move);
      meetingsCount++;
    } else if (move.actionType === "call" && callsCount < constraints.calls) {
      selectedMoves.push(move);
      callsCount++;
    } else if (move.actionType === "email" && emailsCount < constraints.emails) {
      selectedMoves.push(move);
      emailsCount++;
    }
  }

  return selectedMoves;
};

export default function PartnerPathwayWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [constraints, setConstraints] = useState<WeeklyConstraints>({
    meetings: 3,
    calls: 5,
    emails: 10,
  });
  const [focus, setFocus] = useState<FocusArea>("grow-partners");
  const [actionPlan, setActionPlan] = useState<ActionableMove[]>([]);
  
  // Track raw input values and validation errors
  const [inputValues, setInputValues] = useState({
    meetings: "3",
    calls: "5",
    emails: "10",
  });
  const [errors, setErrors] = useState({
    meetings: "",
    calls: "",
    emails: "",
  });

  // Validate constraints
  const isStep1Valid = () => {
    return (
      !isNaN(constraints.meetings) &&
      !isNaN(constraints.calls) &&
      !isNaN(constraints.emails) &&
      constraints.meetings >= 0 &&
      constraints.calls >= 0 &&
      constraints.emails >= 0 &&
      constraints.meetings > 0 ||
      constraints.calls > 0 ||
      constraints.emails > 0
    );
  };

  const validateField = (field: keyof WeeklyConstraints, value: string): string => {
    if (value === "") {
      return "This field is required";
    }
    const numValue = parseInt(value);
    if (isNaN(numValue)) {
      return "Please enter a valid number";
    }
    if (numValue < 0) {
      return "Value must be 0 or greater";
    }
    return "";
  };

  const handleConstraintChange = (field: keyof WeeklyConstraints, value: string) => {
    // Update raw input value
    setInputValues({
      ...inputValues,
      [field]: value,
    });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const handleConstraintBlur = (field: keyof WeeklyConstraints) => {
    const value = inputValues[field];
    const error = validateField(field, value);
    
    setErrors({
      ...errors,
      [field]: error,
    });
    
    // Update constraints if valid
    if (!error) {
      const numValue = parseInt(value);
      setConstraints({
        ...constraints,
        [field]: numValue,
      });
    }
  };

  const handleNext = () => {
    if (currentStep === 3) {
      // Generate action plan
      const plan = generateActionPlan(constraints, focus);
      setActionPlan(plan);
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setConstraints({ meetings: 3, calls: 5, emails: 10 });
    setInputValues({ meetings: "3", calls: "5", emails: "10" });
    setErrors({ meetings: "", calls: "", emails: "" });
    setFocus("grow-partners");
    setActionPlan([]);
  };

  const getQuadrantColor = (quadrant: string) => {
    switch (quadrant) {
      case "Partner":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "Friend":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
      case "Colleague":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "Acquaintance":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case "meeting":
        return Calendar;
      case "call":
        return Phone;
      case "email":
        return Mail;
      default:
        return Target;
    }
  };

  const stepLabels = ["Constraints", "Focus", "Review", "Action Plan"];
  const stepIcons = [Calendar, Target, CheckCircle2, Wand2];
  
  // Brand colors for each step: teal, olive, orange, coral
  // Inactive state uses 70% opacity for more saturated appearance
  const stepColors = [
    { bg: "#4FA6A6", light: "rgba(79, 166, 166, 0.7)", text: "#4FA6A6" }, // Teal
    { bg: "#92A05A", light: "rgba(146, 160, 90, 0.7)", text: "#92A05A" }, // Olive
    { bg: "#E8A54B", light: "rgba(232, 165, 75, 0.7)", text: "#E8A54B" }, // Orange
    { bg: "#E86B5A", light: "rgba(232, 107, 90, 0.7)", text: "#E86B5A" }, // Coral
  ];

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      {/* Compact Header with Step Navigation */}
      <div className="bg-[#395174]">
        <CardHeader className="pb-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-[#e1c47d]" />
            </div>
            <div>
              <CardTitle className="text-white text-lg">Partner Pathway Wizard</CardTitle>
              <CardDescription className="text-white/70">
                Generate your top actionable moves for the week
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        {/* Step Navigation Bar */}
        <div className="flex mt-4">
          {stepLabels.map((label, idx) => {
            const step = idx + 1;
            const StepIcon = stepIcons[idx];
            const isActive = currentStep === step;
            const isCompleted = currentStep > step;
            const color = stepColors[idx];
            return (
              <div
                key={step}
                className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors"
                style={{
                  backgroundColor: isActive 
                    ? color.bg 
                    : color.light,
                  color: "white"
                }}
                data-testid={`step-indicator-${step}`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                ) : (
                  <StepIcon className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{step}</span>
              </div>
            );
          })}
        </div>
      </div>
      
      <CardContent className="p-6 flex-1 overflow-auto">

        {/* Step 1: Weekly Constraints */}
        {currentStep === 1 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Set This Week's Constraints</h3>
              <p className="text-base text-muted-foreground mb-6">
                Help us understand your capacity so we don't suggest more than you can realistically accomplish.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="meetings" className="flex items-center gap-2 text-base">
                  <Calendar className="h-5 w-5" />
                  How many 1:1 meetings can you take this week?
                </Label>
                <Input
                  id="meetings"
                  type="number"
                  min="0"
                  max="20"
                  value={inputValues.meetings}
                  onChange={(e) => handleConstraintChange("meetings", e.target.value)}
                  onBlur={() => handleConstraintBlur("meetings")}
                  data-testid="input-meetings"
                  className={errors.meetings ? "border-red-500" : ""}
                />
                {errors.meetings && (
                  <p className="text-sm text-red-500" data-testid="error-meetings">
                    {errors.meetings}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="calls" className="flex items-center gap-2 text-base">
                  <Phone className="h-5 w-5" />
                  How many warm calls can you make?
                </Label>
                <Input
                  id="calls"
                  type="number"
                  min="0"
                  max="50"
                  value={inputValues.calls}
                  onChange={(e) => handleConstraintChange("calls", e.target.value)}
                  onBlur={() => handleConstraintBlur("calls")}
                  data-testid="input-calls"
                  className={errors.calls ? "border-red-500" : ""}
                />
                {errors.calls && (
                  <p className="text-sm text-red-500" data-testid="error-calls">
                    {errors.calls}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="emails" className="flex items-center gap-2 text-base">
                  <Mail className="h-5 w-5" />
                  How many personalized emails/proposals can you send?
                </Label>
                <Input
                  id="emails"
                  type="number"
                  min="0"
                  max="100"
                  value={inputValues.emails}
                  onChange={(e) => handleConstraintChange("emails", e.target.value)}
                  onBlur={() => handleConstraintBlur("emails")}
                  data-testid="input-emails"
                  className={errors.emails ? "border-red-500" : ""}
                />
                {errors.emails && (
                  <p className="text-sm text-red-500" data-testid="error-emails">
                    {errors.emails}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Choose Focus */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose Your Focus</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Select the primary goal for this week's donor engagement efforts.
              </p>
            </div>

            <RadioGroup value={focus} onValueChange={(v) => setFocus(v as FocusArea)}>
              <div className="space-y-3">
                {focusOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div
                      key={option.value}
                      className={`flex items-start space-x-3 rounded-lg border-2 p-4 transition-colors hover-elevate ${
                        focus === option.value
                          ? "border-[#4FA6A6] bg-[#4FA6A6]/10 dark:bg-[#4FA6A6]/20"
                          : "border-muted"
                      }`}
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={option.value}
                        className="mt-1"
                        data-testid={`radio-${option.value}`}
                      />
                      <label
                        htmlFor={option.value}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-4 w-4" />
                          <span className="font-semibold">{option.label}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Review Your Selections</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Confirm your capacity and focus before we generate your action plan.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border p-4 space-y-3" data-testid="capacity-summary">
                <h4 className="font-semibold text-sm">Weekly Capacity</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center" data-testid="summary-meetings">
                    <Calendar className="h-5 w-5 mx-auto mb-1 text-[#4FA6A6]" />
                    <div className="text-2xl font-bold">{constraints.meetings}</div>
                    <div className="text-xs text-muted-foreground">Meetings</div>
                  </div>
                  <div className="text-center" data-testid="summary-calls">
                    <Phone className="h-5 w-5 mx-auto mb-1 text-[#92A05A]" />
                    <div className="text-2xl font-bold">{constraints.calls}</div>
                    <div className="text-xs text-muted-foreground">Calls</div>
                  </div>
                  <div className="text-center" data-testid="summary-emails">
                    <Mail className="h-5 w-5 mx-auto mb-1 text-[#E8A54B]" />
                    <div className="text-2xl font-bold">{constraints.emails}</div>
                    <div className="text-xs text-muted-foreground">Emails</div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4" data-testid="focus-summary">
                <h4 className="font-semibold text-sm mb-2">Focus Area</h4>
                <div className="flex items-center gap-2">
                  {(() => {
                    const selectedOption = focusOptions.find(opt => opt.value === focus);
                    const Icon = selectedOption?.icon || Target;
                    return (
                      <>
                        <Icon className="h-5 w-5 text-[#4FA6A6]" />
                        <span className="font-medium">{selectedOption?.label}</span>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Action Plan */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Your Weekly Action Plan</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Here are your top {actionPlan.length} recommended moves for this week, optimized for your capacity and focus. Click each action to see detailed guidance.
              </p>
            </div>

            {actionPlan.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No actions match your current constraints. Try adjusting your capacity.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {actionPlan.map((move, index) => {
                  const ActionIcon = getActionIcon(move.actionType);
                  return (
                    <Collapsible key={move.id}>
                      <div
                        className="rounded-lg border overflow-hidden"
                        data-testid={`action-plan-${move.id}`}
                      >
                        {/* Action Header */}
                        <CollapsibleTrigger className="w-full">
                          <div className="p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 space-y-2 text-left">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#395174] text-white text-sm font-bold">
                                    {index + 1}
                                  </div>
                                  <h4 className="font-semibold text-base">{move.donorName}</h4>
                                  <Badge variant="outline" className={getQuadrantColor(move.currentQuadrant)}>
                                    {move.currentQuadrant}
                                  </Badge>
                                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                  <Badge variant="outline" className={getQuadrantColor(move.targetQuadrant)}>
                                    {move.targetQuadrant}
                                  </Badge>
                                </div>
                                <p className="text-sm font-medium">{move.suggestedAction}</p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {move.recommendedOwner}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {new Date(move.targetDate).toLocaleDateString('en-US', { 
                                      month: 'short', 
                                      day: 'numeric' 
                                    })}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <ActionIcon className="h-3 w-3" />
                                    {move.actionType}
                                  </div>
                                </div>
                              </div>
                              <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0 transition-transform group-data-[state=open]:rotate-180" />
                            </div>
                          </div>
                        </CollapsibleTrigger>

                        {/* Expanded Content */}
                        <CollapsibleContent>
                          <div className="border-t bg-muted/20">
                            {/* Objective */}
                            <div className="p-4 border-b">
                              <div className="flex items-center gap-2 mb-2">
                                <Target className="h-4 w-4 text-[#4FA6A6]" />
                                <h5 className="font-semibold text-sm">Objective</h5>
                              </div>
                              <p className="text-sm">{move.objective}</p>
                            </div>

                            {/* Context */}
                            <div className="p-4 border-b">
                              <div className="flex items-center gap-2 mb-2">
                                <FileText className="h-4 w-4 text-[#7BC4DC]" />
                                <h5 className="font-semibold text-sm">Background & Context</h5>
                              </div>
                              <p className="text-sm text-muted-foreground">{move.context}</p>
                            </div>

                            {/* Talking Points */}
                            <div className="p-4 border-b">
                              <div className="flex items-center gap-2 mb-3">
                                <MessageSquare className="h-4 w-4 text-[#92A05A]" />
                                <h5 className="font-semibold text-sm">Key Talking Points</h5>
                              </div>
                              <ul className="space-y-2">
                                {move.talkingPoints.map((point, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-[#92A05A] shrink-0 mt-0.5" />
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Sample Script */}
                            {move.sampleScript && (
                              <div className="p-4 border-b">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <Lightbulb className="h-4 w-4 text-amber-500" />
                                    <h5 className="font-semibold text-sm">
                                      {move.actionType === 'email' ? 'Sample Email' : 'Sample Script'}
                                    </h5>
                                  </div>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-7 text-xs gap-1"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigator.clipboard.writeText(move.sampleScript || '');
                                    }}
                                    data-testid={`copy-script-${move.id}`}
                                  >
                                    <Copy className="h-3 w-3" />
                                    Copy
                                  </Button>
                                </div>
                                <div className="bg-background rounded-lg p-4 text-sm whitespace-pre-wrap border">
                                  {move.sampleScript}
                                </div>
                              </div>
                            )}

                            {/* Expected Outcome */}
                            <div className="p-4 border-b">
                              <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="h-4 w-4 text-[#4FA6A6]" />
                                <h5 className="font-semibold text-sm">Expected Outcome</h5>
                              </div>
                              <p className="text-sm font-medium text-[#4FA6A6] dark:text-[#7BC4DC]">{move.expectedOutcome}</p>
                            </div>

                            {/* Next Steps */}
                            <div className="p-4 border-b">
                              <div className="flex items-center gap-2 mb-3">
                                <ArrowRight className="h-4 w-4 text-[#E8A54B]" />
                                <h5 className="font-semibold text-sm">Follow-Up Steps</h5>
                              </div>
                              <ol className="space-y-2">
                                {move.nextSteps.map((step, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8A54B]/10 text-[#E8A54B] text-xs font-semibold shrink-0">
                                      {idx + 1}
                                    </span>
                                    <span>{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>

                            {/* Action Buttons */}
                            <div className="p-4 flex flex-wrap gap-2">
                              <Button size="sm" data-testid={`button-assign-${move.id}`}>
                                <User className="h-3 w-3 mr-1" />
                                Assign to Team Member
                              </Button>
                              <Button size="sm" variant="outline" data-testid={`button-calendar-${move.id}`}>
                                <Calendar className="h-3 w-3 mr-1" />
                                Add to Calendar
                              </Button>
                              <Button size="sm" variant="outline" data-testid={`button-complete-${move.id}`}>
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Mark Complete
                              </Button>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          {currentStep > 1 && currentStep < 4 && (
            <Button variant="outline" onClick={handleBack} data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          {currentStep === 4 && (
            <Button variant="outline" onClick={handleReset} data-testid="button-start-over">
              <RefreshCw className="h-4 w-4 mr-2" />
              Start Over
            </Button>
          )}
        </div>
        <div>
          {currentStep < 4 && (
            <Button 
              onClick={handleNext} 
              data-testid="button-next"
              disabled={currentStep === 1 && !isStep1Valid()}
            >
              {currentStep === 3 ? "Generate Action Plan" : "Next"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
