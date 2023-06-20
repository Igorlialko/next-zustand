import React, { createContext, useRef, useContext } from 'react';
import { createStore, useStore } from 'zustand';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var createProvider = function createProvider() {
  return function (initializer) {
    var initializeStore = function initializeStore(initialState) {
      return createStore()(function () {
        var initStore = initializer.apply(void 0, arguments);
        var initState = {};
        if (typeof initialState === 'function') {
          initState = initialState(initStore);
        } else {
          initState = initialState;
        }
        return _extends({}, initStore, initState);
      });
    };
    var ZustandContext = createContext(null);
    var StoreProvider = function StoreProvider(_ref) {
      var children = _ref.children,
        initialState = _ref.initialState;
      var storeRef = useRef();
      if (!storeRef.current) {
        storeRef.current = initializeStore(initialState);
      }
      return React.createElement(ZustandContext.Provider, {
        value: storeRef.current
      }, children);
    };
    var useStore$1 = function useStore$1(selector, shallow) {
      var store = useContext(ZustandContext);
      if (!store) throw new Error('Store is missing the provider');
      return useStore(store, selector, shallow);
    };
    return {
      Provider: StoreProvider,
      useStore: useStore$1
    };
  };
};

export { createProvider };
//# sourceMappingURL=index.modern.js.map
