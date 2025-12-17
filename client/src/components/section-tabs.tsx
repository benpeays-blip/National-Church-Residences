import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SectionTab {
  label: string;
  value: string;
  icon?: LucideIcon;
  path: string;
  description?: string;
}

interface SectionTabsProps {
  tabs: SectionTab[];
  currentPath: string;
  variant?: "default" | "cards";
}

export function SectionTabs({ tabs, currentPath, variant = "default" }: SectionTabsProps) {
  const [, setLocation] = useLocation();

  const handleTabChange = (value: string) => {
    const tab = tabs.find(t => t.value === value);
    if (tab) {
      setLocation(tab.path);
    }
  };

  // Determine active tab by matching path with or without query params
  const getActiveTab = () => {
    // Get the full URL path with query params
    const fullPath = window.location.pathname + window.location.search;
    
    // Try exact match first
    let matchedTab = tabs.find(t => t.path === fullPath);
    
    // If no exact match, try matching just the pathname
    if (!matchedTab) {
      matchedTab = tabs.find(t => t.path === currentPath);
    }
    
    // If still no match, try prefix matching for nested routes
    // E.g., /pipeline/value should match /pipeline tab
    if (!matchedTab) {
      matchedTab = tabs.find(t => 
        t.path !== '/' && currentPath.startsWith(t.path)
      );
    }
    
    // Fall back to first tab
    return matchedTab?.value || tabs[0]?.value;
  };

  const activeTab = getActiveTab();

  if (variant === "cards") {
    return (
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-6 py-3">
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.value === activeTab;
              return (
                <button
                  key={tab.value}
                  onClick={() => handleTabChange(tab.value)}
                  data-testid={`tab-${tab.value}`}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all",
                    "hover-elevate active-elevate-2",
                    isActive 
                      ? "bg-primary/10 border-primary text-primary font-medium" 
                      : "bg-card border-card-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span className="text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-6">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="h-12 bg-transparent border-0 rounded-none gap-1 w-auto inline-flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  data-testid={`tab-${tab.value}`}
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 gap-2"
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {tab.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
