export default SpotLightDataNode;
/**
 * Batched data node for simple spot lights in dynamic lighting mode.
 *
 * Projected spot lights keep the default per-light path.
 *
 * @augments Node
 */
declare class SpotLightDataNode extends Node {
    constructor(maxCount?: number);
    maxCount: number;
    _lights: any[];
    _colors: Color[];
    _positionsAndCutoff: Vector4[];
    _directionsAndDecay: Vector4[];
    _cones: Vector4[];
    colorsNode: import("three/webgpu").UniformNode;
    positionsAndCutoffNode: import("three/webgpu").UniformNode;
    directionsAndDecayNode: import("three/webgpu").UniformNode;
    conesNode: import("three/webgpu").UniformNode;
    countNode: import("three/webgpu").UniformNode;
    setLights(lights: any): this;
    update({ camera }: {
        camera: any;
    }): void;
    setup(builder: any): void;
}
import { Node } from 'three/webgpu';
import { Color } from 'three/webgpu';
import { Vector4 } from 'three/webgpu';
