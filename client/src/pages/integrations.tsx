import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Plug,
  Search,
  CheckCircle2,
  ExternalLink,
  X,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Integration {
  slug: string;
  name: string;
  category: string;
  logo: string;
  description: string;
  apiType: string;
  modules: string[];
  features: string[];
  useCases: string[];
  checklist: string[];
  status: "connected" | "available";
}

export default function Integrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  useEffect(() => {
    fetch("/integrations-registry.json")
      .then((r) => r.json())
      .then((data) => {
        setIntegrations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load integrations:", err);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(integrations.map((i) => i.category)));
    return ["ALL", ...cats.sort()];
  }, [integrations]);

  const filteredIntegrations = useMemo(() => {
    return integrations.filter((integration) => {
      const matchesCategory =
        selectedCategory === "ALL" || integration.category === selectedCategory;
      
      if (!searchQuery) return matchesCategory;

      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        integration.name.toLowerCase().includes(searchLower) ||
        integration.description.toLowerCase().includes(searchLower) ||
        integration.category.toLowerCase().includes(searchLower) ||
        integration.modules.some((m) => m.toLowerCase().includes(searchLower)) ||
        integration.features.some((f) => f.toLowerCase().includes(searchLower));

      return matchesCategory && matchesSearch;
    });
  }, [integrations, searchQuery, selectedCategory]);

  const connectedCount = integrations.filter((i) => i.status === "connected").length;

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Integrations Gallery</h1>
          <p className="text-muted-foreground">
            Connect fundraising tools and data sources
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Integrations Gallery</h1>
          <p className="text-sm text-muted-foreground">
            Browse and connect {integrations.length} fundraising platforms and data sources
          </p>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="bg-chart-2 hover:bg-chart-2" data-testid="badge-connected-count">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              {connectedCount} Connected
            </Badge>
            <Badge variant="secondary" data-testid="badge-available-count">
              {integrations.length - connectedCount} Available
            </Badge>
          </div>
        </div>
        <Plug className="w-8 h-8 text-muted-foreground" />
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="w-full justify-start h-auto flex-wrap gap-1 bg-transparent border-b rounded-none p-0">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent px-4"
              data-testid={`tab-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {cat}
              {cat !== "ALL" && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {integrations.filter((i) => i.category === cat).length}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search integrations, modules, or features..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
          data-testid="input-search-integrations"
        />
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground" data-testid="text-results-count">
        Showing {filteredIntegrations.length} of {integrations.length} integrations
      </div>

      {/* Integration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIntegrations.map((integration) => (
          <Card
            key={integration.slug}
            className="p-6 hover-elevate cursor-pointer"
            onClick={() => setSelectedIntegration(integration)}
            data-testid={`card-integration-${integration.slug}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={integration.logo}
                  alt={`${integration.name} logo`}
                  className="w-12 h-12 object-contain bg-white rounded p-1"
                  data-testid={`img-integration-logo-${integration.slug}`}
                />
                <div className="flex-1">
                  <h3 className="font-semibold" data-testid={`text-integration-name-${integration.slug}`}>
                    {integration.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs" data-testid={`badge-integration-category-${integration.slug}`}>
                      {integration.category}
                    </Badge>
                  </div>
                </div>
              </div>
              {integration.status === "connected" && (
                <Badge variant="default" className="bg-chart-2 hover:bg-chart-2" data-testid={`badge-status-connected-${integration.slug}`}>
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-3 mb-4" data-testid={`text-integration-description-${integration.slug}`}>
              {integration.description}
            </p>

            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">
                API: {integration.apiType}
              </div>
              <div className="flex flex-wrap gap-1">
                {integration.modules.slice(0, 3).map((module) => (
                  <Badge key={module} variant="secondary" className="text-xs" data-testid={`badge-module-${module.toLowerCase()}-${integration.slug}`}>
                    {module}
                  </Badge>
                ))}
                {integration.modules.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{integration.modules.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
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
                setSelectedCategory("ALL");
              }}
              data-testid="button-clear-filters"
            >
              Clear Filters
            </Button>
          </div>
        </Card>
      )}

      {/* Detail Drawer */}
      <Sheet open={!!selectedIntegration} onOpenChange={() => setSelectedIntegration(null)}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto" data-testid="drawer-integration-detail">
          {selectedIntegration && (
            <>
              <SheetHeader>
                <div className="flex items-start gap-4">
                  <img
                    src={selectedIntegration.logo}
                    alt={`${selectedIntegration.name} logo`}
                    className="w-16 h-16 object-contain bg-white rounded p-2"
                    data-testid="img-detail-logo"
                  />
                  <div className="flex-1">
                    <SheetTitle className="text-2xl" data-testid="text-detail-name">
                      {selectedIntegration.name}
                    </SheetTitle>
                    <SheetDescription className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" data-testid="badge-detail-category">
                        {selectedIntegration.category}
                      </Badge>
                      <Badge variant="outline" data-testid="badge-detail-api-type">
                        {selectedIntegration.apiType}
                      </Badge>
                      {selectedIntegration.status === "connected" && (
                        <Badge variant="default" className="bg-chart-2 hover:bg-chart-2" data-testid="badge-detail-status">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Connected
                        </Badge>
                      )}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2">Overview</h3>
                  <p className="text-sm text-muted-foreground" data-testid="text-detail-description">
                    {selectedIntegration.description}
                  </p>
                </div>

                {/* Supported Modules */}
                <div>
                  <h3 className="font-semibold mb-3">Supported Modules</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedIntegration.modules.map((module) => (
                      <Badge key={module} variant="secondary" data-testid={`badge-detail-module-${module.toLowerCase()}`}>
                        {module}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="font-semibold mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {selectedIntegration.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm" data-testid={`text-detail-feature-${idx}`}>
                        <CheckCircle2 className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Use Cases */}
                <div>
                  <h3 className="font-semibold mb-3">Common Use Cases</h3>
                  <ul className="space-y-2">
                    {selectedIntegration.useCases.map((useCase, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground" data-testid={`text-detail-usecase-${idx}`}>
                        <span className="text-primary">•</span>
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Readiness Checklist */}
                <div className="rounded-lg border p-4 bg-muted/30">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Readiness Checklist
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Complete these steps before connecting this integration
                  </p>
                  <ul className="space-y-2">
                    {selectedIntegration.checklist.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm" data-testid={`text-detail-checklist-${idx}`}>
                        <div className="w-4 h-4 rounded border border-input mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  {selectedIntegration.status === "connected" ? (
                    <>
                      <Button variant="default" className="flex-1" data-testid="button-detail-manage">
                        <Plug className="w-4 h-4 mr-2" />
                        Manage Connection
                      </Button>
                      <Button variant="outline" data-testid="button-detail-disconnect">
                        <X className="w-4 h-4 mr-2" />
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="default" className="flex-1" data-testid="button-detail-connect">
                        <Plug className="w-4 h-4 mr-2" />
                        Connect Integration
                      </Button>
                      <Button variant="outline" data-testid="button-detail-docs">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Documentation
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
