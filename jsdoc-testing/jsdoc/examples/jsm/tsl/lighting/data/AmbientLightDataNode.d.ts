export default AmbientLightDataNode;
/**
 * Batched data node for ambient lights in dynamic lighting mode.
 *
 * @augments Node
 */
declare class AmbientLightDataNode extends Node {
    constructor();
    _color: Color;
    _lights: any[];
    colorNode: import("three/webgpu").UniformNode;
    setLights(lights: any): this;
    update(): void;
    setup(builder: any): void;
}
import { Node } from 'three/webgpu';
import { Color } from 'three/webgpu';
