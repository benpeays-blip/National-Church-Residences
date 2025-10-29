import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useBoardMap } from "@/lib/boardMapStore";
import type { BoardMembership } from "@shared/schema";
import BoardCsvImport from "@/components/BoardCsvImport";
import BoardGraph from "@/components/BoardGraph";
import OverlapMatrix from "@/components/OverlapMatrix";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Network, Table2, Database } from "lucide-react";

export default function BoardNetworkMapper() {
  const { view, setView, setFilters, importRows, compute } = useBoardMap();
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [yearMin, setYearMin] = useState("");
  const [yearMax, setYearMax] = useState("");

  // Fetch board memberships from backend
  const { data: memberships, isLoading } = useQuery<BoardMembership[]>({
    queryKey: ["/api/board-network"],
  });

  // Load data into store when fetched
  useEffect(() => {
    if (memberships && memberships.length > 0) {
      const rows = memberships.map((m) => ({
        person_name: m.personName,
        person_email: m.personEmail || undefined,
        org_name: m.orgName,
        role: m.role || undefined,
        start_year: m.startYear || undefined,
        end_year: m.endYear || undefined,
      }));
      importRows(rows);
      compute();
    }
  }, [memberships, importRows, compute]);

  const applyFilters = () => {
    setFilters({
      query,
      roleFilter: roleFilter || undefined,
      yearMin: yearMin ? Number(yearMin) : undefined,
      yearMax: yearMax ? Number(yearMax) : undefined,
    });
    compute();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b bg-card p-6">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-semibold" data-testid="heading-page">
              Board Network Mapper
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Visualize board overlaps across organizations and identify shared
              connections
            </p>
          </div>

          {/* Import Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Import Board Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-3">
                Upload a CSV with columns: person_name, person_email (optional),
                org_name, role, start_year, end_year
              </div>
              <BoardCsvImport />
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Filters & View Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="view-select" className="text-xs">
                    Graph View
                  </Label>
                  <Select
                    value={view}
                    onValueChange={(v: "people" | "orgs") => setView(v)}
                  >
                    <SelectTrigger id="view-select" data-testid="select-view">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="people">People Graph</SelectItem>
                      <SelectItem value="orgs">Organization Graph</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="search-input" className="text-xs">
                    Search
                  </Label>
                  <Input
                    id="search-input"
                    placeholder="Person/Org name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    data-testid="input-search"
                  />
                </div>
                <div>
                  <Label htmlFor="role-filter" className="text-xs">
                    Role Filter
                  </Label>
                  <Input
                    id="role-filter"
                    placeholder="e.g., Director"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    data-testid="input-role-filter"
                  />
                </div>
                <div>
                  <Label htmlFor="year-min" className="text-xs">
                    Min Year
                  </Label>
                  <Input
                    id="year-min"
                    type="number"
                    placeholder="2020"
                    value={yearMin}
                    onChange={(e) => setYearMin(e.target.value)}
                    data-testid="input-year-min"
                  />
                </div>
                <div>
                  <Label htmlFor="year-max" className="text-xs">
                    Max Year
                  </Label>
                  <Input
                    id="year-max"
                    type="number"
                    placeholder="2025"
                    value={yearMax}
                    onChange={(e) => setYearMax(e.target.value)}
                    data-testid="input-year-max"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Button
                  onClick={applyFilters}
                  size="sm"
                  data-testid="button-apply-filters"
                >
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading board network data...
          </div>
        ) : (
          <Tabs defaultValue="network" className="space-y-6">
            <TabsList>
              <TabsTrigger value="network" data-testid="tab-network">
                <Network className="w-4 h-4 mr-2" />
                Network Graph
              </TabsTrigger>
              <TabsTrigger value="matrix" data-testid="tab-matrix">
                <Table2 className="w-4 h-4 mr-2" />
                Overlap Matrix
              </TabsTrigger>
              <TabsTrigger value="data" data-testid="tab-data">
                <Database className="w-4 h-4 mr-2" />
                Raw Data
              </TabsTrigger>
            </TabsList>

            <TabsContent value="network" className="space-y-4">
              <BoardGraph />
            </TabsContent>

            <TabsContent value="matrix">
              <OverlapMatrix />
            </TabsContent>

            <TabsContent value="data">
              <Card>
                <CardHeader>
                  <CardTitle>Board Memberships Data</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {memberships?.length || 0} total board memberships
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Person</th>
                          <th className="text-left p-2">Email</th>
                          <th className="text-left p-2">Organization</th>
                          <th className="text-left p-2">Role</th>
                          <th className="text-left p-2">Start Year</th>
                          <th className="text-left p-2">End Year</th>
                        </tr>
                      </thead>
                      <tbody>
                        {memberships?.slice(0, 100).map((m) => (
                          <tr key={m.id} className="border-b hover-elevate">
                            <td className="p-2">{m.personName}</td>
                            <td className="p-2 text-muted-foreground">
                              {m.personEmail || "—"}
                            </td>
                            <td className="p-2">{m.orgName}</td>
                            <td className="p-2 text-muted-foreground">
                              {m.role || "—"}
                            </td>
                            <td className="p-2 text-center">
                              {m.startYear || "—"}
                            </td>
                            <td className="p-2 text-center">
                              {m.endYear || "Current"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {memberships && memberships.length > 100 && (
                      <div className="text-sm text-muted-foreground text-center py-4">
                        Showing first 100 of {memberships.length} records
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
