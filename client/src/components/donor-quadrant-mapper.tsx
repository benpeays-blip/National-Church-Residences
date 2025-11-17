import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TrendingUp, Users, Lightbulb, Phone, Mail, Heart, Award, Calendar } from 'lucide-react';

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

export default function DonorQuadrantMapper() {
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
    partner: { label: 'Partner', color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-200 dark:border-blue-800', textColor: 'text-blue-900 dark:text-blue-400', description: 'High Energy, High Structure' },
    friend: { label: 'Friend', color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-200 dark:border-blue-800', textColor: 'text-blue-700 dark:text-blue-400', description: 'High Energy, Low Structure' },
    colleague: { label: 'Colleague', color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-200 dark:border-blue-800', textColor: 'text-blue-600 dark:text-blue-400', description: 'Low Energy, High Structure' },
    acquaintance: { label: 'Acquaintance', color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-200 dark:border-blue-800', textColor: 'text-blue-500 dark:text-blue-400', description: 'Low Energy, Low Structure' },
  };

  const selectedDonors = data.donors.filter(d => d.quadrant === selectedQuadrant)
    .sort((a, b) => (b.energy + b.structure) - (a.energy + a.structure));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Main Quadrant Visualization */}
      <Card className="lg:col-span-3">
        <CardHeader className="bg-primary/5 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Donor Relationship Quadrant
              </CardTitle>
              <CardDescription className="mt-1">
                Energy increases upward; structure increases to the right. Goal: move every donor toward Partner.
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-sm">
              {data.totalDonors} Donors
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative w-full pb-10 pl-10">
            <div className="relative w-full aspect-square border-2 border-border rounded-lg overflow-hidden bg-background">
              {/* Grid Lines */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
              <div className="absolute left-0 right-0 top-1/2 h-px bg-border" />

            {/* Quadrants - Clickable */}
            {/* Top Left - Friend */}
            <button
              onClick={() => setSelectedQuadrant('friend')}
              className={`absolute left-0 top-0 w-1/2 h-1/2 p-4 ${quadrantConfig.friend.color} hover:bg-sky-100/60 dark:hover:bg-sky-900/40 active-elevate-2 transition-all`}
              style={{ background: selectedQuadrant === 'friend' ? 'linear-gradient(180deg, rgba(14, 165, 233, 0.15), transparent 60%)' : 'linear-gradient(180deg, rgba(14, 165, 233, 0.08), transparent 60%)' }}
              data-testid="quadrant-friend"
            >
              <div className={`font-bold text-lg ${quadrantConfig.friend.textColor}`}>Friend</div>
              <Badge className="mt-2" data-testid="count-friend">{data.counts.friend}</Badge>
            </button>

            {/* Top Right - Partner */}
            <button
              onClick={() => setSelectedQuadrant('partner')}
              className={`absolute right-0 top-0 w-1/2 h-1/2 p-4 ${quadrantConfig.partner.color} hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40 active-elevate-2 transition-all`}
              style={{ background: selectedQuadrant === 'partner' ? 'linear-gradient(180deg, rgba(16, 185, 129, 0.15), transparent 60%)' : 'linear-gradient(180deg, rgba(16, 185, 129, 0.08), transparent 60%)' }}
              data-testid="quadrant-partner"
            >
              <div className={`font-bold text-lg ${quadrantConfig.partner.textColor}`}>Partner</div>
              <Badge className="mt-2" data-testid="count-partner">{data.counts.partner}</Badge>
            </button>

            {/* Bottom Left - Acquaintance */}
            <button
              onClick={() => setSelectedQuadrant('acquaintance')}
              className={`absolute left-0 bottom-0 w-1/2 h-1/2 p-4 ${quadrantConfig.acquaintance.color} hover:bg-slate-100/60 dark:hover:bg-slate-900/40 active-elevate-2 transition-all`}
              style={{ background: selectedQuadrant === 'acquaintance' ? 'linear-gradient(0deg, rgba(100, 116, 139, 0.15), transparent 60%)' : 'linear-gradient(0deg, rgba(100, 116, 139, 0.08), transparent 60%)' }}
              data-testid="quadrant-acquaintance"
            >
              <div className={`font-bold text-lg ${quadrantConfig.acquaintance.textColor}`}>Acquaintance</div>
              <Badge className="mt-2" data-testid="count-acquaintance">{data.counts.acquaintance}</Badge>
            </button>

            {/* Bottom Right - Colleague */}
            <button
              onClick={() => setSelectedQuadrant('colleague')}
              className={`absolute right-0 bottom-0 w-1/2 h-1/2 p-4 ${quadrantConfig.colleague.color} hover:bg-amber-100/60 dark:hover:bg-amber-900/40 active-elevate-2 transition-all`}
              style={{ background: selectedQuadrant === 'colleague' ? 'linear-gradient(0deg, rgba(245, 158, 11, 0.15), transparent 60%)' : 'linear-gradient(0deg, rgba(245, 158, 11, 0.08), transparent 60%)' }}
              data-testid="quadrant-colleague"
            >
              <div className={`font-bold text-lg ${quadrantConfig.colleague.textColor}`}>Colleague</div>
              <Badge className="mt-2" data-testid="count-colleague">{data.counts.colleague}</Badge>
            </button>

            {/* Donor Dots with Hover Cards */}
            {data.donors.map((donor) => (
              <HoverCard key={donor.id} openDelay={150} closeDelay={50}>
                <HoverCardTrigger asChild>
                  <button
                    className="absolute w-2.5 h-2.5 rounded-full bg-primary/80 shadow-sm hover:scale-150 transition-transform cursor-pointer border-0 p-0"
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
                      <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{donor.bio}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="px-0 h-auto text-sky-500 hover:text-sky-600 mt-1"
                        asChild
                      >
                        <a href={`/donors/${donor.id}`}>View More</a>
                      </Button>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 divide-x bg-muted/30">
                      <div className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary">
                          ${parseFloat(donor.totalLifetimeGiving || '0').toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Lifetime</div>
                      </div>
                      <div className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary">{donor.giftCount}</div>
                        <div className="text-xs text-muted-foreground mt-1">Number of Gifts</div>
                      </div>
                    </div>

                    {/* Badges Section */}
                    <div className="p-4 border-t space-y-3">
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
        <CardHeader className={`${quadrantConfig[selectedQuadrant].color} border-b`}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={quadrantConfig[selectedQuadrant].textColor}>
                {quadrantConfig[selectedQuadrant].label}
              </CardTitle>
              <CardDescription className="text-xs mt-1">
                {quadrantConfig[selectedQuadrant].description}
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-sm">
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

          {/* Donor List - Takes up remaining space */}
          <div className="space-y-2 flex-1 overflow-y-auto mb-4">
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

          {/* AI Playbook - Fixed at bottom */}
          <div className="pt-4 border-t">
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
