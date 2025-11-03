import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { BarChart3, Brain, TrendingUp, Target } from "lucide-react";
import PeerBenchmarks from "@/pages/analytics-peer-benchmarks";
import SentimentAnalysis from "@/pages/analytics-sentiment";
import PortfolioOptimization from "@/pages/analytics-portfolio-optimization";
import YTDvsGoal from "@/pages/analytics-ytd-vs-goal";

const analyticsTabs: SectionTab[] = [
  {
    label: "Peer Benchmarks",
    value: "benchmarks",
    icon: BarChart3,
    path: "/analytics/peer-benchmarks",
  },
  {
    label: "Sentiment Analysis",
    value: "sentiment",
    icon: Brain,
    path: "/analytics/sentiment",
  },
  {
    label: "Portfolio Optimization",
    value: "portfolio",
    icon: TrendingUp,
    path: "/analytics/portfolio-optimization",
  },
  {
    label: "YTD vs Goal",
    value: "ytd",
    icon: Target,
    path: "/analytics/ytd-vs-goal",
  },
];

export default function AnalyticsWithTabs() {
  const [location] = useLocation();

  let AnalyticsComponent = PeerBenchmarks;
  if (location === "/analytics/sentiment") {
    AnalyticsComponent = SentimentAnalysis;
  } else if (location === "/analytics/portfolio-optimization") {
    AnalyticsComponent = PortfolioOptimization;
  } else if (location === "/analytics/ytd-vs-goal") {
    AnalyticsComponent = YTDvsGoal;
  }

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={analyticsTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        <AnalyticsComponent />
      </div>
    </div>
  );
}
