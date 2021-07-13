import { BufferGeometry, Material, Group, Loader, Mesh, Scene, LoadingManager, Object3D } from '../../../src/Three';

export interface Display {
    r: number;
    g: number;
    b: number;
    a: number;
    h: 0 | 1;
}

// tslint:disable-next-line:interface-name
export interface IFC extends Object3D {
    [key: string]: any;
}

export class IFCLoader extends Loader {

    ifcManager: IFCManager;

    constructor(manager?: LoadingManager);

    load(
        url: string,
        onLoad: (ifc: IFCModel) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void,
    ): void;

    parse(buffer: ArrayBuffer): Promise<IFCModel>;
}

/**
 * Represents an IFC model. This object is returned by the `IFCLoader` after loading an IFC.
 * @mesh the `THREE.Mesh` that contains the geometry of the IFC.
 * @modelID the ID of the IFC model.
 */
 export declare class IFCModel extends Group {
    mesh: Mesh;
    private ifc;
    modelID: number;
    constructor(mesh: Mesh, ifc: IFCManager);
    /**
     * Sets the relative path of web-ifc.wasm file in the project.
     * Beware: you **must** serve this file in your page; this means
     * that you have to copy this files from *node_modules/web-ifc*
     * to your deployment directory.
     *
     * If you don't use this methods,
     * IFC.js assumes that you are serving it in the root directory.
     *
     * Example if web-ifc.wasm is in dist/wasmDir:
     * ```js
     * ifcLoader.setWasmPath("dist/wasmDir/");
     * ```
     *
     * @path The relative path to web-ifc.wasm.
     */
    setWasmPath(path: string): void;
    /**
     * Closes the specified model and deletes it from the scene
     * @scene The scene where the model is (if it's located in a scene).
     */
    close(scene?: Scene): void;
    /**
     * Gets the **Express ID** to which the given face belongs.
     * This ID uniquely identifies this entity within this IFC file.
     * @geometry The geometry of the IFC model.
     * @faceIndex The index of the face of a geometry.You can easily get this index using the [Raycaster](https://threejs.org/docs/#api/en/core/Raycaster).
     */
    getExpressId(geometry: BufferGeometry, faceIndex: number): number | undefined;
    /**
     * Returns all items of the specified type. You can import
     * the types from *web-ifc*.
     *
     * Example to get all the standard walls of a project:
     * ```js
     * import { IFCWALLSTANDARDCASE } from 'web-ifc';
     * const walls = ifcLoader.getAllItemsOfType(IFCWALLSTANDARDCASE);
     * ```
     * @type The type of IFC items to get.
     * @verbose If false (default), this only gets IDs. If true, this also gets the native properties of all the fetched items.
     */
    getAllItemsOfType(type: number, verbose: boolean): any[];
    /**
     * Gets the native properties of the given element.
     * @id The express ID of the element.
     * @recursive Wether you want to get the information of the referenced elements recursively.
     */
    getItemProperties(id: number, recursive?: boolean): any;
    /**
     * Gets the [property sets](https://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/HTML/schema/ifckernel/lexical/ifcpropertyset.htm)
     * assigned to the given element.
     * @id The express ID of the element.
     * @recursive If true, this gets the native properties of the referenced elements recursively.
     */
    getPropertySets(id: number, recursive?: boolean): any[];
    /**
     * Gets the properties of the type assigned to the element.
     * For example, if applied to a wall (IfcWall), this would get back the information
     * contained in the IfcWallType assigned to it, if any.
     * @id The express ID of the element.
     * @recursive If true, this gets the native properties of the referenced elements recursively.
     */
    getTypeProperties(id: number, recursive?: boolean): any[];
    /**
     * Gets the ifc type of the specified item.
     * @id The express ID of the element.
     */
    getIfcType(id: number): string;
    /**
     * Gets the spatial structure of the project. The
     * [spatial structure](https://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/HTML/schema/ifcproductextension/lexical/ifcspatialstructureelement.htm)
     * is the hierarchical structure that organizes every IFC project (all physical items
     * are referenced to an element of the spatial structure). It is formed by
     * one IfcProject that contains one or more IfcSites, that contain one or more
     * IfcBuildings, that contain one or more IfcBuildingStoreys, that contain
     * one or more IfcSpaces.
     */
    getSpatialStructure(): {
        expressID: number;
        type: string;
        children: never[];
    };
    /**
     * Gets the mesh of the specified subset.
     * @material The material assigned to the subset, if any.
     */
    getSubset(material?: Material): Mesh<BufferGeometry, Material | Material[]> | null;
    /**
     * Removes the specified subset.
     * @scene The scene where the subset is.
     * @material The material assigned to the subset, if any.
     */
    removeSubset(scene?: Scene, material?: Material): void;
    /**
     * Creates a new geometric subset.
     * @config A configuration object with the following options:
     * - **scene**: the scene where the model is located.
     * - **modelID**: the ID of the model.
     * - **ids**: the IDs of the items of the model that will conform the subset.
     * - **removePrevious**: wether to remove the previous subset of this model with this material.
     * - **material**: (optional) wether to apply a material to the subset
     */
    createSubset(config: HighlightConfig): void | Mesh<BufferGeometry, Material | Material[]>;
}

export declare class IFCManager {
    private state;
    private parser;
    private subsets;
    private properties;
    private types;
    parse(buffer: ArrayBuffer): Promise<IFCModel>;
    setWasmPath(path: string): void;
    setupThreeMeshBVH(computeBoundsTree: any, disposeBoundsTree: any, acceleratedRaycast: any): void;
    close(modelID: number, scene?: Scene): void;
    getExpressId(geometry: BufferGeometry, faceIndex: number): number | undefined;
    getAllItemsOfType(modelID: number, type: number, verbose: boolean): any[];
    getItemProperties(modelID: number, id: number, recursive?: boolean): any;
    getPropertySets(modelID: number, id: number, recursive?: boolean): any[];
    getTypeProperties(modelID: number, id: number, recursive?: boolean): any[];
    getIfcType(modelID: number, id: number): string;
    getSpatialStructure(modelID: number): {
        expressID: number;
        type: string;
        children: never[];
    };
    getSubset(modelID: number, material?: Material): import("three").Mesh<BufferGeometry, Material | Material[]> | null;
    removeSubset(modelID: number, scene?: Scene, material?: Material): void;
    createSubset(config: HighlightConfigOfModel): void | import("three").Mesh<BufferGeometry, Material | Material[]>;
}

export interface HighlightConfigOfModel extends HighlightConfig {
    modelID: number;
}

export interface HighlightConfig {
    scene: Scene;
    ids: number[];
    removePrevious: boolean;
    material?: Material;
}
