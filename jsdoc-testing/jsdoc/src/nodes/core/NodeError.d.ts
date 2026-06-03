export default NodeError;
/**
 * Custom error class for node-related errors, including stack trace information.
 */
declare class NodeError extends Error {
    constructor(message: any, stackTrace?: null);
    /**
     * The stack trace associated with the error.
     *
     * @type {?StackTrace}
     */
    stackTrace: StackTrace | null;
}
