import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Calendar,
  Shield,
  Award,
  Activity,
  Clock,
  Target,
  TrendingUp,
  Users,
  Gift,
  Edit,
  Camera,
  LogOut,
  Key,
  Bell,
  MapPin
} from "lucide-react";

interface ActivityItem {
  id: string;
  action: string;
  target: string;
  timestamp: string;
  type: "donor" | "gift" | "campaign" | "system";
}

const recentActivity: ActivityItem[] = [
  { id: "1", action: "Logged donor interaction", target: "Margaret Chen", timestamp: "10 minutes ago", type: "donor" },
  { id: "2", action: "Updated opportunity stage", target: "Spring Gala Major Gift", timestamp: "1 hour ago", type: "campaign" },
  { id: "3", action: "Recorded gift", target: "$25,000 from Robert Williams", timestamp: "2 hours ago", type: "gift" },
  { id: "4", action: "Added new prospect", target: "Sarah Thompson", timestamp: "3 hours ago", type: "donor" },
  { id: "5", action: "Completed meeting notes", target: "Board Member Lunch", timestamp: "Yesterday", type: "donor" },
  { id: "6", action: "Updated donor score", target: "Elizabeth Davis", timestamp: "Yesterday", type: "donor" },
  { id: "7", action: "Created campaign", target: "Year-End Appeal 2024", timestamp: "2 days ago", type: "campaign" },
  { id: "8", action: "Exported report", target: "Q3 Fundraising Summary", timestamp: "3 days ago", type: "system" },
];

const achievements = [
  { name: "First Major Gift", description: "Secured your first gift over $10,000", earned: true, date: "Jan 2024" },
  { name: "Portfolio Pro", description: "Manage 50+ donors in your portfolio", earned: true, date: "Mar 2024" },
  { name: "Engagement Expert", description: "Log 100 donor interactions", earned: true, date: "Jun 2024" },
  { name: "Goal Crusher", description: "Exceed quarterly fundraising goal", earned: true, date: "Sep 2024" },
  { name: "Team Player", description: "Collaborate on 10 shared opportunities", earned: false, date: null },
  { name: "Data Champion", description: "Maintain 95% data quality score", earned: false, date: null },
];

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const userStats = {
    donorsManaged: 127,
    totalRaised: 2450000,
    activeOpportunities: 23,
    meetingsThisMonth: 18,
    goalProgress: 78,
    engagementScore: 94,
  };

  const initials = user 
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() 
    : 'U';

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <Avatar className="h-28 w-28 border-4 border-background shadow-lg">
                <AvatarImage src={user?.profileImageUrl} />
                <AvatarFallback className="text-2xl bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-md"
                data-testid="button-change-photo"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              {user?.role?.replace("_", " ") || "Team Member"}
            </Badge>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold" data-testid="text-profile-name">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-muted-foreground">Major Gifts Officer</p>
              </div>
              <Button variant="outline" size="sm" data-testid="button-edit-profile">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span data-testid="text-profile-email">{user?.email || "email@example.com"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>Development Department</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Columbus, OH</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Member since January 2023</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 md:w-64">
            <Card className="p-3 text-center bg-muted/50">
              <p className="text-2xl font-bold text-blue-600">{userStats.donorsManaged}</p>
              <p className="text-xs text-muted-foreground">Donors Managed</p>
            </Card>
            <Card className="p-3 text-center bg-muted/50">
              <p className="text-2xl font-bold text-green-600">${(userStats.totalRaised / 1000000).toFixed(1)}M</p>
              <p className="text-xs text-muted-foreground">Total Raised</p>
            </Card>
            <Card className="p-3 text-center bg-muted/50">
              <p className="text-2xl font-bold text-orange-600">{userStats.activeOpportunities}</p>
              <p className="text-xs text-muted-foreground">Opportunities</p>
            </Card>
            <Card className="p-3 text-center bg-muted/50">
              <p className="text-2xl font-bold text-purple-600">{userStats.engagementScore}%</p>
              <p className="text-xs text-muted-foreground">Engagement</p>
            </Card>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList data-testid="tabs-profile-sections">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Goal Progress */}
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Annual Goal Progress
                </h3>
                <Badge variant="outline">{userStats.goalProgress}%</Badge>
              </div>
              <Progress value={userStats.goalProgress} className="h-3 mb-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>$1.91M raised</span>
                <span>$2.45M goal</span>
              </div>
            </Card>

            {/* Performance Metrics */}
            <Card className="p-5">
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-green-600" />
                This Month's Performance
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Donor Meetings</span>
                  <span className="font-medium">{userStats.meetingsThisMonth}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Proposals Sent</span>
                  <span className="font-medium">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Gifts Closed</span>
                  <span className="font-medium">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Amount Raised</span>
                  <span className="font-medium text-green-600">$187,500</span>
                </div>
              </div>
            </Card>

            {/* Portfolio Summary */}
            <Card className="p-5">
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-purple-600" />
                Portfolio Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Major Gift Prospects</span>
                  <span className="font-medium">45</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Cultivation</span>
                  <span className="font-medium">32</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pending Asks</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Stewardship</span>
                  <span className="font-medium">42</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-5">
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <Activity className="h-5 w-5 text-orange-600" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  <Gift className="h-4 w-4 mr-2" />
                  Log Gift
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Set Reminder
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="mt-4">
          <Card className="divide-y divide-gray-100 dark:divide-gray-800">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-4 flex items-center gap-4">
                <div className={`p-2 rounded-full ${
                  activity.type === "donor" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30" :
                  activity.type === "gift" ? "bg-green-50 text-green-600 dark:bg-green-900/30" :
                  activity.type === "campaign" ? "bg-purple-50 text-purple-600 dark:bg-purple-900/30" :
                  "bg-gray-50 text-gray-600 dark:bg-gray-800"
                }`}>
                  {activity.type === "donor" && <Users className="h-4 w-4" />}
                  {activity.type === "gift" && <Gift className="h-4 w-4" />}
                  {activity.type === "campaign" && <Target className="h-4 w-4" />}
                  {activity.type === "system" && <Activity className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.action}</span>
                    {" - "}
                    <span className="text-muted-foreground">{activity.target}</span>
                  </p>
                </div>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {activity.timestamp}
                </span>
              </div>
            ))}
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <Card 
                key={index} 
                className={`p-4 ${achievement.earned ? "" : "opacity-50"}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${
                    achievement.earned 
                      ? "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30" 
                      : "bg-gray-100 text-gray-400 dark:bg-gray-800"
                  }`}>
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{achievement.name}</p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    {achievement.earned && (
                      <p className="text-xs text-muted-foreground mt-1">Earned {achievement.date}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4 mt-4">
          <Card className="p-5">
            <h3 className="font-semibold flex items-center gap-2 mb-4">
              <Key className="h-5 w-5" />
              Account Security
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                </div>
                <Button variant="outline" size="sm">Change Password</Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">Active Sessions</p>
                  <p className="text-sm text-muted-foreground">Manage your logged-in devices</p>
                </div>
                <Button variant="outline" size="sm">View Sessions</Button>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-red-200 dark:border-red-900">
            <h3 className="font-semibold flex items-center gap-2 mb-4 text-red-600">
              <LogOut className="h-5 w-5" />
              Sign Out
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Sign out of your account on this device.
            </p>
            <Button 
              variant="destructive" 
              onClick={() => window.location.href = "/api/logout"}
              data-testid="button-sign-out"
            >
              Sign Out
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
