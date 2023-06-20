'use client'

import { Provider, Store } from '../store'

const StoreProvider = ({children, initialState}: {
  initialState:Partial<Store>
}) => {
  return (
    <Provider initialState={(state)=>initialState}>
      {children}
    </Provider>
  );
};

export default StoreProvider;
