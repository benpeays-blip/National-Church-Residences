import { useLocation } from "wouter";
import { useEffect } from "react";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Home, Layers, Building2, Grid3x3, Workflow } from "lucide-react";
import Welcome from "@/pages/welcome";
import TechStackMapper from "@/pages/tech-stack-mapper";
import NationalChurchResidences from "@/pages/national-church-residences";
import OrganizationMapper from "@/pages/organization-mapper";
import OrganizationWorkflowCanvas from "@/pages/organization-workflow-canvas";

const otherTabs: SectionTab[] = [
  {
    label: "Welcome",
    value: "welcome",
    icon: Home,
    path: "/welcome",
  },
  {
    label: "Tech Stack",
    value: "tech-stack",
    icon: Layers,
    path: "/tech-stack-mapper",
  },
  {
    label: "National Church",
    value: "national-church",
    icon: Building2,
    path: "/national-church-residences",
  },
  {
    label: "Org Mapper",
    value: "org-mapper",
    icon: Grid3x3,
    path: "/organization-mapper",
  },
  {
    label: "Workflow Canvas",
    value: "workflow-canvas",
    icon: Workflow,
    path: "/organization-workflow-canvas",
  },
];

export default function OtherWithTabs() {
  const [location, setLocation] = useLocation();

  // Redirect to Welcome page if on /other
  useEffect(() => {
    if (location === "/other") {
      setLocation("/welcome");
    }
  }, [location, setLocation]);

  // Determine which component to render based on location
  let PageComponent = Welcome;
  if (location === "/tech-stack-mapper") {
    PageComponent = TechStackMapper;
  } else if (location === "/national-church-residences") {
    PageComponent = NationalChurchResidences;
  } else if (location === "/organization-mapper") {
    PageComponent = OrganizationMapper;
  } else if (location === "/organization-workflow-canvas") {
    PageComponent = OrganizationWorkflowCanvas;
  }

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={otherTabs} currentPath={location} />
      <div className="flex-1 overflow-auto">
        <PageComponent />
      </div>
    </div>
  );
}
