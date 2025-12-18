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
  Zap,
  Shield,
  Target,
  Activity,
  Radar,
  CircleDot
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const accentColors = {
  teal: '#2A9D8F',
  olive: '#6B8E23',
  orange: '#E76F51',
  coral: '#E9967A',
  sky: '#4A90A4',
  lime: '#84a98c',
  navy: '#395174',
  gold: '#e1c47d',
  electric: '#00D4FF',
  purple: '#8B5CF6',
};

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
  const [prospectSearch, setProspectSearch] = useState("");
  const [selectedProspect, setSelectedProspect] = useState<ProspectProfile | null>(null);
  const [activeTab, setActiveTab] = useState("pathfinder");

  const filteredProspects = prospectSearch 
    ? sampleProspects.filter(p => 
        p.name.toLowerCase().includes(prospectSearch.toLowerCase()) ||
        p.organization.toLowerCase().includes(prospectSearch.toLowerCase()) ||
        p.title.toLowerCase().includes(prospectSearch.toLowerCase())
      )
    : sampleProspects;

  const getStrengthColor = (strength: number) => {
    if (strength >= 90) return accentColors.teal;
    if (strength >= 75) return accentColors.lime;
    if (strength >= 60) return accentColors.gold;
    return accentColors.coral;
  };

  const getDegreeConfig = (degrees: number) => {
    if (degrees === 1) return { label: "DIRECT", color: accentColors.teal, glow: 'rgba(42, 157, 143, 0.3)' };
    if (degrees === 2) return { label: "2ND DEGREE", color: accentColors.sky, glow: 'rgba(74, 144, 164, 0.3)' };
    return { label: "3RD DEGREE", color: accentColors.orange, glow: 'rgba(231, 111, 81, 0.3)' };
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div 
        className="relative overflow-hidden rounded-xl p-6"
        style={{ 
          background: `linear-gradient(135deg, ${accentColors.navy} 0%, #1a2d42 50%, ${accentColors.navy} 100%)`,
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10">
          <div className="absolute inset-0" style={{ 
            background: `radial-gradient(circle at center, ${accentColors.electric} 0%, transparent 70%)` 
          }} />
        </div>
        <div className="absolute bottom-0 left-0 w-64 h-64 opacity-5">
          <Network className="w-full h-full" />
        </div>

        <div className="relative z-10 flex items-start justify-between gap-6">
          <div className="flex items-start gap-5">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
              style={{ 
                background: `linear-gradient(135deg, ${accentColors.electric}20 0%, ${accentColors.purple}20 100%)`,
                border: `1px solid ${accentColors.electric}30`
              }}
            >
              <Radar className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-white">
                  RelSci Relationship Intelligence
                </h1>
                <Badge 
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ backgroundColor: accentColors.electric, color: accentColors.navy }}
                >
                  Enterprise
                </Badge>
              </div>
              <p className="text-white/70 max-w-xl">
                AI-powered relationship mapping across 10M+ decision-makers. Discover warm introduction paths to major gift prospects and institutional partners.
              </p>
              
              {/* Stats Row */}
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColors.teal }} />
                  <span className="text-sm text-white/80">
                    <strong className="text-white">847</strong> Active Connections
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColors.lime }} />
                  <span className="text-sm text-white/80">
                    <strong className="text-white">12</strong> New Paths This Week
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColors.gold }} />
                  <span className="text-sm text-white/80">
                    <strong className="text-white">94%</strong> Data Freshness
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="gap-2 shrink-0 bg-white/5 border-white/20 text-white hover:bg-white/10"
            data-testid="button-relsci-external"
          >
            <ExternalLink className="h-4 w-4" />
            Open RelSci Platform
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2">
        {[
          { id: 'pathfinder', label: 'Path Finder', icon: Network, color: accentColors.teal },
          { id: 'prospects', label: 'Prospect Research', icon: Target, color: accentColors.sky },
          { id: 'connections', label: 'NCR Network', icon: Link2, color: accentColors.orange },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <Button
              key={tab.id}
              variant={isActive ? "default" : "outline"}
              className="gap-2 relative"
              style={isActive ? { 
                backgroundColor: tab.color,
                boxShadow: `0 4px 14px ${tab.color}40`
              } : {
                borderColor: `${tab.color}40`,
                color: tab.color
              }}
              onClick={() => setActiveTab(tab.id)}
              data-testid={`tab-${tab.id}`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              {isActive && (
                <span 
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px]"
                  style={{ borderTopColor: tab.color }}
                />
              )}
            </Button>
          );
        })}
      </div>

      {/* Path Finder Content */}
      {activeTab === 'pathfinder' && (
        <div className="space-y-6">
          {/* Search Card */}
          <Card className="overflow-hidden">
            <div 
              className="px-6 py-4 border-b"
              style={{ background: `linear-gradient(90deg, ${accentColors.teal}08 0%, transparent 100%)` }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${accentColors.teal}15` }}
                >
                  <Search className="w-5 h-5" style={{ color: accentColors.teal }} />
                </div>
                <div>
                  <h3 className="font-semibold">Relationship Path Finder</h3>
                  <p className="text-sm text-muted-foreground">Discover the shortest path to any prospect through your network</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search for a person, company, or foundation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-base"
                    data-testid="input-relsci-search"
                  />
                </div>
                <Button 
                  className="h-12 px-6 gap-2"
                  style={{ backgroundColor: accentColors.teal }}
                  data-testid="button-find-paths"
                >
                  <Zap className="h-4 w-4" />
                  Find Paths
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Connection Paths Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Recent Connection Paths
              </h3>
              <Badge variant="outline" className="text-xs">
                {sampleConnectionPaths.length} paths analyzed
              </Badge>
            </div>
            
            <div className="space-y-4">
              {sampleConnectionPaths.map((path) => {
                const degreeConfig = getDegreeConfig(path.degrees);
                const strengthColor = getStrengthColor(path.connectionStrength);
                
                return (
                  <Link key={path.id} href={`/donors/${path.id}`}>
                    <Card 
                      className="overflow-hidden hover-elevate cursor-pointer transition-all group"
                      style={{ 
                        borderLeft: `4px solid ${degreeConfig.color}`,
                      }}
                      data-testid={`link-connection-${path.id}`}
                    >
                      <CardContent className="p-0">
                        <div className="flex">
                          {/* Left Section - Target Info */}
                          <div className="flex-1 p-5">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-14 w-14 border-2" style={{ borderColor: degreeConfig.color }}>
                                <AvatarFallback 
                                  className="text-lg font-semibold"
                                  style={{ backgroundColor: `${degreeConfig.color}15`, color: degreeConfig.color }}
                                >
                                  {path.targetName.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-lg">{path.targetName}</h4>
                                  <Badge 
                                    className="text-[10px] font-bold tracking-wider"
                                    style={{ backgroundColor: degreeConfig.color, color: 'white' }}
                                  >
                                    {degreeConfig.label}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{path.targetTitle}</p>
                                <p className="text-sm font-medium" style={{ color: accentColors.navy }}>{path.targetOrg}</p>
                                
                                {/* Path Visualization */}
                                <div className="flex items-center gap-2 mt-4 flex-wrap">
                                  <div 
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                                    style={{ backgroundColor: `${accentColors.navy}10`, color: accentColors.navy }}
                                  >
                                    <CircleDot className="w-3 h-3" />
                                    NCR Network
                                  </div>
                                  {path.pathNodes.map((node, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                      <div className="w-6 h-px" style={{ backgroundColor: degreeConfig.color }} />
                                      <div 
                                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
                                        style={{ backgroundColor: `${degreeConfig.color}10`, color: degreeConfig.color }}
                                      >
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: degreeConfig.color }} />
                                        {node.name}
                                      </div>
                                    </div>
                                  ))}
                                  <div className="w-6 h-px" style={{ backgroundColor: degreeConfig.color }} />
                                  <div 
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                                    style={{ backgroundColor: degreeConfig.color, color: 'white' }}
                                  >
                                    <Target className="w-3 h-3" />
                                    {path.targetName.split(' ')[0]}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Right Section - Strength Meter */}
                          <div 
                            className="w-48 p-5 flex flex-col items-center justify-center border-l"
                            style={{ backgroundColor: `${strengthColor}05` }}
                          >
                            <div className="relative">
                              <svg className="w-20 h-20 -rotate-90">
                                <circle
                                  cx="40"
                                  cy="40"
                                  r="32"
                                  fill="none"
                                  stroke={`${strengthColor}20`}
                                  strokeWidth="6"
                                />
                                <circle
                                  cx="40"
                                  cy="40"
                                  r="32"
                                  fill="none"
                                  stroke={strengthColor}
                                  strokeWidth="6"
                                  strokeLinecap="round"
                                  strokeDasharray={`${path.connectionStrength * 2.01} 201`}
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl font-bold" style={{ color: strengthColor }}>
                                  {path.connectionStrength}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs font-medium text-muted-foreground mt-2">Connection Strength</span>
                            <span className="text-xs text-muted-foreground mt-1">
                              Updated {path.lastUpdated}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Prospects Content */}
      {activeTab === 'prospects' && (
        <div className="space-y-6">
          {/* Search Card */}
          <Card className="overflow-hidden">
            <div 
              className="px-6 py-4 border-b"
              style={{ background: `linear-gradient(90deg, ${accentColors.sky}08 0%, transparent 100%)` }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${accentColors.sky}15` }}
                >
                  <Target className="w-5 h-5" style={{ color: accentColors.sky }} />
                </div>
                <div>
                  <h3 className="font-semibold">Prospect Research</h3>
                  <p className="text-sm text-muted-foreground">Deep intelligence on high-value philanthropic prospects</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search prospects by name, organization, or title..."
                    value={prospectSearch}
                    onChange={(e) => setProspectSearch(e.target.value)}
                    className="pl-12 h-12 text-base"
                    data-testid="input-prospect-search"
                  />
                </div>
                <Button 
                  className="h-12 px-6 gap-2"
                  style={{ backgroundColor: accentColors.sky }}
                  data-testid="button-search-prospects"
                >
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Prospects Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Prospects List */}
            <div className="lg:col-span-1">
              <Card className="h-fit">
                <CardHeader className="pb-3" style={{ borderBottom: `2px solid ${accentColors.sky}` }}>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="w-4 h-4" style={{ color: accentColors.sky }} />
                    {prospectSearch ? "Search Results" : "High-Value Prospects"}
                  </CardTitle>
                  <CardDescription>
                    {prospectSearch ? `Filtered by "${prospectSearch}"` : "Ranked by connection score"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3 space-y-2">
                  {filteredProspects.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="h-10 w-10 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No prospects found</p>
                    </div>
                  ) : filteredProspects.map((prospect) => {
                    const isSelected = selectedProspect?.id === prospect.id;
                    return (
                      <div
                        key={prospect.id}
                        className={`p-4 rounded-xl cursor-pointer transition-all ${
                          isSelected 
                            ? 'ring-2' 
                            : 'hover:bg-muted/50'
                        }`}
                        style={isSelected ? { 
                          backgroundColor: `${accentColors.sky}08`,
                          ringColor: accentColors.sky
                        } : {}}
                        onClick={() => setSelectedProspect(prospect)}
                        data-testid={`prospect-${prospect.id}`}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-12 w-12 border-2" style={{ borderColor: isSelected ? accentColors.sky : 'transparent' }}>
                            <AvatarFallback 
                              className="font-semibold"
                              style={{ backgroundColor: accentColors.navy, color: 'white' }}
                            >
                              {prospect.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{prospect.name}</h4>
                            <p className="text-xs text-muted-foreground truncate">{prospect.organization}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge 
                                variant="outline" 
                                className="text-xs gap-1"
                                style={{ borderColor: `${accentColors.teal}40`, color: accentColors.teal }}
                              >
                                <Network className="w-3 h-3" />
                                {prospect.warmPaths} paths
                              </Badge>
                              <span 
                                className="text-xs font-bold"
                                style={{ color: getStrengthColor(prospect.connectionScore) }}
                              >
                                {prospect.connectionScore}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Prospect Detail */}
            <div className="lg:col-span-2">
              {selectedProspect ? (
                <Card className="overflow-hidden">
                  {/* Profile Header */}
                  <div 
                    className="p-6"
                    style={{ background: `linear-gradient(135deg, ${accentColors.navy} 0%, #1a2d42 100%)` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-5">
                        <Avatar className="h-20 w-20 border-4 border-white/20">
                          <AvatarFallback className="text-2xl font-bold bg-white/10 text-white">
                            {selectedProspect.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-xl font-bold text-white">{selectedProspect.name}</h2>
                          <p className="text-white/70">{selectedProspect.title}</p>
                          <p className="text-sm font-medium" style={{ color: accentColors.gold }}>{selectedProspect.organization}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1 text-white/60 text-sm">
                              <MapPin className="w-3 h-3" />
                              {selectedProspect.location}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Score Circle */}
                      <div className="text-center">
                        <div className="relative">
                          <svg className="w-24 h-24 -rotate-90">
                            <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              fill="none"
                              stroke={accentColors.teal}
                              strokeWidth="6"
                              strokeLinecap="round"
                              strokeDasharray={`${selectedProspect.connectionScore * 2.51} 251`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-white">{selectedProspect.connectionScore}</span>
                          </div>
                        </div>
                        <span className="text-xs text-white/60 mt-1 block">Match Score</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Est. Net Worth", value: selectedProspect.netWorth || "Unknown", icon: TrendingUp, color: accentColors.lime },
                        { label: "Warm Paths", value: selectedProspect.warmPaths.toString(), icon: Network, color: accentColors.teal },
                        { label: "Board Seats", value: selectedProspect.boardMemberships.length.toString(), icon: Briefcase, color: accentColors.sky },
                      ].map((stat) => {
                        const Icon = stat.icon;
                        return (
                          <div 
                            key={stat.label}
                            className="p-4 rounded-xl"
                            style={{ backgroundColor: `${stat.color}08` }}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Icon className="w-4 h-4" style={{ color: stat.color }} />
                              <span className="text-xs text-muted-foreground">{stat.label}</span>
                            </div>
                            <span className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Interests */}
                    <div>
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <Heart className="w-4 h-4" style={{ color: accentColors.coral }} />
                        Interests & Affinities
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProspect.interests.map((interest, idx) => (
                          <Badge 
                            key={idx} 
                            variant="secondary"
                            className="text-xs"
                          >
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Philanthropic History */}
                    <div>
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <Star className="w-4 h-4" style={{ color: accentColors.gold }} />
                        Recent Philanthropic History
                      </h4>
                      <div className="space-y-2">
                        {selectedProspect.philanthropicHistory.map((gift, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center gap-3 p-3 rounded-lg"
                            style={{ backgroundColor: `${accentColors.gold}08` }}
                          >
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: accentColors.gold }}
                            />
                            <span className="text-sm">{gift}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Board Memberships */}
                    <div>
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" style={{ color: accentColors.navy }} />
                        Board Memberships
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProspect.boardMemberships.map((board, idx) => (
                          <Badge 
                            key={idx} 
                            variant="outline"
                            className="text-xs"
                          >
                            {board}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center min-h-[400px]">
                  <div className="text-center p-8">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: `${accentColors.sky}10` }}
                    >
                      <Target className="w-8 h-8" style={{ color: accentColors.sky }} />
                    </div>
                    <h3 className="font-semibold mb-2">Select a Prospect</h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Choose a prospect from the list to view their detailed profile and connection paths
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      {/* NCR Network Content */}
      {activeTab === 'connections' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Board Members", count: 12, paths: 156, color: accentColors.teal, icon: Users },
            { title: "Foundation Staff", count: 8, paths: 89, color: accentColors.sky, icon: Building2 },
            { title: "Leadership Team", count: 6, paths: 67, color: accentColors.orange, icon: Shield },
          ].map((group) => {
            const Icon = group.icon;
            return (
              <Card key={group.title} className="overflow-hidden">
                <div 
                  className="p-5"
                  style={{ background: `linear-gradient(135deg, ${group.color}15 0%, transparent 100%)` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${group.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: group.color }} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{group.title}</h3>
                      <p className="text-xs text-muted-foreground">{group.count} members mapped</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                    <span className="text-sm text-muted-foreground">Total connection paths</span>
                    <span className="text-lg font-bold" style={{ color: group.color }}>{group.paths}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
