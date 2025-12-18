import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  CreditCard, 
  FileText, 
  Settings,
  Download,
  Calendar,
  DollarSign,
  Heart,
  TrendingUp,
  Edit,
  RefreshCw,
  History,
  LogOut
} from "lucide-react";
import { AccentCard, getAccentColor } from "@/components/ui/accent-card";

const donorProfile = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "(555) 123-4567",
  address: "123 Main Street, Atlanta, GA 30301",
  memberSince: "January 2020",
  totalGiving: 25000,
  thisYear: 5000,
  recurringAmount: 100,
  recurringFrequency: "monthly"
};

const givingHistory = [
  { id: "1", date: "2024-12-15", amount: 100, type: "Recurring", campaign: "General Fund", receipt: true },
  { id: "2", date: "2024-11-15", amount: 100, type: "Recurring", campaign: "General Fund", receipt: true },
  { id: "3", date: "2024-10-28", amount: 500, type: "One-time", campaign: "Year-End Appeal", receipt: true },
  { id: "4", date: "2024-10-15", amount: 100, type: "Recurring", campaign: "General Fund", receipt: true },
  { id: "5", date: "2024-09-15", amount: 100, type: "Recurring", campaign: "General Fund", receipt: true },
];

const impactMetrics = [
  { label: "Families Housed", value: 12, description: "Your giving helped house 12 families this year" },
  { label: "Meals Provided", value: 480, description: "Over 480 nutritious meals served" },
  { label: "Children Served", value: 35, description: "35 children received afterschool support" },
];

export default function DonorPortal() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("portalUser");
    localStorage.removeItem("authToken");
    setLocation("/login");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Donor Portal</h1>
          <p className="text-sm text-muted-foreground">
            Self-service access for donors to manage their profile and giving
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleLogout}
          className="gap-2"
          data-testid="button-logout"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="bg-[#395174] p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
              {donorProfile.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{donorProfile.name}</h2>
              <p className="text-white/80">Member since {donorProfile.memberSince}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-3xl font-bold">${donorProfile.totalGiving.toLocaleString()}</p>
              <p className="text-white/80">Lifetime Giving</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AccentCard accent="teal">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("teal")}20` }}>
                <DollarSign className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-this-year">${donorProfile.thisYear.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Given This Year</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="sky">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("sky")}20` }}>
                <RefreshCw className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-recurring">${donorProfile.recurringAmount}/mo</p>
                <p className="text-sm text-muted-foreground">Recurring Gift</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="lime">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("lime")}20` }}>
                <History className="h-5 w-5" style={{ color: getAccentColor("lime") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-gifts">{givingHistory.length}</p>
                <p className="text-sm text-muted-foreground">Total Gifts</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="orange">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("orange")}20` }}>
                <Heart className="h-5 w-5" style={{ color: getAccentColor("orange") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-impact">47</p>
                <p className="text-sm text-muted-foreground">Lives Impacted</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 gap-1 bg-transparent p-0 mb-6" data-testid="tabs-portal">
          <TabsTrigger 
            value="overview" 
            data-testid="tab-overview"
            className="group relative bg-[#4FA6A6] text-white data-[state=active]:bg-[#4FA6A6] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Overview
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#4FA6A6] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            data-testid="tab-history"
            className="group relative bg-[#7BC4DC] text-white data-[state=active]:bg-[#7BC4DC] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Giving History
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#7BC4DC] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="recurring" 
            data-testid="tab-recurring"
            className="group relative bg-[#92A05A] text-white data-[state=active]:bg-[#92A05A] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Manage Recurring
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#92A05A] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="profile" 
            data-testid="tab-profile"
            className="group relative bg-[#E8A54B] text-white data-[state=active]:bg-[#E8A54B] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            My Profile
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#E8A54B] opacity-0 group-data-[state=active]:opacity-100" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" style={{ color: getAccentColor("coral") }} />
                  Your Impact
                </CardTitle>
                <CardDescription>How your giving is making a difference</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {impactMetrics.map((metric, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-lg border bg-card"
                      style={{ borderLeftWidth: '4px', borderLeftColor: getAccentColor("lime") }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{metric.label}</span>
                        <span className="text-2xl font-bold" style={{ color: getAccentColor("lime") }}>
                          {metric.value}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{metric.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
                  Year-End Summary
                </CardTitle>
                <CardDescription>Your 2024 giving at a glance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg border bg-card">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Total Given in 2024</span>
                    <span className="font-bold" style={{ color: getAccentColor("teal") }}>
                      ${donorProfile.thisYear.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={83} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">83% of your 2023 giving</p>
                </div>
                <Button className="w-full" variant="outline" data-testid="button-download-summary">
                  <Download className="h-4 w-4 mr-2" />
                  Download Tax Receipt Summary
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
                    Giving History
                  </CardTitle>
                  <CardDescription>Complete record of your donations</CardDescription>
                </div>
                <Button variant="outline" data-testid="button-download-all">
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {givingHistory.map((gift) => (
                  <div 
                    key={gift.id}
                    className="p-4 rounded-lg bg-card border border-border shadow-sm flex items-center justify-between"
                    style={{ borderLeftWidth: '4px', borderLeftColor: getAccentColor("teal") }}
                    data-testid={`gift-${gift.id}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("teal")}20` }}>
                        <DollarSign className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
                      </div>
                      <div>
                        <p className="font-medium">${gift.amount.toLocaleString()}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{gift.date}</span>
                          <span>•</span>
                          <span>{gift.campaign}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={gift.type === "Recurring" ? "default" : "secondary"}>
                        {gift.type}
                      </Badge>
                      {gift.receipt && (
                        <Button variant="ghost" size="sm" data-testid={`button-receipt-${gift.id}`}>
                          <FileText className="h-4 w-4 mr-1" />
                          Receipt
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recurring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" style={{ color: getAccentColor("olive") }} />
                Recurring Gift Settings
              </CardTitle>
              <CardDescription>Manage your monthly giving</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 rounded-lg border-2" style={{ borderColor: getAccentColor("olive"), backgroundColor: `${getAccentColor("olive")}05` }}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-lg">Monthly Gift</h4>
                    <p className="text-sm text-muted-foreground">Processed on the 15th of each month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold" style={{ color: getAccentColor("olive") }}>
                      ${donorProfile.recurringAmount}
                    </p>
                    <Badge style={{ backgroundColor: getAccentColor("lime"), color: "white" }}>Active</Badge>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" data-testid="button-update-amount">
                    <Edit className="h-4 w-4 mr-2" />
                    Update Amount
                  </Button>
                  <Button variant="outline" data-testid="button-update-payment">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Update Payment Method
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" style={{ color: getAccentColor("orange") }} />
                    Profile Information
                  </CardTitle>
                  <CardDescription>Keep your contact details up to date</CardDescription>
                </div>
                <Button data-testid="button-save-profile">
                  <Edit className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <Input defaultValue={donorProfile.name} className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input defaultValue={donorProfile.email} className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input defaultValue={donorProfile.phone} className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <Input defaultValue={donorProfile.address} className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}
