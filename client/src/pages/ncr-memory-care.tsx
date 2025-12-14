import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Users, MapPin, Shield, Music, Sun } from "lucide-react";

export default function NcrMemoryCare() {
  const communities = [
    { name: "Memory Lane Village", location: "Columbus, OH", beds: 32, approach: "Montessori-Based", features: ["Secure Courtyard", "Sensory Garden"] },
    { name: "Clarity Care Center", location: "Cincinnati, OH", beds: 28, approach: "Person-Centered", features: ["Music Therapy", "Art Studio"] },
    { name: "Peaceful Minds", location: "Cleveland, OH", beds: 36, approach: "Validation Therapy", features: ["Life Skills Kitchen", "Memory Boxes"] },
    { name: "Golden Memories", location: "Dayton, OH", beds: 24, approach: "Reminiscence Therapy", features: ["Vintage Room", "Walking Paths"] },
  ];

  const specializedCare = [
    { icon: Shield, title: "Secure Environment", description: "Purpose-built spaces designed for safety and freedom of movement" },
    { icon: Brain, title: "Cognitive Programs", description: "Evidence-based activities to engage and stimulate the mind" },
    { icon: Music, title: "Therapeutic Activities", description: "Music, art, and sensory programs tailored to individual needs" },
    { icon: Sun, title: "Daily Structure", description: "Consistent routines that provide comfort and reduce anxiety" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="page-title">Memory Care</h1>
        <p className="text-muted-foreground mt-1">
          Specialized care for individuals living with Alzheimer's disease and other forms of dementia
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {specializedCare.map((service) => (
          <Card key={service.title}>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <service.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold">{service.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{service.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Memory Care Communities</CardTitle>
          <CardDescription>Compassionate, specialized care in secure, purposeful environments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {communities.map((community) => (
              <Card key={community.name} className="hover-elevate">
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
                    <Badge className="mt-1">{community.approach}</Badge>
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

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Our Memory Care Philosophy</CardTitle>
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
