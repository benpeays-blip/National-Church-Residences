import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Star, 
  Gift, 
  Mail,
  Users,
  DollarSign,
  Calendar,
  Search,
  Plus,
  Send,
  Flower2
} from "lucide-react";
import { AccentCard, getAccentColor } from "@/components/ui/accent-card";

const tributeGifts = [
  { 
    id: "1", 
    type: "honor", 
    donor: "Sarah Johnson", 
    honoree: "Dr. James Wilson", 
    occasion: "Retirement",
    amount: 500, 
    date: "2024-12-15",
    notificationSent: true,
    notifyEmail: "jwilson@email.com"
  },
  { 
    id: "2", 
    type: "memory", 
    donor: "Michael Chen", 
    honoree: "Margaret Chen", 
    occasion: "In Memory",
    amount: 1000, 
    date: "2024-12-10",
    notificationSent: true,
    notifyEmail: "family@email.com"
  },
  { 
    id: "3", 
    type: "honor", 
    donor: "Emily Rodriguez", 
    honoree: "Maria Santos", 
    occasion: "Birthday",
    amount: 250, 
    date: "2024-12-08",
    notificationSent: false,
    notifyEmail: "msantos@email.com"
  },
  { 
    id: "4", 
    type: "memory", 
    donor: "David Kim", 
    honoree: "Robert Kim", 
    occasion: "Anniversary",
    amount: 2500, 
    date: "2024-12-05",
    notificationSent: true,
    notifyEmail: null
  },
  { 
    id: "5", 
    type: "honor", 
    donor: "Jennifer Williams", 
    honoree: "Community Heroes", 
    occasion: "Appreciation",
    amount: 100, 
    date: "2024-12-01",
    notificationSent: true,
    notifyEmail: "heroes@email.com"
  },
];

const pendingNotifications = tributeGifts.filter(g => !g.notificationSent && g.notifyEmail);

export default function TributeGiving() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGifts = tributeGifts.filter(gift => {
    const matchesSearch = 
      gift.donor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gift.honoree.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    return matchesSearch && gift.type === selectedTab;
  });

  const totalHonor = tributeGifts.filter(g => g.type === "honor").reduce((sum, g) => sum + g.amount, 0);
  const totalMemory = tributeGifts.filter(g => g.type === "memory").reduce((sum, g) => sum + g.amount, 0);
  const totalTribute = totalHonor + totalMemory;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Tribute & Memorial Giving</h1>
          <p className="text-sm text-muted-foreground">
            Track "In Honor Of" and "In Memory Of" donations with automatic notifications
          </p>
        </div>
        <Heart className="h-8 w-8 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AccentCard accent="teal">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("teal")}20` }}>
                <DollarSign className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-total">${(totalTribute / 1000).toFixed(1)}K</p>
                <p className="text-sm text-muted-foreground">Total Tribute Gifts</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="sky">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("sky")}20` }}>
                <Star className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-honor">${(totalHonor / 1000).toFixed(1)}K</p>
                <p className="text-sm text-muted-foreground">In Honor Of</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="coral">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("coral")}20` }}>
                <Flower2 className="h-5 w-5" style={{ color: getAccentColor("coral") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-memory">${(totalMemory / 1000).toFixed(1)}K</p>
                <p className="text-sm text-muted-foreground">In Memory Of</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="orange">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("orange")}20` }}>
                <Mail className="h-5 w-5" style={{ color: getAccentColor("orange") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-pending">{pendingNotifications.length}</p>
                <p className="text-sm text-muted-foreground">Pending Notifications</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-1 bg-transparent p-0 mb-6" data-testid="tabs-tribute">
          <TabsTrigger 
            value="all" 
            data-testid="tab-all"
            className="group relative bg-[#4FA6A6] text-white data-[state=active]:bg-[#4FA6A6] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            All Tributes
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#4FA6A6] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="honor" 
            data-testid="tab-honor"
            className="group relative bg-[#7BC4DC] text-white data-[state=active]:bg-[#7BC4DC] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            In Honor Of
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#7BC4DC] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="memory" 
            data-testid="tab-memory"
            className="group relative bg-[#E86B5A] text-white data-[state=active]:bg-[#E86B5A] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            In Memory Of
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#E86B5A] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
                    Tribute Gifts
                  </CardTitle>
                  <CardDescription>Donations made in honor or memory of loved ones</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by donor or honoree..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                      data-testid="input-search"
                    />
                  </div>
                  <Button data-testid="button-add-tribute">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tribute
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredGifts.map((gift) => (
                  <div 
                    key={gift.id}
                    className="p-4 rounded-lg bg-card border border-border shadow-sm hover-elevate cursor-pointer"
                    style={{ 
                      borderLeftWidth: '4px', 
                      borderLeftColor: gift.type === "honor" ? getAccentColor("sky") : getAccentColor("coral") 
                    }}
                    data-testid={`tribute-${gift.id}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge 
                            style={{ 
                              backgroundColor: gift.type === "honor" ? getAccentColor("sky") : getAccentColor("coral"),
                              color: "white"
                            }}
                          >
                            {gift.type === "honor" ? "In Honor Of" : "In Memory Of"}
                          </Badge>
                          <Badge variant="outline">{gift.occasion}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Donor:</span>
                            <span className="ml-2 font-medium">{gift.donor}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Honoree:</span>
                            <span className="ml-2 font-medium">{gift.honoree}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Date:</span>
                            <span className="ml-2">{gift.date}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Notification:</span>
                            {gift.notificationSent ? (
                              <Badge variant="outline" className="ml-2 text-xs" style={{ color: getAccentColor("lime") }}>
                                Sent
                              </Badge>
                            ) : gift.notifyEmail ? (
                              <Badge variant="outline" className="ml-2 text-xs" style={{ color: getAccentColor("orange") }}>
                                Pending
                              </Badge>
                            ) : (
                              <span className="ml-2 text-xs text-muted-foreground">N/A</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-2xl font-bold" style={{ color: getAccentColor("teal") }}>
                          ${gift.amount.toLocaleString()}
                        </p>
                        {!gift.notificationSent && gift.notifyEmail && (
                          <Button size="sm" variant="outline" className="mt-2" data-testid={`button-notify-${gift.id}`}>
                            <Send className="h-3 w-3 mr-1" />
                            Send Notice
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
      </Tabs>

      {pendingNotifications.length > 0 && (
        <Card className="border-2" style={{ borderColor: `${getAccentColor("orange")}30`, backgroundColor: `${getAccentColor("orange")}05` }}>
          <CardContent className="py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("orange")}20` }}>
                <Mail className="h-6 w-6" style={{ color: getAccentColor("orange") }} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{pendingNotifications.length} Notification{pendingNotifications.length > 1 ? 's' : ''} Pending</h3>
                <p className="text-sm text-muted-foreground">
                  Honorees or families haven't been notified about these tribute gifts yet.
                </p>
              </div>
              <Button style={{ backgroundColor: getAccentColor("orange") }} data-testid="button-send-all">
                <Send className="h-4 w-4 mr-2" />
                Send All Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
