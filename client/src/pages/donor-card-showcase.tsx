import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, FileText, TrendingUp, DollarSign, Calendar, Award } from "lucide-react";
import { formatCurrency, formatDateRelative, getInitials } from "@/lib/utils";
import { ScoreIndicator } from "@/components/score-indicator";
import type { Person } from "@shared/schema";

export default function DonorCardShowcase() {
  const [, setLocation] = useLocation();
  const { data: donors } = useQuery<Person[]>({
    queryKey: ["/api/persons"],
  });

  const sampleDonors = donors?.slice(0, 3) || [];

  const DonorCardOption1 = ({ donor }: { donor: Person }) => (
    <Card
      className="p-6 hover-elevate cursor-pointer transition-all"
      onClick={() => setLocation(`/donors/${donor.id}`)}
      data-testid={`donor-card-option1-${donor.id}`}
    >
      <div className="flex items-start gap-4">
        <Avatar className="w-14 h-14 shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-base">
            {getInitials(donor.firstName, donor.lastName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="min-w-0">
              <h3 className="text-base font-semibold truncate">
                {donor.firstName} {donor.lastName}
              </h3>
              {donor.organizationName && (
                <p className="text-xs text-muted-foreground truncate">
                  {donor.organizationName}
                </p>
              )}
            </div>
            {donor.wealthBand && (
              <Badge variant="secondary" className="shrink-0 text-xs">
                {donor.wealthBand}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Capacity</p>
              <ScoreIndicator score={donor.capacityScore} size="sm" showLabel={false} />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Engagement</p>
              <ScoreIndicator score={donor.engagementScore} size="sm" showLabel={false} />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Affinity</p>
              <ScoreIndicator score={donor.affinityScore} size="sm" showLabel={false} />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-3 border-t">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">Last Gift</span>
              <span className="text-sm font-semibold">
                {formatCurrency(donor.lastGiftAmount)}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDateRelative(donor.lastGiftDate)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                <Mail className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                <Phone className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const DonorCardOption2 = ({ donor }: { donor: Person }) => (
    <Card
      className="p-6 hover-elevate cursor-pointer transition-all"
      onClick={() => setLocation(`/donors/${donor.id}`)}
      data-testid={`donor-card-option2-${donor.id}`}
    >
      <div className="flex flex-col items-center text-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
            {getInitials(donor.firstName, donor.lastName)}
          </AvatarFallback>
        </Avatar>
        
        <div className="space-y-1 w-full">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-base font-semibold">
              {donor.firstName} {donor.lastName}
            </h3>
            {donor.wealthBand && (
              <Badge variant="secondary" className="text-xs">
                {donor.wealthBand}
              </Badge>
            )}
          </div>
          {donor.organizationName && (
            <p className="text-xs text-muted-foreground truncate">
              {donor.organizationName}
            </p>
          )}
        </div>

        <div className="w-full grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-1">
            <ScoreIndicator score={donor.capacityScore} size="sm" showLabel={false} />
            <span className="text-xs text-muted-foreground">Capacity</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ScoreIndicator score={donor.engagementScore} size="sm" showLabel={false} />
            <span className="text-xs text-muted-foreground">Engagement</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ScoreIndicator score={donor.affinityScore} size="sm" showLabel={false} />
            <span className="text-xs text-muted-foreground">Affinity</span>
          </div>
        </div>

        <div className="w-full pt-3 border-t space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last Gift</span>
            <span className="font-semibold">{formatCurrency(donor.lastGiftAmount)}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
              <Mail className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
              <Phone className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
              <FileText className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  const DonorCardOption3 = ({ donor }: { donor: Person }) => (
    <Card
      className="p-6 hover-elevate cursor-pointer transition-all"
      onClick={() => setLocation(`/donors/${donor.id}`)}
      data-testid={`donor-card-option3-${donor.id}`}
    >
      <div className="grid grid-cols-[auto_1fr] gap-4">
        <div className="flex flex-col items-center gap-3">
          <Avatar className="w-14 h-14">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-base">
              {getInitials(donor.firstName, donor.lastName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
              <Mail className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold">
                {donor.firstName} {donor.lastName}
              </h3>
              {donor.organizationName && (
                <p className="text-xs text-muted-foreground truncate">
                  {donor.organizationName}
                </p>
              )}
            </div>
            {donor.wealthBand && (
              <Badge variant="secondary" className="text-xs">
                {donor.wealthBand}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-muted-foreground" />
              <div className="flex gap-1">
                <ScoreIndicator score={donor.capacityScore} size="sm" showLabel={false} />
                <ScoreIndicator score={donor.engagementScore} size="sm" showLabel={false} />
                <ScoreIndicator score={donor.affinityScore} size="sm" showLabel={false} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold">{formatCurrency(donor.lastGiftAmount)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{formatDateRelative(donor.lastGiftDate)}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const DonorCardOption4 = ({ donor }: { donor: Person }) => (
    <Card
      className="p-6 hover-elevate cursor-pointer transition-all border-l-4 border-l-primary/20"
      onClick={() => setLocation(`/donors/${donor.id}`)}
      data-testid={`donor-card-option4-${donor.id}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <Avatar className="w-12 h-12 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {getInitials(donor.firstName, donor.lastName)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-semibold truncate">
                {donor.firstName} {donor.lastName}
              </h3>
              {donor.wealthBand && (
                <Badge variant="outline" className="text-xs shrink-0">
                  {donor.wealthBand}
                </Badge>
              )}
            </div>
            {donor.organizationName && (
              <p className="text-xs text-muted-foreground truncate mb-2">
                {donor.organizationName}
              </p>
            )}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {donor.engagementScore}/100
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                {formatCurrency(donor.lastGiftAmount)}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDateRelative(donor.lastGiftDate)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
            <Mail className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
            <Phone className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Donor Card Design Options</h1>
        <p className="text-sm text-muted-foreground">
          Choose your preferred donor card design - all cards are clickable and navigate to donor details
        </p>
      </div>

      <div className="space-y-8">
        {/* Option 1 */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Option 1: Classic Data-Dense</h2>
            <p className="text-sm text-muted-foreground">
              Traditional layout with avatar on left, scores in grid, and action buttons at bottom
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleDonors.map((donor) => (
              <DonorCardOption1 key={donor.id} donor={donor} />
            ))}
          </div>
        </div>

        {/* Option 2 */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Option 2: Vertical Hero</h2>
            <p className="text-sm text-muted-foreground">
              Centered layout with prominent avatar, perfect for spotlighting key donors
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleDonors.map((donor) => (
              <DonorCardOption2 key={donor.id} donor={donor} />
            ))}
          </div>
        </div>

        {/* Option 3 */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Option 3: Split Layout</h2>
            <p className="text-sm text-muted-foreground">
              Two-column design with avatar & actions on left, details on right - great for scanning
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleDonors.map((donor) => (
              <DonorCardOption3 key={donor.id} donor={donor} />
            ))}
          </div>
        </div>

        {/* Option 4 */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Option 4: Minimal Horizontal</h2>
            <p className="text-sm text-muted-foreground">
              Clean horizontal layout with accent border - maximizes space efficiency
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sampleDonors.map((donor) => (
              <DonorCardOption4 key={donor.id} donor={donor} />
            ))}
          </div>
        </div>
      </div>

      <Card className="p-6 bg-muted/50">
        <p className="text-sm text-muted-foreground text-center">
          💡 All cards use the same spacing (p-6), typography scale, and hover effects from the design system.
          Click any card to navigate to the donor detail page.
        </p>
      </Card>
    </div>
  );
}
