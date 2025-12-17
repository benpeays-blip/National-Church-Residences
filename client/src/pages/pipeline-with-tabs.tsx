import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Target, TrendingUp, Calendar } from "lucide-react";
import Pipeline from "@/pages/pipeline";
import PipelineValueDetail from "@/pages/analytics-pipeline-value";
import Forecast90Days from "@/pages/analytics-forecast-90-days";

const pipelineTabs: SectionTab[] = [
  {
    label: "Opportunities",
    value: "opportunities",
    icon: Target,
    path: "/pipeline",
  },
  {
    label: "Pipeline Value",
    value: "value",
    icon: TrendingUp,
    path: "/pipeline/value",
  },
  {
    label: "90-Day Forecast",
    value: "forecast",
    icon: Calendar,
    path: "/pipeline/forecast",
  },
];

export default function PipelineWithTabs() {
  const [location] = useLocation();

  let PipelineComponent = Pipeline;
  if (location === "/pipeline/value") {
    PipelineComponent = PipelineValueDetail;
  } else if (location === "/pipeline/forecast") {
    PipelineComponent = Forecast90Days;
  }

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={pipelineTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        <PipelineComponent />
      </div>
    </div>
  );
}
