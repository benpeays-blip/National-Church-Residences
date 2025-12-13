import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Users, Lightbulb, Phone, Mail, Heart, Award, Calendar, BookOpen, AlertTriangle, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Link } from 'wouter';

interface Donor {
  id: string;
  firstName: string;
  lastName: string;
  primaryEmail: string | null;
  primaryPhone: string | null;
  organizationName: string | null;
  totalLifetimeGiving: string | null;
  giftCount: number;
  yearsAsDonor: number;
  status: 'ACTIVE' | 'INACTIVE';
  badges: string[];
  bio: string;
  energy: number;
  structure: number;
  quadrant: 'partner' | 'friend' | 'colleague' | 'acquaintance';
  capacityScore: number | null;
  engagementScore: number | null;
  affinityScore: number | null;
}

interface QuadrantData {
  donors: Donor[];
  counts: {
    partner: number;
    friend: number;
    colleague: number;
    acquaintance: number;
  };
  playbooks: {
    partner: string[];
    friend: string[];
    colleague: string[];
    acquaintance: string[];
  };
  totalDonors: number;
}

type QuadrantType = 'partner' | 'friend' | 'colleague' | 'acquaintance';

interface DonorQuadrantMapperProps {
  showEducationalContent?: boolean;
}

export default function DonorQuadrantMapper({ showEducationalContent = false }: DonorQuadrantMapperProps) {
  const [selectedQuadrant, setSelectedQuadrant] = useState<QuadrantType>('partner');

  const { data, isLoading } = useQuery<QuadrantData>({
    queryKey: ['/api/donors/quadrant'],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-96 mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full aspect-square" />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const quadrantConfig = {
    partner: { label: 'Partner', description: 'High Energy, High Structure' },
    friend: { label: 'Friend', description: 'High Energy, Low Structure' },
    colleague: { label: 'Colleague', description: 'Low Energy, High Structure' },
    acquaintance: { label: 'Acquaintance', description: 'Low Energy, Low Structure' },
  };

  const selectedDonors = data.donors.filter(d => d.quadrant === selectedQuadrant)
    .sort((a, b) => (b.energy + b.structure) - (a.energy + a.structure));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Main Quadrant Visualization */}
      <Card className="lg:col-span-3">
        <CardHeader className="border-b" style={{ backgroundColor: '#395174' }}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="w-5 h-5" style={{ color: '#e1c47d' }} />
                Donor Relationship Quadrant
              </CardTitle>
              <CardDescription className="mt-1 text-white/80">
                Energy increases upward; structure increases to the right.<br />Goal: move every donor toward Partner.
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-sm" style={{ color: '#e1c47d', borderColor: '#e1c47d' }}>
              {data.totalDonors} Donors
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6" style={{ backgroundColor: '#f4f4f4' }}>
          <div className="relative w-full pb-10 pl-10">
            <div className="relative w-full aspect-square border-2 border-border rounded-lg overflow-hidden bg-background">
              {/* Grid Lines */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
              <div className="absolute left-0 right-0 top-1/2 h-px bg-border" />

            {/* Quadrants - Clickable */}
            {/* Donor Dots with Hover Cards - rendered first so labels appear on top */}
            {data.donors.map((donor) => (
              <HoverCard key={donor.id} openDelay={150} closeDelay={50}>
                <HoverCardTrigger asChild>
                  <button
                    className="absolute w-2.5 h-2.5 rounded-full bg-primary/80 shadow-sm hover:scale-150 transition-transform cursor-pointer border-0 p-0 z-10"
                    style={{
                      left: `calc(${donor.structure}% - 5px)`,
                      top: `calc(${100 - donor.energy}% - 5px)`,
                    }}
                    data-testid={`dot-donor-${donor.id}`}
                    aria-label={`View profile for ${donor.firstName} ${donor.lastName}`}
                  />
                </HoverCardTrigger>
                <HoverCardContent className="w-96 p-0 overflow-hidden z-50" side="right" align="start" sideOffset={10}>
                  <div className="space-y-0">
                    {/* Profile Header */}
                    <div className="p-4 bg-card border-b">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-16 h-16 border-2 border-primary/10">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                            {donor.firstName[0]}{donor.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg truncate" data-testid={`hovercard-name-${donor.id}`}>
                            {donor.firstName} {donor.lastName}
                          </h3>
                          <div className="flex flex-col gap-1.5 mt-2">
                            {donor.primaryPhone && (
                              <div className="flex items-center gap-1.5 text-xs">
                                <Badge variant="secondary" className="px-1.5 py-0.5 bg-sky-500 text-white hover:bg-sky-600 no-default-hover-elevate">
                                  <Phone className="w-3 h-3 mr-1" />
                                  CELL
                                </Badge>
                                <span className="text-sky-600 dark:text-sky-400 font-medium">{donor.primaryPhone}</span>
                              </div>
                            )}
                            {donor.primaryEmail && (
                              <div className="flex items-center gap-1.5 text-xs">
                                <Badge variant="secondary" className="px-1.5 py-0.5 bg-sky-500 text-white hover:bg-sky-600 no-default-hover-elevate">
                                  <Mail className="w-3 h-3 mr-1" />
                                  WORK
                                </Badge>
                                <span className="text-sky-600 dark:text-sky-400 font-medium truncate">{donor.primaryEmail}</span>
                              </div>
                            )}
                          </div>
                          <div className="mt-2">
                            <Badge 
                              variant={donor.status === 'ACTIVE' ? 'default' : 'secondary'} 
                              className={donor.status === 'ACTIVE' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 no-default-hover-elevate' : 'no-default-hover-elevate'}
                            >
                              {donor.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="border-t mt-3 pt-3">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {donor.bio}{' '}
                        <a 
                          href={`/donors/${donor.id}`} 
                          className="text-sky-500 hover:text-sky-600 hover:underline"
                        >
                          View More
                        </a>
                      </p>
                      <div className="mt-3">
                        <Link href={`/donors/${donor.id}/action-plan`}>
                          <Button 
                            variant="default"
                            size="sm"
                            className="h-7 text-xs"
                            data-testid={`button-action-plan-${donor.id}`}
                          >
                            <Sparkles className="w-3 h-3 mr-1" />
                            Generate Action Plan
                          </Button>
                        </Link>
                      </div>
                      </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 divide-x bg-muted/30">
                      <div className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary">
                          ${parseFloat(donor.totalLifetimeGiving || '0').toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Lifetime Giving</div>
                      </div>
                      <div className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary">{donor.giftCount}</div>
                        <div className="text-xs text-muted-foreground mt-1">Number of Gifts</div>
                      </div>
                    </div>

                    {/* Badges Section */}
                    <div className="p-4 border-t space-y-3 bg-white">
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Award className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>Donor for <strong>{donor.yearsAsDonor}</strong> year{donor.yearsAsDonor !== 1 ? 's' : ''}</span>
                          </div>
                          {donor.badges.length > 0 ? (
                            donor.badges.map((badge, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                {badge === 'Major Donor' && <Heart className="w-4 h-4 text-purple-500" fill="currentColor" />}
                                {badge === 'Monthly Donor' && <Heart className="w-4 h-4 text-blue-500" />}
                                <span>{badge}</span>
                              </div>
                            ))
                          ) : (
                            <div className="text-sm text-muted-foreground">
                              <span>Building relationship</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}

            {/* Quadrant Label Boxes - centered in each quadrant */}
            {/* Top Left - Friend */}
            <div className="absolute left-[25%] top-[25%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto">
              <button
                onClick={() => setSelectedQuadrant('friend')}
                className="relative px-3 py-2 rounded-lg border border-border shadow-sm cursor-pointer transition-colors hover:border-primary text-center bg-[#eef9fb] text-[#395174] w-[120px]"
                data-testid="quadrant-friend"
              >
                <div className="font-bold text-base">Friend</div>
                <Badge className="mt-1 bg-[#f4f4f4] text-[#395174]" data-testid="count-friend">{data.counts.friend}</Badge>
              </button>
            </div>

            {/* Top Right - Partner */}
            <div className="absolute left-[75%] top-[25%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto">
              <button
                onClick={() => setSelectedQuadrant('partner')}
                className="relative px-3 py-2 rounded-lg border border-border shadow-sm cursor-pointer transition-colors hover:border-primary text-center bg-[#eef9fb] text-[#395174] w-[120px]"
                data-testid="quadrant-partner"
              >
                <div className="font-bold text-base">Partner</div>
                <Badge className="mt-1 bg-[#f4f4f4] text-[#395174]" data-testid="count-partner">{data.counts.partner}</Badge>
              </button>
            </div>

            {/* Bottom Left - Acquaintance */}
            <div className="absolute left-[25%] top-[75%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto">
              <button
                onClick={() => setSelectedQuadrant('acquaintance')}
                className="relative px-3 py-2 rounded-lg border border-border shadow-sm cursor-pointer transition-colors hover:border-primary bg-[#eef9fb] text-[#395174] w-[140px] flex flex-col items-center justify-center"
                data-testid="quadrant-acquaintance"
              >
                <div className="font-bold text-base text-center">Acquaintance</div>
                <Badge className="mt-1 bg-[#f4f4f4] text-[#395174]" data-testid="count-acquaintance">{data.counts.acquaintance}</Badge>
              </button>
            </div>

            {/* Bottom Right - Colleague */}
            <div className="absolute left-[75%] top-[75%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto">
              <button
                onClick={() => setSelectedQuadrant('colleague')}
                className="relative px-3 py-2 rounded-lg border border-border shadow-sm cursor-pointer transition-colors hover:border-primary text-center bg-[#eef9fb] text-[#395174] w-[120px]"
                data-testid="quadrant-colleague"
              >
                <div className="font-bold text-base">Colleague</div>
                <Badge className="mt-1 bg-[#f4f4f4] text-[#395174]" data-testid="count-colleague">{data.counts.colleague}</Badge>
              </button>
            </div>
            </div>

            {/* Axis Labels - outside overflow-hidden container */}
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Energy →
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Structure →
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 border-t text-sm text-muted-foreground py-4 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 mr-2 text-primary" />
          <span>Goal: move every donor toward <strong className="text-foreground">Partner</strong> (top-right) with wise effort and structure.</span>
        </CardFooter>
      </Card>
      {/* Right Panel - Quadrant Details */}
      <Card className="lg:col-span-2">
        <CardHeader className="border-b" style={{ backgroundColor: '#395174' }}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">
                {quadrantConfig[selectedQuadrant].label}
              </CardTitle>
              <CardDescription className="text-xs mt-1 text-white/80">
                {quadrantConfig[selectedQuadrant].description}
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-sm" style={{ color: '#e1c47d', borderColor: '#e1c47d' }}>
              {selectedDonors.length} {selectedDonors.length === 1 ? 'donor' : 'donors'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex flex-col h-[600px]">
          {/* Tab Buttons */}
          <div className="flex gap-2 flex-wrap mb-4">
            {(['partner', 'friend', 'colleague', 'acquaintance'] as QuadrantType[]).map((q) => (
              <Button
                key={q}
                variant={selectedQuadrant === q ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedQuadrant(q)}
                className="text-xs"
                data-testid={`tab-${q}`}
              >
                {quadrantConfig[q].label}
              </Button>
            ))}
          </div>

          {/* Donor List - Flexible height scrollable area */}
          <div className="flex-1 space-y-2 overflow-y-auto min-h-0">
            {selectedDonors.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-8">
                No donors in this quadrant yet.
              </div>
            ) : (
              selectedDonors.map((donor) => (
                <div
                  key={donor.id}
                  className="flex items-start justify-between p-2 border rounded-lg hover-elevate text-sm"
                  data-testid={`donor-item-${donor.id}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">
                      {donor.firstName} {donor.lastName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Energy: {donor.energy} / Structure: {donor.structure}
                    </div>
                    {donor.organizationName && (
                      <div className="text-xs text-muted-foreground truncate">
                        {donor.organizationName}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* AI Playbook - Fixed height at bottom */}
          <div className="pt-4 mt-4 border-t shrink-0">
            <div className="flex items-center gap-2 text-sm font-semibold mb-3">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span>AI Playbook to move towards Partner:</span>
            </div>
            <ol className="space-y-2 text-sm">
              {data.playbooks[selectedQuadrant].map((step, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-muted-foreground">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
