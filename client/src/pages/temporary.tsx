import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Users, Layers, ExternalLink, ChevronDown, ChevronUp, ChevronRight, Check, X, Building2, Lightbulb, Shield, Heart, Home, DollarSign, Scale, Server, Sparkles, AlertTriangle, Bot, Database, BarChart3, FileText, Zap, Workflow, BrainCircuit, Clock, UserCheck, Trash2, Layout, Smartphone, ArrowLeft, FolderTree, Settings, MessageSquare, User, Briefcase, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AccentCard, NCR_BRAND_COLORS, AccentColor, getAccentColor, getAccentBgClass } from "@/components/ui/accent-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import TechStackMapper from "@/pages/tech-stack-mapper";
import OtherWithTabs from "@/pages/other-with-tabs";

import { techProducts, TechProduct } from "@/data/tech-products";

const categoryAccentMap: Record<string, AccentColor> = {
  "CRM": "teal",
  "Marketing": "sky",
  "Finance": "olive",
  "Analytics": "lime",
  "Engagement": "coral",
  "Healthcare": "orange",
  "Property": "sky",
  "Platform": "teal",
  "Integration": "olive",
};

function getCategoryAccent(category: string): AccentColor {
  return categoryAccentMap[category] || "teal";
}

function ProductCard({ product }: { product: TechProduct }) {
  const [, navigate] = useLocation();
  
  return (
    <Card 
      className="overflow-hidden hover-elevate cursor-pointer transition-all h-full flex flex-col p-0 border-l-4"
      style={{ borderLeftColor: product.brandColor }}
      data-testid={`card-product-${product.id}`}
      onClick={() => navigate(`/temporary/tech-stack/${product.id}`)}
    >
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${product.brandColor}15` }}
          >
            <Database className="h-7 w-7" style={{ color: product.brandColor }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 
              className="font-bold text-lg leading-tight"
              style={{ color: product.brandColor }}
              data-testid={`text-product-name-${product.id}`}
            >
              {product.name}
            </h3>
            <Badge 
              variant="outline" 
              className="text-sm px-3 py-1 mt-2"
              style={{ borderColor: product.brandColor, color: product.brandColor }}
            >
              {product.category}
            </Badge>
          </div>
        </div>
        <p className="text-sm font-medium text-muted-foreground">{product.tagline}</p>
        <p className="text-sm text-muted-foreground mt-3 line-clamp-4">{product.description}</p>
      </div>
    </Card>
  );
}

function ProductDetailModal({ product, onClose }: { product: TechProduct | null; onClose: () => void }) {
  if (!product) return null;
  const accent = getCategoryAccent(product.category);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <AccentCard 
        accent={accent}
        className="w-full max-w-4xl max-h-[90vh] overflow-auto p-0"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="p-6 border-b flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div 
              className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${product.brandColor}15` }}
            >
              <Database className="h-6 w-6" style={{ color: product.brandColor }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-xl" style={{ color: product.brandColor }}>{product.name}</h3>
                <Badge 
                  variant="outline" 
                  className="text-xs"
                  style={{ borderColor: getAccentColor(accent), color: getAccentColor(accent) }}
                >
                  {product.category}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{product.tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                window.open(product.website, '_blank');
              }}
              data-testid={`button-visit-${product.id}`}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              data-testid={`button-close-${product.id}`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 border-b">
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-6 border-b md:border-b-0 md:border-r">
            <div className="flex items-center gap-2 mb-3">
              <div 
                className="w-6 h-6 rounded flex items-center justify-center"
                style={{ backgroundColor: `${getAccentColor("lime")}20` }}
              >
                <Check className="h-3.5 w-3.5" style={{ color: getAccentColor("lime") }} />
              </div>
              <h4 className="font-medium text-sm">Strengths</h4>
            </div>
            <ul className="space-y-2">
              {product.strengths.map((strength, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="mt-1 shrink-0" style={{ color: getAccentColor("lime") }}>+</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 border-b md:border-b-0">
            <div className="flex items-center gap-2 mb-3">
              <div 
                className="w-6 h-6 rounded flex items-center justify-center"
                style={{ backgroundColor: `${getAccentColor("coral")}20` }}
              >
                <X className="h-3.5 w-3.5" style={{ color: getAccentColor("coral") }} />
              </div>
              <h4 className="font-medium text-sm">Weaknesses</h4>
            </div>
            <ul className="space-y-2">
              {product.weaknesses.map((weakness, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="mt-1 shrink-0" style={{ color: getAccentColor("coral") }}>&#8722;</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="p-6 border-t" style={{ backgroundColor: `${getAccentColor("teal")}10` }}>
          <div className="flex items-center gap-2 mb-3">
            <div 
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{ backgroundColor: `${getAccentColor("teal")}20` }}
            >
              <Building2 className="h-3.5 w-3.5" style={{ color: getAccentColor("teal") }} />
            </div>
            <h4 className="font-medium text-sm" style={{ color: getAccentColor("teal") }}>NCR Context</h4>
          </div>
          <p className="text-sm text-muted-foreground">{product.ncrContext}</p>
        </div>
      </AccentCard>
    </div>
  );
}

interface InterviewPerson {
  id: string;
  name: string;
  title: string;
  area: string;
  accent: AccentColor;
  background: string;
  challenges: { title: string; items: string[] }[];
  techStack: { name: string; description: string }[];
  wants: { title: string; items: string[] }[];
  observations: string[];
  summaryInsight: string;
}

const interviewees: InterviewPerson[] = [
  {
    id: "sonya-brown",
    name: "Sonya Brown",
    title: "Senior Vice President",
    area: "Affordable Housing",
    accent: "teal",
    background: "21 years at NCR; started at age 12; 3 years at HUD with government housing expertise",
    challenges: [
      {
        title: "Operational Inefficiency",
        items: [
          "Managers spend ~2 hours per resident (interviewing, scanning, uploading)",
          "Data accuracy is poor ('junk in, junk out'), creating risk if shared nationally",
          "Compliance processes are bureaucratic and time-consuming due to government and state agency requirements"
        ]
      },
      {
        title: "Compliance Burden",
        items: [
          "Compliance work must be extremely detailed and diligent",
          "Every resident must be qualified and recertified annually",
          "Current workflows are manual despite partial AI adoption"
        ]
      },
      {
        title: "System Limitations",
        items: [
          "CareGuide system used by service coordinators is outdated and does not meet NCR's needs",
          "No vendor has been able to modernize CareGuide to NCR's requirements",
          "Resident information is fragmented and not easily leveraged for insights"
        ]
      },
      {
        title: "Resident & Payment Barriers",
        items: [
          "Only ~12% of residents pay rent online",
          "Many properties lack internet access, though most residents have smartphones",
          "Average resident age is 78, but eligibility age is lowering (55+), creating a shift toward younger seniors who expect technology and affordable internet"
        ]
      }
    ],
    techStack: [
      { name: "RightSource (part of Yardi)", description: "Used for compliance tasks such as file reviews and certifications; digitizes applications" },
      { name: "Yardi", description: "Broader property management platform, though much of its functionality is acquired from third parties" },
      { name: "CareGuide", description: "Legacy system used by service coordinators to bridge residents and property managers; slated for rebuild" }
    ],
    wants: [
      {
        title: "Efficiency & Accuracy",
        items: [
          "Streamlined resident intake and compliance processes",
          "Automated scanning, uploading, and verification to reduce manual workload",
          "Reliable, accurate data collection to prevent chaos across national operations"
        ]
      },
      {
        title: "System Modernization",
        items: [
          "Rebuild CareGuide into a modern, data-driven platform",
          "Integration of service coordinator workflows with property management systems",
          "AI-driven compliance and reporting tools to reduce manual effort"
        ]
      },
      {
        title: "Resident Engagement & Technology Access",
        items: [
          "Expand online rent payment adoption beyond 12%",
          "Provide affordable internet access for residents",
          "Support younger seniors who expect technology-enabled housing services"
        ]
      },
      {
        title: "Data for Donors",
        items: [
          "Build systems that capture and present resident and service data in ways donors can understand and value",
          "Use data storytelling to demonstrate impact and secure philanthropic support"
        ]
      }
    ],
    observations: [
      "Sonya manages 700 property managers across the country, overseeing preservation and high-level operations",
      "Runs a tight operation focused on compliance and property performance",
      "87% of properties have service coordinators who provide resident services",
      "AI already supports ~60% of compliance work, with ~80% progress toward automation",
      "Donors increasingly demand data transparency to validate impact",
      "Yardi often acquires functionality from other vendors rather than building in-house"
    ],
    summaryInsight: "Sonya's perspective highlights inefficient intake processes, outdated systems, and limited resident technology adoption as key barriers in affordable housing. Compliance is critical but overly manual, and CareGuide is not meeting NCR's needs. The desired future state requires: A modernized CareGuide system integrated with Yardi and service coordinator workflows, automated compliance and intake processes to reduce manual burden, accurate reliable data collection to support national operations and donor transparency, expanded resident technology access (online payments, affordable internet) to meet the expectations of younger seniors. Sonya's vision is to run a tight, efficient, and modern housing operation that preserves properties, ensures compliance, and leverages data to improve resident experience, organizational efficiency, and donor confidence."
  },
  {
    id: "adam-axcell",
    name: "Adam Axcell",
    title: "Senior Vice President, Chief Strategy and Growth Officer",
    area: "Strategy & Growth",
    accent: "sky",
    background: "Sales & Marketing, Public Policy, M&A Strategy, Technology; 1 year 8 months at NCR; healthcare professional",
    challenges: [
      {
        title: "Organizational Fragmentation",
        items: [
          "NCR grew with a siloed mentality across Affordable Housing, Senior Housing, Senior Living (16 communities), Senior Services (value-based care), Real Estate Development, and Foundations",
          "Systems are antiquated; unclear how to migrate data onto modern platforms",
          "Data does not flow across the company as it should, limiting visibility and efficiency",
          "Culture is struggling to keep pace with rapid change; leadership may need to slow down transformation"
        ]
      },
      {
        title: "Data & Monetization Gaps",
        items: [
          "Large volumes of patient and resident data exist but have not been monetized",
          "No clear governance process; data security and compliance are not yet standardized",
          "Must pass Medicaid and Medicare audits by June, requiring stronger governance"
        ]
      },
      {
        title: "CareGuide Update Needed",
        items: [
          "Legacy CareGuide system requires modernization and integration into the broader tech stack"
        ]
      }
    ],
    techStack: [
      { name: "Microsoft Elevate", description: "Strategic relationship to update tech stack and gain access to foundation funding" },
      { name: "Azure & Microsoft Fabric", description: "Migration underway to enable unified data storage and governance" },
      { name: "Power BI", description: "New partner for advanced analytics and reporting; expected to provide unprecedented data access" },
      { name: "Yardi", description: "Affordable housing platform; should be leveraged as a competitive advantage" },
      { name: "GraceWorks", description: "Planning to sell NCR 700 systems, adding complexity to integration" }
    ],
    wants: [
      {
        title: "Competitive Tech Stack",
        items: [
          "Build a technology infrastructure that provides NCR with a competitive advantage in housing, healthcare, and services",
          "Overlay tech stack across affordable housing facilities (50 managed properties) and senior living communities"
        ]
      },
      {
        title: "Data Governance & Flow",
        items: [
          "Launching a data governance project to understand and standardize how data flows through the organization",
          "Secure data, develop governance processes, and ensure compliance with audits"
        ]
      },
      {
        title: "Value-Based Care Integration",
        items: [
          "Roll up value-based care programs and share savings with third-party partners",
          "Use services to acquire patients while delivering care, aligning with Medicare's shared savings model"
        ]
      },
      {
        title: "Strategic Growth & Alignment",
        items: [
          "Align divisions under a three-year roadmap toward consolidation",
          "Position NCR as a thought leader in affordable housing, senior living, and value-based care",
          "Explore acquisition strategies in HUD spaces despite nonprofit constraints"
        ]
      }
    ],
    observations: [
      "Member of the Vision Task Force guiding sales/marketing, public policy, M&A strategy, and technology",
      "Leadership roles: Matt builds, Sonya Brown runs affordable housing, Adam overlays the tech stack across divisions",
      "NCR grew up as a real estate company, now expanded into housing, healthcare, and services",
      "Technology adoption (Azure, Fabric, Power BI) is central to future growth",
      "Current state of change makes adoption of advanced platforms like Futuria premature"
    ],
    summaryInsight: "Adam's perspective highlights deep fragmentation, antiquated systems, and unmonetized data as core barriers to growth. NCR is in a fluid adjustment period where culture and infrastructure cannot keep pace with strategic ambitions. The desired future state requires: A competitive tech stack that unifies housing, healthcare, services, and development; strong data governance to secure information, pass audits, and enable monetization; integration of value-based care with shared savings models; consolidation roadmap to align divisions under one enterprise vision; strategic partnerships (Microsoft Elevate, GraceWorks, Power BI) leveraged to accelerate transformation. Adam's role is to overlay technology as a growth enabler, positioning NCR as a thought leader in affordable housing, senior living, and value-based care while building a sustainable competitive advantage."
  },
  {
    id: "joanna-freeman",
    name: "JoAnna Freeman",
    title: "Grants Manager",
    area: "Grants Management",
    accent: "olive",
    background: "Grants management strategy specialist focused on streamlining grant operations and reporting",
    challenges: [
      {
        title: "Fragmented Information",
        items: [
          "Reliance on anecdotal stories; no structured process to collect impact narratives",
          "Old grants stored only in Excel and paper files, making reporting slow and error-prone",
          "No unified visibility across teams—Marketing, Foundation, Affordable Housing, Development, and Services often contact the same external organizations without coordination"
        ]
      },
      {
        title: "System & Workflow Inefficiency",
        items: [
          "Workday does not integrate with Instrumentl; data must be exported to CSV and manually uploaded",
          "Workday is cumbersome, requiring extensive navigation and long page reads",
          "Grant management involves excessive manual work (narratives, reporting, purchase requests, receipt uploads)",
          "Outstanding invoices and credit card transactions do not appear on Workday gift tags, creating inaccurate financial visibility"
        ]
      },
      {
        title: "Lack of Insight & Reporting",
        items: [
          "No dashboard to view overall grant pipeline, submission progress, approvals vs. denials, or individual grant status",
          "Cannot easily track grant expenses or see available balances",
          "Limited ability to research organizations efficiently due to lack of integrated tools and time constraints"
        ]
      },
      {
        title: "Relationship & Fundraising Conflicts",
        items: [
          "Cannibalization: multiple staff unknowingly ask the same funder for support",
          "Different divisions pursue fundraising independently, creating a confusing external message",
          "No central system showing who has contacted whom, when, and for what purpose"
        ]
      }
    ],
    techStack: [
      { name: "Instrumentl", description: "Well-liked and used since April; helps find and track grants but remains highly manual" },
      { name: "Workday", description: "Holds all financial data including gift tags; poor user experience, lacks dashboards, no integration with grant systems" },
      { name: "GuideStar", description: "Used for research" },
      { name: "Microsoft Copilot", description: "Approved tool but not yet leveraged" }
    ],
    wants: [
      {
        title: "Grant Team Needs",
        items: [
          "Full grants dashboard showing pipeline stages, submissions, approvals/denials, life cycle progress, real-time spend vs. budgets",
          "Accurate expense tracking with visibility into all affecting balances",
          "Relationship intelligence to identify board connections, previous giving history, and engagement 'sweet spots'",
          "Structured, automated narrative and compliance reporting"
        ]
      },
      {
        title: "Grantee Portal Requirements",
        items: [
          "Grantees log in to view grant terms, conditions, and remaining balance",
          "Guided expense submission with receipt uploads",
          "Structured reporting questionnaires",
          "Automated reminders and deadline visibility"
        ]
      },
      {
        title: "Organizational Alignment",
        items: [
          "One shared system showing who is talking to which external organization, when, and for what purpose",
          "Centralized view across grants, individual donors, government grants, HUD funding, and property-specific requests",
          "Monday-style pipeline dashboard"
        ]
      }
    ],
    observations: [
      "Expensing for grants is intertwined with Workday's financial workflows, creating friction",
      "Purchases for grant-related items require manual processing",
      "Weekly Workday gift tag reports do not reflect true available funds because unpaid items are invisible",
      "Significant opportunity exists to centralize and modernize grant operations"
    ],
    summaryInsight: "JoAnna's perspective highlights a fragmented ecosystem where systems don't talk to each other, teams lack visibility, and grant-related work is manual, repetitive, and error-prone. The desired future state is an integrated, automated, relationship-aware grants command center that streamlines financial tracking and reporting, provides structured grantee interactions through a portal, centralizes organizational visibility to avoid duplication and conflicts, and enables proactive, intelligence-driven grant management."
  },
  {
    id: "donna-tabbah",
    name: "Donna Tabbah",
    title: "Foundations Coordinator",
    area: "Foundations & Donor Relations",
    accent: "coral",
    background: "Foundations and donor relations strategy specialist managing volunteer coordination and donor acknowledgments",
    challenges: [
      {
        title: "Volunteer Experience Difficulties",
        items: [
          "Information on company volunteer requirements must be manually gathered from websites",
          "Data is often incomplete or unclear, leading to frustration and wasted effort",
          "No centralized record of volunteer group requirements; repetitive conversations occur"
        ]
      },
      {
        title: "Donor Acknowledgment Challenges",
        items: [
          "Letters must be personalized to each donor's specific giving purpose",
          "High volume: ~200 letters per month plus three mailings per week",
          "Many donors are seniors who require physical copies",
          "Current process is labor-intensive and not automated"
        ]
      },
      {
        title: "Wishlist Inefficiencies",
        items: [
          "Amazon wishlists are managed manually and are extremely time-consuming",
          "No centralized system for communities to manage or publish wishlists"
        ]
      },
      {
        title: "Data Quality & Reporting Issues",
        items: [
          "Current system usage is reactive rather than intentional",
          "Raiser's Edge is underutilized due to limited training and expertise",
          "990 reports are sometimes incorrect due to improper categorization of in-kind donations",
          "Donations in Raiser's Edge and Workday must be manually reconciled due to monthly sync"
        ]
      }
    ],
    techStack: [
      { name: "Raiser's Edge (Blackbaud)", description: "Used for donor and gift management; underutilized due to limited training. Syncs manually with Workday once per month" },
      { name: "Workday", description: "Accounting system of record; requires manual alignment with Raiser's Edge data" },
      { name: "ChatGPT/Microsoft Copilot", description: "Used personally but not fully integrated into workflows" }
    ],
    wants: [
      {
        title: "Volunteer & Corporate Partner Needs",
        items: [
          "Centralized database of company volunteer requirements",
          "Automatic extraction of information from websites",
          "Notes from prior engagements stored in a structured, searchable record"
        ]
      },
      {
        title: "Donor Acknowledgment Automation",
        items: [
          "Personalized, purpose-specific donor letters generated automatically",
          "Integration with Raiser's Edge to tie letters directly to giving data",
          "Support for printing physical copies for senior donors"
        ]
      },
      {
        title: "Wishlist Modernization",
        items: [
          "Centralized Community Wishlist Hub where each community manages its own list",
          "Automatic branded public pages for each community",
          "Aggregated directory of wishlists for donors and corporate partners",
          "Integration with Amazon Charity Lists or Gooddler"
        ]
      },
      {
        title: "Reporting & Compliance Improvements",
        items: [
          "More rigorous tracking of in-kind donations",
          "Structured categories for donated goods within CRM",
          "Improved accuracy of 990 reporting"
        ]
      }
    ],
    observations: [
      "Donor lapses (e.g., annual appeal drop-offs) are not proactively tracked",
      "Many operational delays stem from manual tasks that could be automated",
      "Strong donor loyalty exists, especially among seniors who require consistent physical communication",
      "Volunteer strategy would benefit from an internal intelligence layer summarizing corporate interests"
    ],
    summaryInsight: "Donna's perspective highlights manual, repetitive processes across donor acknowledgments, volunteer management, wishlist coordination, and data reporting. The desired future state is a centralized, automated, intelligence-driven system that simplifies donor communication, tracks corporate volunteer preferences, creates self-managed community wishlists, ensures accurate compliance reporting, and uses Raiser's Edge and Workday proactively instead of reactively."
  },
  {
    id: "jake-swint",
    name: "Jake Swint",
    title: "VP Strategic Growth and Operations Support",
    area: "Strategy & Operations",
    accent: "orange",
    background: "Strategy and operations support covering healthcare operations, billing, patient engagement, and talent acquisition",
    challenges: [
      {
        title: "Manual Processes",
        items: [
          "Intake decisions rely on judgment calls rather than standardized workflows",
          "Heavy reliance on paper, fax, and printed documents",
          "Batch file transfers and manual audits slow down operations"
        ]
      },
      {
        title: "Billing & Outsourcing Costs",
        items: [
          "NCR pays around $1M annually to home health and hospice vendors for billing",
          "Outsourcing costs approach $1M, not including in-house expenses"
        ]
      },
      {
        title: "Talent Acquisition & Occupancy",
        items: [
          "Recruitment pipeline is slow, delaying onboarding of critical staff",
          "Occupancy issue: demand exists, but response times to inquiries are days or weeks instead of hours"
        ]
      },
      {
        title: "Accounts Payable Inefficiency",
        items: [
          "AP relies on physical check printing",
          "Hundreds of checks are mailed manually, creating inefficiency and risk"
        ]
      }
    ],
    techStack: [
      { name: "Paper-based systems", description: "Primarily paper-based and manual systems" },
      { name: "Fax machines", description: "Batch file transfers and check printers dominate workflows" },
      { name: "Limited automation", description: "Little integration with modern platforms" }
    ],
    wants: [
      {
        title: "Visibility & Process Mapping",
        items: [
          "Full transparency into intake workflows",
          "Map data and processes to identify inefficiencies",
          "Deploy intelligent agents to represent entire departments and interact across functions"
        ]
      },
      {
        title: "Automation & Scheduling",
        items: [
          "Automated scheduling for clinicians to reduce manual coordination",
          "Streamlined intake decisions supported by AI agents rather than human judgment alone"
        ]
      },
      {
        title: "Patient Engagement",
        items: [
          "Improved communication and faster response times",
          "Digital tools to enhance patient experience and reduce delays"
        ]
      }
    ],
    observations: [
      "Current operations are fragmented and inefficient, with high reliance on manual processes and outsourcing",
      "Billing and AP represent immediate opportunities for automation and cost savings",
      "Occupancy challenges stem from slow response times, not lack of demand",
      "Jake's vision emphasizes visibility, automation, and intelligent agents as the foundation for operational transformation"
    ],
    summaryInsight: "Jake's perspective highlights manual processes, outsourcing costs, and slow response times as core barriers to operational efficiency. NCR's current reliance on paper, fax, and physical checks creates unnecessary expense and risk. The desired future state requires tremendous visibility into workflows and data, intelligent agents to streamline intake and cross-departmental interactions, automated scheduling for clinicians, and improved patient engagement tools to accelerate response times."
  },
  {
    id: "julie-worley",
    name: "Julie Worley",
    title: "Chief Legal Officer",
    area: "Legal & Governance",
    accent: "tealDark",
    background: "Legal and governance strategy overseeing 1,100+ legal entities with focus on compliance and data governance",
    challenges: [
      {
        title: "System Fragmentation",
        items: [
          "Numerous homegrown systems across the organization that do not communicate with one another",
          "No unified data pool; information lives in silos with no shared visibility",
          "Current fragmentation creates operational friction despite Mark Miller's multi-year integration plan"
        ]
      },
      {
        title: "Manual, Inefficient Workflows",
        items: [
          "Gift processing is manual with no automation",
          "Thank-you letters are manually generated and physically mailed",
          "Volunteer event coordination is manual (e.g., SignUpGenius pages)",
          "Signup workflows are not standardized or integrated with internal databases"
        ]
      },
      {
        title: "Information Hoarding",
        items: [
          "Employees hold onto information due to protectiveness or uncertainty about data use",
          "This obstructs cross-team collaboration and prevents a unified understanding of partners, donors, and activities"
        ]
      },
      {
        title: "Regulatory & Structural Complexity",
        items: [
          "Over 1,100 legal entities require tracking and coordination",
          "Heavy compliance restrictions (HIPAA, substance-use protections) limit data sharing",
          "Peer organizations achieve higher collaboration and transparency despite similar constraints"
        ]
      }
    ],
    techStack: [
      { name: "Homegrown Database", description: "Outdated; modernization is on Mark Miller's roadmap" },
      { name: "PointClickCare", description: "EHR system for senior living, skilled nursing, assisted living, and home health" },
      { name: "AthenaHealth", description: "Used for palliative care" },
      { name: "SignUpGenius", description: "Used manually for volunteer events and coordination" },
      { name: "Microsoft Copilot", description: "Only approved AI tool" }
    ],
    wants: [
      {
        title: "System Integration & Unified Data",
        items: [
          "Connected environment where clinical, housing, volunteer, donor, and legal systems talk to each other",
          "Centralized database for corporate entities (1,100+), legal documentation, and project tracking",
          "Unified data pool across business lines while respecting HIPAA and privacy constraints"
        ]
      },
      {
        title: "Automation of Manual Processes",
        items: [
          "Automated thank-you letters generated by AI (Copilot), tailored to gifts, mailed or emailed automatically",
          "Automated volunteer-event workflows: sign-up creation, participation tracking, and integration with organizational systems"
        ]
      },
      {
        title: "AI Governance & Safe Adoption",
        items: [
          "Clear policies defining approved AI tools, data upload rules, and IT vetting requirements",
          "Human review required for AI outputs",
          "AI used intentionally for innovation, not informally or haphazardly"
        ]
      },
      {
        title: "Social Determinants of Health (SDOH) Intelligence",
        items: [
          "Cross-department data layer to identify resident-level activities",
          "Highlight gaps in care or support",
          "Enable cross-marketing and cross-service efforts",
          "Unified understanding of each resident across medical, housing, and services"
        ]
      }
    ],
    observations: [
      "No direct pain points in philanthropy, but upstream problems stem from disconnected systems",
      "Legal oversight of 1,100 entities creates significant data/document management burdens",
      "A central project log would support compliance, transparency, and coordination",
      "Data integration is as much a cultural challenge (information hoarding) as a technical one",
      "NCR lags behind peers in collaboration and data-sharing sophistication"
    ],
    summaryInsight: "Julie's perspective highlights NCR's foundational challenge: system fragmentation and data isolation. Manual processes, inconsistent data governance, and a culture of information protection hinder efficiency and compliance. The future state requires a unified data backbone, automated workflows, standardized AI governance, a centralized legal/corporate entity system, and cross-functional collaboration aligned with Mark Miller's data-link strategy."
  },
  {
    id: "briana-mettlet",
    name: "Briana Mettlet",
    title: "SVP of Senior Living Facilities",
    area: "Health Services & Senior Living",
    accent: "skyDark",
    background: "20 years of experience in senior services; leads senior living operations",
    challenges: [
      {
        title: "Information Requests & Visibility",
        items: [
          "Constant demand for stories, statistics, and analysis from external stakeholders",
          "Limited ability to package and present data in a compelling, donor-facing way"
        ]
      },
      {
        title: "Operational Inefficiencies",
        items: [
          "Back-office intake for home health is tedious: 4 staff manually process insurance documents and Medicare Advantage plans",
          "Manual reporting of capital expenses for each property",
          "Employment and agency billing systems not standardized; need urgent setup in Workday"
        ]
      },
      {
        title: "Data & Reporting Gaps",
        items: [
          "Relies on daily census report (Dapper report) for occupancy",
          "Monday morning report tracks incoming funds, restrictions, and project notes, but lacks automation",
          "No streamlined way to thank donors or view gifts tied to projects"
        ]
      },
      {
        title: "Philanthropy & Program Development",
        items: [
          "Hospice identified as a major area for philanthropic growth",
          "Wellness programs are a huge opportunity since insurance does not cover them",
          "Senior living philanthropy is harder to position because residents may already have funds"
        ]
      }
    ],
    techStack: [
      { name: "Athena", description: "Clinical system" },
      { name: "Power BI", description: "Reporting tool; data rolls up to Workday" },
      { name: "Workday", description: "Financial and operational backbone under Mark Miller" },
      { name: "Thrivent X", description: "Grades resident satisfaction, employee satisfaction, and polity" },
      { name: "Dax Copilot", description: "Needed for efficiency in intake and reporting" }
    ],
    wants: [
      {
        title: "System Integration & Automation",
        items: [
          "Intake and agency billing processes automated in Workday",
          "Capital expense tracking streamlined in Workday",
          "Automated donor acknowledgment tied to financial and project data"
        ]
      },
      {
        title: "Data & Analytics",
        items: [
          "Enhanced Power BI dashboards for occupancy, financials, and satisfaction metrics",
          "Unified reporting across housing, healthcare, and senior living",
          "Ability to share revenue insights back across divisions"
        ]
      },
      {
        title: "Philanthropy & Storytelling",
        items: [
          "Clear narrative combining housing, program support, healthcare, home health, assisted living, and rehab",
          "Storytelling framework to raise funds by showing holistic impact",
          "Position hospice and wellness programs as philanthropic priorities"
        ]
      },
      {
        title: "Collaboration & Alignment",
        items: [
          "Better coordination between Karla and Briana to unify housing and healthcare strategies",
          "Integration of senior services and senior living, with senior care layered on top"
        ]
      }
    ],
    observations: [
      "NCR is the largest nonprofit provider of affordable housing in the nation, and the largest in central Ohio for senior housing",
      "Shawn Shields (new hire) will handle parent financials",
      "Data analytics team leads Thrivent X and reporting initiatives",
      "Affordable housing philanthropy is easier to position; senior living requires more nuanced messaging"
    ],
    summaryInsight: "Briana's perspective highlights operational inefficiencies, fragmented reporting, and untapped philanthropic opportunities in hospice and wellness. The desired future state requires automated intake, billing, and capital expense tracking in Workday, unified reporting through Power BI and Workday integration, a compelling narrative that combines housing, healthcare, and senior living into one holistic story, and stronger collaboration between housing and healthcare leadership."
  },
  {
    id: "susan-dimickele",
    name: "Susan DiMickele",
    title: "President and CEO",
    area: "AI Strategy & Future Growth",
    accent: "lime",
    background: "Executive leadership driving AI strategy and organizational transformation for 25,000 residents",
    challenges: [
      {
        title: "Housing Qualification Confusion",
        items: [
          "Older adults and families don't know what type of housing they qualify for"
        ]
      },
      {
        title: "Data Inefficiency",
        items: [
          "Information is anecdotal, voluntary, and stored in an outdated CareGuide",
          "Service coordinators input data manually, often with errors",
          "NCR relies on industry data but lacks NCR-specific resident data"
        ]
      },
      {
        title: "Workflow Inefficiencies",
        items: [
          "Processes for research, assembling documents, and daily coordination are not streamlined"
        ]
      }
    ],
    techStack: [
      { name: "JourneyGuide", description: "Financial planning and housing qualification support" },
      { name: "At Your Door Visiting Healthcare Services", description: "Onsite medical and primary care for assisted living, independent living, skilled nursing, memory care, and group homes" }
    ],
    wants: [
      {
        title: "Data Modernization",
        items: [
          "Automate data retrieval and replace antiquated CareGuide with an AI-powered platform",
          "Capture NCR-specific resident data to measure outcomes"
        ]
      },
      {
        title: "Family Guidance",
        items: [
          "Provide a comprehensive, trusted guide tailored to NCR housing qualifications"
        ]
      },
      {
        title: "Workflow Automation",
        items: [
          "Streamline processes for research, documentation, and daily task management",
          "Deliver personalized daily action items to service coordinators"
        ]
      },
      {
        title: "Outcome Tracking",
        items: [
          "Measure health improvements, depression reduction, and loneliness metrics",
          "Communicate improvements clearly: 'NCR improves in X ways by doing X'",
          "Position AI as a tool to free people up, not replace them"
        ]
      }
    ],
    observations: [
      "Scale: 25,000 residents served",
      "Financial ROI: $50,000 savings per resident potential",
      "Health Outcomes: Better health, reduced depression, improved loneliness metrics",
      "Donor Engagement: Transparent ROI reporting tied to measurable outcomes",
      "Community Impact: Older adults living in NCR communities experience better outcomes than those outside"
    ],
    summaryInsight: "Susan's vision is to redesign CareGuide into a dynamic, AI-powered platform, enable outcome-driven reporting for donors and stakeholders, demonstrate ROI through savings, health outcomes, and quality-of-life improvements, and position NCR as a leader in housing and healthcare outcomes for older adults. The opportunity is to transform NCR into a data-driven, AI-enabled organization that can prove its impact at scale."
  },
  {
    id: "chel-kissler",
    name: "Chel Kissler",
    title: "Event Manager (Contractor)",
    area: "Events & Branding",
    accent: "coralDark",
    background: "Contractor managing NCR's major annual golf event and national conference; oversees branding",
    challenges: [
      {
        title: "Information Management & Workflow Inefficiency",
        items: [
          "80% of the job is manually tracking people and information",
          "Reliance on multiple spreadsheets and disconnected documents",
          "Tracking is repetitive, error-prone, and inefficient",
          "Communications across teams are weaker than they should be"
        ]
      },
      {
        title: "Organizational Visibility & Structure Issues",
        items: [
          "No unified place to view organizational structure, roles, and functions",
          "Staff 'live in a vacuum' instead of sharing information and working as a community",
          "Lack of a centralized knowledge hub to understand responsibilities and internal capabilities"
        ]
      },
      {
        title: "Event Management Limitations",
        items: [
          "Golf event registration and reporting are entirely manual",
          "Sponsorship pricing is under-optimized ($10,000 per foursome considered underpriced)",
          "Sponsorship tiers do not drive competition or maximize revenue",
          "Foursomes often sell out before higher sponsorship tiers are reached",
          "No visibility into who is actually in each foursome"
        ]
      },
      {
        title: "Strategic Alignment & Fundraising Culture",
        items: [
          "Incentives are not tied to organizational goals",
          "No framework to guide pricing or sponsorship tiers",
          "Brand alignment opportunities are underutilized"
        ]
      }
    ],
    techStack: [
      { name: "Adobe Suite", description: "Used for branding and design" },
      { name: "No dedicated event system", description: "No dedicated event management system for golf events or national conference" },
      { name: "GolfStatus (recommended)", description: "Would automate golf registration, foursome tracking, sponsorship tiers, digital scoring" }
    ],
    wants: [
      {
        title: "Golf Event Modernization",
        items: [
          "Streamlined, automated golf registration and management system",
          "Centralized registration for players, sponsors, vendors, and foursomes",
          "Tiered sponsorship levels with pricing that drives competition",
          "Integration with donor CRM to tie invitations and vendor communications to historical giving"
        ]
      },
      {
        title: "Organizational Knowledge Hub",
        items: [
          "Centralized, searchable space showing org chart, department functions, staff responsibilities, and contact information",
          "Tool to reduce the 'vacuum' effect and increase cross-team collaboration"
        ]
      },
      {
        title: "Improved Communication & Data Use",
        items: [
          "Communications tied to centralized data, not individual spreadsheets",
          "Automated updates for vendors, sponsors, and participants",
          "Better cross-team coordination for events and fundraising"
        ]
      }
    ],
    observations: [
      "Coordinates NCR's major annual golf event and national conference",
      "Works with 200-300 vendors, seeing untapped value in brand alignment and sponsor visibility",
      "Believes NCR's brand value increases when vendors associate with a high-impact nonprofit",
      "Identifies four pillars NCR must strengthen: fundraising, awareness, culture, stewardship"
    ],
    summaryInsight: "Chel's perspective highlights manual tracking, weak communication, and under-optimized sponsorship structures as barriers to effective event management. The desired future state requires a modern, automated event-management platform, strategic sponsorship structures that maximize competition and revenue, clear org-wide visibility through a centralized knowledge hub, and unified communications tied to a shared data source."
  },
  {
    id: "mark-miller",
    name: "Mark Miller",
    title: "VP of Information Technology",
    area: "IT Strategy & Modernization",
    accent: "sky",
    background: "Leading IT modernization and data strategy; building internal capability after outsourcing to MSP",
    challenges: [
      {
        title: "Application Overlap & Silos",
        items: [
          "Multiple groups use apps that do the same thing in different, unlinked ways",
          "Heavy reliance on spreadsheets; systems are unorganized and fragmented",
          "Lack of adoption training across platforms"
        ]
      },
      {
        title: "Data & Reporting Gaps",
        items: [
          "BI team has current data but not full visibility",
          "Data remains siloed across Yardi, Workday, and custom apps"
        ]
      },
      {
        title: "Legacy Systems",
        items: [
          "3-5 business-critical custom apps are dated",
          "CareGuide is a legacy application still in use",
          "Centralized EHR strategy is unclear; multiple platforms in use"
        ]
      },
      {
        title: "Analysis Needs",
        items: [
          "Significant analysis required over the next few years to consolidate and modernize"
        ]
      }
    ],
    techStack: [
      { name: "Workday", description: "Long-term platform for HR, messaging, lifestyle management" },
      { name: "Yardi", description: "Property management, accounting, HUD/LIHTC compliance, resident management" },
      { name: "MFiles", description: "Document management" },
      { name: "Mango Apps", description: "Current intranet, messaging, collaboration" },
      { name: "Blueworks", description: "Process mapping, workflow documentation, automation prep" },
      { name: "Microsoft Fabric/Azure", description: "Migration underway for unified data storage and governance" },
      { name: "Copilot", description: "AI productivity assistant" }
    ],
    wants: [
      {
        title: "Data & Governance",
        items: [
          "Stand up Microsoft Maverick for data migration",
          "Connect into Microsoft Elevate and BDO",
          "Store all organizational data in Microsoft Fabric's OneLake",
          "Govern and secure data with Microsoft Purview"
        ]
      },
      {
        title: "Consolidation & Standardization",
        items: [
          "Simplify and standardize the application landscape",
          "Consolidation of overlapping apps and workflows",
          "Move intranet from Mango Apps to SharePoint",
          "Complete remaining file share migrations to SharePoint"
        ]
      },
      {
        title: "EHR Strategy",
        items: [
          "Move toward a central EHR system",
          "Currently fragmented across Homecare Homebase, PointClickCare, Athena, Epic"
        ]
      },
      {
        title: "Innovation & AI",
        items: [
          "POC with Athena for AI dictation (note-taking and summarization for clinic technicians)",
          "Explore AI-driven efficiencies while maintaining security and compliance"
        ]
      }
    ],
    observations: [
      "Previously outsourced IT to MSP until 18 months ago; now building internal capability",
      "Working on POC with asset management team",
      "Emily maintains master list of applications",
      "NCR acquired At Your Door Visiting Healthcare Services, expanding healthcare footprint",
      "Technology adoption (Azure, Fabric, Power BI) is central to future growth"
    ],
    summaryInsight: "Mark's perspective highlights application overlap, siloed data, and legacy systems as core barriers to IT efficiency. The desired future state requires unified data through Microsoft Fabric OneLake, governed by Purview, with standardized applications, consolidated EHR, and AI-driven innovation. His role is to modernize NCR's tech stack, reduce duplication, and enable data-driven decision-making across the enterprise."
  },
  {
    id: "suzan-nocella",
    name: "Suzan Nocella",
    title: "Director of Annual Giving",
    area: "Annual Giving",
    accent: "coral",
    background: "14-15 years with the foundation team; focused on annual giving strategy and donor communications",
    challenges: [
      {
        title: "Information Access & Reliance",
        items: [
          "Must rely on sales and marketing team for resident information, which may be incomplete",
          "Information often stored in her head instead of Raiser's Edge due to system inefficiency",
          "Board members and leadership lack clarity on messaging and processes"
        ]
      },
      {
        title: "Campaign & Communication Limitations",
        items: [
          "No infrastructure to build campaigns; limited time for research and development",
          "Writing donor communications takes significant time; AI could help refine",
          "No unified message across the organization; inconsistent language and presentation",
          "Leadership communication often bypasses legal review, creating risk"
        ]
      },
      {
        title: "Donor Engagement Gaps",
        items: [
          "No acquisition strategy for fundraising; no new prospecting",
          "Current fundraising relies only on resident donors giving to their own communities",
          "Leads from prospective donors/residents are not captured or assigned",
          "Time is disproportionately spent on low-value donors instead of targeted high-net-worth prospects"
        ]
      },
      {
        title: "Organizational Inefficiency",
        items: [
          "Mapping of onramps and touchpoints is unclear; requests bounce between leaders",
          "Leadership lacks education on proper communication channels and ownership",
          "Processes are overly complex, leading to delays and miscommunication"
        ]
      }
    ],
    techStack: [
      { name: "WealthEngine", description: "Not found helpful; not embraced or utilized" },
      { name: "Raiser's Edge", description: "Used for donor management but cumbersome and underutilized" },
      { name: "iWave", description: "Donor-prospecting and wealth-screening platform; potential tool for identifying major-gift prospects" }
    ],
    wants: [
      {
        title: "Donor Intelligence & Funnel Development",
        items: [
          "Funnel for 'getting to know donors' section",
          "AI-assisted donor insights without intrusiveness or confidentiality risks",
          "Voice memo tool to capture donor notes directly into database for easy retrieval"
        ]
      },
      {
        title: "Campaign & Communication Support",
        items: [
          "AI to refine and generate holiday appeals, campaigns, and year-round communications",
          "Unified messaging across the organization—consistent language and presentation",
          "Clear company lines for presenting NCR externally"
        ]
      },
      {
        title: "Strategic Planning",
        items: [
          "Strategic plan for each community",
          "Mapping exercise to define organizational touchpoints and communication pathways",
          "Education for leadership to simplify processes and reduce misrouting of information"
        ]
      },
      {
        title: "Fundraising Growth",
        items: [
          "Acquisition strategy for new donors and prospects",
          "Redeployment of staff to focus on targeted, high-value donor funnels",
          "Shift away from reliance solely on resident donors"
        ]
      }
    ],
    observations: [
      "Has never directly asked for a gift, though residents trust her to execute fundraising",
      "Current fundraising success is tied only to residents giving to their own communities",
      "Significant untapped potential exists in prospecting and acquisition strategies",
      "Donor groups include general population donors (unknown), resident donors (high-net-worth seniors), and growing base of new community members"
    ],
    summaryInsight: "Suzan's perspective highlights gaps in donor acquisition, campaign infrastructure, and unified messaging. Current fundraising relies too heavily on resident donors, with no strategy for new prospects. The desired future state requires AI-driven donor intelligence and communication support, a unified organizational message and streamlined communication pathways, strategic plans for each community, a clear acquisition strategy, and redeployment of staff toward targeted, high-value donor funnels."
  },
  {
    id: "sean-alexander",
    name: "Sean Alexander",
    title: "Senior VP and CFO",
    area: "Financial Strategy",
    accent: "oliveDark",
    background: "Financial strategy and enterprise visibility; overseeing 350 properties with audited P&Ls",
    challenges: [
      {
        title: "Data & Reporting Inefficiency",
        items: [
          "Loading Excel files is highly inefficient; monthly manual population from Yardi for 350 properties",
          "Bond documents require summarization with property-level detail for senior living",
          "No consolidated P&L; financials only consolidated at a very high level",
          "Discrepancies in counting: some items recorded before parent consolidation, leading to double counting (~80%)"
        ]
      },
      {
        title: "Enterprise Expense Visibility",
        items: [
          "Limited visibility into enterprise-wide expenses",
          "Marketing does not provide adequate financial information",
          "Business Intelligence team lacks true data access; 'BI' name is misleading"
        ]
      },
      {
        title: "Resident & Service Data Gaps",
        items: [
          "Data sits across multiple systems but is not used effectively",
          "Marketing holds resident and facility-specific information, but it is siloed",
          "No clear aggregation of resident data (HIPAA-limited)"
        ]
      }
    ],
    techStack: [
      { name: "Excel", description: "Heavy reliance for property-level P&L reporting" },
      { name: "Workday", description: "Enterprise system of record; difficult to access, not fully utilized" },
      { name: "Yardi", description: "Affordable housing platform; source of monthly property P&Ls" },
      { name: "CID (Community Information Document)", description: "Official property profile for affordable housing (regulatory, financial, operational, compliance)" }
    ],
    wants: [
      {
        title: "Audits & Taxes",
        items: [
          "Automated site-level audits and tax checks with error-free scanning"
        ]
      },
      {
        title: "Data Aggregation & Visibility",
        items: [
          "Resident data aggregation (HIPAA-compliant) to understand demographics and sources",
          "Consolidated P&L across communities and parent entity",
          "Clear enterprise expense visibility"
        ]
      },
      {
        title: "Financial Reporting Improvements",
        items: [
          "Property-level detail tied to bond documents",
          "Automated dashboards for consolidated and community-level reporting",
          "Eliminate double counting in parent consolidation"
        ]
      },
      {
        title: "Donor & Patient Acquisition Insights",
        items: [
          "Ability to calculate donor acquisition costs",
          "Value-based care tracking: patient profiles, cost benchmarks, and savings opportunities",
          "Services leveraged to acquire new patients while delivering care"
        ]
      }
    ],
    observations: [
      "350 properties each have audited P&Ls that drive headcount",
      "Information exists in multiple systems but is underutilized",
      "Marketing controls resident and facility data but does not share effectively",
      "Value-based care model offers opportunity: lowering patient costs allows shared savings with Medicare",
      "Financial systems and reporting need modernization to support growth and transparency"
    ],
    summaryInsight: "Sean's perspective highlights fragmented financial reporting, lack of consolidated visibility, and inefficient manual processes. Current reliance on Excel and siloed systems prevents NCR from answering critical financial questions. The desired future state requires automated audits and tax validation, consolidated P&Ls across communities and parent entity, resident data aggregation with HIPAA compliance, clear enterprise expense visibility, and value-based care integration to align patient outcomes with financial sustainability."
  }
];

function InterviewCard({ person, onClick }: { person: InterviewPerson; onClick: () => void }) {
  const accentColor = getAccentColor(person.accent);
  
  return (
    <Card 
      className="overflow-hidden hover-elevate cursor-pointer transition-all h-full flex flex-col border-l-4"
      style={{ borderLeftColor: accentColor }}
      data-testid={`card-interview-${person.id}`}
      onClick={onClick}
    >
      <div 
        className="p-6"
        style={{ backgroundColor: `${accentColor}15` }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0"
            style={{ backgroundColor: accentColor }}
          >
            {person.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <h3 
              className="font-bold text-base truncate"
              style={{ color: accentColor }}
              data-testid={`text-interview-name-${person.id}`}
            >
              {person.name}
            </h3>
            <p className="text-xs text-muted-foreground truncate">{person.title}</p>
          </div>
        </div>
        <Badge 
          variant="outline" 
          className="text-xs"
          style={{ borderColor: accentColor, color: accentColor }}
        >
          {person.area}
        </Badge>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div 
          className="text-xs text-muted-foreground mb-4 italic pl-3 border-l-2"
          style={{ borderLeftColor: accentColor }}
        >
          {person.background}
        </div>
        <div className="mt-auto grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-xs">
            <div 
              className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${accentColor}20` }}
            >
              <AlertTriangle className="h-3 w-3" style={{ color: accentColor }} />
            </div>
            <span className="text-muted-foreground">{person.challenges.length} challenges</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div 
              className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${accentColor}20` }}
            >
              <Sparkles className="h-3 w-3" style={{ color: accentColor }} />
            </div>
            <span className="text-muted-foreground">{person.wants.length} needs</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function InterviewDetailPage({ personId }: { personId: string }) {
  const [, navigate] = useLocation();
  const person = interviewees.find(p => p.id === personId);

  if (!person) {
    return (
      <div className="p-6">
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">Person not found</p>
          <Button className="mt-4" onClick={() => navigate("/temporary")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Interviews
          </Button>
        </Card>
      </div>
    );
  }

  const accentColor = getAccentColor(person.accent);

  return (
    <div className="p-6 space-y-6">
      <Button 
        variant="ghost" 
        className="mb-2"
        onClick={() => navigate("/temporary")}
        data-testid="button-back"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Interviews
      </Button>

      <Card className="overflow-hidden">
        <div 
          className="p-6 border-b border-l-4"
          style={{ backgroundColor: `${accentColor}10`, borderLeftColor: accentColor }}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
                style={{ backgroundColor: accentColor }}
              >
                {person.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: accentColor }}>
                  {person.name}
                </h1>
                <p className="text-base text-muted-foreground">{person.title}</p>
              </div>
            </div>
            <Badge 
              variant="outline"
              className="text-sm"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              {person.area}
            </Badge>
            <p className="text-sm text-muted-foreground italic border-l-2 pl-3" style={{ borderColor: accentColor }}>
              {person.background}
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4 items-stretch">
            <Accordion type="multiple" defaultValue={["challenges"]} className="space-y-0 h-full [&>div]:h-full">
              <AccordionItem value="challenges" className="border rounded-lg px-4 h-full flex flex-col [&>div]:last:flex-1">
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("coral")}20` }}>
                      <AlertTriangle className="h-4 w-4" style={{ color: getAccentColor("coral") }} />
                    </div>
                    <span className="font-semibold">Current Challenges</span>
                    <Badge variant="secondary" className="ml-2 text-xs">{person.challenges.length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex-1">
                  <div className="space-y-4 pb-2">
                    {person.challenges.map((challenge, idx) => (
                      <div key={idx} className="border-l-2 pl-3" style={{ borderColor: `${getAccentColor("coral")}40` }}>
                        <h4 className="font-medium text-sm mb-2">{challenge.title}</h4>
                        <ul className="space-y-1.5">
                          {challenge.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="mt-1 shrink-0" style={{ color: getAccentColor("coral") }}>&#8226;</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="multiple" defaultValue={["wants"]} className="space-y-0 h-full [&>div]:h-full">
              <AccordionItem value="wants" className="border rounded-lg px-4 h-full flex flex-col [&>div]:last:flex-1">
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("lime")}20` }}>
                      <Sparkles className="h-4 w-4" style={{ color: getAccentColor("lime") }} />
                    </div>
                    <span className="font-semibold">Desired Capabilities</span>
                    <Badge variant="secondary" className="ml-2 text-xs">{person.wants.length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex-1">
                  <div className="space-y-4 pb-2">
                    {person.wants.map((want, idx) => (
                      <div key={idx} className="border-l-2 pl-3" style={{ borderColor: `${getAccentColor("lime")}40` }}>
                        <h4 className="font-medium text-sm mb-2">{want.title}</h4>
                        <ul className="space-y-1.5">
                          {want.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="mt-1 shrink-0" style={{ color: getAccentColor("lime") }}>+</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="grid md:grid-cols-2 gap-4 items-stretch">
            <Accordion type="multiple" defaultValue={["tech"]} className="space-y-0 h-full [&>div]:h-full">
              <AccordionItem value="tech" className="border rounded-lg px-4 h-full flex flex-col [&>div]:last:flex-1">
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("sky")}20` }}>
                      <Server className="h-4 w-4" style={{ color: getAccentColor("sky") }} />
                    </div>
                    <span className="font-semibold">Tech Stack</span>
                    <Badge variant="secondary" className="ml-2 text-xs">{person.techStack.length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex-1">
                  <div className="space-y-3 pb-2">
                    {person.techStack.map((tech, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: getAccentColor("sky") }} />
                        <div>
                          <h4 className="font-medium text-sm">{tech.name}</h4>
                          <p className="text-sm text-muted-foreground mt-0.5">{tech.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="multiple" defaultValue={["observations"]} className="space-y-0 h-full [&>div]:h-full">
              <AccordionItem value="observations" className="border rounded-lg px-4 h-full flex flex-col [&>div]:last:flex-1">
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("orange")}20` }}>
                      <Users className="h-4 w-4" style={{ color: getAccentColor("orange") }} />
                    </div>
                    <span className="font-semibold">Observations</span>
                    <Badge variant="secondary" className="ml-2 text-xs">{person.observations.length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex-1">
                  <ul className="space-y-2 pb-2">
                    {person.observations.map((obs, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-1 shrink-0" style={{ color: getAccentColor("orange") }}>&#8594;</span>
                        <span>{obs}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <Accordion type="multiple" defaultValue={["summary"]} className="space-y-0">
            <AccordionItem value="summary" className="border rounded-lg px-4" style={{ backgroundColor: `${getAccentColor("teal")}08`, borderColor: `${getAccentColor("teal")}40` }}>
              <AccordionTrigger className="hover:no-underline py-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("teal")}20` }}>
                    <Building2 className="h-4 w-4" style={{ color: getAccentColor("teal") }} />
                  </div>
                  <span className="font-semibold" style={{ color: getAccentColor("teal") }}>Summary Insight</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground leading-relaxed pb-2">{person.summaryInsight}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Card>
    </div>
  );
}

function OnSiteInterviews() {
  const [, navigate] = useLocation();

  const handleCardClick = (person: InterviewPerson) => {
    navigate(`/temporary/interviews/${person.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Gradient Wash Header */}
      <div 
        className="relative overflow-hidden rounded-xl -mx-6 -mt-6 mb-2"
        style={{
          background: `linear-gradient(135deg, ${getAccentColor("olive")}15 0%, ${getAccentColor("teal")}10 50%, ${getAccentColor("sky")}05 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="relative px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("olive")}20` }}>
              <Users className="h-6 w-6" style={{ color: getAccentColor("olive") }} />
            </div>
            <h1 className="text-2xl font-bold">On Site Interviews</h1>
          </div>
          <p className="text-base text-muted-foreground">
            Key stakeholder interviews conducted at NCR. Click on any card to view detailed insights.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {interviewees.map((person) => (
          <InterviewCard 
            key={person.id} 
            person={person} 
            onClick={() => handleCardClick(person)}
          />
        ))}
      </div>
    </div>
  );
}

function TechStack() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("teal")}15` }}>
            <Layers className="h-6 w-6" style={{ color: getAccentColor("teal") }} />
          </div>
          <h1 className="text-2xl font-bold">NCR Technology Stack</h1>
        </div>
        <p className="text-base text-muted-foreground">
          Overview of software products used across NCR fundraising and operations. Click any card for details.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {techProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductDetailPage({ productId }: { productId: string }) {
  const [, navigate] = useLocation();
  const product = techProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="p-6">
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">Product not found</p>
          <Button className="mt-4" onClick={() => navigate("/temporary/tech-stack")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tech Stack
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <Button 
        variant="ghost" 
        className="mb-2"
        onClick={() => navigate("/temporary/tech-stack")}
        data-testid="button-back-tech-stack"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Tech Stack
      </Button>

      <Card>
        <div 
          className="p-6"
          style={{ backgroundColor: product.brandColorLight }}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 
                className="text-2xl font-bold mb-2"
                style={{ color: product.brandColor }}
              >
                {product.name}
              </h1>
              <Badge variant="outline" className="text-sm">
                {product.category}
              </Badge>
              <p className="text-sm text-muted-foreground mt-3">{product.tagline}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => window.open(product.website, '_blank')}
              data-testid={`button-visit-${product.id}`}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Website
            </Button>
          </div>
        </div>

        <div className="p-6 border-t">
          <h2 className="font-semibold text-lg mb-3">Overview</h2>
          <p className="text-muted-foreground">{product.description}</p>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <AccentCard accent="lime" className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Check className="h-5 w-5" style={{ color: getAccentColor("lime") }} />
            <h2 className="font-semibold text-lg">Strengths</h2>
          </div>
          <ul className="space-y-3">
            {product.strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="font-bold mt-0.5" style={{ color: getAccentColor("lime") }}>+</span>
                <span className="text-sm text-muted-foreground">{strength}</span>
              </li>
            ))}
          </ul>
        </AccentCard>

        <AccentCard accent="coral" className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <X className="h-5 w-5" style={{ color: getAccentColor("coral") }} />
            <h2 className="font-semibold text-lg">Weaknesses</h2>
          </div>
          <ul className="space-y-3">
            {product.weaknesses.map((weakness, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="font-bold mt-0.5" style={{ color: getAccentColor("coral") }}>−</span>
                <span className="text-sm text-muted-foreground">{weakness}</span>
              </li>
            ))}
          </ul>
        </AccentCard>
      </div>

      <AccentCard accent="teal" className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
          <h2 className="font-semibold text-lg" style={{ color: getAccentColor("teal") }}>NCR Context</h2>
        </div>
        <p className="text-muted-foreground">{product.ncrContext}</p>
      </AccentCard>
    </div>
  );
}

function EcosystemProductDetailPage({ productId }: { productId: string }) {
  const [, navigate] = useLocation();
  const product = techProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="p-6">
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">Product not found</p>
          <Button className="mt-4" onClick={() => navigate("/temporary/technology-categories")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tech Ecosystem
          </Button>
        </Card>
      </div>
    );
  }

  const getCategoryIcon = () => {
    const iconMap: Record<string, typeof Database> = {
      "CRM": Heart,
      "Finance": DollarSign,
      "Compliance": Shield,
      "HR & Finance": Users,
      "BI & Analytics": BarChart3,
      "Data Platform": Database,
      "Governance": Shield,
      "Grants": Target,
      "Property Management": Home,
    };
    return iconMap[product.category] || Building2;
  };
  const CategoryIcon = getCategoryIcon();

  return (
    <div className="p-6 space-y-6">
      <Button 
        variant="ghost" 
        className="mb-2"
        onClick={() => navigate("/temporary/technology-categories")}
        data-testid="button-back-ecosystem"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Tech Ecosystem
      </Button>

      <Card>
        <div 
          className="p-6"
          style={{ backgroundColor: product.brandColorLight }}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${product.brandColor}20` }}
              >
                <CategoryIcon className="w-6 h-6" style={{ color: product.brandColor }} />
              </div>
              <div>
                <h1 
                  className="text-2xl font-bold mb-2"
                  style={{ color: product.brandColor }}
                >
                  {product.name}
                </h1>
                <Badge variant="outline" className="text-sm" style={{ borderColor: product.brandColor, color: product.brandColor }}>
                  {product.category}
                </Badge>
                <p className="text-sm text-muted-foreground mt-3">{product.tagline}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => window.open(product.website, '_blank')}
              data-testid={`button-visit-${product.id}`}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Website
            </Button>
          </div>
        </div>

        <div className="p-6 border-t">
          <h2 className="font-semibold text-lg mb-3">Overview</h2>
          <p className="text-muted-foreground">{product.description}</p>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <AccentCard accent="lime" className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Check className="h-5 w-5" style={{ color: getAccentColor("lime") }} />
            <h2 className="font-semibold text-lg">Strengths</h2>
          </div>
          <ul className="space-y-3">
            {product.strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="font-bold mt-0.5" style={{ color: getAccentColor("lime") }}>+</span>
                <span className="text-sm text-muted-foreground">{strength}</span>
              </li>
            ))}
          </ul>
        </AccentCard>

        <AccentCard accent="coral" className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <X className="h-5 w-5" style={{ color: getAccentColor("coral") }} />
            <h2 className="font-semibold text-lg">Weaknesses</h2>
          </div>
          <ul className="space-y-3">
            {product.weaknesses.map((weakness, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="font-bold mt-0.5" style={{ color: getAccentColor("coral") }}>−</span>
                <span className="text-sm text-muted-foreground">{weakness}</span>
              </li>
            ))}
          </ul>
        </AccentCard>
      </div>

      <AccentCard accent="teal" className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
          <h2 className="font-semibold text-lg" style={{ color: getAccentColor("teal") }}>NCR Context</h2>
        </div>
        <p className="text-muted-foreground">{product.ncrContext}</p>
      </AccentCard>
    </div>
  );
}

interface TechComponent {
  id: string;
  name: string;
  role: string;
  icon: typeof Database;
  accent: AccentColor;
  aiHelp: string;
  appRole: string;
  owners: string[];
  steps: string[];
  timeline: string;
}

const techComponents: TechComponent[] = [
  {
    id: "fabric",
    name: "Microsoft Fabric OneLake + Purview",
    role: "Enterprise data lakehouse + governance",
    icon: Database,
    accent: "sky",
    aiHelp: "Cleans duplicates, enforces golden records, flags anomalies, ensures HIPAA/PII compliance.",
    appRole: "Integration Hub module surfaces unified records and lineage; AI queries OneLake directly.",
    owners: ["IT", "Data Governance", "Compliance"],
    steps: ["Inventory systems", "Migrate data pipelines", "Enforce Purview policies", "Set golden record rules"],
    timeline: "3–6 months phased integration"
  },
  {
    id: "powerbi",
    name: "Power BI (with Fabric datasets)",
    role: "Unified reporting and dashboards",
    icon: BarChart3,
    accent: "lime",
    aiHelp: "Embeds predictive analytics, generates outcome reports, explains anomalies.",
    appRole: "Role-based dashboards (executive, fundraising, housing, healthcare, finance).",
    owners: ["BI Team", "Finance", "Strategy"],
    steps: ["Build certified datasets", "Design dashboards", "Embed predictive overlays", "Retire Excel-driven reporting"],
    timeline: "2–4 months"
  },
  {
    id: "sharepoint",
    name: "SharePoint + Microsoft Search",
    role: "Intranet, document store, enterprise search",
    icon: FileText,
    accent: "teal",
    aiHelp: "Conversational search across policies, SOPs, filings, donor letters.",
    appRole: "Knowledge & Training Hub with wiki, contextual help, micro-learning.",
    owners: ["IT", "HR", "Legal"],
    steps: ["Migrate Mango Apps content", "Configure hubs", "Index documents", "Train staff"],
    timeline: "6–8 weeks"
  },
  {
    id: "raisersedge",
    name: "Raiser's Edge + iWave/WealthEngine",
    role: "Donor CRM + enrichment",
    icon: Heart,
    accent: "coral",
    aiHelp: "Predict donor likelihood, draft personalized communications, auto-assign leads.",
    appRole: "Donor Hub with funnel, messaging templates, acquisition tracking.",
    owners: ["Annual Giving", "Marketing", "IT CRM"],
    steps: ["Integrate enrichment tools", "Build scoring models", "Deploy voice memo capture", "Unify templates"],
    timeline: "6–8 weeks"
  },
  {
    id: "yardi",
    name: "Yardi (RightSource)",
    role: "Housing management + rent payments",
    icon: Home,
    accent: "tealDark",
    aiHelp: "Auto-validate intake data, flag compliance risks, nudge residents toward online payments.",
    appRole: "Housing Manager Portal with streamlined intake, compliance workflows, payment options.",
    owners: ["Housing Ops", "Property Managers", "IT"],
    steps: ["Standardize intake forms", "Integrate online payments", "Outreach campaigns", "Donor transparency dashboards"],
    timeline: "2–3 months"
  },
  {
    id: "athena",
    name: "AthenaHealth / Epic",
    role: "Healthcare EHR",
    icon: Heart,
    accent: "coralDark",
    aiHelp: "Auto-summarize intake, generate donor impact stories, streamline billing.",
    appRole: "Healthcare Integration Module linking EHR + Workday + Power BI.",
    owners: ["Health Services", "Finance", "IT"],
    steps: ["Map intake fields", "Build connectors", "Configure capital expense workflows", "Design dashboards"],
    timeline: "8–12 weeks"
  },
  {
    id: "workday",
    name: "Workday",
    role: "HR + Finance backbone",
    icon: Users,
    accent: "skyDark",
    aiHelp: "Predict staffing shortages, auto-generate schedules, streamline billing and expense tracking.",
    appRole: "HR Frontline Mode (mobile 3-button app) + Finance integration with P&L.",
    owners: ["HR", "Finance", "IT"],
    steps: ["Build mobile HR app", "Integrate billing with healthcare", "Harmonize chart of accounts"],
    timeline: "3–6 months"
  },
  {
    id: "instrumentl",
    name: "Instrumentl + Candid",
    role: "Grant discovery and management",
    icon: DollarSign,
    accent: "olive",
    aiHelp: "Draft narratives, prevent duplicate funder outreach, generate dashboards.",
    appRole: "Grants Workspace with pipeline, expense workflows, grantee portal.",
    owners: ["Grants", "Finance", "IT"],
    steps: ["Connect Instrumentl ↔ Workday ↔ RE", "Build pipeline Kanban", "Launch portal"],
    timeline: "10–14 weeks"
  },
  {
    id: "azure",
    name: "Azure Event Grid / Service Bus",
    role: "Real-time eventing backbone",
    icon: Zap,
    accent: "orange",
    aiHelp: "Trigger workflows (e.g., donor follow-up, compliance filing reminders, intake updates).",
    appRole: "Integration Hub uses events to keep modules in sync.",
    owners: ["IT Architecture"],
    steps: ["Configure event bus", "Define triggers", "Connect modules"],
    timeline: "6–10 weeks"
  },
  {
    id: "unified-app",
    name: "Unified App Shell (React/Power Platform)",
    role: "Modular web + mobile app",
    icon: Layout,
    accent: "limeDark",
    aiHelp: "Embedded assistants in each module, orchestrating tasks and surfacing 'next best actions.'",
    appRole: "Houses CareGuide 2.0, Grants Workspace, Donor Hub, Volunteer Hub, Compliance Dashboard, Financial Transparency, Strategy Dashboard, Housing Manager Portal.",
    owners: ["IT PMO", "Product Teams"],
    steps: ["Build modular shell", "Integrate modules", "Embed AI agents", "Pilot with 3–4 roles"],
    timeline: "6–9 months phased rollout"
  }
];

interface AgentType {
  id: string;
  name: string;
  description: string;
  icon: typeof Bot;
  accent: AccentColor;
}

const agentTypes: AgentType[] = [
  { id: "careguide", name: "CareGuide Agent", description: "Conversational intake assistant for families; validates coordinator entries; generates outcome metrics.", icon: UserCheck, accent: "lime" },
  { id: "compliance", name: "Compliance Agent", description: "Automates HUD/CMS filings, assembles evidence, enforces HIPAA/PII rules.", icon: Shield, accent: "coral" },
  { id: "document", name: "Document Agent", description: "Drafts donor letters, grant narratives, board reports, and audit bundles.", icon: FileText, accent: "sky" },
  { id: "engagement", name: "Engagement Agent", description: "Prioritizes donors, volunteers, and funders; prevents cannibalization; schedules outreach.", icon: Heart, accent: "coralDark" },
  { id: "financial", name: "Financial Agent", description: "Consolidates P&L, detects double counting, forecasts cash flow, tracks donor acquisition costs.", icon: DollarSign, accent: "olive" },
  { id: "orchestration", name: "Orchestration Agent", description: "Coordinates tasks across modules, enforces SLAs, escalates anomalies.", icon: Workflow, accent: "orange" },
  { id: "training", name: "Training Agent", description: "Provides contextual help, micro-learning, and adoption nudges inside workflows.", icon: BrainCircuit, accent: "teal" },
];

const redundanciesRemoved = [
  { old: "Multiple donor letter engines", new: "Consolidated into Document Agent + Donor/Volunteer modules" },
  { old: "Standalone predictive dashboards", new: "Embedded into Power BI role-based dashboards" },
  { old: "Duplicate volunteer tools (SignUpGenius, homegrown)", new: "Replaced by Volunteer & Engagement Hub" },
  { old: "Mango Apps intranet", new: "Migrated to SharePoint" },
  { old: "Legacy custom apps (3–5)", new: "Retired or rebuilt in Power Apps" },
  { old: "Excel-driven reporting", new: "Replaced by Fabric datasets + Power BI certified reports" },
];

function TechComponentCard({ component }: { component: TechComponent }) {
  const Icon = component.icon;

  return (
    <Link href={`/temporary/tech-component/${component.id}`}>
      <AccentCard 
        accent={component.accent} 
        className="hover-elevate cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group h-full"
        data-testid={`card-tech-component-${component.id}`}
      >
        <div className="p-4 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div 
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0 ${getAccentBgClass(component.accent)}`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base group-hover:text-primary transition-colors">{component.name}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{component.role}</p>
              <div className="mt-3 flex items-center gap-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                <span>View details</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </AccentCard>
    </Link>
  );
}

function TechComponentDetailPage({ componentId }: { componentId: string }) {
  const component = techComponents.find(c => c.id === componentId);
  
  if (!component) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Component not found.</p>
        <Link href="/temporary/optimization-ideas">
          <Button variant="ghost" className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Optimization Ideas
          </Button>
        </Link>
      </div>
    );
  }

  const Icon = component.icon;
  const accentColor = getAccentColor(component.accent);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/temporary/optimization-ideas">
          <Button variant="ghost" size="icon" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm ${getAccentBgClass(component.accent)}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{component.name}</h1>
          <p className="text-muted-foreground">{component.role}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <AccentCard accent={component.accent} className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="h-5 w-5" style={{ color: accentColor }} />
            <h4 className="font-semibold text-base" style={{ color: accentColor }}>AI Assistance</h4>
          </div>
          <p className="text-muted-foreground">{component.aiHelp}</p>
        </AccentCard>

        <AccentCard accent={component.accent} className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Layout className="h-5 w-5" style={{ color: accentColor }} />
            <h4 className="font-semibold text-base" style={{ color: accentColor }}>App Role</h4>
          </div>
          <p className="text-muted-foreground">{component.appRole}</p>
        </AccentCard>
      </div>

      <AccentCard accent={component.accent} className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5" style={{ color: accentColor }} />
          <h4 className="font-semibold text-base" style={{ color: accentColor }}>Implementation Details</h4>
        </div>
        
        <div className="mb-4">
          <p className="text-sm font-medium text-muted-foreground mb-2">Owners</p>
          <div className="flex flex-wrap gap-2">
            {component.owners.map((owner, idx) => (
              <Badge key={idx} variant="outline">{owner}</Badge>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-muted-foreground mb-2">Implementation Steps</p>
          <ul className="space-y-2">
            {component.steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-medium"
                  style={{ backgroundColor: accentColor }}
                >
                  {idx + 1}
                </div>
                <span className="text-muted-foreground pt-0.5">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm font-medium text-muted-foreground mb-2">Timeline</p>
          <Badge className={`text-white ${getAccentBgClass(component.accent)}`}>
            {component.timeline}
          </Badge>
        </div>
      </AccentCard>
    </div>
  );
}

function OptimizationIdeas() {
  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("lime")}15` }}>
          <Lightbulb className="h-6 w-6" style={{ color: getAccentColor("lime") }} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">NCR Optimized Tech Stack</h1>
          <p className="text-muted-foreground mt-1">
            A unified ecosystem where existing systems remain the source of record, Fabric + Purview unify data, AI agents handle busywork, and the app provides a single pane of glass.
          </p>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${getAccentColor("teal")}15` }}>
            <Building2 className="h-6 w-6" style={{ color: getAccentColor("teal") }} />
          </div>
          <div>
            <h4 className="font-semibold text-xl" style={{ color: getAccentColor("teal") }}>Executive Summary</h4>
            <div className="space-y-3 mt-3">
              <p className="text-base text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Tech Stack:</strong> Microsoft Fabric OneLake + Purview, Power BI, SharePoint, Raiser's Edge, Yardi, Athena/Epic, Workday, Instrumentl, Azure Event Grid, unified React/Power Platform app.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Agentic AI:</strong> Specialized agents (CareGuide, Compliance, Document, Engagement, Financial, Orchestration) embedded in each module, governed with audit trails.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                <strong className="text-foreground">App:</strong> Modular shell with 8–10 hubs (CareGuide, Grants, Donor, Volunteer, Compliance, Finance, Strategy, Housing, Healthcare, Knowledge).
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Server className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
          <h2 className="font-semibold text-lg">Technology Components</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {techComponents.map((component) => (
            <TechComponentCard key={component.id} component={component} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Bot className="h-5 w-5" style={{ color: getAccentColor("orange") }} />
          <h2 className="font-semibold text-lg">AI Agent Strategy</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {agentTypes.map((agent) => {
            const Icon = agent.icon;
            return (
              <AccentCard key={agent.id} accent={agent.accent} className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${getAccentBgClass(agent.accent)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-base">{agent.name}</h3>
                </div>
                <p className="text-base text-muted-foreground">{agent.description}</p>
              </AccentCard>
            );
          })}
        </div>

        <AccentCard accent="olive" className="mt-4 p-4">
          <h3 className="font-semibold text-base mb-4 flex items-center gap-2">
            <Workflow className="h-5 w-5" style={{ color: getAccentColor("olive") }} />
            Agent Operating Principles
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0">1</Badge>
              <p className="text-sm text-muted-foreground"><strong>Embedded in modules:</strong> Each agent lives inside its relevant app hub.</p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0">2</Badge>
              <p className="text-sm text-muted-foreground"><strong>Human-in-the-loop:</strong> Sensitive actions require staff approval.</p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0">3</Badge>
              <p className="text-sm text-muted-foreground"><strong>Audit trails:</strong> Every agent action logged for compliance and trust.</p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0">4</Badge>
              <p className="text-sm text-muted-foreground"><strong>Feedback loops:</strong> Staff can correct or rate AI outputs; agents learn continuously.</p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0">5</Badge>
              <p className="text-sm text-muted-foreground"><strong>Event-driven:</strong> Agents respond to triggers from Azure Event Grid.</p>
            </div>
          </div>
        </AccentCard>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Smartphone className="h-5 w-5" style={{ color: getAccentColor("lime") }} />
          <h2 className="font-semibold text-lg">Unified App Strategy</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <AccentCard accent="lime" className="p-4">
            <h3 className="font-semibold text-base mb-4">App Structure</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="h-3 w-3 mt-0.5 shrink-0" style={{ color: getAccentColor("lime") }} />
                <span><strong>Modular shell:</strong> React/Power Platform with hubs for CareGuide, Grants, Donor, Volunteer, Compliance, Finance, Strategy, Housing, Healthcare, Knowledge.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-3 w-3 mt-0.5 shrink-0" style={{ color: getAccentColor("lime") }} />
                <span><strong>Role-based dashboards:</strong> Executives, fundraisers, clinicians, housing managers each see tailored "next best actions."</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-3 w-3 mt-0.5 shrink-0" style={{ color: getAccentColor("lime") }} />
                <span><strong>Global search:</strong> Microsoft Search integration across residents, donors, grants, properties, filings, documents.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-3 w-3 mt-0.5 shrink-0" style={{ color: getAccentColor("lime") }} />
                <span><strong>Smart notifications:</strong> Context-aware nudges (expiring certifications, donor lapses, lease renewals).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-3 w-3 mt-0.5 shrink-0" style={{ color: getAccentColor("lime") }} />
                <span><strong>Mobile-first:</strong> Simplified frontline views (3–4 primary actions per role).</span>
              </li>
            </ul>
          </AccentCard>
          <AccentCard accent="sky" className="p-4">
            <h3 className="font-semibold text-base mb-4">How the App Supports Agents</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Zap className="h-3 w-3 mt-0.5 shrink-0" style={{ color: getAccentColor("sky") }} />
                <span><strong>Data context:</strong> App modules provide structured data (eligibility rules, donor records, grant pipelines) that agents act on.</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="h-3 w-3 mt-0.5 shrink-0" style={{ color: getAccentColor("sky") }} />
                <span><strong>Workflow orchestration:</strong> App defines steps and approvals; agents automate them.</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="h-3 w-3 mt-0.5 shrink-0" style={{ color: getAccentColor("sky") }} />
                <span><strong>Simplified info searching:</strong> App organizes records into hubs; agents query across hubs to answer questions instantly.</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="h-3 w-3 mt-0.5 shrink-0" style={{ color: getAccentColor("sky") }} />
                <span><strong>User interface:</strong> App is the "face" of the agents—staff interact with dashboards, forms, and portals, while agents handle the heavy lifting behind the scenes.</span>
              </li>
            </ul>
          </AccentCard>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Trash2 className="h-5 w-5" style={{ color: getAccentColor("coral") }} />
          <h2 className="font-semibold text-lg">Redundancies Removed</h2>
        </div>
        <AccentCard accent="coral">
          <div className="divide-y">
            {redundanciesRemoved.map((item, idx) => (
              <div key={idx} className="p-4 flex items-start gap-4">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground line-through">{item.old}</p>
                </div>
                <div className="text-center shrink-0">
                  <Badge variant="outline" className="text-xs">&#8594;</Badge>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: getAccentColor("lime") }}>{item.new}</p>
                </div>
              </div>
            ))}
          </div>
        </AccentCard>
      </div>
    </div>
  );
}

interface RiskCategory {
  id: string;
  title: string;
  icon: typeof Shield;
  accent: AccentColor;
  regulations: { name: string; description: string }[];
}

const riskCategories: RiskCategory[] = [
  {
    id: "healthcare",
    title: "Healthcare & Data Privacy",
    icon: Heart,
    accent: "coral",
    regulations: [
      { name: "HIPAA", description: "Protects resident health data; violations include unauthorized access, improper sharing, or lack of encryption." },
      { name: "HITECH Act", description: "Expands HIPAA enforcement; requires breach notifications." },
      { name: "42 CFR Part 2", description: "Strict rules for handling addiction treatment records; violations include unauthorized disclosure." },
      { name: "CMS Regulations", description: "Require accurate billing, reporting, and compliance; violations include false claims or inaccurate reporting." },
      { name: "State Health Privacy Laws", description: "Residents may request access, correction, or deletion of personal data." },
    ]
  },
  {
    id: "housing",
    title: "Housing & Resident Rights",
    icon: Home,
    accent: "sky",
    regulations: [
      { name: "Fair Housing Act", description: "Prohibits discrimination in housing eligibility decisions; violations include biased AI recommendations." },
      { name: "HUD Regulations", description: "Service coordinators must collect accurate data and report compliance." },
      { name: "Section 504 (Rehabilitation Act)", description: "Requires accessibility for residents with disabilities." },
      { name: "ADA", description: "Requires accessible technology and housing facilities." },
      { name: "State Senior Housing Licensing Laws", description: "Regulate assisted living, memory care, and affordable housing." },
    ]
  },
  {
    id: "fundraising",
    title: "Donor & Fundraising Compliance",
    icon: DollarSign,
    accent: "lime",
    regulations: [
      { name: "IRS Form 990", description: "Requires accurate reporting of donations, grants, and expenses." },
      { name: "State Charitable Solicitation Laws", description: "Require registration and disclosure when soliciting donations." },
      { name: "FASB/GAAP Standards", description: "Require accurate financial reporting." },
      { name: "Grant Compliance Requirements", description: "Funders require outcome reporting tied to specific metrics." },
      { name: "Donor Privacy Laws", description: "Require protection of donor data." },
    ]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Technology",
    icon: Server,
    accent: "teal",
    regulations: [
      { name: "HIPAA Security Rule", description: "Requires safeguards for electronic health information." },
      { name: "State Data Breach Notification Laws", description: "Require notifying residents and regulators of breaches." },
      { name: "FTC Act (Section 5)", description: "Prohibits unfair or deceptive practices." },
      { name: "CISA Guidelines", description: "Healthcare considered 'target rich, cyber poor.'" },
      { name: "PCI DSS", description: "Governs online rent and donation payments." },
    ]
  },
  {
    id: "finance",
    title: "Finance & Operations",
    icon: DollarSign,
    accent: "olive",
    regulations: [
      { name: "IRS & GAAP Standards", description: "Require accurate consolidated financial reporting." },
      { name: "Value-Based Care Models", description: "Require accurate outcome tracking tied to reimbursement." },
      { name: "Labor Laws (FLSA, OSHA)", description: "Require proper overtime, breaks, and safe staffing ratios." },
      { name: "ERISA", description: "Governs staff benefits." },
      { name: "State Employment Laws", description: "Cover wage, hour, and workplace safety requirements." },
    ]
  },
  {
    id: "legal",
    title: "Legal & Compliance",
    icon: Scale,
    accent: "tealDark",
    regulations: [
      { name: "Corporate Entity Tracking", description: "NCR must maintain accurate records for 1,100+ legal entities." },
      { name: "HUD/CMS Filing Requirements", description: "Require timely, accurate compliance filings." },
      { name: "Sarbanes-Oxley Principles", description: "Require accurate financial controls and reporting." },
      { name: "State Nonprofit Corporation Laws", description: "Govern board governance, fiduciary duties, and reporting." },
    ]
  },
  {
    id: "ethics",
    title: "Ethics & Trust",
    icon: Sparkles,
    accent: "orange",
    regulations: [
      { name: "Bias in AI Decisions", description: "Housing eligibility, donor scoring, and grant prioritization must be bias-free." },
      { name: "Consent Management", description: "Residents and donors must know how their data is used." },
      { name: "Transparency Requirements", description: "Families and donors must see how outcomes are calculated." },
      { name: "Accessibility Standards (WCAG 2.1)", description: "Apps and portals must be accessible." },
    ]
  },
];

function RiskCategoryCard({ category }: { category: RiskCategory }) {
  const Icon = category.icon;

  return (
    <Link href={`/temporary/risk-compliance/${category.id}`}>
      <AccentCard 
        accent={category.accent}
        className="hover-elevate cursor-pointer transition-all"
        data-testid={`card-risk-${category.id}`}
      >
        <div className="p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm ${getAccentBgClass(category.accent)}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-base">{category.title}</h3>
              <p className="text-sm text-muted-foreground">{category.regulations.length} regulations</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </AccentCard>
    </Link>
  );
}

function RiskCategoryDetailPage({ categoryId }: { categoryId: string }) {
  const category = riskCategories.find(c => c.id === categoryId);
  
  if (!category) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Category not found.</p>
        <Link href="/temporary/risk-compliance">
          <Button variant="ghost" className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Risk & Compliance
          </Button>
        </Link>
      </div>
    );
  }

  const Icon = category.icon;
  const accentColor = getAccentColor(category.accent);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/temporary/risk-compliance">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm ${getAccentBgClass(category.accent)}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{category.title}</h1>
          <p className="text-muted-foreground">{category.regulations.length} regulations</p>
        </div>
      </div>

      <div className="space-y-4">
        {category.regulations.map((reg, idx) => (
          <AccentCard key={idx} accent={category.accent} className="p-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${accentColor}15` }}>
                <AlertTriangle className="w-5 h-5" style={{ color: accentColor }} />
              </div>
              <div>
                <h3 className="font-semibold text-base">{reg.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{reg.description}</p>
              </div>
            </div>
          </AccentCard>
        ))}
      </div>
    </div>
  );
}

function RiskCompliance() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("coral")}15` }}>
          <Shield className="h-6 w-6" style={{ color: getAccentColor("coral") }} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">NCR Legal & Risk Landscape</h1>
          <p className="text-muted-foreground">
            Complete overview of regulatory compliance requirements across healthcare, housing, fundraising, and operations.
          </p>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${getAccentColor("sky")}15` }}>
            <Building2 className="h-6 w-6" style={{ color: getAccentColor("sky") }} />
          </div>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: getAccentColor("sky") }}>Executive Summary</h2>
            <p className="text-base text-muted-foreground mt-2 leading-relaxed">
              NCR's risk landscape spans <strong className="text-foreground">7 major domains</strong>: Healthcare (HIPAA, HITECH, 42 CFR Part 2, CMS), 
              Housing (Fair Housing Act, HUD, Section 504, ADA), Fundraising (IRS 990, solicitation laws, GAAP/FASB), 
              Legal (entity tracking, HUD/CMS filings, Sarbanes-Oxley), Finance (IRS, GAAP, labor laws, ERISA), 
              Cybersecurity (HIPAA Security Rule, breach laws, PCI DSS), and Ethics (bias, consent, transparency, accessibility).
            </p>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {riskCategories.map((category) => {
          const Icon = category.icon;
          const accentColor = getAccentColor(category.accent);
          return (
            <div key={category.id}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm ${getAccentBgClass(category.accent)}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{category.title}</h2>
                  <p className="text-sm text-muted-foreground">{category.regulations.length} regulations</p>
                </div>
              </div>
              <AccentCard accent={category.accent} className="p-4">
                <div className="space-y-4">
                  {category.regulations.map((reg, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${accentColor}15` }}>
                        <AlertTriangle className="w-4 h-4" style={{ color: accentColor }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">{reg.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{reg.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccentCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Temporary() {
  const [location] = useLocation();

  const productDetailMatch = location.match(/^\/temporary\/tech-stack\/(.+)$/);
  const ecosystemDetailMatch = location.match(/^\/temporary\/technology-categories\/(.+)$/);
  const interviewDetailMatch = location.match(/^\/temporary\/interviews\/(.+)$/);
  const riskCategoryMatch = location.match(/^\/temporary\/risk-compliance\/(.+)$/);
  const techComponentMatch = location.match(/^\/temporary\/tech-component\/(.+)$/);
  
  if (productDetailMatch) {
    const productId = productDetailMatch[1];
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto">
          <ProductDetailPage productId={productId} />
        </div>
      </div>
    );
  }

  if (ecosystemDetailMatch) {
    const productId = ecosystemDetailMatch[1];
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto">
          <EcosystemProductDetailPage productId={productId} />
        </div>
      </div>
    );
  }

  if (interviewDetailMatch) {
    const personId = interviewDetailMatch[1];
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto">
          <InterviewDetailPage personId={personId} />
        </div>
      </div>
    );
  }

  if (riskCategoryMatch) {
    const categoryId = riskCategoryMatch[1];
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto">
          <RiskCategoryDetailPage categoryId={categoryId} />
        </div>
      </div>
    );
  }

  if (techComponentMatch) {
    const componentId = techComponentMatch[1];
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto">
          <TechComponentDetailPage componentId={componentId} />
        </div>
      </div>
    );
  }

  // Determine which component to render based on route
  let ContentComponent: React.ComponentType = OnSiteInterviews;
  
  if (location === "/temporary/tech-stack") {
    ContentComponent = TechStack;
  } else if (location === "/temporary/technology-categories") {
    ContentComponent = TechStackMapper;
  } else if (location === "/temporary/optimization-ideas") {
    ContentComponent = OptimizationIdeas;
  } else if (location === "/temporary/risk-compliance") {
    ContentComponent = RiskCompliance;
  } else if (location === "/temporary/infrastructure") {
    ContentComponent = OtherWithTabs;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-6">
        <ContentComponent />
      </div>
    </div>
  );
}
