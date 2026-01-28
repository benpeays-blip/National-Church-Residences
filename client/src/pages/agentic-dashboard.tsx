import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { AccentCard, getAccentColor } from "@/components/ui/accent-card";
import {
  TrendingUp,
  Brain,
  ArrowRight,
  Clock,
  Cpu,
  Sparkles,
  Zap,
  BarChart3,
  Layers,
  GitBranch,
  Shield,
  Bot,
  Workflow,
  Activity,
  CheckCircle2
} from "lucide-react";

const accentColors = {
  teal: getAccentColor("teal"),
  sky: getAccentColor("sky"),
  lime: getAccentColor("lime"),
  olive: getAccentColor("olive"),
  coral: getAccentColor("coral"),
  orange: getAccentColor("orange"),
};

export default function AgenticDashboard() {
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
                  Agentic Plan
                </h1>
              </div>
              <p className="text-muted-foreground text-lg">
                AI Agent Operations & Automation Dashboard
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/agent-value-map?tab=framework" data-testid="link-hero-framework">
                <Button variant="outline" className="gap-2" data-testid="button-view-framework">
                  <Layers className="w-4 h-4" />
                  Framework
                </Button>
              </Link>
              <Link href="/agent-value-map?tab=agents" data-testid="link-hero-agents">
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
              <Link key={index} href={metric.href} data-testid={`link-metric-${metric.label.toLowerCase().replace(/\s+/g, '-')}`}>
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
          {/* Agent Status - Enhanced */}
          <Card className="overflow-hidden">
            <CardHeader 
              className="pb-4"
              style={{ background: `linear-gradient(135deg, ${accentColors.teal}12 0%, ${accentColors.teal}04 100%)` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${accentColors.teal}15` }}
                  >
                    <Bot className="w-6 h-6" style={{ color: accentColors.teal }} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Agent Status</CardTitle>
                    <CardDescription>5 agents, 4 active</CardDescription>
                  </div>
                </div>
                <Link href="/agent-value-map?tab=agents" data-testid="link-header-agents">
                  <Button variant="outline" size="sm" className="gap-1" data-testid="button-all-agents">
                    All Agents <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {agentStatuses.map((agent, index) => {
                const healthColor = agent.health === 'healthy' ? accentColors.lime : accentColors.orange;
                return (
                  <Link key={index} href="/agent-value-map?tab=agents" data-testid={`link-agent-${index}`}>
                    <div 
                      className="group flex items-center justify-between p-4 rounded-xl border hover-elevate cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${healthColor}15` }}
                          >
                            <Cpu className="w-5 h-5" style={{ color: healthColor }} />
                          </div>
                          <div 
                            className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-background"
                            style={{ backgroundColor: healthColor }}
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-sm group-hover:text-primary transition-colors">{agent.name}</div>
                          <div className="text-xs text-muted-foreground">Last run: {agent.lastRun}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-lg font-bold" style={{ color: accentColors.teal }}>{agent.tasks}</div>
                          <div className="text-xs text-muted-foreground">tasks</div>
                        </div>
                        <Badge 
                          variant="secondary"
                          className="text-xs"
                          style={{ 
                            backgroundColor: `${healthColor}20`,
                            color: healthColor
                          }}
                        >
                          {agent.status}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </CardContent>
          </Card>

          {/* Recent Automations - Enhanced Timeline */}
          <Card className="overflow-hidden">
            <CardHeader 
              className="pb-4"
              style={{ background: `linear-gradient(135deg, ${accentColors.sky}12 0%, ${accentColors.sky}04 100%)` }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${accentColors.sky}15` }}
                >
                  <Activity className="w-6 h-6" style={{ color: accentColors.sky }} />
                </div>
                <div>
                  <CardTitle className="text-lg">Recent Automations</CardTitle>
                  <CardDescription>Latest agent activity</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="relative">
                {/* Timeline line */}
                <div 
                  className="absolute left-4 top-0 bottom-0 w-0.5 rounded-full"
                  style={{ backgroundColor: `${accentColors.sky}20` }}
                />
                
                <div className="space-y-4">
                  {recentAutomations.map((automation, index) => (
                    <div 
                      key={index} 
                      className="relative flex items-start gap-4 pl-8"
                      data-testid={`row-automation-${index}`}
                    >
                      {/* Timeline dot */}
                      <div 
                        className="absolute left-2 w-5 h-5 rounded-full border-2 bg-background flex items-center justify-center"
                        style={{ borderColor: accentColors.lime }}
                      >
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: accentColors.lime }}
                        />
                      </div>
                      
                      <div className="flex-1 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="text-sm font-medium">{automation.action}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge 
                            variant="secondary" 
                            className="text-xs"
                            style={{ backgroundColor: `${accentColors.sky}15`, color: accentColors.sky }}
                          >
                            {automation.agent}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{automation.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Roadmap & Governance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Roadmap Progress - Enhanced */}
          <Card className="overflow-hidden">
            <CardHeader 
              className="pb-4"
              style={{ background: `linear-gradient(135deg, ${accentColors.lime}12 0%, ${accentColors.lime}04 100%)` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${accentColors.lime}15` }}
                  >
                    <GitBranch className="w-6 h-6" style={{ color: accentColors.lime }} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Development Roadmap</CardTitle>
                    <CardDescription>4 capabilities in progress</CardDescription>
                  </div>
                </div>
                <Link href="/agent-value-map?tab=roadmap" data-testid="link-header-roadmap">
                  <Button variant="outline" size="sm" className="gap-1" data-testid="button-view-roadmap">
                    Full Roadmap <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {roadmapItems.map((item, index) => {
                const statusColor = item.status === 'In Progress' ? accentColors.sky : item.status === 'Planned' ? accentColors.olive : accentColors.orange;
                return (
                  <Link key={index} href="/agent-value-map?tab=roadmap" data-testid={`link-roadmap-${index}`}>
                    <div 
                      className="group p-4 rounded-xl border hover-elevate cursor-pointer transition-all"
                      data-testid={`row-roadmap-${index}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="relative w-12 h-12"
                          >
                            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                              <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted/30" />
                              <circle 
                                cx="24" cy="24" r="20" fill="none" 
                                stroke={statusColor}
                                strokeWidth="4" 
                                strokeLinecap="round"
                                strokeDasharray={`${item.progress * 1.25} 125`}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-bold">{item.progress}%</span>
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold text-sm group-hover:text-primary transition-colors">{item.name}</div>
                            <Badge variant="outline" className="text-xs mt-1">{item.quarter}</Badge>
                          </div>
                        </div>
                        <Badge 
                          variant="secondary"
                          className="text-xs"
                          style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </CardContent>
          </Card>

          {/* Governance & Compliance - Enhanced */}
          <Card className="overflow-hidden">
            <CardHeader 
              className="pb-4"
              style={{ background: `linear-gradient(135deg, ${accentColors.olive}12 0%, ${accentColors.olive}04 100%)` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${accentColors.olive}15` }}
                  >
                    <Shield className="w-6 h-6" style={{ color: accentColors.olive }} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Governance & Compliance</CardTitle>
                    <CardDescription>All metrics passing</CardDescription>
                  </div>
                </div>
                <Link href="/agent-value-map?tab=governance" data-testid="link-header-governance">
                  <Button variant="outline" size="sm" className="gap-1" data-testid="button-view-governance">
                    Details <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {governanceMetrics.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 rounded-xl border hover:bg-muted/30 transition-colors"
                  data-testid={`row-governance-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${accentColors.lime}15` }}
                    >
                      <CheckCircle2 className="w-4 h-4" style={{ color: accentColors.lime }} />
                    </div>
                    <span className="text-sm font-medium">{item.metric}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold" style={{ color: accentColors.lime }}>{item.value}</span>
                    <Badge 
                      variant="secondary"
                      className="text-xs"
                      style={{ backgroundColor: `${accentColors.lime}20`, color: accentColors.lime }}
                    >
                      Passing
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions - Enhanced */}
        <Card className="overflow-hidden">
          <CardHeader 
            className="pb-4"
            style={{ background: `linear-gradient(135deg, ${accentColors.orange}12 0%, ${accentColors.orange}04 100%)` }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${accentColors.orange}15` }}
              >
                <Sparkles className="w-6 h-6" style={{ color: accentColors.orange }} />
              </div>
              <div>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Jump to AI tools</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/agent-value-map?tab=overview" data-testid="link-quick-ai-overview">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 hover:scale-[1.02] transition-all" data-testid="button-quick-ai-overview">
                  <div className="w-12 h-12 rounded-lg mx-auto flex items-center justify-center" style={{ backgroundColor: `${accentColors.coral}15` }}>
                    <Brain className="w-6 h-6" style={{ color: accentColors.coral }} />
                  </div>
                  <span className="text-sm font-semibold">AI Overview</span>
                  <span className="text-xs text-muted-foreground">Agent metrics</span>
                </Button>
              </Link>
              <Link href="/agent-value-map?tab=framework" data-testid="link-quick-framework">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 hover:scale-[1.02] transition-all" data-testid="button-quick-framework">
                  <div className="w-12 h-12 rounded-lg mx-auto flex items-center justify-center" style={{ backgroundColor: `${accentColors.teal}15` }}>
                    <Layers className="w-6 h-6" style={{ color: accentColors.teal }} />
                  </div>
                  <span className="text-sm font-semibold">Framework</span>
                  <span className="text-xs text-muted-foreground">Agent architecture</span>
                </Button>
              </Link>
              <Link href="/agent-value-map?tab=scorecard" data-testid="link-quick-scorecard">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 hover:scale-[1.02] transition-all" data-testid="button-quick-scorecard">
                  <div className="w-12 h-12 rounded-lg mx-auto flex items-center justify-center" style={{ backgroundColor: `${accentColors.sky}15` }}>
                    <BarChart3 className="w-6 h-6" style={{ color: accentColors.sky }} />
                  </div>
                  <span className="text-sm font-semibold">Scorecard</span>
                  <span className="text-xs text-muted-foreground">Performance data</span>
                </Button>
              </Link>
              <Link href="/workflow-builder" data-testid="link-quick-workflows">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 hover:scale-[1.02] transition-all" data-testid="button-quick-workflows">
                  <div className="w-12 h-12 rounded-lg mx-auto flex items-center justify-center" style={{ backgroundColor: `${accentColors.lime}15` }}>
                    <Workflow className="w-6 h-6" style={{ color: accentColors.lime }} />
                  </div>
                  <span className="text-sm font-semibold">Workflows</span>
                  <span className="text-xs text-muted-foreground">Build automations</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
