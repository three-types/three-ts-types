/**
 * A GPU-driven drawing pipeline that renders compatible meshes as meshlets. Geometries are processed once into
 * clusters (meshlets) of 64 triangles with a chain of simplified levels of detail. Every frame, compute
 * shaders select the level of detail per object and cull the objects and clusters against the frustum,
 * and the visible clusters of all objects sharing geometry and material are drawn in one indirect draw
 * through the hardware rasterizer.
 *
 * The node graph of the material is evaluated on the pulled vertices (position, normal, model matrices and
 * the attributes of the geometry), so custom nodes, lights, shadows and the environment work as usual.
 * Supported are opaque and alpha-tested meshes using front side rendering whose material nodes don't change the geometry,
 * the coverage or the output of the draw. All other objects, and all objects in render calls using a custom
 * render object function like shadow passes, are drawn by the regular pipeline. Objects are drawn by the
 * regular pipeline until their geometry is processed.
 * Objects affected by clipping planes use the regular pipeline, including their depth-only passes.
 * Material properties are read from the source material, so uniform changes do not require rebuilding the
 * batches. Meshlets are regenerated when geometry attributes or indices are replaced or marked `needsUpdate`.
 * Meshes with an array of materials are processed per geometry group, with separate meshlets and levels of
 * detail for each index range. Compatible groups use the GPU-driven pipeline while the other groups use
 * the regular pipeline. Meshlets of a group are shared by all meshes using the same geometry and range. The
 * batches of the groups of the same objects share the transforms and instance data of the objects, which are
 * uploaded once.
 *
 * The transforms of the objects are compared with the last upload, only the objects and instances which changed
 * are uploaded. Objects exceeding {@link MeshletDrawingPipeline#maxInstances} are drawn by the regular pipeline: static
 * bundle groups and the objects drawn by the GPU-driven pipeline in the last frames have precedence.
 *
 * Positions deformed by the context of the render call, like a curved world in the context of a pass, are culled
 * by the bounds of the deformed positions which the context provides with a `getBoundingSphere( sphere, cameraPosition )`
 * function: it receives the bounding sphere in world space ( `vec4` center and radius ) and returns the bounding
 * sphere of the deformed positions. Cone culling is disabled, shadow passes use the real positions.
 *
 * ```js
 * scenePass.contextNode = overrideNodes( [ [ modelViewProjection, curvedProjection ] ], context( {
 * 	getBoundingSphere: ( sphere, cameraPosition ) => curvedSphere( sphere, cameraPosition )
 * } ) );
 * ```
 *
 * MRT outputs of the render call and of the materials are evaluated like for the regular meshes. The matrices
 * of the objects in the previous frame are kept on the GPU, so the velocity of temporal effects like TRAA
 * includes the motion of the objects and the instances.
 *
 * Objects are culled on the GPU, but the CPU still traverses the scene and uploads the transforms every frame.
 * The content of a static {@link BundleGroup} is kept on the GPU instead: the group is captured once, the
 * transforms of its meshes are uploaded once and the group is not traversed again until `needsUpdate` is set.
 * Changes inside of the group, like transforms or added objects, require `needsUpdate` as with render bundles.
 *
 * ```js
 * renderer.drawingPipeline = new MeshletDrawingPipeline();
 *
 * const city = new BundleGroup();
 * city.add( ...buildings );
 * scene.add( city );
 * ```
 *
 * This class is experimental and its interface might change.
 *
 * @augments StandardDrawingPipeline
 */
export class MeshletDrawingPipeline extends StandardDrawingPipeline {
    /**
     * Constructs a new meshlet drawing pipeline.
     *
     * @param {Object} [parameters] - The configuration parameter.
     * @param {number} [parameters.lodThreshold=1] - The projected error in pixels below which a simpler level of detail is selected.
     * @param {number} [parameters.shadowLodThreshold=1] - The projected error in shadow map texels below which a simpler level of detail is selected for shadow casters.
     * @param {number} [parameters.minScreenRadius=0] - The radius in pixels below which objects are not drawn, `0` draws all objects.
     * @param {number} [parameters.coarseScreenRadius=0] - The radius in pixels below which objects are drawn with their simplest level of detail.
     * @param {boolean} [parameters.debug=false] - Whether the clusters should be shown with a flat color each instead of the material.
     * @param {boolean} [parameters.occlusionCulling=true] - Whether the clusters hidden by other clusters should be culled.
     * @param {boolean} [parameters.depthPrepass=false] - Whether the depth of the clusters should be drawn before their material.
     */
    constructor({ lodThreshold, shadowLodThreshold, minScreenRadius, coarseScreenRadius, debug, occlusionCulling, depthPrepass }?: {
        lodThreshold?: number | undefined;
        shadowLodThreshold?: number | undefined;
        minScreenRadius?: number | undefined;
        coarseScreenRadius?: number | undefined;
        debug?: boolean | undefined;
        occlusionCulling?: boolean | undefined;
        depthPrepass?: boolean | undefined;
    });
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMeshletDrawingPipeline: boolean;
    /**
     * The projected error in pixels below which a simpler level of detail is selected.
     *
     * @type {number}
     * @default 1
     */
    lodThreshold: number;
    /**
     * The projected error in shadow map texels below which a simpler level of detail is selected for the
     * shadow casters. The level of detail of shadow passes doesn't depend on the camera, so shadow maps
     * which are not updated every frame stay valid when the camera moves.
     *
     * @type {number}
     * @default 1
     */
    shadowLodThreshold: number;
    /**
     * The radius of the bounding sphere of objects on the screen in pixels, or in shadow map texels for shadow
     * casters, below which they are not drawn. Small objects contribute few pixels, culling them saves the work of
     * their clusters. `0` draws all objects.
     *
     * @type {number}
     * @default 0
     */
    minScreenRadius: number;
    /**
     * The radius of the bounding sphere of objects on the screen in pixels, or in shadow map texels for shadow
     * casters, below which they are drawn with their simplest level of detail, independent of the projected
     * error. `0` selects the level by the projected error only.
     *
     * @type {number}
     * @default 0
     */
    coarseScreenRadius: number;
    /**
     * The clusters and triangles drawn by the GPU-driven pipeline in the main view, read from the counters of the
     * culling without waiting for the GPU. The values are updated every interval of frames, the triangles include the degenerate triangles which pad the clusters.
     *
     * @type {{clusters: number, triangles: number}}
     * @readonly
     */
    readonly info: {
        clusters: number;
        triangles: number;
    };
    /**
     * Whether the clusters (meshlets) of the objects drawn by the GPU-driven pipeline should be shown
     * with a flat color each, instead of shading them with their material. Each object uses different
     * colors, and the clusters of all levels of detail are distinct.
     *
     * @type {boolean}
     * @default false
     */
    debug: boolean;
    /**
     * Whether the clusters hidden by other clusters of the GPU-driven pipeline should be culled. The clusters
     * visible in the last frame are rendered into a depth buffer first, the other clusters are tested
     * against its hierarchical depth. Shadow passes are not occlusion culled.
     *
     * @type {boolean}
     * @default true
     */
    occlusionCulling: boolean;
    /**
     * Whether the depth of the clusters drawn by the hardware rasterizer should be drawn before their material,
     * so the material is only evaluated once per pixel. Reduces the overdraw of expensive materials at the cost
     * of drawing the clusters twice.
     *
     * @type {boolean}
     * @default false
     */
    depthPrepass: boolean;
    _occlusionPipeline: StandardDrawingPipeline;
    _boundsNode: any;
    _ready: boolean;
    _gpuDrivenEnabled: boolean;
    _camera: any;
    _depth: number;
    _gpuProjectionId: number;
    _clusters: WeakMap<object, any>;
    _geometryStates: WeakMap<object, any>;
    _checkedGeometries: WeakSet<object>;
    _geometryPool: GPUDrivenGeometryPool;
    _records: Set<any>;
    _onGeometryDispose: (event: any) => void;
    _groupClusters: WeakMap<object, any>;
    _materials: WeakMap<object, any>;
    _pendingGeometry: number | null;
    _waitingGeometry: number | null;
    _renderListBatches: WeakMap<object, any>;
    _capture: {
        data: any;
        clippingContext: ClippingContext;
    } | null;
    _lodRange: any;
    _lodRanges: WeakMap<object, any>;
    _gpuDrivenSupported: boolean;
    _shadowPass: boolean;
    _sceneProjected: boolean;
    _lodView: {
        position: Vector3;
        scale: number;
        perspective: number;
        threshold: number;
        minScreenRadius: number;
        coarseScreenRadius: number;
    };
    /**
     * The maximum number of objects drawn by the GPU-driven pipeline per render list. The instances of instanced
     * meshes count as objects, once per geometry group. Limited by the maximum size of a storage buffer binding:
     * the world matrices of the objects and of the last frame use 128 bytes per object.
     *
     * @type {number}
     * @readonly
     */
    readonly get maxInstances(): number;
    /**
     * Returns the maximum size in bytes of a storage buffer binding of the device.
     *
     * @private
     * @return {number} The maximum size in bytes.
     */
    private _getMaxBindingSize;
    /**
     * Prepares the meshlets and geometry LODs before `Renderer.compileAsync()` projects
     * the scene. Shared geometries are processed once, including meshes outside the frustum.
     * Batches and their render and compute pipelines are then prepared by the renderer.
     *
     * @async
     * @param {Object3D} scene - The scene or object to precompile.
     * @param {Camera} camera - The camera.
     * @return {Promise} Resolves when the meshlets are ready.
     */
    prepareAsync(scene: Object3D, camera: Camera): Promise<any>;
    begin(camera: any, renderContext: any): void;
    beginRenderList(renderList: any): void;
    project(object: any, camera: any, groupOrder: any, renderList: any, clippingContext: any): void;
    /**
     * Projects a LOD object. Instead of selecting a level on the CPU, all levels are projected with the distance
     * range of the level: the objects of the GPU-driven pipeline are culled outside of it on the GPU, the other
     * objects are culled by the CPU. The distance is measured like {@link LOD#update}, without hysteresis.
     *
     * Two consecutive levels which are the same geometry with different materials are drawn as one object: the
     * object selects the material of the second level beyond its distance, without a second batch.
     *
     * @private
     * @param {LOD} lod - The LOD object.
     * @param {Camera} camera - The camera.
     * @param {number} groupOrder - The group order.
     * @param {RenderList} renderList - The render list.
     * @param {ClippingContext} clippingContext - The clipping context.
     */
    private _projectLOD;
    /**
     * Returns `true` if two consecutive levels of a LOD object can be drawn as one object of the GPU-driven pipeline,
     * which selects the material per object: the same geometry and transform with another supported material.
     *
     * @private
     * @param {Object3D} level - The level.
     * @param {Object3D} next - The next level.
     * @return {boolean} Whether the levels can be merged.
     */
    private _canMergeLevels;
    /**
     * Returns `true` if the camera is inside of the given distance range of a level of a LOD object.
     *
     * @private
     * @param {?Object} range - The distance range, or `null` if the object is not a level.
     * @param {Camera} camera - The camera.
     * @return {boolean} Whether the level is selected or not.
     */
    private _isLevelSelected;
    isCulled(object: any, camera: any): boolean;
    pushRenderItem(renderList: any, object: any, geometry: any, material: any, groupOrder: any, z: any, group: any, clippingContext: any): void;
    /**
     * Draws a static bundle group. When the render bundle of the group is recorded, the supported meshes are
     * captured into the GPU-driven pipeline: they get fixed slots in its buffers and their transforms are
     * uploaded once. The other objects are recorded into the render bundle as usual.
     *
     * @private
     * @param {BundleGroup} bundleGroup - The bundle group.
     * @param {Camera} camera - The camera.
     * @param {number} groupOrder - The group order.
     * @param {RenderList} renderList - The render list.
     * @param {ClippingContext} clippingContext - The clipping context.
     */
    private _projectStaticGroup;
    /**
     * Captures a render item of the static bundle group being recorded into the GPU-driven pipeline,
     * if supported.
     *
     * @private
     * @param {Object3D} object - The 3D object.
     * @param {BufferGeometry} geometry - The geometry.
     * @param {Material} material - The material.
     * @param {number} groupOrder - The group order.
     * @param {number} z - The depth of the object.
     * @param {?Object} group - The geometry group.
     * @param {ClippingContext} clippingContext - The clipping context.
     * @return {boolean} Whether the render item was captured, otherwise it is recorded into the render bundle.
     */
    private _captureRenderItem;
    /**
     * Pushes a captured render item which can not be drawn by the GPU-driven pipeline, culled by the CPU.
     *
     * @private
     * @param {RenderList} renderList - The render list.
     * @param {Camera} camera - The camera.
     * @param {Object} item - The captured render item.
     */
    private _pushCapturedItem;
    /**
     * Pushes the objects of an entry which is not drawn by the GPU-driven pipeline as render items of the
     * regular pipeline, culled by the CPU.
     *
     * @private
     * @param {RenderList} renderList - The render list.
     * @param {Object} entry - The entry.
     */
    private _pushEntryItems;
    /**
     * Returns the entry of a static bundle group collecting the objects of the given geometry, material and
     * shadow state. The entries keep their batches between captures.
     *
     * @private
     * @param {Object} data - The data of the static bundle group.
     * @param {Object} clusters - The cluster data of the geometry.
     * @param {Material} material - The material.
     * @param {boolean} receiveShadow - Whether the objects receive shadows.
     * @param {boolean} instanced - Whether the objects are instanced meshes.
     * @param {boolean} instanceColor - Whether the instanced meshes have instance colors.
     * @param {?Material} farMaterial - The material beyond the switch distance of merged levels.
     * @return {Object} The entry.
     */
    private _getStaticEntry;
    /**
     * Returns `true` if the given object can be drawn by the GPU-driven pipeline in the current render call.
     * Render lists of render bundles are recorded once, so only the objects of the top level render list
     * and the objects captured from static bundle groups are drawn by the GPU-driven pipeline, which runs
     * every frame.
     *
     * @private
     * @param {Object3D} object - The 3D object.
     * @param {BufferGeometry} geometry - The geometry.
     * @param {Material|Array<Material>} material - The material.
     * @param {?Object} group - The geometry group.
     * @return {boolean} Whether the object can be drawn by the GPU-driven pipeline or not.
     */
    private _isGPUDriven;
    /**
     * Returns `true` if objects with the given material can be drawn by the GPU-driven pipeline.
     * The result is cached per material version.
     *
     * @private
     * @param {Material} material - The material.
     * @return {boolean} Whether the material is supported or not.
     */
    private _isSupportedMaterial;
    finishRenderList(renderList: any): void;
    /**
     * Prepares the view of the given render list, for pipelines using screen-space resources.
     *
     * @param {Object} record - The record of the render list.
     * @param {number} width - The width of the view in pixels.
     * @param {number} height - The height of the view in pixels.
     * @return {?Object} The view, or `null` if the draw doesn't need one.
     */
    updateView(record: Object, width: number, height: number): Object | null;
    /**
     * Creates the view of a render list.
     *
     * @param {number} width - The width of the view in pixels.
     * @param {number} height - The height of the view in pixels.
     * @param {boolean} occlusion - Whether the clusters are occlusion culled.
     * @param {boolean} shadow - Whether the culling draws a shadow map.
     * @param {number} [clusterBudget=0] - The measured number of clusters of the visible objects.
     * @return {?Object} The view, or `null` if the draw doesn't need one.
     */
    createView(width: number, height: number, occlusion: boolean): Object | null;
    /**
     * Creates the batch drawing the objects of the given entry.
     *
     * @param {Object} entry - The objects sharing geometry, material and shadow state.
     * @param {number} capacity - The maximum number of objects.
     * @param {?Object} view - The view of the render list.
     * @param {GPUDrivenCulling} culling - The culling of the render list.
     * @return {GPUDrivenBatch} The batch.
     */
    createBatch(entry: Object, capacity: number, view: Object | null, culling: GPUDrivenCulling): GPUDrivenBatch;
    /**
     * Returns `true` if the batches of the current render call draw the depth of the clusters before their material.
     *
     * @private
     * @return {boolean} Whether the depth prepass is used or not.
     */
    private _usesDepthPrepass;
    /**
     * Runs the GPU-driven pipeline of the objects collected in this projection and adds the meshes of
     * their batches to the render list. Batches are created and rebuilt here, once the view is known,
     * and disposed if they were not used for several projections.
     *
     * @private
     * @param {RenderList} renderList - The render list.
     * @param {Object} record - The objects of the render list.
     */
    private _drawBatches;
    /**
     * Reads the counters of the culling of a render list every interval of projections, without waiting for the
     * GPU. The visible clusters of the last frame which exceeded the budget of the clusters or the queue of a batch
     * were not drawn: the budgets grow and the culling is resized in the next projection. The first read of a budget
     * calibrates its estimate.
     *
     * @private
     * @param {Object} record - The record of the render list.
     * @param {Array<Object>} entries - The entries drawn in this projection.
     * @param {boolean} occlusionMeasured - Whether the occlusion culling of this projection is measured.
     */
    private _readCounters;
    /**
     * Shrinks the buffers of a culling to the measured budgets of the given entries, right after the read of the
     * counters, so a render which isn't repeated like a static shadow map doesn't keep the larger buffers. The
     * batches are added to the resized culling like in a rebuild. If one doesn't fit, the culling is rebuilt in
     * its next projection.
     *
     * @private
     * @param {Object} record - The record of the render list.
     * @param {Array<Object>} entries - The entries drawn in the measured projection.
     */
    private _shrinkCulling;
    /**
     * Returns the capacity of the buffers of a culling for the given entries, with room for more objects and batches.
     *
     * @private
     * @param {Array<Object>} entries - The entries.
     * @param {Array<number>} capacities - The capacities of the batches of the entries.
     * @param {boolean} occlusion - Whether the clusters are occlusion culled.
     * @param {boolean} shadow - Whether the culling draws a shadow map.
     * @param {number} [clusterBudget=0] - The measured number of clusters of the visible objects.
     * @return {Object} The capacity.
     */
    private _getCullingCapacity;
    /**
     * Disposes the batches of a render list, except the given entries.
     *
     * @private
     * @param {Object} record - The record of the render list.
     * @param {Set<Object>} kept - The entries keeping their batches.
     */
    private _disposeBatches;
    /**
     * Disposes the culling of a render list and its batches.
     *
     * @private
     * @param {Object} record - The record of the render list.
     */
    private _disposeCulling;
    /**
     * Renders the depth of the clusters of the first phase into the depth of the occlusion view.
     *
     * @private
     * @param {Object} occlusion - The occlusion data of the view.
     * @param {Array<Object>} entries - The entries drawn in this projection.
     */
    private _renderOcclusionDepth;
    /**
     * Returns the record of the given render list for the current projection.
     *
     * @private
     * @param {RenderList} renderList - The render list.
     * @return {Object} The record.
     */
    private _getRecord;
    /**
     * Returns the entry collecting the objects of the given geometry, material and shadow state
     * for the current projection.
     *
     * @private
     * @param {Object} record - The record of the render list.
     * @param {Object} clusters - The cluster data of the geometry.
     * @param {Material} material - The material.
     * @param {boolean} receiveShadow - Whether the objects receive shadows.
     * @param {boolean} instanced - Whether the objects are instanced meshes.
     * @param {boolean} instanceColor - Whether the instanced meshes have instance colors.
     * @param {?Material} farMaterial - The material beyond the switch distance of merged levels.
     * @return {Object} The entry.
     */
    private _getEntry;
    /**
     * Removes the meshlets of a disposed geometry and its groups, and their vertices from the geometry pool.
     *
     * @private
     * @param {BufferGeometry} geometry - The geometry.
     */
    private _disposeGeometry;
    /**
     * Returns the key of the batch drawing objects of the given geometry: the geometries with the same layout of
     * the vertex data share the batches of a material, their vertices are read from the geometry pool.
     *
     * @param {Object} clusters - The cluster data of the geometry.
     * @return {any} The key.
     */
    _getBatchKey(clusters: Object): any;
    /**
     * Adds the geometries of the given entries to the table of the culling and to the geometry pool.
     *
     * @private
     * @param {GPUDrivenCulling} culling - The culling.
     * @param {Array<Object>} entries - The entries.
     * @return {boolean} Whether all geometries were added, `false` if the culling is full.
     */
    private _addGeometries;
    /**
     * Returns the far material of the level being projected, if it is merged with the next level.
     *
     * @private
     * @return {?Material} The far material.
     */
    private _getFarMaterial;
    /**
     * Returns the cluster data of the given geometry, or `null` if it is not available yet.
     * At most one geometry is processed per projection to avoid stalls.
     *
     * @private
     * @param {BufferGeometry} geometry - The geometry.
     * @param {?Object} [group=null] - The material group, or the whole geometry.
     * @param {boolean} [prepare=false] - Whether preprocessing may bypass the per-projection limit.
     * @return {?Object} The cluster data.
     */
    private _getClusters;
    /**
     * Returns whether meshlets of the geometry or material group have been prepared.
     *
     * @private
     * @param {BufferGeometry} geometry - The geometry.
     * @param {?Object} group - The material group.
     * @return {boolean} Whether the meshlets are cached.
     */
    private _hasClusters;
    /**
     * Invalidates meshlets when source attributes or indices change. Shared geometries are checked once
     * per projection. Instance attribute values are uploaded separately and do not change the meshlets.
     *
     * @private
     * @param {BufferGeometry} geometry - The geometry.
     */
    private _updateGeometry;
}
/**
 * All objects of one render list sharing geometry and material, drawn by one indirect draw of their visible
 * clusters through the hardware rasterizer. The objects are culled by the {@link GPUDrivenCulling} of the render
 * list, the batch owns a range of its buffers. Subclasses can replace the draw by overriding `setupDraw()`.
 *
 * @private
 */
export class GPUDrivenBatch {
    /**
     * Constructs a new batch.
     *
     * @param {Object} clusters - The cluster data of the geometry.
     * @param {Material} material - The material of the objects.
     * @param {boolean} receiveShadow - Whether the objects receive shadows.
     * @param {number} capacity - The maximum number of objects.
     * @param {Renderer} renderer - The renderer.
     * @param {GPUDrivenCulling} culling - The culling of the render list.
     * @param {Object} [parameters] - The configuration parameter.
     * @param {boolean} [parameters.debug=false] - Whether the clusters are shown instead of the material.
     * @param {number} [parameters.lodCount=clusters.lodCount] - The number of levels of detail used.
     * @param {?Object} [parameters.view=null] - The view of the render list, if the draw needs one.
     * @param {boolean} [parameters.depthPrepass=false] - Whether the depth of the clusters is drawn before the material.
     * @param {boolean} [parameters.instanced=false] - Whether the objects are instanced meshes, whose instances are drawn as objects.
     * @param {boolean} [parameters.instanceColor=false] - Whether the instanced meshes have instance colors.
     * @param {?Material} [parameters.farMaterial=null] - The material of the objects beyond their switch distance, the levels of
     * LOD objects sharing the geometry. Shadow casters ignore it.
     * @param {?GPUDrivenBatch} [parameters.source=null] - A batch of the same culling and capacity drawing the same objects, like
     * another group of the objects. The transforms, bounds and instance data of the objects are read from this batch, which
     * uploads them, instead of being stored again.
     * @param {number} [parameters.queueBudget=0] - The minimum number of work items of a queue of the batch, see getQueueCapacity().
     */
    constructor(clusters: Object, material: Material, receiveShadow: boolean, capacity: number, renderer: Renderer, culling: GPUDrivenCulling, { debug, lodCount, view, depthPrepass, instanced, instanceColor, farMaterial, source, queueBudget, maxChunks, pool }?: {
        debug?: boolean | undefined;
        lodCount?: number | undefined;
        view?: Object | null | undefined;
        depthPrepass?: boolean | undefined;
        instanced?: boolean | undefined;
        instanceColor?: boolean | undefined;
        farMaterial?: Material | null;
        source?: GPUDrivenBatch | null | undefined;
        queueBudget?: number | undefined;
    });
    source: any;
    clusters: Object;
    material: Material;
    materialVersion: any;
    farMaterial: any;
    farMaterialVersion: any;
    debug: boolean;
    shadow: boolean;
    culling: GPUDrivenCulling;
    occlusion: Object | null;
    depthPrepass: boolean;
    instanced: boolean;
    instanceColor: boolean;
    deformed: boolean;
    gpuTransform: boolean;
    capacity: number;
    lodCount: number;
    queueBudget: number;
    maxChunks: any;
    pool: any;
    count: number;
    view: Object | null;
    cone: boolean;
    attributes: any[];
    ownedGeometries: any[];
    indirectGeometries: any[];
    meshes: any[];
    prepassMeshes: Mesh[];
    computeNodes: any[];
    computeNodesBefore: any[];
    transformNode: any;
    transformFrames: number;
    unbounded: import("three/tsl").UniformNode | null;
    transformedCount: number;
    added: boolean;
    history: boolean | undefined;
    rangeNodes: {
        dataOffset: import("three/tsl").UniformNode;
        queueOffset: import("three/tsl").UniformNode;
        counterOffset: import("three/tsl").UniformNode;
        maxWorkItems: import("three/tsl").UniformNode;
    } | undefined;
    instanceDataStride: any;
    objectWorldArray: Float32Array<ArrayBuffer> | undefined;
    instanceLocalArray: Float32Array<ArrayBuffer> | undefined;
    instanceDataArray: Float32Array<ArrayBuffer> | undefined;
    instanceAttribute: StorageBufferAttribute | undefined;
    instanceLayout: {
        local: number;
        data: number;
    } | undefined;
    transformCount: import("three/tsl").UniformNode | undefined;
    transformPreviousCount: import("three/tsl").UniformNode | undefined;
    instanceNodes: any;
    historyRanges: {
        transform: never[];
        object: never[];
    } | undefined;
    objectStates: any[] | undefined;
    geometryStates: any[] | undefined;
    /**
     * Adds the batch to its resized culling, see {@link GPUDrivenCulling#resize}. The nodes and materials of the batch
     * stay valid: the range of the batch and its indirect draws are updated, and the data of the objects is written
     * again in the next update.
     *
     * @return {boolean} Whether the batch was added.
     */
    relocate(): boolean;
    uploadedVersion: any;
    /**
     * Returns the offset in bytes of the indirect draw arguments of a queue of the batch.
     *
     * @param {number} queue - The queue, 0 for the material and 1 for the far material.
     * @param {boolean} [prepass=false] - Whether the arguments of the occlusion prepass are returned.
     * @return {number} The offset in bytes.
     */
    getArgsOffset(queue: number, prepass?: boolean): number;
    /**
     * Creates the draw of the visible clusters: one draw instance per cluster of 64 triangles, drawn by the
     * hardware rasterizer through vertex pulling. Adds the meshes of the draw.
     *
     * @param {Object} shared - The nodes and resources of the batch.
     */
    setupDraw(shared: Object): void;
    clusterMesh: Mesh | undefined;
    /**
     * Creates the geometry of a mesh drawing pulled vertices with the given indirect draw arguments.
     *
     * @param {IndirectStorageBufferAttribute} drawAttribute - The indirect draw arguments.
     * @param {number} [drawOffset=0] - The offset in bytes of the arguments.
     * @return {BufferGeometry} The geometry.
     */
    createPulledGeometry(drawAttribute: IndirectStorageBufferAttribute, drawOffset?: number): BufferGeometry;
    /**
     * Returns a context which feeds pulled vertices into the regular vertex stage of node materials: the
     * attributes of the geometry are read from the cluster data and the model matrices from the objects of
     * the batch. The nodes of the material, including position nodes, run as for the regular meshes. The instances
     * of instanced meshes are transformed like the regular instancing of node materials, before the position node.
     *
     * @param {Object} source - The object, triangle and corner nodes of the current vertex.
     * @param {Object} shared - The nodes and resources of the batch.
     * @return {{context: ContextNode, positionNode: ?Node<vec3>, colorNode: ?Node<vec3>}} The context node, the position node and the instance color of the materials.
     */
    createPulledContext(source: Object, shared: Object): {
        context: ContextNode;
        positionNode: Node<any> | null;
        colorNode: Node<any> | null;
    };
    /**
     * Creates a mesh which only draws the depth of pulled triangles, for shadow passes and the occlusion view.
     * The position node of the material is applied.
     *
     * @param {IndirectStorageBufferAttribute} drawAttribute - The indirect draw arguments.
     * @param {Object} source - The object, triangle and corner nodes of the current vertex.
     * @param {Object} shared - The nodes and resources of the batch.
     * @param {number} side - The side of the triangles to draw.
     * @param {number} [drawOffset=0] - The offset in bytes of the indirect draw arguments.
     * @return {Mesh} The mesh.
     */
    createDepthMesh(drawAttribute: IndirectStorageBufferAttribute, source: Object, shared: Object, side: number, drawOffset?: number): Mesh;
    /**
     * Creates a mesh which draws triangles through the hardware rasterizer by vertex pulling. The source
     * provides the object, the triangle and the corner of the current vertex.
     *
     * @param {IndirectStorageBufferAttribute} drawAttribute - The indirect draw arguments.
     * @param {Object} source - The object, triangle and corner nodes of the current vertex.
     * @param {Object} shared - The nodes and resources of the batch.
     * @param {number} [drawOffset=0] - The offset in bytes of the indirect draw arguments.
     * @return {Mesh} The mesh.
     */
    createPulledMesh(drawAttribute: IndirectStorageBufferAttribute, source: Object, shared: Object, drawOffset?: number): Mesh;
    /**
     * Writes the transforms of the objects into the range of the batch in the buffers of the culling. The values
     * are compared with the values of the last upload, only the slots which changed are uploaded. Batches sharing
     * the objects of another batch only update their number of objects, the other batch writes the values.
     *
     * @param {Array<Object3D>} objects - The objects of the batch.
     * @param {MeshletDrawingPipeline} pipeline - The pipeline.
     * @param {boolean} [upload=true] - Whether the transforms of the objects can have changed and must be compared.
     * @param {?Array<?Object>} [levels=null] - The distance ranges of the objects which are levels of LOD objects.
     * @param {?Array<number>} [geometries=null] - The indices of the geometries of the objects in the culling.
     */
    update(objects: Array<Object3D>, pipeline: MeshletDrawingPipeline, upload?: boolean, levels?: Array<Object | null> | null, geometries?: Array<number> | null): void;
    /**
     * Writes the geometry of each slot into the records of the culling, with the batch of the slot. Only the
     * objects which changed their slots or their geometry are written.
     *
     * @param {Array<Object3D>} objects - The objects of the batch.
     * @param {Array<number>} geometries - The indices of the geometries of the objects in the culling.
     */
    writeGeometries(objects: Array<Object3D>, geometries: Array<number>): void;
    /**
     * Writes the transforms, bounds, levels and instance data of the objects which changed since the last upload
     * and adds the update ranges of the written slots, per buffer.
     *
     * @param {Array<Object3D>} objects - The objects of the batch.
     * @param {?Array<?Object>} levels - The distance ranges of the objects which are levels of LOD objects.
     * @return {{transform: Array<Array<number>>, object: Array<Array<number>>}} The ranges of the slots whose matrices were written:
     * the world matrices of the objects or the matrices of the instances, and the world matrices of instanced meshes.
     */
    write(objects: Array<Object3D>, levels: Array<Object | null> | null): {
        transform: Array<Array<number>>;
        object: Array<Array<number>>;
    };
    /**
     * Copies the current world matrices of the given slots to their previous matrices, for the velocity of temporal
     * effects. The previous matrices of instanced meshes are computed on the GPU.
     *
     * @param {number} from - The first slot.
     * @param {number} to - The slot after the last slot.
     */
    copyHistory(from: number, to: number): void;
    /**
     * Returns the compute nodes to dispatch before the culling in this frame: the world matrices and bounds of
     * the instances, computed while their matrices change and once more to update their previous matrices.
     *
     * @param {boolean} [compile=false] - Whether all nodes are returned to be compiled, without dispatching them.
     * @return {Array<ComputeNode>} The compute nodes.
     */
    getComputeNodesBefore(compile?: boolean): Array<ComputeNode>;
    /**
     * Frees the GPU-related resources of the batch.
     */
    dispose(): void;
}
/**
 * Returns an attribute function for a context which provides attributes. Contexts must return the same node for the
 * same attribute, so the node of each attribute is created once.
 *
 * @private
 * @param {function(string, NodeBuilder): ?Node} getAttribute - Creates the node of an attribute, `null` if not provided.
 * @return {function(string, NodeBuilder): ?Node} The attribute function of the context.
 */
export function cacheAttributes(getAttribute: (arg0: string, arg1: NodeBuilder) => Node | null): (arg0: string, arg1: NodeBuilder) => Node | null;
/**
 * Creates an unlit material which colors each cluster of each object differently.
 *
 * @private
 * @param {Node<uint>} cluster - The cluster index.
 * @param {Node<uint>} instance - The object index in the batch.
 * @return {MeshBasicNodeMaterial} The debug material.
 */
export function createDebugMaterial(cluster: Node<any>, instance: Node<any>): MeshBasicNodeMaterial;
/**
 * Creates the node material that draws the merged objects. The material keeps its own identity,
 * listeners and pipeline overrides, while reading live properties from the source material.
 *
 * @private
 * @param {Material} source - The material of the merged objects.
 * @param {Renderer} renderer - The renderer.
 * @return {NodeMaterial} The node material.
 */
export function createDrawMaterial(source: Material, renderer: Renderer): NodeMaterial;
/**
 * Creates the occlusion data of a view: the depth of the clusters visible in the last frame and its
 * hierarchical depth. Each level stores the maximum depth of 2x2 texels of the previous level, the first
 * level covers 2x2 pixels. The levels are stored in one storage buffer.
 *
 * @private
 * @param {number} width - The width of the view in pixels.
 * @param {number} height - The height of the view in pixels.
 * @return {Object} The occlusion data.
 */
export function createOcclusion(width: number, height: number): Object;
import { StandardDrawingPipeline } from 'three/webgpu';
/**
 * The vertices and the triangles of the geometries drawn by the GPU-driven pipeline, in one storage buffer each,
 * so the objects of several geometries sharing a material are drawn by one draw. The vertex data of a geometry
 * is interleaved ( see createMeshlets() ), the triangles store the address of the first element of each vertex.
 * The buffers grow when geometries are added, the nodes reading them stay valid.
 *
 * @private
 */
declare class GPUDrivenGeometryPool {
    vertexArray: Float32Array<ArrayBuffer>;
    indexArray: Uint32Array<ArrayBuffer>;
    vertexEnd: number;
    indexEnd: number;
    vertexAttribute: StorageBufferAttribute;
    indexAttribute: StorageBufferAttribute;
    vertexNode: import("three/tsl").StorageBufferNode;
    indexNode: import("three/tsl").StorageBufferNode;
    geometries: Map<any, any>;
    wasted: number;
    version: number;
    /**
     * Adds the vertices and the triangles of the given geometry, if not added yet.
     *
     * @param {Object} clusters - The cluster data of the geometry.
     * @return {number} The first triangle of the geometry in the pool.
     */
    add(clusters: Object): number;
    /**
     * Removes the given geometry, like a disposed geometry. Its elements are reclaimed by update().
     *
     * @param {Object} clusters - The cluster data of the geometry.
     */
    remove(clusters: Object): void;
    /**
     * Reclaims the elements of the removed geometries once they exceed half of the elements of the pool, so
     * removing many geometries moves the geometries once.
     */
    update(): void;
    /**
     * Moves the geometries of the pool into new buffers, without the elements of the removed geometries.
     */
    compact(): void;
    /**
     * Grows the buffers to hold the given numbers of vertex elements and indices.
     *
     * @param {number} vertices - The number of vec4 elements of the vertices.
     * @param {number} indices - The number of indices.
     */
    reserve(vertices: number, indices: number): void;
    /**
     * Frees the GPU-related resources of the pool.
     */
    dispose(): void;
}
import { Vector3 } from 'three/webgpu';
/**
 * The culling of all batches of one render list, in one set of compute dispatches. The objects, the clusters of
 * their geometries, the work queues and the indirect draw arguments of all batches are stored in shared buffers,
 * each batch owns a range of them. The parameters of the batches are stored in a table, so all batches share the
 * compute shaders:
 *
 * - one thread per object culls the object, selects its level of detail and allocates the clusters of the level,
 * - the clusters are dispatched indirectly, one thread per cluster culls the cluster and appends it to the work
 * queue of its batch,
 * - one thread per queue writes the indirect draw arguments of the batches.
 *
 * Occlusion culling adds the draw of the clusters visible in the last frame into the depth of the occlusion
 * view, one thread per object tests its bounding sphere and the clusters are tested in a second phase.
 *
 * @private
 */
declare class GPUDrivenCulling {
    /**
     * Constructs a new culling.
     *
     * @param {Object} capacity - The capacity of the shared buffers.
     * @param {number} capacity.batches - The maximum number of batches.
     * @param {number} capacity.objects - The maximum number of objects of all batches.
     * @param {number} capacity.queue - The maximum number of work items of all batches.
     * @param {number} capacity.clusters - The maximum number of clusters of the visible objects of all batches in a frame.
     * @param {number} capacity.visibility - The maximum number of clusters of all objects, for the occlusion culling.
     * @param {number} capacity.chunks - The maximum number of clusters of all geometries.
     * @param {Object} parameters - The configuration parameter.
     * @param {boolean} parameters.shadow - Whether the culling draws the shadow casters of a shadow pass.
     * @param {?Object} parameters.occlusion - The occlusion data of the view, if the clusters are occlusion culled.
     * @param {?Function} parameters.boundsNode - Returns the bounding sphere of the deformed positions.
     * @param {?Object} parameters.view - The view of the render list.
     */
    constructor(capacity: {
        batches: number;
        objects: number;
        queue: number;
        clusters: number;
        visibility: number;
        chunks: number;
    }, { shadow, occlusion, boundsNode, view }: {
        shadow: boolean;
        occlusion: Object | null;
        boundsNode: Function | null;
        view: Object | null;
    });
    capacity: {
        batches: number;
        objects: number;
        queue: number;
        clusters: number;
        visibility: number;
        chunks: number;
    };
    shadow: boolean;
    occlusion: Object | null;
    boundsNode: Function | null;
    view: Object | null;
    batches: any[];
    attributes: any[];
    objectEnd: number;
    dataEnd: number;
    queueEnd: number;
    visibilityEnd: number;
    chunkEnd: number;
    batchEnd: number;
    geometryEnd: number;
    geometryIndices: WeakMap<object, any>;
    history: boolean;
    historyOffset: import("three/tsl").UniformNode;
    tableOffset: import("three/tsl").UniformNode;
    geometryOffset: import("three/tsl").UniformNode;
    prepassArgsBase: import("three/tsl").UniformNode;
    occludedCounter: import("three/tsl").UniformNode;
    maxClusters: import("three/tsl").UniformNode;
    worldWrite: import("three/tsl").StorageBufferNode;
    boundsWrite: import("three/tsl").StorageBufferNode;
    instanceWorld: import("three/tsl").StorageBufferNode;
    instanceBounds: import("three/tsl").StorageBufferNode;
    instanceMvp: import("three/tsl").StorageBufferNode;
    countersRead: import("three/tsl").StorageBufferNode;
    workQueue: import("three/tsl").StorageBufferNode;
    clusterDispatchAttribute: IndirectStorageBufferAttribute;
    bufferNodes: (string | import("three/tsl").StorageBufferNode)[][];
    projScreenMatrix: import("three/tsl").UniformNode;
    frustumPlanes: import("three/tsl").UniformArrayNode;
    cameraPosition: import("three/tsl").UniformNode;
    cameraZoom: import("three/tsl").UniformNode;
    viewSize: import("three/tsl").UniformNode;
    lodPosition: import("three/tsl").UniformNode;
    lodScale: import("three/tsl").UniformNode;
    lodPerspective: import("three/tsl").UniformNode;
    lodThreshold: import("three/tsl").UniformNode;
    minScreenRadius: import("three/tsl").UniformNode;
    coarseScreenRadius: import("three/tsl").UniformNode;
    computeReset: any;
    objectEndNode: import("three/tsl").UniformNode;
    cullNodes: any[];
    computeNodes: any[];
    skipOcclusionNodes: any[];
    objectCountNodes: any[] | undefined;
    computeCull: any;
    argsNodes: any[];
    /**
     * Allocates the buffers for the given capacity and sets them to the nodes reading them.
     *
     * @param {Object} capacity - The capacity of the shared buffers, see the constructor.
     */
    allocate(capacity: Object): void;
    worldArray: Float32Array<ArrayBuffer> | undefined;
    boundsArray: Float32Array<ArrayBuffer> | undefined;
    levelArray: Float32Array<ArrayBuffer> | undefined;
    recordArray: Uint32Array<ArrayBuffer> | undefined;
    chunkArray: Float32Array<ArrayBuffer> | undefined;
    tableArray: Float32Array<ArrayBuffer> | undefined;
    geometryArray: Float32Array<ArrayBuffer> | undefined;
    tableBits: Uint32Array<ArrayBuffer> | undefined;
    geometryBits: Uint32Array<ArrayBuffer> | undefined;
    worldAttribute: StorageBufferAttribute | undefined;
    boundsAttribute: StorageBufferAttribute | undefined;
    levelAttribute: StorageBufferAttribute | undefined;
    mvpAttribute: StorageBufferAttribute | undefined;
    recordAttribute: StorageBufferAttribute | undefined;
    chunkAttribute: StorageBufferAttribute | undefined;
    countersAttribute: StorageBufferAttribute | undefined;
    queueAttribute: StorageBufferAttribute | undefined;
    clusterOwnerAttribute: StorageBufferAttribute | undefined;
    argsAttribute: StorageBufferAttribute | undefined;
    visibilityAttribute: StorageBufferAttribute | null | undefined;
    prepassArgsOffset: number | undefined;
    /**
     * Replaces the buffers with buffers of the given capacity. The batches are removed and must be added again,
     * their nodes and materials stay valid.
     *
     * @param {Object} capacity - The capacity of the shared buffers, see the constructor.
     */
    resize(capacity: Object): void;
    /**
     * Allocates the ranges of a batch in the shared buffers and writes its parameters into the table.
     * Returns `false` if the buffers are full.
     *
     * @param {GPUDrivenBatch} batch - The batch.
     * @return {boolean} Whether the batch was added.
     */
    add(batch: GPUDrivenBatch): boolean;
    /**
     * Removes a batch, its ranges are reused after a rebuild of the culling.
     *
     * @param {GPUDrivenBatch} batch - The batch.
     */
    remove(batch: GPUDrivenBatch): void;
    /**
     * Returns the index of the given geometry in the table of the geometries, or `-1` if it was not added.
     *
     * @param {Object} clusters - The cluster data of the geometry.
     * @return {number} The index.
     */
    getGeometry(clusters: Object): number;
    /**
     * Adds the clusters and the levels of detail of a geometry to the table of the geometries, see GEOMETRY_STRIDE.
     * Returns `-1` if the buffers are full.
     *
     * @param {Object} clusters - The cluster data of the geometry.
     * @param {number} triangleBase - The first triangle of the geometry in the geometry pool.
     * @return {number} The index of the geometry.
     */
    addGeometry(clusters: Object, triangleBase: number): number;
    /**
     * Sets the number of objects of a batch drawn in this projection.
     *
     * @param {GPUDrivenBatch} batch - The batch.
     * @param {number} count - The number of objects.
     */
    setObjectCount(batch: GPUDrivenBatch, count: number): void;
    /**
     * Uploads the batch table after the object counts have been updated.
     * Only the table range changes each frame; the cluster bounds remain in the same buffer.
     */
    updateTable(): void;
    /**
     * Limits the dispatches to the allocated objects and batches.
     */
    updateCounts(): void;
    /**
     * Updates the view of the culling.
     *
     * @param {Camera} camera - The camera.
     * @param {Matrix4} projScreenMatrix - The view projection matrix.
     * @param {Frustum} frustum - The camera frustum.
     * @param {number} width - The width of the view in pixels.
     * @param {number} height - The height of the view in pixels.
     * @param {Object} lodView - The view selecting the level of detail.
     */
    updateView(camera: Camera, projScreenMatrix: Matrix4, frustum: Frustum, width: number, height: number, lodView: Object): void;
    /**
     * Frees the GPU-related resources of the culling.
     */
    dispose(): void;
}
import { Mesh } from 'three/webgpu';
import { StorageBufferAttribute } from 'three/webgpu';
import { IndirectStorageBufferAttribute } from 'three/webgpu';
import { BufferGeometry } from 'three/webgpu';
import { MeshBasicNodeMaterial } from 'three/webgpu';
import { NodeMaterial } from 'three/webgpu';
import { Matrix4 } from 'three/webgpu';
export {};
