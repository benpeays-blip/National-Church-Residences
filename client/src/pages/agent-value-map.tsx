import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AccentCard, getAccentBgClass, AccentColor, NCR_BRAND_COLORS } from "@/components/ui/accent-card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent } from "@/components/ui/tabs";
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

export default function AgentValueMap() {
  const [location] = useLocation();
  
  // Parse tab from URL query parameter
  const getTabFromUrl = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('tab') || 'overview';
  };
  
  const [activeTab, setActiveTab] = useState(getTabFromUrl);
  
  // Sync tab state when URL changes (including query string changes)
  useEffect(() => {
    const tab = getTabFromUrl();
    setActiveTab(tab);
    
    // Also listen for popstate to catch browser back/forward with query changes
    const handlePopState = () => {
      setActiveTab(getTabFromUrl());
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [location]);
  
  // Additionally sync on every render to catch Link navigation
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTab = getTabFromUrl();
      if (currentTab !== activeTab) {
        setActiveTab(currentTab);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [activeTab]);

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
  const appShellHubs: Array<{ name: string; description: string; icon: LucideIcon; accent: AccentColor; features: string[] }> = [
    { name: "Donor Hub", description: "Unified donor management with intelligent engagement tools", icon: HandHeart, accent: "coral", features: ["ROI dashboards linking gifts to outcomes", "AI-generated impact narratives", "Automated acknowledgment workflows", "Pipeline & portfolio views"] },
    { name: "Grants Hub", description: "End-to-end grant lifecycle management", icon: Target, accent: "orange", features: ["Visual pipeline with deadline tracking", "Automated report generation", "Dedup outreach coordination", "Outcomes & metrics integration"] },
    { name: "Volunteer Hub", description: "Complete volunteer lifecycle support", icon: Users, accent: "sky", features: ["Streamlined onboarding workflows", "Intelligent shift scheduling", "Recognition automation", "Wishlist & needs matching"] },
    { name: "Resident Engagement Hub", description: "Holistic resident support platform", icon: Heart, accent: "coralDark", features: ["Unified intake process", "AI-guided service pathways", "Multilingual support", "Accessibility compliance tools"] },
    { name: "Governance & Compliance Hub", description: "Enterprise-grade compliance management", icon: Shield, accent: "teal", features: ["Complete agent audit trails", "Filing preparation automation", "Purview lineage tracking", "Fairness audit reports"] },
    { name: "Strategy & Sustainability Hub", description: "Data-driven strategic planning", icon: LineChart, accent: "olive", features: ["Occupancy & staffing forecasts", "Scenario modeling tools", "ROI simulations", "Sustainability metrics dashboard"] },
    { name: "Ops & Security Hub", description: "Operational resilience command center", icon: Lock, accent: "lime", features: ["Business continuity workflows", "System uptime monitoring", "Agent observability", "Incident response playbooks"] },
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
                <div className="p-4 border rounded-lg">
                  <p className="font-semibold">Microsoft Fabric OneLake</p>
                  <p className="text-sm text-muted-foreground">Unified data layer</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="font-semibold">Microsoft Purview</p>
                  <p className="text-sm text-muted-foreground">Governance (classification, access policies, lineage, audit)</p>
                </div>
                <div className="p-4 border rounded-lg">
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
              <div className="space-y-2">
                {dayInTheLife.map((item, index) => (
                  <Link key={item.step} href={`/agent-value-map/workflow/${item.step}`}>
                    <div className="flex items-center gap-4 cursor-pointer p-3 rounded-lg transition-colors duration-200 hover:bg-muted/50 group">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full ${getAccentBgClass(item.accent)} flex items-center justify-center`}>
                        <span className="font-bold text-white">{item.step}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                          <p className="font-semibold group-hover:text-primary transition-colors truncate">{item.title}</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-primary flex-shrink-0 invisible group-hover:visible">
                        <span>View details</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
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
                Data (The Foundation NCR Must Unify)
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
                Consumption (How NCR Users Experience Value)
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
                Personas (Who Benefits / Who Sponsors)
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
                NCR's Agentic Teams Catalogue
              </CardTitle>
              <CardDescription>Specialized digital staff with audit trails</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agentCatalogue.map((agent) => (
                  <Link key={agent.name} href={`/agent-value-map/agent/${agent.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <AccentCard 
                      accent={agent.accent} 
                      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group h-full"
                      data-testid={`card-agent-${agent.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-3 rounded-lg ${getAccentBgClass(agent.accent)}`}>
                            <agent.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-lg font-semibold group-hover:text-primary transition-colors">{agent.name}</p>
                            <Badge variant="outline" className="text-xs mt-1">{agent.domain}</Badge>
                            <p className="text-base text-muted-foreground mt-2">{agent.description}</p>
                            <div className="mt-3 flex items-center gap-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                              <span>View agent details</span>
                              <ChevronRight className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </AccentCard>
                  </Link>
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
                  <Link key={hub.name} href={`/agent-value-map/hub/${hub.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <AccentCard 
                      accent={hub.accent} 
                      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group"
                      data-testid={`card-hub-${hub.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-3 rounded-lg ${getAccentBgClass(hub.accent)}`}>
                            <hub.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-lg font-semibold group-hover:text-primary transition-colors">{hub.name}</p>
                            <p className="text-base text-muted-foreground mt-1">{hub.description}</p>
                            <ul className="mt-3 space-y-1">
                              {hub.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <CircleDot className="w-3 h-3 flex-shrink-0" style={{ color: NCR_BRAND_COLORS[hub.accent] }} />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-3 flex items-center gap-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                              <span>View hub details</span>
                              <ChevronRight className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </AccentCard>
                  </Link>
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
                  <Link key={item.title} href={`/agent-value-map/governance/${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Card 
                      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group overflow-hidden"
                      data-testid={`card-governance-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <div 
                        className="h-2 w-full"
                        style={{ backgroundColor: NCR_BRAND_COLORS[item.accent] }}
                      />
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-md ${getAccentBgClass(item.accent)}`}>
                            <item.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold group-hover:text-primary transition-colors">{item.title}</p>
                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                            <div className="mt-3 flex items-center gap-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                              <span>View details</span>
                              <ChevronRight className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
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
                  <Link key={item.domain} href={`/agent-value-map/scorecard/${item.domain.toLowerCase().replace(/\s+/g, '-')}`}>
                    <AccentCard 
                      accent={item.accent} 
                      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group"
                      data-testid={`card-scorecard-${item.domain.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <CardContent className="p-4">
                        <p className="font-semibold mb-3 group-hover:text-primary transition-colors">{item.domain}</p>
                        <ul className="space-y-1">
                          {item.metrics.map((metric, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CircleDot className="w-3 h-3 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors" />
                              <span>{metric}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 flex items-center gap-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                          <span>View full scorecard</span>
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </CardContent>
                    </AccentCard>
                  </Link>
                ))}
              </div>
            </CardContent>
          </AccentCard>
        </TabsContent>

        {/* Tech Stack Tab */}
        <TabsContent value="techstack" className="space-y-6">
          {/* Microsoft Core Platform */}
          <AccentCard accent="sky">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Server className="w-5 h-5 text-[#7BC4DC]" />
                Microsoft Core Platform
              </CardTitle>
              <CardDescription>Foundation infrastructure powering NCR's data and AI capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AccentCard accent="sky" data-testid="card-tech-fabric">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-md ${getAccentBgClass("sky")}`}>
                        <Database className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-semibold">Microsoft Fabric</p>
                          <Badge variant="outline" className="text-xs">Data Platform</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Unified analytics platform with OneLake as the single source of truth.</p>
                      </div>
                    </div>
                  </CardContent>
                </AccentCard>

                <AccentCard accent="teal" data-testid="card-tech-purview">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-md ${getAccentBgClass("teal")}`}>
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-semibold">Microsoft Purview</p>
                          <Badge variant="outline" className="text-xs">Governance</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Data governance for classification, access policies, and lineage tracking.</p>
                      </div>
                    </div>
                  </CardContent>
                </AccentCard>

                <AccentCard accent="lime" data-testid="card-tech-powerbi">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-md ${getAccentBgClass("lime")}`}>
                        <BarChart3 className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-semibold">Power BI</p>
                          <Badge variant="outline" className="text-xs">Analytics</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Business intelligence for predictive dashboards and scenario modeling.</p>
                      </div>
                    </div>
                  </CardContent>
                </AccentCard>

                <AccentCard accent="olive" data-testid="card-tech-azure">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-md ${getAccentBgClass("olive")}`}>
                        <Globe className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-semibold">Microsoft Azure</p>
                          <Badge variant="outline" className="text-xs">Cloud</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Cloud infrastructure for hosting, compute, and enterprise security.</p>
                      </div>
                    </div>
                  </CardContent>
                </AccentCard>

                <AccentCard accent="coral" data-testid="card-tech-copilot">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-md ${getAccentBgClass("coral")}`}>
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-semibold">Microsoft Copilot</p>
                          <Badge variant="outline" className="text-xs">AI Assistant</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">AI-powered assistant for document creation and workflow automation.</p>
                      </div>
                    </div>
                  </CardContent>
                </AccentCard>

                <AccentCard accent="orange" data-testid="card-tech-elevate">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-md ${getAccentBgClass("orange")}`}>
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-semibold">Microsoft Elevate</p>
                          <Badge variant="outline" className="text-xs">Partnership</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Strategic nonprofit partnership for technology and foundation funding.</p>
                      </div>
                    </div>
                  </CardContent>
                </AccentCard>
              </div>
            </CardContent>
          </AccentCard>

          {/* Operational Systems */}
          <AccentCard accent="orange">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#E8923A]" />
                Operational Systems
              </CardTitle>
              <CardDescription>Core business platforms managing housing, finance, and fundraising</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AccentCard accent="sky" data-testid="card-tech-yardi">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-md ${getAccentBgClass("sky")}`}>
                        <Home className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-semibold">Yardi</p>
                          <Badge variant="outline" className="text-xs">Property Mgmt</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Property management for affordable housing operations and compliance.</p>
                      </div>
                    </div>
                  </CardContent>
                </AccentCard>

                <AccentCard accent="lime" data-testid="card-tech-workday">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-md ${getAccentBgClass("lime")}`}>
                        <DollarSign className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-semibold">Workday</p>
                          <Badge variant="outline" className="text-xs">Finance & HR</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Enterprise financial management for GL, AP/AR, and grants tracking.</p>
                      </div>
                    </div>
                  </CardContent>
                </AccentCard>

                <AccentCard accent="coral" data-testid="card-tech-raisersedge">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-md ${getAccentBgClass("coral")}`}>
                        <HandHeart className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-semibold">Raiser's Edge NXT</p>
                          <Badge variant="outline" className="text-xs">Fundraising</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Blackbaud fundraising CRM for donor and campaign management.</p>
                      </div>
                    </div>
                  </CardContent>
                </AccentCard>

                <AccentCard accent="coralDark" data-testid="card-tech-careguide">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-md ${getAccentBgClass("coralDark")}`}>
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-semibold">CareGuide</p>
                          <Badge variant="outline" className="text-xs">Legacy</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Service coordinator platform. Modernization in progress.</p>
                      </div>
                    </div>
                  </CardContent>
                </AccentCard>

                <AccentCard accent="olive" data-testid="card-tech-instrumentl">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-md ${getAccentBgClass("olive")}`}>
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-semibold">Instrumentl</p>
                          <Badge variant="outline" className="text-xs">Grants</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Grant discovery and tracking for funding opportunities.</p>
                      </div>
                    </div>
                  </CardContent>
                </AccentCard>

                <AccentCard accent="teal" data-testid="card-tech-guidestar">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-md ${getAccentBgClass("teal")}`}>
                        <BarChart3 className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-semibold">GuideStar / Candid</p>
                          <Badge variant="outline" className="text-xs">Research</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Nonprofit research database for funder research and 990 data.</p>
                      </div>
                    </div>
                  </CardContent>
                </AccentCard>
              </div>
            </CardContent>
          </AccentCard>

          {/* Integration Layer */}
          <AccentCard accent="teal">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Network className="w-5 h-5 text-[#7FA3A1]" />
                Integration & Security
              </CardTitle>
              <CardDescription>Systems connecting platforms and ensuring enterprise security</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AccentCard accent="teal" data-testid="card-tech-ehr">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-md ${getAccentBgClass("teal")}`}>
                        <Stethoscope className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm mb-1">EHR Systems</p>
                        <p className="text-xs text-muted-foreground">Healthcare interoperability for patient records.</p>
                      </div>
                    </div>
                  </CardContent>
                </AccentCard>

                <AccentCard accent="olive" data-testid="card-tech-siem">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-md ${getAccentBgClass("olive")}`}>
                        <Lock className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm mb-1">SIEM</p>
                        <p className="text-xs text-muted-foreground">Security event management and threat detection.</p>
                      </div>
                    </div>
                  </CardContent>
                </AccentCard>

                <AccentCard accent="sky" data-testid="card-tech-rightsource">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-md ${getAccentBgClass("sky")}`}>
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm mb-1">RightSource</p>
                        <p className="text-xs text-muted-foreground">Yardi module for HUD compliance workflows.</p>
                      </div>
                    </div>
                  </CardContent>
                </AccentCard>

                <AccentCard accent="orange" data-testid="card-tech-graceworks">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-md ${getAccentBgClass("orange")}`}>
                        <Settings className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm mb-1">GraceWorks</p>
                        <p className="text-xs text-muted-foreground">NCR 700 senior living systems integration.</p>
                      </div>
                    </div>
                  </CardContent>
                </AccentCard>
              </div>
            </CardContent>
          </AccentCard>

          {/* Tech Stack Summary */}
          <AccentCard accent="lime">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#B5C942]" />
                How It All Connects
              </CardTitle>
              <CardDescription>The unified NCR technology ecosystem</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full ${getAccentBgClass("sky")} flex items-center justify-center text-white font-bold text-sm`}>1</div>
                    <h4 className="font-semibold">Data Layer</h4>
                  </div>
                  <p className="text-sm text-muted-foreground pl-10">
                    Microsoft Fabric OneLake serves as the unified data layer. All operational systems feed into OneLake through standardized pipelines.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full ${getAccentBgClass("teal")} flex items-center justify-center text-white font-bold text-sm`}>2</div>
                    <h4 className="font-semibold">Governance Layer</h4>
                  </div>
                  <p className="text-sm text-muted-foreground pl-10">
                    Microsoft Purview enforces data classification (HIPAA/PII), access policies, and provides complete lineage tracking.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full ${getAccentBgClass("lime")} flex items-center justify-center text-white font-bold text-sm`}>3</div>
                    <h4 className="font-semibold">Intelligence Layer</h4>
                  </div>
                  <p className="text-sm text-muted-foreground pl-10">
                    Power BI dashboards and AI agents consume governed data to deliver insights and predictive forecasts.
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
