import { NodeTypes, type NodeType } from "@/types/nodes.types";
import { MessageCircleMore } from "lucide-react";

export type NodeItem = {
  name: string;
  type: NodeType;
  icon: React.ComponentType<any>;
};

/**
 * List of all nodes for the editor
 */
export const nodes: NodeItem[] = [
  {
    name: "Message",
    type: NodeTypes.Message,
    icon: MessageCircleMore,
  },
];

/**
 * Create a new node of the given type and position
 * @param {NodeType} type
 * @param {{ x: number; y: number }} position
 * @returns {Node}
 */
export function createNode(type: NodeType, position: { x: number; y: number }) {
  switch (type) {
    case NodeTypes.Message:
      return {
        id: crypto.getRandomValues(new Uint32Array(1)).toString(),
        type: NodeTypes.Message,
        position: position,
        data: {
          text: "",
        },
      };
    default:
      return null;
  }
}