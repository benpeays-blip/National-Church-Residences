import { useParams, Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AccentCard, NCR_BRAND_COLORS, type AccentColor } from "@/components/ui/accent-card";
import {
  ArrowLeft,
  HandHeart,
  Target,
  Users,
  Heart,
  Shield,
  LineChart,
  Lock,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  AlertTriangle,
  Gauge,
  FileText,
  Calendar,
  Bot,
  Layers,
  Network,
  Sparkles,
  ChevronRight,
  LucideIcon
} from "lucide-react";

interface KPI {
  name: string;
  current: string;
  target: string;
  trend: "up" | "down" | "stable";
  progress: number;
}

interface Feature {
  name: string;
  description: string;
  status: "available" | "coming-soon" | "planned";
}

interface Agent {
  name: string;
  description: string;
  capabilities: string[];
}

interface HubData {
  name: string;
  icon: LucideIcon;
  accent: AccentColor;
  color: string;
  tagline: string;
  description: string;
  keyBenefits: string[];
  features: Feature[];
  kpis: KPI[];
  agents: Agent[];
  integrations: string[];
  useCases: { title: string; description: string }[];
  roadmapItems: { phase: string; item: string }[];
}

const hubDetails: Record<string, HubData> = {
  "donor-hub": {
    name: "Donor Hub",
    icon: HandHeart,
    accent: "coral",
    color: "#D5636C",
    tagline: "Transform donor relationships with data-driven insights",
    description: "The Donor Hub centralizes all donor-related activities, providing fundraising teams with ROI dashboards, impact narratives, automated acknowledgments, and comprehensive pipeline views. It connects giving data to program outcomes, enabling personalized stewardship at scale.",
    keyBenefits: [
      "Real-time ROI dashboards connecting gifts to measurable outcomes",
      "Automated impact narratives generated from program data",
      "48-hour acknowledgment turnaround with personalized content",
      "Pipeline visibility with 'next best action' recommendations",
      "Donor retention analytics and lapsed donor identification",
      "Major gift prospect scoring and prioritization"
    ],
    features: [
      { name: "ROI Dashboard", description: "Track return on philanthropic investment with automated outcome metrics", status: "available" },
      { name: "Impact Narrative Generator", description: "AI-powered stories connecting donations to resident outcomes", status: "available" },
      { name: "Acknowledgment Automation", description: "Personalized thank-you letters generated within hours of gift receipt", status: "available" },
      { name: "Pipeline Manager", description: "Visual pipeline with stage tracking and probability scoring", status: "available" },
      { name: "Donor 360 View", description: "Complete donor profile with giving history, touchpoints, and preferences", status: "available" },
      { name: "Next Best Action Engine", description: "AI recommendations for optimal donor engagement", status: "coming-soon" },
      { name: "Predictive Giving Model", description: "Machine learning predictions for gift timing and amounts", status: "planned" }
    ],
    kpis: [
      { name: "Acknowledgment Time", current: "36 hrs", target: "24 hrs", trend: "down", progress: 67 },
      { name: "Donor Retention Rate", current: "78%", target: "82%", trend: "up", progress: 95 },
      { name: "Pipeline Coverage Ratio", current: "3.2x", target: "4.0x", trend: "up", progress: 80 },
      { name: "ROI Reporting Adoption", current: "68%", target: "80%", trend: "up", progress: 85 }
    ],
    agents: [
      {
        name: "Donor Agent",
        description: "Automates donor engagement workflows and provides intelligent recommendations",
        capabilities: [
          "ROI dashboard generation and updates",
          "Pipeline hygiene and duplicate detection",
          "Acquisition funnel optimization",
          "'Next best action' recommendations based on donor behavior"
        ]
      },
      {
        name: "Document Agent",
        description: "Creates personalized donor communications at scale",
        capabilities: [
          "Impact narrative generation from outcome data",
          "Personalized acknowledgment letters",
          "Annual giving summaries",
          "Campaign update content"
        ]
      }
    ],
    integrations: ["Raiser's Edge NXT", "Workday", "Microsoft Fabric", "Power BI", "Microsoft Copilot"],
    useCases: [
      { title: "Major Gift Cultivation", description: "Track high-value prospects through the pipeline with personalized engagement strategies and automated reminders." },
      { title: "Annual Fund Campaigns", description: "Monitor campaign performance in real-time with donor segmentation and response rate analytics." },
      { title: "Stewardship Reporting", description: "Generate impact reports for donors showing exactly how their gifts made a difference." }
    ],
    roadmapItems: [
      { phase: "Phase 1 (Current)", item: "ROI dashboards pilot with Development team" },
      { phase: "Phase 2 (Q2)", item: "Next Best Action engine deployment" },
      { phase: "Phase 3 (Q3)", item: "Predictive giving model integration" }
    ]
  },
  "grants-hub": {
    name: "Grants Hub",
    icon: Target,
    accent: "orange",
    color: "#E8923A",
    tagline: "Streamline grant management from discovery to reporting",
    description: "The Grants Hub provides a unified platform for managing the entire grant lifecycle. From opportunity discovery and application tracking to deadline management and outcome reporting, it eliminates duplicate outreach and ensures compliance with funder requirements.",
    keyBenefits: [
      "Centralized pipeline view with deadline tracking",
      "Automated duplicate outreach prevention",
      "Outcome data integration for compelling reports",
      "Funder relationship management",
      "Compliance tracking and documentation",
      "Grant writer workload optimization"
    ],
    features: [
      { name: "Pipeline Dashboard", description: "Visual pipeline with stage tracking, deadlines, and probability scoring", status: "available" },
      { name: "Deadline Manager", description: "Automated reminders and calendar integration for critical dates", status: "available" },
      { name: "Report Generator", description: "AI-assisted grant reports with outcome data integration", status: "available" },
      { name: "Dedup Outreach", description: "Prevents duplicate funder contacts across teams", status: "available" },
      { name: "Outcomes Tracker", description: "Links grant requirements to program outcome data", status: "coming-soon" },
      { name: "Funder Research", description: "AI-powered funder matching and research", status: "planned" }
    ],
    kpis: [
      { name: "On-Time Submissions", current: "94%", target: "98%", trend: "up", progress: 96 },
      { name: "Duplicate Outreach Incidents", current: "3/mo", target: "0", trend: "down", progress: 75 },
      { name: "Report Turnaround Time", current: "5 days", target: "3 days", trend: "down", progress: 60 },
      { name: "Grant Win Rate", current: "42%", target: "45%", trend: "up", progress: 93 }
    ],
    agents: [
      {
        name: "Grants Agent",
        description: "Coordinates grant activities and prevents workflow conflicts",
        capabilities: [
          "Pipeline dashboard updates",
          "Duplicate outreach detection and prevention",
          "Automated deadline tracking",
          "Outcome data aggregation for reports"
        ]
      },
      {
        name: "Document Agent",
        description: "Creates grant narratives and reports",
        capabilities: [
          "Grant narrative generation",
          "Progress report drafting",
          "Final report compilation",
          "Budget narrative support"
        ]
      }
    ],
    integrations: ["Instrumentl", "GuideStar/Candid", "Workday", "Microsoft Fabric", "Power BI"],
    useCases: [
      { title: "Foundation Grant Applications", description: "Track multiple simultaneous applications with shared boilerplate and customized narratives." },
      { title: "Government Grant Compliance", description: "Ensure all federal reporting requirements are met with automated outcome tracking." },
      { title: "Corporate Partnership Proposals", description: "Coordinate corporate outreach with automatic conflict checking." }
    ],
    roadmapItems: [
      { phase: "Phase 1 (Current)", item: "Pipeline board and report generator active" },
      { phase: "Phase 2 (Q2)", item: "Advanced outcomes tracking integration" },
      { phase: "Phase 3 (Q3)", item: "AI-powered funder matching" }
    ]
  },
  "volunteer-hub": {
    name: "Volunteer Hub",
    icon: Users,
    accent: "sky",
    color: "#7BC4DC",
    tagline: "Empower volunteers with seamless engagement tools",
    description: "The Volunteer Hub streamlines volunteer management from recruitment through recognition. It provides onboarding workflows, scheduling tools, impact tracking, and automated recognition to maximize volunteer engagement and retention.",
    keyBenefits: [
      "Streamlined volunteer onboarding with digital forms",
      "Smart scheduling matching volunteers to opportunities",
      "Automated recognition and milestone tracking",
      "Wishlist integration for in-kind donation matching",
      "Volunteer impact measurement and reporting",
      "Retention analytics and re-engagement campaigns"
    ],
    features: [
      { name: "Digital Onboarding", description: "Self-service registration with background check integration", status: "available" },
      { name: "Smart Scheduler", description: "Match volunteer skills and availability to opportunities", status: "available" },
      { name: "Recognition Automation", description: "Automated thank-yous, milestone celebrations, and certificates", status: "available" },
      { name: "Wishlist Integration", description: "Connect donor wish lists to volunteer fulfillment", status: "coming-soon" },
      { name: "Impact Dashboard", description: "Track volunteer hours and connect to resident outcomes", status: "planned" },
      { name: "Mobile App", description: "On-the-go scheduling and hour logging", status: "planned" }
    ],
    kpis: [
      { name: "Volunteer Retention Rate", current: "72%", target: "80%", trend: "up", progress: 90 },
      { name: "Onboarding Completion", current: "85%", target: "95%", trend: "up", progress: 89 },
      { name: "Shift Fill Rate", current: "78%", target: "90%", trend: "up", progress: 87 },
      { name: "Recognition Response Time", current: "48 hrs", target: "24 hrs", trend: "down", progress: 50 }
    ],
    agents: [
      {
        name: "Document Agent",
        description: "Creates volunteer communications and recognition materials",
        capabilities: [
          "Welcome packet generation",
          "Recognition certificates",
          "Anniversary acknowledgments",
          "Volunteer newsletter content"
        ]
      }
    ],
    integrations: ["Microsoft 365", "Raiser's Edge NXT", "Microsoft Fabric", "Power BI"],
    useCases: [
      { title: "Resident Activity Programs", description: "Schedule volunteers for regular resident activities with automated reminders." },
      { title: "Special Events", description: "Coordinate large-scale volunteer efforts for galas and community events." },
      { title: "Skills-Based Volunteering", description: "Match professional volunteers with organizational needs like tax prep or legal aid." }
    ],
    roadmapItems: [
      { phase: "Phase 1 (Current)", item: "Onboarding and scheduling active" },
      { phase: "Phase 2 (Q2)", item: "Wishlist integration launch" },
      { phase: "Phase 3 (Q4)", item: "Mobile app development" }
    ]
  },
  "resident-engagement-hub": {
    name: "Resident Engagement Hub",
    icon: Heart,
    accent: "coralDark",
    color: "#B54A52",
    tagline: "Person-centered service delivery at scale",
    description: "The Resident Engagement Hub provides a unified view of resident services across all NCR properties. From intake through ongoing service coordination, it ensures accessible, multilingual support while maintaining compliance with HUD and healthcare regulations.",
    keyBenefits: [
      "Unified intake across all service lines",
      "Service pathway visualization and tracking",
      "Multilingual support for diverse populations",
      "Accessibility validation and compliance",
      "Resident outcome measurement",
      "Service coordinator efficiency tools"
    ],
    features: [
      { name: "Unified Intake", description: "Single entry point for all resident services with smart routing", status: "available" },
      { name: "Service Pathways", description: "Visual workflows showing resident journey through services", status: "available" },
      { name: "Multilingual Support", description: "Translation services and language preference tracking", status: "coming-soon" },
      { name: "Accessibility Validation", description: "Automated checks for ADA compliance in communications", status: "coming-soon" },
      { name: "Outcome Dashboard", description: "Track resident outcomes and service effectiveness", status: "planned" },
      { name: "Resident Portal", description: "Self-service portal for residents to access services", status: "planned" }
    ],
    kpis: [
      { name: "Intake Completion Rate", current: "92%", target: "98%", trend: "up", progress: 94 },
      { name: "Service Referral Time", current: "3 days", target: "1 day", trend: "down", progress: 33 },
      { name: "Resident Satisfaction", current: "4.2/5", target: "4.5/5", trend: "up", progress: 93 },
      { name: "Digital Adoption Rate", current: "45%", target: "70%", trend: "up", progress: 64 }
    ],
    agents: [
      {
        name: "CareGuide Agent",
        description: "Manages resident intake and service coordination",
        capabilities: [
          "Unified intake wizard with validation",
          "De-duplication across systems",
          "Smart routing to appropriate services",
          "Cross-system data synchronization"
        ]
      },
      {
        name: "Resident Engagement Agent",
        description: "Ensures accessibility and engagement",
        capabilities: [
          "Accessibility compliance checking",
          "Multilingual content validation",
          "Adoption prompts and digital divide support",
          "Engagement workflow automation"
        ]
      }
    ],
    integrations: ["CareGuide", "Yardi", "Microsoft Fabric", "EHR Systems", "Power BI"],
    useCases: [
      { title: "New Resident Onboarding", description: "Streamlined intake process connecting housing, services, and healthcare." },
      { title: "Service Coordination", description: "Track resident needs across multiple service providers with shared visibility." },
      { title: "Crisis Response", description: "Rapid response workflows for emergency situations with proper documentation." }
    ],
    roadmapItems: [
      { phase: "Phase 1 (Current)", item: "CareGuide 2.0 intake wizard MVP" },
      { phase: "Phase 2 (Q2)", item: "Multilingual support deployment" },
      { phase: "Phase 3 (Q4)", item: "Resident self-service portal" }
    ]
  },
  "governance-&-compliance-hub": {
    name: "Governance & Compliance Hub",
    icon: Shield,
    accent: "teal",
    color: "#7FA3A1",
    tagline: "Audit-ready compliance at your fingertips",
    description: "The Governance & Compliance Hub provides complete visibility into regulatory compliance across all NCR operations. With automated filing preparation, comprehensive audit trails, and Purview lineage tracking, it ensures NCR meets all HUD, CMS, and internal governance requirements.",
    keyBenefits: [
      "Automated filing preparation and deadline tracking",
      "Complete agent audit trails for every action",
      "Microsoft Purview data lineage integration",
      "Fairness audit reports for bias monitoring",
      "Entity registry and compliance documentation",
      "Evidence pack generation for auditors"
    ],
    features: [
      { name: "Agent Audit Trails", description: "Complete logging of every agent action with data touched", status: "available" },
      { name: "Filing Dashboard", description: "HUD and CMS filing status with deadline tracking", status: "available" },
      { name: "Purview Lineage", description: "Data lineage visualization from source to report", status: "available" },
      { name: "Evidence Pack Generator", description: "Automated compilation of audit documentation", status: "coming-soon" },
      { name: "Fairness Audits", description: "Bias monitoring for eligibility and scoring models", status: "coming-soon" },
      { name: "Entity Registry", description: "System of record for 1,100+ NCR entities", status: "planned" }
    ],
    kpis: [
      { name: "Filing Timeliness", current: "96%", target: "99%", trend: "up", progress: 97 },
      { name: "Audit Finding Resolution", current: "18 days", target: "10 days", trend: "down", progress: 56 },
      { name: "Data Access Violations", current: "2/mo", target: "0", trend: "down", progress: 50 },
      { name: "Bias Flags Resolved", current: "85%", target: "100%", trend: "up", progress: 85 }
    ],
    agents: [
      {
        name: "Compliance Agent",
        description: "Automates compliance workflows and documentation",
        capabilities: [
          "HUD/CMS filing preparation",
          "Entity registry maintenance",
          "Action logging and audit trails",
          "Evidence pack compilation"
        ]
      },
      {
        name: "Bias Monitoring Agent",
        description: "Ensures fairness in automated decisions",
        capabilities: [
          "Fairness audits for eligibility decisions",
          "Scoring model bias detection",
          "Anomaly detection and alerting",
          "Remediation workflow support"
        ]
      }
    ],
    integrations: ["Microsoft Purview", "Microsoft Fabric", "Yardi", "Workday", "Power BI"],
    useCases: [
      { title: "HUD Audit Preparation", description: "Generate complete evidence packs with data lineage for regulatory audits." },
      { title: "Fair Housing Compliance", description: "Monitor eligibility decisions for potential bias with automated alerting." },
      { title: "Internal Audit Support", description: "Provide auditors with complete trails of all agent actions and data access." }
    ],
    roadmapItems: [
      { phase: "Phase 1 (Current)", item: "Audit trails and filing dashboard active" },
      { phase: "Phase 2 (Q2)", item: "Evidence pack generator deployment" },
      { phase: "Phase 3 (Q3)", item: "Entity registry system of record" }
    ]
  },
  "strategy-&-sustainability-hub": {
    name: "Strategy & Sustainability Hub",
    icon: LineChart,
    accent: "olive",
    color: "#A5A033",
    tagline: "Data-driven decisions for sustainable growth",
    description: "The Strategy & Sustainability Hub provides leadership with predictive analytics and scenario modeling. From occupancy forecasting to ROI simulations, it transforms data into actionable insights for strategic planning and sustainable operations.",
    keyBenefits: [
      "Predictive occupancy and staffing forecasts",
      "Financial scenario modeling and projections",
      "ROI simulations for strategic investments",
      "Sustainability metrics tracking",
      "Board-ready reporting and visualizations",
      "System inventory and technology roadmap"
    ],
    features: [
      { name: "Occupancy Forecasting", description: "Predictive models for property occupancy trends", status: "available" },
      { name: "Staffing Projections", description: "Labor demand forecasting based on census and acuity", status: "coming-soon" },
      { name: "Financial Scenarios", description: "What-if modeling for budget and investment decisions", status: "coming-soon" },
      { name: "ROI Simulations", description: "Investment analysis for technology and program initiatives", status: "planned" },
      { name: "Sustainability Dashboard", description: "Environmental and social impact tracking", status: "planned" },
      { name: "System Inventory", description: "Complete technology landscape visualization", status: "available" }
    ],
    kpis: [
      { name: "Forecast Accuracy", current: "87%", target: "92%", trend: "up", progress: 95 },
      { name: "Strategic Initiative ROI", current: "2.8x", target: "3.5x", trend: "up", progress: 80 },
      { name: "Data-Driven Decisions", current: "65%", target: "85%", trend: "up", progress: 76 },
      { name: "Board Report Timeliness", current: "95%", target: "100%", trend: "up", progress: 95 }
    ],
    agents: [
      {
        name: "Strategy Agent",
        description: "Provides predictive analytics and scenario modeling",
        capabilities: [
          "Occupancy/staffing projections",
          "Financial forecasting",
          "ROI simulations",
          "System inventory management"
        ]
      }
    ],
    integrations: ["Microsoft Fabric", "Power BI", "Workday", "Yardi", "Microsoft Copilot"],
    useCases: [
      { title: "Annual Budget Planning", description: "Use predictive models to inform budget assumptions and stress-test scenarios." },
      { title: "Capital Investment Decisions", description: "Simulate ROI for property improvements and technology investments." },
      { title: "Strategic Planning", description: "Develop long-range plans with data-driven projections and scenario analysis." }
    ],
    roadmapItems: [
      { phase: "Phase 1 (Current)", item: "Occupancy forecasting and system inventory" },
      { phase: "Phase 2 (Q2)", item: "Staffing projections and financial scenarios" },
      { phase: "Phase 3 (Q4)", item: "Full ROI simulation platform" }
    ]
  },
  "ops-&-security-hub": {
    name: "Ops & Security Hub",
    icon: Lock,
    accent: "lime",
    color: "#B5C942",
    tagline: "Operational resilience and security assurance",
    description: "The Ops & Security Hub provides IT and operations teams with the tools to maintain system health, ensure security, and respond to incidents. With agent observability, uptime monitoring, and continuity workflows, it keeps NCR's technology infrastructure running smoothly.",
    keyBenefits: [
      "Real-time system uptime monitoring",
      "Agent observability and performance tracking",
      "Incident playbooks and response automation",
      "Business continuity workflows",
      "Security event monitoring and alerting",
      "Disaster recovery readiness"
    ],
    features: [
      { name: "System Dashboard", description: "Real-time monitoring of all NCR technology systems", status: "available" },
      { name: "Agent Observability", description: "Performance tracking and anomaly detection for AI agents", status: "available" },
      { name: "Incident Playbooks", description: "Automated response procedures for common issues", status: "coming-soon" },
      { name: "Continuity Workflows", description: "Business continuity planning and testing tools", status: "coming-soon" },
      { name: "Security Monitoring", description: "SIEM integration and threat detection", status: "planned" },
      { name: "DR Readiness", description: "Disaster recovery testing and validation", status: "planned" }
    ],
    kpis: [
      { name: "System Uptime", current: "99.7%", target: "99.9%", trend: "up", progress: 100 },
      { name: "Incident Response Time", current: "15 min", target: "10 min", trend: "down", progress: 67 },
      { name: "Agent Performance Score", current: "94%", target: "98%", trend: "up", progress: 96 },
      { name: "Security Events Resolved", current: "98%", target: "100%", trend: "up", progress: 98 }
    ],
    agents: [
      {
        name: "Security Agent",
        description: "Monitors for security threats and unusual activity",
        capabilities: [
          "Unusual agent activity pattern detection",
          "Data access anomaly monitoring",
          "SIEM integration and alerting",
          "Automated incident escalation"
        ]
      }
    ],
    integrations: ["Microsoft Azure", "SIEM", "Microsoft Fabric", "GraceWorks", "Power BI"],
    useCases: [
      { title: "System Monitoring", description: "24/7 visibility into system health with automated alerting and escalation." },
      { title: "Incident Response", description: "Structured playbooks guide teams through incident resolution." },
      { title: "Security Audits", description: "Comprehensive security posture reporting for compliance and governance." }
    ],
    roadmapItems: [
      { phase: "Phase 1 (Current)", item: "System dashboard and agent observability" },
      { phase: "Phase 2 (Q2)", item: "Incident playbooks and automation" },
      { phase: "Phase 3 (Q3)", item: "Full security monitoring integration" }
    ]
  }
};

function getTrendIcon(trend: "up" | "down" | "stable") {
  switch (trend) {
    case "up":
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    case "down":
      return <TrendingDown className="w-4 h-4 text-green-500" />;
    case "stable":
      return <Minus className="w-4 h-4 text-muted-foreground" />;
  }
}

// Unified NCR Brand Color Badge System
const STATUS_BADGE_COLORS = {
  available: { bg: NCR_BRAND_COLORS.teal, label: "Available" },
  "coming-soon": { bg: NCR_BRAND_COLORS.orange, label: "Coming Soon" },
  planned: { bg: NCR_BRAND_COLORS.sky, label: "Planned" }
};

const PHASE_BADGE_COLORS: Record<string, string> = {
  "Phase 1": NCR_BRAND_COLORS.teal,
  "Phase 2": NCR_BRAND_COLORS.olive,
  "Phase 3": NCR_BRAND_COLORS.coral
};

function getStatusBadge(status: "available" | "coming-soon" | "planned") {
  const { bg, label } = STATUS_BADGE_COLORS[status];
  return (
    <Badge 
      className="border"
      style={{ 
        backgroundColor: `${bg}15`,
        color: bg,
        borderColor: `${bg}40`
      }}
    >
      {label}
    </Badge>
  );
}

function getPhaseBadge(phase: string) {
  const phaseKey = phase.split(" ")[0] + " " + phase.split(" ")[1];
  const color = PHASE_BADGE_COLORS[phaseKey] || NCR_BRAND_COLORS.teal;
  return (
    <Badge 
      variant="outline"
      className="mb-2"
      style={{ 
        backgroundColor: `${color}15`,
        color: color,
        borderColor: `${color}40`
      }}
    >
      {phase}
    </Badge>
  );
}

function getAccentCardHeader(accent: AccentColor) {
  const color = NCR_BRAND_COLORS[accent];
  return {
    backgroundColor: color,
    color: "white"
  };
}

export default function HubDetail() {
  const { hubId } = useParams<{ hubId: string }>();
  const hubData = hubDetails[hubId || ""];

  if (!hubData) {
    return (
      <div className="p-6">
        <Link href="/agent-value-map?tab=appshell">
          <Button variant="ghost" className="gap-2 mb-6" data-testid="button-back">
            <ArrowLeft className="w-4 h-4" />
            Back to App Shell
          </Button>
        </Link>
        <Card>
          <CardContent className="p-12 text-center">
            <AlertTriangle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Hub Not Found</h2>
            <p className="text-muted-foreground">The requested hub could not be found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const HubIcon = hubData.icon;
  const brandColor = NCR_BRAND_COLORS[hubData.accent] || hubData.color;

  return (
    <div className="p-6 space-y-6">
      <Link href="/agent-value-map?tab=appshell">
        <Button variant="ghost" className="gap-2" data-testid="button-back">
          <ArrowLeft className="w-4 h-4" />
          Back to App Shell
        </Button>
      </Link>

      <div className="flex items-start gap-4 flex-wrap">
        <div 
          className="p-4 rounded-xl"
          style={{ backgroundColor: `${brandColor}20` }}
        >
          <HubIcon className="w-10 h-10" style={{ color: brandColor }} />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold" data-testid="text-hub-title">{hubData.name}</h1>
          <p className="text-lg text-muted-foreground mt-1">{hubData.tagline}</p>
        </div>
      </div>

      <AccentCard accent={hubData.accent}>
        <CardContent className="p-6">
          <p className="text-base leading-relaxed">{hubData.description}</p>
        </CardContent>
      </AccentCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="rounded-t-xl" style={getAccentCardHeader(hubData.accent)}>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Key Benefits
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hubData.keyBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: brandColor }} />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="rounded-t-xl" style={getAccentCardHeader(hubData.accent)}>
            <CardTitle className="text-white flex items-center gap-2">
              <Gauge className="w-5 h-5" />
              Key Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {hubData.kpis.map((kpi) => (
              <div key={kpi.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{kpi.name}</span>
                  {getTrendIcon(kpi.trend)}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold" style={{ color: brandColor }}>{kpi.current}</span>
                  <span className="text-muted-foreground">Target: {kpi.target}</span>
                </div>
                <Progress value={kpi.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="rounded-t-xl" style={getAccentCardHeader(hubData.accent)}>
          <CardTitle className="text-white flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Features
          </CardTitle>
          <CardDescription className="text-white/80">Capabilities and functionality</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hubData.features.map((feature) => (
              <div key={feature.name} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-semibold">{feature.name}</h4>
                  {getStatusBadge(feature.status)}
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="rounded-t-xl" style={getAccentCardHeader(hubData.accent)}>
            <CardTitle className="text-white flex items-center gap-2">
              <Bot className="w-5 h-5" />
              AI Agents
            </CardTitle>
            <CardDescription className="text-white/80">Intelligent automation powering this hub</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {hubData.agents.map((agent) => (
              <AccentCard key={agent.name} accent={hubData.accent}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4" style={{ color: brandColor }} />
                    <h4 className="font-semibold">{agent.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{agent.description}</p>
                  <div className="space-y-1">
                    {agent.capabilities.map((cap, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <ChevronRight className="w-3 h-3 text-muted-foreground" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </AccentCard>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="rounded-t-xl" style={getAccentCardHeader(hubData.accent)}>
            <CardTitle className="text-white flex items-center gap-2">
              <Network className="w-5 h-5" />
              System Integrations
            </CardTitle>
            <CardDescription className="text-white/80">Connected platforms and data sources</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {hubData.integrations.map((integration) => (
                <Badge key={integration} variant="secondary" className="text-sm py-1 px-3">
                  {integration}
                </Badge>
              ))}
            </div>

            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Use Cases
            </h4>
            <div className="space-y-3">
              {hubData.useCases.map((useCase) => (
                <div key={useCase.title} className="p-3 rounded-lg bg-muted/50">
                  <h5 className="font-medium mb-1">{useCase.title}</h5>
                  <p className="text-sm text-muted-foreground">{useCase.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="rounded-t-xl" style={getAccentCardHeader(hubData.accent)}>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Roadmap
          </CardTitle>
          <CardDescription className="text-white/80">Planned development timeline</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hubData.roadmapItems.map((item, index) => {
              const phaseKey = item.phase.split(" ")[0] + " " + item.phase.split(" ")[1];
              const phaseColor = PHASE_BADGE_COLORS[phaseKey] || brandColor;
              return (
                <div 
                  key={index} 
                  className="p-4 rounded-lg border-l-4"
                  style={{ borderLeftColor: phaseColor, backgroundColor: `${phaseColor}10` }}
                >
                  {getPhaseBadge(item.phase)}
                  <p className="text-sm">{item.item}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
