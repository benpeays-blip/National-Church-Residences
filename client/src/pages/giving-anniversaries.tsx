import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Gift, 
  Heart, 
  Mail,
  Bell,
  Users,
  Trophy,
  Cake,
  Star,
  Send
} from "lucide-react";
import { AccentCard, getAccentColor } from "@/components/ui/accent-card";

const upcomingAnniversaries = [
  { id: "1", donor: "Sarah Johnson", firstGiftDate: "2020-01-15", anniversary: "5 years", daysAway: 3, totalGifts: 48, lifetimeGiving: 25000, notificationSet: true },
  { id: "2", donor: "Michael Chen", firstGiftDate: "2023-01-18", anniversary: "2 years", daysAway: 6, totalGifts: 24, lifetimeGiving: 12000, notificationSet: true },
  { id: "3", donor: "Emily Rodriguez", firstGiftDate: "2024-01-20", anniversary: "1 year", daysAway: 8, totalGifts: 12, lifetimeGiving: 3600, notificationSet: false },
  { id: "4", donor: "David Kim", firstGiftDate: "2019-01-25", anniversary: "6 years", daysAway: 13, totalGifts: 72, lifetimeGiving: 45000, notificationSet: true },
  { id: "5", donor: "Jennifer Williams", firstGiftDate: "2022-02-01", anniversary: "3 years", daysAway: 20, totalGifts: 36, lifetimeGiving: 18000, notificationSet: false },
];

const milestoneAchievers = [
  { donor: "Robert Thompson", milestone: "100 gifts", achievedDate: "2024-12-10", celebrationSent: true },
  { donor: "Patricia Anderson", milestone: "$50,000 lifetime", achievedDate: "2024-12-08", celebrationSent: true },
  { donor: "James Wilson", milestone: "10 years as donor", achievedDate: "2024-12-05", celebrationSent: false },
  { donor: "Linda Martinez", milestone: "50 gifts", achievedDate: "2024-11-28", celebrationSent: true },
];

const automatedMessages = [
  { type: "1 Year Anniversary", template: "Thank you for one amazing year...", enabled: true, sendMethod: "email" },
  { type: "5 Year Anniversary", template: "Five years of impact together...", enabled: true, sendMethod: "email + card" },
  { type: "10 Year Anniversary", template: "A decade of partnership...", enabled: true, sendMethod: "email + card + call" },
  { type: "100 Gift Milestone", template: "Your 100th gift celebration...", enabled: false, sendMethod: "email" },
  { type: "$10K Lifetime", template: "Reaching $10,000 in total giving...", enabled: true, sendMethod: "email" },
];

export default function GivingAnniversaries() {
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const pendingNotifications = upcomingAnniversaries.filter(a => !a.notificationSet).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Giving Anniversary Alerts</h1>
          <p className="text-sm text-muted-foreground">
            Celebrate donor milestones with automated recognition
          </p>
        </div>
        <Cake className="h-8 w-8 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AccentCard accent="teal">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("teal")}20` }}>
                <Calendar className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-upcoming">{upcomingAnniversaries.length}</p>
                <p className="text-sm text-muted-foreground">Upcoming This Month</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="sky">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("sky")}20` }}>
                <Trophy className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-milestones">{milestoneAchievers.length}</p>
                <p className="text-sm text-muted-foreground">Recent Milestones</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="orange">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("orange")}20` }}>
                <Bell className="h-5 w-5" style={{ color: getAccentColor("orange") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-pending">{pendingNotifications}</p>
                <p className="text-sm text-muted-foreground">Pending Alerts</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="lime">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("lime")}20` }}>
                <Heart className="h-5 w-5" style={{ color: getAccentColor("lime") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-celebrated">127</p>
                <p className="text-sm text-muted-foreground">Celebrated This Year</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-1 bg-transparent p-0 mb-6" data-testid="tabs-anniversaries">
          <TabsTrigger 
            value="upcoming" 
            data-testid="tab-upcoming"
            className="group relative bg-[#4FA6A6] text-white data-[state=active]:bg-[#4FA6A6] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Upcoming Anniversaries
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#4FA6A6] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="milestones" 
            data-testid="tab-milestones"
            className="group relative bg-[#7BC4DC] text-white data-[state=active]:bg-[#7BC4DC] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Milestone Achievers
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#7BC4DC] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="automation" 
            data-testid="tab-automation"
            className="group relative bg-[#92A05A] text-white data-[state=active]:bg-[#92A05A] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Automation Settings
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#92A05A] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cake className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
                Upcoming Giving Anniversaries
              </CardTitle>
              <CardDescription>Donors celebrating their giving anniversary soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAnniversaries.map((anniversary) => (
                  <div 
                    key={anniversary.id}
                    className="p-4 rounded-lg bg-card border border-border shadow-sm hover-elevate cursor-pointer"
                    style={{ borderLeftWidth: '4px', borderLeftColor: getAccentColor("teal") }}
                    data-testid={`anniversary-${anniversary.id}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{anniversary.donor}</h4>
                          <Badge style={{ backgroundColor: getAccentColor("orange"), color: "white" }}>
                            {anniversary.anniversary}
                          </Badge>
                          {anniversary.daysAway <= 7 && (
                            <Badge variant="outline" style={{ borderColor: getAccentColor("coral"), color: getAccentColor("coral") }}>
                              {anniversary.daysAway} days away
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">First Gift:</span>
                            <span className="ml-2 font-medium">{anniversary.firstGiftDate}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Total Gifts:</span>
                            <span className="ml-2 font-medium">{anniversary.totalGifts}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Lifetime:</span>
                            <span className="ml-2 font-medium">${anniversary.lifetimeGiving.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {anniversary.notificationSet ? (
                          <Badge variant="outline" style={{ color: getAccentColor("lime") }}>
                            <Bell className="h-3 w-3 mr-1" />
                            Alert Set
                          </Badge>
                        ) : (
                          <Button size="sm" data-testid={`button-set-alert-${anniversary.id}`}>
                            <Bell className="h-3 w-3 mr-1" />
                            Set Alert
                          </Button>
                        )}
                        <Button size="sm" variant="outline" data-testid={`button-celebrate-${anniversary.id}`}>
                          <Send className="h-3 w-3 mr-1" />
                          Celebrate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
                Recent Milestone Achievers
              </CardTitle>
              <CardDescription>Donors who recently hit major giving milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestoneAchievers.map((achiever, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-lg bg-card border border-border shadow-sm"
                    style={{ borderLeftWidth: '4px', borderLeftColor: getAccentColor("sky") }}
                    data-testid={`milestone-${idx}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("sky")}20` }}>
                          <Star className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
                        </div>
                        <div>
                          <p className="font-semibold">{achiever.donor}</p>
                          <p className="text-sm text-muted-foreground">Achieved: {achiever.achievedDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge style={{ backgroundColor: getAccentColor("lime"), color: "white" }}>
                          {achiever.milestone}
                        </Badge>
                        {achiever.celebrationSent ? (
                          <Badge variant="outline" style={{ color: getAccentColor("lime") }}>
                            Celebrated
                          </Badge>
                        ) : (
                          <Button size="sm" data-testid={`button-send-celebration-${idx}`}>
                            <Gift className="h-3 w-3 mr-1" />
                            Send Celebration
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" style={{ color: getAccentColor("olive") }} />
                Automated Celebration Messages
              </CardTitle>
              <CardDescription>Configure automatic anniversary and milestone messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automatedMessages.map((message, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-lg border bg-card"
                    style={{ borderLeftWidth: '4px', borderLeftColor: message.enabled ? getAccentColor("lime") : getAccentColor("coral") }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{message.type}</span>
                        <Badge variant="outline" className="text-xs">
                          {message.sendMethod}
                        </Badge>
                      </div>
                      <Badge variant={message.enabled ? "default" : "outline"}>
                        {message.enabled ? "Active" : "Disabled"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{message.template}</p>
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
