import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Search,
  HandCoins,
  Banknote,
  Wallet,
  HeartPulse,
  HeartHandshake,
  UserCog,
  UserCheck,
  UsersRound,
  Coins,
  UserSquare2,
  TrendingUp,
  Target,
  BarChart3
} from "lucide-react";

export default function IconStyleGuide() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Icon Style Guide Options</h1>
        <p className="text-muted-foreground">
          Choose your preferred icon style. All options use your navy/sky blue palette (#0A1628, #0F172A, #0284C7, #7DD3FC) and eliminate pink/purple/green.
        </p>
      </div>

      {/* Color Palette Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Color Palette</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded border" style={{ backgroundColor: "#FFFFFF" }}></div>
              <div>
                <div className="text-sm font-medium">#FFFFFF</div>
                <div className="text-xs text-muted-foreground">White</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded border" style={{ backgroundColor: "#7DD3FC" }}></div>
              <div>
                <div className="text-sm font-medium">#7DD3FC</div>
                <div className="text-xs text-muted-foreground">Ice Blue</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded border" style={{ backgroundColor: "#0284C7" }}></div>
              <div>
                <div className="text-sm font-medium">#0284C7</div>
                <div className="text-xs text-muted-foreground">Sky Blue</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded border" style={{ backgroundColor: "#1A3A5C" }}></div>
              <div>
                <div className="text-sm font-medium">#1A3A5C</div>
                <div className="text-xs text-muted-foreground">Navy Blue</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded border" style={{ backgroundColor: "#0F172A" }}></div>
              <div>
                <div className="text-sm font-medium">#0F172A</div>
                <div className="text-xs text-muted-foreground">Deep Slate</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded border" style={{ backgroundColor: "#0A1628" }}></div>
              <div>
                <div className="text-sm font-medium">#0A1628</div>
                <div className="text-xs text-muted-foreground">Dark Navy</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approach A: Monochrome Solid Glyphs */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CardTitle>Approach A: Monochrome Solid Glyphs</CardTitle>
                <Badge variant="outline">Clean</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Filled icons with subtle background badges. Icons in #0F172A (default), #0284C7 (active), #7DD3FC (hover)
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Examples */}
          <div>
            <div className="text-sm font-medium mb-3">Stage Icons:</div>
            <div className="flex gap-4 flex-wrap">
              {/* Stewardship - Heart with Sky Blue */}
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-lg border-2" style={{ 
                  backgroundColor: "#0F172A10", 
                  borderColor: "#0F172A20" 
                }}>
                  <Heart className="w-5 h-5" style={{ fill: "#0284C7", stroke: "none" }} />
                </div>
                <div className="text-xs text-muted-foreground">Stewardship</div>
              </div>

              {/* Processing - HandCoins */}
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-lg border-2" style={{ 
                  backgroundColor: "#0F172A10", 
                  borderColor: "#0F172A20" 
                }}>
                  <HandCoins className="w-5 h-5" style={{ fill: "#0F172A", stroke: "none" }} />
                </div>
                <div className="text-xs text-muted-foreground">Gift Processing</div>
              </div>

              {/* Cultivation - UsersRound */}
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-lg border-2" style={{ 
                  backgroundColor: "#1A3A5C20", 
                  borderColor: "#1A3A5C40" 
                }}>
                  <UsersRound className="w-5 h-5" style={{ fill: "#0F172A", stroke: "none" }} />
                </div>
                <div className="text-xs text-muted-foreground">Cultivation</div>
              </div>

              {/* Prospect - Search */}
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-lg border-2" style={{ 
                  backgroundColor: "#1A3A5C20", 
                  borderColor: "#1A3A5C40" 
                }}>
                  <Search className="w-5 h-5" style={{ fill: "#0F172A", stroke: "none" }} />
                </div>
                <div className="text-xs text-muted-foreground">Prospect Research</div>
              </div>

              {/* Leadership - BarChart3 */}
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-lg border-2" style={{ 
                  backgroundColor: "#7DD3FC20", 
                  borderColor: "#7DD3FC40" 
                }}>
                  <BarChart3 className="w-5 h-5" style={{ fill: "#7DD3FC", stroke: "none" }} />
                </div>
                <div className="text-xs text-muted-foreground">Leadership</div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-3">In Context (Sidebar Example):</div>
            <div className="inline-flex flex-col gap-1 p-4 rounded-lg bg-card border w-64">
              <button className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors">
                <div className="p-1.5 rounded" style={{ backgroundColor: "#0F172A10" }}>
                  <UsersRound className="w-4 h-4" style={{ fill: "#0F172A", stroke: "none" }} />
                </div>
                <span className="text-sm">Donors</span>
              </button>
              <button className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors">
                <div className="p-1.5 rounded" style={{ backgroundColor: "#0F172A10" }}>
                  <Target className="w-4 h-4" style={{ fill: "#0F172A", stroke: "none" }} />
                </div>
                <span className="text-sm">Pipeline</span>
              </button>
              <button className="flex items-center gap-3 px-3 py-2 rounded-md bg-accent">
                <div className="p-1.5 rounded" style={{ backgroundColor: "#0F172A10" }}>
                  <Heart className="w-4 h-4" style={{ fill: "#0284C7", stroke: "none" }} />
                </div>
                <span className="text-sm">Stewardship</span>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approach B: Dual-Tone Line + Fill - RECOMMENDED */}
      <Card className="border-2 border-primary">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CardTitle>Approach B: Dual-Tone Line + Fill</CardTitle>
                <Badge className="bg-primary text-primary-foreground">RECOMMENDED</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                1.5px outline with color fills. Best balance of depth and clarity. Fills use #7DD3FC or #0284C7 for emphasis.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Examples */}
          <div>
            <div className="text-sm font-medium mb-3">Stage Icons:</div>
            <div className="flex gap-4 flex-wrap">
              {/* Stewardship - HeartPulse with Ice Blue fill */}
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-xl" style={{ 
                  background: "linear-gradient(135deg, #0A1628 0%, #1A3A5C 100%)" 
                }}>
                  <HeartPulse 
                    className="w-6 h-6" 
                    style={{ 
                      stroke: "#0F172A", 
                      fill: "#7DD3FC",
                      strokeWidth: 1.5
                    }} 
                  />
                </div>
                <div className="text-xs text-muted-foreground">Stewardship</div>
              </div>

              {/* Processing - Banknote with accent */}
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-xl" style={{ 
                  background: "linear-gradient(135deg, #0A1628 0%, #1A3A5C 100%)" 
                }}>
                  <Banknote 
                    className="w-6 h-6" 
                    style={{ 
                      stroke: "#0284C7", 
                      fill: "#0A1628",
                      strokeWidth: 1.5
                    }} 
                  />
                </div>
                <div className="text-xs text-muted-foreground">Gift Processing</div>
              </div>

              {/* Cultivation - UserCog */}
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-xl" style={{ 
                  background: "linear-gradient(135deg, #0A1628 0%, #1A3A5C 100%)" 
                }}>
                  <UserCog 
                    className="w-6 h-6" 
                    style={{ 
                      stroke: "#0F172A", 
                      fill: "#0F172A40",
                      strokeWidth: 1.5
                    }} 
                  />
                </div>
                <div className="text-xs text-muted-foreground">Cultivation</div>
              </div>

              {/* Prospect - Search */}
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-xl" style={{ 
                  background: "linear-gradient(135deg, #0A1628 0%, #1A3A5C 100%)" 
                }}>
                  <Search 
                    className="w-6 h-6" 
                    style={{ 
                      stroke: "#0F172A", 
                      fill: "#0F172A40",
                      strokeWidth: 1.5
                    }} 
                  />
                </div>
                <div className="text-xs text-muted-foreground">Prospect Research</div>
              </div>

              {/* Analytics - TrendingUp */}
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-xl" style={{ 
                  background: "linear-gradient(135deg, #0A1628 0%, #1A3A5C 100%)" 
                }}>
                  <TrendingUp 
                    className="w-6 h-6" 
                    style={{ 
                      stroke: "#7DD3FC", 
                      fill: "none",
                      strokeWidth: 1.5
                    }} 
                  />
                </div>
                <div className="text-xs text-muted-foreground">Analytics</div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-3">In Context (Dashboard Cards):</div>
            <div className="grid grid-cols-3 gap-4 max-w-2xl">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ background: "linear-gradient(135deg, #0A1628 0%, #1A3A5C 100%)" }}>
                      <HeartPulse className="w-5 h-5" style={{ stroke: "#0F172A", fill: "#7DD3FC", strokeWidth: 1.5 }} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">127</div>
                      <div className="text-xs text-muted-foreground">Thank You Sent</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ background: "linear-gradient(135deg, #0A1628 0%, #1A3A5C 100%)" }}>
                      <Banknote className="w-5 h-5" style={{ stroke: "#0284C7", fill: "#0A1628", strokeWidth: 1.5 }} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">$2.4M</div>
                      <div className="text-xs text-muted-foreground">YTD Revenue</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ background: "linear-gradient(135deg, #0A1628 0%, #1A3A5C 100%)" }}>
                      <TrendingUp className="w-5 h-5" style={{ stroke: "#7DD3FC", fill: "none", strokeWidth: 1.5 }} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">+18%</div>
                      <div className="text-xs text-muted-foreground">vs Last Year</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approach C: Badge Iconography */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CardTitle>Approach C: Badge Iconography</CardTitle>
                <Badge variant="outline">Circular</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Icons on color-tinted circular badges. 18px outlines centered on 32px disks with stage-specific tints.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Examples */}
          <div>
            <div className="text-sm font-medium mb-3">Stage Icons:</div>
            <div className="flex gap-4 flex-wrap">
              {/* Stewardship - HeartHandshake */}
              <div className="text-center space-y-2">
                <div 
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border"
                  style={{ 
                    backgroundColor: "#0B4F7A24", 
                    borderColor: "#0F172A26" 
                  }}
                >
                  <HeartHandshake className="w-5 h-5" style={{ stroke: "#0F172A", fill: "none" }} />
                </div>
                <div className="text-xs text-muted-foreground">Stewardship</div>
              </div>

              {/* Processing - Wallet */}
              <div className="text-center space-y-2">
                <div 
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border"
                  style={{ 
                    backgroundColor: "#0F172A24", 
                    borderColor: "#0F172A26" 
                  }}
                >
                  <Wallet className="w-5 h-5" style={{ stroke: "#0F172A", fill: "none" }} />
                </div>
                <div className="text-xs text-muted-foreground">Gift Processing</div>
              </div>

              {/* Cultivation - UserCheck */}
              <div className="text-center space-y-2">
                <div 
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border"
                  style={{ 
                    backgroundColor: "#16304A24", 
                    borderColor: "#0F172A26" 
                  }}
                >
                  <UserCheck className="w-5 h-5" style={{ stroke: "#0F172A", fill: "none" }} />
                </div>
                <div className="text-xs text-muted-foreground">Cultivation</div>
              </div>

              {/* Prospect - Search */}
              <div className="text-center space-y-2">
                <div 
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border"
                  style={{ 
                    backgroundColor: "#13274224", 
                    borderColor: "#0F172A26" 
                  }}
                >
                  <Search className="w-5 h-5" style={{ stroke: "#0F172A", fill: "none" }} />
                </div>
                <div className="text-xs text-muted-foreground">Prospect Research</div>
              </div>

              {/* Leadership - BarChart3 */}
              <div className="text-center space-y-2">
                <div 
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border"
                  style={{ 
                    backgroundColor: "#0284C724", 
                    borderColor: "#0F172A26" 
                  }}
                >
                  <BarChart3 className="w-5 h-5" style={{ stroke: "#0F172A", fill: "none" }} />
                </div>
                <div className="text-xs text-muted-foreground">Leadership</div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-3">In Context (Activity Timeline):</div>
            <div className="space-y-3 p-4 rounded-lg bg-card border w-96">
              <div className="flex items-start gap-3">
                <div 
                  className="flex items-center justify-center w-8 h-8 rounded-full border shrink-0"
                  style={{ 
                    backgroundColor: "#0B4F7A24", 
                    borderColor: "#0F172A26" 
                  }}
                >
                  <HeartHandshake className="w-4 h-4" style={{ stroke: "#0F172A", fill: "none" }} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Thank you letter sent</div>
                  <div className="text-xs text-muted-foreground">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div 
                  className="flex items-center justify-center w-8 h-8 rounded-full border shrink-0"
                  style={{ 
                    backgroundColor: "#0F172A24", 
                    borderColor: "#0F172A26" 
                  }}
                >
                  <Wallet className="w-4 h-4" style={{ stroke: "#0F172A", fill: "none" }} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Gift processed - $50,000</div>
                  <div className="text-xs text-muted-foreground">Yesterday</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approach D: Minimal Stroke + Accent Corner Tabs */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CardTitle>Approach D: Minimal Stroke + Accent Tabs</CardTitle>
                <Badge variant="outline">Ultra-Clean</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Line-only icons with colored corner tabs. Best for data-dense interfaces, minimal visual weight.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Examples */}
          <div>
            <div className="text-sm font-medium mb-3">Stage Icons:</div>
            <div className="flex gap-4 flex-wrap">
              {/* Stewardship - Heart with corner tab */}
              <div className="text-center space-y-2">
                <div className="relative inline-block">
                  <div className="p-3">
                    <Heart className="w-6 h-6" style={{ stroke: "#0F172A", fill: "none" }} />
                  </div>
                  <div 
                    className="absolute top-0 right-0 w-3 h-3 rounded-br-lg"
                    style={{ backgroundColor: "#0284C7" }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground">Stewardship</div>
              </div>

              {/* Processing - Coins with corner tab */}
              <div className="text-center space-y-2">
                <div className="relative inline-block">
                  <div className="p-3">
                    <Coins className="w-6 h-6" style={{ stroke: "#0F172A", fill: "none" }} />
                  </div>
                  <div 
                    className="absolute top-0 right-0 w-3 h-3 rounded-br-lg"
                    style={{ backgroundColor: "#0284C7" }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground">Gift Processing</div>
              </div>

              {/* Cultivation - UserSquare2 with corner tab */}
              <div className="text-center space-y-2">
                <div className="relative inline-block">
                  <div className="p-3">
                    <UserSquare2 className="w-6 h-6" style={{ stroke: "#0F172A", fill: "none" }} />
                  </div>
                  <div 
                    className="absolute top-0 right-0 w-3 h-3 rounded-br-lg"
                    style={{ backgroundColor: "#1A3A5C" }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground">Cultivation</div>
              </div>

              {/* Informational - Search with info tab */}
              <div className="text-center space-y-2">
                <div className="relative inline-block">
                  <div className="p-3">
                    <Search className="w-6 h-6" style={{ stroke: "#0F172A", fill: "none" }} />
                  </div>
                  <div 
                    className="absolute top-0 right-0 w-3 h-3 rounded-br-lg"
                    style={{ backgroundColor: "#7DD3FC" }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground">Prospect Research</div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-3">In Context (Dense Table):</div>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-medium">Action</th>
                    <th className="text-left p-3 font-medium">Donor</th>
                    <th className="text-left p-3 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Heart className="w-4 h-4" style={{ stroke: "#0F172A", fill: "none" }} />
                          <div 
                            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-sm"
                            style={{ backgroundColor: "#0284C7" }}
                          ></div>
                        </div>
                        <span>Thank You</span>
                      </div>
                    </td>
                    <td className="p-3">John Smith</td>
                    <td className="p-3">$25,000</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Coins className="w-4 h-4" style={{ stroke: "#0F172A", fill: "none" }} />
                          <div 
                            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-sm"
                            style={{ backgroundColor: "#0284C7" }}
                          ></div>
                        </div>
                        <span>Process Gift</span>
                      </div>
                    </td>
                    <td className="p-3">Jane Doe</td>
                    <td className="p-3">$50,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Decision Helper */}
      <Card className="bg-primary/5 border-primary">
        <CardHeader>
          <CardTitle>Which Should You Choose?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="font-medium flex items-center gap-2">
                <Badge variant="outline">A</Badge>
                Monochrome Solid Glyphs
              </div>
              <p className="text-sm text-muted-foreground">
                Best for: Bold, confident interface. High icon prominence. Modern flat design aesthetic.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-medium flex items-center gap-2">
                <Badge className="bg-primary">B</Badge>
                Dual-Tone Line + Fill
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>RECOMMENDED:</strong> Best balance. Enterprise look. Clear visual hierarchy. Works everywhere.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-medium flex items-center gap-2">
                <Badge variant="outline">C</Badge>
                Badge Iconography
              </div>
              <p className="text-sm text-muted-foreground">
                Best for: Timelines, activity feeds, status indicators. Softer, friendlier feel.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-medium flex items-center gap-2">
                <Badge variant="outline">D</Badge>
                Minimal Stroke + Tabs
              </div>
              <p className="text-sm text-muted-foreground">
                Best for: Data-dense tables, toolbars. Maximum information density. Subtle accent system.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="flex justify-center gap-4 pt-6">
        <Button size="lg" data-testid="button-choose-style">
          Choose a Style & Implement
        </Button>
        <Button size="lg" variant="outline" data-testid="button-view-more">
          Request Custom Variations
        </Button>
      </div>
    </div>
  );
}
