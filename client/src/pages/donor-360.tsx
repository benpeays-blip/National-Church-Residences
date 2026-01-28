import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScoreIndicator } from "@/components/score-indicator";
import { TaskItem } from "@/components/task-item";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Mail,
  Phone,
  Building2,
  Gift,
  MessageSquare,
  Calendar,
  TrendingUp,
  ListTodo,
  ArrowLeft,
} from "lucide-react";
import { Link } from "wouter";
import type { Person, Gift as GiftType, Interaction, Opportunity, Task } from "@shared/schema";

interface DonorProfile {
  person: Person;
  household: { id: string; name: string } | null;
  gifts: GiftType[];
  interactions: Interaction[];
  opportunities: Opportunity[];
  tasks: Task[];
}

interface TimelineEvent {
  id: string;
  type: "gift" | "interaction" | "opportunity";
  date: Date;
  title: string;
  description: string;
  amount?: string;
  icon: any;
  color: string;
  bgColor: string;
}

export default function Donor360() {
  const { id } = useParams();

  const { data, isLoading } = useQuery<DonorProfile>({
    queryKey: ["/api/persons", id, "profile"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-96" />
          <Skeleton className="lg:col-span-2 h-96" />
        </div>
      </div>
    );
  }

  if (!data?.person) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Donor not found</p>
      </div>
    );
  }

  const { person, household, gifts, interactions, opportunities, tasks } = data;

  // Build timeline from all activities with enhanced styling
  const timeline: TimelineEvent[] = [
    ...gifts.map((g) => ({
      id: g.id,
      type: "gift" as const,
      date: new Date(g.receivedAt),
      title: "Gift Received",
      description: `${formatCurrency(parseFloat(g.amount))}`,
      amount: g.amount,
      icon: Gift,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    })),
    ...interactions.map((i) => ({
      id: i.id,
      type: "interaction" as const,
      date: new Date(i.occurredAt),
      title: i.type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      description: i.notes || "",
      icon: i.type === "event" ? Calendar : MessageSquare,
      color: i.type === "event" ? "text-chart-3" : "text-chart-2",
      bgColor: i.type === "event" ? "bg-chart-3/10" : "bg-chart-2/10",
    })),
    ...opportunities.map((o) => ({
      id: o.id,
      type: "opportunity" as const,
      date: new Date(o.createdAt!),
      title: `Opportunity: ${o.stage}`,
      description: o.askAmount ? formatCurrency(parseFloat(o.askAmount)) : "",
      icon: TrendingUp,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const totalGiving = gifts.reduce((sum, g) => sum + parseFloat(g.amount), 0);
  const avgGift = gifts.length > 0 ? totalGiving / gifts.length : 0;
  const lastGift = gifts[0];

  // Find highest priority task (Next Best Action)
  const nextBestAction = tasks.filter((t) => !t.completed).sort((a, b) => {
    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  })[0];

  return (
    <div className="space-y-6" data-testid="page-donor-360">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/donors">
            <Button variant="ghost" size="icon" data-testid="button-back">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-semibold" data-testid="text-donor-name">
              {person.preferredName || person.firstName} {person.lastName}
            </h1>
            {household && (
              <p className="text-muted-foreground text-sm">
                {household.name} Household
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" data-testid="button-add-interaction">
            <MessageSquare className="w-4 h-4 mr-1.5" />
            Log Interaction
          </Button>
          <Button size="sm" data-testid="button-create-opportunity">
            <TrendingUp className="w-4 h-4 mr-1.5" />
            New Opportunity
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile & Scores */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card className="p-6" data-testid="card-contact-info">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <div className="space-y-3">
              {person.primaryEmail && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span data-testid="text-email">{person.primaryEmail}</span>
                </div>
              )}
              {person.primaryPhone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span data-testid="text-phone">{person.primaryPhone}</span>
                </div>
              )}
              {person.organizationName && (
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span data-testid="text-organization">{person.organizationName}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Donor Scores */}
          <Card className="p-6" data-testid="card-scores">
            <h2 className="text-lg font-semibold mb-4">Donor Scores</h2>
            <div className="space-y-4">
              <div data-testid="score-engagement">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Engagement</span>
                  <span className="text-sm text-muted-foreground">{person.engagementScore || 0}%</span>
                </div>
                <ScoreIndicator score={person.engagementScore || 0} size="sm" />
              </div>
              <div data-testid="score-capacity">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Capacity</span>
                  <span className="text-sm text-muted-foreground">{person.capacityScore || 0}%</span>
                </div>
                <ScoreIndicator score={person.capacityScore || 0} size="sm" />
              </div>
              <div data-testid="score-affinity">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Affinity</span>
                  <span className="text-sm text-muted-foreground">{person.affinityScore || 0}%</span>
                </div>
                <ScoreIndicator score={person.affinityScore || 0} size="sm" />
              </div>
            </div>
            {person.wealthBand && (
              <div className="mt-4 pt-4 border-t">
                <span className="text-sm text-muted-foreground">Wealth Band:</span>
                <Badge className="ml-2" variant="outline" data-testid="badge-wealth-band">
                  {person.wealthBand}
                </Badge>
              </div>
            )}
          </Card>

          {/* Giving Summary */}
          <Card className="p-6" data-testid="card-giving-summary">
            <h2 className="text-lg font-semibold mb-4">Giving Summary</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Lifetime Giving</p>
                <p className="text-2xl font-bold tabular-nums" data-testid="text-lifetime-giving">
                  {formatCurrency(totalGiving)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Total Gifts</p>
                  <p className="text-lg font-semibold tabular-nums" data-testid="text-total-gifts">
                    {gifts.length}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Avg Gift</p>
                  <p className="text-lg font-semibold tabular-nums" data-testid="text-avg-gift">
                    {formatCurrency(avgGift)}
                  </p>
                </div>
              </div>
              {lastGift && (
                <div className="pt-3 border-t">
                  <p className="text-xs text-muted-foreground">Last Gift</p>
                  <p className="text-sm font-medium">{formatCurrency(parseFloat(lastGift.amount))}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(lastGift.receivedAt)}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Next Best Action */}
          {nextBestAction && (
            <Card className="p-6 bg-chart-1/5 border-chart-1" data-testid="card-next-best-action">
              <div className="flex items-center gap-2 mb-3">
                <ListTodo className="w-5 h-5 text-chart-1" />
                <h2 className="text-lg font-semibold">Next Best Action</h2>
              </div>
              <TaskItem task={nextBestAction} />
            </Card>
          )}
        </div>

        {/* Right Column: Timeline & Activities */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Opportunities */}
          {opportunities.length > 0 && (
            <Card className="p-6" data-testid="card-opportunities">
              <h2 className="text-lg font-semibold mb-4">Active Opportunities</h2>
              <div className="space-y-3">
                {opportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    data-testid={`opportunity-${opp.id}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{opp.stage}</Badge>
                        {opp.probability && (
                          <span className="text-xs text-muted-foreground">
                            {opp.probability}% probability
                          </span>
                        )}
                      </div>
                      {opp.notes && (
                        <p className="text-sm text-muted-foreground mt-1">{opp.notes}</p>
                      )}
                    </div>
                    {opp.askAmount && (
                      <p className="text-lg font-semibold tabular-nums">
                        {formatCurrency(parseFloat(opp.askAmount))}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Activity Timeline */}
          <Card className="p-6" data-testid="card-timeline">
            <h2 className="text-lg font-semibold mb-4">Activity Timeline</h2>
            <div className="space-y-4">
              {timeline.length > 0 ? (
                timeline.slice(0, 20).map((event, index) => {
                  const Icon = event.icon;
                  return (
                    <div
                      key={`${event.type}-${event.id}`}
                      className="flex gap-3"
                      data-testid={`timeline-event-${index}`}
                    >
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full ${event.bgColor} flex items-center justify-center shrink-0`}>
                          <Icon className={`w-4 h-4 ${event.color}`} />
                        </div>
                        {index < timeline.length - 1 && (
                          <div className="w-px h-full bg-border mt-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{event.title}</p>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(event.date)}
                          </span>
                        </div>
                        {event.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No activity recorded yet
                </p>
              )}
            </div>
          </Card>

          {/* All Tasks */}
          {tasks.length > 0 && (
            <Card className="p-6" data-testid="card-all-tasks">
              <h2 className="text-lg font-semibold mb-4">All Tasks</h2>
              <div className="space-y-2">
                {tasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
