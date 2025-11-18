import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { DonorCard } from "@/components/donor-card";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Search, LayoutGrid, List } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Person } from "@shared/schema";

type ViewMode = "gallery" | "list";

export default function Donors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("gallery");
  const [, setLocation] = useLocation();
  const { data: donors, isLoading } = useQuery<Person[]>({
    queryKey: ["/api/persons", searchQuery],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Donors</h1>
          <p className="text-sm text-muted-foreground">
            Manage your donor relationships and data
          </p>
        </div>
        <Button data-testid="button-add-donor">
          <Plus className="w-4 h-4 mr-2" />
          Add Donor
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search donors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-donors"
          />
        </div>
        <div className="flex items-center gap-1 border rounded-lg p-1">
          <Button
            variant={viewMode === "gallery" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("gallery")}
            data-testid="button-view-gallery"
            className="h-8 w-8"
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
            data-testid="button-view-list"
            className="h-8 w-8"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        viewMode === "gallery" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        )
      ) : donors && donors.length > 0 ? (
        viewMode === "gallery" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {donors.map((donor) => (
              <DonorCard
                key={donor.id}
                donor={donor}
                onSelect={(d) => setLocation(`/donors/${d.id}`)}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {donors.map((donor) => (
                  <div
                    key={donor.id}
                    className="p-4 hover-elevate active-elevate-2 cursor-pointer flex items-center justify-between gap-4"
                    onClick={() => setLocation(`/donors/${donor.id}`)}
                    data-testid={`row-donor-${donor.id}`}
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-primary">
                          {donor.firstName?.[0]}{donor.lastName?.[0]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold truncate">
                            {donor.firstName} {donor.lastName}
                          </h3>
                          {donor.wealthBand && (
                            <Badge variant="outline" className="text-xs flex-shrink-0">
                              {donor.wealthBand}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          {donor.primaryEmail && (
                            <span className="truncate">{donor.primaryEmail}</span>
                          )}
                          {donor.organizationName && (
                            <>
                              <span>•</span>
                              <span className="truncate">{donor.organizationName}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 flex-shrink-0">
                      {donor.totalLifetimeGiving !== null && donor.totalLifetimeGiving !== undefined && (
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground mb-0.5">Total Giving</div>
                          <div className="text-sm font-semibold">
                            ${Number(donor.totalLifetimeGiving).toLocaleString()}
                          </div>
                        </div>
                      )}
                      {(donor.engagementScore !== null && donor.engagementScore !== undefined) && (
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground mb-0.5">Engagement</div>
                          <div className="text-sm font-semibold">{donor.engagementScore}</div>
                        </div>
                      )}
                      {(donor.capacityScore !== null && donor.capacityScore !== undefined) && (
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground mb-0.5">Capacity</div>
                          <div className="text-sm font-semibold">{donor.capacityScore}</div>
                        </div>
                      )}
                      {(donor.affinityScore !== null && donor.affinityScore !== undefined) && (
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground mb-0.5">Affinity</div>
                          <div className="text-sm font-semibold">{donor.affinityScore}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      ) : (
        <EmptyState
          icon={Users}
          title="No donors found"
          description="Get started by adding your first donor to the system."
          actionLabel="Add Donor"
          onAction={() => {}}
        />
      )}
    </div>
  );
}
