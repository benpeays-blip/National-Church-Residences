import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp,
  DollarSign,
  PiggyBank,
  Shield,
  Calendar,
  Target,
  BarChart3
} from "lucide-react";

export default function NcrFoundationEndowment() {
  const endowmentMetrics = [
    { label: "Total Endowment", value: "$42M", icon: PiggyBank, color: "#084594" },
    { label: "Annual Distribution", value: "$1.68M", icon: DollarSign, color: "#2171b5" },
    { label: "YTD Return", value: "+8.4%", icon: TrendingUp, color: "#4292c6" },
    { label: "Spending Rate", value: "4.0%", icon: Target, color: "#6baed6" },
  ];

  const endowmentFunds = [
    { name: "General Endowment", balance: 18500000, purpose: "Unrestricted support", growth: "+7.2%" },
    { name: "Resident Assistance Endowment", balance: 8200000, purpose: "Emergency resident support", growth: "+9.1%" },
    { name: "Capital Reserve Endowment", balance: 6800000, purpose: "Property improvements", growth: "+8.8%" },
    { name: "Staff Development Fund", balance: 4500000, purpose: "Training & education", growth: "+7.5%" },
    { name: "Healthcare Services Fund", balance: 4000000, purpose: "On-site health programs", growth: "+8.2%" },
  ];

  const assetAllocation = [
    { category: "US Equities", percentage: 40, color: "#084594" },
    { category: "International Equities", percentage: 20, color: "#2171b5" },
    { category: "Fixed Income", percentage: 25, color: "#4292c6" },
    { category: "Alternative Investments", percentage: 10, color: "#6baed6" },
    { category: "Cash & Equivalents", percentage: 5, color: "#9ecae1" },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold" data-testid="page-title">Endowment</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Long-term investment pool providing perpetual support for our mission and residents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {endowmentMetrics.map((metric) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-primary" />
              Endowment Funds
            </CardTitle>
            <CardDescription>Individual fund balances and purposes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {endowmentFunds.map((fund) => (
                <div 
                  key={fund.name} 
                  className="p-4 rounded-lg bg-muted/50"
                  data-testid={`fund-${fund.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">{fund.name}</div>
                      <div className="text-sm text-muted-foreground">{fund.purpose}</div>
                    </div>
                    <Badge variant="outline" className="text-primary">{fund.growth}</Badge>
                  </div>
                  <div className="text-xl font-semibold text-primary">
                    {formatCurrency(fund.balance)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Asset Allocation
            </CardTitle>
            <CardDescription>Investment portfolio composition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assetAllocation.map((asset) => (
                <div 
                  key={asset.category}
                  data-testid={`allocation-${asset.category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{asset.category}</span>
                    <span className="font-semibold">{asset.percentage}%</span>
                  </div>
                  <Progress 
                    value={asset.percentage} 
                    className="h-3"
                    style={{ '--progress-background': asset.color } as React.CSSProperties}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-xl font-bold">Investment Policy</h3>
                <p className="text-muted-foreground">
                  Managed according to UPMIFA guidelines with a focus on long-term growth and stability
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Badge variant="secondary" className="px-4 py-2">
                <Calendar className="h-4 w-4 mr-2" />
                Quarterly Review
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
