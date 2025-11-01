import Node from "../core/Node.js";
import TempNode from "../core/TempNode.js";

interface RotateNodeInterface<TNodeType> {
    positionNode: Node<TNodeType>;
    rotationNode: Node<TNodeType>;
}

declare const RotateNode: {
    new<TNodeType>(positionNode: Node<TNodeType>, rotationNode: Node<TNodeType>): RotateNode<TNodeType>;
};

type RotateNode<TNodeType> = RotateNodeInterface<TNodeType> & TempNode<TNodeType>;

export default RotateNode;

export const rotate: <TNodeType>(
    positionNode: Node<TNodeType>,
    rotationNode: Node<TNodeType>,
) => RotateNode<TNodeType>;
