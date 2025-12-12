import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { LayoutGrid, CalendarDays, Clock } from "lucide-react";
import Events from "@/pages/events";

const eventsTabs: SectionTab[] = [
  {
    label: "All Events",
    value: "all",
    icon: LayoutGrid,
    path: "/events",
  },
  {
    label: "Upcoming",
    value: "upcoming",
    icon: CalendarDays,
    path: "/events/upcoming",
  },
  {
    label: "Past Events",
    value: "past",
    icon: Clock,
    path: "/events/past",
  },
];

export default function EventsWithTabs() {
  const [location] = useLocation();
  
  // Determine active tab from URL path
  const getActiveTab = (): "all" | "upcoming" | "past" => {
    if (location.includes('/events/upcoming')) return 'upcoming';
    if (location.includes('/events/past')) return 'past';
    return 'all';
  };
  
  const activeTab = getActiveTab();

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={eventsTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        <Events filterType={activeTab === 'all' ? undefined : activeTab} />
      </div>
    </div>
  );
}
