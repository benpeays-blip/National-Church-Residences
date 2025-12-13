import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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

export default function CorporateGiving() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

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
            <p className="text-xs text-muted-foreground mt-1">Campaign pledges</p>
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
            data-testid="input-search-gifts"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]" data-testid="select-filter-type">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Gift Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="annual">Annual Gift</SelectItem>
            <SelectItem value="matching">Matching Gift</SelectItem>
            <SelectItem value="capital">Capital Gift</SelectItem>
            <SelectItem value="pledge">Pledge</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="border">
        <CardHeader style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }}>
          <CardTitle>Corporate Gifts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Gift Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Designated Fund</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGifts.map((gift) => (
                <TableRow key={gift.id} className="cursor-pointer hover:bg-muted/50" data-testid={`row-gift-${gift.id}`}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {gift.logoUrl ? (
                        <img
                          src={gift.logoUrl}
                          alt=""
                          className="w-8 h-8 object-contain rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{gift.companyName}</p>
                        {gift.isRecurring && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Repeat className="w-3 h-3" />
                            {gift.recurringFrequency}
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
                      <p className="text-xs text-muted-foreground mt-1">
                        {gift.matchRatio} up to ${gift.matchCap?.toLocaleString()}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold" style={{ color: "#084594" }}>
                      ${gift.amount.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>{gift.designatedFund}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      {new Date(gift.giftDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{gift.contactName}</p>
                      <p className="text-xs text-muted-foreground">{gift.contactTitle}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
