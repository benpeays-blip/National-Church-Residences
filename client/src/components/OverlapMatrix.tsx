import { useMemo } from "react";
import { useBoardMap, buildOrgOverlapMatrix } from "@/lib/boardMapStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function OverlapMatrix() {
  const bi = useBoardMap((s) => s.bi);

  const data = useMemo(() => {
    if (!bi) return null;
    return buildOrgOverlapMatrix(bi);
  }, [bi]);

  if (!data) return <div className="text-sm text-muted-foreground">No data loaded.</div>;

  const { matrix, orgs } = data;
  const max = Math.max(1, ...matrix.flat());

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
                          className="w-6 h-6 text-center border border-border"
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
    </Card>
  );
}
