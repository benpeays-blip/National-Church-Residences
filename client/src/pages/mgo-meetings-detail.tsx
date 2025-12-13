import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Clock, MapPin, Video, Coffee, TrendingUp, CheckCircle } from "lucide-react";

// Dummy meetings data
const meetingsData = {
  stats: {
    total: 18,
    thisWeek: 4,
    thisMonth: 12,
    avgPerWeek: 3,
  },
  upcomingMeetings: [
    { id: 1, title: "Capital Campaign Discussion", donor: "David Thompson", date: "2024-11-08", time: "10:00 AM", duration: "90 min", location: "Conference Room A", type: "In-Person", purpose: "Ask", notes: "Present $350K opportunity, prepare proposal materials", priority: "High" },
    { id: 2, title: "Naming Opportunity Presentation", donor: "Christopher Davis", date: "2024-11-08", time: "2:00 PM", duration: "120 min", location: "Zoom", type: "Virtual", purpose: "Ask", notes: "Share facility naming options, discuss $500K commitment", priority: "Critical" },
    { id: 3, title: "Board Networking Lunch", donor: "Lisa Anderson", date: "2024-11-09", time: "12:00 PM", duration: "90 min", location: "The Terrace Restaurant", type: "In-Person", purpose: "Cultivation", notes: "Introduce to board members, discuss involvement opportunities", priority: "High" },
    { id: 4, title: "Quarterly Check-in", donor: "Sarah Chen", date: "2024-11-10", time: "9:30 AM", duration: "45 min", location: "Coffee Shop Downtown", type: "In-Person", purpose: "Stewardship", notes: "Thank for recent gift, share program updates", priority: "Medium" },
    { id: 5, title: "Impact Report Review", donor: "Michael Roberts", date: "2024-11-11", time: "3:00 PM", duration: "60 min", location: "Zoom", type: "Virtual", purpose: "Stewardship", notes: "Walk through Q3 results, discuss future support", priority: "Medium" },
    { id: 6, title: "Facility Tour", donor: "Jennifer Liu", date: "2024-11-12", time: "11:00 AM", duration: "120 min", location: "Main Campus", type: "In-Person", purpose: "Cultivation", notes: "Show community center renovation, introduce program staff", priority: "Medium" },
    { id: 7, title: "Coffee Meeting", donor: "Robert Martinez", date: "2024-11-14", time: "8:00 AM", duration: "45 min", location: "Starbucks Main St", type: "In-Person", purpose: "Cultivation", notes: "Discuss volunteer opportunities and interests", priority: "Low" },
    { id: 8, title: "Planned Giving Discussion", donor: "Daniel Brown", date: "2024-11-18", time: "1:00 PM", duration: "90 min", location: "Conference Room B", type: "In-Person", purpose: "Cultivation", notes: "Explore estate planning options, invite planned giving officer", priority: "Medium" },
  ],
  pastMeetings: [
    { id: 101, title: "Cultivation Dinner", donor: "Sarah Chen", date: "2024-11-03", outcome: "Secured $430K commitment", rating: 5, notes: "Excellent conversation, donor highly engaged" },
    { id: 102, title: "Discovery Meeting", donor: "Lisa Anderson", date: "2024-11-02", outcome: "Identified interest in programs", rating: 4, notes: "Good rapport established, ready for next steps" },
    { id: 103, title: "Follow-up Call", donor: "David Thompson", date: "2024-11-01", outcome: "Scheduled proposal meeting", rating: 4, notes: "Donor enthusiastic about capital campaign" },
    { id: 104, title: "Thank You Visit", donor: "Christopher Davis", date: "2024-10-30", outcome: "Discussed naming opportunity", rating: 5, notes: "Very receptive to major gift conversation" },
    { id: 105, title: "Facility Tour", donor: "Michael Roberts", date: "2024-10-28", outcome: "Strong interest confirmed", rating: 4, notes: "Impressed with programs, wants to stay engaged" },
  ],
  meetingsByType: [
    { type: "In-Person", count: 14, percentage: 78 },
    { type: "Virtual", count: 3, percentage: 17 },
    { type: "Phone", count: 1, percentage: 5 },
  ],
  meetingsByPurpose: [
    { purpose: "Cultivation", count: 8, color: "bg-primary" },
    { purpose: "Ask", count: 4, color: "bg-primary/80" },
    { purpose: "Stewardship", count: 4, color: "bg-primary/60" },
    { purpose: "Discovery", count: 2, color: "bg-muted-foreground" },
  ],
};

export default function MGOMeetingsDetail() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">My Meetings</h1>
        <p className="text-sm text-muted-foreground">
          Schedule and track donor meetings and interactions
        </p>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Meetings</p>
                <p className="text-3xl font-bold text-primary mt-1">{meetingsData.stats.total}</p>
              </div>
              <Calendar className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-3xl font-bold text-primary mt-1">{meetingsData.stats.thisWeek}</p>
              </div>
              <Clock className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-3xl font-bold text-primary mt-1">{meetingsData.stats.thisMonth}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Per Week</p>
                <p className="text-3xl font-bold text-primary mt-1">{meetingsData.stats.avgPerWeek}</p>
              </div>
              <Users className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meeting Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Meetings by Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {meetingsData.meetingsByType.map((item) => (
              <div key={item.type} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.type === "In-Person" && <Users className="w-4 h-4 text-muted-foreground" />}
                  {item.type === "Virtual" && <Video className="w-4 h-4 text-muted-foreground" />}
                  {item.type === "Phone" && <Clock className="w-4 h-4 text-muted-foreground" />}
                  <span className="font-medium">{item.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                  <Badge variant="outline">{item.count}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meetings by Purpose</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {meetingsData.meetingsByPurpose.map((item) => (
              <div key={item.purpose} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="font-medium">{item.purpose}</span>
                </div>
                <Badge variant="outline">{item.count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Meetings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Upcoming Meetings</CardTitle>
            <Button size="sm" data-testid="button-schedule-meeting">
              Schedule New Meeting
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {meetingsData.upcomingMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="border rounded-lg p-4 hover-elevate cursor-pointer"
                data-testid={`meeting-${meeting.id}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <div className="flex items-start gap-2 mb-2">
                      <h3 className="font-semibold">{meeting.title}</h3>
                      <Badge
                        variant={
                          meeting.priority === "Critical" ? "destructive" :
                          meeting.priority === "High" ? "default" :
                          "outline"
                        }
                      >
                        {meeting.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{meeting.donor}</p>
                    <p className="text-sm text-muted-foreground">{meeting.notes}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{meeting.time} ({meeting.duration})</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      {meeting.type === "Virtual" ? (
                        <>
                          <Video className="w-4 h-4 text-muted-foreground" />
                          <span>{meeting.type}</span>
                        </>
                      ) : meeting.type === "In-Person" && meeting.location.includes("Coffee") ? (
                        <>
                          <Coffee className="w-4 h-4 text-muted-foreground" />
                          <span>Coffee</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{meeting.type}</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{meeting.location}</p>
                  </div>
                  <div>
                    <Badge variant="secondary">{meeting.purpose}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Past Meetings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Past Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {meetingsData.pastMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center justify-between p-4 border rounded-lg bg-muted/30"
                data-testid={`past-meeting-${meeting.id}`}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <div>
                    <h4 className="font-semibold">{meeting.title}</h4>
                    <p className="text-sm text-muted-foreground">{meeting.donor} • {meeting.date}</p>
                    <p className="text-sm mt-1">{meeting.outcome}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(meeting.rating)].map((_, i) => (
                      <div key={i} className="w-4 h-4 rounded-full bg-primary" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{meeting.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
