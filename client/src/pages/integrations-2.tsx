import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, ExternalLink } from "lucide-react";

// Category color mapping - using inline styles for reliable rendering
const categoryColors: Record<string, { from: string; to: string }> = {
  "Advocacy": { from: "#7C3AED", to: "#9333EA" },           // Purple
  "Auctions + Events": { from: "#EA580C", to: "#F97316" }, // Orange
  "Consulting": { from: "#334155", to: "#475569" },         // Slate
  "Email + Text + Marketing": { from: "#2563EB", to: "#3B82F6" }, // Blue
  "Financial + Accounting": { from: "#15803D", to: "#16A34A" },   // Green
  "Matching Gifts": { from: "#DB2777", to: "#EC4899" },     // Pink
  "Online Fundraising": { from: "#0891B2", to: "#06B6D4" }, // Cyan
  "Payment Processing": { from: "#047857", to: "#10B981" }, // Emerald
  "Prospect Research": { from: "#4338CA", to: "#6366F1" },  // Indigo
  "Volunteer Management": { from: "#D97706", to: "#F59E0B" }, // Amber
  "Website Management": { from: "#0F766E", to: "#14B8A6" }, // Teal
  "Education": { from: "#6D28D9", to: "#8B5CF6" },          // Violet
};

interface Integration {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  featured?: boolean;
  url?: string;
}

const integrations: Integration[] = [
  {
    id: "agile-ticketing",
    name: "Agile Ticketing",
    logo: "https://uploads.donorperfect.com/images/sites/3/Agile-Ticketing2-300x124-1.png",
    description: "Nonprofit ticketing solutions that meet the needs of every venue.",
    category: "Auctions + Events"
  },
  {
    id: "appealmaker",
    name: "AppealMaker",
    logo: "https://uploads.donorperfect.com/images/sites/3/am-logo-white-300x41-1.png",
    description: "Create and send your direct mail with the solution designed for nonprofits.",
    category: "Email + Text + Marketing"
  },
  {
    id: "birdease",
    name: "BirdEase",
    logo: "https://uploads.donorperfect.com/images/sites/3/BirdEase-white-300x203-1.png",
    description: "Streamline the management of golf fundraisers",
    category: "Auctions + Events"
  },
  {
    id: "congress-plus",
    name: "Congress Plus",
    logo: "https://uploads.donorperfect.com/images/sites/3/congress-plus.png",
    description: "A powerful government relations and advocacy platform.",
    category: "Advocacy"
  },
  {
    id: "constant-contact",
    name: "Constant Contact",
    logo: "https://uploads.donorperfect.com/images/sites/3/constant-contact_logo-white-300x.png",
    description: "Create email and text campaigns that inspire more engagement.",
    category: "Email + Text + Marketing",
    featured: true
  },
  {
    id: "consultants",
    name: "Consultants",
    logo: "https://uploads.donorperfect.com/images/sites/3/consultants-logo-1.png",
    description: "See a complete list of consulting partners.",
    category: "Consulting"
  },
  {
    id: "donatestock",
    name: "DonateStock",
    logo: "https://uploads.donorperfect.com/images/sites/3/donate-stock-logo-long-1-1.png",
    description: "Unlocking charitable stock gifting for all nonprofits.",
    category: "Payment Processing"
  },
  {
    id: "dp-classic-forms",
    name: "DonorPerfect Classic Forms",
    logo: "https://uploads.donorperfect.com/images/sites/3/dp-classic-forms-white-800px.png",
    description: "Save time and raise more with customizable integrated online forms",
    category: "Online Fundraising"
  },
  {
    id: "dp-payment-services",
    name: "DonorPerfect Payment Services",
    logo: "https://uploads.donorperfect.com/images/sites/3/dp-payment-services-white-1.png",
    description: "Manage gift collection with processing for nonprofits.",
    category: "Payment Processing"
  },
  {
    id: "donorsearch",
    name: "DonorSearch",
    logo: "https://uploads.donorperfect.com/images/sites/3/donorsearch-logo-white-grey-300x.png",
    description: "Perform prospect research and wealth screening.",
    category: "Prospect Research",
    featured: true
  },
  {
    id: "double-the-donation",
    name: "Double the Donation",
    logo: "https://uploads.donorperfect.com/images/sites/3/double-the-donation-logo-2.jpg",
    description: "Prompt donors to submit for matching gifts.",
    category: "Matching Gifts",
    featured: true
  },
  {
    id: "dp-address-updater",
    name: "DP Address Updater",
    logo: "https://uploads.donorperfect.com/images/sites/3/dp-address-updater-white-1.png",
    description: "Keep your donor data up-to-date automatically.",
    category: "Email + Text + Marketing"
  },
  {
    id: "dp-checkscan",
    name: "DP CheckScan",
    logo: "https://uploads.donorperfect.com/images/sites/3/dp-check-scan-logo-white-1.png",
    description: "Streamline the processing of check donations.",
    category: "Payment Processing"
  },
  {
    id: "dp-giving-meter",
    name: "DP Giving Meter",
    logo: "https://uploads.donorperfect.com/images/sites/3/dp-giving-meter-logo-white-1.png",
    description: "Boost donations by showing your fundraising goal with a DP Giving Meter on your website.",
    category: "Online Fundraising"
  },
  {
    id: "dp-mobile",
    name: "DP Mobile",
    logo: "https://uploads.donorperfect.com/images/sites/3/dp-mobile-logo-white-1.png",
    description: "Take DonorPerfect with you wherever you go.",
    category: "Online Fundraising"
  },
  {
    id: "dp-text",
    name: "DP Text",
    logo: "https://uploads.donorperfect.com/images/sites/3/dp-text-white-1.png",
    description: "Communicate with supporters via text messaging.",
    category: "Email + Text + Marketing"
  },
  {
    id: "dp-video",
    name: "DP Video powered by CauseVid",
    logo: "https://uploads.donorperfect.com/images/sites/3/dp-video-logo-2-white-1.png",
    description: "Add a personal touch to thank yous with custom videos",
    category: "Email + Text + Marketing"
  },
  {
    id: "formplus",
    name: "FormPlus",
    logo: "https://uploads.donorperfect.com/images/sites/3/form-plus-logo-white-e1705002906389-1.png",
    description: "Get all of your printing needs taken care of plus swag items from Formsplus.",
    category: "Email + Text + Marketing"
  },
  {
    id: "givecloud",
    name: "Givecloud",
    logo: "https://uploads.donorperfect.com/images/sites/3/givecloud-white-logo.png",
    description: "Event Registration, Membership, DonorPortal, E-Commerce and more.",
    category: "Website Management",
    featured: true
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    logo: "https://uploads.donorperfect.com/images/sites/3/google-analytics-logo-1.png",
    description: "Google Analytics 4 (GA4), the leading website reporting platform.",
    category: "Email + Text + Marketing"
  },
  {
    id: "kindsight",
    name: "Kindsight",
    logo: "https://uploads.donorperfect.com/images/sites/3/Kindsight_Logo_neutral5-1.png",
    description: "Donor research and wealth screening to make evidence-based decisions.",
    category: "Prospect Research"
  },
  {
    id: "paypal",
    name: "PayPal",
    logo: "https://uploads.donorperfect.com/images/sites/3/paypal-logo-1.png",
    description: "PayPal is the second most trusted financial services brand in the world.",
    category: "Financial + Accounting"
  },
  {
    id: "point",
    name: "POINT",
    logo: "https://uploads.donorperfect.com/images/sites/3/point-logo-1.png",
    description: "Recruit, manage, engage and report on your volunteers",
    category: "Volunteer Management"
  },
  {
    id: "practivated",
    name: "Practivated",
    logo: "https://uploads.donorperfect.com/images/sites/3/practivated-logo-white.png",
    description: "AI-powered conversation platform designed specifically for fundraisers.",
    category: "Prospect Research"
  },
  {
    id: "quickbooks-integration",
    name: "QuickBooks Integration",
    logo: "https://uploads.donorperfect.com/images/sites/3/DP-Accounting-with-Quickbooks-white-1.png",
    description: "Send financial data from DonorPerfect to QuickBooks.",
    category: "Financial + Accounting",
    featured: true
  },
  {
    id: "quickbooks-online",
    name: "QuickBooks Online",
    logo: "https://uploads.donorperfect.com/images/sites/3/intuit-quickbooks-logo-2.png",
    description: "Get the #1 rated online accounting software for nonprofit organizations",
    category: "Financial + Accounting"
  },
  {
    id: "raisin",
    name: "raisin",
    logo: "https://uploads.donorperfect.com/images/sites/3/raisin-logo-white-1.png",
    description: "Launch peer-to-peer fundraising campaigns.",
    category: "Online Fundraising",
    featured: true
  },
  {
    id: "ravela-insights",
    name: "Ravela Insights",
    logo: "https://uploads.donorperfect.com/images/sites/3/ravela-logo.jpg",
    description: "Gain insight into what's working for your organization and what's not.",
    category: "Prospect Research"
  },
  {
    id: "readysetauction",
    name: "ReadySetAuction",
    logo: "https://uploads.donorperfect.com/images/sites/3/readysetauction-logo-white-1.png",
    description: "Run a live, silent, or online auction at your event.",
    category: "Auctions + Events"
  },
  {
    id: "rediker",
    name: "Rediker Software",
    logo: "https://uploads.donorperfect.com/images/sites/3/rediker-software-logo-1.png",
    description: "Spend less time with data and more time with students.",
    category: "Education"
  },
  {
    id: "sage-intacct",
    name: "Sage Intacct Fundraising",
    logo: "https://uploads.donorperfect.com/images/sites/3/sage-rectangle-logo.png",
    description: "A comprehensive fundraising and financial solution built for nonprofits with complex financial needs.",
    category: "Financial + Accounting"
  },
  {
    id: "shopraise",
    name: "ShopRaise",
    logo: "https://uploads.donorperfect.com/images/sites/3/shop-raise-logo-1.png",
    description: "Raise money for your cause with everyday shopping.",
    category: "Online Fundraising"
  },
  {
    id: "signup",
    name: "SignUp",
    logo: "https://uploads.donorperfect.com/images/sites/3/vspot-white-logo-1.png",
    description: "Make it easy for volunteers to autonomously sign up for positions at your organization.",
    category: "Volunteer Management"
  },
  {
    id: "simpletix",
    name: "SimpleTix",
    logo: "https://uploads.donorperfect.com/images/sites/3/simple-tix-logo.png",
    description: "Manage event ticketing, seating, and attendance from your mobile devices.",
    category: "Auctions + Events"
  },
  {
    id: "volunteer-matrix",
    name: "Volunteer Matrix",
    logo: "https://uploads.donorperfect.com/images/sites/3/volunteer-matrix-logo-1-1.png",
    description: "Customize your volunteer scheduling and management system to seamlessly match your nonprofit's internal processes.",
    category: "Volunteer Management"
  },
  {
    id: "winspire",
    name: "Winspire",
    logo: "https://uploads.donorperfect.com/images/sites/3/winspire-logo-copy-e1708629306330-1.png",
    description: "Offer luxury items at your auction risk free.",
    category: "Auctions + Events"
  },
  {
    id: "zog-inc",
    name: "ZOG Inc",
    logo: "https://uploads.donorperfect.com/images/sites/3/zog-logo-big.jpg",
    description: "Hire on demand IT experts for your nonprofit needs.",
    category: "Website Management"
  }
];

export default function Integrations2() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Integrations");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(integrations.map(i => i.category))).sort();
    return ["All Integrations", ...cats];
  }, []);

  const filteredIntegrations = useMemo(() => {
    return integrations.filter((integration) => {
      const matchesCategory =
        selectedCategory === "All Integrations" || integration.category === selectedCategory;
      
      if (!searchQuery) return matchesCategory;

      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        integration.name.toLowerCase().includes(searchLower) ||
        integration.description.toLowerCase().includes(searchLower) ||
        integration.category.toLowerCase().includes(searchLower);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const getCategoryCount = (category: string) => {
    if (category === "All Integrations") return integrations.length;
    return integrations.filter(i => i.category === category).length;
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold">Add to your fundraising toolbelt</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          FundRazor already comes packed with powerful features, but your system doesn't have to stop there. 
          We've found you the best tools for the job – each of our software integrations are tested and trusted by nonprofit professionals.
        </p>
        <p className="text-base font-medium">
          Start adding capabilities to your FundRazor suite. Browse our integration partners below.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search integrations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 text-base"
          data-testid="input-search-integrations"
        />
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="flex gap-8">
        {/* Category Sidebar */}
        <div className="w-64 flex-shrink-0">
          <Card className="p-4 sticky top-4">
            <h3 className="font-semibold text-sm mb-4">Filter by:</h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground font-medium"
                      : "hover:bg-muted"
                  }`}
                  data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{category}</span>
                    <Badge 
                      variant={selectedCategory === category ? "secondary" : "outline"} 
                      className="text-xs ml-2"
                    >
                      {getCategoryCount(category)}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredIntegrations.length} of {integrations.length} integrations
          </div>

          {/* Partner Card - Become a Partner */}
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 hover-elevate cursor-pointer">
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0 w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center">
                <Plus className="w-12 h-12 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Become a Partner</h3>
                <p className="text-muted-foreground mb-4">
                  Join our partner ecosystem and bring your solution to nonprofit organizations worldwide.
                </p>
                <Button variant="default" data-testid="button-become-partner">
                  Send a Request
                </Button>
              </div>
            </div>
          </Card>

          {/* Integration Grid - 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredIntegrations.map((integration) => {
              const colors = categoryColors[integration.category] || { from: "#1E293B", to: "#334155" };
              
              return (
                <Card
                  key={integration.id}
                  className="overflow-hidden hover-elevate cursor-pointer relative"
                  data-testid={`card-integration-${integration.id}`}
                >
                  {integration.featured && (
                    <Badge 
                      variant="default" 
                      className="absolute top-4 right-4 bg-chart-1 hover:bg-chart-1 z-10"
                      data-testid={`badge-featured-${integration.id}`}
                    >
                      Featured
                    </Badge>
                  )}
                  
                  {/* Category-colored Logo Section */}
                  <div 
                    className="h-32 flex items-center justify-center p-6"
                    style={{
                      background: `linear-gradient(to bottom right, ${colors.from}, ${colors.to})`
                    }}
                    data-testid={`header-${integration.id}`}
                  >
                    <img
                      src={integration.logo}
                      alt={`${integration.name} logo`}
                      className="max-w-full max-h-20 object-contain"
                      data-testid={`img-logo-${integration.id}`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    {/* Name */}
                    <h3 className="font-bold text-lg" data-testid={`text-name-${integration.id}`}>
                      {integration.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-3" data-testid={`text-description-${integration.id}`}>
                      {integration.description}
                    </p>

                    {/* Category Badge */}
                    <Badge variant="outline" className="text-xs" data-testid={`badge-category-${integration.id}`}>
                      {integration.category}
                    </Badge>

                    {/* Learn More Button */}
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      data-testid={`button-learn-more-${integration.id}`}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Learn more
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredIntegrations.length === 0 && (
            <Card className="p-12">
              <div className="text-center space-y-3">
                <Search className="w-12 h-12 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-semibold">No integrations found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Integrations");
                  }}
                  data-testid="button-clear-filters"
                >
                  Clear Filters
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
