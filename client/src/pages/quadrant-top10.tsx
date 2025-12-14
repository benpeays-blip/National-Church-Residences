import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Target, ChevronDown } from "lucide-react";

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
  },
  {
    id: "11",
    donorName: "Sarah Mitchell",
    currentQuadrant: "Friend",
    whyNow: "Recently retired, expressed interest in giving back",
    recommendedMove: "Schedule lunch meeting to discuss legacy",
    estimatedImpact: "High",
    owner: "Sarah",
    transitionType: "friend-to-partner"
  },
  {
    id: "12",
    donorName: "William Garcia",
    currentQuadrant: "Acquaintance",
    whyNow: "Attended virtual tour, asked follow-up questions",
    recommendedMove: "Send personalized impact report",
    estimatedImpact: "Medium",
    owner: "James",
    transitionType: "acquaintance-to-colleague"
  },
  {
    id: "13",
    donorName: "Elizabeth Brown",
    currentQuadrant: "Colleague",
    whyNow: "Anniversary of first major gift approaching",
    recommendedMove: "Plan stewardship call and thank you",
    estimatedImpact: "Med-High",
    owner: "Maria",
    transitionType: "colleague-to-partner"
  },
  {
    id: "14",
    donorName: "James Wilson",
    currentQuadrant: "Friend",
    whyNow: "Children now out of college, more disposable income",
    recommendedMove: "Present endowment giving options",
    estimatedImpact: "High",
    owner: "Ben",
    transitionType: "friend-to-partner"
  },
  {
    id: "15",
    donorName: "Margaret Taylor",
    currentQuadrant: "Acquaintance",
    whyNow: "Opened and shared newsletter on social media",
    recommendedMove: "Invite to upcoming donor appreciation event",
    estimatedImpact: "Medium",
    owner: "Sarah",
    transitionType: "acquaintance-to-colleague"
  },
  {
    id: "16",
    donorName: "Richard Anderson",
    currentQuadrant: "Colleague",
    whyNow: "Recently sold business for significant profit",
    recommendedMove: "Discuss stock gift or DAF contribution",
    estimatedImpact: "High",
    owner: "Maria",
    transitionType: "colleague-to-partner"
  },
  {
    id: "17",
    donorName: "Nancy Martinez",
    currentQuadrant: "Friend",
    whyNow: "Volunteered at three events this quarter",
    recommendedMove: "Offer board observer role",
    estimatedImpact: "Med-High",
    owner: "James",
    transitionType: "friend-to-partner"
  },
  {
    id: "18",
    donorName: "Thomas Jackson",
    currentQuadrant: "Acquaintance",
    whyNow: "Registered for upcoming gala",
    recommendedMove: "Personal welcome call before event",
    estimatedImpact: "Medium",
    owner: "Ben",
    transitionType: "acquaintance-to-colleague"
  },
  {
    id: "19",
    donorName: "Karen White",
    currentQuadrant: "Friend",
    whyNow: "Asked about impact of previous gifts",
    recommendedMove: "Schedule site visit to see programs",
    estimatedImpact: "High",
    owner: "Sarah",
    transitionType: "friend-to-partner"
  },
  {
    id: "20",
    donorName: "Charles Harris",
    currentQuadrant: "Colleague",
    whyNow: "Mentioned in conversation with board member",
    recommendedMove: "Arrange introduction to CEO",
    estimatedImpact: "Med-High",
    owner: "Maria",
    transitionType: "colleague-to-partner"
  },
  {
    id: "21",
    donorName: "Dorothy Clark",
    currentQuadrant: "Acquaintance",
    whyNow: "First-time donor last month",
    recommendedMove: "Send handwritten thank you note",
    estimatedImpact: "Medium",
    owner: "James",
    transitionType: "acquaintance-to-colleague"
  },
  {
    id: "22",
    donorName: "Joseph Lewis",
    currentQuadrant: "Friend",
    whyNow: "Company has new CSR initiative",
    recommendedMove: "Propose corporate partnership opportunity",
    estimatedImpact: "High",
    owner: "Ben",
    transitionType: "friend-to-partner"
  },
  {
    id: "23",
    donorName: "Betty Robinson",
    currentQuadrant: "Colleague",
    whyNow: "Upgraded giving level twice this year",
    recommendedMove: "Invite to major donor circle",
    estimatedImpact: "Med-High",
    owner: "Sarah",
    transitionType: "colleague-to-partner"
  },
  {
    id: "24",
    donorName: "Steven Walker",
    currentQuadrant: "Friend",
    whyNow: "Celebrating 10-year donor anniversary",
    recommendedMove: "Plan special recognition and ask",
    estimatedImpact: "High",
    owner: "Maria",
    transitionType: "friend-to-partner"
  },
  {
    id: "25",
    donorName: "Susan Hall",
    currentQuadrant: "Acquaintance",
    whyNow: "Responded positively to survey",
    recommendedMove: "Follow up with program information",
    estimatedImpact: "Medium",
    owner: "James",
    transitionType: "acquaintance-to-colleague"
  },
  {
    id: "26",
    donorName: "Edward Young",
    currentQuadrant: "Colleague",
    whyNow: "Professional connection to new board member",
    recommendedMove: "Request introduction through board",
    estimatedImpact: "Med-High",
    owner: "Ben",
    transitionType: "colleague-to-partner"
  },
  {
    id: "27",
    donorName: "Helen King",
    currentQuadrant: "Friend",
    whyNow: "Expressed interest in scholarship fund",
    recommendedMove: "Present named scholarship opportunity",
    estimatedImpact: "High",
    owner: "Sarah",
    transitionType: "friend-to-partner"
  },
  {
    id: "28",
    donorName: "George Wright",
    currentQuadrant: "Acquaintance",
    whyNow: "Referred by existing major donor",
    recommendedMove: "Schedule introduction meeting",
    estimatedImpact: "Medium",
    owner: "Maria",
    transitionType: "acquaintance-to-colleague"
  },
  {
    id: "29",
    donorName: "Barbara Lopez",
    currentQuadrant: "Friend",
    whyNow: "Recently mentioned estate planning",
    recommendedMove: "Connect with planned giving officer",
    estimatedImpact: "High",
    owner: "James",
    transitionType: "friend-to-partner"
  },
  {
    id: "30",
    donorName: "Kenneth Scott",
    currentQuadrant: "Colleague",
    whyNow: "Family foundation reviewing grant priorities",
    recommendedMove: "Submit grant proposal package",
    estimatedImpact: "Med-High",
    owner: "Ben",
    transitionType: "colleague-to-partner"
  }
];

export default function QuadrantTop10() {
  const [opportunityFilter, setOpportunityFilter] = useState<OpportunityFilter>("all");
  const [visibleCount, setVisibleCount] = useState(10);

  const filteredOpportunities = mockOpportunities.filter(opp => {
    if (opportunityFilter === "all") return true;
    return opp.transitionType === opportunityFilter;
  });

  const visibleOpportunities = filteredOpportunities.slice(0, visibleCount);

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
    <Card className="border-0 shadow-none">
      <CardHeader 
        className="p-6 pb-4"
        style={{ backgroundColor: "rgba(222, 235, 247, 0.5)" }}
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>TOP 10 ACTIONABLE OPPORTUNITIES</CardTitle>
              <CardDescription className="mt-1">
                Priority donor engagement opportunities based on scoring logic
              </CardDescription>
            </div>
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
                visibleOpportunities.map((opp) => (
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
        {visibleCount < filteredOpportunities.length && (
          <div className="flex justify-center mt-4">
            <Button 
              variant="outline" 
              onClick={() => setVisibleCount(prev => prev + 10)}
              className="gap-2"
              data-testid="button-show-more"
            >
              Show More
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        )}
        {visibleCount >= filteredOpportunities.length && filteredOpportunities.length > 10 && (
          <p className="text-center text-sm text-muted-foreground mt-4">
            Showing all {filteredOpportunities.length} opportunities
          </p>
        )}
      </CardContent>
    </Card>
  );
}
