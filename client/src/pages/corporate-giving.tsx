import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
  TrendingUp,
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
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const baseSteps: ActionStep[] = [];
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
        icon: TrendingUp,
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
        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }} data-testid="metric-total-giving">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Corporate Giving</CardTitle>
            <DollarSign className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>
              ${totalGiving.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">FY2024 to date</p>
          </CardContent>
        </Card>

        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }} data-testid="metric-matching-programs">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Matching Programs</CardTitle>
            <RefreshCw className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>{matchingPrograms}</div>
            <p className="text-xs text-muted-foreground mt-1">Active matching partners</p>
          </CardContent>
        </Card>

        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }} data-testid="metric-recurring-givers">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recurring Givers</CardTitle>
            <Repeat className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>{recurringGivers}</div>
            <p className="text-xs text-muted-foreground mt-1">Annual commitments</p>
          </CardContent>
        </Card>

        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }} data-testid="metric-capital-gifts">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capital Gifts</CardTitle>
            <Target className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>
              ${capitalGifts.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Building fund contributions</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="rounded-t-xl" style={{ backgroundColor: "#395174" }}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Corporate Gifts</CardTitle>
              <p className="text-white/70 text-sm mt-1">
                {filteredGifts.length} gifts • Click arrow to view action steps
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64 bg-white/90"
                  data-testid="input-search"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40 bg-white/90" data-testid="select-filter-type">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter type" />
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
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Company</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGifts.map((gift) => (
                <TableRow 
                  key={gift.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  data-testid={`row-gift-${gift.id}`}
                >
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      {gift.logoUrl ? (
                        <img
                          src={gift.logoUrl}
                          alt={`${gift.companyName} logo`}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <Building2 className="w-8 h-8 text-muted-foreground" />
                      )}
                      <div>
                        <p className="font-medium">{gift.companyName}</p>
                        {gift.isRecurring && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Repeat className="w-3 h-3" />
                            <span>{gift.recurringFrequency}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={giftTypeLabels[gift.giftType].variant}>
                      {giftTypeLabels[gift.giftType].label}
                    </Badge>
                    {gift.matchRatio && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({gift.matchRatio})
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold" style={{ color: "#084594" }}>
                      ${gift.amount.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{gift.designatedFund}</span>
                    {gift.campaign && (
                      <p className="text-xs text-muted-foreground">{gift.campaign}</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(gift.giftDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <p className="text-xs text-muted-foreground">{gift.fiscalYear}</p>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{gift.contactName}</p>
                      <p className="text-xs text-muted-foreground">{gift.contactTitle}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedGift(gift)}
                      data-testid={`button-actions-${gift.id}`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
                <Card className="border" style={{ backgroundColor: "rgba(57, 81, 116, 0.05)" }}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4" style={{ color: "#395174" }} />
                      <h4 className="font-semibold text-sm" style={{ color: "#395174" }}>AI-Recommended Actions</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      These action steps are tailored for {selectedGift.giftType} gifts to maximize stewardship and renewal potential.
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
