import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Check, 
  CheckCheck, 
  Gift, 
  Users, 
  Calendar, 
  TrendingUp,
  MessageSquare,
  AlertCircle,
  Clock,
  Filter,
  Settings
} from "lucide-react";

interface Notification {
  id: string;
  type: "gift" | "donor" | "event" | "system" | "task" | "campaign";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  priority: "high" | "medium" | "low";
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "gift",
    title: "Major Gift Received",
    description: "Margaret Chen just made a $50,000 donation to the Annual Fund campaign.",
    timestamp: "5 minutes ago",
    read: false,
    priority: "high",
    actionUrl: "/donors/1"
  },
  {
    id: "2",
    type: "donor",
    title: "Donor Upgrade Opportunity",
    description: "AI detected that Robert Williams may be ready for a major gift ask based on recent engagement.",
    timestamp: "1 hour ago",
    read: false,
    priority: "high",
    actionUrl: "/donors/2"
  },
  {
    id: "3",
    type: "task",
    title: "Follow-up Reminder",
    description: "Scheduled call with Elizabeth Davis is in 30 minutes.",
    timestamp: "30 minutes ago",
    read: false,
    priority: "medium",
    actionUrl: "/donors/3"
  },
  {
    id: "4",
    type: "campaign",
    title: "Campaign Milestone Reached",
    description: "Spring Gala campaign has reached 75% of its fundraising goal!",
    timestamp: "2 hours ago",
    read: true,
    priority: "medium",
    actionUrl: "/campaigns"
  },
  {
    id: "5",
    type: "event",
    title: "Event Registration",
    description: "15 new registrations for the upcoming Donor Appreciation Dinner.",
    timestamp: "3 hours ago",
    read: true,
    priority: "low",
    actionUrl: "/events"
  },
  {
    id: "6",
    type: "system",
    title: "Data Sync Complete",
    description: "WealthEngine data has been successfully synced with 245 donor profiles updated.",
    timestamp: "4 hours ago",
    read: true,
    priority: "low"
  },
  {
    id: "7",
    type: "donor",
    title: "New Prospect Identified",
    description: "AI identified Sarah Thompson as a high-potential major gift prospect.",
    timestamp: "Yesterday",
    read: true,
    priority: "medium",
    actionUrl: "/donors"
  },
  {
    id: "8",
    type: "gift",
    title: "Recurring Gift Started",
    description: "Michael Brown has set up a $500/month recurring gift.",
    timestamp: "Yesterday",
    read: true,
    priority: "medium",
    actionUrl: "/gifts/recurring"
  },
];

const getTypeIcon = (type: Notification["type"]) => {
  switch (type) {
    case "gift": return Gift;
    case "donor": return Users;
    case "event": return Calendar;
    case "campaign": return TrendingUp;
    case "task": return Clock;
    case "system": return AlertCircle;
    default: return Bell;
  }
};

const getTypeColor = (type: Notification["type"]) => {
  switch (type) {
    case "gift": return "text-green-600 bg-green-50 dark:bg-green-900/30";
    case "donor": return "text-blue-600 bg-blue-50 dark:bg-blue-900/30";
    case "event": return "text-purple-600 bg-purple-50 dark:bg-purple-900/30";
    case "campaign": return "text-orange-600 bg-orange-50 dark:bg-orange-900/30";
    case "task": return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30";
    case "system": return "text-gray-600 bg-gray-50 dark:bg-gray-800";
    default: return "text-gray-600 bg-gray-50";
  }
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !n.read;
    return n.type === activeTab;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold" data-testid="text-notifications-title">Notifications</h1>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="rounded-full" data-testid="badge-unread-count">
                {unreadCount} unread
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Stay updated on donor activity, gifts, events, and system alerts
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
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark all read
          </Button>
          <Button variant="outline" size="icon" data-testid="button-notification-settings">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7" data-testid="tabs-notification-filter">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadCount > 0 && <span className="ml-1 text-xs">({unreadCount})</span>}
          </TabsTrigger>
          <TabsTrigger value="gift">Gifts</TabsTrigger>
          <TabsTrigger value="donor">Donors</TabsTrigger>
          <TabsTrigger value="event">Events</TabsTrigger>
          <TabsTrigger value="campaign">Campaigns</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <Card className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredNotifications.length === 0 ? (
              <div className="p-12 text-center">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No notifications</h3>
                <p className="text-sm text-muted-foreground">
                  {activeTab === "unread" 
                    ? "You're all caught up! No unread notifications." 
                    : "No notifications in this category yet."}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const Icon = getTypeIcon(notification.type);
                const colorClass = getTypeColor(notification.type);
                
                return (
                  <div 
                    key={notification.id}
                    className={`p-4 flex items-start gap-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                      !notification.read ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                    data-testid={`notification-item-${notification.id}`}
                  >
                    {/* Icon */}
                    <div className={`p-2.5 rounded-full ${colorClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className={`text-sm font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                            {notification.description}
                          </p>
                        </div>
                        {!notification.read && (
                          <span className="h-2.5 w-2.5 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {notification.timestamp}
                        </span>
                        {notification.priority === "high" && (
                          <Badge variant="destructive" className="text-xs">High Priority</Badge>
                        )}
                        {notification.actionUrl && (
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="h-auto p-0 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = notification.actionUrl!;
                            }}
                          >
                            View details
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Mark as read button */}
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                        data-testid={`button-mark-read-${notification.id}`}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                );
              })
            )}
          </Card>
        </TabsContent>
      </Tabs>

      {/* Notification Preferences Summary */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Notification Preferences</p>
              <p className="text-xs text-muted-foreground">Email notifications are enabled for high-priority items</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => window.location.href = "/settings"}>
            Manage
          </Button>
        </div>
      </Card>
    </div>
  );
}
