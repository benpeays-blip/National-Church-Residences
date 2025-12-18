import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Send, 
  Users, 
  DollarSign,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle2,
  Smartphone,
  Zap,
  Heart,
  Gift
} from "lucide-react";
import { AccentCard, getAccentColor } from "@/components/ui/accent-card";

const recentMessages = [
  { id: "1", donor: "Sarah J.", message: "GIVE25 to support housing", amount: 25, timestamp: "2 min ago", campaign: "Housing Fund" },
  { id: "2", donor: "Michael C.", message: "Thank you for your gift!", amount: null, timestamp: "15 min ago", campaign: "Thank You" },
  { id: "3", donor: "Emily R.", message: "DONATE to help families", amount: 100, timestamp: "1 hour ago", campaign: "Family Services" },
  { id: "4", donor: "David K.", message: "Reminder: Your recurring gift processed", amount: null, timestamp: "2 hours ago", campaign: "Recurring" },
  { id: "5", donor: "Jennifer W.", message: "GIVE50 for emergency relief", amount: 50, timestamp: "3 hours ago", campaign: "Emergency" },
];

const keywords = [
  { keyword: "GIVE", shortCode: "41444", campaign: "General Giving", totalRaised: 45000, donations: 180 },
  { keyword: "HOUSING", shortCode: "41444", campaign: "Affordable Housing", totalRaised: 32000, donations: 128 },
  { keyword: "EMERGENCY", shortCode: "41444", campaign: "Emergency Relief", totalRaised: 28500, donations: 95 },
  { keyword: "FAMILY", shortCode: "41444", campaign: "Family Services", totalRaised: 18000, donations: 72 },
];

const scheduledMessages = [
  { id: "1", name: "Monthly Donor Thank You", recipients: 450, scheduledFor: "Dec 20, 9:00 AM", status: "scheduled" },
  { id: "2", name: "Year-End Appeal", recipients: 2500, scheduledFor: "Dec 28, 10:00 AM", status: "scheduled" },
  { id: "3", name: "Event Reminder - Gala", recipients: 180, scheduledFor: "Jan 5, 3:00 PM", status: "draft" },
];

export default function SmsFundraising() {
  const [selectedTab, setSelectedTab] = useState("text-to-give");
  const [newMessage, setNewMessage] = useState("");
  const [newKeyword, setNewKeyword] = useState("");

  const totalSmsRaised = keywords.reduce((sum, k) => sum + k.totalRaised, 0);
  const totalDonations = keywords.reduce((sum, k) => sum + k.donations, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Text/SMS Fundraising</h1>
          <p className="text-sm text-muted-foreground">
            Text-to-give campaigns, SMS stewardship, and mobile donor engagement
          </p>
        </div>
        <Smartphone className="h-8 w-8 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AccentCard accent="teal">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("teal")}20` }}>
                <DollarSign className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-total-raised">${(totalSmsRaised / 1000).toFixed(1)}K</p>
                <p className="text-sm text-muted-foreground">Raised via SMS</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="sky">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("sky")}20` }}>
                <MessageSquare className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-donations">{totalDonations}</p>
                <p className="text-sm text-muted-foreground">Text Donations</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="lime">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("lime")}20` }}>
                <TrendingUp className="h-5 w-5" style={{ color: getAccentColor("lime") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-open-rate">98%</p>
                <p className="text-sm text-muted-foreground">Open Rate</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="orange">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("orange")}20` }}>
                <Users className="h-5 w-5" style={{ color: getAccentColor("orange") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-subscribers">3,240</p>
                <p className="text-sm text-muted-foreground">SMS Subscribers</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 gap-1 bg-transparent p-0 mb-6" data-testid="tabs-sms">
          <TabsTrigger 
            value="text-to-give" 
            data-testid="tab-text-to-give"
            className="group relative bg-[#4FA6A6] text-white data-[state=active]:bg-[#4FA6A6] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Text-to-Give
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#4FA6A6] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="campaigns" 
            data-testid="tab-campaigns"
            className="group relative bg-[#7BC4DC] text-white data-[state=active]:bg-[#7BC4DC] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            SMS Campaigns
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#7BC4DC] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="stewardship" 
            data-testid="tab-stewardship"
            className="group relative bg-[#92A05A] text-white data-[state=active]:bg-[#92A05A] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Stewardship
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#92A05A] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="activity" 
            data-testid="tab-activity"
            className="group relative bg-[#E8A54B] text-white data-[state=active]:bg-[#E8A54B] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Recent Activity
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#E8A54B] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text-to-give" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="bg-[#395174] text-white rounded-t-lg">
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Active Keywords
                </CardTitle>
                <CardDescription className="text-white/80">
                  Text-to-give keywords for your campaigns
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {keywords.map((kw) => (
                    <div 
                      key={kw.keyword}
                      className="p-4 rounded-lg bg-card border border-border shadow-sm"
                      style={{ borderLeftWidth: '4px', borderLeftColor: getAccentColor("teal") }}
                      data-testid={`keyword-${kw.keyword}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Badge className="font-mono text-sm" style={{ backgroundColor: getAccentColor("teal") }}>
                            {kw.keyword}
                          </Badge>
                          <span className="text-sm text-muted-foreground">to {kw.shortCode}</span>
                        </div>
                        <span className="font-semibold" style={{ color: getAccentColor("teal") }}>
                          ${kw.totalRaised.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{kw.campaign}</span>
                        <span>{kw.donations} donations</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
                  Create New Keyword
                </CardTitle>
                <CardDescription>Set up a new text-to-give keyword</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Keyword</label>
                  <Input 
                    placeholder="e.g., GIVE, DONATE, HELP"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value.toUpperCase())}
                    className="mt-1 font-mono"
                    data-testid="input-new-keyword"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Campaign</label>
                  <Input placeholder="Campaign name" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Default Amount</label>
                  <Input placeholder="$25" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Confirmation Message</label>
                  <Textarea 
                    placeholder="Thank you for your gift! Your donation helps..."
                    className="mt-1"
                  />
                </div>
                <Button className="w-full" data-testid="button-create-keyword">
                  <Zap className="h-4 w-4 mr-2" />
                  Create Keyword
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
                    Scheduled SMS Campaigns
                  </CardTitle>
                  <CardDescription>Manage your upcoming text message campaigns</CardDescription>
                </div>
                <Button data-testid="button-new-campaign">
                  <Send className="h-4 w-4 mr-2" />
                  New Campaign
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledMessages.map((msg) => (
                  <div 
                    key={msg.id}
                    className="p-4 rounded-lg bg-card border border-border shadow-sm flex items-center justify-between"
                    style={{ borderLeftWidth: '4px', borderLeftColor: getAccentColor("sky") }}
                    data-testid={`campaign-${msg.id}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("sky")}20` }}>
                        <MessageSquare className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
                      </div>
                      <div>
                        <p className="font-medium">{msg.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>{msg.recipients.toLocaleString()} recipients</span>
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          <span>{msg.scheduledFor}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={msg.status === "scheduled" ? "default" : "secondary"}>
                        {msg.status}
                      </Badge>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stewardship" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" style={{ color: getAccentColor("olive") }} />
                  Automated Thank-You Sequences
                </CardTitle>
                <CardDescription>Instant gratitude via text message</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { trigger: "First-time donor", message: "Welcome to the family! Your first gift means so much...", enabled: true },
                    { trigger: "Recurring gift processed", message: "Your monthly gift of $X was processed. Thank you!", enabled: true },
                    { trigger: "Major gift ($1K+)", message: "Your generous gift is making a huge impact...", enabled: true },
                    { trigger: "Giving anniversary", message: "Happy 1 year! Thank you for your continued support...", enabled: false },
                  ].map((seq, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-lg border bg-card"
                      style={{ borderLeftWidth: '4px', borderLeftColor: seq.enabled ? getAccentColor("lime") : getAccentColor("coral") }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{seq.trigger}</span>
                        <Badge variant={seq.enabled ? "default" : "outline"}>
                          {seq.enabled ? "Active" : "Disabled"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{seq.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" style={{ color: getAccentColor("orange") }} />
                  Event Reminders
                </CardTitle>
                <CardDescription>SMS reminders for upcoming events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { event: "Annual Gala", date: "Jan 15, 2025", registered: 180, reminded: 156 },
                    { event: "Volunteer Day", date: "Jan 22, 2025", registered: 45, reminded: 0 },
                    { event: "Board Meeting", date: "Feb 1, 2025", registered: 12, reminded: 0 },
                  ].map((event, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-lg border bg-card"
                      style={{ borderLeftWidth: '4px', borderLeftColor: getAccentColor("orange") }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{event.event}</p>
                          <p className="text-xs text-muted-foreground">{event.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{event.registered} registered</p>
                          <p className="text-xs text-muted-foreground">{event.reminded} reminded</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" style={{ color: getAccentColor("orange") }} />
                Recent SMS Activity
              </CardTitle>
              <CardDescription>Latest text messages and donations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div 
                    key={msg.id}
                    className="p-4 rounded-lg bg-card border border-border shadow-sm flex items-center justify-between"
                    style={{ borderLeftWidth: '4px', borderLeftColor: msg.amount ? getAccentColor("lime") : getAccentColor("sky") }}
                    data-testid={`message-${msg.id}`}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center" 
                        style={{ backgroundColor: msg.amount ? `${getAccentColor("lime")}20` : `${getAccentColor("sky")}20` }}
                      >
                        {msg.amount ? (
                          <DollarSign className="h-5 w-5" style={{ color: getAccentColor("lime") }} />
                        ) : (
                          <MessageSquare className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{msg.donor}</p>
                        <p className="text-sm text-muted-foreground">{msg.message}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {msg.amount && (
                        <p className="font-semibold" style={{ color: getAccentColor("lime") }}>
                          +${msg.amount}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">{msg.timestamp}</p>
                      <Badge variant="outline" className="text-xs mt-1">{msg.campaign}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
