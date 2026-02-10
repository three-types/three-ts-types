export default WebGLState;
/**
 * A WebGL 2 backend utility module for managing the WebGL state.
 *
 * The major goal of this module is to reduce the number of state changes
 * by caching the WEbGL state with a series of variables. In this way, the
 * renderer only executes state change commands when necessary which
 * improves the overall performance.
 *
 * @private
 */
declare class WebGLState {
    /**
     * Constructs a new utility object.
     *
     * @param {WebGLBackend} backend - The WebGL 2 backend.
     */
    constructor(backend: WebGLBackend);
    /**
     * A reference to the WebGL 2 backend.
     *
     * @type {WebGLBackend}
     */
    backend: WebGLBackend;
    /**
     * A reference to the rendering context.
     *
     * @type {WebGL2RenderingContext}
     */
    gl: WebGL2RenderingContext;
    enabled: {};
    currentFlipSided: any;
    currentCullFace: any;
    currentProgram: any;
    currentBlendingEnabled: boolean;
    currentBlending: any;
    currentBlendSrc: any;
    currentBlendDst: number | null;
    currentBlendSrcAlpha: number | null;
    currentBlendDstAlpha: number | null;
    currentPremultipledAlpha: boolean | null;
    currentPolygonOffsetFactor: any;
    currentPolygonOffsetUnits: number | null;
    currentColorMask: any;
    currentDepthFunc: any;
    currentDepthMask: any;
    currentStencilFunc: any;
    currentStencilRef: number | null;
    currentStencilFuncMask: number | null;
    currentStencilFail: any;
    currentStencilZFail: number | null;
    currentStencilZPass: number | null;
    currentStencilMask: any;
    currentLineWidth: any;
    currentClippingPlanes: number;
    currentVAO: any;
    currentIndex: WebGLBuffer | null;
    currentBoundFramebuffers: {};
    currentDrawbuffers: WeakMap<object, any>;
    maxTextures: any;
    currentTextureSlot: any;
    currentBoundTextures: {};
    currentBoundBufferBases: {};
    /**
     * Inits the state of the utility.
     *
     * @private
     */
    private _init;
    currentScissor: Vector4 | undefined;
    currentViewport: Vector4 | undefined;
    _tempVec4: Vector4 | undefined;
    /**
     * Enables the given WebGL capability.
     *
     * This method caches the capability state so
     * `gl.enable()` is only called when necessary.
     *
     * @param {GLenum} id - The capability to enable.
     */
    enable(id: GLenum): void;
    /**
     * Disables the given WebGL capability.
     *
     * This method caches the capability state so
     * `gl.disable()` is only called when necessary.
     *
     * @param {GLenum} id - The capability to enable.
     */
    disable(id: GLenum): void;
    /**
     * Specifies whether polygons are front- or back-facing
     * by setting the winding orientation.
     *
     * This method caches the state so `gl.frontFace()` is only
     * called when necessary.
     *
     * @param {boolean} flipSided - Whether triangles flipped their sides or not.
     */
    setFlipSided(flipSided: boolean): void;
    /**
     * Specifies whether or not front- and/or back-facing
     * polygons can be culled.
     *
     * This method caches the state so `gl.cullFace()` is only
     * called when necessary.
     *
     * @param {number} cullFace - Defines which polygons are candidates for culling.
     */
    setCullFace(cullFace: number): void;
    /**
     * Specifies the width of line primitives.
     *
     * This method caches the state so `gl.lineWidth()` is only
     * called when necessary.
     *
     * @param {number} width - The line width.
     */
    setLineWidth(width: number): void;
    setMRTBlending(textures: any, mrt: any, material: any): void;
    /**
     * Applies blending configuration for a specific draw buffer index.
     *
     * @private
     * @param {number} index - The draw buffer index.
     * @param {Object} blending - The blending configuration (material or BlendMode).
     */
    private _setMRTBlendingIndex;
    /**
     * Defines the blending.
     *
     * This method caches the state so `gl.blendEquation()`, `gl.blendEquationSeparate()`,
     * `gl.blendFunc()` and  `gl.blendFuncSeparate()` are only called when necessary.
     *
     * @param {number} blending - The blending type.
     * @param {number} blendEquation - The blending equation.
     * @param {number} blendSrc - Only relevant for custom blending. The RGB source blending factor.
     * @param {number} blendDst - Only relevant for custom blending. The RGB destination blending factor.
     * @param {number} blendEquationAlpha - Only relevant for custom blending. The blending equation for alpha.
     * @param {number} blendSrcAlpha - Only relevant for custom blending. The alpha source blending factor.
     * @param {number} blendDstAlpha - Only relevant for custom blending. The alpha destination blending factor.
     * @param {boolean} premultipliedAlpha - Whether premultiplied alpha is enabled or not.
     */
    setBlending(blending: number, blendEquation: number, blendSrc: number, blendDst: number, blendEquationAlpha: number, blendSrcAlpha: number, blendDstAlpha: number, premultipliedAlpha: boolean): void;
    currentBlendEquation: any;
    currentBlendEquationAlpha: number | undefined;
    /**
     * Specifies whether colors can be written when rendering
     * into a framebuffer or not.
     *
     * This method caches the state so `gl.colorMask()` is only
     * called when necessary.
     *
     * @param {boolean} colorMask - The color mask.
     */
    setColorMask(colorMask: boolean): void;
    /**
     * Specifies whether the depth test is enabled or not.
     *
     * @param {boolean} depthTest - Whether the depth test is enabled or not.
     */
    setDepthTest(depthTest: boolean): void;
    /**
     * Specifies whether depth values can be written when rendering
     * into a framebuffer or not.
     *
     * This method caches the state so `gl.depthMask()` is only
     * called when necessary.
     *
     * @param {boolean} depthMask - The depth mask.
     */
    setDepthMask(depthMask: boolean): void;
    /**
     * Specifies the depth compare function.
     *
     * This method caches the state so `gl.depthFunc()` is only
     * called when necessary.
     *
     * @param {number} depthFunc - The depth compare function.
     */
    setDepthFunc(depthFunc: number): void;
    /**
     * Specifies the scissor box.
     *
     * @param {number} x - The x-coordinate of the lower left corner of the viewport.
     * @param {number} y - The y-coordinate of the lower left corner of the viewport.
     * @param {number} width - The width of the viewport.
     * @param {number} height - The height of the viewport.
     *
     */
    scissor(x: number, y: number, width: number, height: number): void;
    /**
     * Specifies the viewport.
     *
     * @param {number} x - The x-coordinate of the lower left corner of the viewport.
     * @param {number} y - The y-coordinate of the lower left corner of the viewport.
     * @param {number} width - The width of the viewport.
     * @param {number} height - The height of the viewport.
     *
     */
    viewport(x: number, y: number, width: number, height: number): void;
    /**
     * Defines the scissor test.
     *
     * @param {boolean} boolean - Whether the scissor test should be enabled or not.
     */
    setScissorTest(boolean: boolean): void;
    /**
     * Specifies whether the stencil test is enabled or not.
     *
     * @param {boolean} stencilTest - Whether the stencil test is enabled or not.
     */
    setStencilTest(stencilTest: boolean): void;
    /**
     * Specifies whether stencil values can be written when rendering
     * into a framebuffer or not.
     *
     * This method caches the state so `gl.stencilMask()` is only
     * called when necessary.
     *
     * @param {boolean} stencilMask - The stencil mask.
     */
    setStencilMask(stencilMask: boolean): void;
    /**
     * Specifies whether the stencil test functions.
     *
     * This method caches the state so `gl.stencilFunc()` is only
     * called when necessary.
     *
     * @param {number} stencilFunc - The stencil compare function.
     * @param {number} stencilRef - The reference value for the stencil test.
     * @param {number} stencilMask - A bit-wise mask that is used to AND the reference value and the stored stencil value when the test is done.
     */
    setStencilFunc(stencilFunc: number, stencilRef: number, stencilMask: number): void;
    /**
     * Specifies whether the stencil test operation.
     *
     * This method caches the state so `gl.stencilOp()` is only
     * called when necessary.
     *
     * @param {number} stencilFail - The function to use when the stencil test fails.
     * @param {number} stencilZFail - The function to use when the stencil test passes, but the depth test fail.
     * @param {number} stencilZPass - The function to use when both the stencil test and the depth test pass,
     * or when the stencil test passes and there is no depth buffer or depth testing is disabled.
     */
    setStencilOp(stencilFail: number, stencilZFail: number, stencilZPass: number): void;
    /**
     * Configures the WebGL state for the given material.
     *
     * @param {Material} material - The material to configure the state for.
     * @param {number} frontFaceCW - Whether the front faces are counter-clockwise or not.
     * @param {number} hardwareClippingPlanes - The number of hardware clipping planes.
     */
    setMaterial(material: Material, frontFaceCW: number, hardwareClippingPlanes: number): void;
    /**
     * Specifies the polygon offset.
     *
     * This method caches the state so `gl.polygonOffset()` is only
     * called when necessary.
     *
     * @param {boolean} polygonOffset - Whether polygon offset is enabled or not.
     * @param {number} factor - The scale factor for the variable depth offset for each polygon.
     * @param {number} units - The multiplier by which an implementation-specific value is multiplied with to create a constant depth offset.
     */
    setPolygonOffset(polygonOffset: boolean, factor: number, units: number): void;
    /**
     * Defines the usage of the given WebGL program.
     *
     * This method caches the state so `gl.useProgram()` is only
     * called when necessary.
     *
     * @param {WebGLProgram} program - The WebGL program to use.
     * @return {boolean} Whether a program change has been executed or not.
     */
    useProgram(program: WebGLProgram): boolean;
    /**
     * Sets the vertex state by binding the given VAO and element buffer.
     *
     * @param {WebGLVertexArrayObject} vao - The VAO.
     * @param {?WebGLBuffer} indexBuffer - The index buffer.
     * @return {boolean} Whether a vertex state has been changed or not.
     */
    setVertexState(vao: WebGLVertexArrayObject, indexBuffer?: WebGLBuffer | null): boolean;
    /**
     * Resets the vertex array state by resetting the VAO and element buffer.
     */
    resetVertexState(): void;
    /**
     * Binds the given framebuffer.
     *
     * This method caches the state so `gl.bindFramebuffer()` is only
     * called when necessary.
     *
     * @param {number} target - The binding point (target).
     * @param {WebGLFramebuffer} framebuffer - The WebGL framebuffer to bind.
     * @return {boolean} Whether a bind has been executed or not.
     */
    bindFramebuffer(target: number, framebuffer: WebGLFramebuffer): boolean;
    /**
     * Defines draw buffers to which fragment colors are written into.
     * Configures the MRT setup of custom framebuffers.
     *
     * This method caches the state so `gl.drawBuffers()` is only
     * called when necessary.
     *
     * @param {RenderContext} renderContext - The render context.
     * @param {WebGLFramebuffer} framebuffer - The WebGL framebuffer.
     */
    drawBuffers(renderContext: RenderContext, framebuffer: WebGLFramebuffer): void;
    /**
     * Makes the given texture unit active.
     *
     * This method caches the state so `gl.activeTexture()` is only
     * called when necessary.
     *
     * @param {number} webglSlot - The texture unit to make active.
     */
    activeTexture(webglSlot: number): void;
    /**
     * Binds the given WebGL texture to a target.
     *
     * This method caches the state so `gl.bindTexture()` is only
     * called when necessary.
     *
     * @param {number} webglType - The binding point (target).
     * @param {WebGLTexture} webglTexture - The WebGL texture to bind.
     * @param {number} webglSlot - The texture.
     */
    bindTexture(webglType: number, webglTexture: WebGLTexture, webglSlot: number): void;
    /**
     * Binds a given WebGL buffer to a given binding point (target) at a given index.
     *
     * This method caches the state so `gl.bindBufferBase()` is only
     * called when necessary.
     *
     * @param {number} target - The target for the bind operation.
     * @param {number} index - The index of the target.
     * @param {WebGLBuffer} buffer - The WebGL buffer.
     * @return {boolean} Whether a bind has been executed or not.
     */
    bindBufferBase(target: number, index: number, buffer: WebGLBuffer): boolean;
    /**
     * Unbinds the current bound texture.
     *
     * This method caches the state so `gl.bindTexture()` is only
     * called when necessary.
     */
    unbindTexture(): void;
}
import { Vector4 } from '../../../math/Vector4.js';
