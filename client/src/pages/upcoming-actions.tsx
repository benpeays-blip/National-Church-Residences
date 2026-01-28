import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useSearch } from "wouter";
import { getAccentColor } from "@/components/ui/accent-card";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  CalendarPlus,
  Phone, 
  Mail, 
  Users, 
  FileText, 
  MapPin,
  Clock,
  ChevronRight,
  Plus,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";

const accentColors = {
  teal: getAccentColor("teal"),
  sky: getAccentColor("sky"),
  lime: getAccentColor("lime"),
  olive: getAccentColor("olive"),
  coral: getAccentColor("coral"),
  orange: getAccentColor("orange"),
};

export default function UpcomingActionsPage() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const filterType = params.get("filter");
  const { toast } = useToast();

  const handleAddAction = () => {
    toast({
      title: "Add Action",
      description: "Action creation form coming soon. This feature is under development.",
    });
  };

  const addToCalendarMutation = useMutation({
    mutationFn: async (action: { donor: string; action: string; date: string; time: string; type: string; priority: string; notes: string }) => {
      const scheduledAt = new Date();
      if (action.date === "Today") {
        // Keep today's date
      } else if (action.date === "Tomorrow") {
        scheduledAt.setDate(scheduledAt.getDate() + 1);
      } else {
        // Parse dates like "Dec 18"
        const year = new Date().getFullYear();
        const parsed = new Date(`${action.date}, ${year}`);
        if (!isNaN(parsed.getTime())) {
          scheduledAt.setMonth(parsed.getMonth());
          scheduledAt.setDate(parsed.getDate());
        }
      }
      // Parse time like "10:00 AM"
      const timeParts = action.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (timeParts) {
        let hours = parseInt(timeParts[1]);
        const minutes = parseInt(timeParts[2]);
        const isPM = timeParts[3].toUpperCase() === "PM";
        if (isPM && hours !== 12) hours += 12;
        if (!isPM && hours === 12) hours = 0;
        scheduledAt.setHours(hours, minutes, 0, 0);
      }

      return apiRequest("POST", "/api/calendar-events", {
        userId: "demo-user",
        title: `${action.action} - ${action.donor}`,
        description: action.notes,
        eventType: action.type === "visit" ? "meeting" : action.type,
        scheduledAt: scheduledAt.toISOString(),
        duration: 30,
        priority: action.priority.toLowerCase(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/calendar-events"] });
      toast({
        title: "Added to Calendar",
        description: "This action has been added to your calendar.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add to calendar. Please try again.",
        variant: "destructive",
      });
    },
  });

  const completedActions = [
    { 
      id: 101,
      date: "Dec 14", 
      time: "3:00 PM",
      donor: "Margaret Chen", 
      donorId: "0cc9580d-c975-4222-890b-b6ceebe8bb3a",
      action: "Thank you call completed", 
      type: "call",
      priority: "High",
      notes: "Expressed gratitude for $15K year-end gift. Confirmed interest in capital campaign update."
    },
    { 
      id: 102,
      date: "Dec 13", 
      time: "11:00 AM",
      donor: "Anderson Foundation", 
      donorId: "261d8446-ce7c-4cee-977e-31347f162b2c",
      action: "Grant report submitted", 
      type: "email",
      priority: "High",
      notes: "Submitted Q4 progress report for $50K education grant. Positive feedback received."
    },
    { 
      id: 103,
      date: "Dec 12", 
      time: "2:00 PM",
      donor: "Dr. James Morrison", 
      donorId: "a275b91a-5634-4114-9cfb-e5a52f0d1c46",
      action: "Stewardship meeting held", 
      type: "meeting",
      priority: "Medium",
      notes: "Discussed scholarship fund impact. 12 students supported this year. Very engaged."
    },
    { 
      id: 104,
      date: "Dec 11", 
      time: "10:00 AM",
      donor: "Robert Martinez", 
      donorId: "5ab76a44-f492-4dd7-b3ea-bfcfaf5ff141",
      action: "Gift acknowledgment sent", 
      type: "email",
      priority: "Medium",
      notes: "Personalized thank you for $10K contribution with impact photos attached."
    },
    { 
      id: 105,
      date: "Dec 10", 
      time: "1:00 PM",
      donor: "Community Outreach", 
      donorId: null,
      action: "Newsletter distributed", 
      type: "campaign",
      priority: "Medium",
      notes: "December newsletter sent to 2,400 subscribers. 38% open rate achieved."
    },
    { 
      id: 106,
      date: "Dec 9", 
      time: "4:00 PM",
      donor: "Jennifer Johnson", 
      donorId: "261d8446-ce7c-4cee-977e-31347f162b2c",
      action: "Proposal review completed", 
      type: "meeting",
      priority: "High",
      notes: "Reviewed $250K grant proposal internally. Ready for board presentation."
    },
    { 
      id: 107,
      date: "Dec 8", 
      time: "9:30 AM",
      donor: "Linda Chen", 
      donorId: "0cc9580d-c975-4222-890b-b6ceebe8bb3a",
      action: "Site visit coordinated", 
      type: "visit",
      priority: "High",
      notes: "Confirmed site visit details for Dec 18. Prepared briefing materials."
    },
    { 
      id: 108,
      date: "Dec 7", 
      time: "11:30 AM",
      donor: "Patricia Brown", 
      donorId: "ec82c940-c513-4656-bc66-e8c618c6dcdd",
      action: "Holiday card sent", 
      type: "email",
      priority: "Low",
      notes: "Sent personalized holiday greeting with year-in-review highlights."
    },
    { 
      id: 109,
      date: "Dec 6", 
      time: "2:30 PM",
      donor: "Susan Taylor", 
      donorId: "fa9dbe3b-9972-49d6-9722-b26725db3e1c",
      action: "Donor profile updated", 
      type: "email",
      priority: "Low",
      notes: "Updated contact preferences and communication history in CRM."
    },
    { 
      id: 110,
      date: "Dec 5", 
      time: "10:00 AM",
      donor: "David Thompson", 
      donorId: "8b11e5ac-0e35-4c95-b220-7cc58e9636bd",
      action: "Re-engagement email sent", 
      type: "email",
      priority: "High",
      notes: "Sent personalized outreach to at-risk donor. Awaiting response."
    },
    { 
      id: 111,
      date: "Dec 4", 
      time: "3:00 PM",
      donor: "Board Update", 
      donorId: null,
      action: "Monthly report compiled", 
      type: "campaign",
      priority: "Medium",
      notes: "Prepared December fundraising progress report for board review."
    },
    { 
      id: 112,
      date: "Dec 3", 
      time: "9:00 AM",
      donor: "Year-End Appeal", 
      donorId: null,
      action: "Segmentation completed", 
      type: "campaign",
      priority: "High",
      notes: "Finalized donor segments for year-end appeal. 1,847 donors in active cohort."
    },
  ];

  const upcomingActions = [
    { 
      id: 1,
      date: "Today", 
      time: "10:00 AM",
      donor: "Linda Chen", 
      donorId: "0cc9580d-c975-4222-890b-b6ceebe8bb3a",
      action: "Follow-up call", 
      type: "call",
      priority: "High",
      notes: "Discuss year-end giving opportunities and thank for previous support"
    },
    { 
      id: 2,
      date: "Today", 
      time: "2:00 PM",
      donor: "Jennifer Johnson", 
      donorId: "261d8446-ce7c-4cee-977e-31347f162b2c",
      action: "Grant review meeting", 
      type: "meeting",
      priority: "High",
      notes: "$250K grant proposal pending review - prepare presentation materials"
    },
    { 
      id: 3,
      date: "Tomorrow", 
      time: "9:30 AM",
      donor: "Robert Martinez", 
      donorId: "5ab76a44-f492-4dd7-b3ea-bfcfaf5ff141",
      action: "Send thank you letter", 
      type: "email",
      priority: "Medium",
      notes: "Acknowledge recent $10K contribution with personalized impact report"
    },
    { 
      id: 4,
      date: "Dec 18", 
      time: "11:00 AM",
      donor: "James Wilson", 
      donorId: "a275b91a-5634-4114-9cfb-e5a52f0d1c46",
      action: "Site visit", 
      type: "visit",
      priority: "High",
      notes: "Tour of new facility expansion - prepare impact report and talking points"
    },
    { 
      id: 5,
      date: "Dec 19", 
      time: "3:00 PM",
      donor: "David Thompson", 
      donorId: "8b11e5ac-0e35-4c95-b220-7cc58e9636bd",
      action: "Re-engagement call", 
      type: "call",
      priority: "High",
      notes: "At-risk donor - last gift was 8 months ago. Discuss stewardship opportunities"
    },
    { 
      id: 6,
      date: "Dec 20", 
      time: "10:00 AM",
      donor: "Year-End Appeal", 
      donorId: null,
      action: "Campaign launch", 
      type: "campaign",
      priority: "High",
      notes: "Send email blast to 1,847 active donors with matching gift announcement"
    },
    { 
      id: 7,
      date: "Dec 21", 
      time: "2:00 PM",
      donor: "Patricia Brown", 
      donorId: "ec82c940-c513-4656-bc66-e8c618c6dcdd",
      action: "Quarterly check-in", 
      type: "call",
      priority: "Medium",
      notes: "Regular stewardship touch - share recent program outcomes"
    },
    { 
      id: 8,
      date: "Dec 22", 
      time: "11:00 AM",
      donor: "Susan Taylor", 
      donorId: "fa9dbe3b-9972-49d6-9722-b26725db3e1c",
      action: "Proposal submission", 
      type: "email",
      priority: "Medium",
      notes: "Submit grant proposal for Q1 2025 funding cycle"
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "call": return <Phone className="w-4 h-4" />;
      case "email": return <Mail className="w-4 h-4" />;
      case "meeting": return <Users className="w-4 h-4" />;
      case "visit": return <MapPin className="w-4 h-4" />;
      case "campaign": return <FileText className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "call": return accentColors.sky;
      case "email": return accentColors.olive;
      case "meeting": return accentColors.teal;
      case "visit": return accentColors.coral;
      case "campaign": return accentColors.orange;
      default: return accentColors.lime;
    }
  };

  const getPriorityColor = (priority: string) => {
    return priority === "High" ? "#ef4444" : accentColors.olive;
  };

  // Determine which actions to show based on filter
  const isShowingCompleted = filterType === "completed";
  const actionsToShow = isShowingCompleted ? completedActions : upcomingActions;

  // Group actions by date
  const groupedActions = actionsToShow.reduce((acc, action) => {
    if (!acc[action.date]) {
      acc[action.date] = [];
    }
    acc[action.date].push(action);
    return acc;
  }, {} as Record<string, typeof upcomingActions>);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1.5 mb-2 -ml-2" data-testid="button-back-dashboard">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">
            {isShowingCompleted ? "Completed Tasks" : "Upcoming Actions"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isShowingCompleted 
              ? "Recently completed tasks and touchpoints" 
              : "Your scheduled tasks and donor touchpoints"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/calendar">
            <Button variant="outline" className="gap-2" data-testid="button-view-calendar">
              <CalendarPlus className="w-4 h-4" />
              Calendar
            </Button>
          </Link>
          {isShowingCompleted ? (
            <Link href="/upcoming-actions">
              <Button variant="outline" className="gap-2">
                <Calendar className="w-4 h-4" />
                View Upcoming
              </Button>
            </Link>
          ) : (
            <Link href="/upcoming-actions?filter=completed">
              <Button variant="outline" className="gap-2">
                <CheckCircle2 className="w-4 h-4" />
                View Completed
              </Button>
            </Link>
          )}
          <Button onClick={handleAddAction} className="gap-2" style={{ backgroundColor: accentColors.olive }} data-testid="button-add-action">
            <Plus className="w-4 h-4" />
            Add Action
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: isShowingCompleted ? "#10b98115" : `${accentColors.coral}15` }}
              >
                {isShowingCompleted 
                  ? <CheckCircle2 className="w-5 h-5" style={{ color: "#10b981" }} />
                  : <Clock className="w-5 h-5" style={{ color: accentColors.coral }} />
                }
              </div>
              <div>
                <p className="text-2xl font-bold">{actionsToShow.length}</p>
                <p className="text-sm text-muted-foreground">{isShowingCompleted ? "Completed" : "Total Actions"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${accentColors.sky}15` }}
              >
                <Phone className="w-5 h-5" style={{ color: accentColors.sky }} />
              </div>
              <div>
                <p className="text-2xl font-bold">{actionsToShow.filter(a => a.type === "call").length}</p>
                <p className="text-sm text-muted-foreground">Calls</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${accentColors.teal}15` }}
              >
                <Users className="w-5 h-5" style={{ color: accentColors.teal }} />
              </div>
              <div>
                <p className="text-2xl font-bold">{actionsToShow.filter(a => a.type === "meeting").length}</p>
                <p className="text-sm text-muted-foreground">Meetings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#ef444415" }}
              >
                <Calendar className="w-5 h-5" style={{ color: "#ef4444" }} />
              </div>
              <div>
                <p className="text-2xl font-bold">{actionsToShow.filter(a => a.priority === "High").length}</p>
                <p className="text-sm text-muted-foreground">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions by Date */}
      <div className="space-y-6">
        {Object.entries(groupedActions).map(([date, actions]) => (
          <div key={date}>
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="px-3 py-1.5 rounded-lg font-semibold text-sm"
                style={{ backgroundColor: `${accentColors.olive}15`, color: accentColors.olive }}
              >
                {date}
              </div>
              <div className="h-px flex-1 bg-border" />
              <span className="text-sm text-muted-foreground">{actions.length} action{actions.length !== 1 ? 's' : ''}</span>
            </div>
            
            <div className="space-y-3">
              {actions.map((action) => {
                const typeColor = getTypeColor(action.type);
                const priorityColor = getPriorityColor(action.priority);
                
                const content = (
                  <div 
                    className="group rounded-xl border overflow-hidden hover-elevate transition-all cursor-pointer hover:shadow-lg"
                    style={{ borderColor: `${typeColor}25` }}
                    data-testid={`action-item-${action.id}`}
                  >
                    {/* Accent Header */}
                    <div 
                      className="px-4 py-2.5 flex items-center justify-between gap-2"
                      style={{ background: `linear-gradient(135deg, ${typeColor}15 0%, ${typeColor}05 100%)` }}
                    >
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${typeColor}20` }}
                        >
                          {getTypeIcon(action.type)}
                        </div>
                        <span className="font-semibold text-sm">{action.action}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className="text-[10px]"
                          style={{ borderColor: typeColor, color: typeColor }}
                        >
                          {action.type}
                        </Badge>
                        <span 
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{ backgroundColor: `${priorityColor}15`, color: priorityColor }}
                        >
                          {action.priority}
                        </span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="px-4 py-3">
                      <p className="font-medium text-sm" style={{ color: typeColor }}>{action.donor}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{action.notes}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{action.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {!isShowingCompleted && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 px-2 gap-1"
                              style={{ borderColor: `${accentColors.olive}50`, color: accentColors.olive }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCalendarMutation.mutate(action);
                              }}
                              disabled={addToCalendarMutation.isPending}
                              data-testid={`button-add-to-calendar-${action.id}`}
                            >
                              <CalendarPlus className="w-3 h-3" />
                              <span className="text-[10px]">Calendar</span>
                            </Button>
                          )}
                          <ChevronRight 
                            className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" 
                            style={{ color: typeColor }} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
                
                if (action.donorId) {
                  return (
                    <Link key={action.id} href={`/donors/${action.donorId}`}>
                      {content}
                    </Link>
                  );
                }
                return <div key={action.id}>{content}</div>;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
