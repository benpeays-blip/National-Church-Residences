import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  Users,
  Clock,
  Heart,
  TrendingUp,
  Award,
  Calendar,
  Star,
  Gift,
  Building2
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface VolunteerProgram {
  id: string;
  name: string;
  category: string;
  volunteers: number;
  hoursYTD: number;
  residentsServed: number;
  satisfactionRate: number;
}

const volunteerPrograms: VolunteerProgram[] = [
  { id: "1", name: "Friendly Visitor Program", category: "Companionship", volunteers: 245, hoursYTD: 12450, residentsServed: 890, satisfactionRate: 98 },
  { id: "2", name: "Meals on Wheels", category: "Nutrition", volunteers: 180, hoursYTD: 8920, residentsServed: 1250, satisfactionRate: 96 },
  { id: "3", name: "Activity Leaders", category: "Recreation", volunteers: 125, hoursYTD: 6840, residentsServed: 2100, satisfactionRate: 94 },
  { id: "4", name: "Transportation Assistance", category: "Mobility", volunteers: 85, hoursYTD: 5280, residentsServed: 620, satisfactionRate: 97 },
  { id: "5", name: "Pet Therapy Visits", category: "Wellness", volunteers: 65, hoursYTD: 3120, residentsServed: 1800, satisfactionRate: 99 },
  { id: "6", name: "Tech Tutors", category: "Education", volunteers: 48, hoursYTD: 2890, residentsServed: 340, satisfactionRate: 92 },
  { id: "7", name: "Garden Club", category: "Recreation", volunteers: 72, hoursYTD: 2450, residentsServed: 480, satisfactionRate: 95 },
  { id: "8", name: "Music & Memory", category: "Wellness", volunteers: 35, hoursYTD: 1680, residentsServed: 290, satisfactionRate: 98 },
];

const summaryMetrics = [
  { label: "Total Volunteer Hours", value: "48,250", icon: Clock },
  { label: "Active Volunteers", value: "1,245", icon: Users },
  { label: "Residents Impacted", value: "8,450", icon: Heart },
  { label: "Volunteer Value", value: "$1.4M", icon: Gift },
];

const categoryBreakdown = [
  { category: "Companionship", hours: 14500, percentage: 30, volunteers: 312 },
  { category: "Nutrition Services", hours: 10800, percentage: 22, volunteers: 215 },
  { category: "Recreation & Activities", hours: 9600, percentage: 20, volunteers: 198 },
  { category: "Transportation", hours: 6200, percentage: 13, volunteers: 102 },
  { category: "Wellness Programs", hours: 4800, percentage: 10, volunteers: 124 },
  { category: "Education & Tech", hours: 2350, percentage: 5, volunteers: 58 },
];

const topVolunteers = [
  { name: "Margaret Wilson", hours: 425, programs: ["Friendly Visitor", "Meals on Wheels"], yearsActive: 8, community: "Wesley Glen" },
  { name: "Robert Thompson", hours: 380, programs: ["Transportation", "Activity Leader"], yearsActive: 5, community: "Crossing Pointe" },
  { name: "Susan Martinez", hours: 356, programs: ["Pet Therapy", "Music & Memory"], yearsActive: 3, community: "Sunday Village" },
  { name: "James Anderson", hours: 342, programs: ["Tech Tutors", "Garden Club"], yearsActive: 4, community: "Lakeview Commons" },
  { name: "Patricia Brown", hours: 318, programs: ["Meals on Wheels", "Friendly Visitor"], yearsActive: 6, community: "Heritage Village" },
];

const monthlyHours = [
  { month: "Jul", hours: 6850, volunteers: 890 },
  { month: "Aug", hours: 7200, volunteers: 920 },
  { month: "Sep", hours: 8100, volunteers: 985 },
  { month: "Oct", hours: 8450, volunteers: 1050 },
  { month: "Nov", hours: 9200, volunteers: 1180 },
  { month: "Dec", hours: 8450, volunteers: 1245 },
];

const corporatePartners = [
  { company: "Nationwide Insurance", employees: 85, hours: 2450, programs: ["Friendly Visitor", "Garden Club"] },
  { company: "Cardinal Health", employees: 62, hours: 1890, programs: ["Meals on Wheels", "Tech Tutors"] },
  { company: "Huntington Bank", employees: 48, hours: 1420, programs: ["Activity Leaders", "Transportation"] },
  { company: "Ohio State University", employees: 125, hours: 3200, programs: ["Pet Therapy", "Music & Memory"] },
];

export default function ImpactVolunteerHours() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/impact/overview">
          <Button variant="ghost" size="icon" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold" data-testid="page-title">Volunteer Hours</h1>
          <p className="text-muted-foreground mt-1">
            Tracking volunteer engagement and community impact
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
              <Clock className="h-5 w-5" />
              Hours by Category
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Volunteer time distribution across service areas
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {categoryBreakdown.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-muted-foreground">{item.hours.toLocaleString()} hrs ({item.volunteers} volunteers)</span>
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
              <Award className="h-5 w-5" />
              Top Volunteers
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Recognition for outstanding service
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {topVolunteers.map((volunteer, index) => (
                <div key={volunteer.name} className="p-3 rounded-lg bg-muted/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{volunteer.name}</div>
                      <div className="text-xs text-muted-foreground">{volunteer.community} · {volunteer.yearsActive} years</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">{volunteer.hours} hrs</div>
                    <div className="flex gap-1 mt-1">
                      {volunteer.programs.map((p) => (
                        <Badge key={p} variant="outline" className="text-xs">{p}</Badge>
                      ))}
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
            <Heart className="h-5 w-5" />
            Volunteer Programs
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Active programs and their impact
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Program Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Volunteers</TableHead>
                  <TableHead className="text-right">Hours (YTD)</TableHead>
                  <TableHead className="text-right">Residents Served</TableHead>
                  <TableHead className="text-right">Satisfaction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {volunteerPrograms.map((program) => (
                  <TableRow key={program.id} data-testid={`row-program-${program.id}`}>
                    <TableCell className="font-medium">{program.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{program.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{program.volunteers}</TableCell>
                    <TableCell className="text-right font-medium">{program.hoursYTD.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{program.residentsServed.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{program.satisfactionRate}%</span>
                      </div>
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
              <Building2 className="h-5 w-5" />
              Corporate Partners
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Employee volunteer programs
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {corporatePartners.map((partner) => (
                <div key={partner.company} className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{partner.company}</span>
                    <Badge variant="outline">{partner.hours.toLocaleString()} hrs</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{partner.employees} employee volunteers</span>
                    <span>{partner.programs.join(", ")}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Monthly Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-40 gap-2">
              {monthlyHours.map((month) => {
                const height = (month.hours / 10000) * 100;
                return (
                  <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-primary/20 rounded-t-md transition-all hover:bg-primary/40"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{month.month}</span>
                    <span className="text-xs font-medium">{(month.hours / 1000).toFixed(1)}K</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Upcoming Volunteer Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between">
                <span className="font-medium">Holiday Gift Wrapping</span>
                <Badge variant="outline">Dec 20</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Wesley Glen - 25 volunteers needed</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between">
                <span className="font-medium">New Year's Eve Party</span>
                <Badge variant="outline">Dec 31</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Multiple locations - 50 volunteers needed</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between">
                <span className="font-medium">Winter Wellness Fair</span>
                <Badge variant="outline">Jan 15</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Crossing Pointe - 15 volunteers needed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
