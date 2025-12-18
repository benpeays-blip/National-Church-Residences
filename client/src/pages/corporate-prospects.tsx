import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Target,
  Building2,
  Calendar,
  DollarSign,
  Search,
  Filter,
  TrendingUp,
  ArrowRight,
  Users,
  MapPin,
  Briefcase,
  Phone,
  Mail,
  Star,
  Clock,
  CheckCircle,
  Circle,
  Sparkles,
  FileText,
  Send,
  UserPlus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CorporateProspect {
  id: string;
  companyName: string;
  logoUrl?: string;
  industry: string;
  headquarters: string;
  employees: number;
  annualRevenue: number;
  prospectStage: "research" | "qualification" | "cultivation" | "solicitation" | "negotiation";
  estimatedCapacity: number;
  askAmount?: number;
  partnershipInterests: string[];
  connections: {
    name: string;
    relationship: string;
    strength: "strong" | "medium" | "weak";
  }[];
  lastActivity?: string;
  nextStep?: string;
  nextStepDate?: string;
  assignedTo: string;
  notes?: string;
  score: number;
}

interface ActionStep {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  icon: typeof Phone;
}

const mockProspects: CorporateProspect[] = [
  {
    id: "1",
    companyName: "Discover Financial Services",
    logoUrl: "https://logo.clearbit.com/discover.com",
    industry: "Financial Services",
    headquarters: "Riverwoods, IL",
    employees: 16000,
    annualRevenue: 14000000000,
    prospectStage: "cultivation",
    estimatedCapacity: 250000,
    askAmount: 100000,
    partnershipInterests: ["Financial literacy", "Matching gifts", "Employee volunteering"],
    connections: [
      { name: "Board Member: Robert Stevens", relationship: "Former colleague", strength: "strong" },
      { name: "VP Community: Lisa Park", relationship: "Met at conference", strength: "medium" },
    ],
    lastActivity: "Discovery meeting held 3/15/2024",
    nextStep: "Proposal presentation",
    nextStepDate: "2024-04-20",
    assignedTo: "Sarah Johnson",
    score: 85,
  },
  {
    id: "2",
    companyName: "Progressive Insurance",
    logoUrl: "https://logo.clearbit.com/progressive.com",
    industry: "Insurance",
    headquarters: "Mayfield Village, OH",
    employees: 43000,
    annualRevenue: 42000000000,
    prospectStage: "qualification",
    estimatedCapacity: 500000,
    partnershipInterests: ["Event sponsorship", "Community safety programs", "Corporate giving"],
    connections: [
      { name: "CEO Family Foundation", relationship: "Known donor to similar orgs", strength: "weak" },
    ],
    lastActivity: "Initial research completed 3/1/2024",
    nextStep: "Schedule introductory meeting",
    nextStepDate: "2024-04-15",
    assignedTo: "Michael Chen",
    score: 72,
  },
  {
    id: "3",
    companyName: "Sherwin-Williams",
    logoUrl: "https://logo.clearbit.com/sherwin-williams.com",
    industry: "Manufacturing",
    headquarters: "Cleveland, OH",
    employees: 61000,
    annualRevenue: 22000000000,
    prospectStage: "solicitation",
    estimatedCapacity: 300000,
    askAmount: 150000,
    partnershipInterests: ["Housing programs", "In-kind donations", "Days of Service"],
    connections: [
      { name: "Foundation Director: Amy Walsh", relationship: "Warm intro via board", strength: "strong" },
      { name: "Local Store Manager", relationship: "Past volunteer", strength: "medium" },
    ],
    lastActivity: "Proposal submitted 3/20/2024",
    nextStep: "Follow up on proposal",
    nextStepDate: "2024-04-10",
    assignedTo: "Sarah Johnson",
    notes: "Very interested in housing repair partnership",
    score: 90,
  },
  {
    id: "4",
    companyName: "KeyBank",
    logoUrl: "https://logo.clearbit.com/key.com",
    industry: "Banking",
    headquarters: "Cleveland, OH",
    employees: 17000,
    annualRevenue: 6500000000,
    prospectStage: "research",
    estimatedCapacity: 200000,
    partnershipInterests: ["Financial empowerment", "Small business support", "Workforce development"],
    connections: [],
    lastActivity: "Added to prospect list 3/25/2024",
    nextStep: "Research corporate giving priorities",
    nextStepDate: "2024-04-08",
    assignedTo: "David Williams",
    score: 55,
  },
  {
    id: "5",
    companyName: "Quicken Loans (Rocket Mortgage)",
    logoUrl: "https://logo.clearbit.com/rocketmortgage.com",
    industry: "Financial Services",
    headquarters: "Detroit, MI",
    employees: 26000,
    annualRevenue: 12000000000,
    prospectStage: "negotiation",
    estimatedCapacity: 400000,
    askAmount: 200000,
    partnershipInterests: ["Homeownership programs", "Community development", "Tech education"],
    connections: [
      { name: "CMO: Jennifer Smith", relationship: "Alumni connection", strength: "strong" },
    ],
    lastActivity: "Terms discussion 3/28/2024",
    nextStep: "Finalize partnership agreement",
    nextStepDate: "2024-04-05",
    assignedTo: "Sarah Johnson",
    notes: "Multi-year commitment being discussed",
    score: 95,
  },
  {
    id: "6",
    companyName: "FirstEnergy",
    logoUrl: "https://logo.clearbit.com/firstenergycorp.com",
    industry: "Energy",
    headquarters: "Akron, OH",
    employees: 12000,
    annualRevenue: 11000000000,
    prospectStage: "cultivation",
    estimatedCapacity: 175000,
    askAmount: 75000,
    partnershipInterests: ["Sustainability", "Workforce development", "STEM education"],
    connections: [
      { name: "VP Operations", relationship: "Board connection", strength: "medium" },
    ],
    lastActivity: "Facility tour 3/22/2024",
    nextStep: "Submit proposal draft",
    nextStepDate: "2024-04-18",
    assignedTo: "Michael Chen",
    score: 78,
  },
];

const stageLabels: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  research: { label: "Research", variant: "outline" },
  qualification: { label: "Qualification", variant: "secondary" },
  cultivation: { label: "Cultivation", variant: "default" },
  solicitation: { label: "Solicitation", variant: "default" },
  negotiation: { label: "Negotiation", variant: "default" },
};

const getActionSteps = (prospect: CorporateProspect): ActionStep[] => {
  const today = new Date();
  
  if (prospect.prospectStage === "research") {
    return [
      {
        id: 1,
        title: "Complete company research",
        description: `Research ${prospect.companyName}'s corporate giving history, philanthropic priorities, and key decision makers`,
        dueDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: false,
        icon: FileText,
      },
      {
        id: 2,
        title: "Identify connections",
        description: "Search board and staff networks for warm introduction paths",
        dueDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: false,
        icon: Users,
      },
      {
        id: 3,
        title: "Review public filings",
        description: "Analyze foundation 990s and CSR reports for giving patterns",
        dueDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: FileText,
      },
    ];
  }
  
  if (prospect.prospectStage === "qualification") {
    return [
      {
        id: 1,
        title: "Schedule discovery call",
        description: `Arrange introductory conversation with ${prospect.companyName} community relations team`,
        dueDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: false,
        icon: Phone,
      },
      {
        id: 2,
        title: "Prepare qualification brief",
        description: "Document alignment between company priorities and our programs",
        dueDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: FileText,
      },
      {
        id: 3,
        title: "Send introduction email",
        description: "Craft personalized outreach highlighting mutual connections",
        dueDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: false,
        icon: Mail,
      },
    ];
  }
  
  if (prospect.prospectStage === "cultivation") {
    return [
      {
        id: 1,
        title: "Schedule site visit",
        description: `Invite ${prospect.companyName} leadership to tour programs and meet beneficiaries`,
        dueDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: false,
        icon: Building2,
      },
      {
        id: 2,
        title: "Send impact materials",
        description: "Share annual report, case studies, and program outcomes data",
        dueDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: true,
        icon: Send,
      },
      {
        id: 3,
        title: "Introduce to CEO",
        description: "Arrange peer-level meeting between executives",
        dueDate: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: UserPlus,
      },
      {
        id: 4,
        title: "Develop proposal draft",
        description: "Create customized partnership proposal based on discovery insights",
        dueDate: new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: FileText,
      },
    ];
  }
  
  if (prospect.prospectStage === "solicitation") {
    return [
      {
        id: 1,
        title: "Submit formal proposal",
        description: `Present ${prospect.askAmount ? `$${prospect.askAmount.toLocaleString()}` : 'partnership'} proposal to decision makers`,
        dueDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: true,
        icon: FileText,
      },
      {
        id: 2,
        title: "Follow up on proposal",
        description: "Check in with contact on proposal review timeline",
        dueDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: false,
        icon: Phone,
      },
      {
        id: 3,
        title: "Address questions",
        description: "Prepare answers to anticipated concerns about partnership structure",
        dueDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: Mail,
      },
    ];
  }
  
  if (prospect.prospectStage === "negotiation") {
    return [
      {
        id: 1,
        title: "Finalize terms",
        description: "Confirm partnership amount, duration, recognition, and deliverables",
        dueDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: false,
        icon: FileText,
      },
      {
        id: 2,
        title: "Draft agreement",
        description: "Prepare partnership agreement for legal review",
        dueDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: false,
        icon: FileText,
      },
      {
        id: 3,
        title: "Plan announcement",
        description: "Coordinate joint press release and social media strategy",
        dueDate: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: Send,
      },
    ];
  }
  
  return [];
};

export default function CorporateProspects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStage, setFilterStage] = useState<string>("all");
  const [selectedProspect, setSelectedProspect] = useState<CorporateProspect | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, number[]>>({});

  const filteredProspects = mockProspects.filter((p) => {
    const matchesSearch =
      p.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = filterStage === "all" || p.prospectStage === filterStage;
    return matchesSearch && matchesStage;
  });

  const totalPipeline = mockProspects.reduce((sum, p) => sum + p.estimatedCapacity, 0);
  const activeProspects = mockProspects.length;
  const highScoreProspects = mockProspects.filter((p) => p.score >= 80).length;
  const inNegotiation = mockProspects.filter((p) => p.prospectStage === "negotiation").length;

  const toggleStepComplete = (prospectId: string, stepId: number) => {
    setCompletedSteps(prev => {
      const prospectSteps = prev[prospectId] || [];
      if (prospectSteps.includes(stepId)) {
        return { ...prev, [prospectId]: prospectSteps.filter(id => id !== stepId) };
      } else {
        return { ...prev, [prospectId]: [...prospectSteps, stepId] };
      }
    });
  };

  const isStepCompleted = (prospectId: string, stepId: number, defaultCompleted: boolean) => {
    if (completedSteps[prospectId]?.includes(stepId)) {
      return !defaultCompleted;
    }
    return defaultCompleted;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Corporate Prospects</h1>
        <p className="text-sm text-muted-foreground">
          Pipeline of potential corporate partners and sponsorship opportunities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }} data-testid="metric-pipeline-value">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <DollarSign className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>
              ${totalPipeline.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Estimated capacity</p>
          </CardContent>
        </Card>

        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }} data-testid="metric-active-prospects">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Prospects</CardTitle>
            <Target className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>{activeProspects}</div>
            <p className="text-xs text-muted-foreground mt-1">In pipeline</p>
          </CardContent>
        </Card>

        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }} data-testid="metric-high-score">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Score</CardTitle>
            <Star className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>{highScoreProspects}</div>
            <p className="text-xs text-muted-foreground mt-1">Score 80+</p>
          </CardContent>
        </Card>

        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }} data-testid="metric-negotiation">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Negotiation</CardTitle>
            <TrendingUp className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>{inNegotiation}</div>
            <p className="text-xs text-muted-foreground mt-1">Close to closing</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by company or industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-prospects"
          />
        </div>
        <Select value={filterStage} onValueChange={setFilterStage}>
          <SelectTrigger className="w-[180px]" data-testid="select-filter-stage">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            <SelectItem value="research">Research</SelectItem>
            <SelectItem value="qualification">Qualification</SelectItem>
            <SelectItem value="cultivation">Cultivation</SelectItem>
            <SelectItem value="solicitation">Solicitation</SelectItem>
            <SelectItem value="negotiation">Negotiation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProspects.map((prospect) => (
          <Card
            key={prospect.id}
            className="border hover:shadow-lg transition-shadow cursor-pointer hover-elevate"
            onClick={() => setSelectedProspect(prospect)}
            data-testid={`card-prospect-${prospect.id}`}
          >
            <CardHeader className="pb-3" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {prospect.logoUrl ? (
                    <img
                      src={prospect.logoUrl}
                      alt={`${prospect.companyName} logo`}
                      className="w-12 h-12 object-contain rounded-lg bg-white p-1 border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-lg">{prospect.companyName}</CardTitle>
                    <p className="text-sm text-muted-foreground">{prospect.industry}</p>
                  </div>
                </div>
                <Badge variant={stageLabels[prospect.prospectStage].variant}>
                  {stageLabels[prospect.prospectStage].label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Est. Capacity</p>
                  <p className="text-xl font-bold" style={{ color: "#084594" }}>
                    ${prospect.estimatedCapacity.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Prospect Score</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-bold" style={{ color: "#084594" }}>
                      {prospect.score}/100
                    </p>
                  </div>
                </div>
              </div>

              {prospect.nextStep && (
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">{prospect.nextStep}</p>
                  </div>
                  {prospect.nextStepDate && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(prospect.nextStepDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              )}

              <div>
                <p className="text-xs text-muted-foreground mb-2">Partnership Interests</p>
                <div className="flex flex-wrap gap-1">
                  {prospect.partnershipInterests.slice(0, 3).map((interest, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                  {prospect.partnershipInterests.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{prospect.partnershipInterests.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {prospect.headquarters}
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail Sheet */}
      <Sheet open={!!selectedProspect} onOpenChange={() => setSelectedProspect(null)}>
        <SheetContent className="w-[450px] sm:w-[540px] overflow-y-auto">
          {selectedProspect && (
            <>
              <SheetHeader className="pb-4">
                <div className="flex items-center gap-3">
                  {selectedProspect.logoUrl ? (
                    <img
                      src={selectedProspect.logoUrl}
                      alt={`${selectedProspect.companyName} logo`}
                      className="w-12 h-12 object-contain rounded-lg bg-muted p-2"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <SheetTitle>{selectedProspect.companyName}</SheetTitle>
                    <SheetDescription>
                      {selectedProspect.industry} • {selectedProspect.headquarters}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-6">
                {/* Prospect Stats */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-lg" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }}>
                  <div>
                    <p className="text-xs text-muted-foreground">Est. Capacity</p>
                    <p className="text-2xl font-bold" style={{ color: "#395174" }}>
                      ${selectedProspect.estimatedCapacity.toLocaleString()}
                    </p>
                  </div>
                  {selectedProspect.askAmount && (
                    <div>
                      <p className="text-xs text-muted-foreground">Ask Amount</p>
                      <p className="text-2xl font-bold" style={{ color: "#395174" }}>
                        ${selectedProspect.askAmount.toLocaleString()}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground">Employees</p>
                    <p className="text-lg font-semibold">{selectedProspect.employees.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Score</p>
                    <p className="text-lg font-semibold">{selectedProspect.score}/100</p>
                  </div>
                </div>

                {/* Connections */}
                {selectedProspect.connections.length > 0 && (
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Users className="w-4 h-4" style={{ color: "#395174" }} />
                        Connections
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {selectedProspect.connections.map((conn, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div>
                            <p className="text-sm font-medium">{conn.name}</p>
                            <p className="text-xs text-muted-foreground">{conn.relationship}</p>
                          </div>
                          <Badge variant={conn.strength === "strong" ? "default" : conn.strength === "medium" ? "secondary" : "outline"}>
                            {conn.strength}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* AI Recommendations */}
                <Card className="border" style={{ backgroundColor: "rgba(57, 81, 116, 0.05)" }}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4" style={{ color: "#395174" }} />
                      <h4 className="font-semibold text-sm" style={{ color: "#395174" }}>Recommended Next Steps</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Actions tailored for the {stageLabels[selectedProspect.prospectStage].label.toLowerCase()} stage to advance this prospect.
                    </p>
                  </CardContent>
                </Card>

                {/* Action Steps */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <Target className="w-4 h-4" style={{ color: "#395174" }} />
                    Action Steps ({getActionSteps(selectedProspect).filter(s => !isStepCompleted(selectedProspect.id, s.id, s.completed)).length} remaining)
                  </h3>
                  
                  {getActionSteps(selectedProspect).map((step) => {
                    const StepIcon = step.icon;
                    const completed = isStepCompleted(selectedProspect.id, step.id, step.completed);
                    
                    return (
                      <div
                        key={step.id}
                        className={`p-4 rounded-lg border transition-all ${
                          completed ? "bg-muted/50 opacity-60" : "bg-background"
                        }`}
                        data-testid={`action-step-${step.id}`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleStepComplete(selectedProspect.id, step.id)}
                            className="mt-0.5 flex-shrink-0"
                            data-testid={`button-toggle-step-${step.id}`}
                          >
                            {completed ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                            )}
                          </button>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={`font-medium text-sm ${completed ? "line-through text-muted-foreground" : ""}`}>
                                {step.title}
                              </h4>
                              <Badge
                                variant={
                                  step.priority === "high"
                                    ? "destructive"
                                    : step.priority === "medium"
                                    ? "secondary"
                                    : "outline"
                                }
                                className="text-xs"
                              >
                                {step.priority}
                              </Badge>
                            </div>
                            <p className={`text-sm ${completed ? "text-muted-foreground/60" : "text-muted-foreground"}`}>
                              {step.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                <span>Due: {step.dueDate}</span>
                              </div>
                              <div 
                                className="w-6 h-6 rounded flex items-center justify-center"
                                style={{ backgroundColor: "rgba(57, 81, 116, 0.1)" }}
                              >
                                <StepIcon className="w-3 h-3" style={{ color: "#395174" }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t space-y-2">
                  <Button className="w-full" style={{ backgroundColor: "#395174" }} data-testid="button-start-workflow">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Cultivation Workflow
                  </Button>
                  <Button variant="outline" className="w-full" data-testid="button-view-history">
                    <Clock className="w-4 h-4 mr-2" />
                    View Activity History
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
