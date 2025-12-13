import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Mail, Eye, Users } from "lucide-react";
import { format } from "date-fns";

type ImpactReport = {
  id: string;
  personId: string;
  reportingPeriod: string;
  totalImpact: string;
  programsSupported: string[];
  beneficiariesHelped: number;
  personalizedStories: any;
  photosUrls: string[];
  customMessage: string | null;
  videoUrl: string | null;
  sentAt: string | null;
  opened: number;
  createdAt: string;
};

type Person = {
  id: string;
  firstName: string | null;
  lastName: string | null;
};

type ImpactReportItem = {
  report: ImpactReport;
  person: Person;
};

export default function ImpactReports() {
  const { data: reports, isLoading, error, isError } = useQuery<ImpactReportItem[], Error>({
    queryKey: ["/api/content/impact-reports"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold ">Impact Report Personalization</h1>
          <p className="text-sm text-muted-foreground">
            Customized donor reports showing specific programs they funded and outcomes achieved
          </p>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-16 bg-muted rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">
              <p className="font-semibold ">Failed to load impact reports</p>
              <p className="text-sm">{error?.message || "An error occurred"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold ">Impact Report Personalization</h1>
        <p className="text-sm text-muted-foreground">
          AI generates custom impact reports for each donor showing programs funded and outcomes
        </p>
      </div>

      {reports && reports.length > 0 ? (
        <div className="grid gap-4">
          {reports.map((item) => (
            <Card key={item.report.id} className="overflow-hidden" data-testid={`card-report-${item.report.id}`}>
              <CardHeader className="border-b" style={{ backgroundColor: '#395174' }}>
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2 text-white">
                      <Heart className="w-5 h-5" style={{ color: '#e1c47d' }} />
                      Impact Report - {item.report.reportingPeriod}
                    </CardTitle>
                    <div className="text-sm text-white/80 mt-1">
                      Donor: {item.person.firstName} {item.person.lastName}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.report.sentAt ? (
                      <>
                        <Badge variant="outline" style={{ color: '#4ade80', borderColor: '#4ade80' }}>
                          <Mail className="w-3 h-3 mr-1" />
                          Sent
                        </Badge>
                        {item.report.opened > 0 && (
                          <Badge variant="outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}>
                            <Eye className="w-3 h-3 mr-1" />
                            Opened {item.report.opened}x
                          </Badge>
                        )}
                      </>
                    ) : (
                      <Badge variant="outline" style={{ color: '#e1c47d', borderColor: '#e1c47d' }}>Draft</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Total Impact</div>
                    <div className="text-2xl font-bold text-green-600">
                      ${parseFloat(item.report.totalImpact).toLocaleString()}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Beneficiaries Helped</div>
                    <div className="text-2xl font-bold flex items-center gap-2">
                      <Users className="w-6 h-6 text-blue-600" />
                      {item.report.beneficiariesHelped.toLocaleString()}
                    </div>
                  </div>
                </div>

                {item.report.programsSupported && item.report.programsSupported.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-sm font-semibold ">Programs Supported</div>
                    <div className="flex flex-wrap gap-2">
                      {item.report.programsSupported.map((program, idx) => (
                        <Badge key={idx} variant="secondary">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {item.report.customMessage && (
                  <div className="space-y-1">
                    <div className="text-sm font-semibold mb-1">Personal Message</div>
                    <div className="text-sm text-muted-foreground italic bg-muted/50 p-3 rounded">
                      "{item.report.customMessage}"
                    </div>
                  </div>
                )}

                {item.report.photosUrls && item.report.photosUrls.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    📸 {item.report.photosUrls.length} photo(s) included
                  </div>
                )}

                {item.report.videoUrl && (
                  <div className="text-sm text-muted-foreground">
                    🎥 Video included: {item.report.videoUrl}
                  </div>
                )}

                {item.report.sentAt && (
                  <div className="text-sm text-green-600">
                    ✓ Sent {format(new Date(item.report.sentAt), "MMM d, yyyy 'at' h:mm a")}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold ">No Impact Reports Yet</h3>
            <p className="text-sm text-muted-foreground">
              Personalized impact reports will appear here once donor data is analyzed
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
