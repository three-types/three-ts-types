export default NodeFrame;
/**
 * Management class for updating nodes. The module tracks metrics like
 * the elapsed time, delta time, the render and frame ID to correctly
 * call the node update methods {@link Node#updateBefore}, {@link Node#update}
 * and {@link Node#updateAfter} depending on the node's configuration.
 */
declare class NodeFrame {
    /**
     * The elapsed time in seconds.
     *
     * @type {number}
     * @default 0
     */
    time: number;
    /**
     * The delta time in seconds.
     *
     * @type {number}
     * @default 0
     */
    deltaTime: number;
    /**
     * The frame ID.
     *
     * @type {number}
     * @default 0
     */
    frameId: number;
    /**
     * The render ID.
     *
     * @type {number}
     * @default 0
     */
    renderId: number;
    /**
     * Used to control the {@link Node#update} call.
     *
     * @type {WeakMap<Node, Object>}
     */
    updateMap: WeakMap<Node, Object>;
    /**
     * Used to control the {@link Node#updateBefore} call.
     *
     * @type {WeakMap<Node, Object>}
     */
    updateBeforeMap: WeakMap<Node, Object>;
    /**
     * Used to control the {@link Node#updateAfter} call.
     *
     * @type {WeakMap<Node, Object>}
     */
    updateAfterMap: WeakMap<Node, Object>;
    /**
     * A reference to the current renderer.
     *
     * @type {?Renderer}
     * @default null
     */
    renderer: Renderer | null;
    /**
     * A reference to the current material.
     *
     * @type {?Material}
     * @default null
     */
    material: Material | null;
    /**
     * A reference to the current camera.
     *
     * @type {?Camera}
     * @default null
     */
    camera: Camera | null;
    /**
     * A reference to the current 3D object.
     *
     * @type {?Object3D}
     * @default null
     */
    object: Object3D | null;
    /**
     * A reference to the current scene.
     *
     * @type {?Scene}
     * @default null
     */
    scene: Scene | null;
    /**
     * Returns a dictionary for a given node and update map which
     * is used to correctly call node update methods per frame or render.
     *
     * @private
     * @param {WeakMap<Node, Object>} referenceMap - The reference weak map.
     * @param {Node} nodeRef - The reference to the current node.
     * @return {Object<string,WeakMap<Object, number>>} The dictionary.
     */
    private _getMaps;
    /**
     * This method executes the {@link Node#updateBefore} for the given node.
     * It makes sure {@link Node#updateBeforeType} is honored meaning the update
     * is only executed once per frame, render or object depending on the update
     * type.
     *
     * @param {Node} node - The node that should be updated.
     */
    updateBeforeNode(node: Node): void;
    /**
     * This method executes the {@link Node#updateAfter} for the given node.
     * It makes sure {@link Node#updateAfterType} is honored meaning the update
     * is only executed once per frame, render or object depending on the update
     * type.
     *
     * @param {Node} node - The node that should be updated.
     */
    updateAfterNode(node: Node): void;
    /**
     * This method executes the {@link Node#update} for the given node.
     * It makes sure {@link Node#updateType} is honored meaning the update
     * is only executed once per frame, render or object depending on the update
     * type.
     *
     * @param {Node} node - The node that should be updated.
     */
    updateNode(node: Node): void;
    /**
     * Updates the internal state of the node frame. This method is
     * called by the renderer in its internal animation loop.
     */
    update(): void;
    lastTime: number | undefined;
}
