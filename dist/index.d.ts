import React, { ReactNode } from 'react';
import { StateCreator } from 'zustand/vanilla';
export declare const createProvider: <T>() => <Mos extends [never, unknown][] = []>(initializer: StateCreator<T, [], Mos, T>) => {
    Provider: ({ children, initialState }: {
        children: ReactNode;
        initialState: ((prevStore: T) => Partial<T>) | Partial<T>;
    }) => React.JSX.Element;
    useStore: <R>(selector: (state: T) => R, shallow?: ((a: R, b: R) => boolean) | undefined) => R;
};
