import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, MapPin, Users, DollarSign, Trophy } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { FundraisingEvent } from "@shared/schema";
import { useLocation } from "wouter";

type EventFilter = "all" | "past" | "upcoming";

// Event type formatting strategy:
// - Capitalize first letter of each word for multi-word types
// - Use title case for consistency across all event categories
// - Categories: Gala, Golf, Ride, Walk, Auction, Concert, Dinner, Virtual, etc.
function formatEventType(eventType: string): string {
  return eventType
    .split(/[\s-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

interface EventsProps {
  filterType?: "upcoming" | "past";
}

export default function Events({ filterType }: EventsProps = {}) {
  const [location, setLocation] = useLocation();
  
  // Derive active filter from prop or URL path
  const activeFilter = useMemo<EventFilter>(() => {
    if (filterType) return filterType;
    if (location.includes('/events/upcoming')) return 'upcoming';
    if (location.includes('/events/past')) return 'past';
    return "all";
  }, [location, filterType]);

  const { data: events, isLoading } = useQuery<FundraisingEvent[]>({
    queryKey: ["/api/fundraising-events"],
  });

  // Handle filter change
  const handleFilterChange = (newFilter: EventFilter) => {
    if (newFilter === "all") {
      setLocation('/events');
    } else {
      setLocation(`/events/${newFilter}`);
    }
  };

  // Filter events based on active filter
  const filteredEvents = useMemo(() => {
    if (!events) return [];
    
    const now = new Date();
    
    switch (activeFilter) {
      case "past":
        return events.filter(e => new Date(e.eventDate) < now);
      case "upcoming":
        return events.filter(e => new Date(e.eventDate) >= now);
      default:
        return events;
    }
  }, [events, activeFilter]);

  // Calculate metrics
  const metrics = useMemo(() => {
    if (!events) return { total: 0, upcoming: 0, past: 0, totalRaised: 0 };
    
    const now = new Date();
    
    const total = events.length;
    const upcoming = events.filter(e => new Date(e.eventDate) >= now).length;
    const past = events.filter(e => new Date(e.eventDate) < now).length;
    const totalRaised = events
      .filter(e => e.status === "completed")
      .reduce((sum, e) => sum + parseFloat(e.amountRaised || "0"), 0);
    
    return { total, upcoming, past, totalRaised };
  }, [events]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-96 bg-muted/20 rounded-lg animate-pulse" />
      </div>
    );
  }

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

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card 
          className="p-4 border hover-elevate cursor-pointer" 
          onClick={() => handleFilterChange("all")}
          data-testid="card-total-events"
        >
          <div className="text-xs text-muted-foreground mb-1">Total Events</div>
          <div className="text-xl font-semibold tabular-nums">{metrics.total}</div>
        </Card>
        <Card 
          className="p-4 border hover-elevate cursor-pointer" 
          onClick={() => handleFilterChange("upcoming")}
          data-testid="card-upcoming-events"
        >
          <div className="text-xs text-muted-foreground mb-1">Upcoming Events</div>
          <div className="text-xl font-semibold tabular-nums" style={{ color: "#2171b5" }}>{metrics.upcoming}</div>
        </Card>
        <Card 
          className="p-4 border hover-elevate cursor-pointer" 
          onClick={() => handleFilterChange("past")}
          data-testid="card-past-events"
        >
          <div className="text-xs text-muted-foreground mb-1">Past Events</div>
          <div className="text-xl font-semibold tabular-nums text-muted-foreground">{metrics.past}</div>
        </Card>
        <Card className="p-4 border" data-testid="card-total-raised">
          <div className="text-xs text-muted-foreground mb-1">Total Raised</div>
          <div className="text-xl font-semibold tabular-nums" style={{ color: "#1a5f2a" }}>{formatCurrency(metrics.totalRaised)}</div>
        </Card>
      </div>


      {/* Events Gallery */}
      {filteredEvents.length === 0 ? (
        <Card className="p-12 text-center border">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No events found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {activeFilter === "upcoming" && "No upcoming events scheduled"}
            {activeFilter === "past" && "No past events on record"}
            {activeFilter === "all" && "Get started by adding your first fundraising event"}
          </p>
          <Button size="sm" data-testid="button-add-first-event">
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredEvents.map((event) => {
            const progress = event.goalAmount
              ? (parseFloat(event.amountRaised || "0") / parseFloat(event.goalAmount)) * 100
              : 0;

            return (
              <Card key={event.id} className="border flex flex-col overflow-hidden" data-testid={`event-${event.id}`}>
                <div 
                  className="p-4 border-b"
                  style={{ backgroundColor: '#395174' }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-base line-clamp-1 text-white">{event.name}</h3>
                    <Badge 
                      variant="outline"
                      className="shrink-0 text-xs"
                      style={{ 
                        color: event.status === "completed" ? '#a0aec0' : '#e1c47d', 
                        borderColor: event.status === "completed" ? '#a0aec0' : '#e1c47d' 
                      }}
                    >
                      {event.status === "completed" ? "Completed" : "Upcoming"}
                    </Badge>
                  </div>
                  <Badge 
                    variant="outline" 
                    className="text-xs"
                    style={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}
                  >
                    {formatEventType(event.eventType)}
                  </Badge>
                </div>
                
                <div className="p-4 flex-1 space-y-3">
                  {event.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span>{formatDate(new Date(event.eventDate))}</span>
                    </div>
                    {event.venue && (
                      <div className="flex items-center gap-2 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span className="line-clamp-1">{event.venue}</span>
                      </div>
                    )}
                    {event.attendees && (
                      <div className="flex items-center gap-2 text-xs">
                        <Users className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress and Financial Info */}
                <div className="p-4 border-t space-y-3">
                  {event.goalAmount ? (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-xs font-medium">
                            {formatCurrency(parseFloat(event.amountRaised || "0"))}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {progress.toFixed(0)}% of {formatCurrency(parseFloat(event.goalAmount))}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full transition-all"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs font-medium">
                        {formatCurrency(parseFloat(event.amountRaised || "0"))} raised
                      </span>
                    </div>
                  )}

                  {/* Sponsors */}
                  {event.sponsors && event.sponsors.length > 0 && (
                    <div className="flex items-start gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="flex flex-wrap gap-1">
                        {event.sponsors.slice(0, 3).map((sponsor, i) => (
                          <Badge key={i} variant="outline" className="text-xs py-0">
                            {sponsor}
                          </Badge>
                        ))}
                        {event.sponsors.length > 3 && (
                          <Badge variant="outline" className="text-xs py-0">
                            +{event.sponsors.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
