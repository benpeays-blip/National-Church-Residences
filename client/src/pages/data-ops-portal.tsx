import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { 
  Database, 
  Users, 
  MapPin, 
  CheckCircle2,
  ArrowRight,
  Shield,
  FileWarning,
  Sparkles
} from "lucide-react";
import { AccentCard, getAccentColor } from "@/components/ui/accent-card";

const dataQualityMetrics = {
  totalRecords: 15847,
  duplicateCandidates: 234,
  addressIssues: 156,
  dataQualityScore: 92,
  lastSyncTime: "5 minutes ago",
  recordsProcessed: 12450
};

const recentIssues = [
  { id: "1", type: "Duplicate", description: "Potential duplicate: John Smith (2 records)", severity: "medium", status: "pending" },
  { id: "2", type: "Address", description: "Invalid ZIP code: 123 Main St", severity: "high", status: "pending" },
  { id: "3", type: "Duplicate", description: "Potential duplicate: Sarah Johnson (3 records)", severity: "high", status: "pending" },
  { id: "4", type: "Address", description: "Undeliverable address flagged", severity: "medium", status: "resolved" },
  { id: "5", type: "Duplicate", description: "Potential duplicate: Michael Brown (2 records)", severity: "low", status: "pending" },
];

const dataQualityTools = [
  { 
    title: "Duplicate Detection", 
    description: "Identify and merge potential duplicate donor records using fuzzy matching", 
    icon: Users, 
    href: "/duplicate-detection",
    count: 234,
    accent: "coral" as const
  },
  { 
    title: "Address Verification", 
    description: "Validate addresses with USPS and auto-fix formatting issues", 
    icon: MapPin, 
    href: "/address-verification",
    count: 156,
    accent: "orange" as const
  },
];

export default function DataOpsPortal() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "#ef4444";
      case "medium": return "#f59e0b";
      case "low": return "#22c55e";
      default: return "#6b7280";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Data Quality Portal</h1>
          <p className="text-sm text-muted-foreground">
            Monitor and maintain data quality across your donor database
          </p>
        </div>
        <Database className="h-8 w-8 text-muted-foreground" />
      </div>

      <Card className="overflow-hidden">
        <div className="bg-[#395174] p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Shield className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Data Health Score</h2>
                <p className="text-white/80">Last updated {dataQualityMetrics.lastSyncTime}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-5xl font-bold">{dataQualityMetrics.dataQualityScore}%</p>
              <p className="text-white/80">Overall Quality</p>
            </div>
          </div>
          <Progress value={dataQualityMetrics.dataQualityScore} className="h-3 bg-white/20 mt-4" />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AccentCard accent="teal">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("teal")}20` }}>
                <Database className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-total-records">{dataQualityMetrics.totalRecords.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Records</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="coral">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("coral")}20` }}>
                <Users className="h-5 w-5" style={{ color: getAccentColor("coral") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-duplicates">{dataQualityMetrics.duplicateCandidates}</p>
                <p className="text-sm text-muted-foreground">Duplicate Candidates</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="orange">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("orange")}20` }}>
                <MapPin className="h-5 w-5" style={{ color: getAccentColor("orange") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-address-issues">{dataQualityMetrics.addressIssues}</p>
                <p className="text-sm text-muted-foreground">Address Issues</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="lime">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("lime")}20` }}>
                <CheckCircle2 className="h-5 w-5" style={{ color: getAccentColor("lime") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-processed">{dataQualityMetrics.recordsProcessed.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Clean Records</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList data-testid="tabs-data-ops">
          <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
          <TabsTrigger value="tools" data-testid="tab-tools">Data Quality Tools</TabsTrigger>
          <TabsTrigger value="issues" data-testid="tab-issues">Recent Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
                  Data Quality Tools
                </CardTitle>
                <CardDescription>Quick access to data maintenance features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dataQualityTools.map((tool) => {
                  const Icon = tool.icon;
                  const accentColor = getAccentColor(tool.accent);
                  return (
                    <Link key={tool.title} href={tool.href}>
                      <div 
                        className="flex items-center gap-4 p-4 rounded-xl border hover-elevate transition-all cursor-pointer"
                        style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}
                        data-testid={`link-${tool.href.slice(1)}`}
                      >
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${accentColor}15` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: accentColor }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold">{tool.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">{tool.description}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <Badge 
                            variant="secondary"
                            style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                          >
                            {tool.count} issues
                          </Badge>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileWarning className="h-5 w-5" style={{ color: getAccentColor("coral") }} />
                  Recent Issues
                </CardTitle>
                <CardDescription>Latest data quality alerts requiring attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentIssues.slice(0, 5).map((issue) => {
                  const severityColor = getSeverityColor(issue.severity);
                  return (
                    <div 
                      key={issue.id}
                      className="flex items-center gap-3 p-3 rounded-lg border"
                      style={{ borderColor: `${severityColor}25`, backgroundColor: `${severityColor}05` }}
                      data-testid={`issue-${issue.id}`}
                    >
                      <div 
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: severityColor }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{issue.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{issue.type}</Badge>
                          {issue.status === "resolved" && (
                            <Badge variant="secondary" className="text-xs gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Resolved
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Badge 
                        variant="outline"
                        className="text-xs capitalize shrink-0"
                        style={{ borderColor: severityColor, color: severityColor }}
                      >
                        {issue.severity}
                      </Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tools" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataQualityTools.map((tool) => {
              const Icon = tool.icon;
              const accentColor = getAccentColor(tool.accent);
              return (
                <Card key={tool.title} className="overflow-hidden">
                  <div 
                    className="p-6"
                    style={{ background: `linear-gradient(135deg, ${accentColor}15 0%, ${accentColor}05 100%)` }}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${accentColor}20` }}
                      >
                        <Icon className="w-7 h-7" style={{ color: accentColor }} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{tool.title}</h3>
                        <p className="text-sm text-muted-foreground">{tool.count} issues to review</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">{tool.description}</p>
                    <Link href={tool.href}>
                      <Button 
                        className="w-full gap-2"
                        style={{ backgroundColor: accentColor }}
                        data-testid={`button-${tool.href.slice(1)}`}
                      >
                        Open Tool
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="issues" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Data Quality Issues</CardTitle>
              <CardDescription>Complete list of issues requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentIssues.map((issue) => {
                  const severityColor = getSeverityColor(issue.severity);
                  return (
                    <div 
                      key={issue.id}
                      className="flex items-center gap-4 p-4 rounded-xl border hover-elevate transition-all"
                      style={{ borderColor: `${severityColor}25`, backgroundColor: `${severityColor}05` }}
                      data-testid={`issue-row-${issue.id}`}
                    >
                      <div 
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: severityColor }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{issue.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{issue.type}</Badge>
                          {issue.status === "resolved" ? (
                            <Badge variant="secondary" className="text-xs gap-1 bg-green-500/10 text-green-600">
                              <CheckCircle2 className="w-3 h-3" />
                              Resolved
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs gap-1 bg-orange-500/10 text-orange-600">
                              Pending Review
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Badge 
                        variant="outline"
                        className="text-xs capitalize font-medium shrink-0"
                        style={{ borderColor: severityColor, color: severityColor, backgroundColor: `${severityColor}10` }}
                      >
                        {issue.severity}
                      </Badge>
                      <Button variant="outline" size="sm" className="shrink-0 gap-1">
                        Review
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
