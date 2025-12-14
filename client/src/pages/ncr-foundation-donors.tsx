import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Gift,
  Users,
  Trophy,
  Star,
  Heart,
  TrendingUp
} from "lucide-react";

export default function NcrFoundationDonors() {
  const donorCircles = [
    { name: "Founder's Circle", minGift: "$100,000+", members: 12, color: "#084594" },
    { name: "President's Circle", minGift: "$50,000-$99,999", members: 28, color: "#2171b5" },
    { name: "Leadership Circle", minGift: "$25,000-$49,999", members: 45, color: "#4292c6" },
    { name: "Partner Circle", minGift: "$10,000-$24,999", members: 89, color: "#6baed6" },
    { name: "Benefactor Circle", minGift: "$5,000-$9,999", members: 156, color: "#9ecae1" },
  ];

  const topDonors = [
    { name: "The Johnson Family Foundation", totalGiving: "$1,250,000", years: 15, focus: "Resident Assistance" },
    { name: "Anonymous Benefactor", totalGiving: "$875,000", years: 8, focus: "Capital Projects" },
    { name: "Williams Family Trust", totalGiving: "$650,000", years: 12, focus: "Health Services" },
    { name: "Central Ohio Community Fund", totalGiving: "$520,000", years: 10, focus: "General Support" },
    { name: "Midwest Senior Housing Alliance", totalGiving: "$445,000", years: 7, focus: "Affordable Housing" },
  ];

  const givingStats = [
    { label: "Individual Donors", value: "6,200", icon: Users },
    { label: "Corporate Partners", value: "185", icon: Trophy },
    { label: "Foundation Grants", value: "42", icon: Star },
    { label: "Recurring Gifts", value: "2,100", icon: Heart },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold" data-testid="page-title">Donors & Giving</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Our generous donors make it possible to serve seniors with dignity and compassion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {givingStats.map((stat) => (
          <Card key={stat.label} data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Giving Circles
            </CardTitle>
            <CardDescription>Recognition levels for annual giving</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {donorCircles.map((circle) => (
                <div 
                  key={circle.name} 
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: `${circle.color}10` }}
                  data-testid={`circle-${circle.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: circle.color }}
                    />
                    <div>
                      <div className="font-medium">{circle.name}</div>
                      <div className="text-sm text-muted-foreground">{circle.minGift}</div>
                    </div>
                  </div>
                  <Badge variant="secondary">{circle.members} members</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Top Lifetime Donors
            </CardTitle>
            <CardDescription>Cumulative giving leaders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDonors.map((donor, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  data-testid={`donor-${index}`}
                >
                  <div>
                    <div className="font-medium">{donor.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {donor.years} years | {donor.focus}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">{donor.totalGiving}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-xl font-bold">Giving Trend</h3>
                <p className="text-muted-foreground">
                  Annual giving has grown 18% year-over-year
                </p>
              </div>
            </div>
            <Badge className="px-4 py-2">
              <Gift className="h-4 w-4 mr-2" />
              Join Our Donor Community
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
