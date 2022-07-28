import { Color, Matrix3, Matrix4, Vector2, Vector3, Vector4 } from '../../../../src/Three';

// disable automatic export, we have some private declarations
export const NodeShaderStage: {
    Vertex: 'vertex';
    Fragment: 'fragment';
};

export const NodeUpdateType: {
    None: 'none';
    Frame: 'frame';
    Object: 'object';
};

export type NodeValueOption = Color | Vector2 | Vector3 | Vector4 | Matrix3 | Matrix4 | boolean | number;
export type NodeUpdateTypeOption = 'none' | 'frame' | 'object';
export type NodeShaderStageOption = 'vertex' | 'fragment' | 'compute';
export type NodeTypeOption =
    | 'bool'
    | 'int'
    | 'float'
    | 'vec2'
    | 'vec3'
    | 'vec4'
    | 'mat3'
    | 'mat4'
    | 'code' /* CodeNode */
    | 'color' /* NodeUtis.getValueType */
    | 'uint'
    | 'int' /* NodeBuilder.getComponentType */
    | 'void'
    | 'property'
    | 'sampler'
    | 'texture'
    | 'cubeTexture' /* NodeBuilder.isReference */
    | 'ivec2'
    | 'uvec2'
    | 'bvec2' /* ShaderNodeBaseElements */
    | 'ivec3'
    | 'uvec3'
    | 'bvec3'
    | 'ivec4'
    | 'uvec4'
    | 'bvec4'
    | 'imat3'
    | 'umat3'
    | 'bmat3'
    | 'imat4'
    | 'umat4'
    | 'bmat4';

// can be defined with string template type in Typescript 4.1
export type SwizzleOption = string;

export const NodeType: {
    Boolean: 'bool';
    Integer: 'int';
    Float: 'float';
    Vector2: 'vec2';
    Vector3: 'vec3';
    Vector4: 'vec4';
    Matrix3: 'mat3';
    Matrix4: 'mat4';
};
