import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function SmartCalendar() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI Smart Calendar</h1>
        <p className="text-muted-foreground">
          Optimal meeting scheduling based on donor preferences, MGO availability, travel proximity
        </p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Smart Meeting Scheduler</h3>
          <p className="text-muted-foreground">
            AI optimizes donor meeting times based on preferences, proximity, and MGO calendars
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Full implementation coming soon
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
