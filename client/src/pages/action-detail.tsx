import { useParams, Link } from "wouter";
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  Target, 
  Clock, 
  User, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  FileText,
  MessageSquare,
  Sparkles,
  Star,
  TrendingUp,
  Gift,
  Handshake,
  ClipboardList
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const accentColors = {
  teal: "#3D8C8C",
  olive: "#7A8450",
  orange: "#D4813B",
  coral: "#D27462",
  sky: "#7BC4DC",
  lime: "#9DC45F",
};

interface ActionData {
  id: number;
  date: string;
  time: string;
  donor: string;
  donorId: string | null;
  action: string;
  type: string;
  priority: string;
  context: string;
  objective: string;
  background: string;
  nextSteps: { step: string; completed: boolean }[];
  talkingPoints: string[];
  relatedMetrics: { label: string; value: string; trend?: string }[];
}

const actionsDatabase: ActionData[] = [
  {
    id: 1,
    date: "Today",
    time: "10:00 AM",
    donor: "Margaret Chen",
    donorId: "0cc9580d-c975-4222-890b-b6ceebe8bb3a",
    action: "Follow-up call",
    type: "call",
    priority: "High",
    context: "Discuss year-end giving opportunities and thank for previous support",
    objective: "Re-engage Margaret after 90+ days of limited contact and explore year-end giving opportunities before December 31st deadline.",
    background: "Margaret has been a consistent mid-level donor for 5 years, with an average annual gift of $15,000. Her last interaction was a brief email exchange in September. She has expressed interest in our housing programs.",
    nextSteps: [
      { step: "Review Margaret's giving history and recent communications", completed: true },
      { step: "Prepare personalized impact report highlighting housing program outcomes", completed: true },
      { step: "Schedule call for 10:00 AM today", completed: true },
      { step: "Make the call and document key discussion points", completed: false },
      { step: "Send thank-you email with any requested information within 24 hours", completed: false },
      { step: "Log interaction in CRM with follow-up tasks", completed: false },
    ],
    talkingPoints: [
      "Thank her for her continued support and loyalty to NCR",
      "Share 2024 impact highlights: 1,200 seniors served, 3 new facilities opened",
      "Ask about her experience at the September gala",
      "Explore interest in year-end giving or matching gift opportunities",
      "Invite her to the February donor appreciation event",
    ],
    relatedMetrics: [
      { label: "Lifetime Giving", value: "$78,500", trend: "+12% YoY" },
      { label: "Last Gift", value: "$12,000", trend: "March 2024" },
      { label: "Engagement Score", value: "72/100", trend: "-8 pts" },
    ],
  },
  {
    id: 2,
    date: "Tomorrow",
    time: "2:00 PM",
    donor: "Anderson Foundation",
    donorId: "261d8446-ce7c-4cee-977e-31347f162b2c",
    action: "Grant review meeting",
    type: "meeting",
    priority: "High",
    context: "$250K grant proposal pending review - prepare presentation materials",
    objective: "Present our housing expansion proposal to the Anderson Foundation board and address any questions about budget allocation and projected outcomes.",
    background: "The Anderson Foundation has been a major institutional funder for 8 years, with cumulative grants totaling $1.2M. They focus on senior housing and healthcare initiatives. This $250K proposal supports our Cleveland expansion project.",
    nextSteps: [
      { step: "Finalize presentation deck with updated budget projections", completed: true },
      { step: "Prepare one-page executive summary for board members", completed: true },
      { step: "Coordinate with CFO for financial Q&A preparation", completed: false },
      { step: "Conduct virtual meeting at 2:00 PM", completed: false },
      { step: "Send follow-up materials within 48 hours", completed: false },
      { step: "Schedule decision timeline check-in for next week", completed: false },
    ],
    talkingPoints: [
      "Present 3-year impact projections: 450 additional seniors housed",
      "Highlight partnerships with local healthcare providers",
      "Address sustainability plan beyond grant period",
      "Share success metrics from similar past projects",
      "Discuss naming and recognition opportunities",
    ],
    relatedMetrics: [
      { label: "Grant Amount", value: "$250,000", trend: "Pending" },
      { label: "Historical Funding", value: "$1.2M", trend: "8 years" },
      { label: "Success Rate", value: "85%", trend: "Past proposals" },
    ],
  },
  {
    id: 3,
    date: "Dec 18",
    time: "11:00 AM",
    donor: "Dr. James Morrison",
    donorId: "a275b91a-5634-4114-9cfb-e5a52f0d1c46",
    action: "Site visit",
    type: "visit",
    priority: "High",
    context: "Tour of new facility expansion - prepare impact report and talking points",
    objective: "Provide Dr. Morrison with a comprehensive facility tour showcasing our Cleveland expansion and cultivate his interest in a major gift for the capital campaign.",
    background: "Dr. Morrison is a retired physician with a net worth estimated at $8M+. He has made cumulative gifts of $45,000 over 6 years and recently expressed interest in our healthcare integration programs. This is a key cultivation opportunity.",
    nextSteps: [
      { step: "Confirm visit logistics and parking arrangements", completed: true },
      { step: "Prepare personalized welcome packet", completed: true },
      { step: "Coordinate with facility director for tour route", completed: false },
      { step: "Arrange meeting with resident council representative", completed: false },
      { step: "Conduct site visit and facility tour", completed: false },
      { step: "Follow up with capital campaign materials within 1 week", completed: false },
    ],
    talkingPoints: [
      "Welcome and thank him for making time to visit",
      "Highlight the healthcare integration wing named for major donors",
      "Introduce him to residents who can share their experience",
      "Discuss his vision for senior healthcare and how NCR aligns",
      "Explore interest in capital campaign naming opportunities",
    ],
    relatedMetrics: [
      { label: "Wealth Capacity", value: "$8M+", trend: "High" },
      { label: "Lifetime Giving", value: "$45,000", trend: "+22% YoY" },
      { label: "Affinity Score", value: "88/100", trend: "+15 pts" },
    ],
  },
  {
    id: 4,
    date: "Dec 20",
    time: "9:00 AM",
    donor: "Year-End Appeal",
    donorId: null,
    action: "Campaign launch",
    type: "campaign",
    priority: "High",
    context: "Launch coordinated year-end appeal across all channels",
    objective: "Execute a multi-channel year-end fundraising campaign targeting $500K in donations before December 31st, focusing on lapsed donor re-engagement and major gift solicitations.",
    background: "The Year-End Appeal is our largest annual fundraising initiative, historically generating 35% of annual giving revenue. This year's campaign features a $100K matching gift challenge from the Morrison Family Foundation.",
    nextSteps: [
      { step: "Finalize email sequence and landing pages", completed: true },
      { step: "Coordinate direct mail drop for December 18th", completed: true },
      { step: "Brief phone bank volunteers on talking points", completed: false },
      { step: "Launch email campaign at 9:00 AM December 20th", completed: false },
      { step: "Monitor real-time giving dashboard and adjust messaging", completed: false },
      { step: "Send thank-you messages within 24 hours of each gift", completed: false },
    ],
    talkingPoints: [
      "Highlight the $100K matching gift opportunity (doubles impact)",
      "Share 2024 accomplishments: 1,200 seniors served, 98% satisfaction",
      "Emphasize urgency: gifts must be received by December 31st",
      "Offer multiple giving options: one-time, monthly, stock transfer",
      "Recognize donors with appropriate acknowledgment levels",
    ],
    relatedMetrics: [
      { label: "Campaign Goal", value: "$500,000", trend: "Target" },
      { label: "Current Progress", value: "$284,000", trend: "57%" },
      { label: "Matching Available", value: "$100,000", trend: "Active" },
    ],
  },
];

const typeConfig: Record<string, { icon: any; color: string; label: string }> = {
  call: { icon: Phone, color: accentColors.coral, label: "Phone Call" },
  meeting: { icon: Calendar, color: accentColors.teal, label: "Meeting" },
  visit: { icon: MapPin, color: accentColors.sky, label: "Site Visit" },
  campaign: { icon: Target, color: accentColors.orange, label: "Campaign" },
  email: { icon: Mail, color: accentColors.olive, label: "Email" },
};

export default function ActionDetail() {
  const { id } = useParams<{ id: string }>();
  const actionId = parseInt(id || "0");
  const { toast } = useToast();
  
  const action = actionsDatabase.find(a => a.id === actionId);

  const handleLogInteraction = () => {
    toast({
      title: "Log Interaction",
      description: "Interaction logging form coming soon. This feature is under development.",
    });
  };

  const handleAddNote = () => {
    toast({
      title: "Add Note",
      description: "Note creation form coming soon. This feature is under development.",
    });
  };

  const handleScheduleFollowup = () => {
    toast({
      title: "Schedule Follow-up",
      description: "Follow-up scheduling form coming soon. This feature is under development.",
    });
  };
  
  if (!action) {
    return (
      <div className="p-6">
        <div className="text-center py-16">
          <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Action Not Found</h1>
          <p className="text-muted-foreground mb-6">The action you're looking for doesn't exist.</p>
          <Link href="/preview">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const config = typeConfig[action.type] || typeConfig.call;
  const TypeIcon = config.icon;
  const completedSteps = action.nextSteps.filter(s => s.completed).length;
  const progressPercent = (completedSteps / action.nextSteps.length) * 100;

  return (
    <div className="p-6 space-y-6">
      {/* Back Navigation */}
      <div className="flex items-center gap-4">
        <Link href="/preview">
          <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-dashboard">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div 
        className="rounded-xl overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${config.color}15 0%, ${config.color}05 100%)` }}
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-4">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${config.color}20` }}
              >
                <TypeIcon className="w-7 h-7" style={{ color: config.color }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge 
                    variant="outline" 
                    className="text-xs uppercase"
                    style={{ borderColor: config.color, color: config.color }}
                  >
                    {config.label}
                  </Badge>
                  <Badge 
                    variant={action.priority === "High" ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {action.priority} Priority
                  </Badge>
                </div>
                <h1 className="text-2xl font-bold mb-1" data-testid="text-action-title">{action.action}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {action.date} at {action.time}
                  </span>
                  {action.donorId ? (
                    <Link href={`/donors/${action.donorId}`}>
                      <span className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer" data-testid="link-donor-profile">
                        <User className="w-4 h-4" />
                        {action.donor}
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </Link>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {action.donor}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2" data-testid="button-log-complete">
                <CheckCircle2 className="w-4 h-4" />
                Mark Complete
              </Button>
              <Button size="sm" className="gap-2" data-testid="button-start-action">
                <Sparkles className="w-4 h-4" />
                Start Action
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Objective */}
          <Card>
            <CardHeader className="bg-[#7BC4DC] text-white rounded-t-xl py-3 px-4">
              <CardTitle className="text-white text-base flex items-center gap-2">
                <Target className="w-4 h-4" />
                Objective
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm leading-relaxed" data-testid="text-objective">{action.objective}</p>
            </CardContent>
          </Card>

          {/* Background & Context */}
          <Card>
            <CardHeader className="bg-[#7BC4DC] text-white rounded-t-xl py-3 px-4">
              <CardTitle className="text-white text-base flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Background & Context
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm leading-relaxed mb-4" data-testid="text-background">{action.background}</p>
              <div 
                className="p-3 rounded-lg text-sm"
                style={{ backgroundColor: `${config.color}10`, borderLeft: `3px solid ${config.color}` }}
              >
                <strong>Key Context:</strong> {action.context}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps Checklist */}
          <Card>
            <CardHeader className="bg-[#7BC4DC] text-white rounded-t-xl py-3 px-4">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-white text-base flex items-center gap-2">
                  <ClipboardList className="w-4 h-4" />
                  Next Steps
                </CardTitle>
                <span className="text-sm text-white/80">{completedSteps}/{action.nextSteps.length} completed</span>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <Progress value={progressPercent} className="h-2" />
              <div className="space-y-2">
                {action.nextSteps.map((step, idx) => (
                  <div 
                    key={idx}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                      step.completed 
                        ? 'bg-muted/30 border-muted' 
                        : 'bg-card hover-elevate cursor-pointer'
                    }`}
                    data-testid={`step-${idx}`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      step.completed ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'
                    }`}>
                      {step.completed ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-medium">{idx + 1}</span>
                      )}
                    </div>
                    <span className={`text-sm ${step.completed ? 'text-muted-foreground line-through' : ''}`}>
                      {step.step}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Talking Points */}
          <Card>
            <CardHeader className="bg-[#7BC4DC] text-white rounded-t-xl py-3 px-4">
              <CardTitle className="text-white text-base flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Talking Points & Key Messages
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-3">
                {action.talkingPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3" data-testid={`talking-point-${idx}`}>
                    <Star className="w-4 h-4 mt-0.5 shrink-0" style={{ color: config.color }} />
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Metrics & Quick Actions */}
        <div className="space-y-6">
          {/* Related Metrics */}
          <Card>
            <CardHeader 
              className="rounded-t-xl py-3 px-4"
              style={{ background: `linear-gradient(135deg, ${config.color}15 0%, ${config.color}05 100%)` }}
            >
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4" style={{ color: config.color }} />
                Key Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {action.relatedMetrics.map((metric, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${config.color}08` }}
                  data-testid={`metric-${idx}`}
                >
                  <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-lg font-bold">{metric.value}</span>
                    {metric.trend && (
                      <span className="text-xs text-muted-foreground">{metric.trend}</span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader 
              className="rounded-t-xl py-3 px-4"
              style={{ background: `linear-gradient(135deg, ${accentColors.olive}15 0%, ${accentColors.olive}05 100%)` }}
            >
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4" style={{ color: accentColors.olive }} />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {action.donorId && (
                <Link href={`/donors/${action.donorId}`}>
                  <Button variant="outline" className="w-full justify-start gap-2" data-testid="button-view-donor">
                    <User className="w-4 h-4" />
                    View Donor Profile
                  </Button>
                </Link>
              )}
              <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogInteraction} data-testid="button-log-interaction">
                <Phone className="w-4 h-4" />
                Log Interaction
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" onClick={handleAddNote} data-testid="button-add-note">
                <FileText className="w-4 h-4" />
                Add Note
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" onClick={handleScheduleFollowup} data-testid="button-schedule-followup">
                <Calendar className="w-4 h-4" />
                Schedule Follow-up
              </Button>
              {action.donorId && (
                <Link href={`/donors/${action.donorId}/action-plan`}>
                  <Button variant="outline" className="w-full justify-start gap-2" data-testid="button-action-plan">
                    <Handshake className="w-4 h-4" />
                    Generate Action Plan
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          {/* Relationship Signals */}
          <Card>
            <CardHeader 
              className="rounded-t-xl py-3 px-4"
              style={{ background: `linear-gradient(135deg, ${accentColors.coral}15 0%, ${accentColors.coral}05 100%)` }}
            >
              <CardTitle className="text-base flex items-center gap-2">
                <Gift className="w-4 h-4" style={{ color: accentColors.coral }} />
                Relationship Signals
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">High Affinity</p>
                  <p className="text-xs text-muted-foreground">Strong alignment with mission</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Time-Sensitive</p>
                  <p className="text-xs text-muted-foreground">Year-end giving window</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Star className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Upgrade Potential</p>
                  <p className="text-xs text-muted-foreground">Capacity for increased giving</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
