import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Zap, 
  Layers, 
  Grid, 
  Palette,
  Command,
  ChevronRight,
  Check
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NavigationOption {
  id: string;
  name: string;
  tagline: string;
  inspiration: string;
  icon: any;
  iconColor: string;
  speed: number; // 1-5
  learningCurve: "Easy" | "Medium" | "Steep";
  screenSpace: "Maximum" | "High" | "Good" | "Medium";
  mobile: "Excellent" | "Good" | "Fair";
  bestFeature: string;
  description: string;
  keyFeatures: string[];
  pros: string[];
  cons: string[];
  visualStyle: string;
  interactions: string[];
}

const navigationOptions: NavigationOption[] = [
  {
    id: "focus-hubs",
    name: "Focus Hubs",
    tagline: "Lightning-fast hub switching with minimal chrome",
    inspiration: "Linear & Vercel",
    icon: Zap,
    iconColor: "text-yellow-500",
    speed: 4,
    learningCurve: "Medium",
    screenSpace: "Maximum",
    mobile: "Good",
    bestFeature: "Keyboard shortcuts",
    description: "Sidebar collapses to icon-only hubs. Clicking reveals a slim flyout with context summary while the page shows a top-aligned tab rail with subtle motion blur. Tabs display inline metrics and support keyboard cycling.",
    keyFeatures: [
      "Icon-only sidebar with 5 main hubs",
      "Slim flyout shows context summary",
      "Top-aligned tab rail with motion effects",
      "⌘⇧←/→ keyboard shortcuts to cycle tabs",
      "Inline metrics on tabs (e.g., 'Pipeline $2.1M')",
      "Active tab gets accent underline + icon animation"
    ],
    pros: [
      "Lightning-fast hub switching",
      "Minimal UI chrome maximizes content",
      "Maximum screen real estate",
      "Keyboard-first workflow"
    ],
    cons: [
      "Steeper learning curve for first-time users",
      "Requires icon recognition",
      "May feel too minimal for some teams"
    ],
    visualStyle: "Minimalist icon sidebar with hover tooltips, smooth tab transitions with glass morphism effect",
    interactions: [
      "Hover icons → Show tooltip with hub name",
      "Click hub → Expand flyout + reveal tab rail",
      "⌘⇧← → Previous tab",
      "⌘⇧→ → Next tab",
      "Tab animation: Slide in with fade"
    ]
  },
  {
    id: "command-surface",
    name: "Command Surface",
    tagline: "Keyboard-first navigation with powerful search",
    inspiration: "Notion & Superhuman",
    icon: Command,
    iconColor: "text-purple-500",
    speed: 5,
    learningCurve: "Easy",
    screenSpace: "High",
    mobile: "Excellent",
    bestFeature: "⌘K search everywhere",
    description: "Sidebar shows only hub labels. Clicking opens a full-bleed header with segmented control tabs and integrated command palette (⌘K). Palette filters within current hub or searches globally. Tabs morph into pill toggles on mobile.",
    keyFeatures: [
      "Clean text-based sidebar with hub labels",
      "Full-bleed header with segmented controls",
      "⌘K command palette with fuzzy search",
      "Global or hub-scoped search modes",
      "Pill-style tabs for mobile (horizontal scroll)",
      "Gradient backdrop on active tab"
    ],
    pros: [
      "Extremely fast with keyboard shortcuts",
      "Excellent discoverability via search",
      "Accessible and intuitive",
      "Mobile-optimized"
    ],
    cons: [
      "Depends on robust search indexing",
      "Requires comprehensive content tagging",
      "Command palette needs training"
    ],
    visualStyle: "Clean segmented controls (iOS-style pill tabs), command palette with fuzzy search and keyboard nav",
    interactions: [
      "⌘K → Open command palette",
      "Type to search → Fuzzy match results",
      "↓/↑ → Navigate results",
      "Enter → Select and navigate",
      "Esc → Close palette"
    ]
  },
  {
    id: "progressive-masthead",
    name: "Progressive Masthead",
    tagline: "Elegant hierarchy with breadcrumb context",
    inspiration: "Stripe & Figma",
    icon: Layers,
    iconColor: "text-blue-500",
    speed: 3,
    learningCurve: "Easy",
    screenSpace: "Good",
    mobile: "Good",
    bestFeature: "Breadcrumb context",
    description: "Sidebar reduces to stacked icon buttons with tooltips. Hub selection animates a masthead bar beneath top nav containing gradient-backed tabs and breadcrumb trail. Secondary actions live in right-aligned overflow menu.",
    keyFeatures: [
      "Stacked icon buttons with tooltips",
      "Animated masthead bar beneath header",
      "Gradient-backed tabs with brand colors",
      "Breadcrumb trail: Hub > Tab > Subpage",
      "Right-aligned overflow menu (⋯) for actions",
      "Smooth height animation on masthead"
    ],
    pros: [
      "Strong information hierarchy",
      "Great for analytics-heavy pages",
      "Elegant and professional",
      "Clear navigation context"
    ],
    cons: [
      "Masthead reduces vertical space slightly",
      "More UI chrome than minimal options",
      "Breadcrumb can get long on deep pages"
    ],
    visualStyle: "Elegant masthead with gradient accents, breadcrumb trail, smooth height animations",
    interactions: [
      "Click icon → Animate masthead in",
      "Masthead slides down from top",
      "Tab click → Smooth transition",
      "Breadcrumb click → Navigate to parent",
      "Overflow menu → Show secondary actions"
    ]
  },
  {
    id: "adaptive-matrix",
    name: "Adaptive Matrix",
    tagline: "Personalized workflows with context retention",
    inspiration: "Monday.com & Airtable",
    icon: Grid,
    iconColor: "text-pink-500",
    speed: 3,
    learningCurve: "Medium",
    screenSpace: "High",
    mobile: "Excellent",
    bestFeature: "Personalization",
    description: "Sidebar shows hub icons plus quick-create button. Upon selection, content area splits: upper zone with responsive tab chips (wrap on mobile), lower zone auto-loads your last-viewed tab. Includes radial menu for quick tab switching.",
    keyFeatures: [
      "Hub icons + quick-create button (+)",
      "Content area splits into upper/lower zones",
      "Responsive tab chips that wrap on mobile",
      "Auto-loads last-viewed tab per user",
      "Radial menu: press-and-hold for quick switch",
      "User avatar shows in tab for personal views"
    ],
    pros: [
      "Highly personalized experience",
      "Retains user context across sessions",
      "Innovative interaction patterns",
      "Great for collaborative teams"
    ],
    cons: [
      "More complex state persistence engineering",
      "Radial menu unfamiliar to some users",
      "Requires user session tracking"
    ],
    visualStyle: "Chip-style tabs with rounded corners, colored dots, user avatars, smooth split-panel animation",
    interactions: [
      "Click hub → Split content area",
      "Tab chips wrap on narrow screens",
      "Press & hold hub → Radial menu appears",
      "Drag on radial → Select tab quickly",
      "Auto-save last viewed tab"
    ]
  },
  {
    id: "dual-mode-ribbon",
    name: "Dual-Mode Ribbon",
    tagline: "Rich visual feedback with feature discovery",
    inspiration: "Pitch & Canva",
    icon: Palette,
    iconColor: "text-orange-500",
    speed: 2,
    learningCurve: "Easy",
    screenSpace: "Medium",
    mobile: "Fair",
    bestFeature: "Rich previews",
    description: "Sidebar shows hub icons + text label for ACTIVE hub only. Clicking loads a ribbon-style toolbar at top with grouped tabs. Hover tabs for rich preview (metrics/recent activity). Spacebar toggles ribbon collapse for focus mode. Badge indicators for unread insights.",
    keyFeatures: [
      "Hub icons with text only for active hub",
      "Ribbon-style toolbar with grouped tabs",
      "Hover tabs → Floating card preview appears",
      "Spacebar → Toggle ribbon collapse (focus mode)",
      "Badge indicators for unread/new items",
      "Micro-animations on tab interactions"
    ],
    pros: [
      "High discoverability of features",
      "Visually engaging and rich",
      "Great for showcasing capabilities",
      "Focus mode for distraction-free work"
    ],
    cons: [
      "Ribbon can feel busy if not curated",
      "Preview cards add complexity",
      "More screen space used by ribbon",
      "Fair mobile experience (desktop-first)"
    ],
    visualStyle: "Visually rich ribbon with micro-animations, floating preview cards on hover, collapse animation like window shade",
    interactions: [
      "Hover tab → Preview card floats up",
      "Preview shows metrics/recent activity",
      "Spacebar → Ribbon slides up (collapse)",
      "Badge pulse animation for new items",
      "Ribbon collapse feels like window shade"
    ]
  }
];

export default function NavigationPreview() {
  const [selectedOption, setSelectedOption] = useState<NavigationOption | null>(null);

  const renderSpeedStars = (speed: number) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Zap
            key={i}
            className={`w-3 h-3 ${
              i < speed
                ? "fill-yellow-500 text-yellow-500"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
    );
  };

  const getLearningCurveColor = (curve: string) => {
    switch (curve) {
      case "Easy":
        return "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300";
      case "Medium":
        return "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300";
      case "Steep":
        return "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold" data-testid="text-page-title">
          Navigation Design Preview
        </h1>
        <p className="text-sm text-muted-foreground">
          Explore 5 cutting-edge navigation patterns inspired by the best modern software
        </p>
      </div>

      {/* Recommendation Card */}
      <Card className="border-primary/50 bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Our Recommendation</CardTitle>
          </div>
          <CardDescription>
            For FundRazor, we recommend prototyping <strong>Command Surface</strong> and <strong>Progressive Masthead</strong>:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-start gap-2 text-sm">
            <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
            <span><strong>Command Surface</strong> suits power users (dev directors, MGOs) who need fast access across many features</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
            <span><strong>Progressive Masthead</strong> works beautifully for analytics-heavy use cases with clear hierarchies</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
            <span>Both are modern, proven patterns from industry leaders with excellent mobile support</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Comparison</CardTitle>
          <CardDescription>At a glance comparison of all 5 navigation patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-semibold">Option</th>
                  <th className="text-left py-3 px-2 font-semibold">Speed</th>
                  <th className="text-left py-3 px-2 font-semibold">Learning Curve</th>
                  <th className="text-left py-3 px-2 font-semibold">Screen Space</th>
                  <th className="text-left py-3 px-2 font-semibold">Mobile</th>
                  <th className="text-left py-3 px-2 font-semibold">Best Feature</th>
                </tr>
              </thead>
              <tbody>
                {navigationOptions.map((option) => (
                  <tr key={option.id} className="border-b hover-elevate">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <option.icon className={`w-4 h-4 ${option.iconColor}`} />
                        <span className="font-medium">{option.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">{renderSpeedStars(option.speed)}</td>
                    <td className="py-3 px-2">
                      <Badge variant="outline" className={`text-xs ${getLearningCurveColor(option.learningCurve)}`}>
                        {option.learningCurve}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-muted-foreground">{option.screenSpace}</td>
                    <td className="py-3 px-2 text-muted-foreground">{option.mobile}</td>
                    <td className="py-3 px-2 text-muted-foreground">{option.bestFeature}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Option Cards */}
      <div className="grid grid-cols-1 gap-6">
        {navigationOptions.map((option) => (
          <Card key={option.id} className="overflow-hidden" data-testid={`card-option-${option.id}`}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0`}>
                    <option.icon className={`w-6 h-6 ${option.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-xl">{option.name}</CardTitle>
                      {(option.id === "command-surface" || option.id === "progressive-masthead") && (
                        <Badge variant="default" className="text-xs bg-primary">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{option.tagline}</p>
                    <Badge variant="outline" className="text-xs">
                      Inspired by {option.inspiration}
                    </Badge>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedOption(option)}
                  data-testid={`button-view-details-${option.id}`}
                >
                  View Details
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Description */}
              <p className="text-sm leading-relaxed">{option.description}</p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Speed</p>
                  {renderSpeedStars(option.speed)}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Learning Curve</p>
                  <Badge variant="outline" className={`text-xs ${getLearningCurveColor(option.learningCurve)}`}>
                    {option.learningCurve}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Screen Space</p>
                  <p className="text-sm font-medium">{option.screenSpace}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Mobile</p>
                  <p className="text-sm font-medium">{option.mobile}</p>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="font-semibold text-sm mb-2">Key Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {option.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <Check className="w-3 h-3 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Dialog */}
      <Dialog open={!!selectedOption} onOpenChange={() => setSelectedOption(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedOption && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center`}>
                    <selectedOption.icon className={`w-5 h-5 ${selectedOption.iconColor}`} />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">{selectedOption.name}</DialogTitle>
                    <DialogDescription>{selectedOption.tagline}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Pros & Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm flex items-center gap-2 text-green-600 dark:text-green-400">
                      <Check className="w-4 h-4" />
                      Pros
                    </h4>
                    <ul className="space-y-1">
                      {selectedOption.pros.map((pro, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400">+</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm flex items-center gap-2 text-orange-600 dark:text-orange-400">
                      <ChevronRight className="w-4 h-4" />
                      Cons
                    </h4>
                    <ul className="space-y-1">
                      {selectedOption.cons.map((con, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-orange-600 dark:text-orange-400">-</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Visual Style */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Visual Style</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedOption.visualStyle}
                  </p>
                </div>

                {/* Interactions */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Key Interactions</h4>
                  <ul className="space-y-1">
                    {selectedOption.interactions.map((interaction, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <ChevronRight className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                        <span>{interaction}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Inspiration */}
                <div className="rounded-lg border p-4 bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">Inspired by</p>
                  <p className="font-semibold">{selectedOption.inspiration}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    This pattern combines proven UX principles from industry-leading products trusted by millions of users.
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
