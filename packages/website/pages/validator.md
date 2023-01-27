---
layout: layout.html
title: Tybalt validator
---

# @tybalt/validator

## Installation

### Bundlers

You can install the package from npm. For example, using the npm cli

```shell
$ npm install --save @tybalt/validator
```

Alternatively, you can install using `pnpm` or `yarn`.

Once you've installed the package you'll need to include it in your bundle.
See the documentation from your bundler (webpack, swc, browserify, etc.) for
details.

### CDN

You can include Tybalt on your page directly by fetching it from a CDN. For example,
using unpkg

```js
import { compose, required, string, url } from 'https://unpkg.com/@tybalt/validator@0.0.10/dist/mjs/index.js';
```

Alternatively, you can use `cdnjs`, or `jsDelivr`.

## Concepts

### Validators

Validators are asynchronous functions that return a blob of data.

A fully functioned validator might look like

```javascript
const myValidator = {
    async validate(value) {
        return value.includes('foo');
    },
    logLevel: 'warning',
    message: 'must include substring "foo"',
};
```

### Validator Factories

Functions that return validators. Many exports from `@tybalt/validator` are factories that you use
as follows:

```js
import { required } from '@tybalt/validator';

const myIsRequiredValidator = required();

export default function myFunction(myArgument) {
    myIsRequiredValidator(myArgument);
}
```

To create your own validator factory, create a function that returns a validator

```js
export default function myValidatorFactory(substring) {
    return {
        async validate(value) {
            return value.includes(substring);
        },
        logLevel: 'warning',
        message: `must include substring ${substring}`,
    };
}
```

### Validation Results

Validators return an object that includes information about whether a validator passed or not. The most important of the keys is `passed`, which is true when the input is valid and false when it is not.

```javascript
import { oneOf } from '@tybalt/validator';

const validator = oneOf(['foo', 'bar']);
validator.validate('foo'); // returns { passed: true }
validator.validate('quux'); // returns { passed: false }
```

## API

### array

`array` creates a validator that checks whether a value is an array.

```javascript
import { array } from '@tybalt/validator';

const validator = array();
```

### compose

`compose` is a method for connecting multiple validators into a single validator.

If you want to validate that a single value exists, and is a string that is a valid url,
you can compose those validators into a single validator as follows:

```javascript
import { compose, required, string, url } from '@tybalt/validator';

const validator = compose(required(), string(), url());
const result = await validator.validate(value);
```

### integer

`integer` creates a validator that checks whether a value is an integer.

```javascript
import { integer } from '@tybalt/validator';

const validator = integer();
```

### matchesPattern

`matchesPattern` creates a validator that checks that a value matches a regex.

```javascript
import { matchesPattern } from '@tybalt/validator';

const validator = matchesPattern({ pattern: \foo\ });
```

### number

`number` creates a validator that checks whether a value is a number.

```javascript
import { number } from '@tybalt/validator';

const validator = number();
```

### oneOf

`oneOf` creates a validator that checks if a value is member of values.

```javascript
import { oneOf } from '@tybalt/validator';

const validator = oneOf(['foo', 'bar']);
```

### required

`required` creates a validator that checks that a value is defined.

```javascript
import { required } from '@tybalt/validator';

const validator = required();
```

### shape

`shape` creates a validator that checks that a value is an object with a given set of keys.

```javascript
import { compose, required, string, number } from '@tybalt/validator';

const validator = shape({
    foo: number(),
    bar: compose(required(), string()),
});
```

Note that shapes can always have more data than what is described by the shape validator.

### shouldThrow

`shouldThrow` wraps a validator, and throws an error if the validator fails.

```javascript
import { required, shouldThrow } from '@tybalt/validator';

const validator = shouldThrow(required());
```

### string

`string` creates a validator that ensures a value is a string.

```javascript
import { string } from '@tybalt/validator';

const validator = string();
```

### url

`url` creates a validator that ensures a value is a valid url.

```javascript
import { url } from '@tybalt/validator';

const validator = url();
```

### validator

`validator` takes a callback that returns a ValidationResult or a boolean, and returns a callback. Use `validator`
to create a custom validator.

```javascript
import { validator } from '@tybalt/validator';

const customValidator = validator((value) => {
    value.includes('substring');
});
```

### withLevel

`withLevel` adds a logging and error level to a validation result.

```javascript
import { url, withLevel } from '@tybalt/validator';

const validator = withLevel(url(), 'warning');
```

### withMessage

`withMessage` adds a custom message to a validation result.

```javascript
import { oneOf, withMessage } from '@tybalt/validator';

const validator = withMessage(oneOf([true, false]), 'must be a boolean');
```
