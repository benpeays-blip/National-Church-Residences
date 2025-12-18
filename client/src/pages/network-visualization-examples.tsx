import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForceGraph2D from "react-force-graph-2d";
import { 
  Zap, 
  Globe, 
  Box, 
  GitBranch, 
  Users, 
  Building2, 
  X,
  Sparkles,
  Eye,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
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

export default function NetworkVisualizationExamples() {
  const [activeTab, setActiveTab] = useState("force");
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [filterSector, setFilterSector] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [sankeyHovered, setSankeyHovered] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(true);
  const fgRef = useRef<any>();

  const graphData = useMemo(() => {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];
    const nodeSet = new Set<string>();

    samplePeople.forEach(person => {
      const nodeId = `person-${person.id}`;
      if (!nodeSet.has(nodeId)) {
        nodes.push({
          id: nodeId,
          name: person.name,
          type: "person",
          val: person.orgs.length * 2,
          color: "#6FBBD3",
          title: person.title
        });
        nodeSet.add(nodeId);
      }
    });

    sampleOrgs.forEach(org => {
      const nodeId = `org-${org.id}`;
      if (!nodeSet.has(nodeId)) {
        nodes.push({
          id: nodeId,
          name: org.name,
          type: "org",
          val: org.members.length * 3,
          color: org.color,
          sector: org.sector
        });
        nodeSet.add(nodeId);
      }

      org.members.forEach(memberName => {
        const person = samplePeople.find(p => p.name === memberName);
        if (person) {
          links.push({
            source: `person-${person.id}`,
            target: nodeId,
            value: 1
          });
        }
      });
    });

    samplePeople.forEach(person => {
      samplePeople.forEach(otherPerson => {
        if (person.id < otherPerson.id) {
          const sharedOrgs = person.orgs.filter(o => otherPerson.orgs.includes(o));
          if (sharedOrgs.length > 0) {
            links.push({
              source: `person-${person.id}`,
              target: `person-${otherPerson.id}`,
              value: sharedOrgs.length
            });
          }
        }
      });
    });

    return { nodes, links };
  }, []);

  useEffect(() => {
    if (isAnimating && activeTab === "galaxy") {
      const interval = setInterval(() => {
        setRotation(prev => (prev + 0.5) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isAnimating, activeTab]);

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

  const filteredOrgs = filterSector 
    ? sampleOrgs.filter(o => o.sector === filterSector)
    : sampleOrgs;

  const sectors = Array.from(new Set(sampleOrgs.map(o => o.sector)));

  const handleNodeClick = useCallback((node: any) => {
    setSelectedNode(node as GraphNode);
    if (fgRef.current) {
      fgRef.current.centerAt(node.x, node.y, 500);
      fgRef.current.zoom(2, 500);
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
    const label = node.name;
    const fontSize = node.type === "org" ? 12 / globalScale : 10 / globalScale;
    const nodeSize = node.type === "org" ? 8 : 5;
    
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI, false);
    ctx.fillStyle = node.color;
    ctx.fill();
    
    if (selectedNode?.id === node.id || hoveredNode === node.id) {
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2 / globalScale;
      ctx.stroke();
    }

    if (showLabels && globalScale > 0.5) {
      ctx.font = `${fontSize}px Inter, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = node.type === "org" ? "#333" : "#555";
      ctx.fillText(label, node.x, node.y + nodeSize + fontSize);
    }
  }, [selectedNode, hoveredNode, showLabels]);

  const linkCanvasObject = useCallback((link: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const sourceNode = link.source;
    const targetNode = link.target;
    
    ctx.beginPath();
    ctx.moveTo(sourceNode.x, sourceNode.y);
    ctx.lineTo(targetNode.x, targetNode.y);
    
    const isHighlighted = selectedNode && 
      (link.source.id === selectedNode.id || link.target.id === selectedNode.id);
    
    ctx.strokeStyle = isHighlighted ? "#333" : "rgba(100, 100, 100, 0.3)";
    ctx.lineWidth = isHighlighted ? 1.5 / globalScale : 0.5 / globalScale;
    ctx.stroke();
  }, [selectedNode]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#395174" }} data-testid="page-title">
            Network Visualization
          </h1>
          <p className="text-muted-foreground mt-1">
            Interactive 2D force-directed network graph with multiple layout options
          </p>
        </div>
      </div>

      <Card className="p-4" style={{ backgroundColor: "rgba(57, 81, 116, 0.05)" }}>
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 mt-0.5" style={{ color: "#395174" }} />
          <div>
            <h4 className="font-medium text-sm" style={{ color: "#395174" }}>Interactive Network Graph</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Explore board member and organizational connections. Click nodes to see details, 
              drag to rearrange, scroll to zoom, and use controls to customize the view.
            </p>
          </div>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="force" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            2D Network
          </TabsTrigger>
          <TabsTrigger value="galaxy" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Radial Galaxy
          </TabsTrigger>
          <TabsTrigger value="3d" className="flex items-center gap-2">
            <Box className="w-4 h-4" />
            3D Network
          </TabsTrigger>
          <TabsTrigger value="sankey" className="flex items-center gap-2">
            <GitBranch className="w-4 h-4" />
            Sankey Flow
          </TabsTrigger>
        </TabsList>

        {/* 2D Force-Directed Network Graph */}
        <TabsContent value="force" className="space-y-4">
          <Card className="border overflow-hidden">
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
                  >
                    {showLabels ? "Hide Labels" : "Show Labels"}
                  </Button>
                  <Button size="sm" variant="secondary" onClick={handleZoomIn}>
                    <ZoomIn className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="secondary" onClick={handleZoomOut}>
                    <ZoomOut className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="secondary" onClick={handleReset}>
                    <RotateCcw className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-4">
                <div className="lg:col-span-3 relative bg-white" style={{ height: 550 }}>
                  <ForceGraph2D
                    ref={fgRef}
                    graphData={graphData}
                    nodeCanvasObject={nodeCanvasObject}
                    linkCanvasObject={linkCanvasObject}
                    onNodeClick={handleNodeClick}
                    onNodeHover={(node: any) => setHoveredNode(node?.id || null)}
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

                <div className="border-l bg-background">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <Eye className="w-4 h-4" style={{ color: "#395174" }} />
                      Node Details
                    </h3>
                  </div>
                  <div className="p-4">
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
                          <Button size="sm" variant="ghost" onClick={() => setSelectedNode(null)}>
                            <X className="w-3 h-3" />
                          </Button>
                        </div>

                        {selectedNode.type === "person" && (
                          <>
                            <div className="space-y-2">
                              <p className="text-xs font-semibold text-muted-foreground">ORGANIZATIONS</p>
                              {samplePeople.find(p => `person-${p.id}` === selectedNode.id)?.orgs.map(orgName => {
                                const org = sampleOrgs.find(o => o.name === orgName);
                                return (
                                  <div key={orgName} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: org?.color }} />
                                    <span className="text-sm">{orgName}</span>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="space-y-2">
                              <p className="text-xs font-semibold text-muted-foreground">
                                CONNECTIONS
                              </p>
                              {(() => {
                                const person = samplePeople.find(p => `person-${p.id}` === selectedNode.id);
                                if (!person) return null;
                                return getPersonConnections(person.name).slice(0, 5).map(conn => (
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
        </TabsContent>

        {/* Radial Galaxy Layout */}
        <TabsContent value="galaxy" className="space-y-4">
          <Card className="border overflow-hidden">
            <CardHeader style={{ backgroundColor: '#395174' }}>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Radial Galaxy Layout
                  </CardTitle>
                  <CardDescription className="text-white/80 text-xs">
                    Organizations as planets with individuals orbiting as satellites
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="gap-1"
                    onClick={() => setIsAnimating(!isAnimating)}
                  >
                    {isAnimating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="gap-1"
                    onClick={() => setRotation(0)}
                  >
                    <RotateCcw className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-4">
                <div 
                  className="lg:col-span-3 relative h-[500px] overflow-hidden flex items-center justify-center"
                  style={{ 
                    background: "radial-gradient(ellipse at center, #0d1b2a 0%, #051014 100%)"
                  }}
                >
                  {[...Array(100)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{ 
                        left: `${Math.random() * 100}%`, 
                        top: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.5 + 0.2,
                        animation: `twinkle ${2 + Math.random() * 3}s infinite`
                      }}
                    />
                  ))}

                  <div 
                    className="absolute w-20 h-20 rounded-full flex items-center justify-center z-20"
                    style={{ 
                      background: "radial-gradient(circle, #4a9fff 0%, #1a365d 100%)",
                      boxShadow: "0 0 40px rgba(74, 159, 255, 0.6), 0 0 80px rgba(74, 159, 255, 0.3)"
                    }}
                  >
                    <span className="text-white font-bold text-xs">NCR</span>
                  </div>

                  {[150, 200].map((radius, rIdx) => (
                    <div 
                      key={rIdx}
                      className="absolute rounded-full border border-blue-500/20"
                      style={{ 
                        width: radius * 2, 
                        height: radius * 2,
                      }}
                    />
                  ))}

                  {sampleOrgs.map((org, idx) => {
                    const angle = (idx * 60) + rotation;
                    const radius = 150;
                    const x = Math.cos(angle * Math.PI / 180) * radius;
                    const y = Math.sin(angle * Math.PI / 180) * radius;
                    const isSelected = selectedOrg?.id === org.id;

                    return (
                      <button
                        key={org.id}
                        className="absolute z-10 transition-transform duration-300"
                        style={{ 
                          transform: `translate(${x}px, ${y}px) scale(${isSelected ? 1.3 : 1})`,
                        }}
                        onClick={() => setSelectedOrg(isSelected ? null : org)}
                        data-testid={`galaxy-org-${org.id}`}
                      >
                        <div 
                          className="relative w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ 
                            background: `radial-gradient(circle at 30% 30%, ${org.color}, ${org.color}80)`,
                            boxShadow: `0 0 ${isSelected ? 30 : 15}px ${org.color}, 0 0 ${isSelected ? 60 : 30}px ${org.color}40`
                          }}
                        >
                          {org.name.split(' ')[0].substring(0, 3)}
                          
                          {org.members.slice(0, 4).map((member, mIdx) => {
                            const satAngle = (mIdx * 90) + rotation * 2;
                            const satRadius = 28;
                            const sx = Math.cos(satAngle * Math.PI / 180) * satRadius;
                            const sy = Math.sin(satAngle * Math.PI / 180) * satRadius;
                            return (
                              <div
                                key={member}
                                className="absolute w-4 h-4 rounded-full bg-white/90 flex items-center justify-center text-[8px] font-bold"
                                style={{ 
                                  transform: `translate(${sx}px, ${sy}px)`,
                                  color: org.color,
                                  boxShadow: `0 0 8px rgba(255,255,255,0.6)`
                                }}
                                title={member}
                              >
                                {member.split(' ').map(n => n[0]).join('')}
                              </div>
                            );
                          })}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="border-l bg-background">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <Globe className="w-4 h-4" style={{ color: "#395174" }} />
                      Planet Details
                    </h3>
                  </div>
                  <div className="p-4">
                    {selectedOrg ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center"
                              style={{ 
                                background: `radial-gradient(circle at 30% 30%, ${selectedOrg.color}, ${selectedOrg.color}80)`,
                                boxShadow: `0 0 15px ${selectedOrg.color}`
                              }}
                            >
                              <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{selectedOrg.name}</p>
                              <Badge variant="secondary" className="text-xs">{selectedOrg.sector}</Badge>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" onClick={() => setSelectedOrg(null)}>
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground">
                            ORBITING MEMBERS ({selectedOrg.members.length})
                          </p>
                          {selectedOrg.members.slice(0, 6).map(member => (
                            <div key={member} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                              <div 
                                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                                style={{ backgroundColor: selectedOrg.color, color: 'white' }}
                              >
                                {member.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="text-sm">{member}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-48 text-center">
                        <Globe className="w-8 h-8 text-muted-foreground/30 mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click a planet to explore its orbit
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3D Network */}
        <TabsContent value="3d" className="space-y-4">
          <Card className="border overflow-hidden">
            <CardHeader style={{ backgroundColor: '#395174' }}>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                    <Box className="w-4 h-4" />
                    3D Network View
                  </CardTitle>
                  <CardDescription className="text-white/80 text-xs">
                    Perspective view with depth and sector filtering
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <select 
                    className="px-2 py-1 rounded text-sm bg-white/20 text-white border-0"
                    value={filterSector || ""}
                    onChange={(e) => setFilterSector(e.target.value || null)}
                  >
                    <option value="" className="text-foreground">All Sectors</option>
                    {sectors.map(s => (
                      <option key={s} value={s} className="text-foreground">{s}</option>
                    ))}
                  </select>
                  <Button size="sm" variant="secondary" className="gap-1">
                    <Maximize2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-4">
                <div 
                  className="lg:col-span-3 relative h-[500px] overflow-hidden"
                  style={{ 
                    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f1a 100%)",
                    perspective: "1000px"
                  }}
                >
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `rotateX(15deg) rotateY(${rotation * 0.5}deg)`
                    }}
                  >
                    {filteredOrgs.map((org, idx) => {
                      const angle = (idx / filteredOrgs.length) * Math.PI * 2;
                      const radius = 150;
                      const x = Math.cos(angle) * radius;
                      const z = Math.sin(angle) * radius;
                      const y = (idx % 2) * 40 - 20;
                      const isSelected = selectedOrg?.id === org.id;

                      return (
                        <button
                          key={org.id}
                          className="absolute transition-all duration-300"
                          style={{
                            transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${isSelected ? 1.3 : 1})`,
                            transformStyle: "preserve-3d"
                          }}
                          onClick={() => setSelectedOrg(isSelected ? null : org)}
                          data-testid={`3d-org-${org.id}`}
                        >
                          <div 
                            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xs font-bold relative"
                            style={{ 
                              background: `radial-gradient(circle at 30% 30%, ${org.color}, ${org.color}80)`,
                              boxShadow: `0 0 ${isSelected ? 40 : 20}px ${org.color}, 0 4px 15px rgba(0,0,0,0.5)`,
                            }}
                          >
                            <Building2 className="w-6 h-6" />
                            <span 
                              className="absolute -bottom-6 text-[10px] text-white/80 whitespace-nowrap"
                            >
                              {org.name.split(' ')[0]}
                            </span>
                          </div>

                          {isSelected && org.members.slice(0, 6).map((member, mIdx) => {
                            const mAngle = (mIdx / 6) * Math.PI * 2;
                            const mx = Math.cos(mAngle) * 50;
                            const mz = Math.sin(mAngle) * 50;
                            return (
                              <div
                                key={member}
                                className="absolute w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-[10px] font-bold transition-all duration-500"
                                style={{ 
                                  transform: `translate3d(${mx}px, -30px, ${mz}px)`,
                                  color: org.color,
                                  boxShadow: `0 0 10px rgba(255,255,255,0.8)`
                                }}
                                title={member}
                              >
                                {member.split(' ').map(n => n[0]).join('')}
                              </div>
                            );
                          })}
                        </button>
                      );
                    })}
                  </div>

                  <div 
                    className="absolute bottom-0 left-0 right-0 h-32"
                    style={{
                      background: "linear-gradient(to top, rgba(74, 159, 255, 0.1), transparent)"
                    }}
                  />
                </div>

                <div className="border-l bg-background">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <Box className="w-4 h-4" style={{ color: "#395174" }} />
                      3D Node Info
                    </h3>
                  </div>
                  <div className="p-4">
                    {selectedOrg ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center"
                              style={{ 
                                background: `radial-gradient(circle at 30% 30%, ${selectedOrg.color}, ${selectedOrg.color}80)`,
                              }}
                            >
                              <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{selectedOrg.name}</p>
                              <Badge variant="secondary" className="text-xs">{selectedOrg.sector}</Badge>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" onClick={() => setSelectedOrg(null)}>
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground">
                            MEMBERS ({selectedOrg.members.length})
                          </p>
                          {selectedOrg.members.slice(0, 6).map(member => (
                            <div key={member} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                              <Users className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm">{member}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-48 text-center">
                        <Box className="w-8 h-8 text-muted-foreground/30 mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click a sphere to see connections
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sankey Flow */}
        <TabsContent value="sankey" className="space-y-4">
          <Card className="border overflow-hidden">
            <CardHeader style={{ backgroundColor: '#395174' }}>
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                Sankey Flow Map
              </CardTitle>
              <CardDescription className="text-white/80 text-xs">
                Flowing connections showing relationship strength
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <div 
                    className="relative h-[400px] rounded-lg overflow-hidden p-6"
                    style={{ 
                      background: "linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)"
                    }}
                  >
                    <div className="flex justify-between h-full">
                      <div className="flex flex-col justify-around w-36">
                        <p className="text-xs font-semibold text-cyan-400 mb-2">INDIVIDUALS</p>
                        {samplePeople.slice(0, 8).map(person => {
                          const isHovered = sankeyHovered === person.name;
                          return (
                            <button
                              key={person.id}
                              className="relative text-left transition-all duration-300"
                              onMouseEnter={() => setSankeyHovered(person.name)}
                              onMouseLeave={() => setSankeyHovered(null)}
                              data-testid={`sankey-person-${person.id}`}
                            >
                              <div 
                                className="p-2 rounded-md text-sm text-white/90 transition-all"
                                style={{ 
                                  background: isHovered 
                                    ? "linear-gradient(90deg, rgba(74, 159, 255, 0.3), transparent)" 
                                    : "transparent",
                                  borderLeft: isHovered ? "3px solid #4a9fff" : "3px solid transparent"
                                }}
                              >
                                {person.name}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex-1 relative">
                        <svg className="w-full h-full">
                          <defs>
                            <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#4a9fff">
                                <animate attributeName="stop-color" values="#4a9fff;#00ff88;#4a9fff" dur="3s" repeatCount="indefinite" />
                              </stop>
                              <stop offset="100%" stopColor="#00ff88">
                                <animate attributeName="stop-color" values="#00ff88;#4a9fff;#00ff88" dur="3s" repeatCount="indefinite" />
                              </stop>
                            </linearGradient>
                            <filter id="flowGlow">
                              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          {samplePeople.slice(0, 8).map((person, pIdx) => 
                            person.orgs.map((orgName) => {
                              const org = sampleOrgs.find(o => o.name === orgName);
                              if (!org) return null;
                              const oIdx = sampleOrgs.indexOf(org);
                              const isHighlighted = sankeyHovered === person.name || sankeyHovered === org.name;
                              const y1 = (pIdx + 1) * (340 / 9);
                              const y2 = (oIdx + 1) * (340 / 7);
                              return (
                                <g key={`${person.id}-${org.id}`}>
                                  <path
                                    d={`M 0 ${y1} C 120 ${y1}, 180 ${y2}, 300 ${y2}`}
                                    fill="none"
                                    stroke={isHighlighted ? "url(#flowGrad)" : org.color}
                                    strokeWidth={isHighlighted ? 4 : 2}
                                    strokeOpacity={isHighlighted ? 1 : 0.3}
                                    filter={isHighlighted ? "url(#flowGlow)" : undefined}
                                    className="transition-all duration-300"
                                  />
                                  {isHighlighted && (
                                    <>
                                      <circle r="4" fill="#fff">
                                        <animateMotion 
                                          dur="1.5s" 
                                          repeatCount="indefinite"
                                          path={`M 0 ${y1} C 120 ${y1}, 180 ${y2}, 300 ${y2}`}
                                        />
                                      </circle>
                                    </>
                                  )}
                                </g>
                              );
                            })
                          )}
                        </svg>
                      </div>

                      <div className="flex flex-col justify-around w-40">
                        <p className="text-xs font-semibold text-emerald-400 mb-2 text-right">ORGANIZATIONS</p>
                        {sampleOrgs.map(org => {
                          const isHovered = sankeyHovered === org.name || (sankeyHovered && samplePeople.find(p => p.name === sankeyHovered)?.orgs.includes(org.name));
                          return (
                            <button
                              key={org.id}
                              className="relative text-right transition-all duration-300"
                              onMouseEnter={() => setSankeyHovered(org.name)}
                              onMouseLeave={() => setSankeyHovered(null)}
                              data-testid={`sankey-org-${org.id}`}
                            >
                              <div 
                                className="p-2 rounded-md text-sm flex items-center justify-end gap-2 transition-all"
                                style={{ 
                                  background: isHovered 
                                    ? `linear-gradient(270deg, ${org.color}40, transparent)` 
                                    : "transparent",
                                  borderRight: `3px solid ${isHovered ? org.color : 'transparent'}`,
                                  color: isHovered ? 'white' : 'rgba(255,255,255,0.7)'
                                }}
                              >
                                <span className="truncate">{org.name}</span>
                                <div 
                                  className="w-2 h-2 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: org.color }}
                                />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <GitBranch className="w-4 h-4" style={{ color: "#395174" }} />
                        Flow Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center h-48 text-center">
                        <GitBranch className="w-8 h-8 text-muted-foreground/30 mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Hover over connections to see animated flows
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
