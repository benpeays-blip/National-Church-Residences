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

export default function Events() {
  const [location, setLocation] = useLocation();
  
  // Derive active filter from URL
  const activeFilter = useMemo<EventFilter>(() => {
    const params = new URLSearchParams(window.location.search);
    return (params.get('filter') as EventFilter) || "all";
  }, [location]);

  const { data: events, isLoading } = useQuery<FundraisingEvent[]>({
    queryKey: ["/api/fundraising-events"],
  });

  // Handle filter change
  const handleFilterChange = (newFilter: EventFilter) => {
    setLocation(`/events?filter=${newFilter}`);
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
    if (!events) return { upcoming: 0, thisMonth: 0, totalRaised: 0 };
    
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    const upcoming = events.filter(e => new Date(e.eventDate) >= now).length;
    const thisMonth = events.filter(e => {
      const date = new Date(e.eventDate);
      return date >= thisMonthStart && date <= thisMonthEnd;
    }).length;
    const totalRaised = events
      .filter(e => e.status === "completed")
      .reduce((sum, e) => sum + parseFloat(e.amountRaised || "0"), 0);
    
    return { upcoming, thisMonth, totalRaised };
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border">
          <div className="text-sm text-muted-foreground mb-1">Upcoming Events</div>
          <div className="text-2xl font-semibold tabular-nums">{metrics.upcoming}</div>
        </Card>
        <Card className="p-6 border">
          <div className="text-sm text-muted-foreground mb-1">This Month</div>
          <div className="text-2xl font-semibold tabular-nums text-chart-1">{metrics.thisMonth}</div>
        </Card>
        <Card className="p-6 border">
          <div className="text-sm text-muted-foreground mb-1">Total Raised (Completed)</div>
          <div className="text-2xl font-semibold tabular-nums">{formatCurrency(metrics.totalRaised)}</div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b">
        <button
          onClick={() => handleFilterChange("all")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeFilter === "all"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
          data-testid="filter-all"
        >
          All Events
        </button>
        <button
          onClick={() => handleFilterChange("upcoming")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeFilter === "upcoming"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
          data-testid="filter-upcoming"
        >
          Upcoming
        </button>
        <button
          onClick={() => handleFilterChange("past")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeFilter === "past"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
          data-testid="filter-past"
        >
          Past Events
        </button>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 gap-4">
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
          filteredEvents.map((event) => {
            const progress = event.goalAmount
              ? (parseFloat(event.amountRaised || "0") / parseFloat(event.goalAmount)) * 100
              : 0;

            return (
              <Card key={event.id} className="p-6 border" data-testid={`event-${event.id}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{event.name}</h3>
                      <Badge variant={event.status === "completed" ? "secondary" : "default"}>
                        {event.status === "completed" ? "Completed" : "Upcoming"}
                      </Badge>
                      <Badge variant="outline">{event.eventType}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{formatDate(new Date(event.eventDate))}</span>
                      </div>
                      {event.venue && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{event.venue}</span>
                        </div>
                      )}
                      {event.attendees && (
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{event.attendees} attendees</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress and Financial Info */}
                <div className="space-y-4">
                  {event.goalAmount && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {formatCurrency(parseFloat(event.amountRaised || "0"))} of {formatCurrency(parseFloat(event.goalAmount))}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">{progress.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Sponsors */}
                  {event.sponsors && event.sponsors.length > 0 && (
                    <div className="flex items-start gap-2">
                      <Trophy className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <div className="text-sm font-medium mb-1">Sponsors</div>
                        <div className="flex flex-wrap gap-2">
                          {event.sponsors.map((sponsor, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {sponsor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
