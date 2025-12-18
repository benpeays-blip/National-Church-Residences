import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Filter,
  Play,
  Pause,
  RotateCcw,
  Maximize2
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

const samplePeople: Person[] = [
  { id: 1, name: "Sarah Chen", title: "Board Chair", orgs: ["Columbus Foundation", "United Way", "OSU Foundation"] },
  { id: 2, name: "Michael Rodriguez", title: "CEO", orgs: ["Columbus Foundation", "Tech Hub Ohio"] },
  { id: 3, name: "Jennifer Williams", title: "Philanthropist", orgs: ["United Way", "Children's Hospital", "Arts Council"] },
  { id: 4, name: "David Kim", title: "Managing Partner", orgs: ["OSU Foundation", "Tech Hub Ohio", "Columbus Foundation"] },
  { id: 5, name: "Elizabeth Carter", title: "VP Finance", orgs: ["Children's Hospital", "United Way"] },
  { id: 6, name: "Robert Thompson", title: "Founder", orgs: ["Arts Council", "Columbus Foundation"] },
  { id: 7, name: "Amanda Foster", title: "Director", orgs: ["Tech Hub Ohio", "Arts Council"] },
  { id: 8, name: "James Mitchell", title: "Partner", orgs: ["OSU Foundation", "Children's Hospital"] },
];

const sampleOrgs: Organization[] = [
  { id: 1, name: "Columbus Foundation", sector: "Community", members: ["Sarah Chen", "Michael Rodriguez", "David Kim", "Robert Thompson"], color: "#7FA3A1" },
  { id: 2, name: "United Way", sector: "Social Services", members: ["Sarah Chen", "Jennifer Williams", "Elizabeth Carter"], color: "#9CB071" },
  { id: 3, name: "OSU Foundation", sector: "Education", members: ["Sarah Chen", "David Kim", "James Mitchell"], color: "#E8923A" },
  { id: 4, name: "Tech Hub Ohio", sector: "Economic Dev", members: ["Michael Rodriguez", "David Kim", "Amanda Foster"], color: "#6FBBD3" },
  { id: 5, name: "Children's Hospital", sector: "Healthcare", members: ["Jennifer Williams", "Elizabeth Carter", "James Mitchell"], color: "#D5636C" },
  { id: 6, name: "Arts Council", sector: "Arts & Culture", members: ["Jennifer Williams", "Robert Thompson", "Amanda Foster"], color: "#B5C942" },
];

export default function NetworkVisualizationExamples() {
  const [activeTab, setActiveTab] = useState("force");
  const [selectedNode, setSelectedNode] = useState<Person | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [filterSector, setFilterSector] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [sankeyHovered, setSankeyHovered] = useState<string | null>(null);

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

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#395174" }} data-testid="page-title">
            High-Tech Network Visualizations
          </h1>
          <p className="text-muted-foreground mt-1">
            Immersive, animated network graph alternatives with futuristic effects
          </p>
        </div>
      </div>

      <Card className="p-4" style={{ backgroundColor: "rgba(57, 81, 116, 0.05)" }}>
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 mt-0.5" style={{ color: "#395174" }} />
          <div>
            <h4 className="font-medium text-sm" style={{ color: "#395174" }}>Interactive Network Experiences</h4>
            <p className="text-sm text-muted-foreground mt-1">
              These visualizations feature glowing effects, smooth animations, and dynamic clustering. 
              Click on nodes to explore connections, hover for highlights, and use controls to filter and animate.
            </p>
          </div>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="force" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Force-Directed
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
            Animated Sankey
          </TabsTrigger>
        </TabsList>

        {/* Approach 1: Force-Directed Graph with Enhancements */}
        <TabsContent value="force" className="space-y-4">
          <Card className="border overflow-hidden">
            <CardHeader style={{ backgroundColor: '#395174' }}>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Force-Directed Graph with Glowing Effects
                  </CardTitle>
                  <CardDescription className="text-white/80 text-xs">
                    Nodes with neon outlines, dynamic clustering, and smooth transitions
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
                    {isAnimating ? "Pause" : "Animate"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-4">
                <div 
                  className="lg:col-span-3 relative h-[500px] overflow-hidden"
                  style={{ 
                    background: "radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f1a 100%)"
                  }}
                >
                  {/* Grid lines for effect */}
                  <div className="absolute inset-0 opacity-10">
                    {[...Array(20)].map((_, i) => (
                      <div key={`h-${i}`} className="absolute w-full h-px bg-blue-400" style={{ top: `${i * 5}%` }} />
                    ))}
                    {[...Array(20)].map((_, i) => (
                      <div key={`v-${i}`} className="absolute h-full w-px bg-blue-400" style={{ left: `${i * 5}%` }} />
                    ))}
                  </div>

                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    {samplePeople.map((person, pIdx) => {
                      const px = 150 + Math.cos(pIdx * 0.8 + (isAnimating ? Date.now() * 0.0005 : 0)) * 100 + pIdx * 40;
                      const py = 100 + Math.sin(pIdx * 0.6 + (isAnimating ? Date.now() * 0.0003 : 0)) * 80 + pIdx * 30;
                      return person.orgs.map(orgName => {
                        const org = sampleOrgs.find(o => o.name === orgName);
                        if (!org) return null;
                        const ox = 350 + org.id * 50 + Math.sin(org.id + (isAnimating ? Date.now() * 0.0004 : 0)) * 30;
                        const oy = 150 + org.id * 40 + Math.cos(org.id + (isAnimating ? Date.now() * 0.0002 : 0)) * 40;
                        const isHighlighted = hoveredNode === person.name || selectedNode?.name === person.name;
                        return (
                          <line
                            key={`${person.id}-${org.id}`}
                            x1={px}
                            y1={py}
                            x2={ox}
                            y2={oy}
                            stroke={isHighlighted ? org.color : "rgba(100, 150, 255, 0.2)"}
                            strokeWidth={isHighlighted ? 2 : 1}
                            filter={isHighlighted ? "url(#glow)" : undefined}
                            className="transition-all duration-300"
                          />
                        );
                      });
                    })}
                  </svg>

                  {/* Person nodes */}
                  {samplePeople.map((person, idx) => {
                    const x = 150 + Math.cos(idx * 0.8 + (isAnimating ? Date.now() * 0.0005 : 0)) * 100 + idx * 40;
                    const y = 100 + Math.sin(idx * 0.6 + (isAnimating ? Date.now() * 0.0003 : 0)) * 80 + idx * 30;
                    const isSelected = selectedNode?.id === person.id;
                    const isHovered = hoveredNode === person.name;
                    return (
                      <button
                        key={person.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                        style={{ 
                          left: x, 
                          top: y,
                          transform: `translate(-50%, -50%) scale(${isSelected || isHovered ? 1.2 : 1})`
                        }}
                        onClick={() => setSelectedNode(isSelected ? null : person)}
                        onMouseEnter={() => setHoveredNode(person.name)}
                        onMouseLeave={() => setHoveredNode(null)}
                        data-testid={`node-person-${person.id}`}
                      >
                        <div 
                          className="relative w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ 
                            background: `linear-gradient(135deg, #4a9fff 0%, #2563eb 100%)`,
                            boxShadow: isSelected || isHovered 
                              ? `0 0 20px rgba(74, 159, 255, 0.8), 0 0 40px rgba(74, 159, 255, 0.4), inset 0 0 20px rgba(255,255,255,0.2)` 
                              : `0 0 10px rgba(74, 159, 255, 0.4)`,
                          }}
                        >
                          {person.name.split(' ').map(n => n[0]).join('')}
                          {(isSelected || isHovered) && (
                            <div className="absolute -inset-1 rounded-full border-2 border-cyan-400 animate-pulse" />
                          )}
                        </div>
                      </button>
                    );
                  })}

                  {/* Organization nodes */}
                  {sampleOrgs.map((org, idx) => {
                    const x = 350 + org.id * 50 + Math.sin(org.id + (isAnimating ? Date.now() * 0.0004 : 0)) * 30;
                    const y = 150 + org.id * 40 + Math.cos(org.id + (isAnimating ? Date.now() * 0.0002 : 0)) * 40;
                    const isSelected = selectedOrg?.id === org.id;
                    const hasConnectionToHovered = hoveredNode && org.members.includes(hoveredNode);
                    return (
                      <button
                        key={org.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                        style={{ 
                          left: x, 
                          top: y,
                          transform: `translate(-50%, -50%) scale(${isSelected || hasConnectionToHovered ? 1.15 : 1})`
                        }}
                        onClick={() => setSelectedOrg(isSelected ? null : org)}
                        data-testid={`node-org-${org.id}`}
                      >
                        <div 
                          className="relative w-14 h-14 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                          style={{ 
                            background: org.color,
                            boxShadow: isSelected || hasConnectionToHovered
                              ? `0 0 25px ${org.color}, 0 0 50px ${org.color}40, inset 0 0 15px rgba(255,255,255,0.3)` 
                              : `0 0 15px ${org.color}60`,
                          }}
                        >
                          <Building2 className="w-5 h-5" />
                          {(isSelected || hasConnectionToHovered) && (
                            <div 
                              className="absolute -inset-1 rounded-lg border-2 animate-pulse"
                              style={{ borderColor: org.color }}
                            />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Detail Panel */}
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
                              style={{ background: "linear-gradient(135deg, #4a9fff 0%, #2563eb 100%)" }}
                            >
                              {selectedNode.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{selectedNode.name}</p>
                              <p className="text-xs text-muted-foreground">{selectedNode.title}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" onClick={() => setSelectedNode(null)}>
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground">ORGANIZATIONS</p>
                          {selectedNode.orgs.map(orgName => {
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
                            CONNECTIONS ({getPersonConnections(selectedNode.name).length})
                          </p>
                          {getPersonConnections(selectedNode.name).map(conn => (
                            <div key={conn.name} className="p-2 rounded-md bg-muted/50">
                              <p className="text-sm font-medium">{conn.name}</p>
                              <p className="text-xs text-muted-foreground">via {conn.sharedOrgs.join(', ')}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : selectedOrg ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: selectedOrg.color }}
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
                          {selectedOrg.members.map(member => (
                            <div key={member} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                              <Users className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm">{member}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-48 text-center">
                        <Eye className="w-8 h-8 text-muted-foreground/30 mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click a node to view details
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Approach 2: Radial Galaxy Layout */}
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
                  {/* Star field */}
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

                  {/* Central hub */}
                  <div 
                    className="absolute w-20 h-20 rounded-full flex items-center justify-center z-20"
                    style={{ 
                      background: "radial-gradient(circle, #4a9fff 0%, #1a365d 100%)",
                      boxShadow: "0 0 40px rgba(74, 159, 255, 0.6), 0 0 80px rgba(74, 159, 255, 0.3)"
                    }}
                  >
                    <span className="text-white font-bold text-xs">NCR</span>
                  </div>

                  {/* Orbital rings */}
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

                  {/* Organization planets */}
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
                          
                          {/* Orbiting satellites (people) */}
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

                  {/* Connection arcs */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                    <defs>
                      <filter id="arcGlow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    {samplePeople.filter(p => p.orgs.length > 1).slice(0, 3).map((person, idx) => {
                      const orgs = person.orgs.map(name => sampleOrgs.find(o => o.name === name)).filter(Boolean) as Organization[];
                      if (orgs.length < 2) return null;
                      return orgs.slice(0, -1).map((org1, i) => {
                        const org2 = orgs[i + 1];
                        const angle1 = (sampleOrgs.indexOf(org1) * 60) + rotation;
                        const angle2 = (sampleOrgs.indexOf(org2) * 60) + rotation;
                        const r = 150;
                        const cx = 250, cy = 250;
                        const x1 = cx + Math.cos(angle1 * Math.PI / 180) * r;
                        const y1 = cy + Math.sin(angle1 * Math.PI / 180) * r;
                        const x2 = cx + Math.cos(angle2 * Math.PI / 180) * r;
                        const y2 = cy + Math.sin(angle2 * Math.PI / 180) * r;
                        return (
                          <path
                            key={`${org1.id}-${org2.id}`}
                            d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                            fill="none"
                            stroke={`url(#grad-${idx})`}
                            strokeWidth="2"
                            opacity="0.6"
                            filter="url(#arcGlow)"
                          />
                        );
                      });
                    })}
                    <linearGradient id="grad-0" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4a9fff" />
                      <stop offset="100%" stopColor="#9CB071" />
                    </linearGradient>
                    <linearGradient id="grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#E8923A" />
                      <stop offset="100%" stopColor="#D5636C" />
                    </linearGradient>
                    <linearGradient id="grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6FBBD3" />
                      <stop offset="100%" stopColor="#B5C942" />
                    </linearGradient>
                  </svg>
                </div>

                {/* Detail Panel */}
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
                          {selectedOrg.members.map(member => (
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

        {/* Approach 3: Interactive 3D Network */}
        <TabsContent value="3d" className="space-y-4">
          <Card className="border overflow-hidden">
            <CardHeader style={{ backgroundColor: '#395174' }}>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                    <Box className="w-4 h-4" />
                    Interactive 3D Network
                  </CardTitle>
                  <CardDescription className="text-white/80 text-xs">
                    Rotate and explore a dimensional graph with depth and perspective
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
                  {/* 3D container */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `rotateX(15deg) rotateY(${rotation * 0.5}deg)`
                    }}
                  >
                    {/* Organizations as 3D spheres */}
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

                          {/* Members floating nearby */}
                          {isSelected && org.members.map((member, mIdx) => {
                            const mAngle = (mIdx / org.members.length) * Math.PI * 2;
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

                    {/* Connection beams */}
                    <svg 
                      className="absolute pointer-events-none" 
                      style={{ 
                        width: 500, 
                        height: 500, 
                        left: '50%', 
                        top: '50%', 
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <defs>
                        <filter id="beam3d">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      {filteredOrgs.map((org1, i) => 
                        filteredOrgs.slice(i + 1).map((org2) => {
                          const shared = org1.members.filter(m => org2.members.includes(m));
                          if (shared.length === 0) return null;
                          const angle1 = (i / filteredOrgs.length) * Math.PI * 2;
                          const angle2 = ((filteredOrgs.indexOf(org2)) / filteredOrgs.length) * Math.PI * 2;
                          const x1 = 250 + Math.cos(angle1) * 150;
                          const y1 = 250 + (i % 2) * 40 - 20;
                          const x2 = 250 + Math.cos(angle2) * 150;
                          const y2 = 250 + (filteredOrgs.indexOf(org2) % 2) * 40 - 20;
                          return (
                            <line
                              key={`${org1.id}-${org2.id}`}
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke="url(#beam3dGrad)"
                              strokeWidth={shared.length}
                              opacity={0.4}
                              filter="url(#beam3d)"
                            />
                          );
                        })
                      )}
                      <linearGradient id="beam3dGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4a9fff" />
                        <stop offset="100%" stopColor="#00ff88" />
                      </linearGradient>
                    </svg>
                  </div>

                  {/* Floor reflection */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-32"
                    style={{
                      background: "linear-gradient(to top, rgba(74, 159, 255, 0.1), transparent)"
                    }}
                  />
                </div>

                {/* Detail Panel */}
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
                          {selectedOrg.members.map(member => (
                            <div key={member} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                              <Users className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm">{member}</span>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground">CONNECTIONS</p>
                          {sampleOrgs.filter(o => 
                            o.id !== selectedOrg.id && 
                            o.members.some(m => selectedOrg.members.includes(m))
                          ).map(org => (
                            <div key={org.id} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: org.color }} />
                              <span className="text-sm">{org.name}</span>
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

        {/* Approach 4: Animated Sankey Flow */}
        <TabsContent value="sankey" className="space-y-4">
          <Card className="border overflow-hidden">
            <CardHeader style={{ backgroundColor: '#395174' }}>
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                Animated Sankey Flow Map
              </CardTitle>
              <CardDescription className="text-white/80 text-xs">
                Flowing connections that animate on hover, showing relationship strength
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
                      {/* People column */}
                      <div className="flex flex-col justify-around w-36">
                        <p className="text-xs font-semibold text-cyan-400 mb-2">INDIVIDUALS</p>
                        {samplePeople.map(person => {
                          const isHovered = sankeyHovered === person.name;
                          return (
                            <button
                              key={person.id}
                              className="relative text-left transition-all duration-300"
                              onMouseEnter={() => setSankeyHovered(person.name)}
                              onMouseLeave={() => setSankeyHovered(null)}
                              onClick={() => setSelectedNode(selectedNode?.id === person.id ? null : person)}
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

                      {/* Flow area */}
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
                          {samplePeople.map((person, pIdx) => 
                            person.orgs.map((orgName) => {
                              const org = sampleOrgs.find(o => o.name === orgName);
                              if (!org) return null;
                              const oIdx = sampleOrgs.indexOf(org);
                              const isHighlighted = sankeyHovered === person.name || sankeyHovered === org.name;
                              const y1 = (pIdx + 1) * (340 / (samplePeople.length + 1));
                              const y2 = (oIdx + 1) * (340 / (sampleOrgs.length + 1));
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
                                      <circle r="4" fill="#fff">
                                        <animateMotion 
                                          dur="1.5s" 
                                          repeatCount="indefinite"
                                          begin="0.5s"
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

                      {/* Organizations column */}
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
                              onClick={() => setSelectedOrg(selectedOrg?.id === org.id ? null : org)}
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

                {/* Detail Panel */}
                <div>
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <GitBranch className="w-4 h-4" style={{ color: "#395174" }} />
                        Flow Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedNode ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{selectedNode.name}</p>
                              <p className="text-xs text-muted-foreground">{selectedNode.title}</p>
                            </div>
                            <Button size="sm" variant="ghost" onClick={() => setSelectedNode(null)}>
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <p className="text-xs font-semibold text-muted-foreground">FLOWS TO:</p>
                            {selectedNode.orgs.map(orgName => {
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
                              CONNECTIONS ({getPersonConnections(selectedNode.name).length})
                            </p>
                            {getPersonConnections(selectedNode.name).map(conn => (
                              <div key={conn.name} className="p-2 rounded-md bg-muted/50">
                                <p className="text-sm font-medium">{conn.name}</p>
                                <p className="text-xs text-muted-foreground">via {conn.sharedOrgs.join(', ')}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : selectedOrg ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: selectedOrg.color }}
                              />
                              <div>
                                <p className="font-medium text-sm">{selectedOrg.name}</p>
                                <p className="text-xs text-muted-foreground">{selectedOrg.sector}</p>
                              </div>
                            </div>
                            <Button size="sm" variant="ghost" onClick={() => setSelectedOrg(null)}>
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <p className="text-xs font-semibold text-muted-foreground">
                              INCOMING FLOWS ({selectedOrg.members.length})
                            </p>
                            {selectedOrg.members.map(member => (
                              <div key={member} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                                <Users className="w-3 h-3 text-muted-foreground" />
                                <span className="text-sm">{member}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-48 text-center">
                          <GitBranch className="w-8 h-8 text-muted-foreground/30 mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Hover over flows to see animations
                          </p>
                        </div>
                      )}
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
