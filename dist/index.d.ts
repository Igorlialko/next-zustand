import { ReactNode } from 'react';
import { StateCreator } from 'zustand/vanilla';
export declare const createProvider: <T>(shallowFn?: (<T1>(objA: T1, objB: T1) => boolean) | undefined) => <Mos extends [never, unknown][] = []>(initializer: StateCreator<T, [], Mos>) => {
    Provider: ({ children, initialState }: {
        children: ReactNode;
        initialState: ((prevStore: T) => Partial<T>) | Partial<T>;
    }) => import("react/jsx-runtime").JSX.Element;
    useStore: <R>(selector: (state: T) => R, equalityFn?: ((a: R, b: R) => boolean) | undefined) => R;
};
