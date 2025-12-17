import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
    employees: 20000,
    annualRevenue: 7000000000,
    prospectStage: "cultivation",
    estimatedCapacity: 400000,
    askAmount: 200000,
    partnershipInterests: ["Affordable housing", "Homeownership education", "Community development"],
    connections: [
      { name: "Community Investment Team", relationship: "Email correspondence", strength: "medium" },
    ],
    lastActivity: "Site visit completed 3/18/2024",
    nextStep: "Send impact data package",
    nextStepDate: "2024-04-05",
    assignedTo: "Michael Chen",
    notes: "Strong alignment with housing mission",
    score: 82,
  },
  {
    id: "6",
    companyName: "Meijer",
    logoUrl: "https://logo.clearbit.com/meijer.com",
    industry: "Retail",
    headquarters: "Grand Rapids, MI",
    employees: 70000,
    annualRevenue: 20000000000,
    prospectStage: "negotiation",
    estimatedCapacity: 150000,
    askAmount: 75000,
    partnershipInterests: ["Food security", "In-kind food donations", "Employee volunteering"],
    connections: [
      { name: "Regional VP: Tom Anderson", relationship: "Board member intro", strength: "strong" },
    ],
    lastActivity: "Contract terms discussed 3/22/2024",
    nextStep: "Finalize partnership agreement",
    nextStepDate: "2024-04-03",
    assignedTo: "Sarah Johnson",
    notes: "Annual food donation partnership + sponsorship",
    score: 95,
  },
];

const stageLabels: Record<string, { label: string; variant: "default" | "secondary" | "outline"; step: number }> = {
  research: { label: "Research", variant: "outline", step: 1 },
  qualification: { label: "Qualification", variant: "secondary", step: 2 },
  cultivation: { label: "Cultivation", variant: "secondary", step: 3 },
  solicitation: { label: "Solicitation", variant: "default", step: 4 },
  negotiation: { label: "Negotiation", variant: "default", step: 5 },
};

const strengthVariants: Record<string, "default" | "secondary" | "outline"> = {
  strong: "default",
  medium: "secondary",
  weak: "outline",
};

export default function CorporateProspects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStage, setFilterStage] = useState<string>("all");

  const filteredProspects = mockProspects.filter((p) => {
    const matchesSearch =
      p.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = filterStage === "all" || p.prospectStage === filterStage;
    return matchesSearch && matchesStage;
  });

  const totalPipeline = mockProspects.reduce((sum, p) => sum + (p.askAmount || p.estimatedCapacity * 0.3), 0);
  const activeProspects = mockProspects.length;
  const inSolicitation = mockProspects.filter(
    (p) => p.prospectStage === "solicitation" || p.prospectStage === "negotiation"
  ).length;
  const avgScore = Math.round(mockProspects.reduce((sum, p) => sum + p.score, 0) / mockProspects.length);

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Corporate Prospects</h1>
        <p className="text-sm text-muted-foreground">
          Pipeline of potential corporate partners being cultivated
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }} data-testid="metric-total-pipeline">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pipeline Value</CardTitle>
            <DollarSign className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>
              ${totalPipeline.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Potential partnerships</p>
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

        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }} data-testid="metric-in-solicitation">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Solicitation</CardTitle>
            <TrendingUp className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>{inSolicitation}</div>
            <p className="text-xs text-muted-foreground mt-1">Ready to close</p>
          </CardContent>
        </Card>

        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }} data-testid="metric-avg-score">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Prospect Score</CardTitle>
            <Star className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>{avgScore}</div>
            <p className="text-xs text-muted-foreground mt-1">Out of 100</p>
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

      <div className="space-y-4">
        {filteredProspects.map((prospect) => (
          <Card
            key={prospect.id}
            className="border hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
            data-testid={`card-prospect-${prospect.id}`}
          >
            {/* Header with light blue background */}
            <div className="p-4 flex items-center gap-4" style={{ backgroundColor: 'rgba(222, 235, 247, 0.5)' }}>
              {prospect.logoUrl ? (
                <img
                  src={prospect.logoUrl}
                  alt={`${prospect.companyName} logo`}
                  className="w-14 h-14 object-contain rounded-lg bg-white p-2 border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-primary" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold">{prospect.companyName}</h3>
                  <Badge variant={stageLabels[prospect.prospectStage].variant}>
                    {stageLabels[prospect.prospectStage].label}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {prospect.industry}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {prospect.headquarters}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {prospect.employees.toLocaleString()} employees
                  </span>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                {/* Partnership Interests and Connections */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {prospect.partnershipInterests.map((interest, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>

                  {prospect.connections.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Connections:</span>
                      {prospect.connections.map((conn, idx) => (
                        <Badge key={idx} variant={strengthVariants[conn.strength]} className="text-xs">
                          {conn.name.split(":")[0]}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {prospect.notes && (
                    <p className="text-sm text-muted-foreground italic">{prospect.notes}</p>
                  )}
                </div>

                {/* Metrics and Actions */}
                <div className="w-64 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Est. Capacity</p>
                      <p className="text-lg font-bold" style={{ color: "#084594" }}>
                        ${prospect.estimatedCapacity.toLocaleString()}
                      </p>
                    </div>
                    {prospect.askAmount && (
                      <div>
                        <p className="text-xs text-muted-foreground">Ask Amount</p>
                        <p className="text-lg font-bold" style={{ color: "#084594" }}>
                          ${prospect.askAmount.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Prospect Score</span>
                      <span className="text-sm font-semibold" style={{ color: "#084594" }}>
                        {prospect.score}/100
                      </span>
                    </div>
                    <Progress value={prospect.score} className="h-2" />
                  </div>

                  {prospect.nextStep && (
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Next Step</p>
                      <p className="text-sm font-medium">{prospect.nextStep}</p>
                      {prospect.nextStepDate && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(prospect.nextStepDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Assigned: {prospect.assignedTo}</span>
                    <Button variant="ghost" size="sm">
                      View Details
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
