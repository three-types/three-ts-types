export default StackTrace;
/**
 * Class representing a stack trace for debugging purposes.
 */
declare class StackTrace {
    /**
     * Creates a StackTrace instance by capturing and filtering the current stack trace.
     *
     * @param {Error|string|null} stackMessage - An optional stack trace to use instead of capturing a new one.
     */
    constructor(stackMessage?: Error | string | null);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStackTrace: boolean;
    /**
     * The stack trace.
     *
     * @type {Array<{fn: string, file: string, line: number, column: number}>}
     */
    stack: Array<{
        fn: string;
        file: string;
        line: number;
        column: number;
    }>;
    /**
     * Returns a formatted location string of the top stack frame.
     *
     * @returns {string} The formatted stack trace message.
     */
    getLocation(): string;
    /**
     * Returns the full error message including the stack trace.
     *
     * @param {string} message - The error message.
     * @returns {string} The full error message with stack trace.
     */
    getError(message: string): string;
}
