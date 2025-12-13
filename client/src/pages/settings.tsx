import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Link2, 
  Database,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  Globe,
  Moon,
  Sun,
  Monitor,
  Check,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Key,
  Lock,
  AlertTriangle
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { SiSalesforce, SiMailchimp, SiSlack, SiGoogle, SiMicrosoft } from "react-icons/si";

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("account");
  
  // Settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [giftAlerts, setGiftAlerts] = useState(true);
  const [taskReminders, setTaskReminders] = useState(true);
  const [meetingReminders, setMeetingReminders] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState("team");
  const [activityVisible, setActivityVisible] = useState(true);
  const [theme, setTheme] = useState("system");
  const [compactMode, setCompactMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  const integrations = [
    { name: "Salesforce", icon: SiSalesforce, connected: true, lastSync: "2 hours ago", color: "#00A1E0" },
    { name: "Mailchimp", icon: SiMailchimp, connected: true, lastSync: "1 hour ago", color: "#FFE01B" },
    { name: "Slack", icon: SiSlack, connected: false, lastSync: null, color: "#4A154B" },
    { name: "Google Workspace", icon: SiGoogle, connected: true, lastSync: "30 min ago", color: "#4285F4" },
    { name: "Microsoft 365", icon: SiMicrosoft, connected: false, lastSync: null, color: "#00A4EF" },
  ];

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold" data-testid="text-settings-title">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account, notifications, privacy, and application preferences
          </p>
        </div>
        <SettingsIcon className="w-8 h-8 text-muted-foreground" />
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="account" className="gap-2" data-testid="tab-account">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2" data-testid="tab-notifications">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2" data-testid="tab-privacy">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2" data-testid="tab-appearance">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2" data-testid="tab-integrations">
            <Link2 className="w-4 h-4" />
            <span className="hidden sm:inline">Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="gap-2" data-testid="tab-data">
            <Database className="w-4 h-4" />
            <span className="hidden sm:inline">Data</span>
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  defaultValue={user?.firstName || ""} 
                  data-testid="input-first-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  defaultValue={user?.lastName || ""} 
                  data-testid="input-last-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  defaultValue={user?.email || ""} 
                  data-testid="input-email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input 
                  id="role" 
                  defaultValue={user?.role?.replace("_", " ") || ""} 
                  disabled 
                  className="bg-muted"
                  data-testid="input-role"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button data-testid="button-save-profile">Save Changes</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Security
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Password</p>
                    <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" data-testid="button-change-password">
                  Change Password
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" data-testid="button-setup-2fa">
                  Set Up
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Active Sessions</p>
                    <p className="text-sm text-muted-foreground">Manage your logged-in devices</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" data-testid="button-manage-sessions">
                  Manage
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-destructive flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Danger Zone
            </h2>
            <div className="flex items-center justify-between p-4 border border-destructive/30 rounded-lg">
              <div>
                <p className="font-medium">Sign Out</p>
                <p className="text-sm text-muted-foreground">Sign out of your account on this device</p>
              </div>
              <Button
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => (window.location.href = "/api/logout")}
                data-testid="button-logout"
              >
                Sign Out
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Email Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">All Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications}
                  data-testid="switch-email-notifications"
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">Summary of your weekly activity</p>
                </div>
                <Switch 
                  checked={weeklyDigest} 
                  onCheckedChange={setWeeklyDigest}
                  disabled={!emailNotifications}
                  data-testid="switch-weekly-digest"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Gift Alerts</Label>
                  <p className="text-sm text-muted-foreground">Notifications when new gifts are recorded</p>
                </div>
                <Switch 
                  checked={giftAlerts} 
                  onCheckedChange={setGiftAlerts}
                  disabled={!emailNotifications}
                  data-testid="switch-gift-alerts"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Push Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive real-time notifications</p>
                </div>
                <Switch 
                  checked={pushNotifications} 
                  onCheckedChange={setPushNotifications}
                  data-testid="switch-push-notifications"
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Task Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get reminded about upcoming tasks</p>
                </div>
                <Switch 
                  checked={taskReminders} 
                  onCheckedChange={setTaskReminders}
                  disabled={!pushNotifications}
                  data-testid="switch-task-reminders"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Meeting Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get reminded before scheduled meetings</p>
                </div>
                <Switch 
                  checked={meetingReminders} 
                  onCheckedChange={setMeetingReminders}
                  disabled={!pushNotifications}
                  data-testid="switch-meeting-reminders"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Profile Visibility
            </h2>
            <div className="space-y-4">
              <div className="space-y-3">
                <Label className="font-medium">Who can see your profile</Label>
                <div className="grid gap-2">
                  {[
                    { value: "everyone", label: "Everyone", desc: "Your profile is visible to all users" },
                    { value: "team", label: "Team Only", desc: "Only your team members can see your profile" },
                    { value: "private", label: "Private", desc: "Only you can see your profile" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        profileVisibility === option.value 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setProfileVisibility(option.value)}
                      data-testid={`option-visibility-${option.value}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{option.label}</p>
                          <p className="text-sm text-muted-foreground">{option.desc}</p>
                        </div>
                        {profileVisibility === option.value && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <EyeOff className="w-5 h-5" />
              Activity Privacy
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Show Activity Status</Label>
                  <p className="text-sm text-muted-foreground">Let others see when you're active</p>
                </div>
                <Switch 
                  checked={activityVisible} 
                  onCheckedChange={setActivityVisible}
                  data-testid="switch-activity-visible"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Theme
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { value: "light", label: "Light", icon: Sun },
                { value: "dark", label: "Dark", icon: Moon },
                { value: "system", label: "System", icon: Monitor },
              ].map((option) => (
                <div
                  key={option.value}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors text-center ${
                    theme === option.value 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setTheme(option.value)}
                  data-testid={`option-theme-${option.value}`}
                >
                  <option.icon className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-medium">{option.label}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Display Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">Reduce spacing for more content</p>
                </div>
                <Switch 
                  checked={compactMode} 
                  onCheckedChange={setCompactMode}
                  data-testid="switch-compact-mode"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Link2 className="w-5 h-5" />
              Connected Services
            </h2>
            <div className="space-y-3">
              {integrations.map((integration) => (
                <div 
                  key={integration.name}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${integration.color}20` }}
                    >
                      <integration.icon 
                        className="w-5 h-5" 
                        style={{ color: integration.color }}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{integration.name}</p>
                      {integration.connected ? (
                        <p className="text-sm text-muted-foreground">
                          Last synced {integration.lastSync}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {integration.connected && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <Check className="w-3 h-3 mr-1" />
                        Connected
                      </Badge>
                    )}
                    <Button 
                      variant={integration.connected ? "outline" : "default"}
                      size="sm"
                      data-testid={`button-integration-${integration.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {integration.connected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Data Tab */}
        <TabsContent value="data" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Data Sync
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Auto-Sync</Label>
                  <p className="text-sm text-muted-foreground">Automatically sync data in background</p>
                </div>
                <Switch 
                  checked={autoSync} 
                  onCheckedChange={setAutoSync}
                  data-testid="switch-auto-sync"
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Last Full Sync</p>
                  <p className="text-sm text-muted-foreground">Today at 9:15 AM</p>
                </div>
                <Button variant="outline" size="sm" data-testid="button-sync-now">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync Now
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export & Import
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Export Data</p>
                  <p className="text-sm text-muted-foreground">Download all your data as CSV or JSON</p>
                </div>
                <Button variant="outline" size="sm" data-testid="button-export-data">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Import Data</p>
                  <p className="text-sm text-muted-foreground">Import data from external sources</p>
                </div>
                <Button variant="outline" size="sm" data-testid="button-import-data">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-destructive flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Delete Data
            </h2>
            <div className="p-4 border border-destructive/30 rounded-lg">
              <p className="font-medium">Clear All Local Data</p>
              <p className="text-sm text-muted-foreground mb-4">
                This will clear cached data on this device. Your account data will not be affected.
              </p>
              <Button
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                data-testid="button-clear-data"
              >
                Clear Local Data
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
