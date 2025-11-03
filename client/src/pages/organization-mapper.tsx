import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Users,
  Search,
  Mail,
  FileText,
  DollarSign,
  Heart,
  TrendingUp,
  AlertCircle,
  Zap,
  ArrowRight,
  Database,
  MessageSquare,
  Calendar,
  Building2,
  BarChart3,
  UserPlus,
  Target,
  CheckCircle2,
  XCircle
} from "lucide-react";

// Types
type WorkflowStage = {
  id: string;
  title: string;
  icon: typeof Search;
  color: string;
  description: string;
};

type RoleActivity = {
  stage: string;
  actions: string[];
  systems: string[];
  painPoints?: string[];
};

type Role = {
  id: string;
  title: string;
  icon: typeof Users;
  color: string;
  description: string;
  activities: RoleActivity[];
  keyResponsibilities: string[];
  primarySystems: string[];
  commonPainPoints: string[];
  automationOpportunities: string[];
};

export default function OrganizationMapper() {
  const [searchQuery, setSearchQuery] = useState("");

  // Workflow stages
  const workflowStages: WorkflowStage[] = [
    {
      id: "discovery",
      title: "Prospect Research",
      icon: Search,
      color: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300",
      description: "Identify and qualify potential donors"
    },
    {
      id: "cultivation",
      title: "Initial Contact & Cultivation",
      icon: Mail,
      color: "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300",
      description: "Build relationships and engagement"
    },
    {
      id: "solicitation",
      title: "Proposal & Solicitation",
      icon: FileText,
      color: "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300",
      description: "Present funding opportunities"
    },
    {
      id: "processing",
      title: "Gift Processing",
      icon: DollarSign,
      color: "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300",
      description: "Record and acknowledge contributions"
    },
    {
      id: "stewardship",
      title: "Follow-Up & Stewardship",
      icon: Heart,
      color: "bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300",
      description: "Maintain donor relationships"
    },
    {
      id: "reporting",
      title: "Leadership Insight",
      icon: TrendingUp,
      color: "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300",
      description: "Strategic analysis and reporting"
    }
  ];

  // Organizational roles
  const roles: Role[] = [
    {
      id: "dev-officer",
      title: "Development Officer / Gift Officer",
      icon: UserPlus,
      color: "bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300",
      description: "Manages major gift relationships and donor engagement",
      keyResponsibilities: [
        "Prospect qualification and relationship building",
        "Personalized donor communications",
        "Meeting scheduling and follow-up",
        "Pipeline management and forecasting"
      ],
      primarySystems: ["Salesforce", "Outlook", "WealthEngine"],
      activities: [
        {
          stage: "discovery",
          actions: ["Review prospect lists from researcher", "Assess donor capacity scores"],
          systems: ["Salesforce", "WealthEngine"]
        },
        {
          stage: "cultivation",
          actions: ["Send personalized emails", "Schedule meetings", "Log interactions"],
          systems: ["Outlook", "Salesforce"]
        },
        {
          stage: "solicitation",
          actions: ["Prepare ask materials", "Schedule solicitation meeting", "Update pipeline"],
          systems: ["Salesforce", "SharePoint"]
        },
        {
          stage: "stewardship",
          actions: ["Send thank you notes", "Plan stewardship events", "Share impact updates"],
          systems: ["Outlook", "Salesforce", "Mailchimp"]
        }
      ],
      commonPainPoints: [
        "Double-entering contact notes in multiple systems",
        "Limited visibility into full donor communication history",
        "Manual prospect assignment and prioritization",
        "Time-consuming meeting preparation"
      ],
      automationOpportunities: [
        "AI-powered meeting prep summaries",
        "Automated contact logging from email",
        "Smart prospect prioritization",
        "Next best action recommendations"
      ]
    },
    {
      id: "researcher",
      title: "Prospect Researcher",
      icon: Search,
      color: "bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300",
      description: "Identifies high-capacity prospects and conducts wealth screening",
      keyResponsibilities: [
        "Wealth screening and capacity analysis",
        "Affinity and interest mapping",
        "Competitive intelligence gathering",
        "Research report generation"
      ],
      primarySystems: ["Salesforce", "WealthEngine", "iWave", "LinkedIn"],
      activities: [
        {
          stage: "discovery",
          actions: ["Pull donor data from CRM", "Run wealth screening", "Add capacity ratings", "Alert officers to prospects"],
          systems: ["Salesforce", "WealthEngine", "iWave"],
          painPoints: ["Manual cross-referencing across systems", "Outdated wealth data"]
        }
      ],
      commonPainPoints: [
        "Time-consuming manual research process",
        "Disconnected wealth screening tools",
        "Limited real-time wealth event monitoring",
        "Difficulty prioritizing research requests"
      ],
      automationOpportunities: [
        "Real-time wealth event alerts",
        "AI-powered affinity scoring",
        "Automated peer discovery",
        "Board network mapping"
      ]
    },
    {
      id: "marketing",
      title: "Marketing / Communications",
      icon: MessageSquare,
      color: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300",
      description: "Manages donor communications, campaigns, and events",
      keyResponsibilities: [
        "Email campaign management",
        "Event promotion and follow-up",
        "Donor segmentation",
        "Communication effectiveness tracking"
      ],
      primarySystems: ["Mailchimp", "Salesforce", "Eventbrite", "Constant Contact"],
      activities: [
        {
          stage: "cultivation",
          actions: ["Create email campaigns", "Export segmentation lists"],
          systems: ["Mailchimp", "Salesforce"],
          painPoints: ["Outdated segmentation lists", "No conversion tracking"]
        },
        {
          stage: "processing",
          actions: ["Trigger automated thank-you emails"],
          systems: ["Mailchimp", "Salesforce"]
        },
        {
          stage: "stewardship",
          actions: ["Send impact updates", "Manage event invitations", "Track engagement"],
          systems: ["Mailchimp", "Eventbrite"],
          painPoints: ["Event follow-up disconnected from CRM"]
        }
      ],
      commonPainPoints: [
        "Segmentation based on outdated data",
        "No visibility into campaign ROI or donor conversions",
        "Disconnected event registration and CRM data",
        "Manual post-event follow-up workflows"
      ],
      automationOpportunities: [
        "AI-powered donor segmentation",
        "Automated campaign performance tracking",
        "Smart event follow-up workflows",
        "Personalized content generation"
      ]
    },
    {
      id: "grants",
      title: "Grants Team",
      icon: FileText,
      color: "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300",
      description: "Manages foundation and corporate grant applications",
      keyResponsibilities: [
        "Grant opportunity research",
        "Proposal writing and submission",
        "Deadline tracking",
        "Grant reporting and compliance"
      ],
      primarySystems: ["Foundant", "Word", "Excel", "SharePoint"],
      activities: [
        {
          stage: "solicitation",
          actions: ["Draft proposals", "Pull impact metrics", "Collaborate on content"],
          systems: ["Word", "SharePoint", "Power BI"],
          painPoints: ["Manual deadline tracking", "No unified funder profile", "Time-consuming reporting"]
        }
      ],
      commonPainPoints: [
        "Limited integration with donor CRM",
        "Manual deadline and renewal tracking",
        "Repetitive proposal content creation",
        "Disconnected grant and individual donor data"
      ],
      automationOpportunities: [
        "AI-assisted grant writing",
        "Automated deadline reminders",
        "Unified funder intelligence",
        "Grant-to-CRM integration"
      ]
    },
    {
      id: "finance",
      title: "Finance / Accounting",
      icon: DollarSign,
      color: "bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300",
      description: "Processes gifts, reconciles transactions, and ensures compliance",
      keyResponsibilities: [
        "Gift entry and reconciliation",
        "Acknowledgment letter generation",
        "Financial reporting",
        "Audit compliance"
      ],
      primarySystems: ["Financial Edge", "Salesforce", "QuickBooks"],
      activities: [
        {
          stage: "processing",
          actions: ["Reconcile transactions", "Issue acknowledgments", "Update ledger"],
          systems: ["Salesforce", "Financial Edge"],
          painPoints: ["Manual data entry", "Gift coding errors", "Reporting mismatches"]
        }
      ],
      commonPainPoints: [
        "Manual gift entry and reconciliation",
        "Gift coding errors causing reporting issues",
        "Delayed acknowledgment processing",
        "Limited real-time visibility into revenue"
      ],
      automationOpportunities: [
        "Automated gift matching and reconciliation",
        "Smart gift coding suggestions",
        "Real-time revenue dashboards",
        "Automated acknowledgment workflows"
      ]
    },
    {
      id: "leadership",
      title: "Executive Leadership",
      icon: TrendingUp,
      color: "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300",
      description: "Strategic oversight and performance monitoring",
      keyResponsibilities: [
        "Pipeline and forecast review",
        "Campaign performance monitoring",
        "Board reporting",
        "Strategic planning"
      ],
      primarySystems: ["Power BI", "Excel", "Salesforce"],
      activities: [
        {
          stage: "reporting",
          actions: ["Review dashboards", "Analyze trends", "Prepare board reports"],
          systems: ["Power BI", "Excel"],
          painPoints: ["No real-time visibility", "Manual report assembly"]
        }
      ],
      commonPainPoints: [
        "Lack of real-time pipeline visibility",
        "Quarterly reporting delays",
        "Disconnected campaign performance metrics",
        "Limited predictive insights"
      ],
      automationOpportunities: [
        "Real-time executive dashboards",
        "Predictive analytics and forecasting",
        "Automated board reporting",
        "AI-driven strategic recommendations"
      ]
    }
  ];

  // Filter roles based on search
  const filteredRoles = roles.filter(role =>
    role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.keyResponsibilities.some(r => r.toLowerCase().includes(searchQuery.toLowerCase())) ||
    role.primarySystems.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Calculate metrics
  const totalRoles = roles.length;
  const totalStages = workflowStages.length;
  const totalSystems = Array.from(new Set(roles.flatMap(r => r.primarySystems))).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold" data-testid="text-page-title">Organization Mapper</h1>
        <p className="text-sm text-muted-foreground">
          Visualize how different teams navigate the technology ecosystem throughout the donor lifecycle
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Organizational Roles</p>
              <p className="text-5xl font-bold" data-testid="metric-total-roles">{totalRoles}</p>
              <p className="text-xs text-muted-foreground">Key stakeholder groups</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Workflow Stages</p>
              <p className="text-5xl font-bold" data-testid="metric-workflow-stages">{totalStages}</p>
              <p className="text-xs text-muted-foreground">Donor lifecycle phases</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Systems Used</p>
              <p className="text-5xl font-bold" data-testid="metric-total-systems">{totalSystems}</p>
              <p className="text-xs text-muted-foreground">Across all workflows</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Typical Fundraising Workflow - Detailed Sequence */}
      <Card>
        <CardHeader>
          <CardTitle>Typical Fundraising Workflow</CardTitle>
          <CardDescription>
            Example sequence showing how teams move through the tech ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4">
            {/* Stage 1 - Prospect Identification */}
            <Card className="border-2 border-sky-200 dark:border-sky-900">
              <CardHeader 
                className="pb-4"
                style={{
                  background: "linear-gradient(135deg, #0A1628 0%, #1A3A5C 100%)",
                  borderRadius: "0.5rem 0.5rem 0 0"
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/20 border-2 border-sky-500/50 flex items-center justify-center">
                    <Search className="w-5 h-5 text-sky-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-white/10 text-white border-white/20 text-xs">Stage 1</Badge>
                    </div>
                    <CardTitle className="text-white text-lg">Prospect Identification</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Prospect Researcher logs into Salesforce → pulls donor data</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Cross-references names in WealthEngine/iWave → exports wealth scores</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Adds capacity ratings and notes back into Salesforce</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Alerts Development Officer to high-value prospects via email or Teams</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Stage 2 - Outreach & Cultivation */}
            <Card className="border-2 border-cyan-200 dark:border-cyan-900">
              <CardHeader 
                className="pb-4"
                style={{
                  background: "linear-gradient(135deg, #0A1628 0%, #1A3A5C 100%)",
                  borderRadius: "0.5rem 0.5rem 0 0"
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border-2 border-cyan-500/50 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-white/10 text-white border-white/20 text-xs">Stage 2</Badge>
                    </div>
                    <CardTitle className="text-white text-lg">Outreach & Cultivation</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Development Officer reviews prospect record in Salesforce</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Sends personalized email through Outlook/Mailchimp using CRM data</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Schedules introductory meeting; logs activity in Salesforce</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>After meeting, updates notes and stage ("Cultivation" → "Solicitation")</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Stage 3 - Proposal or Ask */}
            <Card className="border-2 border-blue-200 dark:border-blue-900">
              <CardHeader 
                className="pb-4"
                style={{
                  background: "linear-gradient(135deg, #0A1628 0%, #1A3A5C 100%)",
                  borderRadius: "0.5rem 0.5rem 0 0"
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 border-2 border-blue-500/50 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-white/10 text-white border-white/20 text-xs">Stage 3</Badge>
                    </div>
                    <CardTitle className="text-white text-lg">Proposal or Ask</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Officer collaborates with Grants Team or Program Staff to draft proposal in Word/SharePoint</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Uses previous funder data and impact metrics from Power BI</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Final proposal sent; record updated in Salesforce with expected ask amount</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Stage 4 - Gift Processing */}
            <Card className="border-2 border-indigo-200 dark:border-indigo-900">
              <CardHeader 
                className="pb-4"
                style={{
                  background: "linear-gradient(135deg, #0A1628 0%, #1A3A5C 100%)",
                  borderRadius: "0.5rem 0.5rem 0 0"
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 border-2 border-indigo-500/50 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-indigo-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-white/10 text-white border-white/20 text-xs">Stage 4</Badge>
                    </div>
                    <CardTitle className="text-white text-lg">Gift Processing</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Donor commits gift → info entered into Salesforce, synced with Financial Edge</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Finance Team reconciles transaction and issues acknowledgment</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Marketing/Comms triggers automated thank-you email via Mailchimp</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Stage 5 - Stewardship */}
            <Card className="border-2 border-sky-200 dark:border-sky-900">
              <CardHeader 
                className="pb-4"
                style={{
                  background: "linear-gradient(135deg, #0A1628 0%, #1A3A5C 100%)",
                  borderRadius: "0.5rem 0.5rem 0 0"
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/20 border-2 border-sky-500/50 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-sky-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-white/10 text-white border-white/20 text-xs">Stage 5</Badge>
                    </div>
                    <CardTitle className="text-white text-lg">Stewardship</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Program Staff upload impact stories and photos to SharePoint</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Development Officer pulls updates for personalized follow-up letter or event invitation</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Power BI Dashboard aggregates donor engagement and gift trends for quarterly reporting</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search roles, responsibilities, or systems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>
        </CardContent>
      </Card>

      {/* Roles and Workflows */}
      <Card>
        <CardHeader>
          <CardTitle>Organizational Roles & Workflows</CardTitle>
          <CardDescription>
            {filteredRoles.length} {filteredRoles.length === 1 ? 'role' : 'roles'} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-4">
            {filteredRoles.map((role) => {
              const RoleIcon = role.icon;
              return (
                <AccordionItem 
                  key={role.id} 
                  value={role.id}
                  className="border rounded-lg px-6 py-2"
                  data-testid={`accordion-role-${role.id}`}
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4 text-left w-full">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${role.color}`}>
                        <RoleIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base mb-1" data-testid={`text-role-title-${role.id}`}>
                          {role.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {role.description}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2">
                    <div className="space-y-6 ml-14">
                      {/* Key Responsibilities */}
                      <div>
                        <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Key Responsibilities
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {role.keyResponsibilities.map((resp, idx) => (
                            <div 
                              key={idx}
                              className="flex items-start gap-2 p-3 rounded-lg border bg-card/50"
                            >
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span className="text-sm">{resp}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Primary Systems */}
                      <div>
                        <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                          <Database className="w-4 h-4" />
                          Primary Systems
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {role.primarySystems.map((system) => (
                            <Badge key={system} variant="outline" className="text-xs">
                              {system}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Workflow Activities */}
                      {role.activities.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Workflow Activities by Stage
                          </h4>
                          <div className="space-y-3">
                            {role.activities.map((activity) => {
                              const stage = workflowStages.find(s => s.id === activity.stage);
                              if (!stage) return null;
                              const StageIcon = stage.icon;
                              
                              return (
                                <div 
                                  key={activity.stage}
                                  className="p-4 rounded-lg border bg-card"
                                >
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className={`w-6 h-6 rounded flex items-center justify-center ${stage.color}`}>
                                      <StageIcon className="w-3 h-3" />
                                    </div>
                                    <span className="font-medium text-sm">{stage.title}</span>
                                  </div>
                                  
                                  <div className="space-y-2 ml-8">
                                    <div>
                                      <p className="text-xs text-muted-foreground mb-1">Actions:</p>
                                      <ul className="space-y-1">
                                        {activity.actions.map((action, idx) => (
                                          <li key={idx} className="text-sm flex items-start gap-2">
                                            <span className="text-muted-foreground">•</span>
                                            <span>{action}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    
                                    <div>
                                      <p className="text-xs text-muted-foreground mb-1">Systems Used:</p>
                                      <div className="flex flex-wrap gap-1">
                                        {activity.systems.map((system) => (
                                          <Badge key={system} variant="secondary" className="text-xs">
                                            {system}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    {activity.painPoints && activity.painPoints.length > 0 && (
                                      <div className="pt-2 border-t">
                                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                          <AlertCircle className="w-3 h-3" />
                                          Pain Points:
                                        </p>
                                        <ul className="space-y-1">
                                          {activity.painPoints.map((pain, idx) => (
                                            <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                                              <XCircle className="w-3 h-3 shrink-0 mt-0.5 text-destructive" />
                                              <span>{pain}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Common Pain Points */}
                      <div>
                        <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive" />
                          Common Pain Points
                        </h4>
                        <div className="space-y-2">
                          {role.commonPainPoints.map((pain, idx) => (
                            <div 
                              key={idx}
                              className="flex items-start gap-2 p-3 rounded-lg border border-destructive/20 bg-destructive/5"
                            >
                              <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                              <span className="text-sm">{pain}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Automation Opportunities */}
                      <div>
                        <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-primary" />
                          Automation Opportunities
                        </h4>
                        <div className="space-y-2">
                          {role.automationOpportunities.map((opp, idx) => (
                            <div 
                              key={idx}
                              className="flex items-start gap-2 p-3 rounded-lg border border-primary/20 bg-primary/5"
                            >
                              <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span className="text-sm">{opp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
