import {r as react} from "./common/index-86c632b0.js";
import {p as propTypes} from "./common/index-8ab56611.js";
import "./common/_commonjsHelpers-8c19dec8.js";
var getRandomValues = typeof crypto != "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != "undefined" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  }
  return getRandomValues(rnds8);
}
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 256).toString(16).substr(1);
}
function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], "-", bth[buf[i++]], bth[buf[i++]], "-", bth[buf[i++]], bth[buf[i++]], "-", bth[buf[i++]], bth[buf[i++]], "-", bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join("");
}
function v4(options, buf, offset) {
  var i = buf && offset || 0;
  if (typeof options == "string") {
    buf = options === "binary" ? new Array(16) : null;
    options = null;
  }
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }
  return buf || bytesToUuid(rnds);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _extends() {
  _extends = Object.assign || function(target) {
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
function ownKeys(object, enumerableOnly) {
  var keys3 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys3.push.apply(keys3, symbols);
  }
  return keys3;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _possibleConstructorReturn(self2, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self2);
}
var CONSTANT = {
  GLOBAL: {
    HIDE: "__react_tooltip_hide_event",
    REBUILD: "__react_tooltip_rebuild_event",
    SHOW: "__react_tooltip_show_event"
  }
};
var dispatchGlobalEvent = function dispatchGlobalEvent2(eventName, opts) {
  var event;
  if (typeof window.CustomEvent === "function") {
    event = new window.CustomEvent(eventName, {
      detail: opts
    });
  } else {
    event = document.createEvent("Event");
    event.initEvent(eventName, false, true, opts);
  }
  window.dispatchEvent(event);
};
function staticMethods(target) {
  target.hide = function(target2) {
    dispatchGlobalEvent(CONSTANT.GLOBAL.HIDE, {
      target: target2
    });
  };
  target.rebuild = function() {
    dispatchGlobalEvent(CONSTANT.GLOBAL.REBUILD);
  };
  target.show = function(target2) {
    dispatchGlobalEvent(CONSTANT.GLOBAL.SHOW, {
      target: target2
    });
  };
  target.prototype.globalRebuild = function() {
    if (this.mount) {
      this.unbindListener();
      this.bindListener();
    }
  };
  target.prototype.globalShow = function(event) {
    if (this.mount) {
      var hasTarget = event && event.detail && event.detail.target && true || false;
      this.showTooltip({
        currentTarget: hasTarget && event.detail.target
      }, true);
    }
  };
  target.prototype.globalHide = function(event) {
    if (this.mount) {
      var hasTarget = event && event.detail && event.detail.target && true || false;
      this.hideTooltip({
        currentTarget: hasTarget && event.detail.target
      }, hasTarget);
    }
  };
}
function windowListener(target) {
  target.prototype.bindWindowEvents = function(resizeHide) {
    window.removeEventListener(CONSTANT.GLOBAL.HIDE, this.globalHide);
    window.addEventListener(CONSTANT.GLOBAL.HIDE, this.globalHide, false);
    window.removeEventListener(CONSTANT.GLOBAL.REBUILD, this.globalRebuild);
    window.addEventListener(CONSTANT.GLOBAL.REBUILD, this.globalRebuild, false);
    window.removeEventListener(CONSTANT.GLOBAL.SHOW, this.globalShow);
    window.addEventListener(CONSTANT.GLOBAL.SHOW, this.globalShow, false);
    if (resizeHide) {
      window.removeEventListener("resize", this.onWindowResize);
      window.addEventListener("resize", this.onWindowResize, false);
    }
  };
  target.prototype.unbindWindowEvents = function() {
    window.removeEventListener(CONSTANT.GLOBAL.HIDE, this.globalHide);
    window.removeEventListener(CONSTANT.GLOBAL.REBUILD, this.globalRebuild);
    window.removeEventListener(CONSTANT.GLOBAL.SHOW, this.globalShow);
    window.removeEventListener("resize", this.onWindowResize);
  };
  target.prototype.onWindowResize = function() {
    if (!this.mount)
      return;
    this.hideTooltip();
  };
}
var checkStatus = function checkStatus2(dataEventOff, e) {
  var show = this.state.show;
  var id2 = this.props.id;
  var isCapture2 = this.isCapture(e.currentTarget);
  var currentItem = e.currentTarget.getAttribute("currentItem");
  if (!isCapture2)
    e.stopPropagation();
  if (show && currentItem === "true") {
    if (!dataEventOff)
      this.hideTooltip(e);
  } else {
    e.currentTarget.setAttribute("currentItem", "true");
    setUntargetItems(e.currentTarget, this.getTargetArray(id2));
    this.showTooltip(e);
  }
};
var setUntargetItems = function setUntargetItems2(currentTarget, targetArray) {
  for (var i = 0; i < targetArray.length; i++) {
    if (currentTarget !== targetArray[i]) {
      targetArray[i].setAttribute("currentItem", "false");
    } else {
      targetArray[i].setAttribute("currentItem", "true");
    }
  }
};
var customListeners = {
  id: "9b69f92e-d3fe-498b-b1b4-c5e63a51b0cf",
  set: function set(target, event, listener) {
    if (this.id in target) {
      var map = target[this.id];
      map[event] = listener;
    } else {
      Object.defineProperty(target, this.id, {
        configurable: true,
        value: _defineProperty({}, event, listener)
      });
    }
  },
  get: function get(target, event) {
    var map = target[this.id];
    if (map !== void 0) {
      return map[event];
    }
  }
};
function customEvent(target) {
  target.prototype.isCustomEvent = function(ele) {
    var event = this.state.event;
    return event || !!ele.getAttribute("data-event");
  };
  target.prototype.customBindListener = function(ele) {
    var _this = this;
    var _this$state = this.state, event = _this$state.event, eventOff = _this$state.eventOff;
    var dataEvent = ele.getAttribute("data-event") || event;
    var dataEventOff = ele.getAttribute("data-event-off") || eventOff;
    dataEvent.split(" ").forEach(function(event2) {
      ele.removeEventListener(event2, customListeners.get(ele, event2));
      var customListener = checkStatus.bind(_this, dataEventOff);
      customListeners.set(ele, event2, customListener);
      ele.addEventListener(event2, customListener, false);
    });
    if (dataEventOff) {
      dataEventOff.split(" ").forEach(function(event2) {
        ele.removeEventListener(event2, _this.hideTooltip);
        ele.addEventListener(event2, _this.hideTooltip, false);
      });
    }
  };
  target.prototype.customUnbindListener = function(ele) {
    var _this$state2 = this.state, event = _this$state2.event, eventOff = _this$state2.eventOff;
    var dataEvent = event || ele.getAttribute("data-event");
    var dataEventOff = eventOff || ele.getAttribute("data-event-off");
    ele.removeEventListener(dataEvent, customListeners.get(ele, event));
    if (dataEventOff)
      ele.removeEventListener(dataEventOff, this.hideTooltip);
  };
}
function isCapture(target) {
  target.prototype.isCapture = function(currentTarget) {
    return currentTarget && currentTarget.getAttribute("data-iscapture") === "true" || this.props.isCapture || false;
  };
}
function getEffect(target) {
  target.prototype.getEffect = function(currentTarget) {
    var dataEffect = currentTarget.getAttribute("data-effect");
    return dataEffect || this.props.effect || "float";
  };
}
var makeProxy = function makeProxy2(e) {
  var proxy = {};
  for (var key in e) {
    if (typeof e[key] === "function") {
      proxy[key] = e[key].bind(e);
    } else {
      proxy[key] = e[key];
    }
  }
  return proxy;
};
var bodyListener = function bodyListener2(callback, options, e) {
  var _options$respectEffec = options.respectEffect, respectEffect = _options$respectEffec === void 0 ? false : _options$respectEffec, _options$customEvent = options.customEvent, customEvent2 = _options$customEvent === void 0 ? false : _options$customEvent;
  var id2 = this.props.id;
  var tip = e.target.getAttribute("data-tip") || null;
  var forId = e.target.getAttribute("data-for") || null;
  var target = e.target;
  if (this.isCustomEvent(target) && !customEvent2) {
    return;
  }
  var isTargetBelongsToTooltip = id2 == null && forId == null || forId === id2;
  if (tip != null && (!respectEffect || this.getEffect(target) === "float") && isTargetBelongsToTooltip) {
    var proxy = makeProxy(e);
    proxy.currentTarget = target;
    callback(proxy);
  }
};
var findCustomEvents = function findCustomEvents2(targetArray, dataAttribute) {
  var events = {};
  targetArray.forEach(function(target) {
    var event = target.getAttribute(dataAttribute);
    if (event)
      event.split(" ").forEach(function(event2) {
        return events[event2] = true;
      });
  });
  return events;
};
var getBody = function getBody2() {
  return document.getElementsByTagName("body")[0];
};
function bodyMode(target) {
  target.prototype.isBodyMode = function() {
    return !!this.props.bodyMode;
  };
  target.prototype.bindBodyListener = function(targetArray) {
    var _this = this;
    var _this$state = this.state, event = _this$state.event, eventOff = _this$state.eventOff, possibleCustomEvents = _this$state.possibleCustomEvents, possibleCustomEventsOff = _this$state.possibleCustomEventsOff;
    var body = getBody();
    var customEvents = findCustomEvents(targetArray, "data-event");
    var customEventsOff = findCustomEvents(targetArray, "data-event-off");
    if (event != null)
      customEvents[event] = true;
    if (eventOff != null)
      customEventsOff[eventOff] = true;
    possibleCustomEvents.split(" ").forEach(function(event2) {
      return customEvents[event2] = true;
    });
    possibleCustomEventsOff.split(" ").forEach(function(event2) {
      return customEventsOff[event2] = true;
    });
    this.unbindBodyListener(body);
    var listeners = this.bodyModeListeners = {};
    if (event == null) {
      listeners.mouseover = bodyListener.bind(this, this.showTooltip, {});
      listeners.mousemove = bodyListener.bind(this, this.updateTooltip, {
        respectEffect: true
      });
      listeners.mouseout = bodyListener.bind(this, this.hideTooltip, {});
    }
    for (var _event in customEvents) {
      listeners[_event] = bodyListener.bind(this, function(e) {
        var targetEventOff = e.currentTarget.getAttribute("data-event-off") || eventOff;
        checkStatus.call(_this, targetEventOff, e);
      }, {
        customEvent: true
      });
    }
    for (var _event2 in customEventsOff) {
      listeners[_event2] = bodyListener.bind(this, this.hideTooltip, {
        customEvent: true
      });
    }
    for (var _event3 in listeners) {
      body.addEventListener(_event3, listeners[_event3]);
    }
  };
  target.prototype.unbindBodyListener = function(body) {
    body = body || getBody();
    var listeners = this.bodyModeListeners;
    for (var event in listeners) {
      body.removeEventListener(event, listeners[event]);
    }
  };
}
var getMutationObserverClass = function getMutationObserverClass2() {
  return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
};
function trackRemoval(target) {
  target.prototype.bindRemovalTracker = function() {
    var _this = this;
    var MutationObserver = getMutationObserverClass();
    if (MutationObserver == null)
      return;
    var observer = new MutationObserver(function(mutations) {
      for (var m1 = 0; m1 < mutations.length; m1++) {
        var mutation = mutations[m1];
        for (var m2 = 0; m2 < mutation.removedNodes.length; m2++) {
          var element = mutation.removedNodes[m2];
          if (element === _this.state.currentTarget) {
            _this.hideTooltip();
            return;
          }
        }
      }
    });
    observer.observe(window.document, {
      childList: true,
      subtree: true
    });
    this.removalTracker = observer;
  };
  target.prototype.unbindRemovalTracker = function() {
    if (this.removalTracker) {
      this.removalTracker.disconnect();
      this.removalTracker = null;
    }
  };
}
function getPosition(e, target, node, place, desiredPlace, effect, offset) {
  var _getDimensions = getDimensions(node), tipWidth = _getDimensions.width, tipHeight = _getDimensions.height;
  var _getDimensions2 = getDimensions(target), targetWidth = _getDimensions2.width, targetHeight = _getDimensions2.height;
  var _getCurrentOffset = getCurrentOffset(e, target, effect), mouseX = _getCurrentOffset.mouseX, mouseY = _getCurrentOffset.mouseY;
  var defaultOffset = getDefaultPosition(effect, targetWidth, targetHeight, tipWidth, tipHeight);
  var _calculateOffset = calculateOffset(offset), extraOffsetX = _calculateOffset.extraOffsetX, extraOffsetY = _calculateOffset.extraOffsetY;
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var _getParent = getParent(node), parentTop = _getParent.parentTop, parentLeft = _getParent.parentLeft;
  var getTipOffsetLeft = function getTipOffsetLeft2(place2) {
    var offsetX = defaultOffset[place2].l;
    return mouseX + offsetX + extraOffsetX;
  };
  var getTipOffsetRight = function getTipOffsetRight2(place2) {
    var offsetX = defaultOffset[place2].r;
    return mouseX + offsetX + extraOffsetX;
  };
  var getTipOffsetTop = function getTipOffsetTop2(place2) {
    var offsetY = defaultOffset[place2].t;
    return mouseY + offsetY + extraOffsetY;
  };
  var getTipOffsetBottom = function getTipOffsetBottom2(place2) {
    var offsetY = defaultOffset[place2].b;
    return mouseY + offsetY + extraOffsetY;
  };
  var outsideLeft = function outsideLeft2(p2) {
    return getTipOffsetLeft(p2) < 0;
  };
  var outsideRight = function outsideRight2(p2) {
    return getTipOffsetRight(p2) > windowWidth;
  };
  var outsideTop = function outsideTop2(p2) {
    return getTipOffsetTop(p2) < 0;
  };
  var outsideBottom = function outsideBottom2(p2) {
    return getTipOffsetBottom(p2) > windowHeight;
  };
  var outside = function outside2(p2) {
    return outsideLeft(p2) || outsideRight(p2) || outsideTop(p2) || outsideBottom(p2);
  };
  var inside = function inside2(p2) {
    return !outside(p2);
  };
  var placesList = ["top", "bottom", "left", "right"];
  var insideList = [];
  for (var i = 0; i < 4; i++) {
    var p = placesList[i];
    if (inside(p)) {
      insideList.push(p);
    }
  }
  var isNewState = false;
  var newPlace;
  var shouldUpdatePlace = desiredPlace !== place;
  if (inside(desiredPlace) && shouldUpdatePlace) {
    isNewState = true;
    newPlace = desiredPlace;
  } else if (insideList.length > 0 && outside(desiredPlace) && outside(place)) {
    isNewState = true;
    newPlace = insideList[0];
  }
  if (isNewState) {
    return {
      isNewState: true,
      newState: {
        place: newPlace
      }
    };
  }
  return {
    isNewState: false,
    position: {
      left: parseInt(getTipOffsetLeft(place) - parentLeft, 10),
      top: parseInt(getTipOffsetTop(place) - parentTop, 10)
    }
  };
}
var getDimensions = function getDimensions2(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(), height = _node$getBoundingClie.height, width = _node$getBoundingClie.width;
  return {
    height: parseInt(height, 10),
    width: parseInt(width, 10)
  };
};
var getCurrentOffset = function getCurrentOffset2(e, currentTarget, effect) {
  var boundingClientRect = currentTarget.getBoundingClientRect();
  var targetTop = boundingClientRect.top;
  var targetLeft = boundingClientRect.left;
  var _getDimensions3 = getDimensions(currentTarget), targetWidth = _getDimensions3.width, targetHeight = _getDimensions3.height;
  if (effect === "float") {
    return {
      mouseX: e.clientX,
      mouseY: e.clientY
    };
  }
  return {
    mouseX: targetLeft + targetWidth / 2,
    mouseY: targetTop + targetHeight / 2
  };
};
var getDefaultPosition = function getDefaultPosition2(effect, targetWidth, targetHeight, tipWidth, tipHeight) {
  var top;
  var right;
  var bottom;
  var left;
  var disToMouse = 3;
  var triangleHeight = 2;
  var cursorHeight = 12;
  if (effect === "float") {
    top = {
      l: -(tipWidth / 2),
      r: tipWidth / 2,
      t: -(tipHeight + disToMouse + triangleHeight),
      b: -disToMouse
    };
    bottom = {
      l: -(tipWidth / 2),
      r: tipWidth / 2,
      t: disToMouse + cursorHeight,
      b: tipHeight + disToMouse + triangleHeight + cursorHeight
    };
    left = {
      l: -(tipWidth + disToMouse + triangleHeight),
      r: -disToMouse,
      t: -(tipHeight / 2),
      b: tipHeight / 2
    };
    right = {
      l: disToMouse,
      r: tipWidth + disToMouse + triangleHeight,
      t: -(tipHeight / 2),
      b: tipHeight / 2
    };
  } else if (effect === "solid") {
    top = {
      l: -(tipWidth / 2),
      r: tipWidth / 2,
      t: -(targetHeight / 2 + tipHeight + triangleHeight),
      b: -(targetHeight / 2)
    };
    bottom = {
      l: -(tipWidth / 2),
      r: tipWidth / 2,
      t: targetHeight / 2,
      b: targetHeight / 2 + tipHeight + triangleHeight
    };
    left = {
      l: -(tipWidth + targetWidth / 2 + triangleHeight),
      r: -(targetWidth / 2),
      t: -(tipHeight / 2),
      b: tipHeight / 2
    };
    right = {
      l: targetWidth / 2,
      r: tipWidth + targetWidth / 2 + triangleHeight,
      t: -(tipHeight / 2),
      b: tipHeight / 2
    };
  }
  return {
    top,
    bottom,
    left,
    right
  };
};
var calculateOffset = function calculateOffset2(offset) {
  var extraOffsetX = 0;
  var extraOffsetY = 0;
  if (Object.prototype.toString.apply(offset) === "[object String]") {
    offset = JSON.parse(offset.toString().replace(/'/g, '"'));
  }
  for (var key in offset) {
    if (key === "top") {
      extraOffsetY -= parseInt(offset[key], 10);
    } else if (key === "bottom") {
      extraOffsetY += parseInt(offset[key], 10);
    } else if (key === "left") {
      extraOffsetX -= parseInt(offset[key], 10);
    } else if (key === "right") {
      extraOffsetX += parseInt(offset[key], 10);
    }
  }
  return {
    extraOffsetX,
    extraOffsetY
  };
};
var getParent = function getParent2(currentTarget) {
  var currentParent = currentTarget;
  while (currentParent) {
    var computedStyle = window.getComputedStyle(currentParent);
    if (computedStyle.getPropertyValue("transform") !== "none" || computedStyle.getPropertyValue("will-change") === "transform")
      break;
    currentParent = currentParent.parentElement;
  }
  var parentTop = currentParent && currentParent.getBoundingClientRect().top || 0;
  var parentLeft = currentParent && currentParent.getBoundingClientRect().left || 0;
  return {
    parentTop,
    parentLeft
  };
};
function getTipContent(tip, children, getContent, multiline) {
  if (children)
    return children;
  if (getContent !== void 0 && getContent !== null)
    return getContent;
  if (getContent === null)
    return null;
  var regexp = /<br\s*\/?>/;
  if (!multiline || multiline === "false" || !regexp.test(tip)) {
    return tip;
  }
  return tip.split(regexp).map(function(d, i) {
    return react.createElement("span", {
      key: i,
      className: "multi-line"
    }, d);
  });
}
function parseAria(props) {
  var ariaObj = {};
  Object.keys(props).filter(function(prop) {
    return /(^aria-\w+$|^role$)/.test(prop);
  }).forEach(function(prop) {
    ariaObj[prop] = props[prop];
  });
  return ariaObj;
}
function nodeListToArray(nodeList) {
  var length = nodeList.length;
  if (nodeList.hasOwnProperty) {
    return Array.prototype.slice.call(nodeList);
  }
  return new Array(length).fill().map(function(index) {
    return nodeList[index];
  });
}
function generateUUID() {
  return "t" + v4();
}
var baseCss = '.__react_component_tooltip {\n  border-radius: 3px;\n  display: inline-block;\n  font-size: 13px;\n  left: -999em;\n  opacity: 0;\n  padding: 8px 21px;\n  position: fixed;\n  pointer-events: none;\n  transition: opacity 0.3s ease-out;\n  top: -999em;\n  visibility: hidden;\n  z-index: 999;\n}\n.__react_component_tooltip.allow_hover, .__react_component_tooltip.allow_click {\n  pointer-events: auto;\n}\n.__react_component_tooltip::before, .__react_component_tooltip::after {\n  content: "";\n  width: 0;\n  height: 0;\n  position: absolute;\n}\n.__react_component_tooltip.show {\n  opacity: 0.9;\n  margin-top: 0;\n  margin-left: 0;\n  visibility: visible;\n}\n.__react_component_tooltip.place-top::before {\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n  bottom: -8px;\n  left: 50%;\n  margin-left: -10px;\n}\n.__react_component_tooltip.place-bottom::before {\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n  top: -8px;\n  left: 50%;\n  margin-left: -10px;\n}\n.__react_component_tooltip.place-left::before {\n  border-top: 6px solid transparent;\n  border-bottom: 6px solid transparent;\n  right: -8px;\n  top: 50%;\n  margin-top: -5px;\n}\n.__react_component_tooltip.place-right::before {\n  border-top: 6px solid transparent;\n  border-bottom: 6px solid transparent;\n  left: -8px;\n  top: 50%;\n  margin-top: -5px;\n}\n.__react_component_tooltip .multi-line {\n  display: block;\n  padding: 2px 0;\n  text-align: center;\n}';
var defaultColors = {
  dark: {
    text: "#fff",
    background: "#222",
    border: "transparent",
    arrow: "#222"
  },
  success: {
    text: "#fff",
    background: "#8DC572",
    border: "transparent",
    arrow: "#8DC572"
  },
  warning: {
    text: "#fff",
    background: "#F0AD4E",
    border: "transparent",
    arrow: "#F0AD4E"
  },
  error: {
    text: "#fff",
    background: "#BE6464",
    border: "transparent",
    arrow: "#BE6464"
  },
  info: {
    text: "#fff",
    background: "#337AB7",
    border: "transparent",
    arrow: "#337AB7"
  },
  light: {
    text: "#222",
    background: "#fff",
    border: "transparent",
    arrow: "#fff"
  }
};
function getDefaultPopupColors(type) {
  return defaultColors[type] ? _objectSpread2({}, defaultColors[type]) : void 0;
}
function generateTooltipStyle(uuid, customColors, type, hasBorder) {
  return generateStyle(uuid, getPopupColors(customColors, type, hasBorder));
}
function generateStyle(uuid, colors) {
  var textColor = colors.text;
  var backgroundColor = colors.background;
  var borderColor = colors.border;
  var arrowColor = colors.arrow;
  return "\n  	.".concat(uuid, " {\n	    color: ").concat(textColor, ";\n	    background: ").concat(backgroundColor, ";\n	    border: 1px solid ").concat(borderColor, ";\n  	}\n\n  	.").concat(uuid, ".place-top {\n        margin-top: -10px;\n    }\n    .").concat(uuid, ".place-top::before {\n        border-top: 8px solid ").concat(borderColor, ";\n    }\n    .").concat(uuid, ".place-top::after {\n        border-left: 8px solid transparent;\n        border-right: 8px solid transparent;\n        bottom: -6px;\n        left: 50%;\n        margin-left: -8px;\n        border-top-color: ").concat(arrowColor, ";\n        border-top-style: solid;\n        border-top-width: 6px;\n    }\n\n    .").concat(uuid, ".place-bottom {\n        margin-top: 10px;\n    }\n    .").concat(uuid, ".place-bottom::before {\n        border-bottom: 8px solid ").concat(borderColor, ";\n    }\n    .").concat(uuid, ".place-bottom::after {\n        border-left: 8px solid transparent;\n        border-right: 8px solid transparent;\n        top: -6px;\n        left: 50%;\n        margin-left: -8px;\n        border-bottom-color: ").concat(arrowColor, ";\n        border-bottom-style: solid;\n        border-bottom-width: 6px;\n    }\n\n    .").concat(uuid, ".place-left {\n        margin-left: -10px;\n    }\n    .").concat(uuid, ".place-left::before {\n        border-left: 8px solid ").concat(borderColor, ";\n    }\n    .").concat(uuid, ".place-left::after {\n        border-top: 5px solid transparent;\n        border-bottom: 5px solid transparent;\n        right: -6px;\n        top: 50%;\n        margin-top: -4px;\n        border-left-color: ").concat(arrowColor, ";\n        border-left-style: solid;\n        border-left-width: 6px;\n    }\n\n    .").concat(uuid, ".place-right {\n        margin-left: 10px;\n    }\n    .").concat(uuid, ".place-right::before {\n        border-right: 8px solid ").concat(borderColor, ";\n    }\n    .").concat(uuid, ".place-right::after {\n        border-top: 5px solid transparent;\n        border-bottom: 5px solid transparent;\n        left: -6px;\n        top: 50%;\n        margin-top: -4px;\n        border-right-color: ").concat(arrowColor, ";\n        border-right-style: solid;\n        border-right-width: 6px;\n    }\n  ");
}
function getPopupColors(customColors, type, hasBorder) {
  var textColor = customColors.text;
  var backgroundColor = customColors.background;
  var borderColor = customColors.border;
  var arrowColor = customColors.arrow ? customColors.arrow : customColors.background;
  var colors = getDefaultPopupColors(type);
  if (textColor) {
    colors.text = textColor;
  }
  if (backgroundColor) {
    colors.background = backgroundColor;
  }
  if (hasBorder) {
    if (borderColor) {
      colors.border = borderColor;
    } else {
      colors.border = type === "light" ? "black" : "white";
    }
  }
  if (arrowColor) {
    colors.arrow = arrowColor;
  }
  return colors;
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function createCommonjsModule(fn, module) {
  return module = {exports: {}}, fn(module, module.exports), module.exports;
}
var check = function(it) {
  return it && it.Math == Math && it;
};
var global_1 = check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || check(typeof self == "object" && self) || check(typeof commonjsGlobal == "object" && commonjsGlobal) || function() {
  return this;
}() || Function("return this")();
var fails = function(exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};
var descriptors = !fails(function() {
  return Object.defineProperty({}, 1, {get: function() {
    return 7;
  }})[1] != 7;
});
var $propertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({1: 2}, 1);
var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;
var objectPropertyIsEnumerable = {
  f
};
var createPropertyDescriptor = function(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value
  };
};
var toString = {}.toString;
var classofRaw = function(it) {
  return toString.call(it).slice(8, -1);
};
var split = "".split;
var indexedObject = fails(function() {
  return !Object("z").propertyIsEnumerable(0);
}) ? function(it) {
  return classofRaw(it) == "String" ? split.call(it, "") : Object(it);
} : Object;
var requireObjectCoercible = function(it) {
  if (it == void 0)
    throw TypeError("Can't call method on " + it);
  return it;
};
var toIndexedObject = function(it) {
  return indexedObject(requireObjectCoercible(it));
};
var isObject = function(it) {
  return typeof it === "object" ? it !== null : typeof it === "function";
};
var toPrimitive = function(input, PREFERRED_STRING) {
  if (!isObject(input))
    return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject(val = fn.call(input)))
    return val;
  if (typeof (fn = input.valueOf) == "function" && !isObject(val = fn.call(input)))
    return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject(val = fn.call(input)))
    return val;
  throw TypeError("Can't convert object to primitive value");
};
var toObject = function(argument) {
  return Object(requireObjectCoercible(argument));
};
var hasOwnProperty = {}.hasOwnProperty;
var has = function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};
var document$1 = global_1.document;
var EXISTS = isObject(document$1) && isObject(document$1.createElement);
var documentCreateElement = function(it) {
  return EXISTS ? document$1.createElement(it) : {};
};
var ie8DomDefine = !descriptors && !fails(function() {
  return Object.defineProperty(documentCreateElement("div"), "a", {
    get: function() {
      return 7;
    }
  }).a != 7;
});
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var f$1 = descriptors ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor2(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine)
    try {
      return $getOwnPropertyDescriptor(O, P);
    } catch (error) {
    }
  if (has(O, P))
    return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};
var objectGetOwnPropertyDescriptor = {
  f: f$1
};
var anObject = function(it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + " is not an object");
  }
  return it;
};
var $defineProperty = Object.defineProperty;
var f$2 = descriptors ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine)
    try {
      return $defineProperty(O, P, Attributes);
    } catch (error) {
    }
  if ("get" in Attributes || "set" in Attributes)
    throw TypeError("Accessors not supported");
  if ("value" in Attributes)
    O[P] = Attributes.value;
  return O;
};
var objectDefineProperty = {
  f: f$2
};
var createNonEnumerableProperty = descriptors ? function(object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function(object, key, value) {
  object[key] = value;
  return object;
};
var setGlobal = function(key, value) {
  try {
    createNonEnumerableProperty(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  }
  return value;
};
var SHARED = "__core-js_shared__";
var store = global_1[SHARED] || setGlobal(SHARED, {});
var sharedStore = store;
var functionToString = Function.toString;
if (typeof sharedStore.inspectSource != "function") {
  sharedStore.inspectSource = function(it) {
    return functionToString.call(it);
  };
}
var inspectSource = sharedStore.inspectSource;
var WeakMap = global_1.WeakMap;
var nativeWeakMap = typeof WeakMap === "function" && /native code/.test(inspectSource(WeakMap));
var shared = createCommonjsModule(function(module) {
  (module.exports = function(key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== void 0 ? value : {});
  })("versions", []).push({
    version: "3.12.1",
    mode: "global",
    copyright: "© 2021 Denis Pushkarev (zloirock.ru)"
  });
});
var id = 0;
var postfix = Math.random();
var uid = function(key) {
  return "Symbol(" + String(key === void 0 ? "" : key) + ")_" + (++id + postfix).toString(36);
};
var keys = shared("keys");
var sharedKey = function(key) {
  return keys[key] || (keys[key] = uid(key));
};
var hiddenKeys = {};
var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
var WeakMap$1 = global_1.WeakMap;
var set2, get2, has$1;
var enforce = function(it) {
  return has$1(it) ? get2(it) : set2(it, {});
};
var getterFor = function(TYPE) {
  return function(it) {
    var state;
    if (!isObject(it) || (state = get2(it)).type !== TYPE) {
      throw TypeError("Incompatible receiver, " + TYPE + " required");
    }
    return state;
  };
};
if (nativeWeakMap || sharedStore.state) {
  var store$1 = sharedStore.state || (sharedStore.state = new WeakMap$1());
  var wmget = store$1.get;
  var wmhas = store$1.has;
  var wmset = store$1.set;
  set2 = function(it, metadata) {
    if (wmhas.call(store$1, it))
      throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store$1, it, metadata);
    return metadata;
  };
  get2 = function(it) {
    return wmget.call(store$1, it) || {};
  };
  has$1 = function(it) {
    return wmhas.call(store$1, it);
  };
} else {
  var STATE = sharedKey("state");
  hiddenKeys[STATE] = true;
  set2 = function(it, metadata) {
    if (has(it, STATE))
      throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get2 = function(it) {
    return has(it, STATE) ? it[STATE] : {};
  };
  has$1 = function(it) {
    return has(it, STATE);
  };
}
var internalState = {
  set: set2,
  get: get2,
  has: has$1,
  enforce,
  getterFor
};
var redefine = createCommonjsModule(function(module) {
  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(String).split("String");
  (module.exports = function(O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var state;
    if (typeof value == "function") {
      if (typeof key == "string" && !has(value, "name")) {
        createNonEnumerableProperty(value, "name", key);
      }
      state = enforceInternalState(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof key == "string" ? key : "");
      }
    }
    if (O === global_1) {
      if (simple)
        O[key] = value;
      else
        setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple)
      O[key] = value;
    else
      createNonEnumerableProperty(O, key, value);
  })(Function.prototype, "toString", function toString2() {
    return typeof this == "function" && getInternalState(this).source || inspectSource(this);
  });
});
var path = global_1;
var aFunction = function(variable) {
  return typeof variable == "function" ? variable : void 0;
};
var getBuiltIn = function(namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};
var ceil = Math.ceil;
var floor = Math.floor;
var toInteger = function(argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};
var min = Math.min;
var toLength = function(argument) {
  return argument > 0 ? min(toInteger(argument), 9007199254740991) : 0;
};
var max = Math.max;
var min$1 = Math.min;
var toAbsoluteIndex = function(index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};
var createMethod = function(IS_INCLUDES) {
  return function($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    if (IS_INCLUDES && el != el)
      while (length > index) {
        value = O[index++];
        if (value != value)
          return true;
      }
    else
      for (; length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el)
          return IS_INCLUDES || index || 0;
      }
    return !IS_INCLUDES && -1;
  };
};
var arrayIncludes = {
  includes: createMethod(true),
  indexOf: createMethod(false)
};
var indexOf = arrayIncludes.indexOf;
var objectKeysInternal = function(object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O)
    !has(hiddenKeys, key) && has(O, key) && result.push(key);
  while (names.length > i)
    if (has(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
  return result;
};
var enumBugKeys = [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
];
var hiddenKeys$1 = enumBugKeys.concat("length", "prototype");
var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys$1);
};
var objectGetOwnPropertyNames = {
  f: f$3
};
var f$4 = Object.getOwnPropertySymbols;
var objectGetOwnPropertySymbols = {
  f: f$4
};
var ownKeys$1 = getBuiltIn("Reflect", "ownKeys") || function ownKeys2(it) {
  var keys3 = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys3.concat(getOwnPropertySymbols(it)) : keys3;
};
var copyConstructorProperties = function(target, source) {
  var keys3 = ownKeys$1(source);
  var defineProperty2 = objectDefineProperty.f;
  var getOwnPropertyDescriptor3 = objectGetOwnPropertyDescriptor.f;
  for (var i = 0; i < keys3.length; i++) {
    var key = keys3[i];
    if (!has(target, key))
      defineProperty2(target, key, getOwnPropertyDescriptor3(source, key));
  }
};
var replacement = /#|\.prototype\./;
var isForced = function(feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == "function" ? fails(detection) : !!detection;
};
var normalize = isForced.normalize = function(string) {
  return String(string).replace(replacement, ".").toLowerCase();
};
var data = isForced.data = {};
var NATIVE = isForced.NATIVE = "N";
var POLYFILL = isForced.POLYFILL = "P";
var isForced_1 = isForced;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var _export = function(options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global_1;
  } else if (STATIC) {
    target = global_1[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global_1[TARGET] || {}).prototype;
  }
  if (target)
    for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else
        targetProperty = target[key];
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
      if (!FORCED && targetProperty !== void 0) {
        if (typeof sourceProperty === typeof targetProperty)
          continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      if (options.sham || targetProperty && targetProperty.sham) {
        createNonEnumerableProperty(sourceProperty, "sham", true);
      }
      redefine(target, key, sourceProperty, options);
    }
};
var aFunction$1 = function(it) {
  if (typeof it != "function") {
    throw TypeError(String(it) + " is not a function");
  }
  return it;
};
var functionBindContext = function(fn, that, length) {
  aFunction$1(fn);
  if (that === void 0)
    return fn;
  switch (length) {
    case 0:
      return function() {
        return fn.call(that);
      };
    case 1:
      return function(a) {
        return fn.call(that, a);
      };
    case 2:
      return function(a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function(a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function() {
    return fn.apply(that, arguments);
  };
};
var isArray = Array.isArray || function isArray2(arg) {
  return classofRaw(arg) == "Array";
};
var engineUserAgent = getBuiltIn("navigator", "userAgent") || "";
var process = global_1.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;
if (v8) {
  match = v8.split(".");
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/);
    if (match)
      version = match[1];
  }
}
var engineV8Version = version && +version;
var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function() {
  return !String(Symbol()) || !Symbol.sham && engineV8Version && engineV8Version < 41;
});
var useSymbolAsUid = nativeSymbol && !Symbol.sham && typeof Symbol.iterator == "symbol";
var WellKnownSymbolsStore = shared("wks");
var Symbol$1 = global_1.Symbol;
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;
var wellKnownSymbol = function(name) {
  if (!has(WellKnownSymbolsStore, name) || !(nativeSymbol || typeof WellKnownSymbolsStore[name] == "string")) {
    if (nativeSymbol && has(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol("Symbol." + name);
    }
  }
  return WellKnownSymbolsStore[name];
};
var SPECIES = wellKnownSymbol("species");
var arraySpeciesCreate = function(originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    if (typeof C == "function" && (C === Array || isArray(C.prototype)))
      C = void 0;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null)
        C = void 0;
    }
  }
  return new (C === void 0 ? Array : C)(length === 0 ? 0 : length);
};
var push = [].push;
var createMethod$1 = function(TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_OUT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self2 = indexedObject(O);
    var boundFunction = functionBindContext(callbackfn, that, 3);
    var length = toLength(self2.length);
    var index = 0;
    var create2 = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create2($this, length) : IS_FILTER || IS_FILTER_OUT ? create2($this, 0) : void 0;
    var value, result;
    for (; length > index; index++)
      if (NO_HOLES || index in self2) {
        value = self2[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP)
            target[index] = result;
          else if (result)
            switch (TYPE) {
              case 3:
                return true;
              case 5:
                return value;
              case 6:
                return index;
              case 2:
                push.call(target, value);
            }
          else
            switch (TYPE) {
              case 4:
                return false;
              case 7:
                push.call(target, value);
            }
        }
      }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};
var arrayIteration = {
  forEach: createMethod$1(0),
  map: createMethod$1(1),
  filter: createMethod$1(2),
  some: createMethod$1(3),
  every: createMethod$1(4),
  find: createMethod$1(5),
  findIndex: createMethod$1(6),
  filterOut: createMethod$1(7)
};
var objectKeys = Object.keys || function keys2(O) {
  return objectKeysInternal(O, enumBugKeys);
};
var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys3 = objectKeys(Properties);
  var length = keys3.length;
  var index = 0;
  var key;
  while (length > index)
    objectDefineProperty.f(O, key = keys3[index++], Properties[key]);
  return O;
};
var html = getBuiltIn("document", "documentElement");
var GT = ">";
var LT = "<";
var PROTOTYPE = "prototype";
var SCRIPT = "script";
var IE_PROTO = sharedKey("IE_PROTO");
var EmptyConstructor = function() {
};
var scriptTag = function(content) {
  return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
};
var NullProtoObjectViaActiveX = function(activeXDocument2) {
  activeXDocument2.write(scriptTag(""));
  activeXDocument2.close();
  var temp = activeXDocument2.parentWindow.Object;
  activeXDocument2 = null;
  return temp;
};
var NullProtoObjectViaIFrame = function() {
  var iframe = documentCreateElement("iframe");
  var JS = "java" + SCRIPT + ":";
  var iframeDocument;
  iframe.style.display = "none";
  html.appendChild(iframe);
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag("document.F=Object"));
  iframeDocument.close();
  return iframeDocument.F;
};
var activeXDocument;
var NullProtoObject = function() {
  try {
    activeXDocument = document.domain && new ActiveXObject("htmlfile");
  } catch (error) {
  }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--)
    delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};
hiddenKeys[IE_PROTO] = true;
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    result[IE_PROTO] = O;
  } else
    result = NullProtoObject();
  return Properties === void 0 ? result : objectDefineProperties(result, Properties);
};
var UNSCOPABLES = wellKnownSymbol("unscopables");
var ArrayPrototype = Array.prototype;
if (ArrayPrototype[UNSCOPABLES] == void 0) {
  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: objectCreate(null)
  });
}
var addToUnscopables = function(key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};
var $find = arrayIteration.find;
var FIND = "find";
var SKIPS_HOLES = true;
if (FIND in [])
  Array(1)[FIND](function() {
    SKIPS_HOLES = false;
  });
_export({target: "Array", proto: true, forced: SKIPS_HOLES}, {
  find: function find(callbackfn) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
  }
});
addToUnscopables(FIND);
var _class, _class2, _temp;
var ReactTooltip = staticMethods(_class = windowListener(_class = customEvent(_class = isCapture(_class = getEffect(_class = bodyMode(_class = trackRemoval(_class = (_temp = _class2 = /* @__PURE__ */ function(_React$Component) {
  _inherits(ReactTooltip2, _React$Component);
  _createClass(ReactTooltip2, null, [{
    key: "propTypes",
    get: function get3() {
      return {
        uuid: propTypes.string,
        children: propTypes.any,
        place: propTypes.string,
        type: propTypes.string,
        effect: propTypes.string,
        offset: propTypes.object,
        multiline: propTypes.bool,
        border: propTypes.bool,
        textColor: propTypes.string,
        backgroundColor: propTypes.string,
        borderColor: propTypes.string,
        arrowColor: propTypes.string,
        insecure: propTypes.bool,
        class: propTypes.string,
        className: propTypes.string,
        id: propTypes.string,
        html: propTypes.bool,
        delayHide: propTypes.number,
        delayUpdate: propTypes.number,
        delayShow: propTypes.number,
        event: propTypes.string,
        eventOff: propTypes.string,
        isCapture: propTypes.bool,
        globalEventOff: propTypes.string,
        getContent: propTypes.any,
        afterShow: propTypes.func,
        afterHide: propTypes.func,
        overridePosition: propTypes.func,
        disable: propTypes.bool,
        scrollHide: propTypes.bool,
        resizeHide: propTypes.bool,
        wrapper: propTypes.string,
        bodyMode: propTypes.bool,
        possibleCustomEvents: propTypes.string,
        possibleCustomEventsOff: propTypes.string,
        clickable: propTypes.bool
      };
    }
  }]);
  function ReactTooltip2(props) {
    var _this;
    _classCallCheck(this, ReactTooltip2);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactTooltip2).call(this, props));
    _this.state = {
      uuid: props.uuid || generateUUID(),
      place: props.place || "top",
      desiredPlace: props.place || "top",
      type: "dark",
      effect: "float",
      show: false,
      border: false,
      customColors: {},
      offset: {},
      extraClass: "",
      html: false,
      delayHide: 0,
      delayShow: 0,
      event: props.event || null,
      eventOff: props.eventOff || null,
      currentEvent: null,
      currentTarget: null,
      ariaProps: parseAria(props),
      isEmptyTip: false,
      disable: false,
      possibleCustomEvents: props.possibleCustomEvents || "",
      possibleCustomEventsOff: props.possibleCustomEventsOff || "",
      originTooltip: null,
      isMultiline: false
    };
    _this.bind(["showTooltip", "updateTooltip", "hideTooltip", "hideTooltipOnScroll", "getTooltipContent", "globalRebuild", "globalShow", "globalHide", "onWindowResize", "mouseOnToolTip"]);
    _this.mount = true;
    _this.delayShowLoop = null;
    _this.delayHideLoop = null;
    _this.delayReshow = null;
    _this.intervalUpdateContent = null;
    return _this;
  }
  _createClass(ReactTooltip2, [{
    key: "bind",
    value: function bind(methodArray) {
      var _this2 = this;
      methodArray.forEach(function(method) {
        _this2[method] = _this2[method].bind(_this2);
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props, insecure = _this$props.insecure, resizeHide = _this$props.resizeHide;
      this.bindListener();
      this.bindWindowEvents(resizeHide);
      this.injectStyles();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mount = false;
      this.clearTimer();
      this.unbindListener();
      this.removeScrollListener(this.state.currentTarget);
      this.unbindWindowEvents();
    }
  }, {
    key: "injectStyles",
    value: function injectStyles() {
      var tooltipRef = this.tooltipRef;
      if (!tooltipRef) {
        return;
      }
      var parentNode = tooltipRef.parentNode;
      while (parentNode.parentNode) {
        parentNode = parentNode.parentNode;
      }
      var domRoot;
      switch (parentNode.constructor.name) {
        case "Document":
        case "HTMLDocument":
        case void 0:
          domRoot = parentNode.head;
          break;
        case "ShadowRoot":
        default:
          domRoot = parentNode;
          break;
      }
      if (!domRoot.querySelector("style[data-react-tooltip]")) {
        var style = document.createElement("style");
        style.textContent = baseCss;
        style.setAttribute("data-react-tooltip", "true");
        domRoot.appendChild(style);
      }
    }
  }, {
    key: "mouseOnToolTip",
    value: function mouseOnToolTip() {
      var show = this.state.show;
      if (show && this.tooltipRef) {
        if (!this.tooltipRef.matches) {
          if (this.tooltipRef.msMatchesSelector) {
            this.tooltipRef.matches = this.tooltipRef.msMatchesSelector;
          } else {
            this.tooltipRef.matches = this.tooltipRef.mozMatchesSelector;
          }
        }
        return this.tooltipRef.matches(":hover");
      }
      return false;
    }
  }, {
    key: "getTargetArray",
    value: function getTargetArray(id2) {
      var targetArray = [];
      var selector;
      if (!id2) {
        selector = "[data-tip]:not([data-for])";
      } else {
        var escaped = id2.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        selector = '[data-tip][data-for="'.concat(escaped, '"]');
      }
      nodeListToArray(document.getElementsByTagName("*")).filter(function(element) {
        return element.shadowRoot;
      }).forEach(function(element) {
        targetArray = targetArray.concat(nodeListToArray(element.shadowRoot.querySelectorAll(selector)));
      });
      return targetArray.concat(nodeListToArray(document.querySelectorAll(selector)));
    }
  }, {
    key: "bindListener",
    value: function bindListener() {
      var _this3 = this;
      var _this$props2 = this.props, id2 = _this$props2.id, globalEventOff = _this$props2.globalEventOff, isCapture2 = _this$props2.isCapture;
      var targetArray = this.getTargetArray(id2);
      targetArray.forEach(function(target) {
        if (target.getAttribute("currentItem") === null) {
          target.setAttribute("currentItem", "false");
        }
        _this3.unbindBasicListener(target);
        if (_this3.isCustomEvent(target)) {
          _this3.customUnbindListener(target);
        }
      });
      if (this.isBodyMode()) {
        this.bindBodyListener(targetArray);
      } else {
        targetArray.forEach(function(target) {
          var isCaptureMode = _this3.isCapture(target);
          var effect = _this3.getEffect(target);
          if (_this3.isCustomEvent(target)) {
            _this3.customBindListener(target);
            return;
          }
          target.addEventListener("mouseenter", _this3.showTooltip, isCaptureMode);
          target.addEventListener("focus", _this3.showTooltip, isCaptureMode);
          if (effect === "float") {
            target.addEventListener("mousemove", _this3.updateTooltip, isCaptureMode);
          }
          target.addEventListener("mouseleave", _this3.hideTooltip, isCaptureMode);
          target.addEventListener("blur", _this3.hideTooltip, isCaptureMode);
        });
      }
      if (globalEventOff) {
        window.removeEventListener(globalEventOff, this.hideTooltip);
        window.addEventListener(globalEventOff, this.hideTooltip, isCapture2);
      }
      this.bindRemovalTracker();
    }
  }, {
    key: "unbindListener",
    value: function unbindListener() {
      var _this4 = this;
      var _this$props3 = this.props, id2 = _this$props3.id, globalEventOff = _this$props3.globalEventOff;
      if (this.isBodyMode()) {
        this.unbindBodyListener();
      } else {
        var targetArray = this.getTargetArray(id2);
        targetArray.forEach(function(target) {
          _this4.unbindBasicListener(target);
          if (_this4.isCustomEvent(target))
            _this4.customUnbindListener(target);
        });
      }
      if (globalEventOff)
        window.removeEventListener(globalEventOff, this.hideTooltip);
      this.unbindRemovalTracker();
    }
  }, {
    key: "unbindBasicListener",
    value: function unbindBasicListener(target) {
      var isCaptureMode = this.isCapture(target);
      target.removeEventListener("mouseenter", this.showTooltip, isCaptureMode);
      target.removeEventListener("mousemove", this.updateTooltip, isCaptureMode);
      target.removeEventListener("mouseleave", this.hideTooltip, isCaptureMode);
    }
  }, {
    key: "getTooltipContent",
    value: function getTooltipContent() {
      var _this$props4 = this.props, getContent = _this$props4.getContent, children = _this$props4.children;
      var content;
      if (getContent) {
        if (Array.isArray(getContent)) {
          content = getContent[0] && getContent[0](this.state.originTooltip);
        } else {
          content = getContent(this.state.originTooltip);
        }
      }
      return getTipContent(this.state.originTooltip, children, content, this.state.isMultiline);
    }
  }, {
    key: "isEmptyTip",
    value: function isEmptyTip(placeholder) {
      return typeof placeholder === "string" && placeholder === "" || placeholder === null;
    }
  }, {
    key: "showTooltip",
    value: function showTooltip(e, isGlobalCall) {
      if (!this.tooltipRef) {
        return;
      }
      if (isGlobalCall) {
        var targetArray = this.getTargetArray(this.props.id);
        var isMyElement = targetArray.some(function(ele) {
          return ele === e.currentTarget;
        });
        if (!isMyElement)
          return;
      }
      var _this$props5 = this.props, multiline = _this$props5.multiline, getContent = _this$props5.getContent;
      var originTooltip = e.currentTarget.getAttribute("data-tip");
      var isMultiline = e.currentTarget.getAttribute("data-multiline") || multiline || false;
      var switchToSolid = e instanceof window.FocusEvent || isGlobalCall;
      var scrollHide = true;
      if (e.currentTarget.getAttribute("data-scroll-hide")) {
        scrollHide = e.currentTarget.getAttribute("data-scroll-hide") === "true";
      } else if (this.props.scrollHide != null) {
        scrollHide = this.props.scrollHide;
      }
      if (e && e.currentTarget && e.currentTarget.setAttribute) {
        e.currentTarget.setAttribute("aria-describedby", this.state.uuid);
      }
      var desiredPlace = e.currentTarget.getAttribute("data-place") || this.props.place || "top";
      var effect = switchToSolid && "solid" || this.getEffect(e.currentTarget);
      var offset = e.currentTarget.getAttribute("data-offset") || this.props.offset || {};
      var result = getPosition(e, e.currentTarget, this.tooltipRef, desiredPlace, desiredPlace, effect, offset);
      if (result.position && this.props.overridePosition) {
        result.position = this.props.overridePosition(result.position, e, e.currentTarget, this.tooltipRef, desiredPlace, desiredPlace, effect, offset);
      }
      var place = result.isNewState ? result.newState.place : desiredPlace;
      this.clearTimer();
      var target = e.currentTarget;
      var reshowDelay = this.state.show ? target.getAttribute("data-delay-update") || this.props.delayUpdate : 0;
      var self2 = this;
      var updateState = function updateState2() {
        self2.setState({
          originTooltip,
          isMultiline,
          desiredPlace,
          place,
          type: target.getAttribute("data-type") || self2.props.type || "dark",
          customColors: {
            text: target.getAttribute("data-text-color") || self2.props.textColor || null,
            background: target.getAttribute("data-background-color") || self2.props.backgroundColor || null,
            border: target.getAttribute("data-border-color") || self2.props.borderColor || null,
            arrow: target.getAttribute("data-arrow-color") || self2.props.arrowColor || null
          },
          effect,
          offset,
          html: (target.getAttribute("data-html") ? target.getAttribute("data-html") === "true" : self2.props.html) || false,
          delayShow: target.getAttribute("data-delay-show") || self2.props.delayShow || 0,
          delayHide: target.getAttribute("data-delay-hide") || self2.props.delayHide || 0,
          delayUpdate: target.getAttribute("data-delay-update") || self2.props.delayUpdate || 0,
          border: (target.getAttribute("data-border") ? target.getAttribute("data-border") === "true" : self2.props.border) || false,
          extraClass: target.getAttribute("data-class") || self2.props["class"] || self2.props.className || "",
          disable: (target.getAttribute("data-tip-disable") ? target.getAttribute("data-tip-disable") === "true" : self2.props.disable) || false,
          currentTarget: target
        }, function() {
          if (scrollHide) {
            self2.addScrollListener(self2.state.currentTarget);
          }
          self2.updateTooltip(e);
          if (getContent && Array.isArray(getContent)) {
            self2.intervalUpdateContent = setInterval(function() {
              if (self2.mount) {
                var _getContent = self2.props.getContent;
                var placeholder = getTipContent(originTooltip, "", _getContent[0](), isMultiline);
                var isEmptyTip = self2.isEmptyTip(placeholder);
                self2.setState({
                  isEmptyTip
                });
                self2.updatePosition();
              }
            }, getContent[1]);
          }
        });
      };
      if (reshowDelay) {
        this.delayReshow = setTimeout(updateState, reshowDelay);
      } else {
        updateState();
      }
    }
  }, {
    key: "updateTooltip",
    value: function updateTooltip(e) {
      var _this5 = this;
      var _this$state = this.state, delayShow = _this$state.delayShow, disable = _this$state.disable;
      var afterShow = this.props.afterShow;
      var placeholder = this.getTooltipContent();
      var eventTarget = e.currentTarget || e.target;
      if (this.mouseOnToolTip()) {
        return;
      }
      if (this.isEmptyTip(placeholder) || disable) {
        return;
      }
      var delayTime = !this.state.show ? parseInt(delayShow, 10) : 0;
      var updateState = function updateState2() {
        if (Array.isArray(placeholder) && placeholder.length > 0 || placeholder) {
          var isInvisible = !_this5.state.show;
          _this5.setState({
            currentEvent: e,
            currentTarget: eventTarget,
            show: true
          }, function() {
            _this5.updatePosition();
            if (isInvisible && afterShow) {
              afterShow(e);
            }
          });
        }
      };
      clearTimeout(this.delayShowLoop);
      if (delayTime) {
        this.delayShowLoop = setTimeout(updateState, delayTime);
      } else {
        updateState();
      }
    }
  }, {
    key: "listenForTooltipExit",
    value: function listenForTooltipExit() {
      var show = this.state.show;
      if (show && this.tooltipRef) {
        this.tooltipRef.addEventListener("mouseleave", this.hideTooltip);
      }
    }
  }, {
    key: "removeListenerForTooltipExit",
    value: function removeListenerForTooltipExit() {
      var show = this.state.show;
      if (show && this.tooltipRef) {
        this.tooltipRef.removeEventListener("mouseleave", this.hideTooltip);
      }
    }
  }, {
    key: "hideTooltip",
    value: function hideTooltip(e, hasTarget) {
      var _this6 = this;
      var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
        isScroll: false
      };
      var disable = this.state.disable;
      var isScroll = options.isScroll;
      var delayHide = isScroll ? 0 : this.state.delayHide;
      var afterHide = this.props.afterHide;
      var placeholder = this.getTooltipContent();
      if (!this.mount)
        return;
      if (this.isEmptyTip(placeholder) || disable)
        return;
      if (hasTarget) {
        var targetArray = this.getTargetArray(this.props.id);
        var isMyElement = targetArray.some(function(ele) {
          return ele === e.currentTarget;
        });
        if (!isMyElement || !this.state.show)
          return;
      }
      if (e && e.currentTarget && e.currentTarget.removeAttribute) {
        e.currentTarget.removeAttribute("aria-describedby");
      }
      var resetState = function resetState2() {
        var isVisible = _this6.state.show;
        if (_this6.mouseOnToolTip()) {
          _this6.listenForTooltipExit();
          return;
        }
        _this6.removeListenerForTooltipExit();
        _this6.setState({
          show: false
        }, function() {
          _this6.removeScrollListener(_this6.state.currentTarget);
          if (isVisible && afterHide) {
            afterHide(e);
          }
        });
      };
      this.clearTimer();
      if (delayHide) {
        this.delayHideLoop = setTimeout(resetState, parseInt(delayHide, 10));
      } else {
        resetState();
      }
    }
  }, {
    key: "hideTooltipOnScroll",
    value: function hideTooltipOnScroll(event, hasTarget) {
      this.hideTooltip(event, hasTarget, {
        isScroll: true
      });
    }
  }, {
    key: "addScrollListener",
    value: function addScrollListener(currentTarget) {
      var isCaptureMode = this.isCapture(currentTarget);
      window.addEventListener("scroll", this.hideTooltipOnScroll, isCaptureMode);
    }
  }, {
    key: "removeScrollListener",
    value: function removeScrollListener(currentTarget) {
      var isCaptureMode = this.isCapture(currentTarget);
      window.removeEventListener("scroll", this.hideTooltipOnScroll, isCaptureMode);
    }
  }, {
    key: "updatePosition",
    value: function updatePosition() {
      var _this7 = this;
      var _this$state2 = this.state, currentEvent = _this$state2.currentEvent, currentTarget = _this$state2.currentTarget, place = _this$state2.place, desiredPlace = _this$state2.desiredPlace, effect = _this$state2.effect, offset = _this$state2.offset;
      var node = this.tooltipRef;
      var result = getPosition(currentEvent, currentTarget, node, place, desiredPlace, effect, offset);
      if (result.position && this.props.overridePosition) {
        result.position = this.props.overridePosition(result.position, currentEvent, currentTarget, node, place, desiredPlace, effect, offset);
      }
      if (result.isNewState) {
        return this.setState(result.newState, function() {
          _this7.updatePosition();
        });
      }
      node.style.left = result.position.left + "px";
      node.style.top = result.position.top + "px";
    }
  }, {
    key: "clearTimer",
    value: function clearTimer() {
      clearTimeout(this.delayShowLoop);
      clearTimeout(this.delayHideLoop);
      clearTimeout(this.delayReshow);
      clearInterval(this.intervalUpdateContent);
    }
  }, {
    key: "hasCustomColors",
    value: function hasCustomColors() {
      var _this8 = this;
      return Boolean(Object.keys(this.state.customColors).find(function(color) {
        return color !== "border" && _this8.state.customColors[color];
      }) || this.state.border && this.state.customColors["border"]);
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;
      var _this$state3 = this.state, extraClass = _this$state3.extraClass, html2 = _this$state3.html, ariaProps = _this$state3.ariaProps, disable = _this$state3.disable, uuid = _this$state3.uuid;
      var content = this.getTooltipContent();
      var isEmptyTip = this.isEmptyTip(content);
      var style = generateTooltipStyle(this.state.uuid, this.state.customColors, this.state.type, this.state.border);
      var tooltipClass = "__react_component_tooltip" + " ".concat(this.state.uuid) + (this.state.show && !disable && !isEmptyTip ? " show" : "") + (this.state.border ? " border" : "") + " place-".concat(this.state.place) + " type-".concat(this.hasCustomColors() ? "custom" : this.state.type) + (this.props.delayUpdate ? " allow_hover" : "") + (this.props.clickable ? " allow_click" : "");
      var Wrapper = this.props.wrapper;
      if (ReactTooltip2.supportedWrappers.indexOf(Wrapper) < 0) {
        Wrapper = ReactTooltip2.defaultProps.wrapper;
      }
      var wrapperClassName = [tooltipClass, extraClass].filter(Boolean).join(" ");
      if (html2) {
        var htmlContent = "".concat(content, '\n<style aria-hidden="true">').concat(style, "</style>");
        return react.createElement(Wrapper, _extends({
          className: "".concat(wrapperClassName),
          id: this.props.id || uuid,
          ref: function ref(_ref) {
            return _this9.tooltipRef = _ref;
          }
        }, ariaProps, {
          "data-id": "tooltip",
          dangerouslySetInnerHTML: {
            __html: htmlContent
          }
        }));
      } else {
        return react.createElement(Wrapper, _extends({
          className: "".concat(wrapperClassName),
          id: this.props.id || uuid
        }, ariaProps, {
          ref: function ref(_ref2) {
            return _this9.tooltipRef = _ref2;
          },
          "data-id": "tooltip"
        }), react.createElement("style", {
          dangerouslySetInnerHTML: {
            __html: style
          },
          "aria-hidden": "true"
        }), content);
      }
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var ariaProps = prevState.ariaProps;
      var newAriaProps = parseAria(nextProps);
      var isChanged = Object.keys(newAriaProps).some(function(props) {
        return newAriaProps[props] !== ariaProps[props];
      });
      if (!isChanged) {
        return null;
      }
      return _objectSpread2({}, prevState, {
        ariaProps: newAriaProps
      });
    }
  }]);
  return ReactTooltip2;
}(react.Component), _defineProperty(_class2, "defaultProps", {
  insecure: true,
  resizeHide: true,
  wrapper: "div",
  clickable: false
}), _defineProperty(_class2, "supportedWrappers", ["div", "span"]), _defineProperty(_class2, "displayName", "ReactTooltip"), _temp)) || _class) || _class) || _class) || _class) || _class) || _class) || _class;
export default ReactTooltip;
