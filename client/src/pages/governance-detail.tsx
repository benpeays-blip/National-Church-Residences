import { useParams, Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { NCR_BRAND_COLORS, type AccentColor } from "@/components/ui/accent-card";
import { 
  ArrowLeft,
  UserCheck,
  ClipboardCheck,
  Lock,
  Scale,
  AlertTriangle,
  Eye,
  Shield,
  FileText,
  Activity,
  Gauge,
  Target,
  ChevronRight,
  LucideIcon
} from "lucide-react";

interface PolicyItem {
  name: string;
  description: string;
  status: "enforced" | "partial" | "planned";
}

interface Metric {
  name: string;
  current: string;
  target: string;
  progress: number;
}

interface Implementation {
  name: string;
  description: string;
  owner: string;
}

interface GovernanceData {
  title: string;
  icon: LucideIcon;
  accent: AccentColor;
  color: string;
  tagline: string;
  description: string;
  rationale: string;
  policies: PolicyItem[];
  metrics: Metric[];
  implementations: Implementation[];
  examples: string[];
  regulatoryContext: string[];
}

const governanceDetails: Record<string, GovernanceData> = {
  "human-in-the-loop-for-high-stakes-decisions": {
    title: "Human-in-the-Loop for High-Stakes Decisions",
    icon: UserCheck,
    accent: "sky",
    color: "#7BC4DC",
    tagline: "Critical decisions require human judgment and accountability",
    description: "For high-stakes decisions affecting residents, donors, or regulatory compliance, AI agents provide recommendations but humans make the final call. This ensures accountability, ethical oversight, and regulatory compliance while still benefiting from AI efficiency.",
    rationale: "NCR serves vulnerable populations where errors in eligibility determinations or adverse actions can significantly impact lives. Maintaining human oversight protects residents, ensures fair treatment, and provides clear accountability for regulators and auditors.",
    policies: [
      { name: "Eligibility Approvals", description: "All housing and service eligibility decisions require staff review before finalization", status: "enforced" },
      { name: "Adverse Actions", description: "Any action negatively impacting a resident must be reviewed and approved by a supervisor", status: "enforced" },
      { name: "Filing Submissions", description: "HUD and CMS filings require sign-off from compliance officer before submission", status: "enforced" },
      { name: "Major Gift Acceptance", description: "Gifts over $50,000 require development director review", status: "partial" },
      { name: "Grant Commitments", description: "Grant applications and commitments require program director approval", status: "enforced" }
    ],
    metrics: [
      { name: "Human Review Rate", current: "100%", target: "100%", progress: 100 },
      { name: "Avg Review Time", current: "4.2 hrs", target: "4 hrs", progress: 95 },
      { name: "Override Rate", current: "12%", target: "<15%", progress: 80 },
      { name: "Escalation Rate", current: "3%", target: "<5%", progress: 100 }
    ],
    implementations: [
      { name: "Approval Workflow System", description: "All high-stakes decisions queue for human review with audit trail", owner: "IT Operations" },
      { name: "Escalation Procedures", description: "Defined escalation paths for complex or unusual cases", owner: "Compliance" },
      { name: "Training Program", description: "Staff training on AI-assisted decision making and override protocols", owner: "HR" }
    ],
    examples: [
      "Housing Agent flags potential eligibility issue → Staff reviews documentation → Staff makes final determination",
      "Compliance Agent prepares HUD filing → Compliance Officer reviews evidence pack → Officer submits",
      "Donor Agent recommends major gift solicitation → MGO reviews prospect profile → MGO decides approach"
    ],
    regulatoryContext: [
      "HUD requires human accountability for eligibility determinations",
      "Fair Housing Act mandates non-discriminatory decision-making with clear audit trails",
      "CMS regulations require human oversight for healthcare-related decisions"
    ]
  },
  "full-audit-trails": {
    title: "Full Audit Trails",
    icon: ClipboardCheck,
    accent: "lime",
    color: "#B5C942",
    tagline: "Every action logged, every decision traceable",
    description: "Every agent action is fully logged with complete context: who initiated, what data was accessed, what output was produced, and when it occurred. This enables complete traceability for auditors, regulators, and internal quality assurance.",
    rationale: "NCR operates in highly regulated environments (HUD, CMS) where auditors require complete documentation of decisions and actions. Full audit trails also support internal improvement, incident investigation, and stakeholder trust.",
    policies: [
      { name: "Action Logging", description: "All agent actions logged with timestamp, user context, and data accessed", status: "enforced" },
      { name: "Data Access Logging", description: "Every data read and write operation recorded with purpose", status: "enforced" },
      { name: "Output Retention", description: "Generated documents and recommendations stored with version control", status: "enforced" },
      { name: "Log Immutability", description: "Audit logs are append-only and cannot be modified or deleted", status: "enforced" },
      { name: "Log Retention", description: "Logs retained for 7 years per regulatory requirements", status: "partial" }
    ],
    metrics: [
      { name: "Log Completeness", current: "99.8%", target: "100%", progress: 99 },
      { name: "Log Availability", current: "99.9%", target: "99.9%", progress: 100 },
      { name: "Query Response Time", current: "2.1s", target: "2s", progress: 95 },
      { name: "Audit Requests Fulfilled", current: "100%", target: "100%", progress: 100 }
    ],
    implementations: [
      { name: "Centralized Log Repository", description: "All agent logs flow to Microsoft Fabric with Purview governance", owner: "Data Engineering" },
      { name: "Audit Dashboard", description: "Self-service audit query interface for compliance team", owner: "IT Operations" },
      { name: "Automated Evidence Packs", description: "Pre-built evidence pack generation for common audit requests", owner: "Compliance" }
    ],
    examples: [
      "Auditor requests all HUD recertification actions for Q3 → System generates complete action log with supporting documents",
      "Investigation into data access concern → Full trail shows who accessed what data and why",
      "Compliance review → Dashboard shows all agent actions affecting a specific resident"
    ],
    regulatoryContext: [
      "HUD requires 3-year retention of housing program records",
      "HIPAA mandates 6-year retention of healthcare-related access logs",
      "IRS requires 7-year retention of donor and financial records"
    ]
  },
  "purview-enforced-access-controls": {
    title: "Purview-Enforced Access Controls",
    icon: Lock,
    accent: "teal",
    color: "#7FA3A1",
    tagline: "Right data to the right people at the right time",
    description: "Microsoft Purview enforces data classification and access policies across all NCR systems. HIPAA/PII data has strict boundaries, and role-based access ensures staff only see data relevant to their job function.",
    rationale: "NCR handles sensitive health information, financial data, and personal details. Proper access controls protect resident privacy, ensure regulatory compliance, and reduce organizational risk from data breaches or misuse.",
    policies: [
      { name: "Data Classification", description: "All data classified by sensitivity level (Public, Internal, Confidential, Restricted)", status: "enforced" },
      { name: "Role-Based Access", description: "Access determined by job role with least-privilege principle", status: "enforced" },
      { name: "HIPAA Boundaries", description: "PHI access restricted to healthcare staff with valid business need", status: "enforced" },
      { name: "PII Protection", description: "Personal information access logged and monitored for anomalies", status: "enforced" },
      { name: "Cross-Entity Isolation", description: "Data isolation between NCR entities where required", status: "partial" }
    ],
    metrics: [
      { name: "Access Violations", current: "2/mo", target: "0", progress: 50 },
      { name: "Role Accuracy", current: "98%", target: "99%", progress: 99 },
      { name: "Provisioning Time", current: "4 hrs", target: "2 hrs", progress: 50 },
      { name: "Deprovisioning Time", current: "1 hr", target: "1 hr", progress: 100 }
    ],
    implementations: [
      { name: "Purview Data Catalog", description: "Complete data inventory with sensitivity classifications", owner: "Data Governance" },
      { name: "Entra ID Integration", description: "Role definitions synced with HR system and Entra ID", owner: "IT Security" },
      { name: "Access Review Program", description: "Quarterly access reviews for sensitive data permissions", owner: "Compliance" }
    ],
    examples: [
      "Service coordinator accesses resident intake data → Purview verifies role and logs access",
      "Development staff queries donor records → Only fundraising-relevant fields visible",
      "New employee onboarded → Automatic role assignment based on position"
    ],
    regulatoryContext: [
      "HIPAA Privacy Rule requires minimum necessary access to PHI",
      "Fair Housing Act requires protection of applicant information",
      "State privacy laws increasingly require data minimization"
    ]
  },
  "bias-monitoring-&-fairness-audits": {
    title: "Bias Monitoring & Fairness Audits",
    icon: Scale,
    accent: "orange",
    color: "#E8923A",
    tagline: "Fair treatment validated through systematic monitoring",
    description: "All AI models making eligibility decisions or scoring are monitored for bias across protected classes. Regular fairness audits ensure equal treatment and identify any disparate impact before it causes harm.",
    rationale: "NCR's mission is to serve all residents equitably. AI systems can inadvertently perpetuate or amplify biases present in historical data. Proactive monitoring protects residents and ensures NCR upholds its values and legal obligations.",
    policies: [
      { name: "Pre-Deployment Testing", description: "All models tested for bias before production deployment", status: "enforced" },
      { name: "Ongoing Monitoring", description: "Continuous monitoring of model outputs for disparate impact", status: "partial" },
      { name: "Annual Fairness Audits", description: "Third-party audits of all scoring and eligibility models", status: "planned" },
      { name: "Remediation Protocols", description: "Defined procedures for addressing detected bias", status: "enforced" },
      { name: "Transparency Reporting", description: "Annual public reporting on AI fairness metrics", status: "planned" }
    ],
    metrics: [
      { name: "Bias Flags Detected", current: "3/mo", target: "<5", progress: 100 },
      { name: "Bias Flags Resolved", current: "85%", target: "100%", progress: 85 },
      { name: "Model Coverage", current: "75%", target: "100%", progress: 75 },
      { name: "Time to Resolution", current: "14 days", target: "7 days", progress: 50 }
    ],
    implementations: [
      { name: "Bias Detection Pipeline", description: "Automated analysis of model outputs across demographic groups", owner: "Data Science" },
      { name: "Fairness Dashboard", description: "Real-time visibility into model fairness metrics", owner: "Compliance" },
      { name: "Model Registry", description: "Inventory of all AI models with fairness documentation", owner: "IT Operations" }
    ],
    examples: [
      "Housing eligibility model monitored → No significant difference in approval rates across racial groups",
      "Donor scoring algorithm audited → Adjustments made to reduce geographic bias",
      "Service referral model flagged → Investigation reveals data quality issue in specific region"
    ],
    regulatoryContext: [
      "Fair Housing Act prohibits discrimination in housing decisions",
      "Civil Rights Act protects against discriminatory practices",
      "Emerging AI regulations require algorithmic accountability"
    ]
  },
  "model-risk-management": {
    title: "Model Risk Management",
    icon: AlertTriangle,
    accent: "coral",
    color: "#D5636C",
    tagline: "Controlled deployment with safety nets",
    description: "All AI models follow a rigorous lifecycle: versioning, pre-deployment evaluation, production monitoring, drift detection, and rollback procedures. This ensures models perform as expected and can be quickly corrected if issues arise.",
    rationale: "AI models can degrade over time or behave unexpectedly with new data. Formal model risk management ensures NCR can confidently deploy AI while maintaining the ability to quickly respond to problems.",
    policies: [
      { name: "Version Control", description: "All models versioned with complete training and evaluation history", status: "enforced" },
      { name: "Pre-Production Testing", description: "Models tested in staging environment before production", status: "enforced" },
      { name: "Performance Monitoring", description: "Continuous monitoring of model accuracy and reliability", status: "partial" },
      { name: "Drift Detection", description: "Automated detection of model performance degradation", status: "partial" },
      { name: "Rollback Procedures", description: "Ability to revert to previous model version within 1 hour", status: "enforced" }
    ],
    metrics: [
      { name: "Model Uptime", current: "99.5%", target: "99.9%", progress: 99 },
      { name: "Rollbacks Executed", current: "2/yr", target: "<5", progress: 100 },
      { name: "Avg Rollback Time", current: "45 min", target: "1 hr", progress: 100 },
      { name: "Drift Alerts", current: "4/mo", target: "<10", progress: 100 }
    ],
    implementations: [
      { name: "Model Registry", description: "Central repository of all models with version history", owner: "Data Science" },
      { name: "CI/CD Pipeline", description: "Automated testing and deployment with approval gates", owner: "IT Operations" },
      { name: "Monitoring Dashboard", description: "Real-time model performance and health metrics", owner: "Data Science" }
    ],
    examples: [
      "New donor scoring model deployed → Staged rollout with monitoring → Full deployment after validation",
      "Housing model drift detected → Alert triggers investigation → Root cause identified and fixed",
      "Critical issue in production → Rollback to previous version in 30 minutes"
    ],
    regulatoryContext: [
      "Banking regulators (OCC, Fed) provide model risk management frameworks applicable to AI",
      "Emerging AI regulations will require model documentation and testing",
      "Internal audit standards expect controls over automated decision systems"
    ]
  },
  "data-retention-&-redaction-rules": {
    title: "Data Retention & Redaction Rules",
    icon: Eye,
    accent: "olive",
    color: "#A5A033",
    tagline: "Keep what's needed, protect what's sensitive",
    description: "Clear policies govern how long data is retained and when it must be redacted or deleted. Special attention to health/resident data and donor privacy ensures compliance with regulations while meeting operational needs.",
    rationale: "Different types of data have different retention requirements and privacy considerations. Proper management reduces storage costs, limits liability, and protects the privacy of residents and donors.",
    policies: [
      { name: "Retention Schedules", description: "Defined retention periods by data type aligned with regulations", status: "enforced" },
      { name: "Automated Deletion", description: "Data automatically deleted or archived at end of retention period", status: "partial" },
      { name: "Donor Privacy", description: "Donor anonymization available upon request", status: "enforced" },
      { name: "Health Data Redaction", description: "PHI redacted from non-healthcare systems after specified period", status: "partial" },
      { name: "Legal Hold Process", description: "Ability to suspend deletion for litigation or investigation", status: "enforced" }
    ],
    metrics: [
      { name: "Policy Compliance", current: "92%", target: "100%", progress: 92 },
      { name: "Deletion Backlog", current: "8%", target: "0%", progress: 92 },
      { name: "Privacy Requests Fulfilled", current: "100%", target: "100%", progress: 100 },
      { name: "Legal Hold Accuracy", current: "100%", target: "100%", progress: 100 }
    ],
    implementations: [
      { name: "Retention Schedule Registry", description: "Complete inventory of data types with retention rules", owner: "Data Governance" },
      { name: "Automated Lifecycle Management", description: "Purview-managed data lifecycle from creation to deletion", owner: "IT Operations" },
      { name: "Privacy Request Portal", description: "Self-service portal for donor privacy requests", owner: "Development" }
    ],
    examples: [
      "Resident moves out → Housing data retained 3 years → Archived for 4 more years → Deleted",
      "Donor requests anonymization → Records updated within 30 days → Confirmation sent",
      "Litigation filed → Legal hold placed on relevant records → Deletion suspended"
    ],
    regulatoryContext: [
      "HUD requires 3-year retention of housing program records after move-out",
      "HIPAA requires 6-year retention of healthcare records",
      "IRS requires 7-year retention of financial and donation records"
    ]
  }
};

function getStatusBadge(status: "enforced" | "partial" | "planned") {
  const colors = {
    enforced: { bg: NCR_BRAND_COLORS.teal, label: "Enforced" },
    partial: { bg: NCR_BRAND_COLORS.orange, label: "Partial" },
    planned: { bg: NCR_BRAND_COLORS.sky, label: "Planned" }
  };
  const { bg, label } = colors[status];
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

export default function GovernanceDetail() {
  const { governanceId } = useParams<{ governanceId: string }>();
  const governance = governanceDetails[governanceId || ""];

  if (!governance) {
    return (
      <div className="p-6">
        <Link href="/agent-value-map?tab=governance">
          <Button variant="ghost" className="gap-2 mb-6" data-testid="button-back">
            <ArrowLeft className="w-4 h-4" />
            Back to Governance
          </Button>
        </Link>
        <Card>
          <CardContent className="p-12 text-center">
            <AlertTriangle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Governance Item Not Found</h2>
            <p className="text-muted-foreground">The requested governance item could not be found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const IconComponent = governance.icon;
  const brandColor = NCR_BRAND_COLORS[governance.accent] || governance.color;

  return (
    <div className="p-6 space-y-6">
      <Link href="/agent-value-map?tab=governance">
        <Button variant="ghost" className="gap-2" data-testid="button-back">
          <ArrowLeft className="w-4 h-4" />
          Back to Governance
        </Button>
      </Link>

      <div 
        className="rounded-xl p-8 text-white"
        style={{ backgroundColor: brandColor }}
      >
        <div className="flex items-center gap-4 flex-wrap">
          <div className="p-4 rounded-full bg-white/20">
            <IconComponent className="h-10 w-10" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold" data-testid="governance-title">{governance.title}</h1>
            <p className="text-white/80 mt-1">{governance.tagline}</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" style={{ color: brandColor }} />
            Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-base leading-relaxed">{governance.description}</p>
          <div className="p-4 rounded-lg bg-muted/50 border-l-4" style={{ borderLeftColor: brandColor }}>
            <p className="font-semibold mb-1">Why This Matters</p>
            <p className="text-sm text-muted-foreground">{governance.rationale}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader style={{ backgroundColor: brandColor }} className="rounded-t-xl text-white">
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Policies & Requirements
            </CardTitle>
            <CardDescription className="text-white/80">Current implementation status</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {governance.policies.map((policy) => (
                <div key={policy.name} className="p-4 rounded-lg border bg-card">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold">{policy.name}</h4>
                    {getStatusBadge(policy.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{policy.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader style={{ backgroundColor: brandColor }} className="rounded-t-xl text-white">
            <CardTitle className="text-white flex items-center gap-2">
              <Gauge className="w-5 h-5" />
              Key Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {governance.metrics.map((metric) => (
              <div key={metric.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold" style={{ color: brandColor }}>{metric.current}</span>
                  <span className="text-muted-foreground">Target: {metric.target}</span>
                </div>
                <Progress value={metric.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader style={{ backgroundColor: brandColor }} className="rounded-t-xl text-white">
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Implementation
            </CardTitle>
            <CardDescription className="text-white/80">How this is being achieved</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {governance.implementations.map((impl) => (
              <div key={impl.name} className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold">{impl.name}</h4>
                  <Badge variant="outline" className="text-xs">{impl.owner}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{impl.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader style={{ backgroundColor: brandColor }} className="rounded-t-xl text-white">
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5" />
              Examples in Practice
            </CardTitle>
            <CardDescription className="text-white/80">Real-world applications</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            {governance.examples.map((example, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: brandColor }} />
                <p className="text-sm">{example}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader style={{ backgroundColor: brandColor }} className="rounded-t-xl text-white">
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Regulatory Context
          </CardTitle>
          <CardDescription className="text-white/80">Compliance requirements driving this governance</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {governance.regulatoryContext.map((context, index) => (
              <div 
                key={index} 
                className="p-4 rounded-lg border-l-4"
                style={{ borderLeftColor: brandColor, backgroundColor: `${brandColor}10` }}
              >
                <p className="text-sm">{context}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
