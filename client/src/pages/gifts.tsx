import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Gift } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Gifts() {
  const { data: gifts, isLoading } = useQuery<Gift[]>({
    queryKey: ["/api/gifts"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">Gifts</h1>
        <Skeleton className="h-96" />
      </div>
    );
  }

  const totalRaised = gifts?.reduce((sum, g) => sum + parseFloat(g.amount), 0) ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Gifts</h1>
          <p className="text-muted-foreground">
            Track all donations and contributions
          </p>
        </div>
        <DollarSign className="w-8 h-8 text-muted-foreground" />
      </div>

      <Card className="p-6">
        <div className="space-y-2 mb-6">
          <p className="text-sm font-medium text-muted-foreground">Total Raised</p>
          <p className="text-4xl font-bold">{formatCurrency(totalRaised)}</p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Payment Method</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gifts?.map((gift) => (
              <TableRow key={gift.id}>
                <TableCell>{formatDate(gift.receivedAt)}</TableCell>
                <TableCell className="font-medium">
                  {formatCurrency(gift.amount)}
                </TableCell>
                <TableCell>{gift.designation || "General"}</TableCell>
                <TableCell className="text-muted-foreground">
                  {gift.paymentMethod || "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
