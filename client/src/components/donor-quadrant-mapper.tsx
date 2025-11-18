import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Users, Lightbulb, Phone, Mail, Heart, Award, Calendar, BookOpen, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

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
              className={`absolute left-0 top-0 w-1/2 h-1/2 p-4 hover-elevate active-elevate-2 transition-all ${
                selectedQuadrant === 'friend' ? 'bg-muted/50' : 'bg-muted/20'
              }`}
              data-testid="quadrant-friend"
            >
              <div className="font-bold text-lg">Friend</div>
              <Badge className="mt-2" data-testid="count-friend">{data.counts.friend}</Badge>
            </button>

            {/* Top Right - Partner */}
            <button
              onClick={() => setSelectedQuadrant('partner')}
              className={`absolute right-0 top-0 w-1/2 h-1/2 p-4 hover-elevate active-elevate-2 transition-all ${
                selectedQuadrant === 'partner' ? 'bg-muted/50' : 'bg-muted/20'
              }`}
              data-testid="quadrant-partner"
            >
              <div className="font-bold text-lg">Partner</div>
              <Badge className="mt-2" data-testid="count-partner">{data.counts.partner}</Badge>
            </button>

            {/* Bottom Left - Acquaintance */}
            <button
              onClick={() => setSelectedQuadrant('acquaintance')}
              className={`absolute left-0 bottom-0 w-1/2 h-1/2 p-4 hover-elevate active-elevate-2 transition-all ${
                selectedQuadrant === 'acquaintance' ? 'bg-muted/50' : 'bg-muted/20'
              }`}
              data-testid="quadrant-acquaintance"
            >
              <div className="font-bold text-lg">Acquaintance</div>
              <Badge className="mt-2" data-testid="count-acquaintance">{data.counts.acquaintance}</Badge>
            </button>

            {/* Bottom Right - Colleague */}
            <button
              onClick={() => setSelectedQuadrant('colleague')}
              className={`absolute right-0 bottom-0 w-1/2 h-1/2 p-4 hover-elevate active-elevate-2 transition-all ${
                selectedQuadrant === 'colleague' ? 'bg-muted/50' : 'bg-muted/20'
              }`}
              data-testid="quadrant-colleague"
            >
              <div className="font-bold text-lg">Colleague</div>
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
        <CardHeader className="bg-muted/30 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
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

      {/* Educational Content - Only show on dedicated quadrant page */}
      {showEducationalContent && (
        <>
          {/* Section Title */}
          <Card className="lg:col-span-5">
            <CardHeader className="bg-primary/5 border-b">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold">The Quadrant Explained</h2>
                <p className="text-sm text-muted-foreground">
                  A comprehensive framework for understanding and advancing donor relationships
                </p>
              </div>
            </CardHeader>
          </Card>

          {/* Master Tabs for Educational Content */}
          <Card className="lg:col-span-5">
            <CardContent className="pt-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="overview" data-testid="tab-master-overview">Overview</TabsTrigger>
                  <TabsTrigger value="thesis" data-testid="tab-master-thesis">Thesis</TabsTrigger>
                  <TabsTrigger value="summary" data-testid="tab-master-summary">Summary</TabsTrigger>
                  <TabsTrigger value="quadrant" data-testid="tab-master-quadrant">Quadrant Explained</TabsTrigger>
                  <TabsTrigger value="strategies" data-testid="tab-master-strategies">Movement Strategies</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <Card className="border-0 shadow-none">
                    <CardHeader className="bg-primary/5 border-b">
                      <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <p className="text-sm">
                        This framework maps donors using two essential axes:
                      </p>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Y-Axis: ENERGY (Low → High)</h4>
                          <p className="text-sm text-muted-foreground ml-4">
                            The relational energy and emotional investment exchanged between the organization and the donor.
                          </p>
                          <p className="text-sm text-muted-foreground ml-4 mt-1">
                            Energy = attention, personal connection, affinity, and sense of shared mission.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm mb-2">X-Axis: STRUCTURE (Low → High)</h4>
                          <p className="text-sm text-muted-foreground ml-4">
                            The systems, processes, touchpoints, and formalized pathways that define how donors engage.
                          </p>
                          <p className="text-sm text-muted-foreground ml-4 mt-1">
                            Structure = cadence, planning, communication channels, intentional movement, strategic invitations.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Thesis Tab */}
                <TabsContent value="thesis" className="space-y-6">
                  <Card className="border-0 shadow-none">
                    <CardHeader className="bg-primary/5 border-b">
                      <CardTitle>THE CENTRAL THESIS OF THE MODEL</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      {/* 2-Column Layout */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-5">
                          <div>
                            <h4 className="font-semibold text-sm mb-2">1. Donor movement is predictable.</h4>
                            <p className="text-sm text-muted-foreground ml-4 mb-2">
                              Every donor relationship moves from:
                            </p>
                            <p className="text-sm text-muted-foreground ml-4 italic">
                              anonymous → known → seen → valued → essential.
                            </p>
                            <p className="text-sm text-muted-foreground ml-4 mt-2">
                              This quadrant system maps that progression.
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-sm mb-2">2. All movement requires BOTH energy and structure.</h4>
                            <ul className="space-y-1 text-sm ml-8">
                              <li className="list-disc">Energy builds closeness.</li>
                              <li className="list-disc">Structure builds commitment.</li>
                            </ul>
                            <p className="text-sm text-muted-foreground ml-4 mt-2">
                              Partner-level donors emerge only where both converge.
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-sm mb-2">3. Each quadrant has a "default destiny."</h4>
                            <p className="text-sm text-muted-foreground ml-4 mb-2">
                              If not intentionally moved:
                            </p>
                            <ul className="space-y-1 text-sm ml-8">
                              <li className="list-disc">Acquaintances disappear.</li>
                              <li className="list-disc">Friends drift.</li>
                              <li className="list-disc">Colleagues plateau.</li>
                              <li className="list-disc">Partners deepen movements and eventually become legacy givers.</li>
                            </ul>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-5">
                          <div>
                            <h4 className="font-semibold text-sm mb-2">4. The organization's internal discipline determines upward movement.</h4>
                            <p className="text-sm text-muted-foreground ml-4 mb-2">
                              Most donors do not move on their own. They move because YOU intentionally:
                            </p>
                            <ul className="space-y-1 text-sm ml-8">
                              <li className="list-disc">invest energy,</li>
                              <li className="list-disc">introduce structure,</li>
                              <li className="list-disc">create clarity,</li>
                              <li className="list-disc">present meaningful opportunities.</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-sm mb-2">5. The ultimate goal is to form a community of Partners.</h4>
                            <p className="text-sm text-muted-foreground ml-4 mb-2">
                              This is where:
                            </p>
                            <ul className="space-y-1 text-sm ml-8">
                              <li className="list-disc">transformational gifts occur,</li>
                              <li className="list-disc">multi-year commitments are made,</li>
                              <li className="list-disc">advocacy spreads,</li>
                              <li className="list-disc">the mission accelerates exponentially.</li>
                            </ul>
                            <p className="text-sm text-muted-foreground ml-4 mt-2">
                              This quadrant is not a "category of donors" — it is the future leadership of the organization.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Summary Tab */}
                <TabsContent value="summary" className="space-y-6">
                  <Card className="border-0 shadow-none">
                    <CardHeader className="bg-primary/5 border-b">
                      <CardTitle>THE FINAL SUMMARY FRAMEWORK</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-sm mb-4 font-semibold">To reach the Partner quadrant:</p>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-border">
                          <thead>
                            <tr className="bg-muted/50">
                              <th className="border border-border p-3 text-left text-sm font-semibold">Quadrant</th>
                              <th className="border border-border p-3 text-left text-sm font-semibold">Needed Input</th>
                              <th className="border border-border p-3 text-left text-sm font-semibold">Movement Path</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="hover-elevate">
                              <td className="border border-border p-3 text-sm font-medium">Acquaintance</td>
                              <td className="border border-border p-3 text-sm">Energy + Initial Structure</td>
                              <td className="border border-border p-3 text-sm">Make them known → move to Friend</td>
                            </tr>
                            <tr className="hover-elevate">
                              <td className="border border-border p-3 text-sm font-medium">Friend</td>
                              <td className="border border-border p-3 text-sm">Structure</td>
                              <td className="border border-border p-3 text-sm">Build plan + cadence → move to Colleague/Partner</td>
                            </tr>
                            <tr className="hover-elevate">
                              <td className="border border-border p-3 text-sm font-medium">Colleague</td>
                              <td className="border border-border p-3 text-sm">Energy</td>
                              <td className="border border-border p-3 text-sm">Personalize → deepen meaning → move to Partner</td>
                            </tr>
                            <tr className="hover-elevate">
                              <td className="border border-border p-3 text-sm font-medium">Partner</td>
                              <td className="border border-border p-3 text-sm">Consistent Energy + Structure</td>
                              <td className="border border-border p-3 text-sm">Maintain → grow → legacy-level commitment</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Quadrant Explained Tab */}
                <TabsContent value="quadrant" className="space-y-6">
                  <Card className="border-0 shadow-none">
                    <CardHeader className="bg-primary/5 border-b">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <div>
                          <CardTitle>QUADRANT EXPLAINED</CardTitle>
                          <CardDescription className="mt-1">
                            A Strategic Model for Understanding and Moving Donors Toward Long-Term Partnership
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <Tabs defaultValue="partner" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 mb-6">
                          <TabsTrigger value="partner" data-testid="tab-framework-partner">Partner</TabsTrigger>
                          <TabsTrigger value="friend" data-testid="tab-framework-friend">Friend</TabsTrigger>
                          <TabsTrigger value="colleague" data-testid="tab-framework-colleague">Colleague</TabsTrigger>
                          <TabsTrigger value="acquaintance" data-testid="tab-framework-acquaintance">Acquaintance</TabsTrigger>
                        </TabsList>

                        {/* Partner Tab */}
                        <TabsContent value="partner" className="space-y-6">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-primary" />
                  THE PARTNER (HIGH ENERGY, HIGH STRUCTURE)
                </h3>
                <p className="text-muted-foreground italic mb-4">
                  "Aligned, invested, relationally connected, and strategically engaged."
                </p>
              </div>

              {/* 2-Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Definition</h4>
                    <p className="text-sm mb-2">Partners are:</p>
                    <ul className="space-y-1.5 text-sm ml-6">
                      <li className="list-disc">Multi-year givers</li>
                      <li className="list-disc">Multi-digit donors (major gift level)</li>
                      <li className="list-disc">People who see themselves as part of the mission</li>
                      <li className="list-disc">Investors, not simply donors</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3">Characteristics</h4>
                    <ul className="space-y-1.5 text-sm ml-6">
                      <li className="list-disc">Deep personal connection</li>
                      <li className="list-disc">Clear strategic alignment</li>
                      <li className="list-disc">Participates in planning, not simply funding</li>
                      <li className="list-disc">Regular rhythm of communication</li>
                      <li className="list-disc">Eager for updates, impact conversations, shared vision moments</li>
                    </ul>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Psychology</h4>
                    <p className="text-sm mb-2">Partners are motivated by:</p>
                    <ul className="space-y-1.5 text-sm ml-6">
                      <li className="list-disc">Belonging and shared ownership</li>
                      <li className="list-disc">Transformational impact</li>
                      <li className="list-disc">Purpose and stewardship</li>
                    </ul>
                    <p className="text-sm mt-3 mb-2">They want:</p>
                    <ul className="space-y-1.5 text-sm ml-6">
                      <li className="list-disc">Visibility into what matters</li>
                      <li className="list-disc">Relational access</li>
                      <li className="list-disc">Clear next steps</li>
                      <li className="list-disc">Meaningful engagement</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  Risks
                </h4>
                <ul className="space-y-1.5 text-sm ml-6">
                  <li className="list-disc">High expectation for transparency</li>
                  <li className="list-disc">Relationship must be tended like a garden</li>
                  <li className="list-disc">Requires both relational energy AND organizational excellence</li>
                </ul>
              </div>
                        </TabsContent>

                        {/* Friend Tab */}
                        <TabsContent value="friend" className="space-y-6">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-primary" />
                  THE FRIEND (HIGH ENERGY, LOW STRUCTURE)
                </h3>
                <p className="text-muted-foreground italic mb-4">
                  "Deep affection, high relational warmth, but no organized path to partnership."
                </p>
              </div>

              {/* 2-Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Definition</h4>
                    <p className="text-sm mb-2">Friends are donors who:</p>
                    <ul className="space-y-1.5 text-sm ml-6">
                      <li className="list-disc">Know you personally (staff, volunteers, neighbors, church members)</li>
                      <li className="list-disc">Like what you do, and like YOU</li>
                      <li className="list-disc">Say things like, "Let me know how I can help," but no plan emerges</li>
                      <li className="list-disc">Willing to give time or emotional encouragement</li>
                      <li className="list-disc">Often inconsistent givers because no structure nudges them forward</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3">Characteristics</h4>
                    <ul className="space-y-1.5 text-sm ml-6">
                      <li className="list-disc">High relational capital</li>
                      <li className="list-disc">Motivated by affinity, story, and people</li>
                      <li className="list-disc">Warm, but unpredictable</li>
                      <li className="list-disc">Relationship = personal, not institutional</li>
                    </ul>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Psychology</h4>
                    <p className="text-sm mb-2">Friends give because:</p>
                    <ul className="space-y-1.5 text-sm ml-6">
                      <li className="list-disc">They trust the person more than the organization</li>
                      <li className="list-disc">They feel emotional resonance</li>
                      <li className="list-disc">They feel loyalty to a leader or founder</li>
                    </ul>
                    <p className="text-sm mt-3 mb-2">But without structure:</p>
                    <ul className="space-y-1.5 text-sm ml-6">
                      <li className="list-disc">They never fully integrate</li>
                      <li className="list-disc">They rarely become large or sustained givers</li>
                      <li className="list-disc">They remain "friendly, but uncommitted"</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  Risks
                </h4>
                <ul className="space-y-1.5 text-sm ml-6">
                  <li className="list-disc">Relational drift if contact is inconsistent</li>
                  <li className="list-disc">Emotional energy spent without strategic progression</li>
                  <li className="list-disc">Can stay "stuck" in friendliness without movement</li>
                </ul>
              </div>
                        </TabsContent>

                        {/* Colleague Tab */}
                        <TabsContent value="colleague" className="space-y-6">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  THE COLLEAGUE (LOW ENERGY, HIGH STRUCTURE)
                </h3>
                <p className="text-muted-foreground italic mb-4">
                  "Predictable, routine, system-driven, but not emotionally invested."
                </p>
              </div>

              {/* 2-Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Definition</h4>
                    <p className="text-sm mb-2">Colleagues are:</p>
                    <ul className="space-y-1.5 text-sm ml-6">
                      <li className="list-disc">Auto-pay donors</li>
                      <li className="list-disc">Monthly small givers</li>
                      <li className="list-disc">Workplace donors</li>
                      <li className="list-disc">Event attendees who give because "this is what we do every year"</li>
                      <li className="list-disc">People who respond well to structured programs but not personal connection</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3">Characteristics</h4>
                    <ul className="space-y-1.5 text-sm ml-6">
                      <li className="list-disc">Stable but not passionate</li>
                      <li className="list-disc">Consistent but not relational</li>
                      <li className="list-disc">Follow process; don't require high-touch work</li>
                      <li className="list-disc">They give because the system prompts them, not because the mission grips them</li>
                    </ul>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Psychology</h4>
                    <p className="text-sm mb-2">Colleagues value:</p>
                    <ul className="space-y-1.5 text-sm ml-6">
                      <li className="list-disc">Convenience and predictability</li>
                      <li className="list-disc">Minimal emotional demand</li>
                      <li className="list-disc">Professionalism and clarity</li>
                    </ul>
                    <p className="text-sm mt-3">They may not feel strongly connected, but they do trust your structure.</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  Risks
                </h4>
                <ul className="space-y-1.5 text-sm ml-6">
                  <li className="list-disc">They don't grow their giving</li>
                  <li className="list-disc">They rarely advocate or influence others</li>
                  <li className="list-disc">They will leave quietly if structure breaks down</li>
                </ul>
              </div>
                        </TabsContent>

                        {/* Acquaintance Tab */}
                        <TabsContent value="acquaintance" className="space-y-6">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                  <Mail className="w-5 h-5 text-primary" />
                  THE ACQUAINTANCE (LOW ENERGY, LOW STRUCTURE)
                </h3>
                <p className="text-muted-foreground italic mb-4">
                  "Loosely known, lightly engaged, no emotional bond, and no clear pathway."
                </p>
              </div>

              {/* 2-Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Definition</h4>
                    <p className="text-sm mb-2">Acquaintances are donors who:</p>
                    <ul className="space-y-1.5 text-sm ml-6">
                      <li className="list-disc">Respond to general appeals (direct mail, email blasts, digital ads)</li>
                      <li className="list-disc">Have minimal relationship history with the organization</li>
                      <li className="list-disc">Have given once or a few times but without ongoing personal engagement</li>
                      <li className="list-disc">Are not yet relationally "seen"</li>
                      <li className="list-disc">Often don't remember giving or can't articulate the mission clearly</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3">Characteristics</h4>
                    <ul className="space-y-1.5 text-sm ml-6">
                      <li className="list-disc">Transactional giving</li>
                      <li className="list-disc">Motivated by broad causes, not relationships</li>
                      <li className="list-disc">No expectation of reciprocation</li>
                      <li className="list-disc">Low brand loyalty</li>
                      <li className="list-disc">Easily lost if communication lapses</li>
                    </ul>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Psychology</h4>
                    <p className="text-sm mb-2">Acquaintances give out of:</p>
                    <ul className="space-y-1.5 text-sm ml-6">
                      <li className="list-disc">Impulse or low-level curiosity</li>
                      <li className="list-disc">"Someone asked me and it sounded good"</li>
                      <li className="list-disc">Social conformity (everyone gives to something)</li>
                    </ul>
                    <p className="text-sm mt-3">The relationship is shallow because no intentional structure OR personal energy exists.</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  Risks
                </h4>
                <ul className="space-y-1.5 text-sm ml-6">
                  <li className="list-disc">High churn</li>
                  <li className="list-disc">Forgotten donors</li>
                  <li className="list-disc">Donor fatigue quickly</li>
                  <li className="list-disc">No memory of your organization among their giving priorities</li>
                </ul>
              </div>
            </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Movement Strategies Tab */}
            <TabsContent value="strategies" className="space-y-6">
              <Card className="border-0 shadow-none">
                <CardHeader className="bg-primary/5 border-b">
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-primary" />
                    <div>
                      <CardTitle>MOVEMENT STRATEGIES</CardTitle>
                      <CardDescription className="mt-1">
                        HOW EACH QUADRANT ADVANCES TO PARTNER
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <Tabs defaultValue="acquaintance" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-6">
                      <TabsTrigger value="acquaintance" data-testid="tab-strategy-acquaintance">Acquaintance → Partner</TabsTrigger>
                      <TabsTrigger value="friend" data-testid="tab-strategy-friend">Friend → Partner</TabsTrigger>
                      <TabsTrigger value="colleague" data-testid="tab-strategy-colleague">Colleague → Partner</TabsTrigger>
                      <TabsTrigger value="partner" data-testid="tab-strategy-partner">Maintaining Partner</TabsTrigger>
                    </TabsList>

                    {/* Acquaintance → Partner */}
                    <TabsContent value="acquaintance" className="space-y-6">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                  <ArrowRight className="w-5 h-5 text-primary" />
                  ACQUAINTANCE → PARTNER
                </h3>
                <p className="text-sm font-semibold text-primary mb-4">
                  Primary Goal: Move from transactional giving to relational awareness and structured next steps.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">Strategy</h4>
                
                {/* 2-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-sm mb-2">1. Acknowledge their gift personally</p>
                      <p className="text-sm text-muted-foreground ml-4">
                        Humanize the relationship. Acquaintances become friends when they feel seen.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">2. Invite them into light-touch structure</p>
                      <p className="text-sm text-muted-foreground ml-4 mb-2">Examples:</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Short update email with a personal note</li>
                        <li className="list-disc">Quick "behind the scenes" story</li>
                        <li className="list-disc">Low-commitment survey ("Which part of our mission matters most to you?")</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">3. Place them in a predictable cadence</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Quarterly impact summaries</li>
                        <li className="list-disc">Personalized content based on interest</li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-sm mb-2">4. Offer a micro-commitment</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">RSVP for a 15-minute virtual update</li>
                        <li className="list-disc">Join a small group tour</li>
                        <li className="list-disc">Attend an info session</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">5. Identify affinity signals</p>
                      <p className="text-sm text-muted-foreground ml-4">
                        Once they show interest, move them to "Friend."
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">6. Bridge to higher-touch conversation</p>
                      <p className="text-sm text-muted-foreground ml-4 italic">
                        "I noticed your interest in ___. Could we share a short update with you?"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Outcome
                </h4>
                <p className="text-sm">They become Friends, then Colleagues, then Partners.</p>
              </div>
                    </TabsContent>

                    {/* Friend → Partner */}
                    <TabsContent value="friend" className="space-y-6">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                  <ArrowRight className="w-5 h-5 text-primary" />
                  FRIEND → PARTNER
                </h3>
                <p className="text-sm font-semibold text-primary mb-4">
                  Primary Goal: Add structure to high-energy relational warmth.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">Strategy</h4>
                
                {/* 2-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-sm mb-2">1. Convert relational warmth into a plan</p>
                      <p className="text-sm text-muted-foreground ml-4 italic">
                        "You've been close to our story — I'd love to explore what meaningful partnership might look like."
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">2. Introduce cadence</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Calendar the next touchpoint before ending the current one</li>
                        <li className="list-disc">Move from spontaneous connection → predictable engagement</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">3. Give them a role or responsibility</p>
                      <p className="text-sm text-muted-foreground ml-4 mb-2">
                        Friends become partners when they feel needed, not just liked:
                      </p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Host a small gathering</li>
                        <li className="list-disc">Join a vision preview</li>
                        <li className="list-disc">Help shape a project</li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-sm mb-2">4. Present specific investment opportunities</p>
                      <p className="text-sm text-muted-foreground ml-4 mb-2">
                        Friends respond to emotion; partners respond to clarity.
                      </p>
                      <p className="text-sm text-muted-foreground ml-4">
                        Give them something concrete to own.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">5. Create a vision conversation</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Invite them into the "why now" and the long-term plan</li>
                        <li className="list-disc">Connect their passion to a strategic initiative</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Outcome
                </h4>
                <p className="text-sm">Friendship + structure becomes Partnership.</p>
              </div>
                    </TabsContent>

                    {/* Colleague → Partner */}
                    <TabsContent value="colleague" className="space-y-6">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                  <ArrowRight className="w-5 h-5 text-primary" />
                  COLLEAGUE → PARTNER
                </h3>
                <p className="text-sm font-semibold text-primary mb-4">
                  Primary Goal: Warm the relationship and deepen energy without removing structure.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">Strategy</h4>
                
                {/* 2-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-sm mb-2">1. Move from impersonal to personal</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Send a personalized update tied to their giving history</li>
                        <li className="list-disc">Invite them to a short thank-you call</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">2. Show them the meaning behind the structure</p>
                      <p className="text-sm text-muted-foreground ml-4 mb-2 italic">
                        "Your automated monthly gift has helped…"
                      </p>
                      <p className="text-sm text-muted-foreground ml-4">
                        Give emotional significance to their pattern.
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">3. Offer deeper insight and stories</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Video updates</li>
                        <li className="list-disc">Program leader testimonials</li>
                        <li className="list-disc">Real-life transformation stories</li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-sm mb-2">4. Personal invitation to a higher-value opportunity</p>
                      <p className="text-sm text-muted-foreground ml-4 mb-2">
                        Colleagues respond to system integrity, so show how a major gift fits the broader structure:
                      </p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Multi-year vision</li>
                        <li className="list-disc">Strategic initiative</li>
                        <li className="list-disc">Campaign involvement</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">5. Bridge them to relational connection</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Introduce them to a key leader</li>
                        <li className="list-disc">Invite them to smaller gatherings where partnership feels natural</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Outcome
                </h4>
                <p className="text-sm">Colleague → relational warmth → structured major gift pathway → Partner.</p>
              </div>
                    </TabsContent>

                    {/* Maintaining Partner */}
                    <TabsContent value="partner" className="space-y-6">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-primary" />
                  MAINTAINING PARTNER STATUS
                </h3>
                <p className="text-sm font-semibold text-primary mb-4">
                  Primary Goal: Sustain high energy and high structure through continuous engagement and transparency.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">Strategy</h4>
                
                {/* 2-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-sm mb-2">1. Maintain regular, meaningful communication</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Provide quarterly impact reports with personalized insights</li>
                        <li className="list-disc">Share behind-the-scenes updates and strategic decisions</li>
                        <li className="list-disc">Schedule regular check-ins and vision conversations</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">2. Deepen their involvement</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Invite to strategic planning sessions</li>
                        <li className="list-disc">Offer board or advisory committee opportunities</li>
                        <li className="list-disc">Create co-ownership of specific initiatives</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">3. Honor their partnership publicly and privately</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Recognition events and acknowledgments</li>
                        <li className="list-disc">Personal thank-you from leadership</li>
                        <li className="list-disc">Share stories of impact enabled by their partnership</li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-sm mb-2">4. Provide exclusive access and insight</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">VIP tours and program visits</li>
                        <li className="list-disc">Direct access to executive leadership</li>
                        <li className="list-disc">Early preview of new initiatives and opportunities</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">5. Continuously align with their evolving interests</p>
                      <ul className="space-y-1 text-sm ml-8">
                        <li className="list-disc">Regular conversations about their philanthropic goals</li>
                        <li className="list-disc">Adapt engagement to life changes and new priorities</li>
                        <li className="list-disc">Present opportunities that match their current passions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  Key Principle
                </h4>
                <p className="text-sm">
                  Partners are not a destination but a relationship to be nurtured. Like a garden, partnership requires constant attention, 
                  care, and cultivation. The goal is not to maintain status quo, but to deepen engagement and co-create transformational impact together.
                </p>
              </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </CardContent>
  </Card>
        </>
      )}
      
    </div>
  );
}
