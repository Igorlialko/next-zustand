import React, { ReactNode, createContext, useContext, useRef } from 'react'

import { createStore, useStore as useStoreZustand } from 'zustand'
import { StateCreator, StoreMutatorIdentifier } from 'zustand/vanilla'

export const createProvider =
  <T, >() =>
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

      const useStore = <R, >(selector: (state: T) => R, shallow?: (a: R, b: R) => boolean) => {
        const store = useContext(ZustandContext)

        if (!store) throw new Error('Store is missing the provider')

        return useStoreZustand(store, selector, shallow)
      }

      return { Provider: StoreProvider, useStore }
    }
