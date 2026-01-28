import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  MapPin,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  RefreshCw,
  Home,
  Zap,
  ArrowLeft
} from "lucide-react";
import { AccentCard, getAccentColor } from "@/components/ui/accent-card";
import { Link } from "wouter";

const addressIssues = [
  { 
    id: "1", 
    donor: "Sarah Johnson",
    currentAddress: "123 Main St, Atlanta, GA 30301",
    suggestedAddress: "123 Main Street, Atlanta, GA 30301-1234",
    issue: "Missing ZIP+4",
    status: "fixable"
  },
  { 
    id: "2", 
    donor: "Michael Chen",
    currentAddress: "456 Oak Ave, Apt 12B, Chicago, IL",
    suggestedAddress: "456 Oak Avenue, Apt 12B, Chicago, IL 60601",
    issue: "Missing ZIP code",
    status: "fixable"
  },
  { 
    id: "3", 
    donor: "Emily Rodriguez",
    currentAddress: "789 Elm Stret, Boston, MA 02101",
    suggestedAddress: "789 Elm Street, Boston, MA 02101",
    issue: "Typo in street name",
    status: "fixable"
  },
  { 
    id: "4", 
    donor: "David Kim",
    currentAddress: "999 Nonexistent Rd, Fake City, XX 00000",
    suggestedAddress: null,
    issue: "Invalid address",
    status: "unverifiable"
  },
  { 
    id: "5", 
    donor: "Jennifer Williams",
    currentAddress: "321 Pine Blvd, Suite 500, Dallas, TX",
    suggestedAddress: "321 Pine Boulevard, Suite 500, Dallas, TX 75201",
    issue: "Missing ZIP code, abbreviated street type",
    status: "fixable"
  },
];

const stats = {
  totalAddresses: 5420,
  verified: 4985,
  needsReview: 388,
  unverifiable: 47,
  verificationRate: 92
};

export default function AddressVerification() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIssues = addressIssues.filter(issue =>
    issue.donor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.currentAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1.5 mb-2 -ml-2" data-testid="button-back-dashboard">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Address Verification</h1>
          <p className="text-sm text-muted-foreground">
            USPS validation for accurate direct mail campaigns
          </p>
        </div>
        <MapPin className="h-8 w-8 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AccentCard accent="teal">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("teal")}20` }}>
                <Home className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-total">{stats.totalAddresses.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Addresses</p>
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
                <p className="text-2xl font-bold" data-testid="metric-verified">{stats.verified.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Verified</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="orange">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("orange")}20` }}>
                <AlertTriangle className="h-5 w-5" style={{ color: getAccentColor("orange") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-review">{stats.needsReview}</p>
                <p className="text-sm text-muted-foreground">Needs Review</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="coral">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("coral")}20` }}>
                <XCircle className="h-5 w-5" style={{ color: getAccentColor("coral") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-invalid">{stats.unverifiable}</p>
                <p className="text-sm text-muted-foreground">Unverifiable</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Overall Verification Rate</h3>
              <p className="text-sm text-muted-foreground">Percentage of addresses that are deliverable</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold" style={{ color: getAccentColor("lime") }}>{stats.verificationRate}%</p>
            </div>
          </div>
          <Progress value={stats.verificationRate} className="h-3 mt-4" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-[#395174] text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Addresses Needing Review
              </CardTitle>
              <CardDescription className="text-white/80">
                Fix or verify these addresses for your next mailing
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" data-testid="button-verify-all">
                <Zap className="h-4 w-4 mr-2" />
                Verify All
              </Button>
              <Button variant="secondary" data-testid="button-fix-all">
                <RefreshCw className="h-4 w-4 mr-2" />
                Auto-Fix All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by donor or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredIssues.map((issue) => (
              <div 
                key={issue.id}
                className="p-4 rounded-lg bg-card border border-border shadow-sm"
                style={{ 
                  borderLeftWidth: '4px', 
                  borderLeftColor: issue.status === "fixable" ? getAccentColor("orange") : getAccentColor("coral")
                }}
                data-testid={`issue-${issue.id}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{issue.donor}</h4>
                    <Badge 
                      variant="outline" 
                      className="text-xs mt-1"
                      style={{ 
                        borderColor: issue.status === "fixable" ? getAccentColor("orange") : getAccentColor("coral"),
                        color: issue.status === "fixable" ? getAccentColor("orange") : getAccentColor("coral")
                      }}
                    >
                      {issue.issue}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    {issue.suggestedAddress && (
                      <Button size="sm" style={{ backgroundColor: getAccentColor("lime") }} data-testid={`button-accept-${issue.id}`}>
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Accept Fix
                      </Button>
                    )}
                    <Button variant="outline" size="sm" data-testid={`button-edit-${issue.id}`}>
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg border bg-muted/30">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Current Address</p>
                    <p className="text-sm flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                      {issue.currentAddress}
                    </p>
                  </div>
                  {issue.suggestedAddress ? (
                    <div className="p-3 rounded-lg border" style={{ borderColor: `${getAccentColor("lime")}50`, backgroundColor: `${getAccentColor("lime")}05` }}>
                      <p className="text-xs font-medium mb-1" style={{ color: getAccentColor("lime") }}>Suggested Fix</p>
                      <p className="text-sm flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: getAccentColor("lime") }} />
                        {issue.suggestedAddress}
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg border" style={{ borderColor: `${getAccentColor("coral")}50`, backgroundColor: `${getAccentColor("coral")}05` }}>
                      <p className="text-xs font-medium mb-1" style={{ color: getAccentColor("coral") }}>Unable to Verify</p>
                      <p className="text-sm flex items-start gap-2">
                        <XCircle className="h-4 w-4 mt-0.5 shrink-0" style={{ color: getAccentColor("coral") }} />
                        No valid address found. Manual review required.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
