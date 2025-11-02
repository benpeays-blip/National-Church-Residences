import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getArtifactById } from "@/lib/org-artifacts";
import { X } from "lucide-react";

export interface OrgNodeData {
  artifactId: string;
  label?: string;
  onDelete?: (id: string) => void;
}

export const OrgCanvasNode = memo(({ id, data }: NodeProps) => {
  const nodeData = data as OrgNodeData;
  const artifact = getArtifactById(nodeData.artifactId);
  
  if (!artifact) {
    return null;
  }

  const Icon = artifact.icon;

  return (
    <div className="relative group">
      <Card className={`min-w-[200px] p-4 border-2 ${artifact.colorToken} hover-elevate transition-all`}>
        {/* Delete button */}
        {nodeData.onDelete && (
          <button
            onClick={() => nodeData.onDelete?.(id)}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover-elevate active-elevate-2"
            data-testid={`button-delete-node-${id}`}
          >
            <X className="w-3 h-3" />
          </button>
        )}

        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="shrink-0">
            <div className={`w-10 h-10 rounded-lg ${artifact.colorToken} flex items-center justify-center`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm leading-tight mb-1">
              {nodeData.label || artifact.displayName}
            </div>
            <div className="text-xs text-muted-foreground line-clamp-2">
              {artifact.description}
            </div>
            <Badge variant="outline" className="mt-2 text-xs">
              {artifact.type}
            </Badge>
          </div>
        </div>

        {/* Connection handles */}
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 !bg-primary !border-2 !border-background"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 !bg-primary !border-2 !border-background"
        />
      </Card>
    </div>
  );
});

OrgCanvasNode.displayName = "OrgCanvasNode";
