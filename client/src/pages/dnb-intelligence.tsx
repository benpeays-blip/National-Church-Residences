import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Building2, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Globe,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Shield,
  BarChart3,
  ArrowRight,
  MapPin,
  Briefcase,
  Factory,
  ChevronRight,
  Sparkles,
  Target,
  Clock,
  FileText,
  Layers
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface CompanyProfile {
  id: string;
  name: string;
  dunsNumber: string;
  industry: string;
  headquarters: string;
  revenue: string;
  revenueGrowth: number;
  employees: string;
  employeeGrowth: number;
  founded: string;
  parentCompany?: string;
  subsidiaries?: number;
  creditScore: number;
  riskLevel: "low" | "medium" | "high";
  paymentBehavior: string;
  description: string;
  executives: { name: string; title: string }[];
  corporateGiving?: string;
  foundationName?: string;
}

interface SupplierRisk {
  id: string;
  name: string;
  category: string;
  riskScore: number;
  trend: "up" | "down" | "stable";
  lastAssessment: string;
  alerts: string[];
  riskReasons: string[];
  recommendedActions: string[];
  contactName?: string;
  contactEmail?: string;
  annualSpend?: string;
  contractExpiry?: string;
}

const sampleCompanies: CompanyProfile[] = [
  {
    id: "1",
    name: "Midwest Regional Health System",
    dunsNumber: "12-345-6789",
    industry: "Healthcare Services",
    headquarters: "Columbus, OH",
    revenue: "$2.8B",
    revenueGrowth: 8.5,
    employees: "12,500",
    employeeGrowth: 3.2,
    founded: "1952",
    subsidiaries: 15,
    creditScore: 92,
    riskLevel: "low",
    paymentBehavior: "Pays 5 days early on average",
    description: "Leading integrated healthcare delivery system serving Central Ohio with 12 hospitals and 150+ outpatient locations.",
    executives: [
      { name: "Dr. Michael Harrison", title: "CEO" },
      { name: "Sarah Thompson", title: "CFO" },
      { name: "James Wright", title: "VP Corporate Giving" }
    ],
    corporateGiving: "$4.2M annually",
    foundationName: "MRHS Community Foundation"
  },
  {
    id: "2",
    name: "Cardinal Manufacturing Group",
    dunsNumber: "23-456-7890",
    industry: "Industrial Manufacturing",
    headquarters: "Cincinnati, OH",
    revenue: "$890M",
    revenueGrowth: -2.1,
    employees: "4,200",
    employeeGrowth: -1.5,
    founded: "1978",
    parentCompany: "Apex Industries Holdings",
    creditScore: 78,
    riskLevel: "medium",
    paymentBehavior: "Pays 12 days late on average",
    description: "Diversified manufacturer of industrial components and precision machinery serving automotive and aerospace sectors.",
    executives: [
      { name: "Robert Chen", title: "President" },
      { name: "Patricia Moore", title: "COO" }
    ],
    corporateGiving: "$350K annually"
  },
  {
    id: "3",
    name: "Great Lakes Financial Services",
    dunsNumber: "34-567-8901",
    industry: "Financial Services",
    headquarters: "Cleveland, OH",
    revenue: "$1.5B",
    revenueGrowth: 12.3,
    employees: "3,800",
    employeeGrowth: 5.8,
    founded: "1965",
    subsidiaries: 8,
    creditScore: 95,
    riskLevel: "low",
    paymentBehavior: "Pays 3 days early on average",
    description: "Regional financial institution providing commercial banking, wealth management, and insurance services.",
    executives: [
      { name: "Elizabeth Warren-Clarke", title: "Chairman & CEO" },
      { name: "David Nguyen", title: "CFO" },
      { name: "Margaret Sullivan", title: "Chief Community Officer" }
    ],
    corporateGiving: "$2.8M annually",
    foundationName: "Great Lakes Community Foundation"
  },
  {
    id: "4",
    name: "Buckeye Senior Living Corporation",
    dunsNumber: "45-678-9012",
    industry: "Senior Housing & Care",
    headquarters: "Columbus, OH",
    revenue: "$425M",
    revenueGrowth: 15.2,
    employees: "6,200",
    employeeGrowth: 8.4,
    founded: "1988",
    creditScore: 85,
    riskLevel: "low",
    paymentBehavior: "Pays on time",
    description: "Operator of independent living, assisted living, and memory care communities across Ohio and Indiana.",
    executives: [
      { name: "Thomas Anderson", title: "CEO" },
      { name: "Lisa Park", title: "CFO" }
    ],
    corporateGiving: "$180K annually"
  }
];

const supplierRisks: SupplierRisk[] = [
  {
    id: "1",
    name: "MedEquip Solutions",
    category: "Medical Equipment",
    riskScore: 23,
    trend: "stable",
    lastAssessment: "2 weeks ago",
    alerts: [],
    riskReasons: ["Solid financial position", "Long-standing partnership"],
    recommendedActions: ["Continue standard monitoring", "Schedule annual review"],
    contactName: "David Chen",
    contactEmail: "dchen@medequip.com",
    annualSpend: "$1.2M",
    contractExpiry: "Dec 2026"
  },
  {
    id: "2",
    name: "Comfort Care Supplies",
    category: "Healthcare Supplies",
    riskScore: 45,
    trend: "up",
    lastAssessment: "1 month ago",
    alerts: ["Payment delays reported", "Credit score decline"],
    riskReasons: ["Recent payment delays (15+ days)", "Credit score dropped 12 points", "Key executive departure"],
    recommendedActions: ["Schedule immediate review call", "Consider backup supplier identification", "Request updated financials"],
    contactName: "Lisa Martinez",
    contactEmail: "lmartinez@comfortcare.com",
    annualSpend: "$890K",
    contractExpiry: "Jun 2025"
  },
  {
    id: "3",
    name: "Regional Food Services Inc",
    category: "Food & Nutrition",
    riskScore: 18,
    trend: "down",
    lastAssessment: "3 weeks ago",
    alerts: [],
    riskReasons: ["Strong financials", "Improving credit trajectory"],
    recommendedActions: ["Maintain current relationship", "Explore volume discount opportunities"],
    contactName: "Michael Brown",
    contactEmail: "mbrown@regionalfoods.com",
    annualSpend: "$2.1M",
    contractExpiry: "Mar 2027"
  },
  {
    id: "4",
    name: "Premier Building Maintenance",
    category: "Facilities Services",
    riskScore: 72,
    trend: "up",
    lastAssessment: "1 week ago",
    alerts: ["Lawsuit pending", "Cash flow concerns", "Late payments to subcontractors"],
    riskReasons: ["Active litigation impacting operations", "Significant cash flow deterioration", "Multiple subcontractor complaints"],
    recommendedActions: ["Immediate contract review", "Identify replacement vendors", "Request meeting with leadership"],
    contactName: "Robert Wilson",
    contactEmail: "rwilson@premierbm.com",
    annualSpend: "$560K",
    contractExpiry: "Sep 2025"
  },
  {
    id: "5",
    name: "TechHealth IT Solutions",
    category: "Technology Services",
    riskScore: 31,
    trend: "stable",
    lastAssessment: "2 weeks ago",
    alerts: [],
    riskReasons: ["Stable operations", "Good payment history"],
    recommendedActions: ["Continue monitoring", "Review contract terms at renewal"],
    contactName: "Jennifer Lee",
    contactEmail: "jlee@techhealth.com",
    annualSpend: "$1.8M",
    contractExpiry: "Aug 2026"
  },
  {
    id: "6",
    name: "Midwest Pharmacy Distributors",
    category: "Pharmaceutical Supply",
    riskScore: 85,
    trend: "up",
    lastAssessment: "3 days ago",
    alerts: ["Bankruptcy warning", "Major contract losses", "Executive departures"],
    riskReasons: ["Imminent bankruptcy risk", "Lost 3 major contracts in Q4", "CFO and COO resigned", "Debt-to-equity ratio critical"],
    recommendedActions: ["Activate contingency plan immediately", "Transition to backup supplier", "Secure current inventory", "Legal review of contract terms"],
    contactName: "Thomas Garcia",
    contactEmail: "tgarcia@midwestpharma.com",
    annualSpend: "$3.4M",
    contractExpiry: "Feb 2025"
  },
  {
    id: "7",
    name: "SafeGuard Security Systems",
    category: "Security Services",
    riskScore: 28,
    trend: "down",
    lastAssessment: "1 month ago",
    alerts: [],
    riskReasons: ["Strong market position", "Consistent performance"],
    recommendedActions: ["Standard annual review", "Consider expanded services"],
    contactName: "Angela Thompson",
    contactEmail: "athompson@safeguardsec.com",
    annualSpend: "$420K",
    contractExpiry: "Nov 2026"
  },
  {
    id: "8",
    name: "GreenScape Landscaping",
    category: "Grounds Maintenance",
    riskScore: 15,
    trend: "stable",
    lastAssessment: "3 weeks ago",
    alerts: [],
    riskReasons: ["Excellent payment history", "Growing business"],
    recommendedActions: ["Maintain relationship", "Negotiate multi-year contract"],
    contactName: "Mark Stevens",
    contactEmail: "mstevens@greenscape.com",
    annualSpend: "$180K",
    contractExpiry: "Apr 2027"
  },
  {
    id: "9",
    name: "ClearView Window Services",
    category: "Facilities Services",
    riskScore: 52,
    trend: "up",
    lastAssessment: "2 weeks ago",
    alerts: ["Insurance lapse reported"],
    riskReasons: ["Insurance coverage gap identified", "Recent ownership change", "Workforce turnover increasing"],
    recommendedActions: ["Verify insurance reinstatement", "Meet with new ownership", "Review service quality metrics"],
    contactName: "Patricia Davis",
    contactEmail: "pdavis@clearview.com",
    annualSpend: "$95K",
    contractExpiry: "Jul 2025"
  },
  {
    id: "10",
    name: "Allied Transport Logistics",
    category: "Transportation",
    riskScore: 67,
    trend: "up",
    lastAssessment: "1 week ago",
    alerts: ["Fleet maintenance issues", "Driver shortage"],
    riskReasons: ["Fleet age causing reliability issues", "Driver retention problems", "Fuel cost pressures"],
    recommendedActions: ["Request fleet modernization plan", "Identify backup carrier", "Negotiate fuel surcharge terms"],
    contactName: "James Miller",
    contactEmail: "jmiller@alliedtransport.com",
    annualSpend: "$780K",
    contractExpiry: "Oct 2025"
  },
  {
    id: "11",
    name: "Quality Linen Services",
    category: "Laundry Services",
    riskScore: 22,
    trend: "stable",
    lastAssessment: "1 month ago",
    alerts: [],
    riskReasons: ["Family-owned, stable operations", "Excellent service record"],
    recommendedActions: ["Continue partnership", "Annual quality review"],
    contactName: "Susan Wright",
    contactEmail: "swright@qualitylinen.com",
    annualSpend: "$340K",
    contractExpiry: "May 2026"
  },
  {
    id: "12",
    name: "ProClean Waste Management",
    category: "Waste Disposal",
    riskScore: 38,
    trend: "down",
    lastAssessment: "3 weeks ago",
    alerts: [],
    riskReasons: ["Improving financials after restructuring", "New management team"],
    recommendedActions: ["Monitor quarterly", "Review pricing at renewal"],
    contactName: "Kevin Johnson",
    contactEmail: "kjohnson@proclean.com",
    annualSpend: "$210K",
    contractExpiry: "Jan 2026"
  }
];

export default function DnBIntelligence() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<CompanyProfile | null>(null);
  const [riskFilter, setRiskFilter] = useState<"all" | "low" | "medium" | "high">("all");
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierRisk | null>(null);

  const getRiskLevel = (score: number): "low" | "medium" | "high" => {
    if (score < 30) return "low";
    if (score < 60) return "medium";
    return "high";
  };

  const filteredSuppliers = supplierRisks.filter(s => {
    if (riskFilter === "all") return true;
    return getRiskLevel(s.riskScore) === riskFilter;
  });

  const lowRiskCount = supplierRisks.filter(s => s.riskScore < 30).length;
  const mediumRiskCount = supplierRisks.filter(s => s.riskScore >= 30 && s.riskScore < 60).length;
  const highRiskCount = supplierRisks.filter(s => s.riskScore >= 60).length;

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low": return "#2ca02c";
      case "medium": return "#f59e0b";
      case "high": return "#dc2626";
      default: return "#6b7280";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#084594" }}>
              D&B Corporate Intelligence
            </h1>
            <p className="text-muted-foreground">
              Research corporate capacity, financial health, and giving potential
            </p>
          </div>
        </div>
        <Button variant="outline" className="gap-2" data-testid="button-dnb-external">
          <ExternalLink className="h-4 w-4" />
          Open D&B Platform
        </Button>
      </div>

      <Card className="p-4" style={{ backgroundColor: "rgba(8, 69, 148, 0.05)" }}>
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 mt-0.5" style={{ color: "#084594" }} />
          <div>
            <h4 className="font-medium text-sm" style={{ color: "#084594" }}>Integration Overview</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Dun & Bradstreet provides business intelligence on <strong>600+ million companies</strong> worldwide.
              Use D-U-N-S Numbers to verify corporate identities, assess financial capacity, and identify giving potential for corporate partnerships.
            </p>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="research" className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-1 bg-transparent p-0 mb-4">
          <TabsTrigger 
            value="research" 
            className="group relative gap-2 bg-[#7FA3A1] text-white data-[state=active]:bg-[#7FA3A1] data-[state=active]:text-white data-[state=active]:shadow-none" 
            data-testid="tab-research"
          >
            <Building2 className="h-4 w-4" />
            Company Research
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#7FA3A1] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="prospects" 
            className="group relative gap-2 bg-[#B5C942] text-white data-[state=active]:bg-[#B5C942] data-[state=active]:text-white data-[state=active]:shadow-none" 
            data-testid="tab-corp-prospects"
          >
            <Target className="h-4 w-4" />
            Corporate Prospects
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#B5C942] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="risk" 
            className="group relative gap-2 bg-[#D5636C] text-white data-[state=active]:bg-[#D5636C] data-[state=active]:text-white data-[state=active]:shadow-none" 
            data-testid="tab-risk"
          >
            <Shield className="h-4 w-4" />
            Risk Assessment
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#D5636C] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="research" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Search className="h-5 w-5" style={{ color: "#084594" }} />
                Company Lookup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by company name, D-U-N-S number, or industry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                    data-testid="input-dnb-search"
                  />
                </div>
                <Button style={{ backgroundColor: "#084594" }} data-testid="button-search-company">
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1 space-y-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Ohio Corporations</CardTitle>
                  <CardDescription>Sorted by corporate giving</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 p-3">
                  {sampleCompanies.map((company) => (
                    <div
                      key={company.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedCompany?.id === company.id 
                          ? "bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800" 
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedCompany(company)}
                      data-testid={`company-${company.id}`}
                    >
                      <div className="flex items-start gap-3">
                        <div 
                          className="h-10 w-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: "rgba(8, 69, 148, 0.1)" }}
                        >
                          <Building2 className="h-5 w-5" style={{ color: "#084594" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{company.name}</h4>
                          <p className="text-xs text-muted-foreground">{company.industry}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge 
                              variant="outline" 
                              className="text-xs"
                              style={{ borderColor: getRiskColor(company.riskLevel), color: getRiskColor(company.riskLevel) }}
                            >
                              {company.riskLevel} risk
                            </Badge>
                            <span className="text-xs text-muted-foreground">{company.revenue}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {selectedCompany ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{selectedCompany.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <span>D-U-N-S: {selectedCompany.dunsNumber}</span>
                          <span>•</span>
                          <span>{selectedCompany.industry}</span>
                        </CardDescription>
                      </div>
                      <Badge 
                        style={{ 
                          backgroundColor: getRiskColor(selectedCompany.riskLevel),
                          color: "white"
                        }}
                      >
                        {selectedCompany.creditScore} Credit Score
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm text-muted-foreground">{selectedCompany.description}</p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{selectedCompany.headquarters}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Founded: {selectedCompany.founded}</span>
                        </div>
                        {selectedCompany.parentCompany && (
                          <div className="flex items-center gap-2">
                            <Layers className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Parent: {selectedCompany.parentCompany}</span>
                          </div>
                        )}
                        {selectedCompany.subsidiaries && (
                          <div className="flex items-center gap-2">
                            <Factory className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{selectedCompany.subsidiaries} subsidiaries</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Revenue: <strong>{selectedCompany.revenue}</strong></span>
                          </div>
                          <div className="flex items-center gap-1">
                            {selectedCompany.revenueGrowth >= 0 ? (
                              <TrendingUp className="h-4 w-4" style={{ color: "#2ca02c" }} />
                            ) : (
                              <TrendingDown className="h-4 w-4" style={{ color: "#dc2626" }} />
                            )}
                            <span 
                              className="text-sm font-medium"
                              style={{ color: selectedCompany.revenueGrowth >= 0 ? "#2ca02c" : "#dc2626" }}
                            >
                              {selectedCompany.revenueGrowth >= 0 ? "+" : ""}{selectedCompany.revenueGrowth}%
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Employees: <strong>{selectedCompany.employees}</strong></span>
                          </div>
                          <div className="flex items-center gap-1">
                            {selectedCompany.employeeGrowth >= 0 ? (
                              <TrendingUp className="h-4 w-4" style={{ color: "#2ca02c" }} />
                            ) : (
                              <TrendingDown className="h-4 w-4" style={{ color: "#dc2626" }} />
                            )}
                            <span 
                              className="text-sm font-medium"
                              style={{ color: selectedCompany.employeeGrowth >= 0 ? "#2ca02c" : "#dc2626" }}
                            >
                              {selectedCompany.employeeGrowth >= 0 ? "+" : ""}{selectedCompany.employeeGrowth}%
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{selectedCompany.paymentBehavior}</span>
                        </div>
                      </div>
                    </div>

                    {selectedCompany.corporateGiving && (
                      <div className="p-4 rounded-lg border" style={{ backgroundColor: "rgba(44, 160, 44, 0.05)" }}>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <DollarSign className="h-4 w-4" style={{ color: "#2ca02c" }} />
                          Corporate Philanthropy
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm text-muted-foreground">Annual Giving:</span>
                            <p className="font-semibold" style={{ color: "#2ca02c" }}>{selectedCompany.corporateGiving}</p>
                          </div>
                          {selectedCompany.foundationName && (
                            <div>
                              <span className="text-sm text-muted-foreground">Foundation:</span>
                              <p className="font-medium">{selectedCompany.foundationName}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Key Executives
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {selectedCompany.executives.map((exec, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                            <div 
                              className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium text-white"
                              style={{ backgroundColor: "#084594" }}
                            >
                              {exec.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{exec.name}</p>
                              <p className="text-xs text-muted-foreground">{exec.title}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        style={{ backgroundColor: "#084594" }} 
                        className="gap-2" 
                        data-testid="button-add-to-prospects"
                        onClick={() => {
                          if (selectedCompany) {
                            toast({
                              title: "Added to Prospects",
                              description: `${selectedCompany.name} has been added to your corporate prospects list.`,
                            });
                          }
                        }}
                      >
                        <Target className="h-4 w-4" />
                        Add to Prospects
                      </Button>
                      <Button variant="outline" className="gap-2" data-testid="button-full-dnb-profile">
                        <ExternalLink className="h-4 w-4" />
                        Full D&B Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center min-h-[400px]">
                  <div className="text-center text-muted-foreground">
                    <Building2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Select a company to view their profile</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="prospects" className="space-y-4 mt-4">
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: "#084594" }}>247</div>
                  <p className="text-sm text-muted-foreground">Ohio Corporations</p>
                  <p className="text-xs text-muted-foreground mt-1">with giving programs</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: "#2ca02c" }}>$45.2M</div>
                  <p className="text-sm text-muted-foreground">Total Corporate Giving</p>
                  <p className="text-xs text-muted-foreground mt-1">in tracked organizations</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: "#f59e0b" }}>89</div>
                  <p className="text-sm text-muted-foreground">Corporate Foundations</p>
                  <p className="text-xs text-muted-foreground mt-1">identified in region</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: "#084594" }}>34</div>
                  <p className="text-sm text-muted-foreground">Senior Living Focus</p>
                  <p className="text-xs text-muted-foreground mt-1">companies with affinity</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5" style={{ color: "#084594" }} />
                Top Corporate Prospects by Capacity
              </CardTitle>
              <CardDescription>
                Companies with highest giving potential based on revenue, growth, and philanthropic history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sampleCompanies
                  .sort((a, b) => {
                    const aGiving = parseFloat(a.corporateGiving?.replace(/[^0-9.]/g, '') || '0');
                    const bGiving = parseFloat(b.corporateGiving?.replace(/[^0-9.]/g, '') || '0');
                    return bGiving - aGiving;
                  })
                  .map((company, idx) => (
                    <div key={company.id} className="flex items-center justify-between p-4 rounded-lg border hover-elevate cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div 
                          className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-white"
                          style={{ backgroundColor: "#084594" }}
                        >
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{company.name}</h4>
                          <p className="text-sm text-muted-foreground">{company.industry} • {company.headquarters}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Revenue</p>
                          <p className="font-medium">{company.revenue}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Corporate Giving</p>
                          <p className="font-medium" style={{ color: "#2ca02c" }}>{company.corporateGiving || "Unknown"}</p>
                        </div>
                        <Badge 
                          style={{ 
                            backgroundColor: getRiskColor(company.riskLevel),
                            color: "white"
                          }}
                        >
                          {company.creditScore}
                        </Badge>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4 mt-4">
          <div className="grid md:grid-cols-4 gap-4">
            <Card 
              className={`cursor-pointer hover-elevate transition-all ${riskFilter === "all" ? "ring-2" : ""}`}
              style={{ borderColor: riskFilter === "all" ? "#084594" : undefined }}
              onClick={() => setRiskFilter("all")}
              data-testid="filter-all"
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(8, 69, 148, 0.1)" }}>
                    <Layers className="h-6 w-6" style={{ color: "#084594" }} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{supplierRisks.length}</div>
                    <p className="text-sm text-muted-foreground">All Partners</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card 
              className={`cursor-pointer hover-elevate transition-all ${riskFilter === "low" ? "ring-2" : ""}`}
              style={{ borderColor: riskFilter === "low" ? "#2ca02c" : undefined }}
              onClick={() => setRiskFilter("low")}
              data-testid="filter-low"
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(44, 160, 44, 0.1)" }}>
                    <CheckCircle2 className="h-6 w-6" style={{ color: "#2ca02c" }} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{lowRiskCount}</div>
                    <p className="text-sm text-muted-foreground">Low Risk</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card 
              className={`cursor-pointer hover-elevate transition-all ${riskFilter === "medium" ? "ring-2" : ""}`}
              style={{ borderColor: riskFilter === "medium" ? "#f59e0b" : undefined }}
              onClick={() => setRiskFilter("medium")}
              data-testid="filter-medium"
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(245, 158, 11, 0.1)" }}>
                    <AlertTriangle className="h-6 w-6" style={{ color: "#f59e0b" }} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{mediumRiskCount}</div>
                    <p className="text-sm text-muted-foreground">Medium Risk</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card 
              className={`cursor-pointer hover-elevate transition-all ${riskFilter === "high" ? "ring-2" : ""}`}
              style={{ borderColor: riskFilter === "high" ? "#dc2626" : undefined }}
              onClick={() => setRiskFilter("high")}
              data-testid="filter-high"
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(220, 38, 38, 0.1)" }}>
                    <Shield className="h-6 w-6" style={{ color: "#dc2626" }} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{highRiskCount}</div>
                    <p className="text-sm text-muted-foreground">High Risk</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Shield className="h-5 w-5" style={{ color: "#084594" }} />
                        Supplier & Partner Risk Monitoring
                      </CardTitle>
                      <CardDescription>
                        Click a partner to view detailed risk information and recommendations
                      </CardDescription>
                    </div>
                    <Badge variant="outline">
                      {filteredSuppliers.length} {riskFilter === "all" ? "partners" : `${riskFilter} risk`}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                    {filteredSuppliers.map((supplier) => (
                      <div 
                        key={supplier.id} 
                        className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer hover-elevate transition-all ${selectedSupplier?.id === supplier.id ? "ring-2 bg-muted/30" : ""}`}
                        style={{ borderColor: selectedSupplier?.id === supplier.id ? getRiskColor(getRiskLevel(supplier.riskScore)) : undefined }}
                        onClick={() => setSelectedSupplier(supplier)}
                        data-testid={`supplier-${supplier.id}`}
                      >
                        <div className="flex items-center gap-4">
                          <div 
                            className="h-10 w-10 rounded-lg flex items-center justify-center"
                            style={{ 
                              backgroundColor: supplier.riskScore < 30 
                                ? "rgba(44, 160, 44, 0.1)" 
                                : supplier.riskScore < 60 
                                  ? "rgba(245, 158, 11, 0.1)"
                                  : "rgba(220, 38, 38, 0.1)"
                            }}
                          >
                            <Building2 
                              className="h-5 w-5" 
                              style={{ 
                                color: supplier.riskScore < 30 
                                  ? "#2ca02c" 
                                  : supplier.riskScore < 60 
                                    ? "#f59e0b"
                                    : "#dc2626"
                              }} 
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{supplier.name}</h4>
                            <p className="text-sm text-muted-foreground">{supplier.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-24">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-muted-foreground text-xs">Score</span>
                              <span className="font-medium">{supplier.riskScore}</span>
                            </div>
                            <Progress value={supplier.riskScore} className="h-2" />
                          </div>
                          <div className="flex items-center gap-1 w-6">
                            {supplier.trend === "up" && <TrendingUp className="h-4 w-4" style={{ color: "#dc2626" }} />}
                            {supplier.trend === "down" && <TrendingDown className="h-4 w-4" style={{ color: "#2ca02c" }} />}
                            {supplier.trend === "stable" && <span className="text-muted-foreground text-sm">—</span>}
                          </div>
                          {supplier.alerts.length > 0 ? (
                            <Badge variant="destructive" className="gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              {supplier.alerts.length}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="gap-1" style={{ borderColor: "#2ca02c", color: "#2ca02c" }}>
                              <CheckCircle2 className="h-3 w-3" />
                              OK
                            </Badge>
                          )}
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="h-full">
                <CardHeader style={{ backgroundColor: selectedSupplier ? getRiskColor(getRiskLevel(selectedSupplier.riskScore)) : "#084594" }}>
                  <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Partner Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {selectedSupplier ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">{selectedSupplier.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedSupplier.category}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground">Risk Score</p>
                          <p className="font-bold text-lg" style={{ color: getRiskColor(getRiskLevel(selectedSupplier.riskScore)) }}>
                            {selectedSupplier.riskScore}/100
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground">Annual Spend</p>
                          <p className="font-bold text-lg">{selectedSupplier.annualSpend}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground">Contract Expiry</p>
                          <p className="font-medium">{selectedSupplier.contractExpiry}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground">Last Assessed</p>
                          <p className="font-medium">{selectedSupplier.lastAssessment}</p>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <Users className="h-4 w-4" style={{ color: "#084594" }} />
                          Primary Contact
                        </h4>
                        <p className="text-sm">{selectedSupplier.contactName}</p>
                        <p className="text-sm text-muted-foreground">{selectedSupplier.contactEmail}</p>
                      </div>

                      {selectedSupplier.alerts.length > 0 && (
                        <div className="border-t pt-4">
                          <h4 className="font-medium text-sm mb-2 flex items-center gap-2" style={{ color: "#dc2626" }}>
                            <AlertTriangle className="h-4 w-4" />
                            Active Alerts
                          </h4>
                          <div className="space-y-1">
                            {selectedSupplier.alerts.map((alert, idx) => (
                              <div key={idx} className="text-sm p-2 rounded bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200">
                                {alert}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="border-t pt-4">
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <Target className="h-4 w-4" style={{ color: "#084594" }} />
                          Risk Factors
                        </h4>
                        <ul className="space-y-1">
                          {selectedSupplier.riskReasons.map((reason, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-muted-foreground mt-1">•</span>
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2" style={{ color: "#2ca02c" }}>
                          <ArrowRight className="h-4 w-4" />
                          Recommended Actions
                        </h4>
                        <ul className="space-y-2">
                          {selectedSupplier.recommendedActions.map((action, idx) => (
                            <li key={idx} className="text-sm p-2 rounded bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200">
                              {idx + 1}. {action}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full gap-2 mt-4" data-testid="button-schedule-review">
                        <Clock className="h-4 w-4" />
                        Schedule Review Meeting
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <Building2 className="h-12 w-12 text-muted-foreground/30 mb-4" />
                      <p className="text-muted-foreground">
                        Select a partner from the list to view detailed risk information
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
