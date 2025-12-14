import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Home, Phone, Stethoscope, HandHelping } from "lucide-react";

export default function NcrHospice() {
  const services = [
    { icon: Stethoscope, title: "Medical Care", description: "Physician-directed pain and symptom management" },
    { icon: HandHelping, title: "Nursing Care", description: "Skilled nursing visits for comfort and support" },
    { icon: Heart, title: "Emotional Support", description: "Counseling for patients and families" },
    { icon: Users, title: "Bereavement Services", description: "Grief support for families after loss" },
  ];

  const stats = [
    { label: "Families Served/Year", value: "850+", icon: Users },
    { label: "Clinical Team", value: "75+", icon: Stethoscope },
    { label: "Available", value: "24/7", icon: Phone },
    { label: "Family Satisfaction", value: "4.9/5", icon: Heart },
  ];

  const levels = [
    { level: "Routine Home Care", description: "Regular visits in the patient's home or facility" },
    { level: "Continuous Care", description: "Around-the-clock nursing during crisis periods" },
    { level: "Inpatient Care", description: "Short-term care in a hospice facility for symptom management" },
    { level: "Respite Care", description: "Temporary relief for family caregivers" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="page-title">Hospice</h1>
        <p className="text-muted-foreground mt-1">
          Compassionate end-of-life care focused on comfort, dignity, and quality of life for patients and their families
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
          <CardTitle className="text-xl">Levels of Hospice Care</CardTitle>
          <CardDescription>Medicare-certified hospice care tailored to patient needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {levels.map((item) => (
              <Card key={item.level} className="hover-elevate">
                <CardContent className="p-4">
                  <h3 className="font-semibold">{item.level}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Our Hospice Philosophy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground">
          <p>
            NCR Hospice believes that every person deserves to live their final days with dignity, 
            comfort, and surrounded by love. Our interdisciplinary team—including physicians, nurses, 
            social workers, chaplains, and volunteers—works together to address the physical, 
            emotional, and spiritual needs of patients and families.
          </p>
          <p className="mt-4">
            Hospice care is fully covered by Medicare, Medicaid, and most private insurance. 
            Our team is available 24 hours a day, 7 days a week to provide support and guidance.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
