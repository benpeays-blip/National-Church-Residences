import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Settings() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account and application preferences
          </p>
        </div>
        <SettingsIcon className="w-8 h-8 text-muted-foreground" />
      </div>

      <Card className="p-6 border">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Name
            </label>
            <p className="text-base">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Email
            </label>
            <p className="text-base">{user?.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Role
            </label>
            <p className="text-base">{user?.role?.replace("_", " ")}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 border">
        <h2 className="text-xl font-semibold mb-4">Actions</h2>
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/api/logout")}
          data-testid="button-logout"
        >
          Sign Out
        </Button>
      </Card>
    </div>
  );
}
