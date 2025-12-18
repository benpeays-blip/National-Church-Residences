import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Users, MapPin, Shield, Music, Sun, Sparkles } from "lucide-react";

export default function NcrMemoryCare() {
  const communities = [
    { name: "Memory Lane Village", location: "Columbus, OH", beds: 32, approach: "Montessori-Based", features: ["Secure Courtyard", "Sensory Garden"] },
    { name: "Clarity Care Center", location: "Cincinnati, OH", beds: 28, approach: "Person-Centered", features: ["Music Therapy", "Art Studio"] },
    { name: "Peaceful Minds", location: "Cleveland, OH", beds: 36, approach: "Validation Therapy", features: ["Life Skills Kitchen", "Memory Boxes"] },
    { name: "Golden Memories", location: "Dayton, OH", beds: 24, approach: "Reminiscence Therapy", features: ["Vintage Room", "Walking Paths"] },
  ];

  const specializedCare = [
    { icon: Shield, title: "Secure Environment", description: "Purpose-built spaces designed for safety and freedom of movement", color: "#7FA3A1" },
    { icon: Brain, title: "Cognitive Programs", description: "Evidence-based activities to engage and stimulate the mind", color: "#9CB071" },
    { icon: Music, title: "Therapeutic Activities", description: "Music, art, and sensory programs tailored to individual needs", color: "#E8923A" },
    { icon: Sun, title: "Daily Structure", description: "Consistent routines that provide comfort and reduce anxiety", color: "#6FBBD3" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#395174" }} data-testid="page-title">
            Memory Care
          </h1>
          <p className="text-muted-foreground mt-1">
            Specialized care for individuals living with Alzheimer's disease and other forms of dementia
          </p>
        </div>
      </div>

      <Card className="p-4" style={{ backgroundColor: "rgba(57, 81, 116, 0.05)" }}>
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 mt-0.5" style={{ color: "#395174" }} />
          <div>
            <h4 className="font-medium text-sm" style={{ color: "#395174" }}>Dignity, Purpose, and Joy</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Our specially trained staff use evidence-based approaches to create meaningful connections 
              and moments of clarity for every resident living with dementia.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {specializedCare.map((service) => (
          <Card key={service.title} className="border overflow-hidden">
            <div className="h-1" style={{ backgroundColor: service.color }} />
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div 
                  className="h-12 w-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <service.icon className="w-6 h-6" style={{ color: service.color }} />
                </div>
                <h3 className="font-semibold">{service.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{service.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border">
        <CardHeader style={{ backgroundColor: '#395174' }}>
          <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Memory Care Communities
          </CardTitle>
          <CardDescription className="text-white/80 text-xs">
            Compassionate, specialized care in secure, purposeful environments
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {communities.map((community) => (
              <Card key={community.name} className="hover-elevate border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{community.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3" />
                        {community.location}
                      </div>
                    </div>
                    <Badge variant="outline">{community.beds} Beds</Badge>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-muted-foreground">Care Approach</div>
                    <Badge 
                      className="mt-1"
                      style={{ backgroundColor: "#39517415", color: "#395174", border: "1px solid #39517430" }}
                    >
                      {community.approach}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {community.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">{feature}</Badge>
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
            <Brain className="w-5 h-5" />
            Our Memory Care Philosophy
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground">
          <p>
            NCR's Memory Care program is built on the understanding that every person living with 
            dementia deserves dignity, purpose, and joy. Our specially trained staff use 
            evidence-based approaches to create meaningful connections and moments of clarity.
          </p>
          <p className="mt-4">
            Our secure communities are designed to encourage safe exploration while providing 
            the structure and routine that helps reduce anxiety. From sensory gardens to music 
            therapy programs, we offer a range of therapeutic activities that engage residents 
            and help them maintain their sense of self.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
