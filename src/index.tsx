import React, { ReactNode, createContext, useContext, useRef } from 'react'

import { createStore, Mutate } from 'zustand'
import { StateCreator, StoreMutatorIdentifier } from 'zustand/vanilla'
import { useStoreWithEqualityFn } from 'zustand/traditional'
import { StoreApi } from 'zustand'

type ExtractState<S> = S extends { getState: () => infer T } ? T : never

type TCreateProvider = {
  <T>(): <Mos extends [StoreMutatorIdentifier, unknown][] = []>(
    initializer: StateCreator<T, [], Mos>,
    defaultEqualityFn?: <U>(a: U, b: U) => boolean
  ) => ({
    getUseStore: () => <F>(
      selector: (state: ExtractState<Mutate<StoreApi<T>, Mos>>) => F,
      equalityFn?: (a: F, b: F) => boolean
    ) => F;
    Provider: ({
                 children,
                 initialState
               }: { children: ReactNode, initialState: ((prevStore: ReturnType<StateCreator<T, [], Mos>>) => Partial<T>) | Partial<T> }) => JSX.Element;
  })
}

export const createProvider = (
  <T, >() =>
    <Mos extends [StoreMutatorIdentifier, unknown][] = []>(initializer: StateCreator<T, [], Mos>, defaultEqualityFn?: <U>(a: U, b: U) => boolean) => {

      type TInitialState = Partial<T>
      type TInitState = (prevStore: ReturnType<StateCreator<T, [], Mos>>) => TInitialState;
      const initializeStore = (initialState: TInitState | TInitialState) =>
        createStore((...args) => {
          const initStore = initializer(...args)
          const initState: TInitialState = typeof initialState === 'function' ? initialState(initStore) : initialState
          return {
            ...initStore,
            ...initState
          }
        }) as StoreApi<T>

      const ZustandContext = createContext<StoreApi<T>|null>(null)

      return {
        Provider({
                   children,
                   initialState
                 }: {
          children: ReactNode;
          initialState: TInitState | TInitialState;
        }) {
          const storeRef = useRef<StoreApi<T>|null>(null)
          if (!storeRef.current) {
            storeRef.current = initializeStore(initialState)
          }
          return <ZustandContext.Provider value={storeRef.current}>{children}</ZustandContext.Provider>
        },
        getUseStore() {
          return function(selector?: any, equalityFn = defaultEqualityFn) {
            const api = useContext(ZustandContext)
            if (!api) throw new Error('Store is missing the provider')
            return useStoreWithEqualityFn(api, selector, equalityFn)
          }
        }
      }
    }
) as TCreateProvider
