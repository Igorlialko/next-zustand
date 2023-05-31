'use client'

import {useStore} from "@/store";

const Count = () => {
  const count = useStore(store => store.count) // You can use one selector

  return <p>{`Count: ${count}`}</p>
}

const Counter = () => {
  const setPrevCount = useStore(store => store.setPrevCount)
  const setNextCount = useStore(store => store.setNextCount)

  return (
    <>
      <Count/>
      <button type="button" onClick={setPrevCount}>
        Prev
      </button>
      <button type="button" onClick={setNextCount}>
        Next
      </button>
    </>
  );
};

export default Counter;
