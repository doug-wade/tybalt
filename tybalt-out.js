(() => {
  // ../core/dist/mjs/index.js
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
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
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
  var __privateMethod = (obj, member, method) => {
    __accessCheck(obj, member, "access private method");
    return method;
  };
  var require_boolean = __commonJS({
    "../parser/dist/api/boolean.js"(exports, module) {
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
      var boolean_exports = {};
      __export(boolean_exports, {
        default: () => boolean_default
      });
      module.exports = __toCommonJS(boolean_exports);
      var boolean_default = {
        parse(str) {
          if (str === "true") {
            return true;
          }
          if (str === "false") {
            return false;
          }
          return null;
        }
      };
    }
  });
  var require_json = __commonJS({
    "../parser/dist/api/json.js"(exports, module) {
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
      var json_exports = {};
      __export(json_exports, {
        default: () => json_default
      });
      module.exports = __toCommonJS(json_exports);
      var json_default = {
        parse(str) {
          return JSON.parse(str);
        }
      };
    }
  });
  var require_string = __commonJS({
    "../parser/dist/api/string.js"(exports, module) {
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
      var string_exports = {};
      __export(string_exports, {
        default: () => string_default2
      });
      module.exports = __toCommonJS(string_exports);
      var string_default2 = {
        parse(str) {
          if (str instanceof String) {
            return str;
          }
          return `${str}`;
        }
      };
    }
  });
  var require_number = __commonJS({
    "../parser/dist/api/number.js"(exports, module) {
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
      var number_exports = {};
      __export(number_exports, {
        default: () => number_default
      });
      module.exports = __toCommonJS(number_exports);
      var number_default = {
        parse(str) {
          return Number(str);
        }
      };
    }
  });
  var require_standard = __commonJS({
    "../parser/dist/api/standard.js"(exports, module) {
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
      var standard_exports = {};
      __export(standard_exports, {
        default: () => standard_default
      });
      module.exports = __toCommonJS(standard_exports);
      var standard_default = {
        parse(str) {
          if (str === void 0 || str === "undefined") {
            return void 0;
          }
          if (str === null || str === "null") {
            return null;
          }
          if (str === "true" || str === true) {
            return true;
          }
          if (str === "false" || str === false) {
            return false;
          }
          if (Array.isArray(str) || typeof str === "object") {
            return str;
          }
          if (str[0] === "{" || str[0] === "[") {
            try {
              return JSON.parse(str);
            } catch (e) {
            }
          }
          try {
            const parsed = Number(str);
            if (!Number.isNaN(parsed)) {
              return parsed;
            }
          } catch (e) {
          }
          return str;
        }
      };
    }
  });
  var require_dist = __commonJS({
    "../parser/dist/index.js"(exports, module) {
      "use strict";
      var __create2 = Object.create;
      var __defProp2 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __getProtoOf2 = Object.getPrototypeOf;
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
      var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
        // If the importer is in node compatibility mode or this is not an ESM
        // file that has been converted to a CommonJS file using a Babel-
        // compatible transform (i.e. "__esModule" has not been set), then set
        // "default" to the CommonJS "module.exports" for node compatibility.
        isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
        mod
      ));
      var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
      var src_exports = {};
      __export(src_exports, {
        boolean: () => import_boolean.default,
        json: () => import_json.default,
        number: () => import_number.default,
        standard: () => import_standard.default,
        string: () => import_string.default
      });
      module.exports = __toCommonJS(src_exports);
      var import_boolean = __toESM2(require_boolean());
      var import_json = __toESM2(require_json());
      var import_string = __toESM2(require_string());
      var import_number = __toESM2(require_number());
      var import_standard = __toESM2(require_standard());
    }
  });
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
  var levelNumbers = {
    error: 4,
    warn: 3,
    info: 2,
    debug: 1,
    silent: 0
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
  var import_parser = __toESM(require_dist());
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i >= o.length)
            o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  }
  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  }
  function isFunction(value) {
    return typeof value === "function";
  }
  function createErrorClass(createImpl) {
    var _super = function(instance) {
      Error.call(instance);
      instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
  }
  var UnsubscriptionError = createErrorClass(function(_super) {
    return function UnsubscriptionErrorImpl(errors) {
      _super(this);
      this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
        return i + 1 + ") " + err.toString();
      }).join("\n  ") : "";
      this.name = "UnsubscriptionError";
      this.errors = errors;
    };
  });
  function arrRemove(arr, item) {
    if (arr) {
      var index = arr.indexOf(item);
      0 <= index && arr.splice(index, 1);
    }
  }
  var Subscription = function() {
    function Subscription2(initialTeardown) {
      this.initialTeardown = initialTeardown;
      this.closed = false;
      this._parentage = null;
      this._finalizers = null;
    }
    Subscription2.prototype.unsubscribe = function() {
      var e_1, _a, e_2, _b;
      var errors;
      if (!this.closed) {
        this.closed = true;
        var _parentage = this._parentage;
        if (_parentage) {
          this._parentage = null;
          if (Array.isArray(_parentage)) {
            try {
              for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                var parent_1 = _parentage_1_1.value;
                parent_1.remove(this);
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return))
                  _a.call(_parentage_1);
              } finally {
                if (e_1)
                  throw e_1.error;
              }
            }
          } else {
            _parentage.remove(this);
          }
        }
        var initialFinalizer = this.initialTeardown;
        if (isFunction(initialFinalizer)) {
          try {
            initialFinalizer();
          } catch (e) {
            errors = e instanceof UnsubscriptionError ? e.errors : [e];
          }
        }
        var _finalizers = this._finalizers;
        if (_finalizers) {
          this._finalizers = null;
          try {
            for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
              var finalizer = _finalizers_1_1.value;
              try {
                execFinalizer(finalizer);
              } catch (err) {
                errors = errors !== null && errors !== void 0 ? errors : [];
                if (err instanceof UnsubscriptionError) {
                  errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                } else {
                  errors.push(err);
                }
              }
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return))
                _b.call(_finalizers_1);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
        }
        if (errors) {
          throw new UnsubscriptionError(errors);
        }
      }
    };
    Subscription2.prototype.add = function(teardown) {
      var _a;
      if (teardown && teardown !== this) {
        if (this.closed) {
          execFinalizer(teardown);
        } else {
          if (teardown instanceof Subscription2) {
            if (teardown.closed || teardown._hasParent(this)) {
              return;
            }
            teardown._addParent(this);
          }
          (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
        }
      }
    };
    Subscription2.prototype._hasParent = function(parent) {
      var _parentage = this._parentage;
      return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
    };
    Subscription2.prototype._addParent = function(parent) {
      var _parentage = this._parentage;
      this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription2.prototype._removeParent = function(parent) {
      var _parentage = this._parentage;
      if (_parentage === parent) {
        this._parentage = null;
      } else if (Array.isArray(_parentage)) {
        arrRemove(_parentage, parent);
      }
    };
    Subscription2.prototype.remove = function(teardown) {
      var _finalizers = this._finalizers;
      _finalizers && arrRemove(_finalizers, teardown);
      if (teardown instanceof Subscription2) {
        teardown._removeParent(this);
      }
    };
    Subscription2.EMPTY = function() {
      var empty = new Subscription2();
      empty.closed = true;
      return empty;
    }();
    return Subscription2;
  }();
  var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
  function isSubscription(value) {
    return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
  }
  function execFinalizer(finalizer) {
    if (isFunction(finalizer)) {
      finalizer();
    } else {
      finalizer.unsubscribe();
    }
  }
  var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false
  };
  var timeoutProvider = {
    setTimeout: function(handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      var delegate = timeoutProvider.delegate;
      if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
        return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
      }
      return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearTimeout: function(handle) {
      var delegate = timeoutProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: void 0
  };
  function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function() {
      var onUnhandledError = config.onUnhandledError;
      if (onUnhandledError) {
        onUnhandledError(err);
      } else {
        throw err;
      }
    });
  }
  function noop() {
  }
  var COMPLETE_NOTIFICATION = function() {
    return createNotification("C", void 0, void 0);
  }();
  function errorNotification(error) {
    return createNotification("E", void 0, error);
  }
  function nextNotification(value) {
    return createNotification("N", value, void 0);
  }
  function createNotification(kind, value, error) {
    return {
      kind,
      value,
      error
    };
  }
  var context = null;
  function errorContext(cb) {
    if (config.useDeprecatedSynchronousErrorHandling) {
      var isRoot = !context;
      if (isRoot) {
        context = { errorThrown: false, error: null };
      }
      cb();
      if (isRoot) {
        var _a = context, errorThrown = _a.errorThrown, error = _a.error;
        context = null;
        if (errorThrown) {
          throw error;
        }
      }
    } else {
      cb();
    }
  }
  function captureError(err) {
    if (config.useDeprecatedSynchronousErrorHandling && context) {
      context.errorThrown = true;
      context.error = err;
    }
  }
  var Subscriber = function(_super) {
    __extends(Subscriber2, _super);
    function Subscriber2(destination) {
      var _this = _super.call(this) || this;
      _this.isStopped = false;
      if (destination) {
        _this.destination = destination;
        if (isSubscription(destination)) {
          destination.add(_this);
        }
      } else {
        _this.destination = EMPTY_OBSERVER;
      }
      return _this;
    }
    Subscriber2.create = function(next, error, complete) {
      return new SafeSubscriber(next, error, complete);
    };
    Subscriber2.prototype.next = function(value) {
      if (this.isStopped) {
        handleStoppedNotification(nextNotification(value), this);
      } else {
        this._next(value);
      }
    };
    Subscriber2.prototype.error = function(err) {
      if (this.isStopped) {
        handleStoppedNotification(errorNotification(err), this);
      } else {
        this.isStopped = true;
        this._error(err);
      }
    };
    Subscriber2.prototype.complete = function() {
      if (this.isStopped) {
        handleStoppedNotification(COMPLETE_NOTIFICATION, this);
      } else {
        this.isStopped = true;
        this._complete();
      }
    };
    Subscriber2.prototype.unsubscribe = function() {
      if (!this.closed) {
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
        this.destination = null;
      }
    };
    Subscriber2.prototype._next = function(value) {
      this.destination.next(value);
    };
    Subscriber2.prototype._error = function(err) {
      try {
        this.destination.error(err);
      } finally {
        this.unsubscribe();
      }
    };
    Subscriber2.prototype._complete = function() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    };
    return Subscriber2;
  }(Subscription);
  var _bind = Function.prototype.bind;
  function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
  }
  var ConsumerObserver = function() {
    function ConsumerObserver2(partialObserver) {
      this.partialObserver = partialObserver;
    }
    ConsumerObserver2.prototype.next = function(value) {
      var partialObserver = this.partialObserver;
      if (partialObserver.next) {
        try {
          partialObserver.next(value);
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    ConsumerObserver2.prototype.error = function(err) {
      var partialObserver = this.partialObserver;
      if (partialObserver.error) {
        try {
          partialObserver.error(err);
        } catch (error) {
          handleUnhandledError(error);
        }
      } else {
        handleUnhandledError(err);
      }
    };
    ConsumerObserver2.prototype.complete = function() {
      var partialObserver = this.partialObserver;
      if (partialObserver.complete) {
        try {
          partialObserver.complete();
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    return ConsumerObserver2;
  }();
  var SafeSubscriber = function(_super) {
    __extends(SafeSubscriber2, _super);
    function SafeSubscriber2(observerOrNext, error, complete) {
      var _this = _super.call(this) || this;
      var partialObserver;
      if (isFunction(observerOrNext) || !observerOrNext) {
        partialObserver = {
          next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
          error: error !== null && error !== void 0 ? error : void 0,
          complete: complete !== null && complete !== void 0 ? complete : void 0
        };
      } else {
        var context_1;
        if (_this && config.useDeprecatedNextContext) {
          context_1 = Object.create(observerOrNext);
          context_1.unsubscribe = function() {
            return _this.unsubscribe();
          };
          partialObserver = {
            next: observerOrNext.next && bind(observerOrNext.next, context_1),
            error: observerOrNext.error && bind(observerOrNext.error, context_1),
            complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
          };
        } else {
          partialObserver = observerOrNext;
        }
      }
      _this.destination = new ConsumerObserver(partialObserver);
      return _this;
    }
    return SafeSubscriber2;
  }(Subscriber);
  function handleUnhandledError(error) {
    if (config.useDeprecatedSynchronousErrorHandling) {
      captureError(error);
    } else {
      reportUnhandledError(error);
    }
  }
  function defaultErrorHandler(err) {
    throw err;
  }
  function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = config.onStoppedNotification;
    onStoppedNotification && timeoutProvider.setTimeout(function() {
      return onStoppedNotification(notification, subscriber);
    });
  }
  var EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop
  };
  var observable = function() {
    return typeof Symbol === "function" && Symbol.observable || "@@observable";
  }();
  function identity(x) {
    return x;
  }
  function pipeFromArray(fns) {
    if (fns.length === 0) {
      return identity;
    }
    if (fns.length === 1) {
      return fns[0];
    }
    return function piped(input) {
      return fns.reduce(function(prev, fn) {
        return fn(prev);
      }, input);
    };
  }
  var Observable = function() {
    function Observable3(subscribe) {
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    Observable3.prototype.lift = function(operator) {
      var observable2 = new Observable3();
      observable2.source = this;
      observable2.operator = operator;
      return observable2;
    };
    Observable3.prototype.subscribe = function(observerOrNext, error, complete) {
      var _this = this;
      var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
      errorContext(function() {
        var _a = _this, operator = _a.operator, source = _a.source;
        subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
      });
      return subscriber;
    };
    Observable3.prototype._trySubscribe = function(sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        sink.error(err);
      }
    };
    Observable3.prototype.forEach = function(next, promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var subscriber = new SafeSubscriber({
          next: function(value) {
            try {
              next(value);
            } catch (err) {
              reject(err);
              subscriber.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
        _this.subscribe(subscriber);
      });
    };
    Observable3.prototype._subscribe = function(subscriber) {
      var _a;
      return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable3.prototype[observable] = function() {
      return this;
    };
    Observable3.prototype.pipe = function() {
      var operations = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        operations[_i] = arguments[_i];
      }
      return pipeFromArray(operations)(this);
    };
    Observable3.prototype.toPromise = function(promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var value;
        _this.subscribe(function(x) {
          return value = x;
        }, function(err) {
          return reject(err);
        }, function() {
          return resolve(value);
        });
      });
    };
    Observable3.create = function(subscribe) {
      return new Observable3(subscribe);
    };
    return Observable3;
  }();
  function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
  }
  function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
  }
  function isSubscriber(value) {
    return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
  }
  function hasLift(source) {
    return isFunction(source === null || source === void 0 ? void 0 : source.lift);
  }
  function operate(init) {
    return function(source) {
      if (hasLift(source)) {
        return source.lift(function(liftedSource) {
          try {
            return init(liftedSource, this);
          } catch (err) {
            this.error(err);
          }
        });
      }
      throw new TypeError("Unable to lift unknown Observable type");
    };
  }
  function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
  }
  var OperatorSubscriber = function(_super) {
    __extends(OperatorSubscriber2, _super);
    function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
      var _this = _super.call(this, destination) || this;
      _this.onFinalize = onFinalize;
      _this.shouldUnsubscribe = shouldUnsubscribe;
      _this._next = onNext ? function(value) {
        try {
          onNext(value);
        } catch (err) {
          destination.error(err);
        }
      } : _super.prototype._next;
      _this._error = onError ? function(err) {
        try {
          onError(err);
        } catch (err2) {
          destination.error(err2);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._error;
      _this._complete = onComplete ? function() {
        try {
          onComplete();
        } catch (err) {
          destination.error(err);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._complete;
      return _this;
    }
    OperatorSubscriber2.prototype.unsubscribe = function() {
      var _a;
      if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
        var closed_1 = this.closed;
        _super.prototype.unsubscribe.call(this);
        !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
      }
    };
    return OperatorSubscriber2;
  }(Subscriber);
  var ObjectUnsubscribedError = createErrorClass(function(_super) {
    return function ObjectUnsubscribedErrorImpl() {
      _super(this);
      this.name = "ObjectUnsubscribedError";
      this.message = "object unsubscribed";
    };
  });
  var Subject = function(_super) {
    __extends(Subject2, _super);
    function Subject2() {
      var _this = _super.call(this) || this;
      _this.closed = false;
      _this.currentObservers = null;
      _this.observers = [];
      _this.isStopped = false;
      _this.hasError = false;
      _this.thrownError = null;
      return _this;
    }
    Subject2.prototype.lift = function(operator) {
      var subject = new AnonymousSubject(this, this);
      subject.operator = operator;
      return subject;
    };
    Subject2.prototype._throwIfClosed = function() {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      }
    };
    Subject2.prototype.next = function(value) {
      var _this = this;
      errorContext(function() {
        var e_1, _a;
        _this._throwIfClosed();
        if (!_this.isStopped) {
          if (!_this.currentObservers) {
            _this.currentObservers = Array.from(_this.observers);
          }
          try {
            for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
              var observer = _c.value;
              observer.next(value);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_c && !_c.done && (_a = _b.return))
                _a.call(_b);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        }
      });
    };
    Subject2.prototype.error = function(err) {
      var _this = this;
      errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.hasError = _this.isStopped = true;
          _this.thrownError = err;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().error(err);
          }
        }
      });
    };
    Subject2.prototype.complete = function() {
      var _this = this;
      errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.isStopped = true;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().complete();
          }
        }
      });
    };
    Subject2.prototype.unsubscribe = function() {
      this.isStopped = this.closed = true;
      this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject2.prototype, "observed", {
      get: function() {
        var _a;
        return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
      },
      enumerable: false,
      configurable: true
    });
    Subject2.prototype._trySubscribe = function(subscriber) {
      this._throwIfClosed();
      return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject2.prototype._subscribe = function(subscriber) {
      this._throwIfClosed();
      this._checkFinalizedStatuses(subscriber);
      return this._innerSubscribe(subscriber);
    };
    Subject2.prototype._innerSubscribe = function(subscriber) {
      var _this = this;
      var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
      if (hasError || isStopped) {
        return EMPTY_SUBSCRIPTION;
      }
      this.currentObservers = null;
      observers.push(subscriber);
      return new Subscription(function() {
        _this.currentObservers = null;
        arrRemove(observers, subscriber);
      });
    };
    Subject2.prototype._checkFinalizedStatuses = function(subscriber) {
      var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
      if (hasError) {
        subscriber.error(thrownError);
      } else if (isStopped) {
        subscriber.complete();
      }
    };
    Subject2.prototype.asObservable = function() {
      var observable2 = new Observable();
      observable2.source = this;
      return observable2;
    };
    Subject2.create = function(destination, source) {
      return new AnonymousSubject(destination, source);
    };
    return Subject2;
  }(Observable);
  var AnonymousSubject = function(_super) {
    __extends(AnonymousSubject2, _super);
    function AnonymousSubject2(destination, source) {
      var _this = _super.call(this) || this;
      _this.destination = destination;
      _this.source = source;
      return _this;
    }
    AnonymousSubject2.prototype.next = function(value) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject2.prototype.error = function(err) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject2.prototype.complete = function() {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject2.prototype._subscribe = function(subscriber) {
      var _a, _b;
      return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject2;
  }(Subject);
  var BehaviorSubject = function(_super) {
    __extends(BehaviorSubject2, _super);
    function BehaviorSubject2(_value) {
      var _this = _super.call(this) || this;
      _this._value = _value;
      return _this;
    }
    Object.defineProperty(BehaviorSubject2.prototype, "value", {
      get: function() {
        return this.getValue();
      },
      enumerable: false,
      configurable: true
    });
    BehaviorSubject2.prototype._subscribe = function(subscriber) {
      var subscription = _super.prototype._subscribe.call(this, subscriber);
      !subscription.closed && subscriber.next(this._value);
      return subscription;
    };
    BehaviorSubject2.prototype.getValue = function() {
      var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
      if (hasError) {
        throw thrownError;
      }
      this._throwIfClosed();
      return _value;
    };
    BehaviorSubject2.prototype.next = function(value) {
      _super.prototype.next.call(this, this._value = value);
    };
    return BehaviorSubject2;
  }(Subject);
  function map(project, thisArg) {
    return operate(function(source, subscriber) {
      var index = 0;
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        subscriber.next(project.call(thisArg, value, index++));
      }));
    });
  }
  var _context;
  var _callback;
  var _subscribe;
  var _event;
  var TybaltContextEvent = class {
    constructor(context2, callback, options) {
      __privateAdd(this, _context, void 0);
      __privateAdd(this, _callback, void 0);
      __privateAdd(this, _subscribe, void 0);
      __privateAdd(this, _event, void 0);
      this.NONE = 0;
      this.CAPTURING_PHASE = 1;
      this.AT_TARGET = 2;
      this.BUBBLING_PHASE = 3;
      __privateSet(this, _context, context2);
      __privateSet(this, _callback, callback);
      __privateSet(this, _subscribe, options.subscribe || false);
      __privateSet(this, _event, new CustomEvent("context-request", options));
    }
    get bubbles() {
      return __privateGet(this, _event).bubbles;
    }
    // deprecated
    get cancelBubble() {
      return __privateGet(this, _event).cancelBubble;
    }
    get cancelable() {
      return __privateGet(this, _event).cancelable;
    }
    get composed() {
      return __privateGet(this, _event).bubbles;
    }
    get currentTarget() {
      return __privateGet(this, _event).currentTarget;
    }
    get defaultPrevented() {
      return __privateGet(this, _event).defaultPrevented;
    }
    get eventPhase() {
      return __privateGet(this, _event).eventPhase;
    }
    get isTrusted() {
      return __privateGet(this, _event).isTrusted;
    }
    get returnValue() {
      return __privateGet(this, _event).returnValue;
    }
    get srcElement() {
      return __privateGet(this, _event).srcElement;
    }
    get target() {
      return __privateGet(this, _event).target;
    }
    get timeStamp() {
      return __privateGet(this, _event).timeStamp;
    }
    get type() {
      return __privateGet(this, _event).type;
    }
    composedPath() {
      throw new Error("Method not implemented.");
    }
    initEvent() {
      throw new Error("Method not implemented.");
    }
    preventDefault() {
      throw new Error("Method not implemented.");
    }
    stopImmediatePropagation() {
      throw new Error("Method not implemented.");
    }
    stopPropagation() {
      throw new Error("Method not implemented.");
    }
    get context() {
      return __privateGet(this, _context);
    }
    get callback() {
      return __privateGet(this, _callback);
    }
    get subscribe() {
      return __privateGet(this, _subscribe);
    }
  };
  _context = /* @__PURE__ */ new WeakMap();
  _callback = /* @__PURE__ */ new WeakMap();
  _subscribe = /* @__PURE__ */ new WeakMap();
  _event = /* @__PURE__ */ new WeakMap();
  var context_event_default = TybaltContextEvent;
  var nameValidator = should_throw_default(
    with_message_default(
      compose_default(required_default(), matches_pattern_default(/.*-.*/)),
      `web component names are required and must contain a hyphen`
    )
  );
  var define_component_default = ({
    name,
    emits,
    props = {},
    setup,
    connectedCallback,
    disconnectedCallback,
    adoptedCallback,
    render,
    shadowMode = "open",
    css,
    template,
    contexts = []
  }) => {
    var _setupContext, _props, _renderObservables, _renderState, _render, _css, _template, _isConnected, _contexts, _doRender, doRender_fn, _updateProps, updateProps_fn, _a;
    nameValidator.validate(name);
    const clazz = (_a = class extends HTMLElement {
      constructor() {
        super();
        __privateAdd(this, _doRender);
        __privateAdd(this, _updateProps);
        __privateAdd(this, _setupContext, void 0);
        __privateAdd(this, _props, {});
        __privateAdd(this, _renderObservables, {});
        __privateAdd(this, _renderState, {});
        __privateAdd(this, _render, render);
        __privateAdd(this, _css, css);
        __privateAdd(this, _template, template);
        __privateAdd(this, _isConnected, false);
        __privateAdd(this, _contexts, /* @__PURE__ */ new Map());
        __privateSet(this, _props, Object.entries(props).reduce(
          (accumulator, [key, value]) => {
            const parser = value.parser || import_parser.standard;
            let initialValue = null;
            try {
              initialValue = parser.parse(value.default);
              __privateGet(this, _renderState)[key] = initialValue;
            } catch (e) {
              initialValue = e;
            }
            accumulator[key] = {
              observable: new BehaviorSubject(initialValue),
              parser: value.parser || import_parser.standard
            };
            return accumulator;
          },
          {}
        ));
        const emit = (type, detail) => {
          if (emits && !emits?.includes(type)) {
            console.warn(`unexpected event emitted with type ${type} and detail ${detail}`);
          }
          this.dispatchEvent(new CustomEvent(type, { detail }));
        };
        __privateSet(this, _setupContext, {
          emit
        });
        const getProxy = (value) => {
          return new Proxy(value, {
            get(target, prop, receiver) {
              if (prop === "value") {
                return target.observable.getValue();
              }
              return Reflect.get(target, prop, receiver);
            }
          });
        };
        const propsForSetup = Object.fromEntries(
          Object.entries(__privateGet(this, _props)).map(([key, value]) => [key, getProxy(value)])
        );
        const setupResults = setup?.call(
          this,
          propsForSetup,
          __privateGet(this, _setupContext)
        ) || {};
        for (const [key, value] of Object.entries({ ...propsForSetup, ...setupResults })) {
          if (value.subscribe) {
            __privateGet(this, _renderObservables)[key] = value;
          } else if (value.observable) {
            __privateGet(this, _renderObservables)[key] = value.observable;
          } else {
            __privateGet(this, _renderState)[key] = value;
          }
        }
        for (const context2 of contexts) {
          __privateGet(this, _contexts).set(context2, { value: {}, unsubscribe: () => {
          } });
          const observable2 = new BehaviorSubject(context2.initialValue || null);
          this.dispatchEvent(
            new context_event_default(
              context2,
              (value, unsubscribe) => {
                const contextState = __privateGet(this, _contexts).get(context2);
                if (unsubscribe !== contextState.unsubscribe) {
                  contextState.unsubscribe?.();
                }
                observable2.next(value);
                this.contextState.set(context2, { value, unsubscribe, observable: observable2 });
              },
              {
                subscribe: true
              }
            )
          );
        }
        for (const [key, value] of Object.entries(__privateGet(this, _contexts))) {
          if (!__privateGet(this, _renderObservables)[key]) {
            __privateGet(this, _renderObservables)[key] = value.observable;
          }
        }
        for (const [key, value] of Object.entries(__privateGet(this, _props))) {
          if (!__privateGet(this, _renderObservables)[key]) {
            __privateGet(this, _renderObservables)[key] = value.observable.pipe(map((value2) => value2.parser(value2)));
          }
        }
        for (const [key, observable2] of Object.entries(__privateGet(this, _renderObservables))) {
          observable2.subscribe((value) => {
            __privateGet(this, _renderState)[key] = value;
            __privateMethod(this, _doRender, doRender_fn).call(this);
          });
        }
        this.attachShadow({ mode: shadowMode });
        __privateMethod(this, _doRender, doRender_fn).call(this);
      }
      connectedCallback() {
        __privateSet(this, _isConnected, true);
        connectedCallback?.apply(this);
        __privateMethod(this, _updateProps, updateProps_fn).call(this);
        __privateMethod(this, _doRender, doRender_fn).call(this);
      }
      disconnectedCallback() {
        __privateSet(this, _isConnected, false);
        disconnectedCallback?.apply(this);
      }
      adoptedCallback() {
        adoptedCallback?.apply(this);
      }
      attributeChangedCallback(name2, oldValue, newValue) {
        const { observable: observable2, parser } = __privateGet(this, _props)[name2];
        const parsed = parser.parse(newValue);
        observable2.next(parsed);
        __privateMethod(this, _doRender, doRender_fn).call(this);
      }
    }, _setupContext = /* @__PURE__ */ new WeakMap(), _props = /* @__PURE__ */ new WeakMap(), _renderObservables = /* @__PURE__ */ new WeakMap(), _renderState = /* @__PURE__ */ new WeakMap(), _render = /* @__PURE__ */ new WeakMap(), _css = /* @__PURE__ */ new WeakMap(), _template = /* @__PURE__ */ new WeakMap(), _isConnected = /* @__PURE__ */ new WeakMap(), _contexts = /* @__PURE__ */ new WeakMap(), _doRender = /* @__PURE__ */ new WeakSet(), doRender_fn = function() {
      if (!__privateGet(this, _isConnected) || !this.shadowRoot) {
        return;
      }
      this.shadowRoot.innerHTML = "";
      if (__privateGet(this, _css)) {
        const styleElement = document.createElement("style");
        const calculatedCss = typeof css === "function" ? css(__privateGet(this, _renderState)) || "" : css;
        styleElement.innerHTML = calculatedCss || "";
        this.shadowRoot?.appendChild(styleElement);
      }
      if (__privateGet(this, _render)) {
        const templateElement = document.createElement("template");
        const newEntries = Object.entries(__privateGet(this, _renderState)).map(
          ([key, value]) => [key, value?.observable ? value.observable : value]
        );
        templateElement.innerHTML = __privateGet(this, _render).call(this, Object.fromEntries(newEntries));
        const templateContent = templateElement.content;
        this.shadowRoot?.appendChild(templateContent.cloneNode(true));
      }
      if (__privateGet(this, _template)) {
        const templateElement = document.createElement("template");
        templateElement.innerHTML = __privateGet(this, _template);
        const templateContent = templateElement.content;
        this.shadowRoot?.appendChild(templateContent.cloneNode(true));
      }
    }, _updateProps = /* @__PURE__ */ new WeakSet(), updateProps_fn = function() {
      for (const [key, value] of Object.entries(__privateGet(this, _props))) {
        const attributeValue = this.getAttribute(key);
        const usingDefault = attributeValue === null && value.observable.value;
        const areDifferent = attributeValue !== value.observable.getValue();
        if (!usingDefault && areDifferent) {
          const nextValue = value.parser.parse(attributeValue);
          value.observable.next(nextValue);
        }
      }
    }, _a);
    try {
      customElements.define(name, clazz);
    } catch (e) {
      console.warn(`failed to define component ${name}`, e);
    }
    return clazz;
  };
  var html_default = (strings, ...keys) => {
    return strings.reduce((prev, curr, i) => {
      return `${prev}${curr}${keys[i] ? keys[i] : ""}`;
    }, "");
  };
  var import_parser2 = __toESM(require_dist());
  var switch_default = define_component_default({
    name: "t-switch",
    props: {
      value: {
        validator: required_default,
        parser: import_parser2.string
      }
    },
    render({ value }) {
      return html_default`<slot name="${value}"></slot>`;
    }
  });
  var getSlotName = (condition) => {
    if (condition === "true" || condition === true) {
      return "true";
    }
    return "false";
  };
  var if_default = define_component_default({
    name: "t-if",
    props: {
      condition: {
        validator: one_of_default(["true", "false", true, false])
      }
    },
    render({ condition }) {
      const slotName = getSlotName(condition);
      return html_default`<div><slot name="${slotName}"></slot></div>`;
    }
  });
  var import_parser3 = __toESM(require_dist());
  var else_default = define_component_default({
    name: "t-if",
    props: {
      condition: {
        validator: one_of_default(["true", "false"]),
        parser: import_parser3.boolean
      }
    },
    render({ condition }) {
      let slotName;
      if (condition) {
        slotName = "false";
      } else {
        slotName = "true";
      }
      return html_default`<div><slot name="${slotName}"></slot></div>`;
    }
  });

  // components/sidebar.js
  var PACKAGES = ["cli", "core", "eleventy-plugin", "esbuild-plugin", "eslint-plugin", "parser", "test-utils", "validator"];
  var GUIDES = ["new-website", "styling-your-component", "writing-tests"];
  define_component_default({
    name: "tybalt-sidebar",
    shadowMode: "open",
    render() {
      const packageLis = PACKAGES.map((pkg) => {
        return html_default`
                <li>
                    <tybalt-link href="/pages/${pkg}">@tybalt/${pkg}</tybalt-link>
                </li>
            `;
      });
      const guideLis = GUIDES.map((guide) => {
        return html_default`
                <li>
                    <tybalt-link href="/pages/${guide}-guide">${guide.replaceAll("-", " ")}</tybalt-link>
                </li>
            `;
      });
      return html_default`
            <aside>
                <div>Individual Package Documentation</div>
                <ul>
                    ${packageLis.join("")}
                </ul>
                <div>Guides</div>
                <ul>
                    ${guideLis.join("")}
                </ul>
                <tybalt-link href="https://discord.gg/FHpfstT7Dw">Join the Discord server</tybalt-link>
                <tybalt-link href="https://dougwade.substack.com/">Subscribe to the Substack</tybalt-link>
            </aside>
        `;
    }
  });

  // components/main.js
  define_component_default({
    name: "tybalt-main",
    shadowMode: "open",
    render() {
      return html_default`<div>
            <h1>Tybalt</h1>
            <h2>A collection of tools for building web components</h2>
            <p>
                Tybalt is a collection of tools for building web components. It is designed to be modular, so you can
                use as much or as little as you want.
            </p>
            <p>
                Tybalt built with a "use the platform" mentality, so it uses the latest web platform features to provide
                the best developer experience.
            </p>
            <h2>Features</h2>
            <ul>
                <li>Static Site Generation</li>
                <li>Web Component Development</li>
                <li>Compiler</li>
                <li>Unit Testing</li>
                <li>Linting</li>
                <li>Parsing and Validation</li>
            </ul>
            <h2>Core Concepts</h2>
            <h3>Web Components</h3>
            <p>
                Tybalt exports tools for building web components. It uses templates, slots, custom elements and the
                shadow dom to implement rendering.
            </p>
            <pre><code class="language-javascript">
            import { defineComponent, html } from '@tybalt/core';
            export default defineComponent({
                name: 'my-component',
                shadowMode: 'open',
                render() {
                    return html\`<div>Hello World</div>\`;
                },
            });
            </code></pre>
            <h3>Unit Testing</h3>
            <p>
                Tybalt exports tools for testing web components. It uses Jest and JSDOM to render web components in a
                test environment.
            </p>
            <pre><code class="language-javascript">
            import MyComponent from './my-component.js';
            import { mount } from '@tybalt/test-utils';
            describe('my-component', () => {
                it('renders', async () => {
                    const el = await mount(MyComponent);

                    expect(el.shadowHtml()).toContain('Hello World');
                });
            });
            </code></pre>
            <h3>Compilation</h3>
            <p>
                Tybalt exports a compiler for compiling web components. It uses esbuild to compile web components to a
                single file and a plugin called @tybalt/esbuild-plugin.
            </p>
            <h3>Linting</h3>
            <p>
                Tybalt exports a linter for linting web components. It uses eslint to lint web components and a plugin
                called @tybalt/eslint-plugin.
            </p>
            <h2>Getting Started</h2>
            <p>The fastest way to get started is creating a static website</p>
            <code><pre>$ npx @tybalt/cli scaffold eleventy -n my-static-website</pre></code>
            <p>Then, you can start the development server</p>
            <code><pre>$ npx @11ty/eleventy --serve</pre></code>
            <p>And open the site at <tybalt-link href="http://localhost:8080/">http://localhost:8080/</tybalt-link></p>
        </div>`;
    }
  });

  // ../validator/dist/index.mjs
  var validator_default2 = (cb) => {
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
  var levelNumbers2 = {
    error: 4,
    warn: 3,
    info: 2,
    debug: 1,
    silent: 0
  };
  var isMoreSevere2 = (current, previous) => {
    if (!current) {
      return false;
    }
    if (!previous) {
      return true;
    }
    const currentLevel = levelNumbers2[current];
    const previousLevel = levelNumbers2[previous];
    return currentLevel > previousLevel;
  };
  var getMostSevereLevel2 = (results) => {
    let mostSevere = void 0;
    results.forEach((result) => {
      if (isMoreSevere2(result.level, mostSevere)) {
        mostSevere = result.level;
      }
    });
    return mostSevere;
  };
  var haveAllPassed2 = (results) => {
    return results.reduce((accumulator, result) => {
      return result.passed && accumulator;
    }, true);
  };
  var concatenateMessages2 = (results) => {
    const concatenatedMessages = results.map((result) => `  - (${result.level}) ${result.message}`).join("\n");
    if (concatenatedMessages.length) {
      return `Got validation failures:

${concatenatedMessages}
`;
    }
  };
  var compose_default2 = (...validators) => {
    return {
      async validate(value) {
        const promises = validators.map((validator) => validator.validate(value));
        const results = await Promise.all(promises);
        const level = getMostSevereLevel2(results);
        const message = concatenateMessages2(results);
        const passed = haveAllPassed2(results);
        return {
          level,
          message,
          passed
        };
      }
    };
  };
  var matches_pattern_default2 = (pattern) => {
    return validator_default2(async (value) => {
      if (typeof pattern === "string") {
        return value.includes(pattern);
      } else {
        return pattern.test(value);
      }
    });
  };
  var required_default2 = () => {
    return validator_default2(async (value) => {
      return !!value;
    });
  };
  var string_default = () => {
    return validator_default2(async (value) => {
      return typeof value === "string";
    });
  };
  var urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
  var url_default = () => {
    return matches_pattern_default2(urlPattern);
  };

  // components/link.js
  define_component_default({
    name: "tybalt-link",
    shadowMode: "open",
    props: {
      href: {
        validator: compose_default2(required_default2(), string_default(), url_default())
      },
      ariaLabel: {
        validator: required_default2()
      }
    },
    render({ ariaLabel, href }) {
      return html_default`<a href="${href}" aria-label="${ariaLabel}"><slot>link</slot></a>`;
    },
    css: `
            a {
                color: var(--purple);
            }
        `
  });

  // components/header.js
  define_component_default({
    name: "tybalt-header",
    shadowMode: "open",
    render() {
      return html_default`
            <nav>
                <span>Tybalt Web Components</span>
                <span>
                    <tybalt-link href="https://github.com/doug-wade/tybalt">Github</tybalt-link>
                </span>
            </nav>
        `;
    },
    css: `
        nav {
            display: flex;
            justify-content: space-between;
        }
    `
  });

  // components/footer.js
  define_component_default({
    name: "tybalt-footer",
    shadowMode: "open",
    render() {
      return html_default`<footer>Tybalt distributed under the MIT license</footer>`;
    }
  });
})();
