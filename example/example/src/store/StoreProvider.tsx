'use client'

import { Provider, Store } from '../store'
import { ReactNode } from 'react'

const StoreProvider = ({ children, initialState }: {
  children: ReactNode,
  initialState: Partial<Store>
}) => {
  return (
    <Provider initialState={initialState}>
      {children}
    </Provider>
  )
}

export default StoreProvider
