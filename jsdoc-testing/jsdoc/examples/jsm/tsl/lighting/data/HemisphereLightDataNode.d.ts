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
    skyColorsNode: import("three/tsl").UniformNode;
    groundColorsNode: import("three/tsl").UniformNode;
    directionsNode: import("three/tsl").UniformNode;
    countNode: import("three/tsl").UniformNode;
    setLights(lights: any): this;
    update(): void;
    setup(builder: any): void;
}
import { Node } from 'three/webgpu';
import { Color } from 'three/webgpu';
import { Vector3 } from 'three/webgpu';
