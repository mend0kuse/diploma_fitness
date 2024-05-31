export declare function excludeFields<M, T extends Array<keyof M>>(obj: M, keys: T): Omit<M, T[number]>;
