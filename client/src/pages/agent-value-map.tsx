import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Users, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Zap,
  Target,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";

export default function AgentValueMap() {
  const valueDrivers = [
    {
      category: "Donor Engagement",
      icon: Users,
      color: "bg-blue-500",
      agents: [
        { name: "Outreach Optimizer", impact: "32% increase in response rates", status: "active" },
        { name: "Meeting Prep Assistant", impact: "45 min saved per meeting", status: "active" },
        { name: "Stewardship Scheduler", impact: "3x more touchpoints", status: "active" },
      ]
    },
    {
      category: "Revenue Intelligence",
      icon: DollarSign,
      color: "bg-green-500",
      agents: [
        { name: "Gift Predictor", impact: "$2.3M in identified opportunities", status: "active" },
        { name: "Major Gift Timing", impact: "18% higher close rate", status: "active" },
        { name: "Wealth Event Monitor", impact: "Real-time prospect alerts", status: "beta" },
      ]
    },
    {
      category: "Operational Efficiency",
      icon: Zap,
      color: "bg-purple-500",
      agents: [
        { name: "Data Entry Automator", impact: "15 hrs/week saved", status: "active" },
        { name: "Report Generator", impact: "Instant board reports", status: "active" },
        { name: "Pipeline Manager", impact: "Zero missed follow-ups", status: "active" },
      ]
    },
    {
      category: "Strategic Insights",
      icon: Target,
      color: "bg-orange-500",
      agents: [
        { name: "Portfolio Optimizer", impact: "Balanced MGO workloads", status: "beta" },
        { name: "Campaign Analyzer", impact: "ROI predictions at 94% accuracy", status: "active" },
        { name: "Peer Benchmarking", impact: "Industry comparisons", status: "planned" },
      ]
    },
  ];

  const kpis = [
    { label: "Active AI Agents", value: "12", icon: Bot, trend: "+3 this quarter" },
    { label: "Time Saved Weekly", value: "47 hrs", icon: Clock, trend: "Across all users" },
    { label: "Revenue Influenced", value: "$4.8M", icon: TrendingUp, trend: "YTD attribution" },
    { label: "Automation Rate", value: "68%", icon: BarChart3, trend: "Of routine tasks" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Agentic Plan</h1>
          <p className="text-muted-foreground mt-1">
            Visualize AI agent impact across your fundraising operations
          </p>
        </div>
        <Badge variant="outline" className="gap-1">
          <Sparkles className="w-3 h-3" />
          AI-Powered
        </Badge>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} data-testid={`card-kpi-${kpi.label.toLowerCase().replace(/\s+/g, '-')}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{kpi.trend}</p>
                </div>
                <div className="p-2 bg-muted rounded-md">
                  <kpi.icon className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Value Drivers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {valueDrivers.map((driver) => (
          <Card key={driver.category} data-testid={`card-driver-${driver.category.toLowerCase().replace(/\s+/g, '-')}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md ${driver.color}`}>
                  <driver.icon className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-xl">{driver.category}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {driver.agents.map((agent) => (
                <div 
                  key={agent.name}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  data-testid={`row-agent-${agent.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex items-center gap-3">
                    <Bot className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">{agent.impact}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={agent.status === 'active' ? 'default' : agent.status === 'beta' ? 'secondary' : 'outline'}
                  >
                    {agent.status === 'active' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                    {agent.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Value Flow Visualization */}
      <Card data-testid="card-value-flow">
        <CardHeader>
          <CardTitle className="text-xl">Value Creation Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between flex-wrap gap-4">
            {[
              { label: "Data Inputs", sublabel: "CRM, Wealth Data, Events", icon: BarChart3 },
              { label: "AI Processing", sublabel: "12 Active Agents", icon: Bot },
              { label: "Insights Generated", sublabel: "847 this month", icon: Sparkles },
              { label: "Actions Taken", sublabel: "623 automated tasks", icon: Zap },
              { label: "Revenue Impact", sublabel: "$4.8M influenced", icon: DollarSign },
            ].map((step, index, arr) => (
              <div key={step.label} className="flex items-center gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <p className="font-medium text-sm">{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.sublabel}</p>
                </div>
                {index < arr.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
