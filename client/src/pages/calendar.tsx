import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { getAccentColor } from "@/components/ui/accent-card";
import { format, addDays, startOfWeek, endOfWeek, isToday, isSameDay, parseISO, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import type { CalendarEvent, Task, Person } from "@shared/schema";
import { 
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Phone,
  Mail,
  FileText,
  Users,
  Clock,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Target,
  Filter,
  Grid3X3,
  List,
  MoreHorizontal,
  Trash2,
  Edit,
  Eye
} from "lucide-react";

const accentColors = {
  teal: getAccentColor("teal"),
  sky: getAccentColor("sky"),
  lime: getAccentColor("lime"),
  olive: getAccentColor("olive"),
  coral: getAccentColor("coral"),
  orange: getAccentColor("orange"),
};

const eventTypeConfig: Record<string, { icon: any; color: string; label: string }> = {
  call: { icon: Phone, color: accentColors.coral, label: "Phone Call" },
  email: { icon: Mail, color: accentColors.olive, label: "Email" },
  meeting: { icon: Users, color: accentColors.sky, label: "Meeting" },
  task: { icon: FileText, color: accentColors.teal, label: "Task" },
  follow_up: { icon: Target, color: accentColors.orange, label: "Follow-up" },
  campaign: { icon: FileText, color: accentColors.orange, label: "Campaign" },
  visit: { icon: Users, color: accentColors.coral, label: "Site Visit" },
};

const priorityColors: Record<string, string> = {
  high: "#ef4444",
  medium: accentColors.orange,
  low: accentColors.teal,
};

interface CalendarEventWithPerson extends CalendarEvent {
  personName?: string;
}

export default function CalendarPage() {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEventWithPerson | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    eventType: "task",
    scheduledAt: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    duration: 30,
    priority: "medium",
    personId: "",
  });

  const { data: calendarEvents = [], isLoading: eventsLoading } = useQuery<CalendarEventWithPerson[]>({
    queryKey: ["/api/calendar-events"],
  });

  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  const { data: persons = [] } = useQuery<Person[]>({
    queryKey: ["/api/persons"],
  });

  const createEventMutation = useMutation({
    mutationFn: async (event: typeof newEvent) => {
      return apiRequest("POST", "/api/calendar-events", {
        ...event,
        userId: "demo-user",
        scheduledAt: new Date(event.scheduledAt).toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/calendar-events"] });
      setIsAddEventOpen(false);
      setNewEvent({
        title: "",
        description: "",
        eventType: "task",
        scheduledAt: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
        duration: 30,
        priority: "medium",
        personId: "",
      });
      toast({
        title: "Event Created",
        description: "Your event has been added to the calendar.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (eventId: string) => {
      return apiRequest("DELETE", `/api/calendar-events/${eventId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/calendar-events"] });
      toast({
        title: "Event Deleted",
        description: "The event has been removed from your calendar.",
      });
    },
  });

  const completeEventMutation = useMutation({
    mutationFn: async (eventId: string) => {
      return apiRequest("PATCH", `/api/calendar-events/${eventId}`, { completed: 1 });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/calendar-events"] });
      toast({
        title: "Event Completed",
        description: "The event has been marked as complete.",
      });
    },
  });

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: startOfWeek(monthStart), end: endOfWeek(monthEnd) });

  const getEventsForDate = (date: Date) => {
    return calendarEvents.filter((event) => {
      const eventDate = parseISO(event.scheduledAt as unknown as string);
      return isSameDay(eventDate, date);
    });
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      const taskDate = parseISO(task.dueDate as unknown as string);
      return isSameDay(taskDate, date) && !task.completed;
    });
  };

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return calendarEvents
      .filter((event) => {
        const eventDate = parseISO(event.scheduledAt as unknown as string);
        return eventDate >= now && !event.completed;
      })
      .sort((a, b) => 
        new Date(a.scheduledAt as unknown as string).getTime() - 
        new Date(b.scheduledAt as unknown as string).getTime()
      )
      .slice(0, 5);
  }, [calendarEvents]);

  const pendingTasks = useMemo(() => {
    return tasks
      .filter((task) => !task.completed)
      .sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate as unknown as string).getTime() - 
               new Date(b.dueDate as unknown as string).getTime();
      })
      .slice(0, 5);
  }, [tasks]);

  const handleCreateEvent = () => {
    if (!newEvent.title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a title for the event.",
        variant: "destructive",
      });
      return;
    }
    createEventMutation.mutate(newEvent);
  };

  const navigatePrevious = () => {
    if (viewMode === "week") {
      setCurrentDate(addDays(currentDate, -7));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    }
  };

  const navigateNext = () => {
    if (viewMode === "week") {
      setCurrentDate(addDays(currentDate, 7));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="min-h-screen bg-background">
      <div 
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${accentColors.olive}15 0%, ${accentColors.sky}10 50%, ${accentColors.teal}05 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="relative px-6 py-8">
          <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" data-testid="button-back-home">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accentColors.olive}20` }}>
                    <CalendarIcon className="w-6 h-6" style={{ color: accentColors.olive }} />
                  </div>
                  <Badge variant="outline" className="text-xs uppercase tracking-wide gap-1">
                    <Sparkles className="w-3 h-3" />
                    Smart Scheduling
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold mb-1">Calendar</h1>
                <p className="text-sm text-muted-foreground">
                  Schedule and track your fundraising activities
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2" style={{ backgroundColor: accentColors.olive }} data-testid="button-add-event">
                    <Plus className="w-4 h-4" />
                    Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                    <DialogDescription>
                      Schedule a new activity on your calendar
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-title">Title</Label>
                      <Input
                        id="event-title"
                        placeholder="Enter event title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        data-testid="input-event-title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-type">Event Type</Label>
                      <Select
                        value={newEvent.eventType}
                        onValueChange={(value) => setNewEvent({ ...newEvent, eventType: value })}
                      >
                        <SelectTrigger data-testid="select-event-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="call">Phone Call</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="meeting">Meeting</SelectItem>
                          <SelectItem value="task">Task</SelectItem>
                          <SelectItem value="follow_up">Follow-up</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="event-date">Date & Time</Label>
                        <Input
                          id="event-date"
                          type="datetime-local"
                          value={newEvent.scheduledAt}
                          onChange={(e) => setNewEvent({ ...newEvent, scheduledAt: e.target.value })}
                          data-testid="input-event-date"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="event-duration">Duration (min)</Label>
                        <Input
                          id="event-duration"
                          type="number"
                          value={newEvent.duration}
                          onChange={(e) => setNewEvent({ ...newEvent, duration: parseInt(e.target.value) || 30 })}
                          data-testid="input-event-duration"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-priority">Priority</Label>
                      <Select
                        value={newEvent.priority}
                        onValueChange={(value) => setNewEvent({ ...newEvent, priority: value })}
                      >
                        <SelectTrigger data-testid="select-event-priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-donor">Related Donor (Optional)</Label>
                      <Select
                        value={newEvent.personId}
                        onValueChange={(value) => setNewEvent({ ...newEvent, personId: value })}
                      >
                        <SelectTrigger data-testid="select-event-donor">
                          <SelectValue placeholder="Select donor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">None</SelectItem>
                          {persons.slice(0, 20).map((person) => (
                            <SelectItem key={person.id} value={person.id}>
                              {person.firstName} {person.lastName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-description">Description</Label>
                      <Textarea
                        id="event-description"
                        placeholder="Add notes or details..."
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        className="min-h-[80px]"
                        data-testid="input-event-description"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddEventOpen(false)} data-testid="button-cancel-event">
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleCreateEvent}
                      disabled={createEventMutation.isPending}
                      style={{ backgroundColor: accentColors.olive }}
                      data-testid="button-save-event"
                    >
                      {createEventMutation.isPending ? "Creating..." : "Create Event"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={navigatePrevious} data-testid="button-previous">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={goToToday} data-testid="button-today">
                      Today
                    </Button>
                    <Button variant="outline" size="icon" onClick={navigateNext} data-testid="button-next">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    <h2 className="text-xl font-semibold ml-2">
                      {viewMode === "week" 
                        ? `${format(weekStart, "MMM d")} - ${format(addDays(weekStart, 6), "MMM d, yyyy")}`
                        : format(currentDate, "MMMM yyyy")
                      }
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === "week" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("week")}
                      className="gap-1"
                      data-testid="button-week-view"
                    >
                      <List className="w-4 h-4" />
                      Week
                    </Button>
                    <Button
                      variant={viewMode === "month" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("month")}
                      className="gap-1"
                      data-testid="button-month-view"
                    >
                      <Grid3X3 className="w-4 h-4" />
                      Month
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {viewMode === "week" ? (
                  <div className="space-y-1">
                    {weekDays.map((day) => {
                      const dayEvents = getEventsForDate(day);
                      const dayTasks = getTasksForDate(day);
                      const isCurrentDay = isToday(day);
                      
                      return (
                        <div 
                          key={day.toISOString()} 
                          className={`flex gap-4 p-4 rounded-lg border transition-colors ${
                            isCurrentDay ? "bg-primary/5 border-primary/20" : "hover:bg-muted/50"
                          }`}
                          data-testid={`calendar-day-${format(day, "yyyy-MM-dd")}`}
                        >
                          <div className="w-20 shrink-0 text-center">
                            <p className="text-xs font-medium text-muted-foreground uppercase">
                              {format(day, "EEE")}
                            </p>
                            <p className={`text-2xl font-bold ${isCurrentDay ? "text-primary" : ""}`}>
                              {format(day, "d")}
                            </p>
                          </div>
                          <div className="flex-1 space-y-2">
                            {dayEvents.length === 0 && dayTasks.length === 0 ? (
                              <p className="text-sm text-muted-foreground py-2">No events scheduled</p>
                            ) : (
                              <>
                                {dayEvents.map((event) => {
                                  const config = eventTypeConfig[event.eventType || "task"] || eventTypeConfig.task;
                                  const Icon = config.icon;
                                  return (
                                    <div 
                                      key={event.id}
                                      className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover-elevate"
                                      style={{ 
                                        backgroundColor: `${config.color}10`,
                                        borderColor: `${config.color}30`
                                      }}
                                      onClick={() => setSelectedEvent(event)}
                                      data-testid={`event-item-${event.id}`}
                                    >
                                      <div 
                                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: `${config.color}20` }}
                                      >
                                        <Icon className="w-4 h-4" style={{ color: config.color }} />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{event.title}</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                          <Clock className="w-3 h-3" />
                                          {format(parseISO(event.scheduledAt as unknown as string), "h:mm a")}
                                          {event.duration && <span>• {event.duration} min</span>}
                                        </div>
                                      </div>
                                      {event.priority && (
                                        <Badge 
                                          variant="outline"
                                          className="text-xs shrink-0"
                                          style={{ 
                                            borderColor: priorityColors[event.priority] || accentColors.teal,
                                            color: priorityColors[event.priority] || accentColors.teal
                                          }}
                                        >
                                          {event.priority}
                                        </Badge>
                                      )}
                                      <div className="flex items-center gap-1">
                                        <Button
                                          size="icon"
                                          variant="ghost"
                                          className="h-7 w-7"
                                          onClick={() => completeEventMutation.mutate(event.id)}
                                          data-testid={`button-complete-${event.id}`}
                                        >
                                          <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                                        </Button>
                                        <Button
                                          size="icon"
                                          variant="ghost"
                                          className="h-7 w-7"
                                          onClick={() => deleteEventMutation.mutate(event.id)}
                                          data-testid={`button-delete-${event.id}`}
                                        >
                                          <Trash2 className="w-4 h-4 text-muted-foreground" />
                                        </Button>
                                      </div>
                                    </div>
                                  );
                                })}
                                {dayTasks.map((task) => (
                                  <Link key={task.id} href={`/actions/${task.id}`}>
                                    <div 
                                      className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:shadow-md transition-all"
                                      style={{ 
                                        backgroundColor: `${accentColors.sky}10`,
                                        borderColor: `${accentColors.sky}30`
                                      }}
                                      data-testid={`task-item-${task.id}`}
                                    >
                                      <div 
                                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: `${accentColors.sky}20` }}
                                      >
                                        <Target className="w-4 h-4" style={{ color: accentColors.sky }} />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{task.title}</p>
                                        <p className="text-xs text-muted-foreground">Next Best Action</p>
                                      </div>
                                      <Badge 
                                        variant="outline"
                                        className="text-xs shrink-0"
                                        style={{ 
                                          borderColor: priorityColors[task.priority] || accentColors.teal,
                                          color: priorityColors[task.priority] || accentColors.teal
                                        }}
                                      >
                                        {task.priority}
                                      </Badge>
                                    </div>
                                  </Link>
                                ))}
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-7 gap-1">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                        {day}
                      </div>
                    ))}
                    {monthDays.map((day) => {
                      const dayEvents = getEventsForDate(day);
                      const dayTasks = getTasksForDate(day);
                      const isCurrentDay = isToday(day);
                      const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                      
                      return (
                        <div
                          key={day.toISOString()}
                          className={`min-h-[100px] p-2 border rounded-lg ${
                            isCurrentDay ? "bg-primary/5 border-primary/30" : ""
                          } ${!isCurrentMonth ? "opacity-40" : ""}`}
                          onClick={() => setSelectedDate(day)}
                          data-testid={`month-day-${format(day, "yyyy-MM-dd")}`}
                        >
                          <p className={`text-sm font-medium mb-1 ${isCurrentDay ? "text-primary" : ""}`}>
                            {format(day, "d")}
                          </p>
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map((event) => {
                              const config = eventTypeConfig[event.eventType || "task"] || eventTypeConfig.task;
                              return (
                                <div
                                  key={event.id}
                                  className="text-xs p-1 rounded truncate cursor-pointer hover:opacity-80"
                                  style={{ 
                                    backgroundColor: `${config.color}20`,
                                    color: config.color
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedEvent(event);
                                  }}
                                  data-testid={`month-event-${event.id}`}
                                >
                                  {event.title || "Untitled Event"}
                                </div>
                              );
                            })}
                            {dayTasks.slice(0, 2).map((task) => (
                              <div
                                key={task.id}
                                className="text-xs p-1 rounded truncate"
                                style={{ 
                                  backgroundColor: `${accentColors.sky}20`,
                                  color: accentColors.sky
                                }}
                              >
                                {task.title}
                              </div>
                            ))}
                            {(dayEvents.length + dayTasks.length) > 2 && (
                              <p className="text-xs text-muted-foreground">
                                +{dayEvents.length + dayTasks.length - 2} more
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3" style={{ background: `linear-gradient(135deg, ${accentColors.teal}15 0%, ${accentColors.teal}05 100%)` }}>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" style={{ color: accentColors.teal }} />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {upcomingEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No upcoming events</p>
                ) : (
                  <div className="space-y-3">
                    {upcomingEvents.map((event) => {
                      const config = eventTypeConfig[event.eventType || "task"] || eventTypeConfig.task;
                      const Icon = config.icon;
                      return (
                        <div 
                          key={event.id}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedEvent(event)}
                          data-testid={`upcoming-event-${event.id}`}
                        >
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${config.color}15` }}
                          >
                            <Icon className="w-4 h-4" style={{ color: config.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{event.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {format(parseISO(event.scheduledAt as unknown as string), "MMM d, h:mm a")}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3" style={{ background: `linear-gradient(135deg, ${accentColors.sky}15 0%, ${accentColors.sky}05 100%)` }}>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5" style={{ color: accentColors.sky }} />
                  Next Best Actions
                </CardTitle>
                <CardDescription className="text-xs">AI-recommended tasks</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                {pendingTasks.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No pending tasks</p>
                ) : (
                  <div className="space-y-3">
                    {pendingTasks.map((task) => (
                      <Link key={task.id} href={`/actions/${task.id}`}>
                        <div 
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                          data-testid={`nba-task-${task.id}`}
                        >
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                            style={{ backgroundColor: `${accentColors.sky}15` }}
                          >
                            <Sparkles className="w-4 h-4" style={{ color: accentColors.sky }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium line-clamp-2">{task.title}</p>
                            {task.dueDate && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Due: {format(parseISO(task.dueDate as unknown as string), "MMM d")}
                              </p>
                            )}
                          </div>
                          <Badge 
                            variant="outline"
                            className="text-xs shrink-0"
                            style={{ 
                              borderColor: priorityColors[task.priority] || accentColors.teal,
                              color: priorityColors[task.priority] || accentColors.teal
                            }}
                          >
                            {task.priority}
                          </Badge>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                <Link href="/upcoming-actions">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4 gap-2"
                    style={{ borderColor: `${accentColors.sky}40`, color: accentColors.sky }}
                    data-testid="button-view-all-actions"
                  >
                    View All Actions
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Event Detail Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="max-w-md">
          {selectedEvent && (() => {
            const config = eventTypeConfig[selectedEvent.eventType || "task"] || eventTypeConfig.task;
            const Icon = config.icon;
            return (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${config.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: config.color }} />
                    </div>
                    <div>
                      <DialogTitle>{selectedEvent.title || "Untitled Event"}</DialogTitle>
                      <DialogDescription>
                        {config.label}
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Date & Time</p>
                      <p className="text-sm font-medium flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" style={{ color: config.color }} />
                        {format(parseISO(selectedEvent.scheduledAt as unknown as string), "MMM d, yyyy")}
                      </p>
                      <p className="text-sm flex items-center gap-2">
                        <Clock className="w-4 h-4" style={{ color: config.color }} />
                        {format(parseISO(selectedEvent.scheduledAt as unknown as string), "h:mm a")}
                        {selectedEvent.duration && <span className="text-muted-foreground">({selectedEvent.duration} min)</span>}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Priority</p>
                      {selectedEvent.priority && (
                        <Badge 
                          variant="outline"
                          className="text-xs capitalize"
                          style={{ 
                            borderColor: priorityColors[selectedEvent.priority] || accentColors.teal,
                            color: priorityColors[selectedEvent.priority] || accentColors.teal
                          }}
                        >
                          {selectedEvent.priority}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {selectedEvent.personName && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Related Contact</p>
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Users className="w-4 h-4" style={{ color: config.color }} />
                        {selectedEvent.personName}
                      </p>
                    </div>
                  )}
                  
                  {selectedEvent.description && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Notes</p>
                      <p className="text-sm text-foreground">{selectedEvent.description}</p>
                    </div>
                  )}
                  
                  {selectedEvent.outcome && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Outcome</p>
                      <p className="text-sm text-foreground">{selectedEvent.outcome}</p>
                    </div>
                  )}
                  
                  {selectedEvent.estimatedImpact && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Estimated Impact</p>
                      <p className="text-sm font-bold" style={{ color: accentColors.teal }}>
                        ${parseFloat(selectedEvent.estimatedImpact).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
                <DialogFooter className="gap-2">
                  {!selectedEvent.completed && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        completeEventMutation.mutate(selectedEvent.id);
                        setSelectedEvent(null);
                      }}
                      className="gap-2"
                      data-testid="button-dialog-complete"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Mark Complete
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => {
                      deleteEventMutation.mutate(selectedEvent.id);
                      setSelectedEvent(null);
                    }}
                    className="gap-2 text-destructive hover:text-destructive"
                    data-testid="button-dialog-delete"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </DialogFooter>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
