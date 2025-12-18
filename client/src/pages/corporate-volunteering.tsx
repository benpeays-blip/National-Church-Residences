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
  CheckCircle,
  Circle,
  Phone,
  Mail,
  FileText,
  Send,
  Target,
  Sparkles,
  UserPlus,
  ClipboardList,
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

interface ActionStep {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  icon: typeof Phone;
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
  {
    id: "7",
    companyName: "Battelle Memorial Institute",
    logoUrl: "https://logo.clearbit.com/battelle.org",
    programType: "board_service",
    programName: "Executive Board Placement",
    volunteerCount: 3,
    totalHours: 180,
    hoursPerVolunteer: 60,
    upcomingEvents: 0,
    impactAreas: ["Strategic planning", "Governance", "Technology consulting"],
    coordinatorName: "Dr. Lisa Thompson",
    coordinatorEmail: "lthompson@battelle.org",
    status: "active",
    dollarValueOfTime: 54000,
  },
];

const programTypeLabels: Record<
  string,
  { label: string; variant: "default" | "secondary" | "outline"; icon: typeof Heart }
> = {
  days_of_service: { label: "Day of Service", variant: "default", icon: CalendarDays },
  skills_based: { label: "Skills-Based", variant: "secondary", icon: Briefcase },
  ongoing: { label: "Ongoing", variant: "outline", icon: Clock },
  board_service: { label: "Board Service", variant: "default", icon: Award },
};

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  active: { label: "Active", variant: "default" },
  planning: { label: "Planning", variant: "secondary" },
  completed: { label: "Completed", variant: "outline" },
};

const getActionSteps = (program: VolunteerProgram): ActionStep[] => {
  const today = new Date();
  
  if (program.programType === "days_of_service") {
    return [
      {
        id: 1,
        title: "Confirm event logistics",
        description: `Finalize venue, supplies, and volunteer assignments for ${program.programName}`,
        dueDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: false,
        icon: ClipboardList,
      },
      {
        id: 2,
        title: "Send volunteer reminders",
        description: `Email all ${program.volunteerCount} registered volunteers with event details and what to bring`,
        dueDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: false,
        icon: Mail,
      },
      {
        id: 3,
        title: "Prepare impact tracking",
        description: "Set up photo documentation and hour tracking for post-event report",
        dueDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: FileText,
      },
      {
        id: 4,
        title: "Thank coordinator",
        description: `Send thank you to ${program.coordinatorName} after event completion`,
        dueDate: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: Heart,
      },
      {
        id: 5,
        title: "Share impact report",
        description: "Compile photos, hours, and impact metrics for corporate partner",
        dueDate: new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: Send,
      },
    ];
  }
  
  if (program.programType === "skills_based") {
    return [
      {
        id: 1,
        title: "Define project scope",
        description: "Document specific deliverables and timeline for skills-based engagement",
        dueDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: true,
        icon: Target,
      },
      {
        id: 2,
        title: "Match volunteers to needs",
        description: `Connect ${program.volunteerCount} skilled volunteers with appropriate internal staff`,
        dueDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: false,
        icon: UserPlus,
      },
      {
        id: 3,
        title: "Schedule check-in meetings",
        description: "Set up bi-weekly progress calls with volunteer team leads",
        dueDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: Calendar,
      },
      {
        id: 4,
        title: "Prepare case study",
        description: "Document project outcomes for corporate partner's CSR reporting",
        dueDate: new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "low",
        completed: false,
        icon: FileText,
      },
    ];
  }
  
  if (program.programType === "ongoing") {
    return [
      {
        id: 1,
        title: "Update volunteer roster",
        description: "Confirm active volunteers and remove inactive participants",
        dueDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: Users,
      },
      {
        id: 2,
        title: "Send monthly schedule",
        description: `Distribute upcoming shift schedule to ${program.volunteerCount} volunteers`,
        dueDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: false,
        icon: Calendar,
      },
      {
        id: 3,
        title: "Quarterly hours report",
        description: "Compile volunteer hours and impact data for corporate partner",
        dueDate: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: FileText,
      },
      {
        id: 4,
        title: "Volunteer appreciation",
        description: "Plan quarterly volunteer recognition event or gifts",
        dueDate: new Date(today.getTime() + 45 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "low",
        completed: false,
        icon: Award,
      },
    ];
  }
  
  if (program.programType === "board_service") {
    return [
      {
        id: 1,
        title: "Schedule orientation",
        description: "Arrange board orientation for new corporate appointee",
        dueDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: true,
        icon: Calendar,
      },
      {
        id: 2,
        title: "Share board materials",
        description: "Send strategic plan, financials, and committee assignments",
        dueDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "high",
        completed: false,
        icon: FileText,
      },
      {
        id: 3,
        title: "Introduce to leadership",
        description: "Arrange meet-and-greet with CEO and senior staff",
        dueDate: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: Users,
      },
      {
        id: 4,
        title: "Committee placement",
        description: "Match board member skills to appropriate committee",
        dueDate: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority: "medium",
        completed: false,
        icon: Target,
      },
    ];
  }
  
  return [];
};

export default function CorporateVolunteering() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedProgram, setSelectedProgram] = useState<VolunteerProgram | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, number[]>>({});

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

  const toggleStepComplete = (programId: string, stepId: number) => {
    setCompletedSteps(prev => {
      const programSteps = prev[programId] || [];
      if (programSteps.includes(stepId)) {
        return { ...prev, [programId]: programSteps.filter(id => id !== stepId) };
      } else {
        return { ...prev, [programId]: [...programSteps, stepId] };
      }
    });
  };

  const isStepCompleted = (programId: string, stepId: number, defaultCompleted: boolean) => {
    if (completedSteps[programId]?.includes(stepId)) {
      return !defaultCompleted;
    }
    return defaultCompleted;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Corporate Volunteering</h1>
        <p className="text-sm text-muted-foreground">
          Manage employee volunteer programs, days of service, and skills-based initiatives
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: "#4A9B8C" }} data-testid="metric-total-volunteers">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volunteers</CardTitle>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#4A9B8C15" }}>
              <Users className="w-4 h-4" style={{ color: "#4A9B8C" }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#4A9B8C" }}>{totalVolunteers}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all programs</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: "#8B9A5C" }} data-testid="metric-total-hours">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volunteer Hours</CardTitle>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#8B9A5C15" }}>
              <Clock className="w-4 h-4" style={{ color: "#8B9A5C" }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#8B9A5C" }}>{totalHours.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">YTD contributed</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: "#D4884A" }} data-testid="metric-dollar-value">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dollar Value</CardTitle>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#D4884A15" }}>
              <Heart className="w-4 h-4" style={{ color: "#D4884A" }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#D4884A" }}>
              ${totalValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">In-kind service value</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: "#5BA3C6" }} data-testid="metric-active-programs">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#5BA3C615" }}>
              <Award className="w-4 h-4" style={{ color: "#5BA3C6" }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "#5BA3C6" }}>{activePrograms}</div>
            <p className="text-xs text-muted-foreground mt-1">Ongoing partnerships</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search programs or companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-48" data-testid="select-filter-type">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Programs</SelectItem>
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
              className="border hover:shadow-lg transition-shadow cursor-pointer hover-elevate"
              onClick={() => setSelectedProgram(program)}
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
                    <Badge variant={programTypeLabels[program.programType].variant}>
                      <TypeIcon className="w-3 h-3 mr-1" />
                      {programTypeLabels[program.programType].label}
                    </Badge>
                    <Badge variant={statusLabels[program.status].variant}>
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
                  <div className="flex items-center gap-2 text-sm bg-muted/50 p-2 rounded">
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
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detail Sheet */}
      <Sheet open={!!selectedProgram} onOpenChange={() => setSelectedProgram(null)}>
        <SheetContent className="w-[450px] sm:w-[540px] overflow-y-auto">
          {selectedProgram && (
            <>
              <SheetHeader className="pb-4">
                <div className="flex items-center gap-3">
                  {selectedProgram.logoUrl ? (
                    <img
                      src={selectedProgram.logoUrl}
                      alt={`${selectedProgram.companyName} logo`}
                      className="w-12 h-12 object-contain rounded-lg bg-muted p-2"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <SheetTitle>{selectedProgram.companyName}</SheetTitle>
                    <SheetDescription>
                      {selectedProgram.programName}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-6">
                {/* Program Stats */}
                <div className="grid grid-cols-3 gap-4 p-4 rounded-lg" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }}>
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: "#395174" }}>
                      {selectedProgram.volunteerCount}
                    </p>
                    <p className="text-xs text-muted-foreground">Volunteers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: "#395174" }}>
                      {selectedProgram.totalHours}
                    </p>
                    <p className="text-xs text-muted-foreground">Hours</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: "#395174" }}>
                      ${selectedProgram.dollarValueOfTime.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Value</p>
                  </div>
                </div>

                {/* Contact Info */}
                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Users className="w-4 h-4" style={{ color: "#395174" }} />
                      Program Coordinator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="font-medium">{selectedProgram.coordinatorName}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${selectedProgram.coordinatorEmail}`} className="hover:underline">
                        {selectedProgram.coordinatorEmail}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Recommendations */}
                <Card className="border" style={{ backgroundColor: "rgba(57, 81, 116, 0.05)" }}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4" style={{ color: "#395174" }} />
                      <h4 className="font-semibold text-sm" style={{ color: "#395174" }}>Recommended Next Steps</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Actions tailored for {programTypeLabels[selectedProgram.programType].label.toLowerCase()} programs to maximize engagement and impact.
                    </p>
                  </CardContent>
                </Card>

                {/* Action Steps */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <Target className="w-4 h-4" style={{ color: "#395174" }} />
                    Action Steps ({getActionSteps(selectedProgram).filter(s => !isStepCompleted(selectedProgram.id, s.id, s.completed)).length} remaining)
                  </h3>
                  
                  {getActionSteps(selectedProgram).map((step) => {
                    const StepIcon = step.icon;
                    const completed = isStepCompleted(selectedProgram.id, step.id, step.completed);
                    
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
                            onClick={() => toggleStepComplete(selectedProgram.id, step.id)}
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
                    Start Volunteer Workflow
                  </Button>
                  <Button variant="outline" className="w-full" data-testid="button-schedule-event">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Next Event
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
