import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  DollarSign, 
  FileText, 
  BarChart3, 
  Users, 
  Search,
  AlertCircle,
  CheckCircle2,
  Building2,
  Stethoscope,
  Eye,
  CalendarCheck,
  LucideIcon
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { 
  techProducts, 
  TechProduct,
  categoryDescriptions, 
  categoryIntegrationNeeds 
} from "@/data/tech-products";

interface Platform {
  name: string;
  description: string;
  popularity?: "high" | "medium" | "growing";
  logo?: React.ComponentType<{ className?: string; size?: number }>;
  logoImage?: string;
  logoColor?: string;
  fallbackInitials?: string;
  ncrContext?: string;
}

interface TechCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  platforms: Platform[];
  painPoints: string[];
  integrationNeed: "critical" | "high" | "medium";
}

const LogoFallback = ({ initials, color }: { initials: string; color?: string }) => (
  <div 
    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold ${
      color || 'bg-muted text-muted-foreground'
    }`}
  >
    {initials}
  </div>
);

const categoryIcons: Record<string, LucideIcon> = {
  "CRM": Database,
  "Prospecting": DollarSign,
  "Analytics": BarChart3,
  "Grants": FileText,
  "HR & Finance": Users,
  "Clinical EHR": Stethoscope,
  "Transparency": Eye,
  "Coordination": CalendarCheck
};

const categoryTitles: Record<string, string> = {
  "CRM": "Constituent Relationship Management (CRM)",
  "Prospecting": "Prospecting & Wealth Screening",
  "Analytics": "Data Analytics & Reporting",
  "Grants": "Grant Discovery & Management",
  "HR & Finance": "HR & Finance",
  "Clinical EHR": "Clinical EHR",
  "Transparency": "Transparency & Funder Intelligence",
  "Coordination": "Volunteer & Event Coordination"
};

function buildTechStackData(products: TechProduct[]): TechCategory[] {
  const categoryMap = new Map<string, TechCategory>();
  
  products.forEach((product) => {
    const category = product.category;
    
    if (!categoryMap.has(category)) {
      categoryMap.set(category, {
        id: category.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        title: categoryTitles[category] || category,
        description: categoryDescriptions[category] || "",
        icon: categoryIcons[category] || Building2,
        platforms: [],
        painPoints: product.weaknesses.slice(0, 3),
        integrationNeed: categoryIntegrationNeeds[category] || "medium"
      });
    }
    
    const techCategory = categoryMap.get(category)!;
    techCategory.platforms.push({
      name: product.name,
      description: product.description,
      popularity: "high",
      logoImage: product.logoImage,
      ncrContext: product.ncrContext
    });
  });
  
  return Array.from(categoryMap.values());
}

export default function TechStackMapper() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const techStackData = useMemo(() => buildTechStackData(techProducts), []);
  
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

  return (
    <div className="space-y-6">
      <Tabs defaultValue="architecture" className="w-full">
        <TabsList className="grid w-full grid-cols-3" data-testid="tabs-tech-stack">
          <TabsTrigger value="architecture" data-testid="tab-architecture">System Architecture Overview</TabsTrigger>
          <TabsTrigger value="layers" data-testid="tab-layers">Tech Stack Layers</TabsTrigger>
          <TabsTrigger value="categories" data-testid="tab-categories">Technology Categories</TabsTrigger>
        </TabsList>

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
                <div className="flex items-center gap-3 px-4 py-3 bg-primary">
                  <div className="w-8 h-8 rounded-lg bg-primary-foreground/20 flex items-center justify-center shrink-0">
                    <category.icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-sm text-primary-foreground leading-tight">
                    {category.title.replace(' & ', ' ')}
                  </h4>
                </div>
                
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
                          {platform.logoImage ? (
                            <div className="w-5 h-5 rounded overflow-hidden shrink-0">
                              <img src={platform.logoImage} alt={platform.name} className="w-full h-full object-cover" />
                            </div>
                          ) : Logo ? (
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

        <TabsContent value="layers" className="space-y-6">
          <Card>
        <CardHeader>
          <CardTitle>Understanding the Technology Stack Layers</CardTitle>
          <CardDescription>
            How ERP, CRM, and Digital Engagement Platforms work together to create a unified system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg border overflow-hidden">
              <div className="px-4 py-3 bg-primary">
                <h4 className="font-semibold text-sm text-primary-foreground">Digital Engagement Platforms</h4>
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

            <div className="rounded-lg border overflow-hidden">
              <div className="px-4 py-3 bg-primary">
                <h4 className="font-semibold text-sm text-primary-foreground">CRM — Customer Relationship Management</h4>
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

            <div className="rounded-lg border overflow-hidden">
              <div className="px-4 py-3 bg-primary">
                <h4 className="font-semibold text-sm text-primary-foreground">ERP — Enterprise Resource Planning</h4>
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
                      <span>Project & operations management</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">EXAMPLES</p>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary" className="text-xs">SAP S/4HANA</Badge>
                    <Badge variant="secondary" className="text-xs">Oracle Fusion</Badge>
                    <Badge variant="secondary" className="text-xs">Workday</Badge>
                    <Badge variant="secondary" className="text-xs">Microsoft Dynamics 365 Finance</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">PRIMARY USERS</p>
                  <p className="text-sm">Finance, Operations, HR</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-dashed">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Key Insight: The Integration Challenge</h4>
                  <p className="text-sm text-muted-foreground">
                    Most organizations struggle because these three layers don't naturally talk to each other. 
                    <span className="font-medium text-foreground"> ERP systems</span> know about budgets and employees, 
                    <span className="font-medium text-foreground"> CRM systems</span> know about donors and relationships, and 
                    <span className="font-medium text-foreground"> Digital Engagement platforms</span> know about website visits and email clicks — 
                    but getting unified insights across all three requires intentional integration strategy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Platforms</p>
                <p className="text-3xl font-bold" data-testid="kpi-total-platforms">{techProducts.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Categories</p>
                <p className="text-3xl font-bold" data-testid="kpi-categories">{techStackData.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <AlertCircle className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Critical Priority</p>
                <p className="text-3xl font-bold" data-testid="kpi-critical">{techStackData.filter(c => c.integrationNeed === 'critical').length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">High Priority</p>
                <p className="text-3xl font-bold" data-testid="kpi-high">{techStackData.filter(c => c.integrationNeed === 'high').length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Search Bar */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">NCR Technology Categories</h2>
              <p className="text-sm text-muted-foreground">Current software platforms organized by function</p>
            </div>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories or platforms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-categories"
              />
            </div>
          </div>

          {/* Category Cards with Nested Platforms */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredData.map((category) => (
              <div
                key={category.id}
                className="rounded-lg border overflow-hidden hover-elevate transition-all"
                data-testid={`card-category-${category.id}`}
              >
                {/* Category Header */}
                <div className="flex items-center justify-between gap-3 px-6 py-4 bg-muted/50 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <category.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{category.title}</h3>
                      <p className="text-xs text-muted-foreground">{category.platforms.length} platform{category.platforms.length !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      category.integrationNeed === "critical" 
                        ? "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800" 
                        : category.integrationNeed === "high"
                        ? "bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
                        : "bg-yellow-50 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
                    }`}
                  >
                    {category.integrationNeed === "critical" ? "Critical" : 
                     category.integrationNeed === "high" ? "High" : "Medium"}
                  </Badge>
                </div>
                
                {/* Category Content */}
                <div className="p-6 bg-card space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Nested Platform Cards */}
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      NCR Platform{category.platforms.length !== 1 ? 's' : ''}
                    </p>
                    {category.platforms.map((platform) => (
                      <div 
                        key={platform.name}
                        className="flex items-start gap-3 p-4 rounded-lg bg-muted/50"
                        data-testid={`card-platform-${platform.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      >
                        {platform.logoImage ? (
                          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                            <img src={platform.logoImage} alt={platform.name} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                            <category.icon className="w-5 h-5 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm mb-1">{platform.name}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {platform.description}
                          </p>
                          {platform.ncrContext && (
                            <div className="mt-3 p-3 rounded-md bg-muted/50">
                              <p className="text-xs italic text-muted-foreground leading-relaxed">
                                {platform.ncrContext}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {category.painPoints.length > 0 && (
                    <div className="pt-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Key Challenges</p>
                      <div className="flex flex-wrap gap-2">
                        {category.painPoints.slice(0, 2).map((point, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs font-normal">
                            {point.length > 50 ? point.substring(0, 50) + '...' : point}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredData.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center">
                <Search className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No categories or platforms found matching "{searchQuery}"</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

      </Tabs>
    </div>
  );
}
