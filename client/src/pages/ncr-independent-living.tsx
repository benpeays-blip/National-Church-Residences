import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Users, MapPin, Utensils, Car, Calendar } from "lucide-react";

export default function NcrIndependentLiving() {
  const communities = [
    { name: "The Wellington", location: "Columbus, OH", units: 150, amenities: ["Restaurant Dining", "Fitness Center", "Pool"], priceRange: "$2,500 - $4,200" },
    { name: "Grandview Heights", location: "Cincinnati, OH", units: 120, amenities: ["Concierge Services", "Theater", "Salon"], priceRange: "$2,800 - $4,500" },
    { name: "Lakeview Estates", location: "Cleveland, OH", units: 180, amenities: ["Golf Course", "Fine Dining", "Spa"], priceRange: "$3,200 - $5,000" },
    { name: "Willow Creek Village", location: "Dayton, OH", units: 95, amenities: ["Garden Apartments", "Library", "Cafe"], priceRange: "$2,200 - $3,800" },
  ];

  const services = [
    { icon: Utensils, title: "Restaurant-Style Dining", description: "Chef-prepared meals in elegant dining rooms" },
    { icon: Car, title: "Transportation", description: "Scheduled transportation for shopping and appointments" },
    { icon: Calendar, title: "Activities & Events", description: "Full calendar of social, educational, and recreational programs" },
    { icon: Users, title: "Social Connections", description: "Vibrant community life with like-minded neighbors" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="page-title">Independent Senior Living</h1>
        <p className="text-muted-foreground mt-1">
          Active adult communities for seniors who want freedom with the convenience of services and amenities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
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
          <CardTitle className="text-xl">Independent Living Communities</CardTitle>
          <CardDescription>Enjoy maintenance-free living with resort-style amenities</CardDescription>
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
                    <Badge variant="outline">{community.units} Units</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {community.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">{amenity}</Badge>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t">
                    <div className="text-sm text-muted-foreground">Monthly Starting At</div>
                    <div className="font-semibold text-primary">{community.priceRange}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">The Independent Living Lifestyle</CardTitle>
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
