import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  Target, 
  BarChart3,
  FileText,
  Lightbulb,
  ArrowRight
} from "lucide-react";

export default function Home() {
  const quickActions = [
    {
      title: "Dashboard",
      description: "View key metrics and analytics",
      icon: BarChart3,
      href: "/dashboard"
    },
    {
      title: "Donors",
      description: "Manage donor relationships",
      icon: Users,
      href: "/donors"
    },
    {
      title: "Pipeline",
      description: "Track opportunities and forecasts",
      icon: TrendingUp,
      href: "/pipeline"
    },
    {
      title: "Events",
      description: "Coordinate fundraising events",
      icon: Calendar,
      href: "/events"
    },
    {
      title: "Grants",
      description: "Research and submit grants",
      icon: FileText,
      href: "/grants"
    },
    {
      title: "Campaigns",
      description: "Plan and execute campaigns",
      icon: Target,
      href: "/campaigns"
    }
  ];

  const aiFeatures = [
    {
      title: "Predictive Timing",
      description: "AI-powered optimal ask timing predictions",
      href: "/ai/predictive-timing"
    },
    {
      title: "Wealth Events",
      description: "Real-time monitoring of donor wealth signals",
      href: "/ai/wealth-events"
    },
    {
      title: "Meeting Briefs",
      description: "Automated donor research and talking points",
      href: "/ai/meeting-briefs"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Lightbulb className="h-4 w-4" />
          AI-Powered Fundraising Intelligence
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to FundRazor
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your enterprise-grade donor management and fundraising intelligence platform
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} href={action.href}>
                <Card className="hover-elevate active-elevate-2 cursor-pointer transition-all h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-semibold text-lg flex items-center justify-between">
                          {action.title}
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* AI Intelligence Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">AI Intelligence</h2>
          <Button variant="ghost" asChild>
            <Link href="/ai">
              View All <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiFeatures.map((feature) => (
            <Link key={feature.title} href={feature.href}>
              <Card className="hover-elevate active-elevate-2 cursor-pointer transition-all h-full">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center justify-between">
                      {feature.title}
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Platform Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm">YTD Revenue</span>
              </div>
              <p className="text-3xl font-bold">$12.4M</p>
              <p className="text-sm text-green-600">↑ 18% vs last year</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm">Active Donors</span>
              </div>
              <p className="text-3xl font-bold">8,432</p>
              <p className="text-sm text-green-600">↑ 12% growth</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">Pipeline Value</span>
              </div>
              <p className="text-3xl font-bold">$3.2M</p>
              <p className="text-sm text-blue-600">45 opportunities</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Upcoming Events</span>
              </div>
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Next 30 days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom CTA */}
      <div className="text-center py-8 space-y-4">
        <h3 className="text-xl font-semibold">
          Ready to dive deeper into your data?
        </h3>
        <div className="flex items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/dashboard">
              Go to Dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/welcome">
              Learn More
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
