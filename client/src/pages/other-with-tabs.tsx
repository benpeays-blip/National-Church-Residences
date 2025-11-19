import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Home, Layers, Building2, Grid3x3, Workflow } from "lucide-react";

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
  const [location] = useLocation();

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={otherTabs} currentPath={location} />
    </div>
  );
}
