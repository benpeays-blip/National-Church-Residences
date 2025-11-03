import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import {
  stageArtifacts,
  roleArtifacts,
  softwareArtifacts,
  getSoftwareByCategory,
  softwareCategories,
  type ArtifactDefinition,
} from "@/lib/org-artifacts";

interface ArtifactGalleryProps {
  onArtifactDragStart: (artifact: ArtifactDefinition) => void;
}

export function ArtifactGallery({ onArtifactDragStart }: ArtifactGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filterArtifacts = (artifacts: ArtifactDefinition[]) => {
    if (!searchQuery) return artifacts;
    const query = searchQuery.toLowerCase();
    return artifacts.filter(
      (a) =>
        a.displayName.toLowerCase().includes(query) ||
        a.description.toLowerCase().includes(query)
    );
  };

  const ArtifactItem = ({ artifact }: { artifact: ArtifactDefinition }) => {
    const Icon = artifact.icon;
    return (
      <div
        draggable
        onDragStart={() => onArtifactDragStart(artifact)}
        className={`p-3 rounded-lg border-2 ${artifact.colorToken} cursor-move hover-elevate active-elevate-2 transition-all`}
        data-testid={`artifact-${artifact.id}`}
      >
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded ${artifact.colorToken} flex items-center justify-center shrink-0`}>
            <Icon className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-xs leading-tight">
              {artifact.displayName}
            </div>
            <div className="text-xs text-muted-foreground truncate mt-0.5">
              {artifact.description}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const filteredStages = filterArtifacts(stageArtifacts);
  const filteredRoles = filterArtifacts(roleArtifacts);
  const filteredSoftware = filterArtifacts(softwareArtifacts);
  
  // Group software by category
  const softwareByCategory = getSoftwareByCategory();
  const filteredSoftwareByCategory: Record<string, ArtifactDefinition[]> = {};
  softwareCategories.forEach(category => {
    const artifacts = softwareByCategory[category] || [];
    const filtered = filterArtifacts(artifacts);
    if (filtered.length > 0) {
      filteredSoftwareByCategory[category] = filtered;
    }
  });

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Artifact Gallery</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search artifacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
            data-testid="input-search-artifacts"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 pt-0">
        <Accordion type="multiple" defaultValue={["stages", "roles", "CRM", "Email Marketing"]} className="space-y-2">
          {/* Stages */}
          <AccordionItem value="stages" className="border rounded-lg px-3">
            <AccordionTrigger className="text-sm font-semibold hover:no-underline">
              <div className="flex items-center gap-2">
                <span>Workflow Stages</span>
                <Badge variant="secondary" className="text-xs">
                  {filteredStages.length}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-2 pt-2">
              {filteredStages.map((artifact) => (
                <ArtifactItem key={artifact.id} artifact={artifact} />
              ))}
              {filteredStages.length === 0 && (
                <div className="text-xs text-muted-foreground text-center py-4">
                  No stages found
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Roles */}
          <AccordionItem value="roles" className="border rounded-lg px-3">
            <AccordionTrigger className="text-sm font-semibold hover:no-underline">
              <div className="flex items-center gap-2">
                <span>Organizational Roles</span>
                <Badge variant="secondary" className="text-xs">
                  {filteredRoles.length}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-2 pt-2">
              {filteredRoles.map((artifact) => (
                <ArtifactItem key={artifact.id} artifact={artifact} />
              ))}
              {filteredRoles.length === 0 && (
                <div className="text-xs text-muted-foreground text-center py-4">
                  No roles found
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Software Tools - Organized by Category */}
          {Object.entries(filteredSoftwareByCategory).map(([category, artifacts]) => (
            <AccordionItem key={category} value={category} className="border rounded-lg px-3">
              <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                <div className="flex items-center gap-2">
                  <span>{category}</span>
                  <Badge variant="secondary" className="text-xs">
                    {artifacts.length}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                {artifacts.map((artifact) => (
                  <ArtifactItem key={artifact.id} artifact={artifact} />
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
