import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import logo1 from "@assets/generated_images/Minimalist_growth_chart_logo_12e135ae.png";
import logo2 from "@assets/generated_images/Geometric_FR_monogram_logo_da52249a.png";
import logo3 from "@assets/generated_images/AI-enhanced_wordmark_logo_ed6f3d7d.png";
import logo4 from "@assets/generated_images/Premium_bar_chart_logo_99ec7561.png";

const logos = [
  {
    id: 1,
    name: "Minimalist Growth Chart",
    description: "Clean upward-trending chart merged with razor edge concept",
    image: logo1,
  },
  {
    id: 2,
    name: "Geometric FR Monogram",
    description: "Abstract FR letterforms combining fundraising & cutting-edge symbolism",
    image: logo2,
  },
  {
    id: 3,
    name: "AI-Enhanced Wordmark",
    description: "Sophisticated wordmark with subtle neural network pattern integrated into the R",
    image: logo3,
  },
  {
    id: 4,
    name: "Premium Bar Chart",
    description: "Polished rising bars with precision razor accent - refined enterprise aesthetic",
    image: logo4,
  },
];

export default function LogoPreview() {
  const [, setLocation] = useLocation();

  return (
    <div className="h-full overflow-auto">
      <div className="container mx-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold mb-2">FundRazor Logo Options</h1>
            <p className="text-muted-foreground">
              Choose your preferred design direction for the FundRazor brand
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setLocation("/")}
            data-testid="button-back-to-dashboard"
          >
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {logos.map((logo) => (
            <Card key={logo.id} className="hover-elevate" data-testid={`card-logo-${logo.id}`}>
              <CardHeader>
                <CardTitle className="text-xl">
                  Option {logo.id}: {logo.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{logo.description}</p>
              </CardHeader>
              <CardContent>
                <div className="bg-background rounded-md p-8 border">
                  <img
                    src={logo.image}
                    alt={logo.name}
                    className="w-full h-auto"
                    data-testid={`img-logo-${logo.id}`}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-muted/50">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">Next Steps</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Once you've chosen your preferred logo design, let me know the option number (1-4) and I'll:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 ml-4">
              <li>• Replace the current logo in the sidebar with your chosen design</li>
              <li>• Update the logo throughout the application</li>
              <li>• Refine the design further if needed</li>
              <li>• Generate additional variations if you'd like to see more options</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
