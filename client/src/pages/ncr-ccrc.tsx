import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Home, Heart, Brain, Shield, TrendingUp } from "lucide-react";

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
    { icon: Shield, title: "Predictable Costs", description: "Protect against rising healthcare costs with a single monthly fee" },
    { icon: TrendingUp, title: "Aging in Place", description: "Transition seamlessly through levels of care as needs change" },
    { icon: Home, title: "Campus Living", description: "Full continuum of care in one beautiful campus community" },
    { icon: Heart, title: "Peace of Mind", description: "Know that quality care is always available when needed" },
  ];

  const careLevels = [
    { level: "Independent Living", icon: Home, description: "Active lifestyle with amenities and services" },
    { level: "Assisted Living", icon: Heart, description: "Personal care support with daily activities" },
    { level: "Memory Care", icon: Brain, description: "Specialized dementia and Alzheimer's care" },
    { level: "Skilled Nursing", icon: Shield, description: "24-hour medical care and rehabilitation" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="page-title">Continuing Care Retirement Communities</h1>
        <p className="text-muted-foreground mt-1">
          Full continuum of care on one campus—from independent living through skilled nursing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {benefits.map((benefit) => (
          <Card key={benefit.title}>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <benefit.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{benefit.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Levels of Care</CardTitle>
          <CardDescription>A full continuum of care as your needs evolve</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {careLevels.map((level, index) => (
              <div key={level.level} className="relative">
                <Card className="h-full">
                  <CardContent className="p-4 text-center">
                    <level.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold">{level.level}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{level.description}</p>
                  </CardContent>
                </Card>
                {index < careLevels.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-primary/30" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">CCRC Communities</CardTitle>
          <CardDescription>Campus-style retirement communities with complete care continuums</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {communities.map((community) => (
              <Card key={community.name} className="hover-elevate">
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
                      <div className="font-semibold">{community.units} Units</div>
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

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Why Choose a CCRC?</CardTitle>
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
