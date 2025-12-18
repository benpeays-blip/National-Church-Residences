import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { AccentCard, getAccentColor } from "@/components/ui/accent-card";
import { 
  TrendingUp, 
  Brain, 
  Target,
  ArrowRight,
  Clock,
  Cpu,
  Sparkles,
  ChevronRight,
  Zap,
  BarChart3,
  Settings,
  Layers,
  GitBranch,
  Shield,
  Bot,
  Workflow,
  Activity,
  CheckCircle2,
  AlertCircle,
  FileText
} from "lucide-react";

const accentColors = {
  teal: getAccentColor("teal"),
  sky: getAccentColor("sky"),
  lime: getAccentColor("lime"),
  olive: getAccentColor("olive"),
  coral: getAccentColor("coral"),
  orange: getAccentColor("orange"),
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function AgenticDashboard() {
  const greeting = getGreeting();

  const kpiMetrics = [
    {
      label: "Active Agents",
      value: "12",
      subtitle: "Running automations",
      trend: "+3",
      trendUp: true,
      icon: Bot,
      accent: "teal" as const,
      href: "/agent-value-map?tab=agents",
    },
    {
      label: "Tasks Automated",
      value: "847",
      subtitle: "This month",
      trend: "+156",
      trendUp: true,
      icon: Zap,
      accent: "sky" as const,
      href: "/agent-value-map?tab=overview",
    },
    {
      label: "Time Saved",
      value: "124h",
      subtitle: "Staff hours reclaimed",
      trend: "+18h",
      trendUp: true,
      icon: Clock,
      accent: "lime" as const,
      href: "/agent-value-map?tab=scorecard",
    },
    {
      label: "Automation Score",
      value: "73%",
      subtitle: "Process coverage",
      trend: "+8%",
      trendUp: true,
      icon: Activity,
      accent: "coral" as const,
      href: "/agent-value-map?tab=framework",
    },
  ];

  const agentStatuses = [
    { name: "NBA Generator", status: "Active", tasks: 45, lastRun: "2 min ago", health: "healthy" },
    { name: "Meeting Prep Assistant", status: "Active", tasks: 23, lastRun: "15 min ago", health: "healthy" },
    { name: "Donor Scoring Engine", status: "Active", tasks: 156, lastRun: "1 hour ago", health: "healthy" },
    { name: "Wealth Event Monitor", status: "Paused", tasks: 0, lastRun: "3 days ago", health: "paused" },
    { name: "Voice-to-CRM", status: "Active", tasks: 12, lastRun: "30 min ago", health: "healthy" },
  ];

  const recentAutomations = [
    { action: "Generated action plan for Margaret Chen", time: "5 min ago", agent: "NBA Generator" },
    { action: "Updated donor scores for 47 prospects", time: "1 hour ago", agent: "Scoring Engine" },
    { action: "Prepared meeting brief for Anderson Foundation", time: "2 hours ago", agent: "Meeting Prep" },
    { action: "Transcribed and extracted insights from call", time: "4 hours ago", agent: "Voice-to-CRM" },
  ];

  const roadmapItems = [
    { name: "Enhanced Wealth Screening", status: "In Progress", progress: 65, quarter: "Q1" },
    { name: "Predictive Gift Timing", status: "Planned", progress: 20, quarter: "Q1" },
    { name: "Board Network Mapping", status: "In Progress", progress: 45, quarter: "Q2" },
    { name: "Grant Writing Assistant", status: "Research", progress: 10, quarter: "Q2" },
  ];

  const governanceMetrics = [
    { metric: "Data Privacy Compliance", value: "100%", status: "passing" },
    { metric: "Model Accuracy", value: "94%", status: "passing" },
    { metric: "Human Override Rate", value: "8%", status: "passing" },
    { metric: "Error Rate", value: "0.3%", status: "passing" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <div 
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${accentColors.coral}15 0%, ${accentColors.orange}10 50%, ${accentColors.teal}05 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="relative px-6 py-8">
          {/* Executive Header */}
          <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6" style={{ color: accentColors.coral }} />
                <h1 className="text-3xl font-bold text-foreground" data-testid="text-agentic-greeting">
                  {greeting}, Innovator
                </h1>
              </div>
              <p className="text-muted-foreground text-lg">
                AI Agent Operations & Automation Dashboard
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/agent-value-map?tab=framework">
                <Button variant="outline" className="gap-2" data-testid="button-view-framework">
                  <Layers className="w-4 h-4" />
                  Framework
                </Button>
              </Link>
              <Link href="/agent-value-map?tab=agents">
                <Button className="gap-2" style={{ backgroundColor: accentColors.coral }} data-testid="button-view-agents">
                  <Bot className="w-4 h-4" />
                  All Agents
                </Button>
              </Link>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {kpiMetrics.map((metric, index) => (
              <Link key={index} href={metric.href}>
                <AccentCard 
                  accent={metric.accent} 
                  className="hover-elevate cursor-pointer h-full"
                  data-testid={`card-metric-${metric.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${getAccentColor(metric.accent)}15` }}
                      >
                        <metric.icon className="w-6 h-6" style={{ color: getAccentColor(metric.accent) }} />
                      </div>
                      <Badge 
                        variant="outline" 
                        className="text-xs"
                        style={{ 
                          borderColor: metric.trendUp ? accentColors.lime : accentColors.coral,
                          color: metric.trendUp ? accentColors.lime : accentColors.coral 
                        }}
                      >
                        {metric.trendUp ? <TrendingUp className="w-3 h-3 mr-1" /> : null}
                        {metric.trend}
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold mb-1" style={{ color: getAccentColor(metric.accent) }}>
                      {metric.value}
                    </div>
                    <div className="text-sm font-medium text-foreground">{metric.label}</div>
                    <div className="text-xs text-muted-foreground">{metric.subtitle}</div>
                  </CardContent>
                </AccentCard>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Agent Status & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Agent Status */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bot className="w-5 h-5" style={{ color: accentColors.teal }} />
                    Agent Status
                  </CardTitle>
                  <CardDescription>Active automation agents</CardDescription>
                </div>
                <Link href="/agent-value-map?tab=agents">
                  <Button variant="ghost" size="sm" className="gap-1" data-testid="button-all-agents">
                    All Agents <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {agentStatuses.map((agent, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg border" data-testid={`row-agent-${index}`}>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ 
                        backgroundColor: agent.health === 'healthy' ? accentColors.lime : accentColors.orange 
                      }}
                    />
                    <div>
                      <div className="text-sm font-medium">{agent.name}</div>
                      <div className="text-xs text-muted-foreground">Last run: {agent.lastRun}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className="text-xs"
                      style={{ 
                        borderColor: agent.status === 'Active' ? accentColors.lime : accentColors.orange,
                        color: agent.status === 'Active' ? accentColors.lime : accentColors.orange
                      }}
                    >
                      {agent.status}
                    </Badge>
                    <span className="text-sm font-medium" style={{ color: accentColors.teal }}>
                      {agent.tasks} tasks
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Automations */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5" style={{ color: accentColors.sky }} />
                    Recent Automations
                  </CardTitle>
                  <CardDescription>Latest agent activity</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentAutomations.map((automation, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors" data-testid={`row-automation-${index}`}>
                  <CheckCircle2 className="w-4 h-4 mt-0.5" style={{ color: accentColors.lime }} />
                  <div className="flex-1">
                    <div className="text-sm">{automation.action}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{automation.agent}</Badge>
                      <span className="text-xs text-muted-foreground">{automation.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Roadmap & Governance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Roadmap Progress */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GitBranch className="w-5 h-5" style={{ color: accentColors.lime }} />
                    Development Roadmap
                  </CardTitle>
                  <CardDescription>Upcoming agent capabilities</CardDescription>
                </div>
                <Link href="/agent-value-map?tab=roadmap">
                  <Button variant="ghost" size="sm" className="gap-1" data-testid="button-view-roadmap">
                    Full Roadmap <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {roadmapItems.map((item, index) => (
                <div key={index} className="space-y-2" data-testid={`row-roadmap-${index}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{item.quarter}</Badge>
                      <Badge 
                        variant="outline" 
                        className="text-xs"
                        style={{ 
                          borderColor: item.status === 'In Progress' ? accentColors.sky : accentColors.olive,
                          color: item.status === 'In Progress' ? accentColors.sky : accentColors.olive
                        }}
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={item.progress} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Governance & Compliance */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5" style={{ color: accentColors.olive }} />
                    Governance & Compliance
                  </CardTitle>
                  <CardDescription>AI safety metrics</CardDescription>
                </div>
                <Link href="/agent-value-map?tab=governance">
                  <Button variant="ghost" size="sm" className="gap-1" data-testid="button-view-governance">
                    Details <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {governanceMetrics.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg border" data-testid={`row-governance-${index}`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: accentColors.lime }} />
                    <span className="text-sm">{item.metric}</span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: accentColors.lime }}>{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5" style={{ color: accentColors.orange }} />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link href="/agent-value-map?tab=overview">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" data-testid="button-quick-overview">
                  <Brain className="w-5 h-5" style={{ color: accentColors.coral }} />
                  <span className="text-sm">AI Overview</span>
                </Button>
              </Link>
              <Link href="/agent-value-map?tab=framework">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" data-testid="button-quick-framework">
                  <Layers className="w-5 h-5" style={{ color: accentColors.teal }} />
                  <span className="text-sm">Framework</span>
                </Button>
              </Link>
              <Link href="/agent-value-map?tab=scorecard">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" data-testid="button-quick-scorecard">
                  <BarChart3 className="w-5 h-5" style={{ color: accentColors.sky }} />
                  <span className="text-sm">Scorecard</span>
                </Button>
              </Link>
              <Link href="/workflow-builder">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" data-testid="button-quick-workflows">
                  <Workflow className="w-5 h-5" style={{ color: accentColors.lime }} />
                  <span className="text-sm">Workflows</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
