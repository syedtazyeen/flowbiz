import { nodes } from "@/lib/nodes";
import { cn } from "@/lib/utils";
import { useCanvasStore } from "@/store/canvas";
import type { TextNodeData } from "@/types/nodes.types";
import { Handle, Position } from "@xyflow/react";

interface MessageNodeProps {
  id: string;
  data: TextNodeData;
}

const Icon = nodes.find((node) => node.type == "message")?.icon;

/**
 * Render a message node in the canvas
 */
export default function MessageNode({ id, data }: MessageNodeProps) {
  const selectedItem = useCanvasStore((state) => state.activeItem);

  // Check if node is selected
  const isSelected = selectedItem?.type === "node" && selectedItem?.id == id;

  return (
    <div
      className={cn(
        "w-80 p-2 rounded-xl shadow bg-popover overflow-hidden border border-border",
        "outline-2 outline-offset-[-2px] outline-transparent",
        isSelected && "outline-primary"
      )}
    >
      <Handle id="target" type="target" position={Position.Left} />
      <div className="space-y-2">
        <div className="rounded-md bg-muted border border-dashed border-foreground flex items-center gap-2 w-fit px-2 py-0.5">
          {Icon &&<Icon className="size-3" />}
          <span className="text-xs font-semibold flex-1">Send Message</span>
        </div>
        <div className="py-2">
          <span className="line-clamp-2 text-sm">
            {data.text || "Text here."}
          </span>
        </div>
      </div>
      <Handle id="source" type="source" position={Position.Right} />
    </div>
  );
}
