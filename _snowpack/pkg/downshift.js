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
let idCounter = 0;
function noop() {
}
function scrollIntoView(node, menuNode) {
  if (!node) {
    return;
  }
  const actions = computeScrollIntoView(node, {
    boundary: menuNode,
    block: "nearest",
    scrollMode: "if-needed"
  });
  actions.forEach((_ref) => {
    let {
      el,
      top,
      left
    } = _ref;
    el.scrollTop = top;
    el.scrollLeft = left;
  });
}
function isOrContainsNode(parent, child, environment) {
  const result = parent === child || child instanceof environment.Node && parent.contains && parent.contains(child);
  return result;
}
function debounce(fn, time) {
  let timeoutId;
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
    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn(...args);
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
    return fns.some((fn) => {
      if (fn) {
        fn(event, ...args);
      }
      return event.preventDownshiftDefault || event.hasOwnProperty("nativeEvent") && event.nativeEvent.preventDownshiftDefault;
    });
  };
}
function handleRefs() {
  for (var _len4 = arguments.length, refs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    refs[_key4] = arguments[_key4];
  }
  return (node) => {
    refs.forEach((ref) => {
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
  let {
    isOpen,
    resultCount,
    previousResultCount
  } = _ref2;
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
  return Object.keys(state).reduce((prevState, key) => {
    prevState[key] = isControlledProp(props, key) ? props[key] : state[key];
    return prevState;
  }, {});
}
function isControlledProp(props, key) {
  return props[key] !== void 0;
}
function normalizeArrowKey(event) {
  const {
    key,
    keyCode
  } = event;
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
  const itemsLastIndex = itemCount - 1;
  if (typeof baseIndex !== "number" || baseIndex < 0 || baseIndex >= itemCount) {
    baseIndex = moveAmount > 0 ? -1 : itemsLastIndex + 1;
  }
  let newIndex = baseIndex + moveAmount;
  if (newIndex < 0) {
    newIndex = circular ? itemsLastIndex : 0;
  } else if (newIndex > itemsLastIndex) {
    newIndex = circular ? 0 : itemsLastIndex;
  }
  const nonDisabledNewIndex = getNextNonDisabledIndex(moveAmount, newIndex, itemCount, getItemNodeFromIndex, circular);
  if (nonDisabledNewIndex === -1) {
    return baseIndex >= itemCount ? -1 : baseIndex;
  }
  return nonDisabledNewIndex;
}
function getNextNonDisabledIndex(moveAmount, baseIndex, itemCount, getItemNodeFromIndex, circular) {
  const currentElementNode = getItemNodeFromIndex(baseIndex);
  if (!currentElementNode || !currentElementNode.hasAttribute("disabled")) {
    return baseIndex;
  }
  if (moveAmount > 0) {
    for (let index = baseIndex + 1; index < itemCount; index++) {
      if (!getItemNodeFromIndex(index).hasAttribute("disabled")) {
        return index;
      }
    }
  } else {
    for (let index = baseIndex - 1; index >= 0; index--) {
      if (!getItemNodeFromIndex(index).hasAttribute("disabled")) {
        return index;
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
  return downshiftElements.some((contextNode) => contextNode && (isOrContainsNode(contextNode, target, environment) || checkActiveElement && isOrContainsNode(contextNode, environment.document.activeElement, environment)));
}
const cleanupStatus = debounce((documentProp) => {
  getStatusDiv(documentProp).textContent = "";
}, 500);
function setStatus(status, documentProp) {
  const div = getStatusDiv(documentProp);
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
  let statusDiv = documentProp.getElementById("a11y-status-message");
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
const dropdownDefaultStateValues = {
  highlightedIndex: -1,
  isOpen: false,
  selectedItem: null,
  inputValue: ""
};
function callOnChangeProps(action, state, newState) {
  const {
    props,
    type
  } = action;
  const changes = {};
  Object.keys(state).forEach((key) => {
    invokeOnChangeHandler(key, action, state, newState);
    if (newState[key] !== state[key]) {
      changes[key] = newState[key];
    }
  });
  if (props.onStateChange && Object.keys(changes).length) {
    props.onStateChange({
      type,
      ...changes
    });
  }
}
function invokeOnChangeHandler(key, action, state, newState) {
  const {
    props,
    type
  } = action;
  const handler = "on" + capitalizeString(key) + "Change";
  if (props[handler] && newState[key] !== void 0 && newState[key] !== state[key]) {
    props[handler]({
      type,
      ...newState
    });
  }
}
function stateReducer(s, a) {
  return a.changes;
}
function getA11ySelectionMessage(selectionParameters) {
  const {
    selectedItem,
    itemToString: itemToStringLocal
  } = selectionParameters;
  return selectedItem ? itemToStringLocal(selectedItem) + " has been selected." : "";
}
const updateA11yStatus = debounce((getA11yMessage, document2) => {
  setStatus(getA11yMessage(), document2);
}, 200);
const useIsomorphicLayoutEffect = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined" ? react.useLayoutEffect : react.useEffect;
function useElementIds(_ref) {
  let {
    id = "downshift-" + generateId(),
    labelId,
    menuId,
    getItemId,
    toggleButtonId,
    inputId
  } = _ref;
  const elementIdsRef = react.useRef({
    labelId: labelId || id + "-label",
    menuId: menuId || id + "-menu",
    getItemId: getItemId || ((index) => id + "-item-" + index),
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
  const ref = react.useRef(val);
  ref.current = val;
  return ref;
}
function useEnhancedReducer(reducer, initialState, props) {
  const prevStateRef = react.useRef();
  const actionRef = react.useRef();
  const enhancedReducer = react.useCallback((state2, action2) => {
    actionRef.current = action2;
    state2 = getState(state2, action2.props);
    const changes = reducer(state2, action2);
    const newState = action2.props.stateReducer(state2, {
      ...action2,
      changes
    });
    return newState;
  }, [reducer]);
  const [state, dispatch] = react.useReducer(enhancedReducer, initialState);
  const propsRef = useLatestRef(props);
  const dispatchWithProps = react.useCallback((action2) => dispatch({
    props: propsRef.current,
    ...action2
  }), [propsRef]);
  const action = actionRef.current;
  react.useEffect(() => {
    if (action && prevStateRef.current && prevStateRef.current !== state) {
      callOnChangeProps(action, getState(prevStateRef.current, action.props), state);
    }
    prevStateRef.current = state;
  }, [state, props, action]);
  return [state, dispatchWithProps];
}
const defaultProps$3 = {
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
  const defaultValue = props["default" + capitalizeString(propKey)];
  if (defaultValue !== void 0) {
    return defaultValue;
  }
  return defaultStateValues[propKey];
}
function getInitialValue$1(props, propKey, defaultStateValues) {
  if (defaultStateValues === void 0) {
    defaultStateValues = dropdownDefaultStateValues;
  }
  const value = props[propKey];
  if (value !== void 0) {
    return value;
  }
  const initialValue = props["initial" + capitalizeString(propKey)];
  if (initialValue !== void 0) {
    return initialValue;
  }
  return getDefaultValue$1(props, propKey, defaultStateValues);
}
function getInitialState$2(props) {
  const selectedItem = getInitialValue$1(props, "selectedItem");
  const isOpen = getInitialValue$1(props, "isOpen");
  const highlightedIndex = getInitialValue$1(props, "highlightedIndex");
  const inputValue = getInitialValue$1(props, "inputValue");
  return {
    highlightedIndex: highlightedIndex < 0 && selectedItem && isOpen ? props.items.indexOf(selectedItem) : highlightedIndex,
    isOpen,
    selectedItem,
    inputValue
  };
}
function getHighlightedIndexOnOpen(props, state, offset, getItemNodeFromIndex) {
  const {
    items,
    initialHighlightedIndex,
    defaultHighlightedIndex
  } = props;
  const {
    selectedItem,
    highlightedIndex
  } = state;
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
  const mouseAndTouchTrackersRef = react.useRef({
    isMouseDown: false,
    isTouchMove: false
  });
  react.useEffect(() => {
    const onMouseDown = () => {
      mouseAndTouchTrackersRef.current.isMouseDown = true;
    };
    const onMouseUp = (event) => {
      mouseAndTouchTrackersRef.current.isMouseDown = false;
      if (isOpen && !targetWithinDownshift(event.target, downshiftElementRefs.map((ref) => ref.current), environment)) {
        handleBlur();
      }
    };
    const onTouchStart = () => {
      mouseAndTouchTrackersRef.current.isTouchMove = false;
    };
    const onTouchMove = () => {
      mouseAndTouchTrackersRef.current.isTouchMove = true;
    };
    const onTouchEnd = (event) => {
      if (isOpen && !mouseAndTouchTrackersRef.current.isTouchMove && !targetWithinDownshift(event.target, downshiftElementRefs.map((ref) => ref.current), environment, false)) {
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
let useGetterPropsCalledChecker = () => noop;
function useA11yMessageSetter(getA11yMessage, dependencyArray, _ref2) {
  let {
    isInitialMount,
    highlightedIndex,
    items,
    environment,
    ...rest
  } = _ref2;
  react.useEffect(() => {
    if (isInitialMount || false) {
      return;
    }
    updateA11yStatus(() => getA11yMessage({
      highlightedIndex,
      highlightedItem: items[highlightedIndex],
      resultCount: items.length,
      ...rest
    }), environment.document);
  }, dependencyArray);
}
function useScrollIntoView(_ref3) {
  let {
    highlightedIndex,
    isOpen,
    itemRefs,
    getItemNodeFromIndex,
    menuElement,
    scrollIntoView: scrollIntoViewProp
  } = _ref3;
  const shouldScrollRef = react.useRef(true);
  useIsomorphicLayoutEffect(() => {
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
let useControlPropsValidator = noop;
function downshiftCommonReducer(state, action, stateChangeTypes) {
  const {
    type,
    props
  } = action;
  let changes;
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
  return {
    ...state,
    ...changes
  };
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
    return "".concat(resultCount, " result").concat(resultCount === 1 ? " is" : "s are", " available, use up and down arrow keys to navigate. Press Enter or Space Bar keys to select.");
  }
  return "";
}
var defaultProps$2 = __assign(__assign({}, defaultProps$3), {getA11yStatusMessage});
const InputKeyDownArrowDown = 0;
const InputKeyDownArrowUp = 1;
const InputKeyDownEscape = 2;
const InputKeyDownHome = 3;
const InputKeyDownEnd = 4;
const InputKeyDownEnter = 5;
const InputChange = 6;
const InputBlur = 7;
const MenuMouseLeave = 8;
const ItemMouseMove = 9;
const ItemClick = 10;
const ToggleButtonClick = 11;
const FunctionToggleMenu = 12;
const FunctionOpenMenu = 13;
const FunctionCloseMenu = 14;
const FunctionSetHighlightedIndex = 15;
const FunctionSelectItem = 16;
const FunctionSetInputValue = 17;
const FunctionReset$1 = 18;
const ControlledPropUpdatedSelectedItem = 19;
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
  const initialState = getInitialState$2(props);
  const {
    selectedItem
  } = initialState;
  let {
    inputValue
  } = initialState;
  if (inputValue === "" && selectedItem && props.defaultInputValue === void 0 && props.initialInputValue === void 0 && props.inputValue === void 0) {
    inputValue = props.itemToString(selectedItem);
  }
  return {
    ...initialState,
    inputValue
  };
}
const propTypes$1 = {
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
  const previousSelectedItemRef = react.useRef();
  const [state, dispatch] = useEnhancedReducer(reducer, initialState, props);
  react.useEffect(() => {
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
const defaultProps$1 = {
  ...defaultProps$3,
  getA11yStatusMessage: getA11yStatusMessage$1,
  circularNavigation: true
};
function downshiftUseComboboxReducer(state, action) {
  const {
    type,
    props,
    shiftKey
  } = action;
  let changes;
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
      changes = {
        ...state.isOpen && state.highlightedIndex >= 0 && {
          selectedItem: props.items[state.highlightedIndex],
          isOpen: getDefaultValue$1(props, "isOpen"),
          highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
          inputValue: props.itemToString(props.items[state.highlightedIndex])
        }
      };
      break;
    case InputKeyDownEscape:
      changes = {
        isOpen: false,
        highlightedIndex: -1,
        ...!state.isOpen && {
          selectedItem: null,
          inputValue: ""
        }
      };
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
      changes = {
        isOpen: false,
        highlightedIndex: -1,
        ...state.highlightedIndex >= 0 && action.selectItem && {
          selectedItem: props.items[state.highlightedIndex],
          inputValue: props.itemToString(props.items[state.highlightedIndex])
        }
      };
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
  return {
    ...state,
    ...changes
  };
}
useCombobox.stateChangeTypes = stateChangeTypes$1;
function useCombobox(userProps) {
  if (userProps === void 0) {
    userProps = {};
  }
  const props = {
    ...defaultProps$1,
    ...userProps
  };
  const {
    initialIsOpen,
    defaultIsOpen,
    items,
    scrollIntoView: scrollIntoView2,
    environment,
    getA11yStatusMessage: getA11yStatusMessage2,
    getA11ySelectionMessage: getA11ySelectionMessage2,
    itemToString: itemToString2
  } = props;
  const initialState = getInitialState$1(props);
  const [state, dispatch] = useControlledReducer(downshiftUseComboboxReducer, initialState, props);
  const {
    isOpen,
    highlightedIndex,
    selectedItem,
    inputValue
  } = state;
  const menuRef = react.useRef(null);
  const itemRefs = react.useRef({});
  const inputRef = react.useRef(null);
  const toggleButtonRef = react.useRef(null);
  const comboboxRef = react.useRef(null);
  const isInitialMountRef = react.useRef(true);
  const elementIds = useElementIds(props);
  const previousResultCountRef = react.useRef();
  const latest = useLatestRef({
    state,
    props
  });
  const getItemNodeFromIndex = react.useCallback((index) => itemRefs.current[elementIds.getItemId(index)], [elementIds]);
  useA11yMessageSetter(getA11yStatusMessage2, [isOpen, highlightedIndex, inputValue, items], {
    isInitialMount: isInitialMountRef.current,
    previousResultCount: previousResultCountRef.current,
    items,
    environment,
    itemToString: itemToString2,
    ...state
  });
  useA11yMessageSetter(getA11ySelectionMessage2, [selectedItem], {
    isInitialMount: isInitialMountRef.current,
    previousResultCount: previousResultCountRef.current,
    items,
    environment,
    itemToString: itemToString2,
    ...state
  });
  const shouldScrollRef = useScrollIntoView({
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
  react.useEffect(() => {
    const focusOnOpen = initialIsOpen || defaultIsOpen || isOpen;
    if (focusOnOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  react.useEffect(() => {
    if (isInitialMountRef.current) {
      return;
    }
    previousResultCountRef.current = items.length;
  });
  const mouseAndTouchTrackersRef = useMouseAndTouchTracker(isOpen, [comboboxRef, menuRef, toggleButtonRef], environment, () => {
    dispatch({
      type: InputBlur,
      selectItem: false
    });
  });
  const setGetterPropCallInfo = useGetterPropsCalledChecker();
  react.useEffect(() => {
    isInitialMountRef.current = false;
  }, []);
  react.useEffect(() => {
    if (!isOpen) {
      itemRefs.current = {};
    }
  }, [isOpen]);
  const inputKeyDownHandlers = react.useMemo(() => ({
    ArrowDown(event) {
      event.preventDefault();
      dispatch({
        type: InputKeyDownArrowDown,
        shiftKey: event.shiftKey,
        getItemNodeFromIndex
      });
    },
    ArrowUp(event) {
      event.preventDefault();
      dispatch({
        type: InputKeyDownArrowUp,
        shiftKey: event.shiftKey,
        getItemNodeFromIndex
      });
    },
    Home(event) {
      if (!latest.current.state.isOpen) {
        return;
      }
      event.preventDefault();
      dispatch({
        type: InputKeyDownHome,
        getItemNodeFromIndex
      });
    },
    End(event) {
      if (!latest.current.state.isOpen) {
        return;
      }
      event.preventDefault();
      dispatch({
        type: InputKeyDownEnd,
        getItemNodeFromIndex
      });
    },
    Escape() {
      const latestState = latest.current.state;
      if (latestState.isOpen || latestState.inputValue || latestState.selectedItem || latestState.highlightedIndex > -1) {
        dispatch({
          type: InputKeyDownEscape
        });
      }
    },
    Enter(event) {
      const latestState = latest.current.state;
      if (!latestState.isOpen || latestState.highlightedIndex < 0 || event.which === 229) {
        return;
      }
      event.preventDefault();
      dispatch({
        type: InputKeyDownEnter,
        getItemNodeFromIndex
      });
    }
  }), [dispatch, latest, getItemNodeFromIndex]);
  const getLabelProps = react.useCallback((labelProps) => ({
    id: elementIds.labelId,
    htmlFor: elementIds.inputId,
    ...labelProps
  }), [elementIds]);
  const getMenuProps = react.useCallback(function(_temp, _temp2) {
    let {
      onMouseLeave,
      refKey = "ref",
      ref,
      ...rest
    } = _temp === void 0 ? {} : _temp;
    return {
      [refKey]: handleRefs(ref, (menuNode) => {
        menuRef.current = menuNode;
      }),
      id: elementIds.menuId,
      role: "listbox",
      "aria-labelledby": elementIds.labelId,
      onMouseLeave: callAllEventHandlers(onMouseLeave, () => {
        dispatch({
          type: MenuMouseLeave
        });
      }),
      ...rest
    };
  }, [dispatch, setGetterPropCallInfo, elementIds]);
  const getItemProps = react.useCallback(function(_temp3) {
    let {
      item,
      index,
      refKey = "ref",
      ref,
      onMouseMove,
      onClick,
      onPress,
      ...rest
    } = _temp3 === void 0 ? {} : _temp3;
    const {
      props: latestProps,
      state: latestState
    } = latest.current;
    const itemIndex = getItemIndex(index, item, latestProps.items);
    if (itemIndex < 0) {
      throw new Error("Pass either item or item index in getItemProps!");
    }
    const onSelectKey = "onClick";
    const customClickHandler = onClick;
    const itemHandleMouseMove = () => {
      if (index === latestState.highlightedIndex) {
        return;
      }
      shouldScrollRef.current = false;
      dispatch({
        type: ItemMouseMove,
        index
      });
    };
    const itemHandleClick = () => {
      dispatch({
        type: ItemClick,
        index
      });
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    return {
      [refKey]: handleRefs(ref, (itemNode) => {
        if (itemNode) {
          itemRefs.current[elementIds.getItemId(itemIndex)] = itemNode;
        }
      }),
      role: "option",
      "aria-selected": "" + (itemIndex === latestState.highlightedIndex),
      id: elementIds.getItemId(itemIndex),
      ...!rest.disabled && {
        onMouseMove: callAllEventHandlers(onMouseMove, itemHandleMouseMove),
        [onSelectKey]: callAllEventHandlers(customClickHandler, itemHandleClick)
      },
      ...rest
    };
  }, [dispatch, latest, shouldScrollRef, elementIds]);
  const getToggleButtonProps = react.useCallback(function(_temp4) {
    let {
      onClick,
      onPress,
      refKey = "ref",
      ref,
      ...rest
    } = _temp4 === void 0 ? {} : _temp4;
    const toggleButtonHandleClick = () => {
      dispatch({
        type: ToggleButtonClick
      });
      if (!latest.current.state.isOpen && inputRef.current) {
        inputRef.current.focus();
      }
    };
    return {
      [refKey]: handleRefs(ref, (toggleButtonNode) => {
        toggleButtonRef.current = toggleButtonNode;
      }),
      id: elementIds.toggleButtonId,
      tabIndex: -1,
      ...!rest.disabled && {
        ...{
          onClick: callAllEventHandlers(onClick, toggleButtonHandleClick)
        }
      },
      ...rest
    };
  }, [dispatch, latest, elementIds]);
  const getInputProps = react.useCallback(function(_temp5, _temp6) {
    let {
      onKeyDown,
      onChange,
      onInput,
      onBlur,
      onChangeText,
      refKey = "ref",
      ref,
      ...rest
    } = _temp5 === void 0 ? {} : _temp5;
    const latestState = latest.current.state;
    const inputHandleKeyDown = (event) => {
      const key = normalizeArrowKey(event);
      if (key && inputKeyDownHandlers[key]) {
        inputKeyDownHandlers[key](event);
      }
    };
    const inputHandleChange = (event) => {
      dispatch({
        type: InputChange,
        inputValue: event.target.value
      });
    };
    const inputHandleBlur = () => {
      if (latestState.isOpen && !mouseAndTouchTrackersRef.current.isMouseDown) {
        dispatch({
          type: InputBlur,
          selectItem: true
        });
      }
    };
    const onChangeKey = "onChange";
    let eventHandlers = {};
    if (!rest.disabled) {
      eventHandlers = {
        [onChangeKey]: callAllEventHandlers(onChange, onInput, inputHandleChange),
        onKeyDown: callAllEventHandlers(onKeyDown, inputHandleKeyDown),
        onBlur: callAllEventHandlers(onBlur, inputHandleBlur)
      };
    }
    return {
      [refKey]: handleRefs(ref, (inputNode) => {
        inputRef.current = inputNode;
      }),
      id: elementIds.inputId,
      "aria-autocomplete": "list",
      "aria-controls": elementIds.menuId,
      ...latestState.isOpen && latestState.highlightedIndex > -1 && {
        "aria-activedescendant": elementIds.getItemId(latestState.highlightedIndex)
      },
      "aria-labelledby": elementIds.labelId,
      autoComplete: "off",
      value: latestState.inputValue,
      ...eventHandlers,
      ...rest
    };
  }, [dispatch, inputKeyDownHandlers, latest, mouseAndTouchTrackersRef, setGetterPropCallInfo, elementIds]);
  const getComboboxProps = react.useCallback(function(_temp7, _temp8) {
    let {
      refKey = "ref",
      ref,
      ...rest
    } = _temp7 === void 0 ? {} : _temp7;
    return {
      [refKey]: handleRefs(ref, (comboboxNode) => {
        comboboxRef.current = comboboxNode;
      }),
      role: "combobox",
      "aria-haspopup": "listbox",
      "aria-owns": elementIds.menuId,
      "aria-expanded": latest.current.state.isOpen,
      ...rest
    };
  }, [latest, setGetterPropCallInfo, elementIds]);
  const toggleMenu = react.useCallback(() => {
    dispatch({
      type: FunctionToggleMenu
    });
  }, [dispatch]);
  const closeMenu = react.useCallback(() => {
    dispatch({
      type: FunctionCloseMenu
    });
  }, [dispatch]);
  const openMenu = react.useCallback(() => {
    dispatch({
      type: FunctionOpenMenu
    });
  }, [dispatch]);
  const setHighlightedIndex = react.useCallback((newHighlightedIndex) => {
    dispatch({
      type: FunctionSetHighlightedIndex,
      highlightedIndex: newHighlightedIndex
    });
  }, [dispatch]);
  const selectItem = react.useCallback((newSelectedItem) => {
    dispatch({
      type: FunctionSelectItem,
      selectedItem: newSelectedItem
    });
  }, [dispatch]);
  const setInputValue = react.useCallback((newInputValue) => {
    dispatch({
      type: FunctionSetInputValue,
      inputValue: newInputValue
    });
  }, [dispatch]);
  const reset = react.useCallback(() => {
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
const propTypes = {
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
