'use client'

import { useStore } from '@/store'
import { useStoreSlice } from '@/store/sliceStore'

const Count = () => {
  const count = useStore(state => state.count) // You can use one selector
  const countSlice = useStoreSlice(store => store.countSlice.count)
  return <>
    <p>{`Count: ${count}`}</p>
    <p>{`CountSlice: ${countSlice}`}</p>
  </>
}

const Counter = () => {
  const setPrevCount = useStore(store => store.setPrevCount)
  const setNextCount = useStore(store => store.setNextCount)
  const setPrevCountSlice = useStoreSlice(store => store.countSlice.setPrevCount)
  const setNextCountSlice = useStoreSlice(store => store.countSlice.setNextCount)

  return (
    <>
      <Count />
      <button type='button' onClick={setPrevCount}>
        Prev
      </button>
      <button type='button' onClick={setPrevCountSlice}>
        Prev CountSlice
      </button>
      <button type='button' onClick={setNextCount}>
        Next
      </button>
      <button type='button' onClick={setNextCountSlice}>
        Next CountSlice
      </button>
    </>
  )
}

export default Counter
