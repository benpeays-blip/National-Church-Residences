import { useLocation } from "wouter";
import { useEffect } from "react";
import Welcome from "@/pages/welcome";
import TechStackMapper from "@/pages/tech-stack-mapper";
import NationalChurchResidences from "@/pages/national-church-residences";
import OrganizationMapper from "@/pages/organization-mapper";
import OrganizationWorkflowCanvas from "@/pages/organization-workflow-canvas";
import Workflows from "@/pages/workflows";

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
  } else if (location === "/workflows") {
    PageComponent = Workflows;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <PageComponent />
      </div>
    </div>
  );
}
