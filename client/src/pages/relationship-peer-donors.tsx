import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Users, 
  Heart,
  Plus,
  TrendingUp
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { PeerDonor } from "@shared/schema";

export default function PeerDonors() {
  const { data: peerDonors, isLoading } = useQuery<PeerDonor[]>({
    queryKey: ["/api/peer-donors"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Peer Donor Discovery</h1>
          <p className="text-sm text-muted-foreground">
            AI-powered peer donor matching based on giving patterns and affinities
          </p>
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  const totalPeers = peerDonors?.length || 0;
  const avgMatchScore = peerDonors && peerDonors.length > 0
    ? peerDonors.reduce((sum, p) => sum + ((p.similarityScore || 0) * 100), 0) / peerDonors.length
    : 0;
  const highPotential = peerDonors?.filter(p => (p.similarityScore || 0) >= 0.8).length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Peer Donor Discovery</h1>
          <p className="text-sm text-muted-foreground">
            AI-powered peer donor matching based on giving patterns and affinities
          </p>
        </div>
        <Button data-testid="button-add-peer-connection">
          <Plus className="w-4 h-4 mr-2" />
          Add Connection
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border">
          <div className="text-sm text-muted-foreground mb-1">Total Peer Connections</div>
          <div className="text-2xl font-semibold tabular-nums">{totalPeers}</div>
        </Card>
        <Card className="p-6 border">
          <div className="text-sm text-muted-foreground mb-1">Avg Match Score</div>
          <div className="text-2xl font-semibold tabular-nums text-primary">{avgMatchScore.toFixed(0)}%</div>
        </Card>
        <Card className="p-6 border">
          <div className="text-sm text-muted-foreground mb-1">High Potential</div>
          <div className="text-2xl font-semibold tabular-nums">{highPotential}</div>
        </Card>
      </div>

      {/* Peer Donor Cards */}
      <div className="grid grid-cols-1 gap-4">
        {peerDonors && peerDonors.length > 0 ? (
          peerDonors.map((peer) => (
            <Card key={peer.id} className="border hover-elevate cursor-pointer" data-testid={`card-peer-${peer.id}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <Users className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">Peer Donor Match</h3>
                        <p className="text-sm text-muted-foreground">
                          Source Donor: {peer.personId?.slice(0, 8)}... → Peer: {peer.peerPersonId?.slice(0, 8)}...
                        </p>
                      </div>
                      <Badge variant={peer.similarityScore && peer.similarityScore >= 0.8 ? "default" : "secondary"}>
                        {Math.round((peer.similarityScore || 0) * 100)}% Match
                      </Badge>
                    </div>

                    {/* Shared Characteristics */}
                    {peer.sharedCharacteristics && peer.sharedCharacteristics.length > 0 && (
                      <div className="mb-3">
                        <div className="text-xs font-medium text-muted-foreground mb-2">
                          <Heart className="w-3 h-3 inline mr-1" />
                          Shared Characteristics
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {peer.sharedCharacteristics.map((char: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {char}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Programs Peer Gave To */}
                    {peer.peerGaveToPrograms && peer.peerGaveToPrograms.length > 0 && (
                      <div className="mb-3 p-3 bg-muted/50 rounded-md">
                        <div className="text-xs font-medium text-muted-foreground mb-1">
                          <TrendingUp className="w-3 h-3 inline mr-1" />
                          Programs Peer Supports
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {peer.peerGaveToPrograms.map((program: string, idx: number) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Additional Info */}
                    {peer.personNotYetAskedFor && peer.personNotYetAskedFor.length > 0 && (
                      <div className="mt-3 p-3 bg-primary/5 rounded-md border border-primary/20">
                        <div className="text-xs font-medium text-foreground mb-1 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-primary" />
                          Opportunity: Your donor hasn't been asked for these programs yet
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {peer.personNotYetAskedFor.map((program: string, idx: number) => (
                            <Badge key={idx} variant="default" className="text-xs">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Match Details */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <div className="text-xs text-muted-foreground">Similarity Score</div>
                        <div className="font-semibold">{Math.round((peer.similarityScore || 0) * 100)}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Calculated</div>
                        <div className="font-semibold">{peer.calculatedAt ? new Date(peer.calculatedAt).toLocaleDateString() : 'Recently'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Peer Person ID</div>
                        <div className="font-semibold text-xs">{peer.peerPersonId?.slice(0, 8)}...</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="p-12 text-center border">
            <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Peer Connections Found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start discovering peer donors with similar giving patterns
            </p>
            <Button size="sm" data-testid="button-discover-peers">
              <Plus className="w-4 h-4 mr-2" />
              Discover Peers
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
