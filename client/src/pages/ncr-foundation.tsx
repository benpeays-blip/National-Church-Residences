import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Building, DollarSign, Heart, Target } from "lucide-react";

export default function NcrFoundation() {
  const metrics = [
    { icon: Users, value: "75,000+", label: "Residents Served", description: "Across all communities" },
    { icon: Building, value: "130+", label: "Communities", description: "Nationwide presence" },
    { icon: DollarSign, value: "$45M", label: "Program Investment", description: "Annual giving impact" },
    { icon: Heart, value: "2,500+", label: "Emergency Grants", description: "Provided to residents" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader style={{ backgroundColor: '#395174' }}>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" style={{ color: '#e1c47d' }} />
            NCR Foundation Overview
          </CardTitle>
          <CardDescription className="text-white/80">
            Supporting residents and communities through charitable giving
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {metrics.map((metric) => (
              <Card key={metric.label}>
                <CardContent className="p-4 text-center">
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold" data-testid={`text-metric-${metric.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    {metric.value}
                  </div>
                  <div className="text-sm font-medium">{metric.label}</div>
                  <div className="text-xs text-muted-foreground">{metric.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Grants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Funder</th>
                      <th className="text-left p-2">Amount</th>
                      <th className="text-left p-2">Purpose</th>
                      <th className="text-left p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Community Foundation</td>
                      <td className="p-2">$250,000</td>
                      <td className="p-2">Resident Emergency Fund</td>
                      <td className="p-2"><Badge variant="default">Active</Badge></td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Healthcare Foundation</td>
                      <td className="p-2">$175,000</td>
                      <td className="p-2">Senior Wellness Programs</td>
                      <td className="p-2"><Badge variant="default">Active</Badge></td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Corporate Partner</td>
                      <td className="p-2">$100,000</td>
                      <td className="p-2">Staff Training Initiative</td>
                      <td className="p-2"><Badge variant="secondary">Pending</Badge></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
