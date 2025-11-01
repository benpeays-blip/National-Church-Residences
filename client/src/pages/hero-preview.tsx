import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

import design1 from "@assets/generated_images/Minimalist_gradient_hero_d47c54ce.png";
import design2 from "@assets/generated_images/Dark_premium_accent_0d1b0fc9.png";
import design3 from "@assets/generated_images/Left-aligned_minimal_cards_8b5890cb.png";
import design4 from "@assets/generated_images/Two-column_vertical_metrics_e1eaff8b.png";
import design5 from "@assets/generated_images/Bordered_elegant_frame_277998f3.png";

const designs = [
  {
    id: 1,
    name: "Minimalist Gradient",
    description: "Clean white background with subtle blue gradient and horizontal metric cards",
    image: design1,
    style: "Light & Airy",
  },
  {
    id: 2,
    name: "Dark Premium",
    description: "Deep navy background panel with white text and bright blue accents",
    image: design2,
    style: "Bold & Luxe",
  },
  {
    id: 3,
    name: "Left-Aligned Cards",
    description: "Modern left-aligned layout with minimal bordered metric cards",
    image: design3,
    style: "Clean & Modern",
  },
  {
    id: 4,
    name: "Two-Column Vertical",
    description: "Balanced layout with heading on left, vertical stat cards on right",
    image: design4,
    style: "Structured",
  },
  {
    id: 5,
    name: "Bordered Frame",
    description: "Premium bordered section with centered content and subtle dividers",
    image: design5,
    style: "Elegant",
  },
];

export default function HeroPreview() {
  const [, setLocation] = useLocation();

  return (
    <div className="h-full overflow-auto bg-background">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-12">
          <Button
            variant="ghost"
            onClick={() => setLocation("/solutions")}
            className="mb-6"
            data-testid="button-back-to-solutions"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Solutions
          </Button>
          <h1 className="text-4xl font-semibold mb-3">Solutions Hero Design Options</h1>
          <p className="text-lg text-muted-foreground">
            Select your preferred hero section design
          </p>
        </div>

        <div className="space-y-8">
          {designs.map((design) => (
            <Card 
              key={design.id} 
              className="overflow-hidden hover-elevate" 
              data-testid={`card-hero-${design.id}`}
            >
              <div className="grid md:grid-cols-[1fr,2fr] gap-0">
                <div className="p-8 flex flex-col justify-center bg-muted/30">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs font-medium">
                        Option {design.id}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {design.style}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">{design.name}</h3>
                      <p className="text-muted-foreground">{design.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-12 bg-white dark:bg-card flex items-center justify-center">
                  <img
                    src={design.image}
                    alt={design.name}
                    className="w-full max-w-2xl h-auto border rounded"
                    data-testid={`img-hero-${design.id}`}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-muted/50 rounded-lg border">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Ready to choose?</span> Let me know your preferred option number (1-5), and I'll update the Solutions section hero design.
          </p>
        </div>
      </div>
    </div>
  );
}
