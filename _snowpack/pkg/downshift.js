import {_ as _extends, a as _objectWithoutPropertiesLoose} from "./common/extends-f6c17942.js";
import {p as propTypes$3} from "./common/index-8ab56611.js";
import {r as react} from "./common/index-86c632b0.js";
import {c as createCommonjsModule} from "./common/_commonjsHelpers-8c19dec8.js";
/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b = 60103, c = 60106, d = 60107, e = 60108, f = 60114, g = 60109, h = 60110, k = 60112, l = 60113, m = 60120, n = 60115, p = 60116, q = 60121, r = 60122, u = 60117, v = 60129, w = 60131;
if (typeof Symbol === "function" && Symbol.for) {
  var x = Symbol.for;
  b = x("react.element");
  c = x("react.portal");
  d = x("react.fragment");
  e = x("react.strict_mode");
  f = x("react.profiler");
  g = x("react.provider");
  h = x("react.context");
  k = x("react.forward_ref");
  l = x("react.suspense");
  m = x("react.suspense_list");
  n = x("react.memo");
  p = x("react.lazy");
  q = x("react.block");
  r = x("react.server.block");
  u = x("react.fundamental");
  v = x("react.debug_trace_mode");
  w = x("react.legacy_hidden");
}
function y(a) {
  if (typeof a === "object" && a !== null) {
    var t2 = a.$$typeof;
    switch (t2) {
      case b:
        switch (a = a.type, a) {
          case d:
          case f:
          case e:
          case l:
          case m:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case h:
              case k:
              case p:
              case n:
              case g:
                return a;
              default:
                return t2;
            }
        }
      case c:
        return t2;
    }
  }
}
var z = g, A = b, B = k, C = d, D = p, E = n, F = c, G = f, H = e, I = l;
var ContextConsumer = h;
var ContextProvider = z;
var Element = A;
var ForwardRef = B;
var Fragment = C;
var Lazy = D;
var Memo = E;
var Portal = F;
var Profiler = G;
var StrictMode = H;
var Suspense = I;
var isAsyncMode = function() {
  return false;
};
var isConcurrentMode = function() {
  return false;
};
var isContextConsumer = function(a) {
  return y(a) === h;
};
var isContextProvider = function(a) {
  return y(a) === g;
};
var isElement = function(a) {
  return typeof a === "object" && a !== null && a.$$typeof === b;
};
var isForwardRef = function(a) {
  return y(a) === k;
};
var isFragment = function(a) {
  return y(a) === d;
};
var isLazy = function(a) {
  return y(a) === p;
};
var isMemo = function(a) {
  return y(a) === n;
};
var isPortal = function(a) {
  return y(a) === c;
};
var isProfiler = function(a) {
  return y(a) === f;
};
var isStrictMode = function(a) {
  return y(a) === e;
};
var isSuspense = function(a) {
  return y(a) === l;
};
var isValidElementType = function(a) {
  return typeof a === "string" || typeof a === "function" || a === d || a === f || a === v || a === e || a === l || a === m || a === w || typeof a === "object" && a !== null && (a.$$typeof === p || a.$$typeof === n || a.$$typeof === g || a.$$typeof === h || a.$$typeof === k || a.$$typeof === u || a.$$typeof === q || a[0] === r) ? true : false;
};
var typeOf = y;
var reactIs_production_min = {
  ContextConsumer,
  ContextProvider,
  Element,
  ForwardRef,
  Fragment,
  Lazy,
  Memo,
  Portal,
  Profiler,
  StrictMode,
  Suspense,
  isAsyncMode,
  isConcurrentMode,
  isContextConsumer,
  isContextProvider,
  isElement,
  isForwardRef,
  isFragment,
  isLazy,
  isMemo,
  isPortal,
  isProfiler,
  isStrictMode,
  isSuspense,
  isValidElementType,
  typeOf
};
var reactIs = createCommonjsModule(function(module) {
  {
    module.exports = reactIs_production_min;
  }
});
function t(t2) {
  return typeof t2 == "object" && t2 != null && t2.nodeType === 1;
}
function e$1(t2, e2) {
  return (!e2 || t2 !== "hidden") && t2 !== "visible" && t2 !== "clip";
}
function n$1(t2, n2) {
  if (t2.clientHeight < t2.scrollHeight || t2.clientWidth < t2.scrollWidth) {
    var r2 = getComputedStyle(t2, null);
    return e$1(r2.overflowY, n2) || e$1(r2.overflowX, n2) || function(t3) {
      var e2 = function(t4) {
        if (!t4.ownerDocument || !t4.ownerDocument.defaultView)
          return null;
        try {
          return t4.ownerDocument.defaultView.frameElement;
        } catch (t5) {
          return null;
        }
      }(t3);
      return !!e2 && (e2.clientHeight < t3.scrollHeight || e2.clientWidth < t3.scrollWidth);
    }(t2);
  }
  return false;
}
function r$1(t2, e2, n2, r2, i, o, l2, d2) {
  return o < t2 && l2 > e2 || o > t2 && l2 < e2 ? 0 : o <= t2 && d2 <= n2 || l2 >= e2 && d2 >= n2 ? o - t2 - r2 : l2 > e2 && d2 < n2 || o < t2 && d2 > n2 ? l2 - e2 + i : 0;
}
function computeScrollIntoView(e2, i) {
  var o = window, l2 = i.scrollMode, d2 = i.block, u2 = i.inline, h2 = i.boundary, a = i.skipOverflowHiddenElements, c2 = typeof h2 == "function" ? h2 : function(t2) {
    return t2 !== h2;
  };
  if (!t(e2))
    throw new TypeError("Invalid target");
  for (var f2 = document.scrollingElement || document.documentElement, s = [], p2 = e2; t(p2) && c2(p2); ) {
    if ((p2 = p2.parentElement) === f2) {
      s.push(p2);
      break;
    }
    p2 != null && p2 === document.body && n$1(p2) && !n$1(document.documentElement) || p2 != null && n$1(p2, a) && s.push(p2);
  }
  for (var m2 = o.visualViewport ? o.visualViewport.width : innerWidth, g2 = o.visualViewport ? o.visualViewport.height : innerHeight, w2 = window.scrollX || pageXOffset, v2 = window.scrollY || pageYOffset, W = e2.getBoundingClientRect(), b2 = W.height, H2 = W.width, y2 = W.top, E2 = W.right, M = W.bottom, V = W.left, x = d2 === "start" || d2 === "nearest" ? y2 : d2 === "end" ? M : y2 + b2 / 2, I2 = u2 === "center" ? V + H2 / 2 : u2 === "end" ? E2 : V, C2 = [], T = 0; T < s.length; T++) {
    var k2 = s[T], B2 = k2.getBoundingClientRect(), D2 = B2.height, O = B2.width, R = B2.top, X = B2.right, Y = B2.bottom, L = B2.left;
    if (l2 === "if-needed" && y2 >= 0 && V >= 0 && M <= g2 && E2 <= m2 && y2 >= R && M <= Y && V >= L && E2 <= X)
      return C2;
    var S = getComputedStyle(k2), j = parseInt(S.borderLeftWidth, 10), q2 = parseInt(S.borderTopWidth, 10), z2 = parseInt(S.borderRightWidth, 10), A2 = parseInt(S.borderBottomWidth, 10), F2 = 0, G2 = 0, J = "offsetWidth" in k2 ? k2.offsetWidth - k2.clientWidth - j - z2 : 0, K = "offsetHeight" in k2 ? k2.offsetHeight - k2.clientHeight - q2 - A2 : 0;
    if (f2 === k2)
      F2 = d2 === "start" ? x : d2 === "end" ? x - g2 : d2 === "nearest" ? r$1(v2, v2 + g2, g2, q2, A2, v2 + x, v2 + x + b2, b2) : x - g2 / 2, G2 = u2 === "start" ? I2 : u2 === "center" ? I2 - m2 / 2 : u2 === "end" ? I2 - m2 : r$1(w2, w2 + m2, m2, j, z2, w2 + I2, w2 + I2 + H2, H2), F2 = Math.max(0, F2 + v2), G2 = Math.max(0, G2 + w2);
    else {
      F2 = d2 === "start" ? x - R - q2 : d2 === "end" ? x - Y + A2 + K : d2 === "nearest" ? r$1(R, Y, D2, q2, A2 + K, x, x + b2, b2) : x - (R + D2 / 2) + K / 2, G2 = u2 === "start" ? I2 - L - j : u2 === "center" ? I2 - (L + O / 2) + J / 2 : u2 === "end" ? I2 - X + z2 + J : r$1(L, X, O, j, z2 + J, I2, I2 + H2, H2);
      var N = k2.scrollLeft, P = k2.scrollTop;
      x += P - (F2 = Math.max(0, Math.min(P + F2, k2.scrollHeight - D2 + K))), I2 += N - (G2 = Math.max(0, Math.min(N + G2, k2.scrollWidth - O + J)));
    }
    C2.push({el: k2, top: F2, left: G2});
  }
  return C2;
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign.apply(this, arguments);
};
var idCounter = 0;
function noop() {
}
function scrollIntoView(node, menuNode) {
  if (!node) {
    return;
  }
  var actions = computeScrollIntoView(node, {
    boundary: menuNode,
    block: "nearest",
    scrollMode: "if-needed"
  });
  actions.forEach(function(_ref) {
    var el = _ref.el, top = _ref.top, left = _ref.left;
    el.scrollTop = top;
    el.scrollLeft = left;
  });
}
function isOrContainsNode(parent, child, environment) {
  var result = parent === child || child instanceof environment.Node && parent.contains && parent.contains(child);
  return result;
}
function debounce(fn, time) {
  var timeoutId;
  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
  function wrapper() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    cancel();
    timeoutId = setTimeout(function() {
      timeoutId = null;
      fn.apply(void 0, args);
    }, time);
  }
  wrapper.cancel = cancel;
  return wrapper;
}
function callAllEventHandlers() {
  for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }
  return function(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    return fns.some(function(fn) {
      if (fn) {
        fn.apply(void 0, [event].concat(args));
      }
      return event.preventDownshiftDefault || event.hasOwnProperty("nativeEvent") && event.nativeEvent.preventDownshiftDefault;
    });
  };
}
function handleRefs() {
  for (var _len4 = arguments.length, refs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    refs[_key4] = arguments[_key4];
  }
  return function(node) {
    refs.forEach(function(ref) {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
}
function generateId() {
  return String(idCounter++);
}
function getA11yStatusMessage$1(_ref2) {
  var isOpen = _ref2.isOpen, resultCount = _ref2.resultCount, previousResultCount = _ref2.previousResultCount;
  if (!isOpen) {
    return "";
  }
  if (!resultCount) {
    return "No results are available.";
  }
  if (resultCount !== previousResultCount) {
    return resultCount + " result" + (resultCount === 1 ? " is" : "s are") + " available, use up and down arrow keys to navigate. Press Enter key to select.";
  }
  return "";
}
function getState(state, props) {
  return Object.keys(state).reduce(function(prevState, key) {
    prevState[key] = isControlledProp(props, key) ? props[key] : state[key];
    return prevState;
  }, {});
}
function isControlledProp(props, key) {
  return props[key] !== void 0;
}
function normalizeArrowKey(event) {
  var key = event.key, keyCode = event.keyCode;
  if (keyCode >= 37 && keyCode <= 40 && key.indexOf("Arrow") !== 0) {
    return "Arrow" + key;
  }
  return key;
}
function getNextWrappingIndex(moveAmount, baseIndex, itemCount, getItemNodeFromIndex, circular) {
  if (circular === void 0) {
    circular = true;
  }
  if (itemCount === 0) {
    return -1;
  }
  var itemsLastIndex = itemCount - 1;
  if (typeof baseIndex !== "number" || baseIndex < 0 || baseIndex >= itemCount) {
    baseIndex = moveAmount > 0 ? -1 : itemsLastIndex + 1;
  }
  var newIndex = baseIndex + moveAmount;
  if (newIndex < 0) {
    newIndex = circular ? itemsLastIndex : 0;
  } else if (newIndex > itemsLastIndex) {
    newIndex = circular ? 0 : itemsLastIndex;
  }
  var nonDisabledNewIndex = getNextNonDisabledIndex(moveAmount, newIndex, itemCount, getItemNodeFromIndex, circular);
  if (nonDisabledNewIndex === -1) {
    return baseIndex >= itemCount ? -1 : baseIndex;
  }
  return nonDisabledNewIndex;
}
function getNextNonDisabledIndex(moveAmount, baseIndex, itemCount, getItemNodeFromIndex, circular) {
  var currentElementNode = getItemNodeFromIndex(baseIndex);
  if (!currentElementNode || !currentElementNode.hasAttribute("disabled")) {
    return baseIndex;
  }
  if (moveAmount > 0) {
    for (var index = baseIndex + 1; index < itemCount; index++) {
      if (!getItemNodeFromIndex(index).hasAttribute("disabled")) {
        return index;
      }
    }
  } else {
    for (var _index = baseIndex - 1; _index >= 0; _index--) {
      if (!getItemNodeFromIndex(_index).hasAttribute("disabled")) {
        return _index;
      }
    }
  }
  if (circular) {
    return moveAmount > 0 ? getNextNonDisabledIndex(1, 0, itemCount, getItemNodeFromIndex, false) : getNextNonDisabledIndex(-1, itemCount - 1, itemCount, getItemNodeFromIndex, false);
  }
  return -1;
}
function targetWithinDownshift(target, downshiftElements, environment, checkActiveElement) {
  if (checkActiveElement === void 0) {
    checkActiveElement = true;
  }
  return downshiftElements.some(function(contextNode) {
    return contextNode && (isOrContainsNode(contextNode, target, environment) || checkActiveElement && isOrContainsNode(contextNode, environment.document.activeElement, environment));
  });
}
var cleanupStatus = debounce(function(documentProp) {
  getStatusDiv(documentProp).textContent = "";
}, 500);
function setStatus(status, documentProp) {
  var div = getStatusDiv(documentProp);
  if (!status) {
    return;
  }
  div.textContent = status;
  cleanupStatus(documentProp);
}
function getStatusDiv(documentProp) {
  if (documentProp === void 0) {
    documentProp = document;
  }
  var statusDiv = documentProp.getElementById("a11y-status-message");
  if (statusDiv) {
    return statusDiv;
  }
  statusDiv = documentProp.createElement("div");
  statusDiv.setAttribute("id", "a11y-status-message");
  statusDiv.setAttribute("role", "status");
  statusDiv.setAttribute("aria-live", "polite");
  statusDiv.setAttribute("aria-relevant", "additions text");
  Object.assign(statusDiv.style, {
    border: "0",
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    width: "1px"
  });
  documentProp.body.appendChild(statusDiv);
  return statusDiv;
}
var _excluded$3 = ["isInitialMount", "highlightedIndex", "items", "environment"];
var dropdownDefaultStateValues = {
  highlightedIndex: -1,
  isOpen: false,
  selectedItem: null,
  inputValue: ""
};
function callOnChangeProps(action, state, newState) {
  var props = action.props, type = action.type;
  var changes = {};
  Object.keys(state).forEach(function(key) {
    invokeOnChangeHandler(key, action, state, newState);
    if (newState[key] !== state[key]) {
      changes[key] = newState[key];
    }
  });
  if (props.onStateChange && Object.keys(changes).length) {
    props.onStateChange(_extends({
      type
    }, changes));
  }
}
function invokeOnChangeHandler(key, action, state, newState) {
  var props = action.props, type = action.type;
  var handler = "on" + capitalizeString(key) + "Change";
  if (props[handler] && newState[key] !== void 0 && newState[key] !== state[key]) {
    props[handler](_extends({
      type
    }, newState));
  }
}
function stateReducer(s, a) {
  return a.changes;
}
function getA11ySelectionMessage(selectionParameters) {
  var selectedItem = selectionParameters.selectedItem, itemToStringLocal = selectionParameters.itemToString;
  return selectedItem ? itemToStringLocal(selectedItem) + " has been selected." : "";
}
var updateA11yStatus = debounce(function(getA11yMessage, document2) {
  setStatus(getA11yMessage(), document2);
}, 200);
var useIsomorphicLayoutEffect = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined" ? react.useLayoutEffect : react.useEffect;
function useElementIds(_ref) {
  var _ref$id = _ref.id, id = _ref$id === void 0 ? "downshift-" + generateId() : _ref$id, labelId = _ref.labelId, menuId = _ref.menuId, getItemId = _ref.getItemId, toggleButtonId = _ref.toggleButtonId, inputId = _ref.inputId;
  var elementIdsRef = react.useRef({
    labelId: labelId || id + "-label",
    menuId: menuId || id + "-menu",
    getItemId: getItemId || function(index) {
      return id + "-item-" + index;
    },
    toggleButtonId: toggleButtonId || id + "-toggle-button",
    inputId: inputId || id + "-input"
  });
  return elementIdsRef.current;
}
function getItemIndex(index, item, items) {
  if (index !== void 0) {
    return index;
  }
  if (items.length === 0) {
    return -1;
  }
  return items.indexOf(item);
}
function itemToString(item) {
  return item ? String(item) : "";
}
function capitalizeString(string) {
  return "" + string.slice(0, 1).toUpperCase() + string.slice(1);
}
function useLatestRef(val) {
  var ref = react.useRef(val);
  ref.current = val;
  return ref;
}
function useEnhancedReducer(reducer, initialState, props) {
  var prevStateRef = react.useRef();
  var actionRef = react.useRef();
  var enhancedReducer = react.useCallback(function(state2, action2) {
    actionRef.current = action2;
    state2 = getState(state2, action2.props);
    var changes = reducer(state2, action2);
    var newState = action2.props.stateReducer(state2, _extends({}, action2, {
      changes
    }));
    return newState;
  }, [reducer]);
  var _useReducer = react.useReducer(enhancedReducer, initialState), state = _useReducer[0], dispatch = _useReducer[1];
  var propsRef = useLatestRef(props);
  var dispatchWithProps = react.useCallback(function(action2) {
    return dispatch(_extends({
      props: propsRef.current
    }, action2));
  }, [propsRef]);
  var action = actionRef.current;
  react.useEffect(function() {
    if (action && prevStateRef.current && prevStateRef.current !== state) {
      callOnChangeProps(action, getState(prevStateRef.current, action.props), state);
    }
    prevStateRef.current = state;
  }, [state, props, action]);
  return [state, dispatchWithProps];
}
var defaultProps$3 = {
  itemToString,
  stateReducer,
  getA11ySelectionMessage,
  scrollIntoView,
  circularNavigation: false,
  environment: typeof window === "undefined" ? {} : window
};
function getDefaultValue$1(props, propKey, defaultStateValues) {
  if (defaultStateValues === void 0) {
    defaultStateValues = dropdownDefaultStateValues;
  }
  var defaultPropKey = "default" + capitalizeString(propKey);
  if (defaultPropKey in props) {
    return props[defaultPropKey];
  }
  return defaultStateValues[propKey];
}
function getInitialValue$1(props, propKey, defaultStateValues) {
  if (defaultStateValues === void 0) {
    defaultStateValues = dropdownDefaultStateValues;
  }
  if (propKey in props) {
    return props[propKey];
  }
  var initialPropKey = "initial" + capitalizeString(propKey);
  if (initialPropKey in props) {
    return props[initialPropKey];
  }
  return getDefaultValue$1(props, propKey, defaultStateValues);
}
function getInitialState$2(props) {
  var selectedItem = getInitialValue$1(props, "selectedItem");
  var isOpen = getInitialValue$1(props, "isOpen");
  var highlightedIndex = getInitialValue$1(props, "highlightedIndex");
  var inputValue = getInitialValue$1(props, "inputValue");
  return {
    highlightedIndex: highlightedIndex < 0 && selectedItem && isOpen ? props.items.indexOf(selectedItem) : highlightedIndex,
    isOpen,
    selectedItem,
    inputValue
  };
}
function getHighlightedIndexOnOpen(props, state, offset, getItemNodeFromIndex) {
  var items = props.items, initialHighlightedIndex = props.initialHighlightedIndex, defaultHighlightedIndex = props.defaultHighlightedIndex;
  var selectedItem = state.selectedItem, highlightedIndex = state.highlightedIndex;
  if (items.length === 0) {
    return -1;
  }
  if (initialHighlightedIndex !== void 0 && highlightedIndex === initialHighlightedIndex) {
    return initialHighlightedIndex;
  }
  if (defaultHighlightedIndex !== void 0) {
    return defaultHighlightedIndex;
  }
  if (selectedItem) {
    if (offset === 0) {
      return items.indexOf(selectedItem);
    }
    return getNextWrappingIndex(offset, items.indexOf(selectedItem), items.length, getItemNodeFromIndex, false);
  }
  if (offset === 0) {
    return -1;
  }
  return offset < 0 ? items.length - 1 : 0;
}
function useMouseAndTouchTracker(isOpen, downshiftElementRefs, environment, handleBlur) {
  var mouseAndTouchTrackersRef = react.useRef({
    isMouseDown: false,
    isTouchMove: false
  });
  react.useEffect(function() {
    var onMouseDown = function onMouseDown2() {
      mouseAndTouchTrackersRef.current.isMouseDown = true;
    };
    var onMouseUp = function onMouseUp2(event) {
      mouseAndTouchTrackersRef.current.isMouseDown = false;
      if (isOpen && !targetWithinDownshift(event.target, downshiftElementRefs.map(function(ref) {
        return ref.current;
      }), environment)) {
        handleBlur();
      }
    };
    var onTouchStart = function onTouchStart2() {
      mouseAndTouchTrackersRef.current.isTouchMove = false;
    };
    var onTouchMove = function onTouchMove2() {
      mouseAndTouchTrackersRef.current.isTouchMove = true;
    };
    var onTouchEnd = function onTouchEnd2(event) {
      if (isOpen && !mouseAndTouchTrackersRef.current.isTouchMove && !targetWithinDownshift(event.target, downshiftElementRefs.map(function(ref) {
        return ref.current;
      }), environment, false)) {
        handleBlur();
      }
    };
    environment.addEventListener("mousedown", onMouseDown);
    environment.addEventListener("mouseup", onMouseUp);
    environment.addEventListener("touchstart", onTouchStart);
    environment.addEventListener("touchmove", onTouchMove);
    environment.addEventListener("touchend", onTouchEnd);
    return function cleanup() {
      environment.removeEventListener("mousedown", onMouseDown);
      environment.removeEventListener("mouseup", onMouseUp);
      environment.removeEventListener("touchstart", onTouchStart);
      environment.removeEventListener("touchmove", onTouchMove);
      environment.removeEventListener("touchend", onTouchEnd);
    };
  }, [isOpen, environment]);
  return mouseAndTouchTrackersRef;
}
var useGetterPropsCalledChecker = function useGetterPropsCalledChecker2() {
  return noop;
};
function useA11yMessageSetter(getA11yMessage, dependencyArray, _ref2) {
  var isInitialMount = _ref2.isInitialMount, highlightedIndex = _ref2.highlightedIndex, items = _ref2.items, environment = _ref2.environment, rest = _objectWithoutPropertiesLoose(_ref2, _excluded$3);
  react.useEffect(function() {
    if (isInitialMount || false) {
      return;
    }
    updateA11yStatus(function() {
      return getA11yMessage(_extends({
        highlightedIndex,
        highlightedItem: items[highlightedIndex],
        resultCount: items.length
      }, rest));
    }, environment.document);
  }, dependencyArray);
}
function useScrollIntoView(_ref3) {
  var highlightedIndex = _ref3.highlightedIndex, isOpen = _ref3.isOpen, itemRefs = _ref3.itemRefs, getItemNodeFromIndex = _ref3.getItemNodeFromIndex, menuElement = _ref3.menuElement, scrollIntoViewProp = _ref3.scrollIntoView;
  var shouldScrollRef = react.useRef(true);
  useIsomorphicLayoutEffect(function() {
    if (highlightedIndex < 0 || !isOpen || !Object.keys(itemRefs.current).length) {
      return;
    }
    if (shouldScrollRef.current === false) {
      shouldScrollRef.current = true;
    } else {
      scrollIntoViewProp(getItemNodeFromIndex(highlightedIndex), menuElement);
    }
  }, [highlightedIndex]);
  return shouldScrollRef;
}
var useControlPropsValidator = noop;
function downshiftCommonReducer(state, action, stateChangeTypes) {
  var type = action.type, props = action.props;
  var changes;
  switch (type) {
    case stateChangeTypes.ItemMouseMove:
      changes = {
        highlightedIndex: action.index
      };
      break;
    case stateChangeTypes.MenuMouseLeave:
      changes = {
        highlightedIndex: -1
      };
      break;
    case stateChangeTypes.ToggleButtonClick:
    case stateChangeTypes.FunctionToggleMenu:
      changes = {
        isOpen: !state.isOpen,
        highlightedIndex: state.isOpen ? -1 : getHighlightedIndexOnOpen(props, state, 0)
      };
      break;
    case stateChangeTypes.FunctionOpenMenu:
      changes = {
        isOpen: true,
        highlightedIndex: getHighlightedIndexOnOpen(props, state, 0)
      };
      break;
    case stateChangeTypes.FunctionCloseMenu:
      changes = {
        isOpen: false
      };
      break;
    case stateChangeTypes.FunctionSetHighlightedIndex:
      changes = {
        highlightedIndex: action.highlightedIndex
      };
      break;
    case stateChangeTypes.FunctionSetInputValue:
      changes = {
        inputValue: action.inputValue
      };
      break;
    case stateChangeTypes.FunctionReset:
      changes = {
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        isOpen: getDefaultValue$1(props, "isOpen"),
        selectedItem: getDefaultValue$1(props, "selectedItem"),
        inputValue: getDefaultValue$1(props, "inputValue")
      };
      break;
    default:
      throw new Error("Reducer called without proper action type.");
  }
  return _extends({}, state, changes);
}
var propTypes$2 = {
  items: propTypes$3.array.isRequired,
  itemToString: propTypes$3.func,
  getA11yStatusMessage: propTypes$3.func,
  getA11ySelectionMessage: propTypes$3.func,
  circularNavigation: propTypes$3.bool,
  highlightedIndex: propTypes$3.number,
  defaultHighlightedIndex: propTypes$3.number,
  initialHighlightedIndex: propTypes$3.number,
  isOpen: propTypes$3.bool,
  defaultIsOpen: propTypes$3.bool,
  initialIsOpen: propTypes$3.bool,
  selectedItem: propTypes$3.any,
  initialSelectedItem: propTypes$3.any,
  defaultSelectedItem: propTypes$3.any,
  id: propTypes$3.string,
  labelId: propTypes$3.string,
  menuId: propTypes$3.string,
  getItemId: propTypes$3.func,
  toggleButtonId: propTypes$3.string,
  stateReducer: propTypes$3.func,
  onSelectedItemChange: propTypes$3.func,
  onHighlightedIndexChange: propTypes$3.func,
  onStateChange: propTypes$3.func,
  onIsOpenChange: propTypes$3.func,
  environment: propTypes$3.shape({
    addEventListener: propTypes$3.func,
    removeEventListener: propTypes$3.func,
    document: propTypes$3.shape({
      getElementById: propTypes$3.func,
      activeElement: propTypes$3.any,
      body: propTypes$3.any
    })
  })
};
function getA11yStatusMessage(_a) {
  var isOpen = _a.isOpen, resultCount = _a.resultCount, previousResultCount = _a.previousResultCount;
  if (!isOpen) {
    return "";
  }
  if (!resultCount) {
    return "No results are available.";
  }
  if (resultCount !== previousResultCount) {
    return resultCount + " result" + (resultCount === 1 ? " is" : "s are") + " available, use up and down arrow keys to navigate. Press Enter or Space Bar keys to select.";
  }
  return "";
}
var defaultProps$2 = __assign(__assign({}, defaultProps$3), {getA11yStatusMessage});
var InputKeyDownArrowDown = 0;
var InputKeyDownArrowUp = 1;
var InputKeyDownEscape = 2;
var InputKeyDownHome = 3;
var InputKeyDownEnd = 4;
var InputKeyDownEnter = 5;
var InputChange = 6;
var InputBlur = 7;
var MenuMouseLeave = 8;
var ItemMouseMove = 9;
var ItemClick = 10;
var ToggleButtonClick = 11;
var FunctionToggleMenu = 12;
var FunctionOpenMenu = 13;
var FunctionCloseMenu = 14;
var FunctionSetHighlightedIndex = 15;
var FunctionSelectItem = 16;
var FunctionSetInputValue = 17;
var FunctionReset$1 = 18;
var ControlledPropUpdatedSelectedItem = 19;
var stateChangeTypes$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  InputKeyDownArrowDown,
  InputKeyDownArrowUp,
  InputKeyDownEscape,
  InputKeyDownHome,
  InputKeyDownEnd,
  InputKeyDownEnter,
  InputChange,
  InputBlur,
  MenuMouseLeave,
  ItemMouseMove,
  ItemClick,
  ToggleButtonClick,
  FunctionToggleMenu,
  FunctionOpenMenu,
  FunctionCloseMenu,
  FunctionSetHighlightedIndex,
  FunctionSelectItem,
  FunctionSetInputValue,
  FunctionReset: FunctionReset$1,
  ControlledPropUpdatedSelectedItem
});
function getInitialState$1(props) {
  var initialState = getInitialState$2(props);
  var selectedItem = initialState.selectedItem;
  var inputValue = initialState.inputValue;
  if (inputValue === "" && selectedItem && props.defaultInputValue === void 0 && props.initialInputValue === void 0 && props.inputValue === void 0) {
    inputValue = props.itemToString(selectedItem);
  }
  return _extends({}, initialState, {
    inputValue
  });
}
var propTypes$1 = {
  items: propTypes$3.array.isRequired,
  itemToString: propTypes$3.func,
  getA11yStatusMessage: propTypes$3.func,
  getA11ySelectionMessage: propTypes$3.func,
  circularNavigation: propTypes$3.bool,
  highlightedIndex: propTypes$3.number,
  defaultHighlightedIndex: propTypes$3.number,
  initialHighlightedIndex: propTypes$3.number,
  isOpen: propTypes$3.bool,
  defaultIsOpen: propTypes$3.bool,
  initialIsOpen: propTypes$3.bool,
  selectedItem: propTypes$3.any,
  initialSelectedItem: propTypes$3.any,
  defaultSelectedItem: propTypes$3.any,
  inputValue: propTypes$3.string,
  defaultInputValue: propTypes$3.string,
  initialInputValue: propTypes$3.string,
  id: propTypes$3.string,
  labelId: propTypes$3.string,
  menuId: propTypes$3.string,
  getItemId: propTypes$3.func,
  inputId: propTypes$3.string,
  toggleButtonId: propTypes$3.string,
  stateReducer: propTypes$3.func,
  onSelectedItemChange: propTypes$3.func,
  onHighlightedIndexChange: propTypes$3.func,
  onStateChange: propTypes$3.func,
  onIsOpenChange: propTypes$3.func,
  onInputValueChange: propTypes$3.func,
  environment: propTypes$3.shape({
    addEventListener: propTypes$3.func,
    removeEventListener: propTypes$3.func,
    document: propTypes$3.shape({
      getElementById: propTypes$3.func,
      activeElement: propTypes$3.any,
      body: propTypes$3.any
    })
  })
};
function useControlledReducer(reducer, initialState, props) {
  var previousSelectedItemRef = react.useRef();
  var _useEnhancedReducer = useEnhancedReducer(reducer, initialState, props), state = _useEnhancedReducer[0], dispatch = _useEnhancedReducer[1];
  react.useEffect(function() {
    if (isControlledProp(props, "selectedItem")) {
      if (previousSelectedItemRef.current !== props.selectedItem) {
        dispatch({
          type: ControlledPropUpdatedSelectedItem,
          inputValue: props.itemToString(props.selectedItem)
        });
      }
      previousSelectedItemRef.current = state.selectedItem === previousSelectedItemRef.current ? props.selectedItem : state.selectedItem;
    }
  });
  return [getState(state, props), dispatch];
}
var defaultProps$1 = _extends({}, defaultProps$3, {
  getA11yStatusMessage: getA11yStatusMessage$1,
  circularNavigation: true
});
function downshiftUseComboboxReducer(state, action) {
  var type = action.type, props = action.props, shiftKey = action.shiftKey;
  var changes;
  switch (type) {
    case ItemClick:
      changes = {
        isOpen: getDefaultValue$1(props, "isOpen"),
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        selectedItem: props.items[action.index],
        inputValue: props.itemToString(props.items[action.index])
      };
      break;
    case InputKeyDownArrowDown:
      if (state.isOpen) {
        changes = {
          highlightedIndex: getNextWrappingIndex(shiftKey ? 5 : 1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, props.circularNavigation)
        };
      } else {
        changes = {
          highlightedIndex: getHighlightedIndexOnOpen(props, state, 1, action.getItemNodeFromIndex),
          isOpen: props.items.length >= 0
        };
      }
      break;
    case InputKeyDownArrowUp:
      if (state.isOpen) {
        changes = {
          highlightedIndex: getNextWrappingIndex(shiftKey ? -5 : -1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, props.circularNavigation)
        };
      } else {
        changes = {
          highlightedIndex: getHighlightedIndexOnOpen(props, state, -1, action.getItemNodeFromIndex),
          isOpen: props.items.length >= 0
        };
      }
      break;
    case InputKeyDownEnter:
      changes = _extends({}, state.isOpen && state.highlightedIndex >= 0 && {
        selectedItem: props.items[state.highlightedIndex],
        isOpen: getDefaultValue$1(props, "isOpen"),
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        inputValue: props.itemToString(props.items[state.highlightedIndex])
      });
      break;
    case InputKeyDownEscape:
      changes = _extends({
        isOpen: false,
        highlightedIndex: -1
      }, !state.isOpen && {
        selectedItem: null,
        inputValue: ""
      });
      break;
    case InputKeyDownHome:
      changes = {
        highlightedIndex: getNextNonDisabledIndex(1, 0, props.items.length, action.getItemNodeFromIndex, false)
      };
      break;
    case InputKeyDownEnd:
      changes = {
        highlightedIndex: getNextNonDisabledIndex(-1, props.items.length - 1, props.items.length, action.getItemNodeFromIndex, false)
      };
      break;
    case InputBlur:
      changes = _extends({
        isOpen: false,
        highlightedIndex: -1
      }, state.highlightedIndex >= 0 && action.selectItem && {
        selectedItem: props.items[state.highlightedIndex],
        inputValue: props.itemToString(props.items[state.highlightedIndex])
      });
      break;
    case InputChange:
      changes = {
        isOpen: true,
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        inputValue: action.inputValue
      };
      break;
    case FunctionSelectItem:
      changes = {
        selectedItem: action.selectedItem,
        inputValue: props.itemToString(action.selectedItem)
      };
      break;
    case ControlledPropUpdatedSelectedItem:
      changes = {
        inputValue: action.inputValue
      };
      break;
    default:
      return downshiftCommonReducer(state, action, stateChangeTypes$1);
  }
  return _extends({}, state, changes);
}
var _excluded$1 = ["onMouseLeave", "refKey", "ref"], _excluded2$1 = ["item", "index", "refKey", "ref", "onMouseMove", "onClick", "onPress"], _excluded3 = ["onClick", "onPress", "refKey", "ref"], _excluded4 = ["onKeyDown", "onChange", "onInput", "onBlur", "onChangeText", "refKey", "ref"], _excluded5 = ["refKey", "ref"];
useCombobox.stateChangeTypes = stateChangeTypes$1;
function useCombobox(userProps) {
  if (userProps === void 0) {
    userProps = {};
  }
  var props = _extends({}, defaultProps$1, userProps);
  var initialIsOpen = props.initialIsOpen, defaultIsOpen = props.defaultIsOpen, items = props.items, scrollIntoView2 = props.scrollIntoView, environment = props.environment, getA11yStatusMessage2 = props.getA11yStatusMessage, getA11ySelectionMessage2 = props.getA11ySelectionMessage, itemToString2 = props.itemToString;
  var initialState = getInitialState$1(props);
  var _useControlledReducer = useControlledReducer(downshiftUseComboboxReducer, initialState, props), state = _useControlledReducer[0], dispatch = _useControlledReducer[1];
  var isOpen = state.isOpen, highlightedIndex = state.highlightedIndex, selectedItem = state.selectedItem, inputValue = state.inputValue;
  var menuRef = react.useRef(null);
  var itemRefs = react.useRef({});
  var inputRef = react.useRef(null);
  var toggleButtonRef = react.useRef(null);
  var comboboxRef = react.useRef(null);
  var isInitialMountRef = react.useRef(true);
  var elementIds = useElementIds(props);
  var previousResultCountRef = react.useRef();
  var latest = useLatestRef({
    state,
    props
  });
  var getItemNodeFromIndex = react.useCallback(function(index) {
    return itemRefs.current[elementIds.getItemId(index)];
  }, [elementIds]);
  useA11yMessageSetter(getA11yStatusMessage2, [isOpen, highlightedIndex, inputValue, items], _extends({
    isInitialMount: isInitialMountRef.current,
    previousResultCount: previousResultCountRef.current,
    items,
    environment,
    itemToString: itemToString2
  }, state));
  useA11yMessageSetter(getA11ySelectionMessage2, [selectedItem], _extends({
    isInitialMount: isInitialMountRef.current,
    previousResultCount: previousResultCountRef.current,
    items,
    environment,
    itemToString: itemToString2
  }, state));
  var shouldScrollRef = useScrollIntoView({
    menuElement: menuRef.current,
    highlightedIndex,
    isOpen,
    itemRefs,
    scrollIntoView: scrollIntoView2,
    getItemNodeFromIndex
  });
  useControlPropsValidator({
    isInitialMount: isInitialMountRef.current,
    props,
    state
  });
  react.useEffect(function() {
    var focusOnOpen = initialIsOpen || defaultIsOpen || isOpen;
    if (focusOnOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  react.useEffect(function() {
    if (isInitialMountRef.current) {
      return;
    }
    previousResultCountRef.current = items.length;
  });
  var mouseAndTouchTrackersRef = useMouseAndTouchTracker(isOpen, [comboboxRef, menuRef, toggleButtonRef], environment, function() {
    dispatch({
      type: InputBlur,
      selectItem: false
    });
  });
  var setGetterPropCallInfo = useGetterPropsCalledChecker();
  react.useEffect(function() {
    isInitialMountRef.current = false;
  }, []);
  react.useEffect(function() {
    if (!isOpen) {
      itemRefs.current = {};
    }
  }, [isOpen]);
  var inputKeyDownHandlers = react.useMemo(function() {
    return {
      ArrowDown: function ArrowDown(event) {
        event.preventDefault();
        dispatch({
          type: InputKeyDownArrowDown,
          shiftKey: event.shiftKey,
          getItemNodeFromIndex
        });
      },
      ArrowUp: function ArrowUp(event) {
        event.preventDefault();
        dispatch({
          type: InputKeyDownArrowUp,
          shiftKey: event.shiftKey,
          getItemNodeFromIndex
        });
      },
      Home: function Home(event) {
        if (!latest.current.state.isOpen) {
          return;
        }
        event.preventDefault();
        dispatch({
          type: InputKeyDownHome,
          getItemNodeFromIndex
        });
      },
      End: function End(event) {
        if (!latest.current.state.isOpen) {
          return;
        }
        event.preventDefault();
        dispatch({
          type: InputKeyDownEnd,
          getItemNodeFromIndex
        });
      },
      Escape: function Escape() {
        var latestState = latest.current.state;
        if (latestState.isOpen || latestState.inputValue || latestState.selectedItem || latestState.highlightedIndex > -1) {
          dispatch({
            type: InputKeyDownEscape
          });
        }
      },
      Enter: function Enter(event) {
        var latestState = latest.current.state;
        if (!latestState.isOpen || latestState.highlightedIndex < 0 || event.which === 229) {
          return;
        }
        event.preventDefault();
        dispatch({
          type: InputKeyDownEnter,
          getItemNodeFromIndex
        });
      }
    };
  }, [dispatch, latest, getItemNodeFromIndex]);
  var getLabelProps = react.useCallback(function(labelProps) {
    return _extends({
      id: elementIds.labelId,
      htmlFor: elementIds.inputId
    }, labelProps);
  }, [elementIds]);
  var getMenuProps = react.useCallback(function(_temp, _temp2) {
    var _extends2;
    var _ref = _temp === void 0 ? {} : _temp, onMouseLeave = _ref.onMouseLeave, _ref$refKey = _ref.refKey, refKey = _ref$refKey === void 0 ? "ref" : _ref$refKey, ref = _ref.ref, rest = _objectWithoutPropertiesLoose(_ref, _excluded$1);
    var _ref2 = _temp2 === void 0 ? {} : _temp2, _ref2$suppressRefErro = _ref2.suppressRefError;
    return _extends((_extends2 = {}, _extends2[refKey] = handleRefs(ref, function(menuNode) {
      menuRef.current = menuNode;
    }), _extends2.id = elementIds.menuId, _extends2.role = "listbox", _extends2["aria-labelledby"] = elementIds.labelId, _extends2.onMouseLeave = callAllEventHandlers(onMouseLeave, function() {
      dispatch({
        type: MenuMouseLeave
      });
    }), _extends2), rest);
  }, [dispatch, setGetterPropCallInfo, elementIds]);
  var getItemProps = react.useCallback(function(_temp3) {
    var _extends3, _ref4;
    var _ref3 = _temp3 === void 0 ? {} : _temp3, item = _ref3.item, index = _ref3.index, _ref3$refKey = _ref3.refKey, refKey = _ref3$refKey === void 0 ? "ref" : _ref3$refKey, ref = _ref3.ref, onMouseMove = _ref3.onMouseMove, onClick = _ref3.onClick;
    _ref3.onPress;
    var rest = _objectWithoutPropertiesLoose(_ref3, _excluded2$1);
    var _latest$current = latest.current, latestProps = _latest$current.props, latestState = _latest$current.state;
    var itemIndex = getItemIndex(index, item, latestProps.items);
    if (itemIndex < 0) {
      throw new Error("Pass either item or item index in getItemProps!");
    }
    var onSelectKey = "onClick";
    var customClickHandler = onClick;
    var itemHandleMouseMove = function itemHandleMouseMove2() {
      if (index === latestState.highlightedIndex) {
        return;
      }
      shouldScrollRef.current = false;
      dispatch({
        type: ItemMouseMove,
        index
      });
    };
    var itemHandleClick = function itemHandleClick2() {
      dispatch({
        type: ItemClick,
        index
      });
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    return _extends((_extends3 = {}, _extends3[refKey] = handleRefs(ref, function(itemNode) {
      if (itemNode) {
        itemRefs.current[elementIds.getItemId(itemIndex)] = itemNode;
      }
    }), _extends3.role = "option", _extends3["aria-selected"] = "" + (itemIndex === latestState.highlightedIndex), _extends3.id = elementIds.getItemId(itemIndex), _extends3), !rest.disabled && (_ref4 = {
      onMouseMove: callAllEventHandlers(onMouseMove, itemHandleMouseMove)
    }, _ref4[onSelectKey] = callAllEventHandlers(customClickHandler, itemHandleClick), _ref4), rest);
  }, [dispatch, latest, shouldScrollRef, elementIds]);
  var getToggleButtonProps = react.useCallback(function(_temp4) {
    var _extends4;
    var _ref5 = _temp4 === void 0 ? {} : _temp4, onClick = _ref5.onClick;
    _ref5.onPress;
    var _ref5$refKey = _ref5.refKey, refKey = _ref5$refKey === void 0 ? "ref" : _ref5$refKey, ref = _ref5.ref, rest = _objectWithoutPropertiesLoose(_ref5, _excluded3);
    var toggleButtonHandleClick = function toggleButtonHandleClick2() {
      dispatch({
        type: ToggleButtonClick
      });
      if (!latest.current.state.isOpen && inputRef.current) {
        inputRef.current.focus();
      }
    };
    return _extends((_extends4 = {}, _extends4[refKey] = handleRefs(ref, function(toggleButtonNode) {
      toggleButtonRef.current = toggleButtonNode;
    }), _extends4.id = elementIds.toggleButtonId, _extends4.tabIndex = -1, _extends4), !rest.disabled && _extends({}, {
      onClick: callAllEventHandlers(onClick, toggleButtonHandleClick)
    }), rest);
  }, [dispatch, latest, elementIds]);
  var getInputProps = react.useCallback(function(_temp5, _temp6) {
    var _extends5;
    var _ref6 = _temp5 === void 0 ? {} : _temp5, onKeyDown = _ref6.onKeyDown, onChange = _ref6.onChange, onInput = _ref6.onInput, onBlur = _ref6.onBlur;
    _ref6.onChangeText;
    var _ref6$refKey = _ref6.refKey, refKey = _ref6$refKey === void 0 ? "ref" : _ref6$refKey, ref = _ref6.ref, rest = _objectWithoutPropertiesLoose(_ref6, _excluded4);
    var _ref7 = _temp6 === void 0 ? {} : _temp6, _ref7$suppressRefErro = _ref7.suppressRefError;
    var latestState = latest.current.state;
    var inputHandleKeyDown = function inputHandleKeyDown2(event) {
      var key = normalizeArrowKey(event);
      if (key && inputKeyDownHandlers[key]) {
        inputKeyDownHandlers[key](event);
      }
    };
    var inputHandleChange = function inputHandleChange2(event) {
      dispatch({
        type: InputChange,
        inputValue: event.target.value
      });
    };
    var inputHandleBlur = function inputHandleBlur2() {
      if (latestState.isOpen && !mouseAndTouchTrackersRef.current.isMouseDown) {
        dispatch({
          type: InputBlur,
          selectItem: true
        });
      }
    };
    var onChangeKey = "onChange";
    var eventHandlers = {};
    if (!rest.disabled) {
      var _eventHandlers;
      eventHandlers = (_eventHandlers = {}, _eventHandlers[onChangeKey] = callAllEventHandlers(onChange, onInput, inputHandleChange), _eventHandlers.onKeyDown = callAllEventHandlers(onKeyDown, inputHandleKeyDown), _eventHandlers.onBlur = callAllEventHandlers(onBlur, inputHandleBlur), _eventHandlers);
    }
    return _extends((_extends5 = {}, _extends5[refKey] = handleRefs(ref, function(inputNode) {
      inputRef.current = inputNode;
    }), _extends5.id = elementIds.inputId, _extends5["aria-autocomplete"] = "list", _extends5["aria-controls"] = elementIds.menuId, _extends5), latestState.isOpen && latestState.highlightedIndex > -1 && {
      "aria-activedescendant": elementIds.getItemId(latestState.highlightedIndex)
    }, {
      "aria-labelledby": elementIds.labelId,
      autoComplete: "off",
      value: latestState.inputValue
    }, eventHandlers, rest);
  }, [dispatch, inputKeyDownHandlers, latest, mouseAndTouchTrackersRef, setGetterPropCallInfo, elementIds]);
  var getComboboxProps = react.useCallback(function(_temp7, _temp8) {
    var _extends6;
    var _ref8 = _temp7 === void 0 ? {} : _temp7, _ref8$refKey = _ref8.refKey, refKey = _ref8$refKey === void 0 ? "ref" : _ref8$refKey, ref = _ref8.ref, rest = _objectWithoutPropertiesLoose(_ref8, _excluded5);
    var _ref9 = _temp8 === void 0 ? {} : _temp8, _ref9$suppressRefErro = _ref9.suppressRefError;
    return _extends((_extends6 = {}, _extends6[refKey] = handleRefs(ref, function(comboboxNode) {
      comboboxRef.current = comboboxNode;
    }), _extends6.role = "combobox", _extends6["aria-haspopup"] = "listbox", _extends6["aria-owns"] = elementIds.menuId, _extends6["aria-expanded"] = latest.current.state.isOpen, _extends6), rest);
  }, [latest, setGetterPropCallInfo, elementIds]);
  var toggleMenu = react.useCallback(function() {
    dispatch({
      type: FunctionToggleMenu
    });
  }, [dispatch]);
  var closeMenu = react.useCallback(function() {
    dispatch({
      type: FunctionCloseMenu
    });
  }, [dispatch]);
  var openMenu = react.useCallback(function() {
    dispatch({
      type: FunctionOpenMenu
    });
  }, [dispatch]);
  var setHighlightedIndex = react.useCallback(function(newHighlightedIndex) {
    dispatch({
      type: FunctionSetHighlightedIndex,
      highlightedIndex: newHighlightedIndex
    });
  }, [dispatch]);
  var selectItem = react.useCallback(function(newSelectedItem) {
    dispatch({
      type: FunctionSelectItem,
      selectedItem: newSelectedItem
    });
  }, [dispatch]);
  var setInputValue = react.useCallback(function(newInputValue) {
    dispatch({
      type: FunctionSetInputValue,
      inputValue: newInputValue
    });
  }, [dispatch]);
  var reset = react.useCallback(function() {
    dispatch({
      type: FunctionReset$1
    });
  }, [dispatch]);
  return {
    getItemProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getToggleButtonProps,
    toggleMenu,
    openMenu,
    closeMenu,
    setHighlightedIndex,
    setInputValue,
    selectItem,
    reset,
    highlightedIndex,
    isOpen,
    selectedItem,
    inputValue
  };
}
var propTypes = {
  selectedItems: propTypes$3.array,
  initialSelectedItems: propTypes$3.array,
  defaultSelectedItems: propTypes$3.array,
  itemToString: propTypes$3.func,
  getA11yRemovalMessage: propTypes$3.func,
  stateReducer: propTypes$3.func,
  activeIndex: propTypes$3.number,
  initialActiveIndex: propTypes$3.number,
  defaultActiveIndex: propTypes$3.number,
  onActiveIndexChange: propTypes$3.func,
  onSelectedItemsChange: propTypes$3.func,
  keyNavigationNext: propTypes$3.string,
  keyNavigationPrevious: propTypes$3.string,
  environment: propTypes$3.shape({
    addEventListener: propTypes$3.func,
    removeEventListener: propTypes$3.func,
    document: propTypes$3.shape({
      getElementById: propTypes$3.func,
      activeElement: propTypes$3.any,
      body: propTypes$3.any
    })
  })
};
export {useCombobox};
