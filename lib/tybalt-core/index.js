var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// ../../node_modules/core-js/internals/global.js
var require_global = __commonJS({
  "../../node_modules/core-js/internals/global.js"(exports, module) {
    var check = function(it) {
      return it && it.Math == Math && it;
    };
    module.exports = check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || check(typeof self == "object" && self) || check(typeof global == "object" && global) || function() {
      return this;
    }() || Function("return this")();
  }
});

// ../../node_modules/core-js/internals/fails.js
var require_fails = __commonJS({
  "../../node_modules/core-js/internals/fails.js"(exports, module) {
    module.exports = function(exec) {
      try {
        return !!exec();
      } catch (error) {
        return true;
      }
    };
  }
});

// ../../node_modules/core-js/internals/descriptors.js
var require_descriptors = __commonJS({
  "../../node_modules/core-js/internals/descriptors.js"(exports, module) {
    var fails = require_fails();
    module.exports = !fails(function() {
      return Object.defineProperty({}, 1, { get: function() {
        return 7;
      } })[1] != 7;
    });
  }
});

// ../../node_modules/core-js/internals/function-bind-native.js
var require_function_bind_native = __commonJS({
  "../../node_modules/core-js/internals/function-bind-native.js"(exports, module) {
    var fails = require_fails();
    module.exports = !fails(function() {
      var test = function() {
      }.bind();
      return typeof test != "function" || test.hasOwnProperty("prototype");
    });
  }
});

// ../../node_modules/core-js/internals/function-call.js
var require_function_call = __commonJS({
  "../../node_modules/core-js/internals/function-call.js"(exports, module) {
    var NATIVE_BIND = require_function_bind_native();
    var call = Function.prototype.call;
    module.exports = NATIVE_BIND ? call.bind(call) : function() {
      return call.apply(call, arguments);
    };
  }
});

// ../../node_modules/core-js/internals/object-property-is-enumerable.js
var require_object_property_is_enumerable = __commonJS({
  "../../node_modules/core-js/internals/object-property-is-enumerable.js"(exports) {
    "use strict";
    var $propertyIsEnumerable = {}.propertyIsEnumerable;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);
    exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor(this, V);
      return !!descriptor && descriptor.enumerable;
    } : $propertyIsEnumerable;
  }
});

// ../../node_modules/core-js/internals/create-property-descriptor.js
var require_create_property_descriptor = __commonJS({
  "../../node_modules/core-js/internals/create-property-descriptor.js"(exports, module) {
    module.exports = function(bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value
      };
    };
  }
});

// ../../node_modules/core-js/internals/function-uncurry-this.js
var require_function_uncurry_this = __commonJS({
  "../../node_modules/core-js/internals/function-uncurry-this.js"(exports, module) {
    var NATIVE_BIND = require_function_bind_native();
    var FunctionPrototype = Function.prototype;
    var call = FunctionPrototype.call;
    var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);
    module.exports = NATIVE_BIND ? uncurryThisWithBind : function(fn) {
      return function() {
        return call.apply(fn, arguments);
      };
    };
  }
});

// ../../node_modules/core-js/internals/classof-raw.js
var require_classof_raw = __commonJS({
  "../../node_modules/core-js/internals/classof-raw.js"(exports, module) {
    var uncurryThis = require_function_uncurry_this();
    var toString = uncurryThis({}.toString);
    var stringSlice = uncurryThis("".slice);
    module.exports = function(it) {
      return stringSlice(toString(it), 8, -1);
    };
  }
});

// ../../node_modules/core-js/internals/indexed-object.js
var require_indexed_object = __commonJS({
  "../../node_modules/core-js/internals/indexed-object.js"(exports, module) {
    var uncurryThis = require_function_uncurry_this();
    var fails = require_fails();
    var classof = require_classof_raw();
    var $Object = Object;
    var split = uncurryThis("".split);
    module.exports = fails(function() {
      return !$Object("z").propertyIsEnumerable(0);
    }) ? function(it) {
      return classof(it) == "String" ? split(it, "") : $Object(it);
    } : $Object;
  }
});

// ../../node_modules/core-js/internals/is-null-or-undefined.js
var require_is_null_or_undefined = __commonJS({
  "../../node_modules/core-js/internals/is-null-or-undefined.js"(exports, module) {
    module.exports = function(it) {
      return it === null || it === void 0;
    };
  }
});

// ../../node_modules/core-js/internals/require-object-coercible.js
var require_require_object_coercible = __commonJS({
  "../../node_modules/core-js/internals/require-object-coercible.js"(exports, module) {
    var isNullOrUndefined = require_is_null_or_undefined();
    var $TypeError = TypeError;
    module.exports = function(it) {
      if (isNullOrUndefined(it))
        throw $TypeError("Can't call method on " + it);
      return it;
    };
  }
});

// ../../node_modules/core-js/internals/to-indexed-object.js
var require_to_indexed_object = __commonJS({
  "../../node_modules/core-js/internals/to-indexed-object.js"(exports, module) {
    var IndexedObject = require_indexed_object();
    var requireObjectCoercible = require_require_object_coercible();
    module.exports = function(it) {
      return IndexedObject(requireObjectCoercible(it));
    };
  }
});

// ../../node_modules/core-js/internals/document-all.js
var require_document_all = __commonJS({
  "../../node_modules/core-js/internals/document-all.js"(exports, module) {
    var documentAll = typeof document == "object" && document.all;
    var IS_HTMLDDA = typeof documentAll == "undefined" && documentAll !== void 0;
    module.exports = {
      all: documentAll,
      IS_HTMLDDA
    };
  }
});

// ../../node_modules/core-js/internals/is-callable.js
var require_is_callable = __commonJS({
  "../../node_modules/core-js/internals/is-callable.js"(exports, module) {
    var $documentAll = require_document_all();
    var documentAll = $documentAll.all;
    module.exports = $documentAll.IS_HTMLDDA ? function(argument) {
      return typeof argument == "function" || argument === documentAll;
    } : function(argument) {
      return typeof argument == "function";
    };
  }
});

// ../../node_modules/core-js/internals/is-object.js
var require_is_object = __commonJS({
  "../../node_modules/core-js/internals/is-object.js"(exports, module) {
    var isCallable = require_is_callable();
    var $documentAll = require_document_all();
    var documentAll = $documentAll.all;
    module.exports = $documentAll.IS_HTMLDDA ? function(it) {
      return typeof it == "object" ? it !== null : isCallable(it) || it === documentAll;
    } : function(it) {
      return typeof it == "object" ? it !== null : isCallable(it);
    };
  }
});

// ../../node_modules/core-js/internals/get-built-in.js
var require_get_built_in = __commonJS({
  "../../node_modules/core-js/internals/get-built-in.js"(exports, module) {
    var global2 = require_global();
    var isCallable = require_is_callable();
    var aFunction = function(argument) {
      return isCallable(argument) ? argument : void 0;
    };
    module.exports = function(namespace, method) {
      return arguments.length < 2 ? aFunction(global2[namespace]) : global2[namespace] && global2[namespace][method];
    };
  }
});

// ../../node_modules/core-js/internals/object-is-prototype-of.js
var require_object_is_prototype_of = __commonJS({
  "../../node_modules/core-js/internals/object-is-prototype-of.js"(exports, module) {
    var uncurryThis = require_function_uncurry_this();
    module.exports = uncurryThis({}.isPrototypeOf);
  }
});

// ../../node_modules/core-js/internals/engine-user-agent.js
var require_engine_user_agent = __commonJS({
  "../../node_modules/core-js/internals/engine-user-agent.js"(exports, module) {
    var getBuiltIn = require_get_built_in();
    module.exports = getBuiltIn("navigator", "userAgent") || "";
  }
});

// ../../node_modules/core-js/internals/engine-v8-version.js
var require_engine_v8_version = __commonJS({
  "../../node_modules/core-js/internals/engine-v8-version.js"(exports, module) {
    var global2 = require_global();
    var userAgent = require_engine_user_agent();
    var process = global2.process;
    var Deno = global2.Deno;
    var versions = process && process.versions || Deno && Deno.version;
    var v8 = versions && versions.v8;
    var match;
    var version;
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
    module.exports = version;
  }
});

// ../../node_modules/core-js/internals/symbol-constructor-detection.js
var require_symbol_constructor_detection = __commonJS({
  "../../node_modules/core-js/internals/symbol-constructor-detection.js"(exports, module) {
    var V8_VERSION = require_engine_v8_version();
    var fails = require_fails();
    module.exports = !!Object.getOwnPropertySymbols && !fails(function() {
      var symbol = Symbol();
      return !String(symbol) || !(Object(symbol) instanceof Symbol) || !Symbol.sham && V8_VERSION && V8_VERSION < 41;
    });
  }
});

// ../../node_modules/core-js/internals/use-symbol-as-uid.js
var require_use_symbol_as_uid = __commonJS({
  "../../node_modules/core-js/internals/use-symbol-as-uid.js"(exports, module) {
    var NATIVE_SYMBOL = require_symbol_constructor_detection();
    module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";
  }
});

// ../../node_modules/core-js/internals/is-symbol.js
var require_is_symbol = __commonJS({
  "../../node_modules/core-js/internals/is-symbol.js"(exports, module) {
    var getBuiltIn = require_get_built_in();
    var isCallable = require_is_callable();
    var isPrototypeOf = require_object_is_prototype_of();
    var USE_SYMBOL_AS_UID = require_use_symbol_as_uid();
    var $Object = Object;
    module.exports = USE_SYMBOL_AS_UID ? function(it) {
      return typeof it == "symbol";
    } : function(it) {
      var $Symbol = getBuiltIn("Symbol");
      return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
    };
  }
});

// ../../node_modules/core-js/internals/try-to-string.js
var require_try_to_string = __commonJS({
  "../../node_modules/core-js/internals/try-to-string.js"(exports, module) {
    var $String = String;
    module.exports = function(argument) {
      try {
        return $String(argument);
      } catch (error) {
        return "Object";
      }
    };
  }
});

// ../../node_modules/core-js/internals/a-callable.js
var require_a_callable = __commonJS({
  "../../node_modules/core-js/internals/a-callable.js"(exports, module) {
    var isCallable = require_is_callable();
    var tryToString = require_try_to_string();
    var $TypeError = TypeError;
    module.exports = function(argument) {
      if (isCallable(argument))
        return argument;
      throw $TypeError(tryToString(argument) + " is not a function");
    };
  }
});

// ../../node_modules/core-js/internals/get-method.js
var require_get_method = __commonJS({
  "../../node_modules/core-js/internals/get-method.js"(exports, module) {
    var aCallable = require_a_callable();
    var isNullOrUndefined = require_is_null_or_undefined();
    module.exports = function(V, P) {
      var func = V[P];
      return isNullOrUndefined(func) ? void 0 : aCallable(func);
    };
  }
});

// ../../node_modules/core-js/internals/ordinary-to-primitive.js
var require_ordinary_to_primitive = __commonJS({
  "../../node_modules/core-js/internals/ordinary-to-primitive.js"(exports, module) {
    var call = require_function_call();
    var isCallable = require_is_callable();
    var isObject = require_is_object();
    var $TypeError = TypeError;
    module.exports = function(input, pref) {
      var fn, val;
      if (pref === "string" && isCallable(fn = input.toString) && !isObject(val = call(fn, input)))
        return val;
      if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input)))
        return val;
      if (pref !== "string" && isCallable(fn = input.toString) && !isObject(val = call(fn, input)))
        return val;
      throw $TypeError("Can't convert object to primitive value");
    };
  }
});

// ../../node_modules/core-js/internals/is-pure.js
var require_is_pure = __commonJS({
  "../../node_modules/core-js/internals/is-pure.js"(exports, module) {
    module.exports = false;
  }
});

// ../../node_modules/core-js/internals/define-global-property.js
var require_define_global_property = __commonJS({
  "../../node_modules/core-js/internals/define-global-property.js"(exports, module) {
    var global2 = require_global();
    var defineProperty = Object.defineProperty;
    module.exports = function(key, value) {
      try {
        defineProperty(global2, key, { value, configurable: true, writable: true });
      } catch (error) {
        global2[key] = value;
      }
      return value;
    };
  }
});

// ../../node_modules/core-js/internals/shared-store.js
var require_shared_store = __commonJS({
  "../../node_modules/core-js/internals/shared-store.js"(exports, module) {
    var global2 = require_global();
    var defineGlobalProperty = require_define_global_property();
    var SHARED = "__core-js_shared__";
    var store = global2[SHARED] || defineGlobalProperty(SHARED, {});
    module.exports = store;
  }
});

// ../../node_modules/core-js/internals/shared.js
var require_shared = __commonJS({
  "../../node_modules/core-js/internals/shared.js"(exports, module) {
    var IS_PURE = require_is_pure();
    var store = require_shared_store();
    (module.exports = function(key, value) {
      return store[key] || (store[key] = value !== void 0 ? value : {});
    })("versions", []).push({
      version: "3.26.1",
      mode: IS_PURE ? "pure" : "global",
      copyright: "\xA9 2014-2022 Denis Pushkarev (zloirock.ru)",
      license: "https://github.com/zloirock/core-js/blob/v3.26.1/LICENSE",
      source: "https://github.com/zloirock/core-js"
    });
  }
});

// ../../node_modules/core-js/internals/to-object.js
var require_to_object = __commonJS({
  "../../node_modules/core-js/internals/to-object.js"(exports, module) {
    var requireObjectCoercible = require_require_object_coercible();
    var $Object = Object;
    module.exports = function(argument) {
      return $Object(requireObjectCoercible(argument));
    };
  }
});

// ../../node_modules/core-js/internals/has-own-property.js
var require_has_own_property = __commonJS({
  "../../node_modules/core-js/internals/has-own-property.js"(exports, module) {
    var uncurryThis = require_function_uncurry_this();
    var toObject = require_to_object();
    var hasOwnProperty = uncurryThis({}.hasOwnProperty);
    module.exports = Object.hasOwn || function hasOwn(it, key) {
      return hasOwnProperty(toObject(it), key);
    };
  }
});

// ../../node_modules/core-js/internals/uid.js
var require_uid = __commonJS({
  "../../node_modules/core-js/internals/uid.js"(exports, module) {
    var uncurryThis = require_function_uncurry_this();
    var id = 0;
    var postfix = Math.random();
    var toString = uncurryThis(1 .toString);
    module.exports = function(key) {
      return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString(++id + postfix, 36);
    };
  }
});

// ../../node_modules/core-js/internals/well-known-symbol.js
var require_well_known_symbol = __commonJS({
  "../../node_modules/core-js/internals/well-known-symbol.js"(exports, module) {
    var global2 = require_global();
    var shared = require_shared();
    var hasOwn = require_has_own_property();
    var uid = require_uid();
    var NATIVE_SYMBOL = require_symbol_constructor_detection();
    var USE_SYMBOL_AS_UID = require_use_symbol_as_uid();
    var WellKnownSymbolsStore = shared("wks");
    var Symbol2 = global2.Symbol;
    var symbolFor = Symbol2 && Symbol2["for"];
    var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol2 : Symbol2 && Symbol2.withoutSetter || uid;
    module.exports = function(name) {
      if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == "string")) {
        var description = "Symbol." + name;
        if (NATIVE_SYMBOL && hasOwn(Symbol2, name)) {
          WellKnownSymbolsStore[name] = Symbol2[name];
        } else if (USE_SYMBOL_AS_UID && symbolFor) {
          WellKnownSymbolsStore[name] = symbolFor(description);
        } else {
          WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
        }
      }
      return WellKnownSymbolsStore[name];
    };
  }
});

// ../../node_modules/core-js/internals/to-primitive.js
var require_to_primitive = __commonJS({
  "../../node_modules/core-js/internals/to-primitive.js"(exports, module) {
    var call = require_function_call();
    var isObject = require_is_object();
    var isSymbol = require_is_symbol();
    var getMethod = require_get_method();
    var ordinaryToPrimitive = require_ordinary_to_primitive();
    var wellKnownSymbol = require_well_known_symbol();
    var $TypeError = TypeError;
    var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
    module.exports = function(input, pref) {
      if (!isObject(input) || isSymbol(input))
        return input;
      var exoticToPrim = getMethod(input, TO_PRIMITIVE);
      var result;
      if (exoticToPrim) {
        if (pref === void 0)
          pref = "default";
        result = call(exoticToPrim, input, pref);
        if (!isObject(result) || isSymbol(result))
          return result;
        throw $TypeError("Can't convert object to primitive value");
      }
      if (pref === void 0)
        pref = "number";
      return ordinaryToPrimitive(input, pref);
    };
  }
});

// ../../node_modules/core-js/internals/to-property-key.js
var require_to_property_key = __commonJS({
  "../../node_modules/core-js/internals/to-property-key.js"(exports, module) {
    var toPrimitive = require_to_primitive();
    var isSymbol = require_is_symbol();
    module.exports = function(argument) {
      var key = toPrimitive(argument, "string");
      return isSymbol(key) ? key : key + "";
    };
  }
});

// ../../node_modules/core-js/internals/document-create-element.js
var require_document_create_element = __commonJS({
  "../../node_modules/core-js/internals/document-create-element.js"(exports, module) {
    var global2 = require_global();
    var isObject = require_is_object();
    var document2 = global2.document;
    var EXISTS = isObject(document2) && isObject(document2.createElement);
    module.exports = function(it) {
      return EXISTS ? document2.createElement(it) : {};
    };
  }
});

// ../../node_modules/core-js/internals/ie8-dom-define.js
var require_ie8_dom_define = __commonJS({
  "../../node_modules/core-js/internals/ie8-dom-define.js"(exports, module) {
    var DESCRIPTORS = require_descriptors();
    var fails = require_fails();
    var createElement = require_document_create_element();
    module.exports = !DESCRIPTORS && !fails(function() {
      return Object.defineProperty(createElement("div"), "a", {
        get: function() {
          return 7;
        }
      }).a != 7;
    });
  }
});

// ../../node_modules/core-js/internals/object-get-own-property-descriptor.js
var require_object_get_own_property_descriptor = __commonJS({
  "../../node_modules/core-js/internals/object-get-own-property-descriptor.js"(exports) {
    var DESCRIPTORS = require_descriptors();
    var call = require_function_call();
    var propertyIsEnumerableModule = require_object_property_is_enumerable();
    var createPropertyDescriptor = require_create_property_descriptor();
    var toIndexedObject = require_to_indexed_object();
    var toPropertyKey = require_to_property_key();
    var hasOwn = require_has_own_property();
    var IE8_DOM_DEFINE = require_ie8_dom_define();
    var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject(O);
      P = toPropertyKey(P);
      if (IE8_DOM_DEFINE)
        try {
          return $getOwnPropertyDescriptor(O, P);
        } catch (error) {
        }
      if (hasOwn(O, P))
        return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
    };
  }
});

// ../../node_modules/core-js/internals/v8-prototype-define-bug.js
var require_v8_prototype_define_bug = __commonJS({
  "../../node_modules/core-js/internals/v8-prototype-define-bug.js"(exports, module) {
    var DESCRIPTORS = require_descriptors();
    var fails = require_fails();
    module.exports = DESCRIPTORS && fails(function() {
      return Object.defineProperty(function() {
      }, "prototype", {
        value: 42,
        writable: false
      }).prototype != 42;
    });
  }
});

// ../../node_modules/core-js/internals/an-object.js
var require_an_object = __commonJS({
  "../../node_modules/core-js/internals/an-object.js"(exports, module) {
    var isObject = require_is_object();
    var $String = String;
    var $TypeError = TypeError;
    module.exports = function(argument) {
      if (isObject(argument))
        return argument;
      throw $TypeError($String(argument) + " is not an object");
    };
  }
});

// ../../node_modules/core-js/internals/object-define-property.js
var require_object_define_property = __commonJS({
  "../../node_modules/core-js/internals/object-define-property.js"(exports) {
    var DESCRIPTORS = require_descriptors();
    var IE8_DOM_DEFINE = require_ie8_dom_define();
    var V8_PROTOTYPE_DEFINE_BUG = require_v8_prototype_define_bug();
    var anObject = require_an_object();
    var toPropertyKey = require_to_property_key();
    var $TypeError = TypeError;
    var $defineProperty = Object.defineProperty;
    var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var ENUMERABLE = "enumerable";
    var CONFIGURABLE = "configurable";
    var WRITABLE = "writable";
    exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
      anObject(O);
      P = toPropertyKey(P);
      anObject(Attributes);
      if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
        var current = $getOwnPropertyDescriptor(O, P);
        if (current && current[WRITABLE]) {
          O[P] = Attributes.value;
          Attributes = {
            configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
            enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
            writable: false
          };
        }
      }
      return $defineProperty(O, P, Attributes);
    } : $defineProperty : function defineProperty(O, P, Attributes) {
      anObject(O);
      P = toPropertyKey(P);
      anObject(Attributes);
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
  }
});

// ../../node_modules/core-js/internals/create-non-enumerable-property.js
var require_create_non_enumerable_property = __commonJS({
  "../../node_modules/core-js/internals/create-non-enumerable-property.js"(exports, module) {
    var DESCRIPTORS = require_descriptors();
    var definePropertyModule = require_object_define_property();
    var createPropertyDescriptor = require_create_property_descriptor();
    module.exports = DESCRIPTORS ? function(object, key, value) {
      return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
    } : function(object, key, value) {
      object[key] = value;
      return object;
    };
  }
});

// ../../node_modules/core-js/internals/function-name.js
var require_function_name = __commonJS({
  "../../node_modules/core-js/internals/function-name.js"(exports, module) {
    var DESCRIPTORS = require_descriptors();
    var hasOwn = require_has_own_property();
    var FunctionPrototype = Function.prototype;
    var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
    var EXISTS = hasOwn(FunctionPrototype, "name");
    var PROPER = EXISTS && function something() {
    }.name === "something";
    var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, "name").configurable);
    module.exports = {
      EXISTS,
      PROPER,
      CONFIGURABLE
    };
  }
});

// ../../node_modules/core-js/internals/inspect-source.js
var require_inspect_source = __commonJS({
  "../../node_modules/core-js/internals/inspect-source.js"(exports, module) {
    var uncurryThis = require_function_uncurry_this();
    var isCallable = require_is_callable();
    var store = require_shared_store();
    var functionToString = uncurryThis(Function.toString);
    if (!isCallable(store.inspectSource)) {
      store.inspectSource = function(it) {
        return functionToString(it);
      };
    }
    module.exports = store.inspectSource;
  }
});

// ../../node_modules/core-js/internals/weak-map-basic-detection.js
var require_weak_map_basic_detection = __commonJS({
  "../../node_modules/core-js/internals/weak-map-basic-detection.js"(exports, module) {
    var global2 = require_global();
    var isCallable = require_is_callable();
    var WeakMap2 = global2.WeakMap;
    module.exports = isCallable(WeakMap2) && /native code/.test(String(WeakMap2));
  }
});

// ../../node_modules/core-js/internals/shared-key.js
var require_shared_key = __commonJS({
  "../../node_modules/core-js/internals/shared-key.js"(exports, module) {
    var shared = require_shared();
    var uid = require_uid();
    var keys = shared("keys");
    module.exports = function(key) {
      return keys[key] || (keys[key] = uid(key));
    };
  }
});

// ../../node_modules/core-js/internals/hidden-keys.js
var require_hidden_keys = __commonJS({
  "../../node_modules/core-js/internals/hidden-keys.js"(exports, module) {
    module.exports = {};
  }
});

// ../../node_modules/core-js/internals/internal-state.js
var require_internal_state = __commonJS({
  "../../node_modules/core-js/internals/internal-state.js"(exports, module) {
    var NATIVE_WEAK_MAP = require_weak_map_basic_detection();
    var global2 = require_global();
    var isObject = require_is_object();
    var createNonEnumerableProperty = require_create_non_enumerable_property();
    var hasOwn = require_has_own_property();
    var shared = require_shared_store();
    var sharedKey = require_shared_key();
    var hiddenKeys = require_hidden_keys();
    var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
    var TypeError2 = global2.TypeError;
    var WeakMap2 = global2.WeakMap;
    var set;
    var get;
    var has;
    var enforce = function(it) {
      return has(it) ? get(it) : set(it, {});
    };
    var getterFor = function(TYPE) {
      return function(it) {
        var state;
        if (!isObject(it) || (state = get(it)).type !== TYPE) {
          throw TypeError2("Incompatible receiver, " + TYPE + " required");
        }
        return state;
      };
    };
    if (NATIVE_WEAK_MAP || shared.state) {
      store = shared.state || (shared.state = new WeakMap2());
      store.get = store.get;
      store.has = store.has;
      store.set = store.set;
      set = function(it, metadata) {
        if (store.has(it))
          throw TypeError2(OBJECT_ALREADY_INITIALIZED);
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
      STATE = sharedKey("state");
      hiddenKeys[STATE] = true;
      set = function(it, metadata) {
        if (hasOwn(it, STATE))
          throw TypeError2(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        createNonEnumerableProperty(it, STATE, metadata);
        return metadata;
      };
      get = function(it) {
        return hasOwn(it, STATE) ? it[STATE] : {};
      };
      has = function(it) {
        return hasOwn(it, STATE);
      };
    }
    var store;
    var STATE;
    module.exports = {
      set,
      get,
      has,
      enforce,
      getterFor
    };
  }
});

// ../../node_modules/core-js/internals/make-built-in.js
var require_make_built_in = __commonJS({
  "../../node_modules/core-js/internals/make-built-in.js"(exports, module) {
    var fails = require_fails();
    var isCallable = require_is_callable();
    var hasOwn = require_has_own_property();
    var DESCRIPTORS = require_descriptors();
    var CONFIGURABLE_FUNCTION_NAME = require_function_name().CONFIGURABLE;
    var inspectSource = require_inspect_source();
    var InternalStateModule = require_internal_state();
    var enforceInternalState = InternalStateModule.enforce;
    var getInternalState = InternalStateModule.get;
    var defineProperty = Object.defineProperty;
    var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function() {
      return defineProperty(function() {
      }, "length", { value: 8 }).length !== 8;
    });
    var TEMPLATE = String(String).split("String");
    var makeBuiltIn = module.exports = function(value, name, options) {
      if (String(name).slice(0, 7) === "Symbol(") {
        name = "[" + String(name).replace(/^Symbol\(([^)]*)\)/, "$1") + "]";
      }
      if (options && options.getter)
        name = "get " + name;
      if (options && options.setter)
        name = "set " + name;
      if (!hasOwn(value, "name") || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
        if (DESCRIPTORS)
          defineProperty(value, "name", { value: name, configurable: true });
        else
          value.name = name;
      }
      if (CONFIGURABLE_LENGTH && options && hasOwn(options, "arity") && value.length !== options.arity) {
        defineProperty(value, "length", { value: options.arity });
      }
      try {
        if (options && hasOwn(options, "constructor") && options.constructor) {
          if (DESCRIPTORS)
            defineProperty(value, "prototype", { writable: false });
        } else if (value.prototype)
          value.prototype = void 0;
      } catch (error) {
      }
      var state = enforceInternalState(value);
      if (!hasOwn(state, "source")) {
        state.source = TEMPLATE.join(typeof name == "string" ? name : "");
      }
      return value;
    };
    Function.prototype.toString = makeBuiltIn(function toString() {
      return isCallable(this) && getInternalState(this).source || inspectSource(this);
    }, "toString");
  }
});

// ../../node_modules/core-js/internals/define-built-in.js
var require_define_built_in = __commonJS({
  "../../node_modules/core-js/internals/define-built-in.js"(exports, module) {
    var isCallable = require_is_callable();
    var definePropertyModule = require_object_define_property();
    var makeBuiltIn = require_make_built_in();
    var defineGlobalProperty = require_define_global_property();
    module.exports = function(O, key, value, options) {
      if (!options)
        options = {};
      var simple = options.enumerable;
      var name = options.name !== void 0 ? options.name : key;
      if (isCallable(value))
        makeBuiltIn(value, name, options);
      if (options.global) {
        if (simple)
          O[key] = value;
        else
          defineGlobalProperty(key, value);
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
          definePropertyModule.f(O, key, {
            value,
            enumerable: false,
            configurable: !options.nonConfigurable,
            writable: !options.nonWritable
          });
      }
      return O;
    };
  }
});

// ../../node_modules/core-js/internals/math-trunc.js
var require_math_trunc = __commonJS({
  "../../node_modules/core-js/internals/math-trunc.js"(exports, module) {
    var ceil = Math.ceil;
    var floor = Math.floor;
    module.exports = Math.trunc || function trunc(x) {
      var n = +x;
      return (n > 0 ? floor : ceil)(n);
    };
  }
});

// ../../node_modules/core-js/internals/to-integer-or-infinity.js
var require_to_integer_or_infinity = __commonJS({
  "../../node_modules/core-js/internals/to-integer-or-infinity.js"(exports, module) {
    var trunc = require_math_trunc();
    module.exports = function(argument) {
      var number = +argument;
      return number !== number || number === 0 ? 0 : trunc(number);
    };
  }
});

// ../../node_modules/core-js/internals/to-absolute-index.js
var require_to_absolute_index = __commonJS({
  "../../node_modules/core-js/internals/to-absolute-index.js"(exports, module) {
    var toIntegerOrInfinity = require_to_integer_or_infinity();
    var max = Math.max;
    var min = Math.min;
    module.exports = function(index, length) {
      var integer = toIntegerOrInfinity(index);
      return integer < 0 ? max(integer + length, 0) : min(integer, length);
    };
  }
});

// ../../node_modules/core-js/internals/to-length.js
var require_to_length = __commonJS({
  "../../node_modules/core-js/internals/to-length.js"(exports, module) {
    var toIntegerOrInfinity = require_to_integer_or_infinity();
    var min = Math.min;
    module.exports = function(argument) {
      return argument > 0 ? min(toIntegerOrInfinity(argument), 9007199254740991) : 0;
    };
  }
});

// ../../node_modules/core-js/internals/length-of-array-like.js
var require_length_of_array_like = __commonJS({
  "../../node_modules/core-js/internals/length-of-array-like.js"(exports, module) {
    var toLength = require_to_length();
    module.exports = function(obj) {
      return toLength(obj.length);
    };
  }
});

// ../../node_modules/core-js/internals/array-includes.js
var require_array_includes = __commonJS({
  "../../node_modules/core-js/internals/array-includes.js"(exports, module) {
    var toIndexedObject = require_to_indexed_object();
    var toAbsoluteIndex = require_to_absolute_index();
    var lengthOfArrayLike = require_length_of_array_like();
    var createMethod = function(IS_INCLUDES) {
      return function($this, el, fromIndex) {
        var O = toIndexedObject($this);
        var length = lengthOfArrayLike(O);
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
    module.exports = {
      includes: createMethod(true),
      indexOf: createMethod(false)
    };
  }
});

// ../../node_modules/core-js/internals/object-keys-internal.js
var require_object_keys_internal = __commonJS({
  "../../node_modules/core-js/internals/object-keys-internal.js"(exports, module) {
    var uncurryThis = require_function_uncurry_this();
    var hasOwn = require_has_own_property();
    var toIndexedObject = require_to_indexed_object();
    var indexOf = require_array_includes().indexOf;
    var hiddenKeys = require_hidden_keys();
    var push = uncurryThis([].push);
    module.exports = function(object, names) {
      var O = toIndexedObject(object);
      var i = 0;
      var result = [];
      var key;
      for (key in O)
        !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
      while (names.length > i)
        if (hasOwn(O, key = names[i++])) {
          ~indexOf(result, key) || push(result, key);
        }
      return result;
    };
  }
});

// ../../node_modules/core-js/internals/enum-bug-keys.js
var require_enum_bug_keys = __commonJS({
  "../../node_modules/core-js/internals/enum-bug-keys.js"(exports, module) {
    module.exports = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf"
    ];
  }
});

// ../../node_modules/core-js/internals/object-get-own-property-names.js
var require_object_get_own_property_names = __commonJS({
  "../../node_modules/core-js/internals/object-get-own-property-names.js"(exports) {
    var internalObjectKeys = require_object_keys_internal();
    var enumBugKeys = require_enum_bug_keys();
    var hiddenKeys = enumBugKeys.concat("length", "prototype");
    exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
      return internalObjectKeys(O, hiddenKeys);
    };
  }
});

// ../../node_modules/core-js/internals/object-get-own-property-symbols.js
var require_object_get_own_property_symbols = __commonJS({
  "../../node_modules/core-js/internals/object-get-own-property-symbols.js"(exports) {
    exports.f = Object.getOwnPropertySymbols;
  }
});

// ../../node_modules/core-js/internals/own-keys.js
var require_own_keys = __commonJS({
  "../../node_modules/core-js/internals/own-keys.js"(exports, module) {
    var getBuiltIn = require_get_built_in();
    var uncurryThis = require_function_uncurry_this();
    var getOwnPropertyNamesModule = require_object_get_own_property_names();
    var getOwnPropertySymbolsModule = require_object_get_own_property_symbols();
    var anObject = require_an_object();
    var concat = uncurryThis([].concat);
    module.exports = getBuiltIn("Reflect", "ownKeys") || function ownKeys(it) {
      var keys = getOwnPropertyNamesModule.f(anObject(it));
      var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
      return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
    };
  }
});

// ../../node_modules/core-js/internals/copy-constructor-properties.js
var require_copy_constructor_properties = __commonJS({
  "../../node_modules/core-js/internals/copy-constructor-properties.js"(exports, module) {
    var hasOwn = require_has_own_property();
    var ownKeys = require_own_keys();
    var getOwnPropertyDescriptorModule = require_object_get_own_property_descriptor();
    var definePropertyModule = require_object_define_property();
    module.exports = function(target, source, exceptions) {
      var keys = ownKeys(source);
      var defineProperty = definePropertyModule.f;
      var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
          defineProperty(target, key, getOwnPropertyDescriptor(source, key));
        }
      }
    };
  }
});

// ../../node_modules/core-js/internals/is-forced.js
var require_is_forced = __commonJS({
  "../../node_modules/core-js/internals/is-forced.js"(exports, module) {
    var fails = require_fails();
    var isCallable = require_is_callable();
    var replacement = /#|\.prototype\./;
    var isForced = function(feature, detection) {
      var value = data[normalize(feature)];
      return value == POLYFILL ? true : value == NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
    };
    var normalize = isForced.normalize = function(string) {
      return String(string).replace(replacement, ".").toLowerCase();
    };
    var data = isForced.data = {};
    var NATIVE = isForced.NATIVE = "N";
    var POLYFILL = isForced.POLYFILL = "P";
    module.exports = isForced;
  }
});

// ../../node_modules/core-js/internals/export.js
var require_export = __commonJS({
  "../../node_modules/core-js/internals/export.js"(exports, module) {
    var global2 = require_global();
    var getOwnPropertyDescriptor = require_object_get_own_property_descriptor().f;
    var createNonEnumerableProperty = require_create_non_enumerable_property();
    var defineBuiltIn = require_define_built_in();
    var defineGlobalProperty = require_define_global_property();
    var copyConstructorProperties = require_copy_constructor_properties();
    var isForced = require_is_forced();
    module.exports = function(options, source) {
      var TARGET = options.target;
      var GLOBAL = options.global;
      var STATIC = options.stat;
      var FORCED, target, key, targetProperty, sourceProperty, descriptor;
      if (GLOBAL) {
        target = global2;
      } else if (STATIC) {
        target = global2[TARGET] || defineGlobalProperty(TARGET, {});
      } else {
        target = (global2[TARGET] || {}).prototype;
      }
      if (target)
        for (key in source) {
          sourceProperty = source[key];
          if (options.dontCallGetSet) {
            descriptor = getOwnPropertyDescriptor(target, key);
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
  }
});

// ../../node_modules/core-js/internals/set-species.js
var require_set_species = __commonJS({
  "../../node_modules/core-js/internals/set-species.js"(exports, module) {
    "use strict";
    var getBuiltIn = require_get_built_in();
    var definePropertyModule = require_object_define_property();
    var wellKnownSymbol = require_well_known_symbol();
    var DESCRIPTORS = require_descriptors();
    var SPECIES = wellKnownSymbol("species");
    module.exports = function(CONSTRUCTOR_NAME) {
      var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
      var defineProperty = definePropertyModule.f;
      if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
        defineProperty(Constructor, SPECIES, {
          configurable: true,
          get: function() {
            return this;
          }
        });
      }
    };
  }
});

// ../../node_modules/core-js/internals/an-instance.js
var require_an_instance = __commonJS({
  "../../node_modules/core-js/internals/an-instance.js"(exports, module) {
    var isPrototypeOf = require_object_is_prototype_of();
    var $TypeError = TypeError;
    module.exports = function(it, Prototype) {
      if (isPrototypeOf(Prototype, it))
        return it;
      throw $TypeError("Incorrect invocation");
    };
  }
});

// ../../node_modules/core-js/internals/define-built-ins.js
var require_define_built_ins = __commonJS({
  "../../node_modules/core-js/internals/define-built-ins.js"(exports, module) {
    var defineBuiltIn = require_define_built_in();
    module.exports = function(target, src, options) {
      for (var key in src)
        defineBuiltIn(target, key, src[key], options);
      return target;
    };
  }
});

// ../../node_modules/core-js/internals/define-built-in-accessor.js
var require_define_built_in_accessor = __commonJS({
  "../../node_modules/core-js/internals/define-built-in-accessor.js"(exports, module) {
    var makeBuiltIn = require_make_built_in();
    var defineProperty = require_object_define_property();
    module.exports = function(target, name, descriptor) {
      if (descriptor.get)
        makeBuiltIn(descriptor.get, name, { getter: true });
      if (descriptor.set)
        makeBuiltIn(descriptor.set, name, { setter: true });
      return defineProperty.f(target, name, descriptor);
    };
  }
});

// ../../node_modules/core-js/internals/host-report-errors.js
var require_host_report_errors = __commonJS({
  "../../node_modules/core-js/internals/host-report-errors.js"(exports, module) {
    var global2 = require_global();
    module.exports = function(a, b) {
      var console2 = global2.console;
      if (console2 && console2.error) {
        arguments.length == 1 ? console2.error(a) : console2.error(a, b);
      }
    };
  }
});

// ../../node_modules/core-js/internals/observable-forced.js
var require_observable_forced = __commonJS({
  "../../node_modules/core-js/internals/observable-forced.js"(exports, module) {
    var global2 = require_global();
    var isCallable = require_is_callable();
    var wellKnownSymbol = require_well_known_symbol();
    var $$OBSERVABLE = wellKnownSymbol("observable");
    var NativeObservable = global2.Observable;
    var NativeObservablePrototype = NativeObservable && NativeObservable.prototype;
    module.exports = !isCallable(NativeObservable) || !isCallable(NativeObservable.from) || !isCallable(NativeObservable.of) || !isCallable(NativeObservablePrototype.subscribe) || !isCallable(NativeObservablePrototype[$$OBSERVABLE]);
  }
});

// ../../node_modules/core-js/modules/esnext.observable.constructor.js
var require_esnext_observable_constructor = __commonJS({
  "../../node_modules/core-js/modules/esnext.observable.constructor.js"() {
    "use strict";
    var $ = require_export();
    var call = require_function_call();
    var DESCRIPTORS = require_descriptors();
    var setSpecies = require_set_species();
    var aCallable = require_a_callable();
    var anObject = require_an_object();
    var anInstance = require_an_instance();
    var isCallable = require_is_callable();
    var isNullOrUndefined = require_is_null_or_undefined();
    var isObject = require_is_object();
    var getMethod = require_get_method();
    var defineBuiltIn = require_define_built_in();
    var defineBuiltIns = require_define_built_ins();
    var defineBuiltInAccessor = require_define_built_in_accessor();
    var hostReportErrors = require_host_report_errors();
    var wellKnownSymbol = require_well_known_symbol();
    var InternalStateModule = require_internal_state();
    var OBSERVABLE_FORCED = require_observable_forced();
    var $$OBSERVABLE = wellKnownSymbol("observable");
    var OBSERVABLE = "Observable";
    var SUBSCRIPTION = "Subscription";
    var SUBSCRIPTION_OBSERVER = "SubscriptionObserver";
    var getterFor = InternalStateModule.getterFor;
    var setInternalState = InternalStateModule.set;
    var getObservableInternalState = getterFor(OBSERVABLE);
    var getSubscriptionInternalState = getterFor(SUBSCRIPTION);
    var getSubscriptionObserverInternalState = getterFor(SUBSCRIPTION_OBSERVER);
    var SubscriptionState = function(observer) {
      this.observer = anObject(observer);
      this.cleanup = void 0;
      this.subscriptionObserver = void 0;
    };
    SubscriptionState.prototype = {
      type: SUBSCRIPTION,
      clean: function() {
        var cleanup = this.cleanup;
        if (cleanup) {
          this.cleanup = void 0;
          try {
            cleanup();
          } catch (error) {
            hostReportErrors(error);
          }
        }
      },
      close: function() {
        if (!DESCRIPTORS) {
          var subscription = this.facade;
          var subscriptionObserver = this.subscriptionObserver;
          subscription.closed = true;
          if (subscriptionObserver)
            subscriptionObserver.closed = true;
        }
        this.observer = void 0;
      },
      isClosed: function() {
        return this.observer === void 0;
      }
    };
    var Subscription = function(observer, subscriber) {
      var subscriptionState = setInternalState(this, new SubscriptionState(observer));
      var start;
      if (!DESCRIPTORS)
        this.closed = false;
      try {
        if (start = getMethod(observer, "start"))
          call(start, observer, this);
      } catch (error) {
        hostReportErrors(error);
      }
      if (subscriptionState.isClosed())
        return;
      var subscriptionObserver = subscriptionState.subscriptionObserver = new SubscriptionObserver(subscriptionState);
      try {
        var cleanup = subscriber(subscriptionObserver);
        var subscription = cleanup;
        if (!isNullOrUndefined(cleanup))
          subscriptionState.cleanup = isCallable(cleanup.unsubscribe) ? function() {
            subscription.unsubscribe();
          } : aCallable(cleanup);
      } catch (error) {
        subscriptionObserver.error(error);
        return;
      }
      if (subscriptionState.isClosed())
        subscriptionState.clean();
    };
    Subscription.prototype = defineBuiltIns({}, {
      unsubscribe: function unsubscribe() {
        var subscriptionState = getSubscriptionInternalState(this);
        if (!subscriptionState.isClosed()) {
          subscriptionState.close();
          subscriptionState.clean();
        }
      }
    });
    if (DESCRIPTORS)
      defineBuiltInAccessor(Subscription.prototype, "closed", {
        configurable: true,
        get: function closed() {
          return getSubscriptionInternalState(this).isClosed();
        }
      });
    var SubscriptionObserver = function(subscriptionState) {
      setInternalState(this, {
        type: SUBSCRIPTION_OBSERVER,
        subscriptionState
      });
      if (!DESCRIPTORS)
        this.closed = false;
    };
    SubscriptionObserver.prototype = defineBuiltIns({}, {
      next: function next(value) {
        var subscriptionState = getSubscriptionObserverInternalState(this).subscriptionState;
        if (!subscriptionState.isClosed()) {
          var observer = subscriptionState.observer;
          try {
            var nextMethod = getMethod(observer, "next");
            if (nextMethod)
              call(nextMethod, observer, value);
          } catch (error) {
            hostReportErrors(error);
          }
        }
      },
      error: function error(value) {
        var subscriptionState = getSubscriptionObserverInternalState(this).subscriptionState;
        if (!subscriptionState.isClosed()) {
          var observer = subscriptionState.observer;
          subscriptionState.close();
          try {
            var errorMethod = getMethod(observer, "error");
            if (errorMethod)
              call(errorMethod, observer, value);
            else
              hostReportErrors(value);
          } catch (err) {
            hostReportErrors(err);
          }
          subscriptionState.clean();
        }
      },
      complete: function complete() {
        var subscriptionState = getSubscriptionObserverInternalState(this).subscriptionState;
        if (!subscriptionState.isClosed()) {
          var observer = subscriptionState.observer;
          subscriptionState.close();
          try {
            var completeMethod = getMethod(observer, "complete");
            if (completeMethod)
              call(completeMethod, observer);
          } catch (error) {
            hostReportErrors(error);
          }
          subscriptionState.clean();
        }
      }
    });
    if (DESCRIPTORS)
      defineBuiltInAccessor(SubscriptionObserver.prototype, "closed", {
        configurable: true,
        get: function closed() {
          return getSubscriptionObserverInternalState(this).subscriptionState.isClosed();
        }
      });
    var $Observable = function Observable2(subscriber) {
      anInstance(this, ObservablePrototype);
      setInternalState(this, {
        type: OBSERVABLE,
        subscriber: aCallable(subscriber)
      });
    };
    var ObservablePrototype = $Observable.prototype;
    defineBuiltIns(ObservablePrototype, {
      subscribe: function subscribe(observer) {
        var length = arguments.length;
        return new Subscription(isCallable(observer) ? {
          next: observer,
          error: length > 1 ? arguments[1] : void 0,
          complete: length > 2 ? arguments[2] : void 0
        } : isObject(observer) ? observer : {}, getObservableInternalState(this).subscriber);
      }
    });
    defineBuiltIn(ObservablePrototype, $$OBSERVABLE, function() {
      return this;
    });
    $({ global: true, constructor: true, forced: OBSERVABLE_FORCED }, {
      Observable: $Observable
    });
    setSpecies(OBSERVABLE);
  }
});

// ../../node_modules/core-js/internals/to-string-tag-support.js
var require_to_string_tag_support = __commonJS({
  "../../node_modules/core-js/internals/to-string-tag-support.js"(exports, module) {
    var wellKnownSymbol = require_well_known_symbol();
    var TO_STRING_TAG = wellKnownSymbol("toStringTag");
    var test = {};
    test[TO_STRING_TAG] = "z";
    module.exports = String(test) === "[object z]";
  }
});

// ../../node_modules/core-js/internals/classof.js
var require_classof = __commonJS({
  "../../node_modules/core-js/internals/classof.js"(exports, module) {
    var TO_STRING_TAG_SUPPORT = require_to_string_tag_support();
    var isCallable = require_is_callable();
    var classofRaw = require_classof_raw();
    var wellKnownSymbol = require_well_known_symbol();
    var TO_STRING_TAG = wellKnownSymbol("toStringTag");
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
    module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
      var O, tag, result;
      return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && isCallable(O.callee) ? "Arguments" : result;
    };
  }
});

// ../../node_modules/core-js/internals/is-constructor.js
var require_is_constructor = __commonJS({
  "../../node_modules/core-js/internals/is-constructor.js"(exports, module) {
    var uncurryThis = require_function_uncurry_this();
    var fails = require_fails();
    var isCallable = require_is_callable();
    var classof = require_classof();
    var getBuiltIn = require_get_built_in();
    var inspectSource = require_inspect_source();
    var noop = function() {
    };
    var empty = [];
    var construct = getBuiltIn("Reflect", "construct");
    var constructorRegExp = /^\s*(?:class|function)\b/;
    var exec = uncurryThis(constructorRegExp.exec);
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
    var isConstructorLegacy = function isConstructor(argument) {
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
    module.exports = !construct || fails(function() {
      var called;
      return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function() {
        called = true;
      }) || called;
    }) ? isConstructorLegacy : isConstructorModern;
  }
});

// ../../node_modules/core-js/internals/iterators.js
var require_iterators = __commonJS({
  "../../node_modules/core-js/internals/iterators.js"(exports, module) {
    module.exports = {};
  }
});

// ../../node_modules/core-js/internals/get-iterator-method.js
var require_get_iterator_method = __commonJS({
  "../../node_modules/core-js/internals/get-iterator-method.js"(exports, module) {
    var classof = require_classof();
    var getMethod = require_get_method();
    var isNullOrUndefined = require_is_null_or_undefined();
    var Iterators = require_iterators();
    var wellKnownSymbol = require_well_known_symbol();
    var ITERATOR = wellKnownSymbol("iterator");
    module.exports = function(it) {
      if (!isNullOrUndefined(it))
        return getMethod(it, ITERATOR) || getMethod(it, "@@iterator") || Iterators[classof(it)];
    };
  }
});

// ../../node_modules/core-js/internals/get-iterator.js
var require_get_iterator = __commonJS({
  "../../node_modules/core-js/internals/get-iterator.js"(exports, module) {
    var call = require_function_call();
    var aCallable = require_a_callable();
    var anObject = require_an_object();
    var tryToString = require_try_to_string();
    var getIteratorMethod = require_get_iterator_method();
    var $TypeError = TypeError;
    module.exports = function(argument, usingIterator) {
      var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
      if (aCallable(iteratorMethod))
        return anObject(call(iteratorMethod, argument));
      throw $TypeError(tryToString(argument) + " is not iterable");
    };
  }
});

// ../../node_modules/core-js/internals/function-uncurry-this-clause.js
var require_function_uncurry_this_clause = __commonJS({
  "../../node_modules/core-js/internals/function-uncurry-this-clause.js"(exports, module) {
    var classofRaw = require_classof_raw();
    var uncurryThis = require_function_uncurry_this();
    module.exports = function(fn) {
      if (classofRaw(fn) === "Function")
        return uncurryThis(fn);
    };
  }
});

// ../../node_modules/core-js/internals/function-bind-context.js
var require_function_bind_context = __commonJS({
  "../../node_modules/core-js/internals/function-bind-context.js"(exports, module) {
    var uncurryThis = require_function_uncurry_this_clause();
    var aCallable = require_a_callable();
    var NATIVE_BIND = require_function_bind_native();
    var bind = uncurryThis(uncurryThis.bind);
    module.exports = function(fn, that) {
      aCallable(fn);
      return that === void 0 ? fn : NATIVE_BIND ? bind(fn, that) : function() {
        return fn.apply(that, arguments);
      };
    };
  }
});

// ../../node_modules/core-js/internals/is-array-iterator-method.js
var require_is_array_iterator_method = __commonJS({
  "../../node_modules/core-js/internals/is-array-iterator-method.js"(exports, module) {
    var wellKnownSymbol = require_well_known_symbol();
    var Iterators = require_iterators();
    var ITERATOR = wellKnownSymbol("iterator");
    var ArrayPrototype = Array.prototype;
    module.exports = function(it) {
      return it !== void 0 && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
    };
  }
});

// ../../node_modules/core-js/internals/iterator-close.js
var require_iterator_close = __commonJS({
  "../../node_modules/core-js/internals/iterator-close.js"(exports, module) {
    var call = require_function_call();
    var anObject = require_an_object();
    var getMethod = require_get_method();
    module.exports = function(iterator, kind, value) {
      var innerResult, innerError;
      anObject(iterator);
      try {
        innerResult = getMethod(iterator, "return");
        if (!innerResult) {
          if (kind === "throw")
            throw value;
          return value;
        }
        innerResult = call(innerResult, iterator);
      } catch (error) {
        innerError = true;
        innerResult = error;
      }
      if (kind === "throw")
        throw value;
      if (innerError)
        throw innerResult;
      anObject(innerResult);
      return value;
    };
  }
});

// ../../node_modules/core-js/internals/iterate.js
var require_iterate = __commonJS({
  "../../node_modules/core-js/internals/iterate.js"(exports, module) {
    var bind = require_function_bind_context();
    var call = require_function_call();
    var anObject = require_an_object();
    var tryToString = require_try_to_string();
    var isArrayIteratorMethod = require_is_array_iterator_method();
    var lengthOfArrayLike = require_length_of_array_like();
    var isPrototypeOf = require_object_is_prototype_of();
    var getIterator = require_get_iterator();
    var getIteratorMethod = require_get_iterator_method();
    var iteratorClose = require_iterator_close();
    var $TypeError = TypeError;
    var Result = function(stopped, result) {
      this.stopped = stopped;
      this.result = result;
    };
    var ResultPrototype = Result.prototype;
    module.exports = function(iterable, unboundFunction, options) {
      var that = options && options.that;
      var AS_ENTRIES = !!(options && options.AS_ENTRIES);
      var IS_RECORD = !!(options && options.IS_RECORD);
      var IS_ITERATOR = !!(options && options.IS_ITERATOR);
      var INTERRUPTED = !!(options && options.INTERRUPTED);
      var fn = bind(unboundFunction, that);
      var iterator, iterFn, index, length, result, next, step;
      var stop = function(condition) {
        if (iterator)
          iteratorClose(iterator, "normal", condition);
        return new Result(true, condition);
      };
      var callFn = function(value) {
        if (AS_ENTRIES) {
          anObject(value);
          return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
        }
        return INTERRUPTED ? fn(value, stop) : fn(value);
      };
      if (IS_RECORD) {
        iterator = iterable.iterator;
      } else if (IS_ITERATOR) {
        iterator = iterable;
      } else {
        iterFn = getIteratorMethod(iterable);
        if (!iterFn)
          throw $TypeError(tryToString(iterable) + " is not iterable");
        if (isArrayIteratorMethod(iterFn)) {
          for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
            result = callFn(iterable[index]);
            if (result && isPrototypeOf(ResultPrototype, result))
              return result;
          }
          return new Result(false);
        }
        iterator = getIterator(iterable, iterFn);
      }
      next = IS_RECORD ? iterable.next : iterator.next;
      while (!(step = call(next, iterator)).done) {
        try {
          result = callFn(step.value);
        } catch (error) {
          iteratorClose(iterator, "throw", error);
        }
        if (typeof result == "object" && result && isPrototypeOf(ResultPrototype, result))
          return result;
      }
      return new Result(false);
    };
  }
});

// ../../node_modules/core-js/modules/esnext.observable.from.js
var require_esnext_observable_from = __commonJS({
  "../../node_modules/core-js/modules/esnext.observable.from.js"() {
    "use strict";
    var $ = require_export();
    var getBuiltIn = require_get_built_in();
    var call = require_function_call();
    var anObject = require_an_object();
    var isConstructor = require_is_constructor();
    var getIterator = require_get_iterator();
    var getMethod = require_get_method();
    var iterate = require_iterate();
    var wellKnownSymbol = require_well_known_symbol();
    var OBSERVABLE_FORCED = require_observable_forced();
    var $$OBSERVABLE = wellKnownSymbol("observable");
    $({ target: "Observable", stat: true, forced: OBSERVABLE_FORCED }, {
      from: function from(x) {
        var C = isConstructor(this) ? this : getBuiltIn("Observable");
        var observableMethod = getMethod(anObject(x), $$OBSERVABLE);
        if (observableMethod) {
          var observable = anObject(call(observableMethod, x));
          return observable.constructor === C ? observable : new C(function(observer) {
            return observable.subscribe(observer);
          });
        }
        var iterator = getIterator(x);
        return new C(function(observer) {
          iterate(iterator, function(it, stop) {
            observer.next(it);
            if (observer.closed)
              return stop();
          }, { IS_ITERATOR: true, INTERRUPTED: true });
          observer.complete();
        });
      }
    });
  }
});

// ../../node_modules/core-js/modules/esnext.observable.of.js
var require_esnext_observable_of = __commonJS({
  "../../node_modules/core-js/modules/esnext.observable.of.js"() {
    "use strict";
    var $ = require_export();
    var getBuiltIn = require_get_built_in();
    var isConstructor = require_is_constructor();
    var OBSERVABLE_FORCED = require_observable_forced();
    var Array2 = getBuiltIn("Array");
    $({ target: "Observable", stat: true, forced: OBSERVABLE_FORCED }, {
      of: function of() {
        var C = isConstructor(this) ? this : getBuiltIn("Observable");
        var length = arguments.length;
        var items = Array2(length);
        var index = 0;
        while (index < length)
          items[index] = arguments[index++];
        return new C(function(observer) {
          for (var i = 0; i < length; i++) {
            observer.next(items[i]);
            if (observer.closed)
              return;
          }
          observer.complete();
        });
      }
    });
  }
});

// ../../node_modules/core-js/modules/esnext.observable.js
var require_esnext_observable = __commonJS({
  "../../node_modules/core-js/modules/esnext.observable.js"() {
    require_esnext_observable_constructor();
    require_esnext_observable_from();
    require_esnext_observable_of();
  }
});

// ../../node_modules/core-js/internals/path.js
var require_path = __commonJS({
  "../../node_modules/core-js/internals/path.js"(exports, module) {
    var global2 = require_global();
    module.exports = global2;
  }
});

// ../../node_modules/core-js/internals/well-known-symbol-wrapped.js
var require_well_known_symbol_wrapped = __commonJS({
  "../../node_modules/core-js/internals/well-known-symbol-wrapped.js"(exports) {
    var wellKnownSymbol = require_well_known_symbol();
    exports.f = wellKnownSymbol;
  }
});

// ../../node_modules/core-js/internals/well-known-symbol-define.js
var require_well_known_symbol_define = __commonJS({
  "../../node_modules/core-js/internals/well-known-symbol-define.js"(exports, module) {
    var path = require_path();
    var hasOwn = require_has_own_property();
    var wrappedWellKnownSymbolModule = require_well_known_symbol_wrapped();
    var defineProperty = require_object_define_property().f;
    module.exports = function(NAME) {
      var Symbol2 = path.Symbol || (path.Symbol = {});
      if (!hasOwn(Symbol2, NAME))
        defineProperty(Symbol2, NAME, {
          value: wrappedWellKnownSymbolModule.f(NAME)
        });
    };
  }
});

// ../../node_modules/core-js/modules/esnext.symbol.observable.js
var require_esnext_symbol_observable = __commonJS({
  "../../node_modules/core-js/modules/esnext.symbol.observable.js"() {
    var defineWellKnownSymbol = require_well_known_symbol_define();
    defineWellKnownSymbol("observable");
  }
});

// ../validator/dist/index.js
var require_dist = __commonJS({
  "../validator/dist/index.js"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export(src_exports, {
      compose: () => compose_default,
      matchesPattern: () => matches_pattern_default,
      oneOf: () => one_of_default,
      required: () => required_default,
      shouldThrow: () => should_throw_default,
      string: () => string_default,
      url: () => url_default,
      validator: () => validator_default,
      withLevel: () => with_level_default,
      withMessage: () => with_message_default
    });
    module.exports = __toCommonJS(src_exports);
    var levelNumbers = {
      "error": 4,
      "warn": 3,
      "info": 2,
      "debug": 1,
      "silent": 0
    };
    var isMoreSevere = (current, previous) => {
      if (!current) {
        return false;
      }
      if (!previous) {
        return true;
      }
      const currentLevel = levelNumbers[current];
      const previousLevel = levelNumbers[previous];
      return currentLevel > previousLevel;
    };
    var getMostSevereLevel = (results) => {
      let mostSevere = void 0;
      results.forEach((result) => {
        if (isMoreSevere(result.level, mostSevere)) {
          mostSevere = result.level;
        }
      });
      return mostSevere;
    };
    var haveAllPassed = (results) => {
      return results.reduce((accumulator, result) => {
        return result.passed && accumulator;
      }, true);
    };
    var concatenateMessages = (results) => {
      const concatenatedMessages = results.map((result) => `  - (${result.level}) ${result.message}`).join("\n");
      if (concatenatedMessages.length) {
        return `Got validation failures:

${concatenatedMessages}
`;
      }
    };
    var compose_default = (...validators) => {
      return {
        async validate(value) {
          const promises = validators.map((validator) => validator.validate(value));
          const results = await Promise.all(promises);
          const level = getMostSevereLevel(results);
          const message = concatenateMessages(results);
          const passed = haveAllPassed(results);
          return {
            level,
            message,
            passed
          };
        }
      };
    };
    var validator_default = (cb) => {
      return {
        async validate(value) {
          const result = await cb(value);
          if (result === void 0 || result === null || typeof result === "boolean" && result === true) {
            return {
              passed: true
            };
          }
          if (typeof result === "string") {
            return {
              passed: false,
              message: result,
              level: "error"
            };
          }
          if (typeof result === "boolean") {
            return {
              passed: result,
              level: "error"
            };
          }
          return result;
        }
      };
    };
    var matches_pattern_default = (pattern) => {
      return validator_default(async (value) => {
        if (typeof pattern === "string") {
          return value.includes(pattern);
        } else {
          return pattern.test(value);
        }
      });
    };
    var one_of_default = (values) => {
      return validator_default(async (value) => {
        return values.includes(value);
      });
    };
    var required_default = () => {
      return validator_default(async (value) => {
        return !!value;
      });
    };
    var ValidationError = class extends Error {
    };
    var DEFAULT_MESSAGE = "A validator with no associated message failed.";
    var should_throw_default = (validator) => {
      return {
        async validate(value) {
          const result = await validator.validate(value);
          if (result.passed) {
            return;
          }
          if ("level" in result && result.level === "error") {
            throw new ValidationError(result.message || DEFAULT_MESSAGE);
          }
        }
      };
    };
    var string_default = () => {
      return validator_default(async (value) => {
        return typeof value === "string";
      });
    };
    var urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    var url_default = () => {
      return matches_pattern_default(urlPattern);
    };
    var with_level_default = (validator, level) => {
      return {
        async validate(value) {
          const result = await validator.validate(value);
          return {
            ...result,
            level
          };
        }
      };
    };
    var isValidatorFunction = (x) => typeof x === "function";
    var ensure_validator_default = (maybeValidator) => {
      if (isValidatorFunction(maybeValidator)) {
        return validator_default(maybeValidator);
      } else {
        return maybeValidator;
      }
    };
    var with_message_default = (validator, message) => {
      const definitelyValidator = ensure_validator_default(validator);
      return {
        async validate(value) {
          const result = await definitelyValidator.validate(value);
          if (result.passed) {
            return result;
          }
          return {
            ...result,
            message
          };
        }
      };
    };
  }
});

// src/api/define-example.ts
var define_example_default = (definition, { attributes, controls, listeners }) => {
  console.log(`creating example for ${definition.name} with attribute ${attributes} controls ${controls} and listeners ${listeners}`);
};

// ../../node_modules/core-js/proposals/observable.js
require_esnext_observable();
require_esnext_symbol_observable();

// src/api/use-observable.ts
var isFunction = (x) => typeof x === "function";
var use_observable_default = ({ initialValue, subscriber }) => {
  let handler = (event) => {
  };
  const observable = new Observable((observer) => {
    handler = (event) => {
      return observer.next(event);
    };
  });
  if (subscriber) {
    observable.subscribe(subscriber);
  }
  if (initialValue) {
    if (isFunction(handler)) {
      handler(initialValue);
    }
  }
  return { handler, observable };
};

// src/api/define-component.ts
var import_validator = __toESM(require_dist(), 1);
var nameValidator = (0, import_validator.shouldThrow)((0, import_validator.withMessage)((0, import_validator.compose)((0, import_validator.required)(), (0, import_validator.matchesPattern)(/.*-.*/)), `web component names are required and must contain a hyphen`));
var define_component_default = ({ name, emits, props = {}, setup, connectedCallback, disconnectedCallback, adoptedCallback, template, shadowMode = "closed", css }) => {
  var _context, _props, _shadowRoot, _a;
  nameValidator.validate(name);
  const clazz = (_a = class extends HTMLElement {
    constructor() {
      super();
      __privateAdd(this, _context, void 0);
      __privateAdd(this, _props, void 0);
      __privateAdd(this, _shadowRoot, void 0);
      __privateSet(this, _props, Object.entries(props).reduce((accumulator, [key, value]) => {
        return { ...accumulator, [key]: use_observable_default({ initialValue: value.default, subscriber: value.validator }) };
      }, {}));
      const emit = (type, detail) => {
        if (emits && !emits?.includes(type)) {
          console.warn(`unexpected event emitted with type ${type} and detail ${detail}`);
        }
        this.dispatchEvent(new CustomEvent(type, { detail }));
      };
      __privateSet(this, _context, {
        emit
      });
      const setupResults = setup?.call(this, __privateGet(this, _props), __privateGet(this, _context));
      const state = /* @__PURE__ */ new Map();
      if (setupResults && typeof template === "function") {
        Object.entries(setupResults).forEach(([key, value]) => {
          if (typeof value?.observable?.subscribe === "function") {
            value.observable.subscribe((val) => {
              state.set(key, val);
              __privateGet(this, _shadowRoot).innerHTML = template(state);
            });
          } else {
            state.set(key, value);
          }
        });
      }
      const templateElement = document.createElement("template");
      templateElement.innerHTML = typeof template === "function" ? template(state) : template;
      const templateContent = templateElement.content;
      __privateSet(this, _shadowRoot, this.attachShadow({ mode: shadowMode }));
      if (css) {
        const styleElement = document.createElement("style");
        styleElement.innerHTML = typeof css === "function" ? css(state) : css;
        __privateGet(this, _shadowRoot).appendChild(styleElement);
      }
      __privateGet(this, _shadowRoot).appendChild(templateContent.cloneNode(true));
    }
    connectedCallback() {
      connectedCallback?.apply(this);
    }
    disconnectedCallback() {
      disconnectedCallback?.apply(this);
    }
    adoptedCallback() {
      adoptedCallback?.apply(this);
    }
    attributeChangedCallback(name2, oldValue, newValue) {
      __privateGet(this, _props)[name2].handler(newValue);
    }
  }, _context = new WeakMap(), _props = new WeakMap(), _shadowRoot = new WeakMap(), _a);
  customElements.define(name, clazz);
  return clazz;
};

// src/api/html.ts
var html_default = (strings, ...keys) => {
  return strings.join("");
};
export {
  define_component_default as defineComponent,
  define_example_default as defineExample,
  html_default as html,
  use_observable_default as useObservable
};
