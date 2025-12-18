import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Merge,
  Search,
  Eye,
  XCircle,
  Zap
} from "lucide-react";
import { AccentCard, getAccentColor } from "@/components/ui/accent-card";

const duplicatePairs = [
  { 
    id: "1", 
    confidence: 95,
    record1: { id: "A1", name: "Sarah Johnson", email: "sarah.johnson@email.com", phone: "(555) 123-4567", gifts: 12, totalGiving: 15000 },
    record2: { id: "A2", name: "Sara Johnson", email: "sarahjohnson@gmail.com", phone: "(555) 123-4567", gifts: 3, totalGiving: 750 },
    matchReasons: ["Same phone number", "Similar name (95% match)", "Same address"]
  },
  { 
    id: "2", 
    confidence: 88,
    record1: { id: "B1", name: "Michael Chen", email: "mchen@company.com", phone: "(555) 234-5678", gifts: 8, totalGiving: 8500 },
    record2: { id: "B2", name: "Mike Chen", email: "mike.chen@personal.com", phone: "(555) 234-5679", gifts: 2, totalGiving: 500 },
    matchReasons: ["Similar name (88% match)", "Similar phone number"]
  },
  { 
    id: "3", 
    confidence: 82,
    record1: { id: "C1", name: "Emily Rodriguez", email: "emily.r@email.com", phone: "(555) 345-6789", gifts: 5, totalGiving: 2500 },
    record2: { id: "C2", name: "E. Rodriguez", email: "erodriguez@work.com", phone: null, gifts: 1, totalGiving: 100 },
    matchReasons: ["Similar name", "Same mailing address"]
  },
  { 
    id: "4", 
    confidence: 75,
    record1: { id: "D1", name: "Robert Williams", email: "rwilliams@email.com", phone: "(555) 456-7890", gifts: 15, totalGiving: 25000 },
    record2: { id: "D2", name: "Bob Williams", email: "bob.w@gmail.com", phone: "(555) 456-7890", gifts: 2, totalGiving: 200 },
    matchReasons: ["Same phone number", "Similar name"]
  },
];

const stats = {
  totalRecords: 5420,
  potentialDuplicates: 47,
  mergedThisMonth: 23,
  dataQualityScore: 94
};

export default function DuplicateDetection() {
  const [selectedPair, setSelectedPair] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Duplicate Detection</h1>
          <p className="text-sm text-muted-foreground">
            Find and merge duplicate donor records to maintain data quality
          </p>
        </div>
        <Users className="h-8 w-8 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AccentCard accent="teal">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("teal")}20` }}>
                <Users className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-total">{stats.totalRecords.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Records</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="orange">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("orange")}20` }}>
                <AlertTriangle className="h-5 w-5" style={{ color: getAccentColor("orange") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-duplicates">{stats.potentialDuplicates}</p>
                <p className="text-sm text-muted-foreground">Potential Duplicates</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="lime">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("lime")}20` }}>
                <Merge className="h-5 w-5" style={{ color: getAccentColor("lime") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-merged">{stats.mergedThisMonth}</p>
                <p className="text-sm text-muted-foreground">Merged This Month</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>

        <AccentCard accent="sky">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getAccentColor("sky")}20` }}>
                <CheckCircle2 className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
              </div>
              <div>
                <p className="text-2xl font-bold" data-testid="metric-quality">{stats.dataQualityScore}%</p>
                <p className="text-sm text-muted-foreground">Data Quality Score</p>
              </div>
            </div>
          </CardContent>
        </AccentCard>
      </div>

      <Card>
        <CardHeader className="bg-[#395174] text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Search className="h-5 w-5" />
                Potential Duplicate Pairs
              </CardTitle>
              <CardDescription className="text-white/80">
                Review and merge duplicate records
              </CardDescription>
            </div>
            <Button variant="secondary" data-testid="button-scan">
              <Zap className="h-4 w-4 mr-2" />
              Run Full Scan
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {duplicatePairs.map((pair) => (
              <div 
                key={pair.id}
                className="p-4 rounded-lg bg-card border border-border shadow-sm"
                style={{ 
                  borderLeftWidth: '4px', 
                  borderLeftColor: pair.confidence >= 90 ? getAccentColor("coral") : pair.confidence >= 80 ? getAccentColor("orange") : getAccentColor("sky")
                }}
                data-testid={`pair-${pair.id}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Badge 
                      style={{ 
                        backgroundColor: pair.confidence >= 90 ? getAccentColor("coral") : pair.confidence >= 80 ? getAccentColor("orange") : getAccentColor("sky"),
                        color: "white"
                      }}
                    >
                      {pair.confidence}% Match
                    </Badge>
                    <div className="flex flex-wrap gap-1">
                      {pair.matchReasons.map((reason, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {reason}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" data-testid={`button-view-${pair.id}`}>
                      <Eye className="h-3 w-3 mr-1" />
                      Review
                    </Button>
                    <Button size="sm" style={{ backgroundColor: getAccentColor("lime") }} data-testid={`button-merge-${pair.id}`}>
                      <Merge className="h-3 w-3 mr-1" />
                      Merge
                    </Button>
                    <Button variant="ghost" size="sm" data-testid={`button-dismiss-${pair.id}`}>
                      <XCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg border bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm">{pair.record1.name}</span>
                      <Badge variant="secondary" className="text-xs">Primary</Badge>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>Email: {pair.record1.email}</p>
                      <p>Phone: {pair.record1.phone || "N/A"}</p>
                      <p>Gifts: {pair.record1.gifts} | Total: ${pair.record1.totalGiving.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg border bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm">{pair.record2.name}</span>
                      <Badge variant="outline" className="text-xs">Duplicate?</Badge>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>Email: {pair.record2.email}</p>
                      <p>Phone: {pair.record2.phone || "N/A"}</p>
                      <p>Gifts: {pair.record2.gifts} | Total: ${pair.record2.totalGiving.toLocaleString()}</p>
                    </div>
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
