import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Users, 
  DollarSign, 
  Heart, 
  Trophy, 
  Package,
  Search,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Filter
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CorporatePartnership } from "@shared/schema";

const partnershipTypeLabels: Record<string, { label: string; icon: typeof Heart; color: string }> = {
  volunteer: { label: "Volunteer", icon: Users, color: "bg-green-100 text-green-700" },
  donate: { label: "Financial", icon: DollarSign, color: "bg-blue-100 text-blue-700" },
  sponsor: { label: "Sponsor", icon: Trophy, color: "bg-purple-100 text-purple-700" },
  goods_services: { label: "Goods & Services", icon: Package, color: "bg-orange-100 text-orange-700" },
};

export default function CorporatePartnershipsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const { data: partnerships, isLoading } = useQuery<CorporatePartnership[]>({
    queryKey: ["/api/corporate-partnerships"],
  });

  const filteredPartnerships = partnerships?.filter((p) => {
    const matchesSearch = p.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.industry?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || p.partnershipTypes?.includes(filterType);
    const matchesStatus = filterStatus === "all" || p.partnershipStatus === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  }) || [];

  const totalContributions = partnerships?.reduce((sum, p) => sum + Number(p.totalContributions || 0), 0) || 0;
  const totalVolunteerHours = partnerships?.reduce((sum, p) => sum + (p.volunteerHours || 0), 0) || 0;
  const activePartners = partnerships?.filter(p => p.partnershipStatus === "active").length || 0;
  const totalVolunteers = partnerships?.reduce((sum, p) => sum + (p.volunteerCount || 0), 0) || 0;

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Corporate Partnerships</h1>
        <p className="text-sm text-muted-foreground">
          Manage and track partnerships with corporate sponsors, volunteers, and donors
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border" style={{ backgroundColor: 'rgba(222, 235, 247, 0.3)' }}>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Partners</CardTitle>
            <Building2 className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>{activePartners}</div>
            <p className="text-xs text-muted-foreground mt-1">
              of {partnerships?.length || 0} total
            </p>
          </CardContent>
        </Card>

        <Card className="border" style={{ backgroundColor: 'rgba(222, 235, 247, 0.3)' }}>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contributions</CardTitle>
            <DollarSign className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>
              ${totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">All-time giving</p>
          </CardContent>
        </Card>

        <Card className="border" style={{ backgroundColor: 'rgba(222, 235, 247, 0.3)' }}>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volunteer Hours</CardTitle>
            <Clock className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>
              {totalVolunteerHours.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Hours contributed</p>
          </CardContent>
        </Card>

        <Card className="border" style={{ backgroundColor: 'rgba(222, 235, 247, 0.3)' }}>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volunteers</CardTitle>
            <Users className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>{totalVolunteers}</div>
            <p className="text-xs text-muted-foreground mt-1">Corporate volunteers</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search partners by name or industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-partners"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]" data-testid="select-filter-type">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Partnership Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="volunteer">Volunteer</SelectItem>
            <SelectItem value="donate">Financial</SelectItem>
            <SelectItem value="sponsor">Sponsor</SelectItem>
            <SelectItem value="goods_services">Goods & Services</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]" data-testid="select-filter-status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="prospect">Prospect</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-80 w-full rounded-lg" />
          ))}
        </div>
      ) : filteredPartnerships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartnerships.map((partner) => (
            <Link key={partner.id} href={`/corporate-partnerships/${partner.id}`}>
              <Card 
                className="h-full border cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
                data-testid={`card-partner-${partner.id}`}
              >
                <CardHeader className="pb-3" style={{ backgroundColor: 'rgba(222, 235, 247, 0.3)' }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {partner.logoUrl ? (
                        <img 
                          src={partner.logoUrl}
                          alt={`${partner.companyName} logo`}
                          className="w-12 h-12 object-contain rounded-lg bg-white p-1 border"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className={`w-12 h-12 rounded-lg bg-primary/10 items-center justify-center ${partner.logoUrl ? 'hidden' : 'flex'}`}
                        style={{ display: partner.logoUrl ? 'none' : 'flex' }}
                      >
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg leading-tight">{partner.companyName}</CardTitle>
                        <p className="text-xs text-muted-foreground">{partner.industry}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={partner.partnershipStatus === 'active' ? 'default' : 'secondary'}
                      className={partner.partnershipStatus === 'active' ? 'bg-green-100 text-green-700' : ''}
                    >
                      {partner.partnershipStatus}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {partner.description || "No description available."}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {partner.partnershipTypes?.map((type) => {
                      const config = partnershipTypeLabels[type];
                      if (!config) return null;
                      const Icon = config.icon;
                      return (
                        <Badge key={type} variant="outline" className={`text-xs ${config.color}`}>
                          <Icon className="w-3 h-3 mr-1" />
                          {config.label}
                        </Badge>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Contributions</p>
                      <p className="font-semibold" style={{ color: "#084594" }}>
                        ${Number(partner.totalContributions || 0).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Volunteer Hours</p>
                      <p className="font-semibold" style={{ color: "#084594" }}>
                        {(partner.volunteerHours || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {partner.contactName && (
                    <div className="flex items-center gap-2 text-sm pt-2 border-t">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <Users className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{partner.contactName}</p>
                        <p className="text-xs text-muted-foreground">{partner.contactTitle}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    {partner.partnershipStartYear && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        Partner since {partner.partnershipStartYear}
                      </div>
                    )}
                    <Button variant="ghost" size="sm" className="ml-auto">
                      View Details
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No partners found</h3>
          <p className="text-sm text-muted-foreground">
            {searchQuery || filterType !== "all" || filterStatus !== "all"
              ? "Try adjusting your search or filters."
              : "Corporate partnerships will appear here once added."}
          </p>
        </Card>
      )}
    </div>
  );
}
