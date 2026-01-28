import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText,
  DollarSign,
  Calendar,
  Building2,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  Sparkles,
  TrendingUp,
  Target,
  Eye,
  Bell,
  Lightbulb,
  ChevronRight,
  Users,
  Award,
  BarChart3,
  Plus,
  ExternalLink,
  Timer,
  Zap
} from "lucide-react";
import { Link } from "wouter";

interface Grant {
  id: string;
  funder: string;
  amount: number;
  purpose: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'pending' | 'completed' | 'draft';
  progress: number;
  category: string;
  contactName: string;
  nextMilestone: string;
  nextMilestoneDate: string;
  reportDue?: string;
  matchScore?: number;
}

interface GrantOpportunity {
  id: string;
  funder: string;
  amount: number;
  purpose: string;
  deadline: string;
  matchScore: number;
  category: string;
  requirements: string[];
  aiRecommendation: string;
}

export default function NcrFoundationGrants() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const grantMetrics = [
    { label: "Active Grants", value: "42", trend: "+3", icon: FileText, color: "#4FA6A6" },
    { label: "Total Grant Revenue", value: "$4.8M", trend: "+12%", icon: DollarSign, color: "#92A05A" },
    { label: "Pending Applications", value: "15", trend: "5 due soon", icon: Clock, color: "#E8A54B" },
    { label: "Success Rate", value: "68%", trend: "+5% YoY", icon: CheckCircle, color: "#395174" },
  ];

  const activeGrants: Grant[] = [
    { 
      id: "1",
      funder: "Nationwide Foundation", 
      amount: 100000, 
      purpose: "Affordable Housing Initiative",
      startDate: "Jan 2024",
      endDate: "Dec 2024",
      status: "active",
      progress: 75,
      category: "Housing",
      contactName: "Sarah Mitchell",
      nextMilestone: "Q4 Impact Report",
      nextMilestoneDate: "Dec 15, 2024",
      reportDue: "Dec 31, 2024"
    },
    { 
      id: "2",
      funder: "Cardinal Health Foundation", 
      amount: 75000, 
      purpose: "Senior Health Services Expansion",
      startDate: "Mar 2024",
      endDate: "Feb 2025",
      status: "active",
      progress: 50,
      category: "Healthcare",
      contactName: "Michael Chen",
      nextMilestone: "Mid-Year Review",
      nextMilestoneDate: "Jan 10, 2025"
    },
    { 
      id: "3",
      funder: "Honda of America Foundation", 
      amount: 50000, 
      purpose: "Community Wellness Program",
      startDate: "Apr 2024",
      endDate: "Mar 2025",
      status: "active",
      progress: 40,
      category: "Wellness",
      contactName: "Jennifer Park",
      nextMilestone: "Program Enrollment Goal",
      nextMilestoneDate: "Feb 1, 2025"
    },
    { 
      id: "4",
      funder: "Ohio Capital Corporation for Housing", 
      amount: 250000, 
      purpose: "LIHTC Property Improvements",
      startDate: "Jun 2024",
      endDate: "May 2026",
      status: "active",
      progress: 20,
      category: "Housing",
      contactName: "David Williams",
      nextMilestone: "Phase 1 Completion",
      nextMilestoneDate: "Mar 30, 2025"
    },
  ];

  const pendingApplications: Grant[] = [
    { 
      id: "5",
      funder: "Robert Wood Johnson Foundation", 
      amount: 500000, 
      purpose: "Social Determinants of Health",
      startDate: "",
      endDate: "",
      status: "pending",
      progress: 0,
      category: "Healthcare",
      contactName: "Program Officer TBD",
      nextMilestone: "Application Decision",
      nextMilestoneDate: "Mar 15, 2025"
    },
    { 
      id: "6",
      funder: "AARP Foundation", 
      amount: 150000, 
      purpose: "Aging in Place Technology",
      startDate: "",
      endDate: "",
      status: "pending",
      progress: 0,
      category: "Technology",
      contactName: "Lisa Thompson",
      nextMilestone: "Interview Round",
      nextMilestoneDate: "Feb 28, 2025"
    },
    { 
      id: "7",
      funder: "Kresge Foundation", 
      amount: 200000, 
      purpose: "Climate Resilience for Seniors",
      startDate: "",
      endDate: "",
      status: "pending",
      progress: 0,
      category: "Sustainability",
      contactName: "Program Team",
      nextMilestone: "Site Visit",
      nextMilestoneDate: "Apr 1, 2025"
    },
  ];

  const opportunities: GrantOpportunity[] = [
    {
      id: "opp1",
      funder: "The Duke Endowment",
      amount: 300000,
      purpose: "Rural Senior Care Innovation",
      deadline: "Mar 30, 2025",
      matchScore: 94,
      category: "Healthcare",
      requirements: ["501(c)(3) status", "Healthcare focus", "Rural service area"],
      aiRecommendation: "Strong alignment with your senior care mission. Duke prioritizes organizations with proven track records in healthcare innovation."
    },
    {
      id: "opp2",
      funder: "Bank of America Charitable Foundation",
      amount: 100000,
      purpose: "Workforce Development for Seniors",
      deadline: "Apr 15, 2025",
      matchScore: 87,
      category: "Employment",
      requirements: ["Community impact focus", "Measurable outcomes"],
      aiRecommendation: "Your existing workforce programs make this a natural fit. Consider highlighting job placement metrics."
    },
    {
      id: "opp3",
      funder: "W.K. Kellogg Foundation",
      amount: 500000,
      purpose: "Intergenerational Community Building",
      deadline: "May 1, 2025",
      matchScore: 82,
      category: "Community",
      requirements: ["Multi-year commitment", "Community partnerships"],
      aiRecommendation: "Consider partnering with local schools to strengthen the intergenerational component of your proposal."
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500';
      case 'pending': return 'bg-amber-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-amber-600 bg-amber-50';
    return 'text-gray-600 bg-gray-50';
  };

  const urgentDeadlines = pendingApplications.filter(g => {
    const deadline = new Date(g.nextMilestoneDate);
    const now = new Date();
    const daysUntil = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 30;
  });


  return (
    <div className="space-y-6 min-h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold" data-testid="page-title">Grant Management</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered grant tracking, discovery, and management
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Bell className="w-4 h-4" />
            Alerts
            {urgentDeadlines.length > 0 && (
              <Badge className="bg-red-500 text-white ml-1">{urgentDeadlines.length}</Badge>
            )}
          </Button>
          <Button className="gap-2 bg-[#395174] hover:bg-[#395174]/90">
            <Plus className="w-4 h-4" />
            New Application
          </Button>
        </div>
      </div>

      {/* AI Insights Banner */}
      <Card className="border-[#4FA6A6]/30 bg-gradient-to-r from-[#4FA6A6]/5 to-transparent">
        <CardContent className="py-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#4FA6A6]/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#4FA6A6]" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold flex items-center gap-2">
                AI Grant Intelligence
                <Badge variant="secondary" className="text-xs">Live</Badge>
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Found <strong>3 new opportunities</strong> matching your mission profile. Your Q4 reports are on track, 
                with 2 deadlines in the next 30 days. Consider applying to the Duke Endowment grant - 94% match score.
              </p>
              <div className="flex items-center gap-3 mt-3">
                <Button size="sm" variant="outline" className="gap-1">
                  <Eye className="w-3 h-3" />
                  View Opportunities
                </Button>
                <Button size="sm" variant="ghost" className="gap-1 text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  Review Calendar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {grantMetrics.map((metric) => (
          <Card key={metric.label} className="hover-elevate cursor-pointer" data-testid={`metric-${metric.label.toLowerCase().replace(/\s+/g, '-')}`}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-3xl font-bold mt-1" style={{ color: metric.color }}>{metric.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    {metric.trend}
                  </p>
                </div>
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${metric.color}15` }}
                >
                  <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="active" className="gap-2">
              <CheckCircle className="w-4 h-4" />
              Active ({activeGrants.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="w-4 h-4" />
              Pending ({pendingApplications.length})
            </TabsTrigger>
            <TabsTrigger value="opportunities" className="gap-2">
              <Sparkles className="w-4 h-4" />
              AI Matches
            </TabsTrigger>
          </TabsList>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search grants..."
              className="pl-10"
              data-testid="search-grants"
            />
          </div>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Upcoming Deadlines */}
            <Card className="lg:col-span-2">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#E8A54B]/10 flex items-center justify-center">
                    <Timer className="w-4 h-4 text-[#E8A54B]" />
                  </div>
                  Upcoming Deadlines
                </CardTitle>
                <CardDescription>Critical dates in the next 60 days</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {[...activeGrants.slice(0, 2), ...pendingApplications.slice(0, 2)].map((grant) => (
                    <Link key={grant.id} href={`/grants/${grant.id}`}>
                      <div className="flex items-center justify-between p-4 rounded-lg border hover-elevate cursor-pointer" data-testid={`deadline-${grant.id}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(grant.status)}`} />
                          <div>
                            <p className="font-medium">{grant.funder}</p>
                            <p className="text-sm text-muted-foreground">{grant.nextMilestone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-sm font-medium">{grant.nextMilestoneDate}</p>
                            <Badge variant="outline" className="text-xs">{grant.category}</Badge>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#92A05A]/10 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-[#92A05A]" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="w-4 h-4" />
                  Draft New Proposal
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Search className="w-4 h-4" />
                  Search Funders
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Calendar className="w-4 h-4" />
                  View Calendar
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#395174]/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#395174]" />
                </div>
                Active Grants Overview
              </CardTitle>
              <CardDescription>Track progress across all active grants</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {activeGrants.map((grant) => (
                  <Link key={grant.id} href={`/grants/${grant.id}`}>
                    <div 
                      className="p-4 rounded-lg border hover-elevate cursor-pointer"
                      data-testid={`grant-${grant.funder.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#395174]/10 flex items-center justify-center shrink-0">
                            <Building2 className="w-6 h-6 text-[#395174]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-lg">{grant.funder}</span>
                              <Badge className={getStatusColor(grant.status)}>{grant.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{grant.purpose}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                {grant.startDate} - {grant.endDate}
                              </span>
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Users className="w-3 h-3" />
                                {grant.contactName}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-[#92A05A]">{formatCurrency(grant.amount)}</p>
                            <p className="text-xs text-muted-foreground">Grant Amount</p>
                          </div>
                          <div className="w-32">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{grant.progress}%</span>
                            </div>
                            <Progress value={grant.progress} className="h-2" />
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Grants Tab */}
        <TabsContent value="active" className="space-y-4">
          {activeGrants.map((grant) => (
            <Link key={grant.id} href={`/grants/${grant.id}`}>
              <Card className="hover-elevate cursor-pointer" data-testid={`active-grant-${grant.id}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#395174]/10 flex items-center justify-center shrink-0">
                        <Building2 className="w-7 h-7 text-[#395174]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-xl">{grant.funder}</span>
                          <Badge className={getStatusColor(grant.status)}>{grant.status}</Badge>
                          <Badge variant="outline">{grant.category}</Badge>
                        </div>
                        <p className="text-muted-foreground mt-1">{grant.purpose}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm flex-wrap">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {grant.startDate} - {grant.endDate}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Users className="w-3 h-3" />
                            {grant.contactName}
                          </span>
                          <span className="flex items-center gap-1 text-amber-600">
                            <Target className="w-3 h-3" />
                            Next: {grant.nextMilestone}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-3xl font-bold text-[#92A05A]">{formatCurrency(grant.amount)}</p>
                        <p className="text-sm text-muted-foreground">Grant Amount</p>
                      </div>
                      <div className="w-40">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold">{grant.progress}%</span>
                        </div>
                        <Progress value={grant.progress} className="h-3" />
                      </div>
                      <ChevronRight className="w-6 h-6 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </TabsContent>

        {/* Pending Applications Tab */}
        <TabsContent value="pending" className="space-y-4">
          {pendingApplications.map((app) => (
            <Link key={app.id} href={`/grants/${app.id}`}>
              <Card className="hover-elevate cursor-pointer" data-testid={`pending-grant-${app.id}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#E8A54B]/10 flex items-center justify-center shrink-0">
                        <Clock className="w-7 h-7 text-[#E8A54B]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-xl">{app.funder}</span>
                          <Badge className="bg-amber-500">pending</Badge>
                          <Badge variant="outline">{app.category}</Badge>
                        </div>
                        <p className="text-muted-foreground mt-1">{app.purpose}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm">
                          <span className="flex items-center gap-1 text-amber-600 font-medium">
                            <AlertCircle className="w-3 h-3" />
                            Decision: {app.nextMilestoneDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-3xl font-bold text-[#E8A54B]">{formatCurrency(app.amount)}</p>
                        <p className="text-sm text-muted-foreground">Requested</p>
                      </div>
                      <ChevronRight className="w-6 h-6 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </TabsContent>

        {/* AI Opportunities Tab */}
        <TabsContent value="opportunities" className="space-y-6">
          <Card className="border-[#4FA6A6]/30 bg-gradient-to-r from-[#4FA6A6]/5 to-transparent">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#4FA6A6]" />
                <p className="text-sm">
                  <strong>AI Grant Matcher</strong> analyzed 2,847 active grant opportunities and found {opportunities.length} strong matches for your organization.
                </p>
              </div>
            </CardContent>
          </Card>

          {opportunities.map((opp) => (
            <Card key={opp.id} className="hover-elevate cursor-pointer" data-testid={`opportunity-${opp.id}`}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-[#4FA6A6]/10 flex items-center justify-center shrink-0">
                          <Award className="w-7 h-7 text-[#4FA6A6]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-xl">{opp.funder}</span>
                            <Badge variant="outline">{opp.category}</Badge>
                          </div>
                          <p className="text-muted-foreground mt-1">{opp.purpose}</p>
                          <div className="flex items-center gap-4 mt-3 text-sm">
                            <span className="font-semibold text-[#92A05A]">{formatCurrency(opp.amount)}</span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              Deadline: {opp.deadline}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-2 rounded-lg text-center ${getMatchScoreColor(opp.matchScore)}`}>
                        <p className="text-2xl font-bold">{opp.matchScore}%</p>
                        <p className="text-xs">Match</p>
                      </div>
                    </div>

                    <div className="mt-4 p-4 rounded-lg bg-muted/30 border">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">AI Recommendation</p>
                          <p className="text-sm text-muted-foreground mt-1">{opp.aiRecommendation}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 flex-wrap">
                      {opp.requirements.map((req, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          <CheckCircle className="w-3 h-3 mr-1 text-emerald-500" />
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 lg:w-40">
                    <Button className="gap-2 bg-[#395174] hover:bg-[#395174]/90">
                      <FileText className="w-4 h-4" />
                      Start Application
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
