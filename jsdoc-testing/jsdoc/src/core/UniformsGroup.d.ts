/**
 * A class for managing multiple uniforms in a single group. The renderer will process
 * such a definition as a single UBO.
 *
 * Since this class can only be used in context of {@link ShaderMaterial}, it is only supported
 * in {@link WebGLRenderer}.
 *
 * @augments EventDispatcher
 */
export class UniformsGroup extends EventDispatcher {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isUniformsGroup: boolean;
    /**
     * The name of the uniforms group.
     *
     * @type {string}
     */
    name: string;
    /**
     * The buffer usage.
     *
     * @type {(StaticDrawUsage|DynamicDrawUsage|StreamDrawUsage|StaticReadUsage|DynamicReadUsage|StreamReadUsage|StaticCopyUsage|DynamicCopyUsage|StreamCopyUsage)}
     * @default StaticDrawUsage
     */
    usage: (number | DynamicDrawUsage | StreamDrawUsage | StaticReadUsage | DynamicReadUsage | StreamReadUsage | StaticCopyUsage | DynamicCopyUsage | StreamCopyUsage);
    /**
     * An array holding the uniforms.
     *
     * @type {Array<Uniform>}
     */
    uniforms: Array<Uniform>;
    /**
     * Adds the given uniform to this uniforms group.
     *
     * @param {Uniform} uniform - The uniform to add.
     * @return {UniformsGroup} A reference to this uniforms group.
     */
    add(uniform: Uniform): UniformsGroup;
    /**
     * Removes the given uniform from this uniforms group.
     *
     * @param {Uniform} uniform - The uniform to remove.
     * @return {UniformsGroup} A reference to this uniforms group.
     */
    remove(uniform: Uniform): UniformsGroup;
    /**
     * Sets the name of this uniforms group.
     *
     * @param {string} name - The name to set.
     * @return {UniformsGroup} A reference to this uniforms group.
     */
    setName(name: string): UniformsGroup;
    /**
     * Sets the usage of this uniforms group.
     *
     * @param {(StaticDrawUsage|DynamicDrawUsage|StreamDrawUsage|StaticReadUsage|DynamicReadUsage|StreamReadUsage|StaticCopyUsage|DynamicCopyUsage|StreamCopyUsage)} value - The usage to set.
     * @return {UniformsGroup} A reference to this uniforms group.
     */
    setUsage(value: (number | DynamicDrawUsage | StreamDrawUsage | StaticReadUsage | DynamicReadUsage | StreamReadUsage | StaticCopyUsage | DynamicCopyUsage | StreamCopyUsage)): UniformsGroup;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     *
     * @fires Texture#dispose
     */
    dispose(): void;
    /**
     * Copies the values of the given uniforms group to this instance.
     *
     * @param {UniformsGroup} source - The uniforms group to copy.
     * @return {UniformsGroup} A reference to this uniforms group.
     */
    copy(source: UniformsGroup): UniformsGroup;
    /**
     * Returns a new uniforms group with copied values from this instance.
     *
     * @return {UniformsGroup} A clone of this instance.
     */
    clone(): UniformsGroup;
}
import { EventDispatcher } from './EventDispatcher.js';
