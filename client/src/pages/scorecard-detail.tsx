import { useParams, Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Home,
  Heart,
  DollarSign,
  HandHeart,
  Target,
  Shield,
  Users,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  AlertTriangle,
  Clock,
  BarChart3,
  Activity,
  Gauge
} from "lucide-react";

interface KPI {
  name: string;
  current: string;
  target: string;
  previousPeriod: string;
  trend: "up" | "down" | "stable";
  status: "on-track" | "at-risk" | "behind";
  progress: number;
}

interface ScorecardData {
  domain: string;
  icon: any;
  accent: AccentColor;
  color: string;
  description: string;
  kpis: KPI[];
  initiatives: { name: string; status: string; owner: string }[];
  highlights: string[];
}

const scorecardDetails: Record<string, ScorecardData> = {
  "housing": {
    domain: "Housing",
    icon: Home,
    accent: "sky",
    color: "#7BC4DC",
    description: "HUD compliance, occupancy management, and resident services performance",
    kpis: [
      { name: "HUD Recertification Cycle Time", current: "18 days", target: "14 days", previousPeriod: "24 days", trend: "down", status: "at-risk", progress: 78 },
      { name: "Recertification Error Rate", current: "2.3%", target: "2.0%", previousPeriod: "4.1%", trend: "down", status: "at-risk", progress: 85 },
      { name: "Staff Hours Saved (Monthly)", current: "340 hrs", target: "400 hrs", previousPeriod: "280 hrs", trend: "up", status: "on-track", progress: 85 },
      { name: "Compliance Exception Rate", current: "1.2%", target: "1.5%", previousPeriod: "2.8%", trend: "down", status: "on-track", progress: 100 },
      { name: "Occupancy Rate", current: "94.2%", target: "95%", previousPeriod: "92.8%", trend: "up", status: "on-track", progress: 99 },
      { name: "Resident Satisfaction Score", current: "4.2/5", target: "4.5/5", previousPeriod: "4.0/5", trend: "up", status: "at-risk", progress: 93 },
      { name: "Maintenance Response Time", current: "2.1 days", target: "2.0 days", previousPeriod: "2.8 days", trend: "down", status: "on-track", progress: 95 },
      { name: "Document Completeness Rate", current: "96.5%", target: "98%", previousPeriod: "91.2%", trend: "up", status: "at-risk", progress: 98 }
    ],
    initiatives: [
      { name: "Housing Agent Automation Rollout", status: "In Progress", owner: "IT Operations" },
      { name: "Digital Document Portal Launch", status: "Completed", owner: "Resident Services" },
      { name: "Mobile Recertification App", status: "Planning", owner: "Digital Team" }
    ],
    highlights: [
      "25% reduction in recertification cycle time vs. last quarter",
      "Housing Agent now handles 60% of routine document validations",
      "Zero critical compliance findings in last HUD audit"
    ]
  },
  "healthcare": {
    domain: "Healthcare",
    icon: Heart,
    accent: "lime",
    color: "#A8C686",
    description: "Claims processing, billing efficiency, and care coordination metrics",
    kpis: [
      { name: "Claim Rejection Rate", current: "3.8%", target: "3.0%", previousPeriod: "5.2%", trend: "down", status: "at-risk", progress: 79 },
      { name: "Billing Cycle Time", current: "12 days", target: "10 days", previousPeriod: "16 days", trend: "down", status: "at-risk", progress: 83 },
      { name: "Duplicate Intake Rate", current: "1.5%", target: "1.0%", previousPeriod: "3.2%", trend: "down", status: "at-risk", progress: 67 },
      { name: "Clean Claim Rate", current: "92.1%", target: "95%", previousPeriod: "88.5%", trend: "up", status: "at-risk", progress: 97 },
      { name: "Prior Auth Turnaround", current: "1.8 days", target: "1.5 days", previousPeriod: "2.4 days", trend: "down", status: "at-risk", progress: 83 },
      { name: "Care Plan Compliance", current: "94.5%", target: "96%", previousPeriod: "91.2%", trend: "up", status: "at-risk", progress: 98 },
      { name: "Patient Satisfaction", current: "4.3/5", target: "4.5/5", previousPeriod: "4.1/5", trend: "up", status: "on-track", progress: 96 },
      { name: "Readmission Rate", current: "8.2%", target: "7.5%", previousPeriod: "9.1%", trend: "down", status: "at-risk", progress: 91 }
    ],
    initiatives: [
      { name: "Healthcare Agent Claims Validation", status: "In Progress", owner: "Revenue Cycle" },
      { name: "CareGuide 2.0 Integration", status: "In Progress", owner: "Clinical Ops" },
      { name: "Automated Prior Auth System", status: "Planning", owner: "IT Operations" }
    ],
    highlights: [
      "27% reduction in claim rejections since Healthcare Agent deployment",
      "CareGuide deduplication preventing 150+ duplicate records monthly",
      "Billing cycle time improved by 4 days on average"
    ]
  },
  "finance": {
    domain: "Finance",
    icon: DollarSign,
    accent: "limeDark",
    color: "#7A9B5A",
    description: "Financial close, reconciliation, and entity management performance",
    kpis: [
      { name: "Monthly Close Time", current: "8 days", target: "5 days", previousPeriod: "12 days", trend: "down", status: "at-risk", progress: 63 },
      { name: "Reconciliation Exceptions", current: "45", target: "30", previousPeriod: "78", trend: "down", status: "at-risk", progress: 67 },
      { name: "Entity Mapping Accuracy", current: "97.2%", target: "99%", previousPeriod: "94.5%", trend: "up", status: "at-risk", progress: 98 },
      { name: "Intercompany Eliminations", current: "98.5%", target: "99.5%", previousPeriod: "96.2%", trend: "up", status: "at-risk", progress: 99 },
      { name: "Budget Variance", current: "3.2%", target: "2.5%", previousPeriod: "4.8%", trend: "down", status: "at-risk", progress: 78 },
      { name: "Invoice Processing Time", current: "3.2 days", target: "2.5 days", previousPeriod: "4.5 days", trend: "down", status: "at-risk", progress: 78 },
      { name: "Cash Flow Forecast Accuracy", current: "91%", target: "95%", previousPeriod: "87%", trend: "up", status: "at-risk", progress: 96 },
      { name: "Audit Finding Resolution", current: "15 days", target: "10 days", previousPeriod: "22 days", trend: "down", status: "at-risk", progress: 67 }
    ],
    initiatives: [
      { name: "Financial Agent Consolidation Automation", status: "In Progress", owner: "Finance" },
      { name: "Real-time Dashboard Implementation", status: "Completed", owner: "FP&A" },
      { name: "Entity Rationalization Project", status: "Planning", owner: "Controller" }
    ],
    highlights: [
      "Close time reduced by 4 days compared to prior year",
      "Financial Agent flagging anomalies with 95% accuracy",
      "42% reduction in manual reconciliation entries"
    ]
  },
  "fundraising": {
    domain: "Fundraising",
    icon: HandHeart,
    accent: "coral",
    color: "#D5636C",
    description: "Donor engagement, acknowledgment efficiency, and pipeline health",
    kpis: [
      { name: "Acknowledgment Time", current: "36 hrs", target: "24 hrs", previousPeriod: "72 hrs", trend: "down", status: "at-risk", progress: 67 },
      { name: "Donor Retention Rate", current: "78%", target: "82%", previousPeriod: "74%", trend: "up", status: "at-risk", progress: 95 },
      { name: "Pipeline Coverage Ratio", current: "3.2x", target: "4.0x", previousPeriod: "2.8x", trend: "up", status: "at-risk", progress: 80 },
      { name: "ROI Reporting Adoption", current: "68%", target: "80%", previousPeriod: "52%", trend: "up", status: "at-risk", progress: 85 },
      { name: "Major Gift Close Rate", current: "24%", target: "28%", previousPeriod: "21%", trend: "up", status: "at-risk", progress: 86 },
      { name: "Average Gift Size", current: "$1,458", target: "$1,600", previousPeriod: "$1,320", trend: "up", status: "at-risk", progress: 91 },
      { name: "Donor Touchpoints/Month", current: "4.2", target: "5.0", previousPeriod: "3.5", trend: "up", status: "at-risk", progress: 84 },
      { name: "Campaign Response Rate", current: "8.5%", target: "10%", previousPeriod: "7.2%", trend: "up", status: "at-risk", progress: 85 }
    ],
    initiatives: [
      { name: "Donor Agent ROI Dashboard Rollout", status: "In Progress", owner: "Development" },
      { name: "Impact Narrative Automation", status: "In Progress", owner: "Communications" },
      { name: "Predictive Giving Model", status: "Planning", owner: "Data Analytics" }
    ],
    highlights: [
      "Donor retention up 4 percentage points year-over-year",
      "Document Agent generating 200+ impact reports monthly",
      "Next Best Action recommendations improving close rates by 14%"
    ]
  },
  "grants": {
    domain: "Grants",
    icon: Target,
    accent: "orange",
    color: "#E8923A",
    description: "Grant pipeline management, submission timeliness, and reporting efficiency",
    kpis: [
      { name: "On-Time Submissions", current: "94%", target: "98%", previousPeriod: "87%", trend: "up", status: "at-risk", progress: 96 },
      { name: "Duplicate Outreach Incidents", current: "3", target: "0", previousPeriod: "12", trend: "down", status: "at-risk", progress: 75 },
      { name: "Report Turnaround Time", current: "5 days", target: "3 days", previousPeriod: "8 days", trend: "down", status: "at-risk", progress: 60 },
      { name: "Grant Win Rate", current: "42%", target: "45%", previousPeriod: "38%", trend: "up", status: "on-track", progress: 93 },
      { name: "Pipeline Value", current: "$8.2M", target: "$10M", previousPeriod: "$6.5M", trend: "up", status: "at-risk", progress: 82 },
      { name: "Funder Retention Rate", current: "85%", target: "90%", previousPeriod: "82%", trend: "up", status: "at-risk", progress: 94 },
      { name: "Compliance Report Accuracy", current: "98.5%", target: "99.5%", previousPeriod: "96.2%", trend: "up", status: "at-risk", progress: 99 },
      { name: "Outcome Documentation Rate", current: "91%", target: "95%", previousPeriod: "84%", trend: "up", status: "at-risk", progress: 96 }
    ],
    initiatives: [
      { name: "Grants Agent Pipeline Board", status: "Completed", owner: "Grants Team" },
      { name: "Automated Deadline Reminders", status: "In Progress", owner: "IT Operations" },
      { name: "Outcomes Data Integration", status: "In Progress", owner: "Data Team" }
    ],
    highlights: [
      "75% reduction in duplicate funder outreach incidents",
      "Grant win rate improved by 4 percentage points",
      "Grants Agent tracking 125+ active opportunities"
    ]
  },
  "compliance-&-risk": {
    domain: "Compliance & Risk",
    icon: Shield,
    accent: "teal",
    color: "#7FA3A1",
    description: "Regulatory compliance, audit readiness, and risk management performance",
    kpis: [
      { name: "Audit Findings", current: "8", target: "5", previousPeriod: "15", trend: "down", status: "at-risk", progress: 63 },
      { name: "Filing Timeliness", current: "96%", target: "99%", previousPeriod: "91%", trend: "up", status: "at-risk", progress: 97 },
      { name: "Data Access Violations", current: "2", target: "0", previousPeriod: "7", trend: "down", status: "at-risk", progress: 71 },
      { name: "Bias Flags Resolved Time", current: "4 days", target: "2 days", previousPeriod: "8 days", trend: "down", status: "at-risk", progress: 50 },
      { name: "Policy Acknowledgment Rate", current: "94%", target: "100%", previousPeriod: "88%", trend: "up", status: "at-risk", progress: 94 },
      { name: "Incident Response Time", current: "2.5 hrs", target: "2 hrs", previousPeriod: "4 hrs", trend: "down", status: "at-risk", progress: 80 },
      { name: "Training Compliance", current: "97%", target: "100%", previousPeriod: "92%", trend: "up", status: "at-risk", progress: 97 },
      { name: "Evidence Pack Completeness", current: "98%", target: "100%", previousPeriod: "94%", trend: "up", status: "at-risk", progress: 98 }
    ],
    initiatives: [
      { name: "Compliance Agent Evidence Automation", status: "In Progress", owner: "Compliance" },
      { name: "Purview Governance Rollout", status: "In Progress", owner: "IT Security" },
      { name: "Bias Monitoring Framework", status: "Planning", owner: "Data Ethics" }
    ],
    highlights: [
      "Audit findings reduced by 47% year-over-year",
      "Compliance Agent automating 80% of evidence pack preparation",
      "Zero critical data breaches in current fiscal year"
    ]
  },
  "adoption": {
    domain: "Adoption",
    icon: Users,
    accent: "olive",
    color: "#A5A033",
    description: "Platform adoption, user engagement, and digital transformation metrics",
    kpis: [
      { name: "Active Users", current: "1,850", target: "2,200", previousPeriod: "1,420", trend: "up", status: "at-risk", progress: 84 },
      { name: "Spreadsheet Dependency", current: "32%", target: "20%", previousPeriod: "58%", trend: "down", status: "at-risk", progress: 68 },
      { name: "Agent Tasks Completed", current: "4,250/mo", target: "5,000/mo", previousPeriod: "2,800/mo", trend: "up", status: "at-risk", progress: 85 },
      { name: "User Satisfaction Score", current: "4.1/5", target: "4.5/5", previousPeriod: "3.8/5", trend: "up", status: "at-risk", progress: 91 },
      { name: "Feature Adoption Rate", current: "72%", target: "85%", previousPeriod: "58%", trend: "up", status: "at-risk", progress: 85 },
      { name: "Training Completion", current: "88%", target: "95%", previousPeriod: "75%", trend: "up", status: "at-risk", progress: 93 },
      { name: "Support Ticket Volume", current: "145/mo", target: "100/mo", previousPeriod: "210/mo", trend: "down", status: "at-risk", progress: 69 },
      { name: "Self-Service Resolution", current: "68%", target: "80%", previousPeriod: "52%", trend: "up", status: "at-risk", progress: 85 }
    ],
    initiatives: [
      { name: "Champions Network Program", status: "In Progress", owner: "Change Management" },
      { name: "Gamification & Recognition", status: "Planning", owner: "HR" },
      { name: "Mobile App Launch", status: "In Progress", owner: "Digital Team" }
    ],
    highlights: [
      "30% increase in active users since Q1",
      "Spreadsheet usage down from 58% to 32%",
      "Champions network now has 45 trained advocates across departments"
    ]
  }
};

function getTrendIcon(trend: "up" | "down" | "stable") {
  switch (trend) {
    case "up": return <TrendingUp className="h-4 w-4 text-green-600" />;
    case "down": return <TrendingDown className="h-4 w-4 text-green-600" />;
    case "stable": return <Minus className="h-4 w-4 text-gray-500" />;
  }
}

function getStatusBadge(status: "on-track" | "at-risk" | "behind") {
  switch (status) {
    case "on-track": 
      return <Badge className="bg-green-100 text-green-800 border-green-200">On Track</Badge>;
    case "at-risk": 
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">At Risk</Badge>;
    case "behind": 
      return <Badge className="bg-red-100 text-red-800 border-red-200">Behind</Badge>;
  }
}

function getInitiativeStatusBadge(status: string) {
  switch (status) {
    case "Completed": 
      return <Badge className="bg-green-100 text-green-800 border-green-200">{status}</Badge>;
    case "In Progress": 
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">{status}</Badge>;
    case "Planning": 
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function ScorecardDetail() {
  const params = useParams();
  const domainId = params.domainId as string;
  
  const scorecard = scorecardDetails[domainId];
  
  if (!scorecard) {
    return (
      <div className="p-6 space-y-6">
        <Link href="/agent-value-map?tab=scorecard">
          <Button variant="ghost" className="gap-2" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Back to Scorecard
          </Button>
        </Link>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Scorecard not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const IconComponent = scorecard.icon;
  const onTrackCount = scorecard.kpis.filter(k => k.status === "on-track").length;
  const atRiskCount = scorecard.kpis.filter(k => k.status === "at-risk").length;
  const behindCount = scorecard.kpis.filter(k => k.status === "behind").length;

  return (
    <div className="p-6 space-y-6">
      <Link href="/agent-value-map?tab=scorecard">
        <Button variant="ghost" className="gap-2" data-testid="button-back">
          <ArrowLeft className="h-4 w-4" />
          Back to Scorecard
        </Button>
      </Link>

      <div 
        className="rounded-xl p-8 text-white"
        style={{ backgroundColor: scorecard.color }}
      >
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-full bg-white/20">
            <IconComponent className="h-10 w-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold" data-testid="scorecard-title">{scorecard.domain} Scorecard</h1>
            <p className="text-white/80 mt-1">{scorecard.description}</p>
          </div>
        </div>
        <div className="mt-6 flex gap-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold">{onTrackCount} On Track</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-semibold">{atRiskCount} At Risk</span>
          </div>
          {behindCount > 0 && (
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">{behindCount} Behind</span>
            </div>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5" style={{ color: scorecard.color }} />
            Key Performance Indicators
          </CardTitle>
          <CardDescription>Current performance against targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scorecard.kpis.map((kpi, index) => (
              <div 
                key={kpi.name} 
                className="p-4 rounded-lg border bg-card"
                data-testid={`kpi-${index}`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h4 className="font-medium text-sm">{kpi.name}</h4>
                  {getStatusBadge(kpi.status)}
                </div>
                <div className="flex items-end gap-4 mb-3">
                  <div>
                    <div className="text-2xl font-bold" style={{ color: scorecard.color }}>{kpi.current}</div>
                    <div className="text-xs text-muted-foreground">Current</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-muted-foreground">{kpi.target}</div>
                    <div className="text-xs text-muted-foreground">Target</div>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    {getTrendIcon(kpi.trend)}
                    <span className="text-xs text-muted-foreground">vs {kpi.previousPeriod}</span>
                  </div>
                </div>
                <Progress value={kpi.progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">{kpi.progress}% to target</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" style={{ color: scorecard.color }} />
              Active Initiatives
            </CardTitle>
            <CardDescription>Programs driving improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scorecard.initiatives.map((initiative, index) => (
                <div 
                  key={initiative.name} 
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  data-testid={`initiative-${index}`}
                >
                  <div>
                    <p className="font-medium">{initiative.name}</p>
                    <p className="text-sm text-muted-foreground">Owner: {initiative.owner}</p>
                  </div>
                  {getInitiativeStatusBadge(initiative.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" style={{ color: scorecard.color }} />
              Key Highlights
            </CardTitle>
            <CardDescription>Notable achievements and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scorecard.highlights.map((highlight, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                  data-testid={`highlight-${index}`}
                >
                  <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" style={{ color: scorecard.color }} />
                  <p className="text-sm">{highlight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2" style={{ borderColor: `${scorecard.color}30`, backgroundColor: `${scorecard.color}08` }}>
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div 
                className="p-3 rounded-full"
                style={{ backgroundColor: `${scorecard.color}20` }}
              >
                <Target className="h-6 w-6" style={{ color: scorecard.color }} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Need to update targets?</h3>
                <p className="text-muted-foreground">Review and adjust KPI thresholds for next quarter.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button style={{ backgroundColor: scorecard.color }} data-testid="button-review">
                Review Targets
              </Button>
              <Button variant="outline" data-testid="button-export">
                Export Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
