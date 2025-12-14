import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "wouter";

// Map segments to user-friendly labels
const pathLabels: Record<string, string> = {
  "dashboard": "Dashboard",
  "dev-director": "Dev Director",
  "mgo": "Major Gifts Officer",
  "ceo": "CEO",
  "welcome": "Welcome",
  "solutions": "Solutions",
  "proposals": "Proposals",
  "donors": "Donors",
  "major-gifts": "Major Gifts",
  "lybunt": "LYBUNT",
  "sybunt": "SYBUNT",
  "prospects": "Prospects",
  "pipeline": "Pipeline",
  "value": "Pipeline Value",
  "forecast": "90-Day Forecast",
  "analytics": "Analytics",
  "campaigns": "Campaigns",
  "performance": "Performance",
  "goals": "Goals & Targets",
  "trends": "Trends",
  "ai": "AI Intelligence",
  "predictive-timing": "Predictive Timing",
  "wealth-events": "Wealth Events",
  "meeting-briefs": "Meeting Briefs",
  "voice-notes": "Voice Notes",
  "relationship": "Relationship Intelligence",
  "board-connections": "Board Connections",
  "board-network-mapper": "Board Network Mapper",
  "corporate-partnerships": "Corporate Partnerships",
  "peer-donors": "Peer Donors",
  "content": "AI Content",
  "outreach": "Outreach Generator",
  "grant-proposals": "Grant Proposals",
  "impact-reports": "Impact Reports",
  "peer-benchmarks": "Peer Benchmarks",
  "sentiment": "Sentiment Analysis",
  "portfolio-optimization": "Portfolio Optimization",
  "ytd-vs-goal": "YTD vs Goal",
  "workflow": "Workflow Automation",
  "calendar": "Smart Calendar",
  "stewardship": "Stewardship",
  "task-priorities": "Task Priorities",
  "gift-registries": "Gift Registries",
  "workflows": "Workflows",
  "templates": "Templates",
  "canvas": "Canvas",
  "grants": "Grants",
  "gifts": "Gifts",
  "data-health": "Data Health",
  "integrations": "Integrations",
  "settings": "Settings",
  "tech-stack-mapper": "Tech Stack Mapper",
  "organization-mapper": "Organization Mapper",
  "organization-workflow-canvas": "Organization Workflow Canvas",
  "navigation-mockups": "Navigation Mockups",
  "agent-value-map": "Agent Value Map",
};

// Map segments to their canonical route (when intermediate segments don't have their own page)
const canonicalRoutes: Record<string, string> = {
  "dashboard": "/", // Dashboard routes go to home
  "ai": "/ai/predictive-timing", // AI section defaults to first tab
  "relationship": "/relationship/board-connections", // Relationship section defaults to first page
  "content": "/content/outreach", // Content section defaults to first page
  "workflow": "/workflow/calendar", // Workflow section defaults to first page
};

interface BreadcrumbsProps {
  className?: string;
}

export function Breadcrumbs({ className = "" }: BreadcrumbsProps) {
  const [location] = useLocation();
  
  // Skip breadcrumbs on home page
  if (location === "/") {
    return null;
  }

  const pathSegments = location.split("/").filter(Boolean);
  
  // Build breadcrumb items with canonical route resolution
  const breadcrumbs = pathSegments.map((segment, index) => {
    const defaultPath = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = pathLabels[segment] || segment;
    const isLast = index === pathSegments.length - 1;
    
    // Use canonical route if available for this segment
    const path = canonicalRoutes[segment] || defaultPath;
    
    return {
      path,
      label,
      isLast,
    };
  });

  // If we have no valid breadcrumbs, don't render anything
  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav className={`flex items-center gap-2 text-sm ${className}`} aria-label="Breadcrumb" data-testid="breadcrumbs">
      <Link 
        href="/" 
        className="flex items-center gap-1 hover:text-white/100 transition-colors" 
        data-testid="breadcrumb-home"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>
      
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 opacity-60" aria-hidden="true" />
          {crumb.isLast ? (
            <span className="font-medium text-white" aria-current="page" data-testid={`breadcrumb-current`}>
              {crumb.label}
            </span>
          ) : (
            <Link 
              href={crumb.path} 
              className="hover:text-white/100 transition-colors" 
              data-testid={`breadcrumb-${index}`}
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
