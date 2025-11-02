import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  CheckCircle2
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface TechCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
  platforms: {
    name: string;
    description: string;
    popularity?: "high" | "medium" | "growing";
  }[];
  painPoints: string[];
  integrationNeed: "critical" | "high" | "medium";
}

const techStackData: TechCategory[] = [
  {
    id: "crm",
    title: "Constituent Relationship Management (CRM)",
    description: "Core donor database tracking gifts, pledges, events, moves management, and communications history",
    icon: Database,
    platforms: [
      { name: "Blackbaud Raiser's Edge NXT", description: "Industry standard for large nonprofits and faith-based foundations", popularity: "high" },
      { name: "Salesforce NPSP", description: "Flexible, cloud-based CRM for integrated donor + volunteer + grant tracking", popularity: "high" },
      { name: "Virtuous CRM", description: "Growing in popularity for mid-to-large orgs seeking donor personalization and automation", popularity: "growing" },
      { name: "EveryAction / Bonterra", description: "Often used by advocacy or membership-based nonprofits", popularity: "medium" }
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
      { name: "WealthEngine", description: "Wealth and lifestyle indicators", popularity: "high" },
      { name: "iWave", description: "Combines wealth, philanthropic, and corporate data", popularity: "high" },
      { name: "DonorSearch", description: "Major gift indicators and giving history across databases", popularity: "medium" },
      { name: "Windfall", description: "Real estate and household income data updated weekly", popularity: "growing" }
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
      { name: "Mailchimp", description: "Traditional email marketing", popularity: "high" },
      { name: "Constant Contact", description: "Email marketing for nonprofits", popularity: "medium" },
      { name: "HubSpot for Nonprofits", description: "Integrated marketing automation and donor nurturing", popularity: "growing" },
      { name: "Classy / Funraise", description: "Donation pages, crowdfunding, and event management", popularity: "medium" }
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
      { name: "Eventbrite", description: "Registration, ticketing, and auction management", popularity: "high" },
      { name: "Greater Giving / GiveSmart", description: "Nonprofit event and auction platforms", popularity: "medium" },
      { name: "OneCause", description: "Event fundraising and bidding", popularity: "medium" },
      { name: "Cvent", description: "Large national conferences or hybrid events", popularity: "medium" }
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
      { name: "Fluxx", description: "Large foundations and government grantors", popularity: "high" },
      { name: "Foundant GLM", description: "Mid-sized nonprofits managing multiple grants", popularity: "medium" },
      { name: "SmartSimple / Submittable", description: "Multi-funder coordination and workflow automation", popularity: "medium" }
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
      { name: "Blackbaud Financial Edge NXT", description: "Integrates with Raiser's Edge", popularity: "high" },
      { name: "QuickBooks Enterprise", description: "Common for nonprofits under $50M", popularity: "high" },
      { name: "Sage Intacct", description: "Modern cloud-based accounting and budgeting", popularity: "growing" }
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
      { name: "Microsoft Power BI", description: "Highly adopted for dashboarding", popularity: "high" },
      { name: "Tableau", description: "Visual analytics and executive reporting", popularity: "high" },
      { name: "Google Data Studio / Looker", description: "Lightweight integrations", popularity: "medium" }
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
      { name: "Microsoft Teams / SharePoint", description: "Communication and document storage", popularity: "high" },
      { name: "Asana / Monday.com", description: "Project tracking and collaboration", popularity: "medium" },
      { name: "Google Workspace", description: "Email, Drive, Docs, Sheets", popularity: "high" }
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
      { name: "Classy / Funraise", description: "Modern online giving solutions", popularity: "high" },
      { name: "Stripe / Authorize.net", description: "Payment processing layers", popularity: "high" },
      { name: "Double the Donation", description: "Employer matching integration", popularity: "medium" }
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
      { name: "Paylocity / ADP", description: "Payroll and HR", popularity: "high" },
      { name: "VolunteerHub / Galaxy Digital", description: "Volunteer tracking", popularity: "medium" },
      { name: "Smartsheet", description: "Operational planning and reporting", popularity: "medium" }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold" data-testid="text-page-title">Tech Stack Mapper</h1>
        <p className="text-sm text-muted-foreground" data-testid="text-page-description">
          Typical technology landscape for large nonprofits and integration requirements
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search platforms or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-platforms"
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Categories</p>
              <p className="text-5xl font-bold" data-testid="text-total-categories">{techStackData.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Common Platforms</p>
              <p className="text-5xl font-bold" data-testid="text-total-platforms">
                {techStackData.reduce((sum, cat) => sum + cat.platforms.length, 0)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Critical Integrations</p>
              <p className="text-5xl font-bold" data-testid="text-critical-integrations">
                {techStackData.filter(c => c.integrationNeed === "critical").length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tech Stack Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Technology Categories</CardTitle>
          <CardDescription>Comprehensive overview of nonprofit technology landscape</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="space-y-4">
            {filteredData.map((category, index) => {
              const Icon = category.icon;
              return (
                <AccordionItem 
                  key={category.id} 
                  value={category.id}
                  className="border rounded-lg px-6"
                  data-testid={`accordion-category-${index + 1}`}
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4 w-full">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 text-left space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-base font-semibold" data-testid={`text-category-${index + 1}-title`}>
                            {category.title}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getIntegrationColor(category.integrationNeed)}`}
                          >
                            {category.integrationNeed === "critical" ? "Critical Integration" : 
                             category.integrationNeed === "high" ? "High Priority" : "Medium Priority"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-6">
                    {/* Common Platforms */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <h4 className="text-sm font-semibold">Most Common Platforms</h4>
                      </div>
                      <div className="ml-6 space-y-3">
                        {category.platforms.map((platform, pIndex) => (
                          <div key={pIndex} className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{platform.name}</span>
                              {getPopularityBadge(platform.popularity)}
                            </div>
                            <p className="text-sm text-muted-foreground">{platform.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pain Points */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        <h4 className="text-sm font-semibold">Common Pain Points</h4>
                      </div>
                      <ul className="ml-6 space-y-2">
                        {category.painPoints.map((pain, pIndex) => (
                          <li key={pIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-muted-foreground mt-1">•</span>
                            <span>{pain}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-muted-foreground">No results found for "{searchQuery}"</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
