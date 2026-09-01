export namespace MaterialXLogCodes {
    namespace UNSUPPORTED_NODE {
        let label: string;
        let severity: string;
    }
    namespace IGNORED_SURFACE_INPUT {
        let label_1: string;
        export { label_1 as label };
        let severity_1: string;
        export { severity_1 as severity };
    }
    namespace MISSING_REFERENCE {
        let label_2: string;
        export { label_2 as label };
        let severity_2: string;
        export { severity_2 as severity };
    }
    namespace MISSING_MATERIAL {
        let label_3: string;
        export { label_3 as label };
        let severity_3: string;
        export { severity_3 as severity };
    }
    namespace INVALID_VALUE {
        let label_4: string;
        export { label_4 as label };
        let severity_4: string;
        export { severity_4 as severity };
    }
    namespace UNKNOWN_INPUT {
        let label_5: string;
        export { label_5 as label };
        let severity_5: string;
        export { severity_5 as severity };
    }
    namespace INVALID_OUTPUT_CONNECTION {
        let label_6: string;
        export { label_6 as label };
        let severity_6: string;
        export { severity_6 as severity };
    }
    namespace TYPE_MISMATCH {
        let label_7: string;
        export { label_7 as label };
        let severity_7: string;
        export { severity_7 as severity };
    }
}
export class MaterialXLog {
    entries: any[];
    get errors(): any[];
    get warnings(): any[];
    add(code: any, message: any, nodeName: any): void;
}
