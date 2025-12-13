import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Search,
  Sparkles,
  Filter,
  Calendar,
  DollarSign,
  MapPin,
  Building2,
  Target,
  TrendingUp,
  BookmarkPlus,
  Bell,
  ExternalLink,
  ChevronRight,
  Users,
  Eye,
  Clock,
  Lightbulb,
  Star,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowUpRight,
  Bookmark,
  RefreshCw,
  Zap,
  FileText,
  Home,
  Heart,
  GraduationCap,
  Leaf,
  Stethoscope,
  Palette,
  X,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface GrantOpportunity {
  id: string;
  title: string;
  funder: string;
  funderType: "Foundation" | "Corporate" | "Government" | "Family Foundation";
  amountMin: number;
  amountMax: number;
  deadline: Date;
  geography: string[];
  focusAreas: string[];
  fundingType: "General Operating" | "Project" | "Capital" | "Capacity Building" | "Research";
  matchScore: number;
  eligibilityStatus: "Eligible" | "Likely Eligible" | "Needs Review" | "Not Eligible";
  source: string;
  lastUpdated: Date;
  description: string;
  eligibilityHighlights: string[];
  applicationUrl?: string;
  openToNewGrantees: boolean;
  avgGrantAmount: number;
  totalAnnualGiving: number;
}

interface FunderProfile {
  id: string;
  name: string;
  type: "Foundation" | "Corporate" | "Family Foundation";
  website?: string;
  givingAreas: string[];
  avgGrantAmount: number;
  totalAnnualGiving: number;
  grantCount: number;
  geographyFocus: string[];
  openToNewGrantees: boolean;
  topRecipients: { name: string; amount: number }[];
  givingTrend: "Increasing" | "Stable" | "Decreasing";
  preferredGrantTypes: string[];
  ein: string;
}

interface PeerOrganization {
  id: string;
  name: string;
  similarityScore: number;
  sharedFocusAreas: string[];
  sharedFunders: { name: string; amount: number }[];
  location: string;
  annualBudget: number;
}

interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: Record<string, any>;
  alertEnabled: boolean;
  lastRun: Date;
  resultsCount: number;
}

const FOCUS_AREAS = [
  { id: "housing", label: "Affordable Housing", icon: Home },
  { id: "healthcare", label: "Healthcare & Wellness", icon: Stethoscope },
  { id: "seniors", label: "Senior Services", icon: Users },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "environment", label: "Environment", icon: Leaf },
  { id: "arts", label: "Arts & Culture", icon: Palette },
  { id: "community", label: "Community Development", icon: Heart },
];

const FUNDING_TYPES = [
  "General Operating",
  "Project",
  "Capital",
  "Capacity Building",
  "Research",
];

const GEOGRAPHIES = [
  "National",
  "Ohio",
  "Midwest",
  "Columbus Metro",
  "Central Ohio",
  "Multi-State",
];

const QUICK_PROMPTS = [
  { label: "Senior housing & care", query: "Grants for senior housing and healthcare services" },
  { label: "Affordable housing", query: "Foundation grants for affordable housing development" },
  { label: "Healthcare access", query: "Funding for community health and wellness programs" },
  { label: "Capital projects", query: "Capital campaign grants for facility improvements" },
  { label: "General operating", query: "Unrestricted general operating support for nonprofits" },
];

const mockOpportunities: GrantOpportunity[] = [
  {
    id: "opp-1",
    title: "Senior Housing & Services Initiative",
    funder: "Robert Wood Johnson Foundation",
    funderType: "Foundation",
    amountMin: 100000,
    amountMax: 500000,
    deadline: new Date("2025-03-15"),
    geography: ["National"],
    focusAreas: ["seniors", "housing", "healthcare"],
    fundingType: "Project",
    matchScore: 94,
    eligibilityStatus: "Eligible",
    source: "Foundation Directory",
    lastUpdated: new Date("2025-01-08"),
    description: "Supports innovative approaches to creating healthy, affordable housing options for older adults, with emphasis on integrated health services and community connections.",
    eligibilityHighlights: [
      "501(c)(3) organizations",
      "Focus on senior populations",
      "Multi-year funding available",
      "Open to new grantees"
    ],
    applicationUrl: "https://www.rwjf.org/en/grants.html",
    openToNewGrantees: true,
    avgGrantAmount: 275000,
    totalAnnualGiving: 450000000,
  },
  {
    id: "opp-2",
    title: "Affordable Housing Preservation Fund",
    funder: "Kresge Foundation",
    funderType: "Foundation",
    amountMin: 200000,
    amountMax: 750000,
    deadline: new Date("2025-02-28"),
    geography: ["National", "Midwest"],
    focusAreas: ["housing", "community"],
    fundingType: "Capital",
    matchScore: 91,
    eligibilityStatus: "Eligible",
    source: "Instrumentl",
    lastUpdated: new Date("2025-01-10"),
    description: "Provides capital support for the acquisition, preservation, and rehabilitation of affordable housing units, with priority for developments serving vulnerable populations.",
    eligibilityHighlights: [
      "Affordable housing developers",
      "Properties serving low-income residents",
      "Preservation focus preferred",
      "Track record required"
    ],
    applicationUrl: "https://kresge.org/grants-social-investments/",
    openToNewGrantees: true,
    avgGrantAmount: 400000,
    totalAnnualGiving: 180000000,
  },
  {
    id: "opp-3",
    title: "Ohio Healthcare Access Program",
    funder: "Cleveland Foundation",
    funderType: "Foundation",
    amountMin: 50000,
    amountMax: 150000,
    deadline: new Date("2025-04-01"),
    geography: ["Ohio"],
    focusAreas: ["healthcare", "seniors"],
    fundingType: "General Operating",
    matchScore: 88,
    eligibilityStatus: "Eligible",
    source: "GrantWatch",
    lastUpdated: new Date("2025-01-05"),
    description: "Supports organizations providing healthcare access and services to underserved populations throughout Ohio, with emphasis on preventive care and chronic disease management.",
    eligibilityHighlights: [
      "Ohio-based organizations",
      "Healthcare service providers",
      "Focus on underserved communities",
      "Measurable outcomes required"
    ],
    openToNewGrantees: true,
    avgGrantAmount: 85000,
    totalAnnualGiving: 95000000,
  },
  {
    id: "opp-4",
    title: "Community Development Block Grant",
    funder: "U.S. Department of HUD",
    funderType: "Government",
    amountMin: 500000,
    amountMax: 2000000,
    deadline: new Date("2025-05-15"),
    geography: ["National"],
    focusAreas: ["housing", "community"],
    fundingType: "Capital",
    matchScore: 82,
    eligibilityStatus: "Likely Eligible",
    source: "Grants.gov",
    lastUpdated: new Date("2025-01-12"),
    description: "Federal funding for community development activities including affordable housing construction, infrastructure improvements, and public services benefiting low- and moderate-income persons.",
    eligibilityHighlights: [
      "State and local governments",
      "Nonprofit CDCs may partner",
      "LMI benefit requirements",
      "Extensive reporting required"
    ],
    applicationUrl: "https://www.grants.gov",
    openToNewGrantees: true,
    avgGrantAmount: 1200000,
    totalAnnualGiving: 3400000000,
  },
  {
    id: "opp-5",
    title: "Aging in Place Innovation Fund",
    funder: "The Harry and Jeanette Weinberg Foundation",
    funderType: "Foundation",
    amountMin: 100000,
    amountMax: 300000,
    deadline: new Date("2025-03-31"),
    geography: ["National"],
    focusAreas: ["seniors", "housing", "healthcare"],
    fundingType: "Project",
    matchScore: 96,
    eligibilityStatus: "Eligible",
    source: "Foundation Directory",
    lastUpdated: new Date("2025-01-09"),
    description: "Funds innovative programs that help older adults remain safely in their homes and communities, including home modifications, technology solutions, and supportive services.",
    eligibilityHighlights: [
      "501(c)(3) nonprofits",
      "Serving older adults 65+",
      "Innovation focus",
      "Replication potential valued"
    ],
    applicationUrl: "https://hjweinbergfoundation.org",
    openToNewGrantees: true,
    avgGrantAmount: 175000,
    totalAnnualGiving: 150000000,
  },
  {
    id: "opp-6",
    title: "Midwest Affordable Housing Challenge",
    funder: "MacArthur Foundation",
    funderType: "Foundation",
    amountMin: 250000,
    amountMax: 1000000,
    deadline: new Date("2025-06-01"),
    geography: ["Midwest"],
    focusAreas: ["housing", "community"],
    fundingType: "Project",
    matchScore: 85,
    eligibilityStatus: "Eligible",
    source: "Instrumentl",
    lastUpdated: new Date("2025-01-11"),
    description: "Major initiative to expand affordable housing supply and preservation in Midwest cities, with emphasis on innovative development models and resident services.",
    eligibilityHighlights: [
      "Midwest-based CDCs",
      "Affordable housing focus",
      "Multi-year commitment",
      "Partnership approach valued"
    ],
    openToNewGrantees: false,
    avgGrantAmount: 500000,
    totalAnnualGiving: 260000000,
  },
  {
    id: "opp-7",
    title: "Columbus Community Health Initiative",
    funder: "Columbus Foundation",
    funderType: "Foundation",
    amountMin: 25000,
    amountMax: 100000,
    deadline: new Date("2025-04-15"),
    geography: ["Columbus Metro", "Central Ohio"],
    focusAreas: ["healthcare", "community"],
    fundingType: "General Operating",
    matchScore: 92,
    eligibilityStatus: "Eligible",
    source: "Direct Outreach",
    lastUpdated: new Date("2025-01-07"),
    description: "Supports nonprofits addressing health disparities and improving healthcare access in the Columbus metropolitan area, with focus on preventive care and community health workers.",
    eligibilityHighlights: [
      "Franklin County organizations",
      "Direct service providers",
      "Community partnerships",
      "Health equity focus"
    ],
    openToNewGrantees: true,
    avgGrantAmount: 60000,
    totalAnnualGiving: 200000000,
  },
  {
    id: "opp-8",
    title: "Senior Services Capacity Building",
    funder: "Cardinal Health Foundation",
    funderType: "Corporate",
    amountMin: 50000,
    amountMax: 200000,
    deadline: new Date("2025-03-01"),
    geography: ["Ohio", "National"],
    focusAreas: ["seniors", "healthcare"],
    fundingType: "Capacity Building",
    matchScore: 79,
    eligibilityStatus: "Likely Eligible",
    source: "GrantStation",
    lastUpdated: new Date("2025-01-06"),
    description: "Invests in organizational capacity of nonprofits serving older adults, including technology upgrades, staff development, and operational improvements.",
    eligibilityHighlights: [
      "Healthcare-focused nonprofits",
      "Serving senior populations",
      "Capacity building plans required",
      "Ohio organizations preferred"
    ],
    openToNewGrantees: true,
    avgGrantAmount: 100000,
    totalAnnualGiving: 25000000,
  },
];

const mockFunders: FunderProfile[] = [
  {
    id: "funder-1",
    name: "Robert Wood Johnson Foundation",
    type: "Foundation",
    website: "https://www.rwjf.org",
    givingAreas: ["Healthcare", "Healthy Communities", "Leadership"],
    avgGrantAmount: 275000,
    totalAnnualGiving: 450000000,
    grantCount: 1200,
    geographyFocus: ["National"],
    openToNewGrantees: true,
    topRecipients: [
      { name: "Urban Institute", amount: 2500000 },
      { name: "RAND Corporation", amount: 1800000 },
      { name: "Mathematica", amount: 1500000 },
    ],
    givingTrend: "Stable",
    preferredGrantTypes: ["Project", "Research"],
    ein: "22-2540900",
  },
  {
    id: "funder-2",
    name: "Kresge Foundation",
    type: "Foundation",
    website: "https://kresge.org",
    givingAreas: ["Health", "Environment", "Human Services", "Arts"],
    avgGrantAmount: 400000,
    totalAnnualGiving: 180000000,
    grantCount: 450,
    geographyFocus: ["National", "Detroit", "Midwest"],
    openToNewGrantees: true,
    topRecipients: [
      { name: "Enterprise Community Partners", amount: 3000000 },
      { name: "Local Initiatives Support Corp", amount: 2200000 },
      { name: "National Housing Trust", amount: 1500000 },
    ],
    givingTrend: "Increasing",
    preferredGrantTypes: ["Capital", "Project"],
    ein: "38-1359217",
  },
  {
    id: "funder-3",
    name: "The Harry and Jeanette Weinberg Foundation",
    type: "Foundation",
    website: "https://hjweinbergfoundation.org",
    givingAreas: ["Older Adults", "Housing", "Workforce Development", "Healthcare"],
    avgGrantAmount: 175000,
    totalAnnualGiving: 150000000,
    grantCount: 850,
    geographyFocus: ["National", "Baltimore", "Hawaii", "Pennsylvania"],
    openToNewGrantees: true,
    topRecipients: [
      { name: "Habitat for Humanity", amount: 2000000 },
      { name: "Catholic Charities", amount: 1800000 },
      { name: "Salvation Army", amount: 1500000 },
    ],
    givingTrend: "Increasing",
    preferredGrantTypes: ["Project", "General Operating"],
    ein: "52-6051552",
  },
];

const mockPeers: PeerOrganization[] = [
  {
    id: "peer-1",
    name: "Presbyterian SeniorCare Network",
    similarityScore: 94,
    sharedFocusAreas: ["Senior Housing", "Healthcare", "Independent Living"],
    sharedFunders: [
      { name: "Heinz Endowments", amount: 500000 },
      { name: "Richard King Mellon Foundation", amount: 750000 },
    ],
    location: "Pittsburgh, PA",
    annualBudget: 180000000,
  },
  {
    id: "peer-2",
    name: "Volunteers of America Ohio & Indiana",
    similarityScore: 89,
    sharedFocusAreas: ["Affordable Housing", "Senior Services", "Healthcare"],
    sharedFunders: [
      { name: "Lilly Endowment", amount: 1200000 },
      { name: "Health Foundation of Greater Indianapolis", amount: 400000 },
    ],
    location: "Indianapolis, IN",
    annualBudget: 95000000,
  },
  {
    id: "peer-3",
    name: "Lutheran Services in America",
    similarityScore: 86,
    sharedFocusAreas: ["Senior Living", "Affordable Housing", "Community Services"],
    sharedFunders: [
      { name: "Thriving Together Foundation", amount: 300000 },
      { name: "Robert Wood Johnson Foundation", amount: 450000 },
    ],
    location: "National Network",
    annualBudget: 250000000,
  },
];

const mockSavedSearches: SavedSearch[] = [
  {
    id: "search-1",
    name: "Senior Housing Grants - Ohio",
    query: "Senior housing grants in Ohio",
    filters: { focusAreas: ["seniors", "housing"], geography: ["Ohio"] },
    alertEnabled: true,
    lastRun: new Date("2025-01-10"),
    resultsCount: 12,
  },
  {
    id: "search-2",
    name: "Healthcare Capital Funding",
    query: "Capital grants for healthcare facilities",
    filters: { focusAreas: ["healthcare"], fundingType: "Capital" },
    alertEnabled: false,
    lastRun: new Date("2025-01-08"),
    resultsCount: 8,
  },
];

function MatchScoreIndicator({ score }: { score: number }) {
  const getScoreVariant = (score: number): "default" | "secondary" | "outline" | "destructive" => {
    if (score >= 90) return "default";
    if (score >= 80) return "secondary";
    return "outline";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent Match";
    if (score >= 80) return "Strong Match";
    if (score >= 70) return "Good Match";
    return "Possible Match";
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={getScoreVariant(score)} className="gap-1.5">
            <Target className="w-3.5 h-3.5" />
            <span className="text-sm font-semibold tabular-nums">{score}%</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs">
            <div className="font-medium">{getScoreLabel(score)}</div>
            <div className="text-muted-foreground">Based on mission, geography & capacity</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function EligibilityBadge({ status }: { status: GrantOpportunity["eligibilityStatus"] }) {
  const config: Record<string, { icon: typeof CheckCircle; variant: "default" | "secondary" | "outline" | "destructive" }> = {
    "Eligible": { icon: CheckCircle, variant: "default" },
    "Likely Eligible": { icon: CheckCircle, variant: "secondary" },
    "Needs Review": { icon: AlertCircle, variant: "outline" },
    "Not Eligible": { icon: X, variant: "destructive" },
  };
  const { icon: Icon, variant } = config[status];
  
  return (
    <Badge variant={variant} className="text-xs gap-1">
      <Icon className="w-3 h-3" />
      {status}
    </Badge>
  );
}

function OpportunityCard({ opportunity, onView, onSave }: { opportunity: GrantOpportunity; onView: () => void; onSave: () => void }) {
  const daysUntilDeadline = Math.ceil((opportunity.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const isUrgent = daysUntilDeadline <= 30;
  
  return (
    <Card className="p-6 hover-elevate cursor-pointer" onClick={onView} data-testid={`card-opportunity-${opportunity.id}`}>
      <div className="flex items-start justify-between gap-6 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base line-clamp-1" data-testid={`text-opportunity-title-${opportunity.id}`}>
            {opportunity.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-muted-foreground">{opportunity.funder}</span>
            <Badge variant="outline" className="text-xs">
              {opportunity.funderType}
            </Badge>
          </div>
        </div>
        <MatchScoreIndicator score={opportunity.matchScore} />
      </div>
      
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {opportunity.description}
      </p>
      
      <div className="flex flex-wrap gap-1.5 mb-4">
        {opportunity.focusAreas.slice(0, 3).map((area) => {
          const focusConfig = FOCUS_AREAS.find(f => f.id === area);
          return (
            <Badge key={area} variant="secondary" className="text-xs">
              {focusConfig?.label || area}
            </Badge>
          );
        })}
        {opportunity.focusAreas.length > 3 && (
          <Badge variant="secondary" className="text-xs">
            +{opportunity.focusAreas.length - 3} more
          </Badge>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-6 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <DollarSign className="w-3.5 h-3.5" />
          <span className="tabular-nums">
            {formatCurrency(opportunity.amountMin)} - {formatCurrency(opportunity.amountMax)}
          </span>
        </div>
        <div className={`flex items-center gap-1.5 ${isUrgent ? "text-orange-600" : "text-muted-foreground"}`}>
          <Calendar className="w-3.5 h-3.5" />
          <span className="tabular-nums">
            {opportunity.deadline.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
          {isUrgent && <span className="text-xs font-medium">({daysUntilDeadline}d)</span>}
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" />
          <span className="truncate">{opportunity.geography.join(", ")}</span>
        </div>
        <div>
          <EligibilityBadge status={opportunity.eligibilityStatus} />
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>Source: {opportunity.source}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-7 text-xs" 
            onClick={(e) => { e.stopPropagation(); onSave(); }}
            aria-label={`Save ${opportunity.title} grant`}
          >
            <Bookmark className="w-3.5 h-3.5 mr-1" />
            Save
          </Button>
          <Button size="sm" className="h-7 text-xs" data-testid={`button-view-opportunity-${opportunity.id}`}>
            View Details
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

function FunderCard({ funder, onView990 }: { funder: FunderProfile; onView990: () => void }) {
  return (
    <Card className="p-6 hover-elevate" data-testid={`card-funder-${funder.id}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold">{funder.name}</h4>
          <Badge variant="outline" className="text-xs mt-1">{funder.type}</Badge>
        </div>
        {funder.openToNewGrantees && (
          <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">
            Open to New Grantees
          </Badge>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-6 text-sm mb-4">
        <div>
          <div className="text-muted-foreground text-xs">Avg Grant</div>
          <div className="font-semibold tabular-nums">{formatCurrency(funder.avgGrantAmount)}</div>
        </div>
        <div>
          <div className="text-muted-foreground text-xs">Annual Giving</div>
          <div className="font-semibold tabular-nums">{formatCurrency(funder.totalAnnualGiving)}</div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1.5 mb-4">
        {funder.givingAreas.slice(0, 3).map((area) => (
          <Badge key={area} variant="secondary" className="text-xs">{area}</Badge>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{funder.givingTrend} trend</span>
        </div>
        <Button 
          size="sm" 
          variant="outline" 
          className="h-7 text-xs"
          onClick={onView990}
          aria-label={`View 990 for ${funder.name}`}
        >
          <Eye className="w-3.5 h-3.5 mr-1" />
          View 990
        </Button>
      </div>
    </Card>
  );
}

function PeerCard({ peer, onExplore }: { peer: PeerOrganization; onExplore: () => void }) {
  return (
    <Card className="p-6 hover-elevate" data-testid={`card-peer-${peer.id}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-sm">{peer.name}</h4>
          <div className="text-xs text-muted-foreground">{peer.location}</div>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
          <Star className="w-3 h-3" />
          {peer.similarityScore}% match
        </div>
      </div>
      
      <div className="space-y-3 text-sm">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Shared Focus Areas</div>
          <div className="flex flex-wrap gap-1.5">
            {peer.sharedFocusAreas.map((area) => (
              <Badge key={area} variant="secondary" className="text-xs">{area}</Badge>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">Their Funders</div>
          {peer.sharedFunders.slice(0, 2).map((funder) => (
            <div key={funder.name} className="flex items-center justify-between text-xs">
              <span>{funder.name}</span>
              <span className="font-medium tabular-nums">{formatCurrency(funder.amount)}</span>
            </div>
          ))}
        </div>
      </div>
      
      <Button 
        size="sm" 
        variant="outline" 
        className="w-full mt-4 h-7 text-xs"
        onClick={onExplore}
        aria-label={`Explore funders for ${peer.name}`}
      >
        Explore Their Funders
      </Button>
    </Card>
  );
}

export default function GrantResearchPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
  const [selectedFundingTypes, setSelectedFundingTypes] = useState<string[]>([]);
  const [selectedGeographies, setSelectedGeographies] = useState<string[]>([]);
  const [amountRange, setAmountRange] = useState<[number, number]>([0, 2000000]);
  const [openToNewOnly, setOpenToNewOnly] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<GrantOpportunity | null>(null);
  const [activeTab, setActiveTab] = useState<"opportunities" | "funders" | "peers">("opportunities");

  const handleSaveOpportunity = (title: string) => {
    toast({
      title: "Grant Saved",
      description: `"${title}" has been added to your saved grants.`,
    });
  };

  const handleView990 = (funderName: string) => {
    toast({
      title: "Opening 990 Report",
      description: `Loading IRS 990 data for ${funderName}...`,
    });
  };

  const handleExplorePeer = (peerName: string) => {
    toast({
      title: "Exploring Funders",
      description: `Searching for funders of ${peerName}...`,
    });
  };

  const handleSaveSearch = () => {
    toast({
      title: "Search Saved",
      description: "Your search criteria has been saved. You can access it anytime from the Saved Searches panel.",
    });
  };
  
  const filteredOpportunities = useMemo(() => {
    return mockOpportunities.filter((opp) => {
      const matchesSearch = !searchQuery || 
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.funder.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFocus = selectedFocusAreas.length === 0 ||
        selectedFocusAreas.some(area => opp.focusAreas.includes(area));
      
      const matchesFundingType = selectedFundingTypes.length === 0 ||
        selectedFundingTypes.includes(opp.fundingType);
      
      const matchesGeography = selectedGeographies.length === 0 ||
        selectedGeographies.some(geo => opp.geography.includes(geo));
      
      const matchesAmount = opp.amountMax >= amountRange[0] && opp.amountMin <= amountRange[1];
      
      const matchesNewGrantees = !openToNewOnly || opp.openToNewGrantees;
      
      return matchesSearch && matchesFocus && matchesFundingType && matchesGeography && matchesAmount && matchesNewGrantees;
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [searchQuery, selectedFocusAreas, selectedFundingTypes, selectedGeographies, amountRange, openToNewOnly]);

  const totalMatchingGrants = filteredOpportunities.length;
  const totalPotentialFunding = filteredOpportunities.reduce((sum, opp) => sum + opp.amountMax, 0);
  const avgMatchScore = filteredOpportunities.length > 0
    ? Math.round(filteredOpportunities.reduce((sum, opp) => sum + opp.matchScore, 0) / filteredOpportunities.length)
    : 0;

  const clearAllFilters = () => {
    setSelectedFocusAreas([]);
    setSelectedFundingTypes([]);
    setSelectedGeographies([]);
    setAmountRange([0, 2000000]);
    setOpenToNewOnly(false);
    setSearchQuery("");
  };

  const hasActiveFilters = selectedFocusAreas.length > 0 || selectedFundingTypes.length > 0 || 
    selectedGeographies.length > 0 || amountRange[0] > 0 || amountRange[1] < 2000000 || openToNewOnly;

  return (
    <div className="flex flex-col h-full" data-testid="grant-research-page">
      <div className="p-6 border-b" style={{ backgroundColor: 'rgba(222, 235, 247, 0.3)' }}>
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h1 className="text-2xl font-bold">Grant Research & Discovery</h1>
          </div>
          <p className="text-muted-foreground">
            AI-powered grant matching to find the best funding opportunities for National Church Residences
          </p>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search grants naturally, e.g. 'Senior housing grants in Ohio for capital projects'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-base bg-white"
              data-testid="input-grant-search"
            />
            <Button 
              size="sm" 
              className="absolute right-2 top-1/2 -translate-y-1/2"
              data-testid="button-search-grants"
            >
              <Zap className="w-4 h-4 mr-1" />
              Search
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Quick searches:</span>
            {QUICK_PROMPTS.map((prompt) => (
              <Button
                key={prompt.label}
                variant="outline"
                size="sm"
                className="text-xs h-7"
                onClick={() => setSearchQuery(prompt.query)}
                data-testid={`button-quick-prompt-${prompt.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {prompt.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-6 p-6 bg-background flex-1 overflow-hidden">
        <div className="col-span-12 md:col-span-3 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <h3 className="font-semibold text-sm">Filters</h3>
              </div>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={clearAllFilters}>
                  Clear all
                </Button>
              )}
            </div>
            
            <ScrollArea className="h-[calc(100vh-400px)]">
              <Accordion type="multiple" defaultValue={["focus", "funding", "geography", "amount"]} className="space-y-2">
                <AccordionItem value="focus" className="border-none">
                  <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
                    Focus Areas
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-2">
                    {FOCUS_AREAS.map((area) => (
                      <div key={area.id} className="flex items-center gap-2">
                        <Checkbox
                          id={`focus-${area.id}`}
                          checked={selectedFocusAreas.includes(area.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedFocusAreas([...selectedFocusAreas, area.id]);
                            } else {
                              setSelectedFocusAreas(selectedFocusAreas.filter(f => f !== area.id));
                            }
                          }}
                          data-testid={`checkbox-focus-${area.id}`}
                        />
                        <label htmlFor={`focus-${area.id}`} className="text-sm flex items-center gap-1.5 cursor-pointer">
                          <area.icon className="w-3.5 h-3.5 text-muted-foreground" />
                          {area.label}
                        </label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="funding" className="border-none">
                  <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
                    Funding Type
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-2">
                    {FUNDING_TYPES.map((type) => (
                      <div key={type} className="flex items-center gap-2">
                        <Checkbox
                          id={`funding-${type}`}
                          checked={selectedFundingTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedFundingTypes([...selectedFundingTypes, type]);
                            } else {
                              setSelectedFundingTypes(selectedFundingTypes.filter(f => f !== type));
                            }
                          }}
                          data-testid={`checkbox-funding-${type.toLowerCase().replace(/\s+/g, '-')}`}
                        />
                        <label htmlFor={`funding-${type}`} className="text-sm cursor-pointer">
                          {type}
                        </label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="geography" className="border-none">
                  <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
                    Geography
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-2">
                    {GEOGRAPHIES.map((geo) => (
                      <div key={geo} className="flex items-center gap-2">
                        <Checkbox
                          id={`geo-${geo}`}
                          checked={selectedGeographies.includes(geo)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedGeographies([...selectedGeographies, geo]);
                            } else {
                              setSelectedGeographies(selectedGeographies.filter(g => g !== geo));
                            }
                          }}
                          data-testid={`checkbox-geo-${geo.toLowerCase().replace(/\s+/g, '-')}`}
                        />
                        <label htmlFor={`geo-${geo}`} className="text-sm cursor-pointer">
                          {geo}
                        </label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="amount" className="border-none">
                  <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
                    Grant Amount
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2">
                    <div className="space-y-4">
                      <Slider
                        value={amountRange}
                        min={0}
                        max={2000000}
                        step={25000}
                        onValueChange={(value) => setAmountRange(value as [number, number])}
                        className="w-full"
                        data-testid="slider-amount-range"
                      />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{formatCurrency(amountRange[0])}</span>
                        <span>{formatCurrency(amountRange[1])}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="eligibility" className="border-none">
                  <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
                    Eligibility
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="open-new"
                        checked={openToNewOnly}
                        onCheckedChange={(checked) => setOpenToNewOnly(checked === true)}
                        data-testid="checkbox-open-new-grantees"
                      />
                      <label htmlFor="open-new" className="text-sm cursor-pointer">
                        Open to new grantees only
                      </label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollArea>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bookmark className="w-4 h-4" />
              <h3 className="font-semibold text-sm">Saved Searches</h3>
            </div>
            <div className="space-y-2">
              {mockSavedSearches.map((search) => (
                <div 
                  key={search.id} 
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer"
                  data-testid={`saved-search-${search.id}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{search.name}</div>
                    <div className="text-xs text-muted-foreground">{search.resultsCount} results</div>
                  </div>
                  {search.alertEnabled && (
                    <Bell className="w-3.5 h-3.5 text-blue-600" />
                  )}
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs mt-2"
                onClick={handleSaveSearch}
                aria-label="Save current search"
              >
                <BookmarkPlus className="w-3.5 h-3.5 mr-1" />
                Save Current Search
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="col-span-12 md:col-span-9 space-y-6 overflow-hidden flex flex-col">
          <div className="grid grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <FileText className="w-3.5 h-3.5" />
                Matching Grants
              </div>
              <div className="text-2xl font-bold tabular-nums" data-testid="stat-matching-grants">
                {totalMatchingGrants}
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <DollarSign className="w-3.5 h-3.5" />
                Potential Funding
              </div>
              <div className="text-2xl font-bold tabular-nums" data-testid="stat-potential-funding">
                {formatCurrency(totalPotentialFunding)}
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Target className="w-3.5 h-3.5" />
                Avg Match Score
              </div>
              <div className="text-2xl font-bold tabular-nums" data-testid="stat-avg-match">
                {avgMatchScore}%
              </div>
            </Card>
          </div>
          
          <div className="flex items-center gap-2 border-b">
            <Button
              variant={activeTab === "opportunities" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("opportunities")}
              data-testid="tab-opportunities"
            >
              <FileText className="w-4 h-4 mr-1" />
              Grant Opportunities ({filteredOpportunities.length})
            </Button>
            <Button
              variant={activeTab === "funders" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("funders")}
              data-testid="tab-funders"
            >
              <Building2 className="w-4 h-4 mr-1" />
              Funder Discovery ({mockFunders.length})
            </Button>
            <Button
              variant={activeTab === "peers" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("peers")}
              data-testid="tab-peers"
            >
              <Users className="w-4 h-4 mr-1" />
              Peer Prospecting ({mockPeers.length})
            </Button>
          </div>
          
          <ScrollArea className="flex-1">
            {activeTab === "opportunities" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pr-4">
                {filteredOpportunities.map((opportunity) => (
                  <OpportunityCard
                    key={opportunity.id}
                    opportunity={opportunity}
                    onView={() => setSelectedOpportunity(opportunity)}
                    onSave={() => handleSaveOpportunity(opportunity.title)}
                  />
                ))}
                {filteredOpportunities.length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <Search className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No grants found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filters to find more opportunities
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === "funders" && (
              <div className="space-y-6 pr-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Discover foundations and analyze their giving patterns with 990 insights
                  </p>
                  <Button variant="outline" size="sm" aria-label="Refresh 990 data">
                    <RefreshCw className="w-3.5 h-3.5 mr-1" />
                    Refresh 990 Data
                  </Button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mockFunders.map((funder) => (
                    <FunderCard 
                      key={funder.id} 
                      funder={funder} 
                      onView990={() => handleView990(funder.name)}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "peers" && (
              <div className="space-y-6 pr-4">
                <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-start gap-6">
                    <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Peer Prospecting</h4>
                      <p className="text-sm text-blue-700">
                        Find organizations similar to National Church Residences and discover who funds them. 
                        These funders may be good prospects for your organization too.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {mockPeers.map((peer) => (
                    <PeerCard 
                      key={peer.id} 
                      peer={peer} 
                      onExplore={() => handleExplorePeer(peer.name)}
                    />
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
      
      <Dialog open={!!selectedOpportunity} onOpenChange={() => setSelectedOpportunity(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedOpportunity && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <DialogTitle className="text-xl">{selectedOpportunity.title}</DialogTitle>
                    <DialogDescription className="mt-1">
                      {selectedOpportunity.funder} · {selectedOpportunity.funderType}
                    </DialogDescription>
                  </div>
                  <MatchScoreIndicator score={selectedOpportunity.matchScore} />
                </div>
              </DialogHeader>
              
              <div className="space-y-6 mt-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Grant Amount</div>
                    <div className="font-semibold">
                      {formatCurrency(selectedOpportunity.amountMin)} - {formatCurrency(selectedOpportunity.amountMax)}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Deadline</div>
                    <div className="font-semibold">
                      {selectedOpportunity.deadline.toLocaleDateString("en-US", { 
                        month: "long", day: "numeric", year: "numeric" 
                      })}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Funding Type</div>
                    <div className="font-semibold">{selectedOpportunity.fundingType}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Geography</div>
                    <div className="font-semibold">{selectedOpportunity.geography.join(", ")}</div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedOpportunity.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Focus Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedOpportunity.focusAreas.map((area) => {
                      const focusConfig = FOCUS_AREAS.find(f => f.id === area);
                      return (
                        <Badge key={area} variant="secondary">
                          {focusConfig?.label || area}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Eligibility Highlights</h4>
                  <ul className="space-y-1">
                    {selectedOpportunity.eligibilityHighlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-6 p-6 bg-muted/50 rounded-lg">
                  <div>
                    <div className="text-xs text-muted-foreground">Avg Grant Amount</div>
                    <div className="font-semibold">{formatCurrency(selectedOpportunity.avgGrantAmount)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Total Annual Giving</div>
                    <div className="font-semibold">{formatCurrency(selectedOpportunity.totalAnnualGiving)}</div>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <Button className="flex-1" data-testid="button-start-application">
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    Add to Pipeline
                  </Button>
                  {selectedOpportunity.applicationUrl && (
                    <Button variant="outline" asChild>
                      <a href={selectedOpportunity.applicationUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit funder website">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Funder Website
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" size="icon" aria-label="Save grant opportunity">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
