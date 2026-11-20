export namespace Cache {
    let enabled: boolean;
    let files: {
        [x: string]: Object;
    };
    function add(key: string, file: Object): void;
    function get(key: string): Object | undefined;
    function remove(key: string): void;
    function clear(): void;
}
