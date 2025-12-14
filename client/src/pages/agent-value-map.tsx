import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  BookOpen
} from "lucide-react";

export default function AgentValueMap() {
  const [activeTab, setActiveTab] = useState("overview");

  // Data Foundation items
  const dataFoundation = [
    { name: "Company Information", description: "NCR entity master (1,100+ entities), programs, locations, properties, service lines", icon: Building2 },
    { name: "Business Activity", description: "Resident events, service coordinator activity, case notes, intakes, requalifications, volunteer participation", icon: Briefcase },
    { name: "Financial Strength", description: "Workday GL, AP/AR, allocations, grants, restricted/unrestricted funds, property-level P&Ls", icon: DollarSign },
    { name: "Filings & Events", description: "HUD recerts, CMS filings, audits, board packets, incident reporting, compliance attestations", icon: FileText },
    { name: "Hierarchies", description: "Org structure, property → region → division, legal entity → operating unit mappings", icon: Layers },
    { name: "Principals & Contacts", description: "Donors, prospects, board, vendors, grant officers, partner contacts, resident emergency contacts", icon: Users },
    { name: "IP Intelligence", description: "Policies/procedures, templates, program manuals, training content, contracts", icon: BookOpen },
    { name: "Fraud Insights", description: "Payment anomalies, identity verification flags, benefits eligibility anomalies, duplicate vendor/donor records", icon: AlertTriangle },
  ];

  // Consumption channels
  const consumptionChannels = [
    { name: "Platform UIs", description: "NCR Unified App Shell (Donor Hub, Grants Hub, Volunteer Hub, Resident Engagement Hub, Governance Hub, Strategy Hub, Ops/Security Hub)", icon: Monitor },
    { name: "Bulk Data", description: "Controlled exports, board packs, regulator-ready extracts, property performance snapshots", icon: Database },
    { name: "Transactional Data", description: "Intake submissions, HUD recerts, billing/claims, gift acknowledgments, volunteer shifts", icon: Zap },
    { name: "AI-Ready Data", description: "Curated feature stores for forecasting occupancy/staffing, donor propensity, compliance risk", icon: Bot },
    { name: "Marketplaces", description: "Future: vetted agent marketplace for internal NCR teams (approved automations only)", icon: Globe },
    { name: "Agents", description: "The agentic teams below, invoked from the UI and governed centrally", icon: Sparkles },
  ];

  // Agent catalogue
  const agentCatalogue = [
    { name: "CareGuide Agent", domain: "Healthcare + Housing", description: "Unified intake wizard, de-duplication, validation, routing across systems", icon: Heart, color: "bg-red-500" },
    { name: "Housing Agent", domain: "Housing", description: "HUD requalification workflows, document completeness checks, deadline management", icon: Home, color: "bg-blue-500" },
    { name: "Healthcare Agent", domain: "Healthcare", description: "Billing workflow automation, claim validation, Workday integration support", icon: Stethoscope, color: "bg-green-500" },
    { name: "Document Agent", domain: "Content", description: "Donor letters, impact narratives, grant narratives/reports, volunteer recognition", icon: FileText, color: "bg-purple-500" },
    { name: "Donor Agent", domain: "Fundraising", description: "ROI dashboards, pipeline hygiene, acquisition funnel, 'next best action'", icon: HandHeart, color: "bg-pink-500" },
    { name: "Grants Agent", domain: "Grants", description: "Pipeline dashboard, dedup outreach, outcomes reporting, reporting automation", icon: Target, color: "bg-orange-500" },
    { name: "Financial Agent", domain: "Finance", description: "Consolidated reporting, double-count detection, entity-level reconciliation flags", icon: DollarSign, color: "bg-emerald-500" },
    { name: "Compliance Agent", domain: "Compliance", description: "HUD/CMS filing prep, entity registry, action logging, evidence packs for audit", icon: Shield, color: "bg-indigo-500" },
    { name: "Bias Monitoring Agent", domain: "Risk", description: "Fairness audits for eligibility decisions + any scoring models; anomaly detection", icon: Scale, color: "bg-amber-500" },
    { name: "Strategy Agent", domain: "Strategy", description: "Forecasting (occupancy/staffing/finance), ROI simulations, system inventory", icon: LineChart, color: "bg-cyan-500" },
    { name: "Resident Engagement Agent", domain: "Engagement", description: "Accessibility checks, multilingual readiness, adoption prompts, digital divide workflows", icon: Users, color: "bg-teal-500" },
    { name: "Security Agent", domain: "Security", description: "Monitors unusual agent activity patterns + data access anomalies; ties to SIEM tooling", icon: Lock, color: "bg-slate-500" },
  ];

  // Personas
  const personas = [
    { role: "Chief Operations Officer / Ops Leaders", benefit: "Gets 'system of work' visibility, staffing forecasts, operational compliance posture", icon: Settings },
    { role: "Chief Risk Officer / Compliance Leadership", benefit: "Audit trails, filing automation, Purview lineage, bias monitoring, exception handling", icon: AlertTriangle },
    { role: "Chief Compliance Officer / Legal", benefit: "Evidence packs, policy enforcement, access governance, filing timeliness and accuracy", icon: Scale },
    { role: "Data Operations", benefit: "OneLake pipelines, canonical objects, model monitoring, quality SLAs", icon: Database },
    { role: "Finance Leadership", benefit: "Consolidated P&L, entity registry accuracy, close acceleration, anomaly detection", icon: DollarSign },
    { role: "Development Leadership", benefit: "Pipeline clarity, dedup outreach, rapid reporting, donor confidence through metrics", icon: TrendingUp },
    { role: "Program Leadership", benefit: "Less paperwork, fewer reworks, more time with residents/patients", icon: Heart },
  ];

  // Roadmap phases
  const roadmapPhases = [
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
      color: "border-l-amber-500"
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
      color: "border-l-blue-500"
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
      color: "border-l-green-500"
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
      color: "border-l-purple-500"
    }
  ];

  // App Shell hubs
  const appShellHubs = [
    { name: "Donor Hub", description: "ROI dashboards, impact narratives, acknowledgments, pipeline views", icon: HandHeart, color: "bg-pink-500" },
    { name: "Grants Hub", description: "Pipeline, deadlines, report generator, dedup outreach, outcomes", icon: Target, color: "bg-orange-500" },
    { name: "Volunteer Hub", description: "Onboarding, scheduling, recognition automation, wishlists integration", icon: Users, color: "bg-blue-500" },
    { name: "Resident Engagement Hub", description: "Intake, service pathways, multilingual support, accessibility validation", icon: Heart, color: "bg-red-500" },
    { name: "Governance & Compliance Hub", description: "Agent audit trails, filings, Purview lineage, fairness audit reports", icon: Shield, color: "bg-indigo-500" },
    { name: "Strategy & Sustainability Hub", description: "Forecasts, scenario modeling, ROI simulations, sustainability metrics", icon: LineChart, color: "bg-cyan-500" },
    { name: "Ops & Security Hub", description: "Continuity workflows, system uptime, agent observability, incident playbooks", icon: Lock, color: "bg-slate-500" },
  ];

  // Day in the life steps
  const dayInTheLife = [
    { step: 1, title: "Resident starts intake", description: "A resident starts an intake once in CareGuide 2.0. CareGuide Agent validates + routes data to the right downstream workflows.", icon: UserCheck },
    { step: 2, title: "Housing Agent activates", description: "Housing Agent launches HUD requalification steps automatically. Missing docs flagged; reminders sent; staff dashboard shows exceptions only.", icon: Home },
    { step: 3, title: "Outcomes flow to OneLake", description: "Outcomes (services delivered) flow into OneLake with governance. Donor Agent generates ROI dashboard views; Document Agent generates a narrative.", icon: Database },
    { step: 4, title: "Grants Agent coordinates", description: "Grants Agent updates a pipeline board + prevents duplicate outreach. Reports are produced with metrics, not anecdotes.", icon: Target },
    { step: 5, title: "Compliance Agent prepares", description: "Compliance Agent prepares an evidence pack for filings. Every action logged; Purview lineage shows exactly where data came from.", icon: Shield },
    { step: 6, title: "Strategy Agent forecasts", description: "Strategy Agent shows leadership a staffing/occupancy forecast. Leadership sees scenarios and can make staffing decisions with confidence.", icon: LineChart },
  ];

  // Governance non-negotiables
  const governanceItems = [
    { title: "Human-in-the-loop for high-stakes decisions", description: "Eligibility approvals, adverse actions, filings submission sign-off", icon: UserCheck },
    { title: "Full audit trails", description: "Every agent action: who, what, when, data touched, output produced", icon: ClipboardCheck },
    { title: "Purview-enforced access controls", description: "HIPAA/PII boundaries; least-privilege role-based access", icon: Lock },
    { title: "Bias monitoring & fairness audits", description: "Required for eligibility decisions and any scoring models", icon: Scale },
    { title: "Model risk management", description: "Versioning, evaluation, drift monitoring, rollback procedures", icon: AlertTriangle },
    { title: "Data retention & redaction rules", description: "Especially for health/resident data and donor privacy", icon: Eye },
  ];

  // Scorecard metrics
  const scorecardMetrics = [
    { domain: "Housing", metrics: ["HUD recert cycle time ↓", "Error rate ↓", "Staff hours saved ↑", "Compliance exceptions ↓"], color: "bg-blue-500" },
    { domain: "Healthcare", metrics: ["Claim rejection rate ↓", "Billing cycle time ↓", "Duplicate intake rate ↓"], color: "bg-green-500" },
    { domain: "Finance", metrics: ["Close time ↓", "Reconciliation exceptions ↓", "Entity mapping accuracy ↑"], color: "bg-emerald-500" },
    { domain: "Fundraising", metrics: ["Acknowledgment time ↓", "Donor retention ↑", "Pipeline coverage ↑", "ROI reporting adoption ↑"], color: "bg-pink-500" },
    { domain: "Grants", metrics: ["On-time submissions ↑", "Duplicate outreach incidents ↓", "Report turnaround time ↓"], color: "bg-orange-500" },
    { domain: "Compliance & Risk", metrics: ["Audit findings ↓", "Filing timeliness ↑", "Data access violations ↓", "Bias flags resolved time ↓"], color: "bg-indigo-500" },
    { domain: "Adoption", metrics: ["Active users ↑", "Spreadsheet dependency ↓", "Agent tasks completed ↑"], color: "bg-purple-500" },
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
        <TabsList className="flex flex-wrap h-auto gap-1">
          <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
          <TabsTrigger value="framework" data-testid="tab-framework">Framework</TabsTrigger>
          <TabsTrigger value="agents" data-testid="tab-agents">Agents</TabsTrigger>
          <TabsTrigger value="roadmap" data-testid="tab-roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="appshell" data-testid="tab-appshell">App Shell</TabsTrigger>
          <TabsTrigger value="governance" data-testid="tab-governance">Governance</TabsTrigger>
          <TabsTrigger value="scorecard" data-testid="tab-scorecard">Scorecard</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* North Star */}
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                North Star
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                Build a <strong>governed NCR Data + Agent platform</strong> where staff, donors, residents, and partners interact through one app layer—while <strong>Purview enforces privacy, auditability, and accountability</strong>.
              </p>
            </CardContent>
          </Card>

          {/* Data Backbone Target */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
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
          </Card>

          {/* Day in the Life */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Day in the Life Demo Storyline
              </CardTitle>
              <CardDescription>How agents work together in practice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dayInTheLife.map((item, index) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">{item.step}</span>
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
          </Card>

          {/* Executive Takeaway */}
          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle className="text-xl">Executive Takeaway</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>NCR's agentic platform will:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Unify fragmented data into a governed, auditable foundation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Deploy specialized agents for repeatable, compliance-sensitive workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Deliver measurable ROI through reduced cycle times, fewer errors, and staff empowerment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Maintain full audit trails and human oversight for regulatory confidence</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Framework Tab */}
        <TabsContent value="framework" className="space-y-6">
          {/* Data Foundation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                A. Data (The Foundation NCR Must Unify)
              </CardTitle>
              <CardDescription>These are the "atoms" agents rely on. NCR already has most of them—just fragmented.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dataFoundation.map((item) => (
                  <div key={item.name} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <item.icon className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Consumption */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Monitor className="w-5 h-5 text-primary" />
                B. Consumption (How NCR Users Experience Value)
              </CardTitle>
              <CardDescription>Delivery channels become a unified App Shell + role-based hubs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {consumptionChannels.map((item) => (
                  <div key={item.name} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <item.icon className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Personas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                D. Personas (Who Benefits / Who Sponsors)
              </CardTitle>
              <CardDescription>Map diagram personas to NCR roles so adoption is real</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {personas.map((persona) => (
                  <div key={persona.role} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <persona.icon className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{persona.role}</p>
                      <p className="text-sm text-muted-foreground">{persona.benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Agent vs Infrastructure */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Bot className="w-5 h-5 text-green-600" />
                  Agent Best-Fit
                </CardTitle>
                <CardDescription>Repeatable, compliance-sensitive, data-driven</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {agentBestFit.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Network className="w-5 h-5 text-blue-600" />
                  Infrastructure / Alternative Solutions
                </CardTitle>
                <CardDescription>Platform and culture foundations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {infrastructureSolutions.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CircleDot className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Agents Tab */}
        <TabsContent value="agents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                C. NCR's Agentic Teams Catalogue
              </CardTitle>
              <CardDescription>Specialized digital staff with audit trails</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agentCatalogue.map((agent) => (
                  <Card key={agent.name} className="overflow-hidden" data-testid={`card-agent-${agent.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className={`h-2 ${agent.color}`} />
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-md ${agent.color}`}>
                          <agent.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{agent.name}</p>
                          <Badge variant="outline" className="text-xs mt-1">{agent.domain}</Badge>
                          <p className="text-sm text-muted-foreground mt-2">{agent.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roadmap Tab */}
        <TabsContent value="roadmap" className="space-y-6">
          <div className="space-y-6">
            {roadmapPhases.map((phase) => (
              <Card key={phase.phase} className={`border-l-4 ${phase.color}`}>
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
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* App Shell Tab */}
        <TabsContent value="appshell" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Monitor className="w-5 h-5 text-primary" />
                NCR Unified App Shell
              </CardTitle>
              <CardDescription>This is the "Consumption layer" leadership will resonate with</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {appShellHubs.map((hub) => (
                  <Card key={hub.name} className="overflow-hidden hover-elevate" data-testid={`card-hub-${hub.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className={`h-2 ${hub.color}`} />
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-md ${hub.color}`}>
                          <hub.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">{hub.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">{hub.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Governance Tab */}
        <TabsContent value="governance" className="space-y-6">
          <Card className="border-l-4 border-l-indigo-500">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-600" />
                Governance: What NCR Can Say to Auditors and Regulators
              </CardTitle>
              <CardDescription>Non-negotiables (these become "design constraints")</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {governanceItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <item.icon className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scorecard Tab */}
        <TabsContent value="scorecard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Gauge className="w-5 h-5 text-primary" />
                Scorecard: How NCR Measures Success
              </CardTitle>
              <CardDescription>Board-friendly metrics by domain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {scorecardMetrics.map((item) => (
                  <Card key={item.domain} className="overflow-hidden" data-testid={`card-scorecard-${item.domain.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className={`h-2 ${item.color}`} />
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
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
