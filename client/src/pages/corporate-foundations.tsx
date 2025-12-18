import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Landmark,
  Building2,
  Calendar,
  DollarSign,
  Search,
  Filter,
  TrendingUp,
  FileText,
  ArrowRight,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CorporateFoundation {
  id: string;
  foundationName: string;
  parentCompany: string;
  logoUrl?: string;
  relationshipStatus: "active" | "prospect" | "lapsed" | "declined";
  totalGiving: number;
  currentGrant?: {
    amount: number;
    purpose: string;
    startDate: string;
    endDate: string;
    status: "active" | "pending" | "reporting";
  };
  grantHistory: {
    year: string;
    amount: number;
  }[];
  focusAreas: string[];
  applicationDeadlines?: string[];
  programOfficer?: {
    name: string;
    title: string;
    email: string;
  };
  notes?: string;
}

const mockFoundations: CorporateFoundation[] = [
  {
    id: "1",
    foundationName: "Nationwide Foundation",
    parentCompany: "Nationwide Insurance",
    logoUrl: "https://logo.clearbit.com/nationwide.com",
    relationshipStatus: "active",
    totalGiving: 450000,
    currentGrant: {
      amount: 100000,
      purpose: "Affordable Housing Initiative",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
    },
    grantHistory: [
      { year: "2024", amount: 100000 },
      { year: "2023", amount: 100000 },
      { year: "2022", amount: 125000 },
      { year: "2021", amount: 125000 },
    ],
    focusAreas: ["Affordable housing", "Financial literacy", "Community development"],
    applicationDeadlines: ["March 15", "September 15"],
    programOfficer: {
      name: "Jennifer Walsh",
      title: "Senior Program Officer",
      email: "jennifer.walsh@nationwide.com",
    },
  },
  {
    id: "2",
    foundationName: "Cardinal Health Foundation",
    parentCompany: "Cardinal Health",
    logoUrl: "https://logo.clearbit.com/cardinalhealth.com",
    relationshipStatus: "active",
    totalGiving: 750000,
    currentGrant: {
      amount: 150000,
      purpose: "Health & Wellness Programs",
      startDate: "2024-01-01",
      endDate: "2025-12-31",
      status: "active",
    },
    grantHistory: [
      { year: "2024", amount: 150000 },
      { year: "2023", amount: 200000 },
      { year: "2022", amount: 200000 },
      { year: "2021", amount: 200000 },
    ],
    focusAreas: ["Healthcare access", "Medication assistance", "Community health"],
    applicationDeadlines: ["Rolling"],
    programOfficer: {
      name: "Michael Torres",
      title: "Foundation Director",
      email: "michael.torres@cardinalhealth.com",
    },
  },
  {
    id: "3",
    foundationName: "Honda of America Foundation",
    parentCompany: "Honda of America",
    logoUrl: "https://logo.clearbit.com/honda.com",
    relationshipStatus: "active",
    totalGiving: 325000,
    currentGrant: {
      amount: 75000,
      purpose: "STEM Education Programs",
      startDate: "2024-03-01",
      endDate: "2025-02-28",
      status: "reporting",
    },
    grantHistory: [
      { year: "2024", amount: 75000 },
      { year: "2023", amount: 100000 },
      { year: "2022", amount: 75000 },
      { year: "2021", amount: 75000 },
    ],
    focusAreas: ["STEM education", "Environmental sustainability", "Youth development"],
    applicationDeadlines: ["February 1", "August 1"],
    programOfficer: {
      name: "Lisa Yamamoto",
      title: "Community Affairs Director",
      email: "lisa.yamamoto@honda.com",
    },
  },
  {
    id: "4",
    foundationName: "Huntington Foundation",
    parentCompany: "Huntington Bank",
    logoUrl: "https://logo.clearbit.com/huntington.com",
    relationshipStatus: "prospect",
    totalGiving: 0,
    grantHistory: [],
    focusAreas: ["Financial empowerment", "Small business development", "Workforce readiness"],
    applicationDeadlines: ["April 1", "October 1"],
    programOfficer: {
      name: "Sarah Chen",
      title: "Foundation Manager",
      email: "sarah.chen@huntington.com",
    },
    notes: "Initial meeting scheduled for Q2. Strong alignment with financial literacy programs.",
  },
  {
    id: "5",
    foundationName: "L Brands Foundation",
    parentCompany: "L Brands (Victoria's Secret)",
    logoUrl: "https://logo.clearbit.com/lb.com",
    relationshipStatus: "active",
    totalGiving: 200000,
    currentGrant: {
      amount: 50000,
      purpose: "Women's Empowerment Programs",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "pending",
    },
    grantHistory: [
      { year: "2024", amount: 50000 },
      { year: "2023", amount: 75000 },
      { year: "2022", amount: 75000 },
    ],
    focusAreas: ["Women's empowerment", "Youth development", "Arts & culture"],
    applicationDeadlines: ["January 15", "July 15"],
    programOfficer: {
      name: "Amanda Foster",
      title: "Foundation Director",
      email: "amanda.foster@lb.com",
    },
  },
  {
    id: "6",
    foundationName: "AEP Foundation",
    parentCompany: "American Electric Power",
    logoUrl: "https://logo.clearbit.com/aep.com",
    relationshipStatus: "lapsed",
    totalGiving: 125000,
    grantHistory: [
      { year: "2022", amount: 50000 },
      { year: "2021", amount: 75000 },
    ],
    focusAreas: ["Energy assistance", "Workforce development", "Environmental education"],
    applicationDeadlines: ["March 1", "September 1"],
    programOfficer: {
      name: "Patricia Lane",
      title: "Community Investment Manager",
      email: "plane@aep.com",
    },
    notes: "Last grant was 2022. Reactivation opportunity - schedule meeting with program officer.",
  },
];

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  active: { label: "Active", variant: "default" },
  prospect: { label: "Prospect", variant: "secondary" },
  lapsed: { label: "Lapsed", variant: "outline" },
  declined: { label: "Declined", variant: "destructive" },
};

const grantStatusLabels: Record<string, { label: string; variant: "default" | "secondary" | "outline"; icon: typeof CheckCircle }> = {
  active: { label: "Active", variant: "default", icon: CheckCircle },
  pending: { label: "Pending Approval", variant: "secondary", icon: Clock },
  reporting: { label: "Reporting Due", variant: "outline", icon: AlertCircle },
};

export default function CorporateFoundations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredFoundations = mockFoundations.filter((f) => {
    const matchesSearch =
      f.foundationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.parentCompany.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || f.relationshipStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalGrantValue = mockFoundations.reduce((sum, f) => sum + f.totalGiving, 0);
  const activeFoundations = mockFoundations.filter((f) => f.relationshipStatus === "active").length;
  const currentYearGrants = mockFoundations.reduce(
    (sum, f) => sum + (f.currentGrant?.amount || 0),
    0
  );
  const prospectFoundations = mockFoundations.filter((f) => f.relationshipStatus === "prospect").length;

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Corporate Foundations</h1>
        <p className="text-sm text-muted-foreground">
          Track corporate foundation grants and relationships
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: "#4A9B8C" }} data-testid="metric-total-grants">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Grant History</CardTitle>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#4A9B8C15" }}>
              <DollarSign className="w-4 h-4" style={{ color: "#4A9B8C" }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#4A9B8C" }}>
              ${totalGrantValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">All-time giving</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: "#8B9A5C" }} data-testid="metric-active-foundations">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Relationships</CardTitle>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#8B9A5C15" }}>
              <Landmark className="w-4 h-4" style={{ color: "#8B9A5C" }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#8B9A5C" }}>{activeFoundations}</div>
            <p className="text-xs text-muted-foreground mt-1">Foundation partners</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: "#D4884A" }} data-testid="metric-current-year">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Year Grants</CardTitle>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#D4884A15" }}>
              <TrendingUp className="w-4 h-4" style={{ color: "#D4884A" }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#D4884A" }}>
              ${currentYearGrants.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">FY2024 awarded</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: "#5BA3C6" }} data-testid="metric-prospects">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prospects</CardTitle>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#5BA3C615" }}>
              <FileText className="w-4 h-4" style={{ color: "#5BA3C6" }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#5BA3C6" }}>{prospectFoundations}</div>
            <p className="text-xs text-muted-foreground mt-1">In cultivation</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by foundation or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-foundations"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]" data-testid="select-filter-status">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="prospect">Prospect</SelectItem>
            <SelectItem value="lapsed">Lapsed</SelectItem>
            <SelectItem value="declined">Declined</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFoundations.map((foundation) => (
          <Card
            key={foundation.id}
            className="border hover:shadow-lg transition-shadow cursor-pointer"
            data-testid={`card-foundation-${foundation.id}`}
          >
            <CardHeader className="pb-3" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {foundation.logoUrl ? (
                    <img
                      src={foundation.logoUrl}
                      alt={`${foundation.parentCompany} logo`}
                      className="w-12 h-12 object-contain rounded-lg bg-white p-1 border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Landmark className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-lg">{foundation.foundationName}</CardTitle>
                    <p className="text-sm text-muted-foreground">{foundation.parentCompany}</p>
                  </div>
                </div>
                <Badge variant={statusLabels[foundation.relationshipStatus].variant}>
                  {statusLabels[foundation.relationshipStatus].label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Total Giving</p>
                  <p className="text-xl font-bold" style={{ color: "#084594" }}>
                    ${foundation.totalGiving.toLocaleString()}
                  </p>
                </div>
                {foundation.currentGrant && (
                  <div>
                    <p className="text-xs text-muted-foreground">Current Grant</p>
                    <p className="text-xl font-bold" style={{ color: "#084594" }}>
                      ${foundation.currentGrant.amount.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              {foundation.currentGrant && (
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">{foundation.currentGrant.purpose}</p>
                    <Badge variant={grantStatusLabels[foundation.currentGrant.status].variant}>
                      {grantStatusLabels[foundation.currentGrant.status].label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {new Date(foundation.currentGrant.startDate).toLocaleDateString()} -{" "}
                    {new Date(foundation.currentGrant.endDate).toLocaleDateString()}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs text-muted-foreground mb-2">Focus Areas</p>
                <div className="flex flex-wrap gap-1">
                  {foundation.focusAreas.map((area, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>

              {foundation.applicationDeadlines && foundation.applicationDeadlines.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Deadlines:</span>
                  <span>{foundation.applicationDeadlines.join(", ")}</span>
                </div>
              )}

              {foundation.notes && (
                <p className="text-sm text-muted-foreground italic bg-muted/50 p-2 rounded">
                  {foundation.notes}
                </p>
              )}

              <div className="flex items-center justify-between pt-2 border-t">
                {foundation.programOfficer ? (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Users className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{foundation.programOfficer.name}</p>
                      <p className="text-xs text-muted-foreground">{foundation.programOfficer.title}</p>
                    </div>
                  </div>
                ) : (
                  <div />
                )}
                <Button variant="ghost" size="sm">
                  View Details
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
