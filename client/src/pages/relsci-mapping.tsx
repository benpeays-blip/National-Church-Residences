import { useState } from "react";
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
  Globe
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import relsciLogo from "@assets/stock_images/relsci_relationship__78cef93d.jpg";

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
  }
];

export default function RelSciMapping() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProspect, setSelectedProspect] = useState<ProspectProfile | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg overflow-hidden bg-white border shadow-sm flex items-center justify-center">
            <img src={relsciLogo} alt="RelSci" className="h-10 w-10 object-contain" />
          </div>
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pathfinder" className="gap-2" data-testid="tab-pathfinder">
            <Network className="h-4 w-4" />
            Path Finder
          </TabsTrigger>
          <TabsTrigger value="prospects" className="gap-2" data-testid="tab-prospects">
            <Users className="h-4 w-4" />
            Prospect Research
          </TabsTrigger>
          <TabsTrigger value="connections" className="gap-2" data-testid="tab-connections">
            <Link2 className="h-4 w-4" />
            NCR Connections
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pathfinder" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Network className="h-5 w-5" style={{ color: "#084594" }} />
                Relationship Path Finder
              </CardTitle>
              <CardDescription>
                Discover the shortest path to any prospect through your existing network
              </CardDescription>
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

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Recent Connection Paths</h4>
                {sampleConnectionPaths.map((path) => (
                  <Card key={path.id} className="hover-elevate cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div 
                              className="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold"
                              style={{ backgroundColor: path.degrees === 1 ? "#2ca02c" : path.degrees === 2 ? "#084594" : "#6b7280" }}
                            >
                              {path.degrees}°
                            </div>
                            <span className="text-xs text-muted-foreground mt-1">degrees</span>
                          </div>
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
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Connection Strength</span>
                            <Badge 
                              variant={path.connectionStrength >= 80 ? "default" : "secondary"}
                              style={path.connectionStrength >= 80 ? { backgroundColor: "#2ca02c" } : {}}
                            >
                              {path.connectionStrength}%
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Updated {path.lastUpdated}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prospects" className="space-y-4 mt-4">
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1 space-y-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">High-Value Prospects</CardTitle>
                  <CardDescription>Sorted by connection score</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 p-3">
                  {sampleProspects.map((prospect) => (
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
                          <AvatarFallback style={{ backgroundColor: "#084594", color: "white" }}>
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
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarFallback className="text-xl" style={{ backgroundColor: "#084594", color: "white" }}>
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
                          <li key={idx} className="text-sm flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3" style={{ color: "#2ca02c" }} />
                            {gift}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button style={{ backgroundColor: "#084594" }} className="gap-2" data-testid="button-find-intro-path">
                        <Network className="h-4 w-4" />
                        Find Introduction Path
                      </Button>
                      <Button variant="outline" className="gap-2" data-testid="button-add-to-pipeline">
                        <ArrowRight className="h-4 w-4" />
                        Add to Pipeline
                      </Button>
                      <Button variant="outline" className="gap-2" data-testid="button-full-profile">
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
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">NCR Board Network</CardTitle>
                  <Badge style={{ backgroundColor: "#084594" }}>12 Members</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Total Connections Mapped</span>
                      <span className="font-medium">2,847</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>High-Value Prospects Reached</span>
                      <span className="font-medium">156</span>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Foundation Connections</span>
                      <span className="font-medium">89</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Foundation Board</CardTitle>
                  <Badge style={{ backgroundColor: "#2ca02c" }}>8 Members</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Total Connections Mapped</span>
                      <span className="font-medium">1,523</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Corporate Executives</span>
                      <span className="font-medium">234</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Philanthropic Leaders</span>
                      <span className="font-medium">67</span>
                    </div>
                    <Progress value={38} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Leadership Team</CardTitle>
                  <Badge variant="secondary">15 Executives</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Total Connections Mapped</span>
                      <span className="font-medium">1,892</span>
                    </div>
                    <Progress value={55} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Industry Peers</span>
                      <span className="font-medium">312</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Government/Policy</span>
                      <span className="font-medium">45</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" style={{ color: "#084594" }} />
                Relationship Intelligence Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <h4 className="font-medium mb-2">Top Connector: David Mitchell</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    NCR Foundation Chair has the highest network value with connections to 47 high-capacity prospects.
                  </p>
                  <div className="flex gap-1 flex-wrap">
                    <Badge variant="outline" className="text-xs">Finance Sector</Badge>
                    <Badge variant="outline" className="text-xs">Healthcare</Badge>
                    <Badge variant="outline" className="text-xs">Education</Badge>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <h4 className="font-medium mb-2">Untapped Network: Rev. James Porter</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Faith community connections could unlock 23 new foundation relationships.
                  </p>
                  <div className="flex gap-1 flex-wrap">
                    <Badge variant="outline" className="text-xs">Faith-Based</Badge>
                    <Badge variant="outline" className="text-xs">Community</Badge>
                    <Badge variant="outline" className="text-xs">Social Services</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
