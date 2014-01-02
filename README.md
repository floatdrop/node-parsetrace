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

### parsetrace(error, [options], [callback])

Parses stack trace from `Error`, `string` or `object`, that have `.stack` and `.message` property.

If callback is passed - all source code fetching will be async and error will be passed to it (even if `strict` is `true`).

__Options__:

 * `sources` - fetch source code from files, that are mentioned in stacktrace. If file can not be found or readed - sources will be fetched silently (unless you enabled `strict` option) (default: `false`)
 * `strict` - throws errors, while parsing stacktrace and fetching source code (default: `false`)
 * `contextSize` - number of lines before and after the error line (default: `3`)

__Returns__ `Object` with methods described below:

### json()

__Returns__ stacktrace as Json string

### object()

__Returns__ stacktrace as Object

### toString([options])

__Options__:

 * `excludeSources` - if stacktrace was parsed with sources, this will exclude them from output (default: `false`)

__Returns__ stacktrace as NodeJS formatted stacktracke string.


[npm-url]: https://npmjs.org/package/parsetrace
[npm-image]: https://badge.fury.io/js/parsetrace.png

[travis-url]: http://travis-ci.org/floatdrop/node-parsetrace
[travis-image]: https://secure.travis-ci.org/floatdrop/node-parsetrace.png?branch=master

[depstat-url]: https://david-dm.org/floatdrop/node-parsetrace
[depstat-image]: https://david-dm.org/floatdrop/node-parsetrace.png
