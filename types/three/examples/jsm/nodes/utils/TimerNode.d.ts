import UniformNode from '../core/UniformNode.js';
import { Swizzable } from '../shadernode/ShaderNode.js';

export type TimerNodeScope =
    | typeof TimerNode.LOCAL
    | typeof TimerNode.GLOBAL
    | typeof TimerNode.DELTA
    | typeof TimerNode.FRAME;

export default class TimerNode extends UniformNode {
    static LOCAL: 'local';
    static GLOBAL: 'global';
    static DELTA: 'delta';
    static FRAME: 'frame';

    scope: TimerNodeScope;
    scale: number;

    constructor(scope?: TimerNodeScope, scale?: number, value?: number);
}

export const timerLocal: (timeScale: number, value?: number) => Swizzable<TimerNode>;
export const timerGlobal: (timeScale: number, value?: number) => Swizzable<TimerNode>;
export const timerDelta: (timeScale: number, value?: number) => Swizzable<TimerNode>;
export const frameId: Swizzable<TimerNode>;
