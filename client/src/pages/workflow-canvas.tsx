import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { ReactFlow, MiniMap, Controls, Background, Node, Edge, Connection, addEdge, useNodesState, useEdgesState, Panel, Handle, Position } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Save, Play, ArrowLeft, Plus, MoreHorizontal, Info } from "lucide-react";
import type { Workflow, WorkflowBlock, WorkflowConnection } from "@shared/schema";
import { systemBlocks, humanBlocks, dataBlocks, actionBlocks, organizationBlocks, logicBlocks } from "@shared/workflows";
import { useCallback, useEffect, useState } from "react";

// Icon colors for different block types (teal/cyan style from reference)
const getIconColor = (type: string): string => {
  const colors: Record<string, string> = {
    system: '#0891b2',     // cyan-600
    human: '#0d9488',      // teal-600
    data: '#0284c7',       // sky-600
    action: '#059669',     // emerald-600
    organization: '#7c3aed', // violet-600
    logic: '#dc2626',      // red-600 (for warning/decision nodes)
  };
  return colors[type] || '#0891b2';
};

// Custom node component for workflow blocks - matching the D&B style
function WorkflowNodeComponent({ data }: { data: { label: string; type: string; subtype: string } }) {
  return (
    <div 
      className="px-4 py-3 rounded-xl bg-white shadow-lg min-w-[200px] border border-gray-100"
      style={{ 
        boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)'
      }}
    >
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-3 h-3 !border-2 !border-white"
        style={{ backgroundColor: '#0891b2' }}
      />
      <div className="flex items-start gap-3">
        {/* Icon container */}
        <div 
          className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 mt-0.5"
          style={{ backgroundColor: `${getIconColor(data.type)}15` }}
        >
          <Info className="w-4 h-4" style={{ color: getIconColor(data.type) }} />
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-gray-900">{data.label}</div>
          <div className="text-xs text-gray-500 mt-0.5">{data.subtype}</div>
        </div>
        {/* Menu button */}
        <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 shrink-0">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-3 h-3 !border-2 !border-white"
        style={{ backgroundColor: '#0891b2' }}
      />
    </div>
  );
}

const nodeTypes = {
  workflowBlock: WorkflowNodeComponent,
};

export default function WorkflowCanvas() {
  const [, params] = useRoute("/workflows/:id/canvas");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const workflowId = params?.id;

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedBlockType, setSelectedBlockType] = useState<string | null>(null);

  // Fetch workflow details
  const { data: workflowData, isLoading } = useQuery<{ workflow: Workflow; blocks: WorkflowBlock[]; connections: WorkflowConnection[] }>({
    queryKey: [`/api/workflows/${workflowId}`],
    enabled: !!workflowId,
  });
  
  const workflow = workflowData?.workflow;

  // Fetch workflow blocks
  const { data: blocks = [] } = useQuery<WorkflowBlock[]>({
    queryKey: [`/api/workflows/${workflowId}/blocks`],
    enabled: !!workflowId,
  });

  // Fetch workflow connections
  const { data: connections = [] } = useQuery<WorkflowConnection[]>({
    queryKey: [`/api/workflows/${workflowId}/connections`],
    enabled: !!workflowId,
  });

  // Convert blocks and connections to React Flow format
  useEffect(() => {
    if (blocks.length > 0) {
      const flowNodes: Node[] = blocks.map((block) => ({
        id: block.id,
        type: "workflowBlock",
        position: { x: Number(block.positionX) || 0, y: Number(block.positionY) || 0 },
        data: {
          label: block.displayName || block.subtype,
          type: block.type,
          subtype: block.subtype,
        },
      }));
      setNodes(flowNodes);
    }

    if (connections.length > 0) {
      const flowEdges: Edge[] = connections.map((conn) => ({
        id: conn.id,
        source: conn.sourceBlockId,
        target: conn.targetBlockId,
        label: conn.label || undefined,
        animated: false,
        type: 'smoothstep',
        style: {
          strokeWidth: 2,
          stroke: '#4a5568',
        },
      }));
      setEdges(flowEdges);
    }
  }, [blocks, connections, setNodes, setEdges]);

  // Save workflow positions
  const savePositions = useMutation({
    mutationFn: async () => {
      const updates = nodes.map((node) => ({
        id: node.id,
        positionX: Math.round(node.position.x),
        positionY: Math.round(node.position.y),
      }));
      
      await apiRequest("PATCH", `/api/workflows/${workflowId}/blocks/positions`, { positions: updates });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/workflows/${workflowId}/blocks`] });
      toast({
        title: "Workflow saved",
        description: "All block positions have been updated",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to save workflow",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Add connection
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
      
      // Save to backend
      apiRequest("POST", `/api/workflows/${workflowId}/connections`, {
        sourceBlockId: connection.source,
        targetBlockId: connection.target,
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: [`/api/workflows/${workflowId}/connections`] });
      });
    },
    [workflowId, setEdges]
  );

  // Block palette data
  const blockPalette = [
    { label: "Systems", blocks: systemBlocks, tab: "systems" },
    { label: "People", blocks: humanBlocks, tab: "people" },
    { label: "Data", blocks: dataBlocks, tab: "data" },
    { label: "Actions", blocks: actionBlocks, tab: "actions" },
    { label: "Organization", blocks: organizationBlocks, tab: "organization" },
    { label: "Logic", blocks: logicBlocks, tab: "logic" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading workflow...</div>
      </div>
    );
  }

  if (!workflow) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Workflow not found</div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Block Palette Sidebar */}
      <Card className="w-80 flex flex-col">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Block Palette</h3>
          <p className="text-xs text-muted-foreground mt-1">Drag blocks onto canvas</p>
        </div>
        
        <ScrollArea className="flex-1">
          <Tabs defaultValue="systems" className="p-4">
            <TabsList className="grid grid-cols-3 w-full">
              {blockPalette.slice(0, 3).map((category) => (
                <TabsTrigger key={category.tab} value={category.tab} className="text-xs">
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsList className="grid grid-cols-3 w-full mt-2">
              {blockPalette.slice(3).map((category) => (
                <TabsTrigger key={category.tab} value={category.tab} className="text-xs">
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {blockPalette.map((category) => (
              <TabsContent key={category.tab} value={category.tab} className="space-y-2 mt-4">
                {category.blocks.map((block) => (
                  <div
                    key={block.subtype}
                    className="p-3 border rounded-md hover-elevate cursor-grab active:cursor-grabbing"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("application/reactflow", JSON.stringify({
                        type: block.type,
                        subtype: block.subtype,
                        label: block.displayName,
                      }));
                      e.dataTransfer.effectAllowed = "move";
                    }}
                    data-testid={`palette-block-${block.subtype}`}
                  >
                    <div className="font-medium text-sm">{block.displayName}</div>
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{block.description}</div>
                    <Badge variant="outline" className="mt-2 text-xs">{block.category}</Badge>
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </ScrollArea>
      </Card>

      {/* Canvas */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/workflows")}
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h2 className="font-semibold">{workflow.name}</h2>
              <p className="text-xs text-muted-foreground">{workflow.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={workflow.status === "published" ? "default" : "secondary"}>
              {workflow.status}
            </Badge>
            <Button
              size="sm"
              onClick={() => savePositions.mutate()}
              disabled={savePositions.isPending}
              data-testid="button-save-workflow"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button size="sm" variant="outline" data-testid="button-publish-workflow">
              <Play className="w-4 h-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        <div 
          className="flex-1 relative"
          style={{ backgroundColor: '#0f1c2e' }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            defaultEdgeOptions={{
              type: 'smoothstep',
              animated: false,
              style: { stroke: '#4a5568', strokeWidth: 2 },
            }}
            onDrop={(e) => {
              e.preventDefault();
              const data = e.dataTransfer.getData("application/reactflow");
              if (!data) return;

              const blockData = JSON.parse(data);
              const reactFlowBounds = (e.target as HTMLElement).getBoundingClientRect();
              const position = {
                x: e.clientX - reactFlowBounds.left - 100,
                y: e.clientY - reactFlowBounds.top - 50,
              };

              // Create new block via API
              apiRequest("POST", `/api/workflows/${workflowId}/blocks`, {
                type: blockData.type,
                subtype: blockData.subtype,
                displayName: blockData.label,
                positionX: Math.round(position.x),
                positionY: Math.round(position.y),
                config: {},
              }).then(() => {
                queryClient.invalidateQueries({ queryKey: [`/api/workflows/${workflowId}/blocks`] });
              });
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
            }}
            data-testid="workflow-canvas"
          >
            <Background 
              color="#1e3a5f" 
              gap={20} 
              size={1}
              style={{ backgroundColor: '#0f1c2e' }}
            />
            <Controls className="!bg-white/10 !border-white/20 [&>button]:!bg-white/10 [&>button]:!border-white/20 [&>button]:!text-white [&>button:hover]:!bg-white/20" />
            <MiniMap 
              nodeColor="#ffffff"
              maskColor="rgba(15, 28, 46, 0.8)"
              style={{ backgroundColor: '#1a2d47' }}
            />
            <Panel position="top-right" className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20">
              <div className="text-xs text-white/80">
                {nodes.length} blocks • {edges.length} connections
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </Card>
    </div>
  );
}
