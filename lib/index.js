'use strict';

var f = require('util').format;

function parseMessage(line) {
    return line.substring('Error: '.length);
}

function namedFrame(line) {
    var re = (/    at (.+) \((.+):(\d+):(\d+)\)/i);
    var match = re.exec(line);

    return {
        function: match[1],
        file: match[2],
        line: parseInt(match[3], 10),
        column: parseInt(match[4], 10)
    };
}

function unnamedFrame(line) {
    var re = (/    at (.+):(\d+):(\d+)/i);
    var match = re.exec(line);

    return {
        function: undefined,
        file: match[1],
        line: parseInt(match[2], 10),
        column: parseInt(match[3], 10)
    };
}

function parseFrame(line) {
    return line.indexOf('(') !== -1 ? namedFrame(line) : unnamedFrame(line);
}

function parseStack(stack) {
    var lines = stack.split('\n');
    var message = parseMessage(lines.shift());

    var frames = lines.map(function (line) {
        return parseFrame(line);
    });

    return {
        error: message,
        frames: frames
    };
}

function composeString(trace, options) {
    var result = [ 'Error: ' + trace.error ];
    trace.frames.forEach(function (frame) {
        if (frame.function) {
            result.push(f('    at %s (%s:%s:%s)', frame.function, frame.file, frame.line, frame.column));
        } else {
            result.push(f('    at %s:%s:%s', frame.file, frame.line, frame.column));
        }

        if (options.excludeSource) { return; }

        
    });
    return result.join('\n');
}

module.exports = function (error, options, callback) {

    var trace = parseStack(error.stack);

    return {
        object: function () {
            return trace;
        },

        toString: function (options) {
            options = options || {};
            return composeString(trace, options);
        },

        json: function () {
            return JSON.stringify(trace);
        }
    };
};