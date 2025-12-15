import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AccentCard, getAccentBgClass, AccentColor } from "@/components/ui/accent-card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  Users, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Zap,
  Target,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Database,
  Shield,
  Building2,
  FileText,
  Heart,
  Briefcase,
  UserCheck,
  AlertTriangle,
  LineChart,
  Home,
  Stethoscope,
  HandHeart,
  Scale,
  Eye,
  Lock,
  ClipboardCheck,
  Layers,
  Monitor,
  Globe,
  Settings,
  Calendar,
  ChevronRight,
  CircleDot,
  Gauge,
  Network,
  BookOpen,
  LucideIcon,
  Server,
  ExternalLink
} from "lucide-react";
import { SiMicrosoft, SiMicrosoftazure, SiPowerbi } from "react-icons/si";

export default function AgentValueMap() {
  const [activeTab, setActiveTab] = useState("overview");

  // Data Foundation items with NCR brand colors
  const dataFoundation: Array<{ name: string; description: string; icon: LucideIcon; accent: AccentColor }> = [
    { name: "Company Information", description: "NCR entity master (1,100+ entities), programs, locations, properties, service lines", icon: Building2, accent: "teal" },
    { name: "Business Activity", description: "Resident events, service coordinator activity, case notes, intakes, requalifications, volunteer participation", icon: Briefcase, accent: "olive" },
    { name: "Financial Strength", description: "Workday GL, AP/AR, allocations, grants, restricted/unrestricted funds, property-level P&Ls", icon: DollarSign, accent: "lime" },
    { name: "Filings & Events", description: "HUD recerts, CMS filings, audits, board packets, incident reporting, compliance attestations", icon: FileText, accent: "coral" },
    { name: "Hierarchies", description: "Org structure, property → region → division, legal entity → operating unit mappings", icon: Layers, accent: "sky" },
    { name: "Principals & Contacts", description: "Donors, prospects, board, vendors, grant officers, partner contacts, resident emergency contacts", icon: Users, accent: "orange" },
    { name: "IP Intelligence", description: "Policies/procedures, templates, program manuals, training content, contracts", icon: BookOpen, accent: "tealDark" },
    { name: "Fraud Insights", description: "Payment anomalies, identity verification flags, benefits eligibility anomalies, duplicate vendor/donor records", icon: AlertTriangle, accent: "coralDark" },
  ];

  // Consumption channels
  const consumptionChannels: Array<{ name: string; description: string; icon: LucideIcon; accent: AccentColor }> = [
    { name: "Platform UIs", description: "NCR Unified App Shell (Donor Hub, Grants Hub, Volunteer Hub, Resident Engagement Hub, Governance Hub, Strategy Hub, Ops/Security Hub)", icon: Monitor, accent: "sky" },
    { name: "Bulk Data", description: "Controlled exports, board packs, regulator-ready extracts, property performance snapshots", icon: Database, accent: "teal" },
    { name: "Transactional Data", description: "Intake submissions, HUD recerts, billing/claims, gift acknowledgments, volunteer shifts", icon: Zap, accent: "orange" },
    { name: "AI-Ready Data", description: "Curated feature stores for forecasting occupancy/staffing, donor propensity, compliance risk", icon: Bot, accent: "coral" },
    { name: "Marketplaces", description: "Future: vetted agent marketplace for internal NCR teams (approved automations only)", icon: Globe, accent: "lime" },
    { name: "Agents", description: "The agentic teams below, invoked from the UI and governed centrally", icon: Sparkles, accent: "olive" },
  ];

  // Agent catalogue
  const agentCatalogue: Array<{ name: string; domain: string; description: string; icon: LucideIcon; accent: AccentColor }> = [
    { name: "CareGuide Agent", domain: "Healthcare + Housing", description: "Unified intake wizard, de-duplication, validation, routing across systems", icon: Heart, accent: "coral" },
    { name: "Housing Agent", domain: "Housing", description: "HUD requalification workflows, document completeness checks, deadline management", icon: Home, accent: "sky" },
    { name: "Healthcare Agent", domain: "Healthcare", description: "Billing workflow automation, claim validation, Workday integration support", icon: Stethoscope, accent: "lime" },
    { name: "Document Agent", domain: "Content", description: "Donor letters, impact narratives, grant narratives/reports, volunteer recognition", icon: FileText, accent: "coral" },
    { name: "Donor Agent", domain: "Fundraising", description: "ROI dashboards, pipeline hygiene, acquisition funnel, 'next best action'", icon: HandHeart, accent: "orange" },
    { name: "Grants Agent", domain: "Grants", description: "Pipeline dashboard, dedup outreach, outcomes reporting, reporting automation", icon: Target, accent: "orangeDark" },
    { name: "Financial Agent", domain: "Finance", description: "Consolidated reporting, double-count detection, entity-level reconciliation flags", icon: DollarSign, accent: "lime" },
    { name: "Compliance Agent", domain: "Compliance", description: "HUD/CMS filing prep, entity registry, action logging, evidence packs for audit", icon: Shield, accent: "teal" },
    { name: "Bias Monitoring Agent", domain: "Risk", description: "Fairness audits for eligibility decisions + any scoring models; anomaly detection", icon: Scale, accent: "olive" },
    { name: "Strategy Agent", domain: "Strategy", description: "Forecasting (occupancy/staffing/finance), ROI simulations, system inventory", icon: LineChart, accent: "sky" },
    { name: "Resident Engagement Agent", domain: "Engagement", description: "Accessibility checks, multilingual readiness, adoption prompts, digital divide workflows", icon: Users, accent: "tealDark" },
    { name: "Security Agent", domain: "Security", description: "Monitors unusual agent activity patterns + data access anomalies; ties to SIEM tooling", icon: Lock, accent: "oliveDark" },
  ];

  // Personas
  const personas: Array<{ role: string; benefit: string; icon: LucideIcon; accent: AccentColor }> = [
    { role: "Chief Operations Officer / Ops Leaders", benefit: "Gets 'system of work' visibility, staffing forecasts, operational compliance posture", icon: Settings, accent: "sky" },
    { role: "Chief Risk Officer / Compliance Leadership", benefit: "Audit trails, filing automation, Purview lineage, bias monitoring, exception handling", icon: AlertTriangle, accent: "orange" },
    { role: "Chief Compliance Officer / Legal", benefit: "Evidence packs, policy enforcement, access governance, filing timeliness and accuracy", icon: Scale, accent: "teal" },
    { role: "Data Operations", benefit: "OneLake pipelines, canonical objects, model monitoring, quality SLAs", icon: Database, accent: "olive" },
    { role: "Finance Leadership", benefit: "Consolidated P&L, entity registry accuracy, close acceleration, anomaly detection", icon: DollarSign, accent: "lime" },
    { role: "Development Leadership", benefit: "Pipeline clarity, dedup outreach, rapid reporting, donor confidence through metrics", icon: TrendingUp, accent: "coral" },
    { role: "Program Leadership", benefit: "Less paperwork, fewer reworks, more time with residents/patients", icon: Heart, accent: "coralDark" },
  ];

  // Roadmap phases
  const roadmapPhases: Array<{ phase: string; title: string; timeline: string; goal: string; items: string[]; deliverables: string[]; accent: AccentColor }> = [
    {
      phase: "Phase 0",
      title: "Guardrails First",
      timeline: "30-45 days",
      goal: "Enable agents without creating risk",
      items: [
        "Purview foundations: Data classification (HIPAA/PII/financial), access policies, lineage turned on",
        "Agent governance: 'Allowed actions' registry, human-in-the-loop approvals, retention rules, logging standard",
        "Template & policy library: Approved donor letter templates, grant report templates, filing templates, tone/branding rules",
        "Success metrics baseline: Current cycle times (HUD recerts, donor acknowledgments, month close), error rates, audit findings"
      ],
      deliverables: [
        "Governance & Compliance Hub (MVP): audit trail viewer + agent action log + data access rules dashboard",
        "'Agent Safety Standard' document NCR can show auditors"
      ],
      accent: "orange"
    },
    {
      phase: "Phase 1",
      title: "Quick Wins That Staff Feel",
      timeline: "60-90 days",
      goal: "Eliminate repetitive work and reduce compliance exposure",
      items: [
        "Document Agent (immediate payoff): Donor letters + volunteer recognition + basic grant narratives",
        "Housing Agent (compliance + workload reduction): HUD requalification workflow + completeness validation + resident reminders",
        "Financial Agent (visibility + trust): Double-count detection flags + entity reconciliation dashboard"
      ],
      deliverables: [
        "Donor letters auto-generated within hours (not weeks)",
        "HUD recert 'workflow in a box' (tasks, deadlines, validations)",
        "Finance transparency pilot: consolidated view for a subset of entities/properties"
      ],
      accent: "sky"
    },
    {
      phase: "Phase 2",
      title: "Unified Intake + Measurable Impact",
      timeline: "90-180 days",
      goal: "Unify resident/patient 'front door' and tie outcomes to funding",
      items: [
        "CareGuide 2.0 (unified intake wizard): Capture once → validate → distribute to downstream systems",
        "Donor impact narratives from outcomes: Narrative + metrics: what changed, how many served, what improved",
        "Grants Workspace (pipeline + reporting): Dedup outreach, unified calendar, outcome reporting tied to metrics"
      ],
      deliverables: [
        "CareGuide 2.0 intake wizard (MVP) integrated to OneLake + governed by Purview",
        "Donor Hub ROI dashboards (pilot) that tie gifts → programs → outcomes",
        "Grants Hub pipeline dashboard + report generator"
      ],
      accent: "lime"
    },
    {
      phase: "Phase 3",
      title: "Predictive Leadership + Enterprise Scale",
      timeline: "180-365 days",
      goal: "Leadership dashboards that drive decisions, not anecdotes",
      items: [
        "Strategy Agent forecasting: Occupancy/staffing projections, finance projections, scenario modeling",
        "Compliance Agent at scale: Filing prep automation, evidence packs, entity registry automation",
        "Resident Engagement Hub maturity: Multilingual + accessibility compliance monitoring, digital divide workflows"
      ],
      deliverables: [
        "Predictive dashboards in Power BI (forecast overlays + scenario tools)",
        "Entity registry system of record (with exceptions workflow)",
        "Operational resilience: continuity workflows + security/ops dashboards"
      ],
      accent: "coral"
    }
  ];

  // App Shell hubs
  const appShellHubs: Array<{ name: string; description: string; icon: LucideIcon; accent: AccentColor }> = [
    { name: "Donor Hub", description: "ROI dashboards, impact narratives, acknowledgments, pipeline views", icon: HandHeart, accent: "coral" },
    { name: "Grants Hub", description: "Pipeline, deadlines, report generator, dedup outreach, outcomes", icon: Target, accent: "orange" },
    { name: "Volunteer Hub", description: "Onboarding, scheduling, recognition automation, wishlists integration", icon: Users, accent: "sky" },
    { name: "Resident Engagement Hub", description: "Intake, service pathways, multilingual support, accessibility validation", icon: Heart, accent: "coralDark" },
    { name: "Governance & Compliance Hub", description: "Agent audit trails, filings, Purview lineage, fairness audit reports", icon: Shield, accent: "teal" },
    { name: "Strategy & Sustainability Hub", description: "Forecasts, scenario modeling, ROI simulations, sustainability metrics", icon: LineChart, accent: "olive" },
    { name: "Ops & Security Hub", description: "Continuity workflows, system uptime, agent observability, incident playbooks", icon: Lock, accent: "lime" },
  ];

  // Day in the life steps
  const dayInTheLife: Array<{ step: number; title: string; description: string; icon: LucideIcon; accent: AccentColor }> = [
    { step: 1, title: "Resident starts intake", description: "A resident starts an intake once in CareGuide 2.0. CareGuide Agent validates + routes data to the right downstream workflows.", icon: UserCheck, accent: "teal" },
    { step: 2, title: "Housing Agent activates", description: "Housing Agent launches HUD requalification steps automatically. Missing docs flagged; reminders sent; staff dashboard shows exceptions only.", icon: Home, accent: "sky" },
    { step: 3, title: "Outcomes flow to OneLake", description: "Outcomes (services delivered) flow into OneLake with governance. Donor Agent generates ROI dashboard views; Document Agent generates a narrative.", icon: Database, accent: "olive" },
    { step: 4, title: "Grants Agent coordinates", description: "Grants Agent updates a pipeline board + prevents duplicate outreach. Reports are produced with metrics, not anecdotes.", icon: Target, accent: "orange" },
    { step: 5, title: "Compliance Agent prepares", description: "Compliance Agent prepares an evidence pack for filings. Every action logged; Purview lineage shows exactly where data came from.", icon: Shield, accent: "coral" },
    { step: 6, title: "Strategy Agent forecasts", description: "Strategy Agent shows leadership a staffing/occupancy forecast. Leadership sees scenarios and can make staffing decisions with confidence.", icon: LineChart, accent: "lime" },
  ];

  // Governance non-negotiables
  const governanceItems: Array<{ title: string; description: string; icon: LucideIcon; accent: AccentColor }> = [
    { title: "Human-in-the-loop for high-stakes decisions", description: "Eligibility approvals, adverse actions, filings submission sign-off", icon: UserCheck, accent: "sky" },
    { title: "Full audit trails", description: "Every agent action: who, what, when, data touched, output produced", icon: ClipboardCheck, accent: "lime" },
    { title: "Purview-enforced access controls", description: "HIPAA/PII boundaries; least-privilege role-based access", icon: Lock, accent: "teal" },
    { title: "Bias monitoring & fairness audits", description: "Required for eligibility decisions and any scoring models", icon: Scale, accent: "orange" },
    { title: "Model risk management", description: "Versioning, evaluation, drift monitoring, rollback procedures", icon: AlertTriangle, accent: "coral" },
    { title: "Data retention & redaction rules", description: "Especially for health/resident data and donor privacy", icon: Eye, accent: "olive" },
  ];

  // Scorecard metrics
  const scorecardMetrics: Array<{ domain: string; metrics: string[]; accent: AccentColor }> = [
    { domain: "Housing", metrics: ["HUD recert cycle time ↓", "Error rate ↓", "Staff hours saved ↑", "Compliance exceptions ↓"], accent: "sky" },
    { domain: "Healthcare", metrics: ["Claim rejection rate ↓", "Billing cycle time ↓", "Duplicate intake rate ↓"], accent: "lime" },
    { domain: "Finance", metrics: ["Close time ↓", "Reconciliation exceptions ↓", "Entity mapping accuracy ↑"], accent: "limeDark" },
    { domain: "Fundraising", metrics: ["Acknowledgment time ↓", "Donor retention ↑", "Pipeline coverage ↑", "ROI reporting adoption ↑"], accent: "coral" },
    { domain: "Grants", metrics: ["On-time submissions ↑", "Duplicate outreach incidents ↓", "Report turnaround time ↓"], accent: "orange" },
    { domain: "Compliance & Risk", metrics: ["Audit findings ↓", "Filing timeliness ↑", "Data access violations ↓", "Bias flags resolved time ↓"], accent: "teal" },
    { domain: "Adoption", metrics: ["Active users ↑", "Spreadsheet dependency ↓", "Agent tasks completed ↑"], accent: "olive" },
  ];

  // Agent vs Infrastructure
  const agentBestFit = [
    "Intake routing + dedup + validation (CareGuide Agent)",
    "HUD requals + completeness + deadline mgmt (Housing Agent)",
    "Billing workflow assistance + validation (Healthcare Agent)",
    "Donor/grant/volunteer documents at scale (Document Agent)",
    "Pipeline dedup & outreach coordination (Grants Agent)",
    "Consolidation flags + anomaly detection (Financial Agent)",
    "Filing prep + evidence packs + audit trails (Compliance Agent)",
    "Fairness audits + anomaly monitoring (Bias Monitoring Agent)",
    "Forecasting + ROI simulations (Strategy Agent)"
  ];

  const infrastructureSolutions = [
    "EHR interoperability, Yardi/Workday/Raiser's Edge integrations",
    "OneLake ingestion pipelines + canonical schema",
    "Purview governance + identity/role-based access",
    "SIEM, incident response, disaster recovery",
    "Training, champions, adoption incentives, executive sponsorship"
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Agentic Plan</h1>
          <p className="text-muted-foreground mt-1">
            NCR Data + Agent Platform Master Plan
          </p>
        </div>
        <Badge variant="outline" className="gap-1">
          <Sparkles className="w-3 h-3" />
          AI-Powered Transformation
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-2 bg-muted/50 p-2 rounded-xl">
          <TabsTrigger 
            value="overview" 
            data-testid="tab-overview"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2 px-4 py-2.5 rounded-lg"
          >
            <Target className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="framework" 
            data-testid="tab-framework"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2 px-4 py-2.5 rounded-lg"
          >
            <Layers className="w-4 h-4" />
            Framework
          </TabsTrigger>
          <TabsTrigger 
            value="agents" 
            data-testid="tab-agents"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2 px-4 py-2.5 rounded-lg"
          >
            <Bot className="w-4 h-4" />
            Agents
          </TabsTrigger>
          <TabsTrigger 
            value="roadmap" 
            data-testid="tab-roadmap"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2 px-4 py-2.5 rounded-lg"
          >
            <Calendar className="w-4 h-4" />
            Roadmap
          </TabsTrigger>
          <TabsTrigger 
            value="appshell" 
            data-testid="tab-appshell"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2 px-4 py-2.5 rounded-lg"
          >
            <Monitor className="w-4 h-4" />
            App Shell
          </TabsTrigger>
          <TabsTrigger 
            value="governance" 
            data-testid="tab-governance"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2 px-4 py-2.5 rounded-lg"
          >
            <Shield className="w-4 h-4" />
            Governance
          </TabsTrigger>
          <TabsTrigger 
            value="scorecard" 
            data-testid="tab-scorecard"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2 px-4 py-2.5 rounded-lg"
          >
            <Gauge className="w-4 h-4" />
            Scorecard
          </TabsTrigger>
          <TabsTrigger 
            value="techstack" 
            data-testid="tab-techstack"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2 px-4 py-2.5 rounded-lg"
          >
            <Server className="w-4 h-4" />
            Tech Stack
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* North Star */}
          <AccentCard accent="teal">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Target className="w-5 h-5 text-[#7FA3A1]" />
                North Star
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                Build a <strong>governed NCR Data + Agent platform</strong> where staff, donors, residents, and partners interact through one app layer—while <strong>Purview enforces privacy, auditability, and accountability</strong>.
              </p>
            </CardContent>
          </AccentCard>

          {/* Data Backbone Target */}
          <AccentCard accent="olive">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Database className="w-5 h-5 text-[#A5A033]" />
                NCR Data Backbone Target
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold">Microsoft Fabric OneLake</p>
                  <p className="text-sm text-muted-foreground">Unified data layer</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold">Microsoft Purview</p>
                  <p className="text-sm text-muted-foreground">Governance (classification, access policies, lineage, audit)</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold">Standardized Canonical Objects</p>
                  <p className="text-sm text-muted-foreground">Person, Resident, Donor, Gift, Grant, Property, Entity, Claim, Filing, Vendor, Volunteer, Interaction</p>
                </div>
              </div>
            </CardContent>
          </AccentCard>

          {/* Day in the Life */}
          <AccentCard accent="orange">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#E8923A]" />
                Day in the Life Demo Storyline
              </CardTitle>
              <CardDescription>How agents work together in practice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dayInTheLife.map((item, index) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full ${getAccentBgClass(item.accent)} flex items-center justify-center`}>
                      <span className="font-bold text-white">{item.step}</span>
                    </div>
                    <div className="flex-1 pb-4 border-b last:border-b-0">
                      <div className="flex items-center gap-2">
                        <item.icon className="w-4 h-4 text-muted-foreground" />
                        <p className="font-semibold">{item.title}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                    {index < dayInTheLife.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-muted-foreground mt-3 hidden md:block" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </AccentCard>

          {/* Executive Takeaway */}
          <AccentCard accent="lime">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#B5C942]" />
                Executive Takeaway
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>NCR's agentic platform will:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B5C942] mt-0.5 flex-shrink-0" />
                  <span>Unify fragmented data into a governed, auditable foundation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B5C942] mt-0.5 flex-shrink-0" />
                  <span>Deploy specialized agents for repeatable, compliance-sensitive workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B5C942] mt-0.5 flex-shrink-0" />
                  <span>Deliver measurable ROI through reduced cycle times, fewer errors, and staff empowerment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B5C942] mt-0.5 flex-shrink-0" />
                  <span>Maintain full audit trails and human oversight for regulatory confidence</span>
                </li>
              </ul>
            </CardContent>
          </AccentCard>
        </TabsContent>

        {/* Framework Tab */}
        <TabsContent value="framework" className="space-y-6">
          {/* Data Foundation */}
          <AccentCard accent="teal">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Database className="w-5 h-5 text-[#7FA3A1]" />
                A. Data (The Foundation NCR Must Unify)
              </CardTitle>
              <CardDescription>These are the "atoms" agents rely on. NCR already has most of them—just fragmented.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dataFoundation.map((item) => (
                  <AccentCard key={item.name} accent={item.accent}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-md ${getAccentBgClass(item.accent)}`}>
                          <item.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </AccentCard>
                ))}
              </div>
            </CardContent>
          </AccentCard>

          {/* Consumption */}
          <AccentCard accent="sky">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Monitor className="w-5 h-5 text-[#7BC4DC]" />
                B. Consumption (How NCR Users Experience Value)
              </CardTitle>
              <CardDescription>Delivery channels become a unified App Shell + role-based hubs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {consumptionChannels.map((item) => (
                  <AccentCard key={item.name} accent={item.accent}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-md ${getAccentBgClass(item.accent)}`}>
                          <item.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </AccentCard>
                ))}
              </div>
            </CardContent>
          </AccentCard>

          {/* Personas */}
          <AccentCard accent="coral">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Users className="w-5 h-5 text-[#D5636C]" />
                D. Personas (Who Benefits / Who Sponsors)
              </CardTitle>
              <CardDescription>Map diagram personas to NCR roles so adoption is real</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {personas.map((persona) => (
                  <AccentCard key={persona.role} accent={persona.accent}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-md ${getAccentBgClass(persona.accent)}`}>
                          <persona.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">{persona.role}</p>
                          <p className="text-sm text-muted-foreground mt-1">{persona.benefit}</p>
                        </div>
                      </div>
                    </CardContent>
                  </AccentCard>
                ))}
              </div>
            </CardContent>
          </AccentCard>

          {/* Agent vs Infrastructure */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AccentCard accent="lime">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Bot className="w-5 h-5 text-[#B5C942]" />
                  Agent Best-Fit
                </CardTitle>
                <CardDescription>Repeatable, compliance-sensitive, data-driven</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {agentBestFit.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#B5C942] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </AccentCard>

            <AccentCard accent="sky">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Network className="w-5 h-5 text-[#7BC4DC]" />
                  Infrastructure / Alternative Solutions
                </CardTitle>
                <CardDescription>Platform and culture foundations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {infrastructureSolutions.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CircleDot className="w-4 h-4 text-[#7BC4DC] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </AccentCard>
          </div>
        </TabsContent>

        {/* Agents Tab */}
        <TabsContent value="agents" className="space-y-6">
          <AccentCard accent="orange">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#E8923A]" />
                C. NCR's Agentic Teams Catalogue
              </CardTitle>
              <CardDescription>Specialized digital staff with audit trails</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agentCatalogue.map((agent) => (
                  <AccentCard key={agent.name} accent={agent.accent} data-testid={`card-agent-${agent.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-md ${getAccentBgClass(agent.accent)}`}>
                          <agent.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{agent.name}</p>
                          <Badge variant="outline" className="text-xs mt-1">{agent.domain}</Badge>
                          <p className="text-sm text-muted-foreground mt-2">{agent.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </AccentCard>
                ))}
              </div>
            </CardContent>
          </AccentCard>
        </TabsContent>

        {/* Roadmap Tab */}
        <TabsContent value="roadmap" className="space-y-6">
          <div className="space-y-6">
            {roadmapPhases.map((phase) => (
              <AccentCard key={phase.phase} accent={phase.accent}>
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <Badge variant="outline" className="mb-2">{phase.timeline}</Badge>
                      <CardTitle className="text-xl">{phase.phase}: {phase.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-base font-medium">Goal: {phase.goal}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">Key Activities</p>
                    <ul className="space-y-2">
                      {phase.items.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <ChevronRight className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">Deliverables</p>
                    <ul className="space-y-2">
                      {phase.deliverables.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-[#B5C942] mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </AccentCard>
            ))}
          </div>
        </TabsContent>

        {/* App Shell Tab */}
        <TabsContent value="appshell" className="space-y-6">
          <AccentCard accent="olive">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Monitor className="w-5 h-5 text-[#A5A033]" />
                NCR Unified App Shell
              </CardTitle>
              <CardDescription>This is the "Consumption layer" leadership will resonate with</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {appShellHubs.map((hub) => (
                  <AccentCard key={hub.name} accent={hub.accent} className="hover-elevate" data-testid={`card-hub-${hub.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-md ${getAccentBgClass(hub.accent)}`}>
                          <hub.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">{hub.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">{hub.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </AccentCard>
                ))}
              </div>
            </CardContent>
          </AccentCard>
        </TabsContent>

        {/* Governance Tab */}
        <TabsContent value="governance" className="space-y-6">
          <AccentCard accent="teal">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#7FA3A1]" />
                Governance: What NCR Can Say to Auditors and Regulators
              </CardTitle>
              <CardDescription>Non-negotiables (these become "design constraints")</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {governanceItems.map((item) => (
                  <AccentCard key={item.title} accent={item.accent}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-md ${getAccentBgClass(item.accent)}`}>
                          <item.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </AccentCard>
                ))}
              </div>
            </CardContent>
          </AccentCard>
        </TabsContent>

        {/* Scorecard Tab */}
        <TabsContent value="scorecard" className="space-y-6">
          <AccentCard accent="coral">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Gauge className="w-5 h-5 text-[#D5636C]" />
                Scorecard: How NCR Measures Success
              </CardTitle>
              <CardDescription>Board-friendly metrics by domain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {scorecardMetrics.map((item) => (
                  <AccentCard key={item.domain} accent={item.accent} data-testid={`card-scorecard-${item.domain.toLowerCase().replace(/\s+/g, '-')}`}>
                    <CardContent className="p-4">
                      <p className="font-semibold mb-3">{item.domain}</p>
                      <ul className="space-y-1">
                        {item.metrics.map((metric, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CircleDot className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                            <span>{metric}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </AccentCard>
                ))}
              </div>
            </CardContent>
          </AccentCard>
        </TabsContent>

        {/* Tech Stack Tab */}
        <TabsContent value="techstack" className="space-y-6">
          {/* Microsoft Core Platform */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#00A4EF]/10">
                  <SiMicrosoft className="w-6 h-6 text-[#00A4EF]" />
                </div>
                <div>
                  <CardTitle className="text-xl">Microsoft Core Platform</CardTitle>
                  <CardDescription>Foundation infrastructure powering NCR's data and AI capabilities</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Microsoft Fabric OneLake */}
                <Card className="border-2 border-[#00A4EF]/20" data-testid="card-tech-fabric">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#0078D4]/10 shrink-0">
                        <Database className="w-5 h-5 text-[#0078D4]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-bold text-base">Microsoft Fabric</h3>
                          <Badge variant="secondary" className="text-xs">Data Platform</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Unified analytics platform with OneLake as the single source of truth for all NCR data.</p>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>OneLake unified data layer</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Data pipelines & ETL</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Real-time analytics</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Microsoft Purview */}
                <Card className="border-2 border-[#00A4EF]/20" data-testid="card-tech-purview">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#5C2D91]/10 shrink-0">
                        <Shield className="w-5 h-5 text-[#5C2D91]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-bold text-base">Microsoft Purview</h3>
                          <Badge variant="secondary" className="text-xs">Governance</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Data governance platform for classification, access policies, lineage tracking, and compliance.</p>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>HIPAA/PII classification</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Data lineage & audit trails</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Access policy enforcement</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Power BI */}
                <Card className="border-2 border-[#00A4EF]/20" data-testid="card-tech-powerbi">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#F2C811]/10 shrink-0">
                        <SiPowerbi className="w-5 h-5 text-[#F2C811]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-bold text-base">Power BI</h3>
                          <Badge variant="secondary" className="text-xs">Analytics</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Business intelligence platform for predictive dashboards, forecasts, and scenario modeling.</p>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Predictive dashboards</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Forecast overlays</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Board-ready reporting</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Azure */}
                <Card className="border-2 border-[#00A4EF]/20" data-testid="card-tech-azure">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#0078D4]/10 shrink-0">
                        <SiMicrosoftazure className="w-5 h-5 text-[#0078D4]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-bold text-base">Microsoft Azure</h3>
                          <Badge variant="secondary" className="text-xs">Cloud</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Cloud infrastructure for hosting, compute, storage, and enterprise-grade security.</p>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Enterprise cloud hosting</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Identity & access management</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Disaster recovery</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Microsoft Copilot */}
                <Card className="border-2 border-[#00A4EF]/20" data-testid="card-tech-copilot">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#00A4EF]/10 shrink-0">
                        <Sparkles className="w-5 h-5 text-[#00A4EF]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-bold text-base">Microsoft Copilot</h3>
                          <Badge variant="secondary" className="text-xs">AI Assistant</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">AI-powered assistant for document creation, data analysis, and workflow automation.</p>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Document generation</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Data summarization</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Natural language queries</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Microsoft Elevate */}
                <Card className="border-2 border-[#00A4EF]/20" data-testid="card-tech-elevate">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#00A4EF]/10 shrink-0">
                        <TrendingUp className="w-5 h-5 text-[#00A4EF]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-bold text-base">Microsoft Elevate</h3>
                          <Badge variant="secondary" className="text-xs">Partnership</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Strategic nonprofit partnership providing access to technology resources and foundation funding.</p>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Tech stack modernization</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Foundation funding access</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Expert consulting</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Operational Systems */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20">
                  <Building2 className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Operational Systems</CardTitle>
                  <CardDescription>Core business platforms managing housing, finance, and fundraising</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Yardi */}
                <Card className="border-2 border-orange-200 dark:border-orange-800" data-testid="card-tech-yardi">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#005BAC]/10 shrink-0">
                        <Home className="w-5 h-5 text-[#005BAC]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-bold text-base">Yardi</h3>
                          <Badge variant="secondary" className="text-xs">Property Mgmt</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Property management platform for affordable housing operations, compliance, and resident management.</p>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Property management</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>HUD compliance workflows</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>RightSource integration</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Workday */}
                <Card className="border-2 border-orange-200 dark:border-orange-800" data-testid="card-tech-workday">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#F58220]/10 shrink-0">
                        <DollarSign className="w-5 h-5 text-[#F58220]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-bold text-base">Workday</h3>
                          <Badge variant="secondary" className="text-xs">Finance & HR</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Enterprise financial management for GL, AP/AR, grants tracking, and HR operations.</p>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>General ledger & reporting</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Gift tag tracking</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Entity-level P&Ls</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Raiser's Edge */}
                <Card className="border-2 border-orange-200 dark:border-orange-800" data-testid="card-tech-raisersedge">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#00A3E0]/10 shrink-0">
                        <HandHeart className="w-5 h-5 text-[#00A3E0]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-bold text-base">Raiser's Edge NXT</h3>
                          <Badge variant="secondary" className="text-xs">Fundraising</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Blackbaud fundraising CRM for donor management, gift processing, and campaign tracking.</p>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Donor database</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Gift acknowledgments</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Campaign management</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CareGuide */}
                <Card className="border-2 border-orange-200 dark:border-orange-800" data-testid="card-tech-careguide">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#D5636C]/10 shrink-0">
                        <Heart className="w-5 h-5 text-[#D5636C]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-bold text-base">CareGuide</h3>
                          <Badge variant="outline" className="text-xs border-amber-500 text-amber-600">Legacy - Rebuilding</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Service coordinator platform connecting residents with property managers and support services.</p>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Resident intake</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Service coordination</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <AlertTriangle className="w-3 h-3 text-amber-500" />
                            <span>Modernization in progress</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Instrumentl */}
                <Card className="border-2 border-orange-200 dark:border-orange-800" data-testid="card-tech-instrumentl">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#6366f1]/10 shrink-0">
                        <Target className="w-5 h-5 text-[#6366f1]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-bold text-base">Instrumentl</h3>
                          <Badge variant="secondary" className="text-xs">Grants</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Grant discovery and tracking platform for finding funding opportunities and managing applications.</p>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Grant discovery</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Pipeline tracking</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Deadline management</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* GuideStar */}
                <Card className="border-2 border-orange-200 dark:border-orange-800" data-testid="card-tech-guidestar">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#00A86B]/10 shrink-0">
                        <BarChart3 className="w-5 h-5 text-[#00A86B]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-bold text-base">GuideStar / Candid</h3>
                          <Badge variant="secondary" className="text-xs">Research</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Nonprofit research database for funder research, 990 data, and organizational transparency.</p>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Funder research</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>990 form data</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            <span>Transparency profiles</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Integration Layer */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900/20">
                  <Network className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Integration & Security</CardTitle>
                  <CardDescription>Systems connecting platforms and ensuring enterprise security</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* EHR Systems */}
                <Card className="border-2 border-teal-200 dark:border-teal-800" data-testid="card-tech-ehr">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#7FA3A1]/10 shrink-0">
                        <Stethoscope className="w-5 h-5 text-[#7FA3A1]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1">EHR Systems</h3>
                        <p className="text-xs text-muted-foreground">Healthcare interoperability for patient records and clinical data exchange.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SIEM */}
                <Card className="border-2 border-teal-200 dark:border-teal-800" data-testid="card-tech-siem">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#A5A033]/10 shrink-0">
                        <Lock className="w-5 h-5 text-[#A5A033]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1">SIEM</h3>
                        <p className="text-xs text-muted-foreground">Security information and event management for threat detection and incident response.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* RightSource */}
                <Card className="border-2 border-teal-200 dark:border-teal-800" data-testid="card-tech-rightsource">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#005BAC]/10 shrink-0">
                        <FileText className="w-5 h-5 text-[#005BAC]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1">RightSource</h3>
                        <p className="text-xs text-muted-foreground">Yardi module for HUD compliance, file reviews, and certification workflows.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* GraceWorks */}
                <Card className="border-2 border-teal-200 dark:border-teal-800" data-testid="card-tech-graceworks">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#E8923A]/10 shrink-0">
                        <Settings className="w-5 h-5 text-[#E8923A]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1">GraceWorks</h3>
                        <p className="text-xs text-muted-foreground">NCR 700 systems integration for senior living community operations.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Tech Stack Summary */}
          <AccentCard accent="sky">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#6BA6BC]" />
                How It All Connects
              </CardTitle>
              <CardDescription>The unified NCR technology ecosystem</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#00A4EF]/20 flex items-center justify-center text-[#00A4EF] font-bold text-sm">1</div>
                    <h4 className="font-semibold">Data Layer</h4>
                  </div>
                  <p className="text-sm text-muted-foreground pl-10">
                    Microsoft Fabric OneLake serves as the unified data layer. All operational systems (Yardi, Workday, Raiser's Edge) feed into OneLake through standardized pipelines.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#5C2D91]/20 flex items-center justify-center text-[#5C2D91] font-bold text-sm">2</div>
                    <h4 className="font-semibold">Governance Layer</h4>
                  </div>
                  <p className="text-sm text-muted-foreground pl-10">
                    Microsoft Purview enforces data classification (HIPAA/PII), access policies, and provides complete lineage tracking for audit compliance.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#F2C811]/20 flex items-center justify-center text-[#F2C811] font-bold text-sm">3</div>
                    <h4 className="font-semibold">Intelligence Layer</h4>
                  </div>
                  <p className="text-sm text-muted-foreground pl-10">
                    Power BI dashboards and AI agents consume governed data to deliver insights, automate workflows, and generate predictive forecasts.
                  </p>
                </div>
              </div>
            </CardContent>
          </AccentCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
