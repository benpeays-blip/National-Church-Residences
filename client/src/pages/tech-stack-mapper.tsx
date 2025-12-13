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
  CheckCircle2,
  Building2,
  Stethoscope,
  Eye,
  CalendarCheck,
  LucideIcon,
  ArrowRight,
  ExternalLink,
  Zap,
  Target,
  Shield,
  Layers,
  Network
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { 
  techProducts, 
  TechProduct,
  categoryIntegrationNeeds 
} from "@/data/tech-products";

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

const layerMapping: Record<string, "core" | "intelligence" | "operations"> = {
  "CRM": "core",
  "Prospecting": "intelligence",
  "Analytics": "intelligence",
  "Grants": "core",
  "HR & Finance": "operations",
  "Clinical EHR": "operations",
  "Transparency": "intelligence",
  "Coordination": "operations"
};

const layerInfo = {
  core: { 
    label: "Core Systems", 
    icon: Layers,
    description: "Primary data sources and systems of record",
    bgClass: "bg-blue-50 dark:bg-blue-950/30",
    dotClass: "bg-blue-500",
    iconBgClass: "bg-blue-500"
  },
  intelligence: { 
    label: "Intelligence Layer", 
    icon: Zap,
    description: "Analytics, insights, and decision support",
    bgClass: "bg-purple-50 dark:bg-purple-950/30",
    dotClass: "bg-purple-500",
    iconBgClass: "bg-purple-500"
  },
  operations: { 
    label: "Operations", 
    icon: Network,
    description: "Day-to-day management and coordination",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/30",
    dotClass: "bg-emerald-500",
    iconBgClass: "bg-emerald-500"
  }
};

export default function TechStackMapper() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredProducts = techProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedByLayer = useMemo(() => {
    const groups = { core: [] as TechProduct[], intelligence: [] as TechProduct[], operations: [] as TechProduct[] };
    techProducts.forEach(product => {
      const layer = layerMapping[product.category];
      groups[layer].push(product);
    });
    return groups;
  }, []);

  const filteredGroupedByLayer = useMemo(() => {
    const groups = { core: [] as TechProduct[], intelligence: [] as TechProduct[], operations: [] as TechProduct[] };
    filteredProducts.forEach(product => {
      const layer = layerMapping[product.category];
      groups[layer].push(product);
    });
    return groups;
  }, [filteredProducts]);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="architecture" className="w-full">
        <TabsList className="grid w-full grid-cols-3" data-testid="tabs-tech-stack">
          <TabsTrigger value="architecture" data-testid="tab-architecture">Tech Ecosystem</TabsTrigger>
          <TabsTrigger value="layers" data-testid="tab-layers">Stack Architecture</TabsTrigger>
          <TabsTrigger value="categories" data-testid="tab-categories">Platform Details</TabsTrigger>
        </TabsList>

        {/* TAB 1: Tech Ecosystem - Visual overview of all platforms */}
        <TabsContent value="architecture" className="space-y-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>NCR Technology Ecosystem</CardTitle>
              <CardDescription className="max-w-2xl mx-auto">
                A unified view of the optimized technology stack powering fundraising, operations, and intelligence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {(["core", "intelligence", "operations"] as const).map((layer) => {
                const info = layerInfo[layer];
                const products = filteredGroupedByLayer[layer];
                if (products.length === 0 && searchQuery) return null;
                
                return (
                  <div key={layer} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${info.dotClass}`} />
                      <div>
                        <h3 className="font-semibold text-sm">{info.label}</h3>
                        <p className="text-xs text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {(searchQuery ? products : groupedByLayer[layer]).map((product) => {
                        const CategoryIcon = categoryIcons[product.category] || Building2;
                        return (
                          <Card 
                            key={product.id}
                            className="overflow-hidden hover-elevate transition-all"
                            data-testid={`card-ecosystem-${product.id}`}
                          >
                            <div 
                              className="h-1 w-full"
                              style={{ backgroundColor: product.brandColor }}
                            />
                            <CardContent className="p-6 space-y-3">
                              <div className="flex items-start gap-3">
                                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-muted">
                                  <img 
                                    src={product.logoImage} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-sm leading-tight">{product.name}</h4>
                                  <p className="text-xs text-muted-foreground mt-0.5">{product.tagline}</p>
                                </div>
                              </div>
                              <Badge variant="secondary" className="text-xs gap-1">
                                <CategoryIcon className="w-3 h-3" />
                                {product.category}
                              </Badge>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {product.strengths[0]}
                              </p>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <Card className="border-dashed">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 justify-center flex-wrap">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-muted-foreground">Core Systems</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      <span className="text-muted-foreground">Intelligence Layer</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-muted-foreground">Operations</span>
                    </div>
                  </div>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Data flows from core systems through analytics and intelligence layers to power operational decisions
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: Stack Architecture - Understanding the layers */}
        <TabsContent value="layers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Understanding the Technology Stack</CardTitle>
              <CardDescription>
                How NCR's platforms work together across three strategic layers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {(["core", "intelligence", "operations"] as const).map((layer) => {
                const info = layerInfo[layer];
                const LayerIcon = info.icon;
                const products = searchQuery ? filteredGroupedByLayer[layer] : groupedByLayer[layer];
                
                if (products.length === 0 && searchQuery) return null;
                
                return (
                  <Card key={layer} className="overflow-hidden">
                    <div className={`px-6 py-4 ${info.bgClass} border-b flex items-center gap-3`}>
                      <div className={`w-10 h-10 rounded-lg ${info.iconBgClass} flex items-center justify-center`}>
                        <LayerIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{info.label}</h4>
                        <p className="text-xs text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className={`grid grid-cols-1 ${products.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
                        {products.map((product) => (
                          <div key={product.id} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                            <img src={product.logoImage} alt={product.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                            <div className="min-w-0">
                              <p className="font-medium text-sm">{product.name}</p>
                              <p className="text-xs text-muted-foreground">{product.category} — {product.tagline}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              <Card className="border-dashed">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">The Integration Imperative</h4>
                      <p className="text-sm text-muted-foreground">
                        Each platform excels in its domain, but the real power comes from integration. 
                        <span className="font-medium text-foreground"> Core systems</span> hold the data, 
                        <span className="font-medium text-foreground"> Intelligence tools</span> surface insights, and 
                        <span className="font-medium text-foreground"> Operations platforms</span> execute on those insights. 
                        FundRazor bridges these layers to deliver unified fundraising intelligence.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: Platform Details - Detailed view of each platform */}
        <TabsContent value="categories" className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Platform Directory</h2>
              <p className="text-sm text-muted-foreground">Detailed profiles of each technology in the NCR stack</p>
            </div>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search platforms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-platforms"
              />
            </div>
          </div>

          <div className="space-y-6">
            {filteredProducts.map((product) => {
              const CategoryIcon = categoryIcons[product.category] || Building2;
              const priority = categoryIntegrationNeeds[product.category];
              
              return (
                <Card 
                  key={product.id} 
                  className="overflow-hidden"
                  data-testid={`card-platform-${product.id}`}
                >
                  <div 
                    className="h-2 w-full"
                    style={{ backgroundColor: product.brandColor }}
                  />
                  
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-1 space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-muted">
                            <img 
                              src={product.logoImage} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-base">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.tagline}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="secondary" className="text-xs gap-1">
                                <CategoryIcon className="w-3 h-3" />
                                {product.category}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  priority === "critical" 
                                    ? "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800" 
                                    : priority === "high"
                                    ? "bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
                                    : "bg-yellow-50 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
                                }`}
                              >
                                {priority === "critical" ? "Critical" : priority === "high" ? "High" : "Medium"} Priority
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {product.description}
                        </p>

                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => window.open(product.website, '_blank')}
                          data-testid={`link-website-${product.id}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Visit Website
                        </Button>
                      </div>

                      <div className="lg:col-span-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <h4 className="font-medium text-sm">Key Strengths</h4>
                        </div>
                        <ul className="space-y-2">
                          {product.strengths.slice(0, 4).map((strength, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-emerald-600 dark:text-emerald-400 mt-1 shrink-0">+</span>
                              <span className="line-clamp-2">{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="lg:col-span-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-primary" />
                          <h4 className="font-medium text-sm">NCR Context</h4>
                        </div>
                        <div 
                          className="p-4 rounded-lg border-l-4 bg-muted/50"
                          style={{ borderLeftColor: product.brandColor }}
                        >
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {product.ncrContext}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center">
                <Search className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No platforms found matching "{searchQuery}"</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

      </Tabs>
    </div>
  );
}
