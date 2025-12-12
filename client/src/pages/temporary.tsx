import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Users, Layers } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const temporaryTabs: SectionTab[] = [
  {
    label: "On Site Interviews",
    value: "interviews",
    icon: Users,
    path: "/temporary",
  },
  {
    label: "Tech Stack",
    value: "tech-stack",
    icon: Layers,
    path: "/temporary/tech-stack",
  },
];

function OnSiteInterviews() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          <CardTitle>On Site Interviews</CardTitle>
        </div>
        <CardDescription>
          Manage and track on-site donor and prospect interviews
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Content coming soon...
        </p>
      </CardContent>
    </Card>
  );
}

function TechStack() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-blue-600" />
          <CardTitle>Tech Stack</CardTitle>
        </div>
        <CardDescription>
          Technology stack overview and integrations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Content coming soon...
        </p>
      </CardContent>
    </Card>
  );
}

export default function Temporary() {
  const [location] = useLocation();

  let ContentComponent = OnSiteInterviews;
  if (location === "/temporary/tech-stack") {
    ContentComponent = TechStack;
  }

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={temporaryTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        <ContentComponent />
      </div>
    </div>
  );
}
