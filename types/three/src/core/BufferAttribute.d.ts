import { Usage } from '../constants';
import { Matrix3 } from './../math/Matrix3';
import { Matrix4 } from './../math/Matrix4';

/**
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/BufferAttribute.js|src/core/BufferAttribute.js}
 */
export class BufferAttribute<ArrayType extends ArrayLike<number> = ArrayLike<number>> {
    constructor(array: ArrayType, itemSize: number, normalized?: boolean); // array parameter should be TypedArray.

    /**
     * @default ''
     */
    name: string;
    array: ArrayType;
    itemSize: number;

    /**
     * @default THREE.StaticDrawUsage
     */
    usage: Usage;

    /**
     * @default { offset: number; count: number }
     */
    updateRange: { offset: number; count: number };

    /**
     * @default 0
     */
    version: number;

    /**
     * @default false
     */
    normalized: boolean;

    /**
     * @default 0
     */
    count: number;

    set needsUpdate(value: boolean);

    readonly isBufferAttribute: true;

    onUploadCallback: () => void;
    onUpload(callback: () => void): this;
    setUsage(usage: Usage): this;
    clone(): this;
    copy(source: BufferAttribute<ArrayType>): this;
    copyAt(index1: number, attribute: BufferAttribute<ArrayType>, index2: number): this;
    copyArray(array: ArrayType): this;
    copyColorsArray(colors: Array<{ r: number; g: number; b: number }>): this;
    copyVector2sArray(vectors: Array<{ x: number; y: number }>): this;
    copyVector3sArray(vectors: Array<{ x: number; y: number; z: number }>): this;
    copyVector4sArray(vectors: Array<{ x: number; y: number; z: number; w: number }>): this;
    applyMatrix3(m: Matrix3): this;
    applyMatrix4(m: Matrix4): this;
    applyNormalMatrix(m: Matrix3): this;
    transformDirection(m: Matrix4): this;
    set(value: ArrayType | ArrayBufferView, offset?: number): this;
    getX(index: number): number;
    setX(index: number, x: number): this;
    getY(index: number): number;
    setY(index: number, y: number): this;
    getZ(index: number): number;
    setZ(index: number, z: number): this;
    getW(index: number): number;
    setW(index: number, z: number): this;
    setXY(index: number, x: number, y: number): this;
    setXYZ(index: number, x: number, y: number, z: number): this;
    setXYZW(index: number, x: number, y: number, z: number, w: number): this;
    toJSON(): {
        itemSize: number;
        type: string;
        array: number[];
        normalized: boolean;
    };
}

/**
 * @deprecated THREE.Int8Attribute has been removed. Use new THREE.Int8BufferAttribute() instead.
 */
export class Int8Attribute extends BufferAttribute {
    constructor(array: any, itemSize: number);
}

/**
 * @deprecated THREE.Uint8Attribute has been removed. Use new THREE.Uint8BufferAttribute() instead.
 */
export class Uint8Attribute extends BufferAttribute {
    constructor(array: any, itemSize: number);
}

/**
 * @deprecated THREE.Uint8ClampedAttribute has been removed. Use new THREE.Uint8ClampedBufferAttribute() instead.
 */
export class Uint8ClampedAttribute extends BufferAttribute {
    constructor(array: any, itemSize: number);
}

/**
 * @deprecated THREE.Int16Attribute has been removed. Use new THREE.Int16BufferAttribute() instead.
 */
export class Int16Attribute extends BufferAttribute {
    constructor(array: any, itemSize: number);
}

/**
 * @deprecated THREE.Uint16Attribute has been removed. Use new THREE.Uint16BufferAttribute() instead.
 */
export class Uint16Attribute extends BufferAttribute {
    constructor(array: any, itemSize: number);
}

/**
 * @deprecated THREE.Int32Attribute has been removed. Use new THREE.Int32BufferAttribute() instead.
 */
export class Int32Attribute extends BufferAttribute {
    constructor(array: any, itemSize: number);
}

/**
 * @deprecated THREE.Uint32Attribute has been removed. Use new THREE.Uint32BufferAttribute() instead.
 */
export class Uint32Attribute extends BufferAttribute {
    constructor(array: any, itemSize: number);
}

/**
 * @deprecated THREE.Float32Attribute has been removed. Use new THREE.Float32BufferAttribute() instead.
 */
export class Float32Attribute extends BufferAttribute {
    constructor(array: any, itemSize: number);
}

/**
 * @deprecated THREE.Float64Attribute has been removed. Use new THREE.Float64BufferAttribute() instead.
 */
export class Float64Attribute extends BufferAttribute {
    constructor(array: any, itemSize: number);
}

export class Int8BufferAttribute extends BufferAttribute<Int8Array> {}

export class Uint8BufferAttribute extends BufferAttribute<Uint8Array> {}

export class Uint8ClampedBufferAttribute extends BufferAttribute<Uint8ClampedArray> {}

export class Int16BufferAttribute extends BufferAttribute<Int16Array> {}

export class Uint16BufferAttribute extends BufferAttribute<Uint16Array> {}

export class Int32BufferAttribute extends BufferAttribute<Int32Array> {}

export class Uint32BufferAttribute extends BufferAttribute<Uint32Array> {}

// Float 16 arrays don't exist, what to do
export class Float16BufferAttribute extends BufferAttribute {}

export class Float32BufferAttribute extends BufferAttribute<Float32Array> {}

export class Float64BufferAttribute extends BufferAttribute<Float64Array> {}
