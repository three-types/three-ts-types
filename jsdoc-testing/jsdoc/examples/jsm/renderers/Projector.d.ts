export class RenderableObject {
    id: number;
    object: any;
    z: number;
    renderOrder: number;
}
export class RenderableFace {
    id: number;
    v1: RenderableVertex;
    v2: RenderableVertex;
    v3: RenderableVertex;
    normalModel: Vector3;
    vertexNormalsModel: Vector3[];
    vertexNormalsLength: number;
    color: Color;
    material: any;
    uvs: Vector2[];
    z: number;
    renderOrder: number;
}
export class RenderableVertex {
    position: Vector3;
    positionWorld: Vector3;
    positionScreen: Vector4;
    visible: boolean;
    copy(vertex: any): void;
}
export class RenderableLine {
    id: number;
    v1: RenderableVertex;
    v2: RenderableVertex;
    vertexColors: Color[];
    material: any;
    z: number;
    renderOrder: number;
}
export class RenderableSprite {
    id: number;
    object: any;
    x: number;
    y: number;
    z: number;
    rotation: number;
    scale: Vector2;
    material: any;
    renderOrder: number;
}
/**
 * This class can project a given scene in 3D space into a 2D representation
 * used for rendering with a 2D API. `Projector` is currently used by {@link SVGRenderer}
 * and was previously used by the legacy `CanvasRenderer`.
 *
 * @three_import import { Projector } from 'three/addons/renderers/Projector.js';
 */
export class Projector {
    /**
     * Projects the given scene in 3D space into a 2D representation. The result
     * is an object with renderable items.
     *
     * @param {Object3D} scene - A scene or any other type of 3D object.
     * @param {Camera} camera - The camera.
     * @param {boolean} sortObjects - Whether to sort objects or not.
     * @param {boolean} sortElements - Whether to sort elements (faces, lines and sprites) or not.
     * @return {{objects:Array<Objects>,lights:Array<Objects>,elements:Array<Objects>}} The projected scene as renderable objects.
     */
    projectScene: (scene: Object3D, camera: Camera, sortObjects: boolean, sortElements: boolean) => {
        objects: Array<Objects>;
        lights: Array<Objects>;
        elements: Array<Objects>;
    };
}
import { Vector3 } from 'three';
import { Color } from 'three';
import { Vector2 } from 'three';
import { Vector4 } from 'three';
