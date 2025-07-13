import { create } from "zustand";
import type { Node, Edge } from "@xyflow/react";
import type { NodeData } from "@/types/nodes.types";

export type ActiveItem = { type: "node" | "edge"; id: string };

type Setter<T> = T | ((prev: T) => T);

type CanvasStore = {
  nodes: Node<NodeData>[];
  setNodes: (value: Setter<Node<NodeData>[]>) => void;

  edges: Edge[];
  setEdges: (value: Setter<Edge[]>) => void;

  activeItem: ActiveItem | null;
  setActiveItem: (value: ActiveItem | null) => void;
};

export const useCanvasStore = create<CanvasStore>()((set) => ({
  nodes: [],
  setNodes: (value) =>
    set((state) => ({
      nodes: typeof value === "function" ? value(state.nodes) : value,
    })),

  edges: [],
  setEdges: (value) =>
    set((state) => ({
      edges: typeof value === "function" ? value(state.edges) : value,
    })),

  activeItem: null,
  setActiveItem: (value) => set({ activeItem: value }),
}));
