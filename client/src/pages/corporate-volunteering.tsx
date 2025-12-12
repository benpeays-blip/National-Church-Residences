import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Building2,
  Calendar,
  Clock,
  Search,
  Filter,
  Heart,
  Award,
  Briefcase,
  ArrowRight,
  MapPin,
  CalendarDays,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VolunteerProgram {
  id: string;
  companyName: string;
  logoUrl?: string;
  programType: "days_of_service" | "skills_based" | "ongoing" | "board_service";
  programName: string;
  volunteerCount: number;
  totalHours: number;
  hoursPerVolunteer: number;
  nextEvent?: string;
  upcomingEvents: number;
  impactAreas: string[];
  coordinatorName: string;
  coordinatorEmail: string;
  status: "active" | "planning" | "completed";
  dollarValueOfTime: number;
}

const mockPrograms: VolunteerProgram[] = [
  {
    id: "1",
    companyName: "Nationwide Insurance",
    logoUrl: "https://logo.clearbit.com/nationwide.com",
    programType: "days_of_service",
    programName: "Nationwide Cares Day",
    volunteerCount: 150,
    totalHours: 600,
    hoursPerVolunteer: 4,
    nextEvent: "2024-06-15",
    upcomingEvents: 2,
    impactAreas: ["Housing repairs", "Community beautification", "Meal preparation"],
    coordinatorName: "Amanda Peters",
    coordinatorEmail: "amanda.peters@nationwide.com",
    status: "active",
    dollarValueOfTime: 18000,
  },
  {
    id: "2",
    companyName: "Cardinal Health",
    logoUrl: "https://logo.clearbit.com/cardinalhealth.com",
    programType: "skills_based",
    programName: "Healthcare Consulting Pro Bono",
    volunteerCount: 12,
    totalHours: 480,
    hoursPerVolunteer: 40,
    upcomingEvents: 0,
    impactAreas: ["Health program design", "Pharmacy consulting", "Supply chain optimization"],
    coordinatorName: "Dr. James Wilson",
    coordinatorEmail: "james.wilson@cardinalhealth.com",
    status: "active",
    dollarValueOfTime: 48000,
  },
  {
    id: "3",
    companyName: "JPMorgan Chase",
    logoUrl: "https://logo.clearbit.com/jpmorganchase.com",
    programType: "skills_based",
    programName: "Financial Literacy Volunteers",
    volunteerCount: 25,
    totalHours: 200,
    hoursPerVolunteer: 8,
    nextEvent: "2024-05-20",
    upcomingEvents: 4,
    impactAreas: ["Financial education", "Budget counseling", "Homeownership workshops"],
    coordinatorName: "Michael Rodriguez",
    coordinatorEmail: "michael.rodriguez@jpmchase.com",
    status: "active",
    dollarValueOfTime: 25000,
  },
  {
    id: "4",
    companyName: "Huntington Bank",
    logoUrl: "https://logo.clearbit.com/huntington.com",
    programType: "ongoing",
    programName: "Monthly Meal Service",
    volunteerCount: 40,
    totalHours: 320,
    hoursPerVolunteer: 8,
    nextEvent: "2024-05-01",
    upcomingEvents: 12,
    impactAreas: ["Meal preparation", "Food delivery", "Kitchen assistance"],
    coordinatorName: "Sarah Chen",
    coordinatorEmail: "sarah.chen@huntington.com",
    status: "active",
    dollarValueOfTime: 9600,
  },
  {
    id: "5",
    companyName: "Ohio State University",
    logoUrl: "https://logo.clearbit.com/osu.edu",
    programType: "ongoing",
    programName: "Student Intern Program",
    volunteerCount: 8,
    totalHours: 1600,
    hoursPerVolunteer: 200,
    upcomingEvents: 0,
    impactAreas: ["Administrative support", "Program assistance", "Data analysis"],
    coordinatorName: "Dr. Emily Park",
    coordinatorEmail: "park.emily@osu.edu",
    status: "active",
    dollarValueOfTime: 24000,
  },
  {
    id: "6",
    companyName: "Big Lots",
    logoUrl: "https://logo.clearbit.com/biglots.com",
    programType: "days_of_service",
    programName: "Big Lots Day of Giving",
    volunteerCount: 75,
    totalHours: 300,
    hoursPerVolunteer: 4,
    nextEvent: "2024-07-10",
    upcomingEvents: 1,
    impactAreas: ["Home furnishing donations", "Warehouse organization", "Community cleanup"],
    coordinatorName: "Kevin Thompson",
    coordinatorEmail: "kthompson@biglots.com",
    status: "planning",
    dollarValueOfTime: 9000,
  },
];

const programTypeLabels: Record<string, { label: string; color: string; icon: typeof Heart }> = {
  days_of_service: { label: "Days of Service", color: "bg-purple-100 text-purple-700", icon: CalendarDays },
  skills_based: { label: "Skills-Based", color: "bg-blue-100 text-blue-700", icon: Briefcase },
  ongoing: { label: "Ongoing Program", color: "bg-green-100 text-green-700", icon: Heart },
  board_service: { label: "Board Service", color: "bg-amber-100 text-amber-700", icon: Award },
};

const statusLabels: Record<string, { label: string; color: string }> = {
  active: { label: "Active", color: "bg-green-100 text-green-700" },
  planning: { label: "Planning", color: "bg-yellow-100 text-yellow-700" },
  completed: { label: "Completed", color: "bg-gray-100 text-gray-600" },
};

export default function CorporateVolunteering() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const filteredPrograms = mockPrograms.filter((p) => {
    const matchesSearch =
      p.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.programName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || p.programType === filterType;
    return matchesSearch && matchesType;
  });

  const totalVolunteers = mockPrograms.reduce((sum, p) => sum + p.volunteerCount, 0);
  const totalHours = mockPrograms.reduce((sum, p) => sum + p.totalHours, 0);
  const totalValue = mockPrograms.reduce((sum, p) => sum + p.dollarValueOfTime, 0);
  const activePrograms = mockPrograms.filter((p) => p.status === "active").length;

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Corporate Volunteering</h1>
        <p className="text-sm text-muted-foreground">
          Track employee volunteer programs, skills-based volunteering, and Days of Service
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }} data-testid="metric-total-volunteers">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volunteers</CardTitle>
            <Users className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>{totalVolunteers}</div>
            <p className="text-xs text-muted-foreground mt-1">Corporate volunteers</p>
          </CardContent>
        </Card>

        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }} data-testid="metric-total-hours">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>{totalHours.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Hours contributed</p>
          </CardContent>
        </Card>

        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }} data-testid="metric-dollar-value">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Value of Time</CardTitle>
            <Heart className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>
              ${totalValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">@ $30/hour avg</p>
          </CardContent>
        </Card>

        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }} data-testid="metric-active-programs">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
            <Award className="w-4 h-4" style={{ color: "#084594" }} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#084594" }}>{activePrograms}</div>
            <p className="text-xs text-muted-foreground mt-1">Ongoing partnerships</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by company or program..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-programs"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[200px]" data-testid="select-filter-type">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Program Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="days_of_service">Days of Service</SelectItem>
            <SelectItem value="skills_based">Skills-Based</SelectItem>
            <SelectItem value="ongoing">Ongoing Program</SelectItem>
            <SelectItem value="board_service">Board Service</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPrograms.map((program) => {
          const TypeIcon = programTypeLabels[program.programType].icon;
          return (
            <Card
              key={program.id}
              className="border hover:shadow-lg transition-shadow cursor-pointer"
              data-testid={`card-program-${program.id}`}
            >
              <CardHeader className="pb-3" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {program.logoUrl ? (
                      <img
                        src={program.logoUrl}
                        alt={`${program.companyName} logo`}
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
                      <CardTitle className="text-lg">{program.companyName}</CardTitle>
                      <p className="text-sm text-muted-foreground">{program.programName}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <Badge className={programTypeLabels[program.programType].color}>
                      <TypeIcon className="w-3 h-3 mr-1" />
                      {programTypeLabels[program.programType].label}
                    </Badge>
                    <Badge className={statusLabels[program.status].color}>
                      {statusLabels[program.status].label}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: "#084594" }}>
                      {program.volunteerCount}
                    </p>
                    <p className="text-xs text-muted-foreground">Volunteers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: "#084594" }}>
                      {program.totalHours}
                    </p>
                    <p className="text-xs text-muted-foreground">Hours</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: "#084594" }}>
                      ${program.dollarValueOfTime.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Value</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Impact Areas</p>
                  <div className="flex flex-wrap gap-1">
                    {program.impactAreas.map((area, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                {program.nextEvent && (
                  <div className="flex items-center gap-2 text-sm bg-blue-50 p-2 rounded">
                    <Calendar className="w-4 h-4" style={{ color: "#084594" }} />
                    <span>Next event: {new Date(program.nextEvent).toLocaleDateString()}</span>
                    {program.upcomingEvents > 1 && (
                      <Badge variant="secondary" className="ml-auto">
                        +{program.upcomingEvents - 1} more
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t">
                  <div>
                    <p className="text-sm font-medium">{program.coordinatorName}</p>
                    <p className="text-xs text-muted-foreground">{program.coordinatorEmail}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Details
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
