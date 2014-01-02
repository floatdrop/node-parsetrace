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
    console.log(parsetrace(e, { fetchSources: true }).json());
}

/*
{
    'error': 'My cool error',
    'frames': [
        {
            line: 4,
            column: 11,
            function: 'Object.<anonymous>',
            file: '/full/path/to/file.js',
            source: {
                2: { code: '' },
                3: { code: 'try {' },
                4: { code: '    throw new Error('My cool error');' },
                5: { code: '} catch (e) {' },
                6: { code: '    console.log(parsetrace(e).json());' }
            }
        }
    ]
}
*/
```

[npm-url]: https://npmjs.org/package/parsetrace
[npm-image]: https://badge.fury.io/js/parsetrace.png

[travis-url]: http://travis-ci.org/floatdrop/node-parsetrace
[travis-image]: https://secure.travis-ci.org/floatdrop/node-parsetrace.png?branch=master

[depstat-url]: https://david-dm.org/floatdrop/node-parsetrace
[depstat-image]: https://david-dm.org/floatdrop/node-parsetrace.png
