import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Users, 
  DollarSign, 
  Building2, 
  TrendingUp, 
  Calendar,
  Target,
  Gift,
  Star,
  HandHeart
} from "lucide-react";

export default function NcrFoundation() {
  const foundationMetrics = [
    { 
      label: "Annual Giving", 
      value: "$12.4M", 
      icon: DollarSign, 
      description: "Total philanthropic support",
      color: "#084594"
    },
    { 
      label: "Active Donors", 
      value: "8,500+", 
      icon: Users, 
      description: "Individual supporters",
      color: "#2171b5"
    },
    { 
      label: "Programs Funded", 
      value: "45", 
      icon: Heart, 
      description: "Direct impact initiatives",
      color: "#4292c6"
    },
    { 
      label: "Endowment", 
      value: "$42M", 
      icon: TrendingUp, 
      description: "Long-term sustainability",
      color: "#6baed6"
    },
  ];

  const fundingAreas = [
    { 
      name: "Resident Assistance Fund", 
      percentage: 35, 
      description: "Emergency support for residents facing financial hardship",
      amount: "$4.3M"
    },
    { 
      name: "Capital Improvements", 
      percentage: 30, 
      description: "Community upgrades and accessibility enhancements",
      amount: "$3.7M"
    },
    { 
      name: "Health & Wellness Programs", 
      percentage: 20, 
      description: "On-site health services and wellness activities",
      amount: "$2.5M"
    },
    { 
      name: "Staff Development", 
      percentage: 15, 
      description: "Training and professional growth for team members",
      amount: "$1.9M"
    },
  ];

  const recentGrants = [
    { 
      funder: "Nationwide Foundation", 
      amount: "$100,000",
      purpose: "Affordable Housing Initiative",
      status: "active"
    },
    { 
      funder: "Cardinal Health Foundation", 
      amount: "$75,000",
      purpose: "Senior Health Services",
      status: "active"
    },
    { 
      funder: "Honda of America Foundation", 
      amount: "$50,000",
      purpose: "Community Wellness Program",
      status: "active"
    },
    { 
      funder: "Huntington National Bank", 
      amount: "$40,000",
      purpose: "Financial Literacy for Seniors",
      status: "pending"
    },
  ];

  const impactStories = [
    {
      name: "Emergency Rent Assistance",
      description: "Helped 1,200 seniors avoid eviction during unexpected financial hardships",
      impact: "1,200 families supported"
    },
    {
      name: "Accessibility Upgrades",
      description: "Installed mobility equipment and safety features in 85 communities",
      impact: "3,500 residents benefited"
    },
    {
      name: "Telehealth Expansion",
      description: "Brought virtual healthcare access to 15 rural communities",
      impact: "2,800 appointments facilitated"
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold" data-testid="page-title">Our Foundation</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          The National Church Residences Foundation supports our mission to provide affordable housing and 
          services for seniors through philanthropic giving, grants, and community partnerships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {foundationMetrics.map((metric) => (
          <Card key={metric.label} data-testid={`metric-card-${metric.label.toLowerCase().replace(/\s+/g, '-')}`}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div 
                  className="p-3 rounded-full mb-4"
                  style={{ backgroundColor: `${metric.color}15` }}
                >
                  <metric.icon 
                    className="h-6 w-6" 
                    style={{ color: metric.color }} 
                  />
                </div>
                <div className="text-3xl font-bold" style={{ color: metric.color }}>
                  {metric.value}
                </div>
                <div className="font-medium mt-1">{metric.label}</div>
                <div className="text-sm text-muted-foreground mt-1">{metric.description}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Funding Priorities
            </CardTitle>
            <CardDescription>How philanthropic dollars make an impact</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {fundingAreas.map((area) => (
              <div key={area.name} className="space-y-2" data-testid={`funding-area-${area.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{area.name}</span>
                  <span className="text-sm font-semibold text-primary">{area.amount}</span>
                </div>
                <Progress value={area.percentage} className="h-2" />
                <p className="text-sm text-muted-foreground">{area.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              Recent Foundation Grants
            </CardTitle>
            <CardDescription>Major grants supporting our mission</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentGrants.map((grant, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  data-testid={`grant-${grant.funder.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div>
                    <div className="font-medium">{grant.funder}</div>
                    <div className="text-sm text-muted-foreground">{grant.purpose}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">{grant.amount}</div>
                    <Badge variant={grant.status === "active" ? "default" : "secondary"} className="text-xs">
                      {grant.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Impact Stories
          </CardTitle>
          <CardDescription>How your support makes a difference</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impactStories.map((story, index) => (
              <div 
                key={index} 
                className="p-4 rounded-lg bg-muted/50"
                data-testid={`impact-story-${index}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <HandHeart className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">{story.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{story.description}</p>
                <Badge variant="outline" className="text-xs">{story.impact}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold">Support Our Mission</h3>
              <p className="text-muted-foreground mt-1">
                Your gift helps seniors live with dignity, purpose, and security.
              </p>
            </div>
            <div className="flex gap-3">
              <Badge variant="secondary" className="px-4 py-2 text-base">
                <Heart className="h-4 w-4 mr-2" />
                Make a Gift
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-base">
                <Calendar className="h-4 w-4 mr-2" />
                Planned Giving
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
