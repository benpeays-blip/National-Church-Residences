import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Users, 
  DollarSign, 
  Heart, 
  Trophy, 
  Package,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Globe,
  Briefcase,
  CheckCircle2,
  Target,
  History
} from "lucide-react";
import type { CorporatePartnership } from "@shared/schema";

const partnershipTypeLabels: Record<string, { label: string; icon: typeof Heart; color: string; bgColor: string }> = {
  volunteer: { label: "Volunteer Program", icon: Users, color: "text-green-700", bgColor: "bg-green-100" },
  donate: { label: "Financial Donor", icon: DollarSign, color: "text-blue-700", bgColor: "bg-blue-100" },
  sponsor: { label: "Event Sponsor", icon: Trophy, color: "text-purple-700", bgColor: "bg-purple-100" },
  goods_services: { label: "In-Kind Donations", icon: Package, color: "text-orange-700", bgColor: "bg-orange-100" },
};

export default function CorporatePartnershipDetail() {
  const params = useParams();
  const partnerId = params.id;

  const { data: partner, isLoading } = useQuery<CorporatePartnership>({
    queryKey: ["/api/corporate-partnerships", partnerId],
    enabled: !!partnerId,
  });

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="p-6">
        <Card className="p-12 text-center">
          <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Partner not found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            The corporate partner you're looking for doesn't exist.
          </p>
          <Link href="/corporate-partnerships">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <Link href="/corporate-partnerships">
        <Button variant="ghost" size="sm" className="mb-2" data-testid="button-back">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </Link>

      <Card className="overflow-hidden border-2 border-primary/20">
        <div 
          className="p-6"
          style={{ backgroundColor: "rgba(222, 235, 247, 0.5)" }}
        >
          <div className="flex items-start gap-6">
            {partner.logoUrl ? (
              <img 
                src={partner.logoUrl}
                alt={`${partner.companyName} logo`}
                className="w-24 h-24 object-contain rounded-xl bg-white p-3 border shadow-sm"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className={`w-24 h-24 rounded-xl bg-primary/10 items-center justify-center ${partner.logoUrl ? 'hidden' : 'flex'}`}
              style={{ display: partner.logoUrl ? 'none' : 'flex' }}
            >
              <Building2 className="w-12 h-12 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold" data-testid="text-partner-name">{partner.companyName}</h1>
                <Badge 
                  variant={partner.partnershipStatus === 'active' ? 'default' : 'secondary'}
                  className={partner.partnershipStatus === 'active' ? 'bg-green-100 text-green-700' : ''}
                >
                  {partner.partnershipStatus}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {partner.industry && (
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {partner.industry}
                  </span>
                )}
                {partner.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {partner.location}
                  </span>
                )}
                {partner.partnershipStartYear && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Partner since {partner.partnershipStartYear}
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm text-muted-foreground max-w-3xl">
                {partner.description}
              </p>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <DollarSign className="w-6 h-6 mx-auto mb-2" style={{ color: "#084594" }} />
              <div className="text-2xl font-bold" style={{ color: "#084594" }}>
                ${Number(partner.totalContributions || 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Total Contributions</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <Clock className="w-6 h-6 mx-auto mb-2" style={{ color: "#084594" }} />
              <div className="text-2xl font-bold" style={{ color: "#084594" }}>
                {(partner.volunteerHours || 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Volunteer Hours</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <Users className="w-6 h-6 mx-auto mb-2" style={{ color: "#084594" }} />
              <div className="text-2xl font-bold" style={{ color: "#084594" }}>
                {partner.volunteerCount || 0}
              </div>
              <p className="text-xs text-muted-foreground">Volunteers</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <Building2 className="w-6 h-6 mx-auto mb-2" style={{ color: "#084594" }} />
              <div className="text-2xl font-bold" style={{ color: "#084594" }}>
                {partner.employeeCount || 0}
              </div>
              <p className="text-xs text-muted-foreground">Employee Donors</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border">
          <CardHeader style={{ backgroundColor: 'rgba(222, 235, 247, 0.5)' }}>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Users className="w-5 h-5" style={{ color: "#084594" }} />
              Primary Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {partner.contactName ? (
              <>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{partner.contactName}</h3>
                    <p className="text-sm text-muted-foreground">{partner.contactTitle}</p>
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  {partner.contactEmail && (
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a href={`mailto:${partner.contactEmail}`} className="text-primary hover:underline">
                        {partner.contactEmail}
                      </a>
                    </div>
                  )}
                  {partner.contactPhone && (
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a href={`tel:${partner.contactPhone}`} className="text-primary hover:underline">
                        {partner.contactPhone}
                      </a>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No contact information available.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader style={{ backgroundColor: 'rgba(222, 235, 247, 0.5)' }}>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Heart className="w-5 h-5" style={{ color: "#084594" }} />
              Partnership Types
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-3">
              {partner.partnershipTypes?.map((type) => {
                const config = partnershipTypeLabels[type];
                if (!config) return null;
                const Icon = config.icon;
                return (
                  <div 
                    key={type} 
                    className={`p-4 rounded-lg ${config.bgColor} flex items-center gap-3`}
                  >
                    <Icon className={`w-5 h-5 ${config.color}`} />
                    <span className={`font-medium text-sm ${config.color}`}>{config.label}</span>
                  </div>
                );
              })}
              {(!partner.partnershipTypes || partner.partnershipTypes.length === 0) && (
                <p className="text-sm text-muted-foreground col-span-2">No partnership types specified.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border">
          <CardHeader style={{ backgroundColor: 'rgba(222, 235, 247, 0.5)' }}>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Target className="w-5 h-5" style={{ color: "#084594" }} />
              Partnership Goals
            </CardTitle>
            <CardDescription>What they want to achieve through the partnership</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {partner.partnershipGoals ? (
              <p className="text-sm leading-relaxed">{partner.partnershipGoals}</p>
            ) : (
              <p className="text-sm text-muted-foreground">No goals specified.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader style={{ backgroundColor: 'rgba(222, 235, 247, 0.5)' }}>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <History className="w-5 h-5" style={{ color: "#084594" }} />
              Past Activities
            </CardTitle>
            <CardDescription>Previous contributions and events</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {partner.pastActivities && partner.pastActivities.length > 0 ? (
              <ul className="space-y-3">
                {partner.pastActivities.map((activity, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{activity}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No past activities recorded.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {partner.hasMatchingProgram === 1 && (
        <Card className="border">
          <CardHeader style={{ backgroundColor: 'rgba(222, 235, 247, 0.5)' }}>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <DollarSign className="w-5 h-5" style={{ color: "#084594" }} />
              Matching Gift Program
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {partner.matchingRatio && (
                <div>
                  <p className="text-sm text-muted-foreground">Match Ratio</p>
                  <p className="text-xl font-bold" style={{ color: "#084594" }}>{partner.matchingRatio}</p>
                </div>
              )}
              {partner.totalEmployeeGiving && (
                <div>
                  <p className="text-sm text-muted-foreground">Employee Giving</p>
                  <p className="text-xl font-bold" style={{ color: "#084594" }}>
                    ${Number(partner.totalEmployeeGiving).toLocaleString()}
                  </p>
                </div>
              )}
              {partner.estimatedMatchingPotential && (
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Matching Potential</p>
                  <p className="text-xl font-bold text-green-600">
                    ${Number(partner.estimatedMatchingPotential).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {partner.notes && (
        <Card className="border">
          <CardHeader style={{ backgroundColor: 'rgba(222, 235, 247, 0.5)' }}>
            <CardTitle className="text-base font-semibold">Notes</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{partner.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
