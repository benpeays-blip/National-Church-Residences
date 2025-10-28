import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DonorCard } from "@/components/donor-card";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Plus, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Person } from "@shared/schema";

export default function Donors() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: donors, isLoading } = useQuery<Person[]>({
    queryKey: ["/api/persons", searchQuery],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Donors</h1>
          <p className="text-muted-foreground">
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
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      ) : donors && donors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {donors.map((donor) => (
            <DonorCard key={donor.id} donor={donor} />
          ))}
        </div>
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
