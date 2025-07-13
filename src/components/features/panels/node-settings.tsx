import { Button } from "@/components/ui/button";
import { useCanvasStore } from "@/store/canvas";
import { useProjectStore } from "@/store/project";
import { NodeTypes, type NodeData } from "@/types/nodes.types";
import type { Node } from "@xyflow/react";
import { TrashIcon } from "lucide-react";

function TextNodeControls({ id, data }: Node<NodeData>) {
  const setNodes = useCanvasStore((state) => state.setNodes);
  const setActiveItem = useCanvasStore((state) => state.setActiveItem);
  const setError = useProjectStore((state) => state.setError);

  /**
   * Handles the text input change event.
   * Updates the node data with the new text value.
   */
  function handleChangeText(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const updatedData = {
      text: e.target.value,
    };
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...updatedData,
            },
          };
        }
        return node;
      })
    );
  }

  /**
   * Handles the delete button click event.
   * Removes the node from the canvas.
   */
  const handleDelete = () => {
    setNodes((nds) => nds.filter((nd) => nd.id !== id));
    setActiveItem(null);
    setError(null);
  };

  return (
    <div className="p-2">
      <label className="text-xs font-medium">Text</label>
      <input
        placeholder="Enter text here"
        value={data.text || ""}
        onChange={handleChangeText}
        className="w-full px-2 py-1 border border-border rounded-md outline-none"
      />
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

/**
 * Render the settings panel for the selected node
 */
export default function NodeSettings({ id }: { id: string }) {
  const activeNode = useCanvasStore((state) =>
    state.nodes.find((node) => node.id === id)
  );

  if (activeNode?.type == NodeTypes.Message) {
    return <TextNodeControls {...activeNode} />;
  }
  return null;
}
