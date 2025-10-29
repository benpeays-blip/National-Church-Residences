import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, getInitials } from "@/lib/utils";
import type { Opportunity } from "@shared/schema";

interface OpportunityCardProps {
  opportunity: Opportunity & {
    person?: {
      firstName: string;
      lastName: string;
    };
    owner?: {
      firstName: string | null;
      lastName: string | null;
    };
  };
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const probabilityColor =
    (opportunity.probability ?? 0) >= 75
      ? "bg-chart-2 text-white"
      : (opportunity.probability ?? 0) >= 50
      ? "bg-chart-4 text-white"
      : "bg-muted text-muted-foreground";

  return (
    <Card className="p-4 hover-elevate" data-testid={`opportunity-card-${opportunity.id}`}>
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-semibold truncate">
              {opportunity.person?.firstName} {opportunity.person?.lastName}
            </h4>
            <p className="text-xs text-muted-foreground mt-1">
              {formatCurrency(opportunity.askAmount)}
            </p>
          </div>
          {opportunity.probability !== null && (
            <Badge className={probabilityColor}>
              {opportunity.probability}%
            </Badge>
          )}
        </div>

        {opportunity.notes && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {opportunity.notes}
          </p>
        )}

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {opportunity.owner && (
              <Avatar className="w-6 h-6 flex-shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {getInitials(
                    opportunity.owner.firstName,
                    opportunity.owner.lastName
                  )}
                </AvatarFallback>
              </Avatar>
            )}
            <span className="text-xs text-muted-foreground">
              {opportunity.daysInStage
                ? `${opportunity.daysInStage} days`
                : "New"}
            </span>
          </div>
          <div className="flex-shrink-0">
            {opportunity.sourceSystem && (
              <span className="text-xs text-muted-foreground" data-testid="opportunity-data-source">
                Data Source: {opportunity.sourceSystem}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
