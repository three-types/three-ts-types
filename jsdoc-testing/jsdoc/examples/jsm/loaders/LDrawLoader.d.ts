/**
 * A loader for the LDraw format.
 *
 * [LDraw](https://ldraw.org/} (LEGO Draw) is an [open format specification](https://ldraw.org/article/218.html)
 * for describing LEGO and other construction set 3D models.
 *
 * An LDraw asset (a text file usually with extension .ldr, .dat or .txt) can describe just a single construction
 * piece, or an entire model. In the case of a model the LDraw file can reference other LDraw files, which are
 * loaded from a library path set with `setPartsLibraryPath`. You usually download the LDraw official parts library,
 * extract to a folder and point setPartsLibraryPath to it.
 *
 * Library parts will be loaded by trial and error in subfolders 'parts', 'p' and 'models'. These file accesses
 * are not optimal for web environment, so a script tool has been made to pack an LDraw file with all its dependencies
 * into a single file, which loads much faster. See section 'Packing LDraw models'. The LDrawLoader example loads
 * several packed files. The official parts library is not included due to its large size.
 *
 * `LDrawLoader` supports the following extensions:
 * - !COLOUR: Color and surface finish declarations.
 * - BFC: Back Face Culling specification.
 * - !CATEGORY: Model/part category declarations.
 * - !KEYWORDS: Model/part keywords declarations.
 *
 * ```js
 * const loader = new LDrawLoader();
 * loader.setConditionalLineMaterial( LDrawConditionalLineMaterial ); // the type of line material depends on the used renderer
 * const object = await loader.loadAsync( 'models/ldraw/officialLibrary/models/car.ldr_Packed.mpd' );
 * scene.add( object );
 * ```
 *
 * @augments Loader
 * @three_import import { LDrawLoader } from 'three/addons/loaders/LDrawLoader.js';
 */
export class LDrawLoader extends Loader {
    /**
     * Constructs a new LDraw loader.
     *
     * @param {LoadingManager} [manager] - The loading manager.
     */
    constructor(manager?: LoadingManager);
    materials: any[];
    materialLibrary: {};
    edgeMaterialCache: WeakMap<object, any>;
    conditionalEdgeMaterialCache: WeakMap<object, any>;
    partsCache: LDrawPartsGeometryCache;
    fileMap: {};
    smoothNormals: boolean;
    partsLibraryPath: string;
    ConditionalLineMaterial: any;
    missingColorMaterial: MeshStandardMaterial;
    missingEdgeColorMaterial: LineBasicMaterial;
    missingConditionalEdgeColorMaterial: any;
    /**
     * This method must be called prior to `load()` unless the model to load does not reference
     * library parts (usually it will be a model with all its parts packed in a single file).
     *
     * @param {string} path - Path to library parts files to load referenced parts from.
     * This is different from Loader.setPath, which indicates the path to load the main asset from.
     * @return {LDrawLoader} A reference to this loader.
     */
    setPartsLibraryPath(path: string): LDrawLoader;
    /**
     * Sets the conditional line material type which depends on the used renderer.
     * Use {@link LDrawConditionalLineMaterial} when using `WebGLRenderer` and
     * {@link LDrawConditionalLineNodeMaterial} when using `WebGPURenderer`.
     *
     * @param {(LDrawConditionalLineMaterial.constructor|LDrawConditionalLineNodeMaterial.constructor)} type - The conditional line material type.
     * @return {LDrawLoader} A reference to this loader.
     */
    setConditionalLineMaterial(type: (LDrawConditionalLineMaterial.constructor | LDrawConditionalLineNodeMaterial.constructor)): LDrawLoader;
    /**
     * This async method preloads materials from a single LDraw file. In the official
     * parts library there is a special file which is loaded always the first (LDConfig.ldr)
     * and contains all the standard color codes. This method is intended to be used with
     * not packed files, for example in an editor where materials are preloaded and parts
     * are loaded on demand.
     *
     * @async
     * @param {string} url - Path of the LDraw materials asset.
     * @return {Promise} A Promise that resolves when the preload has finished.
     */
    preloadMaterials(url: string): Promise<any>;
    /**
     * Starts loading from the given URL and passes the loaded LDraw asset
     * to the `onLoad()` callback.
     *
     * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
     * @param {function(Group)} onLoad - Executed when the loading process has been finished.
     * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    load(url: string, onLoad: (arg0: Group) => any, onProgress: onProgressCallback, onError: onErrorCallback): void;
    /**
     * Parses the given LDraw data and returns the resulting group.
     *
     * @param {string} text - The raw VRML data as a string.
     * @param {function(Group)} onLoad - Executed when the loading/parsing process has been finished.
     * @param {onErrorCallback} onError - Executed when errors occur.
     */
    parse(text: string, onLoad: (arg0: Group) => any, onError: onErrorCallback): void;
    /**
     * Sets the loader's material library. This method clears existing
     * material definitions.
     *
     * @param {Array<Material>} materials - The materials to set.
     * @return {LDrawLoader} A reference to this loader.
     */
    setMaterials(materials: Array<Material>): LDrawLoader;
    /**
     * Clears the loader's material library.
     *
     * @return {LDrawLoader} A reference to this loader.
     */
    clearMaterials(): LDrawLoader;
    /**
     * Adds a list of materials to the loader's material library.
     *
     * @param {Array<Material>} materials - The materials to add.
     * @return {LDrawLoader} A reference to this loader.
     */
    addMaterials(materials: Array<Material>): LDrawLoader;
    /**
     * Initializes the loader with default materials.
     *
     * @return {LDrawLoader} A reference to this loader.
     */
    addDefaultMaterials(): LDrawLoader;
    /**
     * Sets a map which maps referenced library filenames to new filenames.
     * If a fileMap is not specified (the default), library parts will be accessed by trial and
     * error in subfolders 'parts', 'p' and 'models'.
     *
     * @param {Object<string,string>} fileMap - The file map to set.
     * @return {LDrawLoader} A reference to this loader.
     */
    setFileMap(fileMap: {
        [x: string]: string;
    }): LDrawLoader;
    /**
     * Adds a single material to the loader's material library.
     *
     * @param {Material} material - The material to add.
     * @return {LDrawLoader} A reference to this loader.
     */
    addMaterial(material: Material): LDrawLoader;
    /**
     * Returns a material for the given color code.
     *
     * @param {string} colorCode - The color code.
     * @return {?Material} The material. Returns `null` if no material has been found.
     */
    getMaterial(colorCode: string): Material | null;
    applyMaterialsToMesh(group: any, parentColorCode: any, materialHierarchy: any, finalMaterialPass?: boolean): void;
    /**
     * Returns the Material for the main LDraw color.
     *
     * For an already loaded LDraw asset, returns the Material associated with the main color code.
     * This method can be useful to modify the main material of a model or part that exposes it.
     *
     * The main color code is the standard way to color an LDraw part. It is '16' for triangles and
     * '24' for edges. Usually a complete model will not expose the main color (that is, no part
     * uses the code '16' at the top level, because they are assigned other specific colors) An LDraw
     *  part file on the other hand will expose the code '16' to be colored, and can have additional
     * fixed colors.
     *
     * @return {?Material} The material. Returns `null` if no material has been found.
     */
    getMainMaterial(): Material | null;
    /**
     * Returns the material for the edges main LDraw color.
     *
     * @return {?Material} The material. Returns `null` if no material has been found.
     */
    getMainEdgeMaterial(): Material | null;
    parseColorMetaDirective(lineParser: any): MeshStandardMaterial | null;
    computeBuildingSteps(model: any): void;
}
import { Loader } from 'three';
declare class LDrawPartsGeometryCache {
    constructor(loader: any);
    loader: any;
    parseCache: LDrawParsedCache;
    _cache: {};
    processIntoMesh(info: any): Promise<any>;
    hasCachedModel(fileName: any): boolean;
    getCachedModel(fileName: any): Promise<any>;
    loadModel(fileName: any): Promise<any>;
    parseModel(text: any): Promise<any>;
}
import { MeshStandardMaterial } from 'three';
import { LineBasicMaterial } from 'three';
import { Group } from 'three';
declare class LDrawParsedCache {
    constructor(loader: any);
    loader: any;
    _cache: {};
    cloneResult(original: any): {
        faces: any;
        conditionalSegments: any;
        lineSegments: any;
        type: any;
        category: any;
        keywords: any;
        author: any;
        subobjects: any;
        fileName: any;
        totalFaces: any;
        startingBuildingStep: any;
        materials: any;
        group: any;
    };
    fetchData(fileName: any): Promise<any>;
    parse(text: any, fileName?: null): {
        faces: {
            material: any;
            colorCode: any;
            faceNormal: null;
            vertices: Vector3[];
            normals: null[];
            doubleSided: boolean;
        }[];
        conditionalSegments: {
            material: any;
            colorCode: any;
            vertices: Vector3[];
            controlPoints: Vector3[];
        }[];
        lineSegments: {
            material: any;
            colorCode: any;
            vertices: Vector3[];
        }[];
        type: string;
        category: any;
        keywords: any[] | null;
        author: any;
        subobjects: {
            material: any;
            colorCode: any;
            matrix: Matrix4;
            fileName: any;
            inverted: boolean;
            startingBuildingStep: boolean;
        }[];
        totalFaces: number;
        startingBuildingStep: boolean;
        materials: {};
        fileName: null;
        group: null;
    };
    getData(fileName: any, clone?: boolean): any;
    ensureDataLoaded(fileName: any): Promise<void>;
    setData(fileName: any, text: any): void;
}
import { Vector3 } from 'three';
import { Matrix4 } from 'three';
export {};
