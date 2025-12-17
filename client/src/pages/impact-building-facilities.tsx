import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  Building2,
  Users,
  MapPin,
  TrendingUp,
  Home,
  Heart,
  Calendar,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Facility {
  id: string;
  name: string;
  location: string;
  state: string;
  type: "Affordable Housing" | "Senior Living" | "CCRC" | "Memory Care" | "Assisted Living";
  totalUnits: number;
  occupancy: number;
  residentsServed: number;
  avgAge: number;
  servicesAvailable: string[];
  yearOpened: number;
  lastRenovation: number;
  status: "Active" | "Under Renovation" | "New Development";
}

const facilities: Facility[] = [
  { id: "1", name: "Woda Village at Groveport", location: "Groveport", state: "OH", type: "Affordable Housing", totalUnits: 80, occupancy: 98, residentsServed: 145, avgAge: 72, servicesAvailable: ["On-site Manager", "Service Coordinator", "Community Room"], yearOpened: 2018, lastRenovation: 2023, status: "Active" },
  { id: "2", name: "Sunday Village Senior Apartments", location: "Dallas", state: "TX", type: "Affordable Housing", totalUnits: 120, occupancy: 95, residentsServed: 198, avgAge: 74, servicesAvailable: ["On-site Manager", "Service Coordinator", "Fitness Center", "Community Garden"], yearOpened: 2015, lastRenovation: 2022, status: "Active" },
  { id: "3", name: "Crossing Pointe North", location: "Atlanta", state: "GA", type: "Senior Living", totalUnits: 156, occupancy: 92, residentsServed: 267, avgAge: 78, servicesAvailable: ["24/7 Staff", "Dining Services", "Wellness Center", "Transportation"], yearOpened: 2010, lastRenovation: 2021, status: "Active" },
  { id: "4", name: "Wesley Glen Retirement Community", location: "Columbus", state: "OH", type: "CCRC", totalUnits: 245, occupancy: 94, residentsServed: 412, avgAge: 81, servicesAvailable: ["Full Continuum of Care", "Skilled Nursing", "Rehabilitation", "Memory Care"], yearOpened: 1971, lastRenovation: 2020, status: "Active" },
  { id: "5", name: "Park Place at Winton Woods", location: "Cincinnati", state: "OH", type: "Assisted Living", totalUnits: 88, occupancy: 97, residentsServed: 88, avgAge: 84, servicesAvailable: ["Personal Care", "Medication Management", "Meals", "Activities"], yearOpened: 2005, lastRenovation: 2023, status: "Active" },
  { id: "6", name: "Heritage Village", location: "Indianapolis", state: "IN", type: "Affordable Housing", totalUnits: 95, occupancy: 100, residentsServed: 156, avgAge: 71, servicesAvailable: ["On-site Manager", "Service Coordinator", "Computer Lab"], yearOpened: 2012, lastRenovation: 2024, status: "Under Renovation" },
  { id: "7", name: "Lakeview Senior Commons", location: "Cleveland", state: "OH", type: "Affordable Housing", totalUnits: 110, occupancy: 96, residentsServed: 178, avgAge: 73, servicesAvailable: ["On-site Manager", "Service Coordinator", "Library", "Laundry"], yearOpened: 2008, lastRenovation: 2022, status: "Active" },
  { id: "8", name: "Sunrise Memory Care Center", location: "Phoenix", state: "AZ", type: "Memory Care", totalUnits: 48, occupancy: 94, residentsServed: 48, avgAge: 82, servicesAvailable: ["Specialized Memory Care", "Secured Environment", "Therapeutic Programs"], yearOpened: 2019, lastRenovation: 2024, status: "Active" },
  { id: "9", name: "Maple Grove Estates", location: "Minneapolis", state: "MN", type: "Senior Living", totalUnits: 180, occupancy: 91, residentsServed: 295, avgAge: 76, servicesAvailable: ["Independent Living", "Wellness Programs", "Dining", "Social Activities"], yearOpened: 2000, lastRenovation: 2021, status: "Active" },
  { id: "10", name: "Riverside Senior Village", location: "Jacksonville", state: "FL", type: "Affordable Housing", totalUnits: 72, occupancy: 99, residentsServed: 124, avgAge: 70, servicesAvailable: ["On-site Manager", "Service Coordinator", "Pool", "Clubhouse"], yearOpened: 2016, lastRenovation: 2023, status: "Active" },
  { id: "11", name: "Green Valley Commons", location: "Denver", state: "CO", type: "Senior Living", totalUnits: 135, occupancy: 88, residentsServed: 215, avgAge: 77, servicesAvailable: ["Independent Living", "Assisted Living", "Dining", "Fitness"], yearOpened: 1998, lastRenovation: 2020, status: "Active" },
  { id: "12", name: "Oak Harbor Senior Living", location: "Seattle", state: "WA", type: "CCRC", totalUnits: 200, occupancy: 93, residentsServed: 345, avgAge: 80, servicesAvailable: ["Full Continuum of Care", "Rehab Services", "Memory Care", "Hospice"], yearOpened: 1985, lastRenovation: 2022, status: "Active" },
];

const summaryMetrics = [
  { label: "Total Facilities", value: "340", icon: Building2 },
  { label: "Total Residents Served", value: "32,450", icon: Users },
  { label: "Average Occupancy", value: "94.2%", icon: TrendingUp },
  { label: "States Served", value: "28", icon: MapPin },
];

const facilityTypeBreakdown = [
  { type: "Affordable Housing", count: 245, percentage: 72, residents: 18500 },
  { type: "Senior Living", count: 52, percentage: 15, residents: 8200 },
  { type: "CCRC", count: 16, percentage: 5, residents: 3800 },
  { type: "Assisted Living", count: 18, percentage: 5, residents: 1450 },
  { type: "Memory Care", count: 9, percentage: 3, residents: 500 },
];

const regionBreakdown = [
  { region: "Midwest", facilities: 165, residents: 15800, states: ["OH", "IN", "MI", "MN", "WI", "IL"] },
  { region: "Southeast", facilities: 78, residents: 7200, states: ["GA", "FL", "NC", "SC", "TN"] },
  { region: "Southwest", facilities: 52, residents: 4800, states: ["TX", "AZ", "NM", "OK"] },
  { region: "West", facilities: 28, residents: 2900, states: ["WA", "OR", "CA", "CO"] },
  { region: "Northeast", facilities: 17, residents: 1750, states: ["PA", "NY", "NJ", "MD"] },
];

export default function ImpactBuildingFacilities() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge variant="secondary"><CheckCircle2 className="w-3 h-3 mr-1" />{status}</Badge>;
      case "Under Renovation":
        return <Badge variant="outline"><AlertCircle className="w-3 h-3 mr-1" />{status}</Badge>;
      case "New Development":
        return <Badge variant="default"><Building2 className="w-3 h-3 mr-1" />{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    return <Badge variant="outline">{type}</Badge>;
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
          <h1 className="text-3xl font-bold" data-testid="page-title">Building Facilities</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive view of all NCR properties and residents served
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
              <Building2 className="h-5 w-5" />
              Facility Type Breakdown
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Distribution by property type
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {facilityTypeBreakdown.map((item) => (
                <div key={item.type} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.type}</span>
                    <span className="text-muted-foreground">{item.count} facilities ({item.residents.toLocaleString()} residents)</span>
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
              <MapPin className="h-5 w-5" />
              Regional Distribution
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Facilities and residents by region
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {regionBreakdown.map((region) => (
                <div key={region.region} className="p-3 rounded-lg bg-muted/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{region.region}</span>
                    <Badge variant="secondary">{region.facilities} facilities</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{region.residents.toLocaleString()} residents</span>
                    <span className="text-xs">{region.states.join(", ")}</span>
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
            <Home className="h-5 w-5" />
            Facility Directory
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Sample of NCR properties with resident counts
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Facility Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Units</TableHead>
                  <TableHead className="text-right">Occupancy</TableHead>
                  <TableHead className="text-right">Residents</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facilities.map((facility) => (
                  <TableRow key={facility.id} data-testid={`row-facility-${facility.id}`}>
                    <TableCell className="font-medium">{facility.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        {facility.location}, {facility.state}
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(facility.type)}</TableCell>
                    <TableCell className="text-right">{facility.totalUnits}</TableCell>
                    <TableCell className="text-right">
                      <span className="font-medium">{facility.occupancy}%</span>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{facility.residentsServed}</TableCell>
                    <TableCell>{getStatusBadge(facility.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Recent Developments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between">
                <span className="font-medium">Woda Village at Reynoldsburg - Grand Opening</span>
                <Badge variant="secondary">Dec 2024</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">New 96-unit affordable housing community now welcoming residents</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between">
                <span className="font-medium">Heritage Village Renovation Complete</span>
                <Badge variant="secondary">Nov 2024</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">$2.4M accessibility and energy efficiency upgrades completed</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between">
                <span className="font-medium">Sunrise Memory Care Expansion</span>
                <Badge variant="secondary">Oct 2024</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Added 16 new specialized memory care suites in Phoenix</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
