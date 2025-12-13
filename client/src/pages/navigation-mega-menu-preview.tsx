import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FundRazorLogo } from "@/components/FundRazorLogo";
import { 
  Search, 
  Bell, 
  Settings, 
  User,
  Users,
  TrendingUp,
  Gift,
  Target,
  Calendar,
  Megaphone,
  Brain,
  Network,
  Building2,
  Folder,
  Lightbulb,
  FileText,
  ChevronDown,
  X
} from "lucide-react";

// Domain categories with their items
const navigationDomains = {
  "Constituents": {
    description: "People and organizations in your fundraising network",
    items: [
      { name: "Donors", href: "/donors", icon: Users, description: "View and manage all donors" },
      { name: "Relationships", href: "/relationships", icon: Network, description: "Network and connection mapping" },
      { name: "Corporations", href: "/corporate-partnerships", icon: Building2, description: "Corporate partnership management" },
      { name: "Quadrant", href: "/quadrant", icon: Target, description: "Donor relationship matrix" },
    ]
  },
  "Pipeline": {
    description: "Manage donor opportunities through the fundraising lifecycle",
    items: [
      { name: "Pipeline", href: "/pipeline", icon: TrendingUp, description: "Track and manage fundraising opportunities" },
    ]
  },
  "Revenue": {
    description: "Track incoming donations and funding",
    items: [
      { name: "Gifts", href: "/gifts", icon: Gift, description: "Record and analyze donations" },
      { name: "Grants", href: "/grants", icon: FileText, description: "Grant tracking and proposals" },
    ]
  },
  "Campaigns & Events": {
    description: "Fundraising initiatives and gatherings",
    items: [
      { name: "Campaigns", href: "/campaigns", icon: Megaphone, description: "Campaign performance metrics" },
      { name: "Events", href: "/events", icon: Calendar, description: "Fundraising events calendar" },
    ]
  },
  "Operations & Strategy": {
    description: "Tools, infrastructure, and special projects",
    items: [
      { name: "AI Tools", href: "/ai-tools", icon: Brain, description: "AI-powered fundraising assistance" },
      { name: "Infrastructure", href: "/other", icon: Folder, description: "System tools and settings" },
      { name: "Special Projects", href: "/temporary", icon: Lightbulb, description: "Development and testing" },
    ]
  }
};

type DomainKey = keyof typeof navigationDomains;

export default function NavigationMegaMenuPreview() {
  const [activeDropdown, setActiveDropdown] = useState<DomainKey | null>(null);

  const handleClick = (domain: DomainKey) => {
    if (activeDropdown === domain) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(domain);
    }
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Navigation Preview: Mega Menu by Domain</h1>
        <p className="text-muted-foreground">
          This preview shows how the navigation would look with a mega menu approach. 
          Click on the domain buttons to toggle the expanded menu.
        </p>
      </div>

      {/* Preview Container */}
      <Card>
        <CardHeader>
          <CardTitle>Mega Menu Navigation Preview</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Simulated Header */}
          <div className="relative">
            <header className="flex items-center gap-4 h-16 px-6 border-b bg-white dark:bg-gray-900">
              {/* Logo */}
              <div className="cursor-pointer hover:opacity-80 transition-opacity">
                <FundRazorLogo width={140} height={36} />
              </div>
              
              {/* Mega Menu Navigation */}
              <nav className="flex items-center gap-0.5 ml-4">
                {(Object.keys(navigationDomains) as DomainKey[]).map((domain) => (
                  <Button
                    key={domain}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleClick(domain)}
                    className={`font-semibold gap-1 text-sm ${
                      activeDropdown === domain 
                        ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400" 
                        : "text-blue-800 dark:text-blue-300"
                    } hover:bg-gray-100 dark:hover:bg-gray-800`}
                  >
                    {domain}
                    <ChevronDown className={`h-3 w-3 transition-transform ${activeDropdown === domain ? "rotate-180" : ""}`} />
                  </Button>
                ))}
              </nav>
              
              {/* Right side utilities */}
              <div className="flex items-center gap-1 ml-auto">
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2" />
                <Button variant="ghost" size="icon" className="text-blue-800 dark:text-blue-300">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-blue-800 dark:text-blue-300">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-blue-800 dark:text-blue-300">
                  <Settings className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-blue-800 dark:text-blue-300">
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </header>

            {/* Mega Menu Dropdown */}
            {activeDropdown && (
              <>
                {/* Backdrop to close on click outside */}
                <div 
                  className="fixed inset-0 z-40"
                  onClick={closeDropdown}
                />
                <div 
                  className="absolute left-0 right-0 top-16 bg-white dark:bg-gray-900 border-b shadow-lg z-50"
                >
                  <div className="max-w-4xl mx-auto p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{activeDropdown}</h3>
                        <p className="text-sm text-muted-foreground">{navigationDomains[activeDropdown].description}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={closeDropdown}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className={`grid gap-4 ${
                      navigationDomains[activeDropdown].items.length === 1 
                        ? "grid-cols-1 max-w-md" 
                        : navigationDomains[activeDropdown].items.length === 2 
                          ? "grid-cols-2 max-w-2xl"
                          : "grid-cols-3"
                    }`}>
                      {navigationDomains[activeDropdown].items.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                          onClick={closeDropdown}
                        >
                          <div className="p-2 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50">
                            <item.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{item.name}</div>
                            <div className="text-sm text-muted-foreground">{item.description}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Placeholder content area */}
            <div className="h-64 bg-muted/30 flex items-center justify-center">
              <p className="text-muted-foreground">Page content would appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Design Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Navigation Structure</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {(Object.entries(navigationDomains) as [DomainKey, typeof navigationDomains[DomainKey]][]).map(([domain, data]) => (
              <div key={domain} className="p-3 rounded-lg bg-muted/50">
                <div className="font-medium text-sm mb-2">{domain}</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {data.items.map((item) => (
                    <li key={item.name}>• {item.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
              <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Pros</h4>
              <ul className="text-sm space-y-1 text-green-800 dark:text-green-300">
                <li>• Reduces visible items from 12 to 5</li>
                <li>• Clear mental model: People → Process → Money → Activities → Tools</li>
                <li>• Click-based interaction (mobile-friendly)</li>
                <li>• Room for future expansion</li>
                <li>• Each category has distinct purpose</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
              <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Considerations</h4>
              <ul className="text-sm space-y-1 text-amber-800 dark:text-amber-300">
                <li>• Pipeline has only one item (could be direct link instead)</li>
                <li>• Users need to learn new groupings</li>
                <li>• Adds one click to reach destinations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
