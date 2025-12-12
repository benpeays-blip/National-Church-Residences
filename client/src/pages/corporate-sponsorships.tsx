import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Building2,
  Calendar,
  DollarSign,
  Search,
  Filter,
  Star,
  CheckCircle,
  Clock,
  ArrowRight,
  MapPin,
  Users,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Sponsorship {
  id: string;
  companyName: string;
  logoUrl?: string;
  sponsorshipType: "event" | "program" | "naming" | "media";
  eventOrProgram: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: "active" | "pending" | "expired" | "renewed";
  benefits: string[];
  contactName: string;
  contactTitle: string;
  renewalProbability?: number;
}

const mockSponsorships: Sponsorship[] = [
  {
    id: "1",
    companyName: "Nationwide Insurance",
    logoUrl: "https://logo.clearbit.com/nationwide.com",
    sponsorshipType: "event",
    eventOrProgram: "Annual Gala 2024",
    amount: 75000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    benefits: ["Premier table (10 seats)", "Logo on all materials", "Speaking opportunity", "VIP reception access"],
    contactName: "Jennifer Walsh",
    contactTitle: "Community Relations Director",
    renewalProbability: 85,
  },
  {
    id: "2",
    companyName: "Cardinal Health",
    logoUrl: "https://logo.clearbit.com/cardinalhealth.com",
    sponsorshipType: "naming",
    eventOrProgram: "Cardinal Health Wellness Center",
    amount: 500000,
    startDate: "2023-01-01",
    endDate: "2027-12-31",
    status: "active",
    benefits: ["Naming rights (5 years)", "Permanent signage", "Annual recognition event", "Board seat observer"],
    contactName: "Michael Torres",
    contactTitle: "VP Corporate Philanthropy",
    renewalProbability: 90,
  },
  {
    id: "3",
    companyName: "Huntington Bank",
    logoUrl: "https://logo.clearbit.com/huntington.com",
    sponsorshipType: "program",
    eventOrProgram: "Financial Literacy Program",
    amount: 35000,
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    status: "active",
    benefits: ["Program branding", "Employee volunteer opportunities", "Quarterly impact reports"],
    contactName: "Sarah Chen",
    contactTitle: "Community Investment Manager",
    renewalProbability: 75,
  },
  {
    id: "4",
    companyName: "L Brands Foundation",
    logoUrl: "https://logo.clearbit.com/lb.com",
    sponsorshipType: "event",
    eventOrProgram: "Spring Fundraiser Luncheon",
    amount: 25000,
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    status: "pending",
    benefits: ["Table sponsor", "Logo recognition", "Social media feature"],
    contactName: "Amanda Foster",
    contactTitle: "Foundation Director",
  },
  {
    id: "5",
    companyName: "Ohio State University",
    logoUrl: "https://logo.clearbit.com/osu.edu",
    sponsorshipType: "program",
    eventOrProgram: "Student Internship Program",
    amount: 20000,
    startDate: "2023-08-01",
    endDate: "2024-05-31",
    status: "active",
    benefits: ["Intern placements", "Research partnership", "Guest lectures"],
    contactName: "Dr. Robert Kim",
    contactTitle: "Director of Community Partnerships",
    renewalProbability: 80,
  },
  {
    id: "6",
    companyName: "AEP Ohio",
    logoUrl: "https://logo.clearbit.com/aep.com",
    sponsorshipType: "media",
    eventOrProgram: "Annual Report & Impact Video",
    amount: 15000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    benefits: ["Logo placement", "Video feature", "Annual report ad space"],
    contactName: "Patricia Lane",
    contactTitle: "External Affairs Manager",
    renewalProbability: 70,
  },
];

const sponsorshipTypeLabels: Record<string, { label: string; color: string }> = {
  event: { label: "Event Sponsor", color: "bg-purple-100 text-purple-700" },
  program: { label: "Program Sponsor", color: "bg-blue-100 text-blue-700" },
  naming: { label: "Naming Rights", color: "bg-amber-100 text-amber-700" },
  media: { label: "Media Sponsor", color: "bg-green-100 text-green-700" },
};

const statusLabels: Record<string, { label: string; color: string }> = {
  active: { label: "Active", color: "bg-green-100 text-green-700" },
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700" },
  expired: { label: "Expired", color: "bg-gray-100 text-gray-600" },
  renewed: { label: "Renewed", color: "bg-blue-100 text-blue-700" },
};

export default function CorporateSponsorships() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredSponsorships = mockSponsorships.filter((s) => {
    const matchesSearch =
      s.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.eventOrProgram.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || s.sponsorshipType === filterType;
    const matchesStatus = filterStatus === "all" || s.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalValue = mockSponsorships.reduce((sum, s) => sum + s.amount, 0);
  const activeCount = mockSponsorships.filter((s) => s.status === "active").length;
  const namingRightsValue = mockSponsorships
    .filter((s) => s.sponsorshipType === "naming")
    .reduce((sum, s) => sum + s.amount, 0);
  const upcomingRenewals = mockSponsorships.filter(
    (s) => s.status === "active" && new Date(s.endDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
  ).length;

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Sponsorships</h1>
        <p className="text-sm text-muted-foreground">
          Track event sponsorships, program sponsorships, and naming opportunities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }} data-testid="metric-total-sponsorship-value">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sponsorship Value</CardTitle>
            <DollarSign className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>
              ${totalValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Active commitments</p>
          </CardContent>
        </Card>

        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }} data-testid="metric-active-sponsorships">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sponsorships</CardTitle>
            <Trophy className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>{activeCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Current sponsors</p>
          </CardContent>
        </Card>

        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }} data-testid="metric-naming-rights">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Naming Rights Value</CardTitle>
            <Star className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>
              ${namingRightsValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Premium partnerships</p>
          </CardContent>
        </Card>

        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }} data-testid="metric-upcoming-renewals">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Renewals</CardTitle>
            <Clock className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>{upcomingRenewals}</div>
            <p className="text-xs text-muted-foreground mt-1">Next 90 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by company or event..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-sponsorships"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]" data-testid="select-filter-type">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sponsorship Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="event">Event Sponsor</SelectItem>
            <SelectItem value="program">Program Sponsor</SelectItem>
            <SelectItem value="naming">Naming Rights</SelectItem>
            <SelectItem value="media">Media Sponsor</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[160px]" data-testid="select-filter-status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="renewed">Renewed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSponsorships.map((sponsorship) => (
          <Card
            key={sponsorship.id}
            className="border hover:shadow-lg transition-shadow cursor-pointer"
            data-testid={`card-sponsorship-${sponsorship.id}`}
          >
            <CardHeader className="pb-3" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {sponsorship.logoUrl ? (
                    <img
                      src={sponsorship.logoUrl}
                      alt={`${sponsorship.companyName} logo`}
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
                    <CardTitle className="text-lg">{sponsorship.companyName}</CardTitle>
                    <p className="text-sm text-muted-foreground">{sponsorship.eventOrProgram}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <Badge className={sponsorshipTypeLabels[sponsorship.sponsorshipType].color}>
                    {sponsorshipTypeLabels[sponsorship.sponsorshipType].label}
                  </Badge>
                  <Badge className={statusLabels[sponsorship.status].color}>
                    {statusLabels[sponsorship.status].label}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Sponsorship Value</p>
                  <p className="text-xl font-bold" style={{ color: "#084594" }}>
                    ${sponsorship.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Term</p>
                  <p className="text-sm font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(sponsorship.startDate).toLocaleDateString()} - {new Date(sponsorship.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-2">Benefits</p>
                <div className="flex flex-wrap gap-1">
                  {sponsorship.benefits.slice(0, 3).map((benefit, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {benefit}
                    </Badge>
                  ))}
                  {sponsorship.benefits.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{sponsorship.benefits.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {sponsorship.renewalProbability && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-muted-foreground">Renewal Probability</p>
                    <span className="text-xs font-medium" style={{ color: "#084594" }}>
                      {sponsorship.renewalProbability}%
                    </span>
                  </div>
                  <Progress value={sponsorship.renewalProbability} className="h-2" />
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{sponsorship.contactName}</p>
                    <p className="text-xs text-muted-foreground">{sponsorship.contactTitle}</p>
                  </div>
                </div>
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
