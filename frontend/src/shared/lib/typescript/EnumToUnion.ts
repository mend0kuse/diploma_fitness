export type EnumToUnion<T extends Record<string | number | symbol, unknown>> = {
    [K in keyof T]: T[K];
}[keyof T];
