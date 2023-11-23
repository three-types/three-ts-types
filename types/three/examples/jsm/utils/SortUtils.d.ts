export interface RadixSortOptions<T> {
    aux?: T[];
    get?: (el: T) => number;
    reversed?: boolean;
}

export const radixSort: <T = number>(arr: T[], opt?: RadixSortOptions<T>) => void;
