export default DirectionalLightDataNode;
/**
 * Batched data node for directional lights in dynamic lighting mode.
 *
 * @augments Node
 */
declare class DirectionalLightDataNode extends Node {
    constructor(maxCount?: number);
    maxCount: number;
    _lights: any[];
    _colors: Color[];
    _directions: Vector3[];
    colorsNode: import("three/tsl").UniformNode;
    directionsNode: import("three/tsl").UniformNode;
    countNode: import("three/tsl").UniformNode;
    isCacheable(): boolean;
    setLights(lights: any): this;
    update({ camera }: {
        camera: any;
    }): void;
    setup(builder: any): void;
}
import { Node } from 'three/webgpu';
import { Color } from 'three/webgpu';
import { Vector3 } from 'three/webgpu';
