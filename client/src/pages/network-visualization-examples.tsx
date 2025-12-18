import { useState } from "react";
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
];

const sampleOrgs: Organization[] = [
  { id: 1, name: "Columbus Foundation", sector: "Community", members: ["Sarah Chen", "Michael Rodriguez", "David Kim", "Robert Thompson", "Lisa Brown"], color: "#7FA3A1" },
  { id: 2, name: "United Way", sector: "Social Services", members: ["Sarah Chen", "Jennifer Williams", "Elizabeth Carter", "Marcus Williams"], color: "#9CB071" },
  { id: 3, name: "OSU Foundation", sector: "Education", members: ["Sarah Chen", "David Kim", "James Mitchell"], color: "#E8923A" },
  { id: 4, name: "Tech Hub Ohio", sector: "Economic Dev", members: ["Michael Rodriguez", "David Kim", "Amanda Foster", "Marcus Williams"], color: "#6FBBD3" },
  { id: 5, name: "Children's Hospital", sector: "Healthcare", members: ["Jennifer Williams", "Elizabeth Carter", "James Mitchell", "Lisa Brown"], color: "#D5636C" },
  { id: 6, name: "Arts Council", sector: "Arts & Culture", members: ["Jennifer Williams", "Robert Thompson", "Amanda Foster"], color: "#B5C942" },
];

export default function NetworkVisualizationExamples() {
  const [sankeyHovered, setSankeyHovered] = useState<string | null>(null);

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
                className="relative h-[650px] rounded-lg overflow-hidden p-6"
                style={{ 
                  background: "linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)"
                }}
              >
                <div className="flex justify-between h-full">
                  <div className="flex flex-col justify-around w-40">
                    <p className="text-xs font-semibold text-cyan-400 mb-2">INDIVIDUALS</p>
                    {samplePeople.map(person => {
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
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
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
                          <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
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
                          // Calculate Y positions to match justify-around: equal space around each item
                          // For justify-around: first item at (1/2n), then spaced by (1/n) of height
                          const peopleCount = samplePeople.length;
                          const orgCount = sampleOrgs.length;
                          // Adjust for the header label taking some space (~8% at top)
                          const y1 = 10 + ((pIdx + 0.5) / peopleCount) * 85;
                          const y2 = 10 + ((oIdx + 0.5) / orgCount) * 85;
                          return (
                            <g key={`${person.id}-${org.id}`}>
                              <path
                                d={`M 0 ${y1} C 35 ${y1}, 65 ${y2}, 100 ${y2}`}
                                fill="none"
                                stroke={isHighlighted ? "url(#flowGrad)" : org.color}
                                strokeWidth={isHighlighted ? 0.8 : 0.4}
                                strokeOpacity={isHighlighted ? 1 : 0.35}
                                filter={isHighlighted ? "url(#flowGlow)" : undefined}
                                className="transition-all duration-300"
                                vectorEffect="non-scaling-stroke"
                                style={{ strokeWidth: isHighlighted ? 3 : 1.5 }}
                              />
                              {isHighlighted && (
                                <circle r="0.8" fill="#fff">
                                  <animateMotion 
                                    dur="1.5s" 
                                    repeatCount="indefinite"
                                    path={`M 0 ${y1} C 35 ${y1}, 65 ${y2}, 100 ${y2}`}
                                  />
                                </circle>
                              )}
                            </g>
                          );
                        })
                      )}
                    </svg>
                  </div>

                  <div className="flex flex-col justify-around w-44">
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
