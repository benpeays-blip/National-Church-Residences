import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, MapPin, Pill, ShowerHead, Clock, Sparkles, HandHelping } from "lucide-react";

export default function NcrAssistedLiving() {
  const communities = [
    { name: "Harmony Place", location: "Columbus, OH", beds: 60, staffRatio: "1:6", specialties: ["Diabetes Care", "Medication Management"] },
    { name: "Serenity Gardens", location: "Cincinnati, OH", beds: 48, staffRatio: "1:5", specialties: ["Physical Therapy", "Fall Prevention"] },
    { name: "Comfort Care Manor", location: "Cleveland, OH", beds: 72, staffRatio: "1:6", specialties: ["Cardiac Care", "Respiratory Support"] },
    { name: "Haven Senior Living", location: "Toledo, OH", beds: 40, staffRatio: "1:5", specialties: ["Post-Surgical Recovery", "Wound Care"] },
  ];

  const careServices = [
    { icon: Pill, title: "Medication Management", description: "Licensed staff ensure medications are taken correctly and on time", color: "#D5636C" },
    { icon: ShowerHead, title: "Personal Care", description: "Assistance with bathing, dressing, and grooming as needed", color: "#7FA3A1" },
    { icon: Clock, title: "24/7 Care Staff", description: "Trained caregivers available around the clock", color: "#E8923A" },
    { icon: Heart, title: "Health Monitoring", description: "Regular health assessments and wellness checks", color: "#B5C942" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#395174" }} data-testid="page-title">
            Assisted Living
          </h1>
          <p className="text-muted-foreground mt-1">
            Personalized care and support for seniors who need help with daily activities while maintaining independence
          </p>
        </div>
      </div>

      <Card className="p-4" style={{ backgroundColor: "rgba(57, 81, 116, 0.05)" }}>
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 mt-0.5" style={{ color: "#395174" }} />
          <div>
            <h4 className="font-medium text-sm" style={{ color: "#395174" }}>Compassionate Care, Every Day</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Our trained caregivers create personalized care plans that address unique needs while 
              encouraging residents to remain as independent as possible.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {careServices.map((service) => (
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

      <Card className="border" style={{ borderLeft: '4px solid #D5636C' }}>
        <CardHeader className="border-b">
          <div className="flex items-start gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#D5636C15' }}
            >
              <HandHelping className="w-5 h-5" style={{ color: '#D5636C' }} />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">
                Assisted Living Communities
              </CardTitle>
              <CardDescription className="text-xs">
                Compassionate care in comfortable, home-like settings
              </CardDescription>
            </div>
          </div>
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
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Staff Ratio</div>
                      <div className="font-semibold" style={{ color: "#395174" }}>{community.staffRatio}</div>
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

      <Card className="border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2" style={{ color: "#395174" }}>
            <Heart className="w-5 h-5" />
            Our Approach to Assisted Living
          </CardTitle>
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
