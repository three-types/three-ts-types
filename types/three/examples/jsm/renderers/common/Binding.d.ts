/**
 * A Binding defines a bind group entry's visibility to different shader stages.
 */
export default class Binding {
    /**
     * @defaultValue ``
     */
    name: string;
    /**
     * A bit field specifying shader stages that can access a bind group entry's resources.
     * @remarks Valid flags are defined by a bitset of the members of GPUShaderStage.
     */
    visibility: 1 | 2 | 3 | 4 | 5 | 6 | 7;

    constructor(name: string);

    /**
     * Apply a shader stage's bit flag to the binding's visibility
     */
    setVisibility(flag: 1 | 2 | 4);

    clone(): this;
}