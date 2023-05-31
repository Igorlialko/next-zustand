'use client'

import {Provider} from "../store"

const StoreProvider = ({children, initialState}) => {
  return (
    <Provider initialState={initialState}>
      {children}
    </Provider>
  );
};

export default StoreProvider;
