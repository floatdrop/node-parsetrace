# node-parsetrace [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]
Minimal library for parsing and printing node stacktrace

## Installation

`npm install --save parsetrace`

## Example

```javascript
var parsetrace = require('parsetrace');

try {
    throw new Error('My cool error');
} catch (e) {
    console.log(parsetrace(e, { sources: true }).json());
}
```

## API

### parsetrace(error, [options])

Parses stack trace from `Error`, `string` or `object`, that have `.stack` and `.message` property.

_Options_:

 * `sources` - fetch source code from files, that are mentioned in stacktrace. If file can not be found or readed
- sources will not be fetched silently (unless you enabled `strict` option) (default: `false`)
 * `strict` - throws errors, while parsing stacktrace and fetching source code (default: `false`)
 * `contextSize` - number of lines before and after the error line (default: `3`)

_Returns_ `Object` with methods described below:

### json()

Returns stacktrace as Json string

### object()

Returns stacktrace as Object

### toString([options])

Returns stacktrace as NodeJS formatted stacktracke string.

_Options_:

 * `excludeSources` - if stacktrace was parsed with sources, this will exclude them from output.

[npm-url]: https://npmjs.org/package/parsetrace
[npm-image]: https://badge.fury.io/js/parsetrace.png

[travis-url]: http://travis-ci.org/floatdrop/node-parsetrace
[travis-image]: https://secure.travis-ci.org/floatdrop/node-parsetrace.png?branch=master

[depstat-url]: https://david-dm.org/floatdrop/node-parsetrace
[depstat-image]: https://david-dm.org/floatdrop/node-parsetrace.png
