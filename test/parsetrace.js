/* global describe, it, before */
'use strict';

var error = require('./errors');
var parsetrace = require('..');
var assert = require('power-assert');

describe('parsetrace of', function () {
    describe('simple.mock', function () {
        before(function () {
            this.trace = parsetrace(error('simple.mock'));
            this.object = this.trace.object();
            this.string = this.trace.toString();
            this.stack = error('simple.mock').stack;
            this.answers = error('simple.mock').answers;
        });

        it('should have error message', function () {
            assert.equal(this.object.error, 'simple.js', 'Error message is corrupted');
        });

        it('should have stack frames', function () {
            assert.ok(this.object.frames);
            assert.equal(this.object.frames.length, 8);
        });

        it('should have frame function names', function () {
            this.object.frames.forEach(function (frame, i) {
                var answer = this.answers.functions[i];
                assert.equal(frame.function, answer);
            }.bind(this));
        });

        it('should have frame lines', function () {
            this.object.frames.forEach(function (frame, i) {
                var answer = this.answers.lines[i];
                assert.equal(frame.line, answer);
            }.bind(this));
        });

        it('should have frame columns', function () {
            this.object.frames.forEach(function (frame, i) {
                var answer = this.answers.columns[i];
                assert.equal(frame.column, answer);
            }.bind(this));
        });

        it('should have frame file', function () {
            this.object.frames.forEach(function (frame, i) {
                var answer = this.answers.files[i];
                assert.equal(frame.file, answer);
            }.bind(this));
        });

        it('should compose stack string', function () {
            assert.equal(this.string, this.stack);
        });

        describe('with sources', function () {
            var sourceLine = 'throw new Error(\'simple.js\');';

            before(function () {
                this.trace = parsetrace(error('simple.mock'), { sources: true });
            });

            it('should contain simple.js source line', function () {
                assert.ok(this.trace.object().frames[0].source);
                assert.equal(Object.keys(this.trace.object().frames[0].source).length, 1);
                assert.equal(this.trace.object().frames[0].source[1].code, sourceLine);
            });

            it('after toString should contain simple.js source line', function () {
                assert(this.trace.toString().indexOf(sourceLine) !== -1);
            });

            it('should be preppended by 11 spaces', function () {
                assert(this.trace.toString().indexOf('           1:') !== -1);
            });

            it('should skip sources if options say so', function () {
                var string = this.trace.toString({ excludeSources: true});
                assert(string.indexOf('           1:') === -1);
            });
        });
    });

    describe('source.mock', function () {
        before(function () {
            this.trace = parsetrace(error('source.mock'));
            this.object = this.trace.object();
            this.answers = error('source.mock').answers;
        });

        it('should contain parsed sources', function () {
            assert.ok(this.object.frames[0].source);
            var parsedSource = this.object.frames[0].source;
            var answer = this.answers.source;
            assert.deepEqual(parsedSource, answer);
        });
    });
});
