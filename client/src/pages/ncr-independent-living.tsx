import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Users, MapPin, Utensils, Car, Calendar, Sparkles } from "lucide-react";

export default function NcrIndependentLiving() {
  const communities = [
    { name: "The Wellington", location: "Columbus, OH", units: 150, amenities: ["Restaurant Dining", "Fitness Center", "Pool"], priceRange: "$2,500 - $4,200" },
    { name: "Grandview Heights", location: "Cincinnati, OH", units: 120, amenities: ["Concierge Services", "Theater", "Salon"], priceRange: "$2,800 - $4,500" },
    { name: "Lakeview Estates", location: "Cleveland, OH", units: 180, amenities: ["Golf Course", "Fine Dining", "Spa"], priceRange: "$3,200 - $5,000" },
    { name: "Willow Creek Village", location: "Dayton, OH", units: 95, amenities: ["Garden Apartments", "Library", "Cafe"], priceRange: "$2,200 - $3,800" },
  ];

  const services = [
    { icon: Utensils, title: "Restaurant-Style Dining", description: "Chef-prepared meals in elegant dining rooms", color: "#7FA3A1" },
    { icon: Car, title: "Transportation", description: "Scheduled transportation for shopping and appointments", color: "#9CB071" },
    { icon: Calendar, title: "Activities & Events", description: "Full calendar of social, educational, and recreational programs", color: "#E8923A" },
    { icon: Users, title: "Social Connections", description: "Vibrant community life with like-minded neighbors", color: "#6FBBD3" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#395174" }} data-testid="page-title">
            Independent Senior Living
          </h1>
          <p className="text-muted-foreground mt-1">
            Active adult communities for seniors who want freedom with the convenience of services and amenities
          </p>
        </div>
      </div>

      <Card className="p-4" style={{ backgroundColor: "rgba(57, 81, 116, 0.05)" }}>
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 mt-0.5" style={{ color: "#395174" }} />
          <div>
            <h4 className="font-medium text-sm" style={{ color: "#395174" }}>Resort-Style Retirement Living</h4>
            <p className="text-sm text-muted-foreground mt-1">
              NCR Independent Living communities offer maintenance-free apartments with housekeeping, 
              transportation, dining, and 24-hour security included.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
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
            <Building className="w-4 h-4" />
            Independent Living Communities
          </CardTitle>
          <CardDescription className="text-white/80 text-xs">
            Enjoy maintenance-free living with resort-style amenities
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
                    <Badge variant="outline">{community.units} Units</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {community.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">{amenity}</Badge>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t">
                    <div className="text-sm text-muted-foreground">Monthly Starting At</div>
                    <div className="font-semibold" style={{ color: "#395174" }}>{community.priceRange}</div>
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
            <Users className="w-5 h-5" />
            The Independent Living Lifestyle
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground">
          <p>
            NCR's Independent Living communities are designed for active seniors who want to enjoy 
            their retirement years without the hassles of home maintenance. Our residents live in 
            private apartments while enjoying access to resort-style amenities, restaurant dining, 
            and a full calendar of social activities.
          </p>
          <p className="mt-4">
            With housekeeping, transportation, and 24-hour security included, our residents have 
            more time to pursue their passions, connect with friends, and explore new interests.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
