export declare const NodeShaderStage: {
    VERTEX: string;
    FRAGMENT: string;
};
export declare const NodeUpdateType: {
    NONE: string;
    FRAME: string;
    RENDER: string;
    OBJECT: string;
};
export declare const NodeType: {
    BOOLEAN: string;
    INTEGER: string;
    FLOAT: string;
    VECTOR2: string;
    VECTOR3: string;
    VECTOR4: string;
    MATRIX2: string;
    MATRIX3: string;
    MATRIX4: string;
};
export type NodeShaderStage = "vertex" | "fragment" | "compute";
export declare const defaultShaderStages: NodeShaderStage[];
export declare const defaultBuildStages: string[];
export declare const shaderStages: NodeShaderStage[];
export declare const vectorComponents: string[];
