export class Component {
    constructor(props: any);
    _pool: any;
    copy(source: any): this;
    clone(): any;
    reset(): void;
    dispose(): void;
    getName(): any;
    checkUndefinedAttributes(src: any): void;
}
export namespace Component {
    let schema: {};
    let isComponent: boolean;
    function getName(): any;
}
export function Not(Component: any): {
    operator: string;
    Component: any;
};
export class ObjectPool {
    constructor(T: any, initialSize: any);
    freeList: any[];
    count: number;
    T: any;
    isObjectPool: boolean;
    acquire(): any;
    release(item: any): void;
    expand(count: any): void;
    totalSize(): number;
    totalFree(): number;
    totalUsed(): number;
}
export class System {
    constructor(world: any, attributes: any);
    canExecute(): boolean;
    getName(): any;
    world: any;
    enabled: boolean;
    _queries: {};
    queries: {};
    priority: any;
    executeTime: number;
    _mandatoryQueries: any[];
    initialized: boolean;
    stop(): void;
    play(): void;
    clearEvents(): void;
    toJSON(): {
        name: any;
        enabled: boolean;
        executeTime: number;
        priority: any;
        queries: {};
    };
}
export namespace System {
    let isSystem: boolean;
    function getName(): any;
}
export class SystemStateComponent extends Component {
}
export namespace SystemStateComponent {
    let isSystemStateComponent: boolean;
}
export class TagComponent extends Component {
    constructor();
}
export namespace TagComponent {
    let isTagComponent: boolean;
}
export namespace Types {
    let Number: any;
    let Boolean: any;
    let String: any;
    let Array: any;
    let Ref: any;
    let JSON: any;
}
export const Version: "0.3.1";
export class World {
    constructor(options?: {});
    options: {
        entityPoolSize: number;
        entityClass: typeof Entity;
    };
    componentsManager: ComponentManager;
    entityManager: EntityManager;
    systemManager: SystemManager;
    enabled: boolean;
    eventQueues: {};
    lastTime: number;
    registerComponent(Component: any, objectPool: any): this;
    registerSystem(System: any, attributes: any): this;
    hasRegisteredComponent(Component: any): boolean;
    unregisterSystem(System: any): this;
    getSystem(SystemClass: any): any;
    getSystems(): any[];
    execute(delta: any, time: any): void;
    stop(): void;
    play(): void;
    createEntity(name: any): any;
    stats(): {
        entities: {
            numEntities: number;
            numQueries: number;
            queries: {};
            numComponentPool: number;
            componentPool: {};
            eventDispatcher: {
                fired: number;
                handled: number;
            };
        };
        system: {
            numSystems: number;
            systems: {};
        };
    };
}
declare class Entity {
    constructor(entityManager: any);
    _entityManager: any;
    id: number;
    _ComponentTypes: any[];
    _components: {};
    _componentsToRemove: {};
    queries: any[];
    _ComponentTypesToRemove: any[];
    alive: boolean;
    numStateComponents: number;
    getComponent(Component: any, includeRemoved: any): any;
    getRemovedComponent(Component: any): any;
    getComponents(): {};
    getComponentsToRemove(): {};
    getComponentTypes(): any[];
    getMutableComponent(Component: any): any;
    addComponent(Component: any, values: any): this;
    removeComponent(Component: any, forceImmediate: any): this;
    hasComponent(Component: any, includeRemoved: any): boolean;
    hasRemovedComponent(Component: any): boolean;
    hasAllComponents(Components: any): boolean;
    hasAnyComponents(Components: any): boolean;
    removeAllComponents(forceImmediate: any): any;
    copy(src: any): this;
    clone(): Entity;
    reset(): void;
    remove(forceImmediate: any): any;
}
export function cloneArray(src: any): any;
export function cloneClonable(src: any): any;
export function cloneJSON(src: any): any;
export function cloneValue(src: any): any;
export function copyArray(src: any, dest: any): any;
export function copyCopyable(src: any, dest: any): any;
export function copyJSON(src: any): any;
export function copyValue(src: any): any;
export function createType(typeDefinition: any): any;
export function enableRemoteDevtools(remoteId: any): void;
declare class ComponentManager {
    Components: any[];
    _ComponentsMap: {};
    _componentPool: {};
    numComponents: {};
    nextComponentId: number;
    hasComponent(Component: any): boolean;
    registerComponent(Component: any, objectPool: any): void;
    componentAddedToEntity(Component: any): void;
    componentRemovedFromEntity(Component: any): void;
    getComponentsPool(Component: any): any;
}
/**
 * @private
 * @class EntityManager
 */
declare class EntityManager {
    constructor(world: any);
    world: any;
    componentsManager: any;
    _entities: any[];
    _nextEntityId: number;
    _entitiesByNames: {};
    _queryManager: QueryManager;
    eventDispatcher: EventDispatcher;
    _entityPool: EntityPool;
    entitiesWithComponentsToRemove: any[];
    entitiesToRemove: any[];
    deferredRemovalEnabled: boolean;
    getEntityByName(name: any): any;
    /**
     * Create a new entity
     */
    createEntity(name: any): any;
    /**
     * Add a component to an entity
     * @param {Entity} entity Entity where the component will be added
     * @param {Component} Component Component to be added to the entity
     * @param {Object} values Optional values to replace the default attributes
     */
    entityAddComponent(entity: Entity, Component: Component, values: Object): void;
    /**
     * Remove a component from an entity
     * @param {Entity} entity Entity which will get removed the component
     * @param {*} Component Component to remove from the entity
     * @param {Bool} immediately If you want to remove the component immediately instead of deferred (Default is false)
     */
    entityRemoveComponent(entity: Entity, Component: any, immediately: Bool): void;
    _entityRemoveComponentSync(entity: any, Component: any, index: any): void;
    /**
     * Remove all the components from an entity
     * @param {Entity} entity Entity from which the components will be removed
     */
    entityRemoveAllComponents(entity: Entity, immediately: any): void;
    /**
     * Remove the entity from this manager. It will clear also its components
     * @param {Entity} entity Entity to remove from the manager
     * @param {Bool} immediately If you want to remove the component immediately instead of deferred (Default is false)
     */
    removeEntity(entity: Entity, immediately: Bool): void;
    _releaseEntity(entity: any, index: any): void;
    /**
     * Remove all entities from this manager
     */
    removeAllEntities(): void;
    processDeferredRemoval(): void;
    /**
     * Get a query based on a list of components
     * @param {Array(Component)} Components List of components that will form the query
     */
    queryComponents(Components: any): any;
    /**
     * Return number of entities
     */
    count(): number;
    /**
     * Return some stats
     */
    stats(): {
        numEntities: number;
        numQueries: number;
        queries: {};
        numComponentPool: number;
        componentPool: {};
        eventDispatcher: {
            fired: number;
            handled: number;
        };
    };
}
declare class SystemManager {
    constructor(world: any);
    _systems: any[];
    _executeSystems: any[];
    world: any;
    lastExecutedSystem: any;
    registerSystem(SystemClass: any, attributes: any): this;
    unregisterSystem(SystemClass: any): this;
    sortSystems(): void;
    getSystem(SystemClass: any): any;
    getSystems(): any[];
    removeSystem(SystemClass: any): void;
    executeSystem(system: any, delta: any, time: any): void;
    stop(): void;
    execute(delta: any, time: any, forcePlay: any): void;
    stats(): {
        numSystems: number;
        systems: {};
    };
}
/**
 * @private
 * @class QueryManager
 */
declare class QueryManager {
    constructor(world: any);
    _world: any;
    _queries: {};
    onEntityRemoved(entity: any): void;
    /**
     * Callback when a component is added to an entity
     * @param {Entity} entity Entity that just got the new component
     * @param {Component} Component Component added to the entity
     */
    onEntityComponentAdded(entity: Entity, Component: Component): void;
    /**
     * Callback when a component is removed from an entity
     * @param {Entity} entity Entity to remove the component from
     * @param {Component} Component Component to remove from the entity
     */
    onEntityComponentRemoved(entity: Entity, Component: Component): void;
    /**
     * Get a query for the specified components
     * @param {Component} Components Components that the query should have
     */
    getQuery(Components: Component): any;
    /**
     * Return some stats from this class
     */
    stats(): {};
}
/**
 * @private
 * @class EventDispatcher
 */
declare class EventDispatcher {
    _listeners: {};
    stats: {
        fired: number;
        handled: number;
    };
    /**
     * Add an event listener
     * @param {String} eventName Name of the event to listen
     * @param {Function} listener Callback to trigger when the event is fired
     */
    addEventListener(eventName: string, listener: Function): void;
    /**
     * Check if an event listener is already added to the list of listeners
     * @param {String} eventName Name of the event to check
     * @param {Function} listener Callback for the specified event
     */
    hasEventListener(eventName: string, listener: Function): boolean;
    /**
     * Remove an event listener
     * @param {String} eventName Name of the event to remove
     * @param {Function} listener Callback for the specified event
     */
    removeEventListener(eventName: string, listener: Function): void;
    /**
     * Dispatch an event
     * @param {String} eventName Name of the event to dispatch
     * @param {Entity} entity (Optional) Entity to emit
     * @param {Component} component
     */
    dispatchEvent(eventName: string, entity: Entity, component: Component): void;
    /**
     * Reset stats counters
     */
    resetCounters(): void;
}
declare class EntityPool extends ObjectPool {
    constructor(entityManager: any, entityClass: any, initialSize: any);
    entityManager: any;
}
export { Entity as _Entity };
