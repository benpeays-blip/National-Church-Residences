import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText,
  DollarSign,
  Calendar,
  Building2,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

export default function NcrFoundationGrants() {
  const grantMetrics = [
    { label: "Active Grants", value: "42", icon: FileText, color: "#084594" },
    { label: "Total Grant Revenue", value: "$4.8M", icon: DollarSign, color: "#2171b5" },
    { label: "Pending Applications", value: "15", icon: Clock, color: "#4292c6" },
    { label: "Success Rate", value: "68%", icon: CheckCircle, color: "#6baed6" },
  ];

  const activeGrants = [
    { 
      funder: "Nationwide Foundation", 
      amount: 100000, 
      purpose: "Affordable Housing Initiative",
      startDate: "Jan 2024",
      endDate: "Dec 2024",
      status: "active",
      progress: 75
    },
    { 
      funder: "Cardinal Health Foundation", 
      amount: 75000, 
      purpose: "Senior Health Services Expansion",
      startDate: "Mar 2024",
      endDate: "Feb 2025",
      status: "active",
      progress: 50
    },
    { 
      funder: "Honda of America Foundation", 
      amount: 50000, 
      purpose: "Community Wellness Program",
      startDate: "Apr 2024",
      endDate: "Mar 2025",
      status: "active",
      progress: 40
    },
    { 
      funder: "Ohio Capital Corporation for Housing", 
      amount: 250000, 
      purpose: "LIHTC Property Improvements",
      startDate: "Jun 2024",
      endDate: "May 2026",
      status: "active",
      progress: 20
    },
  ];

  const pendingApplications = [
    { funder: "Robert Wood Johnson Foundation", amount: 500000, purpose: "Social Determinants of Health", deadline: "Mar 15, 2025" },
    { funder: "AARP Foundation", amount: 150000, purpose: "Aging in Place Technology", deadline: "Feb 28, 2025" },
    { funder: "Kresge Foundation", amount: 200000, purpose: "Climate Resilience for Seniors", deadline: "Apr 1, 2025" },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold" data-testid="page-title">Foundation Grants</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Grant funding from foundations and government sources supporting our mission.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {grantMetrics.map((metric) => (
          <Card key={metric.label} data-testid={`metric-${metric.label.toLowerCase().replace(/\s+/g, '-')}`}>
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Active Grants
          </CardTitle>
          <CardDescription>Currently funded programs and initiatives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activeGrants.map((grant, index) => (
              <div 
                key={index} 
                className="p-4 rounded-lg bg-muted/50"
                data-testid={`grant-${grant.funder.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                  <div>
                    <div className="font-medium text-lg">{grant.funder}</div>
                    <div className="text-sm text-muted-foreground">{grant.purpose}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="default">{grant.status}</Badge>
                    <span className="font-semibold text-primary">{formatCurrency(grant.amount)}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{grant.startDate} - {grant.endDate}</span>
                    <span className="font-medium">{grant.progress}% complete</span>
                  </div>
                  <Progress value={grant.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Pending Applications
          </CardTitle>
          <CardDescription>Grant proposals under review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingApplications.map((app, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                data-testid={`pending-${app.funder.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div>
                  <div className="font-medium">{app.funder}</div>
                  <div className="text-sm text-muted-foreground">{app.purpose}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-primary">{formatCurrency(app.amount)}</div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {app.deadline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
