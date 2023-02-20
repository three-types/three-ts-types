import { EventDispatcher } from './EventDispatcher.js';
import { Uniform } from './Uniform.js';

import { Usage } from '../constants.js';

export class UniformsGroup extends EventDispatcher {
    isUniformsGroup: true;
    id: number;
    usage: Usage;
    uniforms: Uniform[];

    constructor();

    add(uniform: Uniform): this;

    remove(uniform: Uniform): this;

    setName(name: string): this;

    setUsage(value: Usage): this;

    dispose(): this;

    copy(source: UniformsGroup): this;

    clone(): UniformsGroup;
}
