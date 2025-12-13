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
        <div className="shrink-0">
          {platform.logoImage ? (
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <img src={platform.logoImage} alt={platform.name} className="w-full h-full object-cover" />
            </div>
          ) : Logo ? (
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
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>NCR Technology Categories</CardTitle>
                  <CardDescription>
                    Current software platforms used at National Church Residences organized by function
                  </CardDescription>
                </div>
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-search-categories"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full space-y-3">
                {filteredData.map((category) => (
                  <AccordionItem 
                    key={category.id} 
                    value={category.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <AccordionTrigger 
                      className="px-4 py-3 hover:no-underline hover-elevate"
                      data-testid={`accordion-trigger-${category.id}`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: '#0284C7' }}
                        >
                          <category.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-sm">{category.title}</h3>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getIntegrationColor(category.integrationNeed)}`}
                            >
                              {category.integrationNeed === "critical" ? (
                                <><AlertCircle className="w-3 h-3 mr-1" /> Critical</>
                              ) : category.integrationNeed === "high" ? (
                                <><AlertCircle className="w-3 h-3 mr-1" /> High Priority</>
                              ) : (
                                <><CheckCircle2 className="w-3 h-3 mr-1" /> Medium</>
                              )}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{category.description}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            NCR Platform{category.platforms.length > 1 ? 's' : ''}
                          </h4>
                          <div className="grid grid-cols-1 gap-3">
                            {category.platforms.map(renderPlatformCard)}
                          </div>
                        </div>
                        
                        {category.painPoints.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                              Key Challenges
                            </h4>
                            <ul className="space-y-1.5">
                              {category.painPoints.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              {filteredData.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No categories match your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
