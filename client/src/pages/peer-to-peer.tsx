import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Share2, 
  DollarSign, 
  TrendingUp,
  Trophy,
  Heart,
  Calendar,
  ExternalLink,
  Search,
  Plus,
  ArrowRight
} from "lucide-react";
import { AccentCard, getAccentColor } from "@/components/ui/accent-card";
import { useToast } from "@/hooks/use-toast";

const activeCampaigns = [
  { 
    id: "1", 
    name: "Walk for Housing 2025", 
    type: "walkathon",
    goal: 100000, 
    raised: 78500, 
    fundraisers: 145,
    topFundraiser: "Sarah's Team",
    topAmount: 5200,
    endDate: "2025-03-15"
  },
  { 
    id: "2", 
    name: "Birthday for Good", 
    type: "birthday",
    goal: 25000, 
    raised: 18750, 
    fundraisers: 52,
    topFundraiser: "Michael Chen",
    topAmount: 2100,
    endDate: "2025-12-31"
  },
  { 
    id: "3", 
    name: "Team Challenge", 
    type: "challenge",
    goal: 50000, 
    raised: 42000, 
    fundraisers: 28,
    topFundraiser: "Corporate Champions",
    topAmount: 8500,
    endDate: "2025-02-28"
  },
  { 
    id: "4", 
    name: "Run for Hope 5K", 
    type: "5k race",
    goal: 75000, 
    raised: 31200, 
    fundraisers: 89,
    topFundraiser: "Jennifer's Joggers",
    topAmount: 3800,
    endDate: "2025-04-20"
  },
];

const topFundraisers = [
  { rank: 1, name: "Sarah Johnson", team: "Sarah's Team", raised: 5200, donors: 45, campaign: "Walk for Housing" },
  { rank: 2, name: "Michael Chen", team: null, raised: 4800, donors: 38, campaign: "Birthday for Good" },
  { rank: 3, name: "Corporate Champions", team: "Team ABC Corp", raised: 4200, donors: 62, campaign: "Team Challenge" },
  { rank: 4, name: "Emily Rodriguez", team: "Family & Friends", raised: 3800, donors: 28, campaign: "Walk for Housing" },
  { rank: 5, name: "David Kim", team: null, raised: 3500, donors: 22, campaign: "Walk for Housing" },
];

const recentDonations = [
  { donor: "Anonymous", fundraiser: "Sarah Johnson", amount: 100, message: "Go Sarah!", timestamp: "5 min ago" },
  { donor: "John Smith", fundraiser: "Michael Chen", amount: 50, message: "Happy Birthday!", timestamp: "15 min ago" },
  { donor: "Mary Williams", fundraiser: "Corporate Champions", amount: 250, message: "Great cause!", timestamp: "1 hour ago" },
  { donor: "Robert Brown", fundraiser: "Emily Rodriguez", amount: 75, message: null, timestamp: "2 hours ago" },
];

export default function PeerToPeer() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleNewCampaign = () => {
    toast({
      title: "Coming Soon",
      description: "The campaign creation wizard is under development. You'll be able to create custom P2P campaigns soon.",
    });
  };

  const totalRaised = activeCampaigns.reduce((sum, c) => sum + c.raised, 0);
  const totalGoal = activeCampaigns.reduce((sum, c) => sum + c.goal, 0);
  const totalFundraisers = activeCampaigns.reduce((sum, c) => sum + c.fundraisers, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Peer-to-Peer Fundraising</h1>
          <p className="text-sm text-muted-foreground">
            Empower supporters to create personal fundraising pages and expand your reach
          </p>
        </div>
        <Share2 className="h-8 w-8 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AccentCard accent="teal">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("teal")}20` }}>
                <DollarSign className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-total-raised">${(totalRaised / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">Total P2P Raised</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="sky">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("sky")}20` }}>
                <Users className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-fundraisers">{totalFundraisers}</p>
                <p className="text-sm text-muted-foreground">Active Fundraisers</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="lime">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("lime")}20` }}>
                <TrendingUp className="h-5 w-5" style={{ color: getAccentColor("lime") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-progress">{Math.round((totalRaised / totalGoal) * 100)}%</p>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="orange">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("orange")}20` }}>
                <Heart className="h-5 w-5" style={{ color: getAccentColor("orange") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-avg-raised">$620</p>
                <p className="text-sm text-muted-foreground">Avg per Fundraiser</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
                  Active Campaigns
                </CardTitle>
                <CardDescription>Peer-to-peer campaigns currently running</CardDescription>
              </div>
              <Button onClick={handleNewCampaign} data-testid="button-new-campaign">
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeCampaigns.map((campaign) => (
                <div 
                  key={campaign.id}
                  className="p-4 rounded-lg bg-card border border-border shadow-sm hover-elevate cursor-pointer"
                  style={{ borderLeftWidth: '4px', borderLeftColor: getAccentColor("teal") }}
                  data-testid={`campaign-${campaign.id}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{campaign.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>{campaign.fundraisers} fundraisers</span>
                        <span>•</span>
                        <Calendar className="h-3 w-3" />
                        <span>Ends {campaign.endDate}</span>
                      </div>
                    </div>
                    <Badge variant="outline">{campaign.type}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold" style={{ color: getAccentColor("teal") }}>
                        ${campaign.raised.toLocaleString()} raised
                      </span>
                      <span className="text-muted-foreground">
                        of ${campaign.goal.toLocaleString()} goal
                      </span>
                    </div>
                    <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4" style={{ color: getAccentColor("orange") }} />
                      <span>Top: {campaign.topFundraiser} (${campaign.topAmount.toLocaleString()})</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" style={{ color: getAccentColor("orange") }} />
                Top Fundraisers
              </CardTitle>
              <CardDescription>Leaderboard across all campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topFundraisers.map((fundraiser) => (
                  <div 
                    key={fundraiser.rank}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50"
                    data-testid={`fundraiser-${fundraiser.rank}`}
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{ 
                        backgroundColor: fundraiser.rank <= 3 ? `${getAccentColor("orange")}20` : 'transparent',
                        color: fundraiser.rank <= 3 ? getAccentColor("orange") : 'inherit'
                      }}
                    >
                      {fundraiser.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{fundraiser.name}</p>
                      <p className="text-xs text-muted-foreground">{fundraiser.donors} donors</p>
                    </div>
                    <span className="font-semibold text-sm" style={{ color: getAccentColor("lime") }}>
                      ${fundraiser.raised.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" style={{ color: getAccentColor("coral") }} />
                Recent Donations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentDonations.map((donation, idx) => (
                  <div 
                    key={idx}
                    className="p-2 rounded-lg border bg-card text-sm"
                    style={{ borderLeftWidth: '3px', borderLeftColor: getAccentColor("lime") }}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{donation.donor}</span>
                      <span className="font-semibold" style={{ color: getAccentColor("lime") }}>
                        ${donation.amount}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      to {donation.fundraiser} • {donation.timestamp}
                    </p>
                    {donation.message && (
                      <p className="text-xs italic mt-1">"{donation.message}"</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
