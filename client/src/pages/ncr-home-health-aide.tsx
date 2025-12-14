import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HandHelping, Users, Clock, Heart, ShowerHead, Utensils } from "lucide-react";

export default function NcrHomeHealthAide() {
  const services = [
    { icon: ShowerHead, title: "Personal Care", description: "Bathing, grooming, dressing, and hygiene assistance" },
    { icon: Utensils, title: "Meal Preparation", description: "Nutritious meal planning, preparation, and feeding assistance" },
    { icon: HandHelping, title: "Mobility Support", description: "Transfers, walking assistance, and fall prevention" },
    { icon: Heart, title: "Companionship", description: "Social engagement, activities, and emotional support" },
  ];

  const stats = [
    { label: "Certified Aides", value: "200+", icon: Users },
    { label: "Hours of Care/Year", value: "450,000+", icon: Clock },
    { label: "Client Satisfaction", value: "4.9/5", icon: Heart },
    { label: "Years of Service", value: "25+", icon: HandHelping },
  ];

  const careOptions = [
    { type: "Hourly Care", description: "Flexible scheduling from 2-12 hours per visit", ideal: "Ideal for part-time assistance" },
    { type: "Daily Care", description: "Full-day support during waking hours", ideal: "Ideal for daytime supervision" },
    { type: "Live-In Care", description: "24-hour presence with overnight availability", ideal: "Ideal for comprehensive support" },
    { type: "Respite Care", description: "Temporary relief for family caregivers", ideal: "Ideal for caregiver breaks" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="page-title">Home Health Aide Services</h1>
        <p className="text-muted-foreground mt-1">
          Compassionate personal care assistance to help seniors maintain independence and dignity at home
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

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Care Options</CardTitle>
          <CardDescription>Flexible scheduling to meet your unique needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {careOptions.map((option) => (
              <Card key={option.type} className="hover-elevate">
                <CardContent className="p-4">
                  <h3 className="font-semibold">{option.type}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{option.description}</p>
                  <Badge variant="secondary" className="mt-3 text-xs">{option.ideal}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Our Caregivers</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground">
          <p>
            All NCR Home Health Aides are carefully screened, trained, and certified. Our rigorous 
            hiring process includes background checks, skills assessment, and ongoing education 
            to ensure the highest quality of care.
          </p>
          <p className="mt-4">
            We match caregivers with clients based on care needs, personality, and preferences 
            to create lasting, meaningful relationships that enhance quality of life.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
