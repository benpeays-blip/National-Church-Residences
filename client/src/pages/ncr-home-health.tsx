import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Users, Activity, Stethoscope, Pill, Heart } from "lucide-react";

export default function NcrHomeHealth() {
  const services = [
    { icon: Stethoscope, title: "Skilled Nursing", description: "RN and LPN visits for wound care, IV therapy, and health monitoring" },
    { icon: Activity, title: "Physical Therapy", description: "In-home PT to improve mobility, strength, and balance" },
    { icon: Heart, title: "Occupational Therapy", description: "Help with daily activities and adaptive techniques" },
    { icon: Pill, title: "Medication Management", description: "Education and oversight of complex medication regimens" },
  ];

  const stats = [
    { label: "Counties Served", value: "24", icon: Home },
    { label: "Clinical Staff", value: "120+", icon: Users },
    { label: "Visits Per Year", value: "85,000+", icon: Activity },
    { label: "Patient Satisfaction", value: "4.8/5", icon: Heart },
  ];

  const conditions = [
    "Post-surgical recovery",
    "Heart failure management",
    "Diabetes care",
    "COPD and respiratory conditions",
    "Wound care",
    "Stroke rehabilitation",
    "Orthopedic recovery",
    "Chronic disease management",
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="page-title">Home Health Care</h1>
        <p className="text-muted-foreground mt-1">
          Skilled nursing and therapy services delivered in the comfort of your home by licensed healthcare professionals
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <Card key={service.title} className="hover-elevate">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Conditions We Treat</CardTitle>
            <CardDescription>Our home health team has expertise in managing a wide range of conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {conditions.map((condition) => (
                <div key={condition} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {condition}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Medicare Certified</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none text-muted-foreground">
            <p>
              NCR Home Health is Medicare certified and participates in most major insurance plans. 
              Our services are typically covered when ordered by a physician and when you meet 
              homebound criteria.
            </p>
            <p className="mt-4">
              We work directly with your doctor and insurance to ensure seamless coordination 
              and minimize out-of-pocket costs.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
