import { Light } from '../../../../src/Three.js';
import Node from '../core/Node.js';
import LightingNode from './LightingNode.js';
import { Swizzable } from '../shadernode/ShaderNode.js';

export default class LightsNode extends Node {
    lightNodes: LightingNode[];

    constructor(lightNodes?: LightingNode[]);

    get hasLight(): boolean;
    getLightNodeByHash(hash: string): LightingNode | null;

    fromLights(lights: Light[]): this;

    static setReference<T extends Light>(
        lightClass: { new (): T },
        lightNodeClass: { new (light: T): LightingNode },
    ): void;
}

export const lights: (lights: Light[]) => Swizzable<LightsNode>;
