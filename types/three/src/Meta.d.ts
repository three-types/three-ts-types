export interface Meta<Type extends string, Generator extends string, Version extends number = 4.5> {
    version: Version;
    type: Type;
    generator: Generator;
}
