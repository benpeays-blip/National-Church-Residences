import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  MapPin, 
  DollarSign, 
  Users, 
  Heart,
  TrendingUp,
  Award,
  Sparkles,
  Music,
  Flag
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface PastEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  amountRaised: number;
  attendance?: number;
  description: string;
  highlights: string[];
  sponsors: string[];
  beneficiaries: string;
  category: "run-walk" | "festival" | "grant" | "program";
  icon: any;
}

const pastEvents: PastEvent[] = [
  {
    id: "1",
    title: "VIDA Fest",
    date: "April 23, 2024",
    location: "San Antonio, Texas",
    amountRaised: 20000,
    attendance: 700,
    description: "The 21st annual VIDA Fest celebration brought together the community for a day filled with cultural celebration, food, entertainment and community spirit.",
    highlights: [
      "Parade, live performances and special guests",
      "Featured Raulito Navaira, Miss Teen San Antonio USA, and The Soul Queen of Fiesta",
      "Emceed by Yvette Tello, executive director of La Prensa",
      "21 years of celebrating seniors in San Antonio"
    ],
    sponsors: ["Coats Rose (Title Sponsor)"],
    beneficiaries: "Older adult residents in San Antonio",
    category: "festival",
    icon: Music
  },
  {
    id: "2",
    title: "Woodlawn Reindeer 5K Run/Walk",
    date: "December 9, 2023",
    location: "Woodlawn Lake Park, San Antonio, Texas",
    amountRaised: 10000,
    attendance: 100,
    description: "The second annual festive event welcomed participants of all ages, including pets, to dress in their best reindeer costumes and join the fun.",
    highlights: [
      "Free Kids Dash and bounce houses",
      "Holiday music and reindeer costume contest",
      "Family-friendly atmosphere with pets welcome",
      "Additional support from H-E-B and Pappasitos Cantina"
    ],
    sponsors: ["Lument Finance Trust", "T-Mobile", "Legacy Home Health", "Coastal Home Health"],
    beneficiaries: "Older and disabled adults in National Church Residences communities in San Antonio",
    category: "run-walk",
    icon: Flag
  },
  {
    id: "3",
    title: "5310 Transportation Grant Initiative",
    date: "2024",
    location: "Bexar and Comal Counties, Texas",
    amountRaised: 500000,
    description: "A significant grant to provide transportation services for seven communities, addressing critical mobility needs for older and disabled residents.",
    highlights: [
      "Up to 10,000 rides for older and disabled residents",
      "Access to medical appointments and grocery shopping",
      "Data collection for city-wide transportation planning",
      "Contracted with independent carriers for flexibility"
    ],
    sponsors: ["City of San Antonio"],
    beneficiaries: "Residents in seven communities across Bexar and Comal counties",
    category: "grant",
    icon: TrendingUp
  },
  {
    id: "4",
    title: "Eldergrow Therapeutic Horticulture Program",
    date: "Launched May 2024",
    location: "La Vista Retirement Community, San Marcos, Texas",
    amountRaised: 0,
    description: "An innovative program providing residents with the opportunity to nurture a vibrant indoor garden, fostering mental and physical wellness.",
    highlights: [
      "Reduces depression and improves balance",
      "Lowers dementia risk factors by up to 36%",
      "30% of residents are deaf, curriculum tailored to their needs",
      "Led by Claire Corrigan, therapeutic gardening educator"
    ],
    sponsors: ["National Church Residences Foundation"],
    beneficiaries: "Residents at La Vista Retirement Community with expansion plans",
    category: "program",
    icon: Sparkles
  }
];

const categoryVariants: Record<string, "default" | "secondary" | "outline"> = {
  "run-walk": "secondary",
  "festival": "default",
  "grant": "secondary",
  "program": "outline"
};

const categoryLabels = {
  "run-walk": "Run/Walk Event",
  "festival": "Community Festival",
  "grant": "Grant Initiative",
  "program": "Community Program"
};

export default function PastEvents() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold" style={{ color: "#084594" }}>
          Past Events & Initiatives
        </h1>
        <p className="text-muted-foreground">
          Celebrating our successful fundraising events and community programs from 2023-2024
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border" style={{ backgroundColor: 'rgba(222, 235, 247, 0.3)' }}>
          <CardHeader className="pb-3">
            <CardDescription>Total Raised</CardDescription>
            <CardTitle className="text-3xl tabular-nums" style={{ color: "#084594" }}>
              {formatCurrency(530000)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="border">
          <CardHeader className="pb-3">
            <CardDescription>Events Hosted</CardDescription>
            <CardTitle className="text-3xl tabular-nums" style={{ color: "#084594" }}>
              4
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="border">
          <CardHeader className="pb-3">
            <CardDescription>Total Attendance</CardDescription>
            <CardTitle className="text-3xl tabular-nums" style={{ color: "#084594" }}>
              800+
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="border">
          <CardHeader className="pb-3">
            <CardDescription>Communities Impacted</CardDescription>
            <CardTitle className="text-3xl tabular-nums" style={{ color: "#084594" }}>
              7+
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Events Timeline */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Event Highlights</h2>
        
        {pastEvents.map((event, _index) => (
          <Card key={event.id} className="border hover-elevate overflow-hidden" data-testid={`event-card-${event.id}`}>
            <CardHeader className="bg-primary/5 border-b">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <event.icon className="w-6 h-6" style={{ color: "#084594" }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <Badge variant={categoryVariants[event.category]}>
                        {categoryLabels[event.category]}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">{event.description}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              {/* Event Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Date</div>
                    <div className="font-medium text-sm">{event.date}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Location</div>
                    <div className="font-medium text-sm">{event.location}</div>
                  </div>
                </div>
                
                {event.amountRaised > 0 && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Amount Raised</div>
                      <div className="font-semibold text-sm" style={{ color: "#084594" }}>
                        {formatCurrency(event.amountRaised)}+
                      </div>
                    </div>
                  </div>
                )}
                
                {event.attendance && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Attendance</div>
                      <div className="font-medium text-sm">{event.attendance}+</div>
                    </div>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Highlights */}
                <div>
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4" style={{ color: "#084594" }} />
                    Event Highlights
                  </h4>
                  <ul className="space-y-2">
                    {event.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm flex gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column - Sponsors & Beneficiaries */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <Heart className="w-4 h-4" style={{ color: "#084594" }} />
                      Sponsors & Partners
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {event.sponsors.map((sponsor, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {sponsor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Beneficiaries</h4>
                    <p className="text-sm text-muted-foreground">{event.beneficiaries}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="border bg-primary/5">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold mb-2" style={{ color: "#084594" }}>
            Want to Support Our Next Event?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Your generosity makes these events possible and directly impacts the lives of thousands of seniors 
            in our communities. Join us in making a difference.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button size="lg" data-testid="button-sponsor-event">
              <Heart className="w-4 h-4 mr-2" />
              Become a Sponsor
            </Button>
            <Button size="lg" variant="outline" data-testid="button-volunteer">
              <Users className="w-4 h-4 mr-2" />
              Volunteer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
