export default HemisphereLightDataNode;
/**
 * Batched data node for hemisphere lights in dynamic lighting mode.
 *
 * @augments Node
 */
declare class HemisphereLightDataNode extends Node {
    constructor(maxCount?: number);
    maxCount: number;
    _lights: any[];
    _skyColors: Color[];
    _groundColors: Color[];
    _directions: Vector3[];
    skyColorsNode: import("three/webgpu").UniformNode;
    groundColorsNode: import("three/webgpu").UniformNode;
    directionsNode: import("three/webgpu").UniformNode;
    countNode: import("three/webgpu").UniformNode;
    setLights(lights: any): this;
    update(): void;
    setup(builder: any): void;
}
import { Node } from 'three/webgpu';
import { Color } from 'three/webgpu';
import { Vector3 } from 'three/webgpu';
