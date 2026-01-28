import { useParams, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Building2,
  Calendar,
  DollarSign,
  Trophy,
  CheckCircle,
  Clock,
  Users,
  Mail,
  Phone,
  FileText,
  TrendingUp,
  Gift,
  Target,
  Megaphone,
  Sparkles,
} from "lucide-react";

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
  contactEmail?: string;
  contactPhone?: string;
  renewalProbability?: number;
  notes?: string;
  history?: { date: string; action: string; amount?: number }[];
}

const mockSponsorships: Record<string, Sponsorship> = {
  "1": {
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
    contactEmail: "jennifer.walsh@nationwide.com",
    contactPhone: "(614) 555-1234",
    renewalProbability: 85,
    notes: "Strong relationship - has sponsored for 5 consecutive years. Interested in expanding to program sponsorship.",
    history: [
      { date: "2024-01-15", action: "Sponsorship agreement signed", amount: 75000 },
      { date: "2023-11-20", action: "Renewal discussion meeting" },
      { date: "2023-01-10", action: "Previous year sponsorship", amount: 65000 },
      { date: "2022-01-15", action: "Initial sponsorship", amount: 50000 },
    ],
  },
  "2": {
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
    contactEmail: "mtorres@cardinalhealth.com",
    contactPhone: "(614) 555-2345",
    renewalProbability: 90,
    notes: "Major philanthropic partner. Exploring additional community health initiatives.",
    history: [
      { date: "2023-01-01", action: "5-year naming rights agreement signed", amount: 500000 },
      { date: "2022-09-15", action: "Facility tour and proposal presentation" },
      { date: "2022-06-01", action: "Initial outreach meeting" },
    ],
  },
  "3": {
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
    contactEmail: "sarah.chen@huntington.com",
    contactPhone: "(614) 555-3456",
    renewalProbability: 75,
    notes: "Aligned with their CRA goals. Interested in adding workshops at branch locations.",
    history: [
      { date: "2024-03-01", action: "Program sponsorship renewed", amount: 35000 },
      { date: "2023-03-01", action: "Initial program sponsorship", amount: 30000 },
    ],
  },
  "4": {
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
    contactEmail: "amanda.foster@lbrands.com",
    contactPhone: "(614) 555-4567",
    notes: "Awaiting final approval from foundation board. Expected decision by March 15.",
    history: [
      { date: "2024-02-01", action: "Sponsorship proposal submitted", amount: 25000 },
      { date: "2024-01-15", action: "Initial meeting with foundation director" },
    ],
  },
  "5": {
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
    contactEmail: "kim.robert@osu.edu",
    contactPhone: "(614) 555-5678",
    renewalProbability: 80,
    notes: "Strong academic partnership. Discussing expansion to graduate research projects.",
    history: [
      { date: "2023-08-01", action: "Academic year sponsorship", amount: 20000 },
      { date: "2022-08-01", action: "Pilot program launched", amount: 15000 },
    ],
  },
  "6": {
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
    contactEmail: "plane@aep.com",
    contactPhone: "(614) 555-6789",
    renewalProbability: 70,
    notes: "Good visibility opportunity. Considering adding digital campaign sponsorship.",
    history: [
      { date: "2024-01-01", action: "Media sponsorship renewed", amount: 15000 },
      { date: "2023-01-01", action: "Initial media sponsorship", amount: 12000 },
    ],
  },
};

const sponsorshipTypeConfig: Record<string, { label: string; icon: typeof Trophy; color: string }> = {
  event: { label: "Event Sponsorship", icon: Trophy, color: "#E8923A" },
  program: { label: "Program Sponsorship", icon: Target, color: "#9CB071" },
  naming: { label: "Naming Rights", icon: Building2, color: "#7FA3A1" },
  media: { label: "Media Sponsorship", icon: Megaphone, color: "#6FBBD3" },
};

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  active: { label: "Active", variant: "default" },
  pending: { label: "Pending", variant: "secondary" },
  expired: { label: "Expired", variant: "destructive" },
  renewed: { label: "Renewed", variant: "outline" },
};

export default function SponsorshipDetail() {
  const params = useParams();
  const sponsorshipId = params.id;

  const sponsorship = sponsorshipId ? mockSponsorships[sponsorshipId] : null;

  if (!sponsorship) {
    return (
      <div className="p-6">
        <Card className="p-12 text-center">
          <Trophy className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Sponsorship not found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            The sponsorship you're looking for doesn't exist.
          </p>
          <Link href="/corporate-partnerships/sponsorships">
            <Button data-testid="button-back-to-sponsorships">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sponsorships
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const typeConfig = sponsorshipTypeConfig[sponsorship.sponsorshipType];
  const TypeIcon = typeConfig.icon;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysRemaining = () => {
    const end = new Date(sponsorship.endDate);
    const now = new Date();
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const daysRemaining = getDaysRemaining();

  return (
    <div className="p-6 space-y-6">
      <Link href="/corporate-partnerships/sponsorships">
        <Button variant="ghost" size="sm" className="mb-2" data-testid="button-back">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sponsorships
        </Button>
      </Link>

      {/* Header Card */}
      <Card className="overflow-hidden">
        <div className="p-6" style={{ backgroundColor: "#395174" }}>
          <div className="flex items-start gap-6">
            {sponsorship.logoUrl ? (
              <img
                src={sponsorship.logoUrl}
                alt={`${sponsorship.companyName} logo`}
                className="w-20 h-20 object-contain rounded-xl bg-white p-3 shadow-sm"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
                data-testid="img-company-logo"
              />
            ) : (
              <div className="w-20 h-20 rounded-xl bg-white/10 flex items-center justify-center">
                <Building2 className="w-10 h-10 text-white/60" />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-white" data-testid="text-company-name">
                  {sponsorship.companyName}
                </h1>
                <Badge variant={statusConfig[sponsorship.status].variant}>
                  {statusConfig[sponsorship.status].label}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-white/80 mb-3">
                <TypeIcon className="w-4 h-4" />
                <span className="text-sm">{typeConfig.label}</span>
                <span className="text-white/40">•</span>
                <span className="text-sm">{sponsorship.eventOrProgram}</span>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-white/60 text-xs">Total Value</p>
                  <p className="text-2xl font-bold text-white" data-testid="text-amount">
                    ${sponsorship.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-white/60 text-xs">Contract Period</p>
                  <p className="text-sm text-white">
                    {formatDate(sponsorship.startDate)} - {formatDate(sponsorship.endDate)}
                  </p>
                </div>
                {daysRemaining > 0 && (
                  <div>
                    <p className="text-white/60 text-xs">Days Remaining</p>
                    <p className="text-lg font-semibold text-white">{daysRemaining} days</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Benefits */}
          <Card>
            <CardHeader style={{ backgroundColor: "#395174" }} className="rounded-t-xl">
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <Gift className="w-4 h-4" />
                Sponsorship Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sponsorship.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                    data-testid={`benefit-${index}`}
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: typeConfig.color }} />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Engagement History */}
          {sponsorship.history && (
            <Card>
              <CardHeader style={{ backgroundColor: "#395174" }} className="rounded-t-xl">
                <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Engagement History
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {sponsorship.history.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0"
                      data-testid={`history-${index}`}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${typeConfig.color}20` }}
                      >
                        {entry.amount ? (
                          <DollarSign className="w-5 h-5" style={{ color: typeConfig.color }} />
                        ) : (
                          <FileText className="w-5 h-5" style={{ color: typeConfig.color }} />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{entry.action}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(entry.date)}</p>
                      </div>
                      {entry.amount && (
                        <span className="font-semibold" style={{ color: typeConfig.color }}>
                          ${entry.amount.toLocaleString()}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          {sponsorship.notes && (
            <Card>
              <CardHeader style={{ backgroundColor: "#395174" }} className="rounded-t-xl">
                <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Notes & Context
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground leading-relaxed">{sponsorship.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <Card>
            <CardHeader style={{ backgroundColor: "#395174" }} className="rounded-t-xl">
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <Users className="w-4 h-4" />
                Primary Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="font-semibold" data-testid="text-contact-name">{sponsorship.contactName}</p>
                <p className="text-sm text-muted-foreground">{sponsorship.contactTitle}</p>
              </div>
              {sponsorship.contactEmail && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a href={`mailto:${sponsorship.contactEmail}`} className="text-primary hover:underline">
                    {sponsorship.contactEmail}
                  </a>
                </div>
              )}
              {sponsorship.contactPhone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{sponsorship.contactPhone}</span>
                </div>
              )}
              <Button className="w-full" data-testid="button-contact">
                <Mail className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Renewal Probability */}
          {sponsorship.renewalProbability !== undefined && (
            <Card>
              <CardHeader style={{ backgroundColor: "#395174" }} className="rounded-t-xl">
                <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Renewal Outlook
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center">
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center"
                      style={{
                        background: `conic-gradient(${typeConfig.color} ${sponsorship.renewalProbability * 3.6}deg, #e5e7eb ${sponsorship.renewalProbability * 3.6}deg)`,
                      }}
                    >
                      <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center">
                        <span className="text-2xl font-bold" data-testid="text-renewal-probability">
                          {sponsorship.renewalProbability}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">Likelihood of Renewal</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Relationship Strength</span>
                    <span className="font-medium">Strong</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader style={{ backgroundColor: "#395174" }} className="rounded-t-xl">
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-2">
              <Button variant="outline" className="w-full justify-start" data-testid="button-schedule-meeting">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start" data-testid="button-create-proposal">
                <FileText className="w-4 h-4 mr-2" />
                Create Renewal Proposal
              </Button>
              <Button variant="outline" className="w-full justify-start" data-testid="button-log-activity">
                <Clock className="w-4 h-4 mr-2" />
                Log Activity
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
