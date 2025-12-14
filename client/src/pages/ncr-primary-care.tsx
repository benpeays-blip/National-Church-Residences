import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Users, MapPin, Calendar, Clock, Activity } from "lucide-react";

export default function NcrPrimaryCare() {
  const clinics = [
    { name: "NCR Health Center - Columbus", location: "Columbus, OH", providers: 8, specialties: ["Geriatrics", "Internal Medicine", "Preventive Care"] },
    { name: "NCR Health Center - Cincinnati", location: "Cincinnati, OH", providers: 6, specialties: ["Family Medicine", "Chronic Disease Management"] },
    { name: "NCR Health Center - Cleveland", location: "Cleveland, OH", providers: 7, specialties: ["Geriatrics", "Cardiology", "Diabetes Care"] },
    { name: "NCR Health Center - Dayton", location: "Dayton, OH", providers: 5, specialties: ["Internal Medicine", "Wellness Exams"] },
  ];

  const stats = [
    { label: "Health Centers", value: "12", icon: Stethoscope },
    { label: "Providers", value: "45+", icon: Users },
    { label: "Patients Served", value: "8,500+", icon: Activity },
    { label: "Same-Day Appointments", value: "Available", icon: Clock },
  ];

  const services = [
    "Annual wellness exams",
    "Chronic disease management",
    "Preventive screenings",
    "Vaccinations and immunizations",
    "Lab services on-site",
    "Specialist referrals",
    "Medication management",
    "Care coordination",
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="page-title">Primary Care</h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive primary care services designed specifically for seniors, with a focus on preventive care and chronic disease management
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Health Centers</CardTitle>
            <CardDescription>NCR-operated primary care clinics serving seniors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clinics.map((clinic) => (
                <Card key={clinic.name} className="hover-elevate">
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{clinic.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />
                      {clinic.location}
                    </div>
                    <div className="mt-3">
                      <div className="text-sm text-muted-foreground">{clinic.providers} Providers</div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {clinic.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">{specialty}</Badge>
                        ))}
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
            <CardTitle className="text-xl">Services Offered</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {service}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Senior-Focused Primary Care</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground">
          <p>
            NCR's Primary Care program provides comprehensive healthcare services tailored to the unique 
            needs of older adults. Our geriatric-trained providers understand the complexities of aging 
            and work closely with each patient to develop personalized care plans.
          </p>
          <p className="mt-4">
            With convenient locations in NCR communities and extended appointment times, we ensure 
            seniors receive the attention and care they deserve. Our integrated approach includes 
            care coordination with specialists, on-site lab services, and same-day appointments 
            for urgent needs.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
