import { EVENTS } from "@/lib/constants";
import { nodes } from "@/lib/nodes";
import type { NodeType } from "@/types/nodes.types";
import { LayoutGridIcon } from "lucide-react";

/**
 * Render all the nodes that can be added to the canvas
 */
export default function NodesPanel() {
  function handleDragStart(e: React.DragEvent, type: NodeType) {
    e.dataTransfer.setData(EVENTS.DRAG, type);
    e.dataTransfer.effectAllowed = "move";
  }

  return (
    <div>
      <div className="flex items-center gap-1 p-2 text-muted-foreground">
        <LayoutGridIcon className="size-3.5" />
        <span className="text-sm font-medium">Components</span>
      </div>
      <div className="grid grid-cols-2 gap-2 p-2">
        {nodes.map((node) => (
          <div
            key={node.type}
            className="px-2 py-1 flex flex-col items-center border border-border shadow rounded-md cursor-grab"
            draggable
            onDragStart={(e) => handleDragStart(e, node.type)}
          >
            <div className="bg-primary text-primary-foreground p-1.5 rounded-full w-fit">
              <node.icon className="size-4" />
            </div>
            <span className="text-center font-medium">{node.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
