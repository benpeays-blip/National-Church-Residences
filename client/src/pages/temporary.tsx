import { useState } from "react";
import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Users, Layers, ExternalLink, ChevronDown, ChevronUp, Check, X, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card 
      className="overflow-hidden hover-elevate cursor-pointer transition-all"
      data-testid={`card-product-${product.id}`}
    >
      <div 
        className="p-5 flex items-start justify-between gap-4"
        style={{ backgroundColor: product.brandColorLight }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold text-xs"
            style={{ backgroundColor: product.brandColor }}
          >
            {product.logoText.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-lg" data-testid={`text-product-name-${product.id}`}>
                {product.name}
              </h3>
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
            data-testid={`button-expand-${product.id}`}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="p-5 border-t">
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      {isExpanded && (
        <div className="border-t">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-5 border-b md:border-b-0 md:border-r">
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
            <div className="p-5">
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
          
          <div className="p-5 border-t" style={{ backgroundColor: "rgba(8, 69, 148, 0.05)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-4 w-4" style={{ color: "#084594" }} />
              <h4 className="font-medium text-sm" style={{ color: "#084594" }}>NCR Context</h4>
            </div>
            <p className="text-sm text-muted-foreground">{product.ncrContext}</p>
          </div>
        </div>
      )}
    </Card>
  );
}

function OnSiteInterviews() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          <CardTitle>On Site Interviews</CardTitle>
        </div>
        <CardDescription>
          Manage and track on-site donor and prospect interviews
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Content coming soon...
        </p>
      </CardContent>
    </Card>
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
            Overview of software products used across National Church Residences fundraising and operations. Click any card to expand details.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {techProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default function Temporary() {
  const [location] = useLocation();

  let ContentComponent = OnSiteInterviews;
  if (location === "/temporary/tech-stack") {
    ContentComponent = TechStack;
  }

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={temporaryTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        <ContentComponent />
      </div>
    </div>
  );
}
