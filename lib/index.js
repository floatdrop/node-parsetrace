'use strict';

function parseMessage(line) {
    return line.substring('Error: '.length);
}

function parseFrame(line) {
    return line;
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