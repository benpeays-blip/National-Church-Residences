import { useParams, Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Heart,
  Home,
  Stethoscope,
  FileText,
  HandHeart,
  Target,
  DollarSign,
  Shield,
  Scale,
  LineChart,
  Users,
  Lock,
  CheckCircle2,
  Zap,
  Bot,
  Settings,
  BarChart3,
  AlertTriangle,
  LucideIcon,
  ChevronRight,
  Sparkles,
  Network,
  Database
} from "lucide-react";

interface AgentData {
  name: string;
  domain: string;
  description: string;
  icon: LucideIcon;
  accent: AccentColor;
  fullDescription: string;
  capabilities: string[];
  integrations: string[];
  useCases: { title: string; description: string }[];
  metrics: { name: string; value: string; description: string }[];
  dataInputs: string[];
  dataOutputs: string[];
  governanceFeatures: string[];
  relatedAgents: string[];
}

const agentDetails: Record<string, AgentData> = {
  "careguide-agent": {
    name: "CareGuide Agent",
    domain: "Healthcare + Housing",
    description: "Unified intake wizard, de-duplication, validation, routing across systems",
    icon: Heart,
    accent: "coral",
    fullDescription: "The CareGuide Agent serves as the front door for resident services, orchestrating intake processes across healthcare and housing systems. It validates data completeness, detects duplicates, routes cases to appropriate teams, and ensures regulatory compliance throughout the resident journey.",
    capabilities: [
      "Unified intake wizard spanning multiple systems",
      "Real-time de-duplication and identity matching",
      "Document completeness validation",
      "Intelligent routing based on service needs",
      "Cross-system data synchronization",
      "Compliance checkpoint automation"
    ],
    integrations: ["Yardi", "CareGuide Legacy", "Workday", "EHR Systems", "Microsoft Fabric"],
    useCases: [
      { title: "New Resident Intake", description: "Streamline move-in process with pre-populated forms and automated verification" },
      { title: "Service Coordination Referral", description: "Route residents to appropriate services based on needs assessment" },
      { title: "Emergency Contact Updates", description: "Sync contact changes across all relevant systems automatically" }
    ],
    metrics: [
      { name: "Intake Time Reduction", value: "65%", description: "Average reduction in intake processing time" },
      { name: "Data Quality Score", value: "94%", description: "Accuracy of resident records after validation" },
      { name: "Duplicate Detection Rate", value: "99.2%", description: "Percentage of duplicates caught before creation" }
    ],
    dataInputs: ["Resident applications", "Identity documents", "Income verification", "Healthcare assessments"],
    dataOutputs: ["Validated resident profiles", "Service recommendations", "Compliance reports", "Audit trails"],
    governanceFeatures: ["HIPAA-compliant data handling", "Full audit logging", "Access control integration", "PHI encryption"],
    relatedAgents: ["Housing Agent", "Healthcare Agent", "Compliance Agent"]
  },
  "housing-agent": {
    name: "Housing Agent",
    domain: "Housing",
    description: "HUD requalification workflows, document completeness checks, deadline management",
    icon: Home,
    accent: "sky",
    fullDescription: "The Housing Agent automates the complex world of affordable housing compliance. It manages HUD recertification workflows, tracks deadlines, validates document completeness, and generates audit-ready packages. This agent significantly reduces the administrative burden on property managers while improving compliance rates.",
    capabilities: [
      "HUD requalification workflow automation",
      "Document completeness validation",
      "Deadline tracking and reminders",
      "Income calculation verification",
      "Audit package generation",
      "Regulatory change monitoring"
    ],
    integrations: ["Yardi", "RightSource", "HUD TRACS", "Microsoft Fabric"],
    useCases: [
      { title: "Annual Recertification", description: "Guide residents through annual income recertification with automated reminders" },
      { title: "Move-In Compliance", description: "Ensure all HUD documentation is complete before occupancy" },
      { title: "Audit Preparation", description: "Generate comprehensive audit packages with all required documentation" }
    ],
    metrics: [
      { name: "Recert Completion Rate", value: "98%", description: "On-time annual recertification completion" },
      { name: "Document Error Rate", value: "-82%", description: "Reduction in documentation errors" },
      { name: "Audit Findings", value: "-67%", description: "Reduction in HUD audit findings" }
    ],
    dataInputs: ["Resident income data", "Household composition", "Asset declarations", "Identity verification"],
    dataOutputs: ["HUD-compliant certifications", "TRACS submissions", "Audit packages", "Compliance reports"],
    governanceFeatures: ["HUD regulation compliance", "TRACS validation", "Audit trail generation", "Document retention policies"],
    relatedAgents: ["CareGuide Agent", "Compliance Agent", "Financial Agent"]
  },
  "healthcare-agent": {
    name: "Healthcare Agent",
    domain: "Healthcare",
    description: "Billing workflow automation, claim validation, Workday integration support",
    icon: Stethoscope,
    accent: "lime",
    fullDescription: "The Healthcare Agent streamlines clinical and billing operations for NCR's healthcare services. It validates claims before submission, manages billing workflows, ensures Workday integration accuracy, and monitors reimbursement patterns. This agent helps maximize revenue while maintaining strict compliance with healthcare regulations.",
    capabilities: [
      "Claim validation and error prevention",
      "Billing workflow automation",
      "Workday financial integration",
      "Reimbursement tracking",
      "Denial management support",
      "CMS compliance monitoring"
    ],
    integrations: ["EHR Systems", "Workday", "CMS Systems", "Microsoft Fabric"],
    useCases: [
      { title: "Claim Submission", description: "Validate and submit claims with automated error checking" },
      { title: "Revenue Cycle Optimization", description: "Identify and address revenue leakage points" },
      { title: "Denial Prevention", description: "Catch common denial triggers before claim submission" }
    ],
    metrics: [
      { name: "Clean Claim Rate", value: "96%", description: "First-pass claim acceptance rate" },
      { name: "Days in A/R", value: "-23%", description: "Reduction in accounts receivable days" },
      { name: "Denial Rate", value: "-45%", description: "Reduction in claim denials" }
    ],
    dataInputs: ["Clinical encounter data", "Service documentation", "Patient eligibility", "Diagnosis codes"],
    dataOutputs: ["Validated claims", "Financial reconciliation", "Compliance reports", "Revenue analytics"],
    governanceFeatures: ["HIPAA compliance", "CMS billing rules", "Fraud detection", "Audit logging"],
    relatedAgents: ["Financial Agent", "Compliance Agent", "CareGuide Agent"]
  },
  "document-agent": {
    name: "Document Agent",
    domain: "Content",
    description: "Donor letters, impact narratives, grant narratives/reports, volunteer recognition",
    icon: FileText,
    accent: "coral",
    fullDescription: "The Document Agent is NCR's content creation powerhouse. It generates personalized donor acknowledgments, compelling impact narratives, grant reports, and volunteer recognition materials. By connecting program outcomes to storytelling, this agent enables meaningful donor stewardship at scale while maintaining NCR's authentic voice.",
    capabilities: [
      "Personalized donor acknowledgment letters",
      "Impact narrative generation",
      "Grant narrative and report creation",
      "Volunteer recognition materials",
      "Campaign update content",
      "Annual giving summaries"
    ],
    integrations: ["Raiser's Edge NXT", "Microsoft Copilot", "Microsoft Fabric", "Program Databases"],
    useCases: [
      { title: "Gift Acknowledgment", description: "Generate personalized thank-you letters within 48 hours of gift receipt" },
      { title: "Impact Reporting", description: "Create donor-specific impact stories from program outcome data" },
      { title: "Grant Reporting", description: "Compile grant reports with accurate metrics and narratives" }
    ],
    metrics: [
      { name: "Acknowledgment Time", value: "36 hrs", description: "Average time from gift to acknowledgment" },
      { name: "Content Generation", value: "1000+/mo", description: "Personalized documents generated monthly" },
      { name: "Donor Satisfaction", value: "+34%", description: "Improvement in donor satisfaction scores" }
    ],
    dataInputs: ["Donor profiles", "Gift data", "Program outcomes", "Volunteer hours"],
    dataOutputs: ["Acknowledgment letters", "Impact narratives", "Grant reports", "Recognition materials"],
    governanceFeatures: ["Brand voice consistency", "Data accuracy validation", "Approval workflows", "Version control"],
    relatedAgents: ["Donor Agent", "Grants Agent", "Strategy Agent"]
  },
  "donor-agent": {
    name: "Donor Agent",
    domain: "Fundraising",
    description: "ROI dashboards, pipeline hygiene, acquisition funnel, 'next best action'",
    icon: HandHeart,
    accent: "orange",
    fullDescription: "The Donor Agent transforms fundraising operations with intelligent automation and insights. It maintains pipeline hygiene, generates ROI dashboards, optimizes acquisition funnels, and provides 'next best action' recommendations. This agent empowers fundraisers to focus on relationship-building while the system handles data management and analysis.",
    capabilities: [
      "ROI dashboard generation and updates",
      "Pipeline hygiene and duplicate detection",
      "Acquisition funnel optimization",
      "Next best action recommendations",
      "Donor retention analytics",
      "Major gift prospect scoring"
    ],
    integrations: ["Raiser's Edge NXT", "WealthEngine", "Microsoft Fabric", "Power BI"],
    useCases: [
      { title: "Pipeline Management", description: "Keep opportunity pipeline clean and current with automated updates" },
      { title: "Donor Prioritization", description: "Surface high-potential donors for major gift cultivation" },
      { title: "Retention Risk Detection", description: "Identify at-risk donors before they lapse" }
    ],
    metrics: [
      { name: "Pipeline Accuracy", value: "94%", description: "Data accuracy in opportunity pipeline" },
      { name: "Donor Retention", value: "+8%", description: "Improvement in donor retention rate" },
      { name: "MGO Efficiency", value: "+45%", description: "Increase in major gift officer productivity" }
    ],
    dataInputs: ["Donor interactions", "Gift history", "Wealth data", "Engagement signals"],
    dataOutputs: ["ROI dashboards", "Pipeline reports", "Action recommendations", "Retention alerts"],
    governanceFeatures: ["Data privacy compliance", "Prospect research ethics", "Access controls", "Audit trails"],
    relatedAgents: ["Document Agent", "Grants Agent", "Strategy Agent"]
  },
  "grants-agent": {
    name: "Grants Agent",
    domain: "Grants",
    description: "Pipeline dashboard, dedup outreach, outcomes reporting, reporting automation",
    icon: Target,
    accent: "orangeDark",
    fullDescription: "The Grants Agent streamlines the entire grants lifecycle from discovery to reporting. It manages the grants pipeline, prevents duplicate outreach, automates outcomes reporting, and ensures timely deliverables. This agent helps grant writers focus on compelling narratives while maintaining rigorous compliance with funder requirements.",
    capabilities: [
      "Grants pipeline dashboard",
      "Duplicate outreach prevention",
      "Outcomes data collection",
      "Report automation",
      "Deadline management",
      "Funder relationship tracking"
    ],
    integrations: ["Instrumentl", "Raiser's Edge NXT", "Workday", "Microsoft Fabric"],
    useCases: [
      { title: "Grant Discovery", description: "Match organizational capabilities with funding opportunities" },
      { title: "Application Tracking", description: "Manage multiple grant applications with deadline alerts" },
      { title: "Outcomes Reporting", description: "Compile accurate outcomes data for funder reports" }
    ],
    metrics: [
      { name: "Win Rate", value: "+22%", description: "Improvement in grant application success rate" },
      { name: "Report Accuracy", value: "99%", description: "Accuracy of automated grant reports" },
      { name: "Time Savings", value: "60%", description: "Reduction in report preparation time" }
    ],
    dataInputs: ["Grant opportunities", "Organizational capacity", "Program outcomes", "Financial data"],
    dataOutputs: ["Pipeline dashboards", "Grant reports", "Compliance documentation", "Funder analytics"],
    governanceFeatures: ["Funder compliance tracking", "Restricted fund management", "Reporting accuracy validation", "Audit support"],
    relatedAgents: ["Document Agent", "Financial Agent", "Compliance Agent"]
  },
  "financial-agent": {
    name: "Financial Agent",
    domain: "Finance",
    description: "Consolidated reporting, double-count detection, entity-level reconciliation flags",
    icon: DollarSign,
    accent: "lime",
    fullDescription: "The Financial Agent ensures accuracy and transparency in NCR's complex multi-entity financial operations. It consolidates reporting across 1,100+ entities, detects double-counting, flags reconciliation issues, and accelerates month-end close. This agent provides finance leadership with confidence in their numbers.",
    capabilities: [
      "Consolidated financial reporting",
      "Double-count detection",
      "Entity-level reconciliation",
      "Month-end close acceleration",
      "Anomaly detection",
      "Grant fund tracking"
    ],
    integrations: ["Workday", "Microsoft Fabric", "Power BI", "Entity Registry"],
    useCases: [
      { title: "Consolidated Financials", description: "Generate accurate consolidated P&L across all entities" },
      { title: "Grant Tracking", description: "Monitor restricted fund usage and compliance" },
      { title: "Anomaly Investigation", description: "Flag and investigate unusual financial patterns" }
    ],
    metrics: [
      { name: "Close Time", value: "-4 days", description: "Reduction in month-end close cycle" },
      { name: "Error Detection", value: "99.5%", description: "Accuracy in detecting financial anomalies" },
      { name: "Consolidation Time", value: "-70%", description: "Reduction in consolidation reporting time" }
    ],
    dataInputs: ["GL transactions", "Entity structures", "Grant allocations", "Budget data"],
    dataOutputs: ["Consolidated reports", "Reconciliation flags", "Anomaly alerts", "Board-ready financials"],
    governanceFeatures: ["GAAP compliance", "Audit trail", "Segregation of duties", "Access controls"],
    relatedAgents: ["Grants Agent", "Compliance Agent", "Strategy Agent"]
  },
  "compliance-agent": {
    name: "Compliance Agent",
    domain: "Compliance",
    description: "HUD/CMS filing prep, entity registry, action logging, evidence packs for audit",
    icon: Shield,
    accent: "teal",
    fullDescription: "The Compliance Agent is NCR's regulatory backbone. It prepares HUD and CMS filings, maintains the entity registry, logs all compliance actions, and generates evidence packages for audits. This agent ensures NCR can confidently demonstrate compliance to regulators and auditors.",
    capabilities: [
      "HUD/CMS filing preparation",
      "Entity registry management",
      "Compliance action logging",
      "Audit evidence packaging",
      "Regulatory change monitoring",
      "Deadline tracking"
    ],
    integrations: ["All NCR Systems", "Microsoft Purview", "SIEM", "Microsoft Fabric"],
    useCases: [
      { title: "Regulatory Filing", description: "Prepare and validate HUD and CMS submissions" },
      { title: "Audit Response", description: "Generate comprehensive evidence packages for auditors" },
      { title: "Entity Management", description: "Maintain accurate registry of 1,100+ NCR entities" }
    ],
    metrics: [
      { name: "Filing Accuracy", value: "99.8%", description: "Accuracy rate for regulatory filings" },
      { name: "Audit Response Time", value: "-75%", description: "Reduction in audit response preparation" },
      { name: "Compliance Score", value: "A+", description: "Overall regulatory compliance rating" }
    ],
    dataInputs: ["Regulatory requirements", "Entity data", "Filing deadlines", "Audit requests"],
    dataOutputs: ["Regulatory filings", "Entity registry", "Audit packages", "Compliance reports"],
    governanceFeatures: ["Full audit trails", "Evidence chain of custody", "Access logging", "Policy enforcement"],
    relatedAgents: ["Housing Agent", "Healthcare Agent", "Financial Agent", "Bias Monitoring Agent"]
  },
  "bias-monitoring-agent": {
    name: "Bias Monitoring Agent",
    domain: "Risk",
    description: "Fairness audits for eligibility decisions + any scoring models; anomaly detection",
    icon: Scale,
    accent: "olive",
    fullDescription: "The Bias Monitoring Agent ensures fairness and equity in NCR's automated decision-making. It audits eligibility determinations, monitors scoring models for bias, detects anomalies that may indicate discrimination, and provides transparency into AI decision-making processes.",
    capabilities: [
      "Fairness audits for eligibility decisions",
      "Scoring model bias detection",
      "Anomaly detection for discrimination patterns",
      "Explainability reporting",
      "Demographic impact analysis",
      "Model drift monitoring"
    ],
    integrations: ["All NCR AI Models", "Microsoft Purview", "Microsoft Fabric"],
    useCases: [
      { title: "Eligibility Review", description: "Audit housing eligibility decisions for fair housing compliance" },
      { title: "Model Monitoring", description: "Continuously monitor AI models for bias drift" },
      { title: "Impact Assessment", description: "Analyze demographic impact of policy changes" }
    ],
    metrics: [
      { name: "Bias Detection Rate", value: "99%", description: "Detection rate for algorithmic bias" },
      { name: "Explainability Score", value: "High", description: "AI decision transparency rating" },
      { name: "Fair Housing Compliance", value: "100%", description: "Fair Housing Act compliance rate" }
    ],
    dataInputs: ["Decision outcomes", "Demographic data", "Model predictions", "Policy parameters"],
    dataOutputs: ["Fairness reports", "Bias alerts", "Explainability documentation", "Remediation recommendations"],
    governanceFeatures: ["Fair Housing Act compliance", "AI ethics enforcement", "Transparency requirements", "External audit support"],
    relatedAgents: ["Compliance Agent", "Strategy Agent", "Security Agent"]
  },
  "strategy-agent": {
    name: "Strategy Agent",
    domain: "Strategy",
    description: "Forecasting (occupancy/staffing/finance), ROI simulations, system inventory",
    icon: LineChart,
    accent: "sky",
    fullDescription: "The Strategy Agent provides leadership with forward-looking intelligence. It forecasts occupancy trends, staffing needs, and financial performance. It runs ROI simulations for strategic initiatives and maintains a comprehensive inventory of NCR's systems and capabilities.",
    capabilities: [
      "Occupancy forecasting",
      "Staffing needs prediction",
      "Financial performance modeling",
      "ROI simulation engine",
      "System capability inventory",
      "Scenario planning support"
    ],
    integrations: ["Microsoft Fabric", "Power BI", "Workday", "Yardi", "All NCR Systems"],
    useCases: [
      { title: "Occupancy Planning", description: "Forecast occupancy trends to optimize property performance" },
      { title: "Initiative Evaluation", description: "Model ROI for proposed strategic initiatives" },
      { title: "Resource Planning", description: "Predict staffing needs based on service demands" }
    ],
    metrics: [
      { name: "Forecast Accuracy", value: "92%", description: "Accuracy of 12-month forecasts" },
      { name: "Scenario Speed", value: "Minutes", description: "Time to generate ROI scenario" },
      { name: "Planning Cycle", value: "-50%", description: "Reduction in strategic planning time" }
    ],
    dataInputs: ["Historical trends", "Market data", "Operational metrics", "Financial performance"],
    dataOutputs: ["Forecasts", "Scenario analyses", "Strategic recommendations", "Capability maps"],
    governanceFeatures: ["Model validation", "Assumption transparency", "Version control", "Audit trail"],
    relatedAgents: ["Financial Agent", "Donor Agent", "Bias Monitoring Agent"]
  },
  "resident-engagement-agent": {
    name: "Resident Engagement Agent",
    domain: "Engagement",
    description: "Accessibility checks, multilingual readiness, adoption prompts, digital divide workflows",
    icon: Users,
    accent: "tealDark",
    fullDescription: "The Resident Engagement Agent ensures all NCR residents can access and benefit from digital services. It monitors accessibility compliance, supports multilingual needs, guides technology adoption, and bridges the digital divide through tailored workflows.",
    capabilities: [
      "Accessibility compliance monitoring",
      "Multilingual content management",
      "Technology adoption support",
      "Digital divide workflows",
      "Engagement analytics",
      "Communication preference management"
    ],
    integrations: ["Resident Portals", "Communication Platforms", "Microsoft Fabric"],
    useCases: [
      { title: "Accessibility Audit", description: "Ensure all digital touchpoints meet accessibility standards" },
      { title: "Language Support", description: "Provide services in residents' preferred languages" },
      { title: "Digital Onboarding", description: "Guide residents through technology adoption at their pace" }
    ],
    metrics: [
      { name: "Accessibility Score", value: "WCAG AA", description: "Web accessibility compliance level" },
      { name: "Digital Adoption", value: "+45%", description: "Increase in resident digital engagement" },
      { name: "Language Coverage", value: "12", description: "Languages supported for key communications" }
    ],
    dataInputs: ["Resident preferences", "Accessibility needs", "Engagement patterns", "Language preferences"],
    dataOutputs: ["Accessibility reports", "Adoption metrics", "Engagement recommendations", "Inclusion analytics"],
    governanceFeatures: ["ADA compliance", "Language access requirements", "Privacy protection", "Consent management"],
    relatedAgents: ["CareGuide Agent", "Document Agent", "Compliance Agent"]
  },
  "security-agent": {
    name: "Security Agent",
    domain: "Security",
    description: "Monitors unusual agent activity patterns + data access anomalies; ties to SIEM tooling",
    icon: Lock,
    accent: "oliveDark",
    fullDescription: "The Security Agent is the guardian of NCR's agentic ecosystem. It monitors all agent activity for unusual patterns, detects data access anomalies, integrates with enterprise SIEM tooling, and ensures the secure operation of all automated processes.",
    capabilities: [
      "Agent activity monitoring",
      "Data access anomaly detection",
      "SIEM integration",
      "Threat pattern recognition",
      "Access governance enforcement",
      "Incident response automation"
    ],
    integrations: ["SIEM", "Microsoft Purview", "All NCR Agents", "Identity Management"],
    useCases: [
      { title: "Agent Monitoring", description: "Track all agent activities for security compliance" },
      { title: "Anomaly Response", description: "Automatically respond to detected security anomalies" },
      { title: "Access Review", description: "Continuous validation of agent access permissions" }
    ],
    metrics: [
      { name: "Detection Time", value: "<5 min", description: "Average time to detect anomalies" },
      { name: "False Positive Rate", value: "<2%", description: "Security alert accuracy" },
      { name: "Coverage", value: "100%", description: "Agent activity monitoring coverage" }
    ],
    dataInputs: ["Agent activity logs", "Access patterns", "Security events", "Threat intelligence"],
    dataOutputs: ["Security alerts", "Audit reports", "Compliance evidence", "Incident documentation"],
    governanceFeatures: ["Zero trust enforcement", "Continuous monitoring", "Incident documentation", "Regulatory compliance"],
    relatedAgents: ["Compliance Agent", "Bias Monitoring Agent", "All Agents"]
  }
};

export default function AgentDetail() {
  const params = useParams();
  const agentId = params.agentId as string;
  
  const agent = agentDetails[agentId];
  
  if (!agent) {
    return (
      <div className="p-6">
        <Card className="p-6 text-center">
          <div className="space-y-4">
            <AlertTriangle className="w-12 h-12 mx-auto text-muted-foreground" />
            <p className="text-muted-foreground">Agent not found</p>
            <Link href="/agent-value-map?tab=agents">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Agent Catalogue
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const Icon = agent.icon;
  const accentColor = NCR_BRAND_COLORS[agent.accent];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/agent-value-map?tab=agents">
          <Button variant="outline" size="sm" data-testid="button-back">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Agents
          </Button>
        </Link>
      </div>

      <div className="flex items-start gap-6">
        <div 
          className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: accentColor }}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold" style={{ color: accentColor }}>{agent.name}</h1>
          <Badge variant="outline" className="mt-2" style={{ borderColor: accentColor, color: accentColor }}>
            {agent.domain}
          </Badge>
          <p className="text-lg text-muted-foreground mt-3 max-w-3xl">{agent.fullDescription}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AccentCard accent={agent.accent}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" style={{ color: accentColor }} />
                Core Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid md:grid-cols-2 gap-3">
                {agent.capabilities.map((capability, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 shrink-0" style={{ color: accentColor }} />
                    <span className="text-sm">{capability}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </AccentCard>

          <AccentCard accent={agent.accent}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" style={{ color: accentColor }} />
                Use Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agent.useCases.map((useCase, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-muted/50">
                    <p className="font-semibold" style={{ color: accentColor }}>{useCase.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{useCase.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </AccentCard>

          <div className="grid md:grid-cols-2 gap-6">
            <AccentCard accent={agent.accent}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Database className="w-4 h-4" style={{ color: accentColor }} />
                  Data Inputs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {agent.dataInputs.map((input, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <ChevronRight className="w-3 h-3" style={{ color: accentColor }} />
                      {input}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </AccentCard>

            <AccentCard accent={agent.accent}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
                  Data Outputs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {agent.dataOutputs.map((output, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <ChevronRight className="w-3 h-3" style={{ color: accentColor }} />
                      {output}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </AccentCard>
          </div>
        </div>

        <div className="space-y-6">
          <AccentCard accent={agent.accent}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="w-4 h-4" style={{ color: accentColor }} />
                Key Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agent.metrics.map((metric, idx) => (
                  <div key={idx} className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold" style={{ color: accentColor }}>{metric.value}</p>
                    <p className="font-medium text-sm">{metric.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </AccentCard>

          <AccentCard accent={agent.accent}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Network className="w-4 h-4" style={{ color: accentColor }} />
                Integrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {agent.integrations.map((integration, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {integration}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </AccentCard>

          <AccentCard accent={agent.accent}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="w-4 h-4" style={{ color: accentColor }} />
                Governance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {agent.governanceFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-3 h-3" style={{ color: accentColor }} />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </AccentCard>

          <AccentCard accent={agent.accent}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bot className="w-4 h-4" style={{ color: accentColor }} />
                Related Agents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {agent.relatedAgents.map((relatedAgent, idx) => (
                  <Link key={idx} href={`/agent-value-map/agent/${relatedAgent.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors">
                      <ChevronRight className="w-4 h-4" style={{ color: accentColor }} />
                      <span className="text-sm font-medium">{relatedAgent}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </AccentCard>
        </div>
      </div>
    </div>
  );
}
