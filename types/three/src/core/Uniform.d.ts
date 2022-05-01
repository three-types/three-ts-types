export class Uniform {
    constructor(value: any);
    /**
     * @deprecated
     */
    constructor(type: string, value: any);
    /**
     * @deprecated
     */
    type: string;
    value: any;
    /**
     * @deprecated Use {@link Object3D#onBeforeRender object.onBeforeRender()} instead.
     */
    dynamic: boolean;

    /**
     * @deprecated Use {@link Object3D#onBeforeRender object.onBeforeRender()} instead.
     */
    onUpdate(callback: () => void): Uniform;
}

export interface UniformConstructor {
    new (value: any): Uniform;
    new (type: string, value: any): Uniform;
    prototype: Uniform;
}
