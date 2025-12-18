import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    alerts: []
  },
  {
    id: "2",
    name: "Comfort Care Supplies",
    category: "Healthcare Supplies",
    riskScore: 45,
    trend: "up",
    lastAssessment: "1 month ago",
    alerts: ["Payment delays reported", "Credit score decline"]
  },
  {
    id: "3",
    name: "Regional Food Services Inc",
    category: "Food & Nutrition",
    riskScore: 18,
    trend: "down",
    lastAssessment: "3 weeks ago",
    alerts: []
  }
];

export default function DnBIntelligence() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<CompanyProfile | null>(null);

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
                      <Button style={{ backgroundColor: "#084594" }} className="gap-2" data-testid="button-add-to-prospects">
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
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(44, 160, 44, 0.1)" }}>
                    <CheckCircle2 className="h-6 w-6" style={{ color: "#2ca02c" }} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">156</div>
                    <p className="text-sm text-muted-foreground">Low Risk Partners</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(245, 158, 11, 0.1)" }}>
                    <AlertTriangle className="h-6 w-6" style={{ color: "#f59e0b" }} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">23</div>
                    <p className="text-sm text-muted-foreground">Medium Risk</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(220, 38, 38, 0.1)" }}>
                    <Shield className="h-6 w-6" style={{ color: "#dc2626" }} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-sm text-muted-foreground">High Risk - Review</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" style={{ color: "#084594" }} />
                Supplier & Partner Risk Monitoring
              </CardTitle>
              <CardDescription>
                Continuous monitoring of corporate partners and suppliers for financial stability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {supplierRisks.map((supplier) => (
                  <div key={supplier.id} className="flex items-center justify-between p-4 rounded-lg border">
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
                    <div className="flex items-center gap-6">
                      <div className="w-32">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Risk Score</span>
                          <span className="font-medium">{supplier.riskScore}</span>
                        </div>
                        <Progress 
                          value={supplier.riskScore} 
                          className="h-2"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        {supplier.trend === "up" && <TrendingUp className="h-4 w-4" style={{ color: "#dc2626" }} />}
                        {supplier.trend === "down" && <TrendingDown className="h-4 w-4" style={{ color: "#2ca02c" }} />}
                        {supplier.trend === "stable" && <span className="text-muted-foreground text-sm">—</span>}
                      </div>
                      {supplier.alerts.length > 0 ? (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          {supplier.alerts.length} Alert{supplier.alerts.length > 1 ? "s" : ""}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1" style={{ borderColor: "#2ca02c", color: "#2ca02c" }}>
                          <CheckCircle2 className="h-3 w-3" />
                          Stable
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">{supplier.lastAssessment}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
