import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DollarSign,
  Building2,
  Calendar,
  Search,
  Filter,
  RefreshCw,
  Gift,
  ArrowRight,
  Users,
  Repeat,
  Target,
  CheckCircle,
  Circle,
  Phone,
  Mail,
  FileText,
  Clock,
  Send,
  Heart,
  Sparkles,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CorporateGift {
  id: string;
  companyName: string;
  logoUrl?: string;
  giftType: "annual" | "matching" | "capital" | "pledge" | "recurring";
  amount: number;
  matchRatio?: string;
  matchCap?: number;
  designatedFund?: string;
  giftDate: string;
  fiscalYear: string;
  campaign?: string;
  contactName: string;
  contactTitle: string;
  isRecurring: boolean;
  recurringFrequency?: "monthly" | "quarterly" | "annually";
}

interface ActionStep {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  icon: typeof Phone;
}

const mockGifts: CorporateGift[] = [
  {
    id: "1",
    companyName: "JPMorgan Chase",
    logoUrl: "https://logo.clearbit.com/jpmorganchase.com",
    giftType: "matching",
    amount: 150000,
    matchRatio: "2:1",
    matchCap: 25000,
    designatedFund: "Employee Matching Program",
    giftDate: "2024-02-15",
    fiscalYear: "FY2024",
    contactName: "David Martinez",
    contactTitle: "Corporate Giving Manager",
    isRecurring: true,
    recurringFrequency: "annually",
  },
  {
    id: "2",
    companyName: "Honda of America",
    logoUrl: "https://logo.clearbit.com/honda.com",
    giftType: "annual",
    amount: 100000,
    designatedFund: "General Operating",
    giftDate: "2024-01-10",
    fiscalYear: "FY2024",
    campaign: "Annual Fund 2024",
    contactName: "Lisa Yamamoto",
    contactTitle: "Community Affairs Director",
    isRecurring: true,
    recurringFrequency: "annually",
  },
  {
    id: "3",
    companyName: "Worthington Industries",
    logoUrl: "https://logo.clearbit.com/worthingtonindustries.com",
    giftType: "capital",
    amount: 250000,
    designatedFund: "Building Expansion Fund",
    giftDate: "2024-03-01",
    fiscalYear: "FY2024",
    campaign: "Capital Campaign",
    contactName: "John McConnell III",
    contactTitle: "Foundation President",
    isRecurring: false,
  },
  {
    id: "4",
    companyName: "Bob Evans Farms",
    logoUrl: "https://logo.clearbit.com/bobevansgrocery.com",
    giftType: "pledge",
    amount: 75000,
    designatedFund: "Nutrition Programs",
    giftDate: "2024-01-15",
    fiscalYear: "FY2024",
    contactName: "Emily Henderson",
    contactTitle: "VP Community Relations",
    isRecurring: false,
  },
  {
    id: "5",
    companyName: "Wendy's Company",
    logoUrl: "https://logo.clearbit.com/wendys.com",
    giftType: "matching",
    amount: 45000,
    matchRatio: "1:1",
    matchCap: 5000,
    designatedFund: "Youth Programs",
    giftDate: "2024-02-28",
    fiscalYear: "FY2024",
    contactName: "Mark Stevens",
    contactTitle: "Foundation Director",
    isRecurring: true,
    recurringFrequency: "annually",
  },
  {
    id: "6",
    companyName: "Battelle Memorial Institute",
    logoUrl: "https://logo.clearbit.com/battelle.org",
    giftType: "annual",
    amount: 50000,
    designatedFund: "STEM Education",
    giftDate: "2024-01-05",
    fiscalYear: "FY2024",
    campaign: "Annual Fund 2024",
    contactName: "Dr. Karen Phillips",
    contactTitle: "VP Community Engagement",
    isRecurring: true,
    recurringFrequency: "annually",
  },
];

const giftTypeLabels: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  annual: { label: "Annual Gift", variant: "secondary" },
  matching: { label: "Matching Gift", variant: "default" },
  capital: { label: "Capital Gift", variant: "default" },
  pledge: { label: "Pledge", variant: "secondary" },
  recurring: { label: "Recurring", variant: "outline" },
};

const getActionSteps = (gift: CorporateGift): ActionStep[] => {
  const today = new Date();
  
  if (gift.giftType === "matching") {
    return [
      {
        id: 1,
        title: "Send thank you letter",
        description: `Personalized thank you to ${gift.contactName} acknowledging their ${gift.matchRatio} matching program contribution`,
        dueDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: false,
        icon: Send,
      },
      {
        id: 2,
        title: "Prepare matching gift report",
        description: "Compile employee participation rates and total matches for quarterly review",
        dueDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: false,
        icon: FileText,
      },
      {
        id: 3,
        title: "Promote matching program internally",
        description: "Create employee newsletter feature highlighting matching gift opportunity",
        dueDate: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: Users,
      },
      {
        id: 4,
        title: "Schedule renewal meeting",
        description: `Book meeting with ${gift.contactName} to discuss program expansion for next fiscal year`,
        dueDate: new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: Calendar,
      },
    ];
  }
  
  if (gift.giftType === "annual") {
    return [
      {
        id: 1,
        title: "Send acknowledgment letter",
        description: `Tax receipt and thank you letter to ${gift.companyName} within 48 hours of gift receipt`,
        dueDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: true,
        icon: Send,
      },
      {
        id: 2,
        title: "CEO thank you call",
        description: `Schedule personal thank you call from CEO to ${gift.contactName}`,
        dueDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: false,
        icon: Phone,
      },
      {
        id: 3,
        title: "Add to Annual Report donor list",
        description: "Ensure proper recognition level in Annual Report publication",
        dueDate: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: FileText,
      },
      {
        id: 4,
        title: "Schedule site visit",
        description: `Invite ${gift.contactName} to tour facilities and see impact firsthand`,
        dueDate: new Date(today.getTime() + 45 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "low",
        completed: false,
        icon: Building2,
      },
      {
        id: 5,
        title: "Prepare renewal proposal",
        description: "Draft renewal ask with impact report 3 months before next giving cycle",
        dueDate: new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: Target,
      },
    ];
  }
  
  if (gift.giftType === "capital") {
    return [
      {
        id: 1,
        title: "Send formal acknowledgment",
        description: `Board-signed thank you letter and tax documentation to ${gift.companyName}`,
        dueDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: true,
        icon: Send,
      },
      {
        id: 2,
        title: "Recognition planning meeting",
        description: `Meet with ${gift.contactName} to discuss naming and recognition preferences`,
        dueDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: false,
        icon: Users,
      },
      {
        id: 3,
        title: "Create signage specifications",
        description: "Design and approve permanent recognition signage for building/space",
        dueDate: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: Building2,
      },
      {
        id: 4,
        title: "Monthly construction updates",
        description: "Set up automated progress reports with photos for capital campaign donors",
        dueDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: FileText,
      },
      {
        id: 5,
        title: "Plan dedication ceremony",
        description: "Schedule ribbon-cutting or dedication event with corporate leadership",
        dueDate: new Date(today.getTime() + 180 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "low",
        completed: false,
        icon: Heart,
      },
    ];
  }
  
  if (gift.giftType === "pledge") {
    return [
      {
        id: 1,
        title: "Confirm pledge terms",
        description: `Send signed pledge agreement to ${gift.contactName} for countersignature`,
        dueDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: false,
        icon: FileText,
      },
      {
        id: 2,
        title: "Set up payment schedule",
        description: "Configure CRM for pledge installment reminders and tracking",
        dueDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: false,
        icon: Calendar,
      },
      {
        id: 3,
        title: "Send first payment reminder",
        description: "Gentle reminder with payment instructions 2 weeks before first installment",
        dueDate: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: Clock,
      },
      {
        id: 4,
        title: "Quarterly pledge status report",
        description: "Update finance team on pledge fulfillment progress",
        dueDate: new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: Target,
      },
    ];
  }
  
  return [
    {
      id: 1,
      title: "Send thank you",
      description: `Acknowledge gift from ${gift.companyName}`,
      dueDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      priority: "high",
      completed: false,
      icon: Send,
    },
    {
      id: 2,
      title: "Schedule follow-up",
      description: `Connect with ${gift.contactName} to discuss ongoing partnership`,
      dueDate: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      priority: "medium",
      completed: false,
      icon: Phone,
    },
  ];
};

export default function CorporateGiving() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedGift, setSelectedGift] = useState<CorporateGift | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, number[]>>({});

  const filteredGifts = mockGifts.filter((g) => {
    const matchesSearch =
      g.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.designatedFund?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || g.giftType === filterType;
    return matchesSearch && matchesType;
  });

  const totalGiving = mockGifts.reduce((sum, g) => sum + g.amount, 0);
  const matchingPrograms = mockGifts.filter((g) => g.giftType === "matching").length;
  const recurringGivers = mockGifts.filter((g) => g.isRecurring).length;
  const capitalGifts = mockGifts.filter((g) => g.giftType === "capital").reduce((sum, g) => sum + g.amount, 0);

  const toggleStepComplete = (giftId: string, stepId: number) => {
    setCompletedSteps(prev => {
      const giftSteps = prev[giftId] || [];
      if (giftSteps.includes(stepId)) {
        return { ...prev, [giftId]: giftSteps.filter(id => id !== stepId) };
      } else {
        return { ...prev, [giftId]: [...giftSteps, stepId] };
      }
    });
  };

  const isStepCompleted = (giftId: string, stepId: number, defaultCompleted: boolean) => {
    if (completedSteps[giftId]?.includes(stepId)) {
      return !defaultCompleted;
    }
    return defaultCompleted;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Corporate Giving</h1>
        <p className="text-sm text-muted-foreground">
          Track direct donations, matching gift programs, and annual corporate gifts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: "#4A9B8C" }} data-testid="metric-total-giving">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Corporate Giving</CardTitle>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#4A9B8C15" }}>
              <DollarSign className="w-4 h-4" style={{ color: "#4A9B8C" }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#4A9B8C" }}>
              ${totalGiving.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">FY2024 to date</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: "#8B9A5C" }} data-testid="metric-matching-programs">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Matching Programs</CardTitle>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#8B9A5C15" }}>
              <RefreshCw className="w-4 h-4" style={{ color: "#8B9A5C" }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#8B9A5C" }}>{matchingPrograms}</div>
            <p className="text-xs text-muted-foreground mt-1">Active matching partners</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: "#D4884A" }} data-testid="metric-recurring-givers">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recurring Givers</CardTitle>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#D4884A15" }}>
              <Repeat className="w-4 h-4" style={{ color: "#D4884A" }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#D4884A" }}>{recurringGivers}</div>
            <p className="text-xs text-muted-foreground mt-1">Annual commitments</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: "#5BA3C6" }} data-testid="metric-capital-gifts">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capital Gifts</CardTitle>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#5BA3C615" }}>
              <Target className="w-4 h-4" style={{ color: "#5BA3C6" }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#5BA3C6" }}>
              ${capitalGifts.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Building fund contributions</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by company or fund..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]" data-testid="select-filter-type">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="annual">Annual</SelectItem>
            <SelectItem value="matching">Matching</SelectItem>
            <SelectItem value="capital">Capital</SelectItem>
            <SelectItem value="pledge">Pledge</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGifts.map((gift) => (
          <Card
            key={gift.id}
            className="border hover:shadow-lg transition-shadow cursor-pointer hover-elevate"
            onClick={() => setSelectedGift(gift)}
            data-testid={`card-gift-${gift.id}`}
          >
            <CardHeader className="pb-3" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {gift.logoUrl ? (
                    <img
                      src={gift.logoUrl}
                      alt={`${gift.companyName} logo`}
                      className="w-12 h-12 object-contain rounded-lg bg-white p-1 border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-lg">{gift.companyName}</CardTitle>
                    <p className="text-sm text-muted-foreground">{gift.designatedFund}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <Badge variant={giftTypeLabels[gift.giftType].variant}>
                    {giftTypeLabels[gift.giftType].label}
                  </Badge>
                  {gift.matchRatio && (
                    <Badge variant="outline" className="text-xs">
                      {gift.matchRatio} Match
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Gift Amount</p>
                  <p className="text-xl font-bold" style={{ color: "#084594" }}>
                    ${gift.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Gift Date</p>
                  <p className="text-lg font-semibold">
                    {new Date(gift.giftDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {gift.campaign && (
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4" style={{ color: "#084594" }} />
                    <p className="text-sm font-medium">{gift.campaign}</p>
                  </div>
                </div>
              )}

              {gift.isRecurring && (
                <div className="flex items-center gap-2 text-sm">
                  <Repeat className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Recurring:</span>
                  <span className="capitalize">{gift.recurringFrequency}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{gift.contactName}</p>
                    <p className="text-xs text-muted-foreground">{gift.contactTitle}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Steps Sheet */}
      <Sheet open={!!selectedGift} onOpenChange={() => setSelectedGift(null)}>
        <SheetContent className="w-[450px] sm:w-[540px] overflow-y-auto">
          {selectedGift && (
            <>
              <SheetHeader className="pb-4">
                <div className="flex items-center gap-3">
                  {selectedGift.logoUrl ? (
                    <img
                      src={selectedGift.logoUrl}
                      alt={`${selectedGift.companyName} logo`}
                      className="w-12 h-12 object-contain rounded-lg bg-muted p-2"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <SheetTitle>{selectedGift.companyName}</SheetTitle>
                    <SheetDescription>
                      {giftTypeLabels[selectedGift.giftType].label} • ${selectedGift.amount.toLocaleString()}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-6">
                {/* Gift Stats */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-lg" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }}>
                  <div>
                    <p className="text-xs text-muted-foreground">Gift Amount</p>
                    <p className="text-2xl font-bold" style={{ color: "#395174" }}>
                      ${selectedGift.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Gift Date</p>
                    <p className="text-lg font-semibold">
                      {new Date(selectedGift.giftDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Fiscal Year</p>
                    <p className="text-lg font-semibold">{selectedGift.fiscalYear}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Designation</p>
                    <p className="text-sm font-medium">{selectedGift.designatedFund}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Users className="w-4 h-4" style={{ color: "#395174" }} />
                      Primary Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="font-medium">{selectedGift.contactName}</p>
                    <p className="text-sm text-muted-foreground">{selectedGift.contactTitle}</p>
                  </CardContent>
                </Card>

                {/* AI Recommendations */}
                <Card className="border" style={{ backgroundColor: "rgba(57, 81, 116, 0.05)" }}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4" style={{ color: "#395174" }} />
                      <h4 className="font-semibold text-sm" style={{ color: "#395174" }}>AI-Recommended Actions</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      These action steps are tailored for {giftTypeLabels[selectedGift.giftType].label.toLowerCase()}s to maximize stewardship and renewal potential.
                    </p>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <Target className="w-4 h-4" style={{ color: "#395174" }} />
                    Action Steps ({getActionSteps(selectedGift).filter(s => !isStepCompleted(selectedGift.id, s.id, s.completed)).length} remaining)
                  </h3>
                  
                  {getActionSteps(selectedGift).map((step) => {
                    const StepIcon = step.icon;
                    const completed = isStepCompleted(selectedGift.id, step.id, step.completed);
                    
                    return (
                      <div
                        key={step.id}
                        className={`p-4 rounded-lg border transition-all ${
                          completed ? "bg-muted/50 opacity-60" : "bg-background"
                        }`}
                        data-testid={`action-step-${step.id}`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleStepComplete(selectedGift.id, step.id)}
                            className="mt-0.5 flex-shrink-0"
                            data-testid={`button-toggle-step-${step.id}`}
                          >
                            {completed ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                            )}
                          </button>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={`font-medium text-sm ${completed ? "line-through text-muted-foreground" : ""}`}>
                                {step.title}
                              </h4>
                              <Badge
                                variant={
                                  step.priority === "high"
                                    ? "destructive"
                                    : step.priority === "medium"
                                    ? "secondary"
                                    : "outline"
                                }
                                className="text-xs"
                              >
                                {step.priority}
                              </Badge>
                            </div>
                            <p className={`text-sm ${completed ? "text-muted-foreground/60" : "text-muted-foreground"}`}>
                              {step.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                <span>Due: {step.dueDate}</span>
                              </div>
                              <div 
                                className="w-6 h-6 rounded flex items-center justify-center"
                                style={{ backgroundColor: "rgba(57, 81, 116, 0.1)" }}
                              >
                                <StepIcon className="w-3 h-3" style={{ color: "#395174" }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t space-y-2">
                  <Button className="w-full" style={{ backgroundColor: "#395174" }} data-testid="button-start-workflow">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Stewardship Workflow
                  </Button>
                  <Button variant="outline" className="w-full" data-testid="button-view-history">
                    <Clock className="w-4 h-4 mr-2" />
                    View Full Gift History
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
