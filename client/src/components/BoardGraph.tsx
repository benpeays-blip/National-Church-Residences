import { useEffect, useMemo, useState } from "react";
import { useBoardMap } from "@/lib/boardMapStore";
import type { GraphNode } from "@/lib/boardMapTypes";
import ForceGraph2D from "react-force-graph-2d";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Neighbors({ nodeId }: { nodeId: string }) {
  const graph = useBoardMap((s) => s.graph);
  if (!graph) return null;

  const neighbors = new Map<string, number>();
  for (const l of graph.links) {
    const s = String(l.source), t = String(l.target);
    if (s === nodeId) neighbors.set(t, (neighbors.get(t) ?? 0) + l.weight);
    if (t === nodeId) neighbors.set(s, (neighbors.get(s) ?? 0) + l.weight);
  }

  const byWeight = Array.from(neighbors.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  return (
    <ul className="list-disc ml-4 space-y-1" data-testid="list-neighbors">
      {byWeight.map(([id, w]) => {
        const n = graph.nodes.find((nn) => nn.id === id);
        return (
          <li key={id} className="text-sm" data-testid={`neighbor-${id}`}>
            {n?.label}{" "}
            <span className="text-muted-foreground">({w} shared)</span>
          </li>
        );
      })}
      {byWeight.length === 0 && (
        <li className="text-sm text-muted-foreground">None</li>
      )}
    </ul>
  );
}

export default function BoardGraph() {
  const graph = useBoardMap((s) => s.graph);
  const query = useBoardMap((s) => s.query);
  const view = useBoardMap((s) => s.view);

  const [sel, setSel] = useState<GraphNode | null>(null);

  const data = useMemo(() => {
    if (!graph) return { nodes: [], links: [] };
    const nodes = graph.nodes.filter(
      (n) => !query || n.label.toLowerCase().includes(query.toLowerCase())
    );
    const ids = new Set(nodes.map((n) => n.id));
    const links = graph.links.filter(
      (l) => ids.has(String(l.source)) && ids.has(String(l.target))
    );
    return { nodes, links };
  }, [graph, query]);

  useEffect(() => {
    setSel(null);
  }, [graph, query, view]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="lg:col-span-3 h-[70vh] border rounded-lg bg-card overflow-hidden">
        <ForceGraph2D
          graphData={data}
          nodeLabel={(n: any) => `${n.label}`}
          nodeAutoColorBy="type"
          linkDirectionalParticles={0}
          linkColor={() => "hsl(var(--muted-foreground) / 0.3)"}
          nodeCanvasObjectMode={() => "after"}
          nodeCanvasObject={(node: any, ctx, scale) => {
            const label = node.label;
            const fontSize = 12 / scale;
            ctx.font = `${fontSize}px Inter, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillStyle = "hsl(var(--foreground))";
            ctx.fillText(label, node.x, node.y + 6);
          }}
          onNodeClick={(n: any) => setSel(n)}
          cooldownTicks={100}
          backgroundColor="hsl(var(--card))"
        />
      </div>
      <Card className="lg:col-span-1" data-testid="card-inspector">
        <CardHeader>
          <CardTitle className="text-base">Inspector</CardTitle>
        </CardHeader>
        <CardContent>
          {!sel && (
            <div className="text-sm text-muted-foreground">
              Click any {view === "people" ? "person" : "organization"} to
              inspect.
            </div>
          )}
          {sel && (
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Label:</span>{" "}
                <span className="font-medium" data-testid="text-node-label">{sel.label}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Type:</span>{" "}
                <span className="capitalize" data-testid="text-node-type">{sel.type}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Connections:</span>{" "}
                <span className="font-medium" data-testid="text-node-degree">{sel.degree ?? 0}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="text-muted-foreground mb-2">
                  {view === "people"
                    ? "Shared Organizations:"
                    : "Shared Board Members:"}
                </div>
                <Neighbors nodeId={sel.id} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
