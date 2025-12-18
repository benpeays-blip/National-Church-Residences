import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AccentCard, AccentColor, getAccentColor, getAccentBgClass } from "@/components/ui/accent-card";
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
  Network,
  Check,
  ChevronDown,
  ChevronUp,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { 
  techProducts, 
  TechProduct,
  categoryIntegrationNeeds 
} from "@/data/tech-products";

const categoryAccentMap: Record<string, AccentColor> = {
  "CRM": "teal",
  "Prospecting": "sky",
  "Analytics": "lime",
  "Grants": "olive",
  "HR & Finance": "orange",
  "Clinical EHR": "coral",
  "Transparency": "sky",
  "Coordination": "teal"
};

function getCategoryAccent(category: string): AccentColor {
  return categoryAccentMap[category] || "teal";
}

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

const layerInfo: Record<string, { 
  label: string; 
  icon: LucideIcon; 
  description: string; 
  accent: AccentColor 
}> = {
  core: { 
    label: "Core Systems", 
    icon: Layers,
    description: "Primary data sources and systems of record",
    accent: "teal"
  },
  intelligence: { 
    label: "Intelligence Layer", 
    icon: Zap,
    description: "Analytics, insights, and decision support",
    accent: "sky"
  },
  operations: { 
    label: "Operations", 
    icon: Network,
    description: "Day-to-day management and coordination",
    accent: "lime"
  }
};

export default function TechStackMapper() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  
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
        <TabsList className="grid w-full grid-cols-3 gap-1 bg-transparent p-0 mb-4" data-testid="tabs-tech-stack">
          <TabsTrigger 
            value="architecture" 
            data-testid="tab-architecture"
            className="group relative bg-[#7FA3A1] text-white data-[state=active]:bg-[#7FA3A1] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Tech Ecosystem
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#7FA3A1] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="layers" 
            data-testid="tab-layers"
            className="group relative bg-[#7BC4DC] text-white data-[state=active]:bg-[#7BC4DC] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Stack Architecture
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#7BC4DC] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="categories" 
            data-testid="tab-categories"
            className="group relative bg-[#E8923A] text-white data-[state=active]:bg-[#E8923A] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Platform Details
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#E8923A] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
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
                const accentColor = getAccentColor(info.accent);
                if (products.length === 0 && searchQuery) return null;
                
                return (
                  <div key={layer} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: accentColor }} 
                      />
                      <div>
                        <h3 className="font-semibold text-sm">{info.label}</h3>
                        <p className="text-xs text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {(searchQuery ? products : groupedByLayer[layer]).map((product) => {
                        const CategoryIcon = categoryIcons[product.category] || Building2;
                        const productAccent = getCategoryAccent(product.category);
                        const isExpanded = expandedCardId === product.id;
                        return (
                          <AccentCard 
                            key={product.id}
                            accent={productAccent}
                            className={`p-0 hover-elevate transition-all cursor-pointer ${isExpanded ? 'col-span-1 md:col-span-2 lg:col-span-4' : ''}`}
                            data-testid={`card-ecosystem-${product.id}`}
                            onClick={() => setExpandedCardId(isExpanded ? null : product.id)}
                          >
                            <div className="p-4 space-y-3">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3 flex-1">
                                  <div 
                                    className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: `${getAccentColor(productAccent)}15` }}
                                  >
                                    <CategoryIcon className="w-4 h-4" style={{ color: getAccentColor(productAccent) }} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm leading-tight" style={{ color: getAccentColor(productAccent) }}>{product.name}</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">{product.tagline}</p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="icon" className="shrink-0 h-6 w-6">
                                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </Button>
                              </div>
                              <Badge 
                                variant="outline" 
                                className="text-xs gap-1"
                                style={{ borderColor: getAccentColor(productAccent), color: getAccentColor(productAccent) }}
                              >
                                <CategoryIcon className="w-3 h-3" />
                                {product.category}
                              </Badge>
                              {!isExpanded && (
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {product.strengths[0]}
                                </p>
                              )}
                              
                              {isExpanded && (
                                <div className="pt-3 border-t space-y-4">
                                  <p className="text-sm text-muted-foreground">{product.description}</p>
                                  
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("lime")}20` }}>
                                          <Check className="w-3 h-3" style={{ color: getAccentColor("lime") }} />
                                        </div>
                                        <h5 className="font-medium text-xs">Strengths</h5>
                                      </div>
                                      <ul className="space-y-1">
                                        {product.strengths.map((strength, idx) => (
                                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                                            <span style={{ color: getAccentColor("lime") }}>+</span>
                                            <span>{strength}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("coral")}20` }}>
                                          <X className="w-3 h-3" style={{ color: getAccentColor("coral") }} />
                                        </div>
                                        <h5 className="font-medium text-xs">Weaknesses</h5>
                                      </div>
                                      <ul className="space-y-1">
                                        {product.weaknesses.map((weakness, idx) => (
                                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                                            <span style={{ color: getAccentColor("coral") }}>−</span>
                                            <span>{weakness}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                  
                                  <div 
                                    className="p-3 rounded-lg border-l-2"
                                    style={{ 
                                      backgroundColor: `${getAccentColor("teal")}10`,
                                      borderLeftColor: getAccentColor("teal")
                                    }}
                                  >
                                    <div className="flex items-center gap-2 mb-1">
                                      <Shield className="w-3.5 h-3.5" style={{ color: getAccentColor("teal") }} />
                                      <h5 className="font-medium text-xs" style={{ color: getAccentColor("teal") }}>NCR Context</h5>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{product.ncrContext}</p>
                                  </div>
                                  
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="gap-2"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      window.open(product.website, '_blank');
                                    }}
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    Visit Website
                                  </Button>
                                </div>
                              )}
                            </div>
                          </AccentCard>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <AccentCard accent="olive" className="p-0 border-dashed">
                <div className="p-6">
                  <div className="flex items-center gap-4 justify-center flex-wrap">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getAccentColor("teal") }} />
                      <span className="text-muted-foreground">Core Systems</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getAccentColor("sky") }} />
                      <span className="text-muted-foreground">Intelligence Layer</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getAccentColor("lime") }} />
                      <span className="text-muted-foreground">Operations</span>
                    </div>
                  </div>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Data flows from core systems through analytics and intelligence layers to power operational decisions
                  </p>
                </div>
              </AccentCard>
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
                const accentColor = getAccentColor(info.accent);
                
                if (products.length === 0 && searchQuery) return null;
                
                return (
                  <AccentCard key={layer} accent={info.accent} className="p-0">
                    <div className="px-6 py-4 border-b flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: accentColor }}
                      >
                        <LayerIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{info.label}</h4>
                        <p className="text-xs text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className={`grid grid-cols-1 ${products.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
                        {products.map((product) => {
                          const productAccent = getCategoryAccent(product.category);
                          return (
                            <div 
                              key={product.id} 
                              className="p-4 rounded-lg border-l-2"
                              style={{ 
                                backgroundColor: `${getAccentColor(productAccent)}10`,
                                borderLeftColor: getAccentColor(productAccent)
                              }}
                            >
                              <p className="font-medium text-sm">{product.name}</p>
                              <p className="text-xs text-muted-foreground">{product.category} — {product.tagline}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </AccentCard>
                );
              })}

              <AccentCard accent="olive" className="p-0 border-dashed">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${getAccentColor("olive")}20` }}
                    >
                      <Target className="w-5 h-5" style={{ color: getAccentColor("olive") }} />
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
                </div>
              </AccentCard>
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
              const accent = getCategoryAccent(product.category);
              
              return (
                <AccentCard 
                  key={product.id} 
                  accent={accent}
                  className="p-0"
                  data-testid={`card-platform-${product.id}`}
                >
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-1 space-y-4">
                        <div className="flex items-start gap-3">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${product.brandColor}15` }}
                          >
                            <CategoryIcon className="w-5 h-5" style={{ color: product.brandColor }} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-base" style={{ color: product.brandColor }}>{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.tagline}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge 
                            variant="outline" 
                            className="text-xs gap-1"
                            style={{ borderColor: getAccentColor(accent), color: getAccentColor(accent) }}
                          >
                            <CategoryIcon className="w-3 h-3" />
                            {product.category}
                          </Badge>
                          <Badge 
                            variant={priority === "critical" ? "destructive" : priority === "high" ? "secondary" : "outline"}
                            className="text-xs"
                          >
                            {priority === "critical" ? "Critical" : priority === "high" ? "High" : "Medium"} Priority
                          </Badge>
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
                          <div 
                            className="w-6 h-6 rounded flex items-center justify-center"
                            style={{ backgroundColor: `${getAccentColor("lime")}20` }}
                          >
                            <Check className="w-3.5 h-3.5" style={{ color: getAccentColor("lime") }} />
                          </div>
                          <h4 className="font-medium text-sm">Key Strengths</h4>
                        </div>
                        <ul className="space-y-2">
                          {product.strengths.slice(0, 4).map((strength, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="mt-1 shrink-0" style={{ color: getAccentColor("lime") }}>+</span>
                              <span className="line-clamp-2">{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="lg:col-span-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded flex items-center justify-center"
                            style={{ backgroundColor: `${getAccentColor("teal")}20` }}
                          >
                            <Shield className="w-3.5 h-3.5" style={{ color: getAccentColor("teal") }} />
                          </div>
                          <h4 className="font-medium text-sm" style={{ color: getAccentColor("teal") }}>NCR Context</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {product.ncrContext}
                        </p>
                      </div>
                    </div>
                  </div>
                </AccentCard>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <AccentCard accent="sky" className="p-6 text-center">
              <Search className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No platforms found matching "{searchQuery}"</p>
            </AccentCard>
          )}
        </TabsContent>

      </Tabs>
    </div>
  );
}
