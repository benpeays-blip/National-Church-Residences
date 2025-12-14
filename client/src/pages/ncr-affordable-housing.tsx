import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Home, 
  Users, 
  MapPin, 
  Building2, 
  TrendingUp, 
  Clock, 
  Heart, 
  Quote,
  Target,
  CheckCircle2,
  Globe,
  Sparkles,
  FileText
} from "lucide-react";

export default function NcrAffordableHousing() {
  const impactMetrics = [
    { 
      label: "Senior Affordable Homes", 
      value: "25,000+", 
      icon: Home, 
      description: "Safe, dignified housing units",
      color: "#084594"
    },
    { 
      label: "States Served", 
      value: "23", 
      icon: Globe, 
      description: "Coast-to-coast presence",
      color: "#2171b5"
    },
    { 
      label: "Team Members", 
      value: "2,300+", 
      icon: Users, 
      description: "Dedicated to resident care",
      color: "#4292c6"
    },
    { 
      label: "Years of Service", 
      value: "60+", 
      icon: Clock, 
      description: "Proven track record since 1961",
      color: "#6baed6"
    },
  ];

  const programTypes = [
    { 
      name: "Section 8 Subsidized & PRAC", 
      percentage: 45, 
      description: "HUD project-based rental assistance for very low-income seniors",
      units: "11,250+"
    },
    { 
      name: "Low-Income Housing Tax Credit (LIHTC)", 
      percentage: 35, 
      description: "Moderate-income senior housing with tax credit financing",
      units: "8,750+"
    },
    { 
      name: "Mixed-Income Communities", 
      percentage: 20, 
      description: "Blended financing serving diverse income levels",
      units: "5,000+"
    },
  ];

  const featuredCommunities = [
    { 
      name: "Sunday Village", 
      location: "Austin, TX", 
      units: "1-2 Bed Units",
      highlight: "Vibrant community with on-site activities"
    },
    { 
      name: "Crossing Pointe", 
      location: "Union City, GA", 
      units: "1 Bed Units",
      highlight: "Modern affordable senior living"
    },
    { 
      name: "Kirby Manor of Villa St. Rose", 
      location: "Cleveland, OH", 
      units: "Studio Units",
      highlight: "Historic community with compassionate care"
    },
    { 
      name: "Landings of St. Andrew", 
      location: "New Port Richey, FL", 
      units: "1-2 Bed Units",
      highlight: "Coastal living for active seniors"
    },
  ];

  const statesServed = [
    "AR", "AZ", "CA", "CT", "FL", "GA", "IN", "KS", "LA", "MD", 
    "MI", "MO", "NC", "NJ", "NY", "OH", "PA", "SC", "TN", "TX", 
    "VT", "WA", "WI"
  ];

  const donorTalkingPoints = [
    {
      title: "Independence with Dignity",
      message: "Your support helps older adults maintain their independence in safe, affordable housing - without choosing between rent and medicine."
    },
    {
      title: "Community, Not Isolation",
      message: "NCR communities are designed to combat senior isolation. Residents find belonging, friendship, and purpose every day."
    },
    {
      title: "60+ Years of Trust",
      message: "Since 1961, National Church Residences has been the nation's largest faith-based non-profit senior housing provider."
    },
    {
      title: "Every Dollar Matters",
      message: "With 97%+ occupancy rates, donor investments go directly to serving seniors who desperately need affordable housing."
    },
  ];

  const residentStories = [
    {
      quote: "After my husband passed, I didn't know where I'd go. NCR gave me not just an apartment, but a whole new family of neighbors who look out for each other.",
      name: "Margaret T.",
      community: "Ohio Community Resident",
      years: 8
    },
    {
      quote: "Living on Social Security, I never thought I could afford a nice place. Now I have a beautiful home and friends to share meals with.",
      name: "Robert J.",
      community: "Texas Community Resident", 
      years: 5
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header with Mission Statement */}
      <div className="border-b pb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold" data-testid="page-title">Senior Affordable Housing</h1>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              For more than 60 years, National Church Residences has been dedicated to one simple mission: 
              helping older adults find a welcoming and affordable place to call home.
            </p>
          </div>
          <Badge variant="outline" className="text-sm px-3 py-1.5">
            <Sparkles className="w-3 h-3 mr-1.5" style={{ color: "#e1c47d" }} />
            Fundraiser Impact Report
          </Badge>
        </div>
      </div>

      {/* Primary Impact Metrics - The Big Numbers */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Impact at a Glance</h2>
          <span className="text-sm text-muted-foreground ml-2">Key metrics for donor reporting</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {impactMetrics.map((metric) => (
            <Card key={metric.label} className="border overflow-hidden">
              <div className="h-1" style={{ backgroundColor: metric.color }} />
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <metric.icon className="w-8 h-8 mb-4" style={{ color: metric.color }} />
                  <div className="text-4xl font-bold" style={{ color: metric.color }}>
                    {metric.value}
                  </div>
                  <div className="font-medium mt-2">{metric.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{metric.description}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Program Types & Geographic Reach */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Program Type Breakdown */}
        <Card className="border">
          <CardHeader style={{ backgroundColor: '#395174' }}>
            <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Housing Program Types
            </CardTitle>
            <CardDescription className="text-white/80 text-xs">
              Distribution of 25,000+ affordable housing units
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            {programTypes.map((program) => (
              <div key={program.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{program.name}</span>
                  <span className="text-sm font-semibold text-primary">{program.units}</span>
                </div>
                <Progress value={program.percentage} className="h-2" />
                <p className="text-xs text-muted-foreground">{program.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Geographic Reach */}
        <Card className="border">
          <CardHeader style={{ backgroundColor: '#395174' }}>
            <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Geographic Reach
            </CardTitle>
            <CardDescription className="text-white/80 text-xs">
              Serving seniors across 23 states coast-to-coast
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {statesServed.map((state) => (
                <Badge 
                  key={state} 
                  variant="secondary" 
                  className="text-xs font-medium"
                >
                  {state}
                </Badge>
              ))}
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">National Footprint</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    From Florida to Washington, Texas to Vermont - NCR's presence ensures 
                    seniors across America have access to quality affordable housing.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Donor Talking Points */}
      <Card className="border">
        <CardHeader style={{ backgroundColor: '#395174' }}>
          <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Donor Talking Points
          </CardTitle>
          <CardDescription className="text-white/80 text-xs">
            Key messages for donor conversations and stewardship reports
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {donorTalkingPoints.map((point, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-lg bg-muted/30 hover-elevate"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-sm">{point.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{point.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resident Impact Stories */}
      <Card className="border">
        <CardHeader style={{ backgroundColor: '#395174' }}>
          <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
            <Quote className="w-4 h-4" />
            Resident Impact Stories
          </CardTitle>
          <CardDescription className="text-white/80 text-xs">
            Real stories that demonstrate donor impact
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {residentStories.map((story, idx) => (
              <div 
                key={idx} 
                className="relative p-5 rounded-lg border bg-gradient-to-br from-muted/20 to-muted/40"
              >
                <Quote className="w-8 h-8 text-primary/20 absolute top-3 left-3" />
                <blockquote className="text-sm italic text-muted-foreground pl-6 mb-4">
                  "{story.quote}"
                </blockquote>
                <div className="flex items-center gap-3 pl-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{story.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {story.community} • {story.years} years
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Communities */}
      <Card className="border">
        <CardHeader style={{ backgroundColor: '#395174' }}>
          <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
            <Home className="w-4 h-4" />
            Featured Communities
          </CardTitle>
          <CardDescription className="text-white/80 text-xs">
            Highlighting the variety and quality of NCR affordable housing
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredCommunities.map((community) => (
              <Card key={community.name} className="hover-elevate border">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-2">{community.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <MapPin className="w-3 h-3" />
                    {community.location}
                  </div>
                  <Badge variant="secondary" className="text-xs mb-3">
                    {community.units}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{community.highlight}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mission Statement for Reports */}
      <Card className="border bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                National Church Residences creates vibrant communities where seniors can live with 
                <strong className="text-foreground"> independence, connection, and peace of mind</strong>. 
                Our communities are built on a foundation of compassionate presence and a sense of belonging, 
                where every decision is guided by a commitment to providing dignified housing for seniors in need.
              </p>
              <div className="flex items-center gap-2 mt-4 text-sm text-primary">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">More than housing — we create homes and community.</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
