import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, DollarSign, Target, AlertCircle, Calendar } from "lucide-react";

// Dummy pipeline data
const pipelineData = {
  totalValue: 2450000,
  weightedValue: 1680000,
  closeRate: 68,
  avgDealSize: 245000,
  opportunitiesByStage: [
    { stage: "Prospect", count: 3, value: 450000, probability: 20, color: "bg-muted-foreground" },
    { stage: "Cultivation", count: 4, value: 720000, probability: 40, color: "bg-primary/60" },
    { stage: "Ask", count: 2, value: 850000, probability: 70, color: "bg-primary/80" },
    { stage: "Steward", count: 1, value: 430000, probability: 90, color: "bg-primary" },
  ],
  opportunities: [
    { id: 1, donor: "Christopher Davis", amount: 500000, stage: "Ask", probability: 70, closeDate: "2024-12-15", nextStep: "Present naming opportunity proposal", daysInStage: 23, priority: "High" },
    { id: 2, donor: "David Thompson", amount: 350000, stage: "Ask", probability: 70, closeDate: "2024-11-30", nextStep: "Schedule capital campaign discussion", daysInStage: 45, priority: "High" },
    { id: 3, donor: "Sarah Chen", amount: 430000, stage: "Steward", probability: 90, closeDate: "2024-11-20", nextStep: "Coordinate gift processing", daysInStage: 12, priority: "Critical" },
    { id: 4, donor: "Lisa Anderson", amount: 250000, stage: "Cultivation", probability: 40, closeDate: "2025-01-15", nextStep: "Invite to board networking event", daysInStage: 67, priority: "Medium" },
    { id: 5, donor: "Michael Roberts", amount: 180000, stage: "Cultivation", probability: 40, closeDate: "2025-02-01", nextStep: "Share impact report", daysInStage: 34, priority: "Medium" },
    { id: 6, donor: "Amanda Foster", amount: 150000, stage: "Prospect", probability: 20, closeDate: "2025-03-15", nextStep: "Initial qualification call", daysInStage: 89, priority: "Low" },
    { id: 7, donor: "Jennifer Liu", amount: 140000, stage: "Cultivation", probability: 40, closeDate: "2025-01-20", nextStep: "Arrange facility tour", daysInStage: 56, priority: "Medium" },
    { id: 8, donor: "Daniel Brown", amount: 200000, stage: "Prospect", probability: 20, closeDate: "2025-04-01", nextStep: "Send capability statement", daysInStage: 12, priority: "Low" },
    { id: 9, donor: "Robert Martinez", amount: 150000, stage: "Cultivation", probability: 40, closeDate: "2025-02-15", nextStep: "Schedule 1:1 coffee meeting", daysInStage: 41, priority: "Medium" },
    { id: 10, donor: "Patricia Lee", amount: 100000, stage: "Prospect", probability: 20, closeDate: "2025-03-30", nextStep: "Research donor interests", daysInStage: 8, priority: "Low" },
  ],
  forecast: [
    { month: "Nov", pessimistic: 380000, expected: 430000, optimistic: 500000 },
    { month: "Dec", pessimistic: 420000, expected: 500000, optimistic: 620000 },
    { month: "Jan", pessimistic: 280000, expected: 340000, optimistic: 430000 },
    { month: "Feb", pessimistic: 310000, expected: 380000, optimistic: 480000 },
  ],
};

export default function MGOPipelineDetail() {

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Pipeline Analysis</h1>
        <p className="text-sm text-muted-foreground">
          Track and forecast your opportunity pipeline
        </p>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pipeline</p>
                <p className="text-3xl font-bold text-primary mt-1">
                  ${(pipelineData.totalValue / 1000000).toFixed(2)}M
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Weighted Value</p>
                <p className="text-3xl font-bold text-primary mt-1">
                  ${(pipelineData.weightedValue / 1000000).toFixed(2)}M
                </p>
              </div>
              <Target className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Close Rate</p>
                <p className="text-3xl font-bold text-primary mt-1">{pipelineData.closeRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Deal Size</p>
                <p className="text-3xl font-bold text-primary mt-1">
                  ${(pipelineData.avgDealSize / 1000).toFixed(0)}K
                </p>
              </div>
              <Calendar className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline by Stage */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline by Stage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pipelineData.opportunitiesByStage.map((stage) => {
            const stagePercentage = (stage.value / pipelineData.totalValue) * 100;
            const weightedValue = stage.value * (stage.probability / 100);
            
            return (
              <div key={stage.stage} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                    <span className="font-medium">{stage.stage}</span>
                    <Badge variant="outline">{stage.count} opportunities</Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(stage.value / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-muted-foreground">
                      Weighted: ${(weightedValue / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <Progress value={stagePercentage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{stagePercentage.toFixed(1)}% of pipeline</span>
                    <span>{stage.probability}% probability</span>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>4-Month Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pipelineData.forecast.map((month) => (
              <div key={month.month} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3">{month.month} 2024/2025</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Pessimistic</p>
                    <p className="text-lg font-semibold text-destructive">
                      ${(month.pessimistic / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Expected</p>
                    <p className="text-lg font-semibold text-primary">
                      ${(month.expected / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Optimistic</p>
                    <p className="text-lg font-semibold text-primary">
                      ${(month.optimistic / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Opportunities List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pipelineData.opportunities.map((opp) => (
              <div
                key={opp.id}
                className="border rounded-lg p-4 hover-elevate cursor-pointer"
                data-testid={`opportunity-${opp.id}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div>
                    <h3 className="font-semibold">{opp.donor}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{opp.nextStep}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Amount</p>
                    <p className="font-semibold mt-1">${(opp.amount / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Stage</p>
                    <Badge variant="secondary" className="mt-1">{opp.stage}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Close Date</p>
                    <p className="text-sm mt-1">{opp.closeDate}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Priority</p>
                      <Badge 
                        variant={
                          opp.priority === "Critical" ? "destructive" : 
                          opp.priority === "High" ? "default" : 
                          "outline"
                        }
                        className="mt-1"
                      >
                        {opp.priority}
                      </Badge>
                    </div>
                    {opp.daysInStage > 60 && (
                      <div title="Stalled opportunity">
                        <AlertCircle className="w-5 h-5 text-destructive" />
                      </div>
                    )}
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
