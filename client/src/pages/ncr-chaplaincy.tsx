import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cross, Users, Heart, BookOpen, MessageCircle, HandHelping } from "lucide-react";

export default function NcrChaplaincy() {
  const services = [
    { icon: MessageCircle, title: "Spiritual Counseling", description: "One-on-one support for spiritual questions and concerns" },
    { icon: BookOpen, title: "Worship Services", description: "Regular chapel services and faith-based programs" },
    { icon: Heart, title: "Grief Support", description: "Compassionate care during times of loss" },
    { icon: HandHelping, title: "Life Transitions", description: "Guidance through major life changes and decisions" },
  ];

  const stats = [
    { label: "Chaplains", value: "18", icon: Cross },
    { label: "Communities Served", value: "45+", icon: Users },
    { label: "Faith Traditions", value: "All", icon: Heart },
    { label: "Available", value: "24/7", icon: MessageCircle },
  ];

  const programs = [
    { name: "Weekly Chapel Services", description: "Interdenominational worship for all residents" },
    { name: "Bible Study Groups", description: "Small group scripture study and discussion" },
    { name: "Grief & Loss Support", description: "Individual and group bereavement counseling" },
    { name: "Spiritual Life Review", description: "Reflection on life meaning and legacy" },
    { name: "Sacred Music Programs", description: "Hymn sings and musical worship experiences" },
    { name: "Holiday Celebrations", description: "Special services for religious holidays" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="page-title">Chaplaincy Services</h1>
        <p className="text-muted-foreground mt-1">
          Spiritual care and support honoring all faith traditions, serving the whole person—body, mind, and spirit
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
          <CardTitle className="text-xl">Spiritual Life Programs</CardTitle>
          <CardDescription>Enriching the spiritual lives of residents across all communities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {programs.map((program) => (
              <Card key={program.name} className="hover-elevate">
                <CardContent className="p-4">
                  <h3 className="font-semibold">{program.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground">
          <p>
            Rooted in NCR's faith-based heritage, our Chaplaincy Services program provides spiritual 
            care that honors each person's unique beliefs and traditions. Our interfaith chaplains 
            are trained to support people of all faiths—or no faith—with compassion and respect.
          </p>
          <p className="mt-4">
            Whether residents seek worship opportunities, spiritual counseling during difficult times, 
            or simply someone to listen, our chaplains are available around the clock to provide 
            comfort and support. We believe that spiritual well-being is essential to quality of life.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
