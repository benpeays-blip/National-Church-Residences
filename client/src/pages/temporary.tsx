import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function Temporary() {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <CardTitle>Temporary</CardTitle>
          </div>
          <CardDescription>
            This is a temporary section for work-in-progress features and experiments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Content coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
