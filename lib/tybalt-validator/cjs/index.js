"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
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

// src/api/compose.ts
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

// src/api/validator.ts
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

// src/api/matches-pattern.ts
var matches_pattern_default = (pattern) => {
  return validator_default(async (value) => {
    if (typeof pattern === "string") {
      return value.includes(pattern);
    } else {
      return pattern.test(value);
    }
  });
};

// src/api/one-of.ts
var one_of_default = (values) => {
  return validator_default(async (value) => {
    return values.includes(value);
  });
};

// src/api/required.ts
var required_default = () => {
  return validator_default(async (value) => {
    return !!value;
  });
};

// src/util/validation-error.ts
var ValidationError = class extends Error {
};

// src/api/should-throw.ts
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

// src/api/string.ts
var string_default = () => {
  return validator_default(async (value) => {
    return typeof value === "string";
  });
};

// src/api/url.ts
var urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
var url_default = () => {
  return matches_pattern_default(urlPattern);
};

// src/api/with-level.ts
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

// src/util/ensure-validator.ts
var isValidatorFunction = (x) => typeof x === "function";
var ensure_validator_default = (maybeValidator) => {
  if (isValidatorFunction(maybeValidator)) {
    return validator_default(maybeValidator);
  } else {
    return maybeValidator;
  }
};

// src/api/with-message.ts
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
