import { useState } from "react";
import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Users, Layers, ExternalLink, ChevronDown, ChevronUp, Check, X, Building2, Lightbulb, Shield, Heart, Home, DollarSign, Scale, Server, Sparkles, AlertTriangle, Bot, Database, BarChart3, FileText, Zap, Workflow, BrainCircuit, Clock, UserCheck, Trash2, Layout, Smartphone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import raisersEdgeLogo from "@assets/stock_images/raiser's_edge_nxt_bl_dec6c4f9.jpg";
import donorSearchLogo from "@assets/stock_images/donorsearch_logo_f681dabc.jpg";
import powerBiLogo from "@assets/stock_images/microsoft_power_bi_l_49b1fec0.jpg";
import instrumentlLogo from "@assets/stock_images/instrumentl_grant_ma_12728f53.jpg";
import workdayLogo from "@assets/stock_images/workday_hcm_logo_85daffca.jpg";
import pointClickCareLogo from "@assets/stock_images/pointclickcare_healt_1ce43dfa.jpg";
import guidestarLogo from "@assets/stock_images/guidestar_candid_non_4e34ba7b.jpg";
import signupGeniusLogo from "@assets/stock_images/signupgenius_logo_bd1e3da8.jpg";

const temporaryTabs: SectionTab[] = [
  {
    label: "On Site Interviews",
    value: "interviews",
    icon: Users,
    path: "/temporary",
  },
  {
    label: "Tech Stack",
    value: "tech-stack",
    icon: Layers,
    path: "/temporary/tech-stack",
  },
  {
    label: "Optimization Ideas",
    value: "optimization-ideas",
    icon: Lightbulb,
    path: "/temporary/optimization-ideas",
  },
  {
    label: "Risk & Compliance",
    value: "risk-compliance",
    icon: Shield,
    path: "/temporary/risk-compliance",
  },
];

interface TechProduct {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  website: string;
  brandColor: string;
  brandColorLight: string;
  logoText: string;
  logoImage: string;
  strengths: string[];
  weaknesses: string[];
  ncrContext: string;
}

const techProducts: TechProduct[] = [
  {
    id: "raisers-edge",
    name: "Raiser's Edge NXT",
    category: "CRM",
    tagline: "Core donor database",
    description: "Industry-standard CRM for large and established nonprofits. Holds donor records, pledges, tributes, and planned giving with strong native integration with WealthEngine.",
    website: "https://www.blackbaud.com/products/blackbaud-raisers-edge-nxt",
    brandColor: "#00a4e4",
    brandColorLight: "rgba(0, 164, 228, 0.1)",
    logoText: "Blackbaud",
    logoImage: raisersEdgeLogo,
    strengths: [
      "Industry-standard CRM for large and established nonprofits",
      "Handles complex donor records extremely well (pledges, soft credits, tributes, planned giving)",
      "Large ecosystem: consultants, integrations, and RE-trained fundraisers readily available",
      "Long-term stability and trusted by boards/executives",
      "Strong native integration with WealthEngine",
      "Solid for traditional major-gifts recordkeeping and stewardship"
    ],
    weaknesses: [
      "Outdated user experience; slow, clunky, and not intuitive for frontline fundraisers",
      "Weak reporting and analytics; often requires exports to Excel/PowerBI/Tableau",
      "Does not unify data across systems (no connection to Yardi, RealPage, program data, finance, etc.)",
      "Limited AI capabilities; not built for automation, insights, or modern workflows",
      "High cost relative to features; add-ons and customizations drive cost up",
      "Difficult to customize or adapt to organizational processes",
      "Low adoption by frontline fundraisers, resulting in low ROI"
    ],
    ncrContext: "The 'system of record' for donor relationships, but needs augmentation for analytics and usability. NCR uses RE NXT as the primary donor database but struggles with its weak reporting capabilities and lack of integration with housing, clinical, and financial systems."
  },
  {
    id: "donorsearch",
    name: "DonorSearch",
    category: "Prospecting",
    tagline: "Prospecting engine",
    description: "Surfaces philanthropic giving, faith-based donors, foundation ties. Excellent charitable giving data with strong affinity scoring, good for batch screenings.",
    website: "https://www.donorsearch.net/",
    brandColor: "#1e3a5f",
    brandColorLight: "rgba(30, 58, 95, 0.1)",
    logoText: "DonorSearch",
    logoImage: donorSearchLogo,
    strengths: [
      "Excellent philanthropic giving data - strong at identifying past charitable giving, foundation board ties, and donor generosity patterns",
      "Better for faith-based donors than WealthEngine - includes church giving when publicly available",
      "Strong affinity/propensity scoring - helps identify donors likely to give to specific causes",
      "Robust screening reports - good for batch screenings and uncovering hidden mid-level donors",
      "Integrates with major CRMs (Raiser's Edge, Salesforce, DonorPerfect, Neon)",
      "Useful for foundation prospecting - surfaces charitable trusts and DAF histories",
      "Good customer support with helpful onboarding"
    ],
    weaknesses: [
      "Higher rate of 'false positives' - flags donors as wealthy who aren't, leading to research fatigue",
      "Not naturally embedded in Raiser's Edge workflows - staff must switch systems",
      "More manual than WealthEngine - requires extra steps to validate results",
      "Interface is clunky compared to modern tools",
      "Capacity scores can be inflated - organizations stop trusting ratings",
      "Doesn't meaningfully unify data - still just a lookup tool",
      "Underused without a champion - many nonprofits buy it but never integrate it",
      "Staff often lack training to interpret results correctly"
    ],
    ncrContext: "Could complement WealthEngine by identifying hidden donors, but adoption requires SOPs and integration. NCR has DonorSearch but doesn't actively use it because: no one was trained, WealthEngine is already in RE, and leadership didn't champion adoption. The tool's value isn't obvious given NCR's historically grant-centric (not major-gift-centric) focus."
  },
  {
    id: "powerbi",
    name: "Power BI",
    category: "Analytics",
    tagline: "Analytics layer",
    description: "Microsoft's data analytics and dashboard tool. Turns raw data into interactive charts, dashboards, and reports that leaders can use to make decisions.",
    website: "https://powerbi.microsoft.com/",
    brandColor: "#f2c811",
    brandColorLight: "rgba(242, 200, 17, 0.1)",
    logoText: "Microsoft",
    logoImage: powerBiLogo,
    strengths: [
      "Connects to dozens of systems (Excel, SQL, APIs, Salesforce, Raiser's Edge, Yardi, etc.)",
      "Creates real-time dashboards for leadership",
      "Much more powerful than Excel for complex data analysis",
      "Customizable visualizations with excellent slicing, filtering, and drilling",
      "Can automate recurring reporting",
      "Works well with Microsoft environments (Teams, SharePoint, Azure)"
    ],
    weaknesses: [
      "Requires technical skill to set up and maintain",
      "Can get complicated when many data sources are involved",
      "Needs clean data—messy data produces messy dashboards",
      "Hard for non-technical staff to build advanced reports",
      "Still requires Excel for some prep work",
      "Not a fundraising system—just a visualization tool"
    ],
    ncrContext: "Bridges the reporting gap in RE NXT, giving executives donor pipeline, occupancy, and grant dashboards. NCR uses or would benefit significantly from Power BI because RE NXT reporting is weak. Connects RE NXT, Yardi, Workday, PointClickCare, and finance systems for unified visibility."
  },
  {
    id: "instrumentl",
    name: "Instrumentl",
    category: "Grants",
    tagline: "Grant discovery tool",
    description: "Cloud-based system that helps nonprofits find new grants, track deadlines, and manage active grants in a centralized dashboard. Best grant discovery engine for foundations and state/local grants.",
    website: "https://www.instrumentl.com/",
    brandColor: "#6366f1",
    brandColorLight: "rgba(99, 102, 241, 0.1)",
    logoText: "Instrumentl",
    logoImage: instrumentlLogo,
    strengths: [
      "Excellent grant discovery engine - pulls from federal, state, county, local, and private funders",
      "Automatic matching - suggests grants based on organization's mission and history",
      "Very clean, modern user interface - easier to use than older tools",
      "Centralized grant pipeline - keeps discovery → applications → awards all in one place",
      "Automated reminders and deadline tracking - prevents missed opportunities",
      "Great for small and mid-sized teams - reduces manual spreadsheets",
      "Affordable compared to many enterprise systems",
      "Strong customer support and training with helpful webinars"
    ],
    weaknesses: [
      "Not a full enterprise grants system - good for discovery but not full compliance",
      "Limited reporting capabilities - not as deep as Power BI or Salesforce",
      "Weak integration with large CRMs - limited native integrations with RE or Salesforce",
      "Not built for federal-heavy compliance (HUD, CMS, HHS grants need separate systems)",
      "Not ideal for massive organizations - larger nonprofits sometimes outgrow it",
      "Still requires manual input - organizes grants but doesn't automate complex workflows",
      "Designed for grant fundraising, not grant administration"
    ],
    ncrContext: "Excellent supplement for foundation and local grants, but not sufficient for HUD/state compliance-heavy grants. While Instrumentl is arguably #1 for grant discovery and ease of use, NCR's heavy federal and HUD compliance requirements mean it cannot be the sole grants tool. Best used alongside compliance systems for philanthropic foundation discovery."
  },
  {
    id: "workday",
    name: "Workday",
    category: "HR & Finance",
    tagline: "HR + payroll backbone",
    description: "Enterprise AI platform for managing HR and Finance. Manages employees, pay, recruiting, and compliance with secure, enterprise-class workflows.",
    website: "https://www.workday.com/",
    brandColor: "#0875e1",
    brandColorLight: "rgba(8, 117, 225, 0.1)",
    logoText: "Workday",
    logoImage: workdayLogo,
    strengths: [
      "Secure, enterprise-class platform trusted by large organizations",
      "Strong HR workflows for recruiting, onboarding, and payroll",
      "Comprehensive compliance management",
      "Unified platform for HR and financial management",
      "Modern cloud architecture with regular updates",
      "Strong reporting and analytics capabilities"
    ],
    weaknesses: [
      "Overly complex - steep learning curve for users",
      "Poor frontline adoption - staff find it difficult to use",
      "Hard to customize to organizational processes",
      "Expensive implementation and ongoing costs",
      "Integration challenges with specialized systems"
    ],
    ncrContext: "System of record for staff, but needs simplification and integration with housing/clinical systems. NCR uses Workday as the backbone for employee management, payroll, and compliance, but frontline workers struggle with its complexity. Better integration with PointClickCare and Yardi would improve operational efficiency."
  },
  {
    id: "pointclickcare",
    name: "PointClickCare",
    category: "Clinical EHR",
    tagline: "Clinical EHR",
    description: "Leading cloud-based EHR and care-coordination platform for senior living, long-term care, skilled nursing, assisted living, and home health.",
    website: "https://pointclickcare.com/",
    brandColor: "#00a3e0",
    brandColorLight: "rgba(0, 163, 224, 0.1)",
    logoText: "PointClickCare",
    logoImage: pointClickCareLogo,
    strengths: [
      "Purpose-built for senior living and long-term care",
      "Comprehensive resident health records and care coordination",
      "Strong compliance features for healthcare regulations",
      "Cloud-based with regular updates and improvements",
      "Good integration capabilities with healthcare networks",
      "Supports skilled nursing, assisted living, and home health"
    ],
    weaknesses: [
      "Limited integration with non-clinical systems",
      "Can be complex for smaller facilities",
      "Requires ongoing training for staff",
      "Healthcare-focused, not designed for housing or fundraising data"
    ],
    ncrContext: "Core for healthcare operations, must integrate with housing, finance, and HR systems. NCR relies on PointClickCare for resident health records and care coordination across its senior living communities. The challenge is connecting clinical data with Yardi (housing), Workday (HR), and RE NXT (donor relationships) for holistic organizational intelligence."
  },
  {
    id: "guidestar",
    name: "GuideStar / Candid",
    category: "Transparency",
    tagline: "Transparency + funder intelligence",
    description: "Nonprofit profiles, 990s, foundation giving history. The world's largest database of U.S. nonprofit organizations with 1.8+ million profiles for due diligence and reputation management.",
    website: "https://www.guidestar.org/",
    brandColor: "#00b4b4",
    brandColorLight: "rgba(0, 180, 180, 0.1)",
    logoText: "Candid",
    logoImage: guidestarLogo,
    strengths: [
      "Trusted by donors - definitive source for nonprofit legitimacy",
      "Comprehensive 990 data and nonprofit profiles",
      "Seals of Transparency (Bronze, Silver, Gold, Platinum) build credibility",
      "Foundation giving history useful for prospect research",
      "Free basic access with detailed organizational information",
      "API access for data integration"
    ],
    weaknesses: [
      "Outdated data - information can lag behind reality",
      "Poor integrations with CRMs and other systems",
      "Expensive for deep use beyond basic searches",
      "Primarily a reference tool, not an active workflow tool"
    ],
    ncrContext: "Due diligence and reputation management; complements Instrumentl for grant prospecting. NCR uses GuideStar/Candid to maintain transparency with donors and funders, verify foundation research, and ensure NCR's own profile is up-to-date for incoming grant applications. Essential for credibility but not a daily workflow tool."
  },
  {
    id: "signupgenius",
    name: "SignUpGenius",
    category: "Coordination",
    tagline: "Volunteer coordination tool",
    description: "Web-based scheduling and coordination tool for volunteer sign-ups, meal trains, church events, school activities, and any situation requiring organized participation.",
    website: "https://www.signupgenius.com/",
    brandColor: "#ff6b00",
    brandColorLight: "rgba(255, 107, 0, 0.1)",
    logoText: "SignUpGenius",
    logoImage: signupGeniusLogo,
    strengths: [
      "Simple and easy to use - no login required for volunteers",
      "Free tier available with premium plans for advanced features",
      "Automatic reminders to volunteers and participants",
      "Ability to limit sign-ups per slot and collect information",
      "Optional payment collection for events and donations",
      "Exports to Excel and integrates with calendars",
      "Eliminates messy email chains for group coordination"
    ],
    weaknesses: [
      "Basic functionality - not a full volunteer management system",
      "Limited reporting and analytics",
      "No CRM integration for donor/volunteer relationship tracking",
      "Premium features require paid subscription",
      "Not designed for complex scheduling scenarios"
    ],
    ncrContext: "Useful for community engagement, volunteer scheduling, and small-group coordination. NCR can use SignUpGenius for church volunteer schedules, community service events, resident family coordination, and small-group gatherings. Simple and effective for tactical coordination but doesn't integrate with donor or resident data systems."
  }
];

function ProductCard({ product }: { product: TechProduct }) {
  const [, navigate] = useLocation();
  
  return (
    <Card 
      className="overflow-hidden hover-elevate cursor-pointer transition-all h-full flex flex-col"
      data-testid={`card-product-${product.id}`}
      onClick={() => navigate(`/temporary/tech-stack/${product.id}`)}
    >
      <div 
        className="p-4"
        style={{ backgroundColor: product.brandColorLight }}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 
            className="font-bold text-base"
            style={{ color: product.brandColor }}
            data-testid={`text-product-name-${product.id}`}
          >
            {product.name}
          </h3>
          <Badge variant="outline" className="text-xs shrink-0">
            {product.category}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">{product.tagline}</p>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-xs text-muted-foreground mb-3">{product.description}</p>
        <div className="mt-auto space-y-2">
          <div className="flex items-start gap-2">
            <Check className="h-3 w-3 text-green-600 mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground line-clamp-1">{product.strengths[0]}</p>
          </div>
          <div className="flex items-start gap-2">
            <X className="h-3 w-3 text-red-600 mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground line-clamp-1">{product.weaknesses[0]}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function ProductDetailModal({ product, onClose }: { product: TechProduct | null; onClose: () => void }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <Card 
        className="w-full max-w-4xl max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="p-6 flex items-start justify-between gap-4"
          style={{ backgroundColor: product.brandColorLight }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md bg-white flex items-center justify-center">
              <img 
                src={product.logoImage} 
                alt={`${product.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-xl">{product.name}</h3>
                <Badge variant="outline" className="text-xs">
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

        <div className="p-6 border-t">
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        <div className="border-t">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-6 border-b md:border-b-0 md:border-r">
              <div className="flex items-center gap-2 mb-3">
                <Check className="h-4 w-4 text-green-600" />
                <h4 className="font-medium text-sm">Strengths</h4>
              </div>
              <ul className="space-y-2">
                {product.strengths.map((strength, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-green-600 mt-1 shrink-0">+</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <X className="h-4 w-4 text-red-600" />
                <h4 className="font-medium text-sm">Weaknesses</h4>
              </div>
              <ul className="space-y-2">
                {product.weaknesses.map((weakness, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-red-600 mt-1 shrink-0">−</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="p-6 border-t" style={{ backgroundColor: "rgba(8, 69, 148, 0.05)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-4 w-4" style={{ color: "#084594" }} />
              <h4 className="font-medium text-sm" style={{ color: "#084594" }}>NCR Context</h4>
            </div>
            <p className="text-sm text-muted-foreground">{product.ncrContext}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

interface InterviewPerson {
  id: string;
  name: string;
  title: string;
  area: string;
  areaColor: string;
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
    areaColor: "#1a5f2a",
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
    areaColor: "#084594",
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
  }
];

function InterviewCard({ person }: { person: InterviewPerson }) {
  const [, navigate] = useLocation();
  
  return (
    <Card 
      className="overflow-hidden hover-elevate cursor-pointer transition-all"
      data-testid={`card-interview-${person.id}`}
      onClick={() => navigate(`/temporary/interviews/${person.id}`)}
    >
      <div className="p-5">
        <h3 className="font-bold text-lg mb-1">{person.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{person.title}</p>
        <Badge style={{ backgroundColor: person.areaColor }} className="text-white text-xs">
          {person.area}
        </Badge>
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
          <p className="text-muted-foreground">Interview not found</p>
          <Button className="mt-4" onClick={() => navigate("/temporary")}>
            Back to Interviews
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
        onClick={() => navigate("/temporary")}
        data-testid="button-back-to-interviews"
      >
        ← Back to Interviews
      </Button>

      <Card>
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold mb-1">{person.name}</h1>
              <p className="text-lg text-muted-foreground mb-3">{person.title}</p>
              <Badge style={{ backgroundColor: person.areaColor }} className="text-white">
                {person.area}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4 italic">{person.background}</p>
        </div>
      </Card>

      <div>
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          Current Challenges
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {person.challenges.map((challenge, idx) => (
            <Card key={idx} className="p-4">
              <h3 className="font-medium text-sm mb-3">{challenge.title}</h3>
              <ul className="space-y-2">
                {challenge.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-orange-600 mt-0.5 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Server className="h-5 w-5 text-blue-600" />
          Current Tech Stack
        </h2>
        <Card>
          <div className="divide-y">
            {person.techStack.map((tech, idx) => (
              <div key={idx} className="p-4">
                <h3 className="font-medium text-sm">{tech.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{tech.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-green-600" />
          Desired Capabilities
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {person.wants.map((want, idx) => (
            <Card key={idx} className="p-4">
              <h3 className="font-medium text-sm mb-3">{want.title}</h3>
              <ul className="space-y-2">
                {want.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-green-600 mt-0.5 shrink-0">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-600" />
          Additional Observations
        </h2>
        <Card className="p-4">
          <ul className="space-y-2">
            {person.observations.map((obs, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-purple-600 mt-0.5 shrink-0">→</span>
                <span>{obs}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="p-6" style={{ backgroundColor: "rgba(8, 69, 148, 0.05)" }}>
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="h-5 w-5" style={{ color: "#084594" }} />
          <h2 className="font-semibold text-lg" style={{ color: "#084594" }}>Summary Insight</h2>
        </div>
        <p className="text-muted-foreground">{person.summaryInsight}</p>
      </Card>
    </div>
  );
}

function OnSiteInterviews() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <CardTitle>On Site Interviews</CardTitle>
          </div>
          <CardDescription>
            Key stakeholder interviews conducted at NCR. Click on any card to view detailed insights.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {interviewees.map((person) => (
          <InterviewCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
}

function TechStack() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-600" />
            <CardTitle>NCR Technology Stack</CardTitle>
          </div>
          <CardDescription>
            Overview of software products used across National Church Residences fundraising and operations. Click any card to view full details.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
        data-testid="button-back-to-tech-stack"
      >
        ← Back to Tech Stack
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
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Check className="h-5 w-5 text-green-600" />
            <h2 className="font-semibold text-lg">Strengths</h2>
          </div>
          <ul className="space-y-3">
            {product.strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-green-600 font-bold mt-0.5">+</span>
                <span className="text-sm text-muted-foreground">{strength}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <X className="h-5 w-5 text-red-600" />
            <h2 className="font-semibold text-lg">Weaknesses</h2>
          </div>
          <ul className="space-y-3">
            {product.weaknesses.map((weakness, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-red-600 font-bold mt-0.5">−</span>
                <span className="text-sm text-muted-foreground">{weakness}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="p-6" style={{ backgroundColor: "rgba(8, 69, 148, 0.05)" }}>
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="h-5 w-5" style={{ color: "#084594" }} />
          <h2 className="font-semibold text-lg" style={{ color: "#084594" }}>NCR Context</h2>
        </div>
        <p className="text-muted-foreground">{product.ncrContext}</p>
      </Card>
    </div>
  );
}

interface TechComponent {
  id: string;
  name: string;
  role: string;
  icon: typeof Database;
  color: string;
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
    color: "#0078d4",
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
    color: "#f2c811",
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
    color: "#036c5f",
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
    color: "#00a4e4",
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
    color: "#1a5f2a",
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
    color: "#7b2d8e",
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
    color: "#0875e1",
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
    color: "#6366f1",
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
    color: "#0089d6",
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
    color: "#084594",
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
  color: string;
}

const agentTypes: AgentType[] = [
  { id: "careguide", name: "CareGuide Agent", description: "Conversational intake assistant for families; validates coordinator entries; generates outcome metrics.", icon: UserCheck, color: "#16a34a" },
  { id: "compliance", name: "Compliance Agent", description: "Automates HUD/CMS filings, assembles evidence, enforces HIPAA/PII rules.", icon: Shield, color: "#dc2626" },
  { id: "document", name: "Document Agent", description: "Drafts donor letters, grant narratives, board reports, and audit bundles.", icon: FileText, color: "#2563eb" },
  { id: "engagement", name: "Engagement Agent", description: "Prioritizes donors, volunteers, and funders; prevents cannibalization; schedules outreach.", icon: Heart, color: "#db2777" },
  { id: "financial", name: "Financial Agent", description: "Consolidates P&L, detects double counting, forecasts cash flow, tracks donor acquisition costs.", icon: DollarSign, color: "#ca8a04" },
  { id: "orchestration", name: "Orchestration Agent", description: "Coordinates tasks across modules, enforces SLAs, escalates anomalies.", icon: Workflow, color: "#7c3aed" },
  { id: "training", name: "Training Agent", description: "Provides contextual help, micro-learning, and adoption nudges inside workflows.", icon: BrainCircuit, color: "#0891b2" },
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
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = component.icon;

  return (
    <Card className="overflow-hidden hover-elevate cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
      <div className="p-4 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0"
            style={{ backgroundColor: component.color }}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">{component.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{component.role}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {isExpanded && (
        <div className="border-t">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-4 border-b md:border-b-0 md:border-r">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="h-4 w-4 text-purple-600" />
                <h4 className="font-medium text-xs text-purple-600">AI Assistance</h4>
              </div>
              <p className="text-xs text-muted-foreground">{component.aiHelp}</p>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Layout className="h-4 w-4 text-blue-600" />
                <h4 className="font-medium text-xs text-blue-600">App Role</h4>
              </div>
              <p className="text-xs text-muted-foreground">{component.appRole}</p>
            </div>
          </div>
          <div className="p-4 border-t bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4" />
              <h4 className="font-medium text-xs">Implementation</h4>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {component.owners.map((owner, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">{owner}</Badge>
              ))}
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              {component.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">→</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 pt-2 border-t">
              <Badge style={{ backgroundColor: component.color }} className="text-white text-xs">
                {component.timeline}
              </Badge>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

function OptimizationIdeas() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            <CardTitle>NCR Optimized Tech Stack</CardTitle>
          </div>
          <CardDescription>
            A unified ecosystem where existing systems remain the source of record, Fabric + Purview unify data, AI agents handle busywork, and the app provides a single pane of glass.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="p-4" style={{ backgroundColor: "rgba(8, 69, 148, 0.05)" }}>
        <div className="flex items-start gap-3">
          <Building2 className="h-5 w-5 mt-0.5 shrink-0" style={{ color: "#084594" }} />
          <div>
            <h4 className="font-medium text-sm" style={{ color: "#084594" }}>Executive Summary</h4>
            <p className="text-sm text-muted-foreground mt-1">
              <strong>Tech Stack:</strong> Microsoft Fabric OneLake + Purview, Power BI, SharePoint, Raiser's Edge, Yardi, Athena/Epic, Workday, Instrumentl, Azure Event Grid, unified React/Power Platform app.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              <strong>Agentic AI:</strong> Specialized agents (CareGuide, Compliance, Document, Engagement, Financial, Orchestration) embedded in each module, governed with audit trails.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              <strong>App:</strong> Modular shell with 8–10 hubs (CareGuide, Grants, Donor, Volunteer, Compliance, Finance, Strategy, Housing, Healthcare, Knowledge).
            </p>
          </div>
        </div>
      </Card>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Server className="h-5 w-5 text-blue-600" />
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
          <Bot className="h-5 w-5 text-purple-600" />
          <h2 className="font-semibold text-lg">AI Agent Strategy</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {agentTypes.map((agent) => {
            const Icon = agent.icon;
            return (
              <Card key={agent.id} className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: agent.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-medium text-sm">{agent.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground">{agent.description}</p>
              </Card>
            );
          })}
        </div>

        <Card className="mt-4 p-4">
          <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
            <Workflow className="h-4 w-4 text-blue-600" />
            Agent Operating Principles
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0">1</Badge>
              <p className="text-xs text-muted-foreground"><strong>Embedded in modules:</strong> Each agent lives inside its relevant app hub.</p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0">2</Badge>
              <p className="text-xs text-muted-foreground"><strong>Human-in-the-loop:</strong> Sensitive actions require staff approval.</p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0">3</Badge>
              <p className="text-xs text-muted-foreground"><strong>Audit trails:</strong> Every agent action logged for compliance and trust.</p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0">4</Badge>
              <p className="text-xs text-muted-foreground"><strong>Feedback loops:</strong> Staff can correct or rate AI outputs; agents learn continuously.</p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0">5</Badge>
              <p className="text-xs text-muted-foreground"><strong>Event-driven:</strong> Agents respond to triggers from Azure Event Grid.</p>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Smartphone className="h-5 w-5 text-green-600" />
          <h2 className="font-semibold text-lg">Unified App Strategy</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="font-medium text-sm mb-3">App Structure</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="h-3 w-3 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Modular shell:</strong> React/Power Platform with hubs for CareGuide, Grants, Donor, Volunteer, Compliance, Finance, Strategy, Housing, Healthcare, Knowledge.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-3 w-3 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Role-based dashboards:</strong> Executives, fundraisers, clinicians, housing managers each see tailored "next best actions."</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-3 w-3 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Global search:</strong> Microsoft Search integration across residents, donors, grants, properties, filings, documents.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-3 w-3 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Smart notifications:</strong> Context-aware nudges (expiring certifications, donor lapses, lease renewals).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-3 w-3 text-green-600 mt-0.5 shrink-0" />
                <span><strong>Mobile-first:</strong> Simplified frontline views (3–4 primary actions per role).</span>
              </li>
            </ul>
          </Card>
          <Card className="p-4">
            <h3 className="font-medium text-sm mb-3">How the App Supports Agents</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <Zap className="h-3 w-3 text-purple-600 mt-0.5 shrink-0" />
                <span><strong>Data context:</strong> App modules provide structured data (eligibility rules, donor records, grant pipelines) that agents act on.</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="h-3 w-3 text-purple-600 mt-0.5 shrink-0" />
                <span><strong>Workflow orchestration:</strong> App defines steps and approvals; agents automate them.</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="h-3 w-3 text-purple-600 mt-0.5 shrink-0" />
                <span><strong>Simplified info searching:</strong> App organizes records into hubs; agents query across hubs to answer questions instantly.</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="h-3 w-3 text-purple-600 mt-0.5 shrink-0" />
                <span><strong>User interface:</strong> App is the "face" of the agents—staff interact with dashboards, forms, and portals, while agents handle the heavy lifting behind the scenes.</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Trash2 className="h-5 w-5 text-red-600" />
          <h2 className="font-semibold text-lg">Redundancies Removed</h2>
        </div>
        <Card>
          <div className="divide-y">
            {redundanciesRemoved.map((item, idx) => (
              <div key={idx} className="p-4 flex items-start gap-4">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground line-through">{item.old}</p>
                </div>
                <div className="text-center shrink-0">
                  <Badge variant="outline" className="text-xs">→</Badge>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-700">{item.new}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

interface RiskCategory {
  id: string;
  title: string;
  icon: typeof Shield;
  color: string;
  bgColor: string;
  regulations: { name: string; description: string }[];
}

const riskCategories: RiskCategory[] = [
  {
    id: "healthcare",
    title: "Healthcare & Data Privacy",
    icon: Heart,
    color: "#dc2626",
    bgColor: "rgba(220, 38, 38, 0.1)",
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
    color: "#2563eb",
    bgColor: "rgba(37, 99, 235, 0.1)",
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
    color: "#16a34a",
    bgColor: "rgba(22, 163, 74, 0.1)",
    regulations: [
      { name: "IRS Form 990", description: "Requires accurate reporting of donations, grants, and expenses." },
      { name: "State Charitable Solicitation Laws", description: "Require registration and disclosure when soliciting donations." },
      { name: "FASB/GAAP Standards", description: "Require accurate financial reporting." },
      { name: "Grant Compliance Requirements", description: "Funders require outcome reporting tied to specific metrics." },
      { name: "Donor Privacy Laws", description: "Require protection of donor data." },
    ]
  },
  {
    id: "legal",
    title: "Legal & Compliance",
    icon: Scale,
    color: "#7c3aed",
    bgColor: "rgba(124, 58, 237, 0.1)",
    regulations: [
      { name: "Corporate Entity Tracking", description: "NCR must maintain accurate records for 1,100+ legal entities." },
      { name: "HUD/CMS Filing Requirements", description: "Require timely, accurate compliance filings." },
      { name: "Sarbanes-Oxley Principles", description: "Require accurate financial controls and reporting." },
      { name: "State Nonprofit Corporation Laws", description: "Govern board governance, fiduciary duties, and reporting." },
    ]
  },
  {
    id: "finance",
    title: "Finance & Operations",
    icon: DollarSign,
    color: "#ca8a04",
    bgColor: "rgba(202, 138, 4, 0.1)",
    regulations: [
      { name: "IRS & GAAP Standards", description: "Require accurate consolidated financial reporting." },
      { name: "Value-Based Care Models", description: "Require accurate outcome tracking tied to reimbursement." },
      { name: "Labor Laws (FLSA, OSHA)", description: "Require proper overtime, breaks, and safe staffing ratios." },
      { name: "ERISA", description: "Governs staff benefits." },
      { name: "State Employment Laws", description: "Cover wage, hour, and workplace safety requirements." },
    ]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Technology",
    icon: Server,
    color: "#0891b2",
    bgColor: "rgba(8, 145, 178, 0.1)",
    regulations: [
      { name: "HIPAA Security Rule", description: "Requires safeguards for electronic health information." },
      { name: "State Data Breach Notification Laws", description: "Require notifying residents and regulators of breaches." },
      { name: "FTC Act (Section 5)", description: "Prohibits unfair or deceptive practices." },
      { name: "CISA Guidelines", description: "Healthcare considered 'target rich, cyber poor.'" },
      { name: "PCI DSS", description: "Governs online rent and donation payments." },
    ]
  },
  {
    id: "ethics",
    title: "Ethics & Trust",
    icon: Sparkles,
    color: "#db2777",
    bgColor: "rgba(219, 39, 119, 0.1)",
    regulations: [
      { name: "Bias in AI Decisions", description: "Housing eligibility, donor scoring, and grant prioritization must be bias-free." },
      { name: "Consent Management", description: "Residents and donors must know how their data is used." },
      { name: "Transparency Requirements", description: "Families and donors must see how outcomes are calculated." },
      { name: "Accessibility Standards (WCAG 2.1)", description: "Apps and portals must be accessible." },
    ]
  },
];

function RiskCategoryCard({ category }: { category: RiskCategory }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = category.icon;

  return (
    <Card 
      className="overflow-hidden hover-elevate cursor-pointer transition-all"
      data-testid={`card-risk-${category.id}`}
    >
      <div 
        className="p-4 flex items-center justify-between gap-3"
        style={{ backgroundColor: category.bgColor }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm"
            style={{ backgroundColor: category.color }}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">{category.title}</h3>
            <p className="text-xs text-muted-foreground">{category.regulations.length} regulations</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {isExpanded && (
        <div className="p-4 border-t space-y-3">
          {category.regulations.map((reg, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div 
                className="w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: category.bgColor }}
              >
                <AlertTriangle className="w-3 h-3" style={{ color: category.color }} />
              </div>
              <div>
                <p className="text-sm font-medium">{reg.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{reg.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function RiskCompliance() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <CardTitle>NCR Legal & Risk Landscape</CardTitle>
          </div>
          <CardDescription>
            Complete overview of regulatory compliance requirements across healthcare, housing, fundraising, and operations. Click any category to expand details.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="p-4" style={{ backgroundColor: "rgba(8, 69, 148, 0.05)" }}>
        <div className="flex items-start gap-3">
          <Building2 className="h-5 w-5 mt-0.5" style={{ color: "#084594" }} />
          <div>
            <h4 className="font-medium text-sm" style={{ color: "#084594" }}>Executive Summary</h4>
            <p className="text-sm text-muted-foreground mt-1">
              NCR's risk landscape spans <strong>7 major domains</strong>: Healthcare (HIPAA, HITECH, 42 CFR Part 2, CMS), 
              Housing (Fair Housing Act, HUD, Section 504, ADA), Fundraising (IRS 990, solicitation laws, GAAP/FASB), 
              Legal (entity tracking, HUD/CMS filings, Sarbanes-Oxley), Finance (IRS, GAAP, labor laws, ERISA), 
              Cybersecurity (HIPAA Security Rule, breach laws, PCI DSS), and Ethics (bias, consent, transparency, accessibility).
            </p>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {riskCategories.map((category) => (
          <RiskCategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

export default function Temporary() {
  const [location] = useLocation();

  const productDetailMatch = location.match(/^\/temporary\/tech-stack\/(.+)$/);
  const interviewDetailMatch = location.match(/^\/temporary\/interviews\/(.+)$/);
  
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

  let ContentComponent = OnSiteInterviews;
  if (location === "/temporary/tech-stack") {
    ContentComponent = TechStack;
  } else if (location === "/temporary/optimization-ideas") {
    ContentComponent = OptimizationIdeas;
  } else if (location === "/temporary/risk-compliance") {
    ContentComponent = RiskCompliance;
  }

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={temporaryTabs} currentPath={location} variant="cards" />
      <div className="flex-1 overflow-auto p-6">
        <ContentComponent />
      </div>
    </div>
  );
}
