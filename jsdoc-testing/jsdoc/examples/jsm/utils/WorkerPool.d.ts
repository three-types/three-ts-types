/**
 * A simple pool for managing Web Workers.
 *
 * @three_import import { WorkerPool } from 'three/addons/utils/WorkerPool.js';
 */
export class WorkerPool {
    /**
     * Constructs a new Worker pool.
     *
     * @param {number} [pool=4] - The size of the pool.
     */
    constructor(pool?: number);
    /**
     * The size of the pool.
     *
     * @type {number}
     * @default 4
     */
    pool: number;
    /**
     * A message queue.
     *
     * @type {Array<Object>}
     */
    queue: Array<Object>;
    /**
     * An array of Workers.
     *
     * @type {Array<Worker>}
     */
    workers: Array<Worker>;
    /**
     * An array with resolve functions for messages.
     *
     * @type {Array<Function>}
     */
    workersResolve: Array<Function>;
    /**
     * The current worker status.
     *
     * @type {number}
     */
    workerStatus: number;
    /**
     * A factory function for creating workers.
     *
     * @type {?Function}
     */
    workerCreator: Function | null;
    _initWorker(workerId: any): void;
    _getIdleWorker(): number;
    _onMessage(workerId: any, msg: any): void;
    /**
     * Sets a function that is responsible for creating Workers.
     *
     * @param {Function} workerCreator - The worker creator function.
     */
    setWorkerCreator(workerCreator: Function): void;
    /**
     * Sets the Worker limit
     *
     * @param {number} pool - The size of the pool.
     */
    setWorkerLimit(pool: number): void;
    /**
     * Post a message to an idle Worker. If no Worker is available,
     * the message is pushed into a message queue for later processing.
     *
     * @param {Object} msg - The message.
     * @param {Array<ArrayBuffer>} transfer - An array with array buffers for data transfer.
     * @return {Promise} A Promise that resolves when the message has been processed.
     */
    postMessage(msg: Object, transfer: Array<ArrayBuffer>): Promise<any>;
    /**
     * Terminates all Workers of this pool. Call this  method whenever this
     * Worker pool is no longer used in your app.
     */
    dispose(): void;
}
