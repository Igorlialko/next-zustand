"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const zustand_1 = require("zustand");
const traditional_1 = require("zustand/traditional");
const createProvider = (shallowFn) => (initializer) => {
    const initializeStore = (initialState) => (0, zustand_1.createStore)()((...args) => {
        const initStore = initializer(...args);
        const initState = typeof initialState === 'function' ? initialState(initStore) : initialState;
        return {
            ...initStore,
            ...initState
        };
    });
    const ZustandContext = (0, react_1.createContext)(null);
    const StoreProvider = ({ children, initialState }) => {
        const storeRef = (0, react_1.useRef)();
        if (!storeRef.current) {
            storeRef.current = initializeStore(initialState);
        }
        return (0, jsx_runtime_1.jsx)(ZustandContext.Provider, { value: storeRef.current, children: children });
    };
    const useStore = (selector, equalityFn) => {
        const store = (0, react_1.useContext)(ZustandContext);
        if (!store)
            throw new Error('Store is missing the provider');
        return (0, traditional_1.useStoreWithEqualityFn)(store, selector, shallowFn || equalityFn);
    };
    return { Provider: StoreProvider, useStore };
};
exports.createProvider = createProvider;
