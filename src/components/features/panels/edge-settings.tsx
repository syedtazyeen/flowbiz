import { useMemo } from "react";
import { useCanvasStore } from "@/store/canvas";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProjectStore } from "@/store/project";

/**
 * Render the settings panel for the selected edge
 */
export default function EdgeSettings({ id }: { id: string }) {
  const { nodes, edges, setEdges, setActiveItem } = useCanvasStore();
  const setError = useProjectStore((state) => state.setError);

  const { sourceNode, targetNode } = useMemo(() => {
    const edge = edges.find((e) => e.id === id);
    const sourceNode = nodes.find((n) => n.id === edge?.source);
    const targetNode = nodes.find((n) => n.id === edge?.target);
    return { sourceNode, targetNode };
  }, [edges, nodes, id]);

  /**
   * Handles the delete button click event.
   * Removes the edge from the canvas.
   */
  const handleDelete = () => {
    setEdges(edges.filter((edge) => edge.id !== id));
    setActiveItem(null);
    setError(null);
  };

  const renderNodeInfo = (
    label: string,
    node: typeof sourceNode,
    chipColor: string,
    textColor: string
  ) => (
    <div>
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full ${chipColor} ${textColor} px-2 py-0.5 text-xs font-medium capitalize`}
        >
          {node?.type}
        </span>
        <span className="truncate text-sm max-w-[180px]">
          {node?.data?.text || "No content"}
        </span>
      </div>
    </div>
  );

  return (
    <div className="space-y-3 p-2 text-sm">
      {sourceNode &&
        renderNodeInfo("Source", sourceNode, "bg-blue-100", "text-blue-700")}
      {targetNode &&
        renderNodeInfo("Target", targetNode, "bg-green-100", "text-green-700")}

      <Button
        size="sm"
        variant="outline"
        onClick={handleDelete}
        className="mt-4 border-destructive text-destructive hover:bg-destructive/5 text-xs"
      >
        <TrashIcon className="size-3.5 mr-2" />
        Delete
      </Button>
    </div>
  );
}
