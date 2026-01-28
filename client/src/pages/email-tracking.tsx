import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Mail, 
  MousePointer, 
  Eye, 
  TrendingUp,
  Users,
  Search,
  Calendar,
  Send
} from "lucide-react";
import { AccentCard, getAccentColor } from "@/components/ui/accent-card";

const emailCampaigns = [
  { 
    id: "1", 
    name: "Year-End Appeal", 
    sentDate: "2024-12-10", 
    recipients: 2500,
    delivered: 2450,
    opened: 1127,
    clicked: 342,
    donations: 85,
    revenue: 42500
  },
  { 
    id: "2", 
    name: "Monthly Newsletter - December", 
    sentDate: "2024-12-01", 
    recipients: 3200,
    delivered: 3150,
    opened: 1260,
    clicked: 378,
    donations: 42,
    revenue: 8400
  },
  { 
    id: "3", 
    name: "Thank You - November Donors", 
    sentDate: "2024-11-28", 
    recipients: 450,
    delivered: 448,
    opened: 358,
    clicked: 89,
    donations: 12,
    revenue: 3600
  },
  { 
    id: "4", 
    name: "Event Invitation - Annual Gala", 
    sentDate: "2024-11-15", 
    recipients: 800,
    delivered: 795,
    opened: 516,
    clicked: 168,
    donations: 0,
    revenue: 0
  },
  { 
    id: "5", 
    name: "Giving Tuesday Campaign", 
    sentDate: "2024-11-26", 
    recipients: 4500,
    delivered: 4420,
    opened: 2210,
    clicked: 663,
    donations: 156,
    revenue: 78500
  },
  { 
    id: "6", 
    name: "Monthly Newsletter - November", 
    sentDate: "2024-11-01", 
    recipients: 3150,
    delivered: 3100,
    opened: 1147,
    clicked: 321,
    donations: 38,
    revenue: 7200
  },
  { 
    id: "7", 
    name: "Impact Report - Q3 2024", 
    sentDate: "2024-10-15", 
    recipients: 2800,
    delivered: 2765,
    opened: 1659,
    clicked: 498,
    donations: 72,
    revenue: 18600
  },
  { 
    id: "8", 
    name: "Fall Campaign Launch", 
    sentDate: "2024-10-01", 
    recipients: 3800,
    delivered: 3750,
    opened: 1500,
    clicked: 420,
    donations: 95,
    revenue: 32400
  },
  { 
    id: "9", 
    name: "Monthly Newsletter - October", 
    sentDate: "2024-10-01", 
    recipients: 3100,
    delivered: 3050,
    opened: 1098,
    clicked: 287,
    donations: 29,
    revenue: 5800
  },
  { 
    id: "10", 
    name: "Major Gift Stewardship", 
    sentDate: "2024-09-20", 
    recipients: 125,
    delivered: 125,
    opened: 112,
    clicked: 45,
    donations: 8,
    revenue: 125000
  },
  { 
    id: "11", 
    name: "Monthly Newsletter - September", 
    sentDate: "2024-09-01", 
    recipients: 3050,
    delivered: 3000,
    opened: 1050,
    clicked: 273,
    donations: 31,
    revenue: 6200
  },
  { 
    id: "12", 
    name: "Back to School Campaign", 
    sentDate: "2024-08-15", 
    recipients: 2200,
    delivered: 2175,
    opened: 870,
    clicked: 218,
    donations: 45,
    revenue: 12500
  },
];

const topEngagers = [
  { name: "Sarah Johnson", opens: 24, clicks: 18, lastOpen: "2 hours ago" },
  { name: "Michael Chen", opens: 22, clicks: 15, lastOpen: "1 day ago" },
  { name: "Emily Rodriguez", opens: 21, clicks: 12, lastOpen: "3 hours ago" },
  { name: "David Kim", opens: 19, clicks: 14, lastOpen: "5 hours ago" },
  { name: "Jennifer Williams", opens: 18, clicks: 11, lastOpen: "1 day ago" },
  { name: "Robert Thompson", opens: 17, clicks: 13, lastOpen: "4 hours ago" },
  { name: "Amanda Foster", opens: 16, clicks: 10, lastOpen: "6 hours ago" },
  { name: "Christopher Lee", opens: 16, clicks: 9, lastOpen: "1 day ago" },
  { name: "Patricia Martinez", opens: 15, clicks: 11, lastOpen: "8 hours ago" },
  { name: "James Anderson", opens: 15, clicks: 8, lastOpen: "2 days ago" },
  { name: "Linda Garcia", opens: 14, clicks: 10, lastOpen: "12 hours ago" },
  { name: "William Brown", opens: 14, clicks: 7, lastOpen: "1 day ago" },
  { name: "Elizabeth Taylor", opens: 13, clicks: 9, lastOpen: "3 days ago" },
  { name: "Richard Davis", opens: 13, clicks: 6, lastOpen: "2 days ago" },
  { name: "Barbara Wilson", opens: 12, clicks: 8, lastOpen: "4 days ago" },
];

export default function EmailTracking() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCampaigns = emailCampaigns.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSent = emailCampaigns.reduce((sum, c) => sum + c.recipients, 0);
  const totalOpened = emailCampaigns.reduce((sum, c) => sum + c.opened, 0);
  const totalClicked = emailCampaigns.reduce((sum, c) => sum + c.clicked, 0);
  const avgOpenRate = Math.round((totalOpened / totalSent) * 100);
  const avgClickRate = Math.round((totalClicked / totalOpened) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Email Engagement Tracking</h1>
          <p className="text-sm text-muted-foreground">
            Monitor email opens, clicks, and donor engagement patterns
          </p>
        </div>
        <Mail className="h-8 w-8 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AccentCard accent="teal">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("teal")}20` }}>
                <Send className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-sent">{totalSent.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Emails Sent</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="sky">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("sky")}20` }}>
                <Eye className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-open-rate">{avgOpenRate}%</p>
                <p className="text-sm text-muted-foreground">Avg Open Rate</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="lime">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("lime")}20` }}>
                <MousePointer className="h-5 w-5" style={{ color: getAccentColor("lime") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-click-rate">{avgClickRate}%</p>
                <p className="text-sm text-muted-foreground">Avg Click Rate</p>
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
                <p className="text-2xl font-bold" data-testid="metric-revenue">${(emailCampaigns.reduce((sum, c) => sum + c.revenue, 0) / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">Email Revenue</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
                  Recent Campaigns
                </CardTitle>
                <CardDescription>Email performance analytics</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {filteredCampaigns.map((campaign) => {
                const openRate = Math.round((campaign.opened / campaign.delivered) * 100);
                const clickRate = Math.round((campaign.clicked / campaign.opened) * 100);
                
                return (
                  <div 
                    key={campaign.id}
                    className="p-4 rounded-lg bg-card border border-border shadow-sm hover-elevate cursor-pointer"
                    style={{ borderLeftWidth: '4px', borderLeftColor: getAccentColor("teal") }}
                    data-testid={`campaign-${campaign.id}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{campaign.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{campaign.sentDate}</span>
                          <span>•</span>
                          <Users className="h-3 w-3" />
                          <span>{campaign.recipients.toLocaleString()} recipients</span>
                        </div>
                      </div>
                      {campaign.revenue > 0 && (
                        <Badge style={{ backgroundColor: getAccentColor("lime"), color: "white" }}>
                          ${campaign.revenue.toLocaleString()} raised
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-lg font-bold" style={{ color: getAccentColor("sky") }}>{openRate}%</p>
                        <p className="text-xs text-muted-foreground">Open Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold" style={{ color: getAccentColor("lime") }}>{clickRate}%</p>
                        <p className="text-xs text-muted-foreground">Click Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold">{campaign.opened.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Opens</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold">{campaign.clicked.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Clicks</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" style={{ color: getAccentColor("orange") }} />
              Top Email Engagers
            </CardTitle>
            <CardDescription>Most active email readers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {topEngagers.map((engager, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-lg border bg-card"
                  style={{ borderLeftWidth: '3px', borderLeftColor: getAccentColor("orange") }}
                  data-testid={`engager-${idx}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{engager.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {engager.lastOpen}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" style={{ color: getAccentColor("sky") }} />
                      {engager.opens} opens
                    </span>
                    <span className="flex items-center gap-1">
                      <MousePointer className="h-3 w-3" style={{ color: getAccentColor("lime") }} />
                      {engager.clicks} clicks
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
