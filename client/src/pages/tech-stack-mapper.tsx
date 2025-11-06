import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  DollarSign, 
  Mail, 
  Calendar, 
  FileText, 
  BarChart3, 
  Users, 
  Globe,
  Search,
  AlertCircle,
  CheckCircle2,
  Building2
} from "lucide-react";
import {
  SiSalesforce,
  SiMailchimp,
  SiHubspot,
  SiStripe,
  SiQuickbooks,
  SiGoogle,
  SiAsana,
  SiTableau,
  SiEventbrite,
  SiSmartthings,
  SiAdp
} from "react-icons/si";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Platform {
  name: string;
  description: string;
  popularity?: "high" | "medium" | "growing";
  logo?: React.ComponentType<{ className?: string; size?: number }>;
  logoColor?: string;
  fallbackInitials?: string;
}

interface TechCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
  platforms: Platform[];
  painPoints: string[];
  integrationNeed: "critical" | "high" | "medium";
}

// Logo fallback component for platforms without official icons
const LogoFallback = ({ initials, color }: { initials: string; color?: string }) => (
  <div 
    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold ${
      color || 'bg-muted text-muted-foreground'
    }`}
  >
    {initials}
  </div>
);

const techStackData: TechCategory[] = [
  {
    id: "crm",
    title: "Constituent Relationship Management (CRM)",
    description: "Core donor database tracking gifts, pledges, events, moves management, and communications history",
    icon: Database,
    platforms: [
      { 
        name: "Blackbaud Raiser's Edge NXT", 
        description: "Industry standard for large nonprofits and faith-based foundations", 
        popularity: "high",
        fallbackInitials: "BB",
        logoColor: "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300"
      },
      { 
        name: "Salesforce NPSP", 
        description: "Flexible, cloud-based CRM for integrated donor + volunteer + grant tracking", 
        popularity: "high",
        logo: SiSalesforce,
        logoColor: "#00A1E0"
      },
      { 
        name: "Virtuous CRM", 
        description: "Growing in popularity for mid-to-large orgs seeking donor personalization and automation", 
        popularity: "growing",
        fallbackInitials: "VC",
        logoColor: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
      },
      { 
        name: "EveryAction / Bonterra", 
        description: "Often used by advocacy or membership-based nonprofits", 
        popularity: "medium",
        fallbackInitials: "EA",
        logoColor: "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300"
      }
    ],
    painPoints: [
      "Limited integration with other tools",
      "Manual data entry for events or grants",
      "Reporting requires exports to Excel or Power BI"
    ],
    integrationNeed: "critical"
  },
  {
    id: "wealth",
    title: "Wealth Screening & Prospect Research",
    description: "Identify, score, and prioritize high-capacity donors and institutions",
    icon: DollarSign,
    platforms: [
      { 
        name: "WealthEngine", 
        description: "Wealth and lifestyle indicators", 
        popularity: "high",
        fallbackInitials: "WE",
        logoColor: "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
      },
      { 
        name: "iWave", 
        description: "Combines wealth, philanthropic, and corporate data", 
        popularity: "high",
        fallbackInitials: "iW",
        logoColor: "bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300"
      },
      { 
        name: "DonorSearch", 
        description: "Major gift indicators and giving history across databases", 
        popularity: "medium",
        fallbackInitials: "DS",
        logoColor: "bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300"
      },
      { 
        name: "Windfall", 
        description: "Real estate and household income data updated weekly", 
        popularity: "growing",
        fallbackInitials: "WF",
        logoColor: "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300"
      }
    ],
    painPoints: [
      "Static data quickly becomes outdated",
      "Systems often siloed from CRM (manual import/export)",
      "Quarterly screenings not real-time"
    ],
    integrationNeed: "critical"
  },
  {
    id: "marketing",
    title: "Marketing & Donor Communication",
    description: "Email, newsletters, text campaigns, and donor journeys",
    icon: Mail,
    platforms: [
      { 
        name: "Mailchimp", 
        description: "Traditional email marketing", 
        popularity: "high",
        logo: SiMailchimp,
        logoColor: "#FFE01B"
      },
      { 
        name: "Microsoft Outlook", 
        description: "Email and calendar management", 
        popularity: "high",
        fallbackInitials: "OL",
        logoColor: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
      },
      { 
        name: "Constant Contact", 
        description: "Email marketing for nonprofits", 
        popularity: "medium",
        fallbackInitials: "CC",
        logoColor: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
      },
      { 
        name: "HubSpot for Nonprofits", 
        description: "Integrated marketing automation and donor nurturing", 
        popularity: "growing",
        logo: SiHubspot,
        logoColor: "#FF7A59"
      },
      { 
        name: "Classy / Funraise", 
        description: "Donation pages, crowdfunding, and event management", 
        popularity: "medium",
        fallbackInitials: "CF",
        logoColor: "bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300"
      }
    ],
    painPoints: [
      "Disconnected from CRM, limited donor segmentation",
      "No unified record of donor communications across channels",
      "Manual list uploads and updates"
    ],
    integrationNeed: "high"
  },
  {
    id: "events",
    title: "Event Management",
    description: "Galas, luncheons, golf tournaments, and donor visits",
    icon: Calendar,
    platforms: [
      { 
        name: "Eventbrite", 
        description: "Registration, ticketing, and auction management", 
        popularity: "high",
        logo: SiEventbrite,
        logoColor: "#F05537"
      },
      { 
        name: "Greater Giving / GiveSmart", 
        description: "Nonprofit event and auction platforms", 
        popularity: "medium",
        fallbackInitials: "GG",
        logoColor: "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300"
      },
      { 
        name: "OneCause", 
        description: "Event fundraising and bidding", 
        popularity: "medium",
        fallbackInitials: "OC",
        logoColor: "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300"
      },
      { 
        name: "Cvent", 
        description: "Large national conferences or hybrid events", 
        popularity: "medium",
        fallbackInitials: "CV",
        logoColor: "bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300"
      }
    ],
    painPoints: [
      "Event data not synced back to CRM",
      "Limited insights on event ROI",
      "No attendee-to-donor conversion tracking"
    ],
    integrationNeed: "high"
  },
  {
    id: "grants",
    title: "Grant Management Systems",
    description: "Proposals, deadlines, submissions, and reporting for institutional funders",
    icon: FileText,
    platforms: [
      { 
        name: "Fluxx", 
        description: "Large foundations and government grantors", 
        popularity: "high",
        fallbackInitials: "FX",
        logoColor: "bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300"
      },
      { 
        name: "Foundant GLM", 
        description: "Mid-sized nonprofits managing multiple grants", 
        popularity: "medium",
        fallbackInitials: "FG",
        logoColor: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
      },
      { 
        name: "SmartSimple / Submittable", 
        description: "Multi-funder coordination and workflow automation", 
        popularity: "medium",
        logo: SiSmartthings,
        logoColor: "#15BFFF"
      }
    ],
    painPoints: [
      "Operates separately from donor CRM",
      "No centralized view of funder engagement",
      "Manual tracking of proposal outcomes"
    ],
    integrationNeed: "high"
  },
  {
    id: "financial",
    title: "Financial & Accounting Systems",
    description: "Accounting, reconciliation, and integration with fundraising database",
    icon: BarChart3,
    platforms: [
      { 
        name: "Blackbaud Financial Edge NXT", 
        description: "Integrates with Raiser's Edge", 
        popularity: "high",
        fallbackInitials: "BB",
        logoColor: "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300"
      },
      { 
        name: "QuickBooks Enterprise", 
        description: "Common for nonprofits under $50M", 
        popularity: "high",
        logo: SiQuickbooks,
        logoColor: "#2CA01C"
      },
      { 
        name: "Sage Intacct", 
        description: "Modern cloud-based accounting and budgeting", 
        popularity: "growing",
        fallbackInitials: "SI",
        logoColor: "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300"
      }
    ],
    painPoints: [
      "Manual reconciliation between accounting and development",
      "Inconsistent revenue coding and fund designations",
      "Data entry duplication"
    ],
    integrationNeed: "critical"
  },
  {
    id: "analytics",
    title: "Data Analytics & Reporting",
    description: "Visualize performance, donor trends, and campaign results",
    icon: BarChart3,
    platforms: [
      { 
        name: "Microsoft Power BI", 
        description: "Highly adopted for dashboarding", 
        popularity: "high",
        fallbackInitials: "PBI",
        logoColor: "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300"
      },
      { 
        name: "Tableau", 
        description: "Visual analytics and executive reporting", 
        popularity: "high",
        logo: SiTableau,
        logoColor: "#E97627"
      },
      { 
        name: "Google Data Studio / Looker", 
        description: "Lightweight integrations", 
        popularity: "medium",
        logo: SiGoogle,
        logoColor: "#4285F4"
      }
    ],
    painPoints: [
      "Requires manual data exports and cleaning",
      "Inconsistent data definitions across departments",
      "Reports become stale quickly"
    ],
    integrationNeed: "medium"
  },
  {
    id: "collaboration",
    title: "Collaboration & Project Management",
    description: "Internal communication, workflow tracking, and coordination",
    icon: Users,
    platforms: [
      { 
        name: "Microsoft Teams / SharePoint", 
        description: "Communication and document storage", 
        popularity: "high",
        fallbackInitials: "MS",
        logoColor: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
      },
      { 
        name: "Asana", 
        description: "Project tracking and collaboration", 
        popularity: "medium",
        logo: SiAsana,
        logoColor: "#F06A6A"
      },
      { 
        name: "Monday.com", 
        description: "Work management and team collaboration", 
        popularity: "growing",
        fallbackInitials: "M",
        logoColor: "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300"
      },
      { 
        name: "Google Workspace", 
        description: "Email, Drive, Docs, Sheets", 
        popularity: "high",
        logo: SiGoogle,
        logoColor: "#4285F4"
      }
    ],
    painPoints: [
      "Fragmented communication between departments",
      "Files and data stored inconsistently",
      "Multiple versions, lack of control"
    ],
    integrationNeed: "medium"
  },
  {
    id: "digital",
    title: "Digital Fundraising & Payment Processing",
    description: "Online giving, recurring donations, and payment integrations",
    icon: Globe,
    platforms: [
      { 
        name: "Classy / Funraise", 
        description: "Modern online giving solutions", 
        popularity: "high",
        fallbackInitials: "CF",
        logoColor: "bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300"
      },
      { 
        name: "Stripe / Authorize.net", 
        description: "Payment processing layers", 
        popularity: "high",
        logo: SiStripe,
        logoColor: "#635BFF"
      },
      { 
        name: "Double the Donation", 
        description: "Employer matching integration", 
        popularity: "medium",
        fallbackInitials: "DD",
        logoColor: "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300"
      }
    ],
    painPoints: [
      "Donation data not linked cleanly to CRM",
      "Limited donor journey tracking post-gift",
      "Manual reconciliation required"
    ],
    integrationNeed: "critical"
  },
  {
    id: "operations",
    title: "HR, Volunteer & Operations",
    description: "Manage HR, volunteers, and internal staff operations",
    icon: Users,
    platforms: [
      { 
        name: "Paylocity / ADP", 
        description: "Payroll and HR", 
        popularity: "high",
        logo: SiAdp,
        logoColor: "#D8232A"
      },
      { 
        name: "VolunteerHub / Galaxy Digital", 
        description: "Volunteer tracking", 
        popularity: "medium",
        fallbackInitials: "VH",
        logoColor: "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300"
      },
      { 
        name: "Smartsheet", 
        description: "Operational planning and reporting", 
        popularity: "medium",
        fallbackInitials: "SS",
        logoColor: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
      }
    ],
    painPoints: [
      "Isolated from donor and grant systems",
      "Hard to connect operational impact to fundraising",
      "Volunteer data disconnected from donor profiles"
    ],
    integrationNeed: "medium"
  }
];

export default function TechStackMapper() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredData = techStackData.filter(category => 
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.platforms.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getIntegrationColor = (need: string) => {
    switch (need) {
      case "critical": return "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800";
      case "high": return "bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800";
      case "medium": return "bg-yellow-50 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800";
      default: return "";
    }
  };

  const getPopularityBadge = (popularity?: string) => {
    if (!popularity) return null;
    switch (popularity) {
      case "high":
        return <Badge variant="secondary" className="text-xs">Industry Leader</Badge>;
      case "growing":
        return <Badge variant="secondary" className="text-xs">Growing</Badge>;
      default:
        return null;
    }
  };

  const renderPlatformCard = (platform: Platform) => {
    const Logo = platform.logo;
    
    return (
      <div 
        key={platform.name}
        className="flex items-start gap-3 p-4 rounded-lg border bg-card hover-elevate transition-all"
        data-testid={`card-platform-${platform.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
      >
        {/* Logo */}
        <div className="shrink-0">
          {Logo ? (
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center p-2" style={platform.logoColor && platform.logoColor.startsWith('#') ? { color: platform.logoColor } : undefined}>
              <Logo size={24} className="shrink-0" />
            </div>
          ) : (
            <LogoFallback 
              initials={platform.fallbackInitials || platform.name.substring(0, 2).toUpperCase()} 
              color={platform.logoColor}
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-sm" data-testid={`text-platform-name-${platform.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
              {platform.name}
            </h4>
            {getPopularityBadge(platform.popularity)}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {platform.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="architecture" className="w-full">
        <TabsList className="grid w-full grid-cols-3" data-testid="tabs-tech-stack">
          <TabsTrigger value="architecture" data-testid="tab-architecture">System Architecture Overview</TabsTrigger>
          <TabsTrigger value="layers" data-testid="tab-layers">Tech Stack Layers</TabsTrigger>
          <TabsTrigger value="categories" data-testid="tab-categories">Technology Categories</TabsTrigger>
        </TabsList>

        {/* Tab 1: System Architecture Overview */}
        <TabsContent value="architecture" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Architecture Overview</CardTitle>
              <CardDescription>
                Visual map of all platforms grouped by functional category
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStackData.map((category) => (
              <div 
                key={category.id}
                className="rounded-lg border overflow-hidden hover-elevate transition-all"
              >
                {/* Thin Sky Blue Header */}
                <div 
                  className="flex items-center gap-3 px-4 py-3"
                  style={{ backgroundColor: '#0284C7' }}
                >
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                    <category.icon className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-sm text-white leading-tight">
                    {category.title.replace(' & ', ' ')}
                  </h4>
                </div>
                
                {/* Content Area */}
                <div className="p-5 bg-card">
                  <div className="flex flex-wrap gap-2">
                    {category.platforms.map((platform) => {
                      const Logo = platform.logo;
                      return (
                        <div
                          key={platform.name}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-muted/50 hover-elevate transition-all"
                          title={platform.name}
                        >
                          {Logo ? (
                            <div style={platform.logoColor && platform.logoColor.startsWith('#') ? { color: platform.logoColor } : undefined}>
                              <Logo size={16} className="shrink-0" />
                            </div>
                          ) : (
                            <div className={`w-4 h-4 rounded text-[8px] font-bold flex items-center justify-center ${platform.logoColor || 'bg-muted text-muted-foreground'}`}>
                              {platform.fallbackInitials || platform.name.substring(0, 1)}
                            </div>
                          )}
                          <span className="text-xs font-medium truncate max-w-[120px]">
                            {platform.name.split(' / ')[0].split(' ')[0]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
        </TabsContent>

        {/* Tab 2: Tech Stack Layers */}
        <TabsContent value="layers" className="space-y-6">
          <Card>
        <CardHeader>
          <CardTitle>Understanding the Technology Stack Layers</CardTitle>
          <CardDescription>
            How ERP, CRM, and Digital Engagement Platforms work together to create a unified system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Three Layer Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Digital Engagement Platform */}
            <div className="rounded-lg border overflow-hidden">
              <div className="px-4 py-3" style={{ backgroundColor: '#0284C7' }}>
                <h4 className="font-semibold text-sm text-white">Digital Engagement Platforms</h4>
              </div>
              <div className="p-5 space-y-3">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">PURPOSE</p>
                  <p className="text-sm">The "voice and face" of the organization — connecting digital channels to data systems for personalized communication</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">KEY FEATURES</p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Website & content management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Email & SMS marketing automation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Social media management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Event & community tools</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">EXAMPLES</p>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary" className="text-xs">Adobe Experience Cloud</Badge>
                    <Badge variant="secondary" className="text-xs">Salesforce Marketing Cloud</Badge>
                    <Badge variant="secondary" className="text-xs">HubSpot Marketing Hub</Badge>
                    <Badge variant="secondary" className="text-xs">Luminate Online</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">PRIMARY USERS</p>
                  <p className="text-sm">Marketing, Communications</p>
                </div>
              </div>
            </div>

            {/* CRM */}
            <div className="rounded-lg border overflow-hidden">
              <div className="px-4 py-3" style={{ backgroundColor: '#0284C7' }}>
                <h4 className="font-semibold text-sm text-white">CRM — Customer Relationship Management</h4>
              </div>
              <div className="p-5 space-y-3">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">PURPOSE</p>
                  <p className="text-sm">The "front office" system — enabling teams to nurture relationships and increase revenue or engagement</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">KEY FEATURES</p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Contact & donor management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Sales pipeline tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Marketing automation & campaigns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Customer service & case tracking</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">EXAMPLES</p>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary" className="text-xs">Salesforce</Badge>
                    <Badge variant="secondary" className="text-xs">HubSpot</Badge>
                    <Badge variant="secondary" className="text-xs">Zoho CRM</Badge>
                    <Badge variant="secondary" className="text-xs">Dynamics 365 Sales</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">PRIMARY USERS</p>
                  <p className="text-sm">Sales, Fundraising, Service</p>
                </div>
              </div>
            </div>

            {/* ERP */}
            <div className="rounded-lg border overflow-hidden">
              <div className="px-4 py-3" style={{ backgroundColor: '#0284C7' }}>
                <h4 className="font-semibold text-sm text-white">ERP — Enterprise Resource Planning</h4>
              </div>
              <div className="p-5 space-y-3">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">PURPOSE</p>
                  <p className="text-sm">The "internal nervous system" — helping leaders manage resources, control costs, and maintain compliance</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">KEY FEATURES</p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Financial management & accounting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Supply chain & procurement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Human resources & payroll</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Reporting & analytics dashboards</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">EXAMPLES</p>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary" className="text-xs">SAP S/4HANA</Badge>
                    <Badge variant="secondary" className="text-xs">Oracle ERP Cloud</Badge>
                    <Badge variant="secondary" className="text-xs">NetSuite</Badge>
                    <Badge variant="secondary" className="text-xs">Dynamics 365 F&O</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">PRIMARY USERS</p>
                  <p className="text-sm">Finance, HR, Operations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Flow Example */}
          <div className="rounded-lg border p-5 bg-muted/30">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              Integration Flow Example
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A donor gives online through a <strong>digital engagement platform</strong>, which records the gift and contact info into the <strong>CRM</strong>. The financial record and reconciliation then sync into the <strong>ERP</strong> for accounting and reporting. This seamless data flow ensures all systems stay synchronized while serving their specialized functions.
            </p>
          </div>
        </CardContent>
      </Card>
        </TabsContent>

        {/* Tab 3: Technology Categories */}
        <TabsContent value="categories" className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search categories, platforms, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
        <CardHeader>
          <CardTitle>Technology Categories</CardTitle>
          <CardDescription>
            {filteredData.length} {filteredData.length === 1 ? 'category' : 'categories'} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-4">
            {filteredData.map((category) => (
              <AccordionItem 
                key={category.id} 
                value={category.id}
                className="border rounded-lg px-6 py-2"
                data-testid={`accordion-category-${category.id}`}
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-4 text-left w-full">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <category.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-base" data-testid={`text-category-title-${category.id}`}>
                          {category.title}
                        </h3>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getIntegrationColor(category.integrationNeed)}`}
                        >
                          {category.integrationNeed.charAt(0).toUpperCase() + category.integrationNeed.slice(1)} Priority
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <div className="space-y-6 ml-14">
                    {/* Most Common Platforms */}
                    <div>
                      <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Most Common Platforms
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {category.platforms.map(renderPlatformCard)}
                      </div>
                    </div>

                    {/* Pain Points */}
                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                        Common Pain Points
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {category.painPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-orange-600 mt-0.5">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Integration Requirement */}
                    <div className={`rounded-lg p-4 ${getIntegrationColor(category.integrationNeed)}`}>
                      <h4 className="font-medium text-sm mb-1 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Integration Requirement
                      </h4>
                      <p className="text-sm">
                        This category requires <strong>{category.integrationNeed}</strong> priority integration with FundRazor's unified data layer.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No categories found matching "{searchQuery}"</p>
              </div>
            )}
          </CardContent>
        </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
