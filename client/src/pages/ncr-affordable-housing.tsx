import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Users, MapPin, DollarSign, Building2, TrendingUp } from "lucide-react";

export default function NcrAffordableHousing() {
  const properties = [
    { name: "Sunrise Village", location: "Columbus, OH", units: 120, occupancy: 98, type: "HUD Section 202" },
    { name: "Maple Grove Apartments", location: "Cincinnati, OH", units: 85, occupancy: 100, type: "LIHTC" },
    { name: "River View Senior", location: "Cleveland, OH", units: 96, occupancy: 97, type: "HUD Section 202" },
    { name: "Heritage Gardens", location: "Dayton, OH", units: 64, occupancy: 95, type: "LIHTC" },
    { name: "Oak Park Commons", location: "Toledo, OH", units: 110, occupancy: 99, type: "HUD Section 202" },
    { name: "Lakeside Terrace", location: "Akron, OH", units: 72, occupancy: 96, type: "LIHTC" },
  ];

  const stats = [
    { label: "Total Properties", value: "48", icon: Building2 },
    { label: "Total Units", value: "4,200+", icon: Home },
    { label: "Residents Served", value: "5,100+", icon: Users },
    { label: "Average Occupancy", value: "97.2%", icon: TrendingUp },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="page-title">Senior Affordable Housing</h1>
        <p className="text-muted-foreground mt-1">
          HUD Section 202 and Low-Income Housing Tax Credit (LIHTC) communities for income-qualified seniors
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <stat.icon className="w-8 h-8 text-primary mb-4" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Featured Affordable Communities</CardTitle>
          <CardDescription>Income-qualified housing serving seniors across the region</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((property) => (
              <Card key={property.name} className="hover-elevate">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{property.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3" />
                        {property.location}
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">{property.type}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Units</div>
                      <div className="font-semibold">{property.units}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Occupancy</div>
                      <div className="font-semibold text-primary">{property.occupancy}%</div>
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
          <CardTitle className="text-xl">About Senior Affordable Housing</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground">
          <p>
            NCR's Senior Affordable Housing program provides quality, affordable housing options for 
            income-qualified seniors aged 62 and older. Our communities are funded through HUD Section 202 
            and Low-Income Housing Tax Credit (LIHTC) programs, ensuring accessible rents for those on 
            fixed incomes.
          </p>
          <p className="mt-4">
            Residents enjoy independent living with access to supportive services, community activities, 
            and the peace of mind that comes with stable, affordable housing. Many communities offer 
            on-site service coordinators who help connect residents with local resources.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
