import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Filter
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  type: "gift" | "meeting" | "task" | "mention" | "system" | "alert";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "gift",
    title: "Major Gift Received",
    message: "Margaret Thompson made a $50,000 donation to the Annual Fund",
    timestamp: "5 minutes ago",
    read: false,
    actionUrl: "/donors/1"
  },
  {
    id: "2",
    type: "meeting",
    title: "Upcoming Meeting",
    message: "Donor cultivation meeting with Robert Chen in 30 minutes",
    timestamp: "25 minutes ago",
    read: false,
    actionUrl: "/workflow/calendar"
  },
  {
    id: "3",
    type: "task",
    title: "Task Reminder",
    message: "Follow up call with Sarah Johnson due today",
    timestamp: "1 hour ago",
    read: false,
    actionUrl: "/workflow/task-priorities"
  },
  {
    id: "4",
    type: "mention",
    title: "You were mentioned",
    message: "David Martinez mentioned you in a note about the Capital Campaign",
    timestamp: "2 hours ago",
    read: true
  },
  {
    id: "5",
    type: "system",
    title: "Sync Complete",
    message: "Salesforce data sync completed successfully. 156 records updated.",
    timestamp: "3 hours ago",
    read: true
  },
  {
    id: "6",
    type: "alert",
    title: "Data Quality Alert",
    message: "12 donor records have missing email addresses",
    timestamp: "4 hours ago",
    read: true,
    actionUrl: "/data-health"
  },
  {
    id: "7",
    type: "gift",
    title: "Recurring Gift Started",
    message: "Jennifer Wu started a monthly gift of $100/month",
    timestamp: "Yesterday",
    read: true
  },
  {
    id: "8",
    type: "meeting",
    title: "Meeting Notes Added",
    message: "Lisa Kim added notes from the Board meeting",
    timestamp: "Yesterday",
    read: true
  },
];

const getTypeIcon = (type: Notification["type"]) => {
  switch (type) {
    case "gift":
      return <Gift className="w-5 h-5 text-green-600" />;
    case "meeting":
      return <Calendar className="w-5 h-5 text-blue-600" />;
    case "task":
      return <CheckCircle2 className="w-5 h-5 text-purple-600" />;
    case "mention":
      return <MessageSquare className="w-5 h-5 text-orange-600" />;
    case "system":
      return <Info className="w-5 h-5 text-gray-600" />;
    case "alert":
      return <AlertCircle className="w-5 h-5 text-red-600" />;
    default:
      return <Bell className="w-5 h-5" />;
  }
};

const getTypeBadge = (type: Notification["type"]) => {
  const styles: Record<string, string> = {
    gift: "bg-green-100 text-green-700 border-green-200",
    meeting: "bg-blue-100 text-blue-700 border-blue-200",
    task: "bg-purple-100 text-purple-700 border-purple-200",
    mention: "bg-orange-100 text-orange-700 border-orange-200",
    system: "bg-gray-100 text-gray-700 border-gray-200",
    alert: "bg-red-100 text-red-700 border-red-200",
  };
  return styles[type] || "bg-gray-100 text-gray-700";
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !n.read;
    return n.type === activeTab;
  });

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

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold" data-testid="text-notifications-title">Notifications</h1>
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white" data-testid="badge-unread-count">
                {unreadCount} unread
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Stay updated on gifts, meetings, tasks, and system alerts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            data-testid="button-mark-all-read"
          >
            <Check className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
          <Button variant="outline" size="icon" data-testid="button-notification-settings">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="all" className="gap-2" data-testid="tab-all">
            <Bell className="w-4 h-4" />
            All
          </TabsTrigger>
          <TabsTrigger value="unread" className="gap-2" data-testid="tab-unread">
            <Clock className="w-4 h-4" />
            Unread
          </TabsTrigger>
          <TabsTrigger value="gift" className="gap-2" data-testid="tab-gifts">
            <Gift className="w-4 h-4" />
            Gifts
          </TabsTrigger>
          <TabsTrigger value="meeting" className="gap-2" data-testid="tab-meetings">
            <Calendar className="w-4 h-4" />
            Meetings
          </TabsTrigger>
          <TabsTrigger value="alert" className="gap-2" data-testid="tab-alerts">
            <AlertCircle className="w-4 h-4" />
            Alerts
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {filteredNotifications.length === 0 ? (
            <Card className="p-12 text-center">
              <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                {activeTab === "unread" 
                  ? "You're all caught up!" 
                  : "No notifications in this category"}
              </p>
            </Card>
          ) : (
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-2">
                {filteredNotifications.map((notification) => (
                  <Card 
                    key={notification.id}
                    className={`p-4 transition-colors cursor-pointer hover:bg-muted/50 ${
                      !notification.read ? "bg-blue-50/50 dark:bg-blue-950/20 border-l-4 border-l-blue-500" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                    data-testid={`notification-item-${notification.id}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 mt-1">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                            {notification.title}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getTypeBadge(notification.type)}`}
                          >
                            {notification.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {notification.timestamp}
                        </p>
                      </div>
                      <div className="shrink-0">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {!notification.read && (
                              <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                <Check className="w-4 h-4 mr-2" />
                                Mark as read
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              onClick={() => deleteNotification(notification.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </Tabs>
    </div>
  );
}
