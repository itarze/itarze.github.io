import {p as process} from "./common/process-2545f00a.js";
import {_ as __assign, a as __spreadArray} from "./common/tslib.es6-6d64b8e3.js";
import {r as react} from "./common/index-e88e33af.js";
import {p as pe, o as oe, l as le, n as ne, c, u as unitlessKeys} from "./common/emotion-unitless.esm-d3e8e6ed.js";
import "./common/_commonjsHelpers-eb5a497e.js";
var SC_ATTR = typeof process !== "undefined" && process.env.SC_ATTR || "data-styled";
var SC_ATTR_ACTIVE = "active";
var SC_ATTR_VERSION = "data-styled-version";
var SC_VERSION = "6.0.0-beta.8";
var SPLITTER = "/*!sc*/\n";
var IS_BROWSER = typeof window !== "undefined" && "HTMLElement" in window;
var DISABLE_SPEEDY = Boolean(typeof SC_DISABLE_SPEEDY === "boolean" ? SC_DISABLE_SPEEDY : typeof process !== "undefined" && typeof process.env.REACT_APP_SC_DISABLE_SPEEDY !== "undefined" && process.env.REACT_APP_SC_DISABLE_SPEEDY !== "" ? process.env.REACT_APP_SC_DISABLE_SPEEDY : typeof process !== "undefined" && typeof process.env.SC_DISABLE_SPEEDY !== "undefined" && process.env.SC_DISABLE_SPEEDY !== "" ? process.env.SC_DISABLE_SPEEDY : false);
var STATIC_EXECUTION_CONTEXT = {};
var EMPTY_ARRAY = Object.freeze([]);
var EMPTY_OBJECT = Object.freeze({});
function determineTheme(props, providedTheme, defaultProps) {
  if (defaultProps === void 0) {
    defaultProps = EMPTY_OBJECT;
  }
  return props.theme !== defaultProps.theme && props.theme || providedTheme || defaultProps.theme;
}
var domElements = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "marker",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
var escapeRegex = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g;
var dashesAtEnds = /(^-|-$)/g;
function escape(str) {
  return str.replace(escapeRegex, "-").replace(dashesAtEnds, "");
}
var AD_REPLACER_R = /(a)(d)/gi;
var charsLength = 52;
var getAlphabeticChar = function(code) {
  return String.fromCharCode(code + (code > 25 ? 39 : 97));
};
function generateAlphabeticName(code) {
  var name = "";
  var x;
  for (x = Math.abs(code); x > charsLength; x = x / charsLength | 0) {
    name = getAlphabeticChar(x % charsLength) + name;
  }
  return (getAlphabeticChar(x % charsLength) + name).replace(AD_REPLACER_R, "$1-$2");
}
var SEED$1 = 5381;
var phash = function(h, x) {
  var i = x.length;
  while (i) {
    h = h * 33 ^ x.charCodeAt(--i);
  }
  return h;
};
var hash = function(x) {
  return phash(SEED$1, x);
};
function generateComponentId(str) {
  return generateAlphabeticName(hash(str) >>> 0);
}
function getComponentName(target) {
  return target.displayName || target.name || "Component";
}
function isTag(target) {
  return typeof target === "string" && true;
}
function generateDisplayName(target) {
  return isTag(target) ? "styled.".concat(target) : "Styled(".concat(getComponentName(target), ")");
}
var _a;
var hasSymbol = typeof Symbol === "function" && Symbol.for;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  $$typeof: true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  $$typeof: true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = (_a = {}, _a[REACT_FORWARD_REF_TYPE] = FORWARD_REF_STATICS, _a[REACT_MEMO_TYPE] = MEMO_STATICS, _a);
function isMemo(object) {
  var $$typeofType = "type" in object && object.type.$$typeof;
  return $$typeofType === REACT_MEMO_TYPE;
}
function getStatics(component) {
  if (isMemo(component)) {
    return MEMO_STATICS;
  }
  return "$$typeof" in component ? TYPE_STATICS[component["$$typeof"]] : REACT_STATICS;
}
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, excludelist) {
  if (typeof sourceComponent !== "string") {
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, excludelist);
      }
    }
    var keys = getOwnPropertyNames(sourceComponent);
    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }
    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];
      if (!(key in KNOWN_STATICS) && !(excludelist && excludelist[key]) && !(sourceStatics && key in sourceStatics) && !(targetStatics && key in targetStatics)) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
        try {
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {
        }
      }
    }
  }
  return targetComponent;
}
function isStyledComponent(target) {
  return typeof target === "object" && "styledComponentId" in target;
}
function joinStrings() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return args.filter(Boolean).join(" ");
}
function isPlainObject(x) {
  return x !== null && typeof x === "object" && (!x.constructor || x.constructor.name === "Object") && (x.toString ? x.toString() : Object.prototype.toString.call(x)) === "[object Object]" && !("props" in x && (x.$$typeof || x.constructor === void 0));
}
function mixinRecursively(target, source, forceMerge) {
  if (forceMerge === void 0) {
    forceMerge = false;
  }
  if (!forceMerge && !isPlainObject(target) && !Array.isArray(target)) {
    return source;
  }
  if (Array.isArray(source)) {
    for (var key = 0; key < source.length; key++) {
      target[key] = mixinRecursively(target[key], source[key]);
    }
  } else if (isPlainObject(source)) {
    for (var key in source) {
      target[key] = mixinRecursively(target[key], source[key]);
    }
  }
  return target;
}
function mixinDeep(target) {
  var sources = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    sources[_i - 1] = arguments[_i];
  }
  for (var _a2 = 0, sources_1 = sources; _a2 < sources_1.length; _a2++) {
    var source = sources_1[_a2];
    mixinRecursively(target, source, true);
  }
  return target;
}
function throwStyledComponentsError(code) {
  var interpolations = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    interpolations[_i - 1] = arguments[_i];
  }
  {
    return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(code, " for more information.").concat(interpolations.length > 0 ? " Args: ".concat(interpolations.join(", ")) : ""));
  }
}
var makeGroupedTag = function(tag) {
  return new DefaultGroupedTag(tag);
};
var BASE_SIZE = 1 << 9;
var DefaultGroupedTag = function() {
  function DefaultGroupedTag2(tag) {
    this.groupSizes = new Uint32Array(BASE_SIZE);
    this.length = BASE_SIZE;
    this.tag = tag;
  }
  DefaultGroupedTag2.prototype.indexOfGroup = function(group) {
    var index = 0;
    for (var i = 0; i < group; i++) {
      index += this.groupSizes[i];
    }
    return index;
  };
  DefaultGroupedTag2.prototype.insertRules = function(group, rules) {
    if (group >= this.groupSizes.length) {
      var oldBuffer = this.groupSizes;
      var oldSize = oldBuffer.length;
      var newSize = oldSize;
      while (group >= newSize) {
        newSize <<= 1;
        if (newSize < 0) {
          throw throwStyledComponentsError(16, "".concat(group));
        }
      }
      this.groupSizes = new Uint32Array(newSize);
      this.groupSizes.set(oldBuffer);
      this.length = newSize;
      for (var i = oldSize; i < newSize; i++) {
        this.groupSizes[i] = 0;
      }
    }
    var ruleIndex = this.indexOfGroup(group + 1);
    if (Array.isArray(rules)) {
      for (var i = 0, l = rules.length; i < l; i++) {
        if (this.tag.insertRule(ruleIndex, rules[i])) {
          this.groupSizes[group]++;
          ruleIndex++;
        }
      }
    } else {
      if (this.tag.insertRule(ruleIndex, rules)) {
        this.groupSizes[group]++;
      }
    }
  };
  DefaultGroupedTag2.prototype.clearGroup = function(group) {
    if (group < this.length) {
      var length_1 = this.groupSizes[group];
      var startIndex = this.indexOfGroup(group);
      var endIndex = startIndex + length_1;
      this.groupSizes[group] = 0;
      for (var i = startIndex; i < endIndex; i++) {
        this.tag.deleteRule(startIndex);
      }
    }
  };
  DefaultGroupedTag2.prototype.getGroup = function(group) {
    var css2 = "";
    if (group >= this.length || this.groupSizes[group] === 0) {
      return css2;
    }
    var length = this.groupSizes[group];
    var startIndex = this.indexOfGroup(group);
    var endIndex = startIndex + length;
    for (var i = startIndex; i < endIndex; i++) {
      css2 += "".concat(this.tag.getRule(i)).concat(SPLITTER);
    }
    return css2;
  };
  return DefaultGroupedTag2;
}();
var groupIDRegister = new Map();
var reverseRegister = new Map();
var nextFreeGroup = 1;
var getGroupForId = function(id) {
  if (groupIDRegister.has(id)) {
    return groupIDRegister.get(id);
  }
  while (reverseRegister.has(nextFreeGroup)) {
    nextFreeGroup++;
  }
  var group = nextFreeGroup++;
  groupIDRegister.set(id, group);
  reverseRegister.set(group, id);
  return group;
};
var getIdForGroup = function(group) {
  return reverseRegister.get(group);
};
var setGroupForId = function(id, group) {
  groupIDRegister.set(id, group);
  reverseRegister.set(group, id);
};
var SELECTOR = "style[".concat(SC_ATTR, "][").concat(SC_ATTR_VERSION, '="').concat(SC_VERSION, '"]');
var MARKER_RE = new RegExp("^".concat(SC_ATTR, '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'));
var outputSheet = function(sheet) {
  var tag = sheet.getTag();
  var length = tag.length;
  var css2 = "";
  var _loop_1 = function(group2) {
    var id = getIdForGroup(group2);
    if (id === void 0)
      return "continue";
    var names = sheet.names.get(id);
    var rules = tag.getGroup(group2);
    if (names === void 0 || rules.length === 0)
      return "continue";
    var selector = "".concat(SC_ATTR, ".g").concat(group2, '[id="').concat(id, '"]');
    var content = "";
    if (names !== void 0) {
      names.forEach(function(name) {
        if (name.length > 0) {
          content += "".concat(name, ",");
        }
      });
    }
    css2 += "".concat(rules).concat(selector, '{content:"').concat(content, '"}').concat(SPLITTER);
  };
  for (var group = 0; group < length; group++) {
    _loop_1(group);
  }
  return css2;
};
var rehydrateNamesFromContent = function(sheet, id, content) {
  var names = content.split(",");
  var name;
  for (var i = 0, l = names.length; i < l; i++) {
    if (name = names[i]) {
      sheet.registerName(id, name);
    }
  }
};
var rehydrateSheetFromTag = function(sheet, style) {
  var _a2;
  var parts = ((_a2 = style.textContent) !== null && _a2 !== void 0 ? _a2 : "").split(SPLITTER);
  var rules = [];
  for (var i = 0, l = parts.length; i < l; i++) {
    var part = parts[i].trim();
    if (!part)
      continue;
    var marker = part.match(MARKER_RE);
    if (marker) {
      var group = parseInt(marker[1], 10) | 0;
      var id = marker[2];
      if (group !== 0) {
        setGroupForId(id, group);
        rehydrateNamesFromContent(sheet, id, marker[3]);
        sheet.getTag().insertRules(group, rules);
      }
      rules.length = 0;
    } else {
      rules.push(part);
    }
  }
};
var rehydrateSheet = function(sheet) {
  var nodes = document.querySelectorAll(SELECTOR);
  for (var i = 0, l = nodes.length; i < l; i++) {
    var node = nodes[i];
    if (node && node.getAttribute(SC_ATTR) !== SC_ATTR_ACTIVE) {
      rehydrateSheetFromTag(sheet, node);
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
    }
  }
};
function getNonce() {
  return typeof __webpack_nonce__ !== "undefined" ? __webpack_nonce__ : null;
}
var ELEMENT_TYPE = 1;
var findLastStyleTag = function(target) {
  var childNodes = target.childNodes;
  for (var i = childNodes.length; i >= 0; i--) {
    var child = childNodes[i];
    if (child && child.nodeType === ELEMENT_TYPE && child.hasAttribute(SC_ATTR)) {
      return child;
    }
  }
  return void 0;
};
var makeStyleTag = function(target) {
  var head = document.head;
  var parent = target || head;
  var style = document.createElement("style");
  var prevStyle = findLastStyleTag(parent);
  var nextSibling = prevStyle !== void 0 ? prevStyle.nextSibling : null;
  style.setAttribute(SC_ATTR, SC_ATTR_ACTIVE);
  style.setAttribute(SC_ATTR_VERSION, SC_VERSION);
  var nonce = getNonce();
  if (nonce)
    style.setAttribute("nonce", nonce);
  parent.insertBefore(style, nextSibling);
  return style;
};
var getSheet = function(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }
  var styleSheets = document.styleSheets;
  for (var i = 0, l = styleSheets.length; i < l; i++) {
    var sheet = styleSheets[i];
    if (sheet.ownerNode === tag) {
      return sheet;
    }
  }
  throw throwStyledComponentsError(17);
};
var makeTag = function(_a2) {
  var isServer = _a2.isServer, useCSSOMInjection = _a2.useCSSOMInjection, target = _a2.target;
  if (isServer) {
    return new VirtualTag(target);
  } else if (useCSSOMInjection) {
    return new CSSOMTag(target);
  } else {
    return new TextTag(target);
  }
};
var CSSOMTag = function() {
  function CSSOMTag2(target) {
    var element = this.element = makeStyleTag(target);
    element.appendChild(document.createTextNode(""));
    this.sheet = getSheet(element);
    this.length = 0;
  }
  CSSOMTag2.prototype.insertRule = function(index, rule) {
    try {
      this.sheet.insertRule(rule, index);
      this.length++;
      return true;
    } catch (_error) {
      return false;
    }
  };
  CSSOMTag2.prototype.deleteRule = function(index) {
    this.sheet.deleteRule(index);
    this.length--;
  };
  CSSOMTag2.prototype.getRule = function(index) {
    var rule = this.sheet.cssRules[index];
    if (rule !== void 0 && typeof rule.cssText === "string") {
      return rule.cssText;
    } else {
      return "";
    }
  };
  return CSSOMTag2;
}();
var TextTag = function() {
  function TextTag2(target) {
    var element = this.element = makeStyleTag(target);
    this.nodes = element.childNodes;
    this.length = 0;
  }
  TextTag2.prototype.insertRule = function(index, rule) {
    if (index <= this.length && index >= 0) {
      var node = document.createTextNode(rule);
      var refNode = this.nodes[index];
      this.element.insertBefore(node, refNode || null);
      this.length++;
      return true;
    } else {
      return false;
    }
  };
  TextTag2.prototype.deleteRule = function(index) {
    this.element.removeChild(this.nodes[index]);
    this.length--;
  };
  TextTag2.prototype.getRule = function(index) {
    if (index < this.length) {
      return this.nodes[index].textContent;
    } else {
      return "";
    }
  };
  return TextTag2;
}();
var VirtualTag = function() {
  function VirtualTag2(_target) {
    this.rules = [];
    this.length = 0;
  }
  VirtualTag2.prototype.insertRule = function(index, rule) {
    if (index <= this.length) {
      this.rules.splice(index, 0, rule);
      this.length++;
      return true;
    } else {
      return false;
    }
  };
  VirtualTag2.prototype.deleteRule = function(index) {
    this.rules.splice(index, 1);
    this.length--;
  };
  VirtualTag2.prototype.getRule = function(index) {
    if (index < this.length) {
      return this.rules[index];
    } else {
      return "";
    }
  };
  return VirtualTag2;
}();
var SHOULD_REHYDRATE = IS_BROWSER;
var defaultOptions = {
  isServer: !IS_BROWSER,
  useCSSOMInjection: !DISABLE_SPEEDY
};
var StyleSheet = function() {
  function StyleSheet2(options, globalStyles, names) {
    if (options === void 0) {
      options = EMPTY_OBJECT;
    }
    if (globalStyles === void 0) {
      globalStyles = {};
    }
    this.options = __assign(__assign({}, defaultOptions), options);
    this.gs = globalStyles;
    this.names = new Map(names);
    this.server = !!options.isServer;
    if (!this.server && IS_BROWSER && SHOULD_REHYDRATE) {
      SHOULD_REHYDRATE = false;
      rehydrateSheet(this);
    }
  }
  StyleSheet2.registerId = function(id) {
    return getGroupForId(id);
  };
  StyleSheet2.prototype.reconstructWithOptions = function(options, withNames) {
    if (withNames === void 0) {
      withNames = true;
    }
    return new StyleSheet2(__assign(__assign({}, this.options), options), this.gs, withNames && this.names || void 0);
  };
  StyleSheet2.prototype.allocateGSInstance = function(id) {
    return this.gs[id] = (this.gs[id] || 0) + 1;
  };
  StyleSheet2.prototype.getTag = function() {
    return this.tag || (this.tag = makeGroupedTag(makeTag(this.options)));
  };
  StyleSheet2.prototype.hasNameForId = function(id, name) {
    return this.names.has(id) && this.names.get(id).has(name);
  };
  StyleSheet2.prototype.registerName = function(id, name) {
    getGroupForId(id);
    if (!this.names.has(id)) {
      var groupNames = new Set();
      groupNames.add(name);
      this.names.set(id, groupNames);
    } else {
      this.names.get(id).add(name);
    }
  };
  StyleSheet2.prototype.insertRules = function(id, name, rules) {
    this.registerName(id, name);
    this.getTag().insertRules(getGroupForId(id), rules);
  };
  StyleSheet2.prototype.clearNames = function(id) {
    if (this.names.has(id)) {
      this.names.get(id).clear();
    }
  };
  StyleSheet2.prototype.clearRules = function(id) {
    this.getTag().clearGroup(getGroupForId(id));
    this.clearNames(id);
  };
  StyleSheet2.prototype.clearTag = function() {
    this.tag = void 0;
  };
  StyleSheet2.prototype.toString = function() {
    return outputSheet(this);
  };
  return StyleSheet2;
}();
var COMMENT_REGEX = /^\s*\/\/.*$/gm;
var COMPLEX_SELECTOR_PREFIX = [":", "[", ".", "#"];
function serialize(children, callback) {
  return children.map(function(c2, i) {
    return callback(c2, i, children, callback);
  }).filter(Boolean);
}
function createStylisInstance(_a2) {
  var _b = _a2 === void 0 ? EMPTY_OBJECT : _a2, _c = _b.options, options = _c === void 0 ? EMPTY_OBJECT : _c, _d = _b.plugins, plugins = _d === void 0 ? EMPTY_ARRAY : _d;
  var _componentId;
  var _selector;
  var _selectorRegexp;
  var _consecutiveSelfRefRegExp;
  var selfReferenceReplacer = function(match, offset, string) {
    if ((offset === 0 ? !COMPLEX_SELECTOR_PREFIX.includes(string[_selector.length]) : true) && !string.match(_consecutiveSelfRefRegExp)) {
      return ".".concat(_componentId);
    }
    return match;
  };
  var selfReferenceReplacementPlugin = function(element) {
    if (element.type === c && element.value.includes("&")) {
      var props = element.props;
      props[0] = props[0].replace(_selectorRegexp, selfReferenceReplacer);
    }
  };
  var stringifyRules = function(css2, selector, prefix, componentId) {
    if (selector === void 0) {
      selector = "";
    }
    if (prefix === void 0) {
      prefix = "";
    }
    if (componentId === void 0) {
      componentId = "&";
    }
    var flatCSS = css2.replace(COMMENT_REGEX, "");
    _componentId = componentId;
    _selector = selector;
    _selectorRegexp = new RegExp("\\".concat(_selector, "\\b"), "g");
    _consecutiveSelfRefRegExp = new RegExp("(\\".concat(_selector, "\\b){2,}"));
    var middlewares = plugins.slice();
    if (options.prefix || options.prefix === void 0) {
      middlewares.unshift(pe);
    }
    middlewares.push(selfReferenceReplacementPlugin, oe);
    return serialize(ne(options.namespace || prefix || selector ? "".concat(options.namespace ? options.namespace + " " : "").concat(prefix, " ").concat(selector, " { ").concat(flatCSS, " }") : flatCSS), le(middlewares));
  };
  stringifyRules.hash = plugins.length ? plugins.reduce(function(acc, plugin) {
    if (!plugin.name) {
      throwStyledComponentsError(15);
    }
    return phash(acc, plugin.name);
  }, SEED$1).toString() : "";
  return stringifyRules;
}
var StyleSheetContext = react.createContext(void 0);
var StyleSheetConsumer = StyleSheetContext.Consumer;
var StylisContext = react.createContext(void 0);
StylisContext.Consumer;
var mainSheet = new StyleSheet();
var mainStylis = createStylisInstance();
function useStyleSheet() {
  return react.useContext(StyleSheetContext) || mainSheet;
}
function useStylis() {
  return react.useContext(StylisContext) || mainStylis;
}
var Keyframes = function() {
  function Keyframes2(name, rules) {
    var _this = this;
    this.inject = function(styleSheet, stylisInstance) {
      if (stylisInstance === void 0) {
        stylisInstance = mainStylis;
      }
      var resolvedName = _this.name + stylisInstance.hash;
      if (!styleSheet.hasNameForId(_this.id, resolvedName)) {
        styleSheet.insertRules(_this.id, resolvedName, stylisInstance(_this.rules, resolvedName, "@keyframes"));
      }
    };
    this.toString = function() {
      throw throwStyledComponentsError(12, String(_this.name));
    };
    this.name = name;
    this.id = "sc-keyframes-".concat(name);
    this.rules = rules;
  }
  Keyframes2.prototype.getName = function(stylisInstance) {
    if (stylisInstance === void 0) {
      stylisInstance = mainStylis;
    }
    return this.name + stylisInstance.hash;
  };
  return Keyframes2;
}();
function addUnitIfNeeded(name, value) {
  if (value == null || typeof value === "boolean" || value === "") {
    return "";
  }
  if (typeof value === "number" && value !== 0 && !(name in unitlessKeys)) {
    return "".concat(value, "px");
  }
  return String(value).trim();
}
var uppercaseCheck = /[A-Z]/;
var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var prefixAndLowerCase = function(char) {
  return "-".concat(char.toLowerCase());
};
function hyphenateStyleName(string) {
  return uppercaseCheck.test(string) && !string.startsWith("--") ? string.replace(uppercasePattern, prefixAndLowerCase).replace(msPattern, "-ms-") : string;
}
function isFunction(test) {
  return typeof test === "function";
}
function isStatelessFunction(test) {
  return typeof test === "function" && !(test.prototype && test.prototype.isReactComponent);
}
var isFalsish = function(chunk) {
  return chunk === void 0 || chunk === null || chunk === false || chunk === "";
};
var objToCssArray = function(obj, prevKey) {
  var rules = [];
  for (var key in obj) {
    if (!obj.hasOwnProperty(key) || isFalsish(obj[key]))
      continue;
    if (Array.isArray(obj[key]) && obj[key].isCss || isFunction(obj[key])) {
      rules.push("".concat(hyphenateStyleName(key), ":"), obj[key], ";");
    } else if (isPlainObject(obj[key])) {
      rules.push.apply(rules, objToCssArray(obj[key], key));
    } else {
      rules.push("".concat(hyphenateStyleName(key), ": ").concat(addUnitIfNeeded(key, obj[key]), ";"));
    }
  }
  return prevKey ? __spreadArray(__spreadArray(["".concat(prevKey, " {")], rules, true), ["}"], false) : rules;
};
function flatten(chunk, executionContext, styleSheet, stylisInstance) {
  if (Array.isArray(chunk)) {
    var ruleSet = [];
    for (var i = 0, len = chunk.length, result = void 0; i < len; i += 1) {
      result = flatten(chunk[i], executionContext, styleSheet, stylisInstance);
      if (result.length === 0)
        continue;
      ruleSet.push.apply(ruleSet, result);
    }
    return ruleSet;
  }
  if (isFalsish(chunk)) {
    return [];
  }
  if (isStyledComponent(chunk)) {
    return [".".concat(chunk.styledComponentId)];
  }
  if (isFunction(chunk)) {
    if (isStatelessFunction(chunk) && executionContext) {
      var chunkFn = chunk;
      var result = chunkFn(executionContext);
      return flatten(result, executionContext, styleSheet, stylisInstance);
    } else {
      return [chunk];
    }
  }
  if (chunk instanceof Keyframes) {
    if (styleSheet) {
      chunk.inject(styleSheet, stylisInstance);
      return [chunk.getName(stylisInstance)];
    } else {
      return [chunk];
    }
  }
  return isPlainObject(chunk) ? objToCssArray(chunk) : [chunk.toString()];
}
function isStaticRules(rules) {
  for (var i = 0; i < rules.length; i += 1) {
    var rule = rules[i];
    if (isFunction(rule) && !isStyledComponent(rule)) {
      return false;
    }
  }
  return true;
}
var SEED = hash(SC_VERSION);
var ComponentStyle = function() {
  function ComponentStyle2(rules, componentId, baseStyle) {
    this.names = [];
    this.rules = rules;
    this.staticRulesId = "";
    this.isStatic = (baseStyle === void 0 || baseStyle.isStatic) && isStaticRules(rules);
    this.componentId = componentId;
    this.baseHash = phash(SEED, componentId);
    this.baseStyle = baseStyle;
    StyleSheet.registerId(componentId);
  }
  ComponentStyle2.prototype.generateAndInjectStyles = function(executionContext, styleSheet, stylis) {
    var componentId = this.componentId;
    this.names.length = 0;
    if (this.baseStyle) {
      this.names.push(this.baseStyle.generateAndInjectStyles(executionContext, styleSheet, stylis));
    }
    if (this.isStatic && !stylis.hash) {
      if (this.staticRulesId && styleSheet.hasNameForId(componentId, this.staticRulesId)) {
        this.names.push(this.staticRulesId);
      } else {
        var cssStatic = flatten(this.rules, executionContext, styleSheet, stylis).join("");
        var name_1 = generateAlphabeticName(phash(this.baseHash, cssStatic) >>> 0);
        if (!styleSheet.hasNameForId(componentId, name_1)) {
          var cssStaticFormatted = stylis(cssStatic, ".".concat(name_1), void 0, componentId);
          styleSheet.insertRules(componentId, name_1, cssStaticFormatted);
        }
        this.names.push(name_1);
        this.staticRulesId = name_1;
      }
    } else {
      var length_1 = this.rules.length;
      var dynamicHash = phash(this.baseHash, stylis.hash);
      var css2 = "";
      for (var i = 0; i < length_1; i++) {
        var partRule = this.rules[i];
        if (typeof partRule === "string") {
          css2 += partRule;
        } else if (partRule) {
          var partChunk = flatten(partRule, executionContext, styleSheet, stylis);
          var partString = Array.isArray(partChunk) ? partChunk.join("") : partChunk;
          dynamicHash = phash(dynamicHash, partString);
          css2 += partString;
        }
      }
      if (css2) {
        var name_2 = generateAlphabeticName(dynamicHash >>> 0);
        if (!styleSheet.hasNameForId(componentId, name_2)) {
          var cssFormatted = stylis(css2, ".".concat(name_2), void 0, componentId);
          styleSheet.insertRules(componentId, name_2, cssFormatted);
        }
        this.names.push(name_2);
      }
    }
    return this.names.join(" ");
  };
  return ComponentStyle2;
}();
var ThemeContext = react.createContext(void 0);
var ThemeConsumer = ThemeContext.Consumer;
var identifiers = {};
function generateId(displayName, parentComponentId) {
  var name = typeof displayName !== "string" ? "sc" : escape(displayName);
  identifiers[name] = (identifiers[name] || 0) + 1;
  var componentId = "".concat(name, "-").concat(generateComponentId(SC_VERSION + name + identifiers[name]));
  return parentComponentId ? "".concat(parentComponentId, "-").concat(componentId) : componentId;
}
function useInjectedStyle(componentStyle, isStatic, resolvedAttrs, warnTooManyClasses) {
  var styleSheet = useStyleSheet();
  var stylis = useStylis();
  var className = componentStyle.generateAndInjectStyles(isStatic ? EMPTY_OBJECT : resolvedAttrs, styleSheet, stylis);
  return className;
}
function useStyledComponentImpl(forwardedComponent, props, forwardedRef, isStatic) {
  var componentAttrs = forwardedComponent.attrs, componentStyle = forwardedComponent.componentStyle, defaultProps = forwardedComponent.defaultProps, foldedComponentIds = forwardedComponent.foldedComponentIds, shouldForwardProp = forwardedComponent.shouldForwardProp, styledComponentId = forwardedComponent.styledComponentId, target = forwardedComponent.target;
  var theme = determineTheme(props, react.useContext(ThemeContext), defaultProps) || EMPTY_OBJECT;
  var context = componentAttrs.reduce(function(p, attrDef) {
    var resolvedAttrDef = typeof attrDef === "function" ? attrDef(p) : attrDef;
    for (var key2 in resolvedAttrDef) {
      p[key2] = key2 === "className" ? joinStrings(p[key2], resolvedAttrDef[key2]) : key2 === "style" ? __assign(__assign({}, p[key2]), resolvedAttrDef[key2]) : resolvedAttrDef[key2];
    }
    return p;
  }, __assign(__assign({}, props), {theme}));
  var generatedClassName = useInjectedStyle(componentStyle, isStatic, context);
  var refToForward = forwardedRef;
  var elementToBeCreated = context.as || target;
  var isTargetTag = isTag(elementToBeCreated);
  var propsForElement = {};
  for (var key in context) {
    if (context[key] === void 0)
      ;
    else if (key[0] === "$" || key === "as" || key === "theme")
      ;
    else if (key === "forwardedAs") {
      propsForElement.as = context.forwardedAs;
    } else if (!shouldForwardProp || shouldForwardProp(key, elementToBeCreated)) {
      propsForElement[key] = context[key];
    }
  }
  propsForElement[isTargetTag && domElements.indexOf(elementToBeCreated) === -1 ? "class" : "className"] = foldedComponentIds.concat(styledComponentId, generatedClassName !== styledComponentId ? generatedClassName : "", context.className || "").filter(Boolean).join(" ");
  propsForElement.ref = refToForward;
  return react.createElement(elementToBeCreated, propsForElement);
}
function createStyledComponent(target, options, rules) {
  var isTargetStyledComp = isStyledComponent(target);
  var styledComponentTarget = target;
  var isCompositeComponent = !isTag(target);
  var _a2 = options.attrs, attrs = _a2 === void 0 ? EMPTY_ARRAY : _a2, _b = options.componentId, componentId = _b === void 0 ? generateId(options.displayName, options.parentComponentId) : _b, _c = options.displayName, displayName = _c === void 0 ? generateDisplayName(target) : _c;
  var styledComponentId = options.displayName && options.componentId ? "".concat(escape(options.displayName), "-").concat(options.componentId) : options.componentId || componentId;
  var finalAttrs = isTargetStyledComp && styledComponentTarget.attrs ? styledComponentTarget.attrs.concat(attrs).filter(Boolean) : attrs;
  var shouldForwardProp = options.shouldForwardProp;
  if (isTargetStyledComp && styledComponentTarget.shouldForwardProp) {
    var shouldForwardPropFn_1 = styledComponentTarget.shouldForwardProp;
    if (options.shouldForwardProp) {
      var passedShouldForwardPropFn_1 = options.shouldForwardProp;
      shouldForwardProp = function(prop, elementToBeCreated) {
        return shouldForwardPropFn_1(prop, elementToBeCreated) && passedShouldForwardPropFn_1(prop, elementToBeCreated);
      };
    } else {
      shouldForwardProp = shouldForwardPropFn_1;
    }
  }
  var componentStyle = new ComponentStyle(rules, styledComponentId, isTargetStyledComp ? styledComponentTarget.componentStyle : void 0);
  var isStatic = componentStyle.isStatic && attrs.length === 0;
  function forwardRef(props, ref) {
    return useStyledComponentImpl(WrappedStyledComponent, props, ref, isStatic);
  }
  forwardRef.displayName = displayName;
  var WrappedStyledComponent = react.forwardRef(forwardRef);
  WrappedStyledComponent.attrs = finalAttrs;
  WrappedStyledComponent.componentStyle = componentStyle;
  WrappedStyledComponent.displayName = displayName;
  WrappedStyledComponent.shouldForwardProp = shouldForwardProp;
  WrappedStyledComponent.foldedComponentIds = isTargetStyledComp ? styledComponentTarget.foldedComponentIds.concat(styledComponentTarget.styledComponentId) : EMPTY_ARRAY;
  WrappedStyledComponent.styledComponentId = styledComponentId;
  WrappedStyledComponent.target = isTargetStyledComp ? styledComponentTarget.target : target;
  Object.defineProperty(WrappedStyledComponent, "defaultProps", {
    get: function() {
      return this._foldedDefaultProps;
    },
    set: function(obj) {
      this._foldedDefaultProps = isTargetStyledComp ? mixinDeep({}, styledComponentTarget.defaultProps, obj) : obj;
    }
  });
  WrappedStyledComponent.toString = function() {
    return ".".concat(WrappedStyledComponent.styledComponentId);
  };
  if (isCompositeComponent) {
    var compositeComponentTarget = target;
    hoistNonReactStatics(WrappedStyledComponent, compositeComponentTarget, {
      attrs: true,
      componentStyle: true,
      displayName: true,
      foldedComponentIds: true,
      shouldForwardProp: true,
      styledComponentId: true,
      target: true
    });
  }
  return WrappedStyledComponent;
}
function interleave(strings, interpolations) {
  var result = [strings[0]];
  for (var i = 0, len = interpolations.length; i < len; i += 1) {
    result.push(interpolations[i], strings[i + 1]);
  }
  return result;
}
var addTag = function(arg) {
  return Object.assign(arg, {isCss: true});
};
function css(styles) {
  var interpolations = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    interpolations[_i - 1] = arguments[_i];
  }
  if (isFunction(styles) || isPlainObject(styles)) {
    var styleFunctionOrObject = styles;
    return addTag(flatten(interleave(EMPTY_ARRAY, __spreadArray([
      styleFunctionOrObject
    ], interpolations, true))));
  }
  var styleStringArray = styles;
  if (interpolations.length === 0 && styleStringArray.length === 1 && typeof styleStringArray[0] === "string") {
    return flatten(styleStringArray);
  }
  return addTag(flatten(interleave(styleStringArray, interpolations)));
}
function constructWithOptions(componentConstructor, tag, options) {
  if (options === void 0) {
    options = EMPTY_OBJECT;
  }
  if (!tag) {
    throw throwStyledComponentsError(1, tag);
  }
  var templateFunction = function(initialStyles) {
    var interpolations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      interpolations[_i - 1] = arguments[_i];
    }
    return componentConstructor(tag, options, css.apply(void 0, __spreadArray([initialStyles], interpolations, false)));
  };
  templateFunction.attrs = function(attrs) {
    return constructWithOptions(componentConstructor, tag, __assign(__assign({}, options), {attrs: Array.prototype.concat(options.attrs, attrs).filter(Boolean)}));
  };
  templateFunction.withConfig = function(config) {
    return constructWithOptions(componentConstructor, tag, __assign(__assign({}, options), config));
  };
  return templateFunction;
}
var baseStyled = function(tag) {
  return constructWithOptions(createStyledComponent, tag);
};
var styled = baseStyled;
domElements.forEach(function(domElement) {
  styled[domElement] = baseStyled(domElement);
});
var GlobalStyle = function() {
  function GlobalStyle2(rules, componentId) {
    this.rules = rules;
    this.componentId = componentId;
    this.isStatic = isStaticRules(rules);
    StyleSheet.registerId(this.componentId + 1);
  }
  GlobalStyle2.prototype.createStyles = function(instance, executionContext, styleSheet, stylis) {
    var flatCSS = flatten(this.rules, executionContext, styleSheet, stylis);
    var css2 = stylis(flatCSS.join(""), "");
    var id = this.componentId + instance;
    styleSheet.insertRules(id, id, css2);
  };
  GlobalStyle2.prototype.removeStyles = function(instance, styleSheet) {
    styleSheet.clearRules(this.componentId + instance);
  };
  GlobalStyle2.prototype.renderStyles = function(instance, executionContext, styleSheet, stylis) {
    if (instance > 2)
      StyleSheet.registerId(this.componentId + instance);
    this.removeStyles(instance, styleSheet);
    this.createStyles(instance, executionContext, styleSheet, stylis);
  };
  return GlobalStyle2;
}();
function createGlobalStyle(strings) {
  var interpolations = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    interpolations[_i - 1] = arguments[_i];
  }
  var rules = css.apply(void 0, __spreadArray([strings], interpolations, false));
  var styledComponentId = "sc-global-".concat(generateComponentId(JSON.stringify(rules)));
  var globalStyle = new GlobalStyle(rules, styledComponentId);
  var GlobalStyleComponent = function(props) {
    var styleSheet = useStyleSheet();
    var stylis = useStylis();
    var theme = react.useContext(ThemeContext);
    var instanceRef = react.useRef(styleSheet.allocateGSInstance(styledComponentId));
    var instance = instanceRef.current;
    if (styleSheet.server) {
      renderStyles(instance, props, styleSheet, theme, stylis);
    }
    {
      (react.useInsertionEffect || react.useLayoutEffect)(function() {
        if (!styleSheet.server) {
          renderStyles(instance, props, styleSheet, theme, stylis);
          return function() {
            return globalStyle.removeStyles(instance, styleSheet);
          };
        }
      }, [instance, props, styleSheet, theme, stylis]);
    }
    return null;
  };
  function renderStyles(instance, props, styleSheet, theme, stylis) {
    if (globalStyle.isStatic) {
      globalStyle.renderStyles(instance, STATIC_EXECUTION_CONTEXT, styleSheet, stylis);
    } else {
      var context = __assign(__assign({}, props), {theme: determineTheme(props, theme, GlobalStyleComponent.defaultProps)});
      globalStyle.renderStyles(instance, context, styleSheet, stylis);
    }
  }
  return react.memo(GlobalStyleComponent);
}
export default styled;
export {createGlobalStyle};
