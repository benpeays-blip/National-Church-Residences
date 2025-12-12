import { useState, useCallback, useRef, useEffect, DragEvent } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArtifactGallery } from "@/components/artifact-gallery";
import { OrgCanvasNode } from "@/components/org-canvas-node";
import { type ArtifactDefinition, defaultStageConnections } from "@/lib/org-artifacts";
import { 
  Save, 
  Plus, 
  ArrowLeft, 
  Trash2, 
  FileText,
  Calendar,
  Building2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { OrganizationCanvas } from "@shared/schema";

const nodeTypes = {
  orgNode: OrgCanvasNode,
};

export default function OrganizationWorkflowCanvas() {
  const [selectedCanvasId, setSelectedCanvasId] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCanvasName, setNewCanvasName] = useState("");
  const [newCanvasDescription, setNewCanvasDescription] = useState("");
  const { toast } = useToast();

  // Fetch all canvases
  const { data: canvases = [], isLoading } = useQuery<OrganizationCanvas[]>({
    queryKey: ["/api/organization-canvases"],
  });

  // Fetch selected canvas
  const { data: selectedCanvas, isError: selectedCanvasError } = useQuery<OrganizationCanvas>({
    queryKey: ["/api/organization-canvases", selectedCanvasId],
    enabled: !!selectedCanvasId,
  });

  // If selected canvas fails to load (deleted or missing), return to landing
  useEffect(() => {
    if (selectedCanvasId && selectedCanvasError) {
      setSelectedCanvasId(null);
      toast({
        title: "Canvas not found",
        description: "The selected canvas may have been deleted or is no longer available.",
        variant: "destructive",
      });
    }
  }, [selectedCanvasId, selectedCanvasError, toast]);

  // Create canvas mutation
  const createCanvasMutation = useMutation({
    mutationFn: async (data: { name: string; description?: string; canvasData: any }) => {
      const response = await apiRequest("POST", "/api/organization-canvases", data);
      return await response.json();
    },
    onSuccess: (newCanvas: OrganizationCanvas) => {
      queryClient.invalidateQueries({ queryKey: ["/api/organization-canvases"] });
      setIsCreateDialogOpen(false);
      setNewCanvasName("");
      setNewCanvasDescription("");
      setSelectedCanvasId(newCanvas.id);
      toast({
        title: "Canvas created",
        description: `"${newCanvas.name}" has been created successfully.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create canvas. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete canvas mutation
  const deleteCanvasMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/organization-canvases/${id}`);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/organization-canvases"] });
      toast({
        title: "Canvas deleted",
        description: "The canvas has been deleted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete canvas. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCreateCanvas = () => {
    if (!newCanvasName.trim()) return;

    const initialCanvasData = {
      nodes: getInitialNodes(),
      edges: getInitialEdges(),
      viewport: { x: 0, y: 0, zoom: 1 },
    };

    createCanvasMutation.mutate({
      name: newCanvasName.trim(),
      description: newCanvasDescription.trim() || undefined,
      canvasData: initialCanvasData,
    });
  };

  const handleDeleteCanvas = (id: string) => {
    if (confirm("Are you sure you want to delete this canvas? This action cannot be undone.")) {
      deleteCanvasMutation.mutate(id);
    }
  };

  // Get initial nodes helper
  const getInitialNodes = (): Node[] => [
    {
      id: "node-prospect",
      type: "orgNode",
      position: { x: 100, y: 200 },
      data: { artifactId: "stage-prospect" },
    },
    {
      id: "node-cultivation",
      type: "orgNode",
      position: { x: 400, y: 200 },
      data: { artifactId: "stage-cultivation" },
    },
    {
      id: "node-solicitation",
      type: "orgNode",
      position: { x: 700, y: 200 },
      data: { artifactId: "stage-solicitation" },
    },
    {
      id: "node-processing",
      type: "orgNode",
      position: { x: 1000, y: 200 },
      data: { artifactId: "stage-processing" },
    },
    {
      id: "node-stewardship",
      type: "orgNode",
      position: { x: 1300, y: 200 },
      data: { artifactId: "stage-stewardship" },
    },
    {
      id: "node-leadership",
      type: "orgNode",
      position: { x: 1600, y: 200 },
      data: { artifactId: "stage-leadership" },
    },
  ];

  // Get initial edges helper
  const getInitialEdges = (): Edge[] =>
    defaultStageConnections.map((conn, idx) => ({
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

  // If no canvas is selected, show the landing page
  if (!selectedCanvasId) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Organization Workflow Canvases</h1>
            <p className="text-sm text-muted-foreground">
              Build and visualize technology workflows for different organizations
            </p>
          </div>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            size="lg"
            data-testid="button-create-canvas"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Organization Canvas
          </Button>
        </div>

        {/* Canvas Grid */}
        {isLoading ? (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              Loading canvases...
            </CardContent>
          </Card>
        ) : canvases.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Canvases Yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create your first organization workflow canvas to get started
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Canvas
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {canvases.map((canvas) => (
              <Card
                key={canvas.id}
                className="hover-elevate cursor-pointer"
                onClick={() => setSelectedCanvasId(canvas.id)}
                data-testid={`canvas-card-${canvas.id}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg mb-1">{canvas.name}</CardTitle>
                      {canvas.description && (
                        <CardDescription className="line-clamp-2">
                          {canvas.description}
                        </CardDescription>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCanvas(canvas.id);
                      }}
                      data-testid={`button-delete-${canvas.id}`}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>
                        {(canvas.canvasData as any)?.nodes?.length || 0} nodes,{" "}
                        {(canvas.canvasData as any)?.edges?.length || 0} connections
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Updated {new Date(canvas.updatedAt!).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Create Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Organization Canvas</DialogTitle>
              <DialogDescription>
                Enter the organization name to create a new workflow canvas
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="canvas-name">Organization Name *</Label>
                <Input
                  id="canvas-name"
                  placeholder="e.g., National Church Residences"
                  value={newCanvasName}
                  onChange={(e) => setNewCanvasName(e.target.value)}
                  data-testid="input-canvas-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="canvas-description">Description (optional)</Label>
                <Input
                  id="canvas-description"
                  placeholder="Brief description of this organization"
                  value={newCanvasDescription}
                  onChange={(e) => setNewCanvasDescription(e.target.value)}
                  data-testid="input-canvas-description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateCanvas}
                disabled={!newCanvasName.trim() || createCanvasMutation.isPending}
                data-testid="button-create-confirm"
              >
                {createCanvasMutation.isPending ? "Creating..." : "Create Canvas"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // If a canvas is selected, show the canvas editor
  return (
    <CanvasEditor
      canvas={selectedCanvas}
      onBack={() => setSelectedCanvasId(null)}
    />
  );
}

// Canvas Editor Component
function CanvasEditor({
  canvas,
  onBack,
}: {
  canvas: OrganizationCanvas | undefined;
  onBack: () => void;
}) {
  const [draggedArtifact, setDraggedArtifact] = useState<ArtifactDefinition | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const { toast } = useToast();

  // Initialize nodes and edges from canvas data
  const initialCanvasData = canvas?.canvasData as any;
  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    },
    []
  );

  // Add onDelete handler to initial nodes
  const initialNodes = (initialCanvasData?.nodes || []).map((node: Node) => ({
    ...node,
    data: { ...node.data, onDelete: handleDeleteNode },
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialCanvasData?.edges || []);

  // Update canvas mutation
  const updateCanvasMutation = useMutation({
    mutationFn: async (data: { canvasData: any }) => {
      const response = await apiRequest("PUT", `/api/organization-canvases/${canvas?.id}`, data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/organization-canvases"] });
      queryClient.invalidateQueries({ queryKey: ["/api/organization-canvases", canvas?.id] });
      toast({
        title: "Canvas saved",
        description: "Your workflow canvas has been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save canvas. Please try again.",
        variant: "destructive",
      });
    },
  });

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
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
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
      nodes: nodes.map(n => ({ ...n, data: { artifactId: n.data.artifactId } })),
      edges,
      viewport: reactFlowInstance?.getViewport() || { x: 0, y: 0, zoom: 1 },
    };

    updateCanvasMutation.mutate({ canvasData });
  };

  if (!canvas) {
    return (
      <Card>
        <CardContent className="p-12 text-center text-muted-foreground">
          Loading canvas...
        </CardContent>
      </Card>
    );
  }

  const artifactCount = nodes.filter(n => !n.id.startsWith("node-")).length;
  const connectionCount = edges.length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onBack} data-testid="button-back">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{canvas.name}</h1>
            {canvas.description && (
              <p className="text-sm text-muted-foreground">{canvas.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {artifactCount} artifacts, {connectionCount} connections
          </Badge>
          <Button
            onClick={handleSaveCanvas}
            disabled={updateCanvasMutation.isPending}
            data-testid="button-save-canvas"
          >
            <Save className="w-4 h-4 mr-2" />
            {updateCanvasMutation.isPending ? "Saving..." : "Save Canvas"}
          </Button>
        </div>
      </div>

      {/* Canvas and Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-12rem)]">
        {/* Artifact Gallery */}
        <div className="lg:col-span-1 overflow-y-auto">
          <ArtifactGallery onArtifactDragStart={setDraggedArtifact} />
        </div>

        {/* Canvas */}
        <div className="lg:col-span-3 border rounded-lg bg-background" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onInit={setReactFlowInstance}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.01}
            maxZoom={4}
          >
            <Background />
            <Controls />
            <MiniMap pannable zoomable nodeStrokeWidth={3} />
            <Panel position="top-right">
              <Card className="p-4 shadow-lg">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-3 h-3 rounded-full bg-sky-500" />
                    <span>Workflow Stages</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-3 h-3 rounded-full bg-cyan-500" />
                    <span>Organizational Roles</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-3 h-3 rounded-full bg-slate-500" />
                    <span>Software & Tools</span>
                  </div>
                </div>
              </Card>
            </Panel>
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
