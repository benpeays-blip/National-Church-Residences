import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { LucideIcon } from "lucide-react";

export interface SectionTab {
  label: string;
  value: string;
  icon?: LucideIcon;
  path: string;
}

interface SectionTabsProps {
  tabs: SectionTab[];
  currentPath: string;
}

export function SectionTabs({ tabs, currentPath }: SectionTabsProps) {
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
    
    // Fall back to first tab
    return matchedTab?.value || tabs[0]?.value;
  };

  const activeTab = getActiveTab();

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
