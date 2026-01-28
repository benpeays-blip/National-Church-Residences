import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, TrendingUp } from "lucide-react";
import { format } from "date-fns";

type CalendarEvent = {
  id: string;
  userId: string;
  personId: string | null;
  eventType: string;
  scheduledAt: string;
  duration: number;
  aiSuggestedTime: string | null;
  priority: number;
  estimatedImpact: string;
  meetingBriefId: string | null;
  completed: number;
  outcome: string | null;
  createdAt: string;
};

export default function SmartCalendar() {
  const { data: events, isLoading, error, isError } = useQuery<CalendarEvent[], Error>({
    queryKey: ["workflow-utilities", "calendar"],
    queryFn: () => api.workflowUtilities.getCalendarEvents(),
  });

  const getPriorityColor = (priority: number) => {
    if (priority >= 75) return "destructive";
    if (priority >= 50) return "secondary";
    return "outline";
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold ">AI Smart Calendar</h1>
          <p className="text-sm text-muted-foreground">
            Optimal meeting scheduling based on donor preferences and MGO availability
          </p>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                  <div className="h-6 bg-muted rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">
              <p className="font-semibold ">Failed to load calendar events</p>
              <p className="text-sm">{error?.message || "An error occurred"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const upcomingEvents = events?.filter((e) => e.completed === 0) || [];
  const completedEvents = events?.filter((e) => e.completed === 1) || [];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold ">AI Smart Calendar</h1>
        <p className="text-sm text-muted-foreground">
          Optimized donor meeting schedule based on preferences, proximity, and impact
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="border rounded-lg p-4 space-y-2"
                  data-testid={`card-event-${event.id}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="font-semibold">{event.eventType}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(event.scheduledAt), "MMM d, yyyy 'at' h:mm a")}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4" />
                        {event.duration} minutes
                      </div>
                    </div>
                    <Badge variant={getPriorityColor(event.priority)}>
                      P{event.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">
                      Est. Impact: ${parseFloat(event.estimatedImpact).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No upcoming events scheduled
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Completed Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {completedEvents.length > 0 ? (
              completedEvents.slice(0, 5).map((event) => (
                <div
                  key={event.id}
                  className="border rounded-lg p-4 space-y-2 opacity-75"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="font-semibold">{event.eventType}</div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(event.scheduledAt), "MMM d, yyyy")}
                      </div>
                    </div>
                    <Badge variant="outline">
                      Done
                    </Badge>
                  </div>
                  {event.outcome && (
                    <div className="text-sm text-muted-foreground">{event.outcome}</div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No completed events yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
