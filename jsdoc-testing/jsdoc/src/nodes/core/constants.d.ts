export namespace NodeShaderStage {
    let VERTEX: string;
    let FRAGMENT: string;
}
export namespace NodeUpdateType {
    let NONE: string;
    let FRAME: string;
    let RENDER: string;
    let OBJECT: string;
}
export namespace NodeType {
    let BOOLEAN: string;
    let INTEGER: string;
    let FLOAT: string;
    let VECTOR2: string;
    let VECTOR3: string;
    let VECTOR4: string;
    let MATRIX2: string;
    let MATRIX3: string;
    let MATRIX4: string;
}
export namespace NodeAccess {
    let READ_ONLY: string;
    let WRITE_ONLY: string;
    let READ_WRITE: string;
}
export const defaultShaderStages: string[];
export const defaultBuildStages: string[];
export const shaderStages: string[];
export const vectorComponents: string[];
