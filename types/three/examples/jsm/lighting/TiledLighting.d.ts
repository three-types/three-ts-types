import { Lighting } from "three/webgpu";
import { ShaderNodeObject } from "three/tsl";
import { Light } from "../../../src/lights/Light";
import TiledLightsNode from '../tsl/lighting/TiledLightsNode';

export class TiledLighting extends Lighting {
    constructor();

    createNode(lights?: Light[]): ShaderNodeObject<TiledLightsNode>;
}
