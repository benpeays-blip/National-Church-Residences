import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  Heart,
  Users,
  Clock,
  TrendingUp,
  Activity,
  Stethoscope,
  Calendar,
  CheckCircle2,
  Star,
  ThumbsUp
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface VisitRecord {
  id: string;
  patientName: string;
  visitType: string;
  visitDate: string;
  duration: string;
  caregiver: string;
  outcome: string;
  followUp: string | null;
}

const recentVisits: VisitRecord[] = [
  { id: "1", patientName: "Dorothy M.", visitType: "Wellness Check", visitDate: "Dec 16, 2024", duration: "45 min", caregiver: "Sarah Johnson, RN", outcome: "Stable", followUp: "Dec 23" },
  { id: "2", patientName: "Robert K.", visitType: "Medication Management", visitDate: "Dec 16, 2024", duration: "30 min", caregiver: "Maria Garcia, LPN", outcome: "Improved", followUp: "Dec 20" },
  { id: "3", patientName: "Helen S.", visitType: "Physical Therapy", visitDate: "Dec 15, 2024", duration: "60 min", caregiver: "James Wilson, PT", outcome: "Progressing", followUp: "Dec 18" },
  { id: "4", patientName: "William B.", visitType: "Chronic Care", visitDate: "Dec 15, 2024", duration: "45 min", caregiver: "Lisa Chen, RN", outcome: "Stable", followUp: "Dec 22" },
  { id: "5", patientName: "Margaret T.", visitType: "Wound Care", visitDate: "Dec 14, 2024", duration: "40 min", caregiver: "Sarah Johnson, RN", outcome: "Healing", followUp: "Dec 17" },
  { id: "6", patientName: "George H.", visitType: "Wellness Check", visitDate: "Dec 14, 2024", duration: "35 min", caregiver: "Maria Garcia, LPN", outcome: "Stable", followUp: null },
  { id: "7", patientName: "Patricia A.", visitType: "Post-Hospital", visitDate: "Dec 13, 2024", duration: "60 min", caregiver: "David Brown, RN", outcome: "Recovering", followUp: "Dec 16" },
  { id: "8", patientName: "Charles D.", visitType: "Medication Management", visitDate: "Dec 13, 2024", duration: "25 min", caregiver: "Lisa Chen, RN", outcome: "Adjusted", followUp: "Dec 20" },
  { id: "9", patientName: "Elizabeth F.", visitType: "Physical Therapy", visitDate: "Dec 12, 2024", duration: "55 min", caregiver: "James Wilson, PT", outcome: "Improved", followUp: "Dec 15" },
  { id: "10", patientName: "Richard L.", visitType: "Chronic Care", visitDate: "Dec 12, 2024", duration: "50 min", caregiver: "Sarah Johnson, RN", outcome: "Stable", followUp: "Dec 19" },
];

const summaryMetrics = [
  { label: "Annual Home Visits", value: "156,420", icon: Heart },
  { label: "Active Patients", value: "4,850", icon: Users },
  { label: "Avg. Visit Duration", value: "42 min", icon: Clock },
  { label: "Patient Satisfaction", value: "96.8%", icon: Star },
];

const visitTypeBreakdown = [
  { type: "Wellness Checks", count: 52140, percentage: 33, trend: "+12%" },
  { type: "Medication Management", count: 37536, percentage: 24, trend: "+8%" },
  { type: "Chronic Care Management", count: 28157, percentage: 18, trend: "+15%" },
  { type: "Physical Therapy", count: 21899, percentage: 14, trend: "+5%" },
  { type: "Post-Hospital Follow-up", count: 10949, percentage: 7, trend: "-3%" },
  { type: "Wound Care", count: 5739, percentage: 4, trend: "+2%" },
];

const caregiverTeam = [
  { name: "Sarah Johnson, RN", role: "Lead Home Health Nurse", visits: 2840, rating: 4.9, yearsExp: 12 },
  { name: "Maria Garcia, LPN", role: "Home Health Nurse", visits: 2650, rating: 4.8, yearsExp: 8 },
  { name: "Lisa Chen, RN", role: "Chronic Care Specialist", visits: 2420, rating: 4.9, yearsExp: 10 },
  { name: "James Wilson, PT", role: "Physical Therapist", visits: 1890, rating: 4.7, yearsExp: 15 },
  { name: "David Brown, RN", role: "Post-Acute Care Nurse", visits: 1680, rating: 4.8, yearsExp: 6 },
];

const outcomeMetrics = [
  { metric: "Hospital Readmission Rate", value: "8.2%", benchmark: "12%", status: "better" },
  { metric: "Medication Adherence", value: "94%", benchmark: "85%", status: "better" },
  { metric: "Fall Prevention Success", value: "97%", benchmark: "90%", status: "better" },
  { metric: "Care Plan Completion", value: "92%", benchmark: "88%", status: "better" },
  { metric: "Same-Day Visit Response", value: "78%", benchmark: "75%", status: "better" },
];

const monthlyTrend = [
  { month: "Jul", visits: 12450 },
  { month: "Aug", visits: 13200 },
  { month: "Sep", visits: 12890 },
  { month: "Oct", visits: 13560 },
  { month: "Nov", visits: 14120 },
  { month: "Dec", visits: 14850 },
];

export default function ImpactHomeHealth() {
  const getOutcomeBadge = (outcome: string) => {
    return <Badge variant="secondary">{outcome}</Badge>;
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
          <h1 className="text-3xl font-bold" data-testid="page-title">Home Health Visits</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive tracking of in-home care services and patient outcomes
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
              <Activity className="h-5 w-5" />
              Visit Type Distribution
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Breakdown by service category (YTD)
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {visitTypeBreakdown.map((item) => (
                <div key={item.type} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.type}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{item.count.toLocaleString()}</span>
                      <Badge variant="outline" className={item.trend.startsWith("+") ? "text-green-600" : "text-red-600"}>
                        {item.trend}
                      </Badge>
                    </div>
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
              <ThumbsUp className="h-5 w-5" />
              Quality Outcomes
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Performance vs. industry benchmarks
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {outcomeMetrics.map((item) => (
                <div key={item.metric} className="p-3 rounded-lg bg-muted/50">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{item.metric}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-green-600">{item.value}</span>
                      <span className="text-xs text-muted-foreground">vs {item.benchmark}</span>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
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
            <Stethoscope className="h-5 w-5" />
            Care Team Performance
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Top caregivers by visit volume and patient satisfaction
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {caregiverTeam.map((caregiver) => (
              <Card key={caregiver.name} className="hover-elevate">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-sm">{caregiver.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{caregiver.role}</p>
                  <div className="mt-3 pt-3 border-t space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Visits (YTD)</span>
                      <span className="font-medium">{caregiver.visits.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Rating</span>
                      <span className="font-medium flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        {caregiver.rating}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="text-xl flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Visit Log
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Most recent home health visits
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Visit Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Caregiver</TableHead>
                  <TableHead>Outcome</TableHead>
                  <TableHead>Next Visit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentVisits.map((visit) => (
                  <TableRow key={visit.id} data-testid={`row-visit-${visit.id}`}>
                    <TableCell className="font-medium">{visit.patientName}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{visit.visitType}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{visit.visitDate}</TableCell>
                    <TableCell className="text-sm">{visit.duration}</TableCell>
                    <TableCell className="text-sm">{visit.caregiver}</TableCell>
                    <TableCell>{getOutcomeBadge(visit.outcome)}</TableCell>
                    <TableCell className="text-sm">
                      {visit.followUp ? (
                        <span className="text-primary font-medium">{visit.followUp}</span>
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

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Monthly Visit Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-40 gap-2">
            {monthlyTrend.map((month) => {
              const height = (month.visits / 15000) * 100;
              return (
                <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-primary/20 rounded-t-md transition-all hover:bg-primary/40"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{month.month}</span>
                  <span className="text-xs font-medium">{(month.visits / 1000).toFixed(1)}K</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
