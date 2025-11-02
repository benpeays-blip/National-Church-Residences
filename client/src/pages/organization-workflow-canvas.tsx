import { useState, useCallback, useRef, DragEvent } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MarkerType,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArtifactGallery } from "@/components/artifact-gallery";
import { OrgCanvasNode } from "@/components/org-canvas-node";
import { type ArtifactDefinition, defaultStageConnections } from "@/lib/org-artifacts";
import { Save, Download, ZoomIn, ZoomOut, Maximize2, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const nodeTypes = {
  orgNode: OrgCanvasNode,
};

// Initial edges - connections between stages
const initialEdges: Edge[] = defaultStageConnections.map((conn, idx) => ({
  id: `edge-${idx}`,
  source: `node-${conn.source.replace("stage-", "")}`,
  target: `node-${conn.target.replace("stage-", "")}`,
  label: conn.label,
  animated: conn.animated,
  type: "smoothstep",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
  },
  style: {
    strokeWidth: 2,
    strokeDasharray: conn.style === "dashed" ? "5,5" : undefined,
  },
}));

export default function OrganizationWorkflowCanvas() {
  const [draggedArtifact, setDraggedArtifact] = useState<ArtifactDefinition | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [quickStartCollapsed, setQuickStartCollapsed] = useState(false);
  const { toast } = useToast();

  // Callback to delete nodes
  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    },
    []
  );

  // Initial nodes - the 6 fundraising stages with delete handler
  const getInitialNodes = useCallback((): Node[] => [
    {
      id: "node-prospect",
      type: "orgNode",
      position: { x: 100, y: 200 },
      data: { artifactId: "stage-prospect", onDelete: handleDeleteNode },
    },
    {
      id: "node-cultivation",
      type: "orgNode",
      position: { x: 400, y: 200 },
      data: { artifactId: "stage-cultivation", onDelete: handleDeleteNode },
    },
    {
      id: "node-solicitation",
      type: "orgNode",
      position: { x: 700, y: 200 },
      data: { artifactId: "stage-solicitation", onDelete: handleDeleteNode },
    },
    {
      id: "node-processing",
      type: "orgNode",
      position: { x: 1000, y: 200 },
      data: { artifactId: "stage-processing", onDelete: handleDeleteNode },
    },
    {
      id: "node-stewardship",
      type: "orgNode",
      position: { x: 1300, y: 200 },
      data: { artifactId: "stage-stewardship", onDelete: handleDeleteNode },
    },
    {
      id: "node-leadership",
      type: "orgNode",
      position: { x: 1600, y: 200 },
      data: { artifactId: "stage-leadership", onDelete: handleDeleteNode },
    },
  ], [handleDeleteNode]);

  const [nodes, setNodes, onNodesChange] = useNodesState(getInitialNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
            },
            style: { strokeWidth: 2 },
          },
          eds
        )
      ),
    [setEdges]
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      if (!draggedArtifact || !reactFlowWrapper.current || !reactFlowInstance) {
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: `node-${Date.now()}`,
        type: "orgNode",
        position,
        data: {
          artifactId: draggedArtifact.id,
          onDelete: handleDeleteNode,
        },
      };

      setNodes((nds) => nds.concat(newNode));
      setDraggedArtifact(null);
    },
    [draggedArtifact, reactFlowInstance, setNodes, handleDeleteNode]
  );

  const handleSaveCanvas = () => {
    const canvasData = {
      nodes,
      edges,
      viewport: reactFlowInstance?.getViewport(),
    };
    
    // TODO: Save to API
    console.log("Saving canvas:", canvasData);
    toast({
      title: "Canvas saved",
      description: "Your organization workflow canvas has been saved successfully.",
    });
  };

  const handleExportImage = () => {
    toast({
      title: "Export coming soon",
      description: "Image export functionality will be available in the next release.",
    });
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div>
          <h1 className="text-2xl font-bold">Organization Workflow Canvas</h1>
          <p className="text-sm text-muted-foreground">
            Visual map of fundraising stages, roles, and systems
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {nodes.length} artifacts
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {edges.length} connections
          </Badge>
          <Button
            size="sm"
            variant="outline"
            onClick={handleExportImage}
            className="gap-2"
            data-testid="button-export-canvas"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button
            size="sm"
            onClick={handleSaveCanvas}
            className="gap-2"
            data-testid="button-save-canvas"
          >
            <Save className="w-4 h-4" />
            Save
          </Button>
        </div>
      </div>

      {/* Canvas and Gallery */}
      <div className="flex-1 flex overflow-hidden">
        {/* Artifact Gallery Sidebar */}
        <div className="w-80 border-r overflow-hidden">
          <ArtifactGallery onArtifactDragStart={setDraggedArtifact} />
        </div>

        {/* React Flow Canvas */}
        <div className="flex-1" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
          >
            <Background />
            <Controls />
            <MiniMap
              nodeStrokeWidth={3}
              zoomable
              pannable
              className="!bg-card !border"
            />
            
            {/* Legend Panel */}
            <Panel position="top-right" className="space-y-2">
              <Card className="p-3">
                <div className="text-xs font-semibold mb-2">Legend</div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-primary" />
                    <span className="text-muted-foreground">Primary Flow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-primary" style={{ strokeDasharray: "5,5", border: "1px dashed" }} />
                    <span className="text-muted-foreground">Feedback Loop</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-blue-500/20 border-2 border-blue-500/50" />
                    <span className="text-muted-foreground">Stage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-green-500/20 border-2 border-green-500/50" />
                    <span className="text-muted-foreground">Role</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-orange-500/20 border-2 border-orange-500/50" />
                    <span className="text-muted-foreground">Software</span>
                  </div>
                </div>
              </Card>
            </Panel>

            {/* Instructions Panel */}
            <Panel position="top-left" className="space-y-2">
              <Card className="p-3 max-w-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-semibold">Quick Start</div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setQuickStartCollapsed(!quickStartCollapsed)}
                    className="h-5 w-5"
                    data-testid="button-toggle-quickstart"
                  >
                    {quickStartCollapsed ? (
                      <ChevronDown className="w-3 h-3" />
                    ) : (
                      <ChevronUp className="w-3 h-3" />
                    )}
                  </Button>
                </div>
                {!quickStartCollapsed && (
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Drag artifacts from the left panel onto the canvas</li>
                    <li>• Connect nodes by dragging from one handle to another</li>
                    <li>• Delete nodes by hovering and clicking the × button</li>
                    <li>• Use scroll to zoom, drag to pan</li>
                  </ul>
                )}
              </Card>
            </Panel>
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
