import { ReactNode } from 'react';
import { Mutate } from 'zustand';
import { StateCreator, StoreMutatorIdentifier } from 'zustand/vanilla';
import { StoreApi } from 'zustand';
type ExtractState<S> = S extends {
    getState: () => infer T;
} ? T : never;
type TCreateProvider = {
    <T>(): <Mos extends [StoreMutatorIdentifier, unknown][] = []>(initializer: StateCreator<T, [], Mos>, defaultEqualityFn?: <U>(a: U, b: U) => boolean) => ({
        getUseStore: () => <F>(selector: (state: ExtractState<Mutate<StoreApi<T>, Mos>>) => F, equalityFn?: (a: F, b: F) => boolean) => F;
        Provider: ({ children, initialState }: {
            children: ReactNode;
            initialState: ((prevStore: ReturnType<StateCreator<T, [], Mos>>) => Partial<T>) | Partial<T>;
        }) => JSX.Element;
    });
};
export declare const createProvider: TCreateProvider;
export {};
