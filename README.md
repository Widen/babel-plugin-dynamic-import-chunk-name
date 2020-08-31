# `babel-plugin-dynamic-import-chunk-name`

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
