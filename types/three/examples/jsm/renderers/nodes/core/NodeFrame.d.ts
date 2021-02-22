import { Material, Renderer, Camera, Object3D } from './../../../../../src/Three';

export default class NodeFrame<
    TMaterial extends Material = Material,
    TRenderer extends Renderer = Renderer,
    TCamera extends Camera = Camera,
    TObject extends Object3D = Object3D
> {
    time: number;
    deltaTime: number;

    framdeId: number;

    startTime: number | null;

    updateMap: WeakMap<Node, number>;

    material: TMaterial;
    renderer: TRenderer;
    camera: TCamera;
    object: TObject;

    constructor();

    updateNode: <TNode extends Node>(node: TNode) => void;

    update: () => void;
}
