import React, { ReactNode, createContext, useContext, useRef } from 'react'

import { createStore } from 'zustand'
import { StateCreator, StoreMutatorIdentifier } from 'zustand/vanilla'
import { useStoreWithEqualityFn } from 'zustand/traditional'

export const createProvider =
  <T, >(shallowFn?: <T1>(objA: T1, objB: T1) => boolean) =>
    <Mos extends [StoreMutatorIdentifier, unknown][] = []>(initializer: StateCreator<T, [], Mos>) => {

      type TInitialState = Partial<T>
      type TInitState = (prevStore: ReturnType<typeof initializer>) => TInitialState;
      const initializeStore = (initialState: TInitState | TInitialState) =>
        createStore<T>()((...args) => {
          const initStore = initializer(...args)
          const initState: TInitialState = typeof initialState === 'function' ? initialState(initStore) : initialState
          return {
            ...initStore,
            ...initState
          }
        })

      type StoreType = ReturnType<typeof initializeStore>;

      const ZustandContext = createContext<StoreType | null>(null)

      const StoreProvider = ({
                               children,
                               initialState
                             }: {
        children: ReactNode;
        initialState: TInitState | TInitialState;
      }) => {
        const storeRef = useRef<StoreType>()
        if (!storeRef.current) {
          storeRef.current = initializeStore(initialState)
        }
        return <ZustandContext.Provider value={storeRef.current}>{children}</ZustandContext.Provider>
      }

      const useStore = <R, >(selector: (state: T) => R, equalityFn?: (a: R, b: R) => boolean) => {
        const store = useContext(ZustandContext)

        if (!store) throw new Error('Store is missing the provider')

        return useStoreWithEqualityFn(store, selector, shallowFn || equalityFn)
      }

      return { Provider: StoreProvider, useStore }
    }
