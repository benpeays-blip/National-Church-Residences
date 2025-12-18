import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, FileText, Send, Phone } from "lucide-react";
import type { Person, OutreachTemplate } from "@shared/schema";

interface OutreachTemplateData {
  template: OutreachTemplate;
  person: Person;
}

type FilterType = "all" | "email" | "letter" | "call_script";

const getTypeVariant = (type: string | null): "default" | "secondary" | "outline" => {
  switch (type) {
    case "email":
      return "default";
    case "letter":
      return "secondary";
    case "call_script":
      return "outline";
    default:
      return "secondary";
  }
};

const getTypeIcon = (type: string | null) => {
  switch (type) {
    case "email":
      return <Mail className="w-3 h-3" />;
    case "letter":
      return <FileText className="w-3 h-3" />;
    case "call_script":
      return <Phone className="w-3 h-3" />;
    default:
      return null;
  }
};

const getTypeLabel = (type: string | null) => {
  switch (type) {
    case "email":
      return "Email";
    case "letter":
      return "Letter";
    case "call_script":
      return "Call Script";
    default:
      return type;
  }
};

export default function OutreachGenerator() {
  const [filter, setFilter] = useState<FilterType>("all");
  
  const { data: templates, isLoading } = useQuery<OutreachTemplateData[]>({
    queryKey: ["/api/content/outreach-templates"],
  });

  const filteredTemplates = templates?.filter((item) => {
    if (filter === "all") return true;
    return item.template.templateType === filter;
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold ">Personalized Outreach Generator</h1>
        <p className="text-sm text-muted-foreground">
          AI-written emails and letters customized for each donor's history and interests
        </p>
      </div>

      {/* Filter Menu */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground mr-2">Filter by Type:</span>
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              data-testid="filter-all"
            >
              All Templates
              <Badge variant="secondary" className="ml-2">
                {templates?.length || 0}
              </Badge>
            </Button>
            <Button
              variant={filter === "email" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("email")}
              data-testid="filter-email"
            >
              <Mail className="w-4 h-4 mr-1" />
              Emails
              <Badge variant="secondary" className="ml-2">
                {templates?.filter((t) => t.template.templateType === "email").length || 0}
              </Badge>
            </Button>
            <Button
              variant={filter === "letter" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("letter")}
              data-testid="filter-letter"
            >
              <FileText className="w-4 h-4 mr-1" />
              Letters
              <Badge variant="secondary" className="ml-2">
                {templates?.filter((t) => t.template.templateType === "letter").length || 0}
              </Badge>
            </Button>
            <Button
              variant={filter === "call_script" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("call_script")}
              data-testid="filter-call-script"
            >
              <Phone className="w-4 h-4 mr-1" />
              Call Scripts
              <Badge variant="secondary" className="ml-2">
                {templates?.filter((t) => t.template.templateType === "call_script").length || 0}
              </Badge>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Showing</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" data-testid="stat-showing">{filteredTemplates?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              of {templates?.length || 0} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails</CardTitle>
            <Mail className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" data-testid="stat-emails">
              {templates?.filter((t) => t.template.templateType === "email").length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Letters</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" data-testid="stat-letters">
              {templates?.filter((t) => t.template.templateType === "letter").length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Call Scripts</CardTitle>
            <Phone className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" data-testid="stat-call-scripts">
              {templates?.filter((t) => t.template.templateType === "call_script").length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (<Skeleton key={i} className="h-64 w-full" />))}
        </div>
      ) : filteredTemplates && filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTemplates.map((item) => (
            <Card key={item.template.id} className="overflow-hidden" data-testid={`template-${item.template.id}`}>
              <CardHeader className="border-b" style={{ backgroundColor: '#395174' }}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-white">
                      {item.person.firstName} {item.person.lastName}
                    </CardTitle>
                    <CardDescription className="text-white/80">{item.template.purpose}</CardDescription>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Badge 
                      variant="outline"
                      className="flex items-center gap-1"
                      style={{ color: '#e1c47d', borderColor: '#e1c47d' }}
                      data-testid={`type-badge-${item.template.templateType}`}
                    >
                      {getTypeIcon(item.template.templateType)}
                      {getTypeLabel(item.template.templateType)}
                    </Badge>
                    <Badge variant="outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}>{item.template.tone}</Badge>
                    {item.template.used === 1 && <Badge variant="outline" style={{ color: '#4ade80', borderColor: '#4ade80' }}>Sent</Badge>}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {item.template.subject && (
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm mb-1">Subject</h4>
                    <p className="text-sm">{item.template.subject}</p>
                  </div>
                )}
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm mb-1">Content</h4>
                  <div className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap">
                    {item.template.content}
                  </div>
                </div>
                {item.template.aiRationale && (
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm mb-1">AI Rationale</h4>
                    <p className="text-sm text-muted-foreground">{item.template.aiRationale}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filter !== "all" ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold ">No {getTypeLabel(filter)} Templates</h3>
            <p className="text-sm text-muted-foreground">
              No templates of this type found. Try changing the filter.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Mail className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold ">No Outreach Templates Generated</h3>
            <p className="text-sm text-muted-foreground">AI-generated personalized outreach will appear here</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
