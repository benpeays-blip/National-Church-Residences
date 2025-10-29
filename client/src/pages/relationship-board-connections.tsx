import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Network, Users, Link as LinkIcon } from "lucide-react";
import type { Person, BoardConnection } from "@shared/schema";

interface BoardConnectionData {
  connection: BoardConnection;
  boardMember: Person;
}

export default function BoardConnections() {
  const { data: connections, isLoading } = useQuery<BoardConnectionData[]>({
    queryKey: ["/api/relationship/board-connections"],
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Board Member Network Mapping</h1>
        <p className="text-muted-foreground">
          LinkedIn connections mapped to prospects - identify warm introduction paths
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Connections</CardTitle>
            <Network className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connections?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">1st Degree</CardTitle>
            <LinkIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {connections?.filter((c) => c.connection.connectionStrength === 1).length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intros Requested</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {connections?.filter((c) => c.connection.introductionRequested === 1).length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intros Made</CardTitle>
            <LinkIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {connections?.filter((c) => c.connection.introductionMade === 1).length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : connections && connections.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Network Connections</CardTitle>
            <CardDescription>Board member connections to major prospects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {connections.map((item) => (
                <div key={item.connection.id} className="border-b pb-4 last:border-0">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-semibold">
                          Board Member: {item.boardMember.firstName} {item.boardMember.lastName}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {item.connection.relationshipType} connection
                        </p>
                      </div>
                      {item.connection.notes && (
                        <p className="text-sm">{item.connection.notes}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={item.connection.connectionStrength === 1 ? "default" : "secondary"}>
                        {item.connection.connectionStrength === 1 ? "1st Degree" :
                         item.connection.connectionStrength === 2 ? "2nd Degree" : "3rd Degree"}
                      </Badge>
                      {item.connection.introductionMade === 1 && (
                        <Badge variant="outline" className="text-green-600">Introduction Made</Badge>
                      )}
                      {item.connection.introductionRequested === 1 && !item.connection.introductionMade && (
                        <Badge variant="outline" className="text-yellow-600">Requested</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Network className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Board Connections Mapped</h3>
            <p className="text-muted-foreground">LinkedIn connections will appear here once synced</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
