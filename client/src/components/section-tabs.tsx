import { useLocation } from "wouter";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AccentTabs, AccentTabsList, AccentTabsTrigger, ACCENT_TAB_COLORS } from "@/components/ui/accent-tabs";

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
  variant?: "default" | "cards" | "accent";
}

export function SectionTabs({ tabs, currentPath, variant = "accent" }: SectionTabsProps) {
  const [, setLocation] = useLocation();

  const handleTabChange = (value: string) => {
    const tab = tabs.find(t => t.value === value);
    if (tab) {
      setLocation(tab.path);
    }
  };

  const getActiveTab = () => {
    const fullPath = window.location.pathname + window.location.search;
    let matchedTab = tabs.find(t => t.path === fullPath);
    if (!matchedTab) {
      matchedTab = tabs.find(t => t.path === currentPath);
    }
    if (!matchedTab) {
      matchedTab = tabs.find(t => 
        t.path !== '/' && currentPath.startsWith(t.path)
      );
    }
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
      <div className="px-6 py-3">
        <AccentTabs value={activeTab} onValueChange={handleTabChange}>
          <AccentTabsList className="flex flex-wrap gap-1 mb-0">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const accent = ACCENT_TAB_COLORS[index % ACCENT_TAB_COLORS.length];
              return (
                <AccentTabsTrigger
                  key={tab.value}
                  value={tab.value}
                  accent={accent}
                  data-testid={`tab-${tab.value}`}
                  className="gap-2"
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {tab.label}
                </AccentTabsTrigger>
              );
            })}
          </AccentTabsList>
        </AccentTabs>
      </div>
    </div>
  );
}
