import { useParams, Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AccentCard, type AccentColor } from "@/components/ui/accent-card";
import { 
  ArrowLeft,
  ArrowRight,
  UserCheck,
  Home,
  Database,
  Target,
  Shield,
  LineChart,
  Bot,
  CheckCircle2,
  FileInput,
  FileOutput,
  Eye,
  Zap,
  Users,
  Building2,
  Play,
  Workflow
} from "lucide-react";

interface WorkflowStepData {
  step: number;
  title: string;
  agent: string;
  domain: string;
  icon: any;
  accent: AccentColor;
  color: string;
  description: string;
  trigger: string;
  actions: string[];
  inputs: { name: string; source: string }[];
  outputs: { name: string; destination: string }[];
  humanCheckpoints: string[];
  successMetrics: { metric: string; target: string }[];
  exampleScenario: {
    situation: string;
    agentAction: string;
    outcome: string;
  };
  nextStep?: { step: number; title: string };
  prevStep?: { step: number; title: string };
}

const workflowSteps: Record<string, WorkflowStepData> = {
  "1": {
    step: 1,
    title: "Resident starts intake",
    agent: "CareGuide Agent",
    domain: "Healthcare + Housing",
    icon: UserCheck,
    accent: "teal",
    color: "#7FA3A1",
    description: "A resident starts an intake once in CareGuide 2.0. CareGuide Agent validates + routes data to the right downstream workflows.",
    trigger: "Resident initiates intake through CareGuide 2.0 portal or staff enters on their behalf",
    actions: [
      "Validates all required fields are complete and properly formatted",
      "Checks for existing records to prevent duplicates",
      "Verifies identity against existing resident database",
      "Routes intake to appropriate downstream workflows based on service needs",
      "Flags incomplete applications for follow-up",
      "Sends confirmation to resident with next steps"
    ],
    inputs: [
      { name: "Resident demographics", source: "CareGuide 2.0 Portal" },
      { name: "Service requests", source: "Intake form" },
      { name: "Supporting documents", source: "Document upload" },
      { name: "Existing resident records", source: "Yardi / CRM" }
    ],
    outputs: [
      { name: "Validated intake record", destination: "OneLake" },
      { name: "Workflow triggers", destination: "Housing Agent / Healthcare Agent" },
      { name: "Duplicate alerts", destination: "Staff dashboard" },
      { name: "Confirmation notification", destination: "Resident email/SMS" }
    ],
    humanCheckpoints: [
      "Staff review required for flagged incomplete applications",
      "Manual verification for identity mismatches",
      "Supervisor approval for expedited processing requests"
    ],
    successMetrics: [
      { metric: "Intake completion rate", target: "> 95%" },
      { metric: "Duplicate prevention rate", target: "> 98%" },
      { metric: "Routing accuracy", target: "> 99%" },
      { metric: "Average processing time", target: "< 5 minutes" }
    ],
    exampleScenario: {
      situation: "Mary Johnson, 72, applies for affordable housing at Thurber Towers through the online portal, requesting both housing and home health services.",
      agentAction: "CareGuide Agent validates her application, detects no duplicates, verifies her identity, and routes her case to both Housing Agent (for HUD qualification) and Healthcare Agent (for home health intake).",
      outcome: "Mary receives confirmation within 5 minutes with clear next steps. Staff see her case in their dashboard with all routing already complete."
    },
    nextStep: { step: 2, title: "Housing Agent activates" }
  },
  "2": {
    step: 2,
    title: "Housing Agent activates",
    agent: "Housing Agent",
    domain: "Housing",
    icon: Home,
    accent: "sky",
    color: "#7BC4DC",
    description: "Housing Agent launches HUD requalification steps automatically. Missing docs flagged; reminders sent; staff dashboard shows exceptions only.",
    trigger: "CareGuide Agent routes housing-related intake OR annual recertification date approaches",
    actions: [
      "Initiates HUD recertification workflow automatically",
      "Checks document completeness against HUD requirements",
      "Flags missing or expiring documents",
      "Sends automated reminders to residents for missing items",
      "Calculates preliminary eligibility based on submitted information",
      "Updates staff dashboard with exception-only view"
    ],
    inputs: [
      { name: "Resident intake data", source: "CareGuide Agent" },
      { name: "Current resident records", source: "Yardi" },
      { name: "Document submissions", source: "Resident portal" },
      { name: "HUD compliance rules", source: "Compliance database" }
    ],
    outputs: [
      { name: "Recertification status", destination: "Staff dashboard" },
      { name: "Missing document alerts", destination: "Resident notifications" },
      { name: "Eligibility calculations", destination: "OneLake" },
      { name: "Compliance reports", destination: "HUD reporting system" }
    ],
    humanCheckpoints: [
      "Staff approval required for final eligibility determination",
      "Manual review for edge cases and exceptions",
      "Supervisor sign-off on adverse actions"
    ],
    successMetrics: [
      { metric: "Recert cycle time", target: "< 14 days" },
      { metric: "Document completeness rate", target: "> 98%" },
      { metric: "Staff hours saved", target: "> 400 hrs/month" },
      { metric: "Compliance exception rate", target: "< 1.5%" }
    ],
    exampleScenario: {
      situation: "John Smith's annual HUD recertification is due in 45 days. His income verification documents are missing.",
      agentAction: "Housing Agent automatically initiates the recertification workflow, identifies the missing income verification, and sends John a reminder with a secure upload link. It flags his case as 'pending documents' on the staff dashboard.",
      outcome: "John uploads his documents within a week. Housing Agent validates them and moves his case to 'ready for review'. Staff only spend time on the final approval, not document chasing."
    },
    prevStep: { step: 1, title: "Resident starts intake" },
    nextStep: { step: 3, title: "Outcomes flow to OneLake" }
  },
  "3": {
    step: 3,
    title: "Outcomes flow to OneLake",
    agent: "Document Agent + Donor Agent",
    domain: "Data + Fundraising",
    icon: Database,
    accent: "olive",
    color: "#A5A033",
    description: "Outcomes (services delivered) flow into OneLake with governance. Donor Agent generates ROI dashboard views; Document Agent generates a narrative.",
    trigger: "Service delivery recorded OR milestone achieved in any operational system",
    actions: [
      "Captures outcome data from source systems",
      "Transforms and loads data into OneLake canonical schema",
      "Applies governance labels and access controls via Purview",
      "Document Agent generates impact narratives for donors",
      "Donor Agent updates ROI dashboards with new outcome data",
      "Links outcomes to specific donors and grants for attribution"
    ],
    inputs: [
      { name: "Service delivery records", source: "Yardi / CareGuide" },
      { name: "Resident outcomes", source: "Healthcare systems" },
      { name: "Donor gift records", source: "Raiser's Edge" },
      { name: "Grant requirements", source: "Grants database" }
    ],
    outputs: [
      { name: "Canonical outcome records", destination: "OneLake" },
      { name: "Impact narratives", destination: "Document library" },
      { name: "ROI dashboards", destination: "Donor Hub" },
      { name: "Grant reporting data", destination: "Grants Agent" }
    ],
    humanCheckpoints: [
      "Communications review of impact narratives before distribution",
      "Development officer approval for major donor reports",
      "Data steward validation for sensitive outcome data"
    ],
    successMetrics: [
      { metric: "Data freshness", target: "< 24 hours" },
      { metric: "Outcome attribution rate", target: "> 90%" },
      { metric: "Narrative generation time", target: "< 1 hour" },
      { metric: "Dashboard accuracy", target: "> 99%" }
    ],
    exampleScenario: {
      situation: "Thurber Towers completes 50 emergency rent assistance grants this month, funded by the Nationwide Foundation.",
      agentAction: "Outcome data flows to OneLake. Document Agent generates an impact narrative describing the 50 families helped. Donor Agent updates the Nationwide Foundation's ROI dashboard showing their grant impact.",
      outcome: "Development officer has a ready-to-send impact report for Nationwide within 24 hours of month-end, with specific stories and metrics automatically compiled."
    },
    prevStep: { step: 2, title: "Housing Agent activates" },
    nextStep: { step: 4, title: "Grants Agent coordinates" }
  },
  "4": {
    step: 4,
    title: "Grants Agent coordinates",
    agent: "Grants Agent",
    domain: "Grants",
    icon: Target,
    accent: "orange",
    color: "#E8923A",
    description: "Grants Agent updates a pipeline board + prevents duplicate outreach. Reports are produced with metrics, not anecdotes.",
    trigger: "Grant opportunity identified OR grant report due date approaching",
    actions: [
      "Maintains pipeline board with all active opportunities",
      "Prevents duplicate outreach to the same funder",
      "Aggregates outcome data for grant reports",
      "Generates draft reports with actual metrics",
      "Tracks deadlines and sends proactive reminders",
      "Coordinates with Document Agent for supporting narratives"
    ],
    inputs: [
      { name: "Grant opportunities", source: "Research database" },
      { name: "Outcome metrics", source: "OneLake" },
      { name: "Funder contact history", source: "CRM" },
      { name: "Grant requirements", source: "Award records" }
    ],
    outputs: [
      { name: "Pipeline board updates", destination: "Grants Hub" },
      { name: "Draft grant reports", destination: "Document library" },
      { name: "Deadline alerts", destination: "Grants team" },
      { name: "Duplicate outreach warnings", destination: "Staff dashboard" }
    ],
    humanCheckpoints: [
      "Grants team review of draft reports before submission",
      "Program staff validation of reported metrics",
      "Leadership approval for major grant proposals"
    ],
    successMetrics: [
      { metric: "On-time submissions", target: "> 98%" },
      { metric: "Duplicate outreach incidents", target: "0" },
      { metric: "Report turnaround time", target: "< 3 days" },
      { metric: "Grant win rate", target: "> 45%" }
    ],
    exampleScenario: {
      situation: "The Cardinal Health Foundation quarterly report is due in 10 days. Three different staff members were about to reach out to Cardinal for different purposes.",
      agentAction: "Grants Agent sends deadline reminder, flags the duplicate outreach attempts, and generates a draft report with actual outcome metrics from OneLake showing 75 seniors served through their senior health services grant.",
      outcome: "Grants team submits a data-rich report on time. Cardinal receives one coordinated outreach instead of three conflicting contacts. Win rate improves due to better stewardship."
    },
    prevStep: { step: 3, title: "Outcomes flow to OneLake" },
    nextStep: { step: 5, title: "Compliance Agent prepares" }
  },
  "5": {
    step: 5,
    title: "Compliance Agent prepares",
    agent: "Compliance Agent",
    domain: "Compliance & Risk",
    icon: Shield,
    accent: "coral",
    color: "#D5636C",
    description: "Compliance Agent prepares an evidence pack for filings. Every action logged; Purview lineage shows exactly where data came from.",
    trigger: "Filing deadline approaching OR audit request received",
    actions: [
      "Compiles evidence pack from governed data sources",
      "Generates data lineage documentation via Purview",
      "Validates completeness against filing requirements",
      "Creates audit trail of all agent actions",
      "Prepares summary report for reviewer",
      "Flags any data quality issues or gaps"
    ],
    inputs: [
      { name: "Outcome data", source: "OneLake" },
      { name: "Compliance requirements", source: "Regulatory database" },
      { name: "Data lineage", source: "Microsoft Purview" },
      { name: "Audit history", source: "Compliance records" }
    ],
    outputs: [
      { name: "Evidence pack", destination: "Compliance Hub" },
      { name: "Lineage documentation", destination: "Audit file" },
      { name: "Filing draft", destination: "Regulatory system" },
      { name: "Audit trail log", destination: "OneLake" }
    ],
    humanCheckpoints: [
      "Compliance officer review of evidence pack",
      "Legal review for high-risk filings",
      "Executive sign-off before submission"
    ],
    successMetrics: [
      { metric: "Filing timeliness", target: "> 99%" },
      { metric: "Audit findings", target: "< 5" },
      { metric: "Evidence completeness", target: "100%" },
      { metric: "Bias flags resolved", target: "< 2 days" }
    ],
    exampleScenario: {
      situation: "HUD annual filing deadline is 30 days away. An auditor has also requested documentation on how eligibility decisions are made.",
      agentAction: "Compliance Agent compiles the evidence pack with all required data, generates Purview lineage showing exactly which source systems and transformations produced each metric, and prepares the audit documentation showing the decision logic and human approvals.",
      outcome: "Filing is submitted 10 days early. Auditor receives comprehensive documentation that demonstrates full compliance and traceability. Zero findings result from the audit."
    },
    prevStep: { step: 4, title: "Grants Agent coordinates" },
    nextStep: { step: 6, title: "Strategy Agent forecasts" }
  },
  "6": {
    step: 6,
    title: "Strategy Agent forecasts",
    agent: "Strategy Agent",
    domain: "Strategy",
    icon: LineChart,
    accent: "lime",
    color: "#B5C942",
    description: "Strategy Agent shows leadership a staffing/occupancy forecast. Leadership sees scenarios and can make staffing decisions with confidence.",
    trigger: "Monthly leadership review OR strategic planning cycle",
    actions: [
      "Aggregates operational data across all domains",
      "Runs predictive models for occupancy and staffing",
      "Generates scenario comparisons (best/worst/likely)",
      "Identifies risk factors and opportunities",
      "Produces executive-ready visualizations",
      "Recommends actions based on forecast outcomes"
    ],
    inputs: [
      { name: "Occupancy data", source: "Yardi" },
      { name: "Staffing levels", source: "Workday" },
      { name: "Financial data", source: "Finance systems" },
      { name: "Market trends", source: "External data" }
    ],
    outputs: [
      { name: "Occupancy forecast", destination: "Leadership dashboard" },
      { name: "Staffing recommendations", destination: "HR systems" },
      { name: "Scenario models", destination: "Strategy Hub" },
      { name: "Risk alerts", destination: "Executive team" }
    ],
    humanCheckpoints: [
      "Leadership review of forecast assumptions",
      "Board approval for major strategic shifts",
      "Finance validation of budget implications"
    ],
    successMetrics: [
      { metric: "Forecast accuracy", target: "> 90%" },
      { metric: "Decision time reduction", target: "> 50%" },
      { metric: "Scenario coverage", target: "3+ per decision" },
      { metric: "Leadership satisfaction", target: "> 4.5/5" }
    ],
    exampleScenario: {
      situation: "Leadership is planning next fiscal year staffing. They need to understand how different occupancy scenarios affect staffing needs across 340 communities.",
      agentAction: "Strategy Agent analyzes historical occupancy patterns, current waitlist data, and market trends to produce three staffing scenarios: conservative (92% occupancy), expected (95%), and optimistic (97%). Each scenario includes specific staffing recommendations by community cluster.",
      outcome: "Leadership makes staffing decisions in one meeting instead of weeks of analysis. They have confidence in the data because it comes from governed sources with clear lineage."
    },
    prevStep: { step: 5, title: "Compliance Agent prepares" }
  }
};

export default function WorkflowStepDetail() {
  const params = useParams();
  const stepId = params.stepId as string;
  
  const step = workflowSteps[stepId];
  
  if (!step) {
    return (
      <div className="p-6 space-y-6">
        <Link href="/agent-value-map?tab=overview">
          <Button variant="ghost" className="gap-2" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Back to Overview
          </Button>
        </Link>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Workflow step not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const IconComponent = step.icon;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Link href="/agent-value-map?tab=overview">
          <Button variant="ghost" className="gap-2" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Back to Overview
          </Button>
        </Link>
        <div className="flex gap-2">
          {step.prevStep && (
            <Link href={`/agent-value-map/workflow/${step.prevStep.step}`}>
              <Button variant="outline" className="gap-2" data-testid="button-prev">
                <ArrowLeft className="h-4 w-4" />
                Step {step.prevStep.step}
              </Button>
            </Link>
          )}
          {step.nextStep && (
            <Link href={`/agent-value-map/workflow/${step.nextStep.step}`}>
              <Button variant="outline" className="gap-2" data-testid="button-next">
                Step {step.nextStep.step}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div 
        className="rounded-xl p-8 text-white"
        style={{ backgroundColor: step.color }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-3xl font-bold">
            {step.step}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <IconComponent className="h-6 w-6" />
              <Badge className="bg-white/20 text-white border-white/30">{step.domain}</Badge>
            </div>
            <h1 className="text-3xl font-bold" data-testid="step-title">{step.title}</h1>
            <p className="text-white/80 mt-2">{step.description}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <span className="font-semibold">Powered by: {step.agent}</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" style={{ color: step.color }} />
            Trigger
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">{step.trigger}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" style={{ color: step.color }} />
            Agent Actions
          </CardTitle>
          <CardDescription>What the agent does automatically</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {step.actions.map((action, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" style={{ color: step.color }} />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileInput className="h-5 w-5" style={{ color: step.color }} />
              Inputs
            </CardTitle>
            <CardDescription>Data sources the agent uses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {step.inputs.map((input, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="font-medium">{input.name}</span>
                  <Badge variant="outline">{input.source}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileOutput className="h-5 w-5" style={{ color: step.color }} />
              Outputs
            </CardTitle>
            <CardDescription>What the agent produces</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {step.outputs.map((output, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="font-medium">{output.name}</span>
                  <Badge variant="outline">{output.destination}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" style={{ color: step.color }} />
            Human-in-the-Loop Checkpoints
          </CardTitle>
          <CardDescription>Where human oversight is required</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {step.humanCheckpoints.map((checkpoint, index) => (
              <li key={index} className="flex items-start gap-3">
                <Users className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                <span>{checkpoint}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="h-5 w-5" style={{ color: step.color }} />
            Success Metrics
          </CardTitle>
          <CardDescription>How we measure agent performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {step.successMetrics.map((metric, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card text-center">
                <p className="text-sm text-muted-foreground mb-1">{metric.metric}</p>
                <p className="text-2xl font-bold" style={{ color: step.color }}>{metric.target}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AccentCard accent={step.accent}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Example Scenario
          </CardTitle>
          <CardDescription>How this works in practice</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">Situation</p>
            <p>{step.exampleScenario.situation}</p>
          </div>
          <div>
            <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">Agent Action</p>
            <p>{step.exampleScenario.agentAction}</p>
          </div>
          <div>
            <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">Outcome</p>
            <p className="text-primary font-medium">{step.exampleScenario.outcome}</p>
          </div>
        </CardContent>
      </AccentCard>

      <div className="flex justify-between">
        {step.prevStep ? (
          <Link href={`/agent-value-map/workflow/${step.prevStep.step}`}>
            <Button variant="outline" className="gap-2" data-testid="button-prev-bottom">
              <ArrowLeft className="h-4 w-4" />
              Previous: {step.prevStep.title}
            </Button>
          </Link>
        ) : <div />}
        {step.nextStep && (
          <Link href={`/agent-value-map/workflow/${step.nextStep.step}`}>
            <Button className="gap-2" style={{ backgroundColor: step.color }} data-testid="button-next-bottom">
              Next: {step.nextStep.title}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
