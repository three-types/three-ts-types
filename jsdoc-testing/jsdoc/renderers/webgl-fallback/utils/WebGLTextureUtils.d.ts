export default WebGLTextureUtils;
/**
 * A WebGL 2 backend utility module for managing textures.
 *
 * @private
 */
declare class WebGLTextureUtils {
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
    /**
     * A reference to a backend module holding extension-related
     * utility functions.
     *
     * @type {WebGLExtensions}
     */
    extensions: WebGLExtensions;
    /**
     * A dictionary for managing default textures. The key
     * is the binding point (target), the value the WEbGL texture object.
     *
     * @type {Object<GLenum,WebGLTexture>}
     */
    defaultTextures: any;
    /**
     * A scratch framebuffer used for attaching the source texture in
     * {@link copyTextureToTexture}.
     *
     * @private
     * @type {?WebGLFramebuffer}
     */
    private _srcFramebuffer;
    /**
     * A scratch framebuffer used for attaching the destination texture in
     * {@link copyTextureToTexture}.
     *
     * @private
     * @type {?WebGLFramebuffer}
     */
    private _dstFramebuffer;
    /**
     * Inits the state of the utility.
     *
     * @private
     */
    private _init;
    /**
     * Returns the native texture type for the given texture.
     *
     * @param {Texture} texture - The texture.
     * @return {GLenum} The native texture type.
     */
    getGLTextureType(texture: Texture): GLenum;
    /**
     * Returns the native texture type for the given texture.
     *
     * @param {?string} internalFormatName - The internal format name. When `null`, the internal format is derived from the subsequent parameters.
     * @param {GLenum} glFormat - The WebGL format.
     * @param {GLenum} glType - The WebGL type.
     * @param {string} colorSpace - The texture's color space.
     * @param {boolean} [forceLinearTransfer=false] - Whether to force a linear transfer or not.
     * @return {GLenum} The internal format.
     */
    getInternalFormat(internalFormatName: string | null, glFormat: GLenum, glType: GLenum, colorSpace: string, forceLinearTransfer?: boolean): GLenum;
    /**
     * Sets the texture parameters for the given texture.
     *
     * @param {GLenum} textureType - The texture type.
     * @param {Texture} texture - The texture.
     */
    setTextureParameters(textureType: GLenum, texture: Texture): void;
    /**
     * Creates a default texture for the given texture that can be used
     * as a placeholder until the actual texture is ready for usage.
     *
     * @param {Texture} texture - The texture to create a default texture for.
     */
    createDefaultTexture(texture: Texture): void;
    /**
     * Defines a texture on the GPU for the given texture object.
     *
     * @param {Texture} texture - The texture.
     * @param {Object} [options={}] - Optional configuration parameter.
     * @return {undefined}
     */
    createTexture(texture: Texture, options?: Object): undefined;
    /**
     * Uploads texture buffer data to the GPU memory.
     *
     * @param {WebGLBuffer} buffer - The buffer data.
     * @param {Texture} texture - The texture,
     */
    copyBufferToTexture(buffer: WebGLBuffer, texture: Texture): void;
    /**
     * Uploads the updated texture data to the GPU.
     *
     * @param {Texture} texture - The texture.
     * @param {Object} [options={}] - Optional configuration parameter.
     */
    updateTexture(texture: Texture, options?: Object): void;
    /**
     * Generates mipmaps for the given texture.
     *
     * @param {Texture} texture - The texture.
     */
    generateMipmaps(texture: Texture): void;
    /**
     * Deallocates the render buffers of the given render target.
     *
     * @param {RenderTarget} renderTarget - The render target.
     */
    deallocateRenderBuffers(renderTarget: RenderTarget): void;
    /**
     * Destroys the GPU data for the given texture object.
     *
     * @param {Texture} texture - The texture.
     * @param {boolean} [isDefaultTexture=false] - Whether the texture uses a default GPU texture or not.
     */
    destroyTexture(texture: Texture, isDefaultTexture?: boolean): void;
    /**
     * Copies data of the given source texture to the given destination texture.
     *
     * @param {Texture} srcTexture - The source texture.
     * @param {Texture} dstTexture - The destination texture.
     * @param {?(Box3|Box2)} [srcRegion=null] - The region of the source texture to copy.
     * @param {?(Vector2|Vector3)} [dstPosition=null] - The destination position of the copy.
     * @param {number} [srcLevel=0] - The source mip level to copy from.
     * @param {number} [dstLevel=0] - The destination mip level to copy to.
     */
    copyTextureToTexture(srcTexture: Texture, dstTexture: Texture, srcRegion?: (Box3 | Box2) | null, dstPosition?: (Vector2 | Vector3) | null, srcLevel?: number, dstLevel?: number): void;
    /**
     * Copies the current bound framebuffer to the given texture.
     *
     * @param {Texture} texture - The destination texture.
     * @param {RenderContext} renderContext - The render context.
     * @param {Vector4} rectangle - A four dimensional vector defining the origin and dimension of the copy.
     */
    copyFramebufferToTexture(texture: Texture, renderContext: RenderContext, rectangle: Vector4): void;
    /**
     * SetupS storage for internal depth/stencil buffers and bind to correct framebuffer.
     *
     * @param {WebGLRenderbuffer} renderbuffer - The render buffer.
     * @param {RenderContext} renderContext - The render context.
     * @param {number} samples - The MSAA sample count.
     * @param {boolean} [useMultisampledRTT=false] - Whether to use WEBGL_multisampled_render_to_texture or not.
     */
    setupRenderBufferStorage(renderbuffer: WebGLRenderbuffer, renderContext: RenderContext, samples: number, useMultisampledRTT?: boolean): void;
    /**
     * Returns texture data as a typed array.
     *
     * @async
     * @param {Texture} texture - The texture to copy.
     * @param {number} x - The x coordinate of the copy origin.
     * @param {number} y - The y coordinate of the copy origin.
     * @param {number} width - The width of the copy.
     * @param {number} height - The height of the copy.
     * @param {number} faceIndex - The face index.
     * @return {Promise<TypedArray>} A Promise that resolves with a typed array when the copy operation has finished.
     */
    copyTextureToBuffer(texture: Texture, x: number, y: number, width: number, height: number, faceIndex: number): Promise<TypedArray>;
    /**
     * Returns the corresponding typed array type for the given WebGL data type.
     *
     * @private
     * @param {GLenum} glType - The WebGL data type.
     * @return {TypedArray.constructor} The typed array type.
     */
    private _getTypedArrayType;
    /**
     * Returns the bytes-per-texel value for the given WebGL data type and texture format.
     *
     * @private
     * @param {GLenum} glType - The WebGL data type.
     * @param {GLenum} glFormat - The WebGL texture format.
     * @return {number} The bytes-per-texel.
     */
    private _getBytesPerTexel;
    /**
     * Frees the internal resources.
     */
    dispose(): void;
}
