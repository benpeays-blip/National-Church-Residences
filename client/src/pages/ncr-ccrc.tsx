import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Home, Heart, Brain, Shield, TrendingUp, Building2, Sparkles } from "lucide-react";

export default function NcrCcrc() {
  const communities = [
    { 
      name: "Westminster Village", 
      location: "Columbus, OH", 
      acres: 45, 
      levels: ["Independent Living", "Assisted Living", "Memory Care", "Skilled Nursing"],
      units: 320,
      waitlist: true
    },
    { 
      name: "Canterbury Court", 
      location: "Cincinnati, OH", 
      acres: 32, 
      levels: ["Independent Living", "Assisted Living", "Memory Care"],
      units: 240,
      waitlist: false
    },
    { 
      name: "Covenant Village", 
      location: "Cleveland, OH", 
      acres: 52, 
      levels: ["Independent Living", "Assisted Living", "Memory Care", "Skilled Nursing", "Rehabilitation"],
      units: 380,
      waitlist: true
    },
  ];

  const benefits = [
    { icon: Shield, title: "Predictable Costs", description: "Protect against rising healthcare costs with a single monthly fee", color: "#7FA3A1" },
    { icon: TrendingUp, title: "Aging in Place", description: "Transition seamlessly through levels of care as needs change", color: "#9CB071" },
    { icon: Home, title: "Campus Living", description: "Full continuum of care in one beautiful campus community", color: "#E8923A" },
    { icon: Heart, title: "Peace of Mind", description: "Know that quality care is always available when needed", color: "#D5636C" },
  ];

  const careLevels = [
    { level: "Independent Living", icon: Home, description: "Active lifestyle with amenities and services", color: "#7FA3A1" },
    { level: "Assisted Living", icon: Heart, description: "Personal care support with daily activities", color: "#9CB071" },
    { level: "Memory Care", icon: Brain, description: "Specialized dementia and Alzheimer's care", color: "#E8923A" },
    { level: "Skilled Nursing", icon: Shield, description: "24-hour medical care and rehabilitation", color: "#6FBBD3" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#395174" }} data-testid="page-title">
            Continuing Care Retirement Communities
          </h1>
          <p className="text-muted-foreground mt-1">
            Full continuum of care on one campus—from independent living through skilled nursing
          </p>
        </div>
      </div>

      <Card className="p-4" style={{ backgroundColor: "rgba(57, 81, 116, 0.05)" }}>
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 mt-0.5" style={{ color: "#395174" }} />
          <div>
            <h4 className="font-medium text-sm" style={{ color: "#395174" }}>Aging in Place with Confidence</h4>
            <p className="text-sm text-muted-foreground mt-1">
              CCRCs offer a unique model that provides peace of mind for both residents and families, 
              with access to a full continuum of care on one beautiful campus.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {benefits.map((benefit) => (
          <Card key={benefit.title} className="border overflow-hidden">
            <div className="h-1" style={{ backgroundColor: benefit.color }} />
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div 
                  className="h-12 w-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${benefit.color}15` }}
                >
                  <benefit.icon className="w-6 h-6" style={{ color: benefit.color }} />
                </div>
                <h3 className="font-semibold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{benefit.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border">
        <CardHeader style={{ backgroundColor: '#395174' }}>
          <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Levels of Care
          </CardTitle>
          <CardDescription className="text-white/80 text-xs">
            A full continuum of care as your needs evolve
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {careLevels.map((level, index) => (
              <div key={level.level} className="relative">
                <Card className="h-full border">
                  <CardContent className="p-4 text-center">
                    <div 
                      className="h-12 w-12 rounded-lg flex items-center justify-center mx-auto mb-3"
                      style={{ backgroundColor: `${level.color}15` }}
                    >
                      <level.icon className="w-6 h-6" style={{ color: level.color }} />
                    </div>
                    <h3 className="font-semibold" style={{ color: level.color }}>{level.level}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{level.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border">
        <CardHeader style={{ backgroundColor: '#395174' }}>
          <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            CCRC Communities
          </CardTitle>
          <CardDescription className="text-white/80 text-xs">
            Campus-style retirement communities with complete care continuums
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {communities.map((community) => (
              <Card key={community.name} className="hover-elevate border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{community.name}</h3>
                        {community.waitlist && (
                          <Badge variant="destructive" className="text-xs">Waitlist</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3" />
                        {community.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold" style={{ color: "#395174" }}>{community.units} Units</div>
                      <div className="text-sm text-muted-foreground">{community.acres} Acres</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {community.levels.map((level) => (
                      <Badge key={level} variant="secondary" className="text-xs">{level}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2" style={{ color: "#395174" }}>
            <Home className="w-5 h-5" />
            Why Choose a CCRC?
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground">
          <p>
            Continuing Care Retirement Communities (CCRCs) offer a unique "aging in place" model 
            that provides peace of mind for both residents and their families. By choosing a CCRC, 
            you secure access to a full continuum of care—from vibrant independent living to 
            skilled nursing—all on one beautiful campus.
          </p>
          <p className="mt-4">
            NCR's CCRCs feature entrance fee and monthly fee structures that protect against rising 
            healthcare costs while providing access to resort-style amenities, fine dining, and a 
            vibrant social community. Should your care needs change, you can transition seamlessly 
            to the appropriate level of care without leaving your community or the friends you've made.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
