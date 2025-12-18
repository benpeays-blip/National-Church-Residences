import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  DollarSign, 
  TrendingUp,
  ExternalLink,
  Clock,
  Gift,
  Users,
  Zap,
  ArrowRight
} from "lucide-react";
import { AccentCard, getAccentColor } from "@/components/ui/accent-card";
import { useToast } from "@/hooks/use-toast";

const matchEligibleDonors = [
  { id: "1", name: "Sarah Johnson", employer: "Microsoft", donation: 5000, matchRatio: "1:1", matchAmount: 5000, status: "eligible", submissionDeadline: "2025-03-15" },
  { id: "2", name: "Michael Chen", employer: "Google", donation: 2500, matchRatio: "2:1", matchAmount: 5000, status: "submitted", submissionDeadline: "2025-02-28" },
  { id: "3", name: "Emily Rodriguez", employer: "Apple", donation: 10000, matchRatio: "1:1", matchAmount: 10000, status: "approved", submissionDeadline: "2025-04-01" },
  { id: "4", name: "David Kim", employer: "Amazon", donation: 1500, matchRatio: "1:1", matchAmount: 1500, status: "pending_donor", submissionDeadline: "2025-03-30" },
  { id: "5", name: "Jennifer Williams", employer: "Salesforce", donation: 3000, matchRatio: "1:1", matchAmount: 3000, status: "eligible", submissionDeadline: "2025-05-15" },
];

const topMatchingCompanies = [
  { name: "Microsoft", matches: 45, totalMatched: 125000, matchRatio: "1:1", maxMatch: 15000 },
  { name: "Google", matches: 38, totalMatched: 180000, matchRatio: "2:1", maxMatch: 10000 },
  { name: "Apple", matches: 32, totalMatched: 95000, matchRatio: "1:1", maxMatch: 10000 },
  { name: "Amazon", matches: 28, totalMatched: 72000, matchRatio: "1:1", maxMatch: 5000 },
  { name: "Salesforce", matches: 24, totalMatched: 65000, matchRatio: "1:1", maxMatch: 5000 },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "eligible":
      return <Badge style={{ backgroundColor: getAccentColor("teal"), color: "white" }}>Eligible</Badge>;
    case "submitted":
      return <Badge style={{ backgroundColor: getAccentColor("sky"), color: "white" }}>Submitted</Badge>;
    case "approved":
      return <Badge style={{ backgroundColor: getAccentColor("lime"), color: "white" }}>Approved</Badge>;
    case "pending_donor":
      return <Badge style={{ backgroundColor: getAccentColor("orange"), color: "white" }}>Pending Donor</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export default function MatchingGifts() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleSendReminders = () => {
    toast({
      title: "Reminders Sent",
      description: "Automated reminder emails have been queued for 3 donors who haven't submitted their matching gift forms.",
    });
  };
  const [employerSearch, setEmployerSearch] = useState("");
  const [eligibilityChecked, setEligibilityChecked] = useState(false);

  const handleCheckEligibility = () => {
    if (employerSearch.trim()) {
      setEligibilityChecked(true);
    }
  };

  const handleEmployerSearchChange = (value: string) => {
    setEmployerSearch(value);
    setEligibilityChecked(false);
  };

  const filteredDonors = matchEligibleDonors.filter(donor =>
    donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    donor.employer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPotentialMatches = matchEligibleDonors.reduce((sum, d) => sum + d.matchAmount, 0);
  const approvedMatches = matchEligibleDonors.filter(d => d.status === "approved").reduce((sum, d) => sum + d.matchAmount, 0);
  const pendingMatches = matchEligibleDonors.filter(d => d.status === "submitted" || d.status === "eligible").reduce((sum, d) => sum + d.matchAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Matching Gift Automation</h1>
          <p className="text-sm text-muted-foreground">
            Automatically screen donations for corporate match eligibility and double your impact
          </p>
        </div>
        <Gift className="h-8 w-8 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AccentCard accent="teal">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("teal")}20` }}>
                <DollarSign className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-total-potential">${(totalPotentialMatches / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">Potential Match Revenue</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="lime">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("lime")}20` }}>
                <CheckCircle2 className="h-5 w-5" style={{ color: getAccentColor("lime") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-approved">${(approvedMatches / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">Approved Matches</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="sky">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("sky")}20` }}>
                <Clock className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-pending">${(pendingMatches / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">Pending / In Progress</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="orange">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("orange")}20` }}>
                <TrendingUp className="h-5 w-5" style={{ color: getAccentColor("orange") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-capture-rate">78%</p>
                <p className="text-sm text-muted-foreground">Match Capture Rate</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>
      </div>

      <Card>
        <CardHeader className="bg-[#395174] text-white rounded-t-lg">
          <CardTitle className="text-white flex items-center gap-2">
            <Search className="h-5 w-5" />
            Employer Database Lookup
          </CardTitle>
          <CardDescription className="text-white/80">
            Search 20,000+ companies to check matching gift eligibility
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter employer name..."
                value={employerSearch}
                onChange={(e) => handleEmployerSearchChange(e.target.value)}
                className="pl-10"
                data-testid="input-employer-search"
              />
            </div>
            <Button onClick={handleCheckEligibility} data-testid="button-check-eligibility">
              <Zap className="h-4 w-4 mr-2" />
              Check Eligibility
            </Button>
          </div>

          {eligibilityChecked && employerSearch && (
            <div className="mt-4 p-4 rounded-lg border bg-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("lime")}20` }}>
                  <CheckCircle2 className="h-6 w-6" style={{ color: getAccentColor("lime") }} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Match Eligible!</h4>
                  <p className="text-sm text-muted-foreground mb-2">This employer participates in a matching gift program</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Match Ratio:</span>
                      <span className="ml-2 font-medium">1:1</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Max Match:</span>
                      <span className="ml-2 font-medium">$10,000/year</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Deadline:</span>
                      <span className="ml-2 font-medium">12 months</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Submission Portal
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
                  Match-Eligible Donations
                </CardTitle>
                <CardDescription>Recent donations with matching gift potential</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search donors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-donors"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredDonors.map((donor) => (
                <div 
                  key={donor.id}
                  className="p-4 rounded-lg bg-card border border-border shadow-sm hover-elevate cursor-pointer"
                  style={{ borderLeftWidth: '4px', borderLeftColor: getAccentColor("teal") }}
                  data-testid={`donor-row-${donor.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">{donor.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {donor.employer}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold" style={{ color: getAccentColor("teal") }}>
                          +${donor.matchAmount.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">{donor.matchRatio} match</p>
                      </div>
                      {getStatusBadge(donor.status)}
                      <Button variant="ghost" size="icon">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
              Top Matching Companies
            </CardTitle>
            <CardDescription>Companies contributing the most matches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topMatchingCompanies.map((company, index) => (
                <div key={company.name} className="space-y-2" data-testid={`company-${index}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{company.name}</span>
                    <span className="text-sm font-semibold" style={{ color: getAccentColor("lime") }}>
                      ${(company.totalMatched / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <Progress value={(company.totalMatched / 180000) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{company.matches} matches</span>
                    <span>{company.matchRatio} up to ${company.maxMatch.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2" style={{ borderColor: `${getAccentColor("olive")}30`, backgroundColor: `${getAccentColor("olive")}05` }}>
        <CardContent className="py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("olive")}20` }}>
              <AlertCircle className="h-6 w-6" style={{ color: getAccentColor("olive") }} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">3 Donors Need Reminders</h3>
              <p className="text-sm text-muted-foreground">
                These donors haven't submitted their matching gift forms yet. Send automated reminders to capture this revenue.
              </p>
            </div>
            <Button onClick={handleSendReminders} style={{ backgroundColor: getAccentColor("olive") }} data-testid="button-send-reminders">
              Send Reminders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
