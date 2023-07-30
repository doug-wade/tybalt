---
layout: layout.html
title: Tybalt esbuild plugin
---

# @tybalt/esbuild-plugin

Tybalt uses esbuild for compilation and bundling.

## Installation

Install the esbuild plugin with your favorite npm client

```shell
npm install --save-dev @tybalt/esbuild-plugin
```

## Getting Started

You can use the Tybalt esbuild plugin as follows

```typescript
import tybaltPlugin from '@tybalt/esbuild-plugin';

esbuild.build({
    plugins: [tybaltPlugin()],
});
```
