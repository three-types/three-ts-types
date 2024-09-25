import { Matrix4 } from "../../../math/Matrix4.js";
import NodeBuilder from "../../../nodes/core/NodeBuilder.js";
import NodeFrame from "../../../nodes/core/NodeFrame.js";
import RenderObject from "../../../renderers/common/RenderObject.js";
import { Material } from "../../Material.js";
interface MaterialData {
}
interface RenderObjectData {
    material: MaterialData;
    worldMatrix: Matrix4;
}
declare class NodeMaterialObserver {
    renderObjects: WeakMap<RenderObject, RenderObjectData>;
    hasNode: boolean;
    refreshUniforms: string[];
    renderId: number;
    constructor(builder: NodeBuilder);
    firstInitialization(renderObject: RenderObject): boolean;
    getRenderObjectData(renderObject: RenderObject): RenderObjectData;
    containsNode(builder: NodeBuilder): boolean;
    getMaterialData(material: Material): {};
    equals(renderObject: RenderObject): boolean;
    needsRefresh(renderObject: RenderObject, nodeFrame: NodeFrame): boolean;
}
export default NodeMaterialObserver;
