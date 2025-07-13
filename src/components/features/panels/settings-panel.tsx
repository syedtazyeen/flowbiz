import { useCanvasStore } from "@/store/canvas";
import NodeSettings from "./node-settings";
import EdgeSettings from "./edge-settings";
import { ArrowLeftIcon } from "lucide-react";

/**
 * Render the settings panel for the selected node/edge
 */
export default function SettingsPanel() {
  const activeItem = useCanvasStore((state) => state.activeItem);
  const setActiveItem = useCanvasStore((state) => state.setActiveItem);

  // Render nothing if no item is selected
  if (!activeItem) return null;

  const ActiveSettings =
    activeItem.type === "node" ? NodeSettings : EdgeSettings;

  return (
    <div>
      <div className="flex items-center gap-2 p-1 border-b border-border">
        <button
          onClick={() => setActiveItem(null)}
          className="p-1 rounded-full hover:bg-muted"
        >
          <ArrowLeftIcon className="size-4" />
        </button>
        <span className="text-sm font-medium capitalize">
          {activeItem.type === "node" ? "Component" : "Connection"} Settings
        </span>
      </div>
      <ActiveSettings id={activeItem.id} />
    </div>
  );
}
