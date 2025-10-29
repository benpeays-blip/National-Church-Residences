import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Gift, Heart, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

type GiftRegistry = {
  id: string;
  personId: string;
  occasionType: string;
  occasionDate: string;
  goalAmount: string;
  amountRaised: string;
  campaignId: string | null;
  personalMessage: string | null;
  publicUrl: string;
  active: number;
  closedAt: string | null;
  createdAt: string;
};

export default function GiftRegistries() {
  const { data: registries, isLoading, error, isError } = useQuery<GiftRegistry[], Error>({
    queryKey: ["/api/workflow/gift-registries"],
  });

  const getOccasionIcon = (type: string) => {
    if (type === "wedding") return <Heart className="w-5 h-5 text-pink-600" />;
    if (type === "birthday") return <Gift className="w-5 h-5 text-purple-600" />;
    return <CalendarIcon className="w-5 h-5 text-blue-600" />;
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Charitable Gift Registries</h1>
          <p className="text-muted-foreground">
            Track life event fundraisers - weddings, birthdays, celebrations
          </p>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-12 bg-muted rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">
              <p className="font-semibold mb-2">Failed to load gift registries</p>
              <p className="text-sm">{error?.message || "An error occurred"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const activeRegistries = registries?.filter((r) => r.active === 1) || [];
  const closedRegistries = registries?.filter((r) => r.active === 0) || [];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Charitable Gift Registries</h1>
        <p className="text-muted-foreground">
          Monitor wedding and celebration gift registries to identify charitable giving opportunities
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Registries ({activeRegistries.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeRegistries.length > 0 ? (
              activeRegistries.map((registry) => {
                const goal = parseFloat(registry.goalAmount);
                const raised = parseFloat(registry.amountRaised);
                const progress = (raised / goal) * 100;

                return (
                  <div key={registry.id} className="border rounded-lg p-4 space-y-3" data-testid={`card-registry-${registry.id}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getOccasionIcon(registry.occasionType)}
                        <div>
                          <div className="font-semibold capitalize">{registry.occasionType}</div>
                          <div className="text-sm text-muted-foreground">
                            {format(new Date(registry.occasionDate), "MMMM d, yyyy")}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Donor: {registry.personId.slice(0, 8)}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>

                    {registry.personalMessage && (
                      <div className="text-sm text-muted-foreground italic bg-muted/50 p-3 rounded">
                        "{registry.personalMessage}"
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Fundraising Progress</span>
                        <span className="font-semibold">
                          ${raised.toLocaleString()} of ${goal.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="text-xs text-muted-foreground text-right">
                        {Math.round(progress)}% to goal
                      </div>
                    </div>

                    {registry.publicUrl && (
                      <div className="text-xs text-muted-foreground">
                        Public URL: {registry.publicUrl}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No active gift registries
              </div>
            )}
          </CardContent>
        </Card>

        {closedRegistries.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Completed Registries ({closedRegistries.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {closedRegistries.slice(0, 5).map((registry) => {
                const goal = parseFloat(registry.goalAmount);
                const raised = parseFloat(registry.amountRaised);
                
                return (
                  <div key={registry.id} className="border rounded-lg p-4 opacity-75">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getOccasionIcon(registry.occasionType)}
                        <div>
                          <div className="font-semibold capitalize">{registry.occasionType}</div>
                          <div className="text-sm text-muted-foreground">
                            Raised ${raised.toLocaleString()} of ${goal.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">Closed</Badge>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
