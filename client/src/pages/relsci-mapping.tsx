import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Network, 
  Users, 
  Building2, 
  ArrowRight, 
  ExternalLink,
  Star,
  TrendingUp,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  Link2,
  ChevronRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  Globe,
  Target,
  Shield
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface ConnectionPath {
  id: string;
  targetName: string;
  targetTitle: string;
  targetOrg: string;
  degrees: number;
  pathNodes: {
    name: string;
    title: string;
    org: string;
    connectionType: string;
  }[];
  connectionStrength: number;
  lastUpdated: string;
}

interface ProspectProfile {
  id: string;
  name: string;
  title: string;
  organization: string;
  location: string;
  netWorth?: string;
  philanthropicHistory: string[];
  boardMemberships: string[];
  education: string[];
  interests: string[];
  connectionScore: number;
  warmPaths: number;
}

const sampleConnectionPaths: ConnectionPath[] = [
  {
    id: "1",
    targetName: "Margaret Sullivan",
    targetTitle: "President",
    targetOrg: "Sullivan Family Foundation",
    degrees: 2,
    pathNodes: [
      {
        name: "William Chen",
        title: "NCR Board Member",
        org: "National Church Residences",
        connectionType: "Board colleague"
      },
      {
        name: "Dr. Patricia Hayes",
        title: "Trustee",
        org: "Ohio State University Foundation",
        connectionType: "Co-trustee"
      }
    ],
    connectionStrength: 87,
    lastUpdated: "2 days ago"
  },
  {
    id: "2",
    targetName: "Robert Thornton III",
    targetTitle: "CEO",
    targetOrg: "Midwest Regional Bank",
    degrees: 1,
    pathNodes: [
      {
        name: "David Mitchell",
        title: "NCR Foundation Chair",
        org: "National Church Residences Foundation",
        connectionType: "Golf club member"
      }
    ],
    connectionStrength: 94,
    lastUpdated: "1 week ago"
  },
  {
    id: "3",
    targetName: "Eleanor Washington",
    targetTitle: "Managing Partner",
    targetOrg: "Washington & Associates Law",
    degrees: 3,
    pathNodes: [
      {
        name: "Rev. James Porter",
        title: "NCR Chaplain",
        org: "National Church Residences",
        connectionType: "Church affiliation"
      },
      {
        name: "Sarah Mitchell",
        title: "Community Leader",
        org: "Columbus Faith Alliance",
        connectionType: "Advisory board"
      },
      {
        name: "Michael Chen",
        title: "Partner",
        org: "Chen Family Office",
        connectionType: "Legal counsel"
      }
    ],
    connectionStrength: 62,
    lastUpdated: "3 weeks ago"
  },
  {
    id: "4",
    targetName: "Dr. Richard Holloway",
    targetTitle: "Chief Medical Officer",
    targetOrg: "OhioHealth",
    degrees: 2,
    pathNodes: [
      {
        name: "Linda Morrison",
        title: "NCR VP of Health Services",
        org: "National Church Residences",
        connectionType: "Healthcare conference"
      },
      {
        name: "Dr. James Wright",
        title: "Department Chair",
        org: "Ohio State Wexner Medical Center",
        connectionType: "Medical school classmate"
      }
    ],
    connectionStrength: 78,
    lastUpdated: "4 days ago"
  },
  {
    id: "5",
    targetName: "Catherine Brennan",
    targetTitle: "Executive Director",
    targetOrg: "Columbus Community Foundation",
    degrees: 1,
    pathNodes: [
      {
        name: "Susan Parker",
        title: "NCR Board Member",
        org: "National Church Residences",
        connectionType: "Nonprofit alliance"
      }
    ],
    connectionStrength: 91,
    lastUpdated: "1 day ago"
  },
  {
    id: "6",
    targetName: "Thomas Fitzgerald",
    targetTitle: "Chairman",
    targetOrg: "Fitzgerald Holdings Group",
    degrees: 2,
    pathNodes: [
      {
        name: "Mark Henderson",
        title: "NCR CEO",
        org: "National Church Residences",
        connectionType: "Rotary club"
      },
      {
        name: "Victoria Adams",
        title: "CFO",
        org: "KeyBank Columbus",
        connectionType: "Business advisory"
      }
    ],
    connectionStrength: 83,
    lastUpdated: "5 days ago"
  },
  {
    id: "7",
    targetName: "Jennifer Liu",
    targetTitle: "Partner",
    targetOrg: "Baker & McKenzie",
    degrees: 3,
    pathNodes: [
      {
        name: "Robert Mills",
        title: "General Counsel",
        org: "National Church Residences",
        connectionType: "Legal association"
      },
      {
        name: "Christopher Jones",
        title: "Senior Associate",
        org: "Squire Patton Boggs",
        connectionType: "Law school alumni"
      },
      {
        name: "Amanda Richards",
        title: "Partner",
        org: "Jones Day",
        connectionType: "Bar association"
      }
    ],
    connectionStrength: 58,
    lastUpdated: "2 weeks ago"
  },
  {
    id: "8",
    targetName: "Harrison Wells",
    targetTitle: "President",
    targetOrg: "Wells Family Trust",
    degrees: 1,
    pathNodes: [
      {
        name: "Nancy Thompson",
        title: "NCR Foundation Director",
        org: "National Church Residences Foundation",
        connectionType: "Philanthropic network"
      }
    ],
    connectionStrength: 96,
    lastUpdated: "Today"
  },
  {
    id: "9",
    targetName: "Maria Gonzalez",
    targetTitle: "Vice President",
    targetOrg: "JPMorgan Chase Foundation",
    degrees: 2,
    pathNodes: [
      {
        name: "William Chen",
        title: "NCR Board Member",
        org: "National Church Residences",
        connectionType: "Banking relationship"
      },
      {
        name: "David Rodriguez",
        title: "Community Affairs Director",
        org: "JPMorgan Chase",
        connectionType: "Corporate giving"
      }
    ],
    connectionStrength: 72,
    lastUpdated: "1 week ago"
  },
  {
    id: "10",
    targetName: "Dr. Angela Foster",
    targetTitle: "Dean of Medicine",
    targetOrg: "Case Western Reserve University",
    degrees: 2,
    pathNodes: [
      {
        name: "Dr. Patricia Hayes",
        title: "Trustee",
        org: "Ohio State University Foundation",
        connectionType: "Academic conference"
      },
      {
        name: "Dr. Michael Barnes",
        title: "Professor",
        org: "Cleveland Clinic Lerner College",
        connectionType: "Research collaboration"
      }
    ],
    connectionStrength: 69,
    lastUpdated: "10 days ago"
  }
];

const sampleProspects: ProspectProfile[] = [
  {
    id: "1",
    name: "Victoria Sterling",
    title: "Philanthropist & Former CEO",
    organization: "Sterling Healthcare Systems",
    location: "Columbus, OH",
    netWorth: "$45M - $75M",
    philanthropicHistory: [
      "Ohio State University - $2.5M (2022)",
      "Columbus Community Foundation - $1.2M (2021)",
      "Nationwide Children's Hospital - $800K (2020)"
    ],
    boardMemberships: [
      "Columbus Foundation Board",
      "Ohio Healthcare Association",
      "United Way Central Ohio"
    ],
    education: ["Harvard Business School", "Ohio State University"],
    interests: ["Senior Care", "Healthcare Innovation", "Faith-Based Initiatives"],
    connectionScore: 92,
    warmPaths: 3
  },
  {
    id: "2",
    name: "Charles Montgomery",
    title: "Chairman",
    organization: "Montgomery Capital Partners",
    location: "Cincinnati, OH",
    netWorth: "$120M+",
    philanthropicHistory: [
      "Cincinnati Children's Hospital - $5M (2023)",
      "Xavier University - $3M (2022)",
      "Habitat for Humanity - $1.5M (2021)"
    ],
    boardMemberships: [
      "Fifth Third Bank Advisory Board",
      "Cincinnati Symphony Orchestra",
      "Ohio Business Roundtable"
    ],
    education: ["University of Chicago Booth", "Miami University"],
    interests: ["Housing", "Economic Development", "Arts & Culture"],
    connectionScore: 78,
    warmPaths: 2
  },
  {
    id: "3",
    name: "Dr. Amelia Richardson",
    title: "Executive Director",
    organization: "Richardson Family Foundation",
    location: "Cleveland, OH",
    netWorth: "$30M - $50M",
    philanthropicHistory: [
      "Case Western Reserve - $2M (2023)",
      "Cleveland Clinic - $1.8M (2022)",
      "Lutheran Metropolitan Ministry - $500K (2021)"
    ],
    boardMemberships: [
      "Cleveland Foundation",
      "AARP Ohio State Board",
      "Evangelical Lutheran Church"
    ],
    education: ["Johns Hopkins University", "Oberlin College"],
    interests: ["Aging Services", "Healthcare Equity", "Lutheran Ministry"],
    connectionScore: 95,
    warmPaths: 4
  },
  {
    id: "4",
    name: "Robert J. Whitmore",
    title: "Founder & Managing Partner",
    organization: "Whitmore Capital Group",
    location: "Toledo, OH",
    netWorth: "$85M - $100M",
    philanthropicHistory: [
      "University of Toledo - $3.5M (2023)",
      "ProMedica Foundation - $2M (2022)",
      "Toledo Museum of Art - $1.2M (2021)"
    ],
    boardMemberships: [
      "Toledo Community Foundation",
      "ProMedica Health System",
      "Ohio Chamber of Commerce"
    ],
    education: ["Wharton School of Business", "University of Michigan"],
    interests: ["Senior Housing", "Medical Research", "Community Development"],
    connectionScore: 88,
    warmPaths: 3
  },
  {
    id: "5",
    name: "Margaret Chen-Williams",
    title: "CEO (Retired)",
    organization: "Midwest Healthcare Partners",
    location: "Dayton, OH",
    netWorth: "$55M - $70M",
    philanthropicHistory: [
      "Wright State University - $1.8M (2023)",
      "Dayton Children's Hospital - $1.5M (2022)",
      "YWCA Dayton - $600K (2021)"
    ],
    boardMemberships: [
      "Premier Health Network",
      "Dayton Foundation",
      "Asian American Commerce Group"
    ],
    education: ["Stanford Graduate School of Business", "UC Berkeley"],
    interests: ["Healthcare Access", "Women's Health", "AAPI Philanthropy"],
    connectionScore: 82,
    warmPaths: 2
  },
  {
    id: "6",
    name: "William H. Patterson III",
    title: "Chairman Emeritus",
    organization: "Patterson Family Trust",
    location: "Akron, OH",
    netWorth: "$150M+",
    philanthropicHistory: [
      "University of Akron - $10M (2022)",
      "Akron Children's Hospital - $5M (2021)",
      "Stan Hywet Hall & Gardens - $2M (2020)"
    ],
    boardMemberships: [
      "Goodyear Tire & Rubber (Retired)",
      "Akron Community Foundation",
      "Knight Foundation Ohio"
    ],
    education: ["Yale University", "Case Western Reserve Law"],
    interests: ["Historic Preservation", "Youth Education", "Faith Communities"],
    connectionScore: 91,
    warmPaths: 5
  },
  {
    id: "7",
    name: "Dr. Sarah Okonkwo",
    title: "Chief Medical Officer (Retired)",
    organization: "OhioHealth",
    location: "Columbus, OH",
    netWorth: "$25M - $40M",
    philanthropicHistory: [
      "Ohio State Wexner Medical Center - $1.5M (2023)",
      "African American Heritage Foundation - $800K (2022)",
      "Columbus Urban League - $400K (2021)"
    ],
    boardMemberships: [
      "Central Ohio Hospital Council",
      "National Medical Association",
      "Columbus Metropolitan Club"
    ],
    education: ["Howard University College of Medicine", "Spelman College"],
    interests: ["Health Disparities", "Minority Health", "Senior Care"],
    connectionScore: 86,
    warmPaths: 3
  },
  {
    id: "8",
    name: "James & Ellen Fitzgerald",
    title: "Co-Founders",
    organization: "Fitzgerald Family Foundation",
    location: "Dublin, OH",
    netWorth: "$65M - $80M",
    philanthropicHistory: [
      "Catholic Diocese of Columbus - $3M (2023)",
      "Dublin Community Foundation - $1.5M (2022)",
      "Meals on Wheels Central Ohio - $500K (2021)"
    ],
    boardMemberships: [
      "Catholic Foundation of Columbus",
      "Dublin City Schools Foundation",
      "Ohio Dominican University"
    ],
    education: ["Notre Dame", "Ohio Dominican University"],
    interests: ["Catholic Charities", "Senior Services", "Education"],
    connectionScore: 94,
    warmPaths: 4
  }
];

export default function RelSciMapping() {
  const [searchQuery, setSearchQuery] = useState("");
  const [prospectSearch, setProspectSearch] = useState("");
  const [selectedProspect, setSelectedProspect] = useState<ProspectProfile | null>(null);

  const filteredProspects = prospectSearch 
    ? sampleProspects.filter(p => 
        p.name.toLowerCase().includes(prospectSearch.toLowerCase()) ||
        p.organization.toLowerCase().includes(prospectSearch.toLowerCase()) ||
        p.title.toLowerCase().includes(prospectSearch.toLowerCase())
      )
    : sampleProspects;

  const getStrengthColor = (strength: number) => {
    if (strength >= 90) return "#2ca02c";
    if (strength >= 75) return "#84a98c";
    if (strength >= 60) return "#f59e0b";
    return "#dc2626";
  };

  const getDegreeStyle = (degrees: number) => {
    if (degrees === 1) return { bg: "#dcfce7", border: "#2ca02c", text: "#166534", label: "Direct" };
    if (degrees === 2) return { bg: "#dbeafe", border: "#084594", text: "#1e40af", label: "2nd connection" };
    return { bg: "#f3f4f6", border: "#6b7280", text: "#374151", label: "3rd connection" };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#084594" }}>
              RelSci Relationship Intelligence
            </h1>
            <p className="text-muted-foreground">
              Discover warm introduction paths to major gift prospects and institutional partners
            </p>
          </div>
        </div>
        <Button variant="outline" className="gap-2" data-testid="button-relsci-external">
          <ExternalLink className="h-4 w-4" />
          Open RelSci Platform
        </Button>
      </div>

      <Card className="p-4" style={{ backgroundColor: "rgba(8, 69, 148, 0.05)" }}>
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 mt-0.5" style={{ color: "#084594" }} />
          <div>
            <h4 className="font-medium text-sm" style={{ color: "#084594" }}>Integration Overview</h4>
            <p className="text-sm text-muted-foreground mt-1">
              RelSci provides relationship intelligence on <strong>10+ million decision-makers</strong> across business, finance, nonprofit, and philanthropic sectors.
              Use Path Finder to discover warm introduction paths through NCR's board members, staff, and extended network.
            </p>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="pathfinder" className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-1 bg-transparent p-0 mb-4">
          <TabsTrigger 
            value="pathfinder" 
            className="group relative gap-2 bg-[#7FA3A1] text-white data-[state=active]:bg-[#7FA3A1] data-[state=active]:text-white data-[state=active]:shadow-none" 
            data-testid="tab-pathfinder"
          >
            <Network className="h-4 w-4" />
            Path Finder
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#7FA3A1] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="prospects" 
            className="group relative gap-2 bg-[#7BC4DC] text-white data-[state=active]:bg-[#7BC4DC] data-[state=active]:text-white data-[state=active]:shadow-none" 
            data-testid="tab-prospects"
          >
            <Users className="h-4 w-4" />
            Prospect Research
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#7BC4DC] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="connections" 
            className="group relative gap-2 bg-[#E8923A] text-white data-[state=active]:bg-[#E8923A] data-[state=active]:text-white data-[state=active]:shadow-none" 
            data-testid="tab-connections"
          >
            <Link2 className="h-4 w-4" />
            NCR Connections
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#E8923A] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pathfinder" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Network className="h-5 w-5" style={{ color: "#084594" }} />
                Relationship Path Finder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search for a person, company, or foundation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                    data-testid="input-relsci-search"
                  />
                </div>
                <Button style={{ backgroundColor: "#084594" }} data-testid="button-find-paths">
                  Find Paths
                </Button>
              </div>
            </CardContent>
          </Card>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Recent Connection Paths</h4>
            <div className="space-y-6">
            {sampleConnectionPaths.map((path) => {
              const degreeStyle = getDegreeStyle(path.degrees);
              return (
                <Link key={path.id} href={`/donors/${path.id}`} data-testid={`link-connection-${path.id}`}>
                  <Card className="hover-elevate cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <Badge 
                            variant="outline"
                            className="shrink-0 px-2 py-1"
                            style={{ 
                              backgroundColor: degreeStyle.bg,
                              borderColor: degreeStyle.border,
                              color: degreeStyle.text
                            }}
                          >
                            {degreeStyle.label}
                          </Badge>
                          <div>
                            <h4 className="font-semibold">{path.targetName}</h4>
                            <p className="text-sm text-muted-foreground">{path.targetTitle}</p>
                            <p className="text-sm" style={{ color: "#084594" }}>{path.targetOrg}</p>
                            
                            <div className="flex items-center gap-1 mt-3 flex-wrap">
                              <Badge variant="outline" className="text-xs">NCR Network</Badge>
                              {path.pathNodes.map((node, idx) => (
                                <div key={idx} className="flex items-center gap-1">
                                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                                  <Badge variant="secondary" className="text-xs">{node.name}</Badge>
                                </div>
                              ))}
                              <ChevronRight className="h-3 w-3 text-muted-foreground" />
                              <Badge className="text-xs" style={{ backgroundColor: "#084594" }}>{path.targetName}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Connection Strength</span>
                            <Badge 
                              style={{ 
                                backgroundColor: getStrengthColor(path.connectionStrength),
                                color: "white"
                              }}
                            >
                              {path.connectionStrength}%
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Updated {path.lastUpdated}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="prospects" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5" style={{ color: "#084594" }} />
                Prospect Research
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search prospects by name, organization, or title..."
                    value={prospectSearch}
                    onChange={(e) => setProspectSearch(e.target.value)}
                    className="pl-9"
                    data-testid="input-prospect-search"
                  />
                </div>
                <Button style={{ backgroundColor: "#084594" }} data-testid="button-search-prospects">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              {prospectSearch && (
                <p className="text-sm text-muted-foreground mt-2">
                  Showing results for "{prospectSearch}" • {filteredProspects.length} prospect{filteredProspects.length !== 1 ? 's' : ''} found
                </p>
              )}
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1 space-y-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{prospectSearch ? "Search Results" : "High-Value Prospects"}</CardTitle>
                  <CardDescription>{prospectSearch ? `Filtered by "${prospectSearch}"` : "Sorted by connection score"}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 p-3">
                  {filteredProspects.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No prospects found matching "{prospectSearch}"</p>
                    </div>
                  ) : filteredProspects.map((prospect) => (
                    <div
                      key={prospect.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedProspect?.id === prospect.id 
                          ? "bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800" 
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedProspect(prospect)}
                      data-testid={`prospect-${prospect.id}`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback style={{ backgroundColor: "#395174", color: "white" }}>
                            {prospect.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{prospect.name}</h4>
                          <p className="text-xs text-muted-foreground truncate">{prospect.organization}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{prospect.warmPaths} paths</Badge>
                            <span className="text-xs font-medium" style={{ color: "#2ca02c" }}>{prospect.connectionScore}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {selectedProspect ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarFallback className="text-xl" style={{ backgroundColor: "#395174", color: "white" }}>
                            {selectedProspect.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{selectedProspect.name}</CardTitle>
                          <CardDescription className="text-base">{selectedProspect.title}</CardDescription>
                          <p style={{ color: "#084594" }}>{selectedProspect.organization}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Connection Score</span>
                          <div 
                            className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: "#2ca02c" }}
                          >
                            {selectedProspect.connectionScore}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{selectedProspect.location}</span>
                        </div>
                        {selectedProspect.netWorth && (
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Est. Net Worth: <strong>{selectedProspect.netWorth}</strong></span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Network className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm"><strong>{selectedProspect.warmPaths}</strong> warm introduction paths</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          Education
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedProspect.education.map((edu, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">{edu}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <Heart className="h-4 w-4" style={{ color: "#e74c3c" }} />
                        Interests & Affinities
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedProspect.interests.map((interest, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">{interest}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Board Memberships
                      </h4>
                      <ul className="space-y-1">
                        {selectedProspect.boardMemberships.map((board, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                            {board}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <Star className="h-4 w-4" style={{ color: "#f59e0b" }} />
                        Philanthropic History
                      </h4>
                      <ul className="space-y-1">
                        {selectedProspect.philanthropicHistory.map((gift, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3" style={{ color: "#2ca02c" }} />
                            {gift}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button style={{ backgroundColor: "#084594" }} className="gap-2">
                        <Network className="h-4 w-4" />
                        Find Introduction Paths
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Full RelSci Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center min-h-[400px]">
                  <div className="text-center text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Select a prospect to view their profile</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="connections" className="space-y-4 mt-4">
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: "#084594" }}>847</div>
                  <p className="text-sm text-muted-foreground">Active Connections</p>
                  <p className="text-xs text-muted-foreground mt-1">in RelSci network</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: "#2ca02c" }}>312</div>
                  <p className="text-sm text-muted-foreground">Connection Paths</p>
                  <p className="text-xs text-muted-foreground mt-1">to major prospects</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: "#f59e0b" }}>12</div>
                  <p className="text-sm text-muted-foreground">New This Week</p>
                  <p className="text-xs text-muted-foreground mt-1">paths discovered</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: "#084594" }}>94%</div>
                  <p className="text-sm text-muted-foreground">Data Freshness</p>
                  <p className="text-xs text-muted-foreground mt-1">updated this month</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Link2 className="h-5 w-5" style={{ color: "#084594" }} />
                NCR Network Coverage
              </CardTitle>
              <CardDescription>
                Relationship mapping across NCR's board, foundation, and leadership teams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Board of Directors", count: 12, paths: 156, color: "#7FA3A1" },
                  { name: "Foundation Board", count: 8, paths: 89, color: "#7BC4DC" },
                  { name: "Leadership Team", count: 6, paths: 67, color: "#E8923A" },
                ].map((group) => (
                  <div key={group.name} className="flex items-center justify-between p-4 rounded-lg border hover-elevate cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div 
                        className="h-10 w-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${group.color}20` }}
                      >
                        <Users className="h-5 w-5" style={{ color: group.color }} />
                      </div>
                      <div>
                        <h4 className="font-medium">{group.name}</h4>
                        <p className="text-sm text-muted-foreground">{group.count} members mapped</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Connection Paths</p>
                        <p className="font-semibold" style={{ color: group.color }}>{group.paths}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
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
