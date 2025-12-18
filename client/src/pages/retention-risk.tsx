import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  TrendingDown, 
  Users, 
  Calendar,
  Mail,
  Phone,
  Heart,
  ArrowRight,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Zap
} from "lucide-react";
import { AccentCard, getAccentColor } from "@/components/ui/accent-card";
import { useToast } from "@/hooks/use-toast";

const atRiskDonors = [
  { 
    id: "1", 
    name: "Robert Thompson", 
    riskScore: 85, 
    riskLevel: "high",
    lastGift: "2024-03-15", 
    lastContact: "2024-06-20",
    lifetimeGiving: 25000,
    avgGift: 1250,
    engagementDecline: -45,
    riskFactors: ["No gift in 9 months", "Email engagement dropped 60%", "Missed 2 events"]
  },
  { 
    id: "2", 
    name: "Patricia Anderson", 
    riskScore: 72, 
    riskLevel: "high",
    lastGift: "2024-05-01", 
    lastContact: "2024-08-15",
    lifetimeGiving: 18500,
    avgGift: 925,
    engagementDecline: -30,
    riskFactors: ["Reduced giving amount by 50%", "Unsubscribed from newsletter"]
  },
  { 
    id: "3", 
    name: "James Wilson", 
    riskScore: 58, 
    riskLevel: "medium",
    lastGift: "2024-07-20", 
    lastContact: "2024-10-01",
    lifetimeGiving: 42000,
    avgGift: 2100,
    engagementDecline: -20,
    riskFactors: ["Missed annual gala", "No response to 3 emails"]
  },
  { 
    id: "4", 
    name: "Linda Martinez", 
    riskScore: 45, 
    riskLevel: "medium",
    lastGift: "2024-09-10", 
    lastContact: "2024-11-05",
    lifetimeGiving: 15000,
    avgGift: 750,
    engagementDecline: -15,
    riskFactors: ["Giving frequency decreased", "Delayed response to last ask"]
  },
  { 
    id: "5", 
    name: "William Brown", 
    riskScore: 32, 
    riskLevel: "low",
    lastGift: "2024-10-15", 
    lastContact: "2024-12-01",
    lifetimeGiving: 8500,
    avgGift: 425,
    engagementDecline: -10,
    riskFactors: ["Slight decrease in email opens"]
  },
];

const recommendedActions = [
  { donor: "Robert Thompson", action: "Personal phone call from MGO", priority: "urgent", type: "call" },
  { donor: "Patricia Anderson", action: "Send personalized impact report", priority: "high", type: "email" },
  { donor: "James Wilson", action: "Invite to exclusive donor event", priority: "medium", type: "event" },
  { donor: "Linda Martinez", action: "Schedule thank-you coffee meeting", priority: "medium", type: "meeting" },
];

const getRiskColor = (level: string) => {
  switch (level) {
    case "high": return getAccentColor("coral");
    case "medium": return getAccentColor("orange");
    case "low": return getAccentColor("lime");
    default: return getAccentColor("teal");
  }
};

export default function RetentionRisk() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("at-risk");

  const filteredDonors = atRiskDonors.filter(donor =>
    donor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleIntervene = (donorName: string) => {
    toast({
      title: "Intervention Started",
      description: `Retention workflow initiated for ${donorName}`,
    });
  };

  const handleTakeAction = (action: typeof recommendedActions[0]) => {
    const actionMessages: Record<string, string> = {
      call: `Phone call scheduled for ${action.donor}`,
      email: `Impact report email queued for ${action.donor}`,
      event: `Event invitation sent to ${action.donor}`,
      meeting: `Meeting request sent to ${action.donor}`,
    };
    
    toast({
      title: "Action Taken",
      description: actionMessages[action.type] || `Action initiated for ${action.donor}`,
    });
  };

  const highRiskCount = atRiskDonors.filter(d => d.riskLevel === "high").length;
  const mediumRiskCount = atRiskDonors.filter(d => d.riskLevel === "medium").length;
  const totalAtRiskValue = atRiskDonors.reduce((sum, d) => sum + d.lifetimeGiving, 0);
  const avgRiskScore = Math.round(atRiskDonors.reduce((sum, d) => sum + d.riskScore, 0) / atRiskDonors.length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Donor Retention Risk</h1>
          <p className="text-sm text-muted-foreground">
            AI-powered churn prediction to identify and save at-risk donor relationships
          </p>
        </div>
        <AlertTriangle className="h-8 w-8 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AccentCard accent="coral">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("coral")}20` }}>
                <AlertTriangle className="h-5 w-5" style={{ color: getAccentColor("coral") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-high-risk">{highRiskCount}</p>
                <p className="text-sm text-muted-foreground">High Risk Donors</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="orange">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("orange")}20` }}>
                <Clock className="h-5 w-5" style={{ color: getAccentColor("orange") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-medium-risk">{mediumRiskCount}</p>
                <p className="text-sm text-muted-foreground">Medium Risk Donors</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="teal">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("teal")}20` }}>
                <Heart className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-at-risk-value">${(totalAtRiskValue / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">At-Risk Lifetime Value</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="sky">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("sky")}20` }}>
                <TrendingDown className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-avg-risk">{avgRiskScore}</p>
                <p className="text-sm text-muted-foreground">Avg Risk Score</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-1 bg-transparent p-0 mb-6" data-testid="tabs-retention">
          <TabsTrigger 
            value="at-risk" 
            data-testid="tab-at-risk"
            className="group relative bg-[#E86B5A] text-white data-[state=active]:bg-[#E86B5A] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            At-Risk Donors
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#E86B5A] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="actions" 
            data-testid="tab-actions"
            className="group relative bg-[#4FA6A6] text-white data-[state=active]:bg-[#4FA6A6] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Recommended Actions
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#4FA6A6] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="insights" 
            data-testid="tab-insights"
            className="group relative bg-[#7BC4DC] text-white data-[state=active]:bg-[#7BC4DC] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Retention Insights
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#7BC4DC] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="at-risk" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" style={{ color: getAccentColor("coral") }} />
                    Donors at Risk of Lapsing
                  </CardTitle>
                  <CardDescription>Sorted by risk score (highest first)</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search donors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-search"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDonors.map((donor) => (
                  <div 
                    key={donor.id}
                    className="p-4 rounded-lg bg-card border border-border shadow-sm hover-elevate cursor-pointer"
                    style={{ borderLeftWidth: '4px', borderLeftColor: getRiskColor(donor.riskLevel) }}
                    data-testid={`donor-${donor.id}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{donor.name}</h4>
                          <Badge 
                            style={{ 
                              backgroundColor: getRiskColor(donor.riskLevel), 
                              color: "white" 
                            }}
                          >
                            {donor.riskLevel.toUpperCase()} RISK
                          </Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <span className="text-muted-foreground">Last Gift:</span>
                            <span className="ml-2 font-medium">{donor.lastGift}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Lifetime:</span>
                            <span className="ml-2 font-medium">${donor.lifetimeGiving.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Avg Gift:</span>
                            <span className="ml-2 font-medium">${donor.avgGift.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Engagement:</span>
                            <span className="ml-2 font-medium" style={{ color: getAccentColor("coral") }}>
                              {donor.engagementDecline}%
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {donor.riskFactors.map((factor, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              <XCircle className="h-3 w-3 mr-1" style={{ color: getAccentColor("coral") }} />
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-3xl font-bold" style={{ color: getRiskColor(donor.riskLevel) }}>
                          {donor.riskScore}
                        </div>
                        <p className="text-xs text-muted-foreground">Risk Score</p>
                        <Button size="sm" className="mt-2" onClick={() => handleIntervene(donor.name)} data-testid={`button-intervene-${donor.id}`}>
                          <Zap className="h-3 w-3 mr-1" />
                          Intervene
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-6">
          <Card>
            <CardHeader className="bg-[#395174] text-white rounded-t-lg">
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5" />
                AI-Recommended Interventions
              </CardTitle>
              <CardDescription className="text-white/80">
                Personalized actions to re-engage at-risk donors
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {recommendedActions.map((action, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg bg-card border border-border shadow-sm flex items-center justify-between"
                    style={{ borderLeftWidth: '4px', borderLeftColor: getAccentColor("teal") }}
                    data-testid={`action-${index}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("teal")}20` }}>
                        {action.type === "call" && <Phone className="h-5 w-5" style={{ color: getAccentColor("teal") }} />}
                        {action.type === "email" && <Mail className="h-5 w-5" style={{ color: getAccentColor("teal") }} />}
                        {action.type === "event" && <Calendar className="h-5 w-5" style={{ color: getAccentColor("teal") }} />}
                        {action.type === "meeting" && <Users className="h-5 w-5" style={{ color: getAccentColor("teal") }} />}
                      </div>
                      <div>
                        <p className="font-medium">{action.donor}</p>
                        <p className="text-sm text-muted-foreground">{action.action}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={action.priority === "urgent" ? "destructive" : "secondary"}
                      >
                        {action.priority}
                      </Badge>
                      <Button size="sm" onClick={() => handleTakeAction(action)} data-testid={`button-take-action-${index}`}>
                        Take Action
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5" style={{ color: getAccentColor("coral") }} />
                  Top Churn Predictors
                </CardTitle>
                <CardDescription>Factors most correlated with donor lapse</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { factor: "No gift in 12+ months", correlation: 92 },
                    { factor: "Email engagement dropped >50%", correlation: 78 },
                    { factor: "Missed recurring payment", correlation: 71 },
                    { factor: "No event attendance", correlation: 65 },
                    { factor: "Decreased giving amount", correlation: 58 },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.factor}</span>
                        <span className="font-medium">{item.correlation}%</span>
                      </div>
                      <Progress value={item.correlation} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" style={{ color: getAccentColor("lime") }} />
                  Retention Success Stories
                </CardTitle>
                <CardDescription>Donors saved through intervention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Margaret Davis", action: "Personal call", result: "Renewed at $5,000" },
                    { name: "Thomas White", action: "Impact report", result: "Upgraded to monthly" },
                    { name: "Susan Clark", action: "Event invite", result: "Re-engaged, $2,500 gift" },
                  ].map((story, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-lg border bg-card"
                      style={{ borderLeftWidth: '4px', borderLeftColor: getAccentColor("lime") }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{story.name}</p>
                          <p className="text-xs text-muted-foreground">{story.action}</p>
                        </div>
                        <Badge style={{ backgroundColor: `${getAccentColor("lime")}20`, color: getAccentColor("lime") }}>
                          {story.result}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
