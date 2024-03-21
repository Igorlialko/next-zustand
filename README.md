# next-zustand

> Next.js Provider Zustand

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install next-zustand
```

## Usage

This Provider create for SSR initial state in Zustand
https://www.npmjs.com/package/zustand

## First create a store

Init Store:

```ts
'use client' //for next js app directory v13^

import { createProvider } from 'next-zustand';
import {shallow} from "zustand/shallow";

export type Store = {
  count: number;
  setPrevCount: () => void;
  setNextCount: () => void;
};

const creators = createProvider<Store>()(
  (set) => ({
    count: 0,
    setPrevCount: () => {
      set((state) => ({ count: state.count - 1 }))
    },
    setNextCount: () => {
      set((state) => ({ count: state.count + 1 }))
    }
  }),
  shallow // You can use shallow function for optimize re-renders if this need
);

export const useStore = creators.getUseStore()
export const Provider = creators.Provider


```

Then init Provider in your app.
You can use initialState in

```jsx
 <Provider initialState={{
  count: await getInitialCount()
}}>
  {children}
</Provider>
```

or

```jsx
 <Provider initialState={(prevStore) => ({
  post: {
    ...prevStore.post,
    title: postTitleFromServer
  }
})}>
  {children}
</Provider>
```

to init server constants

In Components :

```tsx
'use client'

import { useStore } from '@/store'

function App() {
  const count = useStore(store => store.count) // You can use one selector

  const {setPrevCount, setNextCount} = useStore(store => ({
    setNextCount: store.setNextCount,
    setPrevCount: store.setPrevCount,
  }))

  return (
    <div className="App">
      <h1>App</h1>
      <p>{`Count: ${count}`}</p>
      <button type="button" onClick={setPrevCount}>
        Prev
      </button>
      <button type="button" onClick={setNextCount}>
        Next
      </button>
    </div>
  );
}
```

**Happy coding!**

## License

MIT © [Igor Lialko](https://github.com/Igorlialko)
