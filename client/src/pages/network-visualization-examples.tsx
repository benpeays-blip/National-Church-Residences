import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Grid3x3, 
  LayoutDashboard, 
  GitBranch, 
  Layers, 
  Users, 
  Building2, 
  ChevronRight,
  X,
  ArrowRight,
  Sparkles,
  Network,
  Eye
} from "lucide-react";

const samplePeople = [
  { id: 1, name: "Sarah Chen", title: "Board Chair", orgs: ["Columbus Foundation", "United Way", "OSU Foundation"] },
  { id: 2, name: "Michael Rodriguez", title: "CEO", orgs: ["Columbus Foundation", "Tech Hub Ohio"] },
  { id: 3, name: "Jennifer Williams", title: "Philanthropist", orgs: ["United Way", "Children's Hospital", "Arts Council"] },
  { id: 4, name: "David Kim", title: "Managing Partner", orgs: ["OSU Foundation", "Tech Hub Ohio", "Columbus Foundation"] },
  { id: 5, name: "Elizabeth Carter", title: "VP Finance", orgs: ["Children's Hospital", "United Way"] },
  { id: 6, name: "Robert Thompson", title: "Founder", orgs: ["Arts Council", "Columbus Foundation"] },
];

const sampleOrgs = [
  { id: 1, name: "Columbus Foundation", sector: "Community", members: ["Sarah Chen", "Michael Rodriguez", "David Kim", "Robert Thompson"], color: "#7FA3A1" },
  { id: 2, name: "United Way", sector: "Social Services", members: ["Sarah Chen", "Jennifer Williams", "Elizabeth Carter"], color: "#9CB071" },
  { id: 3, name: "OSU Foundation", sector: "Education", members: ["Sarah Chen", "David Kim"], color: "#E8923A" },
  { id: 4, name: "Tech Hub Ohio", sector: "Economic Dev", members: ["Michael Rodriguez", "David Kim"], color: "#6FBBD3" },
  { id: 5, name: "Children's Hospital", sector: "Healthcare", members: ["Jennifer Williams", "Elizabeth Carter"], color: "#D5636C" },
  { id: 6, name: "Arts Council", sector: "Arts & Culture", members: ["Jennifer Williams", "Robert Thompson"], color: "#B5C942" },
];

export default function NetworkVisualizationExamples() {
  const [activeTab, setActiveTab] = useState("matrix");
  const [selectedCell, setSelectedCell] = useState<{ person: string; org: string } | null>(null);
  const [expandedOrg, setExpandedOrg] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);

  const getOverlapCount = (personName: string, orgName: string) => {
    const person = samplePeople.find(p => p.name === personName);
    const org = sampleOrgs.find(o => o.name === orgName);
    if (!person || !org) return 0;
    return person.orgs.includes(orgName) ? org.members.filter(m => m !== personName).length : 0;
  };

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

  const clusterBySector = () => {
    const sectors: { [key: string]: typeof sampleOrgs } = {};
    sampleOrgs.forEach(org => {
      if (!sectors[org.sector]) sectors[org.sector] = [];
      sectors[org.sector].push(org);
    });
    return sectors;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#395174" }} data-testid="page-title">
            Network Visualization Approaches
          </h1>
          <p className="text-muted-foreground mt-1">
            Exploring hybrid approaches to replace the force-directed network graph
          </p>
        </div>
      </div>

      <Card className="p-4" style={{ backgroundColor: "rgba(57, 81, 116, 0.05)" }}>
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 mt-0.5" style={{ color: "#395174" }} />
          <div>
            <h4 className="font-medium text-sm" style={{ color: "#395174" }}>Why Hybrid Approaches?</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Force-directed graphs can become cluttered and hard to read with many nodes. 
              These hybrid approaches combine structured overviews with interactive exploration 
              for better usability and insight discovery.
            </p>
          </div>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="matrix" className="flex items-center gap-2">
            <Grid3x3 className="w-4 h-4" />
            Matrix + Network
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard Cards
          </TabsTrigger>
          <TabsTrigger value="sankey" className="flex items-center gap-2">
            <GitBranch className="w-4 h-4" />
            Sankey Flow
          </TabsTrigger>
          <TabsTrigger value="cluster" className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Cluster Map
          </TabsTrigger>
        </TabsList>

        {/* Approach 1: Matrix + Interactive Network */}
        <TabsContent value="matrix" className="space-y-4">
          <Card className="border">
            <CardHeader style={{ backgroundColor: '#395174' }}>
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <Grid3x3 className="w-4 h-4" />
                Matrix + Interactive Network
              </CardTitle>
              <CardDescription className="text-white/80 text-xs">
                Rows = individuals, columns = organizations. Click a cell to see overlaps.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="p-2 text-left font-semibold border-b" style={{ color: "#395174" }}>Person</th>
                        {sampleOrgs.map(org => (
                          <th key={org.id} className="p-2 text-center font-medium border-b text-xs" style={{ minWidth: 80 }}>
                            <span className="inline-block transform -rotate-45 origin-left whitespace-nowrap">
                              {org.name}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {samplePeople.map(person => (
                        <tr key={person.id} className="border-b hover:bg-muted/30">
                          <td className="p-2 font-medium">{person.name}</td>
                          {sampleOrgs.map(org => {
                            const isMember = person.orgs.includes(org.name);
                            const overlaps = getOverlapCount(person.name, org.name);
                            const isSelected = selectedCell?.person === person.name && selectedCell?.org === org.name;
                            return (
                              <td key={org.id} className="p-1 text-center">
                                {isMember && (
                                  <button
                                    onClick={() => setSelectedCell({ person: person.name, org: org.name })}
                                    className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold transition-all hover:scale-110 ${isSelected ? 'ring-2 ring-offset-2' : ''}`}
                                    style={{ 
                                      backgroundColor: org.color, 
                                      color: 'white'
                                    }}
                                    data-testid={`cell-${person.id}-${org.id}`}
                                  >
                                    {overlaps}
                                  </button>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-xs text-muted-foreground mt-3">
                    Numbers show how many other board members share that organization.
                  </p>
                </div>

                <div>
                  <Card className="border h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Network className="w-4 h-4" style={{ color: "#395174" }} />
                        Connection Detail
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedCell ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{selectedCell.person}</span>
                            <Button size="sm" variant="ghost" onClick={() => setSelectedCell(null)}>
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                          <Badge style={{ backgroundColor: sampleOrgs.find(o => o.name === selectedCell.org)?.color, color: 'white' }}>
                            {selectedCell.org}
                          </Badge>
                          <div className="pt-2 border-t">
                            <p className="text-xs text-muted-foreground mb-2">Also serves with:</p>
                            <div className="space-y-2">
                              {sampleOrgs.find(o => o.name === selectedCell.org)?.members
                                .filter(m => m !== selectedCell.person)
                                .map(member => (
                                  <div key={member} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                                    <Users className="w-3 h-3 text-muted-foreground" />
                                    <span className="text-sm">{member}</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-32 text-center">
                          <Eye className="w-8 h-8 text-muted-foreground/50 mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Click a colored cell to see overlapping connections
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

        {/* Approach 2: Dashboard Cards + Expandable Graph */}
        <TabsContent value="dashboard" className="space-y-4">
          <Card className="border">
            <CardHeader style={{ backgroundColor: '#395174' }}>
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard Cards + Expandable Graph
              </CardTitle>
              <CardDescription className="text-white/80 text-xs">
                Cards for each organization. Click to expand into a radial network.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sampleOrgs.map(org => (
                  <Card 
                    key={org.id} 
                    className={`border cursor-pointer transition-all hover-elevate ${expandedOrg === org.name ? 'ring-2' : ''}`}
                    style={{ borderColor: expandedOrg === org.name ? org.color : undefined }}
                    onClick={() => setExpandedOrg(expandedOrg === org.name ? null : org.name)}
                    data-testid={`card-org-${org.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: org.color }}
                            />
                            <h3 className="font-semibold">{org.name}</h3>
                          </div>
                          <Badge variant="secondary" className="text-xs mt-1">{org.sector}</Badge>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expandedOrg === org.name ? 'rotate-90' : ''}`} />
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {org.members.map(member => (
                          <Badge key={member} variant="outline" className="text-xs">
                            {member.split(' ')[0]}
                          </Badge>
                        ))}
                      </div>

                      {expandedOrg === org.name && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-xs text-muted-foreground mb-3">Network Connections:</p>
                          <div className="relative h-40 flex items-center justify-center">
                            <div 
                              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xs font-bold"
                              style={{ backgroundColor: org.color }}
                            >
                              {org.name.split(' ')[0]}
                            </div>
                            {org.members.map((member, idx) => {
                              const angle = (idx * 360) / org.members.length;
                              const x = Math.cos(angle * Math.PI / 180) * 60;
                              const y = Math.sin(angle * Math.PI / 180) * 60;
                              return (
                                <div
                                  key={member}
                                  className="absolute w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs"
                                  style={{ 
                                    transform: `translate(${x}px, ${y}px)`,
                                    border: `2px solid ${org.color}`
                                  }}
                                  title={member}
                                >
                                  {member.split(' ').map(n => n[0]).join('')}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Approach 3: Sankey Flow + Node Drill-Down */}
        <TabsContent value="sankey" className="space-y-4">
          <Card className="border">
            <CardHeader style={{ backgroundColor: '#395174' }}>
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                Sankey Flow + Node Drill-Down
              </CardTitle>
              <CardDescription className="text-white/80 text-xs">
                People on left, organizations on right. Click a person to drill down.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex justify-between">
                    <div className="space-y-2 w-40">
                      <p className="text-xs font-semibold text-muted-foreground mb-3">PEOPLE</p>
                      {samplePeople.map(person => (
                        <button
                          key={person.id}
                          onClick={() => setSelectedPerson(selectedPerson === person.name ? null : person.name)}
                          className={`w-full text-left p-2 rounded-md text-sm transition-all ${selectedPerson === person.name ? 'bg-muted font-medium' : 'hover:bg-muted/50'}`}
                          style={{ borderLeft: selectedPerson === person.name ? '3px solid #395174' : '3px solid transparent' }}
                          data-testid={`person-${person.id}`}
                        >
                          {person.name}
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex-1 px-4 relative">
                      <svg className="w-full h-64">
                        {samplePeople.map((person, pIdx) => 
                          person.orgs.map((orgName) => {
                            const org = sampleOrgs.find(o => o.name === orgName);
                            if (!org) return null;
                            const oIdx = sampleOrgs.indexOf(org);
                            const isHighlighted = selectedPerson === person.name;
                            return (
                              <path
                                key={`${person.id}-${org.id}`}
                                d={`M 0 ${pIdx * 40 + 20} C 100 ${pIdx * 40 + 20}, 150 ${oIdx * 40 + 20}, 250 ${oIdx * 40 + 20}`}
                                fill="none"
                                stroke={isHighlighted ? org.color : '#e5e7eb'}
                                strokeWidth={isHighlighted ? 3 : 1.5}
                                strokeOpacity={isHighlighted ? 1 : 0.5}
                              />
                            );
                          })
                        )}
                      </svg>
                    </div>
                    
                    <div className="space-y-2 w-44">
                      <p className="text-xs font-semibold text-muted-foreground mb-3">ORGANIZATIONS</p>
                      {sampleOrgs.map(org => (
                        <div
                          key={org.id}
                          className="p-2 rounded-md text-sm flex items-center gap-2"
                          style={{ borderLeft: `3px solid ${org.color}` }}
                        >
                          <Building2 className="w-3 h-3" style={{ color: org.color }} />
                          <span className="truncate">{org.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Card className="border h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Users className="w-4 h-4" style={{ color: "#395174" }} />
                        Person Drill-Down
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedPerson ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{selectedPerson}</span>
                            <Button size="sm" variant="ghost" onClick={() => setSelectedPerson(null)}>
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {samplePeople.find(p => p.name === selectedPerson)?.title}
                          </p>
                          <div className="pt-2 border-t space-y-2">
                            <p className="text-xs text-muted-foreground">Organizations:</p>
                            {samplePeople.find(p => p.name === selectedPerson)?.orgs.map(orgName => {
                              const org = sampleOrgs.find(o => o.name === orgName);
                              return (
                                <div key={orgName} className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: org?.color }} />
                                  <span className="text-sm">{orgName}</span>
                                </div>
                              );
                            })}
                          </div>
                          <div className="pt-2 border-t space-y-2">
                            <p className="text-xs text-muted-foreground">Connections ({getPersonConnections(selectedPerson).length}):</p>
                            {getPersonConnections(selectedPerson).map(conn => (
                              <div key={conn.name} className="p-2 rounded-md bg-muted/50">
                                <div className="text-sm font-medium">{conn.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  via {conn.sharedOrgs.join(', ')}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-48 text-center">
                          <Users className="w-8 h-8 text-muted-foreground/50 mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Click a person to see their connections
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

        {/* Approach 4: Cluster Map + Table Overlay */}
        <TabsContent value="cluster" className="space-y-4">
          <Card className="border">
            <CardHeader style={{ backgroundColor: '#395174' }}>
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Cluster Map + Table Overlay
              </CardTitle>
              <CardDescription className="text-white/80 text-xs">
                Organizations grouped by sector. Click a sector to see bridging individuals.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-4">SECTORS</p>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(clusterBySector()).map(([sector, orgs]) => (
                      <button
                        key={sector}
                        onClick={() => setSelectedCluster(selectedCluster === sector ? null : sector)}
                        className={`p-4 rounded-lg border text-left transition-all hover-elevate ${selectedCluster === sector ? 'ring-2' : ''}`}
                        style={{ 
                          borderColor: selectedCluster === sector ? orgs[0].color : undefined
                        }}
                        data-testid={`cluster-${sector}`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: orgs[0].color }}
                          />
                          <span className="font-medium text-sm">{sector}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {orgs.map(org => (
                            <Badge key={org.id} variant="secondary" className="text-xs">
                              {org.name.split(' ')[0]}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          {new Set(orgs.flatMap(o => o.members)).size} people
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Card className="border h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <ArrowRight className="w-4 h-4" style={{ color: "#395174" }} />
                        Bridging Individuals
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedCluster ? (
                        <div className="space-y-3">
                          <Badge style={{ backgroundColor: clusterBySector()[selectedCluster]?.[0]?.color, color: 'white' }}>
                            {selectedCluster}
                          </Badge>
                          <div className="pt-2">
                            <table className="w-full text-sm">
                              <thead>
                                <tr>
                                  <th className="text-left p-2 border-b font-medium">Person</th>
                                  <th className="text-left p-2 border-b font-medium">Organizations</th>
                                  <th className="text-center p-2 border-b font-medium">Bridges</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Array.from(new Set(clusterBySector()[selectedCluster]?.flatMap(o => o.members) || [])).map(memberName => {
                                  const person = samplePeople.find(p => p.name === memberName);
                                  const inClusterOrgs = person?.orgs.filter(o => 
                                    clusterBySector()[selectedCluster]?.some(co => co.name === o)
                                  ) || [];
                                  const bridgeOrgs = person?.orgs.filter(o => 
                                    !clusterBySector()[selectedCluster]?.some(co => co.name === o)
                                  ) || [];
                                  return (
                                    <tr key={memberName} className="border-b hover:bg-muted/30">
                                      <td className="p-2 font-medium">{memberName}</td>
                                      <td className="p-2 text-muted-foreground text-xs">
                                        {inClusterOrgs.join(', ')}
                                      </td>
                                      <td className="p-2 text-center">
                                        {bridgeOrgs.length > 0 ? (
                                          <Badge variant="outline" className="text-xs">
                                            {bridgeOrgs.length} other
                                          </Badge>
                                        ) : (
                                          <span className="text-xs text-muted-foreground">-</span>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-48 text-center">
                          <Layers className="w-8 h-8 text-muted-foreground/50 mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Click a sector to see who bridges to other areas
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Card className="mt-6 border" style={{ backgroundColor: 'rgba(57, 81, 116, 0.03)' }}>
                <CardContent className="p-4">
                  <h4 className="font-medium text-sm mb-3" style={{ color: "#395174" }}>Cross-Sector Overlap Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: "#395174" }}>{samplePeople.length}</div>
                      <div className="text-xs text-muted-foreground">Total People</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: "#7FA3A1" }}>{sampleOrgs.length}</div>
                      <div className="text-xs text-muted-foreground">Organizations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: "#E8923A" }}>{Object.keys(clusterBySector()).length}</div>
                      <div className="text-xs text-muted-foreground">Sectors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: "#9CB071" }}>
                        {samplePeople.filter(p => p.orgs.length > 1).length}
                      </div>
                      <div className="text-xs text-muted-foreground">Multi-Org Members</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2" style={{ color: "#395174" }}>
            <Sparkles className="w-5 h-5" />
            Approach Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left font-semibold">Approach</th>
                  <th className="p-3 text-left font-semibold">Best For</th>
                  <th className="p-3 text-left font-semibold">Strengths</th>
                  <th className="p-3 text-left font-semibold">Trade-offs</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-3 font-medium">Matrix + Network</td>
                  <td className="p-3 text-muted-foreground">Finding specific overlaps</td>
                  <td className="p-3 text-muted-foreground">Clean overview, precise data</td>
                  <td className="p-3 text-muted-foreground">Less visual context</td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-3 font-medium">Dashboard Cards</td>
                  <td className="p-3 text-muted-foreground">Executive summaries</td>
                  <td className="p-3 text-muted-foreground">Scannable, progressive disclosure</td>
                  <td className="p-3 text-muted-foreground">Limited cross-org view</td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-3 font-medium">Sankey Flow</td>
                  <td className="p-3 text-muted-foreground">Understanding distribution</td>
                  <td className="p-3 text-muted-foreground">Shows membership patterns</td>
                  <td className="p-3 text-muted-foreground">Complex with many nodes</td>
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="p-3 font-medium">Cluster Map</td>
                  <td className="p-3 text-muted-foreground">Sector-based analysis</td>
                  <td className="p-3 text-muted-foreground">Pattern recognition + precision</td>
                  <td className="p-3 text-muted-foreground">Requires sector metadata</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
