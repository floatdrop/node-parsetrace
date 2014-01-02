/* global describe, it, before */
'use strict';

var error = require('./errors');
var parsetrace = require('..');
var assert = require('power-assert');

describe('parsetrace', function () {
    describe('simple.mock', function () {
        before(function () {
            this.trace = parsetrace(error('simple.mock'));
            this.object = this.trace.object();
            this.string = this.trace.toString();
            this.stack = error('simple.mock').stack;
            this.answers = error('simple.mock').answers;
        });

        it('should parse error message', function () {
            assert.equal(this.object.error, 'simple.js', 'Error message is corrupted');
        });

        it('should parse stack frames', function () {
            assert.ok(this.object.frames);
            assert.equal(this.object.frames.length, 8);
        });

        it('should parse frame function names', function () {
            this.object.frames.forEach(function (frame, i) {
                var answer = this.answers.functions[i];
                assert.equal(frame.function, answer);
            }.bind(this));
        });

        it('should parse frame lines', function () {
            this.object.frames.forEach(function (frame, i) {
                var answer = this.answers.lines[i];
                assert.equal(frame.line, answer);
            }.bind(this));
        });

        it('should parse frame columns', function () {
            this.object.frames.forEach(function (frame, i) {
                var answer = this.answers.columns[i];
                assert.equal(frame.column, answer);
            }.bind(this));
        });

        it('should parse frame file', function () {
            this.object.frames.forEach(function (frame, i) {
                var answer = this.answers.files[i];
                assert.equal(frame.file, answer);
            }.bind(this));
        });

        it('should compose stack string', function () {
            assert.equal(this.string, this.stack);
        });
    });
});
