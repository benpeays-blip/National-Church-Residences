import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users,
  Home,
  Heart,
  FileText,
  Download,
  TrendingUp,
  Star
} from "lucide-react";

export default function NcrFoundationImpact() {
  const impactHighlights = [
    { label: "Residents Served", value: "32,000+", icon: Users, color: "#084594" },
    { label: "Communities Supported", value: "340", icon: Home, color: "#2171b5" },
    { label: "Emergency Grants Provided", value: "1,850", icon: Heart, color: "#4292c6" },
    { label: "Program Investments", value: "$8.2M", icon: TrendingUp, color: "#6baed6" },
  ];

  const annualReports = [
    { year: "2024", title: "Annual Impact Report", highlights: "Record year for resident assistance", status: "current" },
    { year: "2023", title: "Annual Impact Report", highlights: "Launched 5 new wellness programs", status: "available" },
    { year: "2022", title: "Annual Impact Report", highlights: "Post-pandemic recovery initiatives", status: "available" },
    { year: "2021", title: "Annual Impact Report", highlights: "COVID-19 emergency response", status: "available" },
  ];

  const programImpact = [
    {
      program: "Resident Assistance Fund",
      metric: "1,200 families supported",
      description: "Emergency rent, utility, and medical expense assistance",
      outcome: "95% of recipients maintained housing stability"
    },
    {
      program: "Health & Wellness Initiative",
      metric: "15,000 health screenings",
      description: "On-site preventive care and chronic disease management",
      outcome: "30% reduction in emergency room visits"
    },
    {
      program: "Social Connection Program",
      metric: "8,500 participants",
      description: "Activities reducing isolation among seniors",
      outcome: "85% reported improved mental wellbeing"
    },
    {
      program: "Technology Access Program",
      metric: "2,200 tablets distributed",
      description: "Digital literacy training and device provision",
      outcome: "78% now use technology to connect with family"
    },
  ];

  const testimonials = [
    {
      quote: "The emergency assistance helped me stay in my home when I didn't know where else to turn.",
      author: "Dorothy M.",
      community: "Crossing Pointe, GA"
    },
    {
      quote: "The wellness programs have changed my life. I'm more active and connected than ever.",
      author: "Robert J.",
      community: "Sunday Village, TX"
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold" data-testid="page-title">Impact Reports</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Measuring our effectiveness in serving seniors and demonstrating donor stewardship.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {impactHighlights.map((metric) => (
          <Card key={metric.label} data-testid={`highlight-${metric.label.toLowerCase().replace(/\s+/g, '-')}`}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div 
                  className="p-3 rounded-full"
                  style={{ backgroundColor: `${metric.color}15` }}
                >
                  <metric.icon className="h-5 w-5" style={{ color: metric.color }} />
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ color: metric.color }}>{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Annual Reports
            </CardTitle>
            <CardDescription>Downloadable impact documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {annualReports.map((report) => (
                <div 
                  key={report.year} 
                  className="flex items-center justify-between p-4 rounded-lg bg-card border border-border shadow-sm"
                  style={{ borderLeftWidth: '4px', borderLeftColor: '#4FA6A6' }}
                  data-testid={`report-${report.year}`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{report.year} {report.title}</span>
                      {report.status === "current" && (
                        <Badge variant="default" className="text-xs">Current</Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{report.highlights}</div>
                  </div>
                  <Badge variant="outline" className="cursor-pointer hover-elevate">
                    <Download className="h-3 w-3 mr-1" />
                    PDF
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Resident Stories
            </CardTitle>
            <CardDescription>The impact in their own words</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-lg bg-card border border-border shadow-sm"
                  style={{ borderLeftWidth: '4px', borderLeftColor: '#4FA6A6' }}
                  data-testid={`testimonial-${index}`}
                >
                  <p className="italic text-muted-foreground mb-3">"{testimonial.quote}"</p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{testimonial.author}</span>
                    <span className="text-sm text-muted-foreground">{testimonial.community}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Program Outcomes
          </CardTitle>
          <CardDescription>Measurable results from our key initiatives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programImpact.map((program, index) => (
              <div 
                key={index} 
                className="p-4 rounded-lg bg-card border border-border shadow-sm"
                style={{ borderLeftWidth: '4px', borderLeftColor: '#4FA6A6' }}
                data-testid={`program-${program.program.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{program.program}</h3>
                  <Badge variant="outline">{program.metric}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{program.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Heart className="h-4 w-4 text-primary" />
                  <span className="font-medium text-primary">{program.outcome}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
