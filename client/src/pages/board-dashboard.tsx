import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  BarChart3
} from "lucide-react";
import { AccentCard, getAccentColor } from "@/components/ui/accent-card";

const boardMemberProspects = [
  { id: "1", name: "Alexandra Sterling", capacity: "$500K+", relationship: "Personal Friend", stage: "Cultivation", lastContact: "Dec 10", nextStep: "Holiday call", priority: "high" },
  { id: "2", name: "Richard Morrison", capacity: "$250K", relationship: "Business Contact", stage: "Ask", lastContact: "Dec 5", nextStep: "Follow-up meeting", priority: "high" },
  { id: "3", name: "Victoria Chen", capacity: "$100K", relationship: "Gala Attendee", stage: "Prospect", lastContact: "Nov 28", nextStep: "Introduction lunch", priority: "medium" },
  { id: "4", name: "Harrison Brooks", capacity: "$1M+", relationship: "Family Friend", stage: "Steward", lastContact: "Dec 12", nextStep: "Thank you note", priority: "medium" },
];

const boardMetrics = {
  ytdRaised: 4250000,
  ytdGoal: 5000000,
  boardGiving: 850000,
  boardParticipation: 100,
  prospectsAssigned: 28,
  callsThisMonth: 12
};

const upcomingTasks = [
  { task: "Call Alexandra Sterling", dueDate: "Dec 18", type: "call" },
  { task: "Follow-up email to Richard Morrison", dueDate: "Dec 19", type: "email" },
  { task: "Prepare for January board meeting", dueDate: "Dec 20", type: "meeting" },
  { task: "Review major gift proposals", dueDate: "Dec 22", type: "review" },
];

const keyHighlights = [
  { title: "Year-End Campaign", value: "67% to goal", description: "On track for strong finish", positive: true },
  { title: "Major Gifts Pipeline", value: "$2.5M", description: "In active cultivation", positive: true },
  { title: "LYBUNT Recovery", value: "23 renewed", description: "This month", positive: true },
  { title: "Board Giving", value: "100%", description: "Participation achieved!", positive: true },
];

export default function BoardDashboard() {
  const ytdProgress = (boardMetrics.ytdRaised / boardMetrics.ytdGoal) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Board Member Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Simplified view of your prospects and organizational progress
          </p>
        </div>
        <Users className="h-8 w-8 text-muted-foreground" />
      </div>

      <Card className="overflow-hidden">
        <div className="bg-[#395174] p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Fiscal Year Progress</h2>
              <p className="text-white/80">FY2025 Fundraising Goal</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold">${(boardMetrics.ytdRaised / 1000000).toFixed(2)}M</p>
              <p className="text-white/80">of ${(boardMetrics.ytdGoal / 1000000).toFixed(0)}M goal</p>
            </div>
          </div>
          <Progress value={ytdProgress} className="h-4 bg-white/20" />
          <p className="text-white/80 text-sm mt-2">{Math.round(ytdProgress)}% to annual goal</p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AccentCard accent="teal">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("teal")}20` }}>
                <DollarSign className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-board-giving">${(boardMetrics.boardGiving / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">Board Giving</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="lime">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("lime")}20` }}>
                <CheckCircle2 className="h-5 w-5" style={{ color: getAccentColor("lime") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-participation">{boardMetrics.boardParticipation}%</p>
                <p className="text-sm text-muted-foreground">Board Participation</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="sky">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("sky")}20` }}>
                <Users className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-prospects">{boardMetrics.prospectsAssigned}</p>
                <p className="text-sm text-muted-foreground">Your Prospects</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="orange">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("orange")}20` }}>
                <Phone className="h-5 w-5" style={{ color: getAccentColor("orange") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-calls">{boardMetrics.callsThisMonth}</p>
                <p className="text-sm text-muted-foreground">Calls This Month</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
              Your Assigned Prospects
            </CardTitle>
            <CardDescription>Donors in your cultivation portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {boardMemberProspects.map((prospect) => (
                <div 
                  key={prospect.id}
                  className="p-4 rounded-lg bg-card border border-border shadow-sm hover-elevate cursor-pointer"
                  style={{ 
                    borderLeftWidth: '4px', 
                    borderLeftColor: prospect.priority === "high" ? getAccentColor("coral") : getAccentColor("teal") 
                  }}
                  data-testid={`prospect-${prospect.id}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{prospect.name}</h4>
                        <Badge variant="outline">{prospect.stage}</Badge>
                        {prospect.priority === "high" && (
                          <Badge style={{ backgroundColor: getAccentColor("coral"), color: "white" }}>
                            Priority
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Capacity:</span>
                          <span className="ml-2 font-medium" style={{ color: getAccentColor("teal") }}>{prospect.capacity}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Relationship:</span>
                          <span className="ml-2">{prospect.relationship}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Contact:</span>
                          <span className="ml-2">{prospect.lastContact}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm font-medium" style={{ color: getAccentColor("sky") }}>Next Step:</p>
                      <p className="text-sm">{prospect.nextStep}</p>
                      <Button size="sm" variant="outline" className="mt-2" data-testid={`button-log-${prospect.id}`}>
                        Log Activity
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" style={{ color: getAccentColor("orange") }} />
                Upcoming Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.map((task, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-lg border bg-card"
                    style={{ borderLeftWidth: '3px', borderLeftColor: getAccentColor("orange") }}
                    data-testid={`task-${idx}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {task.type === "call" && <Phone className="h-3 w-3" style={{ color: getAccentColor("teal") }} />}
                      {task.type === "email" && <Mail className="h-3 w-3" style={{ color: getAccentColor("sky") }} />}
                      {task.type === "meeting" && <Users className="h-3 w-3" style={{ color: getAccentColor("orange") }} />}
                      {task.type === "review" && <CheckCircle2 className="h-3 w-3" style={{ color: getAccentColor("lime") }} />}
                      <span className="font-medium text-sm">{task.task}</span>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {task.dueDate}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" style={{ color: getAccentColor("lime") }} />
                Key Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {keyHighlights.map((highlight, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-lg border bg-card"
                    style={{ borderLeftWidth: '3px', borderLeftColor: getAccentColor("lime") }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{highlight.title}</span>
                      <span className="font-bold" style={{ color: getAccentColor("lime") }}>
                        {highlight.value}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{highlight.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
