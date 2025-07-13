import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import NodesPanel from "./nodes-panel";
import SettingsPanel from "./settings-panel";
import { useCanvasStore } from "@/store/canvas";

type Panel = "nodes" | "settings";

export interface PanelComponentProps {
  onPanelChange?: (panel: Panel) => void;
}

export interface RightPanelProps {
  className?: string;
}

/**
 * Render the right panel for the canvas
 */
export default function RightPanel({ className, ...props }: RightPanelProps) {
  const [internalPanel, setInternalPanel] = useState<Panel>("nodes");
  const activeItem = useCanvasStore((state) => state.activeItem);

  // Render the selected panel
  const PanelComponent = internalPanel === "nodes" ? NodesPanel : SettingsPanel;

  useEffect(() => {
    // Sync if panel changes if node is selected
    if (activeItem) {
      setInternalPanel("settings");
    } else {
      setInternalPanel("nodes");
    }
  }, [activeItem]);

  return (
    <div
      className={cn("bg-background border-l border-border overflow-y-auto flex-shrink-0", className)}
      {...props}
    >
      <PanelComponent />
    </div>
  );
}
