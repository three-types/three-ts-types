import { Node, ShaderNodeObject, TempNode, TextureNode, UniformNode } from "three/tsl";
import { Camera, Object3D, Scene } from "three/webgpu";

export interface OutlineNodeParams {
    selectedObjects?: Object3D[] | undefined;
    edgeThickness?: ShaderNodeObject<UniformNode<number>> | undefined;
    edgeGlow?: ShaderNodeObject<UniformNode<number>> | undefined;
    downSampleRatio?: number | undefined;
}

declare class OutlineNode extends TempNode {
    scene: Scene;
    camera: Camera;
    selectedObjects: Object3D[];
    downSampleRatio: number;
    edgeThickness: ShaderNodeObject<UniformNode<number>>;
    edgeGlow: ShaderNodeObject<UniformNode<number>>;

    constructor(scene: Scene, camera: Camera, params?: OutlineNodeParams);

    get visibleEdge(): ShaderNodeObject<Node>;

    get hiddenEdge(): ShaderNodeObject<Node>;

    getTextureNode(): ShaderNodeObject<TextureNode>;

    setSize(width: number, height: number): void;
}

export default OutlineNode;

export const outline: (scene: Scene, camera: Camera, params?: OutlineNodeParams) => ShaderNodeObject<OutlineNode>;
