/**
 * USDComposer handles scene composition from parsed USD data.
 * This includes reference resolution, variant selection, transform handling,
 * and building the Three.js scene graph.
 *
 * Works with specsByPath format from USDCParser.
 */
export class USDComposer {
    constructor(manager?: null);
    textureCache: {};
    skinnedMeshes: any[];
    manager: any;
    texturePromises: any[];
    /**
     * Compose a Three.js scene from parsed USD data.
     * @param {Object} parsedData - Data from USDCParser or USDAParser
     * @param {Object} assets - Dictionary of referenced assets (specsByPath or blob URLs)
     * @param {Object} variantSelections - External variant selections
     * @param {string} basePath - Base path for resolving relative references
     * @returns {Group} Three.js scene graph
     */
    compose(parsedData: Object, assets?: Object, variantSelections?: Object, basePath?: string): Group;
    specsByPath: any;
    assets: Object | undefined;
    externalVariantSelections: Object | undefined;
    basePath: string | undefined;
    skeletons: {} | undefined;
    fps: any;
    /**
     * Apply USD transforms to a Three.js object.
     * Handles xformOpOrder with proper matrix composition.
     * USD uses row-vector convention, Three.js uses column-vector.
     */
    applyTransform(obj: any, fields: any, attrs?: {}): void;
    /**
     * Build indexes for efficient lookups.
     * Called once during compose() to avoid O(n) scans per lookup.
     */
    _buildIndexes(): void;
    childrenByPath: Map<any, any> | undefined;
    attributesByPrimPath: Map<any, any> | undefined;
    materialsByRoot: Map<any, any> | undefined;
    shadersByMaterialPath: Map<any, any> | undefined;
    geomSubsetsByMeshPath: Map<any, any> | undefined;
    /**
     * Check if a path is a direct child of parentPath.
     */
    _isDirectChild(parentPath: any, path: any, prefix: any): boolean;
    /**
     * Build the scene hierarchy recursively.
     * Uses childrenByPath index for O(1) child lookup instead of O(n) iteration.
     */
    _buildHierarchy(parent: any, parentPath: any): void;
    /**
     * Get variant paths for a parent path based on variant selections.
     */
    _getVariantPaths(parentPath: any): any[];
    /**
     * Resolve a file path relative to basePath.
     */
    _resolveFilePath(refPath: any): any;
    /**
     * Resolve a USD reference and return the composed content.
     * @param {string} refValue - Reference value like "@./path/to/file.usdc@"
     * @param {Object} localVariants - Variant selections to apply
     * @returns {Group|null} Composed content or null
     */
    _resolveReference(refValue: string, localVariants?: Object): Group | null;
    /**
     * Find a single mesh in the group's shallow hierarchy.
     * Only returns a mesh if it's at depth 0 or 1, not deeply nested.
     * This preserves transforms in complex hierarchies like Kitchen Set
     * while supporting USDZExporter round-trip (Xform > Xform > Mesh pattern).
     */
    _findSingleMesh(group: any): any;
    /**
     * Check if an object has a non-identity local transform.
     */
    _hasNonIdentityTransform(obj: any): boolean;
    /**
     * Get the base path (directory) from a file path.
     */
    _getBasePath(filePath: any): any;
    /**
     * Extract variant selections from a spec's fields.
     */
    _getLocalVariantSelections(fields: any): {};
    /**
     * Get all reference values from a prim spec.
     * @returns {string[]} Array of reference strings like "@path@" or "@path@<prim>"
     */
    _getReferences(spec: any): string[];
    /**
     * Get attributes for a path from attribute specs.
     */
    _getAttributes(path: any): {};
    _collectAttributesFromPath(path: any, attrs: any): void;
    /**
     * Build a mesh from a USD geometric primitive (Cube, Sphere, Cylinder, Cone, Capsule).
     */
    _buildGeomPrimitive(path: any, spec: any, typeName: any): Mesh;
    /**
     * Build a mesh from a Mesh spec.
     */
    _buildMesh(path: any, spec: any): Mesh | SkinnedMesh;
    /**
     * Build a camera from a Camera spec.
     */
    _buildCamera(path: any): PerspectiveCamera | OrthographicCamera;
    /**
     * Build a light from a UsdLux light spec.
     */
    _buildLight(path: any, typeName: any): SpotLight | PointLight | DirectionalLight | RectAreaLight | undefined;
    /**
     * Convert a color temperature in Kelvin to an RGB Color.
     * Based on Tanner Helland's algorithm.
     */
    _colorTemperature(kelvin: any): Color;
    _parseNumber(value: any, fallback: any): any;
    _getGeomSubsets(meshPath: any): any[];
    /**
     * Get material binding target path, checking variant paths if needed.
     */
    _getMaterialBindingTarget(primPath: any): any;
    _buildGeometry(path: any, fields: any, hasSkinning?: boolean): BufferGeometry;
    _buildGeometryWithSubsets(fields: any, geomSubsets: any, hasSkinning?: boolean): BufferGeometry;
    _selectTopWeights(srcIndices: any, srcWeights: any, elementSize: any, numVertices: any, dstIndices: any, dstWeights: any): void;
    _findUVPrimvar(fields: any): {
        uvs: any;
        uvIndices: any;
    };
    _findUV2Primvar(fields: any): {
        uvs2: any;
        uv2Indices: any;
    };
    _buildHoleMap(polygonHoles: any): {
        parentToHoles: Map<any, any>;
        holeFaces: Set<any>;
    };
    _triangulateIndicesWithPattern(indices: any, counts: any, points?: null, holeMap?: null): {
        indices: any[];
        pattern: any[];
    };
    _applyTriangulationPattern(indices: any, pattern: any): any[];
    _triangulateNGon(faceIndices: any, points: any): any[][];
    _triangulateNGonWithHoles(outerIndices: any, holeContours: any, points: any): any[][];
    _triangulateIndices(indices: any, counts: any): any[];
    _expandAttribute(data: any, indices: any, itemSize: any): any[];
    /**
     * Compute per-vertex normals from indexed triangle data.
     * Accumulates area-weighted face normals at each shared vertex and normalizes.
     */
    _computeVertexNormals(points: any, indices: any): Float32Array<ArrayBuffer>;
    /**
     * Get the material path for a mesh, checking various binding sources.
     */
    _getMaterialPath(meshPath: any, fields: any): any;
    _buildMaterial(meshPath: any, fields: any): MeshPhysicalMaterial;
    _buildMaterialForPath(materialPath: any): MeshPhysicalMaterial;
    /**
     * Apply material binding from a prim path to a mesh.
     * Used when merging referenced geometry into a prim that has material binding.
     */
    _applyMaterialBinding(mesh: any, primPath: any): void;
    _pickBestMaterial(materialPaths: any): any;
    _applyMaterial(material: any, materialPath: any): void;
    /**
     * Shared helper for applying texture or value from shader attribute.
     * Reduces duplication between _applyPreviewSurface and _applyOpenPBRSurface.
     */
    _applyTextureOrValue(material: any, shaderPath: any, fields: any, attrName: any, textureProperty: any, colorSpace: any, valueCallback: any, textureGetter: any): boolean;
    _applyPreviewSurface(material: any, shaderPath: any): void;
    _applyOpenPBRSurface(material: any, shaderPath: any): void;
    _getTextureFromOpenPBRConnection(connPath: any): any;
    _loadTextureFromPath(filePath: any): any;
    _getTextureFromConnection(connPath: any): any;
    _applyTextureTransforms(texture: any, attrs: any): void;
    _loadTexture(filePath: any, textureAttrs: any, transformAttrs: any): Texture | null;
    _createTextureFromData(data: any, textureAttrs: any, transformAttrs: any): Texture | null;
    _getWrapMode(wrapValue: any): number;
    _buildSkeleton(path: any): {
        skeleton: Skeleton;
        joints: any;
        rootBones: Bone[];
        animationPath: any;
        path: any;
    } | null;
    _bindSkeletons(): void;
    _buildAnimations(): AnimationClip[];
    _buildTransformAnimations(): (QuaternionKeyframeTrack | VectorKeyframeTrack)[];
    _buildAnimationClip(path: any): AnimationClip | null;
    _getTimeSampledAttribute(primPath: any, attrName: any): any;
    _flattenMatrixArray(matrices: any, numMatrices: any): any;
}
export namespace SpecType {
    let Unknown: number;
    let Attribute: number;
    let Connection: number;
    let Expression: number;
    let Mapper: number;
    let MapperArg: number;
    let Prim: number;
    let PseudoRoot: number;
    let Relationship: number;
    let RelationshipTarget: number;
    let Variant: number;
    let VariantSet: number;
}
import { Group } from 'three';
import { Mesh } from 'three';
import { SkinnedMesh } from 'three';
import { PerspectiveCamera } from 'three';
import { OrthographicCamera } from 'three';
import { SpotLight } from 'three';
import { PointLight } from 'three';
import { DirectionalLight } from 'three';
import { RectAreaLight } from 'three';
import { Color } from 'three';
import { BufferGeometry } from 'three';
import { MeshPhysicalMaterial } from 'three';
import { Texture } from 'three';
import { Skeleton } from 'three';
import { Bone } from 'three';
import { AnimationClip } from 'three';
import { QuaternionKeyframeTrack } from 'three';
import { VectorKeyframeTrack } from 'three';
