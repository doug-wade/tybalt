---
layout: layout.html
title: Tybalt validator
---

# @tybalt/validator

## Getting Started

Install the package

```shell
$ npm install --save @tybalt/validator
```

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

## API

### compose

`compose` is a method for connecting multiple validators into a single validator.

If you want to validate that a single value exists, and is a string that is a valid url,
you can compose those validators into a single validator as follows:

```javascript
import { compose, required, string, url } from '@tybalt/validator';

const validator = compose(required(), string(), url());
const result = await validator.validate(value);
```

### matchesPattern

`matchesPattern` creates a validator that checks that a value matches a regex.

```javascript
import { matchesPattern } from '@tybalt/validator';

const validator = matchesPattern({ pattern: \foo\ });
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
