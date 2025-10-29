import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, FileText, Send } from "lucide-react";
import type { Person, OutreachTemplate } from "@shared/schema";

interface OutreachTemplateData {
  template: OutreachTemplate;
  person: Person;
}

export default function OutreachGenerator() {
  const { data: templates, isLoading } = useQuery<OutreachTemplateData[]>({
    queryKey: ["/api/content/outreach-templates"],
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Personalized Outreach Generator</h1>
        <p className="text-muted-foreground">
          AI-written emails and letters customized for each donor's history and interests
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails</CardTitle>
            <Mail className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {templates?.filter((t) => t.template.templateType === "email").length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Used</CardTitle>
            <Send className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {templates?.filter((t) => t.template.used === 1).length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Letters</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {templates?.filter((t) => t.template.templateType === "letter").length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (<Skeleton key={i} className="h-64 w-full" />))}
        </div>
      ) : templates && templates.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {templates.map((item) => (
            <Card key={item.template.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {item.person.firstName} {item.person.lastName}
                    </CardTitle>
                    <CardDescription>{item.template.purpose}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{item.template.templateType}</Badge>
                    <Badge variant="secondary">{item.template.tone}</Badge>
                    {item.template.used === 1 && <Badge variant="default">Sent</Badge>}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {item.template.subject && (
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Subject</h4>
                    <p className="text-sm">{item.template.subject}</p>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-sm mb-1">Content</h4>
                  <div className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap">
                    {item.template.content}
                  </div>
                </div>
                {item.template.aiRationale && (
                  <div>
                    <h4 className="font-semibold text-sm mb-1">AI Rationale</h4>
                    <p className="text-sm text-muted-foreground">{item.template.aiRationale}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Mail className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Outreach Templates Generated</h3>
            <p className="text-muted-foreground">AI-generated personalized outreach will appear here</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
