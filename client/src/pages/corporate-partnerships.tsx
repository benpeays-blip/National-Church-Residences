import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
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
  Filter,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronUp,
  X
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
import type { CorporatePartnership } from "@shared/schema";

const partnershipTypeLabels: Record<string, { label: string; icon: typeof Heart; color: string }> = {
  volunteer: { label: "Volunteer", icon: Users, color: "bg-green-100 text-green-700" },
  donate: { label: "Financial", icon: DollarSign, color: "bg-blue-100 text-blue-700" },
  sponsor: { label: "Sponsor", icon: Trophy, color: "bg-purple-100 text-purple-700" },
  goods_services: { label: "Goods & Services", icon: Package, color: "bg-orange-100 text-orange-700" },
};

type MetricType = 'active' | 'contributions' | 'hours' | 'volunteers' | null;
type ViewMode = 'gallery' | 'list';

interface MetricBreakdown {
  company: string;
  value: number | string;
  percentage?: number;
  logoUrl?: string;
}

export default function CorporatePartnershipsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [expandedMetric, setExpandedMetric] = useState<MetricType>(null);
  const [metricViewMode, setMetricViewMode] = useState<ViewMode>('list');
  const [partnersViewMode, setPartnersViewMode] = useState<ViewMode>('gallery');

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

  const getMetricBreakdown = (metric: MetricType): MetricBreakdown[] => {
    if (!partnerships) return [];
    
    switch (metric) {
      case 'active':
        return partnerships
          .filter(p => p.partnershipStatus === 'active')
          .map(p => ({
            company: p.companyName,
            value: p.partnershipStatus || 'active',
            logoUrl: p.logoUrl || undefined,
          }));
      case 'contributions':
        return partnerships
          .filter(p => Number(p.totalContributions) > 0)
          .sort((a, b) => Number(b.totalContributions) - Number(a.totalContributions))
          .map(p => ({
            company: p.companyName,
            value: Number(p.totalContributions || 0),
            percentage: totalContributions > 0 ? Math.round((Number(p.totalContributions) / totalContributions) * 100) : 0,
            logoUrl: p.logoUrl || undefined,
          }));
      case 'hours':
        return partnerships
          .filter(p => (p.volunteerHours || 0) > 0)
          .sort((a, b) => (b.volunteerHours || 0) - (a.volunteerHours || 0))
          .map(p => ({
            company: p.companyName,
            value: p.volunteerHours || 0,
            percentage: totalVolunteerHours > 0 ? Math.round(((p.volunteerHours || 0) / totalVolunteerHours) * 100) : 0,
            logoUrl: p.logoUrl || undefined,
          }));
      case 'volunteers':
        return partnerships
          .filter(p => (p.volunteerCount || 0) > 0)
          .sort((a, b) => (b.volunteerCount || 0) - (a.volunteerCount || 0))
          .map(p => ({
            company: p.companyName,
            value: p.volunteerCount || 0,
            percentage: totalVolunteers > 0 ? Math.round(((p.volunteerCount || 0) / totalVolunteers) * 100) : 0,
            logoUrl: p.logoUrl || undefined,
          }));
      default:
        return [];
    }
  };

  const getMetricTitle = (metric: MetricType): string => {
    switch (metric) {
      case 'active': return 'Active Partners Breakdown';
      case 'contributions': return 'Contributions by Organization';
      case 'hours': return 'Volunteer Hours by Organization';
      case 'volunteers': return 'Volunteers by Organization';
      default: return '';
    }
  };

  const formatMetricValue = (metric: MetricType, value: number | string): string => {
    if (metric === 'active') return String(value);
    if (metric === 'contributions') return `$${Number(value).toLocaleString()}`;
    if (metric === 'hours') return `${Number(value).toLocaleString()} hrs`;
    if (metric === 'volunteers') return `${Number(value).toLocaleString()} volunteers`;
    return String(value);
  };

  const toggleMetric = (metric: MetricType) => {
    setExpandedMetric(expandedMetric === metric ? null : metric);
  };

  const breakdown = expandedMetric ? getMetricBreakdown(expandedMetric) : [];

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Corporate Partnerships</h1>
        <p className="text-sm text-muted-foreground">
          Manage and track partnerships with corporate sponsors, volunteers, and donors
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card 
          className={`border cursor-pointer transition-all hover:shadow-md ${expandedMetric === 'active' ? 'ring-2 ring-primary' : ''}`}
          style={{ backgroundColor: 'rgba(222, 235, 247, 0.3)' }}
          onClick={() => toggleMetric('active')}
          data-testid="metric-active-partners"
        >
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Partners</CardTitle>
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" style={{ color: "#084594" }} />
              {expandedMetric === 'active' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>{activePartners}</div>
            <p className="text-xs text-muted-foreground mt-1">
              of {partnerships?.length || 0} total
            </p>
          </CardContent>
        </Card>

        <Card 
          className={`border cursor-pointer transition-all hover:shadow-md ${expandedMetric === 'contributions' ? 'ring-2 ring-primary' : ''}`}
          style={{ backgroundColor: 'rgba(222, 235, 247, 0.3)' }}
          onClick={() => toggleMetric('contributions')}
          data-testid="metric-total-contributions"
        >
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contributions</CardTitle>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" style={{ color: "#084594" }} />
              {expandedMetric === 'contributions' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>
              ${totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">All-time giving</p>
          </CardContent>
        </Card>

        <Card 
          className={`border cursor-pointer transition-all hover:shadow-md ${expandedMetric === 'hours' ? 'ring-2 ring-primary' : ''}`}
          style={{ backgroundColor: 'rgba(222, 235, 247, 0.3)' }}
          onClick={() => toggleMetric('hours')}
          data-testid="metric-volunteer-hours"
        >
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volunteer Hours</CardTitle>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" style={{ color: "#084594" }} />
              {expandedMetric === 'hours' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>
              {totalVolunteerHours.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Hours contributed</p>
          </CardContent>
        </Card>

        <Card 
          className={`border cursor-pointer transition-all hover:shadow-md ${expandedMetric === 'volunteers' ? 'ring-2 ring-primary' : ''}`}
          style={{ backgroundColor: 'rgba(222, 235, 247, 0.3)' }}
          onClick={() => toggleMetric('volunteers')}
          data-testid="metric-total-volunteers"
        >
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volunteers</CardTitle>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" style={{ color: "#084594" }} />
              {expandedMetric === 'volunteers' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>{totalVolunteers}</div>
            <p className="text-xs text-muted-foreground mt-1">Corporate volunteers</p>
          </CardContent>
        </Card>
      </div>

      {expandedMetric && breakdown.length > 0 && (
        <Card className="border animate-in slide-in-from-top-2 duration-200" data-testid="metric-breakdown-panel">
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3" style={{ backgroundColor: 'rgba(222, 235, 247, 0.3)' }}>
            <CardTitle className="text-lg">{getMetricTitle(expandedMetric)}</CardTitle>
            <div className="flex items-center gap-2">
              <div className="flex border rounded-lg overflow-hidden">
                <Button
                  variant={metricViewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={(e) => { e.stopPropagation(); setMetricViewMode('list'); }}
                  className="rounded-none"
                  data-testid="metric-view-list"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={metricViewMode === 'gallery' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={(e) => { e.stopPropagation(); setMetricViewMode('gallery'); }}
                  className="rounded-none"
                  data-testid="metric-view-gallery"
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setExpandedMetric(null)}
                data-testid="close-metric-breakdown"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {metricViewMode === 'list' ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Organization</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    {expandedMetric !== 'active' && <TableHead className="text-right">Share</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {breakdown.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {item.logoUrl ? (
                            <img src={item.logoUrl} alt="" className="w-6 h-6 object-contain rounded" />
                          ) : (
                            <Building2 className="w-5 h-5 text-muted-foreground" />
                          )}
                          <span className="font-medium">{item.company}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold" style={{ color: "#084594" }}>
                        {formatMetricValue(expandedMetric, item.value)}
                      </TableCell>
                      {expandedMetric !== 'active' && (
                        <TableCell className="text-right text-muted-foreground">
                          {item.percentage}%
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {breakdown.map((item, idx) => (
                  <Card key={idx} className="p-4 border hover-elevate">
                    <div className="flex items-center gap-2 mb-2">
                      {item.logoUrl ? (
                        <img src={item.logoUrl} alt="" className="w-8 h-8 object-contain rounded" />
                      ) : (
                        <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                      <span className="font-medium text-sm truncate">{item.company}</span>
                    </div>
                    <div className="text-xl font-bold" style={{ color: "#084594" }}>
                      {formatMetricValue(expandedMetric, item.value)}
                    </div>
                    {expandedMetric !== 'active' && item.percentage !== undefined && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.percentage}% of total
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

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
        <div className="flex border rounded-lg overflow-hidden">
          <Button
            variant={partnersViewMode === 'gallery' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setPartnersViewMode('gallery')}
            className="rounded-none"
            data-testid="partners-view-gallery"
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            variant={partnersViewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setPartnersViewMode('list')}
            className="rounded-none"
            data-testid="partners-view-list"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-80 w-full rounded-lg" />
          ))}
        </div>
      ) : filteredPartnerships.length > 0 ? (
        partnersViewMode === 'gallery' ? (
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
          <Card className="border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Partner</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Types</TableHead>
                  <TableHead className="text-right">Contributions</TableHead>
                  <TableHead className="text-right">Volunteer Hours</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPartnerships.map((partner) => (
                  <TableRow key={partner.id} className="hover-elevate" data-testid={`row-partner-${partner.id}`}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {partner.logoUrl ? (
                          <img 
                            src={partner.logoUrl}
                            alt=""
                            className="w-8 h-8 object-contain rounded bg-white border p-0.5"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-primary" />
                          </div>
                        )}
                        <span className="font-medium">{partner.companyName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{partner.industry}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={partner.partnershipStatus === 'active' ? 'default' : 'secondary'}
                        className={partner.partnershipStatus === 'active' ? 'bg-green-100 text-green-700' : ''}
                      >
                        {partner.partnershipStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {partner.partnershipTypes?.slice(0, 2).map((type) => {
                          const config = partnershipTypeLabels[type];
                          if (!config) return null;
                          return (
                            <Badge key={type} variant="outline" className={`text-xs ${config.color}`}>
                              {config.label}
                            </Badge>
                          );
                        })}
                        {(partner.partnershipTypes?.length || 0) > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{(partner.partnershipTypes?.length || 0) - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold" style={{ color: "#084594" }}>
                      ${Number(partner.totalContributions || 0).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-semibold" style={{ color: "#084594" }}>
                      {(partner.volunteerHours || 0).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {partner.contactName || '-'}
                    </TableCell>
                    <TableCell>
                      <Link href={`/corporate-partnerships/${partner.id}`}>
                        <Button variant="ghost" size="sm">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )
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
