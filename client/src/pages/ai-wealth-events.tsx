import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, DollarSign, ExternalLink, TrendingUp } from "lucide-react";
import type { Person, WealthEvent } from "@shared/schema";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface WealthEventData {
  event: WealthEvent;
  person: Person;
}

export default function AIWealthEvents() {
  const { data: events, isLoading } = useQuery<WealthEventData[]>({
    queryKey: ["/api/ai/wealth-events"],
  });

  const getEventTypeBadge = (type: string) => {
    const colors: Record<string, "default" | "secondary" | "outline"> = {
      stock_sale: "default",
      ipo: "default",
      property_sale: "secondary",
      promotion: "outline",
      inheritance: "secondary",
      business_sale: "default",
    };
    return colors[type] || "outline";
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Real-Time Wealth Event Monitoring</h1>
        <p className="text-muted-foreground">
          Automated alerts when donors have liquidity events - IPOs, stock sales, real estate transactions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <AlertCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unverified</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {events?.filter((e) => e.event.verified === 0).length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${events?.reduce((sum, e) => sum + Number(e.event.estimatedValue || 0), 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts Sent</CardTitle>
            <AlertCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {events?.filter((e) => e.event.alertSent === 1).length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Wealth Events</CardTitle>
          <CardDescription>Liquidity events from SEC filings, LinkedIn, property records</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (<Skeleton key={i} className="h-16 w-full" />))}
            </div>
          ) : events && events.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor</TableHead>
                    <TableHead>Event Type</TableHead>
                    <TableHead>Estimated Value</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((item) => (
                    <TableRow key={item.event.id}>
                      <TableCell className="font-medium">
                        {item.person.firstName} {item.person.lastName}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getEventTypeBadge(item.event.eventType || "other")}>
                          {item.event.eventType?.replace("_", " ").toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        ${Number(item.event.estimatedValue || 0).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {item.event.source}
                          {item.event.sourceUrl && (
                            <a href={item.event.sourceUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.event.eventDate ? new Date(item.event.eventDate).toLocaleDateString() : "N/A"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.event.verified === 1 ? "default" : "secondary"}>
                          {item.event.verified === 1 ? "Verified" : "Pending"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Wealth Events Detected</h3>
              <p className="text-muted-foreground">System is monitoring SEC filings, LinkedIn, and property records</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
