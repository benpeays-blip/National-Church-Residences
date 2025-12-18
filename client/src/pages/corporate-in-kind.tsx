import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Package,
  Building2,
  Calendar,
  Search,
  Filter,
  Truck,
  Wrench,
  Briefcase,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Users,
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

interface InKindDonation {
  id: string;
  companyName: string;
  logoUrl?: string;
  donationType: "goods" | "services" | "pro_bono" | "equipment";
  description: string;
  estimatedValue: number;
  quantity?: number;
  unit?: string;
  receivedDate: string;
  program?: string;
  status: "received" | "pending" | "scheduled";
  contactName: string;
  contactEmail: string;
  notes?: string;
}

const mockDonations: InKindDonation[] = [
  {
    id: "1",
    companyName: "Kroger",
    logoUrl: "https://logo.clearbit.com/kroger.com",
    donationType: "goods",
    description: "Non-perishable food items for food pantry",
    estimatedValue: 25000,
    quantity: 5000,
    unit: "lbs",
    receivedDate: "2024-03-15",
    program: "Food Pantry",
    status: "received",
    contactName: "Maria Gonzalez",
    contactEmail: "maria.gonzalez@kroger.com",
  },
  {
    id: "2",
    companyName: "Deloitte",
    logoUrl: "https://logo.clearbit.com/deloitte.com",
    donationType: "pro_bono",
    description: "Strategic planning consulting (40 hours)",
    estimatedValue: 20000,
    receivedDate: "2024-02-01",
    program: "Operations",
    status: "received",
    contactName: "James Chen",
    contactEmail: "jchen@deloitte.com",
    notes: "Completed strategic plan review and recommendations",
  },
  {
    id: "3",
    companyName: "IKEA",
    logoUrl: "https://logo.clearbit.com/ikea.com",
    donationType: "goods",
    description: "Furniture for community center renovation",
    estimatedValue: 15000,
    quantity: 50,
    unit: "pieces",
    receivedDate: "2024-04-01",
    program: "Community Center",
    status: "scheduled",
    contactName: "Erik Johansson",
    contactEmail: "erik.johansson@ikea.com",
  },
  {
    id: "4",
    companyName: "Baker Hostetler LLP",
    logoUrl: "https://logo.clearbit.com/bakerlaw.com",
    donationType: "pro_bono",
    description: "Legal services - contract review and compliance",
    estimatedValue: 35000,
    receivedDate: "2024-01-15",
    program: "Operations",
    status: "received",
    contactName: "Susan Whitfield",
    contactEmail: "swhitfield@bakerlaw.com",
  },
  {
    id: "5",
    companyName: "Best Buy",
    logoUrl: "https://logo.clearbit.com/bestbuy.com",
    donationType: "equipment",
    description: "Refurbished computers and tablets for digital literacy program",
    estimatedValue: 12000,
    quantity: 30,
    unit: "devices",
    receivedDate: "2024-03-01",
    program: "Digital Literacy",
    status: "received",
    contactName: "Tony Williams",
    contactEmail: "tony.williams@bestbuy.com",
  },
  {
    id: "6",
    companyName: "Sherwin-Williams",
    logoUrl: "https://logo.clearbit.com/sherwin-williams.com",
    donationType: "goods",
    description: "Paint and supplies for housing repairs",
    estimatedValue: 8000,
    quantity: 200,
    unit: "gallons",
    receivedDate: "2024-04-10",
    program: "Housing Repairs",
    status: "pending",
    contactName: "Robert Martinez",
    contactEmail: "rmartinez@sherwin.com",
  },
  {
    id: "7",
    companyName: "Ernst & Young",
    logoUrl: "https://logo.clearbit.com/ey.com",
    donationType: "services",
    description: "Financial audit services",
    estimatedValue: 45000,
    receivedDate: "2024-02-28",
    program: "Operations",
    status: "received",
    contactName: "Patricia Kim",
    contactEmail: "patricia.kim@ey.com",
  },
  {
    id: "8",
    companyName: "Grainger",
    logoUrl: "https://logo.clearbit.com/grainger.com",
    donationType: "equipment",
    description: "Maintenance tools and safety equipment",
    estimatedValue: 5000,
    quantity: 100,
    unit: "items",
    receivedDate: "2024-03-20",
    program: "Facilities",
    status: "received",
    contactName: "Mike Johnson",
    contactEmail: "mjohnson@grainger.com",
  },
];

const donationTypeLabels: Record<string, { label: string; variant: "default" | "secondary" | "outline"; icon: typeof Package }> = {
  goods: { label: "Goods", variant: "default", icon: Package },
  services: { label: "Services", variant: "secondary", icon: Wrench },
  pro_bono: { label: "Pro Bono", variant: "secondary", icon: Briefcase },
  equipment: { label: "Equipment", variant: "outline", icon: Truck },
};

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  received: { label: "Received", variant: "default" },
  pending: { label: "Pending", variant: "secondary" },
  scheduled: { label: "Scheduled", variant: "outline" },
};

export default function CorporateInKind() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredDonations = mockDonations.filter((d) => {
    const matchesSearch =
      d.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || d.donationType === filterType;
    const matchesStatus = filterStatus === "all" || d.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalValue = mockDonations.reduce((sum, d) => sum + d.estimatedValue, 0);
  const goodsValue = mockDonations
    .filter((d) => d.donationType === "goods")
    .reduce((sum, d) => sum + d.estimatedValue, 0);
  const servicesValue = mockDonations
    .filter((d) => d.donationType === "services" || d.donationType === "pro_bono")
    .reduce((sum, d) => sum + d.estimatedValue, 0);
  const donorCount = new Set(mockDonations.map((d) => d.companyName)).size;

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">In-Kind Donations</h1>
        <p className="text-sm text-muted-foreground">
          Track goods, services, and pro-bono donations from corporate partners
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: "#4A9B8C" }} data-testid="metric-total-value">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total In-Kind Value</CardTitle>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#4A9B8C15" }}>
              <DollarSign className="w-4 h-4" style={{ color: "#4A9B8C" }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#4A9B8C" }}>
              ${totalValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">FY2024 to date</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: "#8B9A5C" }} data-testid="metric-goods-value">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goods & Equipment</CardTitle>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#8B9A5C15" }}>
              <Package className="w-4 h-4" style={{ color: "#8B9A5C" }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#8B9A5C" }}>
              ${goodsValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Physical donations</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: "#D4884A" }} data-testid="metric-services-value">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services & Pro Bono</CardTitle>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#D4884A15" }}>
              <Briefcase className="w-4 h-4" style={{ color: "#D4884A" }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#D4884A" }}>
              ${servicesValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Professional services</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: "#5BA3C6" }} data-testid="metric-donor-count">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In-Kind Donors</CardTitle>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#5BA3C615" }}>
              <Users className="w-4 h-4" style={{ color: "#5BA3C6" }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#5BA3C6" }}>{donorCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Corporate partners</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by company or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-donations"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]" data-testid="select-filter-type">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Donation Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="goods">Goods</SelectItem>
            <SelectItem value="services">Services</SelectItem>
            <SelectItem value="pro_bono">Pro Bono</SelectItem>
            <SelectItem value="equipment">Equipment</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[160px]" data-testid="select-filter-status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="received">Received</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="border">
        <CardHeader style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }}>
          <CardTitle>In-Kind Donations</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Est. Value</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDonations.map((donation) => {
                const TypeIcon = donationTypeLabels[donation.donationType].icon;
                return (
                  <TableRow key={donation.id} className="cursor-pointer hover:bg-muted/50" data-testid={`row-donation-${donation.id}`}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {donation.logoUrl ? (
                          <img
                            src={donation.logoUrl}
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
                        <span className="font-medium">{donation.companyName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={donationTypeLabels[donation.donationType].variant}>
                        <TypeIcon className="w-3 h-3 mr-1" />
                        {donationTypeLabels[donation.donationType].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm truncate">{donation.description}</p>
                        {donation.program && (
                          <p className="text-xs text-muted-foreground">Program: {donation.program}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {donation.quantity && donation.unit ? (
                        <span>
                          {donation.quantity.toLocaleString()} {donation.unit}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold" style={{ color: "#084594" }}>
                        ${donation.estimatedValue.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {new Date(donation.receivedDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusLabels[donation.status].variant}>
                        {donation.status === "received" && <CheckCircle className="w-3 h-3 mr-1" />}
                        {statusLabels[donation.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
