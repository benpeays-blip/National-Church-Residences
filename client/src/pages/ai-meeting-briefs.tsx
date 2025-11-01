import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, Target, TrendingUp, Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { Person, MeetingBrief } from "@shared/schema";

interface MeetingBriefData {
  brief: MeetingBrief;
  person: Person;
}

export default function AIMeetingBriefs() {
  const { data: briefs, isLoading } = useQuery<MeetingBriefData[]>({
    queryKey: ["/api/ai/meeting-briefs"],
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">AI Meeting Prep Assistant</h1>
        <p className="text-sm text-muted-foreground">
          AI-generated briefing docs with recent news, conversation starters, optimal ask amounts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Briefs</CardTitle>
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{briefs?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Confidence</CardTitle>
            <Target className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {briefs?.filter((b) => (b.brief.askConfidence || 0) >= 70).length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ask Amount</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${briefs?.reduce((sum, b) => sum + Number(b.brief.optimalAskAmount || 0), 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (<Skeleton key={i} className="h-64 w-full" />))}
        </div>
      ) : briefs && briefs.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {briefs.map((item) => (
            <Card key={item.brief.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      {item.person.firstName} {item.person.lastName}
                    </CardTitle>
                    <CardDescription>
                      Meeting: {item.brief.meetingDate ? new Date(item.brief.meetingDate).toLocaleDateString() : "Not scheduled"}
                    </CardDescription>
                  </div>
                  <Badge variant="default">
                    Confidence: {item.brief.askConfidence}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4" />
                    Optimal Ask Amount
                  </h4>
                  <p className="text-2xl font-bold text-primary">
                    ${Number(item.brief.optimalAskAmount || 0).toLocaleString()}
                  </p>
                </div>

                {item.brief.conversationStarters && item.brief.conversationStarters.length > 0 && (
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-yellow-500" />
                      Conversation Starters
                    </h4>
                    <ul className="space-y-2">
                      {item.brief.conversationStarters.map((starter, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span>{starter}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.brief.talkingPoints && item.brief.talkingPoints.length > 0 && (
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-blue-500" />
                      Talking Points
                    </h4>
                    <ul className="space-y-2">
                      {item.brief.talkingPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.brief.riskFactors && item.brief.riskFactors.length > 0 && (
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      Risk Factors
                    </h4>
                    <ul className="space-y-2">
                      {item.brief.riskFactors.map((risk, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Meeting Briefs Available</h3>
            <p className="text-muted-foreground">AI-generated briefs will appear here before donor meetings</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
