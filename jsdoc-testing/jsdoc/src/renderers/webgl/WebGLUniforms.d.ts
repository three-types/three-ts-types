export class WebGLUniforms {
    static upload(gl: any, seq: any, values: any, textures: any): void;
    static seqWithValue(seq: any, values: any): any[];
    constructor(gl: any, program: any);
    seq: any[];
    map: {};
    setValue(gl: any, name: any, value: any, textures: any): void;
    setOptional(gl: any, object: any, name: any): void;
}
