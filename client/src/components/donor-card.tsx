import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, FileText } from "lucide-react";
import { formatCurrency, formatDateRelative, getInitials } from "@/lib/utils";
import { ScoreIndicator } from "./score-indicator";
import { DataProvenanceBadge } from "./data-provenance-badge";
import type { Person } from "@shared/schema";

interface DonorCardProps {
  donor: Person;
  onSelect?: (donor: Person) => void;
}

export function DonorCard({ donor, onSelect }: DonorCardProps) {
  return (
    <Card
      className="overflow-hidden hover-elevate cursor-pointer"
      onClick={() => onSelect?.(donor)}
      data-testid={`donor-card-${donor.id}`}
    >
      {/* Header with subtle blue background */}
      <div 
        className="p-4 pb-3 flex items-start gap-4"
        style={{ backgroundColor: "rgba(222, 235, 247, 0.5)" }}
      >
        <Avatar className="w-12 h-12">
          <AvatarFallback className="bg-primary/10 text-primary font-medium">
            {getInitials(donor.firstName, donor.lastName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-base font-semibold truncate">
                {donor.firstName} {donor.lastName}
              </h3>
              {donor.organizationName && (
                <p className="text-sm text-muted-foreground truncate">
                  {donor.organizationName}
                </p>
              )}
            </div>
            {donor.wealthBand && (
              <Badge variant="outline" className="shrink-0">
                {donor.wealthBand}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="p-4 pt-3">
        <div className="grid grid-cols-3 gap-4 mb-3">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <p className="text-xs text-muted-foreground">Capacity</p>
                <DataProvenanceBadge
                  sourceSystem="WealthEngine"
                  syncedAt={donor.syncedAt}
                  variant="icon"
                />
              </div>
              <div className="flex items-center gap-2">
                <ScoreIndicator score={donor.capacityScore} size="sm" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                <p className="text-xs text-muted-foreground">Engagement</p>
                <DataProvenanceBadge
                  sourceSystem={donor.sourceSystem}
                  syncedAt={donor.syncedAt}
                  variant="icon"
                />
              </div>
              <div className="flex items-center gap-2">
                <ScoreIndicator score={donor.engagementScore} size="sm" />
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Affinity</p>
              <div className="flex items-center gap-2">
                <ScoreIndicator score={donor.affinityScore} size="sm" />
              </div>
            </div>
          </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Last Gift</span>
              <DataProvenanceBadge
                sourceSystem={donor.sourceSystem}
                syncedAt={donor.syncedAt}
                variant="icon"
              />
            </div>
            <span className="text-sm font-medium truncate">
              {formatCurrency(donor.lastGiftAmount)} •{" "}
              {formatDateRelative(donor.lastGiftDate)}
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
              }}
              data-testid={`button-email-${donor.id}`}
            >
              <Mail className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
              }}
              data-testid={`button-phone-${donor.id}`}
            >
              <Phone className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
              }}
              data-testid={`button-notes-${donor.id}`}
            >
              <FileText className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
