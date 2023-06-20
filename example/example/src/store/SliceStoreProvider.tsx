'use client'

import { SliceProvider, ICountSlice } from './sliceStore'
import { ReactNode } from 'react'

const SliceStoreProvider = ({ children, initialCountSlice }: {
  children: ReactNode,
  initialCountSlice: Partial<ICountSlice>
}) => {
  return (
    <SliceProvider initialState={(prevStore) => ({
      countSlice: {
        ...prevStore.countSlice,
        ...initialCountSlice
      }
    })}>
      {children}
    </SliceProvider>
  )
}

export default SliceStoreProvider
