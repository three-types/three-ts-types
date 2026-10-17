/**
 * This holds a reference to a real property in the scene graph; used internally.
 */
export class PropertyBinding {
    /**
     * Factory method for creating a property binding from the given parameters.
     *
     * @static
     * @param {Object} root - The root node.
     * @param {string} path - The path.
     * @param {?Object} [parsedPath] - The parsed path.
     * @return {PropertyBinding|Composite} The created property binding or composite.
     */
    static create(root: Object, path: string, parsedPath?: Object | null): PropertyBinding | Composite;
    /**
     * Replaces spaces with underscores and removes unsupported characters from
     * node names, to ensure compatibility with parseTrackName().
     *
     * @param {string} name - Node name to be sanitized.
     * @return {string} The sanitized node name.
     */
    static sanitizeNodeName(name: string): string;
    /**
     * Parses the given track name (an object path to an animated property) and
     * returns an object with information about the path. Matches strings in the following forms:
     *
     * - nodeName.property
     * - nodeName.property[accessor]
     * - nodeName.material.property[accessor]
     * - uuid.property[accessor]
     * - uuid.objectName[objectIndex].propertyName[propertyIndex]
     * - parentName/nodeName.property
     * - parentName/parentName/nodeName.property[index]
     * - .bone[Armature.DEF_cog].position
     * - scene:helium_balloon_model:helium_balloon_model.position
     *
     * @static
     * @param {string} trackName - The track name to parse.
     * @return {Object} The parsed track name as an object.
     */
    static parseTrackName(trackName: string): Object;
    /**
     * Searches for a node in the hierarchy of the given root object by the given
     * node name.
     *
     * @static
     * @param {Object} root - The root object.
     * @param {string|number} nodeName - The name of the node.
     * @return {?Object} The found node. Returns `null` if no object was found.
     */
    static findNode(root: Object, nodeName: string | number): Object | null;
    /**
     * Constructs a new property binding.
     *
     * @param {Object} rootNode - The root node.
     * @param {string} path - The path.
     * @param {?Object} [parsedPath] - The parsed path.
     */
    constructor(rootNode: Object, path: string, parsedPath?: Object | null);
    /**
     * The object path to the animated property.
     *
     * @type {string}
     */
    path: string;
    /**
     * An object holding information about the path.
     *
     * @type {Object}
     */
    parsedPath: Object;
    /**
     * The object owns the animated property.
     *
     * @type {?Object}
     */
    node: Object | null;
    /**
     * The root node.
     *
     * @type {Object3D|Skeleton}
     */
    rootNode: Object3D | Skeleton;
    getValue: (targetArray: any, offset: any) => void;
    setValue: (sourceArray: any, offset: any) => void;
    _getValue_unavailable(): void;
    _setValue_unavailable(): void;
    _getValue_direct(buffer: any, offset: any): void;
    _getValue_array(buffer: any, offset: any): void;
    _getValue_arrayElement(buffer: any, offset: any): void;
    _getValue_toArray(buffer: any, offset: any): void;
    _setValue_direct(buffer: any, offset: any): void;
    _setValue_direct_setNeedsUpdate(buffer: any, offset: any): void;
    _setValue_direct_setMatrixWorldNeedsUpdate(buffer: any, offset: any): void;
    _setValue_array(buffer: any, offset: any): void;
    _setValue_array_setNeedsUpdate(buffer: any, offset: any): void;
    _setValue_array_setMatrixWorldNeedsUpdate(buffer: any, offset: any): void;
    _setValue_arrayElement(buffer: any, offset: any): void;
    _setValue_arrayElement_setNeedsUpdate(buffer: any, offset: any): void;
    _setValue_arrayElement_setMatrixWorldNeedsUpdate(buffer: any, offset: any): void;
    _setValue_fromArray(buffer: any, offset: any): void;
    _setValue_fromArray_setNeedsUpdate(buffer: any, offset: any): void;
    _setValue_fromArray_setMatrixWorldNeedsUpdate(buffer: any, offset: any): void;
    _getValue_unbound(targetArray: any, offset: any): void;
    _setValue_unbound(sourceArray: any, offset: any): void;
    /**
     * Creates a getter / setter pair for the property tracked by this binding.
     */
    bind(): void;
    targetObject: Object | null | undefined;
    resolvedProperty: any;
    propertyIndex: any;
    propertyName: any;
    /**
     * Unbinds the property.
     */
    unbind(): void;
    BindingType: {
        Direct: number;
        EntireArray: number;
        ArrayElement: number;
        HasFromToArray: number;
    };
    Versioning: {
        None: number;
        NeedsUpdate: number;
        MatrixWorldNeedsUpdate: number;
    };
    GetterByBindingType: ((buffer: any, offset: any) => void)[];
    SetterByBindingTypeAndVersioning: ((buffer: any, offset: any) => void)[][];
}
export namespace PropertyBinding {
    export { Composite };
}
declare class Composite {
    constructor(targetGroup: any, path: any, optionalParsedPath: any);
    _targetGroup: any;
    _bindings: any;
    getValue(array: any, offset: any): void;
    setValue(array: any, offset: any): void;
    bind(): void;
    unbind(): void;
}
export {};
