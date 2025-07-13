import RightPanel from "@/components/features/panels/right-panel";
import Canvas from "@/components/features/project/canvas";
import Header from "@/components/features/project/header";
import { Button } from "@/components/ui/button";
import { useCanvasStore } from "@/store/canvas";
import { useProjectStore } from "@/store/project";

import "@xyflow/react/dist/style.css";
import { SaveIcon } from "lucide-react";
import { useMemo } from "react";

/**
 * `Project Page`
 * Renders the project page view, displaying a canvas for node operations,
 * a header, and a right panel for additional controls.
 */
export default function Project() {
  const nodes = useCanvasStore((state) => state.nodes);
  const edges = useCanvasStore((state) => state.edges);
  const setError = useProjectStore((state) => state.setError);

  /**
   * Calculates the number of nodes with no incoming edges.
   */
  const emptyTargets = useMemo(() => {
    if (nodes.length < 2) return 0;
    return nodes.filter((n) => !edges.some((e) => e.target === n.id)).length;
  }, [nodes, edges]);

  /*
   * Handles the save button click event.
   * Flags an error if more than one node has no incoming edges.
   **/
  const handleSave = async () => {
    setError(null);
    if (emptyTargets > 1) {
      setError("More than one node has no incoming edges");
      return;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header className="h-12">
        <Button variant="primary" onClick={handleSave}>
          <SaveIcon className="mr-2 size-3.5" /> Save
        </Button>
      </Header>

      <div className="flex h-[calc(100%-3rem)] bg-muted/20">
        <Canvas />
        <RightPanel className="w-56" />
      </div>
    </div>
  );
}
