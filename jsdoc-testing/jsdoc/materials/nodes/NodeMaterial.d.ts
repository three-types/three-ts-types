export default NodeMaterial;
/**
 * Base class for all node materials.
 *
 * @augments Material
 */
declare class NodeMaterial extends Material {
    static get type(): string;
    set type(_value: string);
    /**
     * Represents the type of the node material.
     *
     * @type {string}
     */
    get type(): string;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isNodeMaterial: boolean;
    /**
     * Whether this material is affected by fog or not.
     *
     * @type {boolean}
     * @default true
     */
    fog: boolean;
    /**
     * Whether this material is affected by lights or not.
     *
     * @type {boolean}
     * @default false
     */
    lights: boolean;
    /**
     * Whether this material uses hardware clipping or not.
     * This property is managed by the engine and should not be
     * modified by apps.
     *
     * @type {boolean}
     * @default false
     */
    hardwareClipping: boolean;
    /**
     * Node materials which set their `lights` property to `true`
     * are affected by all lights of the scene. Sometimes selective
     * lighting is wanted which means only _some_ lights in the scene
     * affect a material. This can be achieved by creating an instance
     * of {@link LightsNode} with a list of selective
     * lights and assign the node to this property.
     *
     * ```js
     * const customLightsNode = lights( [ light1, light2 ] );
     * material.lightsNode = customLightsNode;
     * ```
     *
     * @type {?LightsNode}
     * @default null
     */
    lightsNode: LightsNode | null;
    /**
     * The environment of node materials can be defined by an environment
     * map assigned to the `envMap` property or by `Scene.environment`
     * if the node material is a PBR material. This node property allows to overwrite
     * the default behavior and define the environment with a custom node.
     *
     * ```js
     * material.envNode = pmremTexture( renderTarget.texture );
     * ```
     *
     * @type {?Node<vec3>}
     * @default null
     */
    envNode: Node<any> | null;
    /**
     * The lighting of node materials might be influenced by ambient occlusion.
     * The default AO is inferred from an ambient occlusion map assigned to `aoMap`
     * and the respective `aoMapIntensity`. This node property allows to overwrite
     * the default and define the ambient occlusion with a custom node instead.
     *
     * If you don't want to overwrite the diffuse color but modify the existing
     * values instead, use {@link materialAO}.
     *
     * @type {?Node<float>}
     * @default null
     */
    aoNode: Node<any> | null;
    /**
     * The diffuse color of node materials is by default inferred from the
     * `color` and `map` properties. This node property allows to overwrite the default
     * and define the diffuse color with a node instead.
     *
     * ```js
     * material.colorNode = color( 0xff0000 ); // define red color
     * ```
     *
     * If you don't want to overwrite the diffuse color but modify the existing
     * values instead, use {@link materialColor}.
     *
     * ```js
     * material.colorNode = materialColor.mul( color( 0xff0000 ) ); // give diffuse colors a red tint
     * ```
     *
     * @type {?Node<vec3>}
     * @default null
     */
    colorNode: Node<any> | null;
    /**
     * The normals of node materials are by default inferred from the `normalMap`/`normalScale`
     * or `bumpMap`/`bumpScale` properties. This node property allows to overwrite the default
     * and define the normals with a node instead.
     *
     * If you don't want to overwrite the normals but modify the existing values instead,
     * use {@link materialNormal}.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    normalNode: Node<any> | null;
    /**
     * The opacity of node materials is by default inferred from the `opacity`
     * and `alphaMap` properties. This node property allows to overwrite the default
     * and define the opacity with a node instead.
     *
     * If you don't want to overwrite the opacity but modify the existing
     * value instead, use {@link materialOpacity}.
     *
     * @type {?Node<float>}
     * @default null
     */
    opacityNode: Node<any> | null;
    /**
     * This node can be used to implement a variety of filter-like effects. The idea is
     * to store the current rendering into a texture e.g. via `viewportSharedTexture()`, use it
     * to create an arbitrary effect and then assign the node composition to this property.
     * Everything behind the object using this material will now be affected by a filter.
     *
     * ```js
     * const material = new NodeMaterial()
     * material.transparent = true;
     *
     * // everything behind the object will be monochromatic
     * material.backdropNode = saturation( viewportSharedTexture().rgb, 0 );
     * ```
     *
     * Backdrop computations are part of the lighting so only lit materials can use this property.
     *
     * @type {?Node<vec3>}
     * @default null
     */
    backdropNode: Node<any> | null;
    /**
     * This node allows to modulate the influence of `backdropNode` to the outgoing light.
     *
     * @type {?Node<float>}
     * @default null
     */
    backdropAlphaNode: Node<any> | null;
    /**
     * The alpha test of node materials is by default inferred from the `alphaTest`
     * property. This node property allows to overwrite the default and define the
     * alpha test with a node instead.
     *
     * If you don't want to overwrite the alpha test but modify the existing
     * value instead, use {@link materialAlphaTest}.
     *
     * @type {?Node<float>}
     * @default null
     */
    alphaTestNode: Node<any> | null;
    /**
     * Discards the fragment if the mask value is `false`.
     *
     * @type {?Node<bool>}
     * @default null
     */
    maskNode: Node<any> | null;
    /**
     * This node can be used to implement a shadow mask for the material.
     *
     * @type {?Node<bool>}
     * @default null
     */
    maskShadowNode: Node<any> | null;
    /**
     * The local vertex positions are computed based on multiple factors like the
     * attribute data, morphing or skinning. This node property allows to overwrite
     * the default and define local vertex positions with nodes instead.
     *
     * If you don't want to overwrite the vertex positions but modify the existing
     * values instead, use {@link positionLocal}.
     *
     *```js
     * material.positionNode = positionLocal.add( displace );
     * ```
     *
     * @type {?Node<vec3>}
     * @default null
     */
    positionNode: Node<any> | null;
    /**
     * This node property is intended for logic which modifies geometry data once or per animation step.
     * Apps usually place such logic randomly in initialization routines or in the animation loop.
     * `geometryNode` is intended as a dedicated API so there is an intended spot where geometry modifications
     * can be implemented.
     *
     * The idea is to assign a `Fn` definition that holds the geometry modification logic. A typical example
     * would be a GPU based particle system that provides a node material for usage on app level. The particle
     * simulation would be implemented as compute shaders and managed inside a `Fn` function. This function is
     * eventually assigned to `geometryNode`.
     *
     * @type {?Function}
     * @default null
     */
    geometryNode: Function | null;
    /**
     * Allows to overwrite depth values in the fragment shader.
     *
     * @type {?Node<float>}
     * @default null
     */
    depthNode: Node<any> | null;
    /**
     * Allows to overwrite the position used for shadow map rendering which
     * is by default {@link positionWorld}, the vertex position
     * in world space.
     *
     * @type {?Node<float>}
     * @default null
     */
    receivedShadowPositionNode: Node<any> | null;
    /**
     * Allows to overwrite the geometry position used for shadow map projection which
     * is by default {@link positionLocal}, the vertex position in local space.
     *
     * @type {?Node<float>}
     * @default null
     */
    castShadowPositionNode: Node<any> | null;
    /**
     * This node can be used to influence how an object using this node material
     * receive shadows.
     *
     * ```js
     * const totalShadows = float( 1 ).toVar();
     * material.receivedShadowNode = Fn( ( [ shadow ] ) => {
     * 	totalShadows.mulAssign( shadow );
     * 	//return float( 1 ); // bypass received shadows
     * 	return shadow.mix( color( 0xff0000 ), 1 ); // modify shadow color
     * } );
     *
     * @type {?(Function|FunctionNode<vec4>)}
     * @default null
     */
    receivedShadowNode: (Function | FunctionNode<any>) | null;
    /**
     * This node can be used to influence how an object using this node material
     * casts shadows. To apply a color to shadows, you can simply do:
     *
     * ```js
     * material.castShadowNode = vec4( 1, 0, 0, 1 );
     * ```
     *
     * Which can be nice to fake colored shadows of semi-transparent objects. It
     * is also common to use the property with `Fn` function so checks are performed
     * per fragment.
     *
     * ```js
     * materialCustomShadow.castShadowNode = Fn( () => {
     * 	hash( vertexIndex ).greaterThan( 0.5 ).discard();
     * 	return materialColor;
     * } )();
     *  ```
     *
     * @type {?Node<vec4>}
     * @default null
     */
    castShadowNode: Node<any> | null;
    /**
     * This node can be used to define the final output of the material.
     *
     * TODO: Explain the differences to `fragmentNode`.
     *
     * @type {?Node<vec4>}
     * @default null
     */
    outputNode: Node<any> | null;
    /**
     * MRT configuration is done on renderer or pass level. This node allows to
     * overwrite what values are written into MRT targets on material level. This
     * can be useful for implementing selective FX features that should only affect
     * specific objects.
     *
     * @type {?MRTNode}
     * @default null
     */
    mrtNode: MRTNode | null;
    /**
     * This node property can be used if you need complete freedom in implementing
     * the fragment shader. Assigning a node will replace the built-in material
     * logic used in the fragment stage.
     *
     * @type {?Node<vec4>}
     * @default null
     */
    fragmentNode: Node<any> | null;
    /**
     * This node property can be used if you need complete freedom in implementing
     * the vertex shader. Assigning a node will replace the built-in material logic
     * used in the vertex stage.
     *
     * @type {?Node<vec4>}
     * @default null
     */
    vertexNode: Node<any> | null;
    /**
     * This node can be used as a global context management component for this material.
     *
     * @type {?ContextNode}
     * @default null
     */
    contextNode: ContextNode | null;
    /**
     * Returns an array of child nodes for this material.
     *
     * @private
     * @returns {Array<{property: string, childNode: Node}>}
     */
    private _getNodeChildren;
    /**
     * Builds this material with the given node builder.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    build(builder: NodeBuilder): void;
    /**
     * Setups a node material observer with the given builder.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {NodeMaterialObserver} The node material observer.
     */
    setupObserver(builder: NodeBuilder): NodeMaterialObserver;
    /**
     * Setups the vertex and fragment stage of this node material.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setup(builder: NodeBuilder): void;
    /**
     * Setups the clipping node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {ClippingNode} The clipping node.
     */
    setupClipping(builder: NodeBuilder): ClippingNode;
    /**
     * Setups the hardware clipping if available on the current device.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setupHardwareClipping(builder: NodeBuilder): void;
    /**
     * Setups the depth of this material.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setupDepth(builder: NodeBuilder): void;
    /**
     * Setups the position node in view space. This method exists
     * so derived node materials can modify the implementation e.g. sprite materials.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node<vec3>} The position in view space.
     */
    setupPositionView(): Node<any>;
    /**
     * Setups the position in clip space.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node<vec4>} The position in view space.
     */
    setupModelViewProjection(): Node<any>;
    /**
     * Setups the logic for the vertex stage.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node<vec4>} The position in clip space.
     */
    setupVertex(builder: NodeBuilder): Node<any>;
    /**
     * Setups the computation of the position in local space.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node<vec3>} The position in local space.
     */
    setupPosition(builder: NodeBuilder): Node<any>;
    /**
     * Setups the computation of the material's diffuse color.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {BufferGeometry} geometry - The geometry.
     */
    setupDiffuseColor(builder: NodeBuilder): void;
    /**
     * Abstract interface method that can be implemented by derived materials
     * to setup material-specific node variables.
     *
     * @abstract
     * @param {NodeBuilder} builder - The current node builder.
     */
    setupVariants(): void;
    /**
     * Setups the outgoing light node variable
     *
     * @return {Node<vec3>} The outgoing light node.
     */
    setupOutgoingLight(): Node<any>;
    /**
     * Setups the normal node from the material.
     *
     * @return {Node<vec3>} The normal node.
     */
    setupNormal(): Node<any>;
    /**
     * Setups the environment node from the material.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node<vec4>} The environment node.
     */
    setupEnvironment(): Node<any>;
    /**
     * Setups the light map node from the material.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node<vec3>} The light map node.
     */
    setupLightMap(builder: NodeBuilder): Node<any>;
    /**
     * Setups the lights node based on the scene, environment and material.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {LightsNode} The lights node.
     */
    setupLights(builder: NodeBuilder): LightsNode;
    /**
     * This method should be implemented by most derived materials
     * since it defines the material's lighting model.
     *
     * @abstract
     * @param {NodeBuilder} builder - The current node builder.
     * @return {LightingModel} The lighting model.
     */
    setupLightingModel(): LightingModel;
    /**
     * Setups the outgoing light node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Node<vec3>} The outgoing light node.
     */
    setupLighting(builder: NodeBuilder): Node<any>;
    /**
     * Setup the fog.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {Node<vec4>} outputNode - The existing output node.
     * @return {Node<vec4>} The output node.
     */
    setupFog(builder: NodeBuilder, outputNode: Node<any>): Node<any>;
    /**
     * Setups premultiplied alpha.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {Node<vec4>} outputNode - The existing output node.
     * @return {Node<vec4>} The output node.
     */
    setupPremultipliedAlpha(builder: NodeBuilder, outputNode: Node<any>): Node<any>;
    /**
     * Setups the output node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {Node<vec4>} outputNode - The existing output node.
     * @return {Node<vec4>} The output node.
     */
    setupOutput(builder: NodeBuilder, outputNode: Node<any>): Node<any>;
    /**
     * Most classic material types have a node pendant e.g. for `MeshBasicMaterial`
     * there is `MeshBasicNodeMaterial`. This utility method is intended for
     * defining all material properties of the classic type in the node type.
     *
     * @param {Material} material - The material to copy properties with their values to this node material.
     */
    setDefaultValues(material: Material): void;
    /**
     * Copies the properties of the given node material to this instance.
     *
     * @param {NodeMaterial} source - The material to copy.
     * @return {NodeMaterial} A reference to this node material.
     */
    copy(source: NodeMaterial): NodeMaterial;
}
import { Material } from '../Material.js';
import NodeMaterialObserver from './manager/NodeMaterialObserver.js';
