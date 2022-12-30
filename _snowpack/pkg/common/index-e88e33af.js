import {c as createCommonjsModule} from "./_commonjsHelpers-eb5a497e.js";
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l = Symbol.for("react.element"), n = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), q = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z = Symbol.iterator;
function A(a) {
  if (a === null || typeof a !== "object")
    return null;
  a = z && a[z] || a["@@iterator"];
  return typeof a === "function" ? a : null;
}
var B = {isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
}}, C = Object.assign, D = {};
function E(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D;
  this.updater = e || B;
}
E.prototype.isReactComponent = {};
E.prototype.setState = function(a, b) {
  if (typeof a !== "object" && typeof a !== "function" && a != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {
}
F.prototype = E.prototype;
function G(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D;
  this.updater = e || B;
}
var H = G.prototype = new F();
H.constructor = G;
C(H, E.prototype);
H.isPureReactComponent = true;
var I = Array.isArray, J = Object.prototype.hasOwnProperty, K = {current: null}, L = {key: true, ref: true, __self: true, __source: true};
function M(a, b, e) {
  var d, c = {}, k = null, h = null;
  if (b != null)
    for (d in b.ref !== void 0 && (h = b.ref), b.key !== void 0 && (k = "" + b.key), b)
      J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
  var g = arguments.length - 2;
  if (g === 1)
    c.children = e;
  else if (1 < g) {
    for (var f = Array(g), m = 0; m < g; m++)
      f[m] = arguments[m + 2];
    c.children = f;
  }
  if (a && a.defaultProps)
    for (d in g = a.defaultProps, g)
      c[d] === void 0 && (c[d] = g[d]);
  return {$$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current};
}
function N(a, b) {
  return {$$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner};
}
function O(a) {
  return typeof a === "object" && a !== null && a.$$typeof === l;
}
function escape(a) {
  var b = {"=": "=0", ":": "=2"};
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b[a2];
  });
}
var P = /\/+/g;
function Q(a, b) {
  return typeof a === "object" && a !== null && a.key != null ? escape("" + a.key) : b.toString(36);
}
function R(a, b, e, d, c) {
  var k = typeof a;
  if (k === "undefined" || k === "boolean")
    a = null;
  var h = false;
  if (a === null)
    h = true;
  else
    switch (k) {
      case "string":
      case "number":
        h = true;
        break;
      case "object":
        switch (a.$$typeof) {
          case l:
          case n:
            h = true;
        }
    }
  if (h)
    return h = a, c = c(h), a = d === "" ? "." + Q(h, 0) : d, I(c) ? (e = "", a != null && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
      return a2;
    })) : c != null && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
  h = 0;
  d = d === "" ? "." : d + ":";
  if (I(a))
    for (var g = 0; g < a.length; g++) {
      k = a[g];
      var f = d + Q(k, g);
      h += R(k, b, e, f, c);
    }
  else if (f = A(a), typeof f === "function")
    for (a = f.call(a), g = 0; !(k = a.next()).done; )
      k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
  else if (k === "object")
    throw b = String(a), Error("Objects are not valid as a React child (found: " + (b === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S(a, b, e) {
  if (a == null)
    return a;
  var d = [], c = 0;
  R(a, d, "", "", function(a2) {
    return b.call(e, a2, c++);
  });
  return d;
}
function T(a) {
  if (a._status === -1) {
    var b = a._result;
    b = b();
    b.then(function(b2) {
      if (a._status === 0 || a._status === -1)
        a._status = 1, a._result = b2;
    }, function(b2) {
      if (a._status === 0 || a._status === -1)
        a._status = 2, a._result = b2;
    });
    a._status === -1 && (a._status = 0, a._result = b);
  }
  if (a._status === 1)
    return a._result.default;
  throw a._result;
}
var U = {current: null}, V = {transition: null}, W = {ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K};
var Children = {map: S, forEach: function(a, b, e) {
  S(a, function() {
    b.apply(this, arguments);
  }, e);
}, count: function(a) {
  var b = 0;
  S(a, function() {
    b++;
  });
  return b;
}, toArray: function(a) {
  return S(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O(a))
    throw Error("React.Children.only expected to receive a single React element child.");
  return a;
}};
var Component = E;
var Fragment = p;
var Profiler = r;
var PureComponent = G;
var StrictMode = q;
var Suspense = w;
var __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
var cloneElement = function(a, b, e) {
  if (a === null || a === void 0)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
  if (b != null) {
    b.ref !== void 0 && (k = b.ref, h = K.current);
    b.key !== void 0 && (c = "" + b.key);
    if (a.type && a.type.defaultProps)
      var g = a.type.defaultProps;
    for (f in b)
      J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = b[f] === void 0 && g !== void 0 ? g[f] : b[f]);
  }
  var f = arguments.length - 2;
  if (f === 1)
    d.children = e;
  else if (1 < f) {
    g = Array(f);
    for (var m = 0; m < f; m++)
      g[m] = arguments[m + 2];
    d.children = g;
  }
  return {$$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h};
};
var createContext = function(a) {
  a = {$$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null};
  a.Provider = {$$typeof: t, _context: a};
  return a.Consumer = a;
};
var createElement = M;
var createFactory = function(a) {
  var b = M.bind(null, a);
  b.type = a;
  return b;
};
var createRef = function() {
  return {current: null};
};
var forwardRef = function(a) {
  return {$$typeof: v, render: a};
};
var isValidElement = O;
var lazy = function(a) {
  return {$$typeof: y, _payload: {_status: -1, _result: a}, _init: T};
};
var memo = function(a, b) {
  return {$$typeof: x, type: a, compare: b === void 0 ? null : b};
};
var startTransition = function(a) {
  var b = V.transition;
  V.transition = {};
  try {
    a();
  } finally {
    V.transition = b;
  }
};
var unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
var useCallback = function(a, b) {
  return U.current.useCallback(a, b);
};
var useContext = function(a) {
  return U.current.useContext(a);
};
var useDebugValue = function() {
};
var useDeferredValue = function(a) {
  return U.current.useDeferredValue(a);
};
var useEffect = function(a, b) {
  return U.current.useEffect(a, b);
};
var useId = function() {
  return U.current.useId();
};
var useImperativeHandle = function(a, b, e) {
  return U.current.useImperativeHandle(a, b, e);
};
var useInsertionEffect = function(a, b) {
  return U.current.useInsertionEffect(a, b);
};
var useLayoutEffect = function(a, b) {
  return U.current.useLayoutEffect(a, b);
};
var useMemo = function(a, b) {
  return U.current.useMemo(a, b);
};
var useReducer = function(a, b, e) {
  return U.current.useReducer(a, b, e);
};
var useRef = function(a) {
  return U.current.useRef(a);
};
var useState = function(a) {
  return U.current.useState(a);
};
var useSyncExternalStore = function(a, b, e) {
  return U.current.useSyncExternalStore(a, b, e);
};
var useTransition = function() {
  return U.current.useTransition();
};
var version = "18.2.0";
var react_production_min = {
  Children,
  Component,
  Fragment,
  Profiler,
  PureComponent,
  StrictMode,
  Suspense,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  cloneElement,
  createContext,
  createElement,
  createFactory,
  createRef,
  forwardRef,
  isValidElement,
  lazy,
  memo,
  startTransition,
  unstable_act,
  useCallback,
  useContext,
  useDebugValue,
  useDeferredValue,
  useEffect,
  useId,
  useImperativeHandle,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
  version
};
var react = createCommonjsModule(function(module) {
  {
    module.exports = react_production_min;
  }
});
var React = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), react, {
  default: react
}));
export {React as R, react as r};
