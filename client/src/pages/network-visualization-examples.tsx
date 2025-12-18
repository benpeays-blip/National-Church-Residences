import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch } from "lucide-react";

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
  { id: 1, name: "Sarah Chen", title: "Board Chair", orgs: ["Columbus Foundation", "United Way", "OSU Foundation", "Parks Conservancy"] },
  { id: 2, name: "Michael Rodriguez", title: "CEO", orgs: ["Columbus Foundation", "Tech Hub Ohio", "Downtown Partnership"] },
  { id: 3, name: "Jennifer Williams", title: "Philanthropist", orgs: ["United Way", "Children's Hospital", "Arts Council", "Food Bank Coalition"] },
  { id: 4, name: "David Kim", title: "Managing Partner", orgs: ["OSU Foundation", "Tech Hub Ohio", "Columbus Foundation", "Parks Conservancy"] },
  { id: 5, name: "Elizabeth Carter", title: "VP Finance", orgs: ["Children's Hospital", "United Way", "Senior Services Network"] },
  { id: 6, name: "Robert Thompson", title: "Founder", orgs: ["Arts Council", "Columbus Foundation", "Veterans Foundation"] },
  { id: 7, name: "Amanda Foster", title: "Director", orgs: ["Tech Hub Ohio", "Arts Council", "Workforce Development", "Cultural Alliance"] },
  { id: 8, name: "James Mitchell", title: "Partner", orgs: ["OSU Foundation", "Children's Hospital", "Mental Health Alliance"] },
  { id: 9, name: "Lisa Brown", title: "VP Development", orgs: ["Columbus Foundation", "Children's Hospital", "Literacy Council"] },
  { id: 10, name: "Marcus Williams", title: "Board Member", orgs: ["United Way", "Tech Hub Ohio", "Housing Authority"] },
  { id: 11, name: "Patricia Moore", title: "Executive Director", orgs: ["Community Foundation", "Civic League", "Senior Services Network", "Cultural Alliance"] },
  { id: 12, name: "Thomas Anderson", title: "CFO", orgs: ["Healthcare Alliance", "Business Roundtable", "Senior Services Network", "Downtown Partnership"] },
  { id: 13, name: "Nancy Taylor", title: "President", orgs: ["Education Trust", "Youth Services", "Mental Health Alliance"] },
  { id: 14, name: "Christopher Lee", title: "Chairman", orgs: ["Environmental Council", "Green Initiative", "Parks Conservancy"] },
  { id: 15, name: "Susan Martinez", title: "VP Operations", orgs: ["Community Foundation", "Healthcare Alliance", "Housing Authority"] },
  { id: 16, name: "Daniel Harris", title: "Managing Director", orgs: ["Business Roundtable", "Tech Hub Ohio", "Workforce Development"] },
  { id: 17, name: "Michelle Clark", title: "Board Treasurer", orgs: ["Youth Services", "Education Trust", "Literacy Council"] },
  { id: 18, name: "Kevin Robinson", title: "Chief Strategy Officer", orgs: ["Civic League", "Environmental Council", "Workforce Development"] },
  { id: 19, name: "Angela White", title: "Senior Partner", orgs: ["Green Initiative", "Arts Council", "Mental Health Alliance", "Cultural Alliance"] },
  { id: 20, name: "Steven Hall", title: "Vice Chair", orgs: ["Columbus Foundation", "Community Foundation", "Veterans Foundation"] },
  { id: 21, name: "Laura Adams", title: "Director of Development", orgs: ["United Way", "Youth Services", "Food Bank Coalition"] },
  { id: 22, name: "Richard Scott", title: "Board Secretary", orgs: ["OSU Foundation", "Education Trust", "Veterans Foundation"] },
  { id: 23, name: "Catherine Young", title: "CEO", orgs: ["Healthcare Alliance", "Children's Hospital", "Food Bank Coalition"] },
  { id: 24, name: "Joseph King", title: "Philanthropist", orgs: ["Environmental Council", "Columbus Foundation", "Literacy Council"] },
  { id: 25, name: "Dorothy Wright", title: "Founder", orgs: ["Civic League", "Business Roundtable", "Housing Authority", "Downtown Partnership"] },
];

const sampleOrgs: Organization[] = [
  { id: 1, name: "Columbus Foundation", sector: "Community", members: ["Sarah Chen", "Michael Rodriguez", "David Kim", "Robert Thompson", "Lisa Brown", "Steven Hall", "Joseph King"], color: "#7FA3A1" },
  { id: 2, name: "United Way", sector: "Social Services", members: ["Sarah Chen", "Jennifer Williams", "Elizabeth Carter", "Marcus Williams", "Laura Adams"], color: "#9CB071" },
  { id: 3, name: "OSU Foundation", sector: "Education", members: ["Sarah Chen", "David Kim", "James Mitchell", "Richard Scott"], color: "#E8923A" },
  { id: 4, name: "Tech Hub Ohio", sector: "Economic Dev", members: ["Michael Rodriguez", "David Kim", "Amanda Foster", "Marcus Williams", "Daniel Harris"], color: "#6FBBD3" },
  { id: 5, name: "Children's Hospital", sector: "Healthcare", members: ["Jennifer Williams", "Elizabeth Carter", "James Mitchell", "Lisa Brown", "Catherine Young"], color: "#D5636C" },
  { id: 6, name: "Arts Council", sector: "Arts & Culture", members: ["Jennifer Williams", "Robert Thompson", "Amanda Foster", "Angela White"], color: "#B5C942" },
  { id: 7, name: "Community Foundation", sector: "Philanthropy", members: ["Patricia Moore", "Susan Martinez", "Steven Hall"], color: "#8E6BB8" },
  { id: 8, name: "Civic League", sector: "Civic Engagement", members: ["Patricia Moore", "Kevin Robinson", "Dorothy Wright"], color: "#E07B53" },
  { id: 9, name: "Healthcare Alliance", sector: "Healthcare", members: ["Thomas Anderson", "Susan Martinez", "Catherine Young"], color: "#5BA8A0" },
  { id: 10, name: "Business Roundtable", sector: "Business", members: ["Thomas Anderson", "Daniel Harris", "Dorothy Wright"], color: "#C4A35A" },
  { id: 11, name: "Education Trust", sector: "Education", members: ["Nancy Taylor", "Michelle Clark", "Richard Scott"], color: "#7B9ED1" },
  { id: 12, name: "Youth Services", sector: "Youth Development", members: ["Nancy Taylor", "Michelle Clark", "Laura Adams"], color: "#D4A5C9" },
  { id: 13, name: "Environmental Council", sector: "Environment", members: ["Christopher Lee", "Kevin Robinson", "Joseph King"], color: "#6AAF6A" },
  { id: 14, name: "Green Initiative", sector: "Sustainability", members: ["Christopher Lee", "Angela White"], color: "#A3C985" },
  { id: 15, name: "Senior Services Network", sector: "Elder Care", members: ["Patricia Moore", "Elizabeth Carter", "Thomas Anderson"], color: "#D98E73" },
  { id: 16, name: "Housing Authority", sector: "Housing", members: ["Susan Martinez", "Marcus Williams", "Dorothy Wright"], color: "#7A9BA8" },
  { id: 17, name: "Food Bank Coalition", sector: "Food Security", members: ["Jennifer Williams", "Laura Adams", "Catherine Young"], color: "#B8A066" },
  { id: 18, name: "Workforce Development", sector: "Employment", members: ["Daniel Harris", "Amanda Foster", "Kevin Robinson"], color: "#8B7EB8" },
  { id: 19, name: "Mental Health Alliance", sector: "Healthcare", members: ["Nancy Taylor", "James Mitchell", "Angela White"], color: "#6B9E9E" },
  { id: 20, name: "Veterans Foundation", sector: "Veterans", members: ["Robert Thompson", "Steven Hall", "Richard Scott"], color: "#A67C52" },
  { id: 21, name: "Literacy Council", sector: "Education", members: ["Michelle Clark", "Lisa Brown", "Joseph King"], color: "#9E7B9E" },
  { id: 22, name: "Parks Conservancy", sector: "Conservation", members: ["Christopher Lee", "Sarah Chen", "David Kim"], color: "#6B8E6B" },
  { id: 23, name: "Downtown Partnership", sector: "Urban Dev", members: ["Michael Rodriguez", "Thomas Anderson", "Dorothy Wright"], color: "#B59E6B" },
  { id: 24, name: "Cultural Alliance", sector: "Arts & Culture", members: ["Amanda Foster", "Angela White", "Patricia Moore"], color: "#C97B8B" },
];

export default function NetworkVisualizationExamples() {
  const [sankeyHovered, setSankeyHovered] = useState<string | null>(null);
  const [positions, setPositions] = useState<{
    people: { [key: number]: number };
    orgs: { [key: number]: number };
    svgTop: number;
    svgHeight: number;
  }>({ people: {}, orgs: {}, svgTop: 0, svgHeight: 1 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const peopleScrollRef = useRef<HTMLDivElement>(null);
  const orgsScrollRef = useRef<HTMLDivElement>(null);
  const peopleRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
  const orgRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
  const [scrollTrigger, setScrollTrigger] = useState(0);

  // Measure positions after render and on scroll
  useLayoutEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current || !svgRef.current) return;
      
      const svgRect = svgRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      const newPeople: { [key: number]: number } = {};
      const newOrgs: { [key: number]: number } = {};
      
      // Get Y center of each person label relative to SVG
      samplePeople.forEach(person => {
        const el = peopleRefs.current[person.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          const centerY = rect.top + rect.height / 2 - svgRect.top;
          newPeople[person.id] = centerY;
        }
      });
      
      // Get Y center of each org label relative to SVG
      sampleOrgs.forEach(org => {
        const el = orgRefs.current[org.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          const centerY = rect.top + rect.height / 2 - svgRect.top;
          newOrgs[org.id] = centerY;
        }
      });
      
      setPositions({
        people: newPeople,
        orgs: newOrgs,
        svgTop: svgRect.top - containerRect.top,
        svgHeight: svgRect.height
      });
    };
    
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [scrollTrigger]);

  const handleScroll = () => {
    setScrollTrigger(prev => prev + 1);
  };

  // Compute reordered lists based on hover state
  const getOrderedPeople = () => {
    if (!sankeyHovered) return samplePeople;
    
    // If hovering over a person, keep that person at current position
    const hoveredPerson = samplePeople.find(p => p.name === sankeyHovered);
    if (hoveredPerson) return samplePeople;
    
    // If hovering over an org, bring connected people to center
    const hoveredOrg = sampleOrgs.find(o => o.name === sankeyHovered);
    if (hoveredOrg) {
      const connected = samplePeople.filter(p => p.orgs.includes(sankeyHovered));
      const unconnected = samplePeople.filter(p => !p.orgs.includes(sankeyHovered));
      // Put connected people first, then unconnected
      return [...connected, ...unconnected];
    }
    
    return samplePeople;
  };

  const getOrderedOrgs = () => {
    if (!sankeyHovered) return sampleOrgs;
    
    // If hovering over an org, keep that org at current position
    const hoveredOrg = sampleOrgs.find(o => o.name === sankeyHovered);
    if (hoveredOrg) return sampleOrgs;
    
    // If hovering over a person, bring connected orgs to center
    const hoveredPerson = samplePeople.find(p => p.name === sankeyHovered);
    if (hoveredPerson) {
      const connected = sampleOrgs.filter(o => hoveredPerson.orgs.includes(o.name));
      const unconnected = sampleOrgs.filter(o => !hoveredPerson.orgs.includes(o.name));
      // Put connected orgs first, then unconnected
      return [...connected, ...unconnected];
    }
    
    return sampleOrgs;
  };

  const orderedPeople = getOrderedPeople();
  const orderedOrgs = getOrderedOrgs();

  // Trigger position recalculation when hover changes
  useEffect(() => {
    // Small delay to let DOM update after reorder
    const timer = setTimeout(() => {
      setScrollTrigger(prev => prev + 1);
    }, 50);
    return () => clearTimeout(timer);
  }, [sankeyHovered]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold" data-testid="page-title">Sankey Flow</h1>
        <p className="text-sm text-muted-foreground">
          Interactive flow visualization showing connections between people and organizations
        </p>
      </div>

      <Card className="border overflow-hidden">
        <CardHeader style={{ backgroundColor: '#395174' }}>
          <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
            <GitBranch className="w-4 h-4" />
            Sankey Flow Map
          </CardTitle>
          <CardDescription className="text-white/80 text-xs">
            Flowing connections showing relationship strength • Hover to highlight paths
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <div 
                ref={containerRef}
                className="relative h-[650px] rounded-lg overflow-hidden p-6"
                style={{ 
                  background: "linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)"
                }}
              >
                <div className="flex justify-between h-full">
                  <div className="flex flex-col w-44">
                    <p className="text-xs font-semibold text-cyan-400 mb-2 flex-shrink-0">INDIVIDUALS</p>
                    <div 
                      ref={peopleScrollRef}
                      onScroll={handleScroll}
                      className="flex-1 overflow-y-auto pr-2 space-y-1"
                      style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(74, 159, 255, 0.3) transparent' }}
                    >
                      {orderedPeople.map(person => {
                        const isHovered = sankeyHovered === person.name;
                        const isConnected = sankeyHovered && sampleOrgs.find(o => o.name === sankeyHovered)?.members?.includes(person.name);
                        return (
                          <button
                            key={person.id}
                            ref={el => { peopleRefs.current[person.id] = el; }}
                            className="relative text-left transition-all duration-300 w-full"
                            onMouseEnter={() => setSankeyHovered(person.name)}
                            onMouseLeave={() => setSankeyHovered(null)}
                            data-testid={`sankey-person-${person.id}`}
                          >
                            <div 
                              className="p-2 rounded-md text-sm transition-all"
                              style={{ 
                                background: isHovered 
                                  ? "linear-gradient(90deg, rgba(74, 159, 255, 0.3), transparent)" 
                                  : isConnected 
                                    ? "linear-gradient(90deg, rgba(74, 159, 255, 0.15), transparent)"
                                    : "transparent",
                                borderLeft: isHovered ? "3px solid #4a9fff" : isConnected ? "3px solid rgba(74, 159, 255, 0.5)" : "3px solid transparent",
                                color: isHovered || isConnected ? 'white' : 'rgba(255,255,255,0.7)'
                              }}
                            >
                              {person.name}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex-1 relative">
                    <svg ref={svgRef} className="w-full h-full absolute inset-0">
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
                          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      {samplePeople.map((person) => 
                        person.orgs.map((orgName) => {
                          const org = sampleOrgs.find(o => o.name === orgName);
                          if (!org) return null;
                          const isHighlighted = sankeyHovered === person.name || sankeyHovered === org.name;
                          
                          // Use measured positions from refs
                          const y1 = positions.people[person.id] ?? 0;
                          const y2 = positions.orgs[org.id] ?? 0;
                          
                          // Skip rendering if positions not yet measured
                          if (y1 === 0 && y2 === 0) return null;
                          
                          // Get SVG width for bezier control points
                          const svgWidth = svgRef.current?.clientWidth ?? 400;
                          
                          return (
                            <g key={`${person.id}-${org.id}`}>
                              <path
                                d={`M 0 ${y1} C ${svgWidth * 0.35} ${y1}, ${svgWidth * 0.65} ${y2}, ${svgWidth} ${y2}`}
                                fill="none"
                                stroke={isHighlighted ? "url(#flowGrad)" : org.color}
                                strokeWidth={isHighlighted ? 3 : 1.5}
                                strokeOpacity={isHighlighted ? 1 : 0.35}
                                filter={isHighlighted ? "url(#flowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {isHighlighted && (
                                <circle r="4" fill="#fff">
                                  <animateMotion 
                                    dur="1.5s" 
                                    repeatCount="indefinite"
                                    path={`M 0 ${y1} C ${svgWidth * 0.35} ${y1}, ${svgWidth * 0.65} ${y2}, ${svgWidth} ${y2}`}
                                  />
                                </circle>
                              )}
                            </g>
                          );
                        })
                      )}
                    </svg>
                  </div>

                  <div className="flex flex-col w-48">
                    <p className="text-xs font-semibold text-emerald-400 mb-2 text-right flex-shrink-0">ORGANIZATIONS</p>
                    <div 
                      ref={orgsScrollRef}
                      onScroll={handleScroll}
                      className="flex-1 overflow-y-auto pl-2 space-y-1"
                      style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0, 255, 136, 0.3) transparent' }}
                    >
                      {orderedOrgs.map(org => {
                        const isHovered = sankeyHovered === org.name;
                        const isConnected = sankeyHovered && samplePeople.find(p => p.name === sankeyHovered)?.orgs.includes(org.name);
                        return (
                          <button
                            key={org.id}
                            ref={el => { orgRefs.current[org.id] = el; }}
                            className="relative text-right transition-all duration-300 w-full"
                            onMouseEnter={() => setSankeyHovered(org.name)}
                            onMouseLeave={() => setSankeyHovered(null)}
                            data-testid={`sankey-org-${org.id}`}
                          >
                            <div 
                              className="p-2 rounded-md text-sm flex items-center justify-end gap-2 transition-all"
                              style={{ 
                                background: isHovered 
                                  ? `linear-gradient(270deg, ${org.color}40, transparent)` 
                                  : isConnected
                                    ? `linear-gradient(270deg, ${org.color}20, transparent)`
                                    : "transparent",
                                borderRight: `3px solid ${isHovered ? org.color : isConnected ? `${org.color}80` : 'transparent'}`,
                                color: isHovered || isConnected ? 'white' : 'rgba(255,255,255,0.7)'
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
                  {sankeyHovered ? (
                    <div className="space-y-4">
                      {samplePeople.find(p => p.name === sankeyHovered) ? (
                        <div className="space-y-3">
                          <div>
                            <p className="font-medium text-sm">{sankeyHovered}</p>
                            <p className="text-xs text-muted-foreground">
                              {samplePeople.find(p => p.name === sankeyHovered)?.title}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-xs font-semibold text-muted-foreground">CONNECTED TO</p>
                            {samplePeople.find(p => p.name === sankeyHovered)?.orgs.map(orgName => {
                              const org = sampleOrgs.find(o => o.name === orgName);
                              return (
                                <div key={orgName} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: org?.color }} />
                                  <span className="text-sm">{orgName}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div>
                            <p className="font-medium text-sm">{sankeyHovered}</p>
                            <p className="text-xs text-muted-foreground">
                              {sampleOrgs.find(o => o.name === sankeyHovered)?.sector}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-xs font-semibold text-muted-foreground">MEMBERS</p>
                            {sampleOrgs.find(o => o.name === sankeyHovered)?.members.slice(0, 6).map(member => (
                              <div key={member} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium">
                                  {member.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="text-sm">{member}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-48 text-center">
                      <GitBranch className="w-8 h-8 text-muted-foreground/30 mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Hover over names to see animated flows
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Connections show shared memberships
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border" style={{ backgroundColor: "rgba(222, 235, 247, 0.3)" }}>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: "#084594" }}>{samplePeople.length}</div>
              <p className="text-sm text-muted-foreground">Individuals</p>
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
              <div className="text-3xl font-bold" style={{ color: "#084594" }}>
                {samplePeople.reduce((acc, p) => acc + p.orgs.length, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total Connections</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
