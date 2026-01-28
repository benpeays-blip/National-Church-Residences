import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  User,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  Award,
  TrendingUp,
  Target,
  Clock,
  Gift,
  Users,
  FileText,
  Star,
  Edit,
  Camera
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface ActivityItem {
  id: string;
  type: "gift" | "meeting" | "task" | "note";
  title: string;
  description: string;
  timestamp: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "gift",
    title: "Recorded major gift",
    description: "Logged $50,000 gift from Margaret Thompson",
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    type: "meeting",
    title: "Completed donor meeting",
    description: "Met with Robert Chen to discuss planned giving",
    timestamp: "Yesterday"
  },
  {
    id: "3",
    type: "task",
    title: "Completed follow-up",
    description: "Sent thank you letter to Sarah Johnson",
    timestamp: "2 days ago"
  },
  {
    id: "4",
    type: "note",
    title: "Added donor note",
    description: "Updated prospect research for David Martinez",
    timestamp: "3 days ago"
  },
];

const mockStats = {
  totalGifts: 127,
  totalAmount: "$2.4M",
  meetingsThisMonth: 18,
  tasksCompleted: 156,
  conversionRate: 34,
  portfolioSize: 85,
};

const mockAchievements = [
  { name: "Top Performer Q3", date: "Sep 2024", icon: Award },
  { name: "100 Gifts Milestone", date: "Aug 2024", icon: Gift },
  { name: "Rising Star", date: "Jan 2024", icon: Star },
];

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase() || "U";
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User";
  const role = user?.role?.replace("_", " ") || "Team Member";

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user?.profileImageUrl || undefined} alt={fullName} />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <Button 
              size="icon" 
              variant="outline" 
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
              data-testid="button-change-avatar"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold" data-testid="text-profile-name">{fullName}</h1>
              <Badge variant="outline" className="w-fit mx-auto sm:mx-0">{role}</Badge>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Mail className="w-4 h-4" />
                <span data-testid="text-profile-email">{user?.email || "No email"}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Briefcase className="w-4 h-4" />
                <span>Major Gifts Officer</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <MapPin className="w-4 h-4" />
                <span>Columbus, OH</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Calendar className="w-4 h-4" />
                <span>Joined January 2023</span>
              </div>
            </div>
          </div>
          <Button variant="outline" className="gap-2" data-testid="button-edit-profile">
            <Edit className="w-4 h-4" />
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview" className="gap-2" data-testid="tab-overview">
            <User className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-2" data-testid="tab-activity">
            <Clock className="w-4 h-4" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="performance" className="gap-2" data-testid="tab-performance">
            <TrendingUp className="w-4 h-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="achievements" className="gap-2" data-testid="tab-achievements">
            <Award className="w-4 h-4" />
            Achievements
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Gift className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Gifts</p>
                  <p className="text-2xl font-bold" data-testid="text-total-gifts">{mockStats.totalGifts}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Raised</p>
                  <p className="text-2xl font-bold" data-testid="text-total-raised">{mockStats.totalAmount}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Portfolio Size</p>
                  <p className="text-2xl font-bold" data-testid="text-portfolio-size">{mockStats.portfolioSize}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Meetings This Month</p>
                  <p className="text-2xl font-bold" data-testid="text-meetings-count">{mockStats.meetingsThisMonth}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tasks Completed</p>
                  <p className="text-2xl font-bold" data-testid="text-tasks-completed">{mockStats.tasksCompleted}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold" data-testid="text-conversion-rate">{mockStats.conversionRate}%</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Goal Progress */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Annual Goal Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Fundraising Goal</span>
                  <span className="text-sm text-muted-foreground">$2.4M / $3M</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Donor Visits</span>
                  <span className="text-sm text-muted-foreground">156 / 200</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">New Major Donors</span>
                  <span className="text-sm text-muted-foreground">12 / 15</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {mockActivities.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/50"
                  data-testid={`activity-item-${activity.id}`}
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    {activity.type === "gift" && <Gift className="w-4 h-4 text-primary" />}
                    {activity.type === "meeting" && <Calendar className="w-4 h-4 text-primary" />}
                    {activity.type === "task" && <FileText className="w-4 h-4 text-primary" />}
                    {activity.type === "note" && <FileText className="w-4 h-4 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <div data-testid="metric-avg-gift">
                <p className="text-sm text-muted-foreground mb-1">Avg Gift Size</p>
                <p className="text-3xl font-bold">$18,897</p>
                <p className="text-sm text-primary">+12% vs last year</p>
              </div>
              <div data-testid="metric-retention">
                <p className="text-sm text-muted-foreground mb-1">Donor Retention</p>
                <p className="text-3xl font-bold">89%</p>
                <p className="text-sm text-primary">+5% vs last year</p>
              </div>
              <div data-testid="metric-visits">
                <p className="text-sm text-muted-foreground mb-1">Visits per Month</p>
                <p className="text-3xl font-bold">14</p>
                <p className="text-sm text-muted-foreground">Target: 15</p>
              </div>
              <div data-testid="metric-response">
                <p className="text-sm text-muted-foreground mb-1">Response Time</p>
                <p className="text-3xl font-bold">1.2 days</p>
                <p className="text-sm text-primary">Excellent</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Pipeline Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Prospects to Cultivation</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Cultivation to Ask</span>
                <span className="font-medium">62%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Ask to Close</span>
                <span className="font-medium">34%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Close to Stewardship</span>
                <span className="font-medium">91%</span>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Achievements & Recognition</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {mockAchievements.map((achievement) => (
                <Card 
                  key={achievement.name} 
                  className="p-6 text-center border-2 border-primary/20 bg-primary/5"
                  data-testid={`achievement-${achievement.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <achievement.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                  <p className="font-semibold">{achievement.name}</p>
                  <p className="text-sm text-muted-foreground">{achievement.date}</p>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Certifications</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50" data-testid="certification-cfre">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Certified Fund Raising Executive (CFRE)</p>
                  <p className="text-sm text-muted-foreground">Expires Dec 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50" data-testid="certification-salesforce">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Salesforce Administrator</p>
                  <p className="text-sm text-muted-foreground">Earned Mar 2024</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
