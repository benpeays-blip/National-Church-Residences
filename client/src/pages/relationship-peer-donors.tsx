import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Heart,
  Plus,
  TrendingUp,
  Search,
  Filter,
  ArrowUpRight,
  Star,
  DollarSign,
  Calendar,
  Building2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PeerDonor {
  id: number;
  sourceDonorName: string;
  sourceDonorTitle: string;
  peerDonorName: string;
  peerDonorTitle: string;
  similarityScore: number;
  sharedCharacteristics: string[];
  sharedOrganizations: string[];
  peerGaveToPrograms: string[];
  personNotYetAskedFor: string[];
  peerTotalGiving: number;
  peerLargestGift: number;
  lastGiftDate: string;
  potentialAsk: number;
  status: 'new' | 'contacted' | 'cultivating' | 'converted';
}

const samplePeerDonors: PeerDonor[] = [
  {
    id: 1,
    sourceDonorName: "Sarah Chen",
    sourceDonorTitle: "Board Chair",
    peerDonorName: "Margaret O'Connor",
    peerDonorTitle: "Philanthropist",
    similarityScore: 0.94,
    sharedCharacteristics: ["Major Gift Donor", "Board Affiliation", "Healthcare Focus", "Columbus Area"],
    sharedOrganizations: ["Columbus Foundation", "United Way"],
    peerGaveToPrograms: ["Capital Campaign", "Annual Fund", "Endowment"],
    personNotYetAskedFor: ["Capital Campaign", "Planned Giving"],
    peerTotalGiving: 850000,
    peerLargestGift: 250000,
    lastGiftDate: "2024-09-15",
    potentialAsk: 150000,
    status: 'new'
  },
  {
    id: 2,
    sourceDonorName: "Michael Rodriguez",
    sourceDonorTitle: "CEO",
    peerDonorName: "Dr. William Foster",
    peerDonorTitle: "Chief Medical Officer",
    similarityScore: 0.89,
    sharedCharacteristics: ["Executive Leader", "Healthcare", "Tech Investor", "Stanford Alumni"],
    sharedOrganizations: ["Tech Hub Ohio", "Children's Hospital"],
    peerGaveToPrograms: ["Research Initiative", "Scholarship Fund", "Equipment Fund"],
    personNotYetAskedFor: ["Research Initiative", "Equipment Fund"],
    peerTotalGiving: 420000,
    peerLargestGift: 100000,
    lastGiftDate: "2024-11-02",
    potentialAsk: 75000,
    status: 'contacted'
  },
  {
    id: 3,
    sourceDonorName: "Jennifer Williams",
    sourceDonorTitle: "Philanthropist",
    peerDonorName: "Elizabeth Hartman",
    peerDonorTitle: "Foundation Director",
    similarityScore: 0.87,
    sharedCharacteristics: ["Arts Supporter", "Women's Initiatives", "Education Focus"],
    sharedOrganizations: ["Arts Council", "United Way"],
    peerGaveToPrograms: ["Arts Education", "Youth Programs", "Scholarship Fund"],
    personNotYetAskedFor: ["Arts Education", "Youth Programs"],
    peerTotalGiving: 380000,
    peerLargestGift: 75000,
    lastGiftDate: "2024-08-20",
    potentialAsk: 50000,
    status: 'cultivating'
  },
  {
    id: 4,
    sourceDonorName: "David Kim",
    sourceDonorTitle: "Managing Partner",
    peerDonorName: "Robert Chang",
    peerDonorTitle: "Venture Capitalist",
    similarityScore: 0.85,
    sharedCharacteristics: ["Tech Industry", "Asian American Network", "Startup Mentor"],
    sharedOrganizations: ["OSU Foundation", "Innovation Center"],
    peerGaveToPrograms: ["Innovation Fund", "STEM Scholarships", "Entrepreneurship Center"],
    personNotYetAskedFor: ["Innovation Fund", "Entrepreneurship Center"],
    peerTotalGiving: 520000,
    peerLargestGift: 150000,
    lastGiftDate: "2024-10-10",
    potentialAsk: 100000,
    status: 'new'
  },
  {
    id: 5,
    sourceDonorName: "Lisa Brown",
    sourceDonorTitle: "VP Development",
    peerDonorName: "Patricia Morrison",
    peerDonorTitle: "Retired Executive",
    similarityScore: 0.82,
    sharedCharacteristics: ["Nonprofit Leadership", "Community Builder", "Monthly Donor"],
    sharedOrganizations: ["Columbus Foundation", "Community Trust"],
    peerGaveToPrograms: ["Community Development", "Workforce Training", "Housing Initiative"],
    personNotYetAskedFor: ["Workforce Training", "Housing Initiative"],
    peerTotalGiving: 175000,
    peerLargestGift: 35000,
    lastGiftDate: "2024-12-01",
    potentialAsk: 25000,
    status: 'converted'
  },
  {
    id: 6,
    sourceDonorName: "Robert Thompson",
    sourceDonorTitle: "Founder",
    peerDonorName: "James Sullivan",
    peerDonorTitle: "Real Estate Developer",
    similarityScore: 0.79,
    sharedCharacteristics: ["Business Owner", "Property Investor", "Community Advocate"],
    sharedOrganizations: ["Arts Council", "Downtown Partnership"],
    peerGaveToPrograms: ["Capital Projects", "Historic Preservation", "Urban Development"],
    personNotYetAskedFor: ["Capital Projects", "Historic Preservation"],
    peerTotalGiving: 290000,
    peerLargestGift: 80000,
    lastGiftDate: "2024-07-15",
    potentialAsk: 60000,
    status: 'contacted'
  },
  {
    id: 7,
    sourceDonorName: "Amanda Foster",
    sourceDonorTitle: "Director",
    peerDonorName: "Nicole Peterson",
    peerDonorTitle: "Marketing VP",
    similarityScore: 0.76,
    sharedCharacteristics: ["Young Professional", "Women in Leadership", "Event Volunteer"],
    sharedOrganizations: ["Youth Alliance", "Cultural Alliance"],
    peerGaveToPrograms: ["Leadership Program", "Young Professionals Network", "Mentorship Initiative"],
    personNotYetAskedFor: ["Leadership Program", "Mentorship Initiative"],
    peerTotalGiving: 45000,
    peerLargestGift: 10000,
    lastGiftDate: "2024-11-20",
    potentialAsk: 15000,
    status: 'new'
  },
  {
    id: 8,
    sourceDonorName: "Steven White",
    sourceDonorTitle: "Board Member",
    peerDonorName: "Thomas Richardson",
    peerDonorTitle: "Attorney",
    similarityScore: 0.73,
    sharedCharacteristics: ["Legal Professional", "Estate Planning", "Planned Giving Donor"],
    sharedOrganizations: ["Senior Services", "Community Trust"],
    peerGaveToPrograms: ["Planned Giving", "Legal Aid Fund", "Senior Programs"],
    personNotYetAskedFor: ["Legal Aid Fund"],
    peerTotalGiving: 320000,
    peerLargestGift: 100000,
    lastGiftDate: "2024-06-30",
    potentialAsk: 50000,
    status: 'cultivating'
  }
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export default function PeerDonors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("similarity");

  // Filter and sort peer donors
  let filteredDonors = samplePeerDonors.filter(peer => {
    const matchesSearch = searchQuery === "" || 
      peer.sourceDonorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      peer.peerDonorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      peer.sharedCharacteristics.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || peer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort
  filteredDonors = [...filteredDonors].sort((a, b) => {
    switch (sortBy) {
      case 'similarity':
        return b.similarityScore - a.similarityScore;
      case 'potential':
        return b.potentialAsk - a.potentialAsk;
      case 'giving':
        return b.peerTotalGiving - a.peerTotalGiving;
      case 'recent':
        return new Date(b.lastGiftDate).getTime() - new Date(a.lastGiftDate).getTime();
      default:
        return 0;
    }
  });

  const totalPeers = samplePeerDonors.length;
  const avgMatchScore = samplePeerDonors.reduce((sum, p) => sum + (p.similarityScore * 100), 0) / samplePeerDonors.length;
  const highPotential = samplePeerDonors.filter(p => p.similarityScore >= 0.8).length;
  const totalPotentialValue = samplePeerDonors.reduce((sum, p) => sum + p.potentialAsk, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'contacted': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'cultivating': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'converted': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Peer Donor Discovery</h1>
          <p className="text-sm text-muted-foreground">
            AI-powered peer donor matching based on giving patterns and affinities
          </p>
        </div>
        <Button data-testid="button-add-peer-connection">
          <Plus className="w-4 h-4 mr-2" />
          Add Connection
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-6 border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(111, 187, 211, 0.15)' }}>
              <Users className="w-5 h-5" style={{ color: '#6FBBD3' }} />
            </div>
          </div>
          <div className="text-2xl font-semibold tabular-nums">{totalPeers}</div>
          <div className="text-sm text-muted-foreground">Peer Connections</div>
        </Card>
        <Card className="p-6 border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(156, 176, 113, 0.15)' }}>
              <Star className="w-5 h-5" style={{ color: '#9CB071' }} />
            </div>
          </div>
          <div className="text-2xl font-semibold tabular-nums">{avgMatchScore.toFixed(0)}%</div>
          <div className="text-sm text-muted-foreground">Avg Match Score</div>
        </Card>
        <Card className="p-6 border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(232, 146, 58, 0.15)' }}>
              <TrendingUp className="w-5 h-5" style={{ color: '#E8923A' }} />
            </div>
          </div>
          <div className="text-2xl font-semibold tabular-nums">{highPotential}</div>
          <div className="text-sm text-muted-foreground">High Potential (80%+)</div>
        </Card>
        <Card className="p-6 border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(127, 163, 161, 0.15)' }}>
              <DollarSign className="w-5 h-5" style={{ color: '#7FA3A1' }} />
            </div>
          </div>
          <div className="text-2xl font-semibold tabular-nums">{formatCurrency(totalPotentialValue)}</div>
          <div className="text-sm text-muted-foreground">Potential Pipeline</div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search donors or characteristics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-peers"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]" data-testid="select-status-filter">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="cultivating">Cultivating</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]" data-testid="select-sort-by">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="similarity">Highest Match</SelectItem>
            <SelectItem value="potential">Potential Ask</SelectItem>
            <SelectItem value="giving">Total Giving</SelectItem>
            <SelectItem value="recent">Most Recent Gift</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Peer Donor Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredDonors.length > 0 ? (
          filteredDonors.map((peer) => (
            <Card key={peer.id} className="border hover-elevate cursor-pointer" data-testid={`card-peer-${peer.id}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Header with both donors */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-cyan-700 dark:text-cyan-300 font-semibold">
                          {peer.sourceDonorName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{peer.sourceDonorName}</p>
                          <p className="text-xs text-muted-foreground">{peer.sourceDonorTitle}</p>
                        </div>
                      </div>
                      
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                      
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-semibold">
                          {peer.peerDonorName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{peer.peerDonorName}</p>
                          <p className="text-xs text-muted-foreground">{peer.peerDonorTitle}</p>
                        </div>
                      </div>

                      <div className="ml-auto flex items-center gap-2">
                        <Badge className={getStatusColor(peer.status)}>
                          {peer.status.charAt(0).toUpperCase() + peer.status.slice(1)}
                        </Badge>
                        <Badge variant={peer.similarityScore >= 0.8 ? "default" : "secondary"}>
                          {Math.round(peer.similarityScore * 100)}% Match
                        </Badge>
                      </div>
                    </div>

                    {/* Shared Characteristics */}
                    <div className="mb-4">
                      <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        Shared Characteristics
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {peer.sharedCharacteristics.map((char, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {char}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Shared Organizations */}
                    {peer.sharedOrganizations.length > 0 && (
                      <div className="mb-4">
                        <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          Shared Organizations
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {peer.sharedOrganizations.map((org, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {org}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Opportunity Section */}
                    {peer.personNotYetAskedFor.length > 0 && (
                      <div className="p-3 bg-primary/5 rounded-md border border-primary/20 mb-4">
                        <div className="text-xs font-medium text-foreground mb-2 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-primary" />
                          Opportunity: Programs your donor hasn't been asked for yet
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {peer.personNotYetAskedFor.map((program, idx) => (
                            <Badge key={idx} variant="default" className="text-xs">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Peer Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t">
                      <div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          Peer Total Giving
                        </div>
                        <div className="font-semibold">{formatCurrency(peer.peerTotalGiving)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Largest Gift
                        </div>
                        <div className="font-semibold">{formatCurrency(peer.peerLargestGift)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Last Gift
                        </div>
                        <div className="font-semibold">{new Date(peer.lastGiftDate).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Potential Ask
                        </div>
                        <div className="font-semibold text-primary">{formatCurrency(peer.potentialAsk)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="p-12 text-center border">
            <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Matching Peer Connections</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button size="sm" onClick={() => { setSearchQuery(""); setStatusFilter("all"); }} data-testid="button-clear-filters">
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
