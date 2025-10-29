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

export default function ImpactReports() {
  const { data: reports, isLoading } = useQuery<ImpactReport[]>({
    queryKey: ["/api/content/impact-reports"],
  });

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Impact Report Personalization</h1>
          <p className="text-muted-foreground">
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

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Impact Report Personalization</h1>
        <p className="text-muted-foreground">
          AI generates custom impact reports for each donor showing programs funded and outcomes
        </p>
      </div>

      {reports && reports.length > 0 ? (
        <div className="grid gap-4">
          {reports.map((report) => (
            <Card key={report.id} data-testid={`card-report-${report.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Heart className="w-5 h-5 text-pink-600" />
                      Impact Report - {report.reportingPeriod}
                    </CardTitle>
                    <div className="text-sm text-muted-foreground mt-1">
                      Donor: {report.personId.slice(0, 8)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.sentAt ? (
                      <>
                        <Badge variant="secondary">
                          <Mail className="w-3 h-3 mr-1" />
                          Sent
                        </Badge>
                        {report.opened > 0 && (
                          <Badge variant="outline">
                            <Eye className="w-3 h-3 mr-1" />
                            Opened {report.opened}x
                          </Badge>
                        )}
                      </>
                    ) : (
                      <Badge variant="outline">Draft</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Total Impact</div>
                    <div className="text-2xl font-bold text-green-600">
                      ${parseFloat(report.totalImpact).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Beneficiaries Helped</div>
                    <div className="text-2xl font-bold flex items-center gap-2">
                      <Users className="w-6 h-6 text-blue-600" />
                      {report.beneficiariesHelped.toLocaleString()}
                    </div>
                  </div>
                </div>

                {report.programsSupported && report.programsSupported.length > 0 && (
                  <div>
                    <div className="text-sm font-semibold mb-2">Programs Supported</div>
                    <div className="flex flex-wrap gap-2">
                      {report.programsSupported.map((program, idx) => (
                        <Badge key={idx} variant="secondary">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {report.customMessage && (
                  <div>
                    <div className="text-sm font-semibold mb-1">Personal Message</div>
                    <div className="text-sm text-muted-foreground italic bg-muted/50 p-3 rounded">
                      "{report.customMessage}"
                    </div>
                  </div>
                )}

                {report.photosUrls && report.photosUrls.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    📸 {report.photosUrls.length} photo(s) included
                  </div>
                )}

                {report.videoUrl && (
                  <div className="text-sm text-muted-foreground">
                    🎥 Video included: {report.videoUrl}
                  </div>
                )}

                {report.sentAt && (
                  <div className="text-sm text-green-600">
                    ✓ Sent {format(new Date(report.sentAt), "MMM d, yyyy 'at' h:mm a")}
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
            <h3 className="text-lg font-semibold mb-2">No Impact Reports Yet</h3>
            <p className="text-muted-foreground">
              Personalized impact reports will appear here once donor data is analyzed
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
