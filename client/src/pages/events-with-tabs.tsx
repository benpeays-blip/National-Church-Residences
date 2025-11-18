import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, CalendarDays, Clock } from "lucide-react";
import Events from "@/pages/events";
import { useMemo } from "react";

type EventsTab = "all" | "upcoming" | "past";

export default function EventsWithTabs() {
  const [location, setLocation] = useLocation();

  // Derive active tab from URL
  const activeTab = useMemo<EventsTab>(() => {
    const params = new URLSearchParams(window.location.search);
    return (params.get('tab') as EventsTab) || "all";
  }, [location]);

  // Handle tab changes by updating URL
  const handleTabChange = (newTab: EventsTab) => {
    setLocation(`/events?tab=${newTab}`);
  };

  // Convert tab to filter param for Events component
  const filterParam = activeTab === "all" ? "all" : activeTab;

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Events</h1>
        <p className="text-sm text-muted-foreground">
          Manage fundraising events and donor engagement activities
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => handleTabChange(v as EventsTab)}>
        <TabsList className="grid w-full grid-cols-3 gap-1">
          <TabsTrigger value="all" data-testid="tab-all-events">
            <LayoutGrid className="w-4 h-4 mr-2" />
            All Events
          </TabsTrigger>
          <TabsTrigger value="upcoming" data-testid="tab-upcoming-events">
            <CalendarDays className="w-4 h-4 mr-2" />
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="past" data-testid="tab-past-events">
            <Clock className="w-4 h-4 mr-2" />
            Past Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Events />
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          <Events />
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          <Events />
        </TabsContent>
      </Tabs>
    </div>
  );
}
