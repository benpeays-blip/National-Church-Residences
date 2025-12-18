import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Users, Lightbulb, Phone, Mail, Heart, Award, Calendar, BookOpen, AlertTriangle, ArrowRight, CheckCircle2, Sparkles, Eye } from 'lucide-react';
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
  const [draggedDonor, setDraggedDonor] = useState<Donor | null>(null);
  const [isPartnerHovered, setIsPartnerHovered] = useState(false);
  const [, navigate] = useLocation();

  const { data, isLoading } = useQuery<QuadrantData>({
    queryKey: ['/api/donors/quadrant'],
  });

  // Drag handlers for donor dots
  const handleDragStart = (e: React.DragEvent, donor: Donor) => {
    // Only allow dragging from non-partner quadrants
    if (donor.quadrant === 'partner') {
      e.preventDefault();
      return;
    }
    setDraggedDonor(donor);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', donor.id);
    
    // Create a custom drag image
    const dragImage = document.createElement('div');
    dragImage.innerHTML = `<div style="padding: 8px 16px; background: #395174; color: white; border-radius: 8px; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">${donor.firstName} ${donor.lastName}</div>`;
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 50, 20);
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const handleDragEnd = () => {
    setDraggedDonor(null);
    setIsPartnerHovered(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsPartnerHovered(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only set to false if we're actually leaving the drop zone
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsPartnerHovered(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsPartnerHovered(false);
    
    if (draggedDonor && draggedDonor.quadrant !== 'partner') {
      // Navigate to action plan page
      navigate(`/donors/${draggedDonor.id}/action-plan`);
    }
    setDraggedDonor(null);
  };

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
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full min-h-0">
      {/* Main Quadrant Visualization */}
      <Card className="lg:col-span-3 flex flex-col overflow-hidden" style={{ maxHeight: 'calc(100vh - 80px)', minHeight: '420px' }}>
        <CardHeader className="border-b" style={{ backgroundColor: '#395174' }}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="w-5 h-5" style={{ color: '#e1c47d' }} />
                Donor Relationship Quadrant
              </CardTitle>
              <CardDescription className="mt-1 text-white/80">
                Energy increases upward; structure increases to the right.<br />Goal: Move every donor toward Partner.
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-sm" style={{ backgroundColor: '#e1c47d', color: '#000000' }}>
              {data.totalDonors} Donors
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-1 min-h-0 flex flex-col" style={{ backgroundColor: '#f4f4f4' }}>
          <div className="relative flex-1 min-h-0 pb-8 pl-10">
            <div className="relative w-full h-full min-h-[360px] max-h-[calc(100vh-80px)] aspect-square rounded-lg overflow-hidden bg-background" style={{ border: '3px solid #395174' }}>
              {/* Grid Lines */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
              <div className="absolute left-0 right-0 top-1/2 h-px bg-border" />

              {/* Partner Quadrant Drop Zone - Top Right */}
              <div
                className={`absolute top-0 right-0 w-1/2 h-1/2 transition-all duration-200 ${
                  isPartnerHovered 
                    ? 'bg-emerald-200/60 border-2 border-emerald-500' 
                    : ''
                }`}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                data-testid="drop-zone-partner"
              />

            {/* Quadrants - Clickable */}
            {/* Donor Dots with Hover Cards - rendered below headers (z-index ensures headers are always on top) */}
            {data.donors.map((donor) => {
              const isDraggable = donor.quadrant !== 'partner';
              const isBeingDragged = draggedDonor?.id === donor.id;
              
              // Calculate adjusted top position - dots ONLY in white content areas
              // Headers are h-12 (48px) at top of each quadrant half
              // Dots must NEVER overlap or touch the headers
              
              // Safe WHITE-only zones with generous padding:
              // Top half: 18% to 44% (clear of header at 0-13%, clear of middle at 50%)
              // Bottom half: 68% to 88% (clear of header at 50-63%, clear of bottom)
              
              let adjustedTop: string;
              if (donor.energy > 50) {
                // Top half: energy 100 -> near top, energy 51 -> near middle
                const energyInRange = (donor.energy - 50) / 50; // 0 to 1
                const usableStart = 18; // Safe distance below header
                const usableEnd = 44; // Safe distance above middle
                const topPercent = usableEnd - (energyInRange * (usableEnd - usableStart));
                adjustedTop = `${topPercent}%`;
              } else {
                // Bottom half: energy 50 -> near middle, energy 0 -> near bottom
                const energyInRange = donor.energy / 50; // 0 to 1
                const usableStart = 68; // Safe distance below middle header
                const usableEnd = 88; // Safe distance from bottom
                const topPercent = usableEnd - (energyInRange * (usableEnd - usableStart));
                adjustedTop = `${topPercent}%`;
              }
              
              return (
              <HoverCard key={donor.id} openDelay={150} closeDelay={50} open={draggedDonor ? false : undefined}>
                <HoverCardTrigger asChild>
                  <button
                    draggable={isDraggable}
                    onDragStart={(e) => handleDragStart(e, donor)}
                    onDragEnd={handleDragEnd}
                    className={`absolute w-2.5 h-2.5 rounded-full shadow-sm transition-all border-0 p-0 z-5 bg-primary/80 pointer-events-auto ${
                      isDraggable 
                        ? 'cursor-grab active:cursor-grabbing hover:scale-150' 
                        : 'cursor-pointer hover:scale-150'
                    } ${isBeingDragged ? 'opacity-50 scale-125' : ''}`}
                    style={{
                      left: `calc(${donor.structure}% - 5px)`,
                      top: adjustedTop,
                      zIndex: 5,
                    }}
                    data-testid={`dot-donor-${donor.id}`}
                    aria-label={isDraggable 
                      ? `Drag ${donor.firstName} ${donor.lastName} to Partner quadrant to generate action plan`
                      : `View profile for ${donor.firstName} ${donor.lastName}`
                    }
                    title={isDraggable ? 'Drag to Partner quadrant' : undefined}
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
              );
            })}

            {/* Quadrant Header Bars - at top of each quadrant */}
            {/* Top Left - Friend */}
            <button
              onClick={() => setSelectedQuadrant('friend')}
              className="absolute left-0 top-0 w-[calc(50%-1px)] h-12 z-30 pointer-events-auto flex flex-col items-center justify-center cursor-pointer transition-colors hover:brightness-110 bg-[#395174] border-b border-[#395174]/30"
              data-testid="quadrant-friend"
            >
              <span className="font-semibold text-sm text-white">Friend</span>
              <span className="text-xs text-[#e1c47d] font-medium" data-testid="count-friend">{data.counts.friend} Donors</span>
            </button>

            {/* Top Right - Partner */}
            <button
              onClick={() => setSelectedQuadrant('partner')}
              className="absolute left-1/2 top-0 w-1/2 h-12 z-30 pointer-events-auto flex flex-col items-center justify-center cursor-pointer transition-colors hover:brightness-110 bg-[#395174] border-b border-[#395174]/30"
              data-testid="quadrant-partner"
            >
              <span className="font-semibold text-sm text-white">Partner</span>
              <span className="text-xs text-[#e1c47d] font-medium" data-testid="count-partner">{data.counts.partner} Donors</span>
            </button>
            {isPartnerHovered && draggedDonor && (
              <div className="absolute left-3/4 top-14 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded shadow z-40">
                Drop to generate action plan
              </div>
            )}

            {/* Bottom Left - Acquaintance */}
            <button
              onClick={() => setSelectedQuadrant('acquaintance')}
              className="absolute left-0 top-1/2 w-[calc(50%-1px)] h-12 z-30 pointer-events-auto flex flex-col items-center justify-center cursor-pointer transition-colors hover:brightness-110 bg-[#395174] border-b border-[#395174]/30"
              data-testid="quadrant-acquaintance"
            >
              <span className="font-semibold text-sm text-white">Acquaintance</span>
              <span className="text-xs text-[#e1c47d] font-medium" data-testid="count-acquaintance">{data.counts.acquaintance} Donors</span>
            </button>

            {/* Bottom Right - Colleague */}
            <button
              onClick={() => setSelectedQuadrant('colleague')}
              className="absolute left-1/2 top-1/2 w-1/2 h-12 z-30 pointer-events-auto flex flex-col items-center justify-center cursor-pointer transition-colors hover:brightness-110 bg-[#395174] border-b border-[#395174]/30"
              data-testid="quadrant-colleague"
            >
              <span className="font-semibold text-sm text-white">Colleague</span>
              <span className="text-xs text-[#e1c47d] font-medium" data-testid="count-colleague">{data.counts.colleague} Donors</span>
            </button>
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
      </Card>
      {/* Right Panel - Quadrant Details */}
      <Card className="lg:col-span-2 flex flex-col overflow-hidden" style={{ maxHeight: 'calc(100vh - 80px)', minHeight: '420px' }}>
        {/* Layered Tab Navigation */}
        <div className="flex border-b bg-muted/30 shrink-0">
          {(['partner', 'friend', 'colleague', 'acquaintance'] as QuadrantType[]).map((q) => {
            const isSelected = selectedQuadrant === q;
            const count = data.donors.filter(d => d.quadrant === q).length;
            return (
              <button
                key={q}
                onClick={() => setSelectedQuadrant(q)}
                className={`
                  flex-1 px-3 py-3 text-center transition-all relative border-r last:border-r-0
                  ${isSelected 
                    ? 'font-semibold shadow-sm z-10' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
                style={{ 
                  ...(isSelected ? { backgroundColor: '#395174' } : {}),
                  borderRightColor: 'rgba(57, 81, 116, 0.25)'
                }}
                data-testid={`tab-${q}`}
              >
                <div className="text-sm font-bold" style={isSelected ? { color: 'white' } : {}}>{quadrantConfig[q].label}</div>
                <div 
                  className={`text-xs mt-0.5 ${!isSelected ? 'text-muted-foreground' : ''}`}
                  style={isSelected ? { color: '#e1c47d' } : {}}
                >
                  {count} {count === 1 ? 'donor' : 'donors'}
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Selected quadrant description */}
        <div className="px-4 py-2 bg-muted/20 border-b text-sm text-muted-foreground shrink-0">
          {quadrantConfig[selectedQuadrant].description}
        </div>
        
        <CardContent className="p-4 pt-4 flex flex-col flex-1 min-h-0 overflow-hidden">

          {/* Donor List - Flexible height scrollable area */}
          <div className="flex-1 space-y-2 overflow-y-auto min-h-0">
            {selectedDonors.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-8">
                No donors in this quadrant yet.
              </div>
            ) : (
              selectedDonors.map((donor) => {
                const summaries: Record<QuadrantType, string> = {
                  partner: 'Highly engaged with strong giving structure',
                  friend: 'Enthusiastic supporter ready for deeper connection',
                  colleague: 'Consistent giver seeking more engagement',
                  acquaintance: 'New relationship with growth potential',
                };
                return (
                  <div
                    key={donor.id}
                    className="p-3 border rounded-lg hover-elevate text-sm"
                    data-testid={`donor-item-${donor.id}`}
                  >
                    <div className="flex items-start justify-between gap-2">
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
                        <div className="text-xs text-muted-foreground mt-1 italic">
                          {summaries[donor.quadrant as QuadrantType]}
                        </div>
                      </div>
                      <Link href={`/donors/${donor.id}`}>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs shrink-0"
                          data-testid={`view-donor-${donor.id}`}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </CardContent>
        
        {/* AI Playbook - Fixed at bottom aligned with quadrant footer */}
        <div className="bg-muted/30 border-t px-4 py-4 shrink-0">
          <div className="flex items-center gap-2 text-sm font-semibold mb-3">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span>AI Playbook to Move towards Partner:</span>
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
      </Card>
    </div>
  );
}
