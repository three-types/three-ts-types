/**
 * Buffered scene graph property that allows weighted accumulation; used internally.
 */
export class PropertyMixer {
    /**
     * Constructs a new property mixer.
     *
     * @param {PropertyBinding} binding - The property binding.
     * @param {string} typeName - The keyframe track type name.
     * @param {number} valueSize - The keyframe track value size.
     */
    constructor(binding: PropertyBinding, typeName: string, valueSize: number);
    /**
     * The property binding.
     *
     * @type {PropertyBinding}
     */
    binding: PropertyBinding;
    /**
     * The keyframe track value size.
     *
     * @type {number}
     */
    valueSize: number;
    buffer: any[] | Float64Array<ArrayBuffer>;
    _workIndex: number | undefined;
    _mixBufferRegion: (buffer: any, dstOffset: any, srcOffset: any, t: any, stride: any) => void;
    _mixBufferRegionAdditive: (buffer: any, dstOffset: any, srcOffset: any, t: any, stride: any) => void;
    _setIdentity: () => void;
    _origIndex: number;
    _addIndex: number;
    /**
     * Accumulated weight of the property binding.
     *
     * @type {number}
     * @default 0
     */
    cumulativeWeight: number;
    /**
     * Accumulated additive weight of the property binding.
     *
     * @type {number}
     * @default 0
     */
    cumulativeWeightAdditive: number;
    /**
     * Number of active keyframe tracks currently using this property binding.
     *
     * @type {number}
     * @default 0
     */
    useCount: number;
    /**
     * Number of keyframe tracks referencing this property binding.
     *
     * @type {number}
     * @default 0
     */
    referenceCount: number;
    /**
     * Accumulates data in the `incoming` region into `accu<i>`.
     *
     * @param {number} accuIndex - The accumulation index.
     * @param {number} weight - The weight.
     */
    accumulate(accuIndex: number, weight: number): void;
    /**
     * Accumulates data in the `incoming` region into `add`.
     *
     * @param {number} weight - The weight.
     */
    accumulateAdditive(weight: number): void;
    /**
     * Applies the state of `accu<i>` to the binding when accus differ.
     *
     * @param {number} accuIndex - The accumulation index.
     */
    apply(accuIndex: number): void;
    /**
     * Remembers the state of the bound property and copy it to both accus.
     */
    saveOriginalState(): void;
    /**
     * Applies the state previously taken via {@link PropertyMixer#saveOriginalState} to the binding.
     */
    restoreOriginalState(): void;
    _setAdditiveIdentityNumeric(): void;
    _setAdditiveIdentityQuaternion(): void;
    _setAdditiveIdentityOther(): void;
    _select(buffer: any, dstOffset: any, srcOffset: any, t: any, stride: any): void;
    _slerp(buffer: any, dstOffset: any, srcOffset: any, t: any): void;
    _slerpAdditive(buffer: any, dstOffset: any, srcOffset: any, t: any, stride: any): void;
    _lerp(buffer: any, dstOffset: any, srcOffset: any, t: any, stride: any): void;
    _lerpAdditive(buffer: any, dstOffset: any, srcOffset: any, t: any, stride: any): void;
}
