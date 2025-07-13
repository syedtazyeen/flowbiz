export const NodeTypes = {
  Message: "message",
} as const;

export type NodeType = (typeof NodeTypes)[keyof typeof NodeTypes];

export type TextNodeData = {
  text: string | null;
};


export type NodeData = TextNodeData;