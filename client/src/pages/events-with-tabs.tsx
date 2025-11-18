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
    path: "/events?tab=upcoming",
  },
  {
    label: "Past Events",
    value: "past",
    icon: Clock,
    path: "/events?tab=past",
  },
];

export default function EventsWithTabs() {
  const [location] = useLocation();
  
  // Determine active tab from URL (used by Events component for filtering)
  const params = new URLSearchParams(window.location.search);
  const activeTab = params.get('tab') || 'all';

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={eventsTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        <Events />
      </div>
    </div>
  );
}
