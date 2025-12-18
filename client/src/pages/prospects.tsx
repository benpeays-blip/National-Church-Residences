import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UserPlus,
  Search,
  Building2,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Users,
  Sparkles,
  Target,
  DollarSign,
} from "lucide-react";

type ProspectStage = "all" | "identified" | "qualified" | "cultivating" | "solicitation-ready";

interface Prospect {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  organization: string | null;
  title: string | null;
  source: string;
  stage: "identified" | "qualified" | "cultivating" | "solicitation-ready";
  estimatedCapacity: number;
  affinity: number;
  assignedTo: string;
  addedDate: string;
  lastContact: string | null;
  notes: string | null;
}

const stageOptions: { value: ProspectStage; label: string }[] = [
  { value: "all", label: "All Stages" },
  { value: "identified", label: "Identified" },
  { value: "qualified", label: "Qualified" },
  { value: "cultivating", label: "Cultivating" },
  { value: "solicitation-ready", label: "Solicitation Ready" },
];

const stageColors: Record<string, string> = {
  identified: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  qualified: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  cultivating: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  "solicitation-ready": "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
};

const mockProspects: Prospect[] = [
  {
    id: "p1",
    firstName: "David",
    lastName: "Chen",
    email: "david.chen@techcorp.com",
    phone: "(555) 234-5678",
    organization: "TechCorp Industries",
    title: "Chief Executive Officer",
    source: "Board Referral",
    stage: "solicitation-ready",
    estimatedCapacity: 250000,
    affinity: 85,
    assignedTo: "Sarah Mitchell",
    addedDate: "2024-08-15",
    lastContact: "2024-12-10",
    notes: "Met at annual gala. Very interested in education initiatives.",
  },
  {
    id: "p2",
    firstName: "Patricia",
    lastName: "Hoffman",
    email: "phoffman@hoffmanfoundation.org",
    phone: "(555) 345-6789",
    organization: "Hoffman Family Foundation",
    title: "Executive Director",
    source: "Wealth Screening",
    stage: "cultivating",
    estimatedCapacity: 500000,
    affinity: 72,
    assignedTo: "Michael Torres",
    addedDate: "2024-09-20",
    lastContact: "2024-11-28",
    notes: "Foundation focuses on healthcare. Schedule facility tour.",
  },
  {
    id: "p3",
    firstName: "James",
    lastName: "Wellington",
    email: "jwellington@wellington.com",
    phone: "(555) 456-7890",
    organization: "Wellington Capital",
    title: "Managing Partner",
    source: "Event Attendee",
    stage: "qualified",
    estimatedCapacity: 150000,
    affinity: 60,
    assignedTo: "Sarah Mitchell",
    addedDate: "2024-10-05",
    lastContact: "2024-11-15",
    notes: "Attended charity auction. Follow up on matching gift program.",
  },
  {
    id: "p4",
    firstName: "Margaret",
    lastName: "Liu",
    email: "mliu@innovate-ventures.com",
    phone: "(555) 567-8901",
    organization: "Innovate Ventures",
    title: "Founder & CEO",
    source: "Research",
    stage: "identified",
    estimatedCapacity: 100000,
    affinity: 45,
    assignedTo: "Jessica Park",
    addedDate: "2024-11-01",
    lastContact: null,
    notes: "New tech entrepreneur. Known philanthropist in other communities.",
  },
  {
    id: "p5",
    firstName: "Richard",
    lastName: "Blackwell",
    email: "rblackwell@blackwellgroup.com",
    phone: "(555) 678-9012",
    organization: "Blackwell Investment Group",
    title: "Chairman",
    source: "Peer Referral",
    stage: "cultivating",
    estimatedCapacity: 750000,
    affinity: 78,
    assignedTo: "Michael Torres",
    addedDate: "2024-07-22",
    lastContact: "2024-12-05",
    notes: "Long-time friend of board member. Interested in scholarship fund.",
  },
  {
    id: "p6",
    firstName: "Susan",
    lastName: "Nakamura",
    email: "snakamura@globalhealth.org",
    phone: "(555) 789-0123",
    organization: "Global Health Initiative",
    title: "Board Chair",
    source: "Conference",
    stage: "qualified",
    estimatedCapacity: 200000,
    affinity: 68,
    assignedTo: "Sarah Mitchell",
    addedDate: "2024-09-10",
    lastContact: "2024-10-30",
    notes: "Met at nonprofit leadership summit. Schedule introductory call.",
  },
  {
    id: "p7",
    firstName: "Thomas",
    lastName: "Reeves",
    email: "treeves@reeves-law.com",
    phone: "(555) 890-1234",
    organization: "Reeves & Partners LLP",
    title: "Senior Partner",
    source: "Community Event",
    stage: "identified",
    estimatedCapacity: 75000,
    affinity: 40,
    assignedTo: "Jessica Park",
    addedDate: "2024-11-20",
    lastContact: null,
    notes: "Active in local business community. Needs initial qualification.",
  },
  {
    id: "p8",
    firstName: "Catherine",
    lastName: "Okonkwo",
    email: "cokonkwo@okonkwo-enterprises.com",
    phone: "(555) 901-2345",
    organization: "Okonkwo Enterprises",
    title: "President",
    source: "Donor Referral",
    stage: "solicitation-ready",
    estimatedCapacity: 180000,
    affinity: 92,
    assignedTo: "Michael Torres",
    addedDate: "2024-06-15",
    lastContact: "2024-12-12",
    notes: "Sister of major donor. Ready for ask meeting.",
  },
];

export default function Prospects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<ProspectStage>("all");
  const [, setLocation] = useLocation();

  const filteredProspects = mockProspects.filter((prospect) => {
    const matchesSearch =
      searchQuery === "" ||
      `${prospect.firstName} ${prospect.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prospect.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prospect.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStage = stageFilter === "all" || prospect.stage === stageFilter;

    return matchesSearch && matchesStage;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const totalPipeline = mockProspects.reduce((sum, p) => sum + p.estimatedCapacity, 0);
  const solicitationReady = mockProspects.filter((p) => p.stage === "solicitation-ready").length;
  const cultivating = mockProspects.filter((p) => p.stage === "cultivating").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Prospects</h1>
          <p className="text-sm text-muted-foreground">
            Track and cultivate potential new donors
          </p>
        </div>
        <Button data-testid="button-add-prospect">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Prospect
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{mockProspects.length}</div>
                <div className="text-xs text-muted-foreground">Total Prospects</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{solicitationReady}</div>
                <div className="text-xs text-muted-foreground">Ready to Ask</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900">
                <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{cultivating}</div>
                <div className="text-xs text-muted-foreground">Cultivating</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{formatCurrency(totalPipeline)}</div>
                <div className="text-xs text-muted-foreground">Pipeline Value</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search prospects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-prospects"
          />
        </div>
        <Select value={stageFilter} onValueChange={(value: ProspectStage) => setStageFilter(value)}>
          <SelectTrigger className="w-48" data-testid="select-stage-filter">
            <SelectValue placeholder="Filter by stage" />
          </SelectTrigger>
          <SelectContent>
            {stageOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredProspects.map((prospect) => (
              <div
                key={prospect.id}
                className="p-4 hover-elevate active-elevate-2 cursor-pointer"
                onClick={() => setLocation(`/donors/${prospect.id}`)}
                data-testid={`row-prospect-${prospect.id}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {prospect.firstName[0]}{prospect.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold">
                          {prospect.firstName} {prospect.lastName}
                        </h3>
                        <Badge className={stageColors[prospect.stage]}>
                          {prospect.stage === "solicitation-ready" ? "Solicitation Ready" : 
                           prospect.stage.charAt(0).toUpperCase() + prospect.stage.slice(1)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {prospect.source}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                        {prospect.organization && (
                          <div className="flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            <span>{prospect.title} at {prospect.organization}</span>
                          </div>
                        )}
                        {prospect.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            <span>{prospect.email}</span>
                          </div>
                        )}
                      </div>
                      {prospect.notes && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
                          {prospect.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-6 flex-shrink-0">
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground mb-0.5">Est. Capacity</div>
                      <div className="font-semibold text-primary">
                        {formatCurrency(prospect.estimatedCapacity)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground mb-0.5">Affinity</div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-green-600" />
                        <span className="font-semibold">{prospect.affinity}</span>
                      </div>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <div className="text-xs text-muted-foreground mb-0.5">Last Contact</div>
                      <div className="text-sm">
                        {prospect.lastContact ? formatDate(prospect.lastContact) : "Not yet"}
                      </div>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <div className="text-xs text-muted-foreground mb-0.5">Assigned To</div>
                      <div className="text-sm">{prospect.assignedTo}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredProspects.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                <UserPlus className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="font-medium">No prospects found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
