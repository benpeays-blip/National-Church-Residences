import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  Home,
  Users,
  DollarSign,
  TrendingUp,
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AffordableProperty {
  id: string;
  name: string;
  location: string;
  state: string;
  fundingSource: string;
  totalUnits: number;
  affordableUnits: number;
  occupancy: number;
  avgRent: number;
  marketRent: number;
  waitlist: number;
  yearBuilt: number;
}

const properties: AffordableProperty[] = [
  { id: "1", name: "Woda Village at Groveport", location: "Groveport", state: "OH", fundingSource: "LIHTC", totalUnits: 80, affordableUnits: 80, occupancy: 98, avgRent: 725, marketRent: 1250, waitlist: 45, yearBuilt: 2018 },
  { id: "2", name: "Sunday Village Senior", location: "Dallas", state: "TX", fundingSource: "Section 8", totalUnits: 120, affordableUnits: 120, occupancy: 95, avgRent: 680, marketRent: 1400, waitlist: 78, yearBuilt: 2015 },
  { id: "3", name: "Heritage Village", location: "Indianapolis", state: "IN", fundingSource: "LIHTC", totalUnits: 95, affordableUnits: 95, occupancy: 100, avgRent: 695, marketRent: 1180, waitlist: 62, yearBuilt: 2012 },
  { id: "4", name: "Lakeview Commons", location: "Cleveland", state: "OH", fundingSource: "HUD 202", totalUnits: 110, affordableUnits: 110, occupancy: 96, avgRent: 650, marketRent: 1100, waitlist: 89, yearBuilt: 2008 },
  { id: "5", name: "Riverside Village", location: "Jacksonville", state: "FL", fundingSource: "Section 8", totalUnits: 72, affordableUnits: 72, occupancy: 99, avgRent: 710, marketRent: 1350, waitlist: 54, yearBuilt: 2016 },
  { id: "6", name: "Oak Park Senior", location: "Detroit", state: "MI", fundingSource: "LIHTC", totalUnits: 88, affordableUnits: 88, occupancy: 94, avgRent: 625, marketRent: 980, waitlist: 38, yearBuilt: 2010 },
  { id: "7", name: "Maple Creek Apartments", location: "Columbus", state: "OH", fundingSource: "HUD 202", totalUnits: 65, affordableUnits: 65, occupancy: 100, avgRent: 590, marketRent: 1050, waitlist: 71, yearBuilt: 2005 },
  { id: "8", name: "Sunrise Senior Living", location: "Phoenix", state: "AZ", fundingSource: "LIHTC", totalUnits: 96, affordableUnits: 96, occupancy: 97, avgRent: 745, marketRent: 1450, waitlist: 92, yearBuilt: 2019 },
  { id: "9", name: "Valley View Homes", location: "Denver", state: "CO", fundingSource: "Section 8", totalUnits: 84, affordableUnits: 84, occupancy: 95, avgRent: 780, marketRent: 1580, waitlist: 105, yearBuilt: 2014 },
  { id: "10", name: "Green Meadows", location: "Atlanta", state: "GA", fundingSource: "LIHTC", totalUnits: 102, affordableUnits: 102, occupancy: 98, avgRent: 695, marketRent: 1320, waitlist: 67, yearBuilt: 2017 },
];

const summaryMetrics = [
  { label: "Total Affordable Units", value: "24,850", icon: Home },
  { label: "Residents Housed", value: "31,200", icon: Users },
  { label: "Avg. Rent Savings", value: "$485/mo", icon: DollarSign },
  { label: "Waitlist Families", value: "8,450", icon: Clock },
];

const fundingBreakdown = [
  { source: "Low-Income Housing Tax Credit (LIHTC)", units: 14200, percentage: 57, properties: 142 },
  { source: "HUD Section 8", units: 6450, percentage: 26, properties: 65 },
  { source: "HUD Section 202", units: 2850, percentage: 11, properties: 28 },
  { source: "State Housing Programs", units: 1350, percentage: 6, properties: 10 },
];

const amiBreakdown = [
  { level: "30% AMI or Below", units: 8900, percentage: 36, avgRent: "$520" },
  { level: "31-50% AMI", units: 9400, percentage: 38, avgRent: "$685" },
  { level: "51-60% AMI", units: 4200, percentage: 17, avgRent: "$825" },
  { level: "61-80% AMI", units: 2350, percentage: 9, avgRent: "$945" },
];

const stateDistribution = [
  { state: "Ohio", units: 6450, properties: 68, residents: 8200 },
  { state: "Texas", units: 3200, properties: 32, residents: 4100 },
  { state: "Florida", units: 2850, properties: 28, residents: 3600 },
  { state: "Georgia", units: 2400, properties: 24, residents: 3050 },
  { state: "Indiana", units: 2100, properties: 22, residents: 2680 },
  { state: "Other (23 states)", units: 7850, properties: 71, residents: 9570 },
];

const recentDevelopments = [
  { name: "Woda Village at Reynoldsburg", units: 96, status: "Opening Q1 2025", investment: "$18.5M" },
  { name: "Sunrise Phoenix Phase II", units: 64, status: "Under Construction", investment: "$14.2M" },
  { name: "Heritage Village Renovation", units: 95, status: "Renovation Complete", investment: "$2.4M" },
];

export default function ImpactAffordableUnits() {
  const getSavingsPercentage = (avgRent: number, marketRent: number) => {
    return Math.round((1 - avgRent / marketRent) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/impact/overview">
          <Button variant="ghost" size="icon" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold" data-testid="page-title">Affordable Housing Units</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive inventory of affordable housing across NCR communities
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryMetrics.map((metric) => (
          <Card key={metric.label} data-testid={`metric-${metric.label.toLowerCase().replace(/\s+/g, '-')}`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <metric.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-xl flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Funding Source Distribution
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Units by primary funding mechanism
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {fundingBreakdown.map((item) => (
                <div key={item.source} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.source}</span>
                    <span className="text-muted-foreground">{item.units.toLocaleString()} units ({item.properties} properties)</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-xl flex items-center gap-2">
              <Users className="h-5 w-5" />
              Income Level Served
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Units by Area Median Income (AMI) threshold
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {amiBreakdown.map((item) => (
                <div key={item.level} className="p-3 rounded-lg bg-muted/50">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-sm">{item.level}</span>
                      <div className="text-xs text-muted-foreground mt-1">Avg. rent: {item.avgRent}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{item.units.toLocaleString()} units</Badge>
                      <div className="text-xs text-muted-foreground mt-1">{item.percentage}% of portfolio</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="text-xl flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Property Inventory
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Sample of affordable housing communities
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Funding</TableHead>
                  <TableHead className="text-right">Units</TableHead>
                  <TableHead className="text-right">Occupancy</TableHead>
                  <TableHead className="text-right">Avg. Rent</TableHead>
                  <TableHead className="text-right">Savings</TableHead>
                  <TableHead className="text-right">Waitlist</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((property) => (
                  <TableRow key={property.id} data-testid={`row-property-${property.id}`}>
                    <TableCell className="font-medium">{property.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        {property.location}, {property.state}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{property.fundingSource}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{property.affordableUnits}</TableCell>
                    <TableCell className="text-right">
                      <span className="font-medium">{property.occupancy}%</span>
                    </TableCell>
                    <TableCell className="text-right">${property.avgRent}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">
                        {getSavingsPercentage(property.avgRent, property.marketRent)}% below market
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {property.waitlist > 0 ? (
                        <span className="font-medium">{property.waitlist}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-xl flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Geographic Distribution
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Units by state
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {stateDistribution.map((state) => (
                <div key={state.state} className="p-3 rounded-lg bg-muted/50 flex items-center justify-between">
                  <div>
                    <span className="font-medium">{state.state}</span>
                    <div className="text-xs text-muted-foreground mt-1">{state.properties} properties</div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-primary">{state.units.toLocaleString()} units</span>
                    <div className="text-xs text-muted-foreground">{state.residents.toLocaleString()} residents</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Development Pipeline
            </CardTitle>
            <CardDescription>New and renovated properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDevelopments.map((dev) => (
                <div key={dev.name} className="p-4 rounded-lg bg-muted/50 ">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{dev.name}</span>
                    <Badge variant="secondary">
                      {dev.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{dev.units} units</span>
                    <span className="font-medium">{dev.investment}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Impact Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-muted/50 text-center">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold">$181M</div>
              <div className="text-sm text-muted-foreground mt-1">Annual Rent Savings</div>
              <div className="text-xs text-muted-foreground mt-2">Compared to market rates</div>
            </div>
            <div className="p-6 rounded-lg bg-muted/50 text-center">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold">245</div>
              <div className="text-sm text-muted-foreground mt-1">Affordable Communities</div>
              <div className="text-xs text-muted-foreground mt-2">Across 28 states</div>
            </div>
            <div className="p-6 rounded-lg bg-muted/50 text-center">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold">97.2%</div>
              <div className="text-sm text-muted-foreground mt-1">Average Occupancy</div>
              <div className="text-xs text-muted-foreground mt-2">Above industry benchmark</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
