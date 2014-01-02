'use strict';

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

module.exports = function (error, options, callback) {

    var trace = parseStack(error.stack);

    return {
        object: function () {
            return trace;
        },

        toString: function (options) {

        },

        json: function () {
            return JSON.stringify(trace);
        }
    };
};