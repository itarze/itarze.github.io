import {r as react} from "./common/index-e88e33af.js";
import {p as propTypes} from "./common/index-ab2d6925.js";
import "./common/_commonjsHelpers-eb5a497e.js";
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
function ownKeys$2(object, enumerableOnly) {
  var keys3 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys3.push.apply(keys3, symbols);
  }
  return keys3;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys$2(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
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
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
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
  _extends = Object.assign ? Object.assign.bind() : function(target) {
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
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _possibleConstructorReturn(self2, call2) {
  if (call2 && (typeof call2 === "object" || typeof call2 === "function")) {
    return call2;
  } else if (call2 !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self2);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function() {
      };
      return {
        s: F,
        n: function() {
          if (i >= o.length)
            return {
              done: true
            };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function(e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {
    s: function() {
      it = it.call(o);
    },
    n: function() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function(e) {
      didErr = true;
      err = e;
    },
    f: function() {
      try {
        if (!normalCompletion && it.return != null)
          it.return();
      } finally {
        if (didErr)
          throw err;
      }
    }
  };
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var check = function(it) {
  return it && it.Math == Math && it;
};
var global$a = check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || check(typeof self == "object" && self) || check(typeof commonjsGlobal == "object" && commonjsGlobal) || function() {
  return this;
}() || Function("return this")();
var objectGetOwnPropertyDescriptor = {};
var fails$9 = function(exec2) {
  try {
    return !!exec2();
  } catch (error) {
    return true;
  }
};
var fails$8 = fails$9;
var descriptors = !fails$8(function() {
  return Object.defineProperty({}, 1, {get: function() {
    return 7;
  }})[1] != 7;
});
var fails$7 = fails$9;
var functionBindNative = !fails$7(function() {
  var test2 = function() {
  }.bind();
  return typeof test2 != "function" || test2.hasOwnProperty("prototype");
});
var NATIVE_BIND$2 = functionBindNative;
var call$4 = Function.prototype.call;
var functionCall = NATIVE_BIND$2 ? call$4.bind(call$4) : function() {
  return call$4.apply(call$4, arguments);
};
var objectPropertyIsEnumerable = {};
var $propertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({1: 2}, 1);
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$1(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;
var createPropertyDescriptor$2 = function(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value
  };
};
var NATIVE_BIND$1 = functionBindNative;
var FunctionPrototype$1 = Function.prototype;
var call$3 = FunctionPrototype$1.call;
var uncurryThisWithBind = NATIVE_BIND$1 && FunctionPrototype$1.bind.bind(call$3, call$3);
var functionUncurryThisRaw = function(fn) {
  return NATIVE_BIND$1 ? uncurryThisWithBind(fn) : function() {
    return call$3.apply(fn, arguments);
  };
};
var uncurryThisRaw$1 = functionUncurryThisRaw;
var toString$1 = uncurryThisRaw$1({}.toString);
var stringSlice = uncurryThisRaw$1("".slice);
var classofRaw$2 = function(it) {
  return stringSlice(toString$1(it), 8, -1);
};
var classofRaw$1 = classofRaw$2;
var uncurryThisRaw = functionUncurryThisRaw;
var functionUncurryThis = function(fn) {
  if (classofRaw$1(fn) === "Function")
    return uncurryThisRaw(fn);
};
var uncurryThis$9 = functionUncurryThis;
var fails$6 = fails$9;
var classof$3 = classofRaw$2;
var $Object$3 = Object;
var split = uncurryThis$9("".split);
var indexedObject = fails$6(function() {
  return !$Object$3("z").propertyIsEnumerable(0);
}) ? function(it) {
  return classof$3(it) == "String" ? split(it, "") : $Object$3(it);
} : $Object$3;
var isNullOrUndefined$2 = function(it) {
  return it === null || it === void 0;
};
var isNullOrUndefined$1 = isNullOrUndefined$2;
var $TypeError$5 = TypeError;
var requireObjectCoercible$2 = function(it) {
  if (isNullOrUndefined$1(it))
    throw $TypeError$5("Can't call method on " + it);
  return it;
};
var IndexedObject$1 = indexedObject;
var requireObjectCoercible$1 = requireObjectCoercible$2;
var toIndexedObject$4 = function(it) {
  return IndexedObject$1(requireObjectCoercible$1(it));
};
var documentAll$2 = typeof document == "object" && document.all;
var IS_HTMLDDA = typeof documentAll$2 == "undefined" && documentAll$2 !== void 0;
var documentAll_1 = {
  all: documentAll$2,
  IS_HTMLDDA
};
var $documentAll$1 = documentAll_1;
var documentAll$1 = $documentAll$1.all;
var isCallable$c = $documentAll$1.IS_HTMLDDA ? function(argument) {
  return typeof argument == "function" || argument === documentAll$1;
} : function(argument) {
  return typeof argument == "function";
};
var isCallable$b = isCallable$c;
var $documentAll = documentAll_1;
var documentAll = $documentAll.all;
var isObject$6 = $documentAll.IS_HTMLDDA ? function(it) {
  return typeof it == "object" ? it !== null : isCallable$b(it) || it === documentAll;
} : function(it) {
  return typeof it == "object" ? it !== null : isCallable$b(it);
};
var global$9 = global$a;
var isCallable$a = isCallable$c;
var aFunction = function(argument) {
  return isCallable$a(argument) ? argument : void 0;
};
var getBuiltIn$5 = function(namespace, method) {
  return arguments.length < 2 ? aFunction(global$9[namespace]) : global$9[namespace] && global$9[namespace][method];
};
var uncurryThis$8 = functionUncurryThis;
var objectIsPrototypeOf = uncurryThis$8({}.isPrototypeOf);
var getBuiltIn$4 = getBuiltIn$5;
var engineUserAgent = getBuiltIn$4("navigator", "userAgent") || "";
var global$8 = global$a;
var userAgent = engineUserAgent;
var process = global$8.process;
var Deno = global$8.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;
if (v8) {
  match = v8.split(".");
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match)
      version = +match[1];
  }
}
var engineV8Version = version;
var V8_VERSION = engineV8Version;
var fails$5 = fails$9;
var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$5(function() {
  var symbol = Symbol();
  return !String(symbol) || !(Object(symbol) instanceof Symbol) || !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});
var NATIVE_SYMBOL$1 = symbolConstructorDetection;
var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == "symbol";
var getBuiltIn$3 = getBuiltIn$5;
var isCallable$9 = isCallable$c;
var isPrototypeOf = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
var $Object$2 = Object;
var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function(it) {
  return typeof it == "symbol";
} : function(it) {
  var $Symbol = getBuiltIn$3("Symbol");
  return isCallable$9($Symbol) && isPrototypeOf($Symbol.prototype, $Object$2(it));
};
var $String$1 = String;
var tryToString$1 = function(argument) {
  try {
    return $String$1(argument);
  } catch (error) {
    return "Object";
  }
};
var isCallable$8 = isCallable$c;
var tryToString = tryToString$1;
var $TypeError$4 = TypeError;
var aCallable$2 = function(argument) {
  if (isCallable$8(argument))
    return argument;
  throw $TypeError$4(tryToString(argument) + " is not a function");
};
var aCallable$1 = aCallable$2;
var isNullOrUndefined = isNullOrUndefined$2;
var getMethod$1 = function(V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? void 0 : aCallable$1(func);
};
var call$2 = functionCall;
var isCallable$7 = isCallable$c;
var isObject$5 = isObject$6;
var $TypeError$3 = TypeError;
var ordinaryToPrimitive$1 = function(input, pref) {
  var fn, val;
  if (pref === "string" && isCallable$7(fn = input.toString) && !isObject$5(val = call$2(fn, input)))
    return val;
  if (isCallable$7(fn = input.valueOf) && !isObject$5(val = call$2(fn, input)))
    return val;
  if (pref !== "string" && isCallable$7(fn = input.toString) && !isObject$5(val = call$2(fn, input)))
    return val;
  throw $TypeError$3("Can't convert object to primitive value");
};
var shared$3 = {exports: {}};
var global$7 = global$a;
var defineProperty$2 = Object.defineProperty;
var defineGlobalProperty$3 = function(key, value) {
  try {
    defineProperty$2(global$7, key, {value, configurable: true, writable: true});
  } catch (error) {
    global$7[key] = value;
  }
  return value;
};
var global$6 = global$a;
var defineGlobalProperty$2 = defineGlobalProperty$3;
var SHARED = "__core-js_shared__";
var store$3 = global$6[SHARED] || defineGlobalProperty$2(SHARED, {});
var sharedStore = store$3;
var store$2 = sharedStore;
(shared$3.exports = function(key, value) {
  return store$2[key] || (store$2[key] = value !== void 0 ? value : {});
})("versions", []).push({
  version: "3.25.5",
  mode: "global",
  copyright: "© 2014-2022 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.25.5/LICENSE",
  source: "https://github.com/zloirock/core-js"
});
var requireObjectCoercible = requireObjectCoercible$2;
var $Object$1 = Object;
var toObject$2 = function(argument) {
  return $Object$1(requireObjectCoercible(argument));
};
var uncurryThis$7 = functionUncurryThis;
var toObject$1 = toObject$2;
var hasOwnProperty = uncurryThis$7({}.hasOwnProperty);
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$1(it), key);
};
var uncurryThis$6 = functionUncurryThis;
var id = 0;
var postfix = Math.random();
var toString = uncurryThis$6(1 .toString);
var uid$2 = function(key) {
  return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString(++id + postfix, 36);
};
var global$5 = global$a;
var shared$2 = shared$3.exports;
var hasOwn$6 = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = symbolConstructorDetection;
var USE_SYMBOL_AS_UID = useSymbolAsUid;
var WellKnownSymbolsStore = shared$2("wks");
var Symbol$1 = global$5.Symbol;
var symbolFor = Symbol$1 && Symbol$1["for"];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;
var wellKnownSymbol$5 = function(name) {
  if (!hasOwn$6(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == "string")) {
    var description = "Symbol." + name;
    if (NATIVE_SYMBOL && hasOwn$6(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }
  return WellKnownSymbolsStore[name];
};
var call$1 = functionCall;
var isObject$4 = isObject$6;
var isSymbol$1 = isSymbol$2;
var getMethod = getMethod$1;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$4 = wellKnownSymbol$5;
var $TypeError$2 = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$4("toPrimitive");
var toPrimitive$1 = function(input, pref) {
  if (!isObject$4(input) || isSymbol$1(input))
    return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === void 0)
      pref = "default";
    result = call$1(exoticToPrim, input, pref);
    if (!isObject$4(result) || isSymbol$1(result))
      return result;
    throw $TypeError$2("Can't convert object to primitive value");
  }
  if (pref === void 0)
    pref = "number";
  return ordinaryToPrimitive(input, pref);
};
var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;
var toPropertyKey$2 = function(argument) {
  var key = toPrimitive(argument, "string");
  return isSymbol(key) ? key : key + "";
};
var global$4 = global$a;
var isObject$3 = isObject$6;
var document$1 = global$4.document;
var EXISTS$1 = isObject$3(document$1) && isObject$3(document$1.createElement);
var documentCreateElement$1 = function(it) {
  return EXISTS$1 ? document$1.createElement(it) : {};
};
var DESCRIPTORS$7 = descriptors;
var fails$4 = fails$9;
var createElement = documentCreateElement$1;
var ie8DomDefine = !DESCRIPTORS$7 && !fails$4(function() {
  return Object.defineProperty(createElement("div"), "a", {
    get: function() {
      return 7;
    }
  }).a != 7;
});
var DESCRIPTORS$6 = descriptors;
var call = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$1 = createPropertyDescriptor$2;
var toIndexedObject$3 = toIndexedObject$4;
var toPropertyKey$1 = toPropertyKey$2;
var hasOwn$5 = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$6 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$3(O);
  P = toPropertyKey$1(P);
  if (IE8_DOM_DEFINE$1)
    try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) {
    }
  if (hasOwn$5(O, P))
    return createPropertyDescriptor$1(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};
var objectDefineProperty = {};
var DESCRIPTORS$5 = descriptors;
var fails$3 = fails$9;
var v8PrototypeDefineBug = DESCRIPTORS$5 && fails$3(function() {
  return Object.defineProperty(function() {
  }, "prototype", {
    value: 42,
    writable: false
  }).prototype != 42;
});
var isObject$2 = isObject$6;
var $String = String;
var $TypeError$1 = TypeError;
var anObject$4 = function(argument) {
  if (isObject$2(argument))
    return argument;
  throw $TypeError$1($String(argument) + " is not an object");
};
var DESCRIPTORS$4 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$3 = anObject$4;
var toPropertyKey = toPropertyKey$2;
var $TypeError = TypeError;
var $defineProperty = Object.defineProperty;
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = "enumerable";
var CONFIGURABLE$1 = "configurable";
var WRITABLE = "writable";
objectDefineProperty.f = DESCRIPTORS$4 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$3(O);
  P = toPropertyKey(P);
  anObject$3(Attributes);
  if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  }
  return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty2(O, P, Attributes) {
  anObject$3(O);
  P = toPropertyKey(P);
  anObject$3(Attributes);
  if (IE8_DOM_DEFINE)
    try {
      return $defineProperty(O, P, Attributes);
    } catch (error) {
    }
  if ("get" in Attributes || "set" in Attributes)
    throw $TypeError("Accessors not supported");
  if ("value" in Attributes)
    O[P] = Attributes.value;
  return O;
};
var DESCRIPTORS$3 = descriptors;
var definePropertyModule$3 = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$2;
var createNonEnumerableProperty$2 = DESCRIPTORS$3 ? function(object, key, value) {
  return definePropertyModule$3.f(object, key, createPropertyDescriptor(1, value));
} : function(object, key, value) {
  object[key] = value;
  return object;
};
var makeBuiltIn$2 = {exports: {}};
var DESCRIPTORS$2 = descriptors;
var hasOwn$4 = hasOwnProperty_1;
var FunctionPrototype = Function.prototype;
var getDescriptor = DESCRIPTORS$2 && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn$4(FunctionPrototype, "name");
var PROPER = EXISTS && function something() {
}.name === "something";
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$2 || DESCRIPTORS$2 && getDescriptor(FunctionPrototype, "name").configurable);
var functionName = {
  EXISTS,
  PROPER,
  CONFIGURABLE
};
var uncurryThis$5 = functionUncurryThis;
var isCallable$6 = isCallable$c;
var store$1 = sharedStore;
var functionToString = uncurryThis$5(Function.toString);
if (!isCallable$6(store$1.inspectSource)) {
  store$1.inspectSource = function(it) {
    return functionToString(it);
  };
}
var inspectSource$2 = store$1.inspectSource;
var global$3 = global$a;
var isCallable$5 = isCallable$c;
var WeakMap$1 = global$3.WeakMap;
var weakMapBasicDetection = isCallable$5(WeakMap$1) && /native code/.test(String(WeakMap$1));
var shared$1 = shared$3.exports;
var uid = uid$2;
var keys = shared$1("keys");
var sharedKey$2 = function(key) {
  return keys[key] || (keys[key] = uid(key));
};
var hiddenKeys$4 = {};
var NATIVE_WEAK_MAP = weakMapBasicDetection;
var global$2 = global$a;
var isObject$1 = isObject$6;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$2;
var hasOwn$3 = hasOwnProperty_1;
var shared = sharedStore;
var sharedKey$1 = sharedKey$2;
var hiddenKeys$3 = hiddenKeys$4;
var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
var TypeError$1 = global$2.TypeError;
var WeakMap = global$2.WeakMap;
var set, get, has;
var enforce = function(it) {
  return has(it) ? get(it) : set(it, {});
};
var getterFor = function(TYPE) {
  return function(it) {
    var state;
    if (!isObject$1(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$1("Incompatible receiver, " + TYPE + " required");
    }
    return state;
  };
};
if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  set = function(it, metadata) {
    if (store.has(it))
      throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function(it) {
    return store.get(it) || {};
  };
  has = function(it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey$1("state");
  hiddenKeys$3[STATE] = true;
  set = function(it, metadata) {
    if (hasOwn$3(it, STATE))
      throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$1(it, STATE, metadata);
    return metadata;
  };
  get = function(it) {
    return hasOwn$3(it, STATE) ? it[STATE] : {};
  };
  has = function(it) {
    return hasOwn$3(it, STATE);
  };
}
var internalState = {
  set,
  get,
  has,
  enforce,
  getterFor
};
var fails$2 = fails$9;
var isCallable$4 = isCallable$c;
var hasOwn$2 = hasOwnProperty_1;
var DESCRIPTORS$1 = descriptors;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
var inspectSource$1 = inspectSource$2;
var InternalStateModule = internalState;
var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var defineProperty$1 = Object.defineProperty;
var CONFIGURABLE_LENGTH = DESCRIPTORS$1 && !fails$2(function() {
  return defineProperty$1(function() {
  }, "length", {value: 8}).length !== 8;
});
var TEMPLATE = String(String).split("String");
var makeBuiltIn$1 = makeBuiltIn$2.exports = function(value, name, options) {
  if (String(name).slice(0, 7) === "Symbol(") {
    name = "[" + String(name).replace(/^Symbol\(([^)]*)\)/, "$1") + "]";
  }
  if (options && options.getter)
    name = "get " + name;
  if (options && options.setter)
    name = "set " + name;
  if (!hasOwn$2(value, "name") || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
    if (DESCRIPTORS$1)
      defineProperty$1(value, "name", {value: name, configurable: true});
    else
      value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$2(options, "arity") && value.length !== options.arity) {
    defineProperty$1(value, "length", {value: options.arity});
  }
  try {
    if (options && hasOwn$2(options, "constructor") && options.constructor) {
      if (DESCRIPTORS$1)
        defineProperty$1(value, "prototype", {writable: false});
    } else if (value.prototype)
      value.prototype = void 0;
  } catch (error) {
  }
  var state = enforceInternalState(value);
  if (!hasOwn$2(state, "source")) {
    state.source = TEMPLATE.join(typeof name == "string" ? name : "");
  }
  return value;
};
Function.prototype.toString = makeBuiltIn$1(function toString2() {
  return isCallable$4(this) && getInternalState(this).source || inspectSource$1(this);
}, "toString");
var isCallable$3 = isCallable$c;
var definePropertyModule$2 = objectDefineProperty;
var makeBuiltIn = makeBuiltIn$2.exports;
var defineGlobalProperty$1 = defineGlobalProperty$3;
var defineBuiltIn$1 = function(O, key, value, options) {
  if (!options)
    options = {};
  var simple = options.enumerable;
  var name = options.name !== void 0 ? options.name : key;
  if (isCallable$3(value))
    makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple)
      O[key] = value;
    else
      defineGlobalProperty$1(key, value);
  } else {
    try {
      if (!options.unsafe)
        delete O[key];
      else if (O[key])
        simple = true;
    } catch (error) {
    }
    if (simple)
      O[key] = value;
    else
      definePropertyModule$2.f(O, key, {
        value,
        enumerable: false,
        configurable: !options.nonConfigurable,
        writable: !options.nonWritable
      });
  }
  return O;
};
var objectGetOwnPropertyNames = {};
var ceil = Math.ceil;
var floor = Math.floor;
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};
var trunc2 = mathTrunc;
var toIntegerOrInfinity$2 = function(argument) {
  var number = +argument;
  return number !== number || number === 0 ? 0 : trunc2(number);
};
var toIntegerOrInfinity$1 = toIntegerOrInfinity$2;
var max = Math.max;
var min$1 = Math.min;
var toAbsoluteIndex$1 = function(index, length) {
  var integer = toIntegerOrInfinity$1(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};
var toIntegerOrInfinity = toIntegerOrInfinity$2;
var min = Math.min;
var toLength$1 = function(argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 9007199254740991) : 0;
};
var toLength = toLength$1;
var lengthOfArrayLike$2 = function(obj) {
  return toLength(obj.length);
};
var toIndexedObject$2 = toIndexedObject$4;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike$1 = lengthOfArrayLike$2;
var createMethod$1 = function(IS_INCLUDES) {
  return function($this, el, fromIndex) {
    var O = toIndexedObject$2($this);
    var length = lengthOfArrayLike$1(O);
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
  includes: createMethod$1(true),
  indexOf: createMethod$1(false)
};
var uncurryThis$4 = functionUncurryThis;
var hasOwn$1 = hasOwnProperty_1;
var toIndexedObject$1 = toIndexedObject$4;
var indexOf = arrayIncludes.indexOf;
var hiddenKeys$2 = hiddenKeys$4;
var push$1 = uncurryThis$4([].push);
var objectKeysInternal = function(object, names) {
  var O = toIndexedObject$1(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O)
    !hasOwn$1(hiddenKeys$2, key) && hasOwn$1(O, key) && push$1(result, key);
  while (names.length > i)
    if (hasOwn$1(O, key = names[i++])) {
      ~indexOf(result, key) || push$1(result, key);
    }
  return result;
};
var enumBugKeys$3 = [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
];
var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;
var hiddenKeys$1 = enumBugKeys$2.concat("length", "prototype");
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$1);
};
var objectGetOwnPropertySymbols = {};
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
var getBuiltIn$2 = getBuiltIn$5;
var uncurryThis$3 = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject$2 = anObject$4;
var concat = uncurryThis$3([].concat);
var ownKeys$1 = getBuiltIn$2("Reflect", "ownKeys") || function ownKeys(it) {
  var keys3 = getOwnPropertyNamesModule.f(anObject$2(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys3, getOwnPropertySymbols(it)) : keys3;
};
var hasOwn2 = hasOwnProperty_1;
var ownKeys2 = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$1 = objectDefineProperty;
var copyConstructorProperties$1 = function(target, source, exceptions) {
  var keys3 = ownKeys2(source);
  var defineProperty4 = definePropertyModule$1.f;
  var getOwnPropertyDescriptor3 = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys3.length; i++) {
    var key = keys3[i];
    if (!hasOwn2(target, key) && !(exceptions && hasOwn2(exceptions, key))) {
      defineProperty4(target, key, getOwnPropertyDescriptor3(source, key));
    }
  }
};
var fails$1 = fails$9;
var isCallable$2 = isCallable$c;
var replacement = /#|\.prototype\./;
var isForced$1 = function(feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable$2(detection) ? fails$1(detection) : !!detection;
};
var normalize = isForced$1.normalize = function(string) {
  return String(string).replace(replacement, ".").toLowerCase();
};
var data = isForced$1.data = {};
var NATIVE = isForced$1.NATIVE = "N";
var POLYFILL = isForced$1.POLYFILL = "P";
var isForced_1 = isForced$1;
var global$1 = global$a;
var getOwnPropertyDescriptor2 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty = createNonEnumerableProperty$2;
var defineBuiltIn = defineBuiltIn$1;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced = isForced_1;
var _export = function(options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$1;
  } else if (STATIC) {
    target = global$1[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global$1[TARGET] || {}).prototype;
  }
  if (target)
    for (key in source) {
      sourceProperty = source[key];
      if (options.dontCallGetSet) {
        descriptor = getOwnPropertyDescriptor2(target, key);
        targetProperty = descriptor && descriptor.value;
      } else
        targetProperty = target[key];
      FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
      if (!FORCED && targetProperty !== void 0) {
        if (typeof sourceProperty == typeof targetProperty)
          continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      if (options.sham || targetProperty && targetProperty.sham) {
        createNonEnumerableProperty(sourceProperty, "sham", true);
      }
      defineBuiltIn(target, key, sourceProperty, options);
    }
};
var uncurryThis$2 = functionUncurryThis;
var aCallable = aCallable$2;
var NATIVE_BIND = functionBindNative;
var bind$1 = uncurryThis$2(uncurryThis$2.bind);
var functionBindContext = function(fn, that) {
  aCallable(fn);
  return that === void 0 ? fn : NATIVE_BIND ? bind$1(fn, that) : function() {
    return fn.apply(that, arguments);
  };
};
var classof$2 = classofRaw$2;
var isArray$1 = Array.isArray || function isArray(argument) {
  return classof$2(argument) == "Array";
};
var wellKnownSymbol$3 = wellKnownSymbol$5;
var TO_STRING_TAG$1 = wellKnownSymbol$3("toStringTag");
var test = {};
test[TO_STRING_TAG$1] = "z";
var toStringTagSupport = String(test) === "[object z]";
var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$1 = isCallable$c;
var classofRaw = classofRaw$2;
var wellKnownSymbol$2 = wellKnownSymbol$5;
var TO_STRING_TAG = wellKnownSymbol$2("toStringTag");
var $Object = Object;
var CORRECT_ARGUMENTS = classofRaw(function() {
  return arguments;
}()) == "Arguments";
var tryGet = function(it, key) {
  try {
    return it[key];
  } catch (error) {
  }
};
var classof$1 = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
  var O, tag, result;
  return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && isCallable$1(O.callee) ? "Arguments" : result;
};
var uncurryThis$1 = functionUncurryThis;
var fails = fails$9;
var isCallable = isCallable$c;
var classof = classof$1;
var getBuiltIn$1 = getBuiltIn$5;
var inspectSource = inspectSource$2;
var noop = function() {
};
var empty = [];
var construct = getBuiltIn$1("Reflect", "construct");
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis$1(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);
var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument))
    return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};
var isConstructorLegacy = function isConstructor2(argument) {
  if (!isCallable(argument))
    return false;
  switch (classof(argument)) {
    case "AsyncFunction":
    case "GeneratorFunction":
    case "AsyncGeneratorFunction":
      return false;
  }
  try {
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};
isConstructorLegacy.sham = true;
var isConstructor$1 = !construct || fails(function() {
  var called;
  return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function() {
    called = true;
  }) || called;
}) ? isConstructorLegacy : isConstructorModern;
var isArray2 = isArray$1;
var isConstructor3 = isConstructor$1;
var isObject = isObject$6;
var wellKnownSymbol$1 = wellKnownSymbol$5;
var SPECIES = wellKnownSymbol$1("species");
var $Array = Array;
var arraySpeciesConstructor$1 = function(originalArray) {
  var C;
  if (isArray2(originalArray)) {
    C = originalArray.constructor;
    if (isConstructor3(C) && (C === $Array || isArray2(C.prototype)))
      C = void 0;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null)
        C = void 0;
    }
  }
  return C === void 0 ? $Array : C;
};
var arraySpeciesConstructor = arraySpeciesConstructor$1;
var arraySpeciesCreate$1 = function(originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};
var bind = functionBindContext;
var uncurryThis = functionUncurryThis;
var IndexedObject = indexedObject;
var toObject = toObject$2;
var lengthOfArrayLike = lengthOfArrayLike$2;
var arraySpeciesCreate = arraySpeciesCreate$1;
var push = uncurryThis([].push);
var createMethod = function(TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self2 = IndexedObject(O);
    var boundFunction = bind(callbackfn, that);
    var length = lengthOfArrayLike(self2);
    var index = 0;
    var create3 = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create3($this, length) : IS_FILTER || IS_FILTER_REJECT ? create3($this, 0) : void 0;
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
                push(target, value);
            }
          else
            switch (TYPE) {
              case 4:
                return false;
              case 7:
                push(target, value);
            }
        }
      }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};
var arrayIteration = {
  forEach: createMethod(0),
  map: createMethod(1),
  filter: createMethod(2),
  some: createMethod(3),
  every: createMethod(4),
  find: createMethod(5),
  findIndex: createMethod(6),
  filterReject: createMethod(7)
};
var objectDefineProperties = {};
var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;
var objectKeys$1 = Object.keys || function keys2(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};
var DESCRIPTORS = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule = objectDefineProperty;
var anObject$1 = anObject$4;
var toIndexedObject = toIndexedObject$4;
var objectKeys = objectKeys$1;
objectDefineProperties.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$1(O);
  var props = toIndexedObject(Properties);
  var keys3 = objectKeys(Properties);
  var length = keys3.length;
  var index = 0;
  var key;
  while (length > index)
    definePropertyModule.f(O, key = keys3[index++], props[key]);
  return O;
};
var getBuiltIn = getBuiltIn$5;
var html$1 = getBuiltIn("document", "documentElement");
var anObject = anObject$4;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys = hiddenKeys$4;
var html = html$1;
var documentCreateElement = documentCreateElement$1;
var sharedKey = sharedKey$2;
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
    activeXDocument = new ActiveXObject("htmlfile");
  } catch (error) {
  }
  NullProtoObject = typeof document != "undefined" ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument);
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
  return Properties === void 0 ? result : definePropertiesModule.f(result, Properties);
};
var wellKnownSymbol = wellKnownSymbol$5;
var create2 = objectCreate;
var defineProperty3 = objectDefineProperty.f;
var UNSCOPABLES = wellKnownSymbol("unscopables");
var ArrayPrototype = Array.prototype;
if (ArrayPrototype[UNSCOPABLES] == void 0) {
  defineProperty3(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create2(null)
  });
}
var addToUnscopables$1 = function(key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};
var $ = _export;
var $find = arrayIteration.find;
var addToUnscopables = addToUnscopables$1;
var FIND = "find";
var SKIPS_HOLES = true;
if (FIND in [])
  Array(1)[FIND](function() {
    SKIPS_HOLES = false;
  });
$({target: "Array", proto: true, forced: SKIPS_HOLES}, {
  find: function find(callbackfn) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
  }
});
addToUnscopables(FIND);
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
  set: function set2(target, event, listener) {
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
  get: function get2(target, event) {
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
  var tip = null;
  var forId;
  var target = e.target;
  var lastTarget;
  while (tip === null && target !== null) {
    lastTarget = target;
    tip = target.getAttribute("data-tip") || null;
    forId = target.getAttribute("data-for") || null;
    target = target.parentElement;
  }
  target = lastTarget || e.target;
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
  var outsideLeft = function outsideLeft2(p) {
    return getTipOffsetLeft(p) < 0;
  };
  var outsideRight = function outsideRight2(p) {
    return getTipOffsetRight(p) > windowWidth;
  };
  var outsideTop = function outsideTop2(p) {
    return getTipOffsetTop(p) < 0;
  };
  var outsideBottom = function outsideBottom2(p) {
    return getTipOffsetBottom(p) > windowHeight;
  };
  var outside = function outside2(p) {
    return outsideLeft(p) || outsideRight(p) || outsideTop(p) || outsideBottom(p);
  };
  var inside = function inside2(p) {
    return !outside(p);
  };
  var placeIsInside = {
    top: inside("top"),
    bottom: inside("bottom"),
    left: inside("left"),
    right: inside("right")
  };
  function choose() {
    var allPlaces = desiredPlace.split(",").concat(place, ["top", "bottom", "left", "right"]);
    var _iterator = _createForOfIteratorHelper(allPlaces), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var d = _step.value;
        if (placeIsInside[d])
          return d;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return place;
  }
  var chosen = choose();
  var isNewState = false;
  var newPlace;
  if (chosen && chosen !== place) {
    isNewState = true;
    newPlace = chosen;
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
function TipContent(tip, children, getContent, multiline) {
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
    return /* @__PURE__ */ react.createElement("span", {
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
var baseCss = '.__react_component_tooltip {\n  border-radius: 3px;\n  display: inline-block;\n  font-size: 13px;\n  left: -999em;\n  opacity: 0;\n  position: fixed;\n  pointer-events: none;\n  transition: opacity 0.3s ease-out;\n  top: -999em;\n  visibility: hidden;\n  z-index: 999;\n}\n.__react_component_tooltip.allow_hover, .__react_component_tooltip.allow_click {\n  pointer-events: auto;\n}\n.__react_component_tooltip::before, .__react_component_tooltip::after {\n  content: "";\n  width: 0;\n  height: 0;\n  position: absolute;\n}\n.__react_component_tooltip.show {\n  opacity: 0.9;\n  margin-top: 0;\n  margin-left: 0;\n  visibility: visible;\n}\n.__react_component_tooltip.place-top::before {\n  bottom: 0;\n  left: 50%;\n  margin-left: -11px;\n}\n.__react_component_tooltip.place-bottom::before {\n  top: 0;\n  left: 50%;\n  margin-left: -11px;\n}\n.__react_component_tooltip.place-left::before {\n  right: 0;\n  top: 50%;\n  margin-top: -9px;\n}\n.__react_component_tooltip.place-right::before {\n  left: 0;\n  top: 50%;\n  margin-top: -9px;\n}\n.__react_component_tooltip .multi-line {\n  display: block;\n  padding: 2px 0;\n  text-align: center;\n}';
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
var DEFAULT_PADDING = "8px 21px";
var DEFAULT_RADIUS = {
  tooltip: 3,
  arrow: 0
};
function generateTooltipStyle(uuid, customColors, type, hasBorder, padding, radius) {
  return generateStyle(uuid, getPopupColors(customColors, type, hasBorder), padding, radius);
}
function generateStyle(uuid, colors) {
  var padding = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : DEFAULT_PADDING;
  var radius = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : DEFAULT_RADIUS;
  var textColor = colors.text;
  var backgroundColor = colors.background;
  var borderColor = colors.border;
  var arrowColor = colors.arrow;
  var arrowRadius = radius.arrow;
  var tooltipRadius = radius.tooltip;
  return "\n  	.".concat(uuid, " {\n	    color: ").concat(textColor, ";\n	    background: ").concat(backgroundColor, ";\n	    border: 1px solid ").concat(borderColor, ";\n	    border-radius: ").concat(tooltipRadius, "px;\n	    padding: ").concat(padding, ";\n  	}\n\n  	.").concat(uuid, ".place-top {\n        margin-top: -10px;\n    }\n    .").concat(uuid, '.place-top::before {\n        content: "";\n        background-color: inherit;\n        position: absolute;\n        z-index: 2;\n        width: 20px;\n        height: 12px;\n    }\n    .').concat(uuid, '.place-top::after {\n        content: "";\n        position: absolute;\n        width: 10px;\n        height: 10px;\n        border-top-right-radius: ').concat(arrowRadius, "px;\n        border: 1px solid ").concat(borderColor, ";\n        background-color: ").concat(arrowColor, ";\n        z-index: -2;\n        bottom: -6px;\n        left: 50%;\n        margin-left: -6px;\n        transform: rotate(135deg);\n    }\n\n    .").concat(uuid, ".place-bottom {\n        margin-top: 10px;\n    }\n    .").concat(uuid, '.place-bottom::before {\n        content: "";\n        background-color: inherit;\n        position: absolute;\n        z-index: -1;\n        width: 18px;\n        height: 10px;\n    }\n    .').concat(uuid, '.place-bottom::after {\n        content: "";\n        position: absolute;\n        width: 10px;\n        height: 10px;\n        border-top-right-radius: ').concat(arrowRadius, "px;\n        border: 1px solid ").concat(borderColor, ";\n        background-color: ").concat(arrowColor, ";\n        z-index: -2;\n        top: -6px;\n        left: 50%;\n        margin-left: -6px;\n        transform: rotate(45deg);\n    }\n\n    .").concat(uuid, ".place-left {\n        margin-left: -10px;\n    }\n    .").concat(uuid, '.place-left::before {\n        content: "";\n        background-color: inherit;\n        position: absolute;\n        z-index: -1;\n        width: 10px;\n        height: 18px;\n    }\n    .').concat(uuid, '.place-left::after {\n        content: "";\n        position: absolute;\n        width: 10px;\n        height: 10px;\n        border-top-right-radius: ').concat(arrowRadius, "px;\n        border: 1px solid ").concat(borderColor, ";\n        background-color: ").concat(arrowColor, ";\n        z-index: -2;\n        right: -6px;\n        top: 50%;\n        margin-top: -6px;\n        transform: rotate(45deg);\n    }\n\n    .").concat(uuid, ".place-right {\n        margin-left: 10px;\n    }\n    .").concat(uuid, '.place-right::before {\n        content: "";\n        background-color: inherit;\n        position: absolute;\n        z-index: -1;\n        width: 10px;\n        height: 18px;\n    }\n    .').concat(uuid, '.place-right::after {\n        content: "";\n        position: absolute;\n        width: 10px;\n        height: 10px;\n        border-top-right-radius: ').concat(arrowRadius, "px;\n        border: 1px solid ").concat(borderColor, ";\n        background-color: ").concat(arrowColor, ";\n        z-index: -2;\n        left: -6px;\n        top: 50%;\n        margin-top: -6px;\n        transform: rotate(-135deg);\n    }\n  ");
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
var _class, _class2;
var ReactTooltip = staticMethods(_class = windowListener(_class = customEvent(_class = isCapture(_class = getEffect(_class = bodyMode(_class = trackRemoval(_class = (_class2 = /* @__PURE__ */ function(_React$Component) {
  _inherits(ReactTooltip2, _React$Component);
  var _super = _createSuper(ReactTooltip2);
  function ReactTooltip2(props) {
    var _this;
    _classCallCheck(this, ReactTooltip2);
    _this = _super.call(this, props);
    _this.state = {
      uuid: props.uuid || generateUUID(),
      place: props.place || "top",
      desiredPlace: props.place || "top",
      type: props.type || "dark",
      effect: props.effect || "float",
      show: false,
      border: false,
      borderClass: "border",
      customColors: {},
      customRadius: {},
      offset: {},
      padding: props.padding,
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
    value: function bind2(methodArray) {
      var _this2 = this;
      methodArray.forEach(function(method) {
        _this2[method] = _this2[method].bind(_this2);
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props;
      _this$props.insecure;
      var resizeHide = _this$props.resizeHide, disableInternalStyle = _this$props.disableInternalStyle;
      this.mount = true;
      this.bindListener();
      this.bindWindowEvents(resizeHide);
      if (!disableInternalStyle) {
        this.injectStyles();
      }
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
      return TipContent(this.state.originTooltip, children, content, this.state.isMultiline);
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
        e.currentTarget.setAttribute("aria-describedby", this.props.id || this.state.uuid);
      }
      var desiredPlace = e.currentTarget.getAttribute("data-place") || this.props.place || "top";
      var effect = switchToSolid && "solid" || this.getEffect(e.currentTarget);
      var offset = e.currentTarget.getAttribute("data-offset") || this.props.offset || {};
      var result = getPosition(e, e.currentTarget, this.tooltipRef, desiredPlace.split(",")[0], desiredPlace, effect, offset);
      if (result.position && this.props.overridePosition) {
        result.position = this.props.overridePosition(result.position, e, e.currentTarget, this.tooltipRef, desiredPlace, desiredPlace, effect, offset);
      }
      var place = result.isNewState ? result.newState.place : desiredPlace.split(",")[0];
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
          customRadius: {
            tooltip: target.getAttribute("data-tooltip-radius") || self2.props.tooltipRadius || "3",
            arrow: target.getAttribute("data-arrow-radius") || self2.props.arrowRadius || "0"
          },
          effect,
          offset,
          padding: target.getAttribute("data-padding") || self2.props.padding,
          html: (target.getAttribute("data-html") ? target.getAttribute("data-html") === "true" : self2.props.html) || false,
          delayShow: target.getAttribute("data-delay-show") || self2.props.delayShow || 0,
          delayHide: target.getAttribute("data-delay-hide") || self2.props.delayHide || 0,
          delayUpdate: target.getAttribute("data-delay-update") || self2.props.delayUpdate || 0,
          border: (target.getAttribute("data-border") ? target.getAttribute("data-border") === "true" : self2.props.border) || false,
          borderClass: target.getAttribute("data-border-class") || self2.props.borderClass || "border",
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
                var placeholder = TipContent(originTooltip, "", _getContent[0](), isMultiline);
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
      var _this$props6 = this.props, afterShow = _this$props6.afterShow, disableProp = _this$props6.disable;
      var placeholder = this.getTooltipContent();
      var eventTarget = e.currentTarget || e.target;
      if (this.mouseOnToolTip()) {
        return;
      }
      if (this.isEmptyTip(placeholder) || disable || disableProp) {
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
            _this5.updatePosition(function() {
              if (isInvisible && afterShow) {
                afterShow(e);
              }
            });
          });
        }
      };
      if (this.delayShowLoop) {
        clearTimeout(this.delayShowLoop);
      }
      if (delayTime) {
        this.delayShowLoop = setTimeout(updateState, delayTime);
      } else {
        this.delayShowLoop = null;
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
      var _this$props7 = this.props, afterHide = _this$props7.afterHide, disableProp = _this$props7.disable;
      var placeholder = this.getTooltipContent();
      if (!this.mount)
        return;
      if (this.isEmptyTip(placeholder) || disable || disableProp)
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
    value: function updatePosition(callbackAfter) {
      var _this7 = this;
      var _this$state2 = this.state, currentEvent = _this$state2.currentEvent, currentTarget = _this$state2.currentTarget, place = _this$state2.place, desiredPlace = _this$state2.desiredPlace, effect = _this$state2.effect, offset = _this$state2.offset;
      var node = this.tooltipRef;
      var result = getPosition(currentEvent, currentTarget, node, place, desiredPlace, effect, offset);
      if (result.position && this.props.overridePosition) {
        result.position = this.props.overridePosition(result.position, currentEvent, currentTarget, node, place, desiredPlace, effect, offset);
      }
      if (result.isNewState) {
        return this.setState(result.newState, function() {
          _this7.updatePosition(callbackAfter);
        });
      }
      if (callbackAfter && typeof callbackAfter === "function") {
        callbackAfter();
      }
      node.style.left = result.position.left + "px";
      node.style.top = result.position.top + "px";
    }
  }, {
    key: "clearTimer",
    value: function clearTimer() {
      if (this.delayShowLoop) {
        clearTimeout(this.delayShowLoop);
        this.delayShowLoop = null;
      }
      if (this.delayHideLoop) {
        clearTimeout(this.delayHideLoop);
        this.delayHideLoop = null;
      }
      if (this.delayReshow) {
        clearTimeout(this.delayReshow);
        this.delayReshow = null;
      }
      if (this.intervalUpdateContent) {
        clearInterval(this.intervalUpdateContent);
        this.intervalUpdateContent = null;
      }
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
      var style = this.props.disableInternalStyle ? "" : generateTooltipStyle(this.state.uuid, this.state.customColors, this.state.type, this.state.border, this.state.padding, this.state.customRadius);
      var tooltipClass = "__react_component_tooltip" + " ".concat(this.state.uuid) + (this.state.show && !disable && !isEmptyTip ? " show" : "") + (this.state.border ? " " + this.state.borderClass : "") + " place-".concat(this.state.place) + " type-".concat(this.hasCustomColors() ? "custom" : this.state.type) + (this.props.delayUpdate ? " allow_hover" : "") + (this.props.clickable ? " allow_click" : "");
      var Wrapper = this.props.wrapper;
      if (ReactTooltip2.supportedWrappers.indexOf(Wrapper) < 0) {
        Wrapper = ReactTooltip2.defaultProps.wrapper;
      }
      var wrapperClassName = [tooltipClass, extraClass].filter(Boolean).join(" ");
      if (html2) {
        var htmlContent = "".concat(content).concat(style ? '\n<style aria-hidden="true">'.concat(style, "</style>") : "");
        return /* @__PURE__ */ react.createElement(Wrapper, _extends({
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
        return /* @__PURE__ */ react.createElement(Wrapper, _extends({
          className: "".concat(wrapperClassName),
          id: this.props.id || uuid
        }, ariaProps, {
          ref: function ref(_ref2) {
            return _this9.tooltipRef = _ref2;
          },
          "data-id": "tooltip"
        }), style && /* @__PURE__ */ react.createElement("style", {
          dangerouslySetInnerHTML: {
            __html: style
          },
          "aria-hidden": "true"
        }), content);
      }
    }
  }], [{
    key: "propTypes",
    get: function get3() {
      return {
        uuid: propTypes.string,
        children: propTypes.any,
        place: propTypes.string,
        type: propTypes.string,
        effect: propTypes.string,
        offset: propTypes.object,
        padding: propTypes.string,
        multiline: propTypes.bool,
        border: propTypes.bool,
        borderClass: propTypes.string,
        textColor: propTypes.string,
        backgroundColor: propTypes.string,
        borderColor: propTypes.string,
        arrowColor: propTypes.string,
        arrowRadius: propTypes.string,
        tooltipRadius: propTypes.string,
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
        clickable: propTypes.bool,
        disableInternalStyle: propTypes.bool
      };
    }
  }, {
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
      return _objectSpread2(_objectSpread2({}, prevState), {}, {
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
}), _defineProperty(_class2, "supportedWrappers", ["div", "span"]), _defineProperty(_class2, "displayName", "ReactTooltip"), _class2)) || _class) || _class) || _class) || _class) || _class) || _class) || _class;
export default ReactTooltip;
