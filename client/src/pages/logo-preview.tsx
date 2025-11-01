import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

// New sophisticated designs
import logo1 from "@assets/generated_images/Ultra-minimalist_wordmark_e131d920.png";
import logo2 from "@assets/generated_images/Elegant_hybrid_typography_bf2e4b5e.png";
import logo3 from "@assets/generated_images/Monogram_mark_combination_1a254dea.png";
import logo4 from "@assets/generated_images/Condensed_growth_integration_a421bf07.png";
import logo5 from "@assets/generated_images/Refined_trajectory_pattern_9cd08654.png";

const logos = [
  {
    id: 1,
    name: "Ultra-Minimalist",
    description: "Refined typography with subtle geometric accent",
    image: logo1,
    style: "Minimalist",
  },
  {
    id: 2,
    name: "Elegant Hybrid",
    description: "Serif-sans fusion with integrated upward arrow",
    image: logo2,
    style: "Sophisticated",
  },
  {
    id: 3,
    name: "Monogram Mark",
    description: "Clean sans-serif with minimal F+R icon",
    image: logo3,
    style: "Modern",
  },
  {
    id: 4,
    name: "Growth Integration",
    description: "Condensed type with chart bars between letters",
    image: logo4,
    style: "Dynamic",
  },
  {
    id: 5,
    name: "Trajectory Pattern",
    description: "Polished wordmark with upward dot trajectory",
    image: logo5,
    style: "Premium",
  },
];

export default function LogoPreview() {
  const [, setLocation] = useLocation();

  return (
    <div className="h-full overflow-auto bg-background">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-12">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-6"
            data-testid="button-back-to-dashboard"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-4xl font-semibold mb-3">FundRazor Brand Options</h1>
          <p className="text-lg text-muted-foreground">
            Select your preferred logo design for the platform
          </p>
        </div>

        {/* Logo Grid */}
        <div className="space-y-8">
          {logos.map((logo) => (
            <Card 
              key={logo.id} 
              className="overflow-hidden hover-elevate" 
              data-testid={`card-logo-${logo.id}`}
            >
              <div className="grid md:grid-cols-[1fr,2fr] gap-0">
                {/* Info Panel */}
                <div className="p-8 flex flex-col justify-center bg-muted/30">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs font-medium">
                        Option {logo.id}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {logo.style}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">{logo.name}</h3>
                      <p className="text-muted-foreground">{logo.description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Logo Display */}
                <div className="p-12 bg-white dark:bg-card flex items-center justify-center">
                  <img
                    src={logo.image}
                    alt={logo.name}
                    className="w-full max-w-2xl h-auto"
                    data-testid={`img-logo-${logo.id}`}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer Instructions */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg border">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Ready to choose?</span> Let me know your preferred option number (1-5), and I'll update the sidebar logo and refine it further if needed.
          </p>
        </div>
      </div>
    </div>
  );
}
