import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { Calendar, Plus } from "lucide-react";

export default function Events() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-sm text-muted-foreground">
            Manage fundraising events and donor engagement activities
          </p>
        </div>
        <Button data-testid="button-add-event">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border">
          <div className="text-sm text-muted-foreground mb-1">Upcoming Events</div>
          <div className="text-2xl font-semibold tabular-nums">0</div>
        </Card>
        <Card className="p-6 border">
          <div className="text-sm text-muted-foreground mb-1">This Month</div>
          <div className="text-2xl font-semibold tabular-nums text-chart-1">0</div>
        </Card>
        <Card className="p-6 border">
          <div className="text-sm text-muted-foreground mb-1">Total Attendance</div>
          <div className="text-2xl font-semibold tabular-nums">0</div>
        </Card>
      </div>

      <EmptyState
        icon={Calendar}
        title="No events yet"
        description="Get started by adding your first fundraising event to the system. Track galas, walks, golf tournaments, and more."
        actionLabel="Add Event"
        onAction={() => {}}
      />
    </div>
  );
}
