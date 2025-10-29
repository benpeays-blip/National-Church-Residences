import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Network, Users, Link as LinkIcon, Building2, Briefcase, Calendar } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import type { Person, BoardConnection } from "@shared/schema";

interface BoardConnectionData {
  connection: BoardConnection;
  boardMember: Person;
  prospect: Person;
}

export default function BoardConnections() {
  const { data: connections, isLoading } = useQuery<BoardConnectionData[]>({
    queryKey: ["/api/relationship/board-connections"],
  });

  return (
    <div className="p-6 space-y-6">
      {/* LinkedIn-branded header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded bg-[#0A66C2]">
          <SiLinkedin className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-1">Board Member Network Mapping</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <SiLinkedin className="w-4 h-4 text-[#0A66C2]" />
            Powered by LinkedIn connections - identify warm introduction paths
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-[#0A66C2]/20">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Connections</CardTitle>
            <Network className="w-4 h-4 text-[#0A66C2]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0A66C2]">{connections?.length || 0}</div>
          </CardContent>
        </Card>

        <Card className="border-[#0A66C2]/20">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">1st Degree</CardTitle>
            <LinkIcon className="w-4 h-4 text-[#0A66C2]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0A66C2]">
              {connections?.filter((c) => c.connection.connectionStrength === 1).length || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#0A66C2]/20">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intros Requested</CardTitle>
            <Users className="w-4 h-4 text-[#0A66C2]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0A66C2]">
              {connections?.filter((c) => c.connection.introductionRequested === 1).length || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#0A66C2]/20">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intros Made</CardTitle>
            <LinkIcon className="w-4 h-4 text-[#0A66C2]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0A66C2]">
              {connections?.filter((c) => c.connection.introductionMade === 1).length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : connections && connections.length > 0 ? (
        <Card className="border-[#0A66C2]/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SiLinkedin className="w-5 h-5 text-[#0A66C2]" />
              Network Connections
            </CardTitle>
            <CardDescription>Board member connections to major donor prospects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {connections.map((item) => (
                <div key={item.connection.id} className="border-b border-[#0A66C2]/10 pb-6 last:border-0" data-testid={`connection-${item.connection.id}`}>
                  <div className="flex gap-4">
                    {/* Prospect Avatar */}
                    <Avatar className="w-16 h-16 border-2 border-[#0A66C2]/20">
                      <AvatarFallback className="bg-[#0A66C2]/10 text-[#0A66C2] font-semibold text-lg">
                        {item.prospect?.firstName?.[0]}{item.prospect?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-3">
                      {/* Prospect Header */}
                      <div>
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                          {item.prospect?.firstName} {item.prospect?.lastName}
                          <Badge variant={item.connection.connectionStrength === 1 ? "default" : "secondary"} className="bg-[#0A66C2]">
                            {item.connection.connectionStrength === 1 ? "1st" :
                             item.connection.connectionStrength === 2 ? "2nd" : "3rd"}
                          </Badge>
                        </h4>
                        {item.connection.position && (
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Briefcase className="w-3 h-3" />
                            {item.connection.position}
                          </p>
                        )}
                      </div>

                      {/* Organization Connection */}
                      {item.connection.organization && (
                        <div 
                          className="border border-[#0A66C2]/10 rounded-lg p-3 space-y-2"
                          style={{ backgroundColor: 'rgba(10, 102, 194, 0.05)' }}
                        >
                          <div className="flex items-center gap-2 text-sm">
                            <Building2 className="w-4 h-4 text-[#0A66C2]" />
                            <span className="font-medium text-[#0A66C2]">{item.connection.organization}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {item.connection.yearStart}
                              {item.connection.yearEnd ? ` - ${item.connection.yearEnd}` : ' - Present'}
                              {' '}({item.connection.relationshipType})
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Network className="w-4 h-4 text-[#0A66C2]" />
                            <span className="font-medium">
                              Connected through: {item.boardMember.firstName} {item.boardMember.lastName}
                            </span>
                            <Badge variant="outline" className="text-xs ml-auto">Board Member</Badge>
                          </div>
                        </div>
                      )}

                      {/* Action Status */}
                      <div className="flex flex-wrap gap-2">
                        {item.connection.introductionMade === 1 && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            ✓ Introduction Made
                          </Badge>
                        )}
                        {item.connection.introductionRequested === 1 && !item.connection.introductionMade && (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                            ⏳ Introduction Requested
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-[#0A66C2] border-[#0A66C2]">
                          <SiLinkedin className="w-3 h-3 mr-1" />
                          {item.connection.source || 'LinkedIn'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-[#0A66C2]/20">
          <CardContent className="py-12 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-[#0A66C2]/10">
              <SiLinkedin className="w-8 h-8 text-[#0A66C2]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No LinkedIn Connections Mapped</h3>
            <p className="text-muted-foreground">Board member connections will appear here once synced from LinkedIn</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
