export default PointLightDataNode;
/**
 * Batched data node for point lights in dynamic lighting mode.
 *
 * @augments Node
 */
declare class PointLightDataNode extends Node {
    constructor(maxCount?: number);
    maxCount: number;
    _lights: any[];
    _colors: Color[];
    _positionsAndCutoff: Vector4[];
    _decays: Vector4[];
    colorsNode: import("three/webgpu").UniformNode;
    positionsAndCutoffNode: import("three/webgpu").UniformNode;
    decaysNode: import("three/webgpu").UniformNode;
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
