import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Target, Home, Layers, Building2, Grid3x3, Workflow } from "lucide-react";
import Pipeline from "@/pages/pipeline";
import PipelineWithTabs from "@/pages/pipeline-with-tabs";
import Welcome from "@/pages/welcome";
import TechStackMapper from "@/pages/tech-stack-mapper";
import NationalChurchResidences from "@/pages/national-church-residences";
import OrganizationMapper from "@/pages/organization-mapper";
import OrganizationWorkflowCanvas from "@/pages/organization-workflow-canvas";

const otherTabs: SectionTab[] = [
  {
    label: "Pipeline",
    value: "pipeline",
    icon: Target,
    path: "/other",
  },
  {
    label: "Welcome",
    value: "welcome",
    icon: Home,
    path: "/other?tab=welcome",
  },
  {
    label: "Tech Stack",
    value: "tech-stack",
    icon: Layers,
    path: "/other?tab=tech-stack",
  },
  {
    label: "National Church",
    value: "national-church",
    icon: Building2,
    path: "/other?tab=national-church",
  },
  {
    label: "Org Mapper",
    value: "org-mapper",
    icon: Grid3x3,
    path: "/other?tab=org-mapper",
  },
  {
    label: "Workflow Canvas",
    value: "workflow-canvas",
    icon: Workflow,
    path: "/other?tab=workflow-canvas",
  },
];

export default function OtherWithTabs() {
  const [location] = useLocation();
  
  // Determine active tab from URL
  const params = new URLSearchParams(window.location.search);
  const activeTab = params.get('tab') || 'pipeline';

  let OtherComponent = PipelineWithTabs;
  if (activeTab === 'welcome') {
    OtherComponent = Welcome;
  } else if (activeTab === 'tech-stack') {
    OtherComponent = TechStackMapper;
  } else if (activeTab === 'national-church') {
    OtherComponent = NationalChurchResidences;
  } else if (activeTab === 'org-mapper') {
    OtherComponent = OrganizationMapper;
  } else if (activeTab === 'workflow-canvas') {
    OtherComponent = OrganizationWorkflowCanvas;
  }

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={otherTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        <OtherComponent />
      </div>
    </div>
  );
}
