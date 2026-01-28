import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  DollarSign, 
  Mail, 
  Calendar, 
  FileText, 
  BarChart3,
  Check,
  TrendingUp,
  ArrowUpRight
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
  stats: {
    platformCount: number;
    trend: number;
  };
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
    integrationNeed: "critical",
    stats: { platformCount: 4, trend: 12.5 }
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
    integrationNeed: "high",
    stats: { platformCount: 5, trend: 8.3 }
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
    integrationNeed: "medium",
    stats: { platformCount: 3, trend: -2.1 }
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
    integrationNeed: "high",
    stats: { platformCount: 6, trend: 15.7 }
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
    integrationNeed: "critical",
    stats: { platformCount: 4, trend: 22.4 }
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
    integrationNeed: "medium",
    stats: { platformCount: 7, trend: 18.9 }
  }
];

// Design styles based on 2025 trends
const designStyles = {
  linear: {
    name: "Linear Ultra-Minimal",
    description: "Performance-first aesthetic with zero visual noise. Dark tones, sharp typography, instant interactions.",
    tag: "2025 Trending"
  },
  data: {
    name: "Data-First Hierarchy",
    description: "Large numbers, small labels. Metrics take center stage with strategic whitespace and minimal decoration.",
    tag: "Enterprise Standard"
  },
  glass: {
    name: "Advanced Glassmorphism",
    description: "Progressive blur layers with frosted glass depth. Subtle gradients and translucent backgrounds.",
    tag: "Premium Design"
  },
  neuro: {
    name: "Neumorphic Depth",
    description: "Soft 3D elements with intelligent lighting. Cards that physically lift and recede from surface.",
    tag: "Tactile Experience"
  },
  brutalist: {
    name: "Brutalist Minimalism",
    description: "Ultra-bold typography, monochrome palette, strategic color accents. Maximum impact, zero decoration.",
    tag: "Cutting Edge"
  },
};

type DesignKey = keyof typeof designStyles;

export default function CardDesignModern() {
  const [selectedDesign, setSelectedDesign] = useState<DesignKey>("linear");
  const currentStyle = designStyles[selectedDesign];

  // Render card based on selected style
  const renderCard = (category: TechCategory) => {
    switch(selectedDesign) {
      case "linear":
        return <LinearCard key={category.id} category={category} />;
      case "data":
        return <DataFirstCard key={category.id} category={category} />;
      case "glass":
        return <GlassCard key={category.id} category={category} />;
      case "neuro":
        return <NeuroCard key={category.id} category={category} />;
      case "brutalist":
        return <BrutalistCard key={category.id} category={category} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-8 space-y-8 bg-background">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <Badge variant="outline" className="mb-4 border-primary/30">
          Researched from Linear, Stripe, Notion design systems
        </Badge>
        <h1 className="text-4xl font-bold mb-2">2025 Card Design Trends</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Cutting-edge designs based on latest enterprise dashboard trends
        </p>

        {/* Design Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
          {(Object.keys(designStyles) as DesignKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedDesign(key)}
              className={`text-left p-4 rounded-lg border-2 transition-all ${
                selectedDesign === key
                  ? 'border-primary bg-primary/5 shadow-lg'
                  : 'border-border hover:border-primary/30 hover-elevate'
              }`}
              data-testid={`button-design-${key}`}
            >
              <div className="flex items-start justify-between mb-2">
                <Badge 
                  variant={selectedDesign === key ? "default" : "secondary"}
                  className="text-xs"
                >
                  {designStyles[key].tag}
                </Badge>
                {selectedDesign === key && <Check className="w-4 h-4 text-primary" />}
              </div>
              <h3 className="font-semibold text-sm mb-1">{designStyles[key].name}</h3>
              <p className="text-xs text-muted-foreground leading-tight">
                {designStyles[key].description}
              </p>
            </button>
          ))}
        </div>

        {/* Current Selection */}
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Check className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Now Viewing: {currentStyle.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{currentStyle.description}</p>
        </div>
      </div>

      {/* Preview Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleCategories.map(renderCard)}
        </div>
      </div>
    </div>
  );
}

// LINEAR ULTRA-MINIMAL CARD
function LinearCard({ category }: { category: TechCategory }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative rounded-lg border bg-card p-6 transition-all duration-200 hover:border-primary/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top indicator line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Header - Minimal */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
            <category.icon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-base">{category.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{category.stats.platformCount} platforms</p>
          </div>
        </div>
        <ArrowUpRight className={`w-4 h-4 text-muted-foreground transition-all ${isHovered ? 'translate-x-0.5 -translate-y-0.5 text-primary' : ''}`} />
      </div>

      {/* Stats - Large and bold */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className={`text-2xl font-bold ${category.stats.trend > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {category.stats.trend > 0 ? '+' : ''}{category.stats.trend}%
          </span>
          <TrendingUp className={`w-4 h-4 ${category.stats.trend > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400 rotate-180'}`} />
        </div>
        <p className="text-xs text-muted-foreground mt-1">Adoption growth</p>
      </div>

      {/* Platforms - Compact list */}
      <div className="space-y-2">
        {category.platforms.slice(0, 2).map((platform) => {
          const Logo = platform.logo;
          return (
            <div key={platform.name} className="flex items-center gap-2 text-sm">
              {Logo ? (
                <div style={platform.logoColor?.startsWith('#') ? { color: platform.logoColor } : undefined}>
                  <Logo size={14} />
                </div>
              ) : (
                <div className={`w-3.5 h-3.5 rounded text-[8px] font-bold flex items-center justify-center ${platform.logoColor}`}>
                  {platform.fallbackInitials}
                </div>
              )}
              <span className="text-xs text-muted-foreground truncate">{platform.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// DATA-FIRST HIERARCHY CARD
function DataFirstCard({ category }: { category: TechCategory }) {
  return (
    <div className="rounded-lg border bg-card overflow-hidden transition-all hover:shadow-xl">
      {/* Giant metric section */}
      <div className="p-8 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="text-6xl font-bold mb-2">
          {category.stats.platformCount}
        </div>
        <div className="text-sm text-muted-foreground uppercase tracking-wide">
          Integrated Platforms
        </div>
        <div className="flex items-center gap-2 mt-3">
          <div className={`px-2 py-1 rounded text-xs font-semibold ${
            category.stats.trend > 0 
              ? 'bg-green-500/10 text-green-600 dark:text-green-400' 
              : 'bg-red-500/10 text-red-600 dark:text-red-400'
          }`}>
            {category.stats.trend > 0 ? '↑' : '↓'} {Math.abs(category.stats.trend)}%
          </div>
          <span className="text-xs text-muted-foreground">vs last quarter</span>
        </div>
      </div>

      {/* Content section - minimal */}
      <div className="p-6 pt-4 border-t">
        <div className="flex items-center gap-2 mb-3">
          <category.icon className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">{category.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
        
        {/* Platform badges */}
        <div className="flex flex-wrap gap-1.5">
          {category.platforms.map((p) => (
            <Badge key={p.name} variant="secondary" className="text-xs font-normal">
              {p.name.split(' ')[0]}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

// ADVANCED GLASSMORPHISM CARD
function GlassCard({ category }: { category: TechCategory }) {
  return (
    <div 
      className="relative rounded-2xl overflow-hidden group"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at top right, rgba(14, 165, 233, 0.1), transparent 70%)',
        }}
      />
      
      <div className="relative p-6">
        {/* Header with blur effect */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(14, 165, 233, 0.1)',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(14, 165, 233, 0.2)',
              }}
            >
              <category.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{category.title}</h3>
              <Badge 
                variant="outline" 
                className="mt-1 backdrop-blur-sm bg-primary/5 border-primary/20"
              >
                {category.integrationNeed}
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3 mb-4">
          <div>
            <div className="text-3xl font-bold">{category.stats.platformCount}</div>
            <div className="text-xs text-muted-foreground">Available platforms</div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`px-3 py-1 rounded-full backdrop-blur-sm ${
              category.stats.trend > 0
                ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20'
                : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
            }`}>
              <span className="text-sm font-semibold">{category.stats.trend > 0 ? '+' : ''}{category.stats.trend}%</span>
            </div>
            <span className="text-xs text-muted-foreground">Growth rate</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground/80 mb-4">{category.description}</p>

        {/* Platforms */}
        <div className="flex flex-wrap gap-2">
          {category.platforms.map((platform) => {
            const Logo = platform.logo;
            return (
              <div
                key={platform.name}
                className="px-3 py-2 rounded-lg backdrop-blur-sm"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex items-center gap-2">
                  {Logo ? (
                    <div style={platform.logoColor?.startsWith('#') ? { color: platform.logoColor } : undefined}>
                      <Logo size={16} />
                    </div>
                  ) : (
                    <div className={`w-4 h-4 rounded text-[10px] font-bold flex items-center justify-center ${platform.logoColor}`}>
                      {platform.fallbackInitials}
                    </div>
                  )}
                  <span className="text-xs font-medium">{platform.name.split(' ')[0]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// NEUMORPHIC DEPTH CARD
function NeuroCard({ category }: { category: TechCategory }) {
  return (
    <div 
      className="rounded-2xl p-6 transition-all duration-300 hover:shadow-[8px_8px_24px_rgba(0,0,0,0.2),-8px_-8px_24px_rgba(255,255,255,0.05)]"
      style={{
        background: 'hsl(var(--card))',
        boxShadow: '12px 12px 24px rgba(0, 0, 0, 0.15), -12px -12px 24px rgba(255, 255, 255, 0.03)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center transition-all"
          style={{
            boxShadow: 'inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.02)',
            background: 'linear-gradient(145deg, hsl(var(--primary) / 0.05), hsl(var(--primary) / 0.1))',
          }}
        >
          <category.icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{category.title}</h3>
          <p className="text-xs text-muted-foreground">{category.description}</p>
        </div>
      </div>

      {/* Stats panel */}
      <div 
        className="rounded-xl p-4 mb-4"
        style={{
          boxShadow: 'inset 2px 2px 6px rgba(0, 0, 0, 0.1), inset -2px -2px 6px rgba(255, 255, 255, 0.02)',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">{category.stats.platformCount}</div>
            <div className="text-xs text-muted-foreground mt-1">Platforms</div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${category.stats.trend > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {category.stats.trend > 0 ? '+' : ''}{category.stats.trend}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">Growth</div>
          </div>
        </div>
      </div>

      {/* Platform list */}
      <div className="space-y-2">
        {category.platforms.map((platform) => {
          const Logo = platform.logo;
          return (
            <div
              key={platform.name}
              className="p-3 rounded-lg transition-all hover:shadow-[4px_4px_8px_rgba(0,0,0,0.15),-4px_-4px_8px_rgba(255,255,255,0.02)]"
              style={{
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(255, 255, 255, 0.02)',
              }}
            >
              <div className="flex items-center gap-3">
                {Logo ? (
                  <div style={platform.logoColor?.startsWith('#') ? { color: platform.logoColor } : undefined}>
                    <Logo size={18} />
                  </div>
                ) : (
                  <div className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${platform.logoColor}`}>
                    {platform.fallbackInitials}
                  </div>
                )}
                <div className="flex-1">
                  <div className="text-sm font-medium">{platform.name}</div>
                  <div className="text-xs text-muted-foreground">{platform.description}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// BRUTALIST MINIMALISM CARD
function BrutalistCard({ category }: { category: TechCategory }) {
  return (
    <div className="border-4 border-foreground bg-background p-0 overflow-hidden transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_hsl(var(--primary))]">
      {/* Header - Bold accent bar */}
      <div className="bg-primary p-4">
        <div className="flex items-center gap-3">
          <category.icon className="w-8 h-8 text-primary-foreground" />
          <h3 className="font-black text-xl text-primary-foreground uppercase tracking-tight">
            {category.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Giant stat */}
        <div className="mb-4">
          <div className="text-7xl font-black leading-none mb-2">
            {category.stats.platformCount}
          </div>
          <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Platforms Available
          </div>
        </div>

        {/* Trend indicator */}
        <div className="mb-6">
          <div className={`inline-block px-4 py-2 font-black text-lg ${
            category.stats.trend > 0
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          }`}>
            {category.stats.trend > 0 ? '▲' : '▼'} {Math.abs(category.stats.trend)}%
          </div>
          <span className="ml-3 text-sm font-bold uppercase">Growth Rate</span>
        </div>

        {/* Description */}
        <p className="text-sm mb-6 font-medium">{category.description}</p>

        {/* Platform names - text only */}
        <div className="space-y-2">
          {category.platforms.map((platform, idx) => (
            <div key={platform.name} className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 border-2 border-foreground flex items-center justify-center font-black">
                {idx + 1}
              </div>
              <span className="font-bold">{platform.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Priority badge */}
      <div className="border-t-4 border-foreground p-3 bg-muted">
        <div className="text-xs font-black uppercase tracking-wider">
          Priority: {category.integrationNeed}
        </div>
      </div>
    </div>
  );
}
