import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, MapPin, Pill, ShowerHead, Clock } from "lucide-react";

export default function NcrAssistedLiving() {
  const communities = [
    { name: "Harmony Place", location: "Columbus, OH", beds: 60, staffRatio: "1:6", specialties: ["Diabetes Care", "Medication Management"] },
    { name: "Serenity Gardens", location: "Cincinnati, OH", beds: 48, staffRatio: "1:5", specialties: ["Physical Therapy", "Fall Prevention"] },
    { name: "Comfort Care Manor", location: "Cleveland, OH", beds: 72, staffRatio: "1:6", specialties: ["Cardiac Care", "Respiratory Support"] },
    { name: "Haven Senior Living", location: "Toledo, OH", beds: 40, staffRatio: "1:5", specialties: ["Post-Surgical Recovery", "Wound Care"] },
  ];

  const careServices = [
    { icon: Pill, title: "Medication Management", description: "Licensed staff ensure medications are taken correctly and on time" },
    { icon: ShowerHead, title: "Personal Care", description: "Assistance with bathing, dressing, and grooming as needed" },
    { icon: Clock, title: "24/7 Care Staff", description: "Trained caregivers available around the clock" },
    { icon: Heart, title: "Health Monitoring", description: "Regular health assessments and wellness checks" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="page-title">Assisted Living</h1>
        <p className="text-muted-foreground mt-1">
          Personalized care and support for seniors who need help with daily activities while maintaining independence
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {careServices.map((service) => (
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
          <CardTitle className="text-xl">Assisted Living Communities</CardTitle>
          <CardDescription>Compassionate care in comfortable, home-like settings</CardDescription>
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
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Staff Ratio</div>
                      <div className="font-semibold">{community.staffRatio}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Specialties</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {community.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">{specialty}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Our Approach to Assisted Living</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground">
          <p>
            NCR's Assisted Living communities provide the perfect balance of independence and support. 
            Our trained caregivers work with each resident to create a personalized care plan that 
            addresses their unique needs while encouraging them to remain as independent as possible.
          </p>
          <p className="mt-4">
            From medication management to assistance with daily activities, our team is available 
            24/7 to ensure residents receive the care they need in a warm, welcoming environment 
            that feels like home.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
