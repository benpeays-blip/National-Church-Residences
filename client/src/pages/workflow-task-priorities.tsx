import { Card, CardContent } from "@/components/ui/card";
import { ListChecks } from "lucide-react";

export default function TaskPriorities() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI Task Prioritization</h1>
        <p className="text-muted-foreground">
          Every to-do gets an AI priority score based on urgency, impact, and donor capacity
        </p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <ListChecks className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Intelligent Task Scoring</h3>
          <p className="text-muted-foreground">
            AI ranks every fundraising task by urgency, revenue impact, and donor capacity
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Full implementation coming soon
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
