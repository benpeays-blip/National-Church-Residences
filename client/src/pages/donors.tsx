import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { DonorCard } from "@/components/donor-card";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Search, LayoutGrid, List, DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { Person } from "@shared/schema";

type ViewMode = "gallery" | "list";
type GiftFilter = "all" | "1000" | "5000" | "10000" | "25000" | "50000" | "100000";

const giftFilterOptions: { value: GiftFilter; label: string }[] = [
  { value: "all", label: "All Donors" },
  { value: "1000", label: "$1,000+" },
  { value: "5000", label: "$5,000+" },
  { value: "10000", label: "$10,000+" },
  { value: "25000", label: "$25,000+" },
  { value: "50000", label: "$50,000+" },
  { value: "100000", label: "$100,000+" },
];

export default function Donors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("gallery");
  const [giftFilter, setGiftFilter] = useState<GiftFilter>("all");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { data: donors, isLoading } = useQuery<Person[]>({
    queryKey: ["/api/persons", searchQuery],
  });

  const handleAddDonor = () => {
    toast({
      title: "Add Donor",
      description: "Donor creation form coming soon. This feature is under development.",
    });
  };

  const filteredDonors = donors?.filter((donor) => {
    if (giftFilter === "all") return true;
    const minAmount = parseInt(giftFilter);
    const donorGiving = parseFloat(String(donor.totalLifetimeGiving || 0));
    return donorGiving >= minAmount;
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
        <Button onClick={handleAddDonor} data-testid="button-add-donor">
          <Plus className="w-4 h-4 mr-2" />
          Add Donor
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search donors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-80"
              data-testid="input-search-donors"
            />
          </div>
          <Select value={giftFilter} onValueChange={(value: GiftFilter) => setGiftFilter(value)}>
            <SelectTrigger className="w-40" data-testid="select-gift-filter">
              <DollarSign className="w-4 h-4 mr-1 text-muted-foreground" />
              <SelectValue placeholder="Filter by amount" />
            </SelectTrigger>
            <SelectContent>
              {giftFilterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} data-testid={`option-gift-${option.value}`}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
      ) : filteredDonors && filteredDonors.length > 0 ? (
        viewMode === "gallery" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDonors.map((donor) => (
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
                {filteredDonors.map((donor) => (
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
          onAction={handleAddDonor}
        />
      )}
    </div>
  );
}
