/**
 * ~Shader
 */
export type ShaderMaterial = {
    /**
     * - The name of the shader.
     */
    name: string;
    /**
     * - The uniforms of the shader.
     */
    uniforms: {
        [x: string]: Uniform;
    };
    /**
     * - The defines of the shader.
     */
    defines: {
        [x: string]: any;
    };
    /**
     * - The vertex shader code.
     */
    vertexShader: string;
    /**
     * - The fragment shader code.
     */
    fragmentShader: string;
};
/**
 * A material rendered with custom shaders. A shader is a small program written in GLSL.
 * that runs on the GPU. You may want to use a custom shader if you need to implement an
 * effect not included with any of the built-in materials.
 *
 * There are the following notes to bear in mind when using a `ShaderMaterial`:
 *
 * - `ShaderMaterial` can only be used with {@link WebGLRenderer}.
 * - Built in attributes and uniforms are passed to the shaders along with your code. If
 * you don't want that, use {@link RawShaderMaterial} instead.
 * - You can use the directive `#pragma unroll_loop_start` and `#pragma unroll_loop_end`
 * in order to unroll a `for` loop in GLSL by the shader preprocessor. The directive has
 * to be placed right above the loop. The loop formatting has to correspond to a defined standard.
 *   - The loop has to be [normalized](https://en.wikipedia.org/wiki/Normalized_loop).
 *   - The loop variable has to be *i*.
 *   - The value `UNROLLED_LOOP_INDEX` will be replaced with the explicitly
 * value of *i* for the given iteration and can be used in preprocessor
 * statements.
 *
 * ```js
 * const material = new THREE.ShaderMaterial( {
 * 	uniforms: {
 * 		time: { value: 1.0 },
 * 		resolution: { value: new THREE.Vector2() }
 * 	},
 * 	vertexShader: document.getElementById( 'vertexShader' ).textContent,
 * 	fragmentShader: document.getElementById( 'fragmentShader' ).textContent
 * } );
 * ```
 *
 * @augments Material
 */
export class ShaderMaterial extends Material {
    /**
     * Constructs a new shader material.
     *
     * @param {Object} [parameters] - An object with one or more properties
     * defining the material's appearance. Any property of the material
     * (including any property from inherited materials) can be passed
     * in here. Color values can be passed any type of value accepted
     * by {@link Color#set}.
     */
    constructor(parameters?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isShaderMaterial: boolean;
    type: string;
    /**
     * Defines custom constants using `#define` directives within the GLSL code
     * for both the vertex shader and the fragment shader; each key/value pair
     * yields another directive.
     * ```js
     * defines: {
     * 	FOO: 15,
     * 	BAR: true
     * }
     * ```
     * Yields the lines:
     * ```
     * #define FOO 15
     * #define BAR true
     * ```
     *
     * @type {Object}
     */
    defines: Object;
    /**
     * An object of the form:
     * ```js
     * {
     * 	"uniform1": { value: 1.0 },
     * 	"uniform2": { value: 2 }
     * }
     * ```
     * specifying the uniforms to be passed to the shader code; keys are uniform
     * names, values are definitions of the form
     * ```
     * {
     * 	value: 1.0
     * }
     * ```
     * where `value` is the value of the uniform. Names must match the name of
     * the uniform, as defined in the GLSL code. Note that uniforms are refreshed
     * on every frame, so updating the value of the uniform will immediately
     * update the value available to the GLSL code.
     *
     * @type {Object}
     */
    uniforms: Object;
    /**
     * An array holding uniforms groups for configuring UBOs.
     *
     * @type {Array<UniformsGroup>}
     */
    uniformsGroups: Array<UniformsGroup>;
    /**
     * Vertex shader GLSL code. This is the actual code for the shader.
     *
     * @type {string}
     */
    vertexShader: string;
    /**
     * Fragment shader GLSL code. This is the actual code for the shader.
     *
     * @type {string}
     */
    fragmentShader: string;
    /**
     * Controls line thickness or lines.
     *
     * WebGL and WebGPU ignore this setting and always render line primitives with a
     * width of one pixel.
     *
     * @type {number}
     * @default 1
     */
    linewidth: number;
    /**
     * Renders the geometry as a wireframe.
     *
     * @type {boolean}
     * @default false
     */
    wireframe: boolean;
    /**
     * Controls the thickness of the wireframe.
     *
     * WebGL and WebGPU ignore this property and always render
     * 1 pixel wide lines.
     *
     * @type {number}
     * @default 1
     */
    wireframeLinewidth: number;
    /**
     * Defines whether the material color is affected by global fog settings; `true`
     * to pass fog uniforms to the shader.
     *
     * Setting this property to `true` requires the definition of fog uniforms. It is
     * recommended to use `UniformsUtils.merge()` to combine the custom shader uniforms
     * with predefined fog uniforms.
     *
     * ```js
     * const material = new ShaderMaterial( {
     *     uniforms: UniformsUtils.merge( [ UniformsLib[ 'fog' ], shaderUniforms ] );
     *     vertexShader: vertexShader,
     *     fragmentShader: fragmentShader,
     *     fog: true
     * } );
     * ```
     *
     * @type {boolean}
     * @default false
     */
    fog: boolean;
    /**
     * Defines whether this material uses lighting; `true` to pass uniform data
     * related to lighting to this shader.
     *
     * @type {boolean}
     * @default false
     */
    lights: boolean;
    /**
     * Defines whether this material supports clipping; `true` to let the renderer
     * pass the clippingPlanes uniform.
     *
     * @type {boolean}
     * @default false
     */
    clipping: boolean;
    /**
     * This object allows to enable certain WebGL 2 extensions.
     *
     * - clipCullDistance: set to `true` to use vertex shader clipping
     * - multiDraw: set to `true` to use vertex shader multi_draw / enable gl_DrawID
     *
     * @type {{clipCullDistance:false,multiDraw:false}}
     */
    extensions: {
        clipCullDistance: false;
        multiDraw: false;
    };
    /**
     * When the rendered geometry doesn't include these attributes but the
     * material does, these default values will be passed to the shaders. This
     * avoids errors when buffer data is missing.
     *
     * - color: [ 1, 1, 1 ]
     * - uv: [ 0, 0 ]
     * - uv1: [ 0, 0 ]
     *
     * @type {Object}
     */
    defaultAttributeValues: Object;
    /**
     * If set, this calls [gl.bindAttribLocation](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindAttribLocation)
     * to bind a generic vertex index to an attribute variable.
     *
     * @type {string|undefined}
     * @default undefined
     */
    index0AttributeName: string | undefined;
    /**
     * Can be used to force a uniform update while changing uniforms in
     * {@link Object3D#onBeforeRender}.
     *
     * @type {boolean}
     * @default false
     */
    uniformsNeedUpdate: boolean;
    /**
     * Defines the GLSL version of custom shader code.
     *
     * @type {?(GLSL1|GLSL3)}
     * @default null
     */
    glslVersion: (GLSL1 | GLSL3) | null;
    copy(source: any): this;
    toJSON(meta: any): Object;
}
import { Material } from './Material.js';
