import { Camera } from "../../../cameras/Camera.js";
import { Object3D } from "../../../core/Object3D.js";
import { Material } from "../../../materials/Material.js";
import { Color } from "../../../math/Color.js";
import Node from "../../../nodes/core/Node.js";
import NodeBuilder from "../../../nodes/core/NodeBuilder.js";
import UniformGroupNode from "../../../nodes/core/UniformGroupNode.js";
import ComputeNode from "../../../nodes/gpgpu/ComputeNode.js";
import LightsNode from "../../../nodes/lighting/LightsNode.js";
import { NodeFrame } from "../../../nodes/Nodes.js";
import { ShaderNodeObject } from "../../../nodes/TSL.js";
import { Fog } from "../../../scenes/Fog.js";
import { FogExp2 } from "../../../scenes/FogExp2.js";
import { Scene } from "../../../scenes/Scene.js";
import { CubeTexture } from "../../../textures/CubeTexture.js";
import { Texture } from "../../../textures/Texture.js";
import Backend from "../Backend.js";
import ChainMap from "../ChainMap.js";
import DataMap from "../DataMap.js";
import Renderer from "../Renderer.js";
import RenderObject from "../RenderObject.js";
import NodeBuilderState from "./NodeBuilderState.js";
import NodeUniformsGroup from "./NodeUniformsGroup.js";
interface NodeUniformsGroupData {
    renderId?: number | undefined;
    frameId?: number | undefined;
}
interface RenderObjectData {
    nodeBuilderState?: NodeBuilderState | undefined;
}
interface ComputeNodeData {
    nodeBuilderState?: NodeBuilderState | undefined;
}
interface SceneData {
    background?: Color | Texture | CubeTexture | undefined;
    backgroundNode?: Node | undefined;
    fog?: Fog | FogExp2 | undefined;
    fogNode?: Node | undefined;
    environment?: Texture | undefined;
    environmentNode?: Node | undefined;
}
declare module "../../../scenes/Scene.js" {
    interface Scene {
        environmentNode?: Node | null | undefined;
        backgroundNode?: Node | null | undefined;
        fogNode?: Node | null | undefined;
    }
}
declare class Nodes extends DataMap<{
    nodeUniformsGroup: {
        key: NodeUniformsGroup;
        value: NodeUniformsGroupData;
    };
    renderObject: {
        key: RenderObject;
        value: RenderObjectData;
    };
    computeNode: {
        key: ComputeNode;
        value: ComputeNodeData;
    };
    scene: {
        key: Scene;
        value: SceneData;
    };
}> {
    renderer: Renderer;
    backend: Backend;
    nodeFrame: NodeFrame;
    nodeBuilderCache: Map<string, NodeBuilderState>;
    callHashCache: ChainMap<readonly [Scene, LightsNode], {
        callId: number;
        cacheKey: string;
    }>;
    groupsData: ChainMap<readonly [UniformGroupNode, NodeUniformsGroup], {
        version?: number;
    }>;
    cacheLib: {
        [type: string]: WeakMap<object, Node | undefined>;
    };
    constructor(renderer: Renderer, backend: Backend);
    updateGroup(nodeUniformsGroup: NodeUniformsGroup): boolean;
    getForRenderCacheKey(renderObject: RenderObject): string;
    getForRender(renderObject: RenderObject): NodeBuilderState;
    delete(
        object: NodeUniformsGroup | RenderObject | ComputeNode | Scene,
    ): SceneData | RenderObjectData | NodeUniformsGroupData | ComputeNodeData;
    getForCompute(computeNode: ComputeNode): NodeBuilderState;
    _createNodeBuilderState(nodeBuilder: NodeBuilder): NodeBuilderState;
    getEnvironmentNode(scene: Scene): Node | null;
    getBackgroundNode(scene: Scene): Node | null;
    getFogNode(scene: Scene): Node | null;
    getCacheKey(scene: Scene, lightsNode: LightsNode): string;
    get isToneMappingState(): boolean;
    updateBackground(scene: Scene): void;
    getCacheNode(
        type: string,
        object: object,
        callback: () => Node | undefined,
        forceUpdate?: boolean,
    ): Node | undefined;
    updateFog(scene: Scene): void;
    updateEnvironment(scene: Scene): void;
    getNodeFrame(
        renderer?: Renderer,
        scene?: Scene | null,
        object?: Object3D | null,
        camera?: Camera | null,
        material?: Material | null,
    ): NodeFrame;
    getNodeFrameForRender(renderObject: RenderObject): NodeFrame;
    getOutputCacheKey(): string;
    hasOutputChange(outputTarget: Texture): boolean;
    getOutputNode(outputTexture: Texture): ShaderNodeObject<Node>;
    updateBefore(renderObject: RenderObject): void;
    updateAfter(renderObject: RenderObject): void;
    updateForCompute(computeNode: ComputeNode): void;
    updateForRender(renderObject: RenderObject): void;
    needsRefresh(renderObject: RenderObject): boolean;
    dispose(): void;
}
export default Nodes;
