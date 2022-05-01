import { Usage } from '../constants';
import { Matrix3 } from './../math/Matrix3';
import { Matrix4 } from './../math/Matrix4';

/**
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/BufferAttribute.js|src/core/BufferAttribute.js}
 */
export class BufferAttribute {
    constructor(array: ArrayLike<number>, itemSize: number, normalized?: boolean); // array parameter should be TypedArray.

    /**
     * @default ''
     */
    name: string;
    array: ArrayLike<number>;
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
    copy(source: BufferAttribute): this;
    copyAt(index1: number, attribute: BufferAttribute, index2: number): this;
    copyArray(array: ArrayLike<number>): this;
    copyColorsArray(colors: Array<{ r: number; g: number; b: number }>): this;
    copyVector2sArray(vectors: Array<{ x: number; y: number }>): this;
    copyVector3sArray(vectors: Array<{ x: number; y: number; z: number }>): this;
    copyVector4sArray(vectors: Array<{ x: number; y: number; z: number; w: number }>): this;
    applyMatrix3(m: Matrix3): this;
    applyMatrix4(m: Matrix4): this;
    applyNormalMatrix(m: Matrix3): this;
    transformDirection(m: Matrix4): this;
    set(value: ArrayLike<number> | ArrayBufferView, offset?: number): this;
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

export interface BufferAttributeConstructor {
    new (array: ArrayLike<number>, itemSize: number, normalized?: boolean): BufferAttribute;
    prototype: BufferAttribute;
}

/**
 * @deprecated THREE.Int8Attribute has been removed. Use new THREE.Int8BufferAttribute() instead.
 */
export class Int8Attribute extends BufferAttribute {
    constructor(array: any, itemSize: number);
}

export interface Int8AttributeConstructor {
    new (array: any, itemSize: number): Int8Attribute;
    prototype: Int8Attribute;
}

/**
 * @deprecated THREE.Uint8Attribute has been removed. Use new THREE.Uint8BufferAttribute() instead.
 */
export class Uint8Attribute extends BufferAttribute {
    constructor(array: any, itemSize: number);
}

export interface Uint8AttributeConstructor {
    new (array: any, itemSize: number): Uint8Attribute;
    prototype: Uint8Attribute;
}

/**
 * @deprecated THREE.Uint8ClampedAttribute has been removed. Use new THREE.Uint8ClampedBufferAttribute() instead.
 */
export class Uint8ClampedAttribute extends BufferAttribute {
    constructor(array: any, itemSize: number);
}

export interface Uint8ClampedAttributeConstructor {
    new (array: any, itemSize: number): Uint8ClampedAttribute;
    prototype: Uint8ClampedAttribute;
}

/**
 * @deprecated THREE.Int16Attribute has been removed. Use new THREE.Int16BufferAttribute() instead.
 */
export class Int16Attribute extends BufferAttribute {
    constructor(array: any, itemSize: number);
}

export interface Int16AttributeConstructor {
    new (array: any, itemSize: number): Int16Attribute;
    prototype: Int16Attribute;
}

/**
 * @deprecated THREE.Uint16Attribute has been removed. Use new THREE.Uint16BufferAttribute() instead.
 */
export class Uint16Attribute extends BufferAttribute {
    constructor(array: any, itemSize: number);
}

export interface Uint16AttributeConstructor {
    new (array: any, itemSize: number): Uint16Attribute;
    prototype: Uint16Attribute;
}

/**
 * @deprecated THREE.Int32Attribute has been removed. Use new THREE.Int32BufferAttribute() instead.
 */
export class Int32Attribute extends BufferAttribute {
    constructor(array: any, itemSize: number);
}

export interface Int32AttributeConstructor {
    new (array: any, itemSize: number): Int32Attribute;
    prototype: Int32Attribute;
}

/**
 * @deprecated THREE.Uint32Attribute has been removed. Use new THREE.Uint32BufferAttribute() instead.
 */
export class Uint32Attribute extends BufferAttribute {
    constructor(array: any, itemSize: number);
}

export interface Uint32AttributeConstructor {
    new (array: any, itemSize: number): Uint32Attribute;
    prototype: Uint32Attribute;
}

/**
 * @deprecated THREE.Float32Attribute has been removed. Use new THREE.Float32BufferAttribute() instead.
 */
export class Float32Attribute extends BufferAttribute {
    constructor(array: any, itemSize: number);
}

export interface Float32AttributeConstructor {
    new (array: any, itemSize: number): Float32Attribute;
    prototype: Float32Attribute;
}

/**
 * @deprecated THREE.Float64Attribute has been removed. Use new THREE.Float64BufferAttribute() instead.
 */
export class Float64Attribute extends BufferAttribute {
    constructor(array: any, itemSize: number);
}

export interface Float64AttributeConstructor {
    new (array: any, itemSize: number): Float64Attribute;
    prototype: Float64Attribute;
}

export class Int8BufferAttribute extends BufferAttribute {
    constructor(
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    );
}

export interface Int8BufferAttributeConstructor {
    new (
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    ): Int8BufferAttribute;
    prototype: Int8BufferAttribute;
}

export class Uint8BufferAttribute extends BufferAttribute {
    constructor(
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    );
}

export interface Uint8BufferAttributeConstructor {
    new (
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    ): Uint8BufferAttribute;
    prototype: Uint8BufferAttribute;
}

export class Uint8ClampedBufferAttribute extends BufferAttribute {
    constructor(
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    );
}

export interface Uint8ClampedBufferAttributeConstructor {
    new (
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    ): Uint8ClampedBufferAttribute;
    prototype: Uint8ClampedBufferAttribute;
}

export class Int16BufferAttribute extends BufferAttribute {
    constructor(
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    );
}

export interface Int16BufferAttributeConstructor {
    new (
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    ): Int16BufferAttribute;
    prototype: Int16BufferAttribute;
}

export class Uint16BufferAttribute extends BufferAttribute {
    constructor(
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    );
}

export interface Uint16BufferAttributeConstructor {
    new (
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    ): Uint16BufferAttribute;
    prototype: Uint16BufferAttribute;
}

export class Int32BufferAttribute extends BufferAttribute {
    constructor(
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    );
}

export interface Int32BufferAttributeConstructor {
    new (
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    ): Int32BufferAttribute;
    prototype: Int32BufferAttribute;
}

export class Uint32BufferAttribute extends BufferAttribute {
    constructor(
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    );
}

export interface Uint32BufferAttributeConstructor {
    new (
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    ): Uint32BufferAttribute;
    prototype: Uint32BufferAttribute;
}

export class Float16BufferAttribute extends BufferAttribute {
    constructor(
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    );
}

export interface Float16BufferAttributeConstructor {
    new (
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    ): Float16BufferAttribute;
    prototype: Float16BufferAttribute;
}

export class Float32BufferAttribute extends BufferAttribute {
    constructor(
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    );
}

export interface Float32BufferAttributeConstructor {
    new (
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    ): Float32BufferAttribute;
    prototype: Float32BufferAttribute;
}

export class Float64BufferAttribute extends BufferAttribute {
    constructor(
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    );
}

export interface Float64BufferAttributeConstructor {
    new (
        array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
        itemSize: number,
        normalized?: boolean,
    ): Float64BufferAttribute;
    prototype: Float64BufferAttribute;
}
