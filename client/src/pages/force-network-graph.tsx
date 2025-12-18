import { useState, useRef, useCallback, useMemo, useEffect, useLayoutEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ForceGraph2D from "react-force-graph-2d";
import * as d3 from "d3-force";
import { 
  Zap, 
  Users, 
  Building2, 
  X,
  Eye,
  RotateCcw,
  ZoomIn,
  ZoomOut
} from "lucide-react";

interface Person {
  id: number;
  name: string;
  title: string;
  orgs: string[];
}

interface Organization {
  id: number;
  name: string;
  sector: string;
  members: string[];
  color: string;
}

interface GraphNode {
  id: string;
  name: string;
  type: "person" | "org";
  val: number;
  color: string;
  title?: string;
  sector?: string;
}

interface GraphLink {
  source: string;
  target: string;
  value: number;
}

const samplePeople: Person[] = [
  { id: 1, name: "Sarah Chen", title: "Board Chair", orgs: ["Columbus Foundation", "United Way", "OSU Foundation"] },
  { id: 2, name: "Michael Rodriguez", title: "CEO", orgs: ["Columbus Foundation", "Tech Hub Ohio"] },
  { id: 3, name: "Jennifer Williams", title: "Philanthropist", orgs: ["United Way", "Children's Hospital", "Arts Council"] },
  { id: 4, name: "David Kim", title: "Managing Partner", orgs: ["OSU Foundation", "Tech Hub Ohio", "Columbus Foundation"] },
  { id: 5, name: "Elizabeth Carter", title: "VP Finance", orgs: ["Children's Hospital", "United Way"] },
  { id: 6, name: "Robert Thompson", title: "Founder", orgs: ["Arts Council", "Columbus Foundation"] },
  { id: 7, name: "Amanda Foster", title: "Director", orgs: ["Tech Hub Ohio", "Arts Council"] },
  { id: 8, name: "James Mitchell", title: "Partner", orgs: ["OSU Foundation", "Children's Hospital"] },
  { id: 9, name: "Lisa Brown", title: "VP Development", orgs: ["Columbus Foundation", "Children's Hospital"] },
  { id: 10, name: "Marcus Williams", title: "Board Member", orgs: ["United Way", "Tech Hub Ohio"] },
  { id: 11, name: "Sophie Martinez", title: "Executive Director", orgs: ["Arts Council", "OSU Foundation"] },
  { id: 12, name: "Timothy Jones", title: "CFO", orgs: ["Children's Hospital", "Columbus Foundation"] },
  { id: 13, name: "Catherine Lee", title: "Trustee", orgs: ["United Way", "Arts Council", "OSU Foundation"] },
  { id: 14, name: "Dr. Michael Chen", title: "Board Chair", orgs: ["Children's Hospital", "Tech Hub Ohio"] },
  { id: 15, name: "Ashley Davis", title: "Director", orgs: ["Columbus Foundation", "United Way"] },
  { id: 16, name: "Benjamin Clark", title: "Partner", orgs: ["OSU Foundation", "Tech Hub Ohio", "Arts Council"] },
  { id: 17, name: "Sandra Martinez", title: "VP Programs", orgs: ["United Way", "Children's Hospital"] },
  { id: 18, name: "Christopher Davis", title: "Treasurer", orgs: ["Columbus Foundation", "OSU Foundation"] },
  { id: 19, name: "Emily Anderson", title: "Secretary", orgs: ["Arts Council", "Tech Hub Ohio"] },
  { id: 20, name: "Steven White", title: "Board Member", orgs: ["Children's Hospital", "Columbus Foundation", "United Way"] },
];

const sampleOrgs: Organization[] = [
  { id: 1, name: "Columbus Foundation", sector: "Community", members: ["Sarah Chen", "Michael Rodriguez", "David Kim", "Robert Thompson", "Lisa Brown", "Timothy Jones", "Ashley Davis", "Christopher Davis", "Steven White"], color: "#7FA3A1" },
  { id: 2, name: "United Way", sector: "Social Services", members: ["Sarah Chen", "Jennifer Williams", "Elizabeth Carter", "Marcus Williams", "Catherine Lee", "Ashley Davis", "Sandra Martinez", "Steven White"], color: "#9CB071" },
  { id: 3, name: "OSU Foundation", sector: "Education", members: ["Sarah Chen", "David Kim", "James Mitchell", "Sophie Martinez", "Catherine Lee", "Benjamin Clark", "Christopher Davis"], color: "#E8923A" },
  { id: 4, name: "Tech Hub Ohio", sector: "Economic Dev", members: ["Michael Rodriguez", "David Kim", "Amanda Foster", "Marcus Williams", "Dr. Michael Chen", "Benjamin Clark", "Emily Anderson"], color: "#6FBBD3" },
  { id: 5, name: "Children's Hospital", sector: "Healthcare", members: ["Jennifer Williams", "Elizabeth Carter", "James Mitchell", "Lisa Brown", "Timothy Jones", "Dr. Michael Chen", "Sandra Martinez", "Steven White"], color: "#D5636C" },
  { id: 6, name: "Arts Council", sector: "Arts & Culture", members: ["Jennifer Williams", "Robert Thompson", "Amanda Foster", "Sophie Martinez", "Catherine Lee", "Benjamin Clark", "Emily Anderson"], color: "#B5C942" },
];

export default function ForceNetworkGraph() {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const fgRef = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Resize observer to match canvas to container
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  // Center the graph when the simulation settles on initial load
  useEffect(() => {
    // Give the simulation time to settle, then center
    const timer = setTimeout(() => {
      if (fgRef.current && !isInitialized) {
        fgRef.current.zoomToFit(500, 100);
        setIsInitialized(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [isInitialized]);

  const handleEngineStop = useCallback(() => {
    if (!isInitialized && fgRef.current) {
      // Delayed to ensure all node positions are finalized
      setTimeout(() => {
        if (fgRef.current) {
          fgRef.current.zoomToFit(400, 100);
        }
      }, 100);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const graphData = useMemo(() => {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];
    const nodeSet = new Set<string>();
    const relationshipCounts: Record<string, number> = {};

    // First pass: create all links to count relationships
    sampleOrgs.forEach(org => {
      const orgId = `org-${org.id}`;
      org.members.forEach(memberName => {
        const person = samplePeople.find(p => p.name === memberName);
        if (person) {
          const personId = `person-${person.id}`;
          links.push({
            source: personId,
            target: orgId,
            value: 1
          });
          relationshipCounts[personId] = (relationshipCounts[personId] || 0) + 1;
          relationshipCounts[orgId] = (relationshipCounts[orgId] || 0) + 1;
        }
      });
    });

    // Person-to-person links based on shared orgs
    samplePeople.forEach(person => {
      samplePeople.forEach(otherPerson => {
        if (person.id < otherPerson.id) {
          const sharedOrgs = person.orgs.filter(o => otherPerson.orgs.includes(o));
          if (sharedOrgs.length > 0) {
            const personId = `person-${person.id}`;
            const otherId = `person-${otherPerson.id}`;
            links.push({
              source: personId,
              target: otherId,
              value: sharedOrgs.length
            });
            relationshipCounts[personId] = (relationshipCounts[personId] || 0) + 1;
            relationshipCounts[otherId] = (relationshipCounts[otherId] || 0) + 1;
          }
        }
      });
    });

    // Find max relationship count for scaling
    const maxRelationships = Math.max(...Object.values(relationshipCounts), 1);

    // Create person nodes with size based on relationship count
    samplePeople.forEach(person => {
      const nodeId = `person-${person.id}`;
      if (!nodeSet.has(nodeId)) {
        const relCount = relationshipCounts[nodeId] || 1;
        // Scale size: min 4, max 20 based on relationship count - more dramatic difference
        const nodeSize = 4 + (relCount / maxRelationships) * 16;
        nodes.push({
          id: nodeId,
          name: person.name,
          type: "person",
          val: nodeSize,
          color: "#6FBBD3",
          title: person.title
        });
        nodeSet.add(nodeId);
      }
    });

    // Create org nodes with size based on relationship count
    sampleOrgs.forEach(org => {
      const nodeId = `org-${org.id}`;
      if (!nodeSet.has(nodeId)) {
        const relCount = relationshipCounts[nodeId] || 1;
        // Scale size: min 6, max 18 for orgs (larger than people)
        const nodeSize = 6 + (relCount / maxRelationships) * 12;
        nodes.push({
          id: nodeId,
          name: org.name,
          type: "org",
          val: nodeSize,
          color: org.color,
          sector: org.sector
        });
        nodeSet.add(nodeId);
      }
    });

    return { nodes, links };
  }, []);

  // Calculate polygon positions for organizations
  const orgPolygonPositions = useMemo(() => {
    const orgNodes = graphData.nodes.filter(n => n.type === 'org');
    const numOrgs = orgNodes.length;
    const radius = 300; // Distance from center - larger to fit bigger org nodes
    const positions: Record<string, { x: number; y: number }> = {};
    
    orgNodes.forEach((org, index) => {
      // Calculate angle for regular polygon (starting from top, going clockwise)
      const angle = (index / numOrgs) * 2 * Math.PI - Math.PI / 2;
      positions[org.id] = {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      };
    });
    
    return positions;
  }, [graphData]);

  // Configure d3 forces for shell layout: orgs in polygon, people in center
  useEffect(() => {
    if (fgRef.current) {
      // Add collision force to prevent node overlap - account for larger nodes + labels
      fgRef.current.d3Force('collision', d3.forceCollide((node: any) => {
        const baseRadius = node.type === 'org' ? Math.sqrt(node.val) * 6 : Math.sqrt(node.val) * 3;
        // Extra space for labels below nodes
        return baseRadius + (node.type === 'person' ? 35 : 25);
      }));

      // Repulsion force - only for people nodes
      fgRef.current.d3Force('charge', d3.forceManyBody()
        .strength((node: any) => {
          return node.type === 'org' ? 0 : -60; // Orgs don't repel (they're fixed)
        })
        .distanceMax(300)
      );

      // Link distance - shorter for person-to-person
      fgRef.current.d3Force('link')
        ?.distance((link: any) => {
          const source = link.source;
          const target = link.target;
          // Longer distance for person-to-org links
          if ((source.type === 'person' && target.type === 'org') ||
              (source.type === 'org' && target.type === 'person')) {
            return 120;
          }
          // Shorter distance for person-to-person links
          return 40;
        })
        ?.strength((link: any) => {
          const source = link.source;
          const target = link.target;
          // Weaker links to orgs so people stay more centered
          if ((source.type === 'person' && target.type === 'org') ||
              (source.type === 'org' && target.type === 'person')) {
            return 0.1;
          }
          return 0.3;
        });

      // Remove radial force - we'll use fixed positions instead
      fgRef.current.d3Force('radial', null);

      // Custom force to fix organizations to polygon positions
      fgRef.current.d3Force('polygonPositions', (alpha: number) => {
        graphData.nodes.forEach((node: any) => {
          if (node.type === 'org') {
            const targetPos = orgPolygonPositions[node.id];
            if (targetPos) {
              // Strong pull to fixed position
              const strength = 0.5;
              node.vx = (node.vx || 0) + (targetPos.x - node.x) * strength;
              node.vy = (node.vy || 0) + (targetPos.y - node.y) * strength;
            }
          }
        });
      });

      // Center force only for people
      fgRef.current.d3Force('center', d3.forceCenter(0, 0).strength(0.05));

      // Reheat simulation
      fgRef.current.d3ReheatSimulation();
    }
  }, [graphData, orgPolygonPositions]);

  const getPersonConnections = (personName: string) => {
    const person = samplePeople.find(p => p.name === personName);
    if (!person) return [];
    const connections: { name: string; sharedOrgs: string[] }[] = [];
    samplePeople.forEach(p => {
      if (p.name !== personName) {
        const sharedOrgs = p.orgs.filter(o => person.orgs.includes(o));
        if (sharedOrgs.length > 0) {
          connections.push({ name: p.name, sharedOrgs });
        }
      }
    });
    return connections;
  };

  const handleNodeClick = useCallback((node: any) => {
    setSelectedNode(node as GraphNode);
    if (fgRef.current && node.x !== undefined && node.y !== undefined) {
      // Smoothly center and zoom slightly on the clicked node
      fgRef.current.centerAt(node.x, node.y, 500);
      setTimeout(() => {
        if (fgRef.current) {
          // Zoom to 1.8x for a gentle focus effect
          fgRef.current.zoom(1.8, 400);
        }
      }, 300);
    }
  }, []);

  const handleZoomIn = () => {
    if (fgRef.current) {
      const currentZoom = fgRef.current.zoom();
      fgRef.current.zoom(currentZoom * 1.5, 300);
    }
  };

  const handleZoomOut = () => {
    if (fgRef.current) {
      const currentZoom = fgRef.current.zoom();
      fgRef.current.zoom(currentZoom / 1.5, 300);
    }
  };

  const handleReset = () => {
    if (fgRef.current) {
      fgRef.current.zoomToFit(400, 50);
    }
    setSelectedNode(null);
  };

  const nodeCanvasObject = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    // Guard against undefined positions during initial simulation
    if (node.x === undefined || node.y === undefined || !isFinite(node.x) || !isFinite(node.y)) {
      return;
    }
    
    const label = node.name;
    const isHovered = hoveredNode === node.id;
    const isSelected = selectedNode?.id === node.id;
    const isHighlighted = isHovered || isSelected;
    
    // Bigger base sizes for better visibility
    const nodeRadius = node.type === "org" 
      ? Math.sqrt(node.val) * 6 
      : Math.sqrt(node.val) * 3;
    const displayRadius = nodeRadius * (isHighlighted ? 1.4 : 1);

    // Draw shadow for depth
    ctx.beginPath();
    ctx.arc(node.x + 2, node.y + 2, displayRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fill();

    // Draw main node circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, displayRadius, 0, 2 * Math.PI);
    
    // Create gradient fill for orgs
    if (node.type === "org") {
      const gradient = ctx.createRadialGradient(
        node.x - displayRadius * 0.3, node.y - displayRadius * 0.3, 0,
        node.x, node.y, displayRadius
      );
      gradient.addColorStop(0, lightenColor(node.color, 30));
      gradient.addColorStop(1, node.color);
      ctx.fillStyle = gradient;
    } else {
      // Person nodes - lighter blue with gradient
      const gradient = ctx.createRadialGradient(
        node.x - displayRadius * 0.3, node.y - displayRadius * 0.3, 0,
        node.x, node.y, displayRadius
      );
      gradient.addColorStop(0, "#9ED5E8");
      gradient.addColorStop(1, "#5BA8C8");
      ctx.fillStyle = gradient;
    }
    ctx.fill();

    // Border stroke
    ctx.strokeStyle = isHighlighted ? "white" : "rgba(255,255,255,0.4)";
    ctx.lineWidth = isHighlighted ? 3 / globalScale : 1.5 / globalScale;
    ctx.stroke();

    // Glow effect when highlighted
    if (isHighlighted) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, displayRadius + 4 / globalScale, 0, 2 * Math.PI);
      ctx.strokeStyle = node.type === "org" ? node.color : "#6FBBD3";
      ctx.lineWidth = 2 / globalScale;
      ctx.globalAlpha = 0.5;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // Draw labels
    if (showLabels) {
      if (node.type === "org") {
        // Organization name below the node
        const fontSize = Math.max(10, 12 / globalScale);
        ctx.font = `600 ${fontSize}px Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        
        const textY = node.y + displayRadius + 4;
        
        // Draw text outline for readability
        ctx.strokeStyle = "rgba(255,255,255,0.95)";
        ctx.lineWidth = 4 / globalScale;
        ctx.lineJoin = "round";
        ctx.strokeText(label, node.x, textY);
        
        // Draw main text in organization's color
        ctx.fillStyle = node.color;
        ctx.fillText(label, node.x, textY);
      } else {
        // Person name below the node - clean text with outline
        const fontSize = Math.max(9, 10 / globalScale);
        ctx.font = `500 ${fontSize}px Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        
        const textY = node.y + displayRadius + 3;
        
        // Draw text outline for readability (no black box)
        ctx.strokeStyle = "rgba(255,255,255,0.9)";
        ctx.lineWidth = 3 / globalScale;
        ctx.lineJoin = "round";
        ctx.strokeText(label, node.x, textY);
        
        // Draw main text
        ctx.fillStyle = "#1a1a2e";
        ctx.fillText(label, node.x, textY);
      }
    }
  }, [hoveredNode, selectedNode, showLabels]);

  // Helper function to lighten colors
  const lightenColor = (hex: string, percent: number) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return `rgb(${R},${G},${B})`;
  };

  const linkCanvasObject = useCallback((link: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const sourceNode = link.source;
    const targetNode = link.target;
    
    const isHighlighted = 
      hoveredNode === sourceNode.id || 
      hoveredNode === targetNode.id ||
      selectedNode?.id === sourceNode.id || 
      selectedNode?.id === targetNode.id;

    ctx.beginPath();
    ctx.moveTo(sourceNode.x, sourceNode.y);
    ctx.lineTo(targetNode.x, targetNode.y);
    ctx.strokeStyle = isHighlighted 
      ? `rgba(74, 159, 255, ${0.6 + link.value * 0.1})` 
      : `rgba(150, 150, 150, ${0.15 + link.value * 0.05})`;
    ctx.lineWidth = isHighlighted ? (1 + link.value * 0.5) / globalScale : (0.5 + link.value * 0.2) / globalScale;
    ctx.stroke();
  }, [hoveredNode, selectedNode]);

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-1 mb-4">
        <h1 className="text-3xl font-bold">Force Network Graph</h1>
        <p className="text-sm text-muted-foreground">
          Interactive 2D force-directed visualization of donor and organization relationships
        </p>
      </div>

      <Card className="border overflow-hidden flex-1 flex flex-col">
        <CardHeader style={{ backgroundColor: '#395174' }}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <Zap className="w-4 h-4" />
                2D Force-Directed Network Graph
              </CardTitle>
              <CardDescription className="text-white/80 text-xs">
                {graphData.nodes.length} nodes, {graphData.links.length} connections • Click to select, drag to move, scroll to zoom
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="secondary" 
                className="gap-1"
                onClick={() => setShowLabels(!showLabels)}
                data-testid="button-toggle-labels"
              >
                {showLabels ? "Hide Labels" : "Show Labels"}
              </Button>
              <Button size="sm" variant="secondary" onClick={handleZoomIn} data-testid="button-zoom-in">
                <ZoomIn className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="secondary" onClick={handleZoomOut} data-testid="button-zoom-out">
                <ZoomOut className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="secondary" onClick={handleReset} data-testid="button-reset">
                <RotateCcw className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
            <div ref={containerRef} className="lg:col-span-4 relative bg-white overflow-hidden" style={{ minHeight: 600 }}>
              <ForceGraph2D
                width={dimensions.width}
                height={dimensions.height}
                ref={fgRef}
                graphData={graphData}
                nodeCanvasObject={nodeCanvasObject}
                linkCanvasObject={linkCanvasObject}
                onNodeClick={handleNodeClick}
                onNodeHover={(node: any) => setHoveredNode(node?.id || null)}
                onEngineStop={handleEngineStop}
                nodeRelSize={6}
                linkWidth={1}
                linkColor={() => "rgba(100, 100, 100, 0.3)"}
                d3VelocityDecay={0.3}
                d3AlphaDecay={0.02}
                warmupTicks={100}
                cooldownTicks={200}
                enableNodeDrag={true}
                enableZoomInteraction={true}
                enablePanInteraction={true}
              />
              
              <div className="absolute bottom-4 left-4 flex gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/90 border shadow-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#6FBBD3" }} />
                  <span className="text-xs text-muted-foreground">People ({samplePeople.length})</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/90 border shadow-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#7FA3A1" }} />
                  <span className="text-xs text-muted-foreground">Organizations ({sampleOrgs.length})</span>
                </div>
              </div>
            </div>

            <div className="border-l bg-background flex flex-col" style={{ minHeight: 600 }}>
              <div className="p-4 border-b shrink-0">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Eye className="w-4 h-4" style={{ color: "#395174" }} />
                  Node Details
                </h3>
              </div>
              <div className="p-4 flex-1 overflow-auto">
                {selectedNode ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: selectedNode.color }}
                        >
                          {selectedNode.type === "person" ? (
                            selectedNode.name.split(' ').map(n => n[0]).join('')
                          ) : (
                            <Building2 className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{selectedNode.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {selectedNode.type === "person" ? selectedNode.title : selectedNode.sector}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => setSelectedNode(null)} data-testid="button-close-details">
                        <X className="w-3 h-3" />
                      </Button>
                    </div>

                    {selectedNode.type === "person" && (
                      <>
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground">
                            ALL AFFILIATIONS ({samplePeople.find(p => `person-${p.id}` === selectedNode.id)?.orgs.length || 0})
                          </p>
                          {samplePeople.find(p => `person-${p.id}` === selectedNode.id)?.orgs.map(orgName => {
                            const org = sampleOrgs.find(o => o.name === orgName);
                            const isInChart = !!org;
                            return (
                              <div key={orgName} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                                <div 
                                  className="w-2 h-2 rounded-full" 
                                  style={{ backgroundColor: org?.color || "#94a3b8" }} 
                                />
                                <span className="text-sm flex-1">{orgName}</span>
                                {isInChart && (
                                  <Badge variant="outline" className="text-[10px] px-1 py-0">In Chart</Badge>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground">
                            NETWORK CONNECTIONS ({getPersonConnections(samplePeople.find(p => `person-${p.id}` === selectedNode.id)?.name || '').length})
                          </p>
                          {(() => {
                            const person = samplePeople.find(p => `person-${p.id}` === selectedNode.id);
                            if (!person) return null;
                            const connections = getPersonConnections(person.name);
                            return connections.slice(0, 6).map(conn => (
                              <div key={conn.name} className="p-2 rounded-md bg-muted/50">
                                <p className="text-sm font-medium">{conn.name}</p>
                                <p className="text-xs text-muted-foreground">via {conn.sharedOrgs.join(', ')}</p>
                              </div>
                            ));
                          })()}
                        </div>
                      </>
                    )}

                    {selectedNode.type === "org" && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground">
                          MEMBERS ({sampleOrgs.find(o => `org-${o.id}` === selectedNode.id)?.members.length || 0})
                        </p>
                        {sampleOrgs.find(o => `org-${o.id}` === selectedNode.id)?.members.slice(0, 8).map(member => (
                          <div key={member} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                            <Users className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm">{member}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 text-center">
                    <Eye className="w-8 h-8 text-muted-foreground/30 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click a node to view details
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Drag to rearrange • Scroll to zoom
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }}>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: "#084594" }}>{samplePeople.length}</div>
              <p className="text-sm text-muted-foreground">People in Network</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }}>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: "#084594" }}>{sampleOrgs.length}</div>
              <p className="text-sm text-muted-foreground">Organizations</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }}>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: "#084594" }}>{graphData.links.length}</div>
              <p className="text-sm text-muted-foreground">Total Connections</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
