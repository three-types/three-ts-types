import { ShaderNodeObject, TempNode, TextureNode } from "three/tsl";
import { Camera, Color, Object3D, Scene } from "three/webgpu";

declare class OutlineNode extends TempNode {
    scene: Scene;
    camera: Camera;
    selectedObjects: Object3D[];
    downSampleRatio: number;
    visibleEdgeColor: Color;
    hiddenEdgeColor: Color;
    edgeThickness: number;
    edgeStrength: number;
    edgeGlow: number;
    pulsePeriod: number;

    constructor(scene: Scene, camera: Camera, selectedObjects?: Object3D[]);

    getTextureNode(): TextureNode;

    setSize(width: number, height: number): void;
}

export default OutlineNode;

export const outline: (scene: Scene, camera: Camera, selectedObjects?: Object3D[]) => ShaderNodeObject<OutlineNode>;
