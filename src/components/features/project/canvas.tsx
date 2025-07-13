import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  MarkerType,
  ReactFlow,
  ReactFlowProvider,
  type Connection,
  type EdgeChange,
  type Node,
  type NodeChange,
} from "@xyflow/react";
import MessageNode from "../nodes/message-node";
import { NodeTypes, type NodeData, type NodeType } from "@/types/nodes.types";
import { useCanvasStore } from "@/store/canvas";
import { useCallback } from "react";
import { EVENTS } from "@/lib/constants";
import { createNode } from "@/lib/nodes";

const nodeTypes = { [NodeTypes.Message]: MessageNode };

/**
 * Render the canvas using @xyflow
 */
export default function Canvas() {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    setActiveItem: setActiveCanvasItem,
  } = useCanvasStore();

  /**
   * On drag over the canvas
   */
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  /**
   * On drop of a node in the canvas
   */
  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const type = e.dataTransfer.getData(EVENTS.DRAG);
      if (!type) return;

      const position = { x: e.clientX - 200, y: e.clientY - 48 };
      const newNode = createNode(type as NodeType, position);
      if (!newNode) return;

      // Add the new node
      setNodes((nds) => [...nds, newNode]);
      setActiveCanvasItem({ type: "node", id: newNode.id });
    },
    [setNodes, setActiveCanvasItem]
  );

  /**
   * Adds a new edge for a node in the canvas
   */
  const onConnect = useCallback(
    (params: Connection) => {
      const exists = edges.some(
        (e) =>
          e.source === params.source && e.sourceHandle === params.sourceHandle
      );
      // Prevent duplicate edges
      if (exists) return;

      setEdges((es) =>
        addEdge(
          {
            ...params,
            type: "default",
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          es
        )
      );
    },
    [edges, setEdges]
  );

  /**
   * handle node changes for the nodes
   */
  const handleNodesChange = useCallback(
    (changes: NodeChange<Node<NodeData>>[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  /**
   * handle edge changes for the nodes
   */
  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  /**
   * Handle click on a node/edge
   */
  const handleItemClick = useCallback(
    (id: string, type: "node" | "edge") => {
      setActiveCanvasItem({ id, type });
    },
    [setActiveCanvasItem]
  );

  /**
   * Clear active node on pane click
   */
  const handlePaneClick = useCallback(() => {
    setActiveCanvasItem(null);
  }, [setActiveCanvasItem]);

  return (
    <div className="flex-1">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodeClick={(_, n) => handleItemClick(n.id, "node")}
          onEdgeClick={(_, e) => handleItemClick(e.id, "edge")}
          onPaneClick={handlePaneClick}
          fitView
          attributionPosition="bottom-right"
        >
          <Background
            color="var(--color-muted)"
            variant={BackgroundVariant.Lines}
          />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
