import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FundRazorLogo } from "@/components/FundRazorLogo";
import { 
  Search, 
  Bell, 
  Settings, 
  User,
  ChevronDown
} from "lucide-react";

// Domain categories with their items
const navigationDomains = {
  "Constituents": {
    items: [
      { name: "Donors", href: "/donors" },
      { name: "Relationships", href: "/relationships" },
      { name: "Corporations", href: "/corporate-partnerships" },
      { name: "Quadrant", href: "/quadrant" },
    ]
  },
  "Pipeline": {
    items: [
      { name: "Pipeline", href: "/pipeline" },
    ]
  },
  "Revenue": {
    items: [
      { name: "Gifts", href: "/gifts" },
      { name: "Grants", href: "/grants" },
    ]
  },
  "Campaigns & Events": {
    items: [
      { name: "Campaigns", href: "/campaigns" },
      { name: "Events", href: "/events" },
    ]
  },
  "Operations & Strategy": {
    items: [
      { name: "AI Tools", href: "/ai-tools" },
      { name: "Infrastructure", href: "/other" },
      { name: "Special Projects", href: "/temporary" },
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
        <h1 className="text-2xl font-bold mb-2">Navigation Preview: Dropdown Menu</h1>
        <p className="text-muted-foreground">
          Hover or click on the category buttons to see the dropdown menu.
        </p>
      </div>

      {/* Preview Container */}
      <Card>
        <CardHeader>
          <CardTitle>Dropdown Navigation Preview</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Simulated Header */}
          <div className="relative">
            <header className="flex items-center gap-4 h-16 px-6 border-b bg-white dark:bg-gray-900">
              {/* Logo */}
              <div className="cursor-pointer hover:opacity-80 transition-opacity">
                <FundRazorLogo width={140} height={36} />
              </div>
              
              {/* Dropdown Navigation */}
              <nav className="flex items-center gap-0.5 ml-4">
                {(Object.keys(navigationDomains) as DomainKey[]).map((domain) => (
                  <div
                    key={domain}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(domain)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Button
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

                    {/* Dropdown Menu - positioned directly below button */}
                    {activeDropdown === domain && (
                      <div 
                        className="absolute left-0 top-full mt-1 bg-white dark:bg-gray-900 border rounded-md shadow-lg z-50 min-w-[160px]"
                      >
                        <div className="py-1">
                          {navigationDomains[domain].items.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block px-4 py-2 text-sm text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                              onClick={closeDropdown}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
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
              <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Features</h4>
              <ul className="text-sm space-y-1 text-green-800 dark:text-green-300">
                <li>• Hover or click to open dropdown</li>
                <li>• Compact dropdown positioned below button</li>
                <li>• Simple text-only menu items</li>
                <li>• 5 categories instead of 12 buttons</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
              <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Considerations</h4>
              <ul className="text-sm space-y-1 text-amber-800 dark:text-amber-300">
                <li>• Pipeline has only one item (could be direct link)</li>
                <li>• Users need to learn new groupings</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
