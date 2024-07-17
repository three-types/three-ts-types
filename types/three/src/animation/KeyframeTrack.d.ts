import { InterpolationModes } from "../constants.js";
import { Interpolant } from "../math/Interpolant.js";
import { CubicInterpolant } from "../math/interpolants/CubicInterpolant.js";
import { DiscreteInterpolant } from "../math/interpolants/DiscreteInterpolant.js";
import { LinearInterpolant } from "../math/interpolants/LinearInterpolant.js";

export interface KeyframeTrackJSON<V, T> {
    name: string;
    times: number[];
    values: V[];
    interpolation?: InterpolationModes;
    type: T;
}

export class KeyframeTrack<Value = any> {
    /**
     * @param name
     * @param times
     * @param values
     * @param [interpolation=THREE.InterpolateLinear]
     */
    constructor(name: string, times: ArrayLike<number>, values: ArrayLike<Value>, interpolation?: InterpolationModes);

    name: string;
    times: Float32Array;
    values: ArrayLike<Value>;

    ValueTypeName: string;
    TimeBufferType: typeof Float32Array;
    ValueBufferType: typeof Float32Array | typeof Array;

    /**
     * @default THREE.InterpolateLinear
     */
    DefaultInterpolation: InterpolationModes;

    InterpolantFactoryMethodDiscrete(result: any): DiscreteInterpolant;
    InterpolantFactoryMethodLinear(result: any): LinearInterpolant;
    InterpolantFactoryMethodSmooth(result: any): CubicInterpolant;

    setInterpolation(interpolation: InterpolationModes): KeyframeTrack;
    getInterpolation(): InterpolationModes;
    createInterpolant(): Interpolant;

    getValueSize(): number;

    shift(timeOffset: number): KeyframeTrack;
    scale(timeScale: number): KeyframeTrack;
    trim(startTime: number, endTime: number): KeyframeTrack;
    validate(): boolean;
    optimize(): KeyframeTrack;
    clone(): this;

    static toJSON<Track extends KeyframeTrack>(
        track: Track,
    ): KeyframeTrackJSON<Track extends KeyframeTrack<infer V> ? V : never, Track["ValueTypeName"]>;
}
