import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  DollarSign, 
  Mail, 
  Calendar, 
  FileText, 
  BarChart3,
  Check
} from "lucide-react";
import {
  SiSalesforce,
  SiMailchimp,
} from "react-icons/si";

interface Platform {
  name: string;
  description: string;
  popularity?: "high" | "medium" | "growing";
  logo?: React.ComponentType<{ className?: string; size?: number }>;
  logoColor?: string;
  fallbackInitials?: string;
}

interface TechCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
  platforms: Platform[];
  integrationNeed: "critical" | "high" | "medium";
}

const sampleCategories: TechCategory[] = [
  {
    id: "crm",
    title: "CRM Systems",
    description: "Core donor database tracking gifts, pledges, and communications",
    icon: Database,
    platforms: [
      { 
        name: "Salesforce NPSP", 
        description: "Cloud-based CRM for integrated tracking", 
        popularity: "high",
        logo: SiSalesforce,
        logoColor: "#00A1E0"
      },
      { 
        name: "Blackbaud RE NXT", 
        description: "Industry standard for large nonprofits", 
        popularity: "high",
        fallbackInitials: "BB",
        logoColor: "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300"
      }
    ],
    integrationNeed: "critical"
  },
  {
    id: "marketing",
    title: "Marketing & Email",
    description: "Email, newsletters, and donor communication campaigns",
    icon: Mail,
    platforms: [
      { 
        name: "Mailchimp", 
        description: "Traditional email marketing", 
        popularity: "high",
        logo: SiMailchimp,
        logoColor: "#FFE01B"
      },
      { 
        name: "Constant Contact", 
        description: "Email marketing for nonprofits", 
        popularity: "medium",
        fallbackInitials: "CC",
        logoColor: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
      }
    ],
    integrationNeed: "high"
  },
  {
    id: "events",
    title: "Event Management",
    description: "Registration, ticketing, and event logistics",
    icon: Calendar,
    platforms: [
      { 
        name: "Eventbrite", 
        description: "Popular ticketing platform", 
        popularity: "high",
        fallbackInitials: "EB",
        logoColor: "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300"
      },
      { 
        name: "Classy Events", 
        description: "Fundraising event management", 
        popularity: "medium",
        fallbackInitials: "CE",
        logoColor: "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300"
      }
    ],
    integrationNeed: "medium"
  },
  {
    id: "grants",
    title: "Grant Management",
    description: "Proposal tracking, reporting, and compliance",
    icon: FileText,
    platforms: [
      { 
        name: "Fluxx", 
        description: "Grant lifecycle management", 
        popularity: "high",
        fallbackInitials: "FL",
        logoColor: "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300"
      },
      { 
        name: "GrantHub", 
        description: "Collaborative grant tracking", 
        popularity: "medium",
        fallbackInitials: "GH",
        logoColor: "bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300"
      }
    ],
    integrationNeed: "high"
  },
  {
    id: "wealth",
    title: "Wealth Screening",
    description: "Identify and prioritize high-capacity donors",
    icon: DollarSign,
    platforms: [
      { 
        name: "WealthEngine", 
        description: "Wealth and lifestyle indicators", 
        popularity: "high",
        fallbackInitials: "WE",
        logoColor: "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
      },
      { 
        name: "iWave", 
        description: "Wealth and philanthropic data", 
        popularity: "high",
        fallbackInitials: "iW",
        logoColor: "bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300"
      }
    ],
    integrationNeed: "critical"
  },
  {
    id: "analytics",
    title: "Analytics & BI",
    description: "Dashboards, reporting, and data visualization",
    icon: BarChart3,
    platforms: [
      { 
        name: "Tableau", 
        description: "Enterprise data visualization", 
        popularity: "high",
        fallbackInitials: "TB",
        logoColor: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
      },
      { 
        name: "Power BI", 
        description: "Microsoft analytics platform", 
        popularity: "high",
        fallbackInitials: "PB",
        logoColor: "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300"
      }
    ],
    integrationNeed: "medium"
  }
];

const designStyles = {
  glassmorphism: {
    name: "Glassmorphism",
    description: "Modern frosted glass effect with subtle gradients and blur",
    cardClass: "backdrop-blur-sm bg-card/60 border-2 border-primary/10 shadow-lg hover:shadow-xl hover:border-primary/20 transition-all duration-300",
    headerGradient: "bg-gradient-to-br from-primary/5 to-primary/10",
    platformClass: "backdrop-blur-sm bg-background/40 border border-primary/10 hover:bg-background/60 hover:border-primary/20 transition-all",
  },
  elevated: {
    name: "Elevated Cards",
    description: "Bold shadows with depth and prominent hover effects",
    cardClass: "bg-card border-2 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300",
    headerGradient: "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent",
    platformClass: "bg-muted/70 border-2 border-muted-foreground/10 hover:bg-muted hover:border-primary/30 hover:shadow-md transition-all",
  },
  gradient: {
    name: "Gradient Accent",
    description: "Subtle gradient borders using Sky Blue/Ice Blue palette",
    cardClass: "bg-card border-2 border-transparent bg-gradient-to-br from-primary/10 via-card to-card bg-origin-border hover:from-primary/20 transition-all duration-300",
    headerGradient: "bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-indigo-500/10",
    platformClass: "bg-muted border border-primary/20 hover:border-primary/40 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent transition-all",
  },
  minimal: {
    name: "Minimal Flat",
    description: "Clean, minimal design with subtle color accents",
    cardClass: "bg-card border hover:border-primary/30 transition-colors duration-200",
    headerGradient: "bg-primary/5",
    platformClass: "bg-muted/50 border-l-4 border-l-primary/30 hover:bg-muted hover:border-l-primary transition-all",
  },
  neumorphic: {
    name: "Neumorphic",
    description: "Soft, subtle shadows for tactile depth perception",
    cardClass: "bg-card border-0 shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.05)] hover:shadow-[12px_12px_24px_rgba(0,0,0,0.15),-12px_-12px_24px_rgba(255,255,255,0.08)] transition-shadow duration-300",
    headerGradient: "bg-gradient-to-br from-primary/5 to-transparent",
    platformClass: "bg-background shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.05)] hover:shadow-[6px_6px_12px_rgba(0,0,0,0.15),-6px_-6px_12px_rgba(255,255,255,0.08)] transition-shadow",
  },
};

type DesignKey = keyof typeof designStyles;

export default function CardDesignPreview() {
  const [selectedDesign, setSelectedDesign] = useState<DesignKey>("glassmorphism");
  const currentStyle = designStyles[selectedDesign];

  return (
    <div className="min-h-screen p-8 space-y-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Card Design Preview</h1>
        <p className="text-muted-foreground mb-6">
          Compare different card styles for the Tech Stack Mapper. Click a design option to preview it.
        </p>

        {/* Design Selection Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {(Object.keys(designStyles) as DesignKey[]).map((key) => (
            <Button
              key={key}
              variant={selectedDesign === key ? "default" : "outline"}
              onClick={() => setSelectedDesign(key)}
              className="flex-col h-auto py-3 px-4 items-start gap-1"
              data-testid={`button-design-${key}`}
            >
              <div className="flex items-center gap-2 w-full">
                {selectedDesign === key && <Check className="w-4 h-4" />}
                <span className="font-semibold">{designStyles[key].name}</span>
              </div>
              <span className="text-xs text-left opacity-80 font-normal">
                {designStyles[key].description}
              </span>
            </Button>
          ))}
        </div>

        {/* Current Selection Info */}
        <Card className="mb-8 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Currently Viewing: {currentStyle.name}</p>
                <p className="text-sm text-muted-foreground">{currentStyle.description}</p>
              </div>
              <Check className="w-6 h-6 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Grid */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">System Architecture Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleCategories.map((category) => (
            <div 
              key={category.id}
              className={`p-6 rounded-xl ${currentStyle.cardClass}`}
            >
              {/* Header */}
              <div className={`-mx-6 -mt-6 p-4 rounded-t-xl mb-4 ${currentStyle.headerGradient}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base truncate">{category.title}</h3>
                    <Badge 
                      variant="outline" 
                      className={`text-xs mt-1 ${
                        category.integrationNeed === 'critical' 
                          ? 'border-red-500/50 text-red-700 dark:text-red-400' 
                          : category.integrationNeed === 'high'
                          ? 'border-orange-500/50 text-orange-700 dark:text-orange-400'
                          : 'border-blue-500/50 text-blue-700 dark:text-blue-400'
                      }`}
                    >
                      {category.integrationNeed.charAt(0).toUpperCase() + category.integrationNeed.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4">
                {category.description}
              </p>

              {/* Platforms */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Common Platforms
                </h4>
                {category.platforms.map((platform) => {
                  const Logo = platform.logo;
                  return (
                    <div
                      key={platform.name}
                      className={`p-3 rounded-lg ${currentStyle.platformClass}`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {Logo ? (
                          <div 
                            style={platform.logoColor && platform.logoColor.startsWith('#') 
                              ? { color: platform.logoColor } 
                              : undefined
                            }
                            className="shrink-0"
                          >
                            <Logo size={20} />
                          </div>
                        ) : (
                          <div 
                            className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center ${
                              platform.logoColor || 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {platform.fallbackInitials || platform.name.substring(0, 1)}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{platform.name}</p>
                          {platform.popularity && (
                            <Badge variant="secondary" className="text-xs mt-0.5">
                              {platform.popularity === 'high' ? '⭐ Popular' : 
                               platform.popularity === 'growing' ? '📈 Growing' : 
                               '✓ Established'}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {platform.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
