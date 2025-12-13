import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Target } from "lucide-react";

type OpportunityFilter = "all" | "friend-to-partner" | "colleague-to-partner" | "acquaintance-to-colleague";

interface ActionableOpportunity {
  id: string;
  donorName: string;
  currentQuadrant: "Friend" | "Colleague" | "Acquaintance" | "Partner";
  whyNow: string;
  recommendedMove: string;
  estimatedImpact: "High" | "Med-High" | "Medium" | "Low";
  owner: string;
  transitionType: "friend-to-partner" | "colleague-to-partner" | "acquaintance-to-colleague";
}

const mockOpportunities: ActionableOpportunity[] = [
  {
    id: "1",
    donorName: "Alice Hart",
    currentQuadrant: "Friend",
    whyNow: "Attended two events, no 1:1 follow-up",
    recommendedMove: "60-min coffee; explore project fit",
    estimatedImpact: "High",
    owner: "Sarah",
    transitionType: "friend-to-partner"
  },
  {
    id: "2",
    donorName: "Daniel King",
    currentQuadrant: "Colleague",
    whyNow: "Increased recurring gift last month",
    recommendedMove: "Call to discuss multi-year pledge",
    estimatedImpact: "Med-High",
    owner: "Ben",
    transitionType: "colleague-to-partner"
  },
  {
    id: "3",
    donorName: "Patricia Chen",
    currentQuadrant: "Friend",
    whyNow: "Mentioned legacy planning in recent email",
    recommendedMove: "Schedule planned giving conversation",
    estimatedImpact: "High",
    owner: "Maria",
    transitionType: "friend-to-partner"
  },
  {
    id: "4",
    donorName: "Robert Morrison",
    currentQuadrant: "Colleague",
    whyNow: "Asked about capital campaign at gala",
    recommendedMove: "Present campaign case for support",
    estimatedImpact: "Med-High",
    owner: "Sarah",
    transitionType: "colleague-to-partner"
  },
  {
    id: "5",
    donorName: "Lisa Rodriguez",
    currentQuadrant: "Acquaintance",
    whyNow: "Opened last 3 emails, clicked donation link",
    recommendedMove: "Phone call to gauge interest",
    estimatedImpact: "Medium",
    owner: "James",
    transitionType: "acquaintance-to-colleague"
  },
  {
    id: "6",
    donorName: "Michael Thompson",
    currentQuadrant: "Friend",
    whyNow: "Spouse serves on hospital board",
    recommendedMove: "Invite to VIP donor recognition event",
    estimatedImpact: "High",
    owner: "Ben",
    transitionType: "friend-to-partner"
  },
  {
    id: "7",
    donorName: "Jennifer Wu",
    currentQuadrant: "Colleague",
    whyNow: "Matched corporate gift at maximum level",
    recommendedMove: "Explore beyond-match major gift",
    estimatedImpact: "Med-High",
    owner: "Maria",
    transitionType: "colleague-to-partner"
  },
  {
    id: "8",
    donorName: "David Patel",
    currentQuadrant: "Acquaintance",
    whyNow: "Attended first event last week",
    recommendedMove: "Follow-up thank you call",
    estimatedImpact: "Medium",
    owner: "Sarah",
    transitionType: "acquaintance-to-colleague"
  },
  {
    id: "9",
    donorName: "Amanda Foster",
    currentQuadrant: "Friend",
    whyNow: "Referred two new major donors this year",
    recommendedMove: "Invite to join development committee",
    estimatedImpact: "High",
    owner: "James",
    transitionType: "friend-to-partner"
  },
  {
    id: "10",
    donorName: "Christopher Lee",
    currentQuadrant: "Colleague",
    whyNow: "Wealth screening shows $5M+ capacity",
    recommendedMove: "Research proposal for naming opportunity",
    estimatedImpact: "Med-High",
    owner: "Ben",
    transitionType: "colleague-to-partner"
  }
];

export default function QuadrantTop10() {
  const [opportunityFilter, setOpportunityFilter] = useState<OpportunityFilter>("all");

  const filteredOpportunities = mockOpportunities.filter(opp => {
    if (opportunityFilter === "all") return true;
    return opp.transitionType === opportunityFilter;
  });

  const getImpactVariant = (impact: string): "destructive" | "secondary" | "outline" | "default" => {
    switch (impact) {
      case "High":
        return "destructive";
      case "Med-High":
        return "secondary";
      case "Medium":
        return "outline";
      default:
        return "outline";
    }
  };

  const getQuadrantVariant = (_quadrant: string): "secondary" | "outline" | "default" => {
    return "secondary";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <CardTitle>Top 10 Actionable Opportunities</CardTitle>
            </div>
            <CardDescription>
              Priority donor engagement opportunities based on scoring logic
            </CardDescription>
          </div>
          <Select value={opportunityFilter} onValueChange={(value) => setOpportunityFilter(value as OpportunityFilter)}>
            <SelectTrigger className="w-56" data-testid="select-opportunity-filter">
              <SelectValue placeholder="Filter opportunities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All quadrants</SelectItem>
              <SelectItem value="friend-to-partner">Friend → Partner</SelectItem>
              <SelectItem value="colleague-to-partner">Colleague → Partner</SelectItem>
              <SelectItem value="acquaintance-to-colleague">Acquaintance → Colleague</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead>Current Quadrant</TableHead>
                <TableHead className="min-w-[250px]">Why Now</TableHead>
                <TableHead className="min-w-[250px]">Recommended Move</TableHead>
                <TableHead>Est. Impact</TableHead>
                <TableHead>Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOpportunities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No opportunities found for the selected filter
                  </TableCell>
                </TableRow>
              ) : (
                filteredOpportunities.map((opp) => (
                  <TableRow key={opp.id} data-testid={`row-opportunity-${opp.id}`}>
                    <TableCell className="font-medium">{opp.donorName}</TableCell>
                    <TableCell>
                      <Badge variant={getQuadrantVariant(opp.currentQuadrant)}>
                        {opp.currentQuadrant}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{opp.whyNow}</TableCell>
                    <TableCell className="text-sm">
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                        <span>{opp.recommendedMove}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getImpactVariant(opp.estimatedImpact)}>
                        {opp.estimatedImpact}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{opp.owner}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
