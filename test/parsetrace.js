/* global describe, it */
'use strict';

var error = require('./errors');
var parsetrace = require('..');
var assert = require('power-assert');

describe('parsetrace', function () {
    it('should parse error message', function () {
        var trace = parsetrace(error('simple')).object();
        assert(trace.error === 'simple.js', 'Error message is corrupted');
    });

    it('should parse stack frames', function () {
        var trace = parsetrace(error('simple')).object();
        assert(trace.frames);
        assert(trace.frames.length === 8);
    });

});
