import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Search, TrendingUp, DollarSign, Calendar, Filter } from "lucide-react";
import { useState } from "react";

// Dummy data for MGO portfolio
const portfolioDonors = [
  { id: 1, name: "Sarah Chen", engagementScore: 92, capacityScore: 88, affinityScore: 95, totalGiving: 450000, lastGift: "2024-10-15", nextAction: "Schedule cultivation dinner", segment: "Major Donor", status: "Active" },
  { id: 2, name: "Michael Roberts", engagementScore: 85, capacityScore: 95, affinityScore: 78, totalGiving: 325000, lastGift: "2024-09-22", nextAction: "Send impact report", segment: "Major Donor", status: "Active" },
  { id: 3, name: "Jennifer Liu", engagementScore: 78, capacityScore: 82, affinityScore: 88, totalGiving: 175000, lastGift: "2024-10-01", nextAction: "Invite to annual gala", segment: "Mid-Level", status: "Active" },
  { id: 4, name: "David Thompson", engagementScore: 95, capacityScore: 90, affinityScore: 92, totalGiving: 520000, lastGift: "2024-10-20", nextAction: "Discuss capital campaign", segment: "Principal", status: "Active" },
  { id: 5, name: "Amanda Foster", engagementScore: 72, capacityScore: 85, affinityScore: 65, totalGiving: 215000, lastGift: "2024-08-15", nextAction: "Re-engagement call", segment: "Major Donor", status: "At Risk" },
  { id: 6, name: "Robert Martinez", engagementScore: 88, capacityScore: 78, affinityScore: 90, totalGiving: 195000, lastGift: "2024-09-30", nextAction: "Share program update", segment: "Mid-Level", status: "Active" },
  { id: 7, name: "Lisa Anderson", engagementScore: 90, capacityScore: 92, affinityScore: 85, totalGiving: 380000, lastGift: "2024-10-12", nextAction: "Board nomination discussion", segment: "Major Donor", status: "Active" },
  { id: 8, name: "James Wilson", engagementScore: 65, capacityScore: 88, affinityScore: 70, totalGiving: 265000, lastGift: "2024-07-20", nextAction: "Send quarterly newsletter", segment: "Major Donor", status: "At Risk" },
  { id: 9, name: "Patricia Lee", engagementScore: 82, capacityScore: 80, affinityScore: 88, totalGiving: 145000, lastGift: "2024-10-05", nextAction: "Schedule facility tour", segment: "Mid-Level", status: "Active" },
  { id: 10, name: "Christopher Davis", engagementScore: 92, capacityScore: 96, affinityScore: 90, totalGiving: 625000, lastGift: "2024-10-18", nextAction: "Present naming opportunity", segment: "Principal", status: "Active" },
  { id: 11, name: "Emily Johnson", engagementScore: 80, capacityScore: 75, affinityScore: 85, totalGiving: 120000, lastGift: "2024-09-25", nextAction: "Invite to donor appreciation event", segment: "Mid-Level", status: "Active" },
  { id: 12, name: "Daniel Brown", engagementScore: 75, capacityScore: 90, affinityScore: 72, totalGiving: 295000, lastGift: "2024-08-30", nextAction: "Follow up on planned giving", segment: "Major Donor", status: "Cultivation" },
];

const segments = [
  { name: "Principal ($250K+)", count: 2, totalValue: 1145000, avgGift: 572500 },
  { name: "Major Donor ($100K+)", count: 5, totalValue: 1545000, avgGift: 309000 },
  { name: "Mid-Level ($50K+)", count: 5, totalValue: 775000, avgGift: 155000 },
];

export default function MGOPortfolioDetail() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  const filteredDonors = portfolioDonors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSegment = !selectedSegment || donor.segment === selectedSegment;
    return matchesSearch && matchesSegment;
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">My Portfolio</h1>
        <p className="text-sm text-muted-foreground">
          Manage and track your assigned donor relationships
        </p>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Donors</p>
                <p className="text-3xl font-bold text-primary mt-1">12</p>
              </div>
              <Users className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lifetime Value</p>
                <p className="text-3xl font-bold text-primary mt-1">$3.5M</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Engagement</p>
                <p className="text-3xl font-bold text-primary mt-1">83</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Actions Due</p>
                <p className="text-3xl font-bold text-primary mt-1">7</p>
              </div>
              <Calendar className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Segment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {segments.map((segment) => (
          <Card key={segment.name} className="hover-elevate cursor-pointer" onClick={() => setSelectedSegment(segment.name)}>
            <CardHeader>
              <CardTitle className="text-base">{segment.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Donors</span>
                <span className="text-lg font-semibold">{segment.count}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Value</span>
                <span className="text-lg font-semibold">${(segment.totalValue / 1000).toFixed(0)}K</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg Gift</span>
                <span className="text-lg font-semibold">${(segment.avgGift / 1000).toFixed(0)}K</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle>Portfolio Details</CardTitle>
            <div className="flex items-center gap-2">
              {selectedSegment && (
                <Badge variant="secondary" className="gap-1">
                  {selectedSegment}
                  <button onClick={() => setSelectedSegment(null)} className="ml-1">×</button>
                </Badge>
              )}
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search donors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  data-testid="input-search-donors"
                />
              </div>
              <Button variant="outline" size="icon" data-testid="button-filter">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredDonors.map((donor) => (
              <div
                key={donor.id}
                className="border rounded-lg p-4 hover-elevate cursor-pointer"
                data-testid={`donor-row-${donor.id}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                  <div className="md:col-span-2">
                    <h3 className="font-semibold">{donor.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{donor.nextAction}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Segment</p>
                    <Badge variant="secondary" className="mt-1">{donor.segment}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Giving</p>
                    <p className="font-semibold mt-1">${(donor.totalGiving / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Scores (E/C/A)</p>
                    <div className="flex gap-1 mt-1">
                      <Badge variant="outline" className="text-xs">{donor.engagementScore}</Badge>
                      <Badge variant="outline" className="text-xs">{donor.capacityScore}</Badge>
                      <Badge variant="outline" className="text-xs">{donor.affinityScore}</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <Badge 
                      variant={donor.status === "Active" ? "default" : donor.status === "At Risk" ? "destructive" : "secondary"}
                      className="mt-1"
                    >
                      {donor.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
