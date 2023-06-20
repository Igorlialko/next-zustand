function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var zustand = require('zustand');

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
      return zustand.createStore()(function () {
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
    var ZustandContext = React.createContext(null);
    var StoreProvider = function StoreProvider(_ref) {
      var children = _ref.children,
        initialState = _ref.initialState;
      var storeRef = React.useRef();
      if (!storeRef.current) {
        storeRef.current = initializeStore(initialState);
      }
      return React__default.createElement(ZustandContext.Provider, {
        value: storeRef.current
      }, children);
    };
    var useStore = function useStore(selector, shallow) {
      var store = React.useContext(ZustandContext);
      if (!store) throw new Error('Store is missing the provider');
      return zustand.useStore(store, selector, shallow);
    };
    return {
      Provider: StoreProvider,
      useStore: useStore
    };
  };
};

exports.createProvider = createProvider;
//# sourceMappingURL=index.js.map
