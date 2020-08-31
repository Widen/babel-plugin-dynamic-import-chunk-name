# `babel-plugin-dynamic-import-chunk-name`

[![Build status](https://github.com/Widen/babel-plugin-dynamic-import-chunk-name/workflows/Release/badge.svg)](https://github.com/Widen/babel-plugin-dynamic-import-chunk-name/actions)
[![package version](https://img.shields.io/npm/v/babel-plugin-dynamic-import-chunk-name)](https://www.npmjs.com/package/babel-plugin-dynamic-import-chunk-name)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

This plugin will automatically generate `webpackChunkName` comments for dynamic imports using the imported filename.

## Example

### In

```js
import("./core/DocumentParser.js")
```

### Out

```js
import(/*webpackChunkName: 'core--document-parser'*/ "./core/DocumentParser.js")
```

## Installation

```sh
npm install --save-dev babel-plugin-dynamic-import-chunk-name
```

## Usage

Add the following to your `.babelrc` file.

```json
{
  "plugins": ["dynamic-import-chunk-name"]
}
```
