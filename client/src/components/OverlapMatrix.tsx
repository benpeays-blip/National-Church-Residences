import { useMemo, useState } from "react";
import { useBoardMap, buildOrgOverlapMatrix } from "@/lib/boardMapStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import type { Bipartite, Person } from "@/lib/boardMapTypes";

// Helper function to get shared people between two organizations
function getSharedPeople(bi: Bipartite, orgId1: string, orgId2: string): Person[] {
  const org1People = new Set<string>();
  const org2People = new Set<string>();

  // Collect people in each org
  for (const r of bi.roles) {
    if (r.orgId === orgId1) org1People.add(r.personId);
    if (r.orgId === orgId2) org2People.add(r.personId);
  }

  // Find intersection
  const sharedIds = Array.from(org1People).filter(id => org2People.has(id));

  // Return person objects sorted alphabetically by name
  return sharedIds
    .map(id => bi.people.find(p => p.id === id))
    .filter((p): p is Person => p !== undefined)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default function OverlapMatrix() {
  const bi = useBoardMap((s) => s.bi);
  const [selectedCell, setSelectedCell] = useState<{
    org1: string;
    org2: string;
    people: Person[];
  } | null>(null);

  const data = useMemo(() => {
    if (!bi) return null;
    return buildOrgOverlapMatrix(bi);
  }, [bi]);

  if (!data) return <div className="text-sm text-muted-foreground">No data loaded.</div>;

  const { matrix, orgs } = data;
  const max = Math.max(1, ...matrix.flat());

  const handleCellClick = (i: number, j: number, count: number) => {
    if (count === 0 || !bi) return; // Don't open dialog for empty cells
    
    const org1 = orgs[i];
    const org2 = orgs[j];
    const people = getSharedPeople(bi, org1.id, org2.id);
    
    setSelectedCell({
      org1: org1.name,
      org2: org2.name,
      people,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Overlap Matrix</CardTitle>
        <p className="text-sm text-muted-foreground">
          Number of shared board members between organizations
        </p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px]">
          <div className="overflow-x-auto">
            <table className="text-xs border-collapse">
              <thead>
                <tr>
                  <th className="sticky left-0 bg-background p-2 text-left border border-border min-w-[150px]">
                    Organization
                  </th>
                  {orgs.map((o) => (
                    <th
                      key={o.id}
                      className="p-2 text-left border border-border min-w-[100px]"
                      title={o.name}
                    >
                      {o.name.slice(0, 12)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orgs.map((o, i) => (
                  <tr key={o.id}>
                    <td className="sticky left-0 bg-background p-2 border border-border font-medium">
                      {o.name}
                    </td>
                    {orgs.map((_, j) => {
                      const v = matrix[i][j];
                      const intensity = v === 0 ? 0 : 0.1 + 0.6 * (v / max);
                      const bg =
                        v === 0 ? "transparent" : `hsl(var(--primary) / ${intensity})`;
                      return (
                        <td
                          key={j}
                          title={`${v} shared members`}
                          onClick={() => handleCellClick(i, j, v)}
                          className={`w-6 h-6 text-center border border-border ${
                            v > 0 ? 'cursor-pointer hover-elevate active-elevate-2' : ''
                          }`}
                          style={{ background: bg }}
                          data-testid={`matrix-cell-${i}-${j}`}
                        >
                          {v > 0 ? v : ""}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </CardContent>

      {/* Dialog for showing shared people */}
      <Dialog open={selectedCell !== null} onOpenChange={(open) => !open && setSelectedCell(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Shared Board Members</DialogTitle>
            <DialogDescription>
              People serving on boards of both <strong>{selectedCell?.org1}</strong> and <strong>{selectedCell?.org2}</strong>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 mt-4">
            {selectedCell && selectedCell.people.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No shared board members found.
              </div>
            ) : (
              selectedCell?.people.map((person) => {
                // Construct search URL using email if available, otherwise name
                const searchParam = person.email 
                  ? `search=${encodeURIComponent(person.email)}`
                  : `search=${encodeURIComponent(person.name)}`;
                
                return (
                  <Link 
                    key={person.id} 
                    href={`/donors?${searchParam}`}
                  >
                    <div
                      className="flex items-center gap-3 p-3 rounded-lg border hover-elevate active-elevate-2 cursor-pointer"
                      data-testid={`shared-person-${person.id}`}
                    >
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {person.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold flex items-center gap-2">
                          {person.name}
                          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                        </div>
                        {person.email && (
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                            <Mail className="w-3 h-3" />
                            <span>{person.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
