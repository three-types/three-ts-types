import Node from "../core/Node.js";
import TextureNode from "./TextureNode.js";

export const textureBicubicLevel: (textureNode: TextureNode, lodNode: Node<"float">) => TextureNode;

export const textureBicubic: (textureNode: TextureNode, strength: Node<"float">) => TextureNode;
