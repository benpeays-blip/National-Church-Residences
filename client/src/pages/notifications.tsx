import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  Gift, 
  Calendar, 
  Users, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle,
  Info,
  Clock,
  Trash2,
  Check,
  MoreHorizontal,
  Settings,
  Filter,
  ChevronRight,
  Sparkles
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link } from "wouter";

const accentColors = {
  teal: '#2A9D8F',
  olive: '#6B8E23',
  orange: '#E76F51',
  coral: '#E9967A',
  sky: '#4A90A4',
  lime: '#84a98c',
  navy: '#395174',
  gold: '#e1c47d',
};

interface Notification {
  id: string;
  type: "gift" | "meeting" | "task" | "mention" | "system" | "alert";
  title: string;
  message: string;
  timestamp: string;
  timeGroup: "today" | "yesterday" | "earlier";
  read: boolean;
  actionUrl?: string;
  donor?: string;
  amount?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "gift",
    title: "Major Gift Received",
    message: "Margaret Thompson made a $50,000 donation to the Annual Fund",
    timestamp: "5 minutes ago",
    timeGroup: "today",
    read: false,
    actionUrl: "/donors/1",
    donor: "Margaret Thompson",
    amount: "$50,000"
  },
  {
    id: "2",
    type: "meeting",
    title: "Upcoming Meeting",
    message: "Donor cultivation meeting with Robert Chen in 30 minutes",
    timestamp: "25 minutes ago",
    timeGroup: "today",
    read: false,
    actionUrl: "/upcoming-actions"
  },
  {
    id: "3",
    type: "task",
    title: "Task Reminder",
    message: "Follow up call with Sarah Johnson due today",
    timestamp: "1 hour ago",
    timeGroup: "today",
    read: false,
    actionUrl: "/upcoming-actions"
  },
  {
    id: "4",
    type: "mention",
    title: "You were mentioned",
    message: "David Martinez mentioned you in a note about the Capital Campaign",
    timestamp: "2 hours ago",
    timeGroup: "today",
    read: true
  },
  {
    id: "5",
    type: "system",
    title: "Sync Complete",
    message: "Salesforce data sync completed successfully. 156 records updated.",
    timestamp: "3 hours ago",
    timeGroup: "today",
    read: true
  },
  {
    id: "6",
    type: "alert",
    title: "Data Quality Alert",
    message: "12 donor records have missing email addresses",
    timestamp: "4 hours ago",
    timeGroup: "today",
    read: true,
    actionUrl: "/data-health"
  },
  {
    id: "7",
    type: "gift",
    title: "Recurring Gift Started",
    message: "Jennifer Wu started a monthly gift of $100/month",
    timestamp: "Yesterday at 4:30 PM",
    timeGroup: "yesterday",
    read: true,
    donor: "Jennifer Wu",
    amount: "$100/mo"
  },
  {
    id: "8",
    type: "meeting",
    title: "Meeting Notes Added",
    message: "Lisa Kim added notes from the Board meeting",
    timestamp: "Yesterday at 2:15 PM",
    timeGroup: "yesterday",
    read: true
  },
  {
    id: "9",
    type: "gift",
    title: "Pledge Payment Received",
    message: "William Harris made a $5,000 pledge payment",
    timestamp: "Dec 15, 2025",
    timeGroup: "earlier",
    read: true,
    donor: "William Harris",
    amount: "$5,000"
  },
  {
    id: "10",
    type: "system",
    title: "Weekly Report Ready",
    message: "Your weekly fundraising summary is ready to view",
    timestamp: "Dec 14, 2025",
    timeGroup: "earlier",
    read: true
  },
];

const getTypeConfig = (type: Notification["type"]) => {
  switch (type) {
    case "gift":
      return { 
        icon: Gift, 
        color: accentColors.lime, 
        label: "Gift",
        bgClass: `${accentColors.lime}15`
      };
    case "meeting":
      return { 
        icon: Calendar, 
        color: accentColors.olive, 
        label: "Meeting",
        bgClass: `${accentColors.olive}15`
      };
    case "task":
      return { 
        icon: CheckCircle2, 
        color: accentColors.teal, 
        label: "Task",
        bgClass: `${accentColors.teal}15`
      };
    case "mention":
      return { 
        icon: MessageSquare, 
        color: accentColors.sky, 
        label: "Mention",
        bgClass: `${accentColors.sky}15`
      };
    case "system":
      return { 
        icon: Info, 
        color: accentColors.navy, 
        label: "System",
        bgClass: `${accentColors.navy}15`
      };
    case "alert":
      return { 
        icon: AlertCircle, 
        color: accentColors.orange, 
        label: "Alert",
        bgClass: `${accentColors.orange}15`
      };
    default:
      return { 
        icon: Bell, 
        color: accentColors.navy, 
        label: "Notification",
        bgClass: `${accentColors.navy}15`
      };
  }
};

type FilterType = "all" | "unread" | "gift" | "meeting" | "task" | "alert";

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !n.read;
    return n.type === activeFilter;
  });

  const todayNotifications = filteredNotifications.filter(n => n.timeGroup === "today");
  const yesterdayNotifications = filteredNotifications.filter(n => n.timeGroup === "yesterday");
  const earlierNotifications = filteredNotifications.filter(n => n.timeGroup === "earlier");

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filterOptions: { value: FilterType; label: string; icon: typeof Bell }[] = [
    { value: "all", label: "All", icon: Bell },
    { value: "unread", label: "Unread", icon: Clock },
    { value: "gift", label: "Gifts", icon: Gift },
    { value: "meeting", label: "Meetings", icon: Calendar },
    { value: "task", label: "Tasks", icon: CheckCircle2 },
    { value: "alert", label: "Alerts", icon: AlertCircle },
  ];

  const NotificationItem = ({ notification }: { notification: Notification }) => {
    const config = getTypeConfig(notification.type);
    const Icon = config.icon;
    
    return (
      <div 
        className={`group relative flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer hover-elevate ${
          !notification.read 
            ? 'bg-white border-l-4' 
            : 'bg-background'
        }`}
        style={{ 
          borderLeftColor: !notification.read ? config.color : undefined,
          borderColor: !notification.read ? undefined : `${config.color}30`
        }}
        onClick={() => markAsRead(notification.id)}
        data-testid={`notification-item-${notification.id}`}
      >
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${config.color}15` }}
        >
          <Icon className="w-5 h-5" style={{ color: config.color }} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-medium text-sm ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
              {notification.title}
            </h3>
            {!notification.read && (
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color }} />
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {notification.message}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-muted-foreground">
              {notification.timestamp}
            </span>
            {notification.amount && (
              <Badge 
                variant="secondary" 
                className="text-xs font-semibold"
                style={{ backgroundColor: `${config.color}15`, color: config.color }}
              >
                {notification.amount}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {notification.actionUrl && (
            <Link href={notification.actionUrl}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={(e) => e.stopPropagation()}
                data-testid={`button-view-${notification.id}`}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={(e) => e.stopPropagation()}
                data-testid={`button-notification-menu-${notification.id}`}
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {!notification.read && (
                <DropdownMenuItem 
                  onClick={() => markAsRead(notification.id)}
                  data-testid={`dropdown-mark-read-${notification.id}`}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Mark as read
                </DropdownMenuItem>
              )}
              {notification.actionUrl && (
                <DropdownMenuItem asChild>
                  <Link href={notification.actionUrl}>
                    <ChevronRight className="w-4 h-4 mr-2" />
                    View details
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => deleteNotification(notification.id)}
                className="text-destructive"
                data-testid={`dropdown-delete-${notification.id}`}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  };

  const TimeGroup = ({ title, notifications }: { title: string; notifications: Notification[] }) => {
    if (notifications.length === 0) return null;
    
    return (
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
          {title}
        </h3>
        <div className="space-y-2">
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Notifications Panel */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header Card */}
          <Card className="overflow-hidden">
            <div 
              className="px-6 py-5"
              style={{ backgroundColor: accentColors.navy }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                  >
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-white" data-testid="text-notifications-title">
                      Notifications
                    </h1>
                    <p className="text-sm text-white/70">
                      Stay updated on gifts, meetings, and alerts
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Badge 
                      className="text-sm font-semibold"
                      style={{ backgroundColor: accentColors.gold, color: accentColors.navy }}
                      data-testid="badge-unread-count"
                    >
                      {unreadCount} unread
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            {/* Filter Bar */}
            <div className="px-6 py-3 border-b bg-muted/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto">
                {filterOptions.map((option) => {
                  const Icon = option.icon;
                  const isActive = activeFilter === option.value;
                  return (
                    <Button
                      key={option.value}
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveFilter(option.value)}
                      className="gap-2 shrink-0"
                      style={isActive ? { backgroundColor: accentColors.navy } : {}}
                      data-testid={`filter-${option.value}`}
                    >
                      <Icon className="w-4 h-4" />
                      {option.label}
                      {option.value === "unread" && unreadCount > 0 && (
                        <span className="text-xs opacity-70">({unreadCount})</span>
                      )}
                    </Button>
                  );
                })}
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="gap-2 shrink-0"
                data-testid="button-mark-all-read"
              >
                <Check className="w-4 h-4" />
                Mark all read
              </Button>
            </div>

            {/* Notifications List */}
            <CardContent className="p-6">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <div 
                    className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${accentColors.navy}10` }}
                  >
                    <Bell className="w-8 h-8" style={{ color: accentColors.navy }} />
                  </div>
                  <h3 className="text-base font-semibold mb-2">No notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    {activeFilter === "unread" 
                      ? "You're all caught up!" 
                      : "No notifications in this category"}
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[calc(100vh-400px)]">
                  <div className="space-y-6">
                    <TimeGroup title="Today" notifications={todayNotifications} />
                    <TimeGroup title="Yesterday" notifications={yesterdayNotifications} />
                    <TimeGroup title="Earlier" notifications={earlierNotifications} />
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4" style={{ color: accentColors.teal }} />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { label: "Gifts", count: notifications.filter(n => n.type === "gift").length, color: accentColors.lime, icon: Gift },
                  { label: "Meetings", count: notifications.filter(n => n.type === "meeting").length, color: accentColors.olive, icon: Calendar },
                  { label: "Tasks", count: notifications.filter(n => n.type === "task").length, color: accentColors.teal, icon: CheckCircle2 },
                  { label: "Alerts", count: notifications.filter(n => n.type === "alert").length, color: accentColors.orange, icon: AlertCircle },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={item.label}
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ backgroundColor: `${item.color}10` }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" style={{ color: item.color }} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      <span 
                        className="text-sm font-bold"
                        style={{ color: item.color }}
                      >
                        {item.count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Settings className="w-4 h-4" style={{ color: accentColors.navy }} />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Customize which notifications you receive and how they're delivered.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full gap-2"
                data-testid="button-notification-settings"
              >
                <Settings className="w-4 h-4" />
                Notification Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
