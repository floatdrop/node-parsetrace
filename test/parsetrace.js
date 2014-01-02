/* global describe, it, before */
'use strict';

var error = require('./errors');
var parsetrace = require('..');
var assert = require('power-assert');

describe('parsetrace', function () {
    describe('simple.mock', function () {
        before(function () {
            this.trace = parsetrace(error('simple.mock')).object();
            this.answers = error('simple.mock').answers;
        });

        it('should parse error message', function () {
            assert(this.trace.error === 'simple.js', 'Error message is corrupted');
        });

        it('should parse stack frames', function () {
            assert(this.trace.frames);
            assert(this.trace.frames.length === 8);
        });

        it('should parse frame function names', function () {
            this.trace.frames.forEach(function (frame, i) {
                var answer = this.answers.functions[i];
                assert(frame.function === answer);
            }.bind(this));
        });

        it('should parse frame lines', function () {
            this.trace.frames.forEach(function (frame, i) {
                var answer = this.answers.lines[i];
                assert(frame.line === answer);
            }.bind(this));
        });

        it('should parse frame columns', function () {
            this.trace.frames.forEach(function (frame, i) {
                var answer = this.answers.columns[i];
                assert(frame.column === answer);
            }.bind(this));
        });

        it('should parse frame file', function () {
            this.trace.frames.forEach(function (frame, i) {
                var answer = this.answers.files[i];
                assert(frame.file === answer);
            }.bind(this));
        });
    });
});
