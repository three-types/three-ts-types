import { mx_hsvtorgb, mx_rgbtohsv } from './lib/mx_hsv.js';
import Node from '../core/Node.js';
import UVNode from '../accessors/UVNode.js';
import MathNode from '../math/MathNode.js';
import { NodeRepresentation, ShaderNodeObject } from '../shadernode/ShaderNode.js';

export function mx_aastep(threshold?: NodeRepresentation, value?: NodeRepresentation): ShaderNodeObject<MathNode>;

export function mx_ramplr(
    valuel?: NodeRepresentation,
    valuer?: NodeRepresentation,
    texcoord?: ShaderNodeObject<UVNode>,
): ShaderNodeObject<MathNode>;
export function mx_ramptb(
    valuet?: NodeRepresentation,
    valueb?: NodeRepresentation,
    texcoord?: ShaderNodeObject<UVNode>,
): ShaderNodeObject<MathNode>;

export function mx_splitlr(
    valuel?: NodeRepresentation,
    valuer?: NodeRepresentation,
    center?: NodeRepresentation,
    texcoord?: ShaderNodeObject<UVNode>,
): ShaderNodeObject<MathNode>;
export function mx_splittb(
    valuet?: NodeRepresentation,
    valueb?: NodeRepresentation,
    center?: NodeRepresentation,
    texcoord?: ShaderNodeObject<UVNode>,
): ShaderNodeObject<MathNode>;

export function mx_transform_uv(
    uv_scale?: NodeRepresentation,
    uv_offset?: NodeRepresentation,
    uv_geo?: ShaderNodeObject<UVNode>,
): ShaderNodeObject<Node>;

export function mx_noise_float(
    texcoord?: ShaderNodeObject<UVNode>,
    amplitude?: NodeRepresentation,
    pivot?: NodeRepresentation,
): ShaderNodeObject<Node>;
export function mx_noise_vec2(
    texcoord?: ShaderNodeObject<UVNode>,
    amplitude?: NodeRepresentation,
    pivot?: NodeRepresentation,
): ShaderNodeObject<Node>;
export function mx_noise_vec3(
    texcoord?: ShaderNodeObject<UVNode>,
    amplitude?: NodeRepresentation,
    pivot?: NodeRepresentation,
): ShaderNodeObject<Node>;
export function mx_noise_vec4(
    texcoord?: ShaderNodeObject<UVNode>,
    amplitude?: NodeRepresentation,
    pivot?: NodeRepresentation,
): ShaderNodeObject<Node>;

export function mx_worley_noise_float(
    texcoord?: ShaderNodeObject<UVNode>,
    jitter?: NodeRepresentation,
): ShaderNodeObject<Node>;
export function mx_worley_noise_vec2(
    texcoord?: ShaderNodeObject<UVNode>,
    jitter?: NodeRepresentation,
): ShaderNodeObject<Node>;
export function mx_worley_noise_vec3(
    texcoord?: ShaderNodeObject<UVNode>,
    jitter?: NodeRepresentation,
): ShaderNodeObject<Node>;

export function mx_cell_noise_float(texcoord?: ShaderNodeObject<UVNode>): ShaderNodeObject<Node>;

export function mx_fractal_noise_float(
    position?: ShaderNodeObject<UVNode>,
    octaves?: NodeRepresentation,
    lacunarity?: NodeRepresentation,
    diminish?: NodeRepresentation,
    amplitude?: NodeRepresentation,
): ShaderNodeObject<Node>;
export function mx_fractal_noise_vec2(
    position?: ShaderNodeObject<UVNode>,
    octaves?: NodeRepresentation,
    lacunarity?: NodeRepresentation,
    diminish?: NodeRepresentation,
    amplitude?: NodeRepresentation,
): ShaderNodeObject<Node>;
export function mx_fractal_noise_vec3(
    position?: ShaderNodeObject<UVNode>,
    octaves?: NodeRepresentation,
    lacunarity?: NodeRepresentation,
    diminish?: NodeRepresentation,
    amplitude?: NodeRepresentation,
): ShaderNodeObject<Node>;
export function mx_fractal_noise_vec4(
    position?: ShaderNodeObject<UVNode>,
    octaves?: NodeRepresentation,
    lacunarity?: NodeRepresentation,
    diminish?: NodeRepresentation,
    amplitude?: NodeRepresentation,
): ShaderNodeObject<Node>;

export { mx_hsvtorgb, mx_rgbtohsv };
